// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import {
//   cambiarPasswordUsuario,
//   loginUser,
//   registrarUsuario,
// } from "@/services/auth.service";
// import { getAuthCookieName } from "@/lib/jwt";
// import { getCurrentUser } from "@/lib/current-user";

// export type LoginActionState = {
//   ok: boolean;
//   message: string;
//   redirectTo?: string;
// };

// export type RegistroActionState = {
//   ok: boolean;
//   message: string;
// };

// export type CambiarPasswordActionState = {
//   ok: boolean;
//   message: string;
//   redirectTo?: string;
// };

// function setSessionCookie(token: string) {
//   cookies().set({
//     name: getAuthCookieName(),
//     value: token,
//     httpOnly: true,
//     sameSite: "lax",
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     maxAge: 60 * 60 * 12,
//   });
// }

// export async function loginAction(
//   _prevState: LoginActionState,
//   formData: FormData,
// ): Promise<LoginActionState> {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");

//   const result = await loginUser({
//     email,
//     password,
//   });

//   if (!result.ok) {
//     return {
//       ok: false,
//       message: result.message,
//     };
//   }

//   setSessionCookie(result.token);

//   return {
//     ok: true,
//     message: "Inicio de sesión correcto.",
//     redirectTo: result.redirectTo,
//   };
// }

// export async function registroAction(
//   _prevState: RegistroActionState,
//   formData: FormData,
// ): Promise<RegistroActionState> {
//   const result = await registrarUsuario({
//     nombre: String(formData.get("nombre") || ""),
//     apellido: String(formData.get("apellido") || ""),
//     dni: String(formData.get("dni") || ""),
//     email: String(formData.get("email") || ""),
//     password: String(formData.get("password") || ""),
//     confirmarPassword: String(formData.get("confirmarPassword") || ""),
//   });

//   return result;
// }

// export async function cambiarPasswordAction(
//   _prevState: CambiarPasswordActionState,
//   formData: FormData,
// ): Promise<CambiarPasswordActionState> {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   const result = await cambiarPasswordUsuario(user.userId, {
//     actualPassword: String(formData.get("actualPassword") || ""),
//     nuevaPassword: String(formData.get("nuevaPassword") || ""),
//     confirmarPassword: String(formData.get("confirmarPassword") || ""),
//   });

//   if (!result.ok) {
//     return {
//       ok: false,
//       message: result.message,
//     };
//   }

//   setSessionCookie(result.token);

//   return {
//     ok: true,
//     message: result.message,
//     redirectTo: result.redirectTo,
//   };
// }

// export async function logoutAction() {
//   cookies().delete(getAuthCookieName());

//   return {
//     ok: true,
//   };
// }

// src/actions/auth.actions.ts

"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  cambiarPasswordUsuario,
  loginUser,
  registrarUsuario,
} from "@/services/auth.service";
import { getCurrentUser } from "@/lib/current-user";
import { deleteSessionCookie, setSessionCookie } from "@/lib/session";
import { buildRateLimitKey, checkRateLimit } from "@/lib/rate-limit";

export type LoginActionState = {
  ok: boolean;
  message: string;
  redirectTo?: string;
};

export type RegistroActionState = {
  ok: boolean;
  message: string;
};

export type CambiarPasswordActionState = {
  ok: boolean;
  message: string;
  redirectTo?: string;
};

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function getClientIp() {
  const h = headers();

  const forwardedFor = h.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    h.get("x-client-ip") ||
    "unknown"
  );
}

function getRateLimitMessage(seconds: number) {
  const minutes = Math.ceil(seconds / 60);

  if (minutes <= 1) {
    return "Demasiados intentos. Esperá un minuto y volvé a probar.";
  }

  return `Demasiados intentos. Esperá ${minutes} minutos y volvé a probar.`;
}

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const ip = getClientIp();

  const rateLimit = checkRateLimit({
    key: buildRateLimitKey(["login", ip, email]),
    limit: isProduction() ? 5 : 30,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return {
      ok: false,
      message: getRateLimitMessage(rateLimit.retryAfterSeconds),
    };
  }

  const result = await loginUser({
    email,
    password,
  });

  if (!result.ok) {
    return {
      ok: false,
      message: result.message,
    };
  }

  setSessionCookie(result.token);

  return {
    ok: true,
    message: "Inicio de sesión correcto.",
    redirectTo: result.redirectTo,
  };
}

export async function registroAction(
  _prevState: RegistroActionState,
  formData: FormData,
): Promise<RegistroActionState> {
  const email = String(formData.get("email") || "");
  const dni = String(formData.get("dni") || "");
  const ip = getClientIp();

  const rateLimit = checkRateLimit({
    key: buildRateLimitKey(["registro", ip, email, dni]),
    limit: isProduction() ? 5 : 20,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return {
      ok: false,
      message: getRateLimitMessage(rateLimit.retryAfterSeconds),
    };
  }

  const result = await registrarUsuario({
    nombre: String(formData.get("nombre") || ""),
    apellido: String(formData.get("apellido") || ""),
    dni,
    email,
    password: String(formData.get("password") || ""),
    confirmarPassword: String(formData.get("confirmarPassword") || ""),
  });

  return result;
}

export async function cambiarPasswordAction(
  _prevState: CambiarPasswordActionState,
  formData: FormData,
): Promise<CambiarPasswordActionState> {
  const user = await getCurrentUser();

  if (!user) {
    deleteSessionCookie();
    redirect("/login");
  }

  const ip = getClientIp();

  const rateLimit = checkRateLimit({
    key: buildRateLimitKey(["cambiar-password", ip, user.userId]),
    limit: isProduction() ? 8 : 30,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return {
      ok: false,
      message: getRateLimitMessage(rateLimit.retryAfterSeconds),
    };
  }

  const result = await cambiarPasswordUsuario(user.userId, {
    actualPassword: String(formData.get("actualPassword") || ""),
    nuevaPassword: String(formData.get("nuevaPassword") || ""),
    confirmarPassword: String(formData.get("confirmarPassword") || ""),
  });

  if (!result.ok) {
    return {
      ok: false,
      message: result.message,
    };
  }

  if (!result.token) {
    return {
      ok: false,
      message: "No se pudo renovar la sesión. Iniciá sesión nuevamente.",
    };
  }

  setSessionCookie(result.token);

  return {
    ok: true,
    message: result.message,
    redirectTo: result.redirectTo || "/login",
  };
}

export async function logoutAction() {
  deleteSessionCookie();

  return {
    ok: true,
  };
}
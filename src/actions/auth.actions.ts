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

// // src/actions/auth.actions.ts

// "use server";

// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import {
//   cambiarPasswordUsuario,
//   loginUser,
//   registrarUsuario,
// } from "@/services/auth.service";
// import { getCurrentUser } from "@/lib/current-user";
// import { deleteSessionCookie, setSessionCookie } from "@/lib/session";
// import { buildRateLimitKey, checkRateLimit } from "@/lib/rate-limit";

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

// function isProduction() {
//   return process.env.NODE_ENV === "production";
// }

// function getClientIp() {
//   const h = headers();

//   const forwardedFor = h.get("x-forwarded-for");

//   if (forwardedFor) {
//     return forwardedFor.split(",")[0]?.trim() || "unknown";
//   }

//   return (
//     h.get("x-real-ip") ||
//     h.get("cf-connecting-ip") ||
//     h.get("x-client-ip") ||
//     "unknown"
//   );
// }

// function getRateLimitMessage(seconds: number) {
//   const minutes = Math.ceil(seconds / 60);

//   if (minutes <= 1) {
//     return "Demasiados intentos. Esperá un minuto y volvé a probar.";
//   }

//   return `Demasiados intentos. Esperá ${minutes} minutos y volvé a probar.`;
// }

// export async function loginAction(
//   _prevState: LoginActionState,
//   formData: FormData,
// ): Promise<LoginActionState> {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const ip = getClientIp();

//   const rateLimit = checkRateLimit({
//     key: buildRateLimitKey(["login", ip, email]),
//     limit: isProduction() ? 5 : 30,
//     windowMs: 10 * 60 * 1000,
//   });

//   if (!rateLimit.allowed) {
//     return {
//       ok: false,
//       message: getRateLimitMessage(rateLimit.retryAfterSeconds),
//     };
//   }

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
//   const email = String(formData.get("email") || "");
//   const dni = String(formData.get("dni") || "");
//   const ip = getClientIp();

//   const rateLimit = checkRateLimit({
//     key: buildRateLimitKey(["registro", ip, email, dni]),
//     limit: isProduction() ? 5 : 20,
//     windowMs: 60 * 60 * 1000,
//   });

//   if (!rateLimit.allowed) {
//     return {
//       ok: false,
//       message: getRateLimitMessage(rateLimit.retryAfterSeconds),
//     };
//   }

//   const result = await registrarUsuario({
//     nombre: String(formData.get("nombre") || ""),
//     apellido: String(formData.get("apellido") || ""),
//     dni,
//     email,
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
//     deleteSessionCookie();
//     redirect("/login");
//   }

//   const ip = getClientIp();

//   const rateLimit = checkRateLimit({
//     key: buildRateLimitKey(["cambiar-password", ip, user.userId]),
//     limit: isProduction() ? 8 : 30,
//     windowMs: 10 * 60 * 1000,
//   });

//   if (!rateLimit.allowed) {
//     return {
//       ok: false,
//       message: getRateLimitMessage(rateLimit.retryAfterSeconds),
//     };
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

//   if (!result.token) {
//     return {
//       ok: false,
//       message: "No se pudo renovar la sesión. Iniciá sesión nuevamente.",
//     };
//   }

//   setSessionCookie(result.token);

//   return {
//     ok: true,
//     message: result.message,
//     redirectTo: result.redirectTo || "/login",
//   };
// }

// export async function logoutAction() {
//   deleteSessionCookie();

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
import { registrarAuditLog } from "@/services/audit.service";

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

function getRequestMeta() {
  const h = headers();

  const forwardedFor = h.get("x-forwarded-for");

  const ip = forwardedFor
    ? forwardedFor.split(",")[0]?.trim() || "unknown"
    : h.get("x-real-ip") ||
      h.get("cf-connecting-ip") ||
      h.get("x-client-ip") ||
      "unknown";

  return {
    ip,
    userAgent: h.get("user-agent") || "unknown",
  };
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
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const requestMeta = getRequestMeta();

  const rateLimit = checkRateLimit({
    key: buildRateLimitKey(["login", requestMeta.ip, email]),
    limit: isProduction() ? 5 : 30,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    const message = getRateLimitMessage(rateLimit.retryAfterSeconds);

    await registrarAuditLog({
      action: "AUTH_LOGIN_RATE_LIMIT",
      resultado: "warning",
      entidadTipo: "Usuario",
      entidadLabel: email || "sin-email",
      mensaje: message,
      metadata: {
        email,
        remaining: rateLimit.remaining,
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      request: requestMeta,
    });

    return {
      ok: false,
      message,
    };
  }

  const result = await loginUser({
    email,
    password,
  });

  if (!result.ok) {
    await registrarAuditLog({
      action: "AUTH_LOGIN_FAILED",
      resultado: "failure",
      entidadTipo: "Usuario",
      entidadLabel: email || "sin-email",
      mensaje: result.message,
      metadata: {
        email,
      },
      request: requestMeta,
    });

    return {
      ok: false,
      message: result.message,
    };
  }

  setSessionCookie(result.token);

  await registrarAuditLog({
    action: "AUTH_LOGIN_SUCCESS",
    resultado: "success",
    actor: {
      userId: result.user.id,
      nombre: `${result.user.nombre} ${result.user.apellido}`.trim(),
      email: result.user.email,
      rol: result.user.rol,
    },
    entidadTipo: "Usuario",
    entidadId: result.user.id,
    entidadLabel: result.user.email,
    mensaje: "Inicio de sesión correcto.",
    request: requestMeta,
  });

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
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const dni = String(formData.get("dni") || "").trim();
  const requestMeta = getRequestMeta();

  const rateLimit = checkRateLimit({
    key: buildRateLimitKey(["registro", requestMeta.ip, email, dni]),
    limit: isProduction() ? 5 : 20,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    const message = getRateLimitMessage(rateLimit.retryAfterSeconds);

    await registrarAuditLog({
      action: "AUTH_REGISTRO_RATE_LIMIT",
      resultado: "warning",
      entidadTipo: "Usuario",
      entidadLabel: email || dni || "sin-datos",
      mensaje: message,
      metadata: {
        email,
        dni,
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      request: requestMeta,
    });

    return {
      ok: false,
      message,
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

  await registrarAuditLog({
    action: result.ok ? "AUTH_REGISTRO_SUCCESS" : "AUTH_REGISTRO_FAILED",
    resultado: result.ok ? "success" : "failure",
    entidadTipo: "Usuario",
    entidadLabel: email || dni || "sin-datos",
    mensaje: result.message,
    metadata: {
      email,
      dni,
      ok: result.ok,
    },
    request: requestMeta,
  });

  return result;
}

export async function cambiarPasswordAction(
  _prevState: CambiarPasswordActionState,
  formData: FormData,
): Promise<CambiarPasswordActionState> {
  const requestMeta = getRequestMeta();
  const user = await getCurrentUser();

  if (!user) {
    deleteSessionCookie();

    await registrarAuditLog({
      action: "AUTH_CAMBIAR_PASSWORD_SIN_SESION",
      resultado: "warning",
      mensaje: "Intento de cambio de contraseña sin sesión válida.",
      request: requestMeta,
    });

    redirect("/login");
  }

  const rateLimit = checkRateLimit({
    key: buildRateLimitKey(["cambiar-password", requestMeta.ip, user.userId]),
    limit: isProduction() ? 8 : 30,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    const message = getRateLimitMessage(rateLimit.retryAfterSeconds);

    await registrarAuditLog({
      action: "AUTH_CAMBIAR_PASSWORD_RATE_LIMIT",
      resultado: "warning",
      actor: {
        userId: user.userId,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
      entidadTipo: "Usuario",
      entidadId: user.userId,
      entidadLabel: user.email,
      mensaje: message,
      metadata: {
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      request: requestMeta,
    });

    return {
      ok: false,
      message,
    };
  }

  const result = await cambiarPasswordUsuario(user.userId, {
    actualPassword: String(formData.get("actualPassword") || ""),
    nuevaPassword: String(formData.get("nuevaPassword") || ""),
    confirmarPassword: String(formData.get("confirmarPassword") || ""),
  });

  if (!result.ok) {
    await registrarAuditLog({
      action: "AUTH_CAMBIAR_PASSWORD_FAILED",
      resultado: "failure",
      actor: {
        userId: user.userId,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
      entidadTipo: "Usuario",
      entidadId: user.userId,
      entidadLabel: user.email,
      mensaje: result.message,
      request: requestMeta,
    });

    return {
      ok: false,
      message: result.message,
    };
  }

  if (!result.token) {
    await registrarAuditLog({
      action: "AUTH_CAMBIAR_PASSWORD_TOKEN_MISSING",
      resultado: "failure",
      actor: {
        userId: user.userId,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
      entidadTipo: "Usuario",
      entidadId: user.userId,
      entidadLabel: user.email,
      mensaje: "La contraseña cambió, pero no se pudo renovar la sesión.",
      request: requestMeta,
    });

    return {
      ok: false,
      message: "No se pudo renovar la sesión. Iniciá sesión nuevamente.",
    };
  }

  setSessionCookie(result.token);

  await registrarAuditLog({
    action: "AUTH_CAMBIAR_PASSWORD_SUCCESS",
    resultado: "success",
    actor: {
      userId: user.userId,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
    entidadTipo: "Usuario",
    entidadId: user.userId,
    entidadLabel: user.email,
    mensaje: result.message,
    request: requestMeta,
  });

  return {
    ok: true,
    message: result.message,
    redirectTo: result.redirectTo || "/login",
  };
}

export async function logoutAction() {
  const requestMeta = getRequestMeta();
  const user = await getCurrentUser();

  if (user) {
    await registrarAuditLog({
      action: "AUTH_LOGOUT",
      resultado: "success",
      actor: {
        userId: user.userId,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
      entidadTipo: "Usuario",
      entidadId: user.userId,
      entidadLabel: user.email,
      mensaje: "Sesión cerrada correctamente.",
      request: requestMeta,
    });
  }

  deleteSessionCookie();

  return {
    ok: true,
  };
}
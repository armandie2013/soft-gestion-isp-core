"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  cambiarPasswordUsuario,
  loginUser,
  registrarUsuario,
} from "@/services/auth.service";
import { getAuthCookieName } from "@/lib/jwt";
import { getCurrentUser } from "@/lib/current-user";

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

function setSessionCookie(token: string) {
  cookies().set({
    name: getAuthCookieName(),
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

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
  const result = await registrarUsuario({
    nombre: String(formData.get("nombre") || ""),
    apellido: String(formData.get("apellido") || ""),
    dni: String(formData.get("dni") || ""),
    email: String(formData.get("email") || ""),
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
    redirect("/login");
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

  setSessionCookie(result.token);

  return {
    ok: true,
    message: result.message,
    redirectTo: result.redirectTo,
  };
}

export async function logoutAction() {
  cookies().delete(getAuthCookieName());

  return {
    ok: true,
  };
}
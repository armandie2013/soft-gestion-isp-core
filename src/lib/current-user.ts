// import { cookies } from "next/headers";
// import { getAuthCookieName, verifyAuthToken } from "@/lib/jwt";

// export async function getCurrentUser() {
//   const token = cookies().get(getAuthCookieName())?.value;

//   if (!token) {
//     return null;
//   }

//   const user = await verifyAuthToken(token);

//   return user;
// }

// src/lib/current-user.ts

import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { getAuthCookieName, verifyAuthToken } from "@/lib/jwt";
import Usuario from "@/models/Usuario";
import type { UserRole } from "@/types/usuario.types";

export type CurrentUser = {
  userId: string;
  nombre: string;
  email: string;
  rol: UserRole;
  debeCambiarPassword: boolean;
  esProtegido: boolean;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const token = cookies().get(getAuthCookieName())?.value;

  if (!token) {
    return null;
  }

  const tokenUser = await verifyAuthToken(token);

  if (!tokenUser) {
    return null;
  }

  await connectDB();

  const usuario = await Usuario.findById(tokenUser.userId).lean();

  if (!usuario) {
    return null;
  }

  if (usuario.estado !== "activo") {
    return null;
  }

  return {
    userId: usuario._id.toString(),
    nombre: usuario.nombre || tokenUser.nombre,
    email: usuario.email || tokenUser.email,
    rol: usuario.rol as UserRole,
    debeCambiarPassword: Boolean(usuario.debeCambiarPassword),
    esProtegido: Boolean(usuario.esProtegido),
  };
}
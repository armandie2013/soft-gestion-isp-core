// import { SignJWT, jwtVerify } from "jose";
// import type { UserRole } from "@/types/usuario.types";

// const AUTH_COOKIE_NAME = "soft_gestion_isp_session";

// export type AuthTokenPayload = {
//   userId: string;
//   nombre: string;
//   email: string;
//   rol: UserRole;
//   debeCambiarPassword: boolean;
// };

// function getAuthSecret() {
//   const secret = process.env.AUTH_SECRET;

//   if (!secret) {
//     throw new Error("Falta configurar AUTH_SECRET en .env.local");
//   }

//   return new TextEncoder().encode(secret);
// }

// export function getAuthCookieName() {
//   return AUTH_COOKIE_NAME;
// }

// export async function createAuthToken(payload: AuthTokenPayload) {
//   const secret = getAuthSecret();

//   return new SignJWT({
//     userId: payload.userId,
//     nombre: payload.nombre,
//     email: payload.email,
//     rol: payload.rol,
//     debeCambiarPassword: payload.debeCambiarPassword,
//   })
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("12h")
//     .sign(secret);
// }

// export async function verifyAuthToken(token: string) {
//   try {
//     const secret = getAuthSecret();

//     const { payload } = await jwtVerify(token, secret);

//     if (
//       typeof payload.userId !== "string" ||
//       typeof payload.nombre !== "string" ||
//       typeof payload.email !== "string" ||
//       typeof payload.rol !== "string"
//     ) {
//       return null;
//     }

//     return {
//       userId: payload.userId,
//       nombre: payload.nombre,
//       email: payload.email,
//       rol: payload.rol as UserRole,
//       debeCambiarPassword:
//         typeof payload.debeCambiarPassword === "boolean"
//           ? payload.debeCambiarPassword
//           : false,
//     };
//   } catch {
//     return null;
//   }
// }

// src/lib/jwt.ts

import { SignJWT, jwtVerify } from "jose";
import type { UserRole } from "@/types/usuario.types";

const AUTH_COOKIE_NAME = "soft_gestion_isp_session";
const TOKEN_EXPIRES_IN = "12h";

export type AuthTokenPayload = {
  userId: string;
  nombre: string;
  email: string;
  rol: UserRole;
  debeCambiarPassword: boolean;
};

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("Falta configurar AUTH_SECRET en .env.local");
  }

  if (isProduction() && secret.length < 32) {
    throw new Error(
      "AUTH_SECRET es demasiado corto para producción. Usá una clave privada de al menos 32 caracteres.",
    );
  }

  return new TextEncoder().encode(secret);
}

export function getAuthCookieName() {
  return AUTH_COOKIE_NAME;
}

export async function createAuthToken(payload: AuthTokenPayload) {
  const secret = getAuthSecret();

  return new SignJWT({
    userId: payload.userId,
    nombre: payload.nombre,
    email: payload.email,
    rol: payload.rol,
    debeCambiarPassword: payload.debeCambiarPassword,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRES_IN)
    .sign(secret);
}

export async function verifyAuthToken(token: string) {
  try {
    const secret = getAuthSecret();

    const { payload } = await jwtVerify(token, secret);

    if (
      typeof payload.userId !== "string" ||
      typeof payload.nombre !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.rol !== "string"
    ) {
      return null;
    }

    if (
      payload.rol !== "admin" &&
      payload.rol !== "cobrador" &&
      payload.rol !== "cliente"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      nombre: payload.nombre,
      email: payload.email,
      rol: payload.rol as UserRole,
      debeCambiarPassword:
        typeof payload.debeCambiarPassword === "boolean"
          ? payload.debeCambiarPassword
          : false,
    };
  } catch {
    return null;
  }
}
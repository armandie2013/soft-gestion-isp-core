// src/lib/session.ts

import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getAuthCookieName } from "@/lib/jwt";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

export function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function getSessionMaxAge() {
  return SESSION_MAX_AGE_SECONDS;
}

export function getSessionCookieOptions(): Partial<ResponseCookie> {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

export function setSessionCookie(token: string) {
  cookies().set({
    name: getAuthCookieName(),
    value: token,
    ...getSessionCookieOptions(),
  });
}

export function deleteSessionCookie() {
  cookies().delete(getAuthCookieName());
}
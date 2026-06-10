// ANTES ESTABA VACIO //

// src/app/api/auth/logout/route.ts

import { NextResponse } from "next/server";
import { getAuthCookieName } from "@/lib/jwt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({
    ok: true,
    message: "Sesión cerrada correctamente.",
  });

  response.cookies.delete(getAuthCookieName());

  return response;
}

export async function GET() {
  const response = NextResponse.redirect(new URL("/login", "http://localhost"));

  response.cookies.delete(getAuthCookieName());

  return response;
}
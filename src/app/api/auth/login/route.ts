// ANTES ESTABA VACIO //

// src/app/api/auth/login/route.ts

import { NextResponse, type NextRequest } from "next/server";
import { getAuthCookieName } from "@/lib/jwt";
import { getSessionCookieOptions } from "@/lib/session";
import { buildRateLimitKey, checkRateLimit } from "@/lib/rate-limit";
import { loginUser } from "@/services/auth.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-client-ip") ||
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const email = String(body.email || "");
    const password = String(body.password || "");
    const ip = getClientIp(request);

    const rateLimit = checkRateLimit({
      key: buildRateLimitKey(["api-login", ip, email]),
      limit: isProduction() ? 5 : 30,
      windowMs: 10 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          message: getRateLimitMessage(rateLimit.retryAfterSeconds),
        },
        {
          status: 429,
        },
      );
    }

    const result = await loginUser({
      email,
      password,
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: result.message,
        },
        {
          status: 401,
        },
      );
    }

    const response = NextResponse.json({
      ok: true,
      message: "Inicio de sesión correcto.",
      redirectTo: result.redirectTo,
      user: result.user,
    });

    response.cookies.set({
      name: getAuthCookieName(),
      value: result.token,
      ...getSessionCookieOptions(),
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "No se pudo iniciar sesión.",
      },
      {
        status: 500,
      },
    );
  }
}
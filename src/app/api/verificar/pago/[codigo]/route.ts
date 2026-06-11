// import { NextResponse } from "next/server";
// import { verificarPagoPorCodigo } from "@/services/comprobante.service";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// type RouteProps = {
//   params: {
//     codigo: string;
//   };
// };

// export async function GET(_request: Request, { params }: RouteProps) {
//   const resultado = await verificarPagoPorCodigo(params.codigo);

//   return NextResponse.json(resultado, {
//     status: resultado.valido ? 200 : 404,
//     headers: {
//       "Cache-Control": "no-store",
//     },
//   });
// }

// src/app/api/verificar/pago/[codigo]/route.ts

import { NextResponse, type NextRequest } from "next/server";
import { verificarPagoPorCodigo } from "@/services/comprobante.service";
import { buildRateLimitKey, checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteProps = {
  params: {
    codigo: string;
  };
};

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
    return "Demasiadas verificaciones. Esperá un minuto y volvé a probar.";
  }

  return `Demasiadas verificaciones. Esperá ${minutes} minutos y volvé a probar.`;
}

function verificarRateLimit(ip: string, codigo: string) {
  const limiteGeneral = checkRateLimit({
    key: buildRateLimitKey(["verificar-pago", ip]),
    limit: isProduction() ? 60 : 300,
    windowMs: 10 * 60 * 1000,
  });

  if (!limiteGeneral.allowed) {
    return limiteGeneral;
  }

  const limitePorCodigo = checkRateLimit({
    key: buildRateLimitKey(["verificar-pago-codigo", ip, codigo]),
    limit: isProduction() ? 10 : 60,
    windowMs: 10 * 60 * 1000,
  });

  return limitePorCodigo;
}

export async function GET(request: NextRequest, { params }: RouteProps) {
  const codigo = String(params.codigo || "").trim().toUpperCase();
  const ip = getClientIp(request);

  const rateLimit = verificarRateLimit(ip, codigo);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        valido: false,
        mensaje: getRateLimitMessage(rateLimit.retryAfterSeconds),
      },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const resultado = await verificarPagoPorCodigo(codigo);

  return NextResponse.json(resultado, {
    status: resultado.valido ? 200 : 404,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
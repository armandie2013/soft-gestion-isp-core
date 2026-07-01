import { NextResponse } from "next/server";
import { generarFacturacionManual } from "@/services/movimiento-financiero.service";

function getInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getPeriodoSiguiente(date: Date) {
  const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  return {
    mes: next.getMonth() + 1,
    anio: next.getFullYear(),
  };
}

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();

  if (!secret) {
    return false;
  }

  const authorization = request.headers.get("authorization") || "";
  const bearer = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  const url = new URL(request.url);
  const token = url.searchParams.get("token")?.trim() || "";

  return bearer === secret || token === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, message: "No autorizado." },
      { status: 401 },
    );
  }

  const now = new Date();
  const periodoSiguiente = getPeriodoSiguiente(now);
  const fechaCorte = getInputDate(now);

  const result = await generarFacturacionManual(
    {
      referenciaMes: periodoSiguiente.mes,
      referenciaAnio: periodoSiguiente.anio,
      fechaCorte,
      observacion: "Ejecución automática por cron.",
      origenFacturacion: "cron",
    },
    {
      userId: process.env.CRON_SYSTEM_USER_ID || "000000000000000000000000",
      nombre: "Sistema cron",
      rol: "sistema",
    },
  );

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
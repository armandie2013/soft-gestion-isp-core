// src/services/audit.service.ts

import { connectDB } from "@/lib/db";
import AuditLog, { type AuditLogResultado } from "@/models/AuditLog";

type AuditActor = {
  userId?: string | null;
  nombre?: string | null;
  email?: string | null;
  rol?: string | null;
};

type AuditMeta = {
  ip?: string | null;
  userAgent?: string | null;
};

type RegistrarAuditLogInput = {
  action: string;
  resultado?: AuditLogResultado;
  actor?: AuditActor | null;
  entidadTipo?: string | null;
  entidadId?: string | null;
  entidadLabel?: string | null;
  mensaje?: string | null;
  metadata?: Record<string, unknown> | null;
  request?: AuditMeta | null;
};

const SENSITIVE_KEYS = [
  "password",
  "contraseña",
  "actualPassword",
  "nuevaPassword",
  "confirmarPassword",
  "passwordTemporal",
  "token",
  "secret",
  "firma",
];

function limpiarTexto(value?: string | null) {
  const text = String(value || "").trim();

  if (!text) {
    return null;
  }

  return text.slice(0, 500);
}

function limpiarMetadata(metadata?: Record<string, unknown> | null) {
  if (!metadata) {
    return null;
  }

  const clean: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(metadata)) {
    const keyLower = key.toLowerCase();

    if (SENSITIVE_KEYS.some((sensitive) => keyLower.includes(sensitive))) {
      clean[key] = "[REDACTED]";
      continue;
    }

    if (typeof value === "string") {
      clean[key] = value.slice(0, 500);
      continue;
    }

    if (
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      clean[key] = value;
      continue;
    }

    clean[key] = String(value).slice(0, 500);
  }

  return clean;
}

export async function registrarAuditLog(input: RegistrarAuditLogInput) {
  try {
    await connectDB();

    await AuditLog.create({
      action: limpiarTexto(input.action) || "ACCION_SIN_NOMBRE",
      resultado: input.resultado || "info",

      actorId: limpiarTexto(input.actor?.userId),
      actorNombre: limpiarTexto(input.actor?.nombre),
      actorEmail: limpiarTexto(input.actor?.email)?.toLowerCase() || null,
      actorRol: limpiarTexto(input.actor?.rol),

      entidadTipo: limpiarTexto(input.entidadTipo),
      entidadId: limpiarTexto(input.entidadId),
      entidadLabel: limpiarTexto(input.entidadLabel),

      ip: limpiarTexto(input.request?.ip),
      userAgent: limpiarTexto(input.request?.userAgent),

      mensaje: limpiarTexto(input.mensaje),
      metadata: limpiarMetadata(input.metadata),
    });
  } catch (error) {
    console.error("[audit] No se pudo registrar auditoría:", error);
  }
}
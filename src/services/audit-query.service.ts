// src/services/audit-query.service.ts

import { connectDB } from "@/lib/db";
import AuditLog, { type AuditLogResultado } from "@/models/AuditLog";

export type AuditLogSafe = {
  id: string;
  action: string;
  resultado: AuditLogResultado;
  actorId: string | null;
  actorNombre: string | null;
  actorEmail: string | null;
  actorRol: string | null;
  entidadTipo: string | null;
  entidadId: string | null;
  entidadLabel: string | null;
  ip: string | null;
  userAgent: string | null;
  mensaje: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
};

export type AuditLogResumen = {
  total: number;
  success: number;
  failure: number;
  warning: number;
  info: number;
};

export type ObtenerAuditLogsInput = {
  resultado?: string;
  limit?: number;
};

const RESULTADOS_VALIDOS: AuditLogResultado[] = [
  "success",
  "failure",
  "warning",
  "info",
];

function normalizarResultado(value?: string): AuditLogResultado | undefined {
  if (!value) return undefined;

  const normalized = value.trim().toLowerCase();

  if (RESULTADOS_VALIDOS.includes(normalized as AuditLogResultado)) {
    return normalized as AuditLogResultado;
  }

  return undefined;
}

function toSafeLog(log: any): AuditLogSafe {
  return {
    id: String(log._id),
    action: String(log.action || "ACCION_SIN_NOMBRE"),
    resultado: (log.resultado || "info") as AuditLogResultado,
    actorId: log.actorId ? String(log.actorId) : null,
    actorNombre: log.actorNombre ? String(log.actorNombre) : null,
    actorEmail: log.actorEmail ? String(log.actorEmail) : null,
    actorRol: log.actorRol ? String(log.actorRol) : null,
    entidadTipo: log.entidadTipo ? String(log.entidadTipo) : null,
    entidadId: log.entidadId ? String(log.entidadId) : null,
    entidadLabel: log.entidadLabel ? String(log.entidadLabel) : null,
    ip: log.ip ? String(log.ip) : null,
    userAgent: log.userAgent ? String(log.userAgent) : null,
    mensaje: log.mensaje ? String(log.mensaje) : null,
    metadata: log.metadata || null,
    createdAt:
      log.createdAt instanceof Date
        ? log.createdAt.toISOString()
        : new Date(log.createdAt).toISOString(),
  };
}

export async function obtenerAuditLogs(input: ObtenerAuditLogsInput = {}) {
  await connectDB();

  const resultado = normalizarResultado(input.resultado);
  const limit = Math.min(Math.max(Number(input.limit || 100), 1), 200);

  const query = resultado ? { resultado } : {};

  const [logs, resumenRaw] = await Promise.all([
    AuditLog.find(query).sort({ createdAt: -1 }).limit(limit).lean(),
    AuditLog.aggregate([
      {
        $group: {
          _id: "$resultado",
          total: { $sum: 1 },
        },
      },
    ]),
  ]);

  const resumen: AuditLogResumen = {
    total: 0,
    success: 0,
    failure: 0,
    warning: 0,
    info: 0,
  };

  for (const item of resumenRaw) {
    const key = String(item._id || "info") as AuditLogResultado;
    const total = Number(item.total || 0);

    resumen.total += total;

    if (key === "success") resumen.success = total;
    if (key === "failure") resumen.failure = total;
    if (key === "warning") resumen.warning = total;
    if (key === "info") resumen.info = total;
  }

  return {
    logs: logs.map(toSafeLog),
    resumen,
    filtroResultado: resultado || "todos",
  };
}
import type { PlanType } from "@/types/plan.types";

export const CLIENTE_PLAN_HISTORIAL_MOTIVOS = [
  "alta",
  "cambio_plan",
  "reactivacion",
  "correccion_admin",
] as const;

export type ClientePlanHistorialMotivo =
  (typeof CLIENTE_PLAN_HISTORIAL_MOTIVOS)[number];

export type ClientePlanHistorialSafe = {
  id: string;
  clienteId: string;
  planId: string;
  planNombre: string;
  planTipo: PlanType;
  planImporte: number;
  fechaDesde: string;
  fechaHasta: string | null;
  motivo: ClientePlanHistorialMotivo;
  observacion: string;
  creadoEn: string;
  actualizadoEn: string;
};
import type { PlanSafe } from "@/types/plan.types";

export const CLIENTE_STATUSES = ["activo", "suspendido", "baja"] as const;

export type ClienteStatus = (typeof CLIENTE_STATUSES)[number];

export type ClienteSafe = {
  id: string;
  numeroCliente: number;
  nombre: string;
  apellido: string;
  dni: string;
  direccion: string;
  localidad: string;
  provincia: string;
  telefono: string;
  email: string;
  planId: string;
  plan?: PlanSafe | null;
  fechaAlta: string;
  ultimoCambioPlan?: string | null;
  estado: ClienteStatus;
  usuarioId?: string | null;
  creadoEn: string;
  actualizadoEn: string;
};

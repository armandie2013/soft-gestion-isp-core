// export const PLAN_STATUSES = ["activo", "inactivo"] as const;

// export type PlanStatus = (typeof PLAN_STATUSES)[number];

// export const PLAN_TYPES = [
//   "residencial",
//   "comercial",
//   "corporativo",
//   "dedicado",
//   "otro",
// ] as const;

// export type PlanType = (typeof PLAN_TYPES)[number];

// export type PlanSafe = {
//   id: string;
//   nombre: string;
//   tipo: PlanType;
//   detalle: string;
//   importe: number;
//   estado: PlanStatus;
//   creadoEn: string;
//   actualizadoEn: string;
// };

// src/types/plan.types.ts

// src/types/plan.types.ts

export const PLAN_TYPES = [
  "residencial",
  "comercial",
  "corporativo",
  "dedicado",
  "otro",
] as const;

export const PLAN_STATUSES = ["activo", "inactivo"] as const;

export type PlanType = (typeof PLAN_TYPES)[number];

export type PlanStatus = (typeof PLAN_STATUSES)[number];

export type PlanSafe = {
  id: string;
  nombre: string;
  tipo: PlanType;
  detalle: string;
  importe: number;
  estado: PlanStatus;
  creadoEn: string;
  actualizadoEn: string;
};
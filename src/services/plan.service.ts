// src/services/plan.service.ts

import mongoose from "mongoose";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";
import type { PlanSafe, PlanStatus, PlanType } from "@/types/plan.types";

const importeEnteroFromForm = z.coerce
  .number({
    message: "El importe debe ser un número válido.",
  })
  .int("El importe no puede tener decimales.")
  .min(0, "El importe no puede ser negativo.");

export const crearPlanSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(80, "El nombre no puede superar los 80 caracteres."),

  tipo: z.enum(
    ["residencial", "comercial", "corporativo", "dedicado", "otro"],
    {
      message: "Tipo de plan inválido.",
    },
  ),

  detalle: z
    .string()
    .trim()
    .min(2, "El detalle debe tener al menos 2 caracteres.")
    .max(300, "El detalle no puede superar los 300 caracteres."),

  importe: importeEnteroFromForm,

  estado: z.enum(["activo", "inactivo"], {
    message: "Estado inválido.",
  }),
});

export const actualizarPlanSchema = crearPlanSchema.extend({
  id: z.string().min(1, "Falta el ID del plan."),
});

export const eliminarPlanSchema = z.object({
  id: z.string().min(1, "Falta el ID del plan."),
});

export type CrearPlanInput = z.infer<typeof crearPlanSchema>;
export type ActualizarPlanInput = z.infer<typeof actualizarPlanSchema>;
export type EliminarPlanInput = z.infer<typeof eliminarPlanSchema>;

function validarObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function normalizarOrden(value: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function ordenarPlanes(a: PlanSafe, b: PlanSafe) {
  if (a.estado !== b.estado) {
    return a.estado === "activo" ? -1 : 1;
  }

  const nombreA = normalizarOrden(a.nombre);
  const nombreB = normalizarOrden(b.nombre);

  return nombreA.localeCompare(nombreB, "es");
}

function toSafePlan(plan: any): PlanSafe {
  return {
    id: plan._id.toString(),
    nombre: plan.nombre || "",
    tipo: plan.tipo as PlanType,
    detalle: plan.detalle || "",
    importe: Number(plan.importe || 0),
    estado: plan.estado as PlanStatus,
    creadoEn: plan.creadoEn?.toISOString?.() || "",
    actualizadoEn: plan.actualizadoEn?.toISOString?.() || "",
  };
}

export async function obtenerPlanes() {
  await connectDB();

  const planes = await Plan.find().lean();

  return planes.map(toSafePlan).sort(ordenarPlanes);
}

export async function obtenerPlanesActivos() {
  await connectDB();

  const planes = await Plan.find({ estado: "activo" }).lean();

  return planes
    .map(toSafePlan)
    .sort((a, b) =>
      normalizarOrden(a.nombre).localeCompare(normalizarOrden(b.nombre), "es"),
    );
}

export async function obtenerPlanPorId(id: string) {
  if (!validarObjectId(id)) {
    return null;
  }

  await connectDB();

  const plan = await Plan.findById(id).lean();

  if (!plan) {
    return null;
  }

  return toSafePlan(plan);
}

export async function crearPlan(input: CrearPlanInput) {
  const parsed = crearPlanSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  await connectDB();

  const { nombre, tipo, detalle, importe, estado } = parsed.data;

  const nombreNormalizado = nombre.trim();

  const existe = await Plan.findOne({
    nombre: new RegExp(`^${nombreNormalizado}$`, "i"),
  }).lean();

  if (existe) {
    return {
      ok: false,
      message: "Ya existe un plan registrado con ese nombre.",
    };
  }

  await Plan.create({
    nombre: nombreNormalizado,
    tipo,
    detalle: detalle.trim(),
    importe,
    estado,
  });

  return {
    ok: true,
    message: "Plan creado correctamente.",
  };
}

export async function actualizarPlan(input: ActualizarPlanInput) {
  const parsed = actualizarPlanSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  const { id, nombre, tipo, detalle, importe, estado } = parsed.data;

  if (!validarObjectId(id)) {
    return {
      ok: false,
      message: "ID de plan inválido.",
    };
  }

  await connectDB();

  const plan = await Plan.findById(id);

  if (!plan) {
    return {
      ok: false,
      message: "Plan no encontrado.",
    };
  }

  const nombreNormalizado = nombre.trim();

  const existeNombre = await Plan.findOne({
    nombre: new RegExp(`^${nombreNormalizado}$`, "i"),
    _id: { $ne: id },
  }).lean();

  if (existeNombre) {
    return {
      ok: false,
      message: "Ya existe otro plan registrado con ese nombre.",
    };
  }

  plan.nombre = nombreNormalizado;
  plan.tipo = tipo;
  plan.detalle = detalle.trim();
  plan.importe = importe;
  plan.estado = estado;

  await plan.save();

  return {
    ok: true,
    message: "Plan actualizado correctamente.",
  };
}

export async function eliminarPlan(input: EliminarPlanInput) {
  const parsed = eliminarPlanSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  const { id } = parsed.data;

  if (!validarObjectId(id)) {
    return {
      ok: false,
      message: "ID de plan inválido.",
    };
  }

  await connectDB();

  const plan = await Plan.findById(id);

  if (!plan) {
    return {
      ok: false,
      message: "Plan no encontrado.",
    };
  }

  await Plan.deleteOne({ _id: id });

  return {
    ok: true,
    message: "Plan eliminado correctamente.",
  };
}
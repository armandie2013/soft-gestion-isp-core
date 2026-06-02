import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Cliente from "@/models/Cliente";
import Plan from "@/models/Plan";
import { obtenerEstadoCuentaCliente } from "@/services/movimiento-financiero.service";
import type { ClienteSafe, ClienteStatus } from "@/types/cliente.types";
import type { PlanSafe, PlanStatus, PlanType } from "@/types/plan.types";

function validarObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function limpiarDni(dni: string) {
  return dni.replace(/\D/g, "").trim();
}

function toSafePlan(plan: any): PlanSafe | null {
  if (!plan) return null;

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

function toSafeCliente(cliente: any): ClienteSafe {
  const plan =
    cliente.planId && typeof cliente.planId === "object"
      ? toSafePlan(cliente.planId)
      : null;

  return {
    id: cliente._id.toString(),
    numeroCliente: Number(cliente.numeroCliente || 0),
    nombre: cliente.nombre || "",
    apellido: cliente.apellido || "",
    dni: cliente.dni || "",
    direccion: cliente.direccion || "",
    localidad: cliente.localidad || "",
    provincia: cliente.provincia || "",
    telefono: cliente.telefono || "",
    email: cliente.email || "",
    planId:
      cliente.planId && typeof cliente.planId === "object"
        ? cliente.planId._id.toString()
        : cliente.planId?.toString?.() || "",
    plan,
    estado: cliente.estado as ClienteStatus,
    usuarioId: cliente.usuarioId ? cliente.usuarioId.toString() : null,
    creadoEn: cliente.creadoEn?.toISOString?.() || "",
    actualizadoEn: cliente.actualizadoEn?.toISOString?.() || "",
  };
}

export async function buscarClientePorDniParaCobrador(dni: string) {
  const dniNormalizado = limpiarDni(dni);

  if (!dniNormalizado || dniNormalizado.length < 7) {
    return null;
  }

  await connectDB();

  const cliente = await Cliente.findOne({ dni: dniNormalizado })
    .populate({ path: "planId", model: Plan })
    .lean();

  if (!cliente) {
    return null;
  }

  return toSafeCliente(cliente);
}

export async function obtenerClienteParaCobrador(clienteId: string) {
  if (!validarObjectId(clienteId)) {
    return null;
  }

  await connectDB();

  const cliente = await Cliente.findById(clienteId)
    .populate({ path: "planId", model: Plan })
    .lean();

  if (!cliente) {
    return null;
  }

  return toSafeCliente(cliente);
}

export async function obtenerResumenClienteParaCobrador(clienteId: string) {
  const [cliente, estadoCuenta] = await Promise.all([
    obtenerClienteParaCobrador(clienteId),
    obtenerEstadoCuentaCliente(clienteId),
  ]);

  if (!cliente || !estadoCuenta) {
    return null;
  }

  const periodosPendientes = estadoCuenta.periodos.filter(
    (periodo) => periodo.saldoPeriodo > 0,
  );

  const totalPendiente = periodosPendientes.reduce(
    (acc, periodo) => acc + periodo.saldoPeriodo,
    0,
  );

  return {
    cliente,
    estadoCuenta,
    periodosPendientes,
    totalPendiente,
  };
}

/**
 * Alias usado por la vista:
 * src/app/(dashboard)/cobrador/buscar-cliente/page.tsx
 *
 * Lo dejamos separado para no romper las funciones que ya usaban
 * buscarClientePorDniParaCobrador().
 */
export async function buscarClienteParaCobradorPorDni(dni: string) {
  return buscarClientePorDniParaCobrador(dni);
}
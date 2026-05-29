"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import {
  crearNotaCredito,
  crearNotaDebito,
  generarFacturacionManual,
} from "@/services/movimiento-financiero.service";

export type MovimientoActionState = {
  ok: boolean;
  message: string;
};

export type FacturacionManualActionState = {
  ok: boolean;
  message: string;
  generadas?: number;
  omitidas?: number;
};

async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  return user;
}

function buildCreador(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) {
    throw new Error("Usuario no autenticado.");
  }

  return {
    userId: user.userId,
    nombre: user.nombre,
    rol: user.rol,
  };
}

export async function generarFacturacionManualAction(
  _prevState: FacturacionManualActionState,
  formData: FormData,
): Promise<FacturacionManualActionState> {
  const user = await requireAdmin();

  const result = await generarFacturacionManual(
    {
      referenciaMes: Number(formData.get("referenciaMes") || 0),
      referenciaAnio: Number(formData.get("referenciaAnio") || 0),
      observacion: String(formData.get("observacion") || ""),
    },
    buildCreador(user),
  );

  if (result.ok) {
    revalidatePath("/clientes");
    revalidatePath("/admin/configuracion/facturacion");
  }

  return result;
}

export async function crearNotaDebitoAction(
  _prevState: MovimientoActionState,
  formData: FormData,
): Promise<MovimientoActionState> {
  const user = await requireAdmin();

  const clienteId = String(formData.get("clienteId") || "");

  const result = await crearNotaDebito(
    {
      clienteId,
      facturaAsociadaId: String(formData.get("facturaAsociadaId") || ""),
      importe: Number(formData.get("importe") || 0),
      concepto: String(formData.get("concepto") || ""),
      observacion: String(formData.get("observacion") || ""),
    },
    buildCreador(user),
  );

  if (result.ok) {
    revalidatePath(`/clientes/${clienteId}`);
    revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
    revalidatePath(`/clientes/${clienteId}/nota-debito`);
  }

  return result;
}

export async function crearNotaCreditoAction(
  _prevState: MovimientoActionState,
  formData: FormData,
): Promise<MovimientoActionState> {
  const user = await requireAdmin();

  const clienteId = String(formData.get("clienteId") || "");

  const result = await crearNotaCredito(
    {
      clienteId,
      facturaAsociadaId: String(formData.get("facturaAsociadaId") || ""),
      importe: Number(formData.get("importe") || 0),
      concepto: String(formData.get("concepto") || ""),
      observacion: String(formData.get("observacion") || ""),
    },
    buildCreador(user),
  );

  if (result.ok) {
    revalidatePath(`/clientes/${clienteId}`);
    revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
    revalidatePath(`/clientes/${clienteId}/nota-credito`);
  }

  return result;
}
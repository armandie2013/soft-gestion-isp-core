"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import {
  confirmarCierreCajaCobrador,
  generarCodigoCierreCaja,
  registrarPagoCobrador,
  validarCodigoCierreCajaCobrador,
} from "@/services/cobro.service";

export type CobroActionState = {
  ok: boolean;
  message: string;
};

export type CodigoCierreActionState = {
  ok: boolean;
  message: string;
  codigo?: string;
  importe?: number;
};

async function requireCobrador() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  return user;
}

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

function buildUser(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) {
    throw new Error("Usuario no autenticado.");
  }

  return {
    userId: user.userId,
    nombre: user.nombre,
    rol: user.rol,
  };
}

export async function registrarPagoCobradorAction(
  _prevState: CobroActionState,
  formData: FormData,
): Promise<CobroActionState> {
  const user = await requireCobrador();

  const clienteId = String(formData.get("clienteId") || "");

  const result = await registrarPagoCobrador(
    {
      clienteId,
      facturaAsociadaId: String(formData.get("facturaAsociadaId") || ""),
      importe: Number(formData.get("importe") || 0),
      observacion: String(formData.get("observacion") || ""),
    },
    buildUser(user),
  );

  if (result.ok) {
    revalidatePath(`/cobrador/clientes/${clienteId}`);
    revalidatePath(`/cobrador/clientes/${clienteId}/pagar`);
    revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
    revalidatePath("/cobrador");
    revalidatePath("/cobrador/caja");
    revalidatePath("/admin/caja-cobradores");
  }

  return result;
}

export async function generarCodigoCierreCajaAction(
  _prevState: CodigoCierreActionState,
  formData: FormData,
): Promise<CodigoCierreActionState> {
  const user = await requireAdmin();

  const result = await generarCodigoCierreCaja(
    {
      cobradorId: String(formData.get("cobradorId") || ""),
    },
    buildUser(user),
  );

  revalidatePath("/admin/caja-cobradores");

  return {
    ok: result.ok,
    message: result.message,
    codigo: result.codigo?.codigo,
    importe: result.codigo?.importe,
  };
}

export async function validarCodigoCierreCajaAction(
  _prevState: CodigoCierreActionState,
  formData: FormData,
): Promise<CodigoCierreActionState> {
  const user = await requireCobrador();

  const result = await validarCodigoCierreCajaCobrador(
    {
      codigo: String(formData.get("codigo") || ""),
    },
    buildUser(user),
  );

  return {
    ok: result.ok,
    message: result.message,
    importe: result.importe,
  };
}

export async function confirmarCierreCajaAction(
  _prevState: CodigoCierreActionState,
  formData: FormData,
): Promise<CodigoCierreActionState> {
  const user = await requireCobrador();

  const result = await confirmarCierreCajaCobrador(
    {
      codigo: String(formData.get("codigo") || ""),
    },
    buildUser(user),
  );

  if (result.ok) {
    revalidatePath("/cobrador");
    revalidatePath("/cobrador/caja");
    revalidatePath("/cobrador/caja/cierre");
    revalidatePath("/admin/caja-cobradores");
  }

  return {
    ok: result.ok,
    message: result.message,
    importe: result.importe,
  };
}
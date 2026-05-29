"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  actualizarCliente,
  crearCliente,
  eliminarCliente,
} from "@/services/cliente.service";
import { getCurrentUser } from "@/lib/current-user";

export type ClienteActionState = {
  ok: boolean;
  message: string;
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

export async function crearClienteAction(
  _prevState: ClienteActionState,
  formData: FormData,
): Promise<ClienteActionState> {
  await requireAdmin();

  const result = await crearCliente({
    nombre: String(formData.get("nombre") || ""),
    apellido: String(formData.get("apellido") || ""),
    dni: String(formData.get("dni") || ""),
    direccion: String(formData.get("direccion") || ""),
    localidad: String(formData.get("localidad") || ""),
    provincia: String(formData.get("provincia") || ""),
    telefono: String(formData.get("telefono") || ""),
    email: String(formData.get("email") || ""),
    planId: String(formData.get("planId") || ""),
    estado: String(formData.get("estado") || "activo") as any,
  });

  if (!result.ok) {
    return result;
  }

  revalidatePath("/clientes");

  return result;
}

export async function actualizarClienteAction(
  _prevState: ClienteActionState,
  formData: FormData,
): Promise<ClienteActionState> {
  await requireAdmin();

  const id = String(formData.get("id") || "");

  const result = await actualizarCliente({
    id,
    nombre: String(formData.get("nombre") || ""),
    apellido: String(formData.get("apellido") || ""),
    dni: String(formData.get("dni") || ""),
    direccion: String(formData.get("direccion") || ""),
    localidad: String(formData.get("localidad") || ""),
    provincia: String(formData.get("provincia") || ""),
    telefono: String(formData.get("telefono") || ""),
    email: String(formData.get("email") || ""),
    planId: String(formData.get("planId") || ""),
    estado: String(formData.get("estado") || "activo") as any,
  });

  if (!result.ok) {
    return result;
  }

  revalidatePath("/clientes");
  revalidatePath(`/clientes/${id}`);
  revalidatePath(`/clientes/${id}/editar`);

  return result;
}

export async function eliminarClienteAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");

  await eliminarCliente({ id });

  revalidatePath("/clientes");
}
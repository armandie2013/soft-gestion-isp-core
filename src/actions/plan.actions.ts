"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  actualizarPlan,
  crearPlan,
  eliminarPlan,
} from "@/services/plan.service";
import { getCurrentUser } from "@/lib/current-user";

export type PlanActionState = {
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

export async function crearPlanAction(
  _prevState: PlanActionState,
  formData: FormData,
): Promise<PlanActionState> {
  await requireAdmin();

  const result = await crearPlan({
    nombre: String(formData.get("nombre") || ""),
    tipo: String(formData.get("tipo") || "residencial") as any,
    detalle: String(formData.get("detalle") || ""),
    importe: Number(formData.get("importe") || 0),
    estado: String(formData.get("estado") || "activo") as any,
  });

  if (!result.ok) {
    return result;
  }

  revalidatePath("/planes");

  return result;
}

export async function actualizarPlanAction(
  _prevState: PlanActionState,
  formData: FormData,
): Promise<PlanActionState> {
  await requireAdmin();

  const id = String(formData.get("id") || "");

  const result = await actualizarPlan({
    id,
    nombre: String(formData.get("nombre") || ""),
    tipo: String(formData.get("tipo") || "residencial") as any,
    detalle: String(formData.get("detalle") || ""),
    importe: Number(formData.get("importe") || 0),
    estado: String(formData.get("estado") || "activo") as any,
  });

  if (!result.ok) {
    return result;
  }

  revalidatePath("/planes");
  revalidatePath(`/planes/${id}/editar`);

  return result;
}

export async function eliminarPlanAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");

  await eliminarPlan({ id });

  revalidatePath("/planes");
}
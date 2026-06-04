// src/actions/caja-cobradores.actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { generarCodigoCierreCaja } from "@/services/cobro.service";

function buildRedirectUrl(type: "ok" | "error", message: string) {
  const params = new URLSearchParams();
  params.set(type, message);

  return `/admin/caja-cobradores?${params.toString()}`;
}

export async function generarCodigoCierreCajaAction(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  const cobradorId = String(formData.get("cobradorId") || "");

  const userData = user as any;

  const result = await generarCodigoCierreCaja(
    { cobradorId },
    {
      userId: userData.userId || userData.id || userData.sub || "",
      nombre:
        userData.nombre ||
        userData.name ||
        userData.email ||
        "Administrador",
      rol: userData.rol,
    },
  );

  revalidatePath("/admin/caja-cobradores");
  revalidatePath("/admin");

  if (!result.ok) {
    redirect(buildRedirectUrl("error", result.message));
  }

  redirect(buildRedirectUrl("ok", result.message));
}
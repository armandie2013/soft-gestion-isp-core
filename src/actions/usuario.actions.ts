// // src/actions/usuario.actions.ts

// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import {
//   actualizarUsuario,
//   cambiarEstadoUsuario,
//   resetearPasswordUsuario,
// } from "@/services/usuario.service";
// import { getCurrentUser } from "@/lib/current-user";
// import type { UserStatus } from "@/types/usuario.types";

// export type UsuarioActionState = {
//   ok: boolean;
//   message: string;
// };

// export type ResetPasswordUsuarioActionState = {
//   ok: boolean;
//   message: string;
//   passwordTemporal?: string;
// };

// async function requireAdmin() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   return user;
// }

// export async function actualizarUsuarioAction(
//   _prevState: UsuarioActionState,
//   formData: FormData,
// ): Promise<UsuarioActionState> {
//   await requireAdmin();

//   const id = String(formData.get("id") || "");

//   const result = await actualizarUsuario({
//     id,
//     nombre: String(formData.get("nombre") || ""),
//     apellido: String(formData.get("apellido") || ""),
//     dni: String(formData.get("dni") || ""),
//     email: String(formData.get("email") || ""),
//     rol: String(formData.get("rol") || "cliente") as any,
//     estado: String(formData.get("estado") || "activo") as any,
//     limiteCajaCobrador: String(formData.get("limiteCajaCobrador") || ""),
//   });

//   if (!result.ok) {
//     return result;
//   }

//   revalidatePath("/usuarios");
//   revalidatePath(`/usuarios/${id}/editar`);
//   revalidatePath("/admin/caja-cobradores");
//   revalidatePath("/cobrador");

//   return result;
// }

// export async function resetPasswordUsuarioAction(
//   _prevState: ResetPasswordUsuarioActionState,
//   formData: FormData,
// ): Promise<ResetPasswordUsuarioActionState> {
//   await requireAdmin();

//   const id = String(formData.get("id") || "");

//   const result = await resetearPasswordUsuario({
//     id,
//   });

//   if (!result.ok) {
//     return {
//       ok: false,
//       message: result.message,
//     };
//   }

//   revalidatePath("/usuarios");
//   revalidatePath(`/usuarios/${id}/editar`);

//   return {
//     ok: true,
//     message: result.message,
//     passwordTemporal: result.passwordTemporal,
//   };
// }

// export async function cambiarEstadoUsuarioAction(formData: FormData) {
//   await requireAdmin();

//   const id = String(formData.get("id") || "");
//   const estado = String(formData.get("estado") || "activo") as UserStatus;

//   const result = await cambiarEstadoUsuario(id, estado);

//   revalidatePath("/usuarios");

//   return result;
// }

// src/actions/usuario.actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  actualizarUsuario,
  cambiarEstadoUsuario,
  resetearPasswordUsuario,
} from "@/services/usuario.service";
import { getCurrentUser } from "@/lib/current-user";
import type { UserStatus } from "@/types/usuario.types";

export type UsuarioActionState = {
  ok: boolean;
  message: string;
};

export type ResetPasswordUsuarioActionState = {
  ok: boolean;
  message: string;
  passwordTemporal?: string;
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

function parseLimiteCajaCobrador(value: FormDataEntryValue | null) {
  const raw = String(value || "").trim();

  if (!raw) {
    return undefined;
  }

  const sinMoneda = raw.replace(/\$/g, "").replace(/\s/g, "");
  const parteEntera = sinMoneda.includes(",")
    ? sinMoneda.split(",")[0]
    : sinMoneda;

  const digits = parteEntera.replace(/\D/g, "");

  if (!digits) {
    return undefined;
  }

  return Number(digits);
}

export async function actualizarUsuarioAction(
  _prevState: UsuarioActionState,
  formData: FormData,
): Promise<UsuarioActionState> {
  const currentUser = await requireAdmin();

  const id = String(formData.get("id") || "");

  const result = await actualizarUsuario({
    actorId: currentUser.userId,
    id,
    nombre: String(formData.get("nombre") || ""),
    apellido: String(formData.get("apellido") || ""),
    dni: String(formData.get("dni") || ""),
    email: String(formData.get("email") || ""),
    rol: String(formData.get("rol") || "cliente") as any,
    estado: String(formData.get("estado") || "activo") as any,
    limiteCajaCobrador: parseLimiteCajaCobrador(
      formData.get("limiteCajaCobrador"),
    ),
  });

  if (!result.ok) {
    return result;
  }

  revalidatePath("/usuarios");
  revalidatePath(`/usuarios/${id}/editar`);
  revalidatePath("/admin/caja-cobradores");
  revalidatePath("/cobrador");

  return result;
}

export async function resetPasswordUsuarioAction(
  _prevState: ResetPasswordUsuarioActionState,
  formData: FormData,
): Promise<ResetPasswordUsuarioActionState> {
  const currentUser = await requireAdmin();

  const id = String(formData.get("id") || "");

  const result = await resetearPasswordUsuario({
    actorId: currentUser.userId,
    id,
  });

  if (!result.ok) {
    return {
      ok: false,
      message: result.message,
    };
  }

  revalidatePath("/usuarios");
  revalidatePath(`/usuarios/${id}/editar`);

  return {
    ok: true,
    message: result.message,
    passwordTemporal: result.passwordTemporal,
  };
}

export async function cambiarEstadoUsuarioAction(formData: FormData) {
  const currentUser = await requireAdmin();

  const id = String(formData.get("id") || "");
  const estado = String(formData.get("estado") || "activo") as UserStatus;

  const result = await cambiarEstadoUsuario(id, estado, currentUser.userId);

  revalidatePath("/usuarios");
  revalidatePath(`/usuarios/${id}/editar`);
  revalidatePath("/admin/caja-cobradores");

  return result;
}
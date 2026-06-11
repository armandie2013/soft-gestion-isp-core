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

// function parseLimiteCajaCobrador(value: FormDataEntryValue | null) {
//   const raw = String(value || "").trim();

//   if (!raw) {
//     return undefined;
//   }

//   const sinMoneda = raw.replace(/\$/g, "").replace(/\s/g, "");
//   const parteEntera = sinMoneda.includes(",")
//     ? sinMoneda.split(",")[0]
//     : sinMoneda;

//   const digits = parteEntera.replace(/\D/g, "");

//   if (!digits) {
//     return undefined;
//   }

//   return Number(digits);
// }

// export async function actualizarUsuarioAction(
//   _prevState: UsuarioActionState,
//   formData: FormData,
// ): Promise<UsuarioActionState> {
//   const currentUser = await requireAdmin();

//   const id = String(formData.get("id") || "");

//   const result = await actualizarUsuario({
//     actorId: currentUser.userId,
//     id,
//     nombre: String(formData.get("nombre") || ""),
//     apellido: String(formData.get("apellido") || ""),
//     dni: String(formData.get("dni") || ""),
//     email: String(formData.get("email") || ""),
//     rol: String(formData.get("rol") || "cliente") as any,
//     estado: String(formData.get("estado") || "activo") as any,
//     limiteCajaCobrador: parseLimiteCajaCobrador(
//       formData.get("limiteCajaCobrador"),
//     ),
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
//   const currentUser = await requireAdmin();

//   const id = String(formData.get("id") || "");

//   const result = await resetearPasswordUsuario({
//     actorId: currentUser.userId,
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
//   const currentUser = await requireAdmin();

//   const id = String(formData.get("id") || "");
//   const estado = String(formData.get("estado") || "activo") as UserStatus;

//   const result = await cambiarEstadoUsuario(id, estado, currentUser.userId);

//   revalidatePath("/usuarios");
//   revalidatePath(`/usuarios/${id}/editar`);
//   revalidatePath("/admin/caja-cobradores");

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
import { registrarAuditLog } from "@/services/audit.service";
import type { UserStatus } from "@/types/usuario.types";
import { headers } from "next/headers";

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

function getRequestMeta() {
  const h = headers();

  const forwardedFor = h.get("x-forwarded-for");

  const ip = forwardedFor
    ? forwardedFor.split(",")[0]?.trim() || "unknown"
    : h.get("x-real-ip") ||
      h.get("cf-connecting-ip") ||
      h.get("x-client-ip") ||
      "unknown";

  return {
    ip,
    userAgent: h.get("user-agent") || "unknown",
  };
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
  const requestMeta = getRequestMeta();

  const id = String(formData.get("id") || "");
  const nombre = String(formData.get("nombre") || "");
  const apellido = String(formData.get("apellido") || "");
  const dni = String(formData.get("dni") || "");
  const email = String(formData.get("email") || "");
  const rol = String(formData.get("rol") || "cliente") as any;
  const estado = String(formData.get("estado") || "activo") as any;
  const limiteCajaCobrador = parseLimiteCajaCobrador(
    formData.get("limiteCajaCobrador"),
  );

  const result = await actualizarUsuario({
    actorId: currentUser.userId,
    id,
    nombre,
    apellido,
    dni,
    email,
    rol,
    estado,
    limiteCajaCobrador,
  });

  await registrarAuditLog({
    action: result.ok ? "USUARIO_ACTUALIZAR_SUCCESS" : "USUARIO_ACTUALIZAR_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: {
      userId: currentUser.userId,
      nombre: currentUser.nombre,
      email: currentUser.email,
      rol: currentUser.rol,
    },
    entidadTipo: "Usuario",
    entidadId: id,
    entidadLabel: email || dni || id,
    mensaje: result.message,
    metadata: {
      id,
      nombre,
      apellido,
      dni,
      email,
      rol,
      estado,
      limiteCajaCobrador: limiteCajaCobrador ?? null,
      ok: result.ok,
    },
    request: requestMeta,
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
  const requestMeta = getRequestMeta();

  const id = String(formData.get("id") || "");

  const result = await resetearPasswordUsuario({
    actorId: currentUser.userId,
    id,
  });

  await registrarAuditLog({
    action: result.ok
      ? "USUARIO_RESET_PASSWORD_SUCCESS"
      : "USUARIO_RESET_PASSWORD_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: {
      userId: currentUser.userId,
      nombre: currentUser.nombre,
      email: currentUser.email,
      rol: currentUser.rol,
    },
    entidadTipo: "Usuario",
    entidadId: id,
    entidadLabel: id,
    mensaje: result.message,
    metadata: {
      id,
      ok: result.ok,
    },
    request: requestMeta,
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
  const requestMeta = getRequestMeta();

  const id = String(formData.get("id") || "");
  const estado = String(formData.get("estado") || "activo") as UserStatus;

  const result = await cambiarEstadoUsuario(id, estado, currentUser.userId);

  await registrarAuditLog({
    action: result.ok
      ? "USUARIO_CAMBIAR_ESTADO_SUCCESS"
      : "USUARIO_CAMBIAR_ESTADO_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: {
      userId: currentUser.userId,
      nombre: currentUser.nombre,
      email: currentUser.email,
      rol: currentUser.rol,
    },
    entidadTipo: "Usuario",
    entidadId: id,
    entidadLabel: id,
    mensaje: result.message,
    metadata: {
      id,
      estado,
      ok: result.ok,
    },
    request: requestMeta,
  });

  revalidatePath("/usuarios");
  revalidatePath(`/usuarios/${id}/editar`);
  revalidatePath("/admin/caja-cobradores");

  return result;
}
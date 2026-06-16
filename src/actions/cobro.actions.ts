// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { getCurrentUser } from "@/lib/current-user";
// import {
//   confirmarCierreCajaCobrador,
//   generarCodigoCierreCaja,
//   registrarPagoCobrador,
//   validarCodigoCierreCajaCobrador,
// } from "@/services/cobro.service";

// export type CobroActionState = {
//   ok: boolean;
//   message: string;
// };

// export type CodigoCierreActionState = {
//   ok: boolean;
//   message: string;
//   codigo?: string;
//   importe?: number;
// };

// async function requireCobrador() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "cobrador") {
//     redirect(`/${user.rol}`);
//   }

//   return user;
// }

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

// function buildUser(user: Awaited<ReturnType<typeof getCurrentUser>>) {
//   if (!user) {
//     throw new Error("Usuario no autenticado.");
//   }

//   return {
//     userId: user.userId,
//     nombre: user.nombre,
//     rol: user.rol,
//   };
// }

// export async function registrarPagoCobradorAction(
//   _prevState: CobroActionState,
//   formData: FormData,
// ): Promise<CobroActionState> {
//   const user = await requireCobrador();

//   const clienteId = String(formData.get("clienteId") || "");

//   const result = await registrarPagoCobrador(
//     {
//       clienteId,
//       facturaAsociadaId: String(formData.get("facturaAsociadaId") || ""),
//       importe: Number(formData.get("importe") || 0),
//       observacion: String(formData.get("observacion") || ""),
//     },
//     buildUser(user),
//   );

//   if (result.ok) {
//     revalidatePath(`/cobrador/clientes/${clienteId}`);
//     revalidatePath(`/cobrador/clientes/${clienteId}/pagar`);
//     revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
//     revalidatePath("/cobrador");
//     revalidatePath("/cobrador/caja");
//     revalidatePath("/admin/caja-cobradores");
//   }

//   return result;
// }

// export async function generarCodigoCierreCajaAction(
//   _prevState: CodigoCierreActionState,
//   formData: FormData,
// ): Promise<CodigoCierreActionState> {
//   const user = await requireAdmin();

//   const result = await generarCodigoCierreCaja(
//     {
//       cobradorId: String(formData.get("cobradorId") || ""),
//     },
//     buildUser(user),
//   );

//   revalidatePath("/admin/caja-cobradores");

//   return {
//     ok: result.ok,
//     message: result.message,
//     codigo: result.codigo?.codigo,
//     importe: result.codigo?.importe,
//   };
// }

// export async function validarCodigoCierreCajaAction(
//   _prevState: CodigoCierreActionState,
//   formData: FormData,
// ): Promise<CodigoCierreActionState> {
//   const user = await requireCobrador();

//   const result = await validarCodigoCierreCajaCobrador(
//     {
//       codigo: String(formData.get("codigo") || ""),
//     },
//     buildUser(user),
//   );

//   return {
//     ok: result.ok,
//     message: result.message,
//     importe: result.importe,
//   };
// }

// export async function confirmarCierreCajaAction(
//   _prevState: CodigoCierreActionState,
//   formData: FormData,
// ): Promise<CodigoCierreActionState> {
//   const user = await requireCobrador();

//   const result = await confirmarCierreCajaCobrador(
//     {
//       codigo: String(formData.get("codigo") || ""),
//     },
//     buildUser(user),
//   );

//   if (result.ok) {
//     revalidatePath("/cobrador");
//     revalidatePath("/cobrador/caja");
//     revalidatePath("/cobrador/caja/cierre");
//     revalidatePath("/admin/caja-cobradores");
//   }

//   return {
//     ok: result.ok,
//     message: result.message,
//     importe: result.importe,
//   };
// }


// src/actions/cobro.actions.ts

"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { registrarAuditLog } from "@/services/audit.service";
import {
  confirmarCierreCajaCobrador,
  generarCodigoCierreCaja,
  registrarPagoCobrador,
  validarCodigoCierreCajaCobrador,
} from "@/services/cobro.service";

export type CobroActionState = {
  ok: boolean;
  message: string;
  movimientoId?: string;
  numeroComprobante?: number;
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

function buildAuditActor(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) {
    return null;
  }

  return {
    userId: user.userId,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
  };
}

function parseImporte(value: FormDataEntryValue | null) {
  const raw = String(value || "").trim();

  if (!raw) {
    return 0;
  }

  const normalized = raw
    .replace(/\$/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const number = Number(normalized);

  if (Number.isNaN(number)) {
    return 0;
  }

  return number;
}

export async function registrarPagoCobradorAction(
  _prevState: CobroActionState,
  formData: FormData,
): Promise<CobroActionState> {
  const user = await requireCobrador();
  const requestMeta = getRequestMeta();

  const clienteId = String(formData.get("clienteId") || "");
  const facturaAsociadaId = String(formData.get("facturaAsociadaId") || "");
  const importe = parseImporte(formData.get("importe"));
  const observacion = String(formData.get("observacion") || "");

  const result = await registrarPagoCobrador(
    {
      clienteId,
      facturaAsociadaId,
      importe,
      observacion,
    },
    buildUser(user),
  );

  await registrarAuditLog({
    action: result.ok
      ? "COBRO_REGISTRAR_PAGO_SUCCESS"
      : "COBRO_REGISTRAR_PAGO_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: buildAuditActor(user),
    entidadTipo: "Pago",
    entidadId: facturaAsociadaId || clienteId,
    entidadLabel: clienteId,
    mensaje: result.message,
    metadata: {
      clienteId,
      facturaAsociadaId,
      importe,
      tieneObservacion: Boolean(observacion.trim()),
      ok: result.ok,
    },
    request: requestMeta,
  });

  if (result.ok) {
    revalidatePath(`/cobrador/clientes/${clienteId}`);
    revalidatePath(`/cobrador/clientes/${clienteId}/pagar`);
    revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
    revalidatePath("/cobrador");
    revalidatePath("/cobrador/caja");
    revalidatePath("/admin/caja-cobradores");
    revalidatePath("/admin");
  }

  return result;
}

export async function generarCodigoCierreCajaAction(
  _prevState: CodigoCierreActionState,
  formData: FormData,
): Promise<CodigoCierreActionState> {
  const user = await requireAdmin();
  const requestMeta = getRequestMeta();

  const cobradorId = String(formData.get("cobradorId") || "");

  const result = await generarCodigoCierreCaja(
    {
      cobradorId,
    },
    buildUser(user),
  );

  await registrarAuditLog({
    action: result.ok
      ? "CAJA_GENERAR_CODIGO_CIERRE_SUCCESS"
      : "CAJA_GENERAR_CODIGO_CIERRE_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: buildAuditActor(user),
    entidadTipo: "CierreCaja",
    entidadId: cobradorId,
    entidadLabel: cobradorId,
    mensaje: result.message,
    metadata: {
      cobradorId,
      importe: result.codigo?.importe ?? null,
      codigoGenerado: Boolean(result.codigo?.codigo),
      ok: result.ok,
    },
    request: requestMeta,
  });

  revalidatePath("/admin/caja-cobradores");
  revalidatePath("/admin");

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
  const requestMeta = getRequestMeta();

  const codigo = String(formData.get("codigo") || "").trim();

  const result = await validarCodigoCierreCajaCobrador(
    {
      codigo,
    },
    buildUser(user),
  );

  await registrarAuditLog({
    action: result.ok
      ? "CAJA_VALIDAR_CODIGO_CIERRE_SUCCESS"
      : "CAJA_VALIDAR_CODIGO_CIERRE_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: buildAuditActor(user),
    entidadTipo: "CierreCaja",
    entidadId: user.userId,
    entidadLabel: user.nombre,
    mensaje: result.message,
    metadata: {
      codigoLength: codigo.length,
      importe: result.importe ?? null,
      ok: result.ok,
    },
    request: requestMeta,
  });

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
  const requestMeta = getRequestMeta();

  const codigo = String(formData.get("codigo") || "").trim();

  const result = await confirmarCierreCajaCobrador(
    {
      codigo,
    },
    buildUser(user),
  );

  await registrarAuditLog({
    action: result.ok
      ? "CAJA_CONFIRMAR_CIERRE_SUCCESS"
      : "CAJA_CONFIRMAR_CIERRE_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: buildAuditActor(user),
    entidadTipo: "CierreCaja",
    entidadId: user.userId,
    entidadLabel: user.nombre,
    mensaje: result.message,
    metadata: {
      codigoLength: codigo.length,
      importe: result.importe ?? null,
      ok: result.ok,
    },
    request: requestMeta,
  });

  if (result.ok) {
    revalidatePath("/cobrador");
    revalidatePath("/cobrador/caja");
    revalidatePath("/cobrador/caja/cierre");
    revalidatePath("/admin/caja-cobradores");
    revalidatePath("/admin/caja-cobradores/cierres");
    revalidatePath("/admin");
  }

  return {
    ok: result.ok,
    message: result.message,
    importe: result.importe,
  };
}
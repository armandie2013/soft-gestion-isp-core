// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { getCurrentUser } from "@/lib/current-user";
// import {
//   crearNotaCredito,
//   crearNotaDebito,
//   generarFacturacionManual,
// } from "@/services/movimiento-financiero.service";

// export type MovimientoActionState = {
//   ok: boolean;
//   message: string;
// };

// export type FacturacionManualActionState = {
//   ok: boolean;
//   message: string;
//   generadas?: number;
//   omitidas?: number;
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

// function buildCreador(user: Awaited<ReturnType<typeof getCurrentUser>>) {
//   if (!user) {
//     throw new Error("Usuario no autenticado.");
//   }

//   return {
//     userId: user.userId,
//     nombre: user.nombre,
//     rol: user.rol,
//   };
// }

// export async function generarFacturacionManualAction(
//   _prevState: FacturacionManualActionState,
//   formData: FormData,
// ): Promise<FacturacionManualActionState> {
//   const user = await requireAdmin();

//   const result = await generarFacturacionManual(
//     {
//       referenciaMes: Number(formData.get("referenciaMes") || 0),
//       referenciaAnio: Number(formData.get("referenciaAnio") || 0),
//       observacion: String(formData.get("observacion") || ""),
//     },
//     buildCreador(user),
//   );

//   if (result.ok) {
//     revalidatePath("/clientes");
//     revalidatePath("/admin/configuracion/facturacion");
//   }

//   return result;
// }

// export async function crearNotaDebitoAction(
//   _prevState: MovimientoActionState,
//   formData: FormData,
// ): Promise<MovimientoActionState> {
//   const user = await requireAdmin();

//   const clienteId = String(formData.get("clienteId") || "");

//   const result = await crearNotaDebito(
//     {
//       clienteId,
//       facturaAsociadaId: String(formData.get("facturaAsociadaId") || ""),
//       importe: Number(formData.get("importe") || 0),
//       concepto: String(formData.get("concepto") || ""),
//       observacion: String(formData.get("observacion") || ""),
//     },
//     buildCreador(user),
//   );

//   if (result.ok) {
//     revalidatePath(`/clientes/${clienteId}`);
//     revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
//     revalidatePath(`/clientes/${clienteId}/nota-debito`);
//   }

//   return result;
// }

// export async function crearNotaCreditoAction(
//   _prevState: MovimientoActionState,
//   formData: FormData,
// ): Promise<MovimientoActionState> {
//   const user = await requireAdmin();

//   const clienteId = String(formData.get("clienteId") || "");

//   const result = await crearNotaCredito(
//     {
//       clienteId,
//       facturaAsociadaId: String(formData.get("facturaAsociadaId") || ""),
//       importe: Number(formData.get("importe") || 0),
//       concepto: String(formData.get("concepto") || ""),
//       observacion: String(formData.get("observacion") || ""),
//     },
//     buildCreador(user),
//   );

//   if (result.ok) {
//     revalidatePath(`/clientes/${clienteId}`);
//     revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
//     revalidatePath(`/clientes/${clienteId}/nota-credito`);
//   }

//   return result;
// }


// // src/actions/movimiento-financiero.actions.ts

// "use server";

// import { headers } from "next/headers";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { getCurrentUser } from "@/lib/current-user";
// import { registrarAuditLog } from "@/services/audit.service";
// import {
//   crearNotaCredito,
//   crearNotaDebito,
//   generarFacturacionManual,
// } from "@/services/movimiento-financiero.service";

// export type MovimientoActionState = {
//   ok: boolean;
//   message: string;
// };

// export type FacturacionManualActionState = {
//   ok: boolean;
//   message: string;
//   generadas?: number;
//   omitidas?: number;
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

// function getRequestMeta() {
//   const h = headers();

//   const forwardedFor = h.get("x-forwarded-for");

//   const ip = forwardedFor
//     ? forwardedFor.split(",")[0]?.trim() || "unknown"
//     : h.get("x-real-ip") ||
//       h.get("cf-connecting-ip") ||
//       h.get("x-client-ip") ||
//       "unknown";

//   return {
//     ip,
//     userAgent: h.get("user-agent") || "unknown",
//   };
// }

// function buildCreador(user: Awaited<ReturnType<typeof getCurrentUser>>) {
//   if (!user) {
//     throw new Error("Usuario no autenticado.");
//   }

//   return {
//     userId: user.userId,
//     nombre: user.nombre,
//     rol: user.rol,
//   };
// }

// function buildAuditActor(user: Awaited<ReturnType<typeof getCurrentUser>>) {
//   if (!user) {
//     return null;
//   }

//   return {
//     userId: user.userId,
//     nombre: user.nombre,
//     email: user.email,
//     rol: user.rol,
//   };
// }

// function parseImporte(value: FormDataEntryValue | null) {
//   const raw = String(value || "").trim();

//   if (!raw) {
//     return 0;
//   }

//   const normalized = raw
//     .replace(/\$/g, "")
//     .replace(/\s/g, "")
//     .replace(/\./g, "")
//     .replace(",", ".");

//   const number = Number(normalized);

//   if (Number.isNaN(number)) {
//     return 0;
//   }

//   return number;
// }

// export async function generarFacturacionManualAction(
//   _prevState: FacturacionManualActionState,
//   formData: FormData,
// ): Promise<FacturacionManualActionState> {
//   const user = await requireAdmin();
//   const requestMeta = getRequestMeta();

//   const referenciaMes = Number(formData.get("referenciaMes") || 0);
//   const referenciaAnio = Number(formData.get("referenciaAnio") || 0);
//   const observacion = String(formData.get("observacion") || "");

//   const result = await generarFacturacionManual(
//     {
//       referenciaMes,
//       referenciaAnio,
//       observacion,
//     },
//     buildCreador(user),
//   );

//   await registrarAuditLog({
//     action: result.ok
//       ? "FACTURACION_MANUAL_SUCCESS"
//       : "FACTURACION_MANUAL_FAILED",
//     resultado: result.ok ? "success" : "failure",
//     actor: buildAuditActor(user),
//     entidadTipo: "Facturacion",
//     entidadLabel: `${referenciaMes}/${referenciaAnio}`,
//     mensaje: result.message,
//     metadata: {
//       referenciaMes,
//       referenciaAnio,
//       generadas: result.generadas ?? null,
//       omitidas: result.omitidas ?? null,
//       tieneObservacion: Boolean(observacion.trim()),
//       ok: result.ok,
//     },
//     request: requestMeta,
//   });

//   if (result.ok) {
//     revalidatePath("/clientes");
//     revalidatePath("/admin/configuracion/facturacion");
//     revalidatePath("/admin");
//   }

//   return result;
// }

// export async function crearNotaDebitoAction(
//   _prevState: MovimientoActionState,
//   formData: FormData,
// ): Promise<MovimientoActionState> {
//   const user = await requireAdmin();
//   const requestMeta = getRequestMeta();

//   const clienteId = String(formData.get("clienteId") || "");
//   const facturaAsociadaId = String(formData.get("facturaAsociadaId") || "");
//   const importe = parseImporte(formData.get("importe"));
//   const concepto = String(formData.get("concepto") || "");
//   const observacion = String(formData.get("observacion") || "");

//   const result = await crearNotaDebito(
//     {
//       clienteId,
//       facturaAsociadaId,
//       importe,
//       concepto,
//       observacion,
//     },
//     buildCreador(user),
//   );

//   await registrarAuditLog({
//     action: result.ok ? "NOTA_DEBITO_CREAR_SUCCESS" : "NOTA_DEBITO_CREAR_FAILED",
//     resultado: result.ok ? "success" : "failure",
//     actor: buildAuditActor(user),
//     entidadTipo: "NotaDebito",
//     entidadId: facturaAsociadaId || clienteId,
//     entidadLabel: clienteId,
//     mensaje: result.message,
//     metadata: {
//       clienteId,
//       facturaAsociadaId,
//       importe,
//       concepto,
//       tieneObservacion: Boolean(observacion.trim()),
//       ok: result.ok,
//     },
//     request: requestMeta,
//   });

//   if (result.ok) {
//     revalidatePath(`/clientes/${clienteId}`);
//     revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
//     revalidatePath(`/clientes/${clienteId}/nota-debito`);
//     revalidatePath("/admin");
//   }

//   return result;
// }

// export async function crearNotaCreditoAction(
//   _prevState: MovimientoActionState,
//   formData: FormData,
// ): Promise<MovimientoActionState> {
//   const user = await requireAdmin();
//   const requestMeta = getRequestMeta();

//   const clienteId = String(formData.get("clienteId") || "");
//   const facturaAsociadaId = String(formData.get("facturaAsociadaId") || "");
//   const importe = parseImporte(formData.get("importe"));
//   const concepto = String(formData.get("concepto") || "");
//   const observacion = String(formData.get("observacion") || "");

//   const result = await crearNotaCredito(
//     {
//       clienteId,
//       facturaAsociadaId,
//       importe,
//       concepto,
//       observacion,
//     },
//     buildCreador(user),
//   );

//   await registrarAuditLog({
//     action: result.ok
//       ? "NOTA_CREDITO_CREAR_SUCCESS"
//       : "NOTA_CREDITO_CREAR_FAILED",
//     resultado: result.ok ? "success" : "failure",
//     actor: buildAuditActor(user),
//     entidadTipo: "NotaCredito",
//     entidadId: facturaAsociadaId || clienteId,
//     entidadLabel: clienteId,
//     mensaje: result.message,
//     metadata: {
//       clienteId,
//       facturaAsociadaId,
//       importe,
//       concepto,
//       tieneObservacion: Boolean(observacion.trim()),
//       ok: result.ok,
//     },
//     request: requestMeta,
//   });

//   if (result.ok) {
//     revalidatePath(`/clientes/${clienteId}`);
//     revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
//     revalidatePath(`/clientes/${clienteId}/nota-credito`);
//     revalidatePath("/admin");
//   }

//   return result;
// }

// "use server";

// import { headers } from "next/headers";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { getCurrentUser } from "@/lib/current-user";
// import { registrarAuditLog } from "@/services/audit.service";
// import {
//   crearNotaCredito,
//   crearNotaDebito,
//   generarFacturacionManual,
// } from "@/services/movimiento-financiero.service";

// export type MovimientoActionState = {
//   ok: boolean;
//   message: string;
// };

// export type FacturacionManualActionState = {
//   ok: boolean;
//   message: string;
//   generadas?: number;
//   omitidas?: number;
//   ajustes?: number;
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

// function getRequestMeta() {
//   const h = headers();

//   const forwardedFor = h.get("x-forwarded-for");

//   const ip = forwardedFor
//     ? forwardedFor.split(",")[0]?.trim() || "unknown"
//     : h.get("x-real-ip") ||
//       h.get("cf-connecting-ip") ||
//       h.get("x-client-ip") ||
//       "unknown";

//   return {
//     ip,
//     userAgent: h.get("user-agent") || "unknown",
//   };
// }

// function buildCreador(user: Awaited<ReturnType<typeof getCurrentUser>>) {
//   if (!user) {
//     throw new Error("Usuario no autenticado.");
//   }

//   return {
//     userId: user.userId,
//     nombre: user.nombre,
//     rol: user.rol,
//   };
// }

// function buildAuditActor(user: Awaited<ReturnType<typeof getCurrentUser>>) {
//   if (!user) {
//     return null;
//   }

//   return {
//     userId: user.userId,
//     nombre: user.nombre,
//     email: user.email,
//     rol: user.rol,
//   };
// }

// function parseImporte(value: FormDataEntryValue | null) {
//   const raw = String(value || "").trim();

//   if (!raw) {
//     return 0;
//   }

//   const normalized = raw
//     .replace(/\$/g, "")
//     .replace(/\s/g, "")
//     .replace(/\./g, "")
//     .replace(",", ".");

//   const number = Number(normalized);

//   if (Number.isNaN(number)) {
//     return 0;
//   }

//   return number;
// }

// export async function generarFacturacionManualAction(
//   _prevState: FacturacionManualActionState,
//   formData: FormData,
// ): Promise<FacturacionManualActionState> {
//   const user = await requireAdmin();
//   const requestMeta = getRequestMeta();

//   const referenciaMes = Number(formData.get("referenciaMes") || 0);
//   const referenciaAnio = Number(formData.get("referenciaAnio") || 0);
//   const observacion = String(formData.get("observacion") || "");
//   const result = await generarFacturacionManual(
//     {
//       referenciaMes,
//       referenciaAnio,
//       observacion,
//       origenFacturacion: "manual",
//     },
//     buildCreador(user),
//   );

//   await registrarAuditLog({
//     action: result.ok
//       ? "FACTURACION_MANUAL_SUCCESS"
//       : "FACTURACION_MANUAL_FAILED",
//     resultado: result.ok ? "success" : "failure",
//     actor: buildAuditActor(user),
//     entidadTipo: "Facturacion",
//     entidadLabel: `${referenciaMes}/${referenciaAnio}`,
//     mensaje: result.message,
//     metadata: {
//       referenciaMes,
//       referenciaAnio,
//       generadas: result.generadas ?? null,
//       omitidas: result.omitidas ?? null,
//       ajustes: result.ajustes ?? null,
//       tieneObservacion: Boolean(observacion.trim()),
//       ok: result.ok,
//     },
//     request: requestMeta,
//   });

//   if (result.ok) {
//     revalidatePath("/clientes");
//     revalidatePath("/admin/configuracion/facturacion");
//     revalidatePath("/admin");
//   }

//   return result;
// }

// export async function crearNotaDebitoAction(
//   _prevState: MovimientoActionState,
//   formData: FormData,
// ): Promise<MovimientoActionState> {
//   const user = await requireAdmin();
//   const requestMeta = getRequestMeta();

//   const clienteId = String(formData.get("clienteId") || "");
//   const facturaAsociadaId = String(formData.get("facturaAsociadaId") || "");
//   const importe = parseImporte(formData.get("importe"));
//   const concepto = String(formData.get("concepto") || "");
//   const observacion = String(formData.get("observacion") || "");

//   const result = await crearNotaDebito(
//     {
//       clienteId,
//       facturaAsociadaId,
//       importe,
//       concepto,
//       observacion,
//     },
//     buildCreador(user),
//   );

//   await registrarAuditLog({
//     action: result.ok ? "NOTA_DEBITO_CREAR_SUCCESS" : "NOTA_DEBITO_CREAR_FAILED",
//     resultado: result.ok ? "success" : "failure",
//     actor: buildAuditActor(user),
//     entidadTipo: "NotaDebito",
//     entidadId: facturaAsociadaId || clienteId,
//     entidadLabel: clienteId,
//     mensaje: result.message,
//     metadata: {
//       clienteId,
//       facturaAsociadaId,
//       importe,
//       concepto,
//       tieneObservacion: Boolean(observacion.trim()),
//       ok: result.ok,
//     },
//     request: requestMeta,
//   });

//   if (result.ok) {
//     revalidatePath(`/clientes/${clienteId}`);
//     revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
//     revalidatePath(`/clientes/${clienteId}/nota-debito`);
//     revalidatePath("/admin");
//   }

//   return result;
// }

// export async function crearNotaCreditoAction(
//   _prevState: MovimientoActionState,
//   formData: FormData,
// ): Promise<MovimientoActionState> {
//   const user = await requireAdmin();
//   const requestMeta = getRequestMeta();

//   const clienteId = String(formData.get("clienteId") || "");
//   const facturaAsociadaId = String(formData.get("facturaAsociadaId") || "");
//   const importe = parseImporte(formData.get("importe"));
//   const concepto = String(formData.get("concepto") || "");
//   const observacion = String(formData.get("observacion") || "");

//   const result = await crearNotaCredito(
//     {
//       clienteId,
//       facturaAsociadaId,
//       importe,
//       concepto,
//       observacion,
//     },
//     buildCreador(user),
//   );

//   await registrarAuditLog({
//     action: result.ok
//       ? "NOTA_CREDITO_CREAR_SUCCESS"
//       : "NOTA_CREDITO_CREAR_FAILED",
//     resultado: result.ok ? "success" : "failure",
//     actor: buildAuditActor(user),
//     entidadTipo: "NotaCredito",
//     entidadId: facturaAsociadaId || clienteId,
//     entidadLabel: clienteId,
//     mensaje: result.message,
//     metadata: {
//       clienteId,
//       facturaAsociadaId,
//       importe,
//       concepto,
//       tieneObservacion: Boolean(observacion.trim()),
//       ok: result.ok,
//     },
//     request: requestMeta,
//   });

//   if (result.ok) {
//     revalidatePath(`/clientes/${clienteId}`);
//     revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
//     revalidatePath(`/clientes/${clienteId}/nota-credito`);
//     revalidatePath("/admin");
//   }

//   return result;
// }

"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { registrarAuditLog } from "@/services/audit.service";
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
  ajustes?: number;
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


export async function generarFacturacionManualAction(
  _prevState: FacturacionManualActionState,
  formData: FormData,
): Promise<FacturacionManualActionState> {
  const user = await requireAdmin();
  const requestMeta = getRequestMeta();

  const referenciaMes = Number(formData.get("referenciaMes") || 0);
  const referenciaAnio = Number(formData.get("referenciaAnio") || 0);
  const observacion = String(formData.get("observacion") || "");
  const result = await generarFacturacionManual(
    {
      referenciaMes,
      referenciaAnio,
      observacion,
      origenFacturacion: "manual",
    },
    buildCreador(user),
  );

  await registrarAuditLog({
    action: result.ok
      ? "FACTURACION_MANUAL_SUCCESS"
      : "FACTURACION_MANUAL_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: buildAuditActor(user),
    entidadTipo: "Facturacion",
    entidadLabel: `${referenciaMes}/${referenciaAnio}`,
    mensaje: result.message,
    metadata: {
      referenciaMes,
      referenciaAnio,
      generadas: result.generadas ?? null,
      omitidas: result.omitidas ?? null,
      ajustes: result.ajustes ?? null,
      tieneObservacion: Boolean(observacion.trim()),
      ok: result.ok,
    },
    request: requestMeta,
  });

  if (result.ok) {
    revalidatePath("/clientes");
    revalidatePath("/admin/configuracion/facturacion");
    revalidatePath("/admin");
  }

  return result;
}

export async function crearNotaDebitoAction(
  _prevState: MovimientoActionState,
  formData: FormData,
): Promise<MovimientoActionState> {
  const user = await requireAdmin();
  const requestMeta = getRequestMeta();

  const clienteId = String(formData.get("clienteId") || "");
  const facturaAsociadaId = String(formData.get("facturaAsociadaId") || "");
  const importe = String(formData.get("importe") || "").trim();
  const concepto = String(formData.get("concepto") || "");
  const observacion = String(formData.get("observacion") || "");

  const result = await crearNotaDebito(
    {
      clienteId,
      facturaAsociadaId,
      importe,
      concepto,
      observacion,
    },
    buildCreador(user),
  );

  await registrarAuditLog({
    action: result.ok ? "NOTA_DEBITO_CREAR_SUCCESS" : "NOTA_DEBITO_CREAR_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: buildAuditActor(user),
    entidadTipo: "NotaDebito",
    entidadId: facturaAsociadaId || clienteId,
    entidadLabel: clienteId,
    mensaje: result.message,
    metadata: {
      clienteId,
      facturaAsociadaId,
      importe,
      concepto,
      tieneObservacion: Boolean(observacion.trim()),
      ok: result.ok,
    },
    request: requestMeta,
  });

  if (result.ok) {
    revalidatePath(`/clientes/${clienteId}`);
    revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
    revalidatePath(`/clientes/${clienteId}/nota-debito`);
    revalidatePath("/admin");
  }

  return result;
}

export async function crearNotaCreditoAction(
  _prevState: MovimientoActionState,
  formData: FormData,
): Promise<MovimientoActionState> {
  const user = await requireAdmin();
  const requestMeta = getRequestMeta();

  const clienteId = String(formData.get("clienteId") || "");
  const facturaAsociadaId = String(formData.get("facturaAsociadaId") || "");
  const importe = String(formData.get("importe") || "").trim();
  const concepto = String(formData.get("concepto") || "");
  const observacion = String(formData.get("observacion") || "");

  const result = await crearNotaCredito(
    {
      clienteId,
      facturaAsociadaId,
      importe,
      concepto,
      observacion,
    },
    buildCreador(user),
  );

  await registrarAuditLog({
    action: result.ok
      ? "NOTA_CREDITO_CREAR_SUCCESS"
      : "NOTA_CREDITO_CREAR_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: buildAuditActor(user),
    entidadTipo: "NotaCredito",
    entidadId: facturaAsociadaId || clienteId,
    entidadLabel: clienteId,
    mensaje: result.message,
    metadata: {
      clienteId,
      facturaAsociadaId,
      importe,
      concepto,
      tieneObservacion: Boolean(observacion.trim()),
      ok: result.ok,
    },
    request: requestMeta,
  });

  if (result.ok) {
    revalidatePath(`/clientes/${clienteId}`);
    revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
    revalidatePath(`/clientes/${clienteId}/nota-credito`);
    revalidatePath("/admin");
  }

  return result;
}
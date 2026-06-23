"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/current-user";
import { registrarAuditLog } from "@/services/audit.service";
import { corregirPagoCobrador } from "@/services/cobro.service";

export type CorreccionPagoActionState = {
  ok: boolean;
  message: string;
  correccionMovimientoId?: string;
  numeroComprobanteCorreccion?: number;
};

const initialError: CorreccionPagoActionState = {
  ok: false,
  message: "No se pudo procesar la corrección.",
};

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

function parseImporte(value: FormDataEntryValue | null) {
  const raw = String(value || "").trim();

  if (!raw) return 0;

  const normalized = raw
    .replace(/\$/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const number = Number(normalized);

  if (!Number.isFinite(number)) return 0;

  return number;
}

export async function corregirPagoCobradorAction(
  _prevState: CorreccionPagoActionState,
  formData: FormData,
): Promise<CorreccionPagoActionState> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      ...initialError,
      message: "La sesión expiró. Volvé a iniciar sesión.",
    };
  }

  if (user.rol !== "admin") {
    return {
      ...initialError,
      message: "Solo un administrador puede corregir pagos emitidos.",
    };
  }

  const movimientoId = String(formData.get("movimientoId") || "");
  const clienteId = String(formData.get("clienteId") || "");
  const cobradorId = String(formData.get("cobradorId") || "");
  const facturaAsociadaId = String(formData.get("facturaAsociadaId") || "");
  const importeReal = parseImporte(formData.get("importeReal"));
  const motivo = String(formData.get("motivo") || "");

  const result = await corregirPagoCobrador(
    {
      movimientoId,
      importeReal,
      motivo,
    },
    {
      userId: user.userId,
      nombre: user.nombre,
      rol: user.rol,
    },
  );

  await registrarAuditLog({
    action: result.ok
      ? "PAGO_CORREGIR_SUCCESS"
      : "PAGO_CORREGIR_FAILED",
    resultado: result.ok ? "success" : "failure",
    actor: {
      userId: user.userId,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    },
    entidadTipo: "Pago",
    entidadId: movimientoId,
    entidadLabel: movimientoId,
    mensaje: result.message,
    metadata: {
      movimientoId,
      clienteId,
      cobradorId,
      facturaAsociadaId,
      importeReal,
      tieneMotivo: Boolean(motivo.trim()),
      correccionMovimientoId: result.correccionMovimientoId ?? null,
      numeroComprobanteCorreccion:
        result.numeroComprobanteCorreccion ?? null,
      ok: result.ok,
    },
    request: getRequestMeta(),
  });

  if (result.ok) {
    revalidatePath(`/comprobantes/pagos/${movimientoId}`);
    revalidatePath(`/admin/caja-cobradores/corregir-pago/${movimientoId}`);
    revalidatePath(`/clientes/${clienteId}`);
    revalidatePath(`/clientes/${clienteId}/estado-cuenta`);
    revalidatePath(`/clientes/${clienteId}/estado-cuenta/${facturaAsociadaId}`);
    revalidatePath(`/cobrador/clientes/${clienteId}`);
    revalidatePath(
      `/cobrador/clientes/${clienteId}/estado-cuenta/${facturaAsociadaId}`,
    );
    revalidatePath("/admin/caja-cobradores");
    revalidatePath("/cobrador/caja");
    revalidatePath("/admin");
  }

  return result;
}
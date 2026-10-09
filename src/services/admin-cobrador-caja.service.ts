import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Usuario from "@/models/Usuario";
import CodigoCierreCaja from "@/models/CodigoCierreCaja";
import MovimientoFinanciero from "@/models/MovimientoFinanciero";
import { obtenerCajaCobradorResumen } from "@/services/cobro.service";
import type {
  AdminDetalleCajaCobradorSafe,
  AdminMovimientoCajaSafe,
} from "@/types/admin-cobrador-caja.types";
import type { CodigoCierreCajaSafe } from "@/types/cobro.types";

// Los datos del comprobante se buscan en bloque y se comprueba su cobrador.
export async function enriquecerMovimientosAdminCaja(
  movimientos: AdminMovimientoCajaSafe[],
): Promise<AdminMovimientoCajaSafe[]> {
  const ids = movimientos
    .filter((m) => m.tipoMovimiento === "cobro" && m.movimientoFinancieroId)
    .map((m) => m.movimientoFinancieroId!);
  if (ids.length === 0) return movimientos;
  await connectDB();
  const [pagos, correcciones] = await Promise.all([
    MovimientoFinanciero.find({ _id: { $in: ids }, tipoMovimiento: "pago" })
      .select(
        "numeroComprobante estadoComprobante corregidoPorMovimientoId creadoPorUsuarioId facturaAsociadaId clienteId",
      )
      .lean(),
    MovimientoFinanciero.find({
      pagoCorregidoId: { $in: ids },
      tipoMovimiento: "nota_debito",
    })
      .select("pagoCorregidoId")
      .lean(),
  ]);
  const pagosPorId = new Map(pagos.map((p) => [p._id.toString(), p]));
  const pagosCorregidos = new Set(
    correcciones.map((c) => c.pagoCorregidoId?.toString()),
  );
  return movimientos.map((m) => {
    if (m.tipoMovimiento !== "cobro") return m;
    const pago = m.movimientoFinancieroId
      ? pagosPorId.get(m.movimientoFinancieroId)
      : null;
    if (!pago || pago.creadoPorUsuarioId?.toString() !== m.cobradorId) {
      return { ...m, comprobanteDisponible: false, puedeCorregir: false };
    }
    const corregido =
      pago.estadoComprobante === "corregido_parcialmente" ||
      Boolean(pago.corregidoPorMovimientoId) ||
      pagosCorregidos.has(pago._id.toString());
    return {
      ...m,
      numeroComprobante: Number(pago.numeroComprobante || 0) || null,
      estadoComprobante: corregido
        ? "corregido_parcialmente"
        : pago.estadoComprobante || "vigente",
      comprobanteDisponible: true,
      puedeCorregir:
        !corregido && Boolean(pago.facturaAsociadaId && pago.clienteId),
    };
  });
}

export async function obtenerDetalleCajaCobradorAdmin(
  cobradorId: string,
): Promise<AdminDetalleCajaCobradorSafe | null> {
  if (!mongoose.isObjectIdOrHexString(cobradorId)) return null;
  await connectDB();
  const usuario = await Usuario.findOne({ _id: cobradorId, rol: "cobrador" })
    .select("nombre apellido email dni estado")
    .lean();
  if (!usuario) return null;
  const [caja, codigo] = await Promise.all([
    obtenerCajaCobradorResumen(cobradorId),
    CodigoCierreCaja.findOne({
      cobradorId,
      estado: "pendiente",
      venceEn: { $gte: new Date() },
    })
      .sort({ creadoEn: -1, _id: -1 })
      .lean(),
  ]);
  const nombre =
    [usuario.apellido, usuario.nombre].filter(Boolean).join(", ") ||
    usuario.email ||
    "Cobrador";
  const codigoPendiente: CodigoCierreCajaSafe | null = codigo
    ? {
        id: codigo._id.toString(),
        codigo: codigo.codigo,
        cobradorId,
        cobradorNombre: nombre,
        importe: Number(codigo.importe),
        estado: "pendiente",
        generadoPorAdminId: codigo.generadoPorAdminId.toString(),
        generadoPorAdminNombre: codigo.generadoPorAdminNombre || "",
        usadoEn: codigo.usadoEn?.toISOString() || null,
        venceEn: codigo.venceEn.toISOString(),
        creadoEn: codigo.creadoEn.toISOString(),
        actualizadoEn: codigo.actualizadoEn.toISOString(),
      }
    : null;
  const recientes = [...caja.movimientos]
    .sort(
      (a, b) =>
        new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime() ||
        b.id.localeCompare(a.id),
    )
    .slice(0, 20)
    .map((m) => ({ ...m, cobradorNombre: nombre }));
  return {
    cobrador: {
      cobradorId,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      dni: usuario.dni,
      estado: usuario.estado,
      saldoActual: caja.saldoActual,
      totalCobrado: caja.totalCobrado,
      totalCierres: caja.totalCierres,
      totalAjustesCorreccion: caja.totalAjustesCorreccion,
      totalAjustesPostCierre: caja.totalAjustesPostCierre,
      codigoPendiente,
    },
    disponibleParaRendir: Math.max(0, caja.saldoActual),
    cantidadMovimientos: caja.movimientos.length,
    movimientos: await enriquecerMovimientosAdminCaja(recientes),
  };
}

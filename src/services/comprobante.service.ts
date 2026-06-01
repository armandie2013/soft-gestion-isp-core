import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import CajaCobrador from "@/models/CajaCobrador";
import Cliente from "@/models/Cliente";
import CodigoCierreCaja from "@/models/CodigoCierreCaja";
import MovimientoFinanciero from "@/models/MovimientoFinanciero";
import Usuario from "@/models/Usuario";
import type {
  ComprobanteCierreCajaSafe,
  ComprobantePagoClienteSafe,
} from "@/types/comprobante.types";

function validarObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function formatPeriodoLabel(mes?: number | null, anio?: number | null) {
  if (!mes || !anio) return "Sin período";

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return `${meses[mes - 1] || mes}/${anio}`;
}

function buildNombreUsuario(usuario: any, fallback = "Usuario") {
  if (!usuario) return fallback;

  const nombreCompleto = `${usuario.apellido || ""}, ${
    usuario.nombre || ""
  }`.trim();

  return nombreCompleto || fallback;
}

export async function obtenerComprobantePagoCliente(
  movimientoId: string,
): Promise<ComprobantePagoClienteSafe | null> {
  if (!validarObjectId(movimientoId)) {
    return null;
  }

  await connectDB();

  const movimiento = await MovimientoFinanciero.findOne({
    _id: movimientoId,
    tipoMovimiento: "pago",
  }).lean();

  if (!movimiento) {
    return null;
  }

  const [cliente, cobrador, factura] = await Promise.all([
    Cliente.findById(movimiento.clienteId).lean(),

    movimiento.creadoPorUsuarioId
      ? Usuario.findById(movimiento.creadoPorUsuarioId).lean()
      : Promise.resolve(null),

    movimiento.facturaAsociadaId
      ? MovimientoFinanciero.findById(movimiento.facturaAsociadaId).lean()
      : Promise.resolve(null),
  ]);

  if (!cliente) {
    return null;
  }

  const cobradorNombre = cobrador
    ? buildNombreUsuario(cobrador, "Cobrador")
    : movimiento.creadoPorNombre || "Cobrador";

  return {
    movimientoId: movimiento._id.toString(),
    numeroComprobante: Number(movimiento.numeroComprobante || 0),
    fecha: movimiento.fecha?.toISOString?.() || "",

    clienteId: cliente._id.toString(),
    clienteNumero: Number(cliente.numeroCliente || 0),
    clienteNombre: cliente.nombre || "",
    clienteApellido: cliente.apellido || "",
    clienteDni: cliente.dni || "",
    clienteDireccion: cliente.direccion || "",
    clienteLocalidad: cliente.localidad || "",
    clienteProvincia: cliente.provincia || "",

    periodoLabel: formatPeriodoLabel(
      movimiento.referenciaMes,
      movimiento.referenciaAnio,
    ),
    facturaNumeroComprobante: factura
      ? Number(factura.numeroComprobante || 0)
      : null,
    concepto: movimiento.concepto || "",
    importePagado: Number(movimiento.haber || 0),
    observacion: movimiento.observacion || "",

    cobradorId: movimiento.creadoPorUsuarioId?.toString?.() || "",
    cobradorNombre,

    saldoClienteDespuesDelPago: Number(movimiento.saldo || 0),
  };
}

export async function obtenerComprobanteCierreCaja(
  cierreId: string,
): Promise<ComprobanteCierreCajaSafe | null> {
  if (!validarObjectId(cierreId)) {
    return null;
  }

  await connectDB();

  const cierre = await CajaCobrador.findOne({
    _id: cierreId,
    tipoMovimiento: "cierre_caja",
  }).lean();

  if (!cierre) {
    return null;
  }

  const [cobrador, codigo] = await Promise.all([
    cierre.cobradorId
      ? Usuario.findById(cierre.cobradorId).lean()
      : Promise.resolve(null),

    cierre.codigoCierreId
      ? CodigoCierreCaja.findById(cierre.codigoCierreId).lean()
      : Promise.resolve(null),
  ]);

  return {
    cierreId: cierre._id.toString(),
    fechaCierre: cierre.creadoEn?.toISOString?.() || "",

    cobradorId: cierre.cobradorId?.toString?.() || "",
    cobradorNombre: buildNombreUsuario(cobrador, "Cobrador"),
    cobradorEmail: cobrador?.email || "",

    importeCerrado: Number(cierre.importe || 0),
    saldoCajaDespuesDelCierre: Number(cierre.saldoCaja || 0),

    codigo: codigo?.codigo || "-",
    codigoEstado: codigo?.estado || "-",
    codigoGeneradoPor: codigo?.generadoPorAdminNombre || "-",
    codigoCreadoEn: codigo?.creadoEn?.toISOString?.() || null,
    codigoUsadoEn: codigo?.usadoEn?.toISOString?.() || null,

    descripcion: cierre.descripcion || "",
    observacion: cierre.observacion || "",
  };
}
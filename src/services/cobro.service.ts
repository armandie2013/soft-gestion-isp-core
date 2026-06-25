// import mongoose from "mongoose";
// import { z } from "zod";
// import { connectDB } from "@/lib/db";
// import Cliente from "@/models/Cliente";
// import Usuario from "@/models/Usuario";
// import CajaCobrador from "@/models/CajaCobrador";
// import CodigoCierreCaja from "@/models/CodigoCierreCaja";
// import MovimientoFinanciero from "@/models/MovimientoFinanciero";
// import {
//   generarCodigoVerificacionPago,
//   generarFirmaPago,
// } from "@/utils/comprobante-verificacion";
// import { obtenerSiguienteNumeroComprobante } from "@/utils/obtenerSiguienteNumeroComprobante";
// import {
//   obtenerDetallePeriodoCliente,
//   obtenerEstadoCuentaCliente,
// } from "@/services/movimiento-financiero.service";
// import type {
//   AdminCajaCobradoresResumenSafe,
//   CajaCobradorMovimientoSafe,
//   CajaCobradorResumen,
//   CajaCobradorTipo,
//   CobradorCajaResumenSafe,
//   CodigoCierreCajaEstado,
//   CodigoCierreCajaSafe,
// } from "@/types/cobro.types";

// const LIMITE_CAJA_MINIMO = 100000;

// export const registrarPagoCobradorSchema = z.object({
//   clienteId: z
//     .string()
//     .min(1, "Falta el cliente.")
//     .refine((value) => mongoose.Types.ObjectId.isValid(value), {
//       message: "Cliente inválido.",
//     }),

//   facturaAsociadaId: z
//     .string()
//     .min(1, "Debe seleccionar un período.")
//     .refine((value) => mongoose.Types.ObjectId.isValid(value), {
//       message: "Período inválido.",
//     }),

//   importe: z.coerce
//     .number({
//       message: "El importe debe ser un número válido.",
//     })
//     .min(0.01, "El importe debe ser mayor a cero."),

//   observacion: z.string().trim().max(300).optional().default(""),
// });

// export const generarCodigoCierreCajaSchema = z.object({
//   cobradorId: z
//     .string()
//     .min(1, "Falta el cobrador.")
//     .refine((value) => mongoose.Types.ObjectId.isValid(value), {
//       message: "Cobrador inválido.",
//     }),
// });

// export const validarCodigoCierreCajaSchema = z.object({
//   codigo: z
//     .string()
//     .trim()
//     .regex(/^\d{6}$/, "El código debe tener 6 dígitos."),
// });

// export type RegistrarPagoCobradorInput = z.infer<
//   typeof registrarPagoCobradorSchema
// >;

// export type GenerarCodigoCierreCajaInput = z.infer<
//   typeof generarCodigoCierreCajaSchema
// >;

// export type ValidarCodigoCierreCajaInput = z.infer<
//   typeof validarCodigoCierreCajaSchema
// >;

// export type UsuarioCobradorPago = {
//   userId: string;
//   nombre: string;
//   rol: string;
// };

// export type UsuarioAdminCaja = {
//   userId: string;
//   nombre: string;
//   rol: string;
// };

// function getClienteNombreCompleto(cliente: any) {
//   const apellido = String(cliente?.apellido || "").trim();
//   const nombre = String(cliente?.nombre || "").trim();

//   const nombreCompleto = `${apellido}, ${nombre}`
//     .replace(/^,\s*/, "")
//     .replace(/,\s*$/, "")
//     .trim();

//   return nombreCompleto || "Cliente";
// }

// function toSafeCajaMovimiento(movimiento: any): CajaCobradorMovimientoSafe {
//   return {
//     id: movimiento._id.toString(),
//     cobradorId: movimiento.cobradorId?.toString?.() || "",
//     tipoMovimiento: movimiento.tipoMovimiento as CajaCobradorTipo,
//     clienteId: movimiento.clienteId ? movimiento.clienteId.toString() : null,
//     movimientoFinancieroId: movimiento.movimientoFinancieroId
//       ? movimiento.movimientoFinancieroId.toString()
//       : null,
//     facturaAsociadaId: movimiento.facturaAsociadaId
//       ? movimiento.facturaAsociadaId.toString()
//       : null,
//     codigoCierreId: movimiento.codigoCierreId
//       ? movimiento.codigoCierreId.toString()
//       : null,
//     importe: Number(movimiento.importe || 0),
//     saldoCaja: Number(movimiento.saldoCaja || 0),
//     descripcion: movimiento.descripcion || "",
//     observacion: movimiento.observacion || "",
//     creadoEn: movimiento.creadoEn?.toISOString?.() || "",
//     actualizadoEn: movimiento.actualizadoEn?.toISOString?.() || "",
//   };
// }

// async function enriquecerMovimientosCaja(
//   movimientos: CajaCobradorMovimientoSafe[],
// ) {
//   const clienteIds = [
//     ...new Set(
//       movimientos
//         .map((movimiento) => movimiento.clienteId)
//         .filter((id): id is string => Boolean(id)),
//     ),
//   ];

//   const facturaIds = [
//     ...new Set(
//       movimientos
//         .map((movimiento) => movimiento.facturaAsociadaId)
//         .filter((id): id is string => Boolean(id)),
//     ),
//   ];

//   const [clientesRaw, facturasRaw] = await Promise.all([
//     clienteIds.length > 0
//       ? Cliente.find({ _id: { $in: clienteIds } })
//           .select("nombre apellido dni")
//           .lean()
//       : [],

//     facturaIds.length > 0
//       ? MovimientoFinanciero.find({ _id: { $in: facturaIds } })
//           .select("numeroComprobante")
//           .lean()
//       : [],
//   ]);

//   const clientesMap = new Map<string, any>(
//     clientesRaw.map((cliente: any) => [cliente._id.toString(), cliente]),
//   );

//   const facturasMap = new Map<string, any>(
//     facturasRaw.map((factura: any) => [factura._id.toString(), factura]),
//   );

//   return movimientos.map((movimiento) => {
//     const cliente = movimiento.clienteId
//       ? clientesMap.get(movimiento.clienteId)
//       : null;

//     const factura = movimiento.facturaAsociadaId
//       ? facturasMap.get(movimiento.facturaAsociadaId)
//       : null;

//     const clienteNombre = cliente ? getClienteNombreCompleto(cliente) : "";
//     const clienteDni = cliente?.dni ? String(cliente.dni) : "";
//     const numeroFactura = factura?.numeroComprobante
//       ? String(factura.numeroComprobante)
//       : "";

//     return {
//       ...movimiento,
//       clienteNombre,
//       nombreCliente: clienteNombre,
//       nombreCompletoCliente: clienteNombre,
//       clienteDni,
//       dniCliente: clienteDni,
//       numeroFactura,
//       facturaNumero: numeroFactura,
//     };
//   });
// }

// function toSafeCodigo(codigo: any): CodigoCierreCajaSafe {
//   return {
//     id: codigo._id.toString(),
//     codigo: codigo.codigo || "",
//     cobradorId: codigo.cobradorId?.toString?.() || "",
//     cobradorNombre: codigo.cobradorNombre || "",
//     importe: Number(codigo.importe || 0),
//     estado: codigo.estado as CodigoCierreCajaEstado,
//     generadoPorAdminId: codigo.generadoPorAdminId?.toString?.() || "",
//     generadoPorAdminNombre: codigo.generadoPorAdminNombre || "",
//     usadoEn: codigo.usadoEn?.toISOString?.() || null,
//     venceEn: codigo.venceEn?.toISOString?.() || "",
//     creadoEn: codigo.creadoEn?.toISOString?.() || "",
//     actualizadoEn: codigo.actualizadoEn?.toISOString?.() || "",
//   };
// }

// function generarCodigoSeisDigitos() {
//   return String(Math.floor(100000 + Math.random() * 900000));
// }

// function ordenarPeriodosPendientesPorAntiguedad(periodos: any[]) {
//   return [...periodos].sort((a, b) => {
//     const anioA = a.referenciaAnio || 0;
//     const anioB = b.referenciaAnio || 0;

//     if (anioA !== anioB) return anioA - anioB;

//     const mesA = a.referenciaMes || 0;
//     const mesB = b.referenciaMes || 0;

//     if (mesA !== mesB) return mesA - mesB;

//     return Number(a.numeroComprobante || 0) - Number(b.numeroComprobante || 0);
//   });
// }

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// async function obtenerDatosCajaCobrador(cobradorId: string) {
//   const cobradorRaw = await Usuario.findById(cobradorId)
//     .select("limiteCajaCobrador rol")
//     .lean();

//   if (!cobradorRaw || cobradorRaw.rol !== "cobrador") {
//     return null;
//   }

//   const limiteCajaCobrador = Number(
//     cobradorRaw.limiteCajaCobrador ?? LIMITE_CAJA_MINIMO,
//   );

//   return {
//     limiteCajaCobrador: Number.isFinite(limiteCajaCobrador)
//       ? Math.max(limiteCajaCobrador, LIMITE_CAJA_MINIMO)
//       : LIMITE_CAJA_MINIMO,
//   };
// }

// async function obtenerSaldoActualCliente(clienteId: string) {
//   const ultimoMovimiento = await MovimientoFinanciero.findOne({ clienteId })
//     .sort({ fecha: -1, creadoEn: -1 })
//     .lean();

//   return Number(ultimoMovimiento?.saldo || 0);
// }

// async function obtenerSaldoCajaCobrador(cobradorId: string) {
//   const ultimoMovimiento = await CajaCobrador.findOne({ cobradorId })
//     .sort({ creadoEn: -1 })
//     .lean();

//   return Number(ultimoMovimiento?.saldoCaja || 0);
// }

// async function marcarCodigosVencidos() {
//   await CodigoCierreCaja.updateMany(
//     {
//       estado: "pendiente",
//       venceEn: { $lt: new Date() },
//     },
//     {
//       $set: {
//         estado: "vencido",
//       },
//     },
//   );
// }

// export async function obtenerCajaCobradorResumen(
//   cobradorId: string,
// ): Promise<CajaCobradorResumen> {
//   await connectDB();

//   const movimientosRaw = await CajaCobrador.find({ cobradorId })
//     .sort({ creadoEn: -1 })
//     .lean();

//   const movimientosBase = movimientosRaw.map(toSafeCajaMovimiento);
//   const movimientos = await enriquecerMovimientosCaja(movimientosBase);

//   const totalCobrado = movimientos
//     .filter((movimiento) => movimiento.tipoMovimiento === "cobro")
//     .reduce((acc, movimiento) => acc + movimiento.importe, 0);

//   const totalCierres = movimientos
//     .filter((movimiento) => movimiento.tipoMovimiento === "cierre_caja")
//     .reduce((acc, movimiento) => acc + movimiento.importe, 0);

//   const saldoActual = totalCobrado - totalCierres;

//   return {
//     totalCobrado,
//     totalCierres,
//     saldoActual,
//     movimientos,
//   };
// }

// export async function obtenerContextoCobroCobrador(cobradorId: string) {
//   await connectDB();

//   const [saldoCajaActual, datosCajaCobrador] = await Promise.all([
//     obtenerSaldoCajaCobrador(cobradorId),
//     obtenerDatosCajaCobrador(cobradorId),
//   ]);

//   if (!datosCajaCobrador) {
//     return null;
//   }

//   const limiteCajaCobrador = Math.max(
//     Number(datosCajaCobrador.limiteCajaCobrador || LIMITE_CAJA_MINIMO),
//     LIMITE_CAJA_MINIMO,
//   );

//   return {
//     saldoCajaActual,
//     limiteCajaCobrador,
//     disponibleCaja: Math.max(limiteCajaCobrador - saldoCajaActual, 0),
//   };
// }

// export async function obtenerCobradoresCajaResumen(): Promise<
//   CobradorCajaResumenSafe[]
// > {
//   await connectDB();
//   await marcarCodigosVencidos();

//   const cobradores = await Usuario.find({
//     rol: "cobrador",
//   })
//     .sort({ apellido: 1, nombre: 1 })
//     .lean();

//   const resultados = await Promise.all(
//     cobradores.map(async (cobrador: any) => {
//       const caja = await obtenerCajaCobradorResumen(cobrador._id.toString());

//       const codigoPendienteRaw = await CodigoCierreCaja.findOne({
//         cobradorId: cobrador._id,
//         estado: "pendiente",
//         venceEn: { $gte: new Date() },
//       })
//         .sort({ creadoEn: -1 })
//         .lean();

//       return {
//         cobradorId: cobrador._id.toString(),
//         nombre: cobrador.nombre || "",
//         apellido: cobrador.apellido || "",
//         email: cobrador.email || "",
//         saldoActual: caja.saldoActual,
//         totalCobrado: caja.totalCobrado,
//         totalCierres: caja.totalCierres,
//         codigoPendiente: codigoPendienteRaw
//           ? toSafeCodigo(codigoPendienteRaw)
//           : null,
//       };
//     }),
//   );

//   return resultados;
// }

// export async function obtenerAdminCajaCobradoresResumen(): Promise<AdminCajaCobradoresResumenSafe> {
//   await connectDB();
//   await marcarCodigosVencidos();

//   const cobradores = await obtenerCobradoresCajaResumen();

//   const totalSaldoCobradores = cobradores.reduce(
//     (acc, cobrador) => acc + cobrador.saldoActual,
//     0,
//   );

//   const totalRecibidoAdmin = cobradores.reduce(
//     (acc, cobrador) => acc + cobrador.totalCierres,
//     0,
//   );

//   const cantidadCobradoresConSaldo = cobradores.filter(
//     (cobrador) => cobrador.saldoActual > 0,
//   ).length;

//   const cantidadCodigosPendientes = cobradores.filter(
//     (cobrador) => cobrador.codigoPendiente,
//   ).length;

//   const cantidadCierresRealizados = cobradores.reduce(
//     (acc, cobrador) => acc + (cobrador.totalCierres > 0 ? 1 : 0),
//     0,
//   );

//   return {
//     totalSaldoCobradores,
//     totalRecibidoAdmin,
//     cantidadCobradores: cobradores.length,
//     cantidadCobradoresConSaldo,
//     cantidadCodigosPendientes,
//     cantidadCierresRealizados,
//     cobradores,
//   };
// }

// export async function registrarPagoCobrador(
//   input: RegistrarPagoCobradorInput,
//   cobrador: UsuarioCobradorPago,
// ) {
//   const parsed = registrarPagoCobradorSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//     };
//   }

//   if (cobrador.rol !== "cobrador") {
//     return {
//       ok: false,
//       message:
//         "Solo un usuario cobrador puede registrar pagos desde este módulo.",
//     };
//   }

//   const { clienteId, facturaAsociadaId, importe, observacion } = parsed.data;

//   await connectDB();

//   const cliente = await Cliente.findById(clienteId).lean();

//   if (!cliente) {
//     return {
//       ok: false,
//       message: "Cliente no encontrado.",
//     };
//   }

//   const detallePeriodo = await obtenerDetallePeriodoCliente(
//     clienteId,
//     facturaAsociadaId,
//   );

//   if (!detallePeriodo) {
//     return {
//       ok: false,
//       message: "El período seleccionado no existe o no pertenece al cliente.",
//     };
//   }

//   const estadoCuenta = await obtenerEstadoCuentaCliente(clienteId);

//   if (!estadoCuenta) {
//     return {
//       ok: false,
//       message: "No se pudo obtener el estado de cuenta del cliente.",
//     };
//   }

//   const periodosPendientesOrdenados = ordenarPeriodosPendientesPorAntiguedad(
//     estadoCuenta.periodos.filter((periodo) => periodo.saldoPeriodo > 0),
//   );

//   const primerPeriodoPendiente = periodosPendientesOrdenados[0] || null;

//   if (
//     primerPeriodoPendiente &&
//     primerPeriodoPendiente.facturaId !== facturaAsociadaId
//   ) {
//     return {
//       ok: false,
//       message:
//         "No se puede cobrar este período porque existen períodos anteriores impagos.",
//     };
//   }

//   if (detallePeriodo.periodo.saldoPeriodo <= 0) {
//     return {
//       ok: false,
//       message: "El período seleccionado no tiene saldo pendiente.",
//     };
//   }

//   if (importe > detallePeriodo.periodo.saldoPeriodo) {
//     return {
//       ok: false,
//       message: `El pago no puede superar el saldo del período (${formatMoney(
//         detallePeriodo.periodo.saldoPeriodo,
//       )}).`,
//     };
//   }

//   const [saldoActualCaja, datosCajaCobrador] = await Promise.all([
//     obtenerSaldoCajaCobrador(cobrador.userId),
//     obtenerDatosCajaCobrador(cobrador.userId),
//   ]);

//   if (!datosCajaCobrador) {
//     return {
//       ok: false,
//       message: "Cobrador no encontrado o sin permisos para registrar pagos.",
//     };
//   }

//   const { limiteCajaCobrador } = datosCajaCobrador;
//   const saldoCajaProyectado = saldoActualCaja + importe;

//   if (saldoCajaProyectado > limiteCajaCobrador) {
//     return {
//       ok: false,
//       message:
//         "No se puede registrar este cobro porque tu caja alcanzó el límite operativo permitido. Realizá el cierre de caja correspondiente antes de continuar.",
//     };
//   }

//   const saldoActualCliente = await obtenerSaldoActualCliente(clienteId);
//   const nuevoSaldoCliente = saldoActualCliente - importe;
//   const numeroComprobante = await obtenerSiguienteNumeroComprobante();

//   const concepto = `Pago período ${detallePeriodo.periodo.periodoLabel} - Factura N° ${detallePeriodo.periodo.numeroComprobante}`;

//   const movimientoFinancieroId = new mongoose.Types.ObjectId();
//   const fechaPago = new Date();
//   const codigoVerificacion = generarCodigoVerificacionPago(numeroComprobante);

//   const firmaVerificacion = generarFirmaPago({
//     movimientoId: movimientoFinancieroId.toString(),
//     numeroComprobante,
//     clienteId,
//     clienteDni: cliente.dni || "",
//     importe,
//     fechaIso: fechaPago.toISOString(),
//   });

//   const movimientoFinanciero = await MovimientoFinanciero.create({
//     _id: movimientoFinancieroId,
//     numeroComprobante,
//     clienteId,
//     tipoMovimiento: "pago",
//     facturaAsociadaId,
//     fecha: fechaPago,
//     concepto,
//     debe: 0,
//     haber: importe,
//     saldo: nuevoSaldoCliente,
//     referenciaMes: detallePeriodo.periodo.referenciaMes ?? null,
//     referenciaAnio: detallePeriodo.periodo.referenciaAnio ?? null,
//     observacion: observacion?.trim() || "",
//     creadoPorUsuarioId: cobrador.userId,
//     creadoPorNombre: cobrador.nombre,
//     creadoPorRol: cobrador.rol,
//     codigoVerificacion,
//     firmaVerificacion,
//   });

//   const clienteNombre = getClienteNombreCompleto(cliente);
//   const clienteDni = cliente.dni || "-";
//   const nuevoSaldoCaja = saldoCajaProyectado;

//   await CajaCobrador.create({
//     cobradorId: cobrador.userId,
//     tipoMovimiento: "cobro",
//     clienteId,
//     movimientoFinancieroId: movimientoFinanciero._id,
//     facturaAsociadaId,
//     importe,
//     saldoCaja: nuevoSaldoCaja,
//     descripcion: `Cobro a cliente ${clienteNombre} DNI ${clienteDni} - ${concepto}`,
//     observacion: observacion?.trim() || "",
//   });

//   return {
//     ok: true,
//     message: `Pago registrado correctamente. Comprobante N° ${numeroComprobante}.`,
//   };
// }

// export async function generarCodigoCierreCaja(
//   input: GenerarCodigoCierreCajaInput,
//   admin: UsuarioAdminCaja,
// ) {
//   const parsed = generarCodigoCierreCajaSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//       codigo: null as CodigoCierreCajaSafe | null,
//     };
//   }

//   if (admin.rol !== "admin") {
//     return {
//       ok: false,
//       message: "Solo un administrador puede generar códigos de cierre.",
//       codigo: null,
//     };
//   }

//   const { cobradorId } = parsed.data;

//   await connectDB();
//   await marcarCodigosVencidos();

//   const cobrador = await Usuario.findOne({
//     _id: cobradorId,
//     rol: "cobrador",
//   }).lean();

//   if (!cobrador) {
//     return {
//       ok: false,
//       message: "Cobrador no encontrado.",
//       codigo: null,
//     };
//   }

//   const caja = await obtenerCajaCobradorResumen(cobradorId);

//   if (caja.saldoActual <= 0) {
//     return {
//       ok: false,
//       message: "El cobrador no tiene saldo pendiente para cerrar.",
//       codigo: null,
//     };
//   }

//   await CodigoCierreCaja.updateMany(
//     {
//       cobradorId,
//       estado: "pendiente",
//     },
//     {
//       $set: {
//         estado: "cancelado",
//       },
//     },
//   );

//   const codigo = await CodigoCierreCaja.create({
//     codigo: generarCodigoSeisDigitos(),
//     cobradorId,
//     cobradorNombre: `${cobrador.apellido || ""}, ${
//       cobrador.nombre || ""
//     }`.trim(),
//     importe: caja.saldoActual,
//     estado: "pendiente",
//     generadoPorAdminId: admin.userId,
//     generadoPorAdminNombre: admin.nombre,
//     venceEn: new Date(Date.now() + 30 * 60 * 1000),
//   });

//   return {
//     ok: true,
//     message: `Código generado correctamente para ${formatMoney(
//       caja.saldoActual,
//     )}.`,
//     codigo: toSafeCodigo(codigo),
//   };
// }

// export async function validarCodigoCierreCajaCobrador(
//   input: ValidarCodigoCierreCajaInput,
//   cobrador: UsuarioCobradorPago,
// ) {
//   const parsed = validarCodigoCierreCajaSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Código inválido.",
//       importe: 0,
//     };
//   }

//   if (cobrador.rol !== "cobrador") {
//     return {
//       ok: false,
//       message: "Solo un cobrador puede validar códigos de cierre.",
//       importe: 0,
//     };
//   }

//   await connectDB();
//   await marcarCodigosVencidos();

//   const codigo = await CodigoCierreCaja.findOne({
//     codigo: parsed.data.codigo,
//     cobradorId: cobrador.userId,
//     estado: "pendiente",
//     venceEn: { $gte: new Date() },
//   }).lean();

//   if (!codigo) {
//     return {
//       ok: false,
//       message: "Código incorrecto, vencido o no autorizado para este cobrador.",
//       importe: 0,
//     };
//   }

//   const caja = await obtenerCajaCobradorResumen(cobrador.userId);

//   if (Number(codigo.importe) !== Number(caja.saldoActual)) {
//     return {
//       ok: false,
//       message:
//         "El importe de tu caja cambió desde que se generó el código. Pedí un nuevo código al administrador.",
//       importe: 0,
//     };
//   }

//   return {
//     ok: true,
//     message: `Código válido para cerrar caja por ${formatMoney(
//       caja.saldoActual,
//     )}.`,
//     importe: caja.saldoActual,
//   };
// }

// export async function confirmarCierreCajaCobrador(
//   input: ValidarCodigoCierreCajaInput,
//   cobrador: UsuarioCobradorPago,
// ) {
//   const validacion = await validarCodigoCierreCajaCobrador(input, cobrador);

//   if (!validacion.ok) {
//     return validacion;
//   }

//   await connectDB();

//   const codigo = await CodigoCierreCaja.findOne({
//     codigo: input.codigo,
//     cobradorId: cobrador.userId,
//     estado: "pendiente",
//     venceEn: { $gte: new Date() },
//   });

//   if (!codigo) {
//     return {
//       ok: false,
//       message: "El código ya no está disponible.",
//       importe: 0,
//     };
//   }

//   const caja = await obtenerCajaCobradorResumen(cobrador.userId);

//   if (caja.saldoActual <= 0) {
//     return {
//       ok: false,
//       message: "Tu caja ya se encuentra en $0.",
//       importe: 0,
//     };
//   }

//   await CajaCobrador.create({
//     cobradorId: cobrador.userId,
//     tipoMovimiento: "cierre_caja",
//     clienteId: null,
//     movimientoFinancieroId: null,
//     facturaAsociadaId: null,
//     codigoCierreId: codigo._id,
//     importe: caja.saldoActual,
//     saldoCaja: 0,
//     descripcion: `Cierre de caja autorizado con código ${codigo.codigo}`,
//     observacion: `Código generado por ${codigo.generadoPorAdminNombre}`,
//   });

//   codigo.estado = "usado";
//   codigo.usadoEn = new Date();
//   await codigo.save();

//   return {
//     ok: true,
//     message: "Cierre de caja confirmado correctamente. Tu caja quedó en $0.",
//     importe: caja.saldoActual,
//   };
// }


// // src/services/cobro.service.ts

// import mongoose from "mongoose";
// import { z } from "zod";
// import { connectDB } from "@/lib/db";
// import Cliente from "@/models/Cliente";
// import Usuario from "@/models/Usuario";
// import CajaCobrador from "@/models/CajaCobrador";
// import CodigoCierreCaja from "@/models/CodigoCierreCaja";
// import MovimientoFinanciero from "@/models/MovimientoFinanciero";
// import {
//   generarCodigoVerificacionPago,
//   generarFirmaPago,
// } from "@/utils/comprobante-verificacion";
// import { obtenerSiguienteNumeroComprobante } from "@/utils/obtenerSiguienteNumeroComprobante";
// import {
//   obtenerDetallePeriodoCliente,
//   obtenerEstadoCuentaCliente,
// } from "@/services/movimiento-financiero.service";
// import type {
//   AdminCajaCobradoresResumenSafe,
//   CajaCobradorMovimientoSafe,
//   CajaCobradorResumen,
//   CajaCobradorTipo,
//   CobradorCajaResumenSafe,
//   CodigoCierreCajaEstado,
//   CodigoCierreCajaSafe,
// } from "@/types/cobro.types";

// const LIMITE_CAJA_MINIMO = 100000;

// export const registrarPagoCobradorSchema = z.object({
//   clienteId: z
//     .string()
//     .min(1, "Falta el cliente.")
//     .refine((value) => mongoose.Types.ObjectId.isValid(value), {
//       message: "Cliente inválido.",
//     }),

//   facturaAsociadaId: z
//     .string()
//     .min(1, "Debe seleccionar un período.")
//     .refine((value) => mongoose.Types.ObjectId.isValid(value), {
//       message: "Período inválido.",
//     }),

//   importe: z.coerce
//     .number({
//       message: "El importe debe ser un número válido.",
//     })
//     .min(0.01, "El importe debe ser mayor a cero."),

//   observacion: z.string().trim().max(300).optional().default(""),
// });

// export const generarCodigoCierreCajaSchema = z.object({
//   cobradorId: z
//     .string()
//     .min(1, "Falta el cobrador.")
//     .refine((value) => mongoose.Types.ObjectId.isValid(value), {
//       message: "Cobrador inválido.",
//     }),
// });

// export const validarCodigoCierreCajaSchema = z.object({
//   codigo: z
//     .string()
//     .trim()
//     .regex(/^\d{6}$/, "El código debe tener 6 dígitos."),
// });

// export type RegistrarPagoCobradorInput = z.infer<
//   typeof registrarPagoCobradorSchema
// >;

// export type GenerarCodigoCierreCajaInput = z.infer<
//   typeof generarCodigoCierreCajaSchema
// >;

// export type ValidarCodigoCierreCajaInput = z.infer<
//   typeof validarCodigoCierreCajaSchema
// >;

// export type UsuarioCobradorPago = {
//   userId: string;
//   nombre: string;
//   rol: string;
// };

// export type UsuarioAdminCaja = {
//   userId: string;
//   nombre: string;
//   rol: string;
// };

// function getClienteNombreCompleto(cliente: any) {
//   const apellido = String(cliente?.apellido || "").trim();
//   const nombre = String(cliente?.nombre || "").trim();

//   const nombreCompleto = `${apellido}, ${nombre}`
//     .replace(/^,\s*/, "")
//     .replace(/,\s*$/, "")
//     .trim();

//   return nombreCompleto || "Cliente";
// }

// function toSafeCajaMovimiento(movimiento: any): CajaCobradorMovimientoSafe {
//   return {
//     id: movimiento._id.toString(),
//     cobradorId: movimiento.cobradorId?.toString?.() || "",
//     tipoMovimiento: movimiento.tipoMovimiento as CajaCobradorTipo,
//     clienteId: movimiento.clienteId ? movimiento.clienteId.toString() : null,
//     movimientoFinancieroId: movimiento.movimientoFinancieroId
//       ? movimiento.movimientoFinancieroId.toString()
//       : null,
//     facturaAsociadaId: movimiento.facturaAsociadaId
//       ? movimiento.facturaAsociadaId.toString()
//       : null,
//     codigoCierreId: movimiento.codigoCierreId
//       ? movimiento.codigoCierreId.toString()
//       : null,
//     importe: Number(movimiento.importe || 0),
//     saldoCaja: Number(movimiento.saldoCaja || 0),
//     descripcion: movimiento.descripcion || "",
//     observacion: movimiento.observacion || "",
//     creadoEn: movimiento.creadoEn?.toISOString?.() || "",
//     actualizadoEn: movimiento.actualizadoEn?.toISOString?.() || "",
//   };
// }

// async function enriquecerMovimientosCaja(
//   movimientos: CajaCobradorMovimientoSafe[],
// ) {
//   const clienteIds = [
//     ...new Set(
//       movimientos
//         .map((movimiento) => movimiento.clienteId)
//         .filter((id): id is string => Boolean(id)),
//     ),
//   ];

//   const facturaIds = [
//     ...new Set(
//       movimientos
//         .map((movimiento) => movimiento.facturaAsociadaId)
//         .filter((id): id is string => Boolean(id)),
//     ),
//   ];

//   const [clientesRaw, facturasRaw] = await Promise.all([
//     clienteIds.length > 0
//       ? Cliente.find({ _id: { $in: clienteIds } })
//           .select("nombre apellido dni")
//           .lean()
//       : [],

//     facturaIds.length > 0
//       ? MovimientoFinanciero.find({ _id: { $in: facturaIds } })
//           .select("numeroComprobante")
//           .lean()
//       : [],
//   ]);

//   const clientesMap = new Map<string, any>(
//     clientesRaw.map((cliente: any) => [cliente._id.toString(), cliente]),
//   );

//   const facturasMap = new Map<string, any>(
//     facturasRaw.map((factura: any) => [factura._id.toString(), factura]),
//   );

//   return movimientos.map((movimiento) => {
//     const cliente = movimiento.clienteId
//       ? clientesMap.get(movimiento.clienteId)
//       : null;

//     const factura = movimiento.facturaAsociadaId
//       ? facturasMap.get(movimiento.facturaAsociadaId)
//       : null;

//     const clienteNombre = cliente ? getClienteNombreCompleto(cliente) : "";
//     const clienteDni = cliente?.dni ? String(cliente.dni) : "";
//     const numeroFactura = factura?.numeroComprobante
//       ? String(factura.numeroComprobante)
//       : "";

//     return {
//       ...movimiento,
//       clienteNombre,
//       nombreCliente: clienteNombre,
//       nombreCompletoCliente: clienteNombre,
//       clienteDni,
//       dniCliente: clienteDni,
//       numeroFactura,
//       facturaNumero: numeroFactura,
//     };
//   });
// }

// function toSafeCodigo(codigo: any): CodigoCierreCajaSafe {
//   return {
//     id: codigo._id.toString(),
//     codigo: codigo.codigo || "",
//     cobradorId: codigo.cobradorId?.toString?.() || "",
//     cobradorNombre: codigo.cobradorNombre || "",
//     importe: Number(codigo.importe || 0),
//     estado: codigo.estado as CodigoCierreCajaEstado,
//     generadoPorAdminId: codigo.generadoPorAdminId?.toString?.() || "",
//     generadoPorAdminNombre: codigo.generadoPorAdminNombre || "",
//     usadoEn: codigo.usadoEn?.toISOString?.() || null,
//     venceEn: codigo.venceEn?.toISOString?.() || "",
//     creadoEn: codigo.creadoEn?.toISOString?.() || "",
//     actualizadoEn: codigo.actualizadoEn?.toISOString?.() || "",
//   };
// }

// function generarCodigoSeisDigitos() {
//   return String(Math.floor(100000 + Math.random() * 900000));
// }

// function ordenarPeriodosPendientesPorAntiguedad(periodos: any[]) {
//   return [...periodos].sort((a, b) => {
//     const anioA = a.referenciaAnio || 0;
//     const anioB = b.referenciaAnio || 0;

//     if (anioA !== anioB) return anioA - anioB;

//     const mesA = a.referenciaMes || 0;
//     const mesB = b.referenciaMes || 0;

//     if (mesA !== mesB) return mesA - mesB;

//     return Number(a.numeroComprobante || 0) - Number(b.numeroComprobante || 0);
//   });
// }

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// async function obtenerDatosCajaCobrador(cobradorId: string) {
//   const cobradorRaw = await Usuario.findById(cobradorId)
//     .select("limiteCajaCobrador rol")
//     .lean();

//   if (!cobradorRaw || cobradorRaw.rol !== "cobrador") {
//     return null;
//   }

//   const limiteCajaCobrador = Number(
//     cobradorRaw.limiteCajaCobrador ?? LIMITE_CAJA_MINIMO,
//   );

//   return {
//     limiteCajaCobrador: Number.isFinite(limiteCajaCobrador)
//       ? Math.max(limiteCajaCobrador, LIMITE_CAJA_MINIMO)
//       : LIMITE_CAJA_MINIMO,
//   };
// }

// async function obtenerSaldoActualCliente(clienteId: string) {
//   const ultimoMovimiento = await MovimientoFinanciero.findOne({ clienteId })
//     .sort({ fecha: -1, creadoEn: -1 })
//     .lean();

//   return Number(ultimoMovimiento?.saldo || 0);
// }

// async function obtenerSaldoCajaCobrador(cobradorId: string) {
//   const ultimoMovimiento = await CajaCobrador.findOne({ cobradorId })
//     .sort({ creadoEn: -1 })
//     .lean();

//   return Number(ultimoMovimiento?.saldoCaja || 0);
// }

// async function marcarCodigosVencidos() {
//   await CodigoCierreCaja.updateMany(
//     {
//       estado: "pendiente",
//       venceEn: { $lt: new Date() },
//     },
//     {
//       $set: {
//         estado: "vencido",
//       },
//     },
//   );
// }

// export async function obtenerCajaCobradorResumen(
//   cobradorId: string,
// ): Promise<CajaCobradorResumen> {
//   await connectDB();

//   const movimientosRaw = await CajaCobrador.find({ cobradorId })
//     .sort({ creadoEn: -1 })
//     .lean();

//   const movimientosBase = movimientosRaw.map(toSafeCajaMovimiento);
//   const movimientos = await enriquecerMovimientosCaja(movimientosBase);

//   const totalCobrado = movimientos
//     .filter((movimiento) => movimiento.tipoMovimiento === "cobro")
//     .reduce((acc, movimiento) => acc + movimiento.importe, 0);

//   const totalCierres = movimientos
//     .filter((movimiento) => movimiento.tipoMovimiento === "cierre_caja")
//     .reduce((acc, movimiento) => acc + movimiento.importe, 0);

//   const saldoActual = totalCobrado - totalCierres;

//   return {
//     totalCobrado,
//     totalCierres,
//     saldoActual,
//     movimientos,
//   };
// }

// export async function obtenerContextoCobroCobrador(cobradorId: string) {
//   await connectDB();

//   const [saldoCajaActual, datosCajaCobrador] = await Promise.all([
//     obtenerSaldoCajaCobrador(cobradorId),
//     obtenerDatosCajaCobrador(cobradorId),
//   ]);

//   if (!datosCajaCobrador) {
//     return null;
//   }

//   const limiteCajaCobrador = Math.max(
//     Number(datosCajaCobrador.limiteCajaCobrador || LIMITE_CAJA_MINIMO),
//     LIMITE_CAJA_MINIMO,
//   );

//   return {
//     saldoCajaActual,
//     limiteCajaCobrador,
//     disponibleCaja: Math.max(limiteCajaCobrador - saldoCajaActual, 0),
//   };
// }

// export async function obtenerCobradoresCajaResumen(): Promise<
//   CobradorCajaResumenSafe[]
// > {
//   await connectDB();
//   await marcarCodigosVencidos();

//   const cobradores = await Usuario.find({
//     rol: "cobrador",
//   })
//     .sort({ apellido: 1, nombre: 1 })
//     .lean();

//   const resultados = await Promise.all(
//     cobradores.map(async (cobrador: any) => {
//       const caja = await obtenerCajaCobradorResumen(cobrador._id.toString());

//       const codigoPendienteRaw = await CodigoCierreCaja.findOne({
//         cobradorId: cobrador._id,
//         estado: "pendiente",
//         venceEn: { $gte: new Date() },
//       })
//         .sort({ creadoEn: -1 })
//         .lean();

//       return {
//         cobradorId: cobrador._id.toString(),
//         nombre: cobrador.nombre || "",
//         apellido: cobrador.apellido || "",
//         email: cobrador.email || "",
//         saldoActual: caja.saldoActual,
//         totalCobrado: caja.totalCobrado,
//         totalCierres: caja.totalCierres,
//         codigoPendiente: codigoPendienteRaw
//           ? toSafeCodigo(codigoPendienteRaw)
//           : null,
//       };
//     }),
//   );

//   return resultados;
// }

// export async function obtenerAdminCajaCobradoresResumen(): Promise<AdminCajaCobradoresResumenSafe> {
//   await connectDB();
//   await marcarCodigosVencidos();

//   const cobradores = await obtenerCobradoresCajaResumen();

//   const totalSaldoCobradores = cobradores.reduce(
//     (acc, cobrador) => acc + cobrador.saldoActual,
//     0,
//   );

//   const totalRecibidoAdmin = cobradores.reduce(
//     (acc, cobrador) => acc + cobrador.totalCierres,
//     0,
//   );

//   const cantidadCobradoresConSaldo = cobradores.filter(
//     (cobrador) => cobrador.saldoActual > 0,
//   ).length;

//   const cantidadCodigosPendientes = cobradores.filter(
//     (cobrador) => cobrador.codigoPendiente,
//   ).length;

//   const cantidadCierresRealizados = cobradores.reduce(
//     (acc, cobrador) => acc + (cobrador.totalCierres > 0 ? 1 : 0),
//     0,
//   );

//   return {
//     totalSaldoCobradores,
//         totalRecibidoAdmin,
//     cantidadCobradores: cobradores.length,
//     cantidadCobradoresConSaldo,
//     cantidadCodigosPendientes,
//     cantidadCierresRealizados,
//     cobradores,
//   };
// }

// export async function registrarPagoCobrador(
//   input: RegistrarPagoCobradorInput,
//   cobrador: UsuarioCobradorPago,
// ) {
//   const parsed = registrarPagoCobradorSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//     };
//   }

//   if (cobrador.rol !== "cobrador") {
//     return {
//       ok: false,
//       message:
//         "Solo un usuario cobrador puede registrar pagos desde este módulo.",
//     };
//   }

//   const { clienteId, facturaAsociadaId, importe, observacion } = parsed.data;

//   await connectDB();

//   const cliente = await Cliente.findById(clienteId).lean();

//   if (!cliente) {
//     return {
//       ok: false,
//       message: "Cliente no encontrado.",
//     };
//   }

//   const detallePeriodo = await obtenerDetallePeriodoCliente(
//     clienteId,
//     facturaAsociadaId,
//   );

//   if (!detallePeriodo) {
//     return {
//       ok: false,
//       message: "El período seleccionado no existe o no pertenece al cliente.",
//     };
//   }

//   const estadoCuenta = await obtenerEstadoCuentaCliente(clienteId);

//   if (!estadoCuenta) {
//     return {
//       ok: false,
//       message: "No se pudo obtener el estado de cuenta del cliente.",
//     };
//   }

//   const periodosPendientesOrdenados = ordenarPeriodosPendientesPorAntiguedad(
//     estadoCuenta.periodos.filter((periodo) => periodo.saldoPeriodo > 0),
//   );

//   const primerPeriodoPendiente = periodosPendientesOrdenados[0] || null;

//   if (
//     primerPeriodoPendiente &&
//     primerPeriodoPendiente.facturaId !== facturaAsociadaId
//   ) {
//     return {
//       ok: false,
//       message:
//         "No se puede cobrar este período porque existen períodos anteriores impagos.",
//     };
//   }

//   if (detallePeriodo.periodo.saldoPeriodo <= 0) {
//     return {
//       ok: false,
//       message: "El período seleccionado no tiene saldo pendiente.",
//     };
//   }

//   if (importe > detallePeriodo.periodo.saldoPeriodo) {
//     return {
//       ok: false,
//       message: `El pago no puede superar el saldo del período (${formatMoney(
//         detallePeriodo.periodo.saldoPeriodo,
//       )}).`,
//     };
//   }

//   const [saldoActualCaja, datosCajaCobrador] = await Promise.all([
//     obtenerSaldoCajaCobrador(cobrador.userId),
//     obtenerDatosCajaCobrador(cobrador.userId),
//   ]);

//   if (!datosCajaCobrador) {
//     return {
//       ok: false,
//       message: "Cobrador no encontrado o sin permisos para registrar pagos.",
//     };
//   }

//   const { limiteCajaCobrador } = datosCajaCobrador;
//   const saldoCajaProyectado = saldoActualCaja + importe;

//   if (saldoCajaProyectado > limiteCajaCobrador) {
//     return {
//       ok: false,
//       message:
//         "No se puede registrar este cobro porque tu caja alcanzó el límite operativo permitido. Realizá el cierre de caja correspondiente antes de continuar.",
//     };
//   }

//   const saldoActualCliente = await obtenerSaldoActualCliente(clienteId);
//   const nuevoSaldoCliente = saldoActualCliente - importe;
//   const numeroComprobante = await obtenerSiguienteNumeroComprobante();

//   const concepto = `Pago período ${detallePeriodo.periodo.periodoLabel} - Factura N° ${detallePeriodo.periodo.numeroComprobante}`;

//   const movimientoFinancieroId = new mongoose.Types.ObjectId();
//   const fechaPago = new Date();
//   const codigoVerificacion = generarCodigoVerificacionPago(numeroComprobante);

//   const firmaVerificacion = generarFirmaPago({
//     movimientoId: movimientoFinancieroId.toString(),
//     numeroComprobante,
//     clienteId,
//     clienteDni: cliente.dni || "",
//     importe,
//     fechaIso: fechaPago.toISOString(),
//   });

//   const movimientoFinanciero = await MovimientoFinanciero.create({
//     _id: movimientoFinancieroId,
//     numeroComprobante,
//     clienteId,
//     tipoMovimiento: "pago",
//     facturaAsociadaId,
//     fecha: fechaPago,
//     concepto,
//     debe: 0,
//     haber: importe,
//     saldo: nuevoSaldoCliente,
//     referenciaMes: detallePeriodo.periodo.referenciaMes ?? null,
//     referenciaAnio: detallePeriodo.periodo.referenciaAnio ?? null,
//     observacion: observacion?.trim() || "",
//     creadoPorUsuarioId: cobrador.userId,
//     creadoPorNombre: cobrador.nombre,
//     creadoPorRol: cobrador.rol,
//     codigoVerificacion,
//     firmaVerificacion,
//   });

//   const clienteNombre = getClienteNombreCompleto(cliente);
//   const clienteDni = cliente.dni || "-";
//   const nuevoSaldoCaja = saldoCajaProyectado;

//   await CajaCobrador.create({
//     cobradorId: cobrador.userId,
//     tipoMovimiento: "cobro",
//     clienteId,
//     movimientoFinancieroId: movimientoFinanciero._id,
//     facturaAsociadaId,
//     importe,
//     saldoCaja: nuevoSaldoCaja,
//     descripcion: `Cobro a cliente ${clienteNombre} DNI ${clienteDni} - ${concepto}`,
//     observacion: observacion?.trim() || "",
//   });

//   return {
//     ok: true,
//     message: `Pago registrado correctamente. Comprobante N° ${numeroComprobante}.`,
//     movimientoId: movimientoFinanciero._id.toString(),
//     numeroComprobante,
//   };
// }

// export async function generarCodigoCierreCaja(
//   input: GenerarCodigoCierreCajaInput,
//   admin: UsuarioAdminCaja,
// ) {
//   const parsed = generarCodigoCierreCajaSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//       codigo: null as CodigoCierreCajaSafe | null,
//     };
//   }

//   if (admin.rol !== "admin") {
//     return {
//       ok: false,
//       message: "Solo un administrador puede generar códigos de cierre.",
//       codigo: null,
//     };
//   }

//   const { cobradorId } = parsed.data;

//   await connectDB();
//   await marcarCodigosVencidos();

//   const cobrador = await Usuario.findOne({
//     _id: cobradorId,
//     rol: "cobrador",
//   }).lean();

//   if (!cobrador) {
//     return {
//       ok: false,
//       message: "Cobrador no encontrado.",
//       codigo: null,
//     };
//   }

//   const caja = await obtenerCajaCobradorResumen(cobradorId);

//   if (caja.saldoActual <= 0) {
//     return {
//       ok: false,
//       message: "El cobrador no tiene saldo pendiente para cerrar.",
//       codigo: null,
//     };
//   }

//   await CodigoCierreCaja.updateMany(
//     {
//       cobradorId,
//       estado: "pendiente",
//     },
//     {
//       $set: {
//         estado: "cancelado",
//       },
//     },
//   );

//   const codigo = await CodigoCierreCaja.create({
//     codigo: generarCodigoSeisDigitos(),
//     cobradorId,
//     cobradorNombre: `${cobrador.apellido || ""}, ${
//       cobrador.nombre || ""
//     }`.trim(),
//     importe: caja.saldoActual,
//     estado: "pendiente",
//     generadoPorAdminId: admin.userId,
//     generadoPorAdminNombre: admin.nombre,
//     venceEn: new Date(Date.now() + 30 * 60 * 1000),
//   });

//   return {
//     ok: true,
//     message: `Código generado correctamente para ${formatMoney(
//       caja.saldoActual,
//     )}.`,
//     codigo: toSafeCodigo(codigo),
//   };
// }

// export async function validarCodigoCierreCajaCobrador(
//   input: ValidarCodigoCierreCajaInput,
//   cobrador: UsuarioCobradorPago,
// ) {
//   const parsed = validarCodigoCierreCajaSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Código inválido.",
//       importe: 0,
//     };
//   }

//   if (cobrador.rol !== "cobrador") {
//     return {
//       ok: false,
//       message: "Solo un cobrador puede validar códigos de cierre.",
//       importe: 0,
//     };
//   }

//   await connectDB();
//   await marcarCodigosVencidos();

//   const codigo = await CodigoCierreCaja.findOne({
//     codigo: parsed.data.codigo,
//     cobradorId: cobrador.userId,
//     estado: "pendiente",
//     venceEn: { $gte: new Date() },
//   }).lean();

//   if (!codigo) {
//     return {
//       ok: false,
//       message: "Código incorrecto, vencido o no autorizado para este cobrador.",
//       importe: 0,
//     };
//   }

//   const caja = await obtenerCajaCobradorResumen(cobrador.userId);

//   if (Number(codigo.importe) !== Number(caja.saldoActual)) {
//     return {
//       ok: false,
//       message:
//         "El importe de tu caja cambió desde que se generó el código. Pedí un nuevo código al administrador.",
//       importe: 0,
//     };
//   }

//   return {
//     ok: true,
//     message: `Código válido para cerrar caja por ${formatMoney(
//       caja.saldoActual,
//     )}.`,
//     importe: caja.saldoActual,
//   };
// }

// export async function confirmarCierreCajaCobrador(
//   input: ValidarCodigoCierreCajaInput,
//   cobrador: UsuarioCobradorPago,
// ) {
//   const validacion = await validarCodigoCierreCajaCobrador(input, cobrador);

//   if (!validacion.ok) {
//     return validacion;
//   }

//   await connectDB();

//   const codigo = await CodigoCierreCaja.findOne({
//     codigo: input.codigo,
//     cobradorId: cobrador.userId,
//     estado: "pendiente",
//     venceEn: { $gte: new Date() },
//   });

//   if (!codigo) {
//     return {
//       ok: false,
//       message: "El código ya no está disponible.",
//       importe: 0,
//     };
//   }

//   const caja = await obtenerCajaCobradorResumen(cobrador.userId);

//   if (caja.saldoActual <= 0) {
//     return {
//       ok: false,
//       message: "Tu caja ya se encuentra en $0.",
//       importe: 0,
//     };
//   }

//   await CajaCobrador.create({
//     cobradorId: cobrador.userId,
//     tipoMovimiento: "cierre_caja",
//     clienteId: null,
//     movimientoFinancieroId: null,
//     facturaAsociadaId: null,
//     codigoCierreId: codigo._id,
//     importe: caja.saldoActual,
//     saldoCaja: 0,
//     descripcion: `Cierre de caja autorizado con código ${codigo.codigo}`,
//     observacion: `Código generado por ${codigo.generadoPorAdminNombre}`,
//   });

//   codigo.estado = "usado";
//   codigo.usadoEn = new Date();
//   await codigo.save();

//   return {
//     ok: true,
//     message: "Cierre de caja confirmado correctamente. Tu caja quedó en $0.",
//     importe: caja.saldoActual,
//   };
// }

import mongoose from "mongoose";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Cliente from "@/models/Cliente";
import Usuario from "@/models/Usuario";
import CajaCobrador from "@/models/CajaCobrador";
import CodigoCierreCaja from "@/models/CodigoCierreCaja";
import MovimientoFinanciero from "@/models/MovimientoFinanciero";
import {
  generarCodigoVerificacionPago,
  generarFirmaPago,
} from "@/utils/comprobante-verificacion";
import { obtenerSiguienteNumeroComprobante } from "@/utils/obtenerSiguienteNumeroComprobante";
import {
  obtenerDetallePeriodoCliente,
  obtenerEstadoCuentaCliente,
} from "@/services/movimiento-financiero.service";
import type {
  AdminCajaCobradoresResumenSafe,
  CajaCobradorEstado,
  CajaCobradorMovimientoSafe,
  CajaCobradorResumen,
  CajaCobradorTipo,
  CobradorCajaResumenSafe,
  CodigoCierreCajaEstado,
  CodigoCierreCajaSafe,
  CorreccionPagoContextoSafe,
  CorreccionPagoResult,
} from "@/types/cobro.types";

const LIMITE_CAJA_MINIMO = 100000;

export const registrarPagoCobradorSchema = z.object({
  clienteId: z
    .string()
    .min(1, "Falta el cliente.")
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Cliente inválido.",
    }),

  facturaAsociadaId: z
    .string()
    .min(1, "Debe seleccionar un período.")
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Período inválido.",
    }),

  importe: z.coerce
    .number({
      message: "El importe debe ser un número válido.",
    })
    .min(0.01, "El importe debe ser mayor a cero."),

  observacion: z.string().trim().max(300).optional().default(""),
});

export const generarCodigoCierreCajaSchema = z.object({
  cobradorId: z
    .string()
    .min(1, "Falta el cobrador.")
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Cobrador inválido.",
    }),
});

export const validarCodigoCierreCajaSchema = z.object({
  codigo: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "El código debe tener 6 dígitos."),
});

export const corregirPagoCobradorSchema = z.object({
  movimientoId: z
    .string()
    .min(1, "Falta el comprobante de pago.")
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Comprobante de pago inválido.",
    }),

  importeReal: z.coerce
    .number({
      message: "El importe real debe ser un número válido.",
    })
    .min(0, "El importe real no puede ser negativo."),

  motivo: z
    .string()
    .trim()
    .min(5, "Indicá un motivo de al menos 5 caracteres.")
    .max(300, "El motivo no puede superar los 300 caracteres."),
});

export type RegistrarPagoCobradorInput = z.infer<
  typeof registrarPagoCobradorSchema
>;

export type GenerarCodigoCierreCajaInput = z.infer<
  typeof generarCodigoCierreCajaSchema
>;

export type ValidarCodigoCierreCajaInput = z.infer<
  typeof validarCodigoCierreCajaSchema
>;

export type CorregirPagoCobradorInput = z.infer<
  typeof corregirPagoCobradorSchema
>;

export type UsuarioCobradorPago = {
  userId: string;
  nombre: string;
  rol: string;
};

export type UsuarioAdminCaja = {
  userId: string;
  nombre: string;
  rol: string;
};

function getClienteNombreCompleto(cliente: any) {
  const apellido = String(cliente?.apellido || "").trim();
  const nombre = String(cliente?.nombre || "").trim();

  const nombreCompleto = `${apellido}, ${nombre}`
    .replace(/^,\s*/, "")
    .replace(/,\s*$/, "")
    .trim();

  return nombreCompleto || "Cliente";
}

function getEstadoCajaMovimiento(movimiento: any): CajaCobradorEstado {
  if (movimiento.estadoCaja === "cerrado") return "cerrado";
  if (movimiento.estadoCaja === "abierto") return "abierto";
  if (movimiento.cierreCajaId || movimiento.cerradoEn) return "cerrado";

  return "abierto";
}

function toSafeCajaMovimiento(movimiento: any): CajaCobradorMovimientoSafe {
  return {
    id: movimiento._id.toString(),
    cobradorId: movimiento.cobradorId?.toString?.() || "",
    tipoMovimiento: movimiento.tipoMovimiento as CajaCobradorTipo,
    estadoCaja: getEstadoCajaMovimiento(movimiento),
    clienteId: movimiento.clienteId ? movimiento.clienteId.toString() : null,
    movimientoFinancieroId: movimiento.movimientoFinancieroId
      ? movimiento.movimientoFinancieroId.toString()
      : null,
    facturaAsociadaId: movimiento.facturaAsociadaId
      ? movimiento.facturaAsociadaId.toString()
      : null,
    codigoCierreId: movimiento.codigoCierreId
      ? movimiento.codigoCierreId.toString()
      : null,
    cierreCajaId: movimiento.cierreCajaId
      ? movimiento.cierreCajaId.toString()
      : null,
    importe: Number(movimiento.importe || 0),
    saldoCaja: Number(movimiento.saldoCaja || 0),
    descripcion: movimiento.descripcion || "",
    observacion: movimiento.observacion || "",
    cerradoEn: movimiento.cerradoEn?.toISOString?.() || null,
    creadoEn: movimiento.creadoEn?.toISOString?.() || "",
    actualizadoEn: movimiento.actualizadoEn?.toISOString?.() || "",
  };
}

async function enriquecerMovimientosCaja(
  movimientos: CajaCobradorMovimientoSafe[],
) {
  const clienteIds = [
    ...new Set(
      movimientos
        .map((movimiento) => movimiento.clienteId)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  const facturaIds = [
    ...new Set(
      movimientos
        .map((movimiento) => movimiento.facturaAsociadaId)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  const [clientesRaw, facturasRaw] = await Promise.all([
    clienteIds.length > 0
      ? Cliente.find({ _id: { $in: clienteIds } })
          .select("nombre apellido dni")
          .lean()
      : [],

    facturaIds.length > 0
      ? MovimientoFinanciero.find({ _id: { $in: facturaIds } })
          .select("numeroComprobante")
          .lean()
      : [],
  ]);

  const clientesMap = new Map<string, any>(
    clientesRaw.map((cliente: any) => [cliente._id.toString(), cliente]),
  );

  const facturasMap = new Map<string, any>(
    facturasRaw.map((factura: any) => [factura._id.toString(), factura]),
  );

  return movimientos.map((movimiento) => {
    const cliente = movimiento.clienteId
      ? clientesMap.get(movimiento.clienteId)
      : null;

    const factura = movimiento.facturaAsociadaId
      ? facturasMap.get(movimiento.facturaAsociadaId)
      : null;

    const clienteNombre = cliente ? getClienteNombreCompleto(cliente) : "";
    const clienteDni = cliente?.dni ? String(cliente.dni) : "";
    const numeroFactura = factura?.numeroComprobante
      ? String(factura.numeroComprobante)
      : "";

    return {
      ...movimiento,
      clienteNombre,
      nombreCliente: clienteNombre,
      nombreCompletoCliente: clienteNombre,
      clienteDni,
      dniCliente: clienteDni,
      numeroFactura,
      facturaNumero: numeroFactura,
    };
  });
}

function toSafeCodigo(codigo: any): CodigoCierreCajaSafe {
  return {
    id: codigo._id.toString(),
    codigo: codigo.codigo || "",
    cobradorId: codigo.cobradorId?.toString?.() || "",
    cobradorNombre: codigo.cobradorNombre || "",
    importe: Number(codigo.importe || 0),
    estado: codigo.estado as CodigoCierreCajaEstado,
    generadoPorAdminId: codigo.generadoPorAdminId?.toString?.() || "",
    generadoPorAdminNombre: codigo.generadoPorAdminNombre || "",
    usadoEn: codigo.usadoEn?.toISOString?.() || null,
    venceEn: codigo.venceEn?.toISOString?.() || "",
    creadoEn: codigo.creadoEn?.toISOString?.() || "",
    actualizadoEn: codigo.actualizadoEn?.toISOString?.() || "",
  };
}

function generarCodigoSeisDigitos() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function ordenarPeriodosPendientesPorAntiguedad(periodos: any[]) {
  return [...periodos].sort((a, b) => {
    const anioA = a.referenciaAnio || 0;
    const anioB = b.referenciaAnio || 0;

    if (anioA !== anioB) return anioA - anioB;

    const mesA = a.referenciaMes || 0;
    const mesB = b.referenciaMes || 0;

    if (mesA !== mesB) return mesA - mesB;

    return Number(a.numeroComprobante || 0) - Number(b.numeroComprobante || 0);
  });
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatPeriodoLabel(mes?: number | null, anio?: number | null) {
  if (!mes || !anio) return "Sin período";

  return `${mes}/${anio}`;
}

async function obtenerDatosCajaCobrador(cobradorId: string) {
  const cobradorRaw = await Usuario.findById(cobradorId)
    .select("limiteCajaCobrador rol")
    .lean();

  if (!cobradorRaw || cobradorRaw.rol !== "cobrador") {
    return null;
  }

  const limiteCajaCobrador = Number(
    cobradorRaw.limiteCajaCobrador ?? LIMITE_CAJA_MINIMO,
  );

  return {
    limiteCajaCobrador: Number.isFinite(limiteCajaCobrador)
      ? Math.max(limiteCajaCobrador, LIMITE_CAJA_MINIMO)
      : LIMITE_CAJA_MINIMO,
  };
}

async function obtenerSaldoActualCliente(clienteId: string) {
  const ultimoMovimiento = await MovimientoFinanciero.findOne({ clienteId })
    .sort({ fecha: -1, creadoEn: -1 })
    .lean();

  return Number(ultimoMovimiento?.saldo || 0);
}

async function obtenerSaldoCajaCobrador(cobradorId: string) {
  const ultimoMovimiento = await CajaCobrador.findOne({ cobradorId })
    .sort({ creadoEn: -1 })
    .lean();

  return Number(ultimoMovimiento?.saldoCaja || 0);
}

async function marcarCodigosVencidos() {
  await CodigoCierreCaja.updateMany(
    {
      estado: "pendiente",
      venceEn: { $lt: new Date() },
    },
    {
      $set: {
        estado: "vencido",
      },
    },
  );
}

async function obtenerMovimientoCajaDelPago(pagoId: string) {
  return CajaCobrador.findOne({
    movimientoFinancieroId: pagoId,
    tipoMovimiento: "cobro",
  }).lean();
}

async function obtenerCierreCajaAsociado(movimientoCaja: any) {
  if (!movimientoCaja) return null;

  if (movimientoCaja.cierreCajaId) {
    const cierre = await CajaCobrador.findOne({
      _id: movimientoCaja.cierreCajaId,
      tipoMovimiento: "cierre_caja",
    }).lean();

    if (cierre) return cierre;
  }

  if (movimientoCaja.estadoCaja === "cerrado" && movimientoCaja.cerradoEn) {
    const cierre = await CajaCobrador.findOne({
      cobradorId: movimientoCaja.cobradorId,
      tipoMovimiento: "cierre_caja",
      creadoEn: { $gte: movimientoCaja.cerradoEn },
    })
      .sort({ creadoEn: 1 })
      .lean();

    if (cierre) return cierre;
  }

  const cierrePosterior = await CajaCobrador.findOne({
    cobradorId: movimientoCaja.cobradorId,
    tipoMovimiento: "cierre_caja",
    creadoEn: { $gte: movimientoCaja.creadoEn },
  })
    .sort({ creadoEn: 1 })
    .lean();

  return cierrePosterior;
}

export async function obtenerCajaCobradorResumen(
  cobradorId: string,
): Promise<CajaCobradorResumen> {
  await connectDB();

  const movimientosRaw = await CajaCobrador.find({ cobradorId })
    .sort({ creadoEn: -1 })
    .lean();

  const movimientosBase = movimientosRaw.map(toSafeCajaMovimiento);
  const movimientos = await enriquecerMovimientosCaja(movimientosBase);

  const totalCobrado = movimientos
    .filter((movimiento) => movimiento.tipoMovimiento === "cobro")
    .reduce((acc, movimiento) => acc + movimiento.importe, 0);

  const totalCierres = movimientos
    .filter((movimiento) => movimiento.tipoMovimiento === "cierre_caja")
    .reduce((acc, movimiento) => acc + movimiento.importe, 0);

  const totalAjustesCorreccion = movimientos
    .filter(
      (movimiento) => movimiento.tipoMovimiento === "ajuste_correccion_pago",
    )
    .reduce((acc, movimiento) => acc + movimiento.importe, 0);

  const totalAjustesPostCierre = movimientos
    .filter(
      (movimiento) =>
        movimiento.tipoMovimiento === "ajuste_correccion_pago_post_cierre",
    )
    .reduce((acc, movimiento) => acc + movimiento.importe, 0);

  const saldoActual =
    totalCobrado - totalCierres - totalAjustesCorreccion - totalAjustesPostCierre;

  return {
    totalCobrado,
    totalCierres,
    totalAjustesCorreccion,
    totalAjustesPostCierre,
    saldoActual,
    movimientos,
  };
}

export async function obtenerContextoCobroCobrador(cobradorId: string) {
  await connectDB();

  const [saldoCajaActual, datosCajaCobrador] = await Promise.all([
    obtenerSaldoCajaCobrador(cobradorId),
    obtenerDatosCajaCobrador(cobradorId),
  ]);

  if (!datosCajaCobrador) {
    return null;
  }

  const limiteCajaCobrador = Math.max(
    Number(datosCajaCobrador.limiteCajaCobrador || LIMITE_CAJA_MINIMO),
    LIMITE_CAJA_MINIMO,
  );

  return {
    saldoCajaActual,
    limiteCajaCobrador,
    disponibleCaja: Math.max(limiteCajaCobrador - saldoCajaActual, 0),
  };
}

export async function obtenerCobradoresCajaResumen(): Promise<
  CobradorCajaResumenSafe[]
> {
  await connectDB();
  await marcarCodigosVencidos();

  const cobradores = await Usuario.find({
    rol: "cobrador",
  })
    .sort({ apellido: 1, nombre: 1 })
    .lean();

  const resultados = await Promise.all(
    cobradores.map(async (cobrador: any) => {
      const caja = await obtenerCajaCobradorResumen(cobrador._id.toString());

      const codigoPendienteRaw = await CodigoCierreCaja.findOne({
        cobradorId: cobrador._id,
        estado: "pendiente",
        venceEn: { $gte: new Date() },
      })
        .sort({ creadoEn: -1 })
        .lean();

      return {
        cobradorId: cobrador._id.toString(),
        nombre: cobrador.nombre || "",
        apellido: cobrador.apellido || "",
        email: cobrador.email || "",
        saldoActual: caja.saldoActual,
        totalCobrado: caja.totalCobrado,
        totalCierres: caja.totalCierres,
        totalAjustesCorreccion: caja.totalAjustesCorreccion,
        totalAjustesPostCierre: caja.totalAjustesPostCierre,
        codigoPendiente: codigoPendienteRaw
          ? toSafeCodigo(codigoPendienteRaw)
          : null,
      };
    }),
  );

  return resultados;
}

export async function obtenerAdminCajaCobradoresResumen(): Promise<AdminCajaCobradoresResumenSafe> {
  await connectDB();
  await marcarCodigosVencidos();

  const cobradores = await obtenerCobradoresCajaResumen();

  const totalSaldoCobradores = cobradores.reduce(
    (acc, cobrador) => acc + cobrador.saldoActual,
    0,
  );

  const totalRecibidoAdmin = cobradores.reduce(
    (acc, cobrador) => acc + cobrador.totalCierres,
    0,
  );

  const totalAjustesPostCierre = cobradores.reduce(
    (acc, cobrador) => acc + cobrador.totalAjustesPostCierre,
    0,
  );

  const cantidadCobradoresConSaldo = cobradores.filter(
    (cobrador) => cobrador.saldoActual > 0,
  ).length;

  const cantidadCodigosPendientes = cobradores.filter(
    (cobrador) => cobrador.codigoPendiente,
  ).length;

  const cantidadCierresRealizados = cobradores.reduce(
    (acc, cobrador) => acc + (cobrador.totalCierres > 0 ? 1 : 0),
    0,
  );

  return {
    totalSaldoCobradores,
    totalRecibidoAdmin,
    totalAjustesPostCierre,
    cantidadCobradores: cobradores.length,
    cantidadCobradoresConSaldo,
    cantidadCodigosPendientes,
    cantidadCierresRealizados,
    cobradores,
  };
}

export async function registrarPagoCobrador(
  input: RegistrarPagoCobradorInput,
  cobrador: UsuarioCobradorPago,
) {
  const parsed = registrarPagoCobradorSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  if (cobrador.rol !== "cobrador") {
    return {
      ok: false,
      message:
        "Solo un usuario cobrador puede registrar pagos desde este módulo.",
    };
  }

  const { clienteId, facturaAsociadaId, importe, observacion } = parsed.data;

  await connectDB();

  const cliente = await Cliente.findById(clienteId).lean();

  if (!cliente) {
    return {
      ok: false,
      message: "Cliente no encontrado.",
    };
  }

  const detallePeriodo = await obtenerDetallePeriodoCliente(
    clienteId,
    facturaAsociadaId,
  );

  if (!detallePeriodo) {
    return {
      ok: false,
      message: "El período seleccionado no existe o no pertenece al cliente.",
    };
  }

  const estadoCuenta = await obtenerEstadoCuentaCliente(clienteId);

  if (!estadoCuenta) {
    return {
      ok: false,
      message: "No se pudo obtener el estado de cuenta del cliente.",
    };
  }

  const periodosPendientesOrdenados = ordenarPeriodosPendientesPorAntiguedad(
    estadoCuenta.periodos.filter((periodo) => periodo.saldoPeriodo > 0),
  );

  const primerPeriodoPendiente = periodosPendientesOrdenados[0] || null;

  if (
    primerPeriodoPendiente &&
    primerPeriodoPendiente.facturaId !== facturaAsociadaId
  ) {
    return {
      ok: false,
      message:
        "No se puede cobrar este período porque existen períodos anteriores impagos.",
    };
  }

  if (detallePeriodo.periodo.saldoPeriodo <= 0) {
    return {
      ok: false,
      message: "El período seleccionado no tiene saldo pendiente.",
    };
  }

  if (importe > detallePeriodo.periodo.saldoPeriodo) {
    return {
      ok: false,
      message: `El pago no puede superar el saldo del período (${formatMoney(
        detallePeriodo.periodo.saldoPeriodo,
      )}).`,
    };
  }

  const [saldoActualCaja, datosCajaCobrador] = await Promise.all([
    obtenerSaldoCajaCobrador(cobrador.userId),
    obtenerDatosCajaCobrador(cobrador.userId),
  ]);

  if (!datosCajaCobrador) {
    return {
      ok: false,
      message: "Cobrador no encontrado o sin permisos para registrar pagos.",
    };
  }

  const { limiteCajaCobrador } = datosCajaCobrador;
  const saldoCajaProyectado = saldoActualCaja + importe;

  if (saldoCajaProyectado > limiteCajaCobrador) {
    return {
      ok: false,
      message:
        "No se puede registrar este cobro porque tu caja alcanzó el límite operativo permitido. Realizá el cierre de caja correspondiente antes de continuar.",
    };
  }

  const saldoActualCliente = await obtenerSaldoActualCliente(clienteId);
  const nuevoSaldoCliente = saldoActualCliente - importe;
  const numeroComprobante = await obtenerSiguienteNumeroComprobante();

  const concepto = `Pago período ${detallePeriodo.periodo.periodoLabel} - Factura N° ${detallePeriodo.periodo.numeroComprobante}`;

  const movimientoFinancieroId = new mongoose.Types.ObjectId();
  const fechaPago = new Date();
  const codigoVerificacion = generarCodigoVerificacionPago(numeroComprobante);

  const firmaVerificacion = generarFirmaPago({
    movimientoId: movimientoFinancieroId.toString(),
    numeroComprobante,
    clienteId,
    clienteDni: cliente.dni || "",
    importe,
    fechaIso: fechaPago.toISOString(),
  });

  const movimientoFinanciero = await MovimientoFinanciero.create({
    _id: movimientoFinancieroId,
    numeroComprobante,
    clienteId,
    tipoMovimiento: "pago",
    facturaAsociadaId,
    fecha: fechaPago,
    concepto,
    debe: 0,
    haber: importe,
    saldo: nuevoSaldoCliente,
    referenciaMes: detallePeriodo.periodo.referenciaMes ?? null,
    referenciaAnio: detallePeriodo.periodo.referenciaAnio ?? null,
    observacion: observacion?.trim() || "",
    creadoPorUsuarioId: cobrador.userId,
    creadoPorNombre: cobrador.nombre,
    creadoPorRol: cobrador.rol,
    codigoVerificacion,
    firmaVerificacion,
  });

  const clienteNombre = getClienteNombreCompleto(cliente);
  const clienteDni = cliente.dni || "-";
  const nuevoSaldoCaja = saldoCajaProyectado;

  await CajaCobrador.create({
    cobradorId: cobrador.userId,
    tipoMovimiento: "cobro",
    estadoCaja: "abierto",
    clienteId,
    movimientoFinancieroId: movimientoFinanciero._id,
    facturaAsociadaId,
    cierreCajaId: null,
    cerradoEn: null,
    importe,
    saldoCaja: nuevoSaldoCaja,
    descripcion: `Cobro a cliente ${clienteNombre} DNI ${clienteDni} - ${concepto}`,
    observacion: observacion?.trim() || "",
  });

  return {
    ok: true,
    message: `Pago registrado correctamente. Comprobante N° ${numeroComprobante}.`,
    movimientoId: movimientoFinanciero._id.toString(),
    numeroComprobante,
  };
}

export async function obtenerContextoCorreccionPago(
  movimientoId: string,
): Promise<CorreccionPagoContextoSafe | null> {
  if (!mongoose.Types.ObjectId.isValid(movimientoId)) {
    return null;
  }

  await connectDB();

  const pago = await MovimientoFinanciero.findOne({
    _id: movimientoId,
    tipoMovimiento: "pago",
  }).lean();

  if (!pago) {
    return null;
  }

  const [cliente, factura, movimientoCaja, correccionExistente] =
    await Promise.all([
      Cliente.findById(pago.clienteId).lean(),

      pago.facturaAsociadaId
        ? MovimientoFinanciero.findById(pago.facturaAsociadaId).lean()
        : Promise.resolve(null),

      obtenerMovimientoCajaDelPago(pago._id.toString()),

      MovimientoFinanciero.findOne({
        pagoCorregidoId: pago._id,
        tipoMovimiento: "nota_debito",
      }).lean(),
    ]);

  if (!cliente || !factura || !pago.facturaAsociadaId) {
    return null;
  }

  const cobradorId = pago.creadoPorUsuarioId?.toString?.() || "";
  const saldoCajaActual = cobradorId
    ? await obtenerSaldoCajaCobrador(cobradorId)
    : 0;

  const cierreAsociado = movimientoCaja
    ? await obtenerCierreCajaAsociado(movimientoCaja)
    : null;

  const estadoCajaMovimiento = movimientoCaja
    ? getEstadoCajaMovimiento(movimientoCaja)
    : "abierto";

  const cobroYaCerrado =
    estadoCajaMovimiento === "cerrado" || Boolean(cierreAsociado);

  const importeRegistrado = Number(pago.haber || 0);
  const importeYaCorregido = Number(pago.importeCorregido || 0);
  const importeValidoActual =
    pago.importeValidoFinal !== null && pago.importeValidoFinal !== undefined
      ? Number(pago.importeValidoFinal || 0)
      : importeRegistrado - importeYaCorregido;

  let puedeCorregir = true;
  let motivoNoPuedeCorregir = "";

  if (!movimientoCaja) {
    puedeCorregir = false;
    motivoNoPuedeCorregir =
      "No se encontró el movimiento de caja asociado a este pago.";
  }

  if (
    correccionExistente ||
    pago.estadoComprobante === "corregido_parcialmente"
  ) {
    puedeCorregir = false;
    motivoNoPuedeCorregir =
      "Este comprobante ya tiene una corrección asociada.";
  }

  if (!cobradorId) {
    puedeCorregir = false;
    motivoNoPuedeCorregir = "No se pudo identificar el cobrador del pago.";
  }

  if (cobroYaCerrado && !cierreAsociado) {
    puedeCorregir = false;
    motivoNoPuedeCorregir =
      "El cobro figura como cerrado, pero no se pudo identificar el cierre asociado.";
  }

  return {
    movimientoId: pago._id.toString(),
    numeroComprobante: Number(pago.numeroComprobante || 0),
    fecha: pago.fecha?.toISOString?.() || "",
    clienteId: cliente._id.toString(),
    clienteNombre: getClienteNombreCompleto(cliente),
    clienteDni: cliente.dni || "",
    facturaAsociadaId: pago.facturaAsociadaId.toString(),
    facturaNumeroComprobante: factura
      ? Number(factura.numeroComprobante || 0)
      : null,
    periodoLabel: formatPeriodoLabel(pago.referenciaMes, pago.referenciaAnio),
    importeRegistrado,
    importeValidoActual: Math.max(importeValidoActual, 0),
    importeYaCorregido,
    saldoClienteDespuesDelPago: Number(pago.saldo || 0),
    cobradorId,
    cobradorNombre: pago.creadoPorNombre || "Cobrador",
    saldoCajaActual,
    estadoComprobante: pago.estadoComprobante || "vigente",
    estadoCajaCobro: estadoCajaMovimiento,
    cobroYaCerrado,
    cierreCajaId: cierreAsociado?._id?.toString?.() || null,
    cierreCajaFecha: cierreAsociado?.creadoEn?.toISOString?.() || null,
    correccionImpactaCajaActual: true,
    correccionImpactaCierreAnterior: cobroYaCerrado,
    puedeCorregir,
    motivoNoPuedeCorregir,
  };
}

export async function corregirPagoCobrador(
  input: CorregirPagoCobradorInput,
  admin: UsuarioAdminCaja,
): Promise<CorreccionPagoResult> {
  const parsed = corregirPagoCobradorSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  if (admin.rol !== "admin") {
    return {
      ok: false,
      message: "Solo un administrador puede corregir pagos emitidos.",
    };
  }

  const { movimientoId, importeReal, motivo } = parsed.data;

  await connectDB();

  const contexto = await obtenerContextoCorreccionPago(movimientoId);

  if (!contexto) {
    return {
      ok: false,
      message: "No se encontró el comprobante de pago a corregir.",
    };
  }

  if (!contexto.puedeCorregir) {
    return {
      ok: false,
      message:
        contexto.motivoNoPuedeCorregir ||
        "Este comprobante no está disponible para corrección.",
    };
  }

  const importeRegistrado = Number(contexto.importeRegistrado || 0);
  const importeRealNormalizado = Number(importeReal || 0);

  if (importeRealNormalizado >= importeRegistrado) {
    return {
      ok: false,
      message:
        "El importe real debe ser menor al importe registrado originalmente.",
    };
  }

  const diferencia = Number(
    (importeRegistrado - importeRealNormalizado).toFixed(2),
  );

  if (diferencia <= 0) {
    return {
      ok: false,
      message: "No hay diferencia para corregir.",
    };
  }

  if (!contexto.cobroYaCerrado && contexto.saldoCajaActual < diferencia) {
    return {
      ok: false,
      message:
        "No se puede corregir porque la caja actual del cobrador no tiene saldo suficiente.",
    };
  }

  const pago = await MovimientoFinanciero.findOne({
    _id: movimientoId,
    tipoMovimiento: "pago",
  });

  if (!pago) {
    return {
      ok: false,
      message: "El pago ya no está disponible.",
    };
  }

  if (
    pago.estadoComprobante === "corregido_parcialmente" ||
    pago.corregidoPorMovimientoId
  ) {
    return {
      ok: false,
      message: "Este comprobante ya fue corregido.",
    };
  }

  const movimientoCaja = await CajaCobrador.findOne({
    movimientoFinancieroId: pago._id,
    tipoMovimiento: "cobro",
  });

  if (!movimientoCaja) {
    return {
      ok: false,
      message: "No se encontró el movimiento de caja asociado al pago.",
    };
  }

  const cierreAsociado = await obtenerCierreCajaAsociado(movimientoCaja);
  const cobroYaCerrado =
    getEstadoCajaMovimiento(movimientoCaja) === "cerrado" ||
    Boolean(cierreAsociado);

  if (cobroYaCerrado && !cierreAsociado) {
    return {
      ok: false,
      message:
        "El cobro figura como cerrado, pero no se pudo identificar el cierre asociado.",
    };
  }

  const saldoActualCliente = await obtenerSaldoActualCliente(contexto.clienteId);
  const nuevoSaldoCliente = Number((saldoActualCliente + diferencia).toFixed(2));
  const saldoCajaActual = await obtenerSaldoCajaCobrador(contexto.cobradorId);
  const nuevoSaldoCaja = Number((saldoCajaActual - diferencia).toFixed(2));

  const numeroComprobanteCorreccion = await obtenerSiguienteNumeroComprobante();
  const fechaCorreccion = new Date();

  const concepto = `Corrección de pago N° ${contexto.numeroComprobante} - importe registrado en exceso`;
  const observacionBase = `${motivo.trim()} | Importe registrado: ${formatMoney(
    importeRegistrado,
  )}. Importe real recibido: ${formatMoney(
    importeRealNormalizado,
  )}. Diferencia corregida: ${formatMoney(diferencia)}.`;

  const observacion = cobroYaCerrado
    ? `${observacionBase} Corrección posterior al cierre de caja. Se descuenta como saldo pendiente de la próxima caja del cobrador.`
    : `${observacionBase} Corrección aplicada sobre caja abierta del cobrador.`;

  const correccion = await MovimientoFinanciero.create({
    numeroComprobante: numeroComprobanteCorreccion,
    clienteId: contexto.clienteId,
    tipoMovimiento: "nota_debito",
    facturaAsociadaId: contexto.facturaAsociadaId,
    pagoCorregidoId: pago._id,
    fecha: fechaCorreccion,
    concepto,
    debe: diferencia,
    haber: 0,
    saldo: nuevoSaldoCliente,
    referenciaMes: pago.referenciaMes ?? null,
    referenciaAnio: pago.referenciaAnio ?? null,
    observacion,
    creadoPorUsuarioId: admin.userId,
    creadoPorNombre: admin.nombre,
    creadoPorRol: admin.rol,
  });

  pago.estadoComprobante = "corregido_parcialmente";
  pago.corregidoPorMovimientoId = correccion._id;
  pago.importeValidoFinal = importeRealNormalizado;
  pago.importeCorregido = diferencia;
  await pago.save();

  await CajaCobrador.create({
    cobradorId: contexto.cobradorId,
    tipoMovimiento: cobroYaCerrado
      ? "ajuste_correccion_pago_post_cierre"
      : "ajuste_correccion_pago",
    estadoCaja: cobroYaCerrado ? "cerrado" : "abierto",
    clienteId: contexto.clienteId,
    movimientoFinancieroId: correccion._id,
    facturaAsociadaId: contexto.facturaAsociadaId,
    codigoCierreId: null,
    cierreCajaId: cobroYaCerrado ? cierreAsociado?._id || null : null,
    cerradoEn: cobroYaCerrado
      ? cierreAsociado?.creadoEn || fechaCorreccion
      : null,
    importe: diferencia,
    saldoCaja: nuevoSaldoCaja,
    descripcion: cobroYaCerrado
      ? `Corrección post-cierre de pago N° ${contexto.numeroComprobante} - ${contexto.clienteNombre}`
      : `Corrección de pago N° ${contexto.numeroComprobante} - ${contexto.clienteNombre}`,
    observacion,
  });

  if (!cobroYaCerrado) {
    await CodigoCierreCaja.updateMany(
      {
        cobradorId: contexto.cobradorId,
        estado: "pendiente",
      },
      {
        $set: {
          estado: "cancelado",
        },
      },
    );
  }

  return {
    ok: true,
    message: cobroYaCerrado
      ? `Pago corregido correctamente. Se generó el comprobante de corrección N° ${numeroComprobanteCorreccion} por ${formatMoney(
          diferencia,
        )}. La corrección quedó asociada al cierre anterior y se descontó como saldo pendiente de la próxima caja del cobrador.`
      : `Pago corregido correctamente. Se generó el comprobante de corrección N° ${numeroComprobanteCorreccion} por ${formatMoney(
          diferencia,
        )}. La diferencia fue descontada de la caja actual del cobrador.`,
    correccionMovimientoId: correccion._id.toString(),
    numeroComprobanteCorreccion,
  };
}

export async function generarCodigoCierreCaja(
  input: GenerarCodigoCierreCajaInput,
  admin: UsuarioAdminCaja,
) {
  const parsed = generarCodigoCierreCajaSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
      codigo: null as CodigoCierreCajaSafe | null,
    };
  }

  if (admin.rol !== "admin") {
    return {
      ok: false,
      message: "Solo un administrador puede generar códigos de cierre.",
      codigo: null,
    };
  }

  const { cobradorId } = parsed.data;

  await connectDB();
  await marcarCodigosVencidos();

  const cobrador = await Usuario.findOne({
    _id: cobradorId,
    rol: "cobrador",
  }).lean();

  if (!cobrador) {
    return {
      ok: false,
      message: "Cobrador no encontrado.",
      codigo: null,
    };
  }

  const caja = await obtenerCajaCobradorResumen(cobradorId);

  if (caja.saldoActual <= 0) {
    return {
      ok: false,
      message: "El cobrador no tiene saldo pendiente para cerrar.",
      codigo: null,
    };
  }

  await CodigoCierreCaja.updateMany(
    {
      cobradorId,
      estado: "pendiente",
    },
    {
      $set: {
        estado: "cancelado",
      },
    },
  );

  const codigo = await CodigoCierreCaja.create({
    codigo: generarCodigoSeisDigitos(),
    cobradorId,
    cobradorNombre: `${cobrador.apellido || ""}, ${
      cobrador.nombre || ""
    }`.trim(),
    importe: caja.saldoActual,
    estado: "pendiente",
    generadoPorAdminId: admin.userId,
    generadoPorAdminNombre: admin.nombre,
    venceEn: new Date(Date.now() + 30 * 60 * 1000),
  });

  return {
    ok: true,
    message: `Código generado correctamente para ${formatMoney(
      caja.saldoActual,
    )}.`,
    codigo: toSafeCodigo(codigo),
  };
}

export async function validarCodigoCierreCajaCobrador(
  input: ValidarCodigoCierreCajaInput,
  cobrador: UsuarioCobradorPago,
) {
  const parsed = validarCodigoCierreCajaSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Código inválido.",
      importe: 0,
    };
  }

  if (cobrador.rol !== "cobrador") {
    return {
      ok: false,
      message: "Solo un cobrador puede validar códigos de cierre.",
      importe: 0,
    };
  }

  await connectDB();
  await marcarCodigosVencidos();

  const codigo = await CodigoCierreCaja.findOne({
    codigo: parsed.data.codigo,
    cobradorId: cobrador.userId,
    estado: "pendiente",
    venceEn: { $gte: new Date() },
  }).lean();

  if (!codigo) {
    return {
      ok: false,
      message: "Código incorrecto, vencido o no autorizado para este cobrador.",
      importe: 0,
    };
  }

  const caja = await obtenerCajaCobradorResumen(cobrador.userId);

  if (Number(codigo.importe) !== Number(caja.saldoActual)) {
    return {
      ok: false,
      message:
        "El importe de tu caja cambió desde que se generó el código. Pedí un nuevo código al administrador.",
      importe: 0,
    };
  }

  return {
    ok: true,
    message: `Código válido para cerrar caja por ${formatMoney(
      caja.saldoActual,
    )}.`,
    importe: caja.saldoActual,
  };
}

export async function confirmarCierreCajaCobrador(
  input: ValidarCodigoCierreCajaInput,
  cobrador: UsuarioCobradorPago,
) {
  const validacion = await validarCodigoCierreCajaCobrador(input, cobrador);

  if (!validacion.ok) {
    return validacion;
  }

  await connectDB();

  const codigo = await CodigoCierreCaja.findOne({
    codigo: input.codigo,
    cobradorId: cobrador.userId,
    estado: "pendiente",
    venceEn: { $gte: new Date() },
  });

  if (!codigo) {
    return {
      ok: false,
      message: "El código ya no está disponible.",
      importe: 0,
    };
  }

  const caja = await obtenerCajaCobradorResumen(cobrador.userId);

  if (caja.saldoActual <= 0) {
    return {
      ok: false,
      message: "Tu caja ya se encuentra en $0.",
      importe: 0,
    };
  }

  const cierre = await CajaCobrador.create({
    cobradorId: cobrador.userId,
    tipoMovimiento: "cierre_caja",
    estadoCaja: "cerrado",
    clienteId: null,
    movimientoFinancieroId: null,
    facturaAsociadaId: null,
    codigoCierreId: codigo._id,
    cierreCajaId: null,
    cerradoEn: new Date(),
    importe: caja.saldoActual,
    saldoCaja: 0,
    descripcion: `Cierre de caja autorizado con código ${codigo.codigo}`,
    observacion: `Código generado por ${codigo.generadoPorAdminNombre}`,
  });

  await CajaCobrador.updateMany(
    {
      cobradorId: cobrador.userId,
      estadoCaja: "abierto",
      tipoMovimiento: {
        $in: ["cobro", "ajuste_correccion_pago"],
      },
      creadoEn: {
        $lte: cierre.creadoEn,
      },
    },
    {
      $set: {
        estadoCaja: "cerrado",
        cierreCajaId: cierre._id,
        cerradoEn: cierre.creadoEn,
      },
    },
  );

  codigo.estado = "usado";
  codigo.usadoEn = new Date();
  await codigo.save();

  return {
    ok: true,
    message: "Cierre de caja confirmado correctamente. Tu caja quedó en $0.",
    importe: caja.saldoActual,
  };
}
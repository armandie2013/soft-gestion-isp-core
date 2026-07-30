// import mongoose from "mongoose";
// import { z } from "zod";
// import { connectDB } from "@/lib/db";
// import Cliente from "@/models/Cliente";
// import Plan from "@/models/Plan";
// import MovimientoFinanciero from "@/models/MovimientoFinanciero";
// import ClientePlanHistorial from "@/models/ClientePlanHistorial";
// import { obtenerSiguienteNumeroComprobante } from "@/utils/obtenerSiguienteNumeroComprobante";
// import type {
//   DetallePeriodoCuentaCliente,
//   EstadoCuentaCliente,
//   FacturaClienteSafe,
//   MovimientoFinancieroSafe,
//   MovimientoTipo,
//   PeriodoCuentaClienteSafe,
// } from "@/types/movimiento-financiero.types";

// export const generarFacturacionManualSchema = z.object({
//   referenciaMes: z.coerce
//     .number()
//     .min(1, "Mes inválido.")
//     .max(12, "Mes inválido."),

//   referenciaAnio: z.coerce
//     .number()
//     .min(2000, "Año inválido.")
//     .max(2100, "Año inválido."),

//   observacion: z.string().trim().max(300).optional().default(""),

//   origenFacturacion: z.enum(["manual", "cron"]).optional().default("manual"),
// });

// export const crearNotaSchema = z.object({
//   clienteId: z.string().min(1, "Falta el cliente."),

//   facturaAsociadaId: z
//     .string()
//     .min(1, "Debe seleccionar una factura emitida.")
//     .refine((value) => mongoose.Types.ObjectId.isValid(value), {
//       message: "Factura asociada inválida.",
//     }),

//   importe: z.coerce
//     .number({
//       message: "El importe debe ser un número válido.",
//     })
//     .min(0.01, "El importe debe ser mayor a cero."),

//   concepto: z
//     .string()
//     .trim()
//     .min(2, "El concepto debe tener al menos 2 caracteres.")
//     .max(180, "El concepto no puede superar los 180 caracteres."),

//   observacion: z.string().trim().max(300).optional().default(""),
// });

// export type GenerarFacturacionManualInput = z.infer<
//   typeof generarFacturacionManualSchema
// >;

// export type CrearNotaInput = z.infer<typeof crearNotaSchema>;

// export type UsuarioCreadorMovimiento = {
//   userId: string;
//   nombre: string;
//   rol: string;
// };

// function validarObjectId(id: string) {
//   return mongoose.Types.ObjectId.isValid(id);
// }

// function formatPeriodoLabel(mes?: number | null, anio?: number | null) {
//   if (!mes || !anio) return "Sin período";

//   return `${mes}/${anio}`;
// }

// function toSafeMovimiento(movimiento: any): MovimientoFinancieroSafe {
//   return {
//     id: movimiento._id.toString(),
//     numeroComprobante: Number(movimiento.numeroComprobante || 0),
//     clienteId: movimiento.clienteId?.toString?.() || "",
//     tipoMovimiento: movimiento.tipoMovimiento as MovimientoTipo,
//     facturaAsociadaId: movimiento.facturaAsociadaId
//       ? movimiento.facturaAsociadaId.toString()
//       : null,
//     facturaAsociadaNumeroComprobante: null,
//     fecha: movimiento.fecha?.toISOString?.() || "",
//     concepto: movimiento.concepto || "",
//     debe: Number(movimiento.debe || 0),
//     haber: Number(movimiento.haber || 0),
//     saldo: Number(movimiento.saldo || 0),
//     referenciaMes: movimiento.referenciaMes ?? null,
//     referenciaAnio: movimiento.referenciaAnio ?? null,
//     creadoPorUsuarioId: movimiento.creadoPorUsuarioId?.toString?.() || "",
//     creadoPorNombre: movimiento.creadoPorNombre || "",
//     creadoPorRol: movimiento.creadoPorRol || "",
//     observacion: movimiento.observacion || "",
//     tipoCargo: movimiento.tipoCargo || "manual",
//     origenFacturacion: movimiento.origenFacturacion || "manual",
//     cicloFacturacionKey: movimiento.cicloFacturacionKey || null,
//     codigoVerificacion: movimiento.codigoVerificacion || null,
//     firmaVerificacion: movimiento.firmaVerificacion || null,
//     estadoComprobante: movimiento.estadoComprobante || "vigente",
//     pagoCorregidoId: movimiento.pagoCorregidoId
//       ? movimiento.pagoCorregidoId.toString()
//       : null,
//     corregidoPorMovimientoId: movimiento.corregidoPorMovimientoId
//       ? movimiento.corregidoPorMovimientoId.toString()
//       : null,
//     importeValidoFinal:
//       movimiento.importeValidoFinal !== null &&
//       movimiento.importeValidoFinal !== undefined
//         ? Number(movimiento.importeValidoFinal || 0)
//         : null,
//     importeCorregido: Number(movimiento.importeCorregido || 0),
//     creadoEn: movimiento.creadoEn?.toISOString?.() || "",
//     actualizadoEn: movimiento.actualizadoEn?.toISOString?.() || "",
//   };
// }

// function calcularPeriodoDesdeFactura(
//   factura: any,
//   movimientosAsociados: any[],
// ): PeriodoCuentaClienteSafe {
//   const facturaId = factura._id.toString();

//   const notasCredito = movimientosAsociados.filter(
//     (movimiento) => movimiento.tipoMovimiento === "nota_credito",
//   );

//   const notasDebito = movimientosAsociados.filter(
//     (movimiento) => movimiento.tipoMovimiento === "nota_debito",
//   );

//   const pagos = movimientosAsociados.filter(
//     (movimiento) => movimiento.tipoMovimiento === "pago",
//   );

//   const importeOriginal = Number(factura.debe || 0);

//   const totalNotasCredito = notasCredito.reduce(
//     (acc, movimiento) => acc + Number(movimiento.haber || 0),
//     0,
//   );

//   const totalNotasDebito = notasDebito.reduce(
//     (acc, movimiento) => acc + Number(movimiento.debe || 0),
//     0,
//   );

//   const totalPagos = pagos.reduce(
//     (acc, movimiento) => acc + Number(movimiento.haber || 0),
//     0,
//   );

//   const saldoPeriodo =
//     importeOriginal + totalNotasDebito - totalNotasCredito - totalPagos;

//   let estadoPeriodo: PeriodoCuentaClienteSafe["estadoPeriodo"] = "pendiente";

//   if (saldoPeriodo === 0) {
//     estadoPeriodo = "cancelado";
//   }

//   if (saldoPeriodo < 0) {
//     estadoPeriodo = "a_favor";
//   }

//   return {
//     facturaId,
//     numeroComprobante: Number(factura.numeroComprobante || 0),
//     fecha: factura.fecha?.toISOString?.() || "",
//     periodoLabel: formatPeriodoLabel(
//       factura.referenciaMes,
//       factura.referenciaAnio,
//     ),
//     concepto: factura.concepto || "",
//     importeOriginal,
//     totalNotasCredito,
//     totalNotasDebito,
//     totalPagos,
//     saldoPeriodo,
//     estadoPeriodo,
//     referenciaMes: factura.referenciaMes ?? null,
//     referenciaAnio: factura.referenciaAnio ?? null,
//   };
// }

// function toSafeFactura(
//   factura: any,
//   movimientosAsociados: any[],
// ): FacturaClienteSafe {
//   const periodo = calcularPeriodoDesdeFactura(factura, movimientosAsociados);

//   return {
//     id: periodo.facturaId,
//     numeroComprobante: periodo.numeroComprobante,
//     fecha: periodo.fecha,
//     concepto: periodo.concepto,
//     importeOriginal: periodo.importeOriginal,
//     totalNotasCredito: periodo.totalNotasCredito,
//     totalNotasDebito: periodo.totalNotasDebito,
//     totalPagos: periodo.totalPagos,
//     saldoFactura: periodo.saldoPeriodo,
//     referenciaMes: periodo.referenciaMes,
//     referenciaAnio: periodo.referenciaAnio,
//   };
// }

// async function obtenerSaldoActual(clienteId: string) {
//   const ultimoMovimiento = await MovimientoFinanciero.findOne({ clienteId })
//     .sort({ fecha: -1, creadoEn: -1 })
//     .lean();

//   return Number(ultimoMovimiento?.saldo || 0);
// }

// async function crearMovimiento(params: {
//   clienteId: string;
//   tipoMovimiento: MovimientoTipo;
//   facturaAsociadaId?: string | null;
//   concepto: string;
//   debe: number;
//   haber: number;
//   referenciaMes?: number | null;
//   referenciaAnio?: number | null;
//   observacion?: string;
//   tipoCargo?:
//     | "mensualidad"
//     | "proporcional_alta"
//     | "ajuste_prorrateo"
//     | "manual";
//   origenFacturacion?: "manual" | "cron" | "cobrador" | "admin" | "sistema";
//   cicloFacturacionKey?: string | null;
//   creadoPor: UsuarioCreadorMovimiento;
// }) {
//   const saldoActual = await obtenerSaldoActual(params.clienteId);
//   const nuevoSaldo = saldoActual + params.debe - params.haber;
//   const numeroComprobante = await obtenerSiguienteNumeroComprobante();

//   const movimiento = await MovimientoFinanciero.create({
//     numeroComprobante,
//     clienteId: params.clienteId,
//     tipoMovimiento: params.tipoMovimiento,
//     facturaAsociadaId: params.facturaAsociadaId || null,
//     fecha: new Date(),
//     concepto: params.concepto.trim(),
//     debe: params.debe,
//     haber: params.haber,
//     saldo: nuevoSaldo,
//     referenciaMes: params.referenciaMes ?? null,
//     referenciaAnio: params.referenciaAnio ?? null,
//     observacion: params.observacion?.trim() || "",
//     tipoCargo: params.tipoCargo || "manual",
//     origenFacturacion: params.origenFacturacion || "manual",
//     cicloFacturacionKey: params.cicloFacturacionKey || undefined,
//     creadoPorUsuarioId: params.creadoPor.userId,
//     creadoPorNombre: params.creadoPor.nombre,
//     creadoPorRol: params.creadoPor.rol,
//   });

//   return toSafeMovimiento(movimiento);
// }

// async function obtenerMovimientosCliente(clienteId: string) {
//   const movimientosRaw = await MovimientoFinanciero.find({ clienteId })
//     .sort({ fecha: 1, creadoEn: 1 })
//     .lean();

//   const movimientosBase = movimientosRaw.map(toSafeMovimiento);

//   const facturasPorId = new Map(
//     movimientosBase
//       .filter((movimiento) => movimiento.tipoMovimiento === "factura")
//       .map((factura) => [factura.id, factura.numeroComprobante]),
//   );

//   const movimientos = movimientosBase.map((movimiento) => ({
//     ...movimiento,
//     facturaAsociadaNumeroComprobante: movimiento.facturaAsociadaId
//       ? facturasPorId.get(movimiento.facturaAsociadaId) ?? null
//       : null,
//   }));

//   return {
//     movimientosRaw,
//     movimientos,
//   };
// }

// function agruparPeriodosDesdeMovimientos(movimientosRaw: any[]) {
//   const facturas = movimientosRaw.filter(
//     (movimiento) => movimiento.tipoMovimiento === "factura",
//   );

//   const movimientosAsociados = movimientosRaw.filter(
//     (movimiento) => movimiento.facturaAsociadaId,
//   );

//   return facturas
//     .map((factura) => {
//       const facturaId = factura._id.toString();

//       const asociados = movimientosAsociados.filter(
//         (movimiento) => movimiento.facturaAsociadaId?.toString() === facturaId,
//       );

//       return calcularPeriodoDesdeFactura(factura, asociados);
//     })
//     .sort((a, b) => {
//       const anioA = a.referenciaAnio || 0;
//       const anioB = b.referenciaAnio || 0;
//       const mesA = a.referenciaMes || 0;
//       const mesB = b.referenciaMes || 0;

//       if (anioA !== anioB) return anioB - anioA;
//       if (mesA !== mesB) return mesB - mesA;

//       return b.numeroComprobante - a.numeroComprobante;
//     });
// }

// export async function obtenerEstadoCuentaCliente(
//   clienteId: string,
// ): Promise<EstadoCuentaCliente | null> {
//   if (!validarObjectId(clienteId)) {
//     return null;
//   }

//   await connectDB();

//   const clienteExiste = await Cliente.exists({ _id: clienteId });

//   if (!clienteExiste) {
//     return null;
//   }

//   const { movimientosRaw, movimientos } =
//     await obtenerMovimientosCliente(clienteId);

//   const periodos = agruparPeriodosDesdeMovimientos(movimientosRaw);

//   const totalDebe = movimientos.reduce((acc, mov) => acc + mov.debe, 0);
//   const totalHaber = movimientos.reduce((acc, mov) => acc + mov.haber, 0);
//   const saldo = totalDebe - totalHaber;

//   return {
//     totalDebe,
//     totalHaber,
//     saldo,
//     movimientos,
//     periodos,
//   };
// }

// export async function obtenerFacturasCliente(
//   clienteId: string,
// ): Promise<FacturaClienteSafe[]> {
//   if (!validarObjectId(clienteId)) {
//     return [];
//   }

//   await connectDB();

//   const clienteExiste = await Cliente.exists({ _id: clienteId });

//   if (!clienteExiste) {
//     return [];
//   }

//   const [facturas, movimientosAsociados] = await Promise.all([
//     MovimientoFinanciero.find({
//       clienteId,
//       tipoMovimiento: "factura",
//     })
//       .sort({ referenciaAnio: -1, referenciaMes: -1, fecha: -1 })
//       .lean(),

//     MovimientoFinanciero.find({
//       clienteId,
//       facturaAsociadaId: { $ne: null },
//     }).lean(),
//   ]);

//   return facturas.map((factura) => {
//     const facturaId = factura._id.toString();

//     const asociados = movimientosAsociados.filter(
//       (movimiento) => movimiento.facturaAsociadaId?.toString() === facturaId,
//     );

//     return toSafeFactura(factura, asociados);
//   });
// }

// async function obtenerFacturaConSaldo(params: {
//   clienteId: string;
//   facturaAsociadaId: string;
// }) {
//   const { clienteId, facturaAsociadaId } = params;

//   const factura = await MovimientoFinanciero.findOne({
//     _id: facturaAsociadaId,
//     clienteId,
//     tipoMovimiento: "factura",
//   }).lean();

//   if (!factura) {
//     return null;
//   }

//   const movimientosAsociados = await MovimientoFinanciero.find({
//     clienteId,
//     facturaAsociadaId,
//   }).lean();

//   return toSafeFactura(factura, movimientosAsociados);
// }

// export async function obtenerDetallePeriodoCliente(
//   clienteId: string,
//   facturaId: string,
// ): Promise<DetallePeriodoCuentaCliente | null> {
//   if (!validarObjectId(clienteId) || !validarObjectId(facturaId)) {
//     return null;
//   }

//   await connectDB();

//   const factura = await MovimientoFinanciero.findOne({
//     _id: facturaId,
//     clienteId,
//     tipoMovimiento: "factura",
//   }).lean();

//   if (!factura) {
//     return null;
//   }

//   const movimientosAsociadosRaw = await MovimientoFinanciero.find({
//     clienteId,
//     facturaAsociadaId: facturaId,
//   })
//     .sort({ fecha: 1, creadoEn: 1 })
//     .lean();

//   const todosLosMovimientosRaw = [factura, ...movimientosAsociadosRaw];

//   const periodo = calcularPeriodoDesdeFactura(factura, movimientosAsociadosRaw);

//   const movimientos = todosLosMovimientosRaw.map((movimiento) => {
//     const safe = toSafeMovimiento(movimiento);

//     return {
//       ...safe,
//       facturaAsociadaNumeroComprobante: safe.facturaAsociadaId
//         ? Number(factura.numeroComprobante || 0)
//         : null,
//     };
//   });

//   const totalDebePeriodo = movimientos.reduce((acc, mov) => acc + mov.debe, 0);
//   const totalHaberPeriodo = movimientos.reduce((acc, mov) => acc + mov.haber, 0);
//   const saldoPeriodo = totalDebePeriodo - totalHaberPeriodo;

//   return {
//     periodo,
//     movimientos,
//     totalDebePeriodo,
//     totalHaberPeriodo,
//     saldoPeriodo,
//   };
// }

// const DIA_CORTE_FACTURACION = 28;

// function getPeriodoKey(mes: number, anio: number) {
//   return `${anio}-${String(mes).padStart(2, "0")}`;
// }

// function getFechaPeriodoInicio(mes: number, anio: number) {
//   return new Date(anio, mes - 1, 1, 0, 0, 0, 0);
// }

// function getFechaPeriodoFin(mes: number, anio: number) {
//   return new Date(anio, mes - 1, DIA_CORTE_FACTURACION, 23, 59, 59, 999);
// }

// function getPeriodoDesdeFecha(date: Date) {
//   return {
//     mes: date.getMonth() + 1,
//     anio: date.getFullYear(),
//   };
// }

// function compararPeriodo(
//   a: { mes: number; anio: number },
//   b: { mes: number; anio: number },
// ) {
//   if (a.anio !== b.anio) return a.anio - b.anio;
//   return a.mes - b.mes;
// }

// function sumarMes(periodo: { mes: number; anio: number }) {
//   if (periodo.mes === 12) {
//     return { mes: 1, anio: periodo.anio + 1 };
//   }

//   return { mes: periodo.mes + 1, anio: periodo.anio };
// }

// function roundMoney(value: number) {
//   return Math.round((Number(value || 0) + Number.EPSILON) * 100) / 100;
// }

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function mismaFechaOMes(date: Date, mes: number, anio: number) {
//   return date.getFullYear() === anio && date.getMonth() + 1 === mes;
// }

// function calcularImportePeriodo(params: {
//   historiales: any[];
//   mes: number;
//   anio: number;
// }) {
//   const { historiales, mes, anio } = params;

//   let total = 0;
//   let diasCalculados = 0;
//   let tieneCorteInterno = false;
//   const detalles: string[] = [];

//   for (const historial of historiales) {
//     const fechaDesde = new Date(historial.fechaDesde);
//     const fechaHasta = historial.fechaHasta
//       ? new Date(historial.fechaHasta)
//       : null;

//     if (fechaDesde > getFechaPeriodoFin(mes, anio)) {
//       continue;
//     }

//     if (fechaHasta && fechaHasta <= getFechaPeriodoInicio(mes, anio)) {
//       continue;
//     }

//     let diaDesde = 0;
//     let diaHasta = DIA_CORTE_FACTURACION;

//     if (mismaFechaOMes(fechaDesde, mes, anio)) {
//       diaDesde = Math.min(
//         Math.max(fechaDesde.getDate(), 0),
//         DIA_CORTE_FACTURACION,
//       );

//       if (fechaDesde.getDate() > 1) {
//         tieneCorteInterno = true;
//       }
//     }

//     if (fechaHasta && mismaFechaOMes(fechaHasta, mes, anio)) {
//       diaHasta = Math.min(
//         Math.max(fechaHasta.getDate(), 0),
//         DIA_CORTE_FACTURACION,
//       );
//       tieneCorteInterno = true;
//     }

//     const dias = Math.max(0, diaHasta - diaDesde);

//     if (dias <= 0) continue;

//     const importePlan = Number(historial.planImporte || 0);
//     const valorDiario = importePlan / DIA_CORTE_FACTURACION;
//     const subtotal = roundMoney(valorDiario * dias);

//     total += subtotal;
//     diasCalculados += dias;
//     detalles.push(
//       `${dias} días ${historial.planNombre} (${formatMoney(importePlan)})`,
//     );
//   }

//   return {
//     total: roundMoney(total),
//     diasCalculados,
//     tieneCorteInterno,
//     detalles,
//   };
// }

// async function existeCiclo(clienteId: string, cicloFacturacionKey: string) {
//   const existente = await MovimientoFinanciero.findOne({
//     clienteId,
//     cicloFacturacionKey,
//   }).lean();

//   return Boolean(existente);
// }

// async function obtenerFacturaPeriodo(params: {
//   clienteId: string;
//   referenciaMes: number;
//   referenciaAnio: number;
// }) {
//   return MovimientoFinanciero.findOne({
//     clienteId: params.clienteId,
//     tipoMovimiento: "factura",
//     referenciaMes: params.referenciaMes,
//     referenciaAnio: params.referenciaAnio,
//   }).lean();
// }

// async function asegurarHistorialInicial(params: { cliente: any; plan: any }) {
//   const clienteId = params.cliente._id.toString();

//   const fechaAltaCliente = new Date(
//     params.cliente.fechaAlta || params.cliente.creadoEn || new Date(),
//   );

//   fechaAltaCliente.setHours(0, 0, 0, 0);

//   const historiales = await ClientePlanHistorial.find({ clienteId }).sort({
//     fechaDesde: 1,
//   });

//   if (historiales.length === 0) {
//     await ClientePlanHistorial.create({
//       clienteId,
//       planId: params.plan._id,
//       planNombre: params.plan.nombre || "Plan",
//       planTipo: params.plan.tipo || "residencial",
//       planImporte: Number(params.plan.importe || 0),
//       fechaDesde: fechaAltaCliente,
//       fechaHasta: null,
//       motivo: "alta",
//       observacion: "Historial inicial creado automáticamente desde facturación.",
//     });

//     return;
//   }

//   const historialAlta = historiales.find(
//     (historial) => historial.motivo === "alta",
//   );

//   if (historialAlta) {
//     const fechaDesdeHistorial = new Date(historialAlta.fechaDesde);
//     fechaDesdeHistorial.setHours(0, 0, 0, 0);

//     if (fechaDesdeHistorial.getTime() !== fechaAltaCliente.getTime()) {
//       historialAlta.fechaDesde = fechaAltaCliente;
//       historialAlta.observacion =
//         "Historial inicial sincronizado automáticamente con la fecha de alta del cliente.";

//       await historialAlta.save();
//     }

//     return;
//   }

//   const primerHistorial = historiales[0];

//   if (!primerHistorial) {
//     return;
//   }

//   const fechaPrimerHistorial = new Date(primerHistorial.fechaDesde);
//   fechaPrimerHistorial.setHours(0, 0, 0, 0);

//   if (fechaPrimerHistorial.getTime() > fechaAltaCliente.getTime()) {
//     await ClientePlanHistorial.create({
//       clienteId,
//       planId: params.plan._id,
//       planNombre: params.plan.nombre || "Plan",
//       planTipo: params.plan.tipo || "residencial",
//       planImporte: Number(params.plan.importe || 0),
//       fechaDesde: fechaAltaCliente,
//       fechaHasta: fechaPrimerHistorial,
//       motivo: "alta",
//       observacion:
//         "Historial inicial reconstruido automáticamente desde la fecha de alta del cliente.",
//     });
//   }
// }

// async function obtenerHistorialesPeriodo(params: {
//   clienteId: string;
//   mes: number;
//   anio: number;
// }) {
//   return ClientePlanHistorial.find({
//     clienteId: params.clienteId,
//     fechaDesde: { $lte: getFechaPeriodoFin(params.mes, params.anio) },
//     $or: [
//       { fechaHasta: null },
//       { fechaHasta: { $gt: getFechaPeriodoInicio(params.mes, params.anio) } },
//     ],
//   })
//     .sort({ fechaDesde: 1 })
//     .lean();
// }

// function buildPeriodosPendientes(params: {
//   fechaAlta: Date;
//   referenciaMes: number;
//   referenciaAnio: number;
// }) {
//   const periodos: { mes: number; anio: number }[] = [];
//   let actual = getPeriodoDesdeFecha(params.fechaAlta);
//   const final = { mes: params.referenciaMes, anio: params.referenciaAnio };

//   while (compararPeriodo(actual, final) <= 0) {
//     periodos.push(actual);
//     actual = sumarMes(actual);
//   }

//   return periodos;
// }

// export async function generarFacturacionManual(
//   input: GenerarFacturacionManualInput,
//   creadoPor: UsuarioCreadorMovimiento,
// ) {
//   const parsed = generarFacturacionManualSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//       generadas: 0,
//       omitidas: 0,
//       ajustes: 0,
//     };
//   }

//   const { referenciaMes, referenciaAnio, observacion, origenFacturacion } =
//     parsed.data;

//   await connectDB();

//   const clientes = await Cliente.find({ estado: "activo" })
//     .populate({ path: "planId", model: Plan })
//     .sort({ numeroCliente: 1 })
//     .lean();

//   if (clientes.length === 0) {
//     return {
//       ok: false,
//       message: "No hay clientes activos para facturar.",
//       generadas: 0,
//       omitidas: 0,
//       ajustes: 0,
//     };
//   }

//   let generadas = 0;
//   let omitidas = 0;
//   let ajustes = 0;

//   for (const cliente of clientes) {
//     const plan: any = cliente.planId;
//     const clienteId = cliente._id.toString();

//     if (!plan || Number(plan.importe || 0) <= 0) {
//       omitidas++;
//       continue;
//     }

//     await asegurarHistorialInicial({ cliente, plan });

//     const fechaAlta = new Date(
//       cliente.fechaAlta || cliente.creadoEn || new Date(),
//     );

//     const periodos = buildPeriodosPendientes({
//       fechaAlta,
//       referenciaMes,
//       referenciaAnio,
//     });

//     for (const periodo of periodos) {
//       const periodoKey = getPeriodoKey(periodo.mes, periodo.anio);

//       const historiales = await obtenerHistorialesPeriodo({
//         clienteId,
//         mes: periodo.mes,
//         anio: periodo.anio,
//       });

//       if (historiales.length === 0) {
//         omitidas++;
//         continue;
//       }

//       const calculo = calcularImportePeriodo({
//         historiales,
//         mes: periodo.mes,
//         anio: periodo.anio,
//       });

//       if (calculo.total <= 0) {
//         omitidas++;
//         continue;
//       }

//       const facturaExistente = await obtenerFacturaPeriodo({
//         clienteId,
//         referenciaMes: periodo.mes,
//         referenciaAnio: periodo.anio,
//       });

//       const detalle = calculo.detalles.join(" · ");
//       const esMesAlta = mismaFechaOMes(fechaAlta, periodo.mes, periodo.anio);
//       const esProporcionalAlta = esMesAlta && fechaAlta.getDate() > 1;

//       const tipoCargo = esProporcionalAlta
//         ? "proporcional_alta"
//         : "mensualidad";

//       const concepto = esProporcionalAlta
//         ? `Proporcional de alta ${periodo.mes}/${periodo.anio} hasta día ${DIA_CORTE_FACTURACION}`
//         : calculo.tieneCorteInterno
//           ? `Factura prorrateada ${periodo.mes}/${periodo.anio}`
//           : `Factura mensual ${periodo.mes}/${periodo.anio}`;

//       if (!facturaExistente) {
//         const cicloFacturacionKey = `${tipoCargo}:${periodoKey}:${clienteId}`;
//         const yaExisteCiclo = await existeCiclo(clienteId, cicloFacturacionKey);

//         if (yaExisteCiclo) {
//           omitidas++;
//           continue;
//         }

//         await crearMovimiento({
//           clienteId,
//           tipoMovimiento: "factura",
//           facturaAsociadaId: null,
//           concepto,
//           debe: calculo.total,
//           haber: 0,
//           referenciaMes: periodo.mes,
//           referenciaAnio: periodo.anio,
//           observacion: [observacion, detalle].filter(Boolean).join(" | "),
//           tipoCargo,
//           origenFacturacion,
//           cicloFacturacionKey,
//           creadoPor,
//         });

//         generadas++;
//         continue;
//       }

//       const importeFacturado = Number(facturaExistente.debe || 0);
//       const diferencia = roundMoney(calculo.total - importeFacturado);

//       if (diferencia === 0) {
//         omitidas++;
//         continue;
//       }

//       const cicloAjusteKey = `ajuste-prorrateo:${periodoKey}:${clienteId}`;
//       const yaTieneAjuste = await existeCiclo(clienteId, cicloAjusteKey);

//       if (yaTieneAjuste) {
//         omitidas++;
//         continue;
//       }

//       if (diferencia > 0) {
//         await crearMovimiento({
//           clienteId,
//           tipoMovimiento: "nota_debito",
//           facturaAsociadaId: facturaExistente._id.toString(),
//           concepto: `Diferencia por prorrateo ${periodo.mes}/${periodo.anio}`,
//           debe: diferencia,
//           haber: 0,
//           referenciaMes: periodo.mes,
//           referenciaAnio: periodo.anio,
//           observacion: [observacion, detalle].filter(Boolean).join(" | "),
//           tipoCargo: "ajuste_prorrateo",
//           origenFacturacion,
//           cicloFacturacionKey: cicloAjusteKey,
//           creadoPor,
//         });
//       } else {
//         await crearMovimiento({
//           clienteId,
//           tipoMovimiento: "nota_credito",
//           facturaAsociadaId: facturaExistente._id.toString(),
//           concepto: `Crédito por prorrateo ${periodo.mes}/${periodo.anio}`,
//           debe: 0,
//           haber: Math.abs(diferencia),
//           referenciaMes: periodo.mes,
//           referenciaAnio: periodo.anio,
//           observacion: [observacion, detalle].filter(Boolean).join(" | "),
//           tipoCargo: "ajuste_prorrateo",
//           origenFacturacion,
//           cicloFacturacionKey: cicloAjusteKey,
//           creadoPor,
//         });
//       }

//       ajustes++;
//     }
//   }

//   return {
//     ok: true,
//     message: `Facturación finalizada. Facturas generadas: ${generadas}. Ajustes: ${ajustes}. Omitidas: ${omitidas}. Corte fijo día ${DIA_CORTE_FACTURACION}.`,
//     generadas,
//     omitidas,
//     ajustes,
//   };
// }

// export async function crearNotaDebito(
//   input: CrearNotaInput,
//   creadoPor: UsuarioCreadorMovimiento,
// ) {
//   const parsed = crearNotaSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//     };
//   }

//   const { clienteId, facturaAsociadaId, importe, concepto, observacion } =
//     parsed.data;

//   if (!validarObjectId(clienteId)) {
//     return {
//       ok: false,
//       message: "ID de cliente inválido.",
//     };
//   }

//   await connectDB();

//   const factura = await obtenerFacturaConSaldo({
//     clienteId,
//     facturaAsociadaId,
//   });

//   if (!factura) {
//     return {
//       ok: false,
//       message: "La factura seleccionada no existe o no pertenece al cliente.",
//     };
//   }

//   await crearMovimiento({
//     clienteId,
//     tipoMovimiento: "nota_debito",
//     facturaAsociadaId,
//     concepto,
//     debe: importe,
//     haber: 0,
//     referenciaMes: factura.referenciaMes ?? null,
//     referenciaAnio: factura.referenciaAnio ?? null,
//     observacion,
//     creadoPor,
//   });

//   return {
//     ok: true,
//     message: "Nota de débito creada correctamente y asociada a la factura.",
//   };
// }

// export async function crearNotaCredito(
//   input: CrearNotaInput,
//   creadoPor: UsuarioCreadorMovimiento,
// ) {
//   const parsed = crearNotaSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//     };
//   }

//   const { clienteId, facturaAsociadaId, importe, concepto, observacion } =
//     parsed.data;

//   if (!validarObjectId(clienteId)) {
//     return {
//       ok: false,
//       message: "ID de cliente inválido.",
//     };
//   }

//   await connectDB();

//   const factura = await obtenerFacturaConSaldo({
//     clienteId,
//     facturaAsociadaId,
//   });

//   if (!factura) {
//     return {
//       ok: false,
//       message: "La factura seleccionada no existe o no pertenece al cliente.",
//     };
//   }

//   if (importe > factura.saldoFactura) {
//     return {
//       ok: false,
//       message: `La nota de crédito no puede superar el saldo de la factura (${formatMoney(
//         factura.saldoFactura,
//       )}).`,
//     };
//   }

//   await crearMovimiento({
//     clienteId,
//     tipoMovimiento: "nota_credito",
//     facturaAsociadaId,
//     concepto,
//     debe: 0,
//     haber: importe,
//     referenciaMes: factura.referenciaMes ?? null,
//     referenciaAnio: factura.referenciaAnio ?? null,
//     observacion,
//     creadoPor,
//   });

//   return {
//     ok: true,
//     message: "Nota de crédito creada correctamente y asociada a la factura.",
//   };
// }

import mongoose from "mongoose";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Cliente from "@/models/Cliente";
import Plan from "@/models/Plan";
import MovimientoFinanciero from "@/models/MovimientoFinanciero";
import ClientePlanHistorial from "@/models/ClientePlanHistorial";
import { obtenerSiguienteNumeroComprobante } from "@/utils/obtenerSiguienteNumeroComprobante";
import type {
  DetallePeriodoCuentaCliente,
  EstadoCuentaCliente,
  FacturaClienteSafe,
  MovimientoFinancieroSafe,
  MovimientoTipo,
  PeriodoCuentaClienteSafe,
} from "@/types/movimiento-financiero.types";

export const generarFacturacionManualSchema = z.object({
  referenciaMes: z.coerce
    .number()
    .min(1, "Mes inválido.")
    .max(12, "Mes inválido."),

  referenciaAnio: z.coerce
    .number()
    .min(2000, "Año inválido.")
    .max(2100, "Año inválido."),

  observacion: z.string().trim().max(300).optional().default(""),

  origenFacturacion: z.enum(["manual", "cron"]).optional().default("manual"),
});

export const crearNotaSchema = z.object({
  clienteId: z.string().min(1, "Falta el cliente."),

  facturaAsociadaId: z
    .string()
    .min(1, "Debe seleccionar una factura emitida.")
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Factura asociada inválida.",
    }),

  importe: z
    .union([z.string(), z.number()])
    .transform((value, context) => {
      const raw = String(value).trim().replace(",", ".");

      if (!/^\d+(?:\.\d{1,2})?$/.test(raw)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El importe debe ser válido y tener como máximo dos decimales.",
        });
        return z.NEVER;
      }

      const [integerPart, decimalPart = ""] = raw.split(".");
      const cents =
        Number(integerPart) * 100 +
        Number(decimalPart.padEnd(2, "0").slice(0, 2) || "0");

      if (!Number.isSafeInteger(cents) || cents <= 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El importe debe ser mayor a cero.",
        });
        return z.NEVER;
      }

      return cents;
    }),

  concepto: z
    .string()
    .trim()
    .min(2, "El concepto debe tener al menos 2 caracteres.")
    .max(180, "El concepto no puede superar los 180 caracteres."),

  observacion: z.string().trim().max(300).optional().default(""),
});

export type GenerarFacturacionManualInput = z.infer<
  typeof generarFacturacionManualSchema
>;

export type CrearNotaInput = z.input<typeof crearNotaSchema>;

export type UsuarioCreadorMovimiento = {
  userId: string;
  nombre: string;
  rol: string;
};

function validarObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function moneyToCents(value: number) {
  const normalized = Number(value || 0).toFixed(2);
  const [integerPart, decimalPart = "00"] = normalized.split(".");
  return Number(integerPart) * 100 + Number(decimalPart);
}

function centsToMoney(cents: number) {
  return cents / 100;
}


function formatPeriodoLabel(mes?: number | null, anio?: number | null) {
  if (!mes || !anio) return "Sin período";

  return `${mes}/${anio}`;
}

function toSafeMovimiento(movimiento: any): MovimientoFinancieroSafe {
  return {
    id: movimiento._id.toString(),
    numeroComprobante: Number(movimiento.numeroComprobante || 0),
    clienteId: movimiento.clienteId?.toString?.() || "",
    tipoMovimiento: movimiento.tipoMovimiento as MovimientoTipo,
    facturaAsociadaId: movimiento.facturaAsociadaId
      ? movimiento.facturaAsociadaId.toString()
      : null,
    facturaAsociadaNumeroComprobante: null,
    fecha: movimiento.fecha?.toISOString?.() || "",
    concepto: movimiento.concepto || "",
    debe: Number(movimiento.debe || 0),
    haber: Number(movimiento.haber || 0),
    saldo: Number(movimiento.saldo || 0),
    referenciaMes: movimiento.referenciaMes ?? null,
    referenciaAnio: movimiento.referenciaAnio ?? null,
    creadoPorUsuarioId: movimiento.creadoPorUsuarioId?.toString?.() || "",
    creadoPorNombre: movimiento.creadoPorNombre || "",
    creadoPorRol: movimiento.creadoPorRol || "",
    observacion: movimiento.observacion || "",
    tipoCargo: movimiento.tipoCargo || "manual",
    origenFacturacion: movimiento.origenFacturacion || "manual",
    cicloFacturacionKey: movimiento.cicloFacturacionKey || null,
    codigoVerificacion: movimiento.codigoVerificacion || null,
    firmaVerificacion: movimiento.firmaVerificacion || null,
    estadoComprobante: movimiento.estadoComprobante || "vigente",
    pagoCorregidoId: movimiento.pagoCorregidoId
      ? movimiento.pagoCorregidoId.toString()
      : null,
    corregidoPorMovimientoId: movimiento.corregidoPorMovimientoId
      ? movimiento.corregidoPorMovimientoId.toString()
      : null,
    importeValidoFinal:
      movimiento.importeValidoFinal !== null &&
      movimiento.importeValidoFinal !== undefined
        ? Number(movimiento.importeValidoFinal || 0)
        : null,
    importeCorregido: Number(movimiento.importeCorregido || 0),
    creadoEn: movimiento.creadoEn?.toISOString?.() || "",
    actualizadoEn: movimiento.actualizadoEn?.toISOString?.() || "",
  };
}

function calcularPeriodoDesdeFactura(
  factura: any,
  movimientosAsociados: any[],
): PeriodoCuentaClienteSafe {
  const facturaId = factura._id.toString();

  const notasCredito = movimientosAsociados.filter(
    (movimiento) => movimiento.tipoMovimiento === "nota_credito",
  );

  const notasDebito = movimientosAsociados.filter(
    (movimiento) => movimiento.tipoMovimiento === "nota_debito",
  );

  const pagos = movimientosAsociados.filter(
    (movimiento) => movimiento.tipoMovimiento === "pago",
  );

  const importeOriginal = Number(factura.debe || 0);

  const totalNotasCredito = notasCredito.reduce(
    (acc, movimiento) => acc + Number(movimiento.haber || 0),
    0,
  );

  const totalNotasDebito = notasDebito.reduce(
    (acc, movimiento) => acc + Number(movimiento.debe || 0),
    0,
  );

  const totalPagos = pagos.reduce(
    (acc, movimiento) => acc + Number(movimiento.haber || 0),
    0,
  );

  const saldoPeriodo =
    importeOriginal + totalNotasDebito - totalNotasCredito - totalPagos;

  let estadoPeriodo: PeriodoCuentaClienteSafe["estadoPeriodo"] = "pendiente";

  if (saldoPeriodo === 0) {
    estadoPeriodo = "cancelado";
  }

  if (saldoPeriodo < 0) {
    estadoPeriodo = "a_favor";
  }

  return {
    facturaId,
    numeroComprobante: Number(factura.numeroComprobante || 0),
    fecha: factura.fecha?.toISOString?.() || "",
    periodoLabel: formatPeriodoLabel(
      factura.referenciaMes,
      factura.referenciaAnio,
    ),
    concepto: factura.concepto || "",
    importeOriginal,
    totalNotasCredito,
    totalNotasDebito,
    totalPagos,
    saldoPeriodo,
    estadoPeriodo,
    referenciaMes: factura.referenciaMes ?? null,
    referenciaAnio: factura.referenciaAnio ?? null,
  };
}

function toSafeFactura(
  factura: any,
  movimientosAsociados: any[],
): FacturaClienteSafe {
  const periodo = calcularPeriodoDesdeFactura(factura, movimientosAsociados);

  return {
    id: periodo.facturaId,
    numeroComprobante: periodo.numeroComprobante,
    fecha: periodo.fecha,
    concepto: periodo.concepto,
    importeOriginal: periodo.importeOriginal,
    totalNotasCredito: periodo.totalNotasCredito,
    totalNotasDebito: periodo.totalNotasDebito,
    totalPagos: periodo.totalPagos,
    saldoFactura: periodo.saldoPeriodo,
    referenciaMes: periodo.referenciaMes,
    referenciaAnio: periodo.referenciaAnio,
  };
}

async function obtenerSaldoActual(clienteId: string) {
  const ultimoMovimiento = await MovimientoFinanciero.findOne({ clienteId })
    .sort({ fecha: -1, creadoEn: -1 })
    .lean();

  return Number(ultimoMovimiento?.saldo || 0);
}

async function crearMovimiento(params: {
  clienteId: string;
  tipoMovimiento: MovimientoTipo;
  facturaAsociadaId?: string | null;
  concepto: string;
  debe: number;
  haber: number;
  referenciaMes?: number | null;
  referenciaAnio?: number | null;
  observacion?: string;
  tipoCargo?:
    | "mensualidad"
    | "proporcional_alta"
    | "ajuste_prorrateo"
    | "manual";
  origenFacturacion?: "manual" | "cron" | "cobrador" | "admin" | "sistema";
  cicloFacturacionKey?: string | null;
  creadoPor: UsuarioCreadorMovimiento;
}) {
  const saldoActual = await obtenerSaldoActual(params.clienteId);
  const nuevoSaldo = saldoActual + params.debe - params.haber;
  const numeroComprobante = await obtenerSiguienteNumeroComprobante();

  const movimiento = await MovimientoFinanciero.create({
    numeroComprobante,
    clienteId: params.clienteId,
    tipoMovimiento: params.tipoMovimiento,
    facturaAsociadaId: params.facturaAsociadaId || null,
    fecha: new Date(),
    concepto: params.concepto.trim(),
    debe: params.debe,
    haber: params.haber,
    saldo: nuevoSaldo,
    referenciaMes: params.referenciaMes ?? null,
    referenciaAnio: params.referenciaAnio ?? null,
    observacion: params.observacion?.trim() || "",
    tipoCargo: params.tipoCargo || "manual",
    origenFacturacion: params.origenFacturacion || "manual",
    cicloFacturacionKey: params.cicloFacturacionKey || undefined,
    creadoPorUsuarioId: params.creadoPor.userId,
    creadoPorNombre: params.creadoPor.nombre,
    creadoPorRol: params.creadoPor.rol,
  });

  return toSafeMovimiento(movimiento);
}

async function obtenerMovimientosCliente(clienteId: string) {
  const movimientosRaw = await MovimientoFinanciero.find({ clienteId })
    .sort({ fecha: 1, creadoEn: 1 })
    .lean();

  const movimientosBase = movimientosRaw.map(toSafeMovimiento);

  const facturasPorId = new Map(
    movimientosBase
      .filter((movimiento) => movimiento.tipoMovimiento === "factura")
      .map((factura) => [factura.id, factura.numeroComprobante]),
  );

  const movimientos = movimientosBase.map((movimiento) => ({
    ...movimiento,
    facturaAsociadaNumeroComprobante: movimiento.facturaAsociadaId
      ? facturasPorId.get(movimiento.facturaAsociadaId) ?? null
      : null,
  }));

  return {
    movimientosRaw,
    movimientos,
  };
}

function agruparPeriodosDesdeMovimientos(movimientosRaw: any[]) {
  const facturas = movimientosRaw.filter(
    (movimiento) => movimiento.tipoMovimiento === "factura",
  );

  const movimientosAsociados = movimientosRaw.filter(
    (movimiento) => movimiento.facturaAsociadaId,
  );

  return facturas
    .map((factura) => {
      const facturaId = factura._id.toString();

      const asociados = movimientosAsociados.filter(
        (movimiento) => movimiento.facturaAsociadaId?.toString() === facturaId,
      );

      return calcularPeriodoDesdeFactura(factura, asociados);
    })
    .sort((a, b) => {
      const anioA = a.referenciaAnio || 0;
      const anioB = b.referenciaAnio || 0;
      const mesA = a.referenciaMes || 0;
      const mesB = b.referenciaMes || 0;

      if (anioA !== anioB) return anioB - anioA;
      if (mesA !== mesB) return mesB - mesA;

      return b.numeroComprobante - a.numeroComprobante;
    });
}

export async function obtenerEstadoCuentaCliente(
  clienteId: string,
): Promise<EstadoCuentaCliente | null> {
  if (!validarObjectId(clienteId)) {
    return null;
  }

  await connectDB();

  const clienteExiste = await Cliente.exists({ _id: clienteId });

  if (!clienteExiste) {
    return null;
  }

  const { movimientosRaw, movimientos } =
    await obtenerMovimientosCliente(clienteId);

  const periodos = agruparPeriodosDesdeMovimientos(movimientosRaw);

  const totalDebe = movimientos.reduce((acc, mov) => acc + mov.debe, 0);
  const totalHaber = movimientos.reduce((acc, mov) => acc + mov.haber, 0);
  const saldo = totalDebe - totalHaber;

  return {
    totalDebe,
    totalHaber,
    saldo,
    movimientos,
    periodos,
  };
}

export async function obtenerFacturasCliente(
  clienteId: string,
): Promise<FacturaClienteSafe[]> {
  if (!validarObjectId(clienteId)) {
    return [];
  }

  await connectDB();

  const clienteExiste = await Cliente.exists({ _id: clienteId });

  if (!clienteExiste) {
    return [];
  }

  const [facturas, movimientosAsociados] = await Promise.all([
    MovimientoFinanciero.find({
      clienteId,
      tipoMovimiento: "factura",
    })
      .sort({ referenciaAnio: -1, referenciaMes: -1, fecha: -1 })
      .lean(),

    MovimientoFinanciero.find({
      clienteId,
      facturaAsociadaId: { $ne: null },
    }).lean(),
  ]);

  return facturas.map((factura) => {
    const facturaId = factura._id.toString();

    const asociados = movimientosAsociados.filter(
      (movimiento) => movimiento.facturaAsociadaId?.toString() === facturaId,
    );

    return toSafeFactura(factura, asociados);
  });
}

async function obtenerFacturaConSaldo(params: {
  clienteId: string;
  facturaAsociadaId: string;
}) {
  const { clienteId, facturaAsociadaId } = params;

  const factura = await MovimientoFinanciero.findOne({
    _id: facturaAsociadaId,
    clienteId,
    tipoMovimiento: "factura",
  }).lean();

  if (!factura) {
    return null;
  }

  const movimientosAsociados = await MovimientoFinanciero.find({
    clienteId,
    facturaAsociadaId,
  }).lean();

  return toSafeFactura(factura, movimientosAsociados);
}

export async function obtenerDetallePeriodoCliente(
  clienteId: string,
  facturaId: string,
): Promise<DetallePeriodoCuentaCliente | null> {
  if (!validarObjectId(clienteId) || !validarObjectId(facturaId)) {
    return null;
  }

  await connectDB();

  const factura = await MovimientoFinanciero.findOne({
    _id: facturaId,
    clienteId,
    tipoMovimiento: "factura",
  }).lean();

  if (!factura) {
    return null;
  }

  const movimientosAsociadosRaw = await MovimientoFinanciero.find({
    clienteId,
    facturaAsociadaId: facturaId,
  })
    .sort({ fecha: 1, creadoEn: 1 })
    .lean();

  const todosLosMovimientosRaw = [factura, ...movimientosAsociadosRaw];

  const periodo = calcularPeriodoDesdeFactura(factura, movimientosAsociadosRaw);

  const movimientos = todosLosMovimientosRaw.map((movimiento) => {
    const safe = toSafeMovimiento(movimiento);

    return {
      ...safe,
      facturaAsociadaNumeroComprobante: safe.facturaAsociadaId
        ? Number(factura.numeroComprobante || 0)
        : null,
    };
  });

  const totalDebePeriodo = movimientos.reduce((acc, mov) => acc + mov.debe, 0);
  const totalHaberPeriodo = movimientos.reduce((acc, mov) => acc + mov.haber, 0);
  const saldoPeriodo = totalDebePeriodo - totalHaberPeriodo;

  return {
    periodo,
    movimientos,
    totalDebePeriodo,
    totalHaberPeriodo,
    saldoPeriodo,
  };
}

const DIA_CORTE_FACTURACION = 28;

function getPeriodoKey(mes: number, anio: number) {
  return `${anio}-${String(mes).padStart(2, "0")}`;
}

function getFechaPeriodoInicio(mes: number, anio: number) {
  return new Date(anio, mes - 1, 1, 0, 0, 0, 0);
}

function getFechaPeriodoFin(mes: number, anio: number) {
  return new Date(anio, mes - 1, DIA_CORTE_FACTURACION, 23, 59, 59, 999);
}

function getPeriodoDesdeFecha(date: Date) {
  return {
    mes: date.getMonth() + 1,
    anio: date.getFullYear(),
  };
}

function compararPeriodo(
  a: { mes: number; anio: number },
  b: { mes: number; anio: number },
) {
  if (a.anio !== b.anio) return a.anio - b.anio;
  return a.mes - b.mes;
}

function sumarMes(periodo: { mes: number; anio: number }) {
  if (periodo.mes === 12) {
    return { mes: 1, anio: periodo.anio + 1 };
  }

  return { mes: periodo.mes + 1, anio: periodo.anio };
}

function roundMoney(value: number) {
  return Math.round((Number(value || 0) + Number.EPSILON) * 100) / 100;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function mismaFechaOMes(date: Date, mes: number, anio: number) {
  return date.getFullYear() === anio && date.getMonth() + 1 === mes;
}

function calcularImportePeriodo(params: {
  historiales: any[];
  mes: number;
  anio: number;
}) {
  const { historiales, mes, anio } = params;

  let total = 0;
  let diasCalculados = 0;
  let tieneCorteInterno = false;
  const detalles: string[] = [];

  for (const historial of historiales) {
    const fechaDesde = new Date(historial.fechaDesde);
    const fechaHasta = historial.fechaHasta
      ? new Date(historial.fechaHasta)
      : null;

    if (fechaDesde > getFechaPeriodoFin(mes, anio)) {
      continue;
    }

    if (fechaHasta && fechaHasta <= getFechaPeriodoInicio(mes, anio)) {
      continue;
    }

    let diaDesde = 0;
    let diaHasta = DIA_CORTE_FACTURACION;

    if (mismaFechaOMes(fechaDesde, mes, anio)) {
      diaDesde = Math.min(
        Math.max(fechaDesde.getDate(), 0),
        DIA_CORTE_FACTURACION,
      );

      if (fechaDesde.getDate() > 1) {
        tieneCorteInterno = true;
      }
    }

    if (fechaHasta && mismaFechaOMes(fechaHasta, mes, anio)) {
      diaHasta = Math.min(
        Math.max(fechaHasta.getDate(), 0),
        DIA_CORTE_FACTURACION,
      );
      tieneCorteInterno = true;
    }

    const dias = Math.max(0, diaHasta - diaDesde);

    if (dias <= 0) continue;

    const importePlan = Number(historial.planImporte || 0);
    const valorDiario = importePlan / DIA_CORTE_FACTURACION;
    const subtotal = roundMoney(valorDiario * dias);

    total += subtotal;
    diasCalculados += dias;
    detalles.push(
      `${dias} días ${historial.planNombre} (${formatMoney(importePlan)})`,
    );
  }

  return {
    total: roundMoney(total),
    diasCalculados,
    tieneCorteInterno,
    detalles,
  };
}

async function existeCiclo(clienteId: string, cicloFacturacionKey: string) {
  const existente = await MovimientoFinanciero.findOne({
    clienteId,
    cicloFacturacionKey,
  }).lean();

  return Boolean(existente);
}

async function obtenerFacturaPeriodo(params: {
  clienteId: string;
  referenciaMes: number;
  referenciaAnio: number;
}) {
  return MovimientoFinanciero.findOne({
    clienteId: params.clienteId,
    tipoMovimiento: "factura",
    referenciaMes: params.referenciaMes,
    referenciaAnio: params.referenciaAnio,
  }).lean();
}

async function asegurarHistorialInicial(params: { cliente: any; plan: any }) {
  const clienteId = params.cliente._id.toString();

  const fechaAltaCliente = new Date(
    params.cliente.fechaAlta || params.cliente.creadoEn || new Date(),
  );

  fechaAltaCliente.setHours(0, 0, 0, 0);

  const historiales = await ClientePlanHistorial.find({ clienteId }).sort({
    fechaDesde: 1,
  });

  if (historiales.length === 0) {
    await ClientePlanHistorial.create({
      clienteId,
      planId: params.plan._id,
      planNombre: params.plan.nombre || "Plan",
      planTipo: params.plan.tipo || "residencial",
      planImporte: Number(params.plan.importe || 0),
      fechaDesde: fechaAltaCliente,
      fechaHasta: null,
      motivo: "alta",
      observacion: "Historial inicial creado automáticamente desde facturación.",
    });

    return;
  }

  const historialAlta = historiales.find(
    (historial) => historial.motivo === "alta",
  );

  if (historialAlta) {
    const fechaDesdeHistorial = new Date(historialAlta.fechaDesde);
    fechaDesdeHistorial.setHours(0, 0, 0, 0);

    if (fechaDesdeHistorial.getTime() !== fechaAltaCliente.getTime()) {
      historialAlta.fechaDesde = fechaAltaCliente;
      historialAlta.observacion =
        "Historial inicial sincronizado automáticamente con la fecha de alta del cliente.";

      await historialAlta.save();
    }

    return;
  }

  const primerHistorial = historiales[0];

  if (!primerHistorial) {
    return;
  }

  const fechaPrimerHistorial = new Date(primerHistorial.fechaDesde);
  fechaPrimerHistorial.setHours(0, 0, 0, 0);

  if (fechaPrimerHistorial.getTime() > fechaAltaCliente.getTime()) {
    await ClientePlanHistorial.create({
      clienteId,
      planId: params.plan._id,
      planNombre: params.plan.nombre || "Plan",
      planTipo: params.plan.tipo || "residencial",
      planImporte: Number(params.plan.importe || 0),
      fechaDesde: fechaAltaCliente,
      fechaHasta: fechaPrimerHistorial,
      motivo: "alta",
      observacion:
        "Historial inicial reconstruido automáticamente desde la fecha de alta del cliente.",
    });
  }
}

async function obtenerHistorialesPeriodo(params: {
  clienteId: string;
  mes: number;
  anio: number;
}) {
  return ClientePlanHistorial.find({
    clienteId: params.clienteId,
    fechaDesde: { $lte: getFechaPeriodoFin(params.mes, params.anio) },
    $or: [
      { fechaHasta: null },
      { fechaHasta: { $gt: getFechaPeriodoInicio(params.mes, params.anio) } },
    ],
  })
    .sort({ fechaDesde: 1 })
    .lean();
}

function buildPeriodosPendientes(params: {
  fechaAlta: Date;
  referenciaMes: number;
  referenciaAnio: number;
}) {
  const periodos: { mes: number; anio: number }[] = [];
  let actual = getPeriodoDesdeFecha(params.fechaAlta);
  const final = { mes: params.referenciaMes, anio: params.referenciaAnio };

  while (compararPeriodo(actual, final) <= 0) {
    periodos.push(actual);
    actual = sumarMes(actual);
  }

  return periodos;
}

export async function generarFacturacionManual(
  input: GenerarFacturacionManualInput,
  creadoPor: UsuarioCreadorMovimiento,
) {
  const parsed = generarFacturacionManualSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
      generadas: 0,
      omitidas: 0,
      ajustes: 0,
    };
  }

  const { referenciaMes, referenciaAnio, observacion, origenFacturacion } =
    parsed.data;

  await connectDB();

  const clientes = await Cliente.find({ estado: "activo" })
    .populate({ path: "planId", model: Plan })
    .sort({ numeroCliente: 1 })
    .lean();

  if (clientes.length === 0) {
    return {
      ok: false,
      message: "No hay clientes activos para facturar.",
      generadas: 0,
      omitidas: 0,
      ajustes: 0,
    };
  }

  let generadas = 0;
  let omitidas = 0;
  let ajustes = 0;

  for (const cliente of clientes) {
    const plan: any = cliente.planId;
    const clienteId = cliente._id.toString();

    if (!plan || Number(plan.importe || 0) <= 0) {
      omitidas++;
      continue;
    }

    await asegurarHistorialInicial({ cliente, plan });

    const fechaAlta = new Date(
      cliente.fechaAlta || cliente.creadoEn || new Date(),
    );

    const periodos = buildPeriodosPendientes({
      fechaAlta,
      referenciaMes,
      referenciaAnio,
    });

    for (const periodo of periodos) {
      const periodoKey = getPeriodoKey(periodo.mes, periodo.anio);

      const historiales = await obtenerHistorialesPeriodo({
        clienteId,
        mes: periodo.mes,
        anio: periodo.anio,
      });

      if (historiales.length === 0) {
        omitidas++;
        continue;
      }

      const calculo = calcularImportePeriodo({
        historiales,
        mes: periodo.mes,
        anio: periodo.anio,
      });

      if (calculo.total <= 0) {
        omitidas++;
        continue;
      }

      const facturaExistente = await obtenerFacturaPeriodo({
        clienteId,
        referenciaMes: periodo.mes,
        referenciaAnio: periodo.anio,
      });

      const detalle = calculo.detalles.join(" · ");
      const esMesAlta = mismaFechaOMes(fechaAlta, periodo.mes, periodo.anio);
      const esProporcionalAlta = esMesAlta && fechaAlta.getDate() > 1;

      const tipoCargo = esProporcionalAlta
        ? "proporcional_alta"
        : "mensualidad";

      const concepto = esProporcionalAlta
        ? `Proporcional de alta ${periodo.mes}/${periodo.anio} hasta día ${DIA_CORTE_FACTURACION}`
        : calculo.tieneCorteInterno
          ? `Factura prorrateada ${periodo.mes}/${periodo.anio}`
          : `Factura mensual ${periodo.mes}/${periodo.anio}`;

      if (!facturaExistente) {
        const cicloFacturacionKey = `${tipoCargo}:${periodoKey}:${clienteId}`;
        const yaExisteCiclo = await existeCiclo(clienteId, cicloFacturacionKey);

        if (yaExisteCiclo) {
          omitidas++;
          continue;
        }

        await crearMovimiento({
          clienteId,
          tipoMovimiento: "factura",
          facturaAsociadaId: null,
          concepto,
          debe: calculo.total,
          haber: 0,
          referenciaMes: periodo.mes,
          referenciaAnio: periodo.anio,
          observacion: [observacion, detalle].filter(Boolean).join(" | "),
          tipoCargo,
          origenFacturacion,
          cicloFacturacionKey,
          creadoPor,
        });

        generadas++;
        continue;
      }

      const importeFacturado = Number(facturaExistente.debe || 0);
      const diferencia = roundMoney(calculo.total - importeFacturado);

      if (diferencia === 0) {
        omitidas++;
        continue;
      }

      const cicloAjusteKey = `ajuste-prorrateo:${periodoKey}:${clienteId}`;
      const yaTieneAjuste = await existeCiclo(clienteId, cicloAjusteKey);

      if (yaTieneAjuste) {
        omitidas++;
        continue;
      }

      if (diferencia > 0) {
        await crearMovimiento({
          clienteId,
          tipoMovimiento: "nota_debito",
          facturaAsociadaId: facturaExistente._id.toString(),
          concepto: `Diferencia por prorrateo ${periodo.mes}/${periodo.anio}`,
          debe: diferencia,
          haber: 0,
          referenciaMes: periodo.mes,
          referenciaAnio: periodo.anio,
          observacion: [observacion, detalle].filter(Boolean).join(" | "),
          tipoCargo: "ajuste_prorrateo",
          origenFacturacion,
          cicloFacturacionKey: cicloAjusteKey,
          creadoPor,
        });
      } else {
        await crearMovimiento({
          clienteId,
          tipoMovimiento: "nota_credito",
          facturaAsociadaId: facturaExistente._id.toString(),
          concepto: `Crédito por prorrateo ${periodo.mes}/${periodo.anio}`,
          debe: 0,
          haber: Math.abs(diferencia),
          referenciaMes: periodo.mes,
          referenciaAnio: periodo.anio,
          observacion: [observacion, detalle].filter(Boolean).join(" | "),
          tipoCargo: "ajuste_prorrateo",
          origenFacturacion,
          cicloFacturacionKey: cicloAjusteKey,
          creadoPor,
        });
      }

      ajustes++;
    }
  }

  return {
    ok: true,
    message: `Facturación finalizada. Facturas generadas: ${generadas}. Ajustes: ${ajustes}. Omitidas: ${omitidas}. Corte fijo día ${DIA_CORTE_FACTURACION}.`,
    generadas,
    omitidas,
    ajustes,
  };
}

export async function crearNotaDebito(
  input: CrearNotaInput,
  creadoPor: UsuarioCreadorMovimiento,
) {
  const parsed = crearNotaSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  const { clienteId, facturaAsociadaId, importe: importeCentavos, concepto, observacion } =
    parsed.data;

  const importe = centsToMoney(importeCentavos);

  if (!validarObjectId(clienteId)) {
    return {
      ok: false,
      message: "ID de cliente inválido.",
    };
  }

  await connectDB();

  const factura = await obtenerFacturaConSaldo({
    clienteId,
    facturaAsociadaId,
  });

  if (!factura) {
    return {
      ok: false,
      message: "La factura seleccionada no existe o no pertenece al cliente.",
    };
  }

  await crearMovimiento({
    clienteId,
    tipoMovimiento: "nota_debito",
    facturaAsociadaId,
    concepto,
    debe: importe,
    haber: 0,
    referenciaMes: factura.referenciaMes ?? null,
    referenciaAnio: factura.referenciaAnio ?? null,
    observacion,
    creadoPor,
  });

  return {
    ok: true,
    message: "Nota de débito creada correctamente y asociada a la factura.",
  };
}

export async function crearNotaCredito(
  input: CrearNotaInput,
  creadoPor: UsuarioCreadorMovimiento,
) {
  const parsed = crearNotaSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  const { clienteId, facturaAsociadaId, importe: importeCentavos, concepto, observacion } =
    parsed.data;

  const importe = centsToMoney(importeCentavos);

  if (!validarObjectId(clienteId)) {
    return {
      ok: false,
      message: "ID de cliente inválido.",
    };
  }

  await connectDB();

  const factura = await obtenerFacturaConSaldo({
    clienteId,
    facturaAsociadaId,
  });

  if (!factura) {
    return {
      ok: false,
      message: "La factura seleccionada no existe o no pertenece al cliente.",
    };
  }

  if (importeCentavos > moneyToCents(factura.saldoFactura)) {
    return {
      ok: false,
      message: `La nota de crédito no puede superar el saldo de la factura (${formatMoney(
        factura.saldoFactura,
      )}).`,
    };
  }

  await crearMovimiento({
    clienteId,
    tipoMovimiento: "nota_credito",
    facturaAsociadaId,
    concepto,
    debe: 0,
    haber: importe,
    referenciaMes: factura.referenciaMes ?? null,
    referenciaAnio: factura.referenciaAnio ?? null,
    observacion,
    creadoPor,
  });

  return {
    ok: true,
    message: "Nota de crédito creada correctamente y asociada a la factura.",
  };
}
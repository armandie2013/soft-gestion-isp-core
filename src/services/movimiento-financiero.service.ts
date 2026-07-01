// import mongoose from "mongoose";
// import { z } from "zod";
// import { connectDB } from "@/lib/db";
// import Cliente from "@/models/Cliente";
// import Plan from "@/models/Plan";
// import MovimientoFinanciero from "@/models/MovimientoFinanciero";
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
//   id: movimiento._id.toString(),
//   numeroComprobante: Number(movimiento.numeroComprobante || 0),
//   clienteId: movimiento.clienteId?.toString?.() || "",
//   tipoMovimiento: movimiento.tipoMovimiento as MovimientoTipo,
//   facturaAsociadaId: movimiento.facturaAsociadaId
//     ? movimiento.facturaAsociadaId.toString()
//     : null,
//   facturaAsociadaNumeroComprobante: null,
//   fecha: movimiento.fecha?.toISOString?.() || "",
//   concepto: movimiento.concepto || "",
//   debe: Number(movimiento.debe || 0),
//   haber: Number(movimiento.haber || 0),
//   saldo: Number(movimiento.saldo || 0),
//   referenciaMes: movimiento.referenciaMes ?? null,
//   referenciaAnio: movimiento.referenciaAnio ?? null,
//   creadoPorUsuarioId: movimiento.creadoPorUsuarioId?.toString?.() || "",
//   creadoPorNombre: movimiento.creadoPorNombre || "",
//   creadoPorRol: movimiento.creadoPorRol || "",
//   observacion: movimiento.observacion || "",
//   codigoVerificacion: movimiento.codigoVerificacion || null,
//   firmaVerificacion: movimiento.firmaVerificacion || null,
//   creadoEn: movimiento.creadoEn?.toISOString?.() || "",
//   actualizadoEn: movimiento.actualizadoEn?.toISOString?.() || "",
// };
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
//     periodoLabel: formatPeriodoLabel(factura.referenciaMes, factura.referenciaAnio),
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

// function toSafeFactura(factura: any, movimientosAsociados: any[]): FacturaClienteSafe {
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

//   const { movimientosRaw, movimientos } = await obtenerMovimientosCliente(clienteId);

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
//     };
//   }

//   const { referenciaMes, referenciaAnio, observacion } = parsed.data;

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
//     };
//   }

//   let generadas = 0;
//   let omitidas = 0;

//   for (const cliente of clientes) {
//     const plan: any = cliente.planId;

//     if (!plan || Number(plan.importe || 0) <= 0) {
//       omitidas++;
//       continue;
//     }

//     const facturaExistente = await MovimientoFinanciero.findOne({
//       clienteId: cliente._id,
//       tipoMovimiento: "factura",
//       referenciaMes,
//       referenciaAnio,
//     }).lean();

//     if (facturaExistente) {
//       omitidas++;
//       continue;
//     }

//     const concepto = `Factura mensual ${referenciaMes}/${referenciaAnio} - ${plan.nombre}`;

//     await crearMovimiento({
//       clienteId: cliente._id.toString(),
//       tipoMovimiento: "factura",
//       facturaAsociadaId: null,
//       concepto,
//       debe: Number(plan.importe || 0),
//       haber: 0,
//       referenciaMes,
//       referenciaAnio,
//       observacion,
//       creadoPor,
//     });

//     generadas++;
//   }

//   return {
//     ok: true,
//     message: `Facturación finalizada. Generadas: ${generadas}. Omitidas: ${omitidas}.`,
//     generadas,
//     omitidas,
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
//       message: `La nota de crédito no puede superar el saldo de la factura (${new Intl.NumberFormat(
//         "es-AR",
//         {
//           style: "currency",
//           currency: "ARS",
//         },
//       ).format(factura.saldoFactura)}).`,
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

// import mongoose from "mongoose";
// import { z } from "zod";
// import { connectDB } from "@/lib/db";
// import Cliente from "@/models/Cliente";
// import Plan from "@/models/Plan";
// import MovimientoFinanciero from "@/models/MovimientoFinanciero";
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
//     };
//   }

//   const { referenciaMes, referenciaAnio, observacion } = parsed.data;

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
//     };
//   }

//   let generadas = 0;
//   let omitidas = 0;

//   for (const cliente of clientes) {
//     const plan: any = cliente.planId;

//     if (!plan || Number(plan.importe || 0) <= 0) {
//       omitidas++;
//       continue;
//     }

//     const facturaExistente = await MovimientoFinanciero.findOne({
//       clienteId: cliente._id,
//       tipoMovimiento: "factura",
//       referenciaMes,
//       referenciaAnio,
//     }).lean();

//     if (facturaExistente) {
//       omitidas++;
//       continue;
//     }

//     const concepto = `Factura mensual ${referenciaMes}/${referenciaAnio} - ${plan.nombre}`;

//     await crearMovimiento({
//       clienteId: cliente._id.toString(),
//       tipoMovimiento: "factura",
//       facturaAsociadaId: null,
//       concepto,
//       debe: Number(plan.importe || 0),
//       haber: 0,
//       referenciaMes,
//       referenciaAnio,
//       observacion,
//       creadoPor,
//     });

//     generadas++;
//   }

//   return {
//     ok: true,
//     message: `Facturación finalizada. Generadas: ${generadas}. Omitidas: ${omitidas}.`,
//     generadas,
//     omitidas,
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
//       message: `La nota de crédito no puede superar el saldo de la factura (${new Intl.NumberFormat(
//         "es-AR",
//         {
//           style: "currency",
//           currency: "ARS",
//         },
//       ).format(factura.saldoFactura)}).`,
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

  fechaCorte: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Fecha de corte inválida.",
    }),

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

  importe: z.coerce
    .number({
      message: "El importe debe ser un número válido.",
    })
    .min(0.01, "El importe debe ser mayor a cero."),

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

export type CrearNotaInput = z.infer<typeof crearNotaSchema>;

export type UsuarioCreadorMovimiento = {
  userId: string;
  nombre: string;
  rol: string;
};

function validarObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
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

function parseFechaCorte(value?: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getPeriodoKey(mes: number, anio: number) {
  return `${anio}-${String(mes).padStart(2, "0")}`;
}

function getPeriodoDesdeFecha(date: Date) {
  return {
    mes: date.getMonth() + 1,
    anio: date.getFullYear(),
  };
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

function calcularImporteProrrateado(params: {
  historiales: any[];
  mes: number;
  anio: number;
  diaCorte: number;
}) {
  const { historiales, mes, anio, diaCorte } = params;

  let total = 0;
  let diasCalculados = 0;
  let requiereAjuste = false;
  const detalles: string[] = [];

  for (const historial of historiales) {
    const fechaDesde = new Date(historial.fechaDesde);
    const fechaHasta = historial.fechaHasta ? new Date(historial.fechaHasta) : null;

    let diaDesde = 0;

    if (mismaFechaOMes(fechaDesde, mes, anio)) {
      diaDesde = Math.min(Math.max(fechaDesde.getDate(), 0), diaCorte);

      if (fechaDesde.getDate() > 1) {
        requiereAjuste = true;
      }
    } else if (fechaDesde > new Date(anio, mes - 1, diaCorte, 23, 59, 59, 999)) {
      continue;
    }

    let diaHasta = diaCorte;

    if (fechaHasta && mismaFechaOMes(fechaHasta, mes, anio)) {
      diaHasta = Math.min(Math.max(fechaHasta.getDate(), 0), diaCorte);
      requiereAjuste = true;
    } else if (fechaHasta && fechaHasta < new Date(anio, mes - 1, 1, 0, 0, 0, 0)) {
      continue;
    }

    const dias = Math.max(0, diaHasta - diaDesde);

    if (dias <= 0) continue;

    const importePlan = Number(historial.planImporte || 0);
    const valorDiario = importePlan / diaCorte;
    const subtotal = roundMoney(valorDiario * dias);

    total += subtotal;
    diasCalculados += dias;
    detalles.push(`${dias} días ${historial.planNombre} (${formatMoney(importePlan)})`);
  }

  return {
    total: roundMoney(total),
    diasCalculados,
    requiereAjuste,
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

async function obtenerFacturaMensualPeriodo(params: {
  clienteId: string;
  referenciaMes: number;
  referenciaAnio: number;
}) {
  return MovimientoFinanciero.findOne({
    clienteId: params.clienteId,
    tipoMovimiento: "factura",
    referenciaMes: params.referenciaMes,
    referenciaAnio: params.referenciaAnio,
    $or: [
      { tipoCargo: "mensualidad" },
      { tipoCargo: { $exists: false } },
      { tipoCargo: null },
    ],
  }).lean();
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

  const {
    referenciaMes,
    referenciaAnio,
    observacion,
    fechaCorte,
    origenFacturacion,
  } = parsed.data;

  await connectDB();

  const corte = parseFechaCorte(fechaCorte);
  const diaCorte = Math.min(Math.max(corte.getDate(), 1), 28);
  const fechaCorteKey = getDateKey(corte);
  const periodoAjuste = getPeriodoDesdeFecha(corte);
  const periodoMensualKey = getPeriodoKey(referenciaMes, referenciaAnio);
  const periodoAjusteKey = getPeriodoKey(periodoAjuste.mes, periodoAjuste.anio);

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

    const historialExistente = await ClientePlanHistorial.exists({ clienteId });

    if (!historialExistente) {
      await ClientePlanHistorial.create({
        clienteId,
        planId: plan._id,
        planNombre: plan.nombre || "Plan",
        planTipo: plan.tipo || "residencial",
        planImporte: Number(plan.importe || 0),
        fechaDesde: cliente.fechaAlta || cliente.creadoEn || new Date(),
        fechaHasta: null,
        motivo: "alta",
        observacion: "Historial inicial creado automáticamente desde facturación.",
      });
    }

    const historiales = await ClientePlanHistorial.find({
      clienteId,
      fechaDesde: {
        $lt: new Date(
          periodoAjuste.anio,
          periodoAjuste.mes - 1,
          diaCorte,
          23,
          59,
          59,
          999,
        ),
      },
      $or: [
        { fechaHasta: null },
        {
          fechaHasta: {
            $gt: new Date(
              periodoAjuste.anio,
              periodoAjuste.mes - 1,
              1,
              0,
              0,
              0,
              0,
            ),
          },
        },
      ],
    })
      .sort({ fechaDesde: 1 })
      .lean();

    const prorrateo = calcularImporteProrrateado({
      historiales,
      mes: periodoAjuste.mes,
      anio: periodoAjuste.anio,
      diaCorte,
    });

    if (prorrateo.requiereAjuste && prorrateo.total > 0) {
      const cicloAjusteKey = `ajuste-prorrateo:${periodoAjusteKey}:corte:${fechaCorteKey}:${clienteId}`;
      const yaTieneAjuste = await existeCiclo(clienteId, cicloAjusteKey);

      if (yaTieneAjuste) {
        omitidas++;
      } else {
        const facturaMensualActual = await obtenerFacturaMensualPeriodo({
          clienteId,
          referenciaMes: periodoAjuste.mes,
          referenciaAnio: periodoAjuste.anio,
        });

        const conceptoBase = `Prorrateo ${periodoAjuste.mes}/${periodoAjuste.anio} hasta día ${diaCorte}`;
        const detalle = prorrateo.detalles.join(" · ");

        if (facturaMensualActual) {
          const importeFacturado = Number(facturaMensualActual.debe || 0);
          const diferencia = roundMoney(prorrateo.total - importeFacturado);

          if (diferencia > 0) {
            await crearMovimiento({
              clienteId,
              tipoMovimiento: "nota_debito",
              facturaAsociadaId: facturaMensualActual._id.toString(),
              concepto: `${conceptoBase} - diferencia por cambio de plan`,
              debe: diferencia,
              haber: 0,
              referenciaMes: periodoAjuste.mes,
              referenciaAnio: periodoAjuste.anio,
              observacion: [observacion, detalle].filter(Boolean).join(" | "),
              tipoCargo: "ajuste_prorrateo",
              origenFacturacion,
              cicloFacturacionKey: cicloAjusteKey,
              creadoPor,
            });
            ajustes++;
          } else if (diferencia < 0) {
            await crearMovimiento({
              clienteId,
              tipoMovimiento: "nota_credito",
              facturaAsociadaId: facturaMensualActual._id.toString(),
              concepto: `${conceptoBase} - crédito por cambio de plan`,
              debe: 0,
              haber: Math.abs(diferencia),
              referenciaMes: periodoAjuste.mes,
              referenciaAnio: periodoAjuste.anio,
              observacion: [observacion, detalle].filter(Boolean).join(" | "),
              tipoCargo: "ajuste_prorrateo",
              origenFacturacion,
              cicloFacturacionKey: cicloAjusteKey,
              creadoPor,
            });
            ajustes++;
          } else {
            omitidas++;
          }
        } else {
          await crearMovimiento({
            clienteId,
            tipoMovimiento: "factura",
            facturaAsociadaId: null,
            concepto: `${conceptoBase} - ${plan.nombre}`,
            debe: prorrateo.total,
            haber: 0,
            referenciaMes: periodoAjuste.mes,
            referenciaAnio: periodoAjuste.anio,
            observacion: [observacion, detalle].filter(Boolean).join(" | "),
            tipoCargo: "proporcional_alta",
            origenFacturacion,
            cicloFacturacionKey: cicloAjusteKey,
            creadoPor,
          });
          ajustes++;
        }
      }
    }

    const cicloMensualKey = `mensualidad:${periodoMensualKey}:${clienteId}`;
    const yaTieneMensualidad = await existeCiclo(clienteId, cicloMensualKey);

    if (yaTieneMensualidad) {
      omitidas++;
      continue;
    }

    const facturaMensualExistente = await obtenerFacturaMensualPeriodo({
      clienteId,
      referenciaMes,
      referenciaAnio,
    });

    if (facturaMensualExistente) {
      omitidas++;
      continue;
    }

    const concepto = `Factura mensual ${referenciaMes}/${referenciaAnio} - ${plan.nombre}`;

    await crearMovimiento({
      clienteId,
      tipoMovimiento: "factura",
      facturaAsociadaId: null,
      concepto,
      debe: Number(plan.importe || 0),
      haber: 0,
      referenciaMes,
      referenciaAnio,
      observacion,
      tipoCargo: "mensualidad",
      origenFacturacion,
      cicloFacturacionKey: cicloMensualKey,
      creadoPor,
    });

    generadas++;
  }

  return {
    ok: true,
    message: `Facturación finalizada. Mensualidades: ${generadas}. Ajustes: ${ajustes}. Omitidas: ${omitidas}.`,
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

  const { clienteId, facturaAsociadaId, importe, concepto, observacion } =
    parsed.data;

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

  const { clienteId, facturaAsociadaId, importe, concepto, observacion } =
    parsed.data;

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

  if (importe > factura.saldoFactura) {
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
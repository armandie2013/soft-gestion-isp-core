import mongoose from "mongoose";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Cliente from "@/models/Cliente";
import Plan from "@/models/Plan";
import MovimientoFinanciero from "@/models/MovimientoFinanciero";
import { obtenerSiguienteNumeroComprobante } from "@/utils/obtenerSiguienteNumeroComprobante";
import type {
  EstadoCuentaCliente,
  FacturaClienteSafe,
  MovimientoFinancieroSafe,
  MovimientoTipo,
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
    creadoEn: movimiento.creadoEn?.toISOString?.() || "",
    actualizadoEn: movimiento.actualizadoEn?.toISOString?.() || "",
  };
}

function toSafeFactura(factura: any, notas: any[]): FacturaClienteSafe {
  const facturaId = factura._id.toString();

  const notasDeLaFactura = notas.filter(
    (nota) => nota.facturaAsociadaId?.toString() === facturaId,
  );

  const totalNotasCredito = notasDeLaFactura
    .filter((nota) => nota.tipoMovimiento === "nota_credito")
    .reduce((acc, nota) => acc + Number(nota.haber || 0), 0);

  const totalNotasDebito = notasDeLaFactura
    .filter((nota) => nota.tipoMovimiento === "nota_debito")
    .reduce((acc, nota) => acc + Number(nota.debe || 0), 0);

  const importeOriginal = Number(factura.debe || 0);
  const saldoFactura = importeOriginal + totalNotasDebito - totalNotasCredito;

  return {
    id: facturaId,
    numeroComprobante: Number(factura.numeroComprobante || 0),
    fecha: factura.fecha?.toISOString?.() || "",
    concepto: factura.concepto || "",
    importeOriginal,
    totalNotasCredito,
    totalNotasDebito,
    saldoFactura,
    referenciaMes: factura.referenciaMes ?? null,
    referenciaAnio: factura.referenciaAnio ?? null,
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
    creadoPorUsuarioId: params.creadoPor.userId,
    creadoPorNombre: params.creadoPor.nombre,
    creadoPorRol: params.creadoPor.rol,
  });

  return toSafeMovimiento(movimiento);
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

  const totalDebe = movimientos.reduce((acc, mov) => acc + mov.debe, 0);
  const totalHaber = movimientos.reduce((acc, mov) => acc + mov.haber, 0);
  const saldo = totalDebe - totalHaber;

  return {
    totalDebe,
    totalHaber,
    saldo,
    movimientos,
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

  const [facturas, notas] = await Promise.all([
    MovimientoFinanciero.find({
      clienteId,
      tipoMovimiento: "factura",
    })
      .sort({ referenciaAnio: -1, referenciaMes: -1, fecha: -1 })
      .lean(),

    MovimientoFinanciero.find({
      clienteId,
      tipoMovimiento: { $in: ["nota_credito", "nota_debito"] },
      facturaAsociadaId: { $ne: null },
    }).lean(),
  ]);

  return facturas.map((factura) => toSafeFactura(factura, notas));
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

  const notas = await MovimientoFinanciero.find({
    clienteId,
    facturaAsociadaId,
    tipoMovimiento: { $in: ["nota_credito", "nota_debito"] },
  }).lean();

  return toSafeFactura(factura, notas);
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
    };
  }

  const { referenciaMes, referenciaAnio, observacion } = parsed.data;

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
    };
  }

  let generadas = 0;
  let omitidas = 0;

  for (const cliente of clientes) {
    const plan: any = cliente.planId;

    if (!plan || Number(plan.importe || 0) <= 0) {
      omitidas++;
      continue;
    }

    const facturaExistente = await MovimientoFinanciero.findOne({
      clienteId: cliente._id,
      tipoMovimiento: "factura",
      referenciaMes,
      referenciaAnio,
    }).lean();

    if (facturaExistente) {
      omitidas++;
      continue;
    }

    const concepto = `Factura mensual ${referenciaMes}/${referenciaAnio} - ${plan.nombre}`;

    await crearMovimiento({
      clienteId: cliente._id.toString(),
      tipoMovimiento: "factura",
      facturaAsociadaId: null,
      concepto,
      debe: Number(plan.importe || 0),
      haber: 0,
      referenciaMes,
      referenciaAnio,
      observacion,
      creadoPor,
    });

    generadas++;
  }

  return {
    ok: true,
    message: `Facturación finalizada. Generadas: ${generadas}. Omitidas: ${omitidas}.`,
    generadas,
    omitidas,
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
      message: `La nota de crédito no puede superar el saldo de la factura (${new Intl.NumberFormat(
        "es-AR",
        {
          style: "currency",
          currency: "ARS",
        },
      ).format(factura.saldoFactura)}).`,
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
export const MOVIMIENTO_TIPOS = [
  "factura",
  "nota_credito",
  "nota_debito",
  "pago",
  "ajuste",
] as const;

export type MovimientoTipo = (typeof MOVIMIENTO_TIPOS)[number];

export type MovimientoFinancieroSafe = {
  id: string;
  numeroComprobante: number;
  clienteId: string;
  tipoMovimiento: MovimientoTipo;
  facturaAsociadaId?: string | null;
  facturaAsociadaNumeroComprobante?: number | null;
  fecha: string;
  concepto: string;
  debe: number;
  haber: number;
  saldo: number;
  referenciaMes?: number | null;
  referenciaAnio?: number | null;
  creadoPorUsuarioId: string;
  creadoPorNombre: string;
  creadoPorRol: string;
  observacion: string;
  codigoVerificacion?: string | null;
  firmaVerificacion?: string | null;
  creadoEn: string;
  actualizadoEn: string;
};

export type FacturaClienteSafe = {
  id: string;
  numeroComprobante: number;
  fecha: string;
  concepto: string;
  importeOriginal: number;
  totalNotasCredito: number;
  totalNotasDebito: number;
  totalPagos: number;
  saldoFactura: number;
  referenciaMes?: number | null;
  referenciaAnio?: number | null;
};

export type PeriodoCuentaClienteSafe = {
  facturaId: string;
  numeroComprobante: number;
  fecha: string;
  periodoLabel: string;
  concepto: string;
  importeOriginal: number;
  totalNotasCredito: number;
  totalNotasDebito: number;
  totalPagos: number;
  saldoPeriodo: number;
  estadoPeriodo: "pendiente" | "cancelado" | "a_favor";
  referenciaMes?: number | null;
  referenciaAnio?: number | null;
};

export type EstadoCuentaCliente = {
  totalDebe: number;
  totalHaber: number;
  saldo: number;
  movimientos: MovimientoFinancieroSafe[];
  periodos: PeriodoCuentaClienteSafe[];
};

export type DetallePeriodoCuentaCliente = {
  periodo: PeriodoCuentaClienteSafe;
  movimientos: MovimientoFinancieroSafe[];
  totalDebePeriodo: number;
  totalHaberPeriodo: number;
  saldoPeriodo: number;
};
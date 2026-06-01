export const CAJA_COBRADOR_TIPOS = ["cobro", "cierre_caja"] as const;

export type CajaCobradorTipo = (typeof CAJA_COBRADOR_TIPOS)[number];

export const CODIGO_CIERRE_CAJA_ESTADOS = [
  "pendiente",
  "usado",
  "vencido",
  "cancelado",
] as const;

export type CodigoCierreCajaEstado =
  (typeof CODIGO_CIERRE_CAJA_ESTADOS)[number];

export type CajaCobradorMovimientoSafe = {
  id: string;
  cobradorId: string;
  tipoMovimiento: CajaCobradorTipo;
  clienteId?: string | null;
  movimientoFinancieroId?: string | null;
  facturaAsociadaId?: string | null;
  codigoCierreId?: string | null;
  importe: number;
  saldoCaja: number;
  descripcion: string;
  observacion: string;
  creadoEn: string;
  actualizadoEn: string;
};

export type CajaCobradorResumen = {
  totalCobrado: number;
  totalCierres: number;
  saldoActual: number;
  movimientos: CajaCobradorMovimientoSafe[];
};

export type CodigoCierreCajaSafe = {
  id: string;
  codigo: string;
  cobradorId: string;
  cobradorNombre: string;
  importe: number;
  estado: CodigoCierreCajaEstado;
  generadoPorAdminId: string;
  generadoPorAdminNombre: string;
  usadoEn: string | null;
  venceEn: string;
  creadoEn: string;
  actualizadoEn: string;
};

export type CobradorCajaResumenSafe = {
  cobradorId: string;
  nombre: string;
  apellido: string;
  email: string;
  saldoActual: number;
  totalCobrado: number;
  totalCierres: number;
  codigoPendiente: CodigoCierreCajaSafe | null;
};

export type AdminCajaCobradoresResumenSafe = {
  totalSaldoCobradores: number;
  totalRecibidoAdmin: number;
  cantidadCobradores: number;
  cantidadCobradoresConSaldo: number;
  cantidadCodigosPendientes: number;
  cantidadCierresRealizados: number;
  cobradores: CobradorCajaResumenSafe[];
};
// export const CAJA_COBRADOR_TIPOS = ["cobro", "cierre_caja"] as const;

// export type CajaCobradorTipo = (typeof CAJA_COBRADOR_TIPOS)[number];

// export const CODIGO_CIERRE_CAJA_ESTADOS = [
//   "pendiente",
//   "usado",
//   "vencido",
//   "cancelado",
// ] as const;

// export type CodigoCierreCajaEstado =
//   (typeof CODIGO_CIERRE_CAJA_ESTADOS)[number];

// export type CajaCobradorMovimientoSafe = {
//   id: string;
//   cobradorId: string;
//   tipoMovimiento: CajaCobradorTipo;
//   clienteId?: string | null;
//   movimientoFinancieroId?: string | null;
//   facturaAsociadaId?: string | null;
//   codigoCierreId?: string | null;
//   importe: number;
//   saldoCaja: number;
//   descripcion: string;
//   observacion: string;
//   creadoEn: string;
//   actualizadoEn: string;
// };

// export type CajaCobradorResumen = {
//   totalCobrado: number;
//   totalCierres: number;
//   saldoActual: number;
//   movimientos: CajaCobradorMovimientoSafe[];
// };

// export type CodigoCierreCajaSafe = {
//   id: string;
//   codigo: string;
//   cobradorId: string;
//   cobradorNombre: string;
//   importe: number;
//   estado: CodigoCierreCajaEstado;
//   generadoPorAdminId: string;
//   generadoPorAdminNombre: string;
//   usadoEn: string | null;
//   venceEn: string;
//   creadoEn: string;
//   actualizadoEn: string;
// };

// export type CobradorCajaResumenSafe = {
//   cobradorId: string;
//   nombre: string;
//   apellido: string;
//   email: string;
//   saldoActual: number;
//   totalCobrado: number;
//   totalCierres: number;
//   codigoPendiente: CodigoCierreCajaSafe | null;
// };

// export type AdminCajaCobradoresResumenSafe = {
//   totalSaldoCobradores: number;
//   totalRecibidoAdmin: number;
//   cantidadCobradores: number;
//   cantidadCobradoresConSaldo: number;
//   cantidadCodigosPendientes: number;
//   cantidadCierresRealizados: number;
//   cobradores: CobradorCajaResumenSafe[];
// };

export const CAJA_COBRADOR_TIPOS = [
  "cobro",
  "cierre_caja",
  "ajuste_correccion_pago",
  "ajuste_correccion_pago_post_cierre",
] as const;

export type CajaCobradorTipo = (typeof CAJA_COBRADOR_TIPOS)[number];

export const CAJA_COBRADOR_ESTADOS = ["abierto", "cerrado"] as const;

export type CajaCobradorEstado = (typeof CAJA_COBRADOR_ESTADOS)[number];

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
  estadoCaja: CajaCobradorEstado;
  clienteId?: string | null;
  movimientoFinancieroId?: string | null;
  facturaAsociadaId?: string | null;
  codigoCierreId?: string | null;
  cierreCajaId?: string | null;
  importe: number;
  saldoCaja: number;
  descripcion: string;
  observacion: string;
  cerradoEn: string | null;
  creadoEn: string;
  actualizadoEn: string;
};

export type CajaCobradorResumen = {
  totalCobrado: number;
  totalCierres: number;
  totalAjustesCorreccion: number;
  totalAjustesPostCierre: number;
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
  totalAjustesCorreccion: number;
  totalAjustesPostCierre: number;
  codigoPendiente: CodigoCierreCajaSafe | null;
};

export type AdminCajaCobradoresResumenSafe = {
  totalSaldoCobradores: number;
  totalRecibidoAdmin: number;
  totalAjustesPostCierre: number;
  cantidadCobradores: number;
  cantidadCobradoresConSaldo: number;
  cantidadCodigosPendientes: number;
  cantidadCierresRealizados: number;
  cobradores: CobradorCajaResumenSafe[];
};

export type CorreccionPagoContextoSafe = {
  movimientoId: string;
  numeroComprobante: number;
  fecha: string;
  clienteId: string;
  clienteNombre: string;
  clienteDni: string;
  facturaAsociadaId: string;
  facturaNumeroComprobante: number | null;
  periodoLabel: string;
  importeRegistrado: number;
  importeValidoActual: number;
  importeYaCorregido: number;
  saldoClienteDespuesDelPago: number;
  cobradorId: string;
  cobradorNombre: string;
  saldoCajaActual: number;
  estadoComprobante: string;
  estadoCajaCobro: CajaCobradorEstado;
  cobroYaCerrado: boolean;
  cierreCajaId: string | null;
  cierreCajaFecha: string | null;
  correccionImpactaCajaActual: boolean;
  correccionImpactaCierreAnterior: boolean;
  puedeCorregir: boolean;
  motivoNoPuedeCorregir?: string;
};

export type CorreccionPagoResult = {
  ok: boolean;
  message: string;
  correccionMovimientoId?: string;
  numeroComprobanteCorreccion?: number;
};
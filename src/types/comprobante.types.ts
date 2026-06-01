export type ComprobantePagoClienteSafe = {
  movimientoId: string;
  numeroComprobante: number;
  fecha: string;

  clienteId: string;
  clienteNumero: number;
  clienteNombre: string;
  clienteApellido: string;
  clienteDni: string;
  clienteDireccion: string;
  clienteLocalidad: string;
  clienteProvincia: string;

  periodoLabel: string;
  facturaNumeroComprobante: number | null;
  concepto: string;
  importePagado: number;
  observacion: string;

  cobradorId: string;
  cobradorNombre: string;

  saldoClienteDespuesDelPago: number;
};

export type ComprobanteCierreCajaSafe = {
  cierreId: string;
  fechaCierre: string;

  cobradorId: string;
  cobradorNombre: string;
  cobradorEmail: string;

  importeCerrado: number;
  saldoCajaDespuesDelCierre: number;

  codigo: string;
  codigoEstado: string;
  codigoGeneradoPor: string;
  codigoCreadoEn: string | null;
  codigoUsadoEn: string | null;

  descripcion: string;
  observacion: string;
};
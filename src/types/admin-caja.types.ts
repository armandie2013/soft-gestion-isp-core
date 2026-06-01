import type { CajaCobradorMovimientoSafe } from "@/types/cobro.types";

export type AdminCierreCajaSafe = {
  id: string;
  cobradorId: string;
  cobradorNombre: string;
  importe: number;
  saldoCaja: number;
  codigoCierreId: string | null;
  codigo: string;
  codigoEstado: string;
  generadoPorAdminNombre: string;
  codigoCreadoEn: string | null;
  codigoUsadoEn: string | null;
  descripcion: string;
  observacion: string;
  creadoEn: string;
};

export type AdminCierresCajaResumenSafe = {
  totalCierres: number;
  cantidadCierres: number;
  cierres: AdminCierreCajaSafe[];
};

export type AdminDetalleCierreCajaSafe = {
  cierre: AdminCierreCajaSafe;
  cobrosIncluidos: CajaCobradorMovimientoSafe[];
  totalCobrosIncluidos: number;
  cierreAnteriorFecha: string | null;
};
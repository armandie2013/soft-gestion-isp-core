import type {
  CajaCobradorMovimientoSafe,
  CobradorCajaResumenSafe,
} from "@/types/cobro.types";

export type AdminMovimientoCajaSafe = CajaCobradorMovimientoSafe & {
  cobradorNombre: string;
  numeroComprobante?: number | null;
  estadoComprobante?: string | null;
  comprobanteDisponible?: boolean;
  puedeCorregir?: boolean;
};

export type AdminDetalleCajaCobradorSafe = {
  cobrador: CobradorCajaResumenSafe & { dni: string; estado: string };
  disponibleParaRendir: number;
  movimientos: AdminMovimientoCajaSafe[];
  cantidadMovimientos: number;
};

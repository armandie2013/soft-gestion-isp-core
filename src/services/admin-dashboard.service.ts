import { connectDB } from "@/lib/db";
import Cliente from "@/models/Cliente";
import Plan from "@/models/Plan";
import Usuario from "@/models/Usuario";
import CajaCobrador from "@/models/CajaCobrador";
import MovimientoFinanciero from "@/models/MovimientoFinanciero";
import { obtenerAdminCajaCobradoresResumen } from "@/services/cobro.service";

export type AdminDashboardCobradorCard = {
  cobradorId: string;
  nombreCompleto: string;
  email: string;
  saldoActual: number;
  totalCobrado: number;
  totalCerrado: number;
  ultimoRetiroImporte: number;
  ultimoRetiroFecha: string | null;
  tieneCodigoPendiente: boolean;
  codigoPendienteImporte: number;
};

export type AdminDashboardResumen = {
  totalCuentaAdmin: number;
  totalEnCajaCobradores: number;
  totalClientes: number;
  clientesActivos: number;
  clientesSuspendidos: number;
  totalUsuarios: number;
  totalCobradores: number;
  planesActivos: number;
  facturasEmitidas: number;
  saldoClientesPendiente: number;
  codigosPendientes: number;
  cobradores: AdminDashboardCobradorCard[];
};

function toIso(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return null;
}

export async function obtenerAdminDashboardResumen(): Promise<AdminDashboardResumen> {
  await connectDB();

  const [
    cajaResumen,
    totalClientes,
    clientesActivos,
    clientesSuspendidos,
    totalUsuarios,
    totalCobradores,
    planesActivos,
    facturasEmitidas,
    saldoClientesPendienteRaw,
  ] = await Promise.all([
    obtenerAdminCajaCobradoresResumen(),

    Cliente.countDocuments(),

    Cliente.countDocuments({
      estado: "activo",
    }),

    Cliente.countDocuments({
      estado: "suspendido",
    }),

    Usuario.countDocuments(),

    Usuario.countDocuments({
      rol: "cobrador",
    }),

    Plan.countDocuments({
      estado: "activo",
    }),

    MovimientoFinanciero.countDocuments({
      tipoMovimiento: "factura",
    }),

    MovimientoFinanciero.aggregate([
      {
        $sort: {
          clienteId: 1,
          fecha: 1,
          creadoEn: 1,
        },
      },
      {
        $group: {
          _id: "$clienteId",
          ultimoSaldo: {
            $last: "$saldo",
          },
        },
      },
      {
        $group: {
          _id: null,
          saldoTotal: {
            $sum: "$ultimoSaldo",
          },
        },
      },
    ]),
  ]);

  const cobradores = await Promise.all(
    cajaResumen.cobradores.map(async (cobrador) => {
      const ultimoRetiro = await CajaCobrador.findOne({
        cobradorId: cobrador.cobradorId,
        tipoMovimiento: "cierre_caja",
      })
        .sort({ creadoEn: -1 })
        .lean();

      return {
        cobradorId: cobrador.cobradorId,
        nombreCompleto:
          `${cobrador.apellido || ""}, ${cobrador.nombre || ""}`.trim() ||
          "Cobrador",
        email: cobrador.email || "",
        saldoActual: Number(cobrador.saldoActual || 0),
        totalCobrado: Number(cobrador.totalCobrado || 0),
        totalCerrado: Number(cobrador.totalCierres || 0),
        ultimoRetiroImporte: Number(ultimoRetiro?.importe || 0),
        ultimoRetiroFecha: toIso(ultimoRetiro?.creadoEn),
        tieneCodigoPendiente: Boolean(cobrador.codigoPendiente),
        codigoPendienteImporte: Number(cobrador.codigoPendiente?.importe || 0),
      };
    }),
  );

  return {
    totalCuentaAdmin: Number(cajaResumen.totalRecibidoAdmin || 0),
    totalEnCajaCobradores: Number(cajaResumen.totalSaldoCobradores || 0),
    totalClientes,
    clientesActivos,
    clientesSuspendidos,
    totalUsuarios,
    totalCobradores,
    planesActivos,
    facturasEmitidas,
    saldoClientesPendiente: Number(
      saldoClientesPendienteRaw[0]?.saldoTotal || 0,
    ),
    codigosPendientes: Number(cajaResumen.cantidadCodigosPendientes || 0),
    cobradores,
  };
}
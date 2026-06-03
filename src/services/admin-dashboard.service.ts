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

export type AdminDashboardUltimoMovimiento = {
  id: string;
  fecha: string | null;
  tipoMovimiento: string;
  usuarioNombre: string;
  usuarioRol: string;
  detalle: string;
  importe: number;
  estado: "confirmado" | "pendiente";
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
  ultimosMovimientos: AdminDashboardUltimoMovimiento[];
};

function toIso(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return null;
}

function normalizeId(value: unknown) {
  if (value && typeof value === "object" && "toString" in value) {
    return value.toString();
  }

  return String(value || "");
}

function calcularImporteMovimiento(movimiento: {
  debe?: number | null;
  haber?: number | null;
}) {
  const haber = Number(movimiento.haber || 0);
  const debe = Number(movimiento.debe || 0);

  return haber > 0 ? haber : debe;
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
    ultimosMovimientosRaw,
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

    MovimientoFinanciero.find()
      .sort({ creadoEn: -1 })
      .limit(4)
      .select({
        _id: 1,
        fecha: 1,
        tipoMovimiento: 1,
        concepto: 1,
        debe: 1,
        haber: 1,
        creadoPorNombre: 1,
        creadoPorRol: 1,
      })
      .lean(),
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

  const ultimosMovimientos = ultimosMovimientosRaw.map((movimiento) => ({
    id: normalizeId(movimiento._id),
    fecha: toIso(movimiento.fecha),
    tipoMovimiento: String(movimiento.tipoMovimiento || "movimiento"),
    usuarioNombre: String(movimiento.creadoPorNombre || "Sistema"),
    usuarioRol: String(movimiento.creadoPorRol || "sistema"),
    detalle: String(movimiento.concepto || "Movimiento financiero"),
    importe: calcularImporteMovimiento(movimiento),
    estado: "confirmado" as const,
  }));

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
    ultimosMovimientos,
  };
}
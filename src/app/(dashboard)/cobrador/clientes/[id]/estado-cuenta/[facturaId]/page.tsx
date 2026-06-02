import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  ReceiptText,
  UserRound,
  WalletCards,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { obtenerClienteParaCobrador } from "@/services/cobrador.service";
import { obtenerDetallePeriodoCliente } from "@/services/movimiento-financiero.service";
import type { MovimientoFinancieroSafe } from "@/types/movimiento-financiero.types";

type DetallePeriodoCobradorPageProps = {
  params: {
    id: string;
    facturaId: string;
  };
};

export const metadata = {
  title: "Detalle del período",
};

function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function getTipoLabel(tipo: string) {
  if (tipo === "factura") return "Factura";
  if (tipo === "nota_credito") return "Nota crédito";
  if (tipo === "nota_debito") return "Nota débito";
  if (tipo === "pago") return "Pago";
  return "Ajuste";
}

function getTipoVariant(tipo: string) {
  if (tipo === "factura") return "info";
  if (tipo === "nota_credito") return "success";
  if (tipo === "nota_debito") return "warning";
  if (tipo === "pago") return "success";
  return "default";
}

function getEstadoPeriodoBadge(estado: string) {
  if (estado === "cancelado") {
    return <Badge variant="success">Cancelado</Badge>;
  }

  if (estado === "a_favor") {
    return <Badge variant="info">A favor</Badge>;
  }

  return <Badge variant="danger">Pendiente</Badge>;
}

function getImpacto(movimiento: MovimientoFinancieroSafe) {
  if (movimiento.debe > 0) {
    return {
      label: "Suma",
      value: movimiento.debe,
      sign: "+",
      className: "text-red-700 dark:text-red-300",
      icon: <ArrowUpRight className="h-4 w-4" />,
    };
  }

  if (movimiento.haber > 0) {
    return {
      label: "Resta",
      value: movimiento.haber,
      sign: "-",
      className: "text-emerald-700 dark:text-emerald-300",
      icon: <ArrowDownLeft className="h-4 w-4" />,
    };
  }

  return {
    label: "Sin impacto",
    value: 0,
    sign: "",
    className: "text-slate-500 dark:text-slate-400",
    icon: <FileText className="h-4 w-4" />,
  };
}

function ResumenItem({
  label,
  value,
  helper,
  variant = "default",
}: {
  label: string;
  value: string;
  helper?: string;
  variant?: "default" | "success" | "danger";
}) {
  const valueClass = {
    default: "text-slate-950 dark:text-white",
    success: "text-emerald-700 dark:text-emerald-300",
    danger: "text-red-700 dark:text-red-300",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className={`mt-1 text-lg font-semibold ${valueClass[variant]}`}>
        {value}
      </p>

      {helper ? (
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

export default async function DetallePeriodoCobradorPage({
  params,
}: DetallePeriodoCobradorPageProps) {
  const [cliente, detalle] = await Promise.all([
    obtenerClienteParaCobrador(params.id),
    obtenerDetallePeriodoCliente(params.id, params.facturaId),
  ]);

  if (!cliente || !detalle) {
    notFound();
  }

  const saldoPendiente = detalle.periodo.saldoPeriodo > 0;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="rounded-[1.6rem] border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-200">
              <FileText className="h-3.5 w-3.5" />
              Factura N° {detalle.periodo.numeroComprobante}
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950">
                <UserRound className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Detalle del período
                </p>

                <h1 className="mt-1 truncate text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {detalle.periodo.periodoLabel}
                </h1>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {cliente.apellido}, {cliente.nombre} · DNI {cliente.dni}
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60 sm:min-w-72">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Saldo del período
              </p>

              <p
                className={`mt-1 text-2xl font-semibold tracking-tight ${
                  saldoPendiente
                    ? "text-red-700 dark:text-red-300"
                    : "text-slate-950 dark:text-white"
                }`}
              >
                {formatMoney(detalle.periodo.saldoPeriodo)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {getEstadoPeriodoBadge(detalle.periodo.estadoPeriodo)}
              <Badge variant="info">{detalle.periodo.periodoLabel}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            <WalletCards className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Resumen
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
              Composición del período
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Factura base, créditos, débitos, pagos y saldo final.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <ResumenItem
            label="Original"
            value={formatMoney(detalle.periodo.importeOriginal)}
            helper="Importe de la factura"
          />

          <ResumenItem
            label="Créditos / pagos"
            value={`- ${formatMoney(
              detalle.periodo.totalNotasCredito + detalle.periodo.totalPagos,
            )}`}
            helper="Descuentos aplicados"
            variant="success"
          />

          <ResumenItem
            label="Notas débito"
            value={`+ ${formatMoney(detalle.periodo.totalNotasDebito)}`}
            helper="Importes sumados"
            variant="danger"
          />

          <ResumenItem
            label="Saldo período"
            value={formatMoney(detalle.periodo.saldoPeriodo)}
            helper="Saldo final"
            variant={saldoPendiente ? "danger" : "default"}
          />
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            <FileText className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Movimientos
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
              Detalle de movimientos
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Factura base, notas asociadas y pagos aplicados a este período.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {detalle.movimientos.map((movimiento) => {
            const impacto = getImpacto(movimiento);

            return (
              <div
                key={movimiento.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          getTipoVariant(movimiento.tipoMovimiento) as any
                        }
                      >
                        {getTipoLabel(movimiento.tipoMovimiento)}
                      </Badge>

                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {formatDate(movimiento.fecha)} · Comp. N°{" "}
                        {movimiento.numeroComprobante}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">
                      {movimiento.concepto}
                    </p>

                    {movimiento.observacion ? (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {movimiento.observacion}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:min-w-44">
                    <div
                      className={`flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900/80 ${impacto.className}`}
                    >
                      <div className="shrink-0">{impacto.icon}</div>

                      <div className="text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                          {impacto.label}
                        </p>

                        <p className="text-sm font-semibold">
                          {impacto.value > 0
                            ? `${impacto.sign} ${formatMoney(impacto.value)}`
                            : "-"}
                        </p>
                      </div>
                    </div>

                    {movimiento.tipoMovimiento === "pago" ? (
                      <Link
                        href={`/comprobantes/pagos/${movimiento.id}`}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 transition hover:bg-cyan-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <ReceiptText className="h-3.5 w-3.5" />
                        Ver comprobante
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
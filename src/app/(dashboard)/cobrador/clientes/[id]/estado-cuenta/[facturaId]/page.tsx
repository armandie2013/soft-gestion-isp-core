import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
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
      label: "Debe",
      value: movimiento.debe,
      sign: "+",
      className: "text-red-700 dark:text-red-300",
      icon: <ArrowUpRight className="h-4 w-4" />,
    };
  }

  if (movimiento.haber > 0) {
    return {
      label: "Haber",
      value: movimiento.haber,
      sign: "−",
      className: "text-emerald-700 dark:text-emerald-300",
      icon: <ArrowDownLeft className="h-4 w-4" />,
    };
  }

  return {
    label: "Sin impacto",
    value: 0,
    sign: "",
    className: "text-[var(--overview-muted)]",
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
    default: "text-[var(--overview-text)]",
    success: "text-emerald-700 dark:text-emerald-300",
    danger: "text-red-700 dark:text-red-300",
  };

  return (
    <div className="min-w-0 rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-panel)] px-3 py-2.5">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--overview-muted)]">
        {label}
      </p>
      <p className={`mt-1 truncate text-[14px] font-semibold tabular-nums ${valueClass[variant]}`}>
        {value}
      </p>
      {helper ? (
        <p className="mt-0.5 text-[10px] leading-4 text-[var(--overview-muted)]">
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

  const saldo = Number(detalle.periodo.saldoPeriodo || 0);
  const saldoPendiente = saldo > 0;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-3 text-[var(--overview-text)]">
      <div className="overflow-hidden rounded-[10px] border border-[var(--overview-border)] bg-[var(--overview-panel)] shadow-sm">
        <header className="flex flex-col gap-3 border-b border-[var(--overview-border)] bg-[var(--overview-header)] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] border border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)] shadow-sm">
              <UserRound className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--overview-blue-accent)]">
                Estado de cuenta · Comprobante N° {detalle.periodo.numeroComprobante}
              </p>
              <h1 className="mt-1 text-[19px] font-semibold tracking-tight text-[var(--overview-text)] sm:text-[22px]">
                Detalle del período
              </h1>
              <p className="mt-1 text-[12px] leading-5 text-[var(--overview-muted)]">
                {detalle.periodo.periodoLabel} · {cliente.apellido}, {cliente.nombre} · DNI {cliente.dni}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-[var(--overview-border)] pt-3 sm:min-w-64 sm:justify-end sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--overview-muted)]">
                Saldo del período
              </p>
              <p className={`mt-0.5 text-xl font-semibold tabular-nums ${saldoPendiente ? "text-red-700 dark:text-red-300" : "text-emerald-700 dark:text-emerald-300"}`}>
                {formatMoney(saldo)}
              </p>
            </div>
            {getEstadoPeriodoBadge(detalle.periodo.estadoPeriodo)}
          </div>
        </header>

        <section className="px-3 py-3 sm:px-4">
          <div className="mb-2.5 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)]">
              <WalletCards className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-[13px] font-semibold text-[var(--overview-text)]">
                Composición del período
              </h2>
              <p className="text-[11px] text-[var(--overview-muted)]">
                Factura, notas y pagos aplicados.
              </p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            <ResumenItem
              label="Original"
              value={formatMoney(detalle.periodo.importeOriginal)}
              helper="Importe de la factura"
            />
            <ResumenItem
              label="Créditos / pagos"
              value={`− ${formatMoney(detalle.periodo.totalNotasCredito + detalle.periodo.totalPagos)}`}
              helper="Importes descontados"
              variant="success"
            />
            <ResumenItem
              label="Notas débito"
              value={`+ ${formatMoney(detalle.periodo.totalNotasDebito)}`}
              helper="Importes agregados"
              variant="danger"
            />
            <ResumenItem
              label="Saldo período"
              value={formatMoney(saldo)}
              helper="Saldo final"
              variant={saldoPendiente ? "danger" : "default"}
            />
          </div>
        </section>

        <section className="border-t border-[var(--overview-border)]">
          <div className="flex items-center gap-2.5 border-b border-[var(--overview-border)] bg-[var(--overview-header)] px-3 py-3 sm:px-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)]">
              <FileText className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[13px] font-semibold text-[var(--overview-text)]">
                Detalle de movimientos
              </h2>
              <p className="mt-0.5 text-[11px] leading-4 text-[var(--overview-muted)]">
                Factura base, notas asociadas y pagos aplicados a este período.
              </p>
            </div>
          </div>

          <div className="p-2.5 md:hidden">
            <div className="overflow-hidden rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-panel)]">
              {detalle.movimientos.map((movimiento, index) => {
                const impacto = getImpacto(movimiento);

                return (
                  <article
                    key={movimiento.id}
                    className={`grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 border-b border-[var(--overview-border)] px-3 py-3 last:border-b-0 ${index % 2 ? "bg-[var(--overview-bg)]/70" : "bg-[var(--overview-panel)]"}`}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant={getTipoVariant(movimiento.tipoMovimiento) as any}>
                          {getTipoLabel(movimiento.tipoMovimiento)}
                        </Badge>
                        <span className="text-[10px] text-[var(--overview-muted)]">
                          {formatDate(movimiento.fecha)} · N° {movimiento.numeroComprobante}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[12px] font-medium leading-5 text-[var(--overview-text)]">
                        {movimiento.concepto}
                      </p>
                      {movimiento.observacion ? (
                        <p className="mt-0.5 text-[10px] leading-4 text-[var(--overview-muted)]">
                          {movimiento.observacion}
                        </p>
                      ) : null}
                    </div>

                    <div className={`self-center text-right ${impacto.className}`}>
                      <p className="text-[9px] uppercase tracking-[0.08em] text-[var(--overview-muted)]">
                        {impacto.label}
                      </p>
                      <p className="mt-0.5 whitespace-nowrap text-[12px] font-semibold tabular-nums">
                        {impacto.value > 0 ? `${impacto.sign} ${formatMoney(impacto.value)}` : "—"}
                      </p>
                    </div>

                    {movimiento.tipoMovimiento === "pago" ? (
                      <Link
                        href={`/comprobantes/pagos/${movimiento.id}`}
                        className="col-span-2 inline-flex h-8 items-center justify-center gap-1.5 rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-button)] px-3 text-[11px] font-medium text-[var(--overview-text)] transition hover:bg-[var(--overview-soft)]"
                      >
                        <ReceiptText className="h-3.5 w-3.5" />
                        Ver comprobante
                      </Link>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-[110px_minmax(180px,1fr)_120px_120px_150px_24px] items-center gap-3 border-b border-[var(--overview-border)] bg-[var(--overview-bg)] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--overview-muted)] lg:px-4">
              <span>Fecha</span>
              <span>Concepto</span>
              <span>Tipo</span>
              <span>Comprobante</span>
              <span className="text-right">Impacto</span>
              <span />
            </div>

            {detalle.movimientos.map((movimiento, index) => {
              const impacto = getImpacto(movimiento);

              return (
                <details
                  key={movimiento.id}
                  className={`group border-b border-[var(--overview-border)] last:border-b-0 ${index % 2 ? "bg-[var(--overview-bg)]/65" : "bg-[var(--overview-panel)]"} open:bg-[var(--overview-soft)] hover:bg-[var(--overview-soft)]`}
                >
                  <summary className="grid min-h-[48px] cursor-pointer list-none grid-cols-[110px_minmax(180px,1fr)_120px_120px_150px_24px] items-center gap-3 px-3 py-2 [&::-webkit-details-marker]:hidden lg:px-4">
                    <span className="text-[11px] tabular-nums text-[var(--overview-muted)]">
                      {formatDate(movimiento.fecha)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[12px] font-medium text-[var(--overview-text)]">
                        {movimiento.concepto}
                      </span>
                      {movimiento.observacion ? (
                        <span className="mt-0.5 block truncate text-[10px] text-[var(--overview-muted)]">
                          {movimiento.observacion}
                        </span>
                      ) : null}
                    </span>
                    <span>
                      <Badge variant={getTipoVariant(movimiento.tipoMovimiento) as any}>
                        {getTipoLabel(movimiento.tipoMovimiento)}
                      </Badge>
                    </span>
                    <span className="text-[11px] tabular-nums text-[var(--overview-muted)]">
                      N° {movimiento.numeroComprobante}
                    </span>
                    <span className={`text-right text-[12px] font-semibold tabular-nums ${impacto.className}`}>
                      {impacto.value > 0 ? `${impacto.sign} ${formatMoney(impacto.value)}` : "—"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-[var(--overview-muted)] transition-transform group-open:rotate-180" />
                  </summary>

                  <div className="flex items-center justify-between gap-4 border-t border-[var(--overview-border)] bg-[var(--overview-panel)] px-4 py-2.5">
                    <div className={`flex items-center gap-2 text-[11px] ${impacto.className}`}>
                      {impacto.icon}
                      <span>{impacto.label}</span>
                      <span className="font-semibold tabular-nums">
                        {impacto.value > 0 ? `${impacto.sign} ${formatMoney(impacto.value)}` : "Sin importe asociado"}
                      </span>
                    </div>
                    {movimiento.tipoMovimiento === "pago" ? (
                      <Link
                        href={`/comprobantes/pagos/${movimiento.id}`}
                        className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-button)] px-3 text-[11px] font-medium text-[var(--overview-text)] transition hover:bg-[var(--overview-soft)]"
                      >
                        <ReceiptText className="h-3.5 w-3.5" />
                        Ver comprobante
                      </Link>
                    ) : null}
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  ReceiptText,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
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
  }).format(value);
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

function getImpacto(movimiento: MovimientoFinancieroSafe) {
  if (movimiento.debe > 0) {
    return {
      label: "Suma",
      value: movimiento.debe,
      sign: "+",
      className: "text-[var(--app-danger)]",
      icon: <ArrowUpRight className="h-4 w-4" />,
    };
  }

  if (movimiento.haber > 0) {
    return {
      label: "Resta",
      value: movimiento.haber,
      sign: "-",
      className: "text-[var(--app-success)]",
      icon: <ArrowDownLeft className="h-4 w-4" />,
    };
  }

  return {
    label: "Sin impacto",
    value: 0,
    sign: "",
    className: "text-[var(--app-muted)]",
    icon: <FileText className="h-4 w-4" />,
  };
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

  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow={`Factura N° ${detalle.periodo.numeroComprobante}`}
        title={`Detalle ${detalle.periodo.periodoLabel}`}
        description={`${cliente.apellido}, ${cliente.nombre} · DNI ${cliente.dni}`}
        backHref={`/cobrador/clientes/${cliente.id}`}
        backLabel="Volver al cliente"
      >
        <div className="mt-3 flex flex-wrap gap-2">
          {getEstadoPeriodoBadge(detalle.periodo.estadoPeriodo)}
          <Badge variant="info">
            {formatMoney(detalle.periodo.saldoPeriodo)}
          </Badge>
        </div>
      </PageHeader>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-4 shadow-[var(--app-shadow-soft)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-muted)]">
            Original
          </p>

          <p className="mt-2 text-lg font-semibold text-[var(--app-text-strong)]">
            {formatMoney(detalle.periodo.importeOriginal)}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-[var(--app-success-soft)] p-4 text-[var(--app-success)] shadow-[var(--app-shadow-soft)] dark:border-emerald-900/70">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
            Notas crédito / pagos
          </p>

          <p className="mt-2 text-lg font-semibold">
            -{" "}
            {formatMoney(
              detalle.periodo.totalNotasCredito + detalle.periodo.totalPagos,
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-[var(--app-danger-soft)] p-4 text-[var(--app-danger)] shadow-[var(--app-shadow-soft)] dark:border-red-900/70">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
            Notas débito
          </p>

          <p className="mt-2 text-lg font-semibold">
            + {formatMoney(detalle.periodo.totalNotasDebito)}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-primary-soft)] p-4 text-[var(--app-primary)] shadow-[var(--app-shadow-soft)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
            Saldo período
          </p>

          <p className="mt-2 text-lg font-semibold">
            {formatMoney(detalle.periodo.saldoPeriodo)}
          </p>
        </div>
      </div>

      <SectionCard
        title="Movimientos del período"
        description="Detalle de la factura base, notas asociadas y pagos aplicados a este período."
        icon={<FileText className="h-5 w-5" />}
      >
        <div className="space-y-2">
          {detalle.movimientos.map((movimiento) => {
            const impacto = getImpacto(movimiento);

            return (
              <div
                key={movimiento.id}
                className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-sm"
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

                      <span className="text-xs font-semibold text-[var(--app-muted)]">
                        {formatDate(movimiento.fecha)} · Comp. N°{" "}
                        {movimiento.numeroComprobante}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-[var(--app-text-strong)]">
                      {movimiento.concepto}
                    </p>

                    {movimiento.observacion ? (
                      <p className="mt-1 text-xs text-[var(--app-muted)]">
                        {movimiento.observacion}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:min-w-40">
                    <div
                      className={`flex items-center justify-between gap-3 rounded-xl bg-[var(--app-surface-soft)] px-3 py-2 ${impacto.className}`}
                    >
                      <div className="shrink-0">{impacto.icon}</div>

                      <div className="text-right">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
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
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] px-3 text-xs font-semibold text-[var(--app-text)] transition hover:bg-[var(--app-primary-soft)] active:scale-[0.99]"
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
      </SectionCard>
    </PageShell>
  );
}
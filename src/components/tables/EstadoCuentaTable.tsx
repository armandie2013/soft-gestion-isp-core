import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { PeriodoCuentaClienteSafe } from "@/types/movimiento-financiero.types";

type EstadoCuentaTableProps = {
  clienteId: string;
  periodos: PeriodoCuentaClienteSafe[];
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function getPeriodoBadge(periodo: PeriodoCuentaClienteSafe) {
  if (periodo.estadoPeriodo === "cancelado") {
    return {
      label: "Cancelado",
      variant: "success",
    };
  }

  if (periodo.estadoPeriodo === "a_favor") {
    return {
      label: "A favor",
      variant: "info",
    };
  }

  return {
    label: "Pendiente",
    variant: "danger",
  };
}

function getAjustesLabel(periodo: PeriodoCuentaClienteSafe) {
  const ajustes = periodo.totalNotasDebito - periodo.totalNotasCredito - periodo.totalPagos;

  if (ajustes === 0) {
    return "Sin ajustes";
  }

  if (ajustes > 0) {
    return `Ajustes +${formatMoney(ajustes)}`;
  }

  return `Ajustes -${formatMoney(Math.abs(ajustes))}`;
}

export function EstadoCuentaTable({ clienteId, periodos }: EstadoCuentaTableProps) {
  if (periodos.length === 0) {
    return (
      <EmptyState
        title="Este cliente todavía no tiene períodos facturados."
        description="Generá la facturación mensual desde Configuración para iniciar el estado de cuenta."
      />
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] shadow-[var(--app-shadow-soft)] lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[var(--app-border)] bg-[var(--app-surface-soft)] text-xs uppercase tracking-wide text-[var(--app-muted)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Período</th>
                <th className="px-4 py-3 font-semibold">Factura</th>
                <th className="px-4 py-3 font-semibold">Concepto</th>
                <th className="px-4 py-3 text-right font-semibold">Original</th>
                <th className="px-4 py-3 text-right font-semibold">Ajustes</th>
                <th className="px-4 py-3 text-right font-semibold">Saldo</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 text-right font-semibold">Acción</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--app-border)]">
              {periodos.map((periodo) => {
                const badge = getPeriodoBadge(periodo);
                const ajustes =
                  periodo.totalNotasDebito -
                  periodo.totalNotasCredito -
                  periodo.totalPagos;

                return (
                  <tr
                    key={periodo.facturaId}
                    className="transition hover:bg-[var(--app-surface-soft)]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[var(--app-text-strong)]">
                        {periodo.periodoLabel}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-[var(--app-muted)]">
                      N° {periodo.numeroComprobante}
                    </td>

                    <td className="px-4 py-3">
                      <p className="line-clamp-1 font-medium text-[var(--app-text)]">
                        {periodo.concepto}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-right font-medium text-[var(--app-text-strong)]">
                      {formatMoney(periodo.importeOriginal)}
                    </td>

                    <td
                      className={`px-4 py-3 text-right font-medium ${
                        ajustes > 0
                          ? "text-[var(--app-danger)]"
                          : ajustes < 0
                            ? "text-[var(--app-success)]"
                            : "text-[var(--app-muted)]"
                      }`}
                    >
                      {ajustes === 0
                        ? "-"
                        : ajustes > 0
                          ? `+ ${formatMoney(ajustes)}`
                          : `- ${formatMoney(Math.abs(ajustes))}`}
                    </td>

                    <td className="px-4 py-3 text-right font-semibold text-[var(--app-text-strong)]">
                      {formatMoney(periodo.saldoPeriodo)}
                    </td>

                    <td className="px-4 py-3">
                      <Badge variant={badge.variant as any}>{badge.label}</Badge>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/clientes/${clienteId}/estado-cuenta/${periodo.facturaId}`}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-xs font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Ver detalle
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-2 lg:hidden">
        {periodos.map((periodo) => {
          const badge = getPeriodoBadge(periodo);

          return (
            <div
              key={periodo.facturaId}
              className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-[var(--app-shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--app-text-strong)]">
                    {periodo.periodoLabel}
                  </p>

                  <p className="mt-1 text-xs text-[var(--app-muted)]">
                    Factura N° {periodo.numeroComprobante}
                  </p>
                </div>

                <Badge variant={badge.variant as any}>{badge.label}</Badge>
              </div>

              <p className="mt-2 line-clamp-1 text-xs text-[var(--app-muted)]">
                {periodo.concepto}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
                    Original
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
                    {formatMoney(periodo.importeOriginal)}
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
                    Saldo
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
                    {formatMoney(periodo.saldoPeriodo)}
                  </p>
                </div>
              </div>

              <p className="mt-2 text-xs font-medium text-[var(--app-muted)]">
                {getAjustesLabel(periodo)}
              </p>

              <Link
                href={`/clientes/${clienteId}/estado-cuenta/${periodo.facturaId}`}
                className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] px-3 text-xs font-semibold text-[var(--app-text)] transition hover:bg-[var(--app-primary-soft)] active:scale-[0.99]"
              >
                <Eye className="h-3.5 w-3.5" />
                Ver detalle del período
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
import { GenerarCodigoCierreCajaForm } from "@/components/forms/GenerarCodigoCierreCajaForm";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { CobradorCajaResumenSafe } from "@/types/cobro.types";

type AdminCobradoresCajaTableProps = {
  cobradores: CobradorCajaResumenSafe[];
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function AdminCobradoresCajaTable({
  cobradores,
}: AdminCobradoresCajaTableProps) {
  if (cobradores.length === 0) {
    return (
      <EmptyState
        title="No hay cobradores registrados."
        description="Cuando asignes usuarios con rol cobrador, aparecerán en este listado."
      />
    );
  }

  return (
    <div className="grid gap-3">
      {cobradores.map((cobrador) => (
        <div
          key={cobrador.cobradorId}
          className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-4 shadow-[var(--app-shadow-soft)]"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-[var(--app-text-strong)]">
                  {cobrador.apellido}, {cobrador.nombre}
                </h3>

                <Badge variant={cobrador.saldoActual > 0 ? "danger" : "success"}>
                  {cobrador.saldoActual > 0 ? "Con caja" : "Caja en cero"}
                </Badge>
              </div>

              <p className="mt-1 text-sm text-[var(--app-muted)]">
                {cobrador.email}
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                    Saldo actual
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
                    {formatMoney(cobrador.saldoActual)}
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                    Total cobrado
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--app-success)]">
                    {formatMoney(cobrador.totalCobrado)}
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                    Total cerrado
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--app-warning)]">
                    {formatMoney(cobrador.totalCierres)}
                  </p>
                </div>
              </div>

              {cobrador.codigoPendiente ? (
                <div className="mt-3 rounded-xl border border-amber-200 bg-[var(--app-warning-soft)] p-3 text-[var(--app-warning)] dark:border-amber-900/70">
                  <p className="text-xs font-semibold">
                    Código pendiente: {cobrador.codigoPendiente.codigo}
                  </p>
                  <p className="mt-1 text-xs opacity-90">
                    Importe: {formatMoney(cobrador.codigoPendiente.importe)} ·
                    vence {formatDate(cobrador.codigoPendiente.venceEn)}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="w-full lg:w-72">
              <GenerarCodigoCierreCajaForm
                cobradorId={cobrador.cobradorId}
                disabled={cobrador.saldoActual <= 0}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
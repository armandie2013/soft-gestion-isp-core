import { ArrowDownLeft, ArrowUpRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { MovimientoFinancieroSafe } from "@/types/movimiento-financiero.types";

type EstadoCuentaTableProps = {
  movimientos: MovimientoFinancieroSafe[];
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

function getMovimientoImpacto(movimiento: MovimientoFinancieroSafe) {
  if (movimiento.debe > 0) {
    return {
      tipo: "cargo",
      label: "Cargo",
      value: movimiento.debe,
      symbol: "+",
      colorClass: "text-[var(--app-danger)]",
      bgClass: "bg-[var(--app-danger-soft)]",
      icon: <ArrowUpRight className="h-4 w-4" />,
    };
  }

  if (movimiento.haber > 0) {
    return {
      tipo: "credito",
      label: "Crédito",
      value: movimiento.haber,
      symbol: "-",
      colorClass: "text-[var(--app-success)]",
      bgClass: "bg-[var(--app-success-soft)]",
      icon: <ArrowDownLeft className="h-4 w-4" />,
    };
  }

  return {
    tipo: "neutro",
    label: "Sin impacto",
    value: 0,
    symbol: "",
    colorClass: "text-[var(--app-muted)]",
    bgClass: "bg-[var(--app-surface-soft)]",
    icon: <FileText className="h-4 w-4" />,
  };
}

export function EstadoCuentaTable({ movimientos }: EstadoCuentaTableProps) {
  if (movimientos.length === 0) {
    return (
      <EmptyState
        title="Este cliente todavía no tiene movimientos."
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
                <th className="px-4 py-3 font-semibold">Fecha</th>
                <th className="px-4 py-3 font-semibold">Detalle</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Factura</th>
                <th className="px-4 py-3 text-right font-semibold">Movimiento</th>
                <th className="px-4 py-3 text-right font-semibold">Saldo</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--app-border)]">
              {movimientos.map((movimiento) => {
                const impacto = getMovimientoImpacto(movimiento);

                return (
                  <tr
                    key={movimiento.id}
                    className="transition hover:bg-[var(--app-surface-soft)]"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-[var(--app-muted)]">
                      <p className="font-medium text-[var(--app-text)]">
                        {formatDate(movimiento.fecha)}
                      </p>
                      <p className="mt-1 text-xs text-[var(--app-muted)]">
                        Comp. N° {movimiento.numeroComprobante}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-[var(--app-text-strong)]">
                        {movimiento.concepto}
                      </p>

                      {movimiento.observacion ? (
                        <p className="mt-1 text-xs text-[var(--app-muted)]">
                          {movimiento.observacion}
                        </p>
                      ) : null}
                    </td>

                    <td className="px-4 py-3">
                      <Badge
                        variant={getTipoVariant(movimiento.tipoMovimiento) as any}
                      >
                        {getTipoLabel(movimiento.tipoMovimiento)}
                      </Badge>
                    </td>

                    <td className="px-4 py-3 text-[var(--app-muted)]">
                      {movimiento.facturaAsociadaNumeroComprobante
                        ? `N° ${movimiento.facturaAsociadaNumeroComprobante}`
                        : movimiento.tipoMovimiento === "factura"
                          ? `N° ${movimiento.numeroComprobante}`
                          : "-"}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className={`inline-flex items-center justify-end gap-2 rounded-xl px-3 py-2 ${impacto.bgClass}`}>
                        <span className={impacto.colorClass}>
                          {impacto.icon}
                        </span>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
                            {impacto.label}
                          </p>

                          <p className={`font-semibold ${impacto.colorClass}`}>
                            {impacto.value > 0
                              ? `${impacto.symbol} ${formatMoney(impacto.value)}`
                              : "-"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <p className="font-semibold text-[var(--app-text-strong)]">
                        {formatMoney(movimiento.saldo)}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-2 lg:hidden">
        {movimientos.map((movimiento) => {
          const impacto = getMovimientoImpacto(movimiento);

          return (
            <div
              key={movimiento.id}
              className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-[var(--app-shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                    {formatDate(movimiento.fecha)} · Comp. N°{" "}
                    {movimiento.numeroComprobante}
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-[var(--app-text-strong)]">
                    {movimiento.concepto}
                  </p>
                </div>

                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${impacto.bgClass} ${impacto.colorClass}`}>
                  {impacto.icon}
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant={getTipoVariant(movimiento.tipoMovimiento) as any}>
                  {getTipoLabel(movimiento.tipoMovimiento)}
                </Badge>

                {movimiento.facturaAsociadaNumeroComprobante ? (
                  <span className="rounded-lg bg-[var(--app-primary-soft)] px-2 py-1 text-xs font-semibold text-[var(--app-primary)]">
                    Factura N° {movimiento.facturaAsociadaNumeroComprobante}
                  </span>
                ) : movimiento.tipoMovimiento === "factura" ? (
                  <span className="rounded-lg bg-[var(--app-primary-soft)] px-2 py-1 text-xs font-semibold text-[var(--app-primary)]">
                    Factura N° {movimiento.numeroComprobante}
                  </span>
                ) : null}
              </div>

              {movimiento.observacion ? (
                <p className="mt-2 text-xs leading-5 text-[var(--app-muted)]">
                  {movimiento.observacion}
                </p>
              ) : null}

              <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--app-border)] pt-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
                    {impacto.label}
                  </p>

                  <p className={`text-sm font-semibold ${impacto.colorClass}`}>
                    {impacto.value > 0
                      ? `${impacto.symbol} ${formatMoney(impacto.value)}`
                      : "-"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
                    Saldo
                  </p>

                  <p className="text-sm font-semibold text-[var(--app-text-strong)]">
                    {formatMoney(movimiento.saldo)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
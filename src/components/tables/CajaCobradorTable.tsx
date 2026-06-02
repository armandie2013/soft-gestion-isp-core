import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ReceiptText,
  WalletCards,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { CajaCobradorMovimientoSafe } from "@/types/cobro.types";

type CajaCobradorTableProps = {
  movimientos: CajaCobradorMovimientoSafe[];
};

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

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function getTipoInfo(tipo: string) {
  if (tipo === "cobro") {
    return {
      label: "Cobro",
      badge: "success",
      icon: <ArrowUpRight className="h-4 w-4" />,
      amountClass: "text-[var(--app-success)]",
      sign: "+",
    };
  }

  return {
    label: "Cierre de caja",
    badge: "warning",
    icon: <ArrowDownLeft className="h-4 w-4" />,
    amountClass: "text-[var(--app-danger)]",
    sign: "-",
  };
}

function MovimientoAction({ movimiento }: { movimiento: CajaCobradorMovimientoSafe }) {
  if (
    movimiento.tipoMovimiento === "cobro" &&
    movimiento.movimientoFinancieroId
  ) {
    return (
      <Link
        href={`/comprobantes/pagos/${movimiento.movimientoFinancieroId}`}
        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-xs font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
      >
        <ReceiptText className="h-3.5 w-3.5" />
        Comprobante
      </Link>
    );
  }

  if (movimiento.tipoMovimiento === "cierre_caja") {
    return (
      <Link
        href={`/cobrador/comprobantes/cierres/${movimiento.id}`}
        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-xs font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
      >
        <WalletCards className="h-3.5 w-3.5" />
        Comprobante
      </Link>
    );
  }

  return <span className="text-xs text-[var(--app-muted)]">-</span>;
}

export function CajaCobradorTable({ movimientos }: CajaCobradorTableProps) {
  if (movimientos.length === 0) {
    return (
      <EmptyState
        title="Todavía no hay movimientos de caja."
        description="Cuando registres pagos de clientes, aparecerán en este historial."
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
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Descripción</th>
                <th className="px-4 py-3 text-right font-semibold">Importe</th>
                <th className="px-4 py-3 text-right font-semibold">
                  Saldo caja
                </th>
                <th className="px-4 py-3 text-right font-semibold">Acción</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--app-border)]">
              {movimientos.map((movimiento) => {
                const tipoInfo = getTipoInfo(movimiento.tipoMovimiento);

                return (
                  <tr
                    key={movimiento.id}
                    className="transition hover:bg-[var(--app-surface-soft)]"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-[var(--app-muted)]">
                      {formatDate(movimiento.creadoEn)}
                    </td>

                    <td className="px-4 py-3">
                      <Badge variant={tipoInfo.badge as any}>
                        {tipoInfo.label}
                      </Badge>
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-[var(--app-text-strong)]">
                        {movimiento.descripcion}
                      </p>

                      {movimiento.observacion ? (
                        <p className="mt-1 text-xs text-[var(--app-muted)]">
                          {movimiento.observacion}
                        </p>
                      ) : null}
                    </td>

                    <td
                      className={`px-4 py-3 text-right font-semibold ${tipoInfo.amountClass}`}
                    >
                      {tipoInfo.sign} {formatMoney(movimiento.importe)}
                    </td>

                    <td className="px-4 py-3 text-right font-semibold text-[var(--app-text-strong)]">
                      {formatMoney(movimiento.saldoCaja)}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <MovimientoAction movimiento={movimiento} />
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
          const tipoInfo = getTipoInfo(movimiento.tipoMovimiento);

          return (
            <div
              key={movimiento.id}
              className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-[var(--app-shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                    {formatDate(movimiento.creadoEn)}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
                    {movimiento.descripcion}
                  </p>
                </div>

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--app-surface-soft)] ${tipoInfo.amountClass}`}
                >
                  {tipoInfo.icon}
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant={tipoInfo.badge as any}>{tipoInfo.label}</Badge>
              </div>

              {movimiento.observacion ? (
                <p className="mt-2 text-xs leading-5 text-[var(--app-muted)]">
                  {movimiento.observacion}
                </p>
              ) : null}

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
                    Importe
                  </p>

                  <p
                    className={`mt-1 text-sm font-semibold ${tipoInfo.amountClass}`}
                  >
                    {tipoInfo.sign} {formatMoney(movimiento.importe)}
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-2 text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
                    Saldo
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
                    {formatMoney(movimiento.saldoCaja)}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <MovimientoAction movimiento={movimiento} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
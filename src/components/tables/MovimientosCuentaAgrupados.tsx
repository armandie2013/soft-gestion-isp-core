"use client";

import { useMemo, useState } from "react";
import { Eye, FileDown, X } from "lucide-react";
import type { MovimientoFinancieroSafe } from "@/types/movimiento-financiero.types";

type Row = {
  key: string;
  label: string;
  sortDate: number;
  movements: MovimientoFinancieroSafe[];
  debe: number;
  haber: number;
  saldo: number;
  period: boolean;
};

const money = (value: number) => {
  const [integer, decimal] = (Number.isFinite(value) ? value : 0)
    .toFixed(2)
    .split(".");
  return `$ ${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${decimal}`;
};

const date = (value: string) =>
  value
    ? new Intl.DateTimeFormat("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(value))
    : "—";

const movementLabel: Record<string, string> = {
  factura: "Factura",
  nota_debito: "Nota de débito",
  nota_credito: "Nota de crédito",
  pago: "Pago",
  ajuste: "Ajuste",
};

export function MovimientosCuentaAgrupados({
  movimientos,
}: {
  movimientos: MovimientoFinancieroSafe[];
}) {
  const [selected, setSelected] = useState<Row | null>(null);

  const rows = useMemo(() => {
    const grouped = new Map<string, Row>();

    for (const movement of movimientos) {
      const hasPeriod = Boolean(
        movement.referenciaMes && movement.referenciaAnio,
      );

      const key = hasPeriod
        ? `${movement.referenciaAnio}-${String(
            movement.referenciaMes,
          ).padStart(2, "0")}`
        : `movement-${movement.id}`;

      const existing = grouped.get(key);

      if (existing) {
        existing.movements.push(movement);
        existing.debe += movement.debe;
        existing.haber += movement.haber;
        existing.sortDate = Math.min(
          existing.sortDate,
          new Date(movement.fecha).getTime(),
        );
      } else {
        grouped.set(key, {
          key,
          label: hasPeriod
            ? `${String(movement.referenciaMes).padStart(2, "0")}/${
                movement.referenciaAnio
              }`
            : "Otros movimientos",
          sortDate: new Date(movement.fecha).getTime(),
          movements: [movement],
          debe: movement.debe,
          haber: movement.haber,
          saldo: 0,
          period: hasPeriod,
        });
      }
    }

    const result = [...grouped.values()];
    const chronological = [...result].sort(
      (a, b) => a.sortDate - b.sortDate,
    );

    let balance = 0;

    for (const row of chronological) {
      balance += row.debe - row.haber;
      row.saldo = balance;
    }

    for (const row of result) {
      row.movements.sort(
        (a, b) =>
          new Date(a.fecha).getTime() - new Date(b.fecha).getTime() ||
          a.numeroComprobante - b.numeroComprobante,
      );
    }

    return result.sort(
      (a, b) =>
        b.sortDate - a.sortDate || b.key.localeCompare(a.key),
    );
  }, [movimientos]);

  if (!rows.length) {
    return (
      <p className="p-3 text-[11px] text-[var(--overview-muted)]">
        Todavía no hay movimientos contables para este cliente.
      </p>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-[11px]">
          <thead className="border-b border-[var(--overview-border)] bg-[var(--overview-bg)] text-[var(--overview-muted)]">
            <tr>
              <th className="px-3 py-2 font-normal">Período</th>
              <th className="px-3 py-2 font-normal">Movimientos</th>
              <th className="px-3 py-2 text-right font-normal">Debe</th>
              <th className="px-3 py-2 text-right font-normal">Haber</th>
              <th className="px-3 py-2 text-right font-normal">Saldo</th>
              <th className="px-3 py-2 font-normal">Estado</th>
              <th className="px-3 py-2 text-right font-normal">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const receipts = row.movements.filter(
                (movement) =>
                  movement.tipoMovimiento === "pago" &&
                  movement.estadoComprobante !== "anulado",
              );

              const status =
                row.saldo > 0.005
                  ? "Pendiente"
                  : row.saldo < -0.005
                    ? "A favor"
                    : "Al día";

              const statusTone =
                row.saldo > 0.005
                  ? "text-red-700 dark:text-red-300"
                  : row.saldo < -0.005
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-emerald-700 dark:text-emerald-300";

              return (
                <tr
                  key={row.key}
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir detalle de ${row.label}`}
                  onClick={() => setSelected(row)}
                  onKeyDown={(event) => {
                    if (event.target !== event.currentTarget) return;

                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelected(row);
                    }
                  }}
                  className="cursor-pointer border-b border-[var(--overview-border)] transition-colors even:bg-[var(--overview-bg)] hover:bg-[var(--overview-soft)] active:bg-[var(--overview-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 active:bg-[var(--overview-soft)] dark:even:bg-[var(--overview-bg)] dark:hover:bg-[var(--overview-soft)] dark:focus-visible:outline-blue-400 dark:active:bg-[var(--overview-soft)] last:border-b-0"
                >
                  <td className="whitespace-nowrap px-3 py-3 font-medium">
                    {row.label}
                  </td>
                  <td className="px-3 py-3 text-[var(--overview-muted)]">
                    {row.movements.length}{" "}
                    {row.movements.length === 1
                      ? "movimiento"
                      : "movimientos"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums text-amber-700 dark:text-amber-300">
                    {row.debe ? money(row.debe) : "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums text-emerald-700 dark:text-emerald-300">
                    {row.haber ? money(row.haber) : "—"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums">
                    {money(row.saldo)}
                  </td>
                  <td className={`whitespace-nowrap px-3 py-3 ${statusTone}`}>
                    {status}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelected(row);
                        }}
                        aria-label={`Ver detalle de ${row.label}`}
                        title="Ver detalle"
                        className="grid size-8 place-items-center rounded-md border border-[var(--overview-border)] bg-[var(--overview-card)] text-[var(--overview-primary)] hover:bg-[var(--overview-bg)]"
                      >
                        <Eye className="size-4" />
                      </button>

                      {receipts.length === 1 ? (
                        <a
                          href={`/api/comprobantes/pagos/${receipts[0].id}/pdf`}
                          onClick={(event) => event.stopPropagation()}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Descargar recibo"
                          title="Descargar recibo"
                          className="grid size-8 place-items-center rounded-md border border-[var(--overview-border)] bg-[var(--overview-card)] text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
                        >
                          <FileDown className="size-4" />
                        </a>
                      ) : receipts.length > 1 ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelected(row);
                          }}
                          aria-label={`Ver ${receipts.length} recibos`}
                          title="Ver recibos"
                          className="grid size-8 place-items-center rounded-md border border-[var(--overview-border)] bg-[var(--overview-card)] text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
                        >
                          <FileDown className="size-4" />
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-[2px] sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="detalle-movimientos-title"
            className="flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <header className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 p-4 dark:border-slate-700">
              <div>
                <h3
                  id="detalle-movimientos-title"
                  className="text-sm font-semibold"
                >
                  Detalle de {selected.label}
                </h3>
                <p className="mt-1 text-[11px] text-[var(--overview-muted)]">
                  Conceptos, comprobantes y pagos incluidos en el período.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar detalle"
                className="grid size-8 shrink-0 place-items-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="size-4" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-auto p-4">
              <div className="grid grid-cols-1 gap-2 rounded-lg bg-slate-50 p-3 text-[11px] sm:grid-cols-3 dark:bg-slate-800/80">
                <div>
                  <span className="block text-[var(--overview-muted)]">
                    Debe
                  </span>
                  <strong className="mt-1 block text-amber-700 dark:text-amber-300">
                    {money(selected.debe)}
                  </strong>
                </div>
                <div>
                  <span className="block text-[var(--overview-muted)]">
                    Haber
                  </span>
                  <strong className="mt-1 block text-emerald-700 dark:text-emerald-300">
                    {money(selected.haber)}
                  </strong>
                </div>
                <div>
                  <span className="block text-[var(--overview-muted)]">
                    Saldo
                  </span>
                  <strong className="mt-1 block">
                    {money(selected.saldo)}
                  </strong>
                </div>
              </div>

              <ul className="mt-3 divide-y divide-slate-200 dark:divide-slate-700">
                {selected.movements.map((movement) => (
                  <li
                    key={movement.id}
                    className="grid gap-x-4 gap-y-2 py-4 text-[11px] sm:grid-cols-[100px_minmax(0,1fr)]"
                  >
                    <span className="text-[var(--overview-muted)]">
                      {date(movement.fecha)}
                    </span>

                    <div className="grid min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                      <div className="min-w-0">
                        <p className="break-words font-medium">
                          {movement.concepto ||
                            movementLabel[movement.tipoMovimiento] ||
                            movement.tipoMovimiento}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[var(--overview-muted)]">
                          {movementLabel[movement.tipoMovimiento] ||
                            movement.tipoMovimiento}{" "}
                          · Comprobante #{movement.numeroComprobante}
                        </p>
                        {movement.estadoComprobante &&
                        movement.estadoComprobante !== "vigente" ? (
                          <p className="mt-0.5 text-[10px] text-amber-700 dark:text-amber-300">
                            {movement.estadoComprobante === "anulado"
                              ? "Comprobante anulado"
                              : "Comprobante corregido parcialmente"}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
                        {movement.debe ? (
                          <span className="whitespace-nowrap text-amber-700 dark:text-amber-300">
                            Debe {money(movement.debe)}
                          </span>
                        ) : null}
                        {movement.haber ? (
                          <span className="whitespace-nowrap text-emerald-700 dark:text-emerald-300">
                            Haber {money(movement.haber)}
                          </span>
                        ) : null}
                        {movement.tipoMovimiento === "pago" &&
                        movement.estadoComprobante !== "anulado" ? (
                          <a
                            href={`/api/comprobantes/pagos/${movement.id}/pdf`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 whitespace-nowrap text-blue-700 hover:underline dark:text-blue-300"
                          >
                            <FileDown className="size-3.5" />
                            Recibo
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="flex shrink-0 justify-end border-t border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-md border border-slate-300 px-3 py-2 text-[11px] hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
              >
                Cerrar
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
"use client";

import { useState } from "react";
import { CalendarDays, ReceiptText, X } from "lucide-react";
import { cajaStyles as styles } from "@/components/ui/dashboard-styles";
import { EstadoCuentaTable } from "@/components/tables/EstadoCuentaTable";
import type { PeriodoCuentaClienteSafe } from "@/types/movimiento-financiero.types";

type Props = {
  clienteId: string;
  periodos: PeriodoCuentaClienteSafe[];
  currentYear: number;
  currentMonth: number;
};
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const abbreviations = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
];
const tones = {
  paid: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-300",
  debt: "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/35 dark:text-red-300",
  empty:
    "border-[var(--overview-border)] bg-transparent text-[var(--overview-muted)]",
};
function money(value: number) {
  const [integer, decimal] = value.toFixed(2).split(".");
  return `$ ${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${decimal}`;
}
function hasMonth(periodo: PeriodoCuentaClienteSafe) {
  return (
    Number.isInteger(periodo.referenciaMes) &&
    Number(periodo.referenciaMes) >= 1 &&
    Number(periodo.referenciaMes) <= 12 &&
    Number.isInteger(periodo.referenciaAnio) &&
    Number(periodo.referenciaAnio) > 0
  );
}
function summarize(periodos: PeriodoCuentaClienteSafe[]) {
  const debt = periodos.reduce(
    (sum, p) => sum + Math.max(p.saldoPeriodo, 0),
    0,
  );
  const credit = periodos.reduce(
    (sum, p) => sum + Math.max(-p.saldoPeriodo, 0),
    0,
  );
  const state: keyof typeof tones = !periodos.length
    ? "empty"
    : debt > 0
      ? "debt"
      : "paid";
  const label = { empty: "Sin facturar", paid: "Saldado", debt: "Con deuda" }[
    state
  ];
  return { state, label, debt, credit };
}

export function EstadoCuentaCalendario({
  clienteId,
  periodos,
  currentYear,
}: Props) {
  const [year, setYear] = useState(currentYear);
  const [filter, setFilter] = useState<"year" | "month" | "all">("year");
  const [month, setMonth] = useState<number | null>(null);
  const years = Array.from(
    new Set([
      currentYear,
      ...periodos.filter(hasMonth).map((p) => Number(p.referenciaAnio)),
    ]),
  ).sort((a, b) => b - a);
  const annual = periodos.filter(
    (p) => hasMonth(p) && p.referenciaAnio === year,
  );
  const calendar = months.map((name, index) => {
    const invoices = annual.filter((p) => p.referenciaMes === index + 1);
    return { name, month: index + 1, invoices, ...summarize(invoices) };
  });
  const owing = calendar.filter((m) => m.debt > 0).length;
  const missing = periodos.filter((p) => !hasMonth(p)).length;
  const visible =
    filter === "all"
      ? periodos
      : filter === "month"
        ? annual.filter((p) => p.referenciaMes === month)
        : annual;
  const tableLabel =
    filter === "all"
      ? "Todos los períodos"
      : filter === "month" && month
        ? `${months[month - 1]} ${year}`
        : `Períodos de ${year}`;
  function changeYear(value: number) {
    setYear(value);
    setMonth(null);
    setFilter("year");
  }

  return (
    <>
      <section
        className={`${styles.panel} w-full max-w-[420px]`}
        aria-labelledby="annual-calendar-title"
      >
        <div className={`${styles.panelHeader} !gap-2 !py-2`}>
          <h2 id="annual-calendar-title" className={styles.panelTitle}>
            <CalendarDays
              className="!inline-block !size-3.5 text-violet-700 dark:text-violet-300"
              aria-hidden="true"
            />
            Pagos del año
          </h2>
          <select
            aria-label="Año del calendario"
            value={year}
            onChange={(event) => changeYear(Number(event.target.value))}
            className="h-7 rounded-[6px] border border-[var(--overview-border)] bg-[var(--overview-panel)] px-2 text-[11px] text-[var(--overview-text)] focus-visible:outline-2 focus-visible:outline-[var(--overview-blue)]"
          >
            {years.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 gap-[6px] p-3 min-[380px]:grid-cols-6">
          {calendar.map((item) => {
            const selected = filter === "month" && month === item.month;
            const description = `${item.name} ${year}: ${item.label}${item.debt > 0 ? `, pendiente ${money(item.debt)}` : item.credit > 0 ? `, a favor ${money(item.credit)}` : ""}`;
            return (
              <button
                key={item.month}
                type="button"
                aria-pressed={selected}
                aria-label={description}
                title={description}
                onClick={() => {
                  setMonth(item.month);
                  setFilter("month");
                }}
                className={`grid h-11 min-w-0 cursor-pointer place-items-center rounded-[5px] border text-[11px] font-normal transition-colors hover:brightness-95 dark:hover:brightness-110 ${tones[item.state]} ${selected ? "outline-2 outline-offset-2 outline-[var(--overview-text)]" : ""}`}
              >
                {abbreviations[item.month - 1]}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--overview-border)] px-3 py-2 text-[10px]">
          {(
            [
              ["paid", "Pagado"],
              ["debt", "Deuda"],
              ["empty", "Sin facturar"],
            ] as const
          ).map(([state, label]) => (
            <span key={state} className="inline-flex items-center gap-1">
              <span
                aria-hidden="true"
                className={`size-2 rounded-[2px] border ${tones[state]}`}
              />
              {label}
            </span>
          ))}
          <span
            aria-live="polite"
            className="ml-auto text-[var(--overview-muted)]"
          >
            {owing} {owing === 1 ? "mes con deuda" : "meses con deuda"}
          </span>
        </div>
      </section>
      <section className={styles.panel} aria-labelledby="account-periods-title">
        <div className={`${styles.panelHeader} !flex-wrap !gap-2`}>
          <h2 id="account-periods-title" className={styles.panelTitle}>
            <ReceiptText
              className="!inline-block !size-3.5 text-violet-700 dark:text-violet-300"
              aria-hidden="true"
            />
            {tableLabel}
          </h2>
          <span className={styles.count} aria-live="polite">
            {visible.length} períodos
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--overview-border)] px-[14px] py-[9px]">
          {filter === "month" && (
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                setMonth(null);
                setFilter("year");
              }}
            >
              <X aria-hidden="true" />
              Ver todo el año
            </button>
          )}
          {filter !== "all" && (
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                setMonth(null);
                setFilter("all");
              }}
            >
              Ver todo el historial
            </button>
          )}
          {filter === "all" && (
            <button
              type="button"
              className={styles.button}
              onClick={() => setFilter("year")}
            >
              Ver año {year}
            </button>
          )}
          {missing > 0 && (
            <span className="text-[10px] text-[var(--overview-muted)]">
              {missing}{" "}
              {missing === 1
                ? "factura sin mes asignado"
                : "facturas sin mes asignado"}
              : consultá el historial.
            </span>
          )}
        </div>
        {visible.length ? (
          <EstadoCuentaTable clienteId={clienteId} periodos={visible} />
        ) : (
          <div className={styles.empty}>
            <ReceiptText aria-hidden="true" />
            <p>
              {filter === "month"
                ? "No hay facturas registradas para este mes."
                : filter === "year"
                  ? "No hay facturas registradas para este año."
                  : "Este cliente todavía no tiene períodos facturados."}
            </p>
          </div>
        )}
        {visible.length > 0 && (
          <p className={styles.footer}>
            Seleccioná una factura para consultar sus movimientos y
            comprobantes.
          </p>
        )}
      </section>
    </>
  );
}

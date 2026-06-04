// src/components/tables/EstadoCuentaTable.tsx

import Link from "next/link";
import { Eye, FileText, MinusCircle, PlusCircle, ReceiptText } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import type { PeriodoCuentaClienteSafe } from "@/types/movimiento-financiero.types";

type EstadoCuentaTableProps = {
  clienteId: string;
  periodos: PeriodoCuentaClienteSafe[];
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function getPeriodoLabel(periodo: PeriodoCuentaClienteSafe) {
  if (periodo.estadoPeriodo === "cancelado") {
    return "Cancelado";
  }

  if (periodo.estadoPeriodo === "a_favor") {
    return "A favor";
  }

  return "Pendiente";
}

function getPeriodoClass(periodo: PeriodoCuentaClienteSafe) {
  if (periodo.estadoPeriodo === "cancelado") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
  }

  if (periodo.estadoPeriodo === "a_favor") {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
  }

  return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
}

function getAjustes(periodo: PeriodoCuentaClienteSafe) {
  return periodo.totalNotasDebito - periodo.totalNotasCredito - periodo.totalPagos;
}

function getAjustesLabel(periodo: PeriodoCuentaClienteSafe) {
  const ajustes = getAjustes(periodo);

  if (ajustes === 0) {
    return "Sin ajustes";
  }

  if (ajustes > 0) {
    return `Ajustes + ${formatMoney(ajustes)}`;
  }

  return `Ajustes - ${formatMoney(Math.abs(ajustes))}`;
}

function EstadoPill({ periodo }: { periodo: PeriodoCuentaClienteSafe }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${getPeriodoClass(
        periodo,
      )}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {getPeriodoLabel(periodo)}
    </span>
  );
}

export function EstadoCuentaTable({
  clienteId,
  periodos,
}: EstadoCuentaTableProps) {
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
      <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] table-fixed text-left text-xs xl:min-w-0">
            <colgroup>
              <col className="w-[10%]" />
              <col className="w-[11%]" />
              <col className="w-[25%]" />
              <col className="w-[12%]" />
              <col className="w-[12%]" />
              <col className="w-[12%]" />
              <col className="w-[9%]" />
              <col className="w-[9%]" />
            </colgroup>

            <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
              <tr>
                <th className="px-3 py-2.5 font-medium">Período</th>
                <th className="px-3 py-2.5 font-medium">Factura</th>
                <th className="px-3 py-2.5 font-medium">Concepto</th>
                <th className="px-3 py-2.5 text-right font-medium">Original</th>
                <th className="px-3 py-2.5 text-right font-medium">Ajustes</th>
                <th className="px-3 py-2.5 text-right font-medium">Saldo</th>
                <th className="px-3 py-2.5 font-medium">Estado</th>
                <th className="px-3 py-2.5 text-right font-medium">Acción</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {periodos.map((periodo) => {
                const ajustes = getAjustes(periodo);

                return (
                  <tr
                    key={periodo.facturaId}
                    className="transition hover:bg-slate-50/80 dark:hover:bg-slate-950/35"
                  >
                    <td className="px-3 py-3">
                      <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                        {periodo.periodoLabel}
                      </p>
                    </td>

                    <td className="px-3 py-3">
                      <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                        N° {periodo.numeroComprobante}
                      </p>
                    </td>

                    <td className="px-3 py-3">
                      <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                        {periodo.concepto}
                      </p>
                    </td>

                    <td className="px-3 py-3 text-right">
                      <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                        {formatMoney(periodo.importeOriginal)}
                      </p>
                    </td>

                    <td className="px-3 py-3 text-right">
                      <p
                        className={`truncate text-xs font-medium ${
                          ajustes > 0
                            ? "text-red-700 dark:text-red-300"
                            : ajustes < 0
                              ? "text-emerald-700 dark:text-emerald-300"
                              : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {ajustes === 0
                          ? "-"
                          : ajustes > 0
                            ? `+ ${formatMoney(ajustes)}`
                            : `- ${formatMoney(Math.abs(ajustes))}`}
                      </p>
                    </td>

                    <td className="px-3 py-3 text-right">
                      <p
                        className={`truncate text-xs font-medium ${
                          periodo.saldoPeriodo > 0
                            ? "text-red-700 dark:text-red-300"
                            : periodo.saldoPeriodo < 0
                              ? "text-amber-700 dark:text-amber-300"
                              : "text-emerald-700 dark:text-emerald-300"
                        }`}
                      >
                        {formatMoney(periodo.saldoPeriodo)}
                      </p>
                    </td>

                    <td className="px-3 py-3">
                      <EstadoPill periodo={periodo} />
                    </td>

                    <td className="px-3 py-3 text-right">
                      <Link
                        href={`/clientes/${clienteId}/estado-cuenta/${periodo.facturaId}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
                        title="Ver detalle"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span>
            Mostrando {periodos.length}{" "}
            {periodos.length === 1 ? "período" : "períodos"}
          </span>

          <span>Estado de cuenta</span>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {periodos.map((periodo) => {
          const ajustes = getAjustes(periodo);

          return (
            <div
              key={periodo.facturaId}
              className="rounded-[1.35rem] border border-slate-200 bg-white/85 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                    <ReceiptText className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-medium text-slate-950 dark:text-white">
                      {periodo.periodoLabel}
                    </h2>

                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                      Factura N° {periodo.numeroComprobante}
                    </p>
                  </div>
                </div>

                <EstadoPill periodo={periodo} />
              </div>

              <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                {periodo.concepto}
              </p>

              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                    Original
                  </span>

                  <span className="shrink-0 text-right font-medium text-slate-950 dark:text-white">
                    {formatMoney(periodo.importeOriginal)}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
                  <span className="inline-flex items-center gap-1.5">
                    {ajustes > 0 ? (
                      <PlusCircle className="h-3.5 w-3.5 text-red-700 dark:text-red-300" />
                    ) : (
                      <MinusCircle className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-300" />
                    )}
                    Ajustes
                  </span>

                  <span
                    className={`text-right font-medium ${
                      ajustes > 0
                        ? "text-red-700 dark:text-red-300"
                        : ajustes < 0
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {getAjustesLabel(periodo)}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
                  <span className="inline-flex items-center gap-1.5">
                    <ReceiptText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                    Saldo período
                  </span>

                  <span
                    className={`text-right font-medium ${
                      periodo.saldoPeriodo > 0
                        ? "text-red-700 dark:text-red-300"
                        : periodo.saldoPeriodo < 0
                          ? "text-amber-700 dark:text-amber-300"
                          : "text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    {formatMoney(periodo.saldoPeriodo)}
                  </span>
                </div>
              </div>

              <Link
                href={`/clientes/${clienteId}/estado-cuenta/${periodo.facturaId}`}
                className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
              >
                <Eye className="h-3.5 w-3.5" />
                Ver detalle
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
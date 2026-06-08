// src/components/tables/MovimientosCuentaTable.tsx

import {
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  ReceiptText,
  WalletCards,
} from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import type { MovimientoFinancieroSafe } from "@/types/movimiento-financiero.types";

type MovimientosCuentaTableProps = {
  movimientos: MovimientoFinancieroSafe[];
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function tipoLabel(tipo: string) {
  if (tipo === "factura") return "Factura";
  if (tipo === "pago") return "Pago";
  if (tipo === "nota_debito") return "Nota débito";
  if (tipo === "nota_credito") return "Nota crédito";
  return "Ajuste";
}

function tipoClass(tipo: string) {
  if (tipo === "factura" || tipo === "nota_debito") {
    return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
  }

  if (tipo === "pago" || tipo === "nota_credito") {
    return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
  }

  return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
}

function saldoClass(saldo: number) {
  if (saldo > 0) return "text-red-700 dark:text-red-300";
  if (saldo < 0) return "text-amber-700 dark:text-amber-300";
  return "text-emerald-700 dark:text-emerald-300";
}

function TipoPill({ tipo }: { tipo: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${tipoClass(
        tipo,
      )}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {tipoLabel(tipo)}
    </span>
  );
}

function getPeriodoLabel(movimiento: MovimientoFinancieroSafe) {
  if (movimiento.referenciaMes && movimiento.referenciaAnio) {
    return `${movimiento.referenciaMes}/${movimiento.referenciaAnio}`;
  }

  return "-";
}

function getComprobanteLabel(movimiento: MovimientoFinancieroSafe) {
  const comprobante = `N° ${movimiento.numeroComprobante}`;

  if (movimiento.facturaAsociadaNumeroComprobante) {
    return `${comprobante} · Fact. ${movimiento.facturaAsociadaNumeroComprobante}`;
  }

  return comprobante;
}

function MovimientoMobileCard({
  movimiento,
}: {
  movimiento: MovimientoFinancieroSafe;
}) {
  const esDebe = Number(movimiento.debe || 0) > 0;
  const esHaber = Number(movimiento.haber || 0) > 0;

  return (
    <article className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              esDebe
                ? "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                : esHaber
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                  : "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300"
            }`}
          >
            {esDebe ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : esHaber ? (
              <ArrowDownLeft className="h-4 w-4" />
            ) : (
              <ReceiptText className="h-4 w-4" />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
              {tipoLabel(movimiento.tipoMovimiento)}
            </h2>

            <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
              {formatDate(movimiento.fecha)} · {getComprobanteLabel(movimiento)}
            </p>
          </div>
        </div>

        <TipoPill tipo={movimiento.tipoMovimiento} />
      </div>

      <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
        {movimiento.concepto || "Sin concepto"}
      </p>

      <div className="mt-3 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-red-700 dark:text-red-300">
              Debe
            </p>

            <p className="mt-1 truncate font-medium text-red-700 dark:text-red-300">
              {movimiento.debe > 0 ? formatMoney(movimiento.debe) : "-"}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
              Haber
            </p>

            <p className="mt-1 truncate font-medium text-emerald-700 dark:text-emerald-300">
              {movimiento.haber > 0 ? formatMoney(movimiento.haber) : "-"}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              Saldo
            </p>

            <p className={`mt-1 truncate font-medium ${saldoClass(movimiento.saldo)}`}>
              {formatMoney(movimiento.saldo)}
            </p>
          </div>
        </div>

        {movimiento.observacion ? (
          <div className="mt-2 border-t border-slate-300 pt-2 dark:border-slate-800">
            <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">
              {movimiento.observacion}
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function MovimientosCuentaTable({
  movimientos,
}: MovimientosCuentaTableProps) {
  if (movimientos.length === 0) {
    return (
      <EmptyState
        title="Este cliente todavía no tiene movimientos."
        description="Cuando se generen facturas, pagos o notas, aparecerán en el libro banco."
      />
    );
  }

  const movimientosMobile = [...movimientos].reverse();

  return (
    <>
      <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] table-fixed text-left text-xs xl:min-w-0">
            <colgroup>
              <col className="w-[9%]" />
              <col className="w-[11%]" />
              <col className="w-[12%]" />
              <col className="w-[29%]" />
              <col className="w-[11%]" />
              <col className="w-[11%]" />
              <col className="w-[11%]" />
              <col className="w-[6%]" />
            </colgroup>

            <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
              <tr>
                <th className="px-3 py-2.5 font-medium">Fecha</th>
                <th className="px-3 py-2.5 font-medium">Comprobante</th>
                <th className="px-3 py-2.5 font-medium">Movimiento</th>
                <th className="px-3 py-2.5 font-medium">Concepto</th>
                <th className="px-3 py-2.5 text-right font-medium">Debe</th>
                <th className="px-3 py-2.5 text-right font-medium">Haber</th>
                <th className="px-3 py-2.5 text-right font-medium">Saldo</th>
                <th className="px-3 py-2.5 text-right font-medium">Per.</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {movimientos.map((movimiento) => (
                <tr
                  key={movimiento.id}
                  className="transition hover:bg-slate-50/90 dark:hover:bg-cyan-950/10"
                >
                  <td className="px-3 py-3">
                    <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                      {formatDate(movimiento.fecha)}
                    </p>
                  </td>

                  <td className="px-3 py-3">
                    <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                      N° {movimiento.numeroComprobante}
                    </p>

                    {movimiento.facturaAsociadaNumeroComprobante ? (
                      <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                        Fact. {movimiento.facturaAsociadaNumeroComprobante}
                      </p>
                    ) : null}
                  </td>

                  <td className="px-3 py-3">
                    <TipoPill tipo={movimiento.tipoMovimiento} />
                  </td>

                  <td className="px-3 py-3">
                    <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                      {movimiento.concepto || "-"}
                    </p>

                    {movimiento.observacion ? (
                      <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                        {movimiento.observacion}
                      </p>
                    ) : null}
                  </td>

                  <td className="px-3 py-3 text-right">
                    <p className="truncate text-xs font-medium text-red-700 dark:text-red-300">
                      {movimiento.debe > 0 ? formatMoney(movimiento.debe) : "-"}
                    </p>
                  </td>

                  <td className="px-3 py-3 text-right">
                    <p className="truncate text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      {movimiento.haber > 0 ? formatMoney(movimiento.haber) : "-"}
                    </p>
                  </td>

                  <td className="px-3 py-3 text-right">
                    <p
                      className={`truncate text-xs font-semibold ${saldoClass(
                        movimiento.saldo,
                      )}`}
                    >
                      {formatMoney(movimiento.saldo)}
                    </p>
                  </td>

                  <td className="px-3 py-3 text-right">
                    <span className="inline-flex rounded-lg bg-cyan-50 px-2 py-1 text-[10px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                      {getPeriodoLabel(movimiento)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span>
            Mostrando {movimientos.length}{" "}
            {movimientos.length === 1 ? "movimiento" : "movimientos"}
          </span>

          <span>Libro banco</span>
        </div>
      </div>

      <div className="grid gap-2 lg:hidden">
        {movimientosMobile.map((movimiento) => (
          <MovimientoMobileCard key={movimiento.id} movimiento={movimiento} />
        ))}
      </div>
    </>
  );
}
// src/app/(dashboard)/admin/configuracion/facturacion/page.tsx

import Link from "next/link";
import { ArrowLeft, ReceiptText } from "lucide-react";
import { FacturacionManualForm } from "@/components/forms/FacturacionManualForm";

export const metadata = {
  title: "Facturación mensual",
};

function getPeriodoSiguiente(date: Date) {
  const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  return {
    mes: next.getMonth() + 1,
    anio: next.getFullYear(),
  };
}

export default function FacturacionPage() {
  const now = new Date();
  const periodoSiguiente = getPeriodoSiguiente(now);

  return (
    <section className="mx-auto w-full max-w-4xl space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
        <Link
          href="/admin/configuracion"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a configuración
        </Link>

        <div className="mt-5 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
            <ReceiptText className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
              Configuración
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Facturación mensual manual
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Generá la facturación hasta el período indicado. El sistema usa
              corte fijo día 28, genera proporcionales por alta y completa los
              meses pendientes anteriores sin duplicar cargos.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
        <FacturacionManualForm
          defaultMes={periodoSiguiente.mes}
          defaultAnio={periodoSiguiente.anio}
        />
      </div>
    </section>
  );
}

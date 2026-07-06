// // src/app/(dashboard)/admin/configuracion/facturacion/page.tsx

// import Link from "next/link";
// import { ArrowLeft, ReceiptText } from "lucide-react";
// import { FacturacionManualForm } from "@/components/forms/FacturacionManualForm";

// export const metadata = {
//   title: "Facturación mensual",
// };

// function getPeriodoSiguiente(date: Date) {
//   const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);

//   return {
//     mes: next.getMonth() + 1,
//     anio: next.getFullYear(),
//   };
// }

// export default function FacturacionPage() {
//   const now = new Date();
//   const periodoSiguiente = getPeriodoSiguiente(now);

//   return (
//     <section className="mx-auto w-full max-w-4xl space-y-4">
//       <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
//         <Link
//           href="/admin/configuracion"
//           className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Volver a configuración
//         </Link>

//         <div className="mt-5 flex items-start gap-3">
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
//             <ReceiptText className="h-5 w-5" />
//           </div>

//           <div>
//             <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
//               Configuración
//             </p>

//             <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
//               Facturación mensual manual
//             </h1>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
//               Generá la facturación hasta el período indicado. El sistema usa
//               corte fijo día 28, genera proporcionales por alta y completa los
//               meses pendientes anteriores sin duplicar cargos.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
//         <FacturacionManualForm
//           defaultMes={periodoSiguiente.mes}
//           defaultAnio={periodoSiguiente.anio}
//         />
//       </div>
//     </section>
//   );
// }


// src/app/(dashboard)/admin/configuracion/facturacion/page.tsx

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarClock,
  FileText,
  ReceiptText,
  Settings,
  ShieldAlert,
} from "lucide-react";
import { FacturacionManualForm } from "@/components/forms/FacturacionManualForm";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Facturación mensual",
};

const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

const innerPanelClass =
  "overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none";

const sectionTitleClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

const sectionSubtitleClass =
  "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

const sectionDescriptionClass =
  "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

function getPeriodoSiguiente(date: Date) {
  const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  return {
    mes: next.getMonth() + 1,
    anio: next.getFullYear(),
  };
}

function ResumenItem({
  icon,
  label,
  value,
  tone = "neutral",
}: {
  icon?: ReactNode;
  label: string;
  value: string | number;
  tone?: "neutral" | "primary" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    neutral: "text-slate-950 dark:text-white",
    primary: "text-blue-700 dark:text-blue-300",
    success: "text-emerald-700 dark:text-emerald-300",
    warning: "text-amber-700 dark:text-amber-300",
    danger: "text-red-700 dark:text-red-300",
  }[tone];

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700">
      <span className="inline-flex min-w-0 items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
        {icon ? (
          <span className="shrink-0 text-blue-700 dark:text-blue-300">
            {icon}
          </span>
        ) : null}

        <span className="truncate">{label}</span>
      </span>

      <span className={`truncate text-right text-xs font-semibold ${toneClass}`}>
        {value}
      </span>
    </div>
  );
}

function HeaderFacturacion() {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
            <ReceiptText className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className={sectionTitleClass}>Configuración</p>

            <h1 className={sectionSubtitleClass}>Facturación mensual manual</h1>

            <p className={`${sectionDescriptionClass} max-w-3xl`}>
              Generá la facturación hasta el período indicado. El sistema usa
              corte fijo día 28, genera proporcionales por alta y completa los
              meses pendientes anteriores sin duplicar cargos.
            </p>
          </div>
        </div>

        <Link
          href="/admin/configuracion"
          className="hidden h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900 sm:inline-flex"
        >
          Volver
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        </Link>
      </div>
    </section>
  );
}

function FormPanel({
  defaultMes,
  defaultAnio,
}: {
  defaultMes: number;
  defaultAnio: number;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start gap-3 border-b border-slate-200 pb-3 dark:border-slate-700">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <FileText className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className={sectionTitleClass}>Proceso manual</p>

          <h2 className={sectionSubtitleClass}>Generar facturación</h2>

          <p className={sectionDescriptionClass}>
            Seleccioná el período de referencia y ejecutá la generación manual.
          </p>
        </div>
      </div>

      <FacturacionManualForm defaultMes={defaultMes} defaultAnio={defaultAnio} />
    </section>
  );
}

function ResumenAside({
  defaultMes,
  defaultAnio,
}: {
  defaultMes: number;
  defaultAnio: number;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Resumen</p>

          <h2 className={sectionSubtitleClass}>Período sugerido</h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <CalendarClock className="h-4 w-4" />
        </div>
      </div>

      <div className={innerPanelClass}>
        <ResumenItem
          icon={<ReceiptText className="h-3.5 w-3.5" />}
          label="Tipo"
          value="Manual"
          tone="primary"
        />

        <ResumenItem
          icon={<CalendarClock className="h-3.5 w-3.5" />}
          label="Mes"
          value={defaultMes}
          tone="primary"
        />

        <ResumenItem
          icon={<CalendarClock className="h-3.5 w-3.5" />}
          label="Año"
          value={defaultAnio}
        />

        <ResumenItem
          icon={<Settings className="h-3.5 w-3.5" />}
          label="Corte"
          value="Día 28"
          tone="warning"
        />
      </div>
    </section>
  );
}

function NotaAside() {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Importante</p>

        <h2 className={sectionSubtitleClass}>Uso operativo</h2>
      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
        Generá la facturación mensual una sola vez por período. El sistema omite
        clientes que ya tengan factura para el mes y año elegido.
      </div>
    </section>
  );
}

function SeguridadAside() {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Seguridad</p>

          <h2 className={sectionSubtitleClass}>Acción administrativa</h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300">
          <ShieldAlert className="h-4 w-4" />
        </div>
      </div>

      <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2.5 text-[12px] leading-5 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300">
        Esta acción impacta sobre clientes activos y genera movimientos
        financieros. Revisá el período antes de confirmar.
      </div>
    </section>
  );
}

export default function FacturacionPage() {
  const now = new Date();
  const periodoSiguiente = getPeriodoSiguiente(now);

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <HeaderFacturacion />

          <div className="mt-3">
            <FormPanel
              defaultMes={periodoSiguiente.mes}
              defaultAnio={periodoSiguiente.anio}
            />
          </div>
        </DashboardMain>

        <DashboardAside>
          <ResumenAside
            defaultMes={periodoSiguiente.mes}
            defaultAnio={periodoSiguiente.anio}
          />

          <div className="mt-3">
            <NotaAside />
          </div>

          <div className="mt-3">
            <SeguridadAside />
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
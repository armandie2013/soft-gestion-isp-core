// import { WalletCards } from "lucide-react";
// import { AdminCierresCajaTable } from "@/components/tables/AdminCierresCajaTable";
// import { PageHeader } from "@/components/ui/PageHeader";
// import { PageShell } from "@/components/ui/PageShell";
// import { SectionCard } from "@/components/ui/SectionCard";
// import { obtenerHistorialCierresCajaAdmin } from "@/services/admin-caja.service";

// export const metadata = {
//   title: "Historial de cierres",
// };

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value);
// }

// function ResumenCard({
//   title,
//   value,
//   description,
// }: {
//   title: string;
//   value: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-primary-soft)] p-4 text-[var(--app-primary)] shadow-sm">
//       <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
//         {title}
//       </p>

//       <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>

//       <p className="mt-1 text-sm leading-6 opacity-85">{description}</p>
//     </div>
//   );
// }

// export default async function AdminCierresCajaPage() {
//   const resumen = await obtenerHistorialCierresCajaAdmin();

//   return (
//     <PageShell maxWidth="lg">
//       <PageHeader
//         eyebrow="Administración"
//         title="Historial de cierres"
//         description="Consultá los cierres de caja confirmados por los cobradores."
//         backHref="/admin/caja-cobradores"
//         backLabel="Volver a caja cobradores"
//       />

//       <div className="grid gap-3 md:grid-cols-2">
//         <ResumenCard
//           title="Total recibido"
//           value={formatMoney(resumen.totalCierres)}
//           description="Suma acumulada de cierres confirmados."
//         />

//         <ResumenCard
//           title="Cierres realizados"
//           value={String(resumen.cantidadCierres)}
//           description="Cantidad total de cierres registrados."
//         />
//       </div>

//       <SectionCard
//         title="Cierres registrados"
//         description="Cada cierre corresponde a una caja de cobrador autorizada mediante código de 6 dígitos."
//         icon={<WalletCards className="h-5 w-5" />}
//       >
//         <AdminCierresCajaTable cierres={resumen.cierres} />
//       </SectionCard>
//     </PageShell>
//   );
// }

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { AdminCierresCajaTable } from "@/components/tables/AdminCierresCajaTable";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import { obtenerHistorialCierresCajaAdmin } from "@/services/admin-caja.service";

export const metadata = {
  title: "Historial de cierres",
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

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
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

function HeaderCierresCaja() {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Caja cobradores</p>

          <h1 className={sectionSubtitleClass}>Historial de cierres</h1>

          <p className={`${sectionDescriptionClass} max-w-3xl`}>
            Consultá los cierres de caja confirmados por los cobradores mediante
            código de autorización.
          </p>
        </div>

        <Link
          href="/admin/caja-cobradores"
          className="hidden h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900 sm:inline-flex"
        >
          Volver
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        </Link>
      </div>
    </section>
  );
}

function ResumenAside({
  totalCierres,
  cantidadCierres,
}: {
  totalCierres: number;
  cantidadCierres: number;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Resumen</p>

          <h2 className={sectionSubtitleClass}>Cierres registrados</h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <WalletCards className="h-4 w-4" />
        </div>
      </div>

      <div className={innerPanelClass}>
        <ResumenItem
          icon={<WalletCards className="h-3.5 w-3.5" />}
          label="Total recibido"
          value={formatMoney(totalCierres)}
          tone="primary"
        />

        <ResumenItem
          icon={<CheckCircle2 className="h-3.5 w-3.5" />}
          label="Cierres realizados"
          value={cantidadCierres}
          tone={cantidadCierres > 0 ? "success" : "neutral"}
        />

        <ResumenItem
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
          label="Autorización"
          value="Código 6 dígitos"
          tone="primary"
        />
      </div>
    </section>
  );
}

function NotaAside() {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Nota</p>

        <h2 className={sectionSubtitleClass}>Control de cierres</h2>
      </div>

      <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[12px] leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
        Cada cierre corresponde a una caja de cobrador autorizada mediante un
        código de 6 dígitos generado desde administración. El historial permite
        verificar fecha, cobrador, importe y código utilizado.
      </div>
    </section>
  );
}

function EstadoAside() {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Estado</p>

        <h2 className={sectionSubtitleClass}>Seguimiento administrativo</h2>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-[12px] leading-5 text-blue-800 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-blue-300">
        Usá esta vista para auditar cierres confirmados y revisar el detalle
        cuando sea necesario.
      </div>
    </section>
  );
}

export default async function AdminCierresCajaPage() {
  const resumen = await obtenerHistorialCierresCajaAdmin();

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <HeaderCierresCaja />

          <section className={`${panelClass} mt-3 p-3.5`}>
            <div className="mb-3 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
                <Clock3 className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className={sectionTitleClass}>Cierres registrados</p>

                <h2 className={sectionSubtitleClass}>Historial confirmado</h2>

                <p className={sectionDescriptionClass}>
                  Listado de cierres de caja realizados por los cobradores.
                </p>
              </div>
            </div>

            <AdminCierresCajaTable cierres={resumen.cierres} />
          </section>
        </DashboardMain>

        <DashboardAside>
          <ResumenAside
            totalCierres={resumen.totalCierres}
            cantidadCierres={resumen.cantidadCierres}
          />

          <div className="mt-3">
            <NotaAside />
          </div>

          <div className="mt-3">
            <EstadoAside />
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
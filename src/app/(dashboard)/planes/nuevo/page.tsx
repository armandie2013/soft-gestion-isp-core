// // src/app/(dashboard)/planes/nuevo/page.tsx

// import {
//   CheckCircle2,
//   FileText,
//   RadioTower,
//   Settings,
//   Wifi,
// } from "lucide-react";
// import { CrearPlanForm } from "@/components/forms/CrearPlanForm";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Nuevo plan",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof Wifi;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// const toneClasses = {
//   cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
//   emerald:
//     "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
//   amber:
//     "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
//   red: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
//   violet:
//     "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
// };

// function StatCard({
//   title,
//   shortTitle,
//   value,
//   description,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <div className="flex h-full min-h-[78px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:min-h-[122px] sm:rounded-[1.35rem] sm:p-3.5">
//       <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
//         <div
//           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl ${toneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 sm:text-[10px] sm:tracking-[0.15em]">
//             <span className="sm:hidden">{shortTitle || title}</span>
//             <span className="hidden sm:inline">{title}</span>
//           </p>

//           <p className="mt-0.5 truncate text-[15px] font-medium leading-none tracking-tight text-slate-950 dark:text-white sm:mt-1 sm:text-xl">
//             {value}
//           </p>

//           <p className="mt-1 hidden text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function NuevoPlanPage() {
//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Plan"
//           value="Nuevo"
//           description="Alta de plan comercial."
//           icon={Wifi}
//           tone="cyan"
//         />

//         <StatCard
//           title="Importe"
//           value="Entero"
//           description="Sin decimales en base de datos."
//           icon={FileText}
//           tone="amber"
//         />

//         <StatCard
//           title="Estado"
//           value="Activo"
//           description="Disponible para nuevos clientes."
//           icon={CheckCircle2}
//           tone="emerald"
//         />

//         <StatCard
//           title="Tipo"
//           value="Servicio"
//           description="Categoría comercial del plan."
//           icon={RadioTower}
//           tone="violet"
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Formato"
//             value="$ 0,00"
//             description="Visualización argentina."
//             icon={Settings}
//             tone="cyan"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div>
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Planes
//               </p>

//               <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                 Nuevo plan
//               </h1>

//               <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                 Cargá el nombre, tipo, detalle, importe mensual y estado del
//                 plan comercial. El importe se guarda como entero.
//               </p>
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
//             <div className="mb-3 flex items-start gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                 <Wifi className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Alta de plan
//                 </p>

//                 <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                   Datos del nuevo plan
//                 </h2>

//                 <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   El importe no acepta decimales. Se mostrará como moneda, pero
//                   se enviará al backend como entero.
//                 </p>
//               </div>
//             </div>

//             <CrearPlanForm />
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Reglas del alta
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Validaciones del plan
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Nombre
//                 </span>

//                 <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                   Único
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Importe
//                 </span>

//                 <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                   Entero
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Decimales
//                 </span>

//                 <span className="text-xs font-medium text-red-700 dark:text-red-300">
//                   No permitidos
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Estado inicial
//                 </span>

//                 <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
//                   Activo
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-amber-200 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 xl:block">
//             <p className="font-medium">Importante</p>

//             <p className="mt-1">
//               El campo importe se ve como moneda argentina, pero el formulario
//               envía solo números enteros para respetar el tipo Int32 en MongoDB.
//             </p>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/planes/nuevo/page.tsx

// import Link from "next/link";
// import {
//   ArrowLeft,
//   CheckCircle2,
//   FileText,
//   RadioTower,
//   Settings,
//   Wifi,
// } from "lucide-react";
// import { CrearPlanForm } from "@/components/forms/CrearPlanForm";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Nuevo plan",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof Wifi;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// const cardBase =
//   "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// const innerCardBase =
//   "overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none";

// const toneClasses = {
//   cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
//   emerald:
//     "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950",
//   amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
//   red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
//   violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
// };

// function StatCard({
//   title,
//   value,
//   description,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <div className="flex h-full min-h-[108px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
//       <div className="flex items-start gap-3">
//         <div
//           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ${toneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//             {title}
//           </p>

//           <p className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             {value}
//           </p>

//           <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function NuevoPlanPage() {
//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="space-y-3 lg:hidden">
//         <section className={`${cardBase} p-3`}>
//           <div className="flex items-start gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//               <Wifi className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                 Planes
//               </p>

//               <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//                 Nuevo plan
//               </h1>

//               <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                 Cargá los datos del plan comercial.
//               </p>
//             </div>
//           </div>
//         </section>

//         <CrearPlanForm />
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4">
//           <StatCard
//             title="Plan"
//             value="Nuevo"
//             description="Alta de plan comercial."
//             icon={Wifi}
//             tone="cyan"
//           />

//           <StatCard
//             title="Importe"
//             value="Mensual"
//             description="Valor del servicio."
//             icon={FileText}
//             tone="amber"
//           />

//           <StatCard
//             title="Estado"
//             value="Activo"
//             description="Disponible para clientes."
//             icon={CheckCircle2}
//             tone="emerald"
//           />

//           <StatCard
//             title="Tipo"
//             value="Servicio"
//             description="Categoría comercial."
//             icon={RadioTower}
//             tone="violet"
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//                   <div className="flex min-w-0 items-start gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                       <Wifi className="h-4 w-4" />
//                     </div>

//                     <div className="min-w-0">
//                       <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                         Planes
//                       </p>

//                       <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                         Nuevo plan
//                       </h1>

//                       <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                         Cargá el nombre, tipo, detalle, importe mensual y
//                         estado del plan.
//                       </p>
//                     </div>
//                   </div>

//                   <Link
//                     href="/planes"
//                     className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:bg-slate-800"
//                   >
//                     <ArrowLeft className="h-3.5 w-3.5" />
//                     Volver al listado
//                   </Link>
//                 </div>
//               </div>

//               <div className={`${cardBase} mt-3 p-3.5`}>
//                 <div className="mb-3 flex items-start gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <Wifi className="h-4 w-4" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Alta de plan
//                     </p>

//                     <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                       Datos del plan
//                     </h2>
//                   </div>
//                 </div>

//                 <CrearPlanForm />
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Campos
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Datos necesarios
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <Settings className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className={innerCardBase}>
//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Nombre
//                     </span>

//                     <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                       Comercial
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <RadioTower className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Tipo
//                     </span>

//                     <span className="text-xs font-medium text-violet-700 dark:text-violet-300">
//                       Categoría
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <FileText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Importe
//                     </span>

//                     <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                       Mensual
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <CheckCircle2 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Estado
//                     </span>

//                     <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
//                       Activo
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/planes/nuevo/page.tsx

import Link from "next/link";
import type { ReactNode } from "react";
import {
  CheckCircle2,
  FileText,
  RadioTower,
  Settings,
  Wifi,
} from "lucide-react";
import { CrearPlanForm } from "@/components/forms/CrearPlanForm";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Nuevo plan",
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

const buttonSecondaryClass =
  "hidden h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900 sm:inline-flex";

function BackButton() {
  return (
    <Link href="/planes" className={buttonSecondaryClass}>
      Volver
    </Link>
  );
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

function HeaderNuevoPlan() {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Planes</p>

          <h1 className={sectionSubtitleClass}>Nuevo plan</h1>

          <p className={`${sectionDescriptionClass} max-w-3xl`}>
            Cargá el nombre, tipo, detalle, importe mensual y estado del plan
            comercial.
          </p>
        </div>

        <div className="flex shrink-0 items-start justify-end">
          <BackButton />
        </div>
      </div>
    </section>
  );
}

function FormPanel() {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <Wifi className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className={sectionTitleClass}>Alta de plan</p>

          <h2 className={sectionSubtitleClass}>Datos del plan</h2>

          <p className={sectionDescriptionClass}>
            Estos datos luego estarán disponibles para asignar el servicio a los
            clientes.
          </p>
        </div>
      </div>

      <CrearPlanForm />
    </section>
  );
}

function CamposAside() {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Campos</p>

          <h2 className={sectionSubtitleClass}>Datos necesarios</h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <Settings className="h-4 w-4" />
        </div>
      </div>

      <div className={innerPanelClass}>
        <ResumenItem
          icon={<Wifi className="h-3.5 w-3.5" />}
          label="Nombre"
          value="Comercial"
          tone="primary"
        />

        <ResumenItem
          icon={<RadioTower className="h-3.5 w-3.5" />}
          label="Tipo"
          value="Categoría"
          tone="primary"
        />

        <ResumenItem
          icon={<FileText className="h-3.5 w-3.5" />}
          label="Importe"
          value="Mensual"
          tone="warning"
        />

        <ResumenItem
          icon={<CheckCircle2 className="h-3.5 w-3.5" />}
          label="Estado"
          value="Activo / Inactivo"
          tone="success"
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

        <h2 className={sectionSubtitleClass}>Uso del plan</h2>
      </div>

      <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[12px] leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
        Una vez creado, el plan podrá seleccionarse al dar de alta o editar un
        cliente. Los planes inactivos se conservan para referencia, pero no
        deberían usarse en nuevas asignaciones.
      </div>
    </section>
  );
}

export default function NuevoPlanPage() {
  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <HeaderNuevoPlan />

          <div className="mt-3">
            <FormPanel />
          </div>
        </DashboardMain>

        <DashboardAside>
          <CamposAside />

          <div className="mt-3">
            <NotaAside />
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
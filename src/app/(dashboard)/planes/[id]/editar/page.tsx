// // src/app/(dashboard)/planes/[id]/editar/page.tsx

// import { notFound } from "next/navigation";
// import {
//   CheckCircle2,
//   Clock3,
//   FileText,
//   RadioTower,
//   Settings,
//   Wifi,
//   WifiOff,
// } from "lucide-react";
// import { EditarPlanForm } from "@/components/forms/EditarPlanForm";
// import { obtenerPlanPorId } from "@/services/plan.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// type EditarPlanPageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Editar plan",
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

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatCompactMoney(value: number) {
//   const amount = Number(value || 0);
//   const abs = Math.abs(amount);

//   if (abs >= 1_000_000) {
//     return `$ ${(abs / 1_000_000).toLocaleString("es-AR", {
//       maximumFractionDigits: 1,
//     })} M`;
//   }

//   const integerPart = Math.round(abs)
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${integerPart}`;
// }

// function formatDate(value?: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Sin fecha";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

// function tipoLabel(tipo: string) {
//   if (tipo === "residencial") return "Residencial";
//   if (tipo === "comercial") return "Comercial";
//   if (tipo === "corporativo") return "Corporativo";
//   if (tipo === "dedicado") return "Dedicado";
//   return "Otro";
// }

// function estadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   return "Inactivo";
// }

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

// export default async function EditarPlanPage({ params }: EditarPlanPageProps) {
//   const plan = await obtenerPlanPorId(params.id);

//   if (!plan) {
//     notFound();
//   }

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Plan"
//           value={plan.nombre}
//           description="Nombre comercial del plan."
//           icon={Wifi}
//           tone="cyan"
//         />

//         <StatCard
//           title="Tipo"
//           value={tipoLabel(plan.tipo)}
//           description="Categoría del plan."
//           icon={RadioTower}
//           tone="violet"
//         />

//         <StatCard
//           title="Importe"
//           shortTitle="Importe"
//           value={formatCompactMoney(plan.importe)}
//           description="Valor mensual del servicio."
//           icon={FileText}
//           tone="amber"
//         />

//         <StatCard
//           title="Estado"
//           value={estadoLabel(plan.estado)}
//           description="Disponibilidad para clientes."
//           icon={plan.estado === "activo" ? CheckCircle2 : WifiOff}
//           tone={plan.estado === "activo" ? "emerald" : "red"}
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Creado"
//             value={formatDate(plan.creadoEn)}
//             description="Fecha de alta del plan."
//             icon={Clock3}
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
//                 Editar plan
//               </h1>

//               <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                 Modificá el nombre, tipo, detalle, importe mensual y estado del
//                 plan comercial.
//               </p>
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
//             <div className="mb-3 flex items-start gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                 <Settings className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Datos del plan
//                 </p>

//                 <h2 className="mt-0.5 truncate text-sm font-medium text-slate-950 dark:text-white">
//                   {plan.nombre}
//                 </h2>

//                 <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   Si el plan queda inactivo, no aparecerá como opción para nuevos
//                   clientes, pero los clientes ya asignados pueden conservarlo.
//                 </p>
//               </div>
//             </div>

//             <EditarPlanForm plan={plan} />
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Resumen
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Información del plan
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Nombre
//                 </span>

//                 <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//                   {plan.nombre}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <RadioTower className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Tipo
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   {tipoLabel(plan.tipo)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <FileText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Importe
//                 </span>

//                 <span className="text-right text-[11px] font-medium text-cyan-700 dark:text-cyan-300">
//                   {formatMoney(plan.importe)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   {plan.estado === "activo" ? (
//                     <CheckCircle2 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   ) : (
//                     <WifiOff className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   )}
//                   Estado
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                     plan.estado === "activo"
//                       ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                       : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                   }`}
//                 >
//                   {estadoLabel(plan.estado)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <Clock3 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Creado
//                 </span>

//                 <span className="text-right text-[11px] text-slate-500 dark:text-slate-400">
//                   {formatDate(plan.creadoEn)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <Clock3 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Actualizado
//                 </span>

//                 <span className="text-right text-[11px] text-slate-500 dark:text-slate-400">
//                   {formatDate(plan.actualizadoEn)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-amber-200 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 xl:block">
//             <p className="font-medium">Importante</p>

//             <p className="mt-1">
//               Antes de cambiar el importe, verificá si corresponde actualizar
//               manualmente facturas ya emitidas o si el nuevo valor aplicará solo
//               para próximas facturaciones.
//             </p>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/planes/[id]/editar/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileText,
  RadioTower,
  Settings,
  Wifi,
  WifiOff,
} from "lucide-react";
import { EditarPlanForm } from "@/components/forms/EditarPlanForm";
import { obtenerPlanPorId } from "@/services/plan.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

type EditarPlanPageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Editar plan",
};

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: typeof Wifi;
  tone: "cyan" | "emerald" | "amber" | "red" | "violet";
};

const cardBase =
  "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

const innerCardBase =
  "overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none";

const toneClasses = {
  cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
  emerald:
    "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950",
  amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
  red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
  violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatCompactMoney(value: number) {
  const amount = Number(value || 0);
  const abs = Math.abs(amount);

  if (abs >= 1_000_000) {
    return `$ ${(abs / 1_000_000).toLocaleString("es-AR", {
      maximumFractionDigits: 1,
    })} M`;
  }

  const integerPart = Math.round(abs)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${integerPart}`;
}

function formatDate(value?: string | null) {
  if (!value) return "Sin fecha";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function tipoLabel(tipo: string) {
  if (tipo === "residencial") return "Residencial";
  if (tipo === "comercial") return "Comercial";
  if (tipo === "corporativo") return "Corporativo";
  if (tipo === "dedicado") return "Dedicado";
  return "Otro";
}

function estadoLabel(estado: string) {
  if (estado === "activo") return "Activo";
  return "Inactivo";
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <div className="flex h-full min-h-[108px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ${toneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p
            className={`mt-1 truncate text-xl font-semibold tracking-tight ${
              tone === "red"
                ? "text-red-700 dark:text-red-300"
                : "text-slate-950 dark:text-white"
            }`}
            title={value}
          >
            {value}
          </p>

          <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function EditarPlanPage({ params }: EditarPlanPageProps) {
  const plan = await obtenerPlanPorId(params.id);

  if (!plan) {
    notFound();
  }

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <div className="space-y-3 lg:hidden">
        <section className={`${cardBase} p-3`}>
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
              <Wifi className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                Editar plan
              </p>

              <h1 className="mt-0.5 truncate text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {plan.nombre}
              </h1>

              <div className="mt-2 flex flex-wrap gap-2">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                    plan.estado === "activo"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
                      : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
                  }`}
                >
                  {estadoLabel(plan.estado)}
                </span>

                <span className="inline-flex rounded-full border border-cyan-300 bg-cyan-50 px-2.5 py-1 text-[10px] font-medium text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-300">
                  {tipoLabel(plan.tipo)}
                </span>
              </div>
            </div>
          </div>
        </section>

        <EditarPlanForm plan={plan} />
      </div>

      <div className="hidden lg:block">
        <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Plan"
            value={plan.nombre}
            description="Nombre comercial."
            icon={Wifi}
            tone="cyan"
          />

          <StatCard
            title="Tipo"
            value={tipoLabel(plan.tipo)}
            description="Categoría comercial."
            icon={RadioTower}
            tone="violet"
          />

          <StatCard
            title="Importe"
            value={formatCompactMoney(plan.importe)}
            description="Valor mensual."
            icon={FileText}
            tone="amber"
          />

          <StatCard
            title="Estado"
            value={estadoLabel(plan.estado)}
            description="Disponibilidad."
            icon={plan.estado === "activo" ? CheckCircle2 : WifiOff}
            tone={plan.estado === "activo" ? "emerald" : "red"}
          />

          <StatCard
            title="Creado"
            value={formatDate(plan.creadoEn)}
            description="Fecha de alta."
            icon={Clock3}
            tone="cyan"
          />
        </div>

        <div className="mt-5">
          <DashboardGrid>
            <DashboardMain>
              <div className={`${cardBase} p-3.5`}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
                      <Wifi className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                        Planes
                      </p>

                      <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
                        Editar plan
                      </h1>

                      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
                        Modificá los datos comerciales del plan seleccionado.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/planes"
                    className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:bg-slate-800"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Volver al listado
                  </Link>
                </div>
              </div>

              <div className={`${cardBase} mt-3 p-3.5`}>
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
                    <Settings className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                      Datos del plan
                    </p>

                    <h2 className="mt-0.5 truncate text-sm font-medium text-slate-950 dark:text-white">
                      {plan.nombre}
                    </h2>
                  </div>
                </div>

                <EditarPlanForm plan={plan} />
              </div>
            </DashboardMain>

            <DashboardAside>
              <div className={`${cardBase} p-3.5`}>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                      Resumen
                    </p>

                    <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                      Información del plan
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
                    <Wifi className="h-4 w-4" />
                  </div>
                </div>

                <div className={innerCardBase}>
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                    <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                      Nombre
                    </span>

                    <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
                      {plan.nombre}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                    <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <RadioTower className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                      Tipo
                    </span>

                    <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                      {tipoLabel(plan.tipo)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                    <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <FileText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                      Importe
                    </span>

                    <span className="text-right text-[11px] font-medium text-cyan-700 dark:text-cyan-300">
                      {formatMoney(plan.importe)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                    <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      {plan.estado === "activo" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                      ) : (
                        <WifiOff className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                      )}
                      Estado
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        plan.estado === "activo"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                      }`}
                    >
                      {estadoLabel(plan.estado)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                    <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Clock3 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                      Creado
                    </span>

                    <span className="text-right text-[11px] text-slate-500 dark:text-slate-400">
                      {formatDate(plan.creadoEn)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Clock3 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                      Actualizado
                    </span>

                    <span className="text-right text-[11px] text-slate-500 dark:text-slate-400">
                      {formatDate(plan.actualizadoEn)}
                    </span>
                  </div>
                </div>
              </div>
            </DashboardAside>
          </DashboardGrid>
        </div>
      </div>
    </PageShell>
  );
}
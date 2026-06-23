// // src/app/(dashboard)/admin/configuracion/facturacion/page.tsx

// import Link from "next/link";
// import {
//   ArrowLeft,
//   CheckCircle2,
//   Clock3,
//   ReceiptText,
//   ShieldAlert,
//   UserRound,
//   Wifi,
// } from "lucide-react";
// import { FacturacionManualForm } from "@/components/forms/FacturacionManualForm";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Facturación mensual",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof ReceiptText;
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

// export default function FacturacionPage() {
//   const now = new Date();
//   const defaultMes = now.getMonth() + 1;
//   const defaultAnio = now.getFullYear();

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Tipo"
//           value="Manual"
//           description="Proceso iniciado por administrador."
//           icon={ReceiptText}
//           tone="cyan"
//         />

//         <StatCard
//           title="Clientes"
//           value="Activos"
//           description="Solo clientes activos con plan."
//           icon={UserRound}
//           tone="emerald"
//         />

//         <StatCard
//           title="Duplicados"
//           shortTitle="Dup."
//           value="Omite"
//           description="No duplica facturas existentes."
//           icon={CheckCircle2}
//           tone="amber"
//         />

//         <StatCard
//           title="Período"
//           shortTitle="Mes"
//           value={`${defaultMes}/${defaultAnio}`}
//           description="Período sugerido automáticamente."
//           icon={Clock3}
//           tone="violet"
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Control"
//             value="Admin"
//             description="Disponible solo para administradores."
//             icon={ShieldAlert}
//             tone="red"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
//               <div>
//                 <Link
//                   href="/admin/configuracion"
//                   className="inline-flex items-center gap-1.5 text-[11px] font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//                 >
//                   <ArrowLeft className="h-3.5 w-3.5" />
//                   Volver a configuración
//                 </Link>

//                 <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Facturación mensual
//                 </p>

//                 <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                   Generar facturación mensual
//                 </h1>

//                 <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                   Generá facturas mensuales para todos los clientes activos según
//                   el importe de su plan contratado.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Proceso
//               </p>

//               <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                 Datos de facturación
//               </h2>
//             </div>

//             <FacturacionManualForm
//               defaultMes={defaultMes}
//               defaultAnio={defaultAnio}
//             />
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Reglas del proceso
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Cómo se generan las facturas
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Clientes incluidos
//                 </span>

//                 <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                   Activos
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Plan requerido
//                 </span>

//                 <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                   Sí
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Factura duplicada
//                 </span>

//                 <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                   Se omite
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Concepto
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   Mensual
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Importante
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Recomendación
//               </h2>
//             </div>

//             <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//               Antes de generar la facturación, verificá que los clientes activos
//               tengan su plan correctamente asignado.
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Accesos relacionados
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Módulos vinculados
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               <Link
//                 href="/clientes"
//                 className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 <span className="flex items-center gap-2.5">
//                   <UserRound className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
//                   Clientes
//                 </span>
//                 <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-slate-400" />
//               </Link>

//               <Link
//                 href="/planes"
//                 className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 <span className="flex items-center gap-2.5">
//                   <Wifi className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
//                   Planes
//                 </span>
//                 <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-slate-400" />
//               </Link>
//             </div>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }


// // src/app/(dashboard)/admin/configuracion/facturacion/page.tsx

// import Link from "next/link";
// import {
//   ArrowLeft,
//   ArrowRight,
//   CheckCircle2,
//   Clock3,
//   ReceiptText,
//   ShieldAlert,
//   UserRound,
//   Wifi,
// } from "lucide-react";
// import { FacturacionManualForm } from "@/components/forms/FacturacionManualForm";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Facturación mensual",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof ReceiptText;
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

// export default function FacturacionPage() {
//   const now = new Date();
//   const defaultMes = now.getMonth() + 1;
//   const defaultAnio = now.getFullYear();

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="lg:hidden">
//         <div className="mb-3 px-1">
//           <Link
//             href="/admin/configuracion"
//             className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//           >
//             <ArrowLeft className="h-3.5 w-3.5" />
//             Volver a configuración
//           </Link>

//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Facturación mensual
//           </p>

//           <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             Generar facturación
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Facturas mensuales para clientes activos.
//           </p>
//         </div>

//         <div className={`${cardBase} p-3`}>
//           <div className="mb-3 flex items-start gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//               <ReceiptText className="h-4 w-4" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Proceso
//               </p>

//               <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                 Datos de facturación
//               </h2>
//             </div>
//           </div>

//           <FacturacionManualForm
//             defaultMes={defaultMes}
//             defaultAnio={defaultAnio}
//           />
//         </div>
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Tipo"
//             value="Manual"
//             description="Proceso iniciado por admin."
//             icon={ReceiptText}
//             tone="cyan"
//           />

//           <StatCard
//             title="Clientes"
//             value="Activos"
//             description="Activos con plan."
//             icon={UserRound}
//             tone="emerald"
//           />

//           <StatCard
//             title="Duplicados"
//             value="Omite"
//             description="No duplica facturas."
//             icon={CheckCircle2}
//             tone="amber"
//           />

//           <StatCard
//             title="Período"
//             value={`${defaultMes}/${defaultAnio}`}
//             description="Sugerido automáticamente."
//             icon={Clock3}
//             tone="violet"
//           />

//           <StatCard
//             title="Control"
//             value="Admin"
//             description="Solo administradores."
//             icon={ShieldAlert}
//             tone="red"
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//                   <div className="flex min-w-0 items-start gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                       <ReceiptText className="h-4 w-4" />
//                     </div>

//                     <div className="min-w-0">
//                       <Link
//                         href="/admin/configuracion"
//                         className="inline-flex items-center gap-1.5 text-[11px] font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//                       >
//                         <ArrowLeft className="h-3.5 w-3.5" />
//                         Volver a configuración
//                       </Link>

//                       <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                         Facturación mensual
//                       </p>

//                       <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                         Generar facturación mensual
//                       </h1>

//                       <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                         Generá facturas mensuales para todos los clientes
//                         activos según el importe de su plan contratado.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} mt-3 p-3.5`}>
//                 <div className="mb-3 flex items-start gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <ReceiptText className="h-4 w-4" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Proceso
//                     </p>

//                     <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                       Datos de facturación
//                     </h2>
//                   </div>
//                 </div>

//                 <FacturacionManualForm
//                   defaultMes={defaultMes}
//                   defaultAnio={defaultAnio}
//                 />
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Reglas del proceso
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Cómo se generan las facturas
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <CheckCircle2 className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className={innerCardBase}>
//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <UserRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Clientes incluidos
//                     </span>

//                     <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                       Activos
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Plan requerido
//                     </span>

//                     <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                       Sí
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <CheckCircle2 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Factura duplicada
//                     </span>

//                     <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                       Se omite
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <ReceiptText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Concepto
//                     </span>

//                     <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                       Mensual
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3">
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Importante
//                   </p>

//                   <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                     Recomendación
//                   </h2>
//                 </div>

//                 <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//                   Antes de generar la facturación, verificá que los clientes
//                   activos tengan su plan correctamente asignado.
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3">
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Accesos relacionados
//                   </p>

//                   <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                     Módulos vinculados
//                   </h2>
//                 </div>

//                 <div className="grid gap-2">
//                   <Link
//                     href="/clientes"
//                     className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                   >
//                     <span className="flex items-center gap-2.5">
//                       <UserRound className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
//                       Clientes
//                     </span>

//                     <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
//                   </Link>

//                   <Link
//                     href="/planes"
//                     className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                   >
//                     <span className="flex items-center gap-2.5">
//                       <Wifi className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
//                       Planes
//                     </span>

//                     <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
//                   </Link>
//                 </div>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

import Link from "next/link";
import { ArrowLeft, ReceiptText } from "lucide-react";
import { FacturacionManualForm } from "@/components/forms/FacturacionManualForm";

export const metadata = {
  title: "Facturación mensual",
};

export default function FacturacionPage() {
  const now = new Date();
  const defaultMes = now.getMonth() + 1;
  const defaultAnio = now.getFullYear();

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
              Generá facturas mensuales para todos los clientes activos según el
              importe de su plan contratado.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
        <FacturacionManualForm defaultMes={defaultMes} defaultAnio={defaultAnio} />
      </div>
    </section>
  );
}
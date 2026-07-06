// // src/app/(dashboard)/planes/page.tsx

// import Link from "next/link";
// import {
//   ArrowRight,
//   CheckCircle2,
//   Clock3,
//   Plus,
//   RadioTower,
//   Settings,
//   Wifi,
//   WifiOff,
// } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import { PlanesTable } from "@/components/tables/PlanesTable";
// import { obtenerPlanes } from "@/services/plan.service";

// export const metadata = {
//   title: "Planes",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   mobileValue?: string;
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
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function formatCompactMoney(value: number) {
//   const amount = Number(value || 0);

//   if (amount >= 1_000_000) {
//     return `$ ${(amount / 1_000_000).toLocaleString("es-AR", {
//       maximumFractionDigits: 1,
//     })} M`;
//   }

//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 0,
//   }).format(amount);
// }

// function StatCard({
//   title,
//   shortTitle,
//   value,
//   mobileValue,
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

//           <p className="mt-0.5 min-w-0 truncate text-[15px] font-medium leading-none tracking-tight text-slate-950 dark:text-white sm:mt-1 sm:text-xl">
//             <span className="sm:hidden">{mobileValue || value}</span>
//             <span className="hidden sm:inline">{value}</span>
//           </p>

//           <p className="mt-1 hidden text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const quickActions = [
//   {
//     label: "Nuevo plan",
//     description: "Registrar un plan comercial",
//     href: "/planes/nuevo",
//     icon: Plus,
//   },
//   {
//     label: "Planes activos",
//     description: "Ver planes disponibles",
//     href: "/planes",
//     icon: CheckCircle2,
//   },
//   {
//     label: "Configuración",
//     description: "Opciones generales del sistema",
//     href: "/admin/configuracion",
//     icon: Settings,
//   },
// ];

// export default async function PlanesPage() {
//   const planes = await obtenerPlanes();

//   const totalPlanes = planes.length;
//   const totalActivos = planes.filter((plan) => plan.estado === "activo").length;
//   const totalInactivos = planes.filter(
//     (plan) => plan.estado === "inactivo",
//   ).length;

//   const importePromedio =
//     totalPlanes > 0
//       ? planes.reduce((acc, plan) => acc + Number(plan.importe || 0), 0) /
//         totalPlanes
//       : 0;

//   const planMasCaro = planes.reduce(
//     (mayor, plan) => (plan.importe > mayor ? plan.importe : mayor),
//     0,
//   );

//   const planesRecientes = planes.slice(0, 3);

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Planes totales"
//           shortTitle="Planes"
//           value={String(totalPlanes)}
//           description="Todos los planes registrados."
//           icon={Wifi}
//           tone="cyan"
//         />

//         <StatCard
//           title="Activos"
//           value={String(totalActivos)}
//           description="Planes disponibles para clientes."
//           icon={CheckCircle2}
//           tone="emerald"
//         />

//         <StatCard
//           title="Inactivos"
//           shortTitle="Inact."
//           value={String(totalInactivos)}
//           description="Planes fuera de uso."
//           icon={WifiOff}
//           tone="red"
//         />

//         <StatCard
//           title="Promedio"
//           shortTitle="Prom."
//           value={formatMoney(importePromedio)}
//           mobileValue={formatCompactMoney(importePromedio)}
//           description="Importe promedio de los planes."
//           icon={Clock3}
//           tone="amber"
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Mayor importe"
//             shortTitle="Mayor"
//             value={formatMoney(planMasCaro)}
//             mobileValue={formatCompactMoney(planMasCaro)}
//             description="Plan con mayor importe registrado."
//             icon={RadioTower}
//             tone="violet"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain className="space-y-3 sm:space-y-4">
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
//               <div>
//                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Planes
//                 </p>

//                 <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                   Gestión de planes
//                 </h1>

//                 <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                   Administrá los planes comerciales que luego se asignan a los
//                   clientes del sistema.
//                 </p>
//               </div>

//               <Link
//                 href="/planes/nuevo"
//                 className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 text-[11px] font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//               >
//                 <Plus className="h-3.5 w-3.5" />
//                 Nuevo plan
//               </Link>
//             </div>
//           </div>

//           <PlanesTable planes={planes} />
//         </DashboardMain>

//         <DashboardAside>
//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Acciones rápidas
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Atajos para administrar planes
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               {quickActions.map((item) => {
//                 const Icon = item.icon;

//                 return (
//                   <Link
//                     key={item.href + item.label}
//                     href={item.href}
//                     className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                   >
//                     <span className="flex min-w-0 items-center gap-2.5">
//                       <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />

//                       <span className="min-w-0">
//                         <span className="block truncate">{item.label}</span>
//                         <span className="block truncate text-[11px] font-normal text-slate-500 dark:text-slate-400">
//                           {item.description}
//                         </span>
//                       </span>
//                     </span>

//                     <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Estado de planes
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Información general
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Activos
//                 </span>

//                 <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                   {totalActivos}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Inactivos
//                 </span>

//                 <span className="text-xs font-medium text-red-700 dark:text-red-300">
//                   {totalInactivos}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Promedio
//                 </span>

//                 <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                   {formatMoney(importePromedio)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Mayor importe
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   {formatMoney(planMasCaro)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Planes recientes
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Últimos planes registrados
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               {planesRecientes.length === 0 ? (
//                 <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                   No hay planes recientes.
//                 </div>
//               ) : (
//                 planesRecientes.map((plan) => (
//                   <Link
//                     key={plan.id}
//                     href={`/planes/${plan.id}/editar`}
//                     className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//                   >
//                     <div className="min-w-0">
//                       <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                         {plan.nombre}
//                       </p>

//                       <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                         {plan.tipo} · {formatMoney(plan.importe)}
//                       </p>
//                     </div>

//                     <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
//                   </Link>
//                 ))
//               )}
//             </div>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }


// // src/app/(dashboard)/planes/page.tsx

// import Link from "next/link";
// import {
//   ArrowRight,
//   CheckCircle2,
//   Clock3,
//   FileText,
//   Pencil,
//   Plus,
//   RadioTower,
//   Settings,
//   Wifi,
//   WifiOff,
// } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import { PlanesTable } from "@/components/tables/PlanesTable";
// import { obtenerPlanes } from "@/services/plan.service";

// export const metadata = {
//   title: "Planes",
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

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function getTipoLabel(tipo: string) {
//   const labels: Record<string, string> = {
//     residencial: "Residencial",
//     comercial: "Comercial",
//     corporativo: "Corporativo",
//     dedicado: "Dedicado",
//     otro: "Otro",
//   };

//   return labels[tipo] || tipo || "-";
// }

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

//           <p
//             className={`mt-1 truncate text-xl font-semibold tracking-tight ${
//               tone === "red"
//                 ? "text-red-700 dark:text-red-300"
//                 : "text-slate-950 dark:text-white"
//             }`}
//             title={value}
//           >
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

// const quickActions = [
//   {
//     label: "Nuevo plan",
//     description: "Registrar un plan",
//     href: "/planes/nuevo",
//     icon: Plus,
//   },
//   {
//     label: "Clientes",
//     description: "Ver clientes registrados",
//     href: "/clientes",
//     icon: FileText,
//   },
// ];

// export default async function PlanesPage() {
//   const planes = await obtenerPlanes();

//   const totalPlanes = planes.length;
//   const totalActivos = planes.filter((plan) => plan.estado === "activo").length;
//   const totalInactivos = planes.filter(
//     (plan) => plan.estado === "inactivo",
//   ).length;

//   const importePromedio =
//     totalPlanes > 0
//       ? planes.reduce((acc, plan) => acc + Number(plan.importe || 0), 0) /
//         totalPlanes
//       : 0;

//   const planMasCaro = planes.reduce((mayor, plan) => {
//     const importe = Number(plan.importe || 0);
//     return importe > mayor ? importe : mayor;
//   }, 0);

//   const planesRecientes = planes.slice(0, 4);

//   return (
//     <PageShell maxWidth="wide">
//       <div className="space-y-3 lg:hidden">
//         <section className={`${cardBase} p-3`}>
//           <div className="flex items-start justify-between gap-3">
//             <div className="flex min-w-0 items-start gap-3">
//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//                 <Wifi className="h-5 w-5" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                   Planes
//                 </p>

//                 <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//                   Gestión de planes
//                 </h1>

//                 <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   Administrá los planes disponibles para los clientes.
//                 </p>
//               </div>
//             </div>

//             <Link
//               href="/planes/nuevo"
//               className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-3 text-[11px] font-medium text-white transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//             >
//               <Plus className="h-3.5 w-3.5" />
//               Nuevo
//             </Link>
//           </div>
//         </section>

//         <PlanesTable planes={planes} />
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Planes totales"
//             value={String(totalPlanes)}
//             description="Registrados."
//             icon={Wifi}
//             tone="cyan"
//           />

//           <StatCard
//             title="Activos"
//             value={String(totalActivos)}
//             description="Disponibles."
//             icon={CheckCircle2}
//             tone="emerald"
//           />

//           <StatCard
//             title="Inactivos"
//             value={String(totalInactivos)}
//             description="Fuera de uso."
//             icon={WifiOff}
//             tone={totalInactivos > 0 ? "red" : "emerald"}
//           />

//           <StatCard
//             title="Promedio"
//             value={formatMoney(importePromedio)}
//             description="Importe promedio."
//             icon={Clock3}
//             tone="amber"
//           />

//           <StatCard
//             title="Mayor importe"
//             value={formatMoney(planMasCaro)}
//             description="Plan más alto."
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
//                         Gestión de planes
//                       </h1>

//                       <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                         Administrá el nombre, tipo, detalle, importe mensual y
//                         estado de los planes comerciales.
//                       </p>
//                     </div>
//                   </div>

//                   <Link
//                     href="/planes/nuevo"
//                     className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-3.5 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//                   >
//                     <Plus className="h-3.5 w-3.5" />
//                     Nuevo plan
//                   </Link>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <PlanesTable planes={planes} />
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Estado de planes
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Información general
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <Settings className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className={innerCardBase}>
//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <CheckCircle2 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Activos
//                     </span>

//                     <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                       {totalActivos}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <WifiOff className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Inactivos
//                     </span>

//                     <span className="text-xs font-medium text-red-700 dark:text-red-300">
//                       {totalInactivos}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <Clock3 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Promedio
//                     </span>

//                     <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                       {formatMoney(importePromedio)}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <RadioTower className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Mayor importe
//                     </span>

//                     <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                       {formatMoney(planMasCaro)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Acciones rápidas
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Atajos del módulo
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <Plus className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className="grid gap-2">
//                   {quickActions.map((item) => {
//                     const Icon = item.icon;

//                     return (
//                       <Link
//                         key={item.href + item.label}
//                         href={item.href}
//                         className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                       >
//                         <span className="flex min-w-0 items-center gap-2.5">
//                           <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />

//                           <span className="min-w-0">
//                             <span className="block truncate">
//                               {item.label}
//                             </span>
//                             <span className="block truncate text-[11px] font-normal text-slate-500 dark:text-slate-400">
//                               {item.description}
//                             </span>
//                           </span>
//                         </span>

//                         <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Planes recientes
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Últimos registros del sistema
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <Clock3 className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className="grid gap-2">
//                   {planesRecientes.length === 0 ? (
//                     <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                       No hay planes recientes.
//                     </div>
//                   ) : (
//                     planesRecientes.map((plan) => (
//                       <Link
//                         key={plan.id}
//                         href={`/planes/${plan.id}/editar`}
//                         className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//                       >
//                         <div className="min-w-0">
//                           <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                             {plan.nombre}
//                           </p>

//                           <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                             {getTipoLabel(plan.tipo)} ·{" "}
//                             {formatMoney(plan.importe)}
//                           </p>
//                         </div>

//                         <Pencil className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/planes/page.tsx

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Pencil,
  Plus,
  RadioTower,
  Settings,
  Wifi,
  WifiOff,
} from "lucide-react";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import { PlanesTable } from "@/components/tables/PlanesTable";
import { obtenerPlanes } from "@/services/plan.service";

export const metadata = {
  title: "Planes",
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

const buttonPrimaryClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 text-[12px] font-medium text-white shadow-sm shadow-blue-950/10 transition hover:bg-blue-700 active:scale-[0.99] dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600";

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function getTipoLabel(tipo: string) {
  const labels: Record<string, string> = {
    residencial: "Residencial",
    comercial: "Comercial",
    corporativo: "Corporativo",
    dedicado: "Dedicado",
    otro: "Otro",
  };

  return labels[tipo] || tipo || "-";
}

function getEstadoLabel(estado: string) {
  if (estado === "activo") return "Activo";
  if (estado === "inactivo") return "Inactivo";
  return estado || "-";
}

function getEstadoTone(
  estado: string,
): "neutral" | "primary" | "success" | "warning" | "danger" {
  if (estado === "activo") return "success";
  if (estado === "inactivo") return "danger";
  return "neutral";
}

function ResumenItem({
  icon,
  label,
  value,
  tone = "neutral",
}: {
  icon?: React.ReactNode;
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

const quickActions = [
  {
    label: "Nuevo plan",
    description: "Registrar un plan",
    href: "/planes/nuevo",
    icon: Plus,
  },
  {
    label: "Clientes",
    description: "Ver clientes registrados",
    href: "/clientes",
    icon: FileText,
  },
];

function HeaderPlanes({
  totalPlanes,
}: {
  totalPlanes: number;
}) {
  return (
    <section className={`${panelClass} overflow-hidden`}>
      <div className="px-3.5 py-3.5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className={sectionTitleClass}>Planes</p>

            <h1 className={sectionSubtitleClass}>Gestión de planes</h1>

            <p className={`${sectionDescriptionClass} max-w-3xl`}>
              Administración de planes comerciales, tipo de servicio, detalle,
              importe mensual y estado disponible para clientes.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <div className="hidden shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-[12px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400 sm:flex">
              <Wifi className="h-4 w-4 text-blue-700 dark:text-blue-300" />
              Total{" "}
              <span className="font-semibold text-slate-950 dark:text-white">
                {totalPlanes}
              </span>{" "}
              planes
            </div>

            <Link href="/planes/nuevo" className={buttonPrimaryClass}>
              <Plus className="h-3.5 w-3.5 text-white" />
              <span className="text-white">Nuevo plan</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-3.5 py-3 dark:border-slate-700 sm:hidden">
        <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-[12px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
          <Wifi className="h-4 w-4 text-blue-700 dark:text-blue-300" />
          Total{" "}
          <span className="font-semibold text-slate-950 dark:text-white">
            {totalPlanes}
          </span>{" "}
          planes
        </div>
      </div>
    </section>
  );
}

function EstadoPlanesAside({
  totalPlanes,
  totalActivos,
  totalInactivos,
  importePromedio,
  planMasCaro,
}: {
  totalPlanes: number;
  totalActivos: number;
  totalInactivos: number;
  importePromedio: number;
  planMasCaro: number;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Estado de planes</p>

          <h2 className={sectionSubtitleClass}>Información general</h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <Settings className="h-4 w-4" />
        </div>
      </div>

      <div className={innerPanelClass}>
        <ResumenItem
          icon={<Wifi className="h-3.5 w-3.5" />}
          label="Total planes"
          value={totalPlanes}
          tone="primary"
        />

        <ResumenItem
          icon={<CheckCircle2 className="h-3.5 w-3.5" />}
          label="Activos"
          value={totalActivos}
          tone="success"
        />

        <ResumenItem
          icon={<WifiOff className="h-3.5 w-3.5" />}
          label="Inactivos"
          value={totalInactivos}
          tone={totalInactivos > 0 ? "danger" : "neutral"}
        />

        <ResumenItem
          icon={<Clock3 className="h-3.5 w-3.5" />}
          label="Promedio"
          value={formatMoney(importePromedio)}
          tone="warning"
        />

        <ResumenItem
          icon={<RadioTower className="h-3.5 w-3.5" />}
          label="Mayor importe"
          value={formatMoney(planMasCaro)}
          tone="primary"
        />
      </div>
    </section>
  );
}

function AccionesAside() {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Accesos rápidos</p>

        <h2 className={sectionSubtitleClass}>Atajos del módulo</h2>
      </div>

      <div className="grid gap-2">
        {quickActions.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="group flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 ring-1 ring-white/50 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:ring-slate-800/60 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-blue-700 dark:text-slate-400 dark:group-hover:text-blue-300" />

                <span className="min-w-0">
                  <span className="block truncate">{item.label}</span>
                  <span className="block truncate text-[11px] font-normal text-slate-500 dark:text-slate-400">
                    {item.description}
                  </span>
                </span>
              </span>

              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function PlanesRecientesAside({
  planes,
}: {
  planes: Awaited<ReturnType<typeof obtenerPlanes>>;
}) {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Planes recientes</p>

        <h2 className={sectionSubtitleClass}>Últimos registros</h2>
      </div>

      <div className="grid gap-2">
        {planes.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-[12px] leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
            No hay planes registrados.
          </div>
        ) : (
          planes.map((plan) => (
            <Link
              key={plan.id}
              href={`/planes/${plan.id}/editar`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 ring-1 ring-white/50 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:ring-slate-800/60 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
            >
              <span className="min-w-0">
                <span className="block truncate">{plan.nombre}</span>

                <span className="block truncate text-[11px] font-normal text-slate-500 dark:text-slate-400">
                  {getTipoLabel(plan.tipo)} · {formatMoney(plan.importe)} ·{" "}
                  {getEstadoLabel(plan.estado)}
                </span>
              </span>

              <Pencil className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:text-blue-700 dark:group-hover:text-blue-300" />
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default async function PlanesPage() {
  const planes = await obtenerPlanes();

  const totalPlanes = planes.length;
  const totalActivos = planes.filter((plan) => plan.estado === "activo").length;
  const totalInactivos = planes.filter(
    (plan) => plan.estado === "inactivo",
  ).length;

  const importePromedio =
    totalPlanes > 0
      ? planes.reduce((acc, plan) => acc + Number(plan.importe || 0), 0) /
        totalPlanes
      : 0;

  const planMasCaro = planes.reduce((mayor, plan) => {
    const importe = Number(plan.importe || 0);
    return importe > mayor ? importe : mayor;
  }, 0);

  const planesRecientes = planes.slice(0, 4);

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <HeaderPlanes totalPlanes={totalPlanes} />

          <div className="mt-3">
            <PlanesTable planes={planes} />
          </div>
        </DashboardMain>

        <DashboardAside>
          <EstadoPlanesAside
            totalPlanes={totalPlanes}
            totalActivos={totalActivos}
            totalInactivos={totalInactivos}
            importePromedio={importePromedio}
            planMasCaro={planMasCaro}
          />

          <div className="mt-3">
            <AccionesAside />
          </div>

          <div className="mt-3">
            <PlanesRecientesAside planes={planesRecientes} />
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
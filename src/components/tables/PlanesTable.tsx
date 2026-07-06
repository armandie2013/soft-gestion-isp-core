// // src/components/tables/PlanesTable.tsx

// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import {
//   Pencil,
//   Search,
//   Trash2,
//   Wifi,
//   WifiOff,
//   X,
// } from "lucide-react";
// import { eliminarPlanAction } from "@/actions/plan.actions";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { PlanSafe } from "@/types/plan.types";

// type PlanesTableProps = {
//   planes: PlanSafe[];
// };

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function estadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   return "Inactivo";
// }

// function estadoClass(estado: string) {
//   if (estado === "activo") {
//     return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
// }

// function normalizarTexto(value: string) {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .trim();
// }

// function EstadoPill({ estado }: { estado: string }) {
//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${estadoClass(
//         estado,
//       )}`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {estadoLabel(estado)}
//     </span>
//   );
// }

// function getPlanIcon(estado: string) {
//   if (estado === "activo") {
//     return <Wifi className="h-4 w-4" />;
//   }

//   return <WifiOff className="h-4 w-4" />;
// }

// export function PlanesTable({ planes }: PlanesTableProps) {
//   const [busqueda, setBusqueda] = useState("");

//   const planesFiltrados = useMemo(() => {
//     const query = normalizarTexto(busqueda);

//     if (!query) {
//       return planes;
//     }

//     return planes.filter((plan) => {
//       const textoBuscable = normalizarTexto(
//         [
//           plan.nombre,
//           plan.tipo,
//           plan.detalle,
//           plan.importe,
//           plan.estado,
//         ]
//           .filter(Boolean)
//           .join(" "),
//       );

//       return textoBuscable.includes(query);
//     });
//   }, [busqueda, planes]);

//   if (planes.length === 0) {
//     return (
//       <EmptyState
//         title="No hay planes cargados."
//         description="Creá el primer plan para poder asignarlo luego a los clientes."
//       />
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//         <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full">
//             <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

//             <input
//               type="text"
//               value={busqueda}
//               onChange={(event) => setBusqueda(event.target.value)}
//               placeholder="Buscar por nombre, tipo, detalle o importe"
//               className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 pl-8 pr-8 text-[11px] text-slate-950 outline-none transition placeholder:text-[11px] placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-500 dark:focus:bg-slate-900"
//             />

//             {busqueda ? (
//               <button
//                 type="button"
//                 onClick={() => setBusqueda("")}
//                 className="absolute right-1.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-500 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-300"
//                 aria-label="Limpiar búsqueda"
//               >
//                 <X className="h-3.5 w-3.5" />
//               </button>
//             ) : null}
//           </div>

//           <div className="flex shrink-0 items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 sm:justify-end">
//             <span>Total: {planes.length}</span>
//             <span>Mostrados: {planesFiltrados.length}</span>
//           </div>
//         </div>
//       </div>

//       {planesFiltrados.length === 0 ? (
//         <EmptyState
//           title="No se encontraron planes."
//           description="Probá con otro nombre, tipo, detalle o importe."
//         />
//       ) : (
//         <>
//           <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:block">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[880px] table-fixed text-left text-xs xl:min-w-0">
//                 <colgroup>
//                   <col className="w-[25%]" />
//                   <col className="w-[16%]" />
//                   <col className="w-[26%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[10%]" />
//                   <col className="w-[10%]" />
//                 </colgroup>

//                 <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//                   <tr>
//                     <th className="px-3 py-2.5 font-medium">Plan</th>
//                     <th className="px-3 py-2.5 font-medium">Tipo</th>
//                     <th className="px-3 py-2.5 font-medium">Detalle</th>
//                     <th className="px-3 py-2.5 font-medium">Importe</th>
//                     <th className="px-3 py-2.5 font-medium">Estado</th>
//                     <th className="px-3 py-2.5 text-right font-medium">
//                       Acciones
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
//                   {planesFiltrados.map((plan) => (
//                     <tr
//                       key={plan.id}
//                       className="transition hover:bg-slate-50/80 dark:hover:bg-slate-950/35"
//                     >
//                       <td className="px-3 py-3">
//                         <div className="flex min-w-0 items-center gap-2.5">
//                           <div
//                             className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${
//                               plan.estado === "activo"
//                                 ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300"
//                                 : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                             }`}
//                           >
//                             {getPlanIcon(plan.estado)}
//                           </div>

//                           <div className="min-w-0">
//                             <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                               {plan.nombre}
//                             </p>

//                             <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                               ID {plan.id.slice(-6).toUpperCase()}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {plan.tipo || "-"}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {plan.detalle || "-"}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                           {formatMoney(plan.importe)}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <EstadoPill estado={plan.estado} />
//                       </td>

//                       <td className="px-3 py-3 text-right">
//                         <div className="flex justify-end gap-1.5">
//                           <Link
//                             href={`/planes/${plan.id}/editar`}
//                             className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                             title="Editar plan"
//                           >
//                             <Pencil className="h-3.5 w-3.5" />
//                           </Link>

//                           <form action={eliminarPlanAction}>
//                             <input type="hidden" name="id" value={plan.id} />
//                             <button
//                               type="submit"
//                               className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-700 shadow-sm transition hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
//                               title="Eliminar plan"
//                             >
//                               <Trash2 className="h-3.5 w-3.5" />
//                             </button>
//                           </form>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//               <span>
//                 Mostrando {planesFiltrados.length} de {planes.length} planes
//               </span>

//               <span>Vista administrativa</span>
//             </div>
//           </div>

//           <div className="grid gap-3 md:hidden">
//             {planesFiltrados.map((plan) => (
//               <div
//                 key={plan.id}
//                 className="rounded-[1.35rem] border border-slate-200 bg-white/85 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex min-w-0 gap-3">
//                     <div
//                       className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
//                         plan.estado === "activo"
//                           ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300"
//                           : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                       }`}
//                     >
//                       {getPlanIcon(plan.estado)}
//                     </div>

//                     <div className="min-w-0">
//                       <h2 className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                         {plan.nombre}
//                       </h2>

//                       <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
//                         {plan.tipo || "Sin tipo"}
//                       </p>
//                     </div>
//                   </div>

//                   <EstadoPill estado={plan.estado} />
//                 </div>

//                 <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//                   <div className="flex items-center justify-between gap-3">
//                     <span className="inline-flex items-center gap-1.5">
//                       <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Importe
//                     </span>

//                     <span className="shrink-0 text-right font-medium text-cyan-700 dark:text-cyan-300">
//                       {formatMoney(plan.importe)}
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-start justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                     <span className="min-w-0 text-slate-500 dark:text-slate-400">
//                       Detalle
//                     </span>

//                     <span className="max-w-[65%] text-right text-slate-700 dark:text-slate-300">
//                       {plan.detalle || "-"}
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                     <span className="text-slate-500 dark:text-slate-400">
//                       Código interno
//                     </span>

//                     <span className="text-right text-slate-700 dark:text-slate-300">
//                       {plan.id.slice(-6).toUpperCase()}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mt-3 grid grid-cols-2 gap-2">
//                   <Link
//                     href={`/planes/${plan.id}/editar`}
//                     className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                   >
//                     <Pencil className="h-3.5 w-3.5" />
//                     Editar
//                   </Link>

//                   <form action={eliminarPlanAction}>
//                     <input type="hidden" name="id" value={plan.id} />
//                     <button
//                       type="submit"
//                       className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-2 text-xs font-medium text-red-700 shadow-sm transition hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
//                     >
//                       <Trash2 className="h-3.5 w-3.5" />
//                       Eliminar
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // src/components/tables/PlanesTable.tsx

// import Link from "next/link";
// import {
//   CheckCircle2,
//   Pencil,
//   RadioTower,
//   Wifi,
//   WifiOff,
// } from "lucide-react";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { PlanSafe } from "@/types/plan.types";

// type PlanesTableProps = {
//   planes: PlanSafe[];
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function getEstadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   return "Inactivo";
// }

// function getEstadoClass(estado: string) {
//   if (estado === "activo") {
//     return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
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

// function EstadoPill({ estado }: { estado: string }) {
//   const Icon = estado === "activo" ? CheckCircle2 : WifiOff;

//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${getEstadoClass(
//         estado,
//       )}`}
//     >
//       <Icon className="h-3 w-3" />
//       {getEstadoLabel(estado)}
//     </span>
//   );
// }

// function MobilePlanCard({ plan }: { plan: PlanSafe }) {
//   return (
//     <article className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex min-w-0 gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//             <Wifi className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <h2 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//               {plan.nombre}
//             </h2>

//             <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
//               {getTipoLabel(plan.tipo)}
//             </p>
//           </div>
//         </div>

//         <EstadoPill estado={plan.estado} />
//       </div>

//       {plan.detalle ? (
//         <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
//           {plan.detalle}
//         </p>
//       ) : (
//         <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-500">
//           Sin detalle cargado.
//         </p>
//       )}

//       <div className="mt-3 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900/70">
//         <div className="flex items-center justify-between gap-3">
//           <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//             <RadioTower className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Importe
//           </span>

//           <span className="text-right text-sm font-semibold text-slate-950 dark:text-white">
//             {formatMoney(plan.importe)}
//           </span>
//         </div>
//       </div>

//       <Link
//         href={`/planes/${plan.id}/editar`}
//         className="mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//       >
//         <Pencil className="h-3.5 w-3.5" />
//         Editar plan
//       </Link>
//     </article>
//   );
// }

// function DesktopCellLink({
//   href,
//   children,
//   className = "",
// }: {
//   href: string;
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <Link href={href} className={`block h-full w-full px-3 py-3 ${className}`}>
//       {children}
//     </Link>
//   );
// }

// export function PlanesTable({ planes }: PlanesTableProps) {
//   if (planes.length === 0) {
//     return (
//       <div className="rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
//         <EmptyState
//           title="Todavía no hay planes cargados."
//           description="Creá el primer plan para poder asignarlo a los clientes."
//         />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none lg:block">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[860px] table-fixed text-left text-xs xl:min-w-0">
//             <colgroup>
//               <col className="w-[26%]" />
//               <col className="w-[14%]" />
//               <col className="w-[28%]" />
//               <col className="w-[14%]" />
//               <col className="w-[10%]" />
//               <col className="w-[8%]" />
//             </colgroup>

//             <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//               <tr>
//                 <th className="px-3 py-2.5 font-medium">Plan</th>
//                 <th className="px-3 py-2.5 font-medium">Tipo</th>
//                 <th className="px-3 py-2.5 font-medium">Detalle</th>
//                 <th className="px-3 py-2.5 text-right font-medium">
//                   Importe
//                 </th>
//                 <th className="px-3 py-2.5 font-medium">Estado</th>
//                 <th className="px-3 py-2.5 text-right font-medium">Editar</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
//               {planes.map((plan) => {
//                 const href = `/planes/${plan.id}/editar`;

//                 return (
//                   <tr
//                     key={plan.id}
//                     className="group cursor-pointer transition hover:bg-cyan-50/70 dark:hover:bg-cyan-950/20"
//                   >
//                     <td>
//                       <DesktopCellLink href={href}>
//                         <div className="flex min-w-0 items-center gap-3">
//                           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                             <Wifi className="h-4 w-4" />
//                           </div>

//                           <div className="min-w-0">
//                             <p className="truncate text-xs font-medium text-slate-950 transition group-hover:text-cyan-800 dark:text-white dark:group-hover:text-cyan-300">
//                               {plan.nombre}
//                             </p>

//                             <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                               Plan comercial
//                             </p>
//                           </div>
//                         </div>
//                       </DesktopCellLink>
//                     </td>

//                     <td>
//                       <DesktopCellLink href={href}>
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {getTipoLabel(plan.tipo)}
//                         </p>
//                       </DesktopCellLink>
//                     </td>

//                     <td>
//                       <DesktopCellLink href={href}>
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {plan.detalle || "Sin detalle"}
//                         </p>
//                       </DesktopCellLink>
//                     </td>

//                     <td>
//                       <DesktopCellLink href={href} className="text-right">
//                         <p className="truncate text-xs font-semibold text-slate-950 dark:text-white">
//                           {formatMoney(plan.importe)}
//                         </p>
//                       </DesktopCellLink>
//                     </td>

//                     <td>
//                       <DesktopCellLink href={href}>
//                         <EstadoPill estado={plan.estado} />
//                       </DesktopCellLink>
//                     </td>

//                     <td>
//                       <DesktopCellLink href={href} className="text-right">
//                         <span
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 shadow-sm transition group-hover:border-cyan-300 group-hover:bg-cyan-50 group-hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:group-hover:border-cyan-800 dark:group-hover:bg-cyan-950/30 dark:group-hover:text-cyan-200"
//                           title="Editar plan"
//                         >
//                           <Pencil className="h-3.5 w-3.5" />
//                         </span>
//                       </DesktopCellLink>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//           <span>
//             Mostrando {planes.length} {planes.length === 1 ? "plan" : "planes"}
//           </span>

//           <span>Click en una fila para editar</span>
//         </div>
//       </div>

//       <div className="grid gap-2 lg:hidden">
//         {planes.map((plan) => (
//           <MobilePlanCard key={plan.id} plan={plan} />
//         ))}
//       </div>
//     </>
//   );
// }

// src/components/tables/PlanesTable.tsx

import Link from "next/link";
import {
  CheckCircle2,
  Pencil,
  RadioTower,
  Wifi,
  WifiOff,
} from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import type { PlanSafe } from "@/types/plan.types";

type PlanesTableProps = {
  planes: PlanSafe[];
};

const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

const actionLinkClass =
  "inline-flex h-7 items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 text-[11px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300";

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function getEstadoLabel(estado: string) {
  if (estado === "activo") return "Activo";
  return "Inactivo";
}

function getEstadoClass(estado: string) {
  if (estado === "activo") {
    return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
  }

  return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
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

function EstadoPill({ estado }: { estado: string }) {
  const Icon = estado === "activo" ? CheckCircle2 : WifiOff;

  return (
    <span
      className={`inline-flex h-6 w-fit shrink-0 items-center gap-1 rounded-full border px-2 text-[10px] font-semibold leading-none ${getEstadoClass(
        estado,
      )}`}
    >
      <Icon className="h-3 w-3" />
      {getEstadoLabel(estado)}
    </span>
  );
}

function EmptyPlanesPanel() {
  return (
    <section className={`${panelClass} mt-3 p-6 text-center`}>
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
        <Wifi className="h-5 w-5" />
      </div>

      <h2 className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
        Todavía no hay planes cargados
      </h2>

      <p className="mx-auto mt-1 max-w-md text-[12px] leading-5 text-slate-600 dark:text-slate-400">
        Creá el primer plan para poder asignarlo a los clientes.
      </p>

      <div className="sr-only">
        <EmptyState
          title="Todavía no hay planes cargados."
          description="Creá el primer plan para poder asignarlo a los clientes."
        />
      </div>
    </section>
  );
}

function MobilePlanRow({ plan }: { plan: PlanSafe }) {
  return (
    <article className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2.5 shadow-sm shadow-slate-300/35 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/15 dark:ring-slate-800/80">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-1.5 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
              <Wifi className="h-3.5 w-3.5" />
            </span>

            <h2 className="truncate text-[13px] font-semibold text-slate-950 dark:text-white">
              {plan.nombre}
            </h2>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
            <span>{getTipoLabel(plan.tipo)}</span>

            <span className="text-slate-400 dark:text-slate-600">·</span>

            <span className="inline-flex items-center gap-1">
              <RadioTower className="h-3 w-3 text-slate-400 dark:text-slate-500" />
              {formatMoney(plan.importe)}
            </span>
          </div>
        </div>

        <EstadoPill estado={plan.estado} />
      </div>

      <p className="mt-2 line-clamp-2 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
        {plan.detalle || "Sin detalle cargado."}
      </p>

      <div className="mt-2 flex items-center gap-1.5">
        <Link href={`/planes/${plan.id}/editar`} className={actionLinkClass}>
          <Pencil className="h-3 w-3" />
          Editar
        </Link>
      </div>
    </article>
  );
}

function DesktopTable({ planes }: { planes: PlanSafe[] }) {
  return (
    <section className={`${panelClass} hidden overflow-hidden lg:block`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] table-fixed text-left text-[12px] xl:min-w-0">
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[14%]" />
            <col className="w-[30%]" />
            <col className="w-[13%]" />
            <col className="w-[11%]" />
            <col className="w-[8%]" />
          </colgroup>

          <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.08em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
            <tr>
              <th className="px-3 py-2.5 font-medium">Plan</th>
              <th className="px-3 py-2.5 font-medium">Tipo</th>
              <th className="px-3 py-2.5 font-medium">Detalle</th>
              <th className="px-3 py-2.5 text-right font-medium">Importe</th>
              <th className="px-3 py-2.5 font-medium">Estado</th>
              <th className="px-3 py-2.5 text-center font-medium">Acción</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {planes.map((plan) => (
              <tr
                key={plan.id}
                className="transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
              >
                <td className="px-3 py-2.5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
                      <Wifi className="h-3.5 w-3.5" />
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-slate-950 dark:text-white">
                        {plan.nombre}
                      </p>

                      <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                        Plan comercial
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-2.5">
                  <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
                    {getTipoLabel(plan.tipo)}
                  </p>
                </td>

                <td className="px-3 py-2.5">
                  <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
                    {plan.detalle || "Sin detalle"}
                  </p>
                </td>

                <td className="px-3 py-2.5 text-right">
                  <p className="truncate text-[12px] font-semibold text-slate-950 dark:text-white">
                    {formatMoney(plan.importe)}
                  </p>
                </td>

                <td className="px-3 py-2.5">
                  <EstadoPill estado={plan.estado} />
                </td>

                <td className="px-3 py-2.5">
                  <div className="flex items-center justify-center">
                    <Link
                      href={`/planes/${plan.id}/editar`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
                      aria-label="Editar plan"
                      title="Editar plan"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
        <span>
          Mostrando {planes.length} {planes.length === 1 ? "plan" : "planes"}
        </span>

        <span>Vista administrativa</span>
      </div>
    </section>
  );
}

export function PlanesTable({ planes }: PlanesTableProps) {
  if (planes.length === 0) {
    return <EmptyPlanesPanel />;
  }

  return (
    <>
      <DesktopTable planes={planes} />

      <section className="grid gap-2.5 lg:hidden">
        {planes.map((plan) => (
          <MobilePlanRow key={plan.id} plan={plan} />
        ))}

        <div
          className={`${panelClass} px-3 py-2 text-[11px] text-slate-500 dark:text-slate-400`}
        >
          Mostrando {planes.length} {planes.length === 1 ? "plan" : "planes"}
        </div>
      </section>
    </>
  );
}
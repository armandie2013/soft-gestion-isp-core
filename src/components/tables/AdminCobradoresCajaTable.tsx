// // src/components/tables/AdminCobradoresCajaTable.tsx

// "use client";

// import { useMemo, useState } from "react";
// import {
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   KeyRound,
//   Search,
//   ShieldAlert,
//   UserRound,
//   WalletCards,
//   X,
// } from "lucide-react";
// import { GenerarCodigoCierreCajaForm } from "@/components/forms/GenerarCodigoCierreCajaForm";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { CobradorCajaResumenSafe } from "@/types/cobro.types";

// type AdminCobradoresCajaTableProps = {
//   cobradores: CobradorCajaResumenSafe[];
// };

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function formatDateTime(value?: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Sin fecha";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   let hours = date.getHours();
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const period = hours >= 12 ? "p. m." : "a. m.";

//   hours = hours % 12;
//   hours = hours === 0 ? 12 : hours;

//   const formattedHours = String(hours).padStart(2, "0");

//   return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${period}`;
// }

// function normalizarTexto(value: string) {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .trim();
// }

// function getInitials(cobrador: CobradorCajaResumenSafe) {
//   const parts = `${cobrador.nombre} ${cobrador.apellido}`
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function nombreCompleto(cobrador: CobradorCajaResumenSafe) {
//   const apellido = cobrador.apellido || "";
//   const nombre = cobrador.nombre || "";

//   if (!apellido && !nombre) return "Cobrador sin nombre";

//   return `${apellido}, ${nombre}`.trim();
// }

// function EstadoPill({ saldoActual }: { saldoActual: number }) {
//   const tieneSaldo = saldoActual > 0;

//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${
//         tieneSaldo
//           ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
//           : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//       }`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {tieneSaldo ? "Pendiente" : "Al día"}
//     </span>
//   );
// }

// function CodigoPill({ cobrador }: { cobrador: CobradorCajaResumenSafe }) {
//   if (!cobrador.codigoPendiente) {
//     return (
//       <span className="inline-flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//         Sin código
//       </span>
//     );
//   }

//   return (
//     <span className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
//       <KeyRound className="h-3 w-3" />
//       {cobrador.codigoPendiente.codigo}
//     </span>
//   );
// }

// export function AdminCobradoresCajaTable({
//   cobradores,
// }: AdminCobradoresCajaTableProps) {
//   const [busqueda, setBusqueda] = useState("");

//   const cobradoresFiltrados = useMemo(() => {
//     const query = normalizarTexto(busqueda);

//     if (!query) {
//       return cobradores;
//     }

//     return cobradores.filter((cobrador) => {
//       const textoBuscable = normalizarTexto(
//         [
//           cobrador.nombre,
//           cobrador.apellido,
//           cobrador.email,
//           cobrador.saldoActual,
//           cobrador.totalCobrado,
//           cobrador.totalCierres,
//           cobrador.codigoPendiente?.codigo,
//         ]
//           .filter(Boolean)
//           .join(" "),
//       );

//       return textoBuscable.includes(query);
//     });
//   }, [busqueda, cobradores]);

//   if (cobradores.length === 0) {
//     return (
//       <EmptyState
//         title="No hay cobradores registrados."
//         description="Cuando asignes usuarios con rol cobrador, aparecerán en este listado."
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
//               placeholder="Buscar por cobrador, email o código"
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
//             <span>Total: {cobradores.length}</span>
//             <span>Mostrados: {cobradoresFiltrados.length}</span>
//           </div>
//         </div>
//       </div>

//       {cobradoresFiltrados.length === 0 ? (
//         <EmptyState
//           title="No se encontraron cobradores."
//           description="Probá con otro nombre, email o código activo."
//         />
//       ) : (
//         <>
//           <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:block">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[1040px] table-fixed text-left text-xs xl:min-w-0">
//                 <colgroup>
//                   <col className="w-[22%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[11%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[15%]" />
//                 </colgroup>

//                 <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//                   <tr>
//                     <th className="px-3 py-2.5 font-medium">Cobrador</th>
//                     <th className="px-3 py-2.5 font-medium">Caja actual</th>
//                     <th className="px-3 py-2.5 font-medium">Total cobrado</th>
//                     <th className="px-3 py-2.5 font-medium">Total cerrado</th>
//                     <th className="px-3 py-2.5 font-medium">Estado</th>
//                     <th className="px-3 py-2.5 font-medium">Código</th>
//                     <th className="px-3 py-2.5 text-right font-medium">
//                       Acción
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
//                   {cobradoresFiltrados.map((cobrador) => (
//                     <tr
//                       key={cobrador.cobradorId}
//                       className="transition hover:bg-slate-50/80 dark:hover:bg-slate-950/35"
//                     >
//                       <td className="px-3 py-3">
//                         <div className="flex min-w-0 items-center gap-2.5">
//                           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                             {getInitials(cobrador)}
//                           </div>

//                           <div className="min-w-0">
//                             <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                               {nombreCompleto(cobrador)}
//                             </p>

//                             <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                               {cobrador.email || "Sin email"}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p
//                           className={`truncate text-xs font-medium ${
//                             cobrador.saldoActual > 0
//                               ? "text-red-700 dark:text-red-300"
//                               : "text-slate-950 dark:text-white"
//                           }`}
//                         >
//                           {formatMoney(cobrador.saldoActual)}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {formatMoney(cobrador.totalCobrado)}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {formatMoney(cobrador.totalCierres)}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <EstadoPill saldoActual={cobrador.saldoActual} />
//                       </td>

//                       <td className="px-3 py-3">
//                         <CodigoPill cobrador={cobrador} />
//                       </td>

//                       <td className="px-3 py-3 text-right">
//                         <GenerarCodigoCierreCajaForm
//                           cobradorId={cobrador.cobradorId}
//                           disabled={cobrador.saldoActual <= 0}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//               <span>
//                 Mostrando {cobradoresFiltrados.length} de {cobradores.length}{" "}
//                 cobradores
//               </span>

//               <span>Gestión de caja</span>
//             </div>
//           </div>

//           <div className="grid gap-3 md:hidden">
//             {cobradoresFiltrados.map((cobrador) => (
//               <div
//                 key={cobrador.cobradorId}
//                 className="rounded-[1.35rem] border border-slate-200 bg-white/85 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex min-w-0 gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-xs font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                       {getInitials(cobrador)}
//                     </div>

//                     <div className="min-w-0">
//                       <h2 className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                         {nombreCompleto(cobrador)}
//                       </h2>

//                       <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
//                         {cobrador.email || "Sin email"}
//                       </p>
//                     </div>
//                   </div>

//                   <EstadoPill saldoActual={cobrador.saldoActual} />
//                 </div>

//                 <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//                   <div className="flex items-center justify-between gap-3">
//                     <span className="inline-flex items-center gap-1.5">
//                       <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Caja actual
//                     </span>

//                     <span
//                       className={`shrink-0 text-right font-medium ${
//                         cobrador.saldoActual > 0
//                           ? "text-red-700 dark:text-red-300"
//                           : "text-cyan-700 dark:text-cyan-300"
//                       }`}
//                     >
//                       {formatMoney(cobrador.saldoActual)}
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-1.5">
//                       <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
//                       Total cobrado
//                     </span>

//                     <span className="text-right">
//                       {formatMoney(cobrador.totalCobrado)}
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-1.5">
//                       <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />
//                       Total cerrado
//                     </span>

//                     <span className="text-right">
//                       {formatMoney(cobrador.totalCierres)}
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-1.5">
//                       <Clock3 className="h-3.5 w-3.5 text-slate-400" />
//                       Código
//                     </span>

//                     <CodigoPill cobrador={cobrador} />
//                   </div>

//                   {cobrador.codigoPendiente ? (
//                     <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                       <span className="inline-flex items-center gap-1.5">
//                         <CalendarClock className="h-3.5 w-3.5 text-slate-400" />
//                         Vence
//                       </span>

//                       <span className="truncate text-right">
//                         {formatDateTime(cobrador.codigoPendiente.venceEn)}
//                       </span>
//                     </div>
//                   ) : null}
//                 </div>

//                 <div className="mt-3">
//                   <GenerarCodigoCierreCajaForm
//                     cobradorId={cobrador.cobradorId}
//                     disabled={cobrador.saldoActual <= 0}
//                     fullWidth
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // src/components/tables/AdminCobradoresCajaTable.tsx

// "use client";

// import { useMemo, useState } from "react";
// import {
//   Banknote,
//   CalendarClock,
//   CheckCircle2,
//   KeyRound,
//   Search,
//   WalletCards,
//   X,
// } from "lucide-react";
// import { GenerarCodigoCierreCajaForm } from "@/components/forms/GenerarCodigoCierreCajaForm";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { CobradorCajaResumenSafe } from "@/types/cobro.types";

// type AdminCobradoresCajaTableProps = {
//   cobradores: CobradorCajaResumenSafe[];
// };

// const cardBase =
//   "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function formatDateTime(value?: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Sin fecha";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   let hours = date.getHours();
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const period = hours >= 12 ? "p. m." : "a. m.";

//   hours = hours % 12;
//   hours = hours === 0 ? 12 : hours;

//   const formattedHours = String(hours).padStart(2, "0");

//   return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${period}`;
// }

// function normalizarTexto(value: string) {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .trim();
// }

// function getInitials(cobrador: CobradorCajaResumenSafe) {
//   const parts = `${cobrador.apellido} ${cobrador.nombre}`
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function nombreCompleto(cobrador: CobradorCajaResumenSafe) {
//   const apellido = cobrador.apellido || "";
//   const nombre = cobrador.nombre || "";

//   if (!apellido && !nombre) return "Cobrador sin nombre";

//   return `${apellido}, ${nombre}`.trim();
// }

// function EstadoPill({ saldoActual }: { saldoActual: number }) {
//   const tieneSaldo = saldoActual > 0;

//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//         tieneSaldo
//           ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300"
//           : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//       }`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {tieneSaldo ? "Pendiente" : "Al día"}
//     </span>
//   );
// }

// function CodigoPill({ cobrador }: { cobrador: CobradorCajaResumenSafe }) {
//   if (!cobrador.codigoPendiente) {
//     return (
//       <span className="inline-flex w-fit items-center gap-1 rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//         Sin código
//       </span>
//     );
//   }

//   return (
//     <span className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
//       <KeyRound className="h-3 w-3" />
//       {cobrador.codigoPendiente.codigo}
//     </span>
//   );
// }

// function MobileCobradorCard({
//   cobrador,
// }: {
//   cobrador: CobradorCajaResumenSafe;
// }) {
//   const tieneSaldo = cobrador.saldoActual > 0;
//   const tieneCodigoPendiente = Boolean(cobrador.codigoPendiente);

//   return (
//     <article className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex min-w-0 gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-semibold text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//             {getInitials(cobrador)}
//           </div>

//           <div className="min-w-0">
//             <h2 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//               {nombreCompleto(cobrador)}
//             </h2>

//             <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
//               {cobrador.email || "Sin email"}
//             </p>
//           </div>
//         </div>

//         <EstadoPill saldoActual={cobrador.saldoActual} />
//       </div>

//       <div className="mt-3 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
//         <div className="flex items-center justify-between gap-3">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <WalletCards className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />
//             <span className="truncate">Caja actual</span>
//           </span>

//           <span
//             className={`shrink-0 text-right font-medium ${
//               tieneSaldo
//                 ? "text-amber-700 dark:text-amber-300"
//                 : "text-cyan-700 dark:text-cyan-300"
//             }`}
//           >
//             {formatMoney(cobrador.saldoActual)}
//           </span>
//         </div>

//         <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-800">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <Banknote className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">Total cobrado</span>
//           </span>

//           <span className="shrink-0 text-right font-medium text-slate-700 dark:text-slate-300">
//             {formatMoney(cobrador.totalCobrado)}
//           </span>
//         </div>

//         <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-800">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">Total cerrado</span>
//           </span>

//           <span className="shrink-0 text-right font-medium text-slate-700 dark:text-slate-300">
//             {formatMoney(cobrador.totalCierres)}
//           </span>
//         </div>

//         <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-800">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <KeyRound className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">Código</span>
//           </span>

//           <CodigoPill cobrador={cobrador} />
//         </div>

//         {cobrador.codigoPendiente ? (
//           <div className="mt-2 flex items-center gap-1.5 border-t border-slate-300 pt-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//             <CalendarClock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">
//               Vence: {formatDateTime(cobrador.codigoPendiente.venceEn)}
//             </span>
//           </div>
//         ) : null}
//       </div>

//       {tieneSaldo && !tieneCodigoPendiente ? (
//         <div className="mt-3">
//           <GenerarCodigoCierreCajaForm
//             cobradorId={cobrador.cobradorId}
//             fullWidth
//           />
//         </div>
//       ) : null}
//     </article>
//   );
// }

// export function AdminCobradoresCajaTable({
//   cobradores,
// }: AdminCobradoresCajaTableProps) {
//   const [busqueda, setBusqueda] = useState("");

//   const cobradoresFiltrados = useMemo(() => {
//     const query = normalizarTexto(busqueda);

//     if (!query) {
//       return cobradores;
//     }

//     return cobradores.filter((cobrador) => {
//       const textoBuscable = normalizarTexto(
//         [
//           cobrador.nombre,
//           cobrador.apellido,
//           cobrador.email,
//           cobrador.saldoActual,
//           cobrador.totalCobrado,
//           cobrador.totalCierres,
//           cobrador.codigoPendiente?.codigo,
//         ]
//           .filter(Boolean)
//           .join(" "),
//       );

//       return textoBuscable.includes(query);
//     });
//   }, [busqueda, cobradores]);

//   if (cobradores.length === 0) {
//     return (
//       <EmptyState
//         title="No hay cobradores registrados."
//         description="Cuando asignes usuarios con rol cobrador, aparecerán en este listado."
//       />
//     );
//   }

//   return (
//     <div className="space-y-3">
//       <div className={`${cardBase} p-3`}>
//         <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full">
//             <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

//             <input
//               type="text"
//               value={busqueda}
//               onChange={(event) => setBusqueda(event.target.value)}
//               placeholder="Buscar por cobrador, email o código"
//               className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 pl-9 pr-9 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-700 dark:focus:bg-slate-900 lg:h-9"
//             />

//             {busqueda ? (
//               <button
//                 type="button"
//                 onClick={() => setBusqueda("")}
//                 className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-500 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-300"
//                 aria-label="Limpiar búsqueda"
//               >
//                 <X className="h-3.5 w-3.5" />
//               </button>
//             ) : null}
//           </div>

//           <div className="flex shrink-0 items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 sm:justify-end">
//             <span>Total: {cobradores.length}</span>
//             <span>Mostrados: {cobradoresFiltrados.length}</span>
//           </div>
//         </div>
//       </div>

//       {cobradoresFiltrados.length === 0 ? (
//         <EmptyState
//           title="No se encontraron cobradores."
//           description="Probá con otro nombre, email o código activo."
//         />
//       ) : (
//         <>
//           <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none lg:block">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[1040px] table-fixed text-left text-xs xl:min-w-0">
//                 <colgroup>
//                   <col className="w-[22%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[11%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[15%]" />
//                 </colgroup>

//                 <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//                   <tr>
//                     <th className="px-3 py-2.5 font-medium">Cobrador</th>
//                     <th className="px-3 py-2.5 font-medium">Caja actual</th>
//                     <th className="px-3 py-2.5 font-medium">Total cobrado</th>
//                     <th className="px-3 py-2.5 font-medium">Total cerrado</th>
//                     <th className="px-3 py-2.5 font-medium">Estado</th>
//                     <th className="px-3 py-2.5 font-medium">Código</th>
//                     <th className="px-3 py-2.5 text-right font-medium">
//                       Acción
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
//                   {cobradoresFiltrados.map((cobrador) => {
//                     const tieneCodigoPendiente = Boolean(
//                       cobrador.codigoPendiente,
//                     );

//                     return (
//                       <tr
//                         key={cobrador.cobradorId}
//                         className="transition hover:bg-slate-50/90 dark:hover:bg-cyan-950/10"
//                       >
//                         <td className="px-3 py-3">
//                           <div className="flex min-w-0 items-center gap-2.5">
//                             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                               {getInitials(cobrador)}
//                             </div>

//                             <div className="min-w-0">
//                               <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                                 {nombreCompleto(cobrador)}
//                               </p>

//                               <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                                 {cobrador.email || "Sin email"}
//                               </p>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-3 py-3">
//                           <p
//                             className={`truncate text-xs font-medium ${
//                               cobrador.saldoActual > 0
//                                 ? "text-amber-700 dark:text-amber-300"
//                                 : "text-slate-950 dark:text-white"
//                             }`}
//                           >
//                             {formatMoney(cobrador.saldoActual)}
//                           </p>
//                         </td>

//                         <td className="px-3 py-3">
//                           <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                             {formatMoney(cobrador.totalCobrado)}
//                           </p>
//                         </td>

//                         <td className="px-3 py-3">
//                           <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                             {formatMoney(cobrador.totalCierres)}
//                           </p>
//                         </td>

//                         <td className="px-3 py-3">
//                           <EstadoPill saldoActual={cobrador.saldoActual} />
//                         </td>

//                         <td className="px-3 py-3">
//                           <CodigoPill cobrador={cobrador} />
//                         </td>

//                         <td className="px-3 py-3 text-right">
//                           <GenerarCodigoCierreCajaForm
//                             cobradorId={cobrador.cobradorId}
//                             disabled={
//                               cobrador.saldoActual <= 0 ||
//                               tieneCodigoPendiente
//                             }
//                           />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//               <span>
//                 Mostrando {cobradoresFiltrados.length} de {cobradores.length}{" "}
//                 cobradores
//               </span>

//               <span>Vista administrativa</span>
//             </div>
//           </div>

//           <div className="grid gap-2 lg:hidden">
//             {cobradoresFiltrados.map((cobrador) => (
//               <MobileCobradorCard
//                 key={cobrador.cobradorId}
//                 cobrador={cobrador}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useMemo, useState } from "react";
// import {
//   Banknote,
//   CalendarClock,
//   Check,
//   CheckCircle2,
//   Copy,
//   KeyRound,
//   Search,
//   WalletCards,
//   X,
// } from "lucide-react";
// import { GenerarCodigoCierreCajaForm } from "@/components/forms/GenerarCodigoCierreCajaForm";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { CobradorCajaResumenSafe } from "@/types/cobro.types";

// type AdminCobradoresCajaTableProps = {
//   cobradores: CobradorCajaResumenSafe[];
// };

// type CodigoModalData = {
//   codigo: string;
//   importe: number;
//   cobradorNombre: string;
//   venceEn: string;
// };

// const cardBase =
//   "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function formatDateTime(value?: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Sin fecha";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   let hours = date.getHours();
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const period = hours >= 12 ? "p. m." : "a. m.";

//   hours = hours % 12;
//   hours = hours === 0 ? 12 : hours;

//   const formattedHours = String(hours).padStart(2, "0");

//   return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${period}`;
// }

// function normalizarTexto(value: string) {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .trim();
// }

// function getInitials(cobrador: CobradorCajaResumenSafe) {
//   const parts = `${cobrador.apellido} ${cobrador.nombre}`
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function nombreCompleto(cobrador: CobradorCajaResumenSafe) {
//   const apellido = cobrador.apellido || "";
//   const nombre = cobrador.nombre || "";

//   if (!apellido && !nombre) return "Cobrador sin nombre";

//   return `${apellido}, ${nombre}`.trim();
// }

// function EstadoPill({ saldoActual }: { saldoActual: number }) {
//   const tieneSaldo = saldoActual > 0;

//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//         tieneSaldo
//           ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300"
//           : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//       }`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {tieneSaldo ? "Pendiente" : "Al día"}
//     </span>
//   );
// }

// function CopyCodigoButton({ codigo }: { codigo: string }) {
//   const [copied, setCopied] = useState(false);

//   async function handleCopy() {
//     try {
//       await navigator.clipboard.writeText(codigo);
//       setCopied(true);

//       window.setTimeout(() => {
//         setCopied(false);
//       }, 1400);
//     } catch {
//       setCopied(false);
//     }
//   }

//   return (
//     <button
//       type="button"
//       onClick={handleCopy}
//       className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-cyan-50 px-4 text-xs font-medium text-cyan-800 transition hover:bg-cyan-100 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
//     >
//       {copied ? (
//         <>
//           <Check className="h-4 w-4" />
//           Copiado
//         </>
//       ) : (
//         <>
//           <Copy className="h-4 w-4" />
//           Copiar código
//         </>
//       )}
//     </button>
//   );
// }

// function CodigoActivoModal({
//   data,
//   onClose,
// }: {
//   data: CodigoModalData | null;
//   onClose: () => void;
// }) {
//   if (!data) return null;

//   return (
//     <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm">
//       <div className="w-full max-w-md overflow-hidden rounded-[1.6rem] border border-slate-300 bg-white shadow-2xl shadow-slate-950/30 dark:border-slate-800 dark:bg-slate-900">
//         <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
//           <div className="flex min-w-0 items-start gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-900">
//               <KeyRound className="h-4 w-4" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
//                 Código activo
//               </p>

//               <h2 className="mt-0.5 truncate text-base font-semibold tracking-tight text-slate-950 dark:text-white">
//                 {data.cobradorNombre}
//               </h2>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
//             aria-label="Cerrar"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>

//         <div className="px-4 py-4">
//           <div className="rounded-[1.35rem] border border-slate-300 bg-slate-50 p-4 text-center shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
//               Código para cerrar caja
//             </p>

//             <p className="mt-3 select-all font-mono text-4xl font-semibold tracking-[0.28em] text-slate-950 dark:text-white sm:text-5xl">
//               {data.codigo}
//             </p>

//             <div className="mt-3 grid gap-1 text-xs text-slate-500 dark:text-slate-400">
//               <p>
//                 Importe exacto:{" "}
//                 <span className="font-medium text-slate-800 dark:text-slate-200">
//                   {formatMoney(data.importe)}
//                 </span>
//               </p>

//               <p>Vence: {formatDateTime(data.venceEn)}</p>
//             </div>

//             <div className="mt-4">
//               <CopyCodigoButton codigo={data.codigo} />
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//           >
//             Cerrar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CodigoPill({
//   cobrador,
//   onOpen,
// }: {
//   cobrador: CobradorCajaResumenSafe;
//   onOpen: (data: CodigoModalData) => void;
// }) {
//   const codigoPendiente = cobrador.codigoPendiente;

//   if (!codigoPendiente) {
//     return (
//       <span className="inline-flex w-fit items-center gap-1 rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//         Sin código
//       </span>
//     );
//   }

//   return (
//     <button
//       type="button"
//       onClick={() =>
//         onOpen({
//           codigo: codigoPendiente.codigo,
//           importe: codigoPendiente.importe,
//           cobradorNombre: nombreCompleto(cobrador),
//           venceEn: codigoPendiente.venceEn,
//         })
//       }
//       className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1 font-mono text-sm font-semibold tracking-[0.12em] text-amber-800 transition hover:bg-amber-100 active:scale-[0.99] dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
//       title="Ver código y copiar"
//     >
//       <KeyRound className="h-3.5 w-3.5" />
//       {codigoPendiente.codigo}
//       <Copy className="h-3.5 w-3.5 opacity-70" />
//     </button>
//   );
// }

// function MobileCobradorCard({
//   cobrador,
//   onOpenCodigo,
// }: {
//   cobrador: CobradorCajaResumenSafe;
//   onOpenCodigo: (data: CodigoModalData) => void;
// }) {
//   const tieneSaldo = cobrador.saldoActual > 0;
//   const tieneCodigoPendiente = Boolean(cobrador.codigoPendiente);

//   return (
//     <article className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex min-w-0 gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-semibold text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//             {getInitials(cobrador)}
//           </div>

//           <div className="min-w-0">
//             <h2 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//               {nombreCompleto(cobrador)}
//             </h2>

//             <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
//               {cobrador.email || "Sin email"}
//             </p>
//           </div>
//         </div>

//         <EstadoPill saldoActual={cobrador.saldoActual} />
//       </div>

//       <div className="mt-3 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
//         <div className="flex items-center justify-between gap-3">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <WalletCards className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />
//             <span className="truncate">Caja actual</span>
//           </span>

//           <span
//             className={`shrink-0 text-right font-medium ${
//               tieneSaldo
//                 ? "text-amber-700 dark:text-amber-300"
//                 : "text-cyan-700 dark:text-cyan-300"
//             }`}
//           >
//             {formatMoney(cobrador.saldoActual)}
//           </span>
//         </div>

//         <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-800">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <Banknote className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">Total cobrado</span>
//           </span>

//           <span className="shrink-0 text-right font-medium text-slate-700 dark:text-slate-300">
//             {formatMoney(cobrador.totalCobrado)}
//           </span>
//         </div>

//         <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-800">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">Total cerrado</span>
//           </span>

//           <span className="shrink-0 text-right font-medium text-slate-700 dark:text-slate-300">
//             {formatMoney(cobrador.totalCierres)}
//           </span>
//         </div>

//         <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-800">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <KeyRound className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">Código</span>
//           </span>

//           <CodigoPill cobrador={cobrador} onOpen={onOpenCodigo} />
//         </div>

//         {cobrador.codigoPendiente ? (
//           <div className="mt-2 flex items-center gap-1.5 border-t border-slate-300 pt-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//             <CalendarClock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">
//               Vence: {formatDateTime(cobrador.codigoPendiente.venceEn)}
//             </span>
//           </div>
//         ) : null}
//       </div>

//       {tieneSaldo && !tieneCodigoPendiente ? (
//         <div className="mt-3">
//           <GenerarCodigoCierreCajaForm
//             cobradorId={cobrador.cobradorId}
//             fullWidth
//           />
//         </div>
//       ) : null}
//     </article>
//   );
// }

// export function AdminCobradoresCajaTable({
//   cobradores,
// }: AdminCobradoresCajaTableProps) {
//   const [busqueda, setBusqueda] = useState("");
//   const [codigoModal, setCodigoModal] = useState<CodigoModalData | null>(null);

//   const cobradoresFiltrados = useMemo(() => {
//     const query = normalizarTexto(busqueda);

//     if (!query) {
//       return cobradores;
//     }

//     return cobradores.filter((cobrador) => {
//       const textoBuscable = normalizarTexto(
//         [
//           cobrador.nombre,
//           cobrador.apellido,
//           cobrador.email,
//           cobrador.saldoActual,
//           cobrador.totalCobrado,
//           cobrador.totalCierres,
//           cobrador.codigoPendiente?.codigo,
//         ]
//           .filter(Boolean)
//           .join(" "),
//       );

//       return textoBuscable.includes(query);
//     });
//   }, [busqueda, cobradores]);

//   if (cobradores.length === 0) {
//     return (
//       <EmptyState
//         title="No hay cobradores registrados."
//         description="Cuando asignes usuarios con rol cobrador, aparecerán en este listado."
//       />
//     );
//   }

//   return (
//     <>
//       <div className="space-y-3">
//         <div className={`${cardBase} p-3`}>
//           <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
//             <div className="relative w-full">
//               <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

//               <input
//                 type="text"
//                 value={busqueda}
//                 onChange={(event) => setBusqueda(event.target.value)}
//                 placeholder="Buscar por cobrador, email o código"
//                 className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 pl-9 pr-9 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-700 dark:focus:bg-slate-900 lg:h-9"
//               />

//               {busqueda ? (
//                 <button
//                   type="button"
//                   onClick={() => setBusqueda("")}
//                   className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-500 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-300"
//                   aria-label="Limpiar búsqueda"
//                 >
//                   <X className="h-3.5 w-3.5" />
//                 </button>
//               ) : null}
//             </div>

//             <div className="flex shrink-0 items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 sm:justify-end">
//               <span>Total: {cobradores.length}</span>
//               <span>Mostrados: {cobradoresFiltrados.length}</span>
//             </div>
//           </div>
//         </div>

//         {cobradoresFiltrados.length === 0 ? (
//           <EmptyState
//             title="No se encontraron cobradores."
//             description="Probá con otro nombre, email o código activo."
//           />
//         ) : (
//           <>
//             <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none lg:block">
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[1040px] table-fixed text-left text-xs xl:min-w-0">
//                   <colgroup>
//                     <col className="w-[22%]" />
//                     <col className="w-[13%]" />
//                     <col className="w-[13%]" />
//                     <col className="w-[13%]" />
//                     <col className="w-[11%]" />
//                     <col className="w-[13%]" />
//                     <col className="w-[15%]" />
//                   </colgroup>

//                   <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//                     <tr>
//                       <th className="px-3 py-2.5 font-medium">Cobrador</th>
//                       <th className="px-3 py-2.5 font-medium">Caja actual</th>
//                       <th className="px-3 py-2.5 font-medium">Total cobrado</th>
//                       <th className="px-3 py-2.5 font-medium">Total cerrado</th>
//                       <th className="px-3 py-2.5 font-medium">Estado</th>
//                       <th className="px-3 py-2.5 font-medium">Código</th>
//                       <th className="px-3 py-2.5 text-right font-medium">
//                         Acción
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
//                     {cobradoresFiltrados.map((cobrador) => {
//                       const tieneCodigoPendiente = Boolean(
//                         cobrador.codigoPendiente,
//                       );

//                       return (
//                         <tr
//                           key={cobrador.cobradorId}
//                           className="transition hover:bg-slate-50/90 dark:hover:bg-cyan-950/10"
//                         >
//                           <td className="px-3 py-3">
//                             <div className="flex min-w-0 items-center gap-2.5">
//                               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                                 {getInitials(cobrador)}
//                               </div>

//                               <div className="min-w-0">
//                                 <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                                   {nombreCompleto(cobrador)}
//                                 </p>

//                                 <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                                   {cobrador.email || "Sin email"}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>

//                           <td className="px-3 py-3">
//                             <p
//                               className={`truncate text-xs font-medium ${
//                                 cobrador.saldoActual > 0
//                                   ? "text-amber-700 dark:text-amber-300"
//                                   : "text-slate-950 dark:text-white"
//                               }`}
//                             >
//                               {formatMoney(cobrador.saldoActual)}
//                             </p>
//                           </td>

//                           <td className="px-3 py-3">
//                             <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                               {formatMoney(cobrador.totalCobrado)}
//                             </p>
//                           </td>

//                           <td className="px-3 py-3">
//                             <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                               {formatMoney(cobrador.totalCierres)}
//                             </p>
//                           </td>

//                           <td className="px-3 py-3">
//                             <EstadoPill saldoActual={cobrador.saldoActual} />
//                           </td>

//                           <td className="px-3 py-3">
//                             <CodigoPill
//                               cobrador={cobrador}
//                               onOpen={setCodigoModal}
//                             />
//                           </td>

//                           <td className="px-3 py-3 text-right">
//                             <GenerarCodigoCierreCajaForm
//                               cobradorId={cobrador.cobradorId}
//                               disabled={
//                                 cobrador.saldoActual <= 0 ||
//                                 tieneCodigoPendiente
//                               }
//                             />
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//                 <span>
//                   Mostrando {cobradoresFiltrados.length} de {cobradores.length}{" "}
//                   cobradores
//                 </span>

//                 <span>Vista administrativa</span>
//               </div>
//             </div>

//             <div className="grid gap-2 lg:hidden">
//               {cobradoresFiltrados.map((cobrador) => (
//                 <MobileCobradorCard
//                   key={cobrador.cobradorId}
//                   cobrador={cobrador}
//                   onOpenCodigo={setCodigoModal}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       <CodigoActivoModal
//         data={codigoModal}
//         onClose={() => setCodigoModal(null)}
//       />
//     </>
//   );
// }

// "use client";

// import { useMemo, useState } from "react";
// import {
//   Banknote,
//   CalendarClock,
//   Check,
//   CheckCircle2,
//   Copy,
//   KeyRound,
//   Search,
//   WalletCards,
//   X,
// } from "lucide-react";
// import { GenerarCodigoCierreCajaForm } from "@/components/forms/GenerarCodigoCierreCajaForm";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { CobradorCajaResumenSafe } from "@/types/cobro.types";

// type AdminCobradoresCajaTableProps = {
//   cobradores: CobradorCajaResumenSafe[];
// };

// type CodigoModalData = {
//   codigo: string;
//   importe: number;
//   cobradorNombre: string;
//   venceEn: string;
// };

// const panelClass =
//   "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

// const innerPanelClass =
//   "overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none";

// const inputClass =
//   "h-8 w-full rounded-lg border border-slate-300 bg-white px-2.5 pl-8 pr-8 text-[12px] font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500";

// const buttonPrimaryClass =
//   "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-blue-600 bg-blue-600 px-3 !text-[12px] !font-medium !leading-none text-white shadow-sm shadow-blue-950/10 transition hover:border-blue-700 hover:bg-blue-700 active:scale-[0.99] dark:border-blue-500 dark:bg-blue-500 dark:text-white dark:hover:border-blue-600 dark:hover:bg-blue-600";

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function formatDateTime(value?: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin fecha";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month}/${year}, ${hours}:${minutes}`;
// }

// function normalizarTexto(value: string) {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .trim();
// }

// function getInitials(cobrador: CobradorCajaResumenSafe) {
//   const parts = `${cobrador.apellido} ${cobrador.nombre}`
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function nombreCompleto(cobrador: CobradorCajaResumenSafe) {
//   const apellido = cobrador.apellido || "";
//   const nombre = cobrador.nombre || "";

//   if (!apellido && !nombre) return "Cobrador sin nombre";

//   return `${apellido}, ${nombre}`.trim();
// }

// function EstadoPill({ saldoActual }: { saldoActual: number }) {
//   const tieneSaldo = saldoActual > 0;

//   return (
//     <span
//       className={`inline-flex h-6 w-fit items-center gap-1 rounded-full border px-2 text-[10px] font-semibold leading-none ${
//         tieneSaldo
//           ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300"
//           : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//       }`}
//     >
//       {tieneSaldo ? "Pendiente" : "Al día"}
//     </span>
//   );
// }

// function CopyCodigoButton({ codigo }: { codigo: string }) {
//   const [copied, setCopied] = useState(false);

//   async function handleCopy() {
//     try {
//       await navigator.clipboard.writeText(codigo);
//       setCopied(true);

//       window.setTimeout(() => {
//         setCopied(false);
//       }, 1400);
//     } catch {
//       setCopied(false);
//     }
//   }

//   return (
//     <button type="button" onClick={handleCopy} className={`${buttonPrimaryClass} w-full`}>
//       {copied ? (
//         <>
//           <Check className="h-3.5 w-3.5 text-white" />
//           <span className="text-[12px] leading-none text-white">Copiado</span>
//         </>
//       ) : (
//         <>
//           <Copy className="h-3.5 w-3.5 text-white" />
//           <span className="text-[12px] leading-none text-white">
//             Copiar código
//           </span>
//         </>
//       )}
//     </button>
//   );
// }

// function CodigoActivoModal({
//   data,
//   onClose,
// }: {
//   data: CodigoModalData | null;
//   onClose: () => void;
// }) {
//   if (!data) return null;

//   return (
//     <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm">
//       <div className="w-full max-w-md overflow-hidden rounded-xl border border-slate-300 bg-white shadow-2xl shadow-slate-950/30 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-800/80">
//         <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
//           <div className="flex min-w-0 items-start gap-3">
//             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300">
//               <KeyRound className="h-4 w-4" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
//                 Código activo
//               </p>

//               <h2 className="mt-0.5 truncate text-sm font-semibold tracking-tight text-slate-950 dark:text-white">
//                 {data.cobradorNombre}
//               </h2>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
//             aria-label="Cerrar"
//           >
//             <X className="h-3.5 w-3.5" />
//           </button>
//         </div>

//         <div className="px-4 py-4">
//           <div className="rounded-lg border border-slate-300 bg-slate-50 p-4 text-center shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/55 dark:shadow-black/10">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//               Código para cerrar caja
//             </p>

//             <p className="mt-3 select-all font-mono text-4xl font-semibold tracking-[0.28em] text-slate-950 dark:text-white sm:text-5xl">
//               {data.codigo}
//             </p>

//             <div className="mt-3 grid gap-1 text-[12px] text-slate-500 dark:text-slate-400">
//               <p>
//                 Importe exacto:{" "}
//                 <span className="font-semibold text-slate-800 dark:text-slate-200">
//                   {formatMoney(data.importe)}
//                 </span>
//               </p>

//               <p>Vence: {formatDateTime(data.venceEn)}</p>
//             </div>

//             <div className="mt-4">
//               <CopyCodigoButton codigo={data.codigo} />
//             </div>
//           </div>

//           <button type="button" onClick={onClose} className={`${buttonPrimaryClass} mt-4 w-full`}>
//             <span className="text-[12px] leading-none text-white">Cerrar</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CodigoPill({
//   cobrador,
//   onOpen,
// }: {
//   cobrador: CobradorCajaResumenSafe;
//   onOpen: (data: CodigoModalData) => void;
// }) {
//   const codigoPendiente = cobrador.codigoPendiente;

//   if (!codigoPendiente) {
//     return (
//       <span className="inline-flex h-6 w-fit items-center rounded-full border border-slate-300 bg-slate-50 px-2 text-[10px] font-semibold leading-none text-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
//         Sin código
//       </span>
//     );
//   }

//   return (
//     <button
//       type="button"
//       onClick={() =>
//         onOpen({
//           codigo: codigoPendiente.codigo,
//           importe: codigoPendiente.importe,
//           cobradorNombre: nombreCompleto(cobrador),
//           venceEn: codigoPendiente.venceEn,
//         })
//       }
//       className="inline-flex h-7 w-fit items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-2 font-mono text-[12px] font-semibold tracking-[0.12em] text-amber-800 transition hover:bg-amber-100 active:scale-[0.99] dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300 dark:hover:bg-amber-950/60"
//       title="Ver código y copiar"
//     >
//       <KeyRound className="h-3 w-3" />
//       {codigoPendiente.codigo}
//       <Copy className="h-3 w-3 opacity-70" />
//     </button>
//   );
// }

// function MobileCobradorCard({
//   cobrador,
//   onOpenCodigo,
// }: {
//   cobrador: CobradorCajaResumenSafe;
//   onOpenCodigo: (data: CodigoModalData) => void;
// }) {
//   const tieneSaldo = cobrador.saldoActual > 0;
//   const tieneCodigoPendiente = Boolean(cobrador.codigoPendiente);

//   return (
//     <article className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2.5 shadow-sm shadow-slate-300/35 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/15 dark:ring-slate-800/80">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex min-w-0 gap-2.5">
//           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-[10px] font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
//             {getInitials(cobrador)}
//           </div>

//           <div className="min-w-0">
//             <h2 className="truncate text-[13px] font-semibold text-slate-950 dark:text-white">
//               {nombreCompleto(cobrador)}
//             </h2>

//             <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
//               {cobrador.email || "Sin email"}
//             </p>
//           </div>
//         </div>

//         <EstadoPill saldoActual={cobrador.saldoActual} />
//       </div>

//       <div className="mt-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
//         <div className="flex items-center justify-between gap-3">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <WalletCards className="h-3.5 w-3.5 shrink-0 text-blue-700 dark:text-blue-300" />
//             <span className="truncate">Caja actual</span>
//           </span>

//           <span
//             className={`shrink-0 text-right font-semibold ${
//               tieneSaldo
//                 ? "text-amber-700 dark:text-amber-300"
//                 : "text-emerald-700 dark:text-emerald-300"
//             }`}
//           >
//             {formatMoney(cobrador.saldoActual)}
//           </span>
//         </div>

//         <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-700">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <Banknote className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">Total cobrado</span>
//           </span>

//           <span className="shrink-0 text-right font-semibold text-slate-700 dark:text-slate-300">
//             {formatMoney(cobrador.totalCobrado)}
//           </span>
//         </div>

//         <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-700">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">Total cerrado</span>
//           </span>

//           <span className="shrink-0 text-right font-semibold text-slate-700 dark:text-slate-300">
//             {formatMoney(cobrador.totalCierres)}
//           </span>
//         </div>

//         <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-700">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <KeyRound className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">Código</span>
//           </span>

//           <CodigoPill cobrador={cobrador} onOpen={onOpenCodigo} />
//         </div>

//         {cobrador.codigoPendiente ? (
//           <div className="mt-2 flex items-center gap-1.5 border-t border-slate-300 pt-2 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
//             <CalendarClock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//             <span className="truncate">
//               Vence: {formatDateTime(cobrador.codigoPendiente.venceEn)}
//             </span>
//           </div>
//         ) : null}
//       </div>

//       {tieneSaldo && !tieneCodigoPendiente ? (
//         <div className="mt-2">
//           <GenerarCodigoCierreCajaForm
//             cobradorId={cobrador.cobradorId}
//             fullWidth
//           />
//         </div>
//       ) : null}
//     </article>
//   );
// }

// export function AdminCobradoresCajaTable({
//   cobradores,
// }: AdminCobradoresCajaTableProps) {
//   const [busqueda, setBusqueda] = useState("");
//   const [codigoModal, setCodigoModal] = useState<CodigoModalData | null>(null);

//   const cobradoresFiltrados = useMemo(() => {
//     const query = normalizarTexto(busqueda);

//     if (!query) return cobradores;

//     return cobradores.filter((cobrador) => {
//       const textoBuscable = normalizarTexto(
//         [
//           cobrador.nombre,
//           cobrador.apellido,
//           cobrador.email,
//           cobrador.saldoActual,
//           cobrador.totalCobrado,
//           cobrador.totalCierres,
//           cobrador.codigoPendiente?.codigo,
//         ]
//           .filter(Boolean)
//           .join(" "),
//       );

//       return textoBuscable.includes(query);
//     });
//   }, [busqueda, cobradores]);

//   if (cobradores.length === 0) {
//     return (
//       <section className={`${panelClass} p-4`}>
//         <EmptyState
//           title="No hay cobradores registrados."
//           description="Cuando asignes usuarios con rol cobrador, aparecerán en este listado."
//         />
//       </section>
//     );
//   }

//   return (
//     <>
//       <section className={`${panelClass} p-3.5`}>
//         <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full">
//             <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

//             <input
//               type="text"
//               value={busqueda}
//               onChange={(event) => setBusqueda(event.target.value)}
//               placeholder="Buscar por cobrador, email o código"
//               className={inputClass}
//             />

//             {busqueda ? (
//               <button
//                 type="button"
//                 onClick={() => setBusqueda("")}
//                 className="absolute right-1.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-500 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
//                 aria-label="Limpiar búsqueda"
//               >
//                 <X className="h-3.5 w-3.5" />
//               </button>
//             ) : null}
//           </div>

//           <div className="flex shrink-0 items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 sm:justify-end">
//             <span>Total: {cobradores.length}</span>
//             <span>Mostrados: {cobradoresFiltrados.length}</span>
//           </div>
//         </div>
//       </section>

//       <div className="mt-3">
//         {cobradoresFiltrados.length === 0 ? (
//           <section className={`${panelClass} p-4`}>
//             <EmptyState
//               title="No se encontraron cobradores."
//               description="Probá con otro nombre, email o código activo."
//             />
//           </section>
//         ) : (
//           <>
//             <div className={`${innerPanelClass} hidden lg:block`}>
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[1040px] table-fixed text-left text-[12px] xl:min-w-0">
//                   <colgroup>
//                     <col className="w-[22%]" />
//                     <col className="w-[13%]" />
//                     <col className="w-[13%]" />
//                     <col className="w-[13%]" />
//                     <col className="w-[11%]" />
//                     <col className="w-[13%]" />
//                     <col className="w-[15%]" />
//                   </colgroup>

//                   <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.08em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
//                     <tr>
//                       <th className="px-3 py-2.5 font-medium">Cobrador</th>
//                       <th className="px-3 py-2.5 font-medium">Caja actual</th>
//                       <th className="px-3 py-2.5 font-medium">
//                         Total cobrado
//                       </th>
//                       <th className="px-3 py-2.5 font-medium">
//                         Total cerrado
//                       </th>
//                       <th className="px-3 py-2.5 font-medium">Estado</th>
//                       <th className="px-3 py-2.5 font-medium">Código</th>
//                       <th className="px-3 py-2.5 text-right font-medium">
//                         Acción
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//                     {cobradoresFiltrados.map((cobrador) => {
//                       const tieneCodigoPendiente = Boolean(
//                         cobrador.codigoPendiente,
//                       );

//                       return (
//                         <tr
//                           key={cobrador.cobradorId}
//                           className="transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
//                         >
//                           <td className="px-3 py-2.5">
//                             <div className="flex min-w-0 items-center gap-2.5">
//                               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-[10px] font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
//                                 {getInitials(cobrador)}
//                               </div>

//                               <div className="min-w-0">
//                                 <p className="truncate text-[12px] font-semibold text-slate-950 dark:text-white">
//                                   {nombreCompleto(cobrador)}
//                                 </p>

//                                 <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                                   {cobrador.email || "Sin email"}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>

//                           <td className="px-3 py-2.5">
//                             <p
//                               className={`truncate text-[12px] font-semibold ${
//                                 cobrador.saldoActual > 0
//                                   ? "text-amber-700 dark:text-amber-300"
//                                   : "text-emerald-700 dark:text-emerald-300"
//                               }`}
//                             >
//                               {formatMoney(cobrador.saldoActual)}
//                             </p>
//                           </td>

//                           <td className="px-3 py-2.5">
//                             <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                               {formatMoney(cobrador.totalCobrado)}
//                             </p>
//                           </td>

//                           <td className="px-3 py-2.5">
//                             <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                               {formatMoney(cobrador.totalCierres)}
//                             </p>
//                           </td>

//                           <td className="px-3 py-2.5">
//                             <EstadoPill saldoActual={cobrador.saldoActual} />
//                           </td>

//                           <td className="px-3 py-2.5">
//                             <CodigoPill
//                               cobrador={cobrador}
//                               onOpen={setCodigoModal}
//                             />
//                           </td>

//                           <td className="px-3 py-2.5 text-right">
//                             <GenerarCodigoCierreCajaForm
//                               cobradorId={cobrador.cobradorId}
//                               disabled={
//                                 cobrador.saldoActual <= 0 ||
//                                 tieneCodigoPendiente
//                               }
//                             />
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
//                 <span>
//                   Mostrando {cobradoresFiltrados.length} de {cobradores.length}{" "}
//                   cobradores
//                 </span>

//                 <span>Vista administrativa</span>
//               </div>
//             </div>

//             <div className="grid gap-2.5 lg:hidden">
//               {cobradoresFiltrados.map((cobrador) => (
//                 <MobileCobradorCard
//                   key={cobrador.cobradorId}
//                   cobrador={cobrador}
//                   onOpenCodigo={setCodigoModal}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       <CodigoActivoModal
//         data={codigoModal}
//         onClose={() => setCodigoModal(null)}
//       />
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { ClickableCollectorRow } from "@/components/tables/ClickableCollectorRow";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, KeyRound, Search, UsersRound, X } from "lucide-react";
import { GenerarCodigoCierreCajaForm } from "@/components/forms/GenerarCodigoCierreCajaForm";
import type { CobradorCajaResumenSafe, CodigoCierreCajaSafe } from "@/types/cobro.types";
import { cajaStyles as styles } from "@/components/ui/dashboard-styles";

type CodeData = { codigo: CodigoCierreCajaSafe; nombre: string };

function money(value: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 2 }).format(value || 0);
}
function date(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "—" : new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  }).format(parsed);
}
function normalize(value: string) { return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); }
function name(cobrador: CobradorCajaResumenSafe) { return [cobrador.apellido, cobrador.nombre].filter(Boolean).join(", ") || cobrador.email || "Cobrador"; }
function balanceColor(saldo: number) { return saldo > 0 ? styles.amber : saldo < 0 ? styles.blue : styles.green; }
function Status({ saldo }: { saldo: number }) {
  return <span className={`${styles.badge} ${saldo > 0 ? styles.amberBadge : saldo < 0 ? styles.blueBadge : styles.greenBadge}`}>{saldo > 0 ? "Pendiente" : saldo < 0 ? "Saldo negativo" : "Al día"}</span>;
}
function Person({ cobrador }: { cobrador: CobradorCajaResumenSafe }) {
  const initials = `${cobrador.nombre.trim().charAt(0)}${cobrador.apellido.trim().charAt(0)}`.toUpperCase() || "CO";
  return <Link href={`/admin/caja-cobradores/${cobrador.cobradorId}`} className={`${styles.person} !text-inherit !no-underline focus-visible:outline-2 focus-visible:outline-[var(--overview-blue)]`} aria-label={`Abrir caja de ${name(cobrador)}`}>
    <span className={styles.avatar} aria-hidden="true">{initials}</span>
    <div><span className={styles.personName}>{name(cobrador)}</span><span className={styles.email}>{cobrador.email || "Sin email"}</span></div>
  </Link>;
}
function CodeButton({ cobrador, open }: { cobrador: CobradorCajaResumenSafe; open: (data: CodeData) => void }) {
  const codigo = cobrador.codigoPendiente;
  return codigo ? <button type="button" className={styles.codeButton} onClick={() => open({ codigo, nombre: name(cobrador) })} title={`Vence ${date(codigo.venceEn)}`} aria-label={`Ver y copiar código de ${name(cobrador)}`}>
    <KeyRound aria-hidden="true" />{codigo.codigo}<Copy aria-hidden="true" />
  </button> : <span className={styles.muted}>Sin código</span>;
}
function CodeDialog({ data, close }: { data: CodeData | null; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    setFeedback("");
    const dialog = ref.current;
    if (data && dialog && !dialog.open) dialog.showModal();
    if (!data && dialog?.open) dialog.close();
  }, [data]);
  async function copy() {
    if (!data) return;
    try { await navigator.clipboard.writeText(data.codigo.codigo); setFeedback("Código copiado."); }
    catch { setFeedback("No se pudo copiar. Podés seleccionar el código y copiarlo manualmente."); }
  }
  return <dialog ref={ref} className={styles.dialog} aria-labelledby="active-code-title" onCancel={close} onClose={close}>
    <div className={styles.panelHeader}>
      <h2 id="active-code-title" className={styles.panelTitle}><KeyRound aria-hidden="true" /> Código de cierre activo</h2>
      <button type="button" className={styles.iconButton} aria-label="Cerrar código" onClick={close}><X aria-hidden="true" /></button>
    </div>
    {data && <div className={styles.dialogBody}>
      <p>{data.nombre}</p><code className={styles.bigCode}>{data.codigo.codigo}</code>
      <dl className={styles.dialogFacts}><div><dt>Importe del cierre</dt><dd>{money(data.codigo.importe)}</dd></div><div><dt>Vence</dt><dd>{date(data.codigo.venceEn)}</dd></div></dl>
      <button type="button" className={styles.button} onClick={copy}>{feedback === "Código copiado." ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />} Copiar código</button>
      <span className={styles.copyFeedback} role="status">{feedback}</span>
    </div>}
  </dialog>;
}

export function AdminCobradoresCajaTable({ cobradores }: { cobradores: CobradorCajaResumenSafe[] }) {
  const [search, setSearch] = useState("");
  const [code, setCode] = useState<CodeData | null>(null);
  const filtered = useMemo(() => {
    const query = normalize(search);
    return query ? cobradores.filter((c) => normalize([c.nombre, c.apellido, c.email, c.saldoActual, c.totalCobrado, c.totalCierres, c.codigoPendiente?.codigo].filter((v) => v !== null && v !== undefined).join(" ")).includes(query)) : cobradores;
  }, [cobradores, search]);

  return <>
    <section className={styles.panel}>
      <div className={styles.panelHeader}><h2 className={styles.panelTitle}><UsersRound aria-hidden="true" /> Cajas por cobrador</h2><span className={styles.count}>{cobradores.length} cobradores</span></div>
      {cobradores.length > 0 && <div className={styles.toolbar}>
        <div className={styles.search}><Search aria-hidden="true" />
          <input aria-label="Buscar cobradores" placeholder="Buscar por nombre, email o código" value={search} onChange={(event) => setSearch(event.target.value)} />
          {search && <button type="button" className={styles.iconButton} aria-label="Limpiar búsqueda" onClick={() => setSearch("")}><X aria-hidden="true" /></button>}
        </div><span aria-live="polite">{filtered.length} de {cobradores.length} cobradores</span>
      </div>}
      {filtered.length === 0 ? <div className={styles.empty}><UsersRound aria-hidden="true" /><span>{cobradores.length ? "No se encontraron cobradores." : "No hay cobradores registrados."}</span><p>{cobradores.length ? "Probá con otro nombre, email o código." : "Los usuarios con rol cobrador aparecerán en este listado."}</p></div> : <>
        <div className={styles.desktopTable}>
          <table className={styles.table} aria-label="Saldos y códigos de cobradores">
            <thead><tr><th scope="col">Cobrador</th><th scope="col" className={styles.right}>Caja actual</th><th scope="col" className={styles.right}>Total cobrado</th><th scope="col" className={styles.right}>Total cerrado</th><th scope="col">Estado</th><th scope="col">Código activo</th><th scope="col" className={styles.right}>Acción</th></tr></thead>
            <tbody>{filtered.map((c) => <ClickableCollectorRow key={c.cobradorId} href={`/admin/caja-cobradores/${c.cobradorId}`}>
              <td><Person cobrador={c} /></td>
              <td className={`${styles.right} ${styles.money} ${balanceColor(c.saldoActual)}`}>{money(c.saldoActual)}</td>
              <td className={`${styles.right} ${styles.money}`}>{money(c.totalCobrado)}</td>
              <td className={`${styles.right} ${styles.money}`}>{money(c.totalCierres)}</td>
              <td><Status saldo={c.saldoActual} /></td>
              <td><CodeButton cobrador={c} open={setCode} /></td>
              <td className={styles.right}><GenerarCodigoCierreCajaForm cobradorId={c.cobradorId} disabled={c.saldoActual <= 0 || Boolean(c.codigoPendiente)} /></td>
            </ClickableCollectorRow>)}</tbody>
          </table>
        </div>
        <div className={styles.cards}>{filtered.map((c) => <article className={styles.card} key={c.cobradorId}>
          <div className={styles.cardTop}><Person cobrador={c} /><Status saldo={c.saldoActual} /></div>
          <div className={styles.cardBalance}><span>Caja actual</span><strong className={balanceColor(c.saldoActual)}>{money(c.saldoActual)}</strong></div>
          <div className={styles.totals}><div><span>Total cobrado</span><strong>{money(c.totalCobrado)}</strong></div><div><span>Total cerrado</span><strong>{money(c.totalCierres)}</strong></div></div>
          <div className={styles.cardCode}><span className={styles.muted}>Código de cierre</span><CodeButton cobrador={c} open={setCode} /></div>
          {c.codigoPendiente && <span className={styles.codeMeta}>Importe: {money(c.codigoPendiente.importe)} · Vence {date(c.codigoPendiente.venceEn)}</span>}
          {c.saldoActual > 0 && !c.codigoPendiente && <div className={styles.generate}><GenerarCodigoCierreCajaForm cobradorId={c.cobradorId} fullWidth /></div>}
        </article>)}</div>
        <div className={styles.footer}>Mostrando {filtered.length} de {cobradores.length} cobradores</div>
      </>}
    </section>
    <CodeDialog data={code} close={() => setCode(null)} />
  </>;
}

export function AdminCodigoCierreCaja({ cobrador }: { cobrador: CobradorCajaResumenSafe }) {
  const [code, setCode] = useState<CodeData | null>(null);
  return <><CodeButton cobrador={cobrador} open={setCode} /><CodeDialog data={code} close={() => setCode(null)} /></>;
}
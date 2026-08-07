// // src/components/tables/ClientesTable.tsx

// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import {
//   Eye,
//   FileText,
//   IdCard,
//   MapPin,
//   Pencil,
//   Search,
//   Trash2,
//   UserRound,
//   Wifi,
//   X,
// } from "lucide-react";
// import { eliminarClienteAction } from "@/actions/cliente.actions";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { ClienteSafe } from "@/types/cliente.types";

// type ClientesTableProps = {
//   clientes: ClienteSafe[];
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
//   if (estado === "suspendido") return "Suspendido";
//   return "Baja";
// }

// function estadoClass(estado: string) {
//   if (estado === "activo") {
//     return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   if (estado === "suspendido") {
//     return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
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

// function getInitials(cliente: ClienteSafe) {
//   const parts = `${cliente.nombre} ${cliente.apellido}`
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CL";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
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

// function ActionIconLink({
//   href,
//   title,
//   icon,
// }: {
//   href: string;
//   title: string;
//   icon: React.ReactNode;
// }) {
//   return (
//     <Link
//       href={href}
//       className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//       title={title}
//     >
//       {icon}
//     </Link>
//   );
// }

// export function ClientesTable({ clientes }: ClientesTableProps) {
//   const [busqueda, setBusqueda] = useState("");

//   const clientesFiltrados = useMemo(() => {
//     const query = normalizarTexto(busqueda);

//     if (!query) {
//       return clientes;
//     }

//     return clientes.filter((cliente) => {
//       const textoBuscable = normalizarTexto(
//         [
//           cliente.numeroCliente,
//           cliente.nombre,
//           cliente.apellido,
//           cliente.dni,
//           cliente.direccion,
//           cliente.localidad,
//           cliente.provincia,
//           cliente.telefono,
//           cliente.email,
//           cliente.estado,
//           cliente.plan?.nombre,
//           cliente.plan?.tipo,
//           cliente.plan?.detalle,
//           cliente.plan?.importe,
//         ]
//           .filter(Boolean)
//           .join(" "),
//       );

//       return textoBuscable.includes(query);
//     });
//   }, [busqueda, clientes]);

//   if (clientes.length === 0) {
//     return (
//       <EmptyState
//         title="No hay clientes cargados."
//         description="Creá el primer cliente desde el botón superior para empezar a gestionar planes, facturación y estado de cuenta."
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
//               placeholder="Buscar por cliente, DNI, número, localidad o plan"
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
//             <span>Total: {clientes.length}</span>
//             <span>Mostrados: {clientesFiltrados.length}</span>
//           </div>
//         </div>
//       </div>

//       {clientesFiltrados.length === 0 ? (
//         <EmptyState
//           title="No se encontraron clientes."
//           description="Probá con otro nombre, DNI, número de cliente, localidad o plan."
//         />
//       ) : (
//         <>
//           <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:block">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[1040px] table-fixed text-left text-xs xl:min-w-0">
//                 <colgroup>
//                   <col className="w-[7%]" />
//                   <col className="w-[20%]" />
//                   <col className="w-[10%]" />
//                   <col className="w-[18%]" />
//                   <col className="w-[16%]" />
//                   <col className="w-[15%]" />
//                   <col className="w-[9%]" />
//                   <col className="w-[15%]" />
//                 </colgroup>

//                 <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//                   <tr>
//                     <th className="px-3 py-2.5 font-medium">N°</th>
//                     <th className="px-3 py-2.5 font-medium">Cliente</th>
//                     <th className="px-3 py-2.5 font-medium">DNI</th>
//                     <th className="px-3 py-2.5 font-medium">Dirección</th>
//                     <th className="px-3 py-2.5 font-medium">Localidad</th>
//                     <th className="px-3 py-2.5 font-medium">Plan</th>
//                     <th className="px-3 py-2.5 font-medium">Estado</th>
//                     <th className="px-3 py-2.5 text-right font-medium">
//                       Acciones
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
//                   {clientesFiltrados.map((cliente) => (
//                     <tr
//                       key={cliente.id}
//                       className="transition hover:bg-slate-50/80 dark:hover:bg-slate-950/35"
//                     >
//                       <td className="px-3 py-3">
//                         <span className="inline-flex rounded-lg bg-cyan-50 px-2 py-1 text-[10px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                           {cliente.numeroCliente}
//                         </span>
//                       </td>

//                       <td className="px-3 py-3">
//                         <div className="flex min-w-0 items-center gap-2.5">
//                           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                             {getInitials(cliente)}
//                           </div>

//                           <div className="min-w-0">
//                             <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                               {cliente.apellido}, {cliente.nombre}
//                             </p>

//                             <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                               {cliente.telefono || "Sin teléfono"}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {cliente.dni}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {cliente.direccion || "-"}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {cliente.localidad || "-"}
//                         </p>

//                         <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                           {cliente.provincia || "-"}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                           {cliente.plan?.nombre || "Sin plan"}
//                         </p>

//                         <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                           {cliente.plan
//                             ? formatMoney(cliente.plan.importe)
//                             : "-"}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <EstadoPill estado={cliente.estado} />
//                       </td>

//                       <td className="px-3 py-3 text-right">
//                         <div className="flex justify-end gap-1.5">
//                           <ActionIconLink
//                             href={`/clientes/${cliente.id}`}
//                             title="Ver cliente"
//                             icon={<Eye className="h-3.5 w-3.5" />}
//                           />

//                           <ActionIconLink
//                             href={`/clientes/${cliente.id}/estado-cuenta`}
//                             title="Estado de cuenta"
//                             icon={<FileText className="h-3.5 w-3.5" />}
//                           />

//                           <ActionIconLink
//                             href={`/clientes/${cliente.id}/editar`}
//                             title="Editar cliente"
//                             icon={<Pencil className="h-3.5 w-3.5" />}
//                           />

//                           <form action={eliminarClienteAction}>
//                             <input type="hidden" name="id" value={cliente.id} />
//                             <button
//                               type="submit"
//                               className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-700 shadow-sm transition hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
//                               title="Eliminar cliente"
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
//                 Mostrando {clientesFiltrados.length} de {clientes.length}{" "}
//                 clientes
//               </span>

//               <span>Vista administrativa</span>
//             </div>
//           </div>

//           <div className="grid gap-3 md:hidden">
//             {clientesFiltrados.map((cliente) => (
//               <div
//                 key={cliente.id}
//                 className="rounded-[1.35rem] border border-slate-200 bg-white/85 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex min-w-0 gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-xs font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                       {getInitials(cliente)}
//                     </div>

//                     <div className="min-w-0">
//                       <h2 className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                         {cliente.apellido}, {cliente.nombre}
//                       </h2>

//                       <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
//                         N° {cliente.numeroCliente} · DNI {cliente.dni}
//                       </p>
//                     </div>
//                   </div>

//                   <EstadoPill estado={cliente.estado} />
//                 </div>

//                 <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//                   <div className="flex items-center justify-between gap-3">
//                     <span className="inline-flex items-center gap-1.5">
//                       <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       {cliente.plan?.nombre || "Sin plan"}
//                     </span>

//                     <span className="shrink-0 text-right text-cyan-700 dark:text-cyan-300">
//                       {cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                     <span className="inline-flex min-w-0 items-center gap-1.5">
//                       <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//                       <span className="truncate">
//                         {cliente.direccion || "Sin dirección"}
//                       </span>
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                     <span className="inline-flex min-w-0 items-center gap-1.5">
//                       <UserRound className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//                       <span className="truncate">
//                         {cliente.localidad || "-"}, {cliente.provincia || "-"}
//                       </span>
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mt-3 grid grid-cols-3 gap-2">
//                   <Link
//                     href={`/clientes/${cliente.id}`}
//                     className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                   >
//                     <Eye className="h-3.5 w-3.5" />
//                     Ver
//                   </Link>

//                   <Link
//                     href={`/clientes/${cliente.id}/estado-cuenta`}
//                     className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                   >
//                     <FileText className="h-3.5 w-3.5" />
//                     Cuenta
//                   </Link>

//                   <Link
//                     href={`/clientes/${cliente.id}/editar`}
//                     className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                   >
//                     <Pencil className="h-3.5 w-3.5" />
//                     Editar
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // src/components/tables/ClientesTable.tsx

// "use client";

// import { useMemo, useState, type ReactNode } from "react";
// import Link from "next/link";
// import {
//   Eye,
//   FileText,
//   MapPin,
//   Pencil,
//   Search,
//   Trash2,
//   UserRound,
//   Wifi,
//   X,
// } from "lucide-react";
// import { eliminarClienteAction } from "@/actions/cliente.actions";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { ClienteSafe } from "@/types/cliente.types";

// type ClientesTableProps = {
//   clientes: ClienteSafe[];
// };

// const cardBase =
//   "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function estadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   if (estado === "suspendido") return "Suspendido";
//   return "Baja";
// }

// function estadoClass(estado: string) {
//   if (estado === "activo") {
//     return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   if (estado === "suspendido") {
//     return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
//   }

//   return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
// }

// function normalizarTexto(value: string) {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .trim();
// }

// function getInitials(cliente: ClienteSafe) {
//   const parts = `${cliente.apellido} ${cliente.nombre}`
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CL";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function EstadoPill({ estado }: { estado: string }) {
//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${estadoClass(
//         estado,
//       )}`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {estadoLabel(estado)}
//     </span>
//   );
// }

// function ActionIconLink({
//   href,
//   title,
//   icon,
// }: {
//   href: string;
//   title: string;
//   icon: ReactNode;
// }) {
//   return (
//     <Link
//       href={href}
//       className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-600 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//       title={title}
//     >
//       {icon}
//     </Link>
//   );
// }

// function MobileClienteCard({ cliente }: { cliente: ClienteSafe }) {
//   return (
//     <article className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex min-w-0 gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-semibold text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//             {getInitials(cliente)}
//           </div>

//           <div className="min-w-0">
//             <h2 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//               {cliente.apellido}, {cliente.nombre}
//             </h2>

//             <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
//               N° {cliente.numeroCliente} · DNI {cliente.dni || "-"}
//             </p>
//           </div>
//         </div>

//         <EstadoPill estado={cliente.estado} />
//       </div>

//       <div className="mt-3 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
//         <div className="flex items-center justify-between gap-3">
//           <span className="inline-flex min-w-0 items-center gap-1.5">
//             <Wifi className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />
//             <span className="truncate">{cliente.plan?.nombre || "Sin plan"}</span>
//           </span>

//           <span className="shrink-0 text-right font-medium text-cyan-700 dark:text-cyan-300">
//             {cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
//           </span>
//         </div>

//         <div className="mt-2 flex items-center gap-1.5 border-t border-slate-300 pt-2 dark:border-slate-800">
//           <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//           <span className="truncate">{cliente.direccion || "Sin dirección"}</span>
//         </div>

//         <div className="mt-2 flex items-center gap-1.5 border-t border-slate-300 pt-2 dark:border-slate-800">
//           <UserRound className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//           <span className="truncate">
//             {cliente.localidad || "-"}, {cliente.provincia || "-"}
//           </span>
//         </div>
//       </div>

//       <div className="mt-3 grid grid-cols-3 gap-2">
//         <Link
//           href={`/clientes/${cliente.id}`}
//           className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//         >
//           <Eye className="h-3.5 w-3.5" />
//           Ver
//         </Link>

//         <Link
//           href={`/clientes/${cliente.id}/estado-cuenta`}
//           className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//         >
//           <FileText className="h-3.5 w-3.5" />
//           Cuenta
//         </Link>

//         <Link
//           href={`/clientes/${cliente.id}/editar`}
//           className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//         >
//           <Pencil className="h-3.5 w-3.5" />
//           Editar
//         </Link>
//       </div>
//     </article>
//   );
// }

// export function ClientesTable({ clientes }: ClientesTableProps) {
//   const [busqueda, setBusqueda] = useState("");

//   const clientesFiltrados = useMemo(() => {
//     const query = normalizarTexto(busqueda);

//     if (!query) {
//       return clientes;
//     }

//     return clientes.filter((cliente) => {
//       const textoBuscable = normalizarTexto(
//         [
//           cliente.numeroCliente,
//           cliente.nombre,
//           cliente.apellido,
//           cliente.dni,
//           cliente.direccion,
//           cliente.localidad,
//           cliente.provincia,
//           cliente.telefono,
//           cliente.email,
//           cliente.estado,
//           cliente.plan?.nombre,
//           cliente.plan?.tipo,
//           cliente.plan?.detalle,
//           cliente.plan?.importe,
//         ]
//           .filter(Boolean)
//           .join(" "),
//       );

//       return textoBuscable.includes(query);
//     });
//   }, [busqueda, clientes]);

//   if (clientes.length === 0) {
//     return (
//       <EmptyState
//         title="No hay clientes cargados."
//         description="Creá el primer cliente para empezar a gestionar planes, facturación y estado de cuenta."
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
//               placeholder="Buscar por cliente, DNI, número, localidad o plan"
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
//             <span>Total: {clientes.length}</span>
//             <span>Mostrados: {clientesFiltrados.length}</span>
//           </div>
//         </div>
//       </div>

//       {clientesFiltrados.length === 0 ? (
//         <EmptyState
//           title="No se encontraron clientes."
//           description="Probá con otro nombre, DNI, número de cliente, localidad o plan."
//         />
//       ) : (
//         <>
//           <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none lg:block">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[1040px] table-fixed text-left text-xs xl:min-w-0">
//                 <colgroup>
//                   <col className="w-[7%]" />
//                   <col className="w-[21%]" />
//                   <col className="w-[10%]" />
//                   <col className="w-[18%]" />
//                   <col className="w-[14%]" />
//                   <col className="w-[15%]" />
//                   <col className="w-[9%]" />
//                   <col className="w-[15%]" />
//                 </colgroup>

//                 <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//                   <tr>
//                     <th className="px-3 py-2.5 font-medium">N°</th>
//                     <th className="px-3 py-2.5 font-medium">Cliente</th>
//                     <th className="px-3 py-2.5 font-medium">DNI</th>
//                     <th className="px-3 py-2.5 font-medium">Dirección</th>
//                     <th className="px-3 py-2.5 font-medium">Localidad</th>
//                     <th className="px-3 py-2.5 font-medium">Plan</th>
//                     <th className="px-3 py-2.5 font-medium">Estado</th>
//                     <th className="px-3 py-2.5 text-right font-medium">
//                       Acciones
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
//                   {clientesFiltrados.map((cliente) => (
//                     <tr
//                       key={cliente.id}
//                       className="transition hover:bg-slate-50/90 dark:hover:bg-cyan-950/10"
//                     >
//                       <td className="px-3 py-3">
//                         <span className="inline-flex rounded-lg bg-cyan-50 px-2 py-1 text-[10px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                           {cliente.numeroCliente}
//                         </span>
//                       </td>

//                       <td className="px-3 py-3">
//                         <div className="flex min-w-0 items-center gap-2.5">
//                           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                             {getInitials(cliente)}
//                           </div>

//                           <div className="min-w-0">
//                             <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                               {cliente.apellido}, {cliente.nombre}
//                             </p>

//                             <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                               {cliente.telefono || "Sin teléfono"}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {cliente.dni}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {cliente.direccion || "-"}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {cliente.localidad || "-"}
//                         </p>

//                         <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                           {cliente.provincia || "-"}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                           {cliente.plan?.nombre || "Sin plan"}
//                         </p>

//                         <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                           {cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <EstadoPill estado={cliente.estado} />
//                       </td>

//                       <td className="px-3 py-3 text-right">
//                         <div className="flex justify-end gap-1.5">
//                           <ActionIconLink
//                             href={`/clientes/${cliente.id}`}
//                             title="Ver cliente"
//                             icon={<Eye className="h-3.5 w-3.5" />}
//                           />

//                           <ActionIconLink
//                             href={`/clientes/${cliente.id}/estado-cuenta`}
//                             title="Estado de cuenta"
//                             icon={<FileText className="h-3.5 w-3.5" />}
//                           />

//                           <ActionIconLink
//                             href={`/clientes/${cliente.id}/editar`}
//                             title="Editar cliente"
//                             icon={<Pencil className="h-3.5 w-3.5" />}
//                           />

//                           <form action={eliminarClienteAction}>
//                             <input type="hidden" name="id" value={cliente.id} />

//                             <button
//                               type="submit"
//                               className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-red-300 bg-red-50 text-red-700 shadow-sm transition hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
//                               title="Eliminar cliente"
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

//             <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//               <span>
//                 Mostrando {clientesFiltrados.length} de {clientes.length}{" "}
//                 clientes
//               </span>

//               <span>Vista administrativa</span>
//             </div>
//           </div>

//           <div className="grid gap-2 lg:hidden">
//             {clientesFiltrados.map((cliente) => (
//               <MobileClienteCard key={cliente.id} cliente={cliente} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // src/components/tables/ClientesTable.tsx

// "use client";

// import Link from "next/link";
// import type { ReactNode } from "react";
// import {
//   CalendarDays,
//   Eye,
//   FileText,
//   IdCard,
//   MapPin,
//   Pencil,
//   Phone,
//   Trash2,
//   UserRound,
//   Wifi,
// } from "lucide-react";
// import { eliminarClienteAction } from "@/actions/cliente.actions";
// import type { ClienteSafe } from "@/types/cliente.types";

// type ClientesTableProps = {
//   clientes: ClienteSafe[];
//   totalClientes: number;
// };

// const panelClass =
//   "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

// function formatMoney(value?: number | null) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatDate(value?: string | null) {
//   if (!value) return "-";

//   const [year, month, day] = value.split("-");

//   if (!year || !month || !day) return value;

//   return `${day}/${month}/${year}`;
// }

// function estadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   if (estado === "suspendido") return "Suspendido";
//   return "Baja";
// }

// function estadoClass(estado: string) {
//   if (estado === "activo") {
//     return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   if (estado === "suspendido") {
//     return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
//   }

//   return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
// }

// function getInitials(cliente: ClienteSafe) {
//   const parts = `${cliente.apellido} ${cliente.nombre}`
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CL";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function EstadoPill({ estado }: { estado: string }) {
//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${estadoClass(
//         estado,
//       )}`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {estadoLabel(estado)}
//     </span>
//   );
// }

// function ActionIconLink({
//   href,
//   title,
//   icon,
// }: {
//   href: string;
//   title: string;
//   icon: ReactNode;
// }) {
//   return (
//     <Link
//       href={href}
//       className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 shadow-sm shadow-slate-300/35 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300 dark:shadow-black/10 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
//       title={title}
//     >
//       {icon}
//     </Link>
//   );
// }

// function EmptyClientesPanel() {
//   return (
//     <section className={`${panelClass} mt-3 px-4 py-10 text-center`}>
//       <p className="text-sm font-semibold text-slate-950 dark:text-white">
//         No se encontraron clientes.
//       </p>

//       <p className="mt-2 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
//         Probá limpiar los filtros o cambiar el texto de búsqueda.
//       </p>
//     </section>
//   );
// }

// function MobileClienteCard({ cliente }: { cliente: ClienteSafe }) {
//   return (
//     <article className="overflow-hidden rounded-[1.25rem] border border-slate-300 bg-white shadow-lg shadow-slate-400/35 ring-1 ring-white/80 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/25 dark:ring-slate-800/80">
//       <div className="border-b border-slate-200 bg-white px-3.5 py-3.5 dark:border-slate-700 dark:bg-slate-900">
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex min-w-0 gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-semibold text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-700/70">
//               {getInitials(cliente)}
//             </div>

//             <div className="min-w-0">
//               <h2 className="truncate text-[14px] font-semibold text-slate-950 dark:text-white">
//                 {cliente.apellido}, {cliente.nombre}
//               </h2>

//               <p className="mt-1 flex items-center gap-1.5 truncate text-[12px] text-slate-600 dark:text-slate-400">
//                 <IdCard className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//                 N° {cliente.numeroCliente} · DNI {cliente.dni || "-"}
//               </p>

//               <p className="mt-1 flex items-center gap-1.5 truncate text-[12px] text-slate-600 dark:text-slate-400">
//                 <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
//                 {cliente.telefono || "Sin teléfono"}
//               </p>
//             </div>
//           </div>

//           <EstadoPill estado={cliente.estado} />
//         </div>
//       </div>

//       <div className="bg-slate-50 px-3.5 py-3 dark:bg-slate-950/35">
//         <div className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-[12px] text-slate-600 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400 dark:shadow-black/10">
//           <div className="flex items-center justify-between gap-3">
//             <span className="inline-flex min-w-0 items-center gap-1.5">
//               <Wifi className="h-3.5 w-3.5 shrink-0 text-blue-700 dark:text-blue-300" />
//               <span className="truncate">
//                 {cliente.plan?.nombre || "Sin plan"}
//               </span>
//             </span>

//             <span className="shrink-0 text-right font-semibold text-slate-950 dark:text-white">
//               {cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
//             </span>
//           </div>

//           <div className="mt-2 flex items-center gap-1.5 border-t border-slate-200 pt-2 dark:border-slate-700">
//             <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-700 dark:text-blue-300" />
//             <span className="truncate">
//               {cliente.direccion || "Sin dirección"}
//             </span>
//           </div>

//           <div className="mt-2 flex items-center gap-1.5 border-t border-slate-200 pt-2 dark:border-slate-700">
//             <UserRound className="h-3.5 w-3.5 shrink-0 text-blue-700 dark:text-blue-300" />
//             <span className="truncate">
//               {cliente.localidad || "-"}, {cliente.provincia || "-"}
//             </span>
//           </div>

//           <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-700">
//             <span className="inline-flex items-center gap-1.5">
//               <CalendarDays className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
//               Alta
//             </span>

//             <span className="text-right text-slate-700 dark:text-slate-300">
//               {formatDate(cliente.fechaAlta)}
//             </span>
//           </div>
//         </div>

//         <div className="mt-3 grid grid-cols-3 gap-2">
//           <Link
//             href={`/clientes/${cliente.id}`}
//             className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:shadow-black/10 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
//           >
//             <Eye className="h-3.5 w-3.5" />
//             Ver
//           </Link>

//           <Link
//             href={`/clientes/${cliente.id}/estado-cuenta`}
//             className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:shadow-black/10 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
//           >
//             <FileText className="h-3.5 w-3.5" />
//             Cuenta
//           </Link>

//           <Link
//             href={`/clientes/${cliente.id}/editar`}
//             className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:shadow-black/10 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
//           >
//             <Pencil className="h-3.5 w-3.5" />
//             Editar
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// }

// export function ClientesTable({ clientes, totalClientes }: ClientesTableProps) {
//   if (clientes.length === 0) {
//     return <EmptyClientesPanel />;
//   }

//   return (
//     <>
//       <div className={`mt-3 hidden overflow-hidden ${panelClass} md:block`}>
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1120px] table-fixed text-left text-[12px] xl:min-w-0">
//             <colgroup>
//               <col className="w-[7%]" />
//               <col className="w-[20%]" />
//               <col className="w-[9%]" />
//               <col className="w-[17%]" />
//               <col className="w-[12%]" />
//               <col className="w-[8%]" />
//               <col className="w-[14%]" />
//               <col className="w-[8%]" />
//               <col className="w-[12%]" />
//             </colgroup>

//             <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.08em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
//               <tr>
//                 <th className="px-3 py-2.5 font-medium">N°</th>
//                 <th className="px-3 py-2.5 font-medium">Cliente</th>
//                 <th className="px-3 py-2.5 font-medium">DNI</th>
//                 <th className="px-3 py-2.5 font-medium">Dirección</th>
//                 <th className="px-3 py-2.5 font-medium">Localidad</th>
//                 <th className="px-3 py-2.5 font-medium">Alta</th>
//                 <th className="px-3 py-2.5 font-medium">Plan</th>
//                 <th className="px-3 py-2.5 font-medium">Estado</th>
//                 <th className="px-3 py-2.5 text-right font-medium">
//                   Acciones
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//               {clientes.map((cliente) => (
//                 <tr
//                   key={cliente.id}
//                   className="transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
//                 >
//                   <td className="px-3 py-2.5">
//                     <span className="inline-flex rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-700/70">
//                       {cliente.numeroCliente}
//                     </span>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <div className="flex min-w-0 items-center gap-2.5">
//                       <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-700/70">
//                         {getInitials(cliente)}
//                       </div>

//                       <div className="min-w-0">
//                         <p className="truncate text-[12px] font-medium text-slate-950 dark:text-white">
//                           {cliente.apellido}, {cliente.nombre}
//                         </p>

//                         <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                           {cliente.telefono || "Sin teléfono"}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                       {cliente.dni || "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                       {cliente.direccion || "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                       {cliente.localidad || "-"}
//                     </p>

//                     <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                       {cliente.provincia || "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                       {formatDate(cliente.fechaAlta)}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] font-medium text-slate-950 dark:text-white">
//                       {cliente.plan?.nombre || "Sin plan"}
//                     </p>

//                     <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                       {cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <EstadoPill estado={cliente.estado} />
//                   </td>

//                   <td className="px-3 py-2.5 text-right">
//                     <div className="flex justify-end gap-1.5">
//                       <ActionIconLink
//                         href={`/clientes/${cliente.id}`}
//                         title="Ver cliente"
//                         icon={<Eye className="h-3.5 w-3.5" />}
//                       />

//                       <ActionIconLink
//                         href={`/clientes/${cliente.id}/estado-cuenta`}
//                         title="Estado de cuenta"
//                         icon={<FileText className="h-3.5 w-3.5" />}
//                       />

//                       <ActionIconLink
//                         href={`/clientes/${cliente.id}/editar`}
//                         title="Editar cliente"
//                         icon={<Pencil className="h-3.5 w-3.5" />}
//                       />

//                       <form action={eliminarClienteAction}>
//                         <input type="hidden" name="id" value={cliente.id} />

//                         <button
//                           type="submit"
//                           className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-300 bg-red-50 text-red-700 shadow-sm transition hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
//                           title="Eliminar cliente"
//                         >
//                           <Trash2 className="h-3.5 w-3.5" />
//                         </button>
//                       </form>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
//           <span>
//             Mostrando {clientes.length} de {totalClientes} clientes
//           </span>

//           <span>Vista administrativa</span>
//         </div>
//       </div>

//       <div className="mt-3 grid gap-4 md:hidden">
//         {clientes.map((cliente) => (
//           <MobileClienteCard key={cliente.id} cliente={cliente} />
//         ))}
//       </div>
//     </>
//   );
// }

// // src/components/tables/ClientesTable.tsx

// "use client";

// import type { FormEvent } from "react";
// import Link from "next/link";
// import {
//   Eye,
//   IdCard,
//   MapPin,
//   Pencil,
//   Phone,
//   ReceiptText,
//   Trash2,
//   UserRound,
//   Wifi,
// } from "lucide-react";
// import { eliminarClienteAction } from "@/actions/cliente.actions";
// import type { ClienteSafe } from "@/types/cliente.types";

// type ClientesTableProps = {
//   clientes: ClienteSafe[];
//   totalClientes: number;
// };

// const panelClass =
//   "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

// const actionLinkClass =
//   "inline-flex h-7 items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 text-[11px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300";

// const primaryActionClass =
//   "inline-flex h-7 items-center justify-center gap-1 rounded-lg border border-blue-600 bg-blue-600 px-2.5 text-[11px] font-medium text-white shadow-sm shadow-blue-950/15 transition hover:border-blue-700 hover:bg-blue-700 active:scale-[0.99] dark:border-blue-400 dark:bg-blue-500 dark:text-white dark:shadow-black/20 dark:hover:border-blue-300 dark:hover:bg-blue-600";

// const deleteActionClass =
//   "inline-flex h-7 items-center justify-center gap-1 rounded-lg border border-red-300 bg-red-50 px-2.5 text-[11px] font-medium text-red-700 shadow-sm shadow-red-950/5 transition hover:border-red-400 hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300 dark:shadow-black/10 dark:hover:border-red-800 dark:hover:bg-red-950/55";

// function formatMoney(value?: number | null) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatDate(value?: string | null) {
//   if (!value) return "-";

//   const [year, month, day] = value.split("-");

//   if (!year || !month || !day) return value;

//   return `${day}/${month}/${year}`;
// }

// function estadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   if (estado === "suspendido") return "Suspendido";
//   return "Baja";
// }

// function estadoTone(estado: string) {
//   if (estado === "activo") {
//     return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300";
//   }

//   if (estado === "suspendido") {
//     return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300";
//   }

//   return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300";
// }

// function getNombreCompleto(cliente: ClienteSafe) {
//   const apellido = String(cliente.apellido || "").trim();
//   const nombre = String(cliente.nombre || "").trim();

//   const completo = `${apellido}, ${nombre}`
//     .replace(/^,\s*/, "")
//     .replace(/,\s*$/, "")
//     .trim();

//   return completo || "Cliente sin nombre";
// }

// function getUbicacion(cliente: ClienteSafe) {
//   const localidad = String(cliente.localidad || "").trim();
//   const provincia = String(cliente.provincia || "").trim();

//   const ubicacion = [localidad, provincia].filter(Boolean).join(", ");

//   return ubicacion || "Sin ubicación";
// }

// function EstadoBadge({ estado }: { estado: string }) {
//   return (
//     <span
//       className={`inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[10px] font-semibold leading-none ${estadoTone(
//         estado,
//       )}`}
//     >
//       {estadoLabel(estado)}
//     </span>
//   );
// }

// function DeleteClienteButton({
//   clienteId,
//   clienteNombre,
//   compact = false,
// }: {
//   clienteId: string;
//   clienteNombre: string;
//   compact?: boolean;
// }) {
//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     const confirmar = window.confirm(
//       `Estás a punto de borrar el cliente:\n\n${clienteNombre}\n\nEsta acción no se puede deshacer.\n\n¿Querés continuar?`,
//     );

//     if (!confirmar) {
//       event.preventDefault();
//     }
//   }

//   if (compact) {
//     return (
//       <form action={eliminarClienteAction} onSubmit={handleSubmit}>
//         <input type="hidden" name="id" value={clienteId} />

//         <button
//           type="submit"
//           className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-red-300 bg-red-50 text-red-700 shadow-sm shadow-red-950/5 transition hover:border-red-400 hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300 dark:shadow-black/10 dark:hover:border-red-800 dark:hover:bg-red-950/55"
//           aria-label="Borrar cliente"
//           title="Borrar cliente"
//         >
//           <Trash2 className="h-3.5 w-3.5" />
//         </button>
//       </form>
//     );
//   }

//   return (
//     <form action={eliminarClienteAction} onSubmit={handleSubmit}>
//       <input type="hidden" name="id" value={clienteId} />

//       <button type="submit" className={deleteActionClass}>
//         <Trash2 className="h-3 w-3" />
//         Borrar
//       </button>
//     </form>
//   );
// }

// function EmptyClientesPanel() {
//   return (
//     <section className={`${panelClass} mt-3 p-6 text-center`}>
//       <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
//         <UserRound className="h-5 w-5" />
//       </div>

//       <h2 className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
//         No se encontraron clientes
//       </h2>

//       <p className="mx-auto mt-1 max-w-md text-[12px] leading-5 text-slate-600 dark:text-slate-400">
//         Probá cambiando los filtros o cargá un nuevo cliente desde el botón
//         superior.
//       </p>
//     </section>
//   );
// }

// function ClienteMobileRow({ cliente }: { cliente: ClienteSafe }) {
//   const nombreCompleto = getNombreCompleto(cliente);

//   return (
//     <article className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2.5 shadow-sm shadow-slate-300/35 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/15 dark:ring-slate-800/80">
//       <div className="flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <div className="flex min-w-0 items-center gap-2">
//             <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-1.5 text-[11px] font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
//               {cliente.numeroCliente}
//             </span>

//             <h2 className="truncate text-[13px] font-semibold text-slate-950 dark:text-white">
//               {nombreCompleto}
//             </h2>
//           </div>

//           <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
//             <span className="inline-flex items-center gap-1">
//               <IdCard className="h-3 w-3 text-slate-400 dark:text-slate-500" />
//               DNI {cliente.dni || "-"}
//             </span>

//             <span className="inline-flex items-center gap-1">
//               <Wifi className="h-3 w-3 text-slate-400 dark:text-slate-500" />
//               {cliente.plan?.nombre || "Sin plan"}
//             </span>
//           </div>
//         </div>

//         <EstadoBadge estado={cliente.estado} />
//       </div>

//       <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
//         <span className="inline-flex min-w-0 items-center gap-1">
//           <MapPin className="h-3 w-3 shrink-0 text-slate-400 dark:text-slate-500" />
//           <span className="truncate">{getUbicacion(cliente)}</span>
//         </span>

//         {cliente.telefono ? (
//           <span className="inline-flex items-center gap-1">
//             <Phone className="h-3 w-3 text-slate-400 dark:text-slate-500" />
//             {cliente.telefono}
//           </span>
//         ) : null}
//       </div>

//       <div className="mt-2 flex flex-wrap items-center gap-1.5">
//         <Link href={`/clientes/${cliente.id}`} className={primaryActionClass}>
//           <Eye className="h-3 w-3 text-white" />
//           <span className="text-white">Ver</span>
//         </Link>

//         <Link
//           href={`/clientes/${cliente.id}/estado-cuenta`}
//           className={actionLinkClass}
//         >
//           <ReceiptText className="h-3 w-3" />
//           Cuenta
//         </Link>

//         <Link href={`/clientes/${cliente.id}/editar`} className={actionLinkClass}>
//           <Pencil className="h-3 w-3" />
//           Editar
//         </Link>
//       </div>
//     </article>
//   );
// }

// function DesktopTable({
//   clientes,
//   totalClientes,
// }: {
//   clientes: ClienteSafe[];
//   totalClientes: number;
// }) {
//   return (
//     <section className={`${panelClass} mt-3 hidden overflow-hidden lg:block`}>
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[1020px] table-fixed text-left text-[12px] xl:min-w-0">
//           <colgroup>
//             <col className="w-[7%]" />
//             <col className="w-[18%]" />
//             <col className="w-[10%]" />
//             <col className="w-[17%]" />
//             <col className="w-[13%]" />
//             <col className="w-[9%]" />
//             <col className="w-[13%]" />
//             <col className="w-[13%]" />
//           </colgroup>

//           <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.08em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
//             <tr>
//               <th className="px-3 py-2.5 font-medium">N°</th>
//               <th className="px-3 py-2.5 font-medium">Cliente</th>
//               <th className="px-3 py-2.5 font-medium">DNI</th>
//               <th className="px-3 py-2.5 font-medium">Dirección</th>
//               <th className="px-3 py-2.5 font-medium">Localidad</th>
//               <th className="px-3 py-2.5 font-medium">Alta</th>
//               <th className="px-3 py-2.5 font-medium">Plan</th>
//               <th className="px-3 py-2.5 text-center font-medium">
//                 Acciones
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//             {clientes.map((cliente) => {
//               const nombreCompleto = getNombreCompleto(cliente);

//               return (
//                 <tr
//                   key={cliente.id}
//                   className="transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
//                 >
//                   <td className="px-3 py-2.5">
//                     <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-2 text-[11px] font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
//                       {cliente.numeroCliente}
//                     </span>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <div className="min-w-0">
//                       <p className="truncate text-[12px] font-semibold text-slate-950 dark:text-white">
//                         {nombreCompleto}
//                       </p>

//                       <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                         {cliente.telefono || cliente.email || "Sin contacto"}
//                       </p>
//                     </div>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                       {cliente.dni || "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                       {cliente.direccion || "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                       {cliente.localidad || "-"}
//                     </p>

//                     <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                       {cliente.provincia || "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                       {formatDate(cliente.fechaAlta)}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <div className="min-w-0">
//                       <p className="truncate text-[12px] font-semibold text-slate-950 dark:text-white">
//                         {cliente.plan?.nombre || "Sin plan"}
//                       </p>

//                       <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                         {cliente.plan
//                           ? formatMoney(cliente.plan.importe)
//                           : "-"}
//                       </p>
//                     </div>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <div className="flex items-center justify-center gap-1.5">
//                       <Link
//                         href={`/clientes/${cliente.id}`}
//                         className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-950/15 transition hover:border-blue-700 hover:bg-blue-700 active:scale-[0.99] dark:border-blue-400 dark:bg-blue-500 dark:text-white dark:shadow-black/20 dark:hover:border-blue-300 dark:hover:bg-blue-600"
//                         aria-label="Ver cliente"
//                         title="Ver cliente"
//                       >
//                         <Eye className="h-3.5 w-3.5 text-white" />
//                       </Link>

//                       <Link
//                         href={`/clientes/${cliente.id}/estado-cuenta`}
//                         className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
//                         aria-label="Estado de cuenta"
//                         title="Estado de cuenta"
//                       >
//                         <ReceiptText className="h-3.5 w-3.5" />
//                       </Link>

//                       <Link
//                         href={`/clientes/${cliente.id}/editar`}
//                         className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
//                         aria-label="Editar cliente"
//                         title="Editar cliente"
//                       >
//                         <Pencil className="h-3.5 w-3.5" />
//                       </Link>

//                       <DeleteClienteButton
//                         clienteId={cliente.id}
//                         clienteNombre={nombreCompleto}
//                         compact
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
//         <span>
//           Mostrando {clientes.length} de {totalClientes} clientes
//         </span>

//         <span>Vista administrativa</span>
//       </div>
//     </section>
//   );
// }

// export function ClientesTable({ clientes, totalClientes }: ClientesTableProps) {
//   if (clientes.length === 0) {
//     return <EmptyClientesPanel />;
//   }

//   return (
//     <>
//       <DesktopTable clientes={clientes} totalClientes={totalClientes} />

//       <section className="mt-3 grid gap-2.5 lg:hidden">
//         {clientes.map((cliente) => (
//           <ClienteMobileRow key={cliente.id} cliente={cliente} />
//         ))}

//         <div
//           className={`${panelClass} px-3 py-2 text-[11px] text-slate-500 dark:text-slate-400`}
//         >
//           Mostrando {clientes.length} de {totalClientes} clientes
//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import type { FormEvent, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  IdCard,
  MapPin,
  Pencil,
  Phone,
  ReceiptText,
  Trash2,
  UserRound,
  Wifi,
} from "lucide-react";
import { eliminarClienteAction } from "@/actions/cliente.actions";
import type { ClienteSafe } from "@/types/cliente.types";

type ClientesTableProps = {
  clientes: ClienteSafe[];
  totalClientes: number;
};

const panelClass =
  "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-[#263451] dark:bg-[#111b31] dark:shadow-[0_12px_32px_rgba(0,0,0,0.24)]";

const actionLinkClass =
  "inline-flex h-7 items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 text-[11px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] dark:border-[#263451] dark:bg-[#0b1326] dark:text-slate-200 dark:shadow-black/10 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300";

const primaryActionClass =
  "inline-flex h-7 items-center justify-center gap-1 rounded-lg border border-blue-600 bg-blue-600 px-2.5 text-[11px] font-medium text-white shadow-sm shadow-blue-950/15 transition hover:border-blue-700 hover:bg-blue-700 active:scale-[0.99] dark:border-blue-400 dark:bg-blue-500 dark:text-white dark:shadow-black/20 dark:hover:border-blue-300 dark:hover:bg-blue-600";

const deleteActionClass =
  "inline-flex h-7 items-center justify-center gap-1 rounded-lg border border-red-300 bg-red-50 px-2.5 text-[11px] font-medium text-red-700 shadow-sm shadow-red-950/5 transition hover:border-red-400 hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300 dark:shadow-black/10 dark:hover:border-red-800 dark:hover:bg-red-950/55";

function formatMoney(value?: number | null) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) return value;

  return `${day}/${month}/${year}`;
}

function estadoLabel(estado: string) {
  if (estado === "activo") return "Activo";
  if (estado === "suspendido") return "Suspendido";
  return "Baja";
}

function estadoTone(estado: string) {
  if (estado === "activo") {
    return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300";
  }

  if (estado === "suspendido") {
    return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300";
  }

  return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300";
}

function getNombreCompleto(cliente: ClienteSafe) {
  const apellido = String(cliente.apellido || "").trim();
  const nombre = String(cliente.nombre || "").trim();

  const completo = `${apellido}, ${nombre}`
    .replace(/^,\s*/, "")
    .replace(/,\s*$/, "")
    .trim();

  return completo || "Cliente sin nombre";
}

function getUbicacion(cliente: ClienteSafe) {
  const localidad = String(cliente.localidad || "").trim();
  const provincia = String(cliente.provincia || "").trim();

  const ubicacion = [localidad, provincia].filter(Boolean).join(", ");

  return ubicacion || "Sin ubicación";
}

function EstadoBadge({ estado }: { estado: string }) {
  const dotClass =
    estado === "activo"
      ? "bg-emerald-500"
      : estado === "suspendido"
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <span
      className={`inline-flex min-w-[86px] shrink-0 items-center justify-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-medium ${estadoTone(
        estado,
      )}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
      <span className="whitespace-nowrap leading-none">{estadoLabel(estado)}</span>
    </span>
  );
}

function DeleteClienteButton({
  clienteId,
  clienteNombre,
  compact = false,
}: {
  clienteId: string;
  clienteNombre: string;
  compact?: boolean;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const confirmar = window.confirm(
      `Estás a punto de borrar el cliente:\n\n${clienteNombre}\n\nEsta acción no se puede deshacer.\n\n¿Querés continuar?`,
    );

    if (!confirmar) {
      event.preventDefault();
    }
  }

  if (compact) {
    return (
      <form action={eliminarClienteAction} onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={clienteId} />

        <button
          type="submit"
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-red-300 bg-red-50 text-red-700 shadow-sm shadow-red-950/5 transition hover:border-red-400 hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300 dark:shadow-black/10 dark:hover:border-red-800 dark:hover:bg-red-950/55"
          aria-label="Borrar cliente"
          title="Borrar cliente"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </form>
    );
  }

  return (
    <form action={eliminarClienteAction} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={clienteId} />

      <button type="submit" className={deleteActionClass}>
        <Trash2 className="h-3 w-3" />
        Borrar
      </button>
    </form>
  );
}

function EmptyClientesPanel() {
  return (
    <section className={`${panelClass} mt-3 p-6 text-center`}>
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
        <UserRound className="h-5 w-5" />
      </div>

      <h2 className="mt-3 text-sm font-semibold text-slate-950 dark:text-white">
        No se encontraron clientes
      </h2>

      <p className="mx-auto mt-1 max-w-md text-[12px] leading-5 text-slate-600 dark:text-slate-400">
        Probá cambiando los filtros o cargá un nuevo cliente desde el botón
        superior.
      </p>
    </section>
  );
}

function ClienteMobileRow({ cliente }: { cliente: ClienteSafe }) {
  const nombreCompleto = getNombreCompleto(cliente);

  return (
    <article className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2.5 shadow-sm shadow-slate-300/35 ring-1 ring-white/70 dark:border-[#263451] dark:bg-slate-900/86 dark:shadow-black/15 dark:ring-slate-800/80">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-1.5 text-[11px] font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
              {cliente.numeroCliente}
            </span>

            <h2 className="truncate text-[13px] font-medium text-slate-950 dark:text-white">
              {nombreCompleto}
            </h2>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <IdCard className="h-3 w-3 text-slate-400 dark:text-slate-500" />
              DNI {cliente.dni || "-"}
            </span>

            <span className="inline-flex items-center gap-1">
              <Wifi className="h-3 w-3 text-slate-400 dark:text-slate-500" />
              {cliente.plan?.nombre || "Sin plan"}
            </span>
          </div>
        </div>

        <EstadoBadge estado={cliente.estado} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
        <span className="inline-flex min-w-0 items-center gap-1">
          <MapPin className="h-3 w-3 shrink-0 text-slate-400 dark:text-slate-500" />
          <span className="truncate">{getUbicacion(cliente)}</span>
        </span>

        {cliente.telefono ? (
          <span className="inline-flex items-center gap-1">
            <Phone className="h-3 w-3 text-slate-400 dark:text-slate-500" />
            {cliente.telefono}
          </span>
        ) : null}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <Link href={`/clientes/${cliente.id}`} className={primaryActionClass}>
          <Eye className="h-3 w-3 text-white" />
          <span className="text-white">Ver</span>
        </Link>

        <Link
          href={`/clientes/${cliente.id}/estado-cuenta`}
          className={actionLinkClass}
        >
          <ReceiptText className="h-3 w-3" />
          Cuenta
        </Link>

        <Link href={`/clientes/${cliente.id}/editar`} className={actionLinkClass}>
          <Pencil className="h-3 w-3" />
          Editar
        </Link>
      </div>
    </article>
  );
}

function DesktopTable({
  clientes,
  totalClientes,
}: {
  clientes: ClienteSafe[];
  totalClientes: number;
}) {
  const router = useRouter();

  function handleRowClick(
    event: MouseEvent<HTMLTableRowElement>,
    clienteId: string,
  ) {
    const target = event.target as HTMLElement;

    if (target.closest("a, button, form, input")) return;

    router.push(`/clientes/${clienteId}`);
  }

  return (
    <section className={`${panelClass} mt-3 hidden overflow-hidden lg:block`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1020px] table-fixed text-left text-[12px] xl:min-w-0">
          <colgroup>
            <col className="w-[7%]" />
            <col className="w-[18%]" />
            <col className="w-[10%]" />
            <col className="w-[17%]" />
            <col className="w-[13%]" />
            <col className="w-[9%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
          </colgroup>

          <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.08em] text-slate-500 dark:border-[#263451] dark:bg-[#0b1326] dark:text-slate-400">
            <tr>
              <th className="px-3 py-2.5 font-medium">N°</th>
              <th className="px-3 py-2.5 font-medium">Cliente</th>
              <th className="px-3 py-2.5 font-medium">DNI</th>
              <th className="px-3 py-2.5 font-medium">Dirección</th>
              <th className="px-3 py-2.5 font-medium">Localidad</th>
              <th className="px-3 py-2.5 font-medium">Alta</th>
              <th className="px-3 py-2.5 font-medium">Plan</th>
              <th className="px-3 py-2.5 text-center font-medium">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-[#263451]">
            {clientes.map((cliente) => {
              const nombreCompleto = getNombreCompleto(cliente);

              return (
                <tr
                  key={cliente.id}
                  onClick={(event) => handleRowClick(event, cliente.id)}
                  className="cursor-pointer transition hover:bg-blue-50/70 dark:hover:bg-[#16223c]"
                >
                  <td className="px-3 py-2.5">
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-2 text-[11px] font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
                      {cliente.numeroCliente}
                    </span>
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-medium text-slate-950 dark:text-white">
                        {nombreCompleto}
                      </p>

                      <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                        {cliente.telefono || cliente.email || "Sin contacto"}
                      </p>
                    </div>
                  </td>

                  <td className="px-3 py-2.5">
                    <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
                      {cliente.dni || "-"}
                    </p>
                  </td>

                  <td className="px-3 py-2.5">
                    <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
                      {cliente.direccion || "-"}
                    </p>
                  </td>

                  <td className="px-3 py-2.5">
                    <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
                      {cliente.localidad || "-"}
                    </p>

                    <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                      {cliente.provincia || "-"}
                    </p>
                  </td>

                  <td className="px-3 py-2.5">
                    <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
                      {formatDate(cliente.fechaAlta)}
                    </p>
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-medium text-slate-950 dark:text-white">
                        {cliente.plan?.nombre || "Sin plan"}
                      </p>

                      <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                        {cliente.plan
                          ? formatMoney(cliente.plan.importe)
                          : "-"}
                      </p>
                    </div>
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        href={`/clientes/${cliente.id}`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-950/15 transition hover:border-blue-700 hover:bg-blue-700 active:scale-[0.99] dark:border-blue-400 dark:bg-blue-500 dark:text-white dark:shadow-black/20 dark:hover:border-blue-300 dark:hover:bg-blue-600"
                        aria-label="Ver cliente"
                        title="Ver cliente"
                      >
                        <Eye className="h-3.5 w-3.5 text-white" />
                      </Link>

                      <Link
                        href={`/clientes/${cliente.id}/estado-cuenta`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-[#263451] dark:bg-[#0b1326] dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
                        aria-label="Estado de cuenta"
                        title="Estado de cuenta"
                      >
                        <ReceiptText className="h-3.5 w-3.5" />
                      </Link>

                      <Link
                        href={`/clientes/${cliente.id}/editar`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-[#263451] dark:bg-[#0b1326] dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
                        aria-label="Editar cliente"
                        title="Editar cliente"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>

                      <DeleteClienteButton
                        clienteId={cliente.id}
                        clienteNombre={nombreCompleto}
                        compact
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-[#263451] dark:text-slate-400">
        <span>
          Mostrando {clientes.length} de {totalClientes} clientes
        </span>

        <span>Vista administrativa</span>
      </div>
    </section>
  );
}

export function ClientesTable({ clientes, totalClientes }: ClientesTableProps) {
  if (clientes.length === 0) {
    return <EmptyClientesPanel />;
  }

  return (
    <>
      <DesktopTable clientes={clientes} totalClientes={totalClientes} />

      <section className="mt-3 grid gap-2.5 lg:hidden">
        {clientes.map((cliente) => (
          <ClienteMobileRow key={cliente.id} cliente={cliente} />
        ))}

        <div
          className={`${panelClass} px-3 py-2 text-[11px] text-slate-500 dark:text-slate-400`}
        >
          Mostrando {clientes.length} de {totalClientes} clientes
        </div>
      </section>
    </>
  );
}
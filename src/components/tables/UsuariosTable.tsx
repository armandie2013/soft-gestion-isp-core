// // src/components/tables/UsuariosTable.tsx

// import Link from "next/link";
// import type { ReactNode } from "react";
// import {
//   CalendarClock,
//   IdCard,
//   KeyRound,
//   Mail,
//   Pencil,
//   ShieldCheck,
//   UserRound,
// } from "lucide-react";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { UsuarioSafe } from "@/types/usuario.types";

// type UsuariosTableProps = {
//   usuarios: UsuarioSafe[];
//   totalUsuarios: number;
// };

// function formatDate(value?: string | null) {
//   if (!value) return "-";

//   return new Intl.DateTimeFormat("es-AR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   }).format(new Date(value));
// }

// function formatDateTime(value?: string | null) {
//   if (!value) return "Nunca";

//   return new Intl.DateTimeFormat("es-AR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(value));
// }

// function getInitials(usuario: UsuarioSafe) {
//   const nombre = `${usuario.nombre} ${usuario.apellido}`
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (nombre.length === 0) return "US";

//   return nombre
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function rolLabel(rol: string) {
//   if (rol === "admin") return "Admin";
//   if (rol === "cobrador") return "Cobrador";
//   return "Cliente";
// }

// function rolClass(rol: string) {
//   if (rol === "admin") {
//     return "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300";
//   }

//   if (rol === "cobrador") {
//     return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
//   }

//   return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-300";
// }

// function estadoClass(estado: string) {
//   if (estado === "activo") {
//     return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
// }

// function seguridadClass(debeCambiarPassword: boolean) {
//   if (debeCambiarPassword) {
//     return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
//   }

//   return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
// }

// function Pill({
//   children,
//   className,
// }: {
//   children: ReactNode;
//   className: string;
// }) {
//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${className}`}
//     >
//       {children}
//     </span>
//   );
// }

// export function UsuariosTable({ usuarios, totalUsuarios }: UsuariosTableProps) {
//   if (usuarios.length === 0) {
//     return (
//       <EmptyState
//         title="No se encontraron usuarios."
//         description="Probá limpiar los filtros o cambiar el texto de búsqueda."
//       />
//     );
//   }

//   return (
//     <>
//       <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:block">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1040px] table-fixed text-left text-xs xl:min-w-0">
//             <colgroup>
//               <col className="w-[20%]" />
//               <col className="w-[21%]" />
//               <col className="w-[9%]" />
//               <col className="w-[9%]" />
//               <col className="w-[10%]" />
//               <col className="w-[12%]" />
//               <col className="w-[13%]" />
//               <col className="w-[6%]" />
//             </colgroup>

//             <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//               <tr>
//                 <th className="px-3 py-2.5 font-medium">Usuario</th>
//                 <th className="px-3 py-2.5 font-medium">Email</th>
//                 <th className="px-3 py-2.5 font-medium">DNI</th>
//                 <th className="px-3 py-2.5 font-medium">Rol</th>
//                 <th className="px-3 py-2.5 font-medium">Estado</th>
//                 <th className="px-3 py-2.5 font-medium">Seguridad</th>
//                 <th className="px-3 py-2.5 font-medium">Último acceso</th>
//                 <th className="px-3 py-2.5 text-right font-medium">Acción</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
//               {usuarios.map((usuario) => (
//                 <tr
//                   key={usuario.id}
//                   className="transition hover:bg-slate-50/80 dark:hover:bg-slate-950/35"
//                 >
//                   <td className="px-3 py-3">
//                     <div className="flex min-w-0 items-center gap-2.5">
//                       <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                         {getInitials(usuario)}
//                       </div>

//                       <div className="min-w-0">
//                         <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                           {usuario.apellido}, {usuario.nombre}
//                         </p>

//                         <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                           Creado {formatDate(usuario.creadoEn)}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-3 py-3">
//                     <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                       {usuario.email}
//                     </p>
//                   </td>

//                   <td className="px-3 py-3">
//                     <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                       {usuario.dni || "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-3">
//                     <Pill className={rolClass(usuario.rol)}>
//                       {rolLabel(usuario.rol)}
//                     </Pill>
//                   </td>

//                   <td className="px-3 py-3">
//                     <Pill className={estadoClass(usuario.estado)}>
//                       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                       {usuario.estado === "activo" ? "Activo" : "Suspendido"}
//                     </Pill>
//                   </td>

//                   <td className="px-3 py-3">
//                     <Pill className={seguridadClass(usuario.debeCambiarPassword)}>
//                       <ShieldCheck className="h-3 w-3" />
//                       {usuario.debeCambiarPassword ? "Cambiar" : "Clave OK"}
//                     </Pill>
//                   </td>

//                   <td className="px-3 py-3">
//                     <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                       {formatDateTime(usuario.ultimoAcceso)}
//                     </p>
//                   </td>

//                   <td className="px-3 py-3 text-right">
//                     <Link
//                       href={`/usuarios/${usuario.id}/editar`}
//                       className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                       title="Editar usuario"
//                     >
//                       <Pencil className="h-3.5 w-3.5" />
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//           <span>
//             Mostrando {usuarios.length} de {totalUsuarios} usuarios
//           </span>

//           <span>Vista administrativa</span>
//         </div>
//       </div>

//       <div className="grid gap-3 md:hidden">
//         {usuarios.map((usuario) => (
//           <div
//             key={usuario.id}
//             className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex min-w-0 gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-xs font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   {getInitials(usuario)}
//                 </div>

//                 <div className="min-w-0">
//                   <h2 className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                     {usuario.apellido}, {usuario.nombre}
//                   </h2>

//                   <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
//                     <Mail className="h-3.5 w-3.5" />
//                     {usuario.email}
//                   </p>

//                   <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
//                     <IdCard className="h-3.5 w-3.5" />
//                     DNI {usuario.dni || "-"}
//                   </p>
//                 </div>
//               </div>

//               <Pill className={estadoClass(usuario.estado)}>
//                 {usuario.estado === "activo" ? "Activo" : "Suspendido"}
//               </Pill>
//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">
//               <Pill className={rolClass(usuario.rol)}>
//                 <UserRound className="h-3.5 w-3.5" />
//                 {rolLabel(usuario.rol)}
//               </Pill>

//               <Pill className={seguridadClass(usuario.debeCambiarPassword)}>
//                 <KeyRound className="h-3.5 w-3.5" />
//                 {usuario.debeCambiarPassword ? "Cambio requerido" : "Clave OK"}
//               </Pill>
//             </div>

//             <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//               <div className="flex items-center justify-between gap-3">
//                 <span className="inline-flex items-center gap-1.5">
//                   <CalendarClock className="h-3.5 w-3.5" />
//                   Último acceso
//                 </span>

//                 <span className="text-right">
//                   {formatDateTime(usuario.ultimoAcceso)}
//                 </span>
//               </div>
//             </div>

//             <Link
//               href={`/usuarios/${usuario.id}/editar`}
//               className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//             >
//               <Pencil className="h-4 w-4" />
//               Editar usuario
//             </Link>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// // src/components/tables/UsuariosTable.tsx

// import Link from "next/link";
// import type { ReactNode } from "react";
// import {
//   CalendarClock,
//   IdCard,
//   KeyRound,
//   Mail,
//   Pencil,
//   ShieldCheck,
//   UserRound,
//   WalletCards,
// } from "lucide-react";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { UsuarioSafe } from "@/types/usuario.types";

// type UsuariosTableProps = {
//   usuarios: UsuarioSafe[];
//   totalUsuarios: number;
// };

// function formatDate(value?: string | null) {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "-";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

// function formatDateTime(value?: string | null) {
//   if (!value) return "Nunca";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Nunca";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month}/${year} ${hours}:${minutes}`;
// }

// function formatMoney(value?: number | null) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function getInitials(usuario: UsuarioSafe) {
//   const nombre = `${usuario.nombre} ${usuario.apellido}`
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (nombre.length === 0) return "US";

//   return nombre
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function rolLabel(rol: string) {
//   if (rol === "admin") return "Admin";
//   if (rol === "cobrador") return "Cobrador";
//   return "Cliente";
// }

// function rolClass(rol: string) {
//   if (rol === "admin") {
//     return "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700/80 dark:bg-blue-950/35 dark:text-blue-300";
//   }

//   if (rol === "cobrador") {
//     return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700/80 dark:bg-amber-950/35 dark:text-amber-300";
//   }

//   return "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-700/80 dark:bg-violet-950/35 dark:text-violet-300";
// }

// function estadoClass(estado: string) {
//   if (estado === "activo") {
//     return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-950/35 dark:text-emerald-300";
//   }

//   return "border-red-300 bg-red-50 text-red-700 dark:border-red-700/80 dark:bg-red-950/35 dark:text-red-300";
// }

// function seguridadClass(debeCambiarPassword: boolean) {
//   if (debeCambiarPassword) {
//     return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700/80 dark:bg-amber-950/35 dark:text-amber-300";
//   }

//   return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-950/35 dark:text-emerald-300";
// }

// function Pill({
//   children,
//   className,
// }: {
//   children: ReactNode;
//   className: string;
// }) {
//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium leading-5 ${className}`}
//     >
//       {children}
//     </span>
//   );
// }

// function ExtraInfo({ usuario }: { usuario: UsuarioSafe }) {
//   if (usuario.rol === "cobrador") {
//     return (
//       <div className="min-w-0">
//         <p className="truncate text-[12px] font-medium text-slate-950 dark:text-white">
//           {formatMoney(usuario.limiteCajaCobrador)}
//         </p>

//         <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
//           Límite de caja
//         </p>
//       </div>
//     );
//   }

//   if (usuario.rol === "cliente") {
//     return (
//       <div className="min-w-0">
//         <p className="truncate text-[12px] font-medium text-slate-950 dark:text-white">
//           {usuario.clienteId ? "Vinculado" : "Sin vínculo"}
//         </p>

//         <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
//           Cliente asociado
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-w-0">
//       <p className="truncate text-[12px] font-medium text-slate-950 dark:text-white">
//         {usuario.esProtegido ? "Protegido" : "Admin"}
//       </p>

//       <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
//         Acceso administrativo
//       </p>
//     </div>
//   );
// }

// export function UsuariosTable({ usuarios, totalUsuarios }: UsuariosTableProps) {
//   if (usuarios.length === 0) {
//     return (
//       <EmptyState
//         title="No se encontraron usuarios."
//         description="Probá limpiar los filtros o cambiar el texto de búsqueda."
//       />
//     );
//   }

//   return (
//     <>
//       <div className="hidden overflow-hidden rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80 md:block">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1120px] table-fixed text-left text-[12px] xl:min-w-0">
//             <colgroup>
//               <col className="w-[19%]" />
//               <col className="w-[18%]" />
//               <col className="w-[8%]" />
//               <col className="w-[8%]" />
//               <col className="w-[8%]" />
//               <col className="w-[14%]" />
//               <col className="w-[16%]" />
//               <col className="w-[9%]" />
//             </colgroup>

//             <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.08em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
//               <tr>
//                 <th className="px-3 py-2.5 font-medium">Usuario</th>
//                 <th className="px-3 py-2.5 font-medium">Email</th>
//                 <th className="px-3 py-2.5 font-medium">DNI</th>
//                 <th className="px-3 py-2.5 font-medium">Rol</th>
//                 <th className="px-3 py-2.5 font-medium">Estado</th>
//                 <th className="px-3 py-2.5 font-medium">Datos</th>
//                 <th className="px-3 py-2.5 font-medium">Último acceso</th>
//                 <th className="px-3 py-2.5 text-right font-medium">
//                   Acción
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
//               {usuarios.map((usuario) => (
//                 <tr
//                   key={usuario.id}
//                   className="transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
//                 >
//                   <td className="px-3 py-2.5">
//                     <div className="flex min-w-0 items-center gap-2.5">
//                       <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-700/70">
//                         {getInitials(usuario)}
//                       </div>

//                       <div className="min-w-0">
//                         <p className="truncate text-[12px] font-medium text-slate-950 dark:text-white">
//                           {usuario.apellido}, {usuario.nombre}
//                         </p>

//                         <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                           Creado {formatDate(usuario.creadoEn)}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                       {usuario.email}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
//                       {usuario.dni || "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <Pill className={rolClass(usuario.rol)}>
//                       {rolLabel(usuario.rol)}
//                     </Pill>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <Pill className={estadoClass(usuario.estado)}>
//                       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                       {usuario.estado === "activo" ? "Activo" : "Suspendido"}
//                     </Pill>
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <ExtraInfo usuario={usuario} />
//                   </td>

//                   <td className="px-3 py-2.5">
//                     <div className="min-w-0">
//                       <p className="whitespace-nowrap text-[12px] text-slate-600 dark:text-slate-300">
//                         {formatDateTime(usuario.ultimoAcceso)}
//                       </p>

//                       <Pill
//                         className={seguridadClass(
//                           usuario.debeCambiarPassword,
//                         )}
//                       >
//                         <ShieldCheck className="h-3 w-3" />
//                         {usuario.debeCambiarPassword ? "Cambiar" : "Clave OK"}
//                       </Pill>
//                     </div>
//                   </td>

//                   <td className="px-3 py-2.5 text-right">
//                     <Link
//                       href={`/usuarios/${usuario.id}/editar`}
//                       className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-300 bg-white px-2.5 text-[12px] font-medium text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/60 dark:text-blue-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
//                       title="Editar usuario"
//                     >
//                       Editar
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
//           <span>
//             Mostrando {usuarios.length} de {totalUsuarios} usuarios
//           </span>

//           <span>Vista administrativa</span>
//         </div>
//       </div>

//       <div className="grid gap-3 md:hidden">
//         {usuarios.map((usuario) => (
//           <div
//             key={usuario.id}
//             className="rounded-xl border border-slate-300 bg-white/95 p-3 shadow-md shadow-slate-300/45 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex min-w-0 gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-700/70">
//                   {getInitials(usuario)}
//                 </div>

//                 <div className="min-w-0">
//                   <h2 className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                     {usuario.apellido}, {usuario.nombre}
//                   </h2>

//                   <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
//                     <Mail className="h-3.5 w-3.5" />
//                     {usuario.email}
//                   </p>

//                   <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
//                     <IdCard className="h-3.5 w-3.5" />
//                     DNI {usuario.dni || "-"}
//                   </p>
//                 </div>
//               </div>

//               <Pill className={estadoClass(usuario.estado)}>
//                 {usuario.estado === "activo" ? "Activo" : "Suspendido"}
//               </Pill>
//             </div>

//             <div className="mt-3 flex flex-wrap gap-2">
//               <Pill className={rolClass(usuario.rol)}>
//                 <UserRound className="h-3.5 w-3.5" />
//                 {rolLabel(usuario.rol)}
//               </Pill>

//               <Pill className={seguridadClass(usuario.debeCambiarPassword)}>
//                 <KeyRound className="h-3.5 w-3.5" />
//                 {usuario.debeCambiarPassword ? "Cambiar clave" : "Clave OK"}
//               </Pill>
//             </div>

//             <div className="mt-3 grid gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
//               {usuario.rol === "cobrador" ? (
//                 <div className="flex items-center justify-between gap-3">
//                   <span className="inline-flex items-center gap-1.5">
//                     <WalletCards className="h-3.5 w-3.5" />
//                     Límite de caja
//                   </span>

//                   <span className="text-right font-medium text-slate-950 dark:text-white">
//                     {formatMoney(usuario.limiteCajaCobrador)}
//                   </span>
//                 </div>
//               ) : null}

//               <div className="flex items-center justify-between gap-3">
//                 <span className="inline-flex items-center gap-1.5">
//                   <CalendarClock className="h-3.5 w-3.5" />
//                   Último acceso
//                 </span>

//                 <span className="text-right">
//                   {formatDateTime(usuario.ultimoAcceso)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3">
//                 <span>Creado</span>
//                 <span className="text-right">
//                   {formatDate(usuario.creadoEn)}
//                 </span>
//               </div>
//             </div>

//             <Link
//               href={`/usuarios/${usuario.id}/editar`}
//               className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/60 dark:text-blue-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
//             >
//               <Pencil className="h-4 w-4" />
//               Editar usuario
//             </Link>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import type {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";
import {
  CalendarClock,
  IdCard,
  KeyRound,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";
import type { UsuarioSafe } from "@/types/usuario.types";

type UsuariosTableProps = {
  usuarios: UsuarioSafe[];
  totalUsuarios: number;
};

type StatusIndicatorProps = {
  children: ReactNode;
  className: string;
  dotClass?: string;
};

function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatDateTime(value?: string | null) {
  if (!value) return "Nunca";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Nunca";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatMoney(value?: number | null) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function getInitials(usuario: UsuarioSafe) {
  const parts = [
    usuario.nombre,
    usuario.apellido,
  ]
    .join(" ")
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return "US";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function rolLabel(rol: string) {
  if (rol === "admin") return "Admin";
  if (rol === "cobrador") return "Cobrador";

  return "Cliente";
}

function rolIndicator(rol: string) {
  if (rol === "admin") {
    return {
      className:
        "border-blue-200 bg-blue-50 text-blue-700 " +
        "dark:border-blue-800/70 dark:bg-blue-950/25 dark:text-blue-300",
      dotClass: "bg-blue-500",
    };
  }

  if (rol === "cobrador") {
    return {
      className:
        "border-amber-200 bg-amber-50 text-amber-700 " +
        "dark:border-amber-800/70 dark:bg-amber-950/25 dark:text-amber-300",
      dotClass: "bg-amber-500",
    };
  }

  return {
    className:
      "border-violet-200 bg-violet-50 text-violet-700 " +
      "dark:border-violet-800/70 dark:bg-violet-950/25 dark:text-violet-300",
    dotClass: "bg-violet-500",
  };
}

function estadoIndicator(estado: string) {
  if (estado === "activo") {
    return {
      label: "Activo",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700 " +
        "dark:border-emerald-800/70 dark:bg-emerald-950/25 dark:text-emerald-300",
      dotClass: "bg-emerald-500",
    };
  }

  return {
    label: "Suspendido",
    className:
      "border-red-200 bg-red-50 text-red-700 " +
      "dark:border-red-800/70 dark:bg-red-950/25 dark:text-red-300",
    dotClass: "bg-red-500",
  };
}

function seguridadIndicator(
  debeCambiarPassword: boolean,
) {
  if (debeCambiarPassword) {
    return {
      label: "Cambiar clave",
      className:
        "border-amber-200 bg-amber-50 text-amber-700 " +
        "dark:border-amber-800/70 dark:bg-amber-950/25 dark:text-amber-300",
      dotClass: "bg-amber-500",
    };
  }

  return {
    label: "Clave OK",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 " +
      "dark:border-emerald-800/70 dark:bg-emerald-950/25 dark:text-emerald-300",
    dotClass: "bg-emerald-500",
  };
}

function StatusIndicator({
  children,
  className,
  dotClass,
}: StatusIndicatorProps) {
  return (
    <span
      className={`
        inline-flex min-w-[82px]
        items-center justify-center gap-1.5
        rounded-md border px-2 py-1
        text-[10px] font-medium
        ${className}
      `}
    >
      {dotClass ? (
        <span
          className={`
            h-1.5 w-1.5 shrink-0 rounded-full
            ${dotClass}
          `}
        />
      ) : null}

      <span className="whitespace-nowrap leading-none">
        {children}
      </span>
    </span>
  );
}

function ExtraInfo({
  usuario,
}: {
  usuario: UsuarioSafe;
}) {
  if (usuario.rol === "cobrador") {
    return (
      <div className="min-w-0">
        <p
          className="
            truncate text-[12px] font-medium
            tabular-nums text-slate-950
            dark:text-white
          "
        >
          {formatMoney(usuario.limiteCajaCobrador)}
        </p>

        <p
          className="
            mt-0.5 truncate text-[10px]
            text-slate-500 dark:text-slate-400
          "
        >
          Límite de caja
        </p>
      </div>
    );
  }

  if (usuario.rol === "cliente") {
    return (
      <div className="min-w-0">
        <p
          className="
            truncate text-[12px] font-medium
            text-slate-950 dark:text-white
          "
        >
          {usuario.clienteId
            ? "Vinculado"
            : "Sin vínculo"}
        </p>

        <p
          className="
            mt-0.5 truncate text-[10px]
            text-slate-500 dark:text-slate-400
          "
        >
          Cliente asociado
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <p
        className="
          truncate text-[12px] font-medium
          text-slate-950 dark:text-white
        "
      >
        Acceso completo
      </p>

      <p
        className="
          mt-0.5 truncate text-[10px]
          text-slate-500 dark:text-slate-400
        "
      >
        Administración
      </p>
    </div>
  );
}

export function UsuariosTable({
  usuarios,
  totalUsuarios,
}: UsuariosTableProps) {
  const router = useRouter();

  if (usuarios.length === 0) {
    return (
      <div
        className="
          rounded-xl border border-slate-200
          bg-white p-5 shadow-sm
          dark:border-[#263451]
          dark:bg-[#111b31]
        "
      >
        <EmptyState
  title="No se encontraron usuarios"
  description="No hay usuarios que coincidan con los filtros seleccionados."
/>
      </div>
    );
  }

  function editarUsuario(usuarioId: string) {
    router.push(`/usuarios/${usuarioId}/editar`);
  }

  function handleRowClick(
    event: MouseEvent<HTMLTableRowElement>,
    usuarioId: string,
  ) {
    const target = event.target as HTMLElement;

    if (
      target.closest(
        "a, button, input, select, textarea",
      )
    ) {
      return;
    }

    editarUsuario(usuarioId);
  }

  function handleRowKeyDown(
    event: KeyboardEvent<HTMLTableRowElement>,
    usuarioId: string,
  ) {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    event.preventDefault();
    editarUsuario(usuarioId);
  }

  return (
    <>
      <section
        className="
          hidden overflow-hidden rounded-xl
          border border-slate-200
          bg-white shadow-sm
          dark:border-[#263451]
          dark:bg-[#111b31]
          dark:shadow-[0_12px_32px_rgba(0,0,0,0.24)]
          md:block
        "
      >
        <div className="overflow-x-auto">
          <table
            className="
              w-full min-w-[1160px]
              table-fixed text-left
              text-[12px] xl:min-w-0
            "
          >
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[18%]" />
              <col className="w-[8%]" />
              <col className="w-[9%]" />
              <col className="w-[10%]" />
              <col className="w-[13%]" />
              <col className="w-[16%]" />
              <col className="w-[8%]" />
            </colgroup>

            <thead
              className="
                border-b border-slate-200
                bg-slate-100
                text-[10px] font-medium
                uppercase tracking-[0.07em]
                text-slate-500
                dark:border-[#263451]
                dark:bg-[#0b1326]
                dark:text-slate-300
              "
            >
              <tr>
                <th className="px-4 py-2.5 font-medium">
                  Usuario
                </th>

                <th className="px-3 py-2.5 font-medium">
                  Email
                </th>

                <th className="px-3 py-2.5 font-medium">
                  DNI
                </th>

                <th className="px-3 py-2.5 font-medium">
                  Rol
                </th>

                <th className="px-3 py-2.5 font-medium">
                  Estado
                </th>

                <th className="px-3 py-2.5 font-medium">
                  Datos
                </th>

                <th className="px-3 py-2.5 font-medium">
                  Último acceso
                </th>

                <th
                  className="
                    px-4 py-2.5 text-right
                    font-medium
                  "
                >
                  Acción
                </th>
              </tr>
            </thead>

            <tbody
              className="
                divide-y divide-slate-200
                dark:divide-[#263451]
              "
            >
              {usuarios.map((usuario) => {
                const rol = rolIndicator(usuario.rol);
                const estado = estadoIndicator(
                  usuario.estado,
                );
                const seguridad = seguridadIndicator(
                  usuario.debeCambiarPassword,
                );

                return (
                  <tr
                    key={usuario.id}
                    tabIndex={0}
                    role="link"
                    aria-label={`Editar usuario ${usuario.nombre} ${usuario.apellido}`}
                    onClick={(event) =>
                      handleRowClick(
                        event,
                        usuario.id,
                      )
                    }
                    onKeyDown={(event) =>
                      handleRowKeyDown(
                        event,
                        usuario.id,
                      )
                    }
                    className="
                      group cursor-pointer transition
                      hover:bg-blue-50/70
                      focus-visible:bg-blue-50
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-blue-500
                      dark:hover:bg-[#16223c]
                      dark:focus-visible:bg-[#16223c]
                      dark:focus-visible:ring-indigo-500
                    "
                  >
                    <td className="px-4 py-2.5">
                      <div
                        className="
                          flex min-w-0
                          items-center gap-2.5
                        "
                      >
                        <div
                          className="
                            flex h-8 w-8 shrink-0
                            items-center justify-center
                            rounded-lg bg-blue-50
                            text-[10px] font-medium
                            text-blue-700
                            ring-1 ring-blue-200
                            transition
                            group-hover:bg-blue-100
                            dark:bg-indigo-950/35
                            dark:text-indigo-300
                            dark:ring-indigo-800/70
                            dark:group-hover:bg-indigo-950/55
                          "
                        >
                          {getInitials(usuario)}
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              truncate text-[12px]
                              font-medium text-slate-950
                              transition
                              group-hover:text-blue-800
                              dark:text-white
                              dark:group-hover:text-indigo-200
                            "
                          >
                            {usuario.apellido},{" "}
                            {usuario.nombre}
                          </p>

                          <p
                            className="
                              truncate text-[10px]
                              text-slate-500
                              dark:text-slate-400
                            "
                          >
                            Creado{" "}
                            {formatDate(
                              usuario.creadoEn,
                            )}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-2.5">
                      <p
                        className="
                          truncate text-[12px]
                          text-slate-600
                          dark:text-slate-300
                        "
                        title={usuario.email}
                      >
                        {usuario.email}
                      </p>
                    </td>

                    <td className="px-3 py-2.5">
                      <p
                        className="
                          truncate text-[12px]
                          tabular-nums text-slate-600
                          dark:text-slate-300
                        "
                      >
                        {usuario.dni || "-"}
                      </p>
                    </td>

                    <td className="px-3 py-2.5">
                      <StatusIndicator
                        className={rol.className}
                        dotClass={rol.dotClass}
                      >
                        {rolLabel(usuario.rol)}
                      </StatusIndicator>
                    </td>

                    <td className="px-3 py-2.5">
                      <StatusIndicator
                        className={estado.className}
                        dotClass={estado.dotClass}
                      >
                        {estado.label}
                      </StatusIndicator>
                    </td>

                    <td className="px-3 py-2.5">
                      <ExtraInfo usuario={usuario} />
                    </td>

                    <td className="px-3 py-2.5">
                      <div className="min-w-0">
                        <p
                          className="
                            whitespace-nowrap
                            text-[12px] tabular-nums
                            text-slate-600
                            dark:text-slate-300
                          "
                        >
                          {formatDateTime(
                            usuario.ultimoAcceso,
                          )}
                        </p>

                        <div className="mt-1">
                          <StatusIndicator
                            className={seguridad.className}
                            dotClass={seguridad.dotClass}
                          >
                            {seguridad.label}
                          </StatusIndicator>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          editarUsuario(usuario.id)
                        }
                        className="
                          inline-flex h-7 items-center
                          justify-center rounded-md
                          border border-slate-300
                          bg-white px-2.5
                          text-[10px] font-medium
                          text-blue-700 transition
                          hover:border-blue-300
                          hover:bg-blue-100
                          active:scale-[0.99]
                          dark:border-[#354462]
                          dark:bg-[#0b1326]
                          dark:text-indigo-300
                          dark:hover:border-indigo-500/60
                          dark:hover:bg-indigo-950/40
                        "
                        title="Editar usuario"
                      >
                        <span className="leading-none">
                          Editar
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div
          className="
            flex items-center justify-between
            border-t border-slate-200
            px-4 py-2.5
            text-[11px] text-slate-500
            dark:border-[#263451]
            dark:text-slate-400
          "
        >
          <span>
            Mostrando{" "}
            <strong
              className="
                font-medium tabular-nums
                text-slate-700
                dark:text-slate-200
              "
            >
              {usuarios.length}
            </strong>{" "}
            de{" "}
            <strong
              className="
                font-medium tabular-nums
                text-slate-700
                dark:text-slate-200
              "
            >
              {totalUsuarios}
            </strong>{" "}
            usuarios
          </span>

          <span>
            Seleccioná una fila para editar
          </span>
        </div>
      </section>

      <div className="grid gap-3 md:hidden">
        {usuarios.map((usuario) => {
          const rol = rolIndicator(usuario.rol);
          const estado = estadoIndicator(
            usuario.estado,
          );
          const seguridad = seguridadIndicator(
            usuario.debeCambiarPassword,
          );

          return (
            <article
              key={usuario.id}
              className="
                overflow-hidden rounded-xl
                border border-slate-200
                bg-white shadow-sm
                dark:border-[#263451]
                dark:bg-[#111b31]
                dark:shadow-[0_10px_24px_rgba(0,0,0,0.2)]
              "
            >
              <div className="p-3">
                <div
                  className="
                    flex items-start
                    justify-between gap-3
                  "
                >
                  <div
                    className="
                      flex min-w-0 gap-3
                    "
                  >
                    <div
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-lg bg-blue-50
                        text-xs font-medium
                        text-blue-700
                        ring-1 ring-blue-200
                        dark:bg-indigo-950/35
                        dark:text-indigo-300
                        dark:ring-indigo-800/70
                      "
                    >
                      {getInitials(usuario)}
                    </div>

                    <div className="min-w-0">
                      <h2
                        className="
                          truncate text-sm font-medium
                          text-slate-950
                          dark:text-white
                        "
                      >
                        {usuario.apellido},{" "}
                        {usuario.nombre}
                      </h2>

                      <p
                        className="
                          mt-1 flex items-center
                          gap-1.5 truncate text-xs
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        {usuario.email}
                      </p>

                      <p
                        className="
                          mt-1 flex items-center
                          gap-1.5 truncate text-xs
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        <IdCard className="h-3.5 w-3.5 shrink-0" />
                        DNI {usuario.dni || "-"}
                      </p>
                    </div>
                  </div>

                  <StatusIndicator
                    className={estado.className}
                    dotClass={estado.dotClass}
                  >
                    {estado.label}
                  </StatusIndicator>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusIndicator
                    className={rol.className}
                    dotClass={rol.dotClass}
                  >
                    {rolLabel(usuario.rol)}
                  </StatusIndicator>

                  <StatusIndicator
                    className={seguridad.className}
                    dotClass={seguridad.dotClass}
                  >
                    {seguridad.label}
                  </StatusIndicator>
                </div>

                <div
                  className="
                    mt-3 grid gap-2
                    rounded-lg border
                    border-slate-200 bg-slate-50
                    px-3 py-3 text-xs
                    text-slate-600
                    dark:border-[#2b3957]
                    dark:bg-[#0d172a]
                    dark:text-slate-300
                  "
                >
                  {usuario.rol === "cobrador" ? (
                    <div
                      className="
                        flex items-center
                        justify-between gap-3
                      "
                    >
                      <span
                        className="
                          inline-flex items-center gap-1.5
                        "
                      >
                        <WalletCards className="h-3.5 w-3.5" />
                        Límite de caja
                      </span>

                      <span
                        className="
                          text-right font-medium
                          tabular-nums
                          text-slate-950
                          dark:text-white
                        "
                      >
                        {formatMoney(
                          usuario.limiteCajaCobrador,
                        )}
                      </span>
                    </div>
                  ) : null}

                  {usuario.rol === "cliente" ? (
                    <div
                      className="
                        flex items-center
                        justify-between gap-3
                      "
                    >
                      <span
                        className="
                          inline-flex items-center gap-1.5
                        "
                      >
                        <UserRound className="h-3.5 w-3.5" />
                        Cliente
                      </span>

                      <span
                        className="
                          text-right font-medium
                          text-slate-950
                          dark:text-white
                        "
                      >
                        {usuario.clienteId
                          ? "Vinculado"
                          : "Sin vínculo"}
                      </span>
                    </div>
                  ) : null}

                  <div
                    className="
                      flex items-center
                      justify-between gap-3
                    "
                  >
                    <span
                      className="
                        inline-flex items-center gap-1.5
                      "
                    >
                      <CalendarClock className="h-3.5 w-3.5" />
                      Último acceso
                    </span>

                    <span
                      className="
                        text-right tabular-nums
                      "
                    >
                      {formatDateTime(
                        usuario.ultimoAcceso,
                      )}
                    </span>
                  </div>

                  <div
                    className="
                      flex items-center
                      justify-between gap-3
                    "
                  >
                    <span>Creado</span>

                    <span
                      className="
                        text-right tabular-nums
                      "
                    >
                      {formatDate(
                        usuario.creadoEn,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  editarUsuario(usuario.id)
                }
                className="
                  flex h-10 w-full items-center
                  justify-center gap-2
                  border-t border-slate-200
                  bg-slate-50
                  text-sm font-medium
                  text-blue-700 transition
                  hover:bg-blue-100
                  active:bg-blue-100
                  dark:border-[#263451]
                  dark:bg-[#0e172a]
                  dark:text-indigo-300
                  dark:hover:bg-[#16223c]
                "
              >
                <Pencil className="h-4 w-4" />
                Editar usuario
              </button>
            </article>
          );
        })}
      </div>
    </>
  );
}
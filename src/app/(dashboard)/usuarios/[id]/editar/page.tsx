// // src/app/(dashboard)/usuarios/[id]/editar/page.tsx

// import { notFound } from "next/navigation";
// import {
//   CalendarClock,
//   CheckCircle2,
//   IdCard,
//   KeyRound,
//   Mail,
//   ShieldCheck,
//   UserRound,
// } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import { EditarUsuarioForm } from "@/components/forms/EditarUsuarioForm";
// import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
// import { obtenerUsuarioPorId } from "@/services/usuario.service";

// type EditarUsuarioPageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Editar usuario",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof UserRound;
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
//     <div className="flex h-full min-h-[78px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:min-h-[104px] sm:rounded-[1.35rem] sm:p-3">
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

//           <p className="mt-0.5 truncate text-[15px] font-medium leading-none tracking-tight text-slate-950 dark:text-white sm:mt-1 sm:text-lg">
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

// function rolLabel(rol: string) {
//   if (rol === "admin") return "Admin";
//   if (rol === "cobrador") return "Cobrador";
//   return "Cliente";
// }

// function estadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   return "Suspendido";
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

// function formatDateTime(value?: string | null) {
//   if (!value) return "Nunca";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Nunca";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   let hours = date.getHours();
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const period = hours >= 12 ? "p. m." : "a. m.";

//   hours = hours % 12;
//   hours = hours === 0 ? 12 : hours;

//   return `${day}/${month}/${year}, ${String(hours).padStart(
//     2,
//     "0",
//   )}:${minutes} ${period}`;
// }

// export default async function EditarUsuarioPage({
//   params,
// }: EditarUsuarioPageProps) {
//   const usuario = await obtenerUsuarioPorId(params.id);

//   if (!usuario) {
//     notFound();
//   }

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Usuario"
//           value={rolLabel(usuario.rol)}
//           description="Rol actual del usuario."
//           icon={UserRound}
//           tone="cyan"
//         />

//         <StatCard
//           title="Estado"
//           value={estadoLabel(usuario.estado)}
//           description="Estado de acceso al sistema."
//           icon={CheckCircle2}
//           tone={usuario.estado === "activo" ? "emerald" : "red"}
//         />

//         <StatCard
//           title="Seguridad"
//           shortTitle="Clave"
//           value={usuario.debeCambiarPassword ? "Cambiar" : "OK"}
//           description="Estado de la contraseña."
//           icon={KeyRound}
//           tone={usuario.debeCambiarPassword ? "amber" : "emerald"}
//         />

//         <StatCard
//           title="DNI"
//           value={usuario.dni || "-"}
//           description="Documento registrado."
//           icon={IdCard}
//           tone="violet"
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Creado"
//             value={formatDate(usuario.creadoEn)}
//             description="Fecha de alta del usuario."
//             icon={CalendarClock}
//             tone="amber"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//               Usuarios
//             </p>

//             <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//               Editar usuario
//             </h1>

//             <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//               Modificá datos básicos, rol, estado de acceso, seguridad y
//               configuración operativa del usuario registrado.
//             </p>
//           </div>

//           <EditarUsuarioForm usuario={usuario} />

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
//             <div className="mb-3 flex items-start gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
//                 <KeyRound className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
//                   Reset de contraseña
//                 </p>

//                 <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                   Generar contraseña temporal
//                 </h2>

//                 <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   Usá esta opción si el usuario olvidó su clave. El sistema
//                   generará una contraseña temporal y obligará el cambio al
//                   iniciar sesión.
//                 </p>
//               </div>
//             </div>

//             <ResetPasswordForm usuarioId={usuario.id} />
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Resumen
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Información del usuario
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <UserRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Rol
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   {rolLabel(usuario.rol)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <ShieldCheck className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Estado
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                     usuario.estado === "activo"
//                       ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                       : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                   }`}
//                 >
//                   {estadoLabel(usuario.estado)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <KeyRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Contraseña
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                     usuario.debeCambiarPassword
//                       ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
//                       : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                   }`}
//                 >
//                   {usuario.debeCambiarPassword ? "Cambio requerido" : "OK"}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <Mail className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Email
//                 </span>

//                 <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//                   {usuario.email}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Último acceso
//                 </span>

//                 <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//                   {formatDateTime(usuario.ultimoAcceso)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Creado
//                 </span>

//                 <span className="text-right text-[11px] text-slate-500 dark:text-slate-400">
//                   {formatDate(usuario.creadoEn)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-amber-200 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 xl:block">
//             <p className="font-medium">Importante</p>

//             <p className="mt-1">
//               El reset de contraseña mostrará la clave temporal una sola vez.
//               Copiala antes de salir de esta pantalla.
//             </p>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/usuarios/[id]/editar/page.tsx

// import { notFound } from "next/navigation";
// import {
//   CalendarClock,
//   CheckCircle2,
//   IdCard,
//   KeyRound,
//   Mail,
//   ShieldCheck,
//   UserRound,
// } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import { EditarUsuarioForm } from "@/components/forms/EditarUsuarioForm";
// import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
// import { obtenerUsuarioPorId } from "@/services/usuario.service";
// import type { UsuarioSafe } from "@/types/usuario.types";

// type EditarUsuarioPageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Editar usuario",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof UserRound;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// const cardBase =
//   "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// const innerCardBase =
//   "rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none";

// const statToneClasses = {
//   cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
//   emerald:
//     "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950",
//   amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
//   red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
//   violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
// };

// function rolLabel(rol: string) {
//   if (rol === "admin") return "Admin";
//   if (rol === "cobrador") return "Cobrador";
//   return "Cliente";
// }

// function estadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   return "Suspendido";
// }

// function getNombreCompleto(usuario: UsuarioSafe) {
//   const apellido = String(usuario.apellido || "").trim();
//   const nombre = String(usuario.nombre || "").trim();

//   const completo = `${apellido}, ${nombre}`
//     .replace(/^,\s*/, "")
//     .replace(/,\s*$/, "")
//     .trim();

//   return completo || "Usuario";
// }

// function formatDate(value?: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin fecha";

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

// function getUltimoAcceso(usuario: UsuarioSafe) {
//   const usuarioConAcceso = usuario as UsuarioSafe & {
//     ultimoAcceso?: string | null;
//   };

//   return usuarioConAcceso.ultimoAcceso || null;
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
//           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ${statToneClasses[tone]}`}
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

// function MobileHeader({ usuario }: { usuario: UsuarioSafe }) {
//   return (
//     <section className={`${cardBase} p-3`}>
//       <div className="flex items-start gap-3">
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           <UserRound className="h-5 w-5" />
//         </div>

//         <div className="min-w-0 flex-1">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Editar usuario
//           </p>

//           <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             {getNombreCompleto(usuario)}
//           </h1>

//           <div className="mt-2 flex flex-wrap gap-2">
//             <span className="inline-flex rounded-full border border-cyan-300 bg-cyan-50 px-2.5 py-1 text-[10px] font-medium text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-300">
//               {rolLabel(usuario.rol)}
//             </span>

//             <span
//               className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//                 usuario.estado === "activo"
//                   ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//                   : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
//               }`}
//             >
//               {estadoLabel(usuario.estado)}
//             </span>

//             <span
//               className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//                 usuario.debeCambiarPassword
//                   ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300"
//                   : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//               }`}
//             >
//               {usuario.debeCambiarPassword ? "Cambiar clave" : "Clave OK"}
//             </span>
//           </div>

//           <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             DNI {usuario.dni || "-"} · {usuario.email}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ResumenUsuario({ usuario }: { usuario: UsuarioSafe }) {
//   return (
//     <div className={`${cardBase} p-3.5`}>
//       <div className="mb-3">
//         <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//           Resumen
//         </p>

//         <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//           Información del usuario
//         </h2>
//       </div>

//       <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <UserRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Rol
//           </span>

//           <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//             {rolLabel(usuario.rol)}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <ShieldCheck className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Estado
//           </span>

//           <span
//             className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//               usuario.estado === "activo"
//                 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                 : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//             }`}
//           >
//             {estadoLabel(usuario.estado)}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <KeyRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Contraseña
//           </span>

//           <span
//             className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//               usuario.debeCambiarPassword
//                 ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
//                 : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//             }`}
//           >
//             {usuario.debeCambiarPassword ? "Cambio requerido" : "OK"}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <Mail className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Email
//           </span>

//           <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//             {usuario.email}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Último acceso
//           </span>

//           <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//             {formatDateTime(getUltimoAcceso(usuario))}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Creado
//           </span>

//           <span className="text-right text-[11px] text-slate-500 dark:text-slate-400">
//             {formatDate(usuario.creadoEn)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ResetPasswordPanel({ usuarioId }: { usuarioId: string }) {
//   return (
//     <div className={`${cardBase} p-3 sm:p-3.5`}>
//       <div className="mb-3 flex items-start gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-900/70">
//           <KeyRound className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
//             Reset de contraseña
//           </p>

//           <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//             Generar contraseña temporal
//           </h2>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Usá esta opción si el usuario olvidó su clave. La clave temporal se
//             mostrará una sola vez.
//           </p>
//         </div>
//       </div>

//       <ResetPasswordForm usuarioId={usuarioId} />
//     </div>
//   );
// }

// export default async function EditarUsuarioPage({
//   params,
// }: EditarUsuarioPageProps) {
//   const usuario = await obtenerUsuarioPorId(params.id);

//   if (!usuario) {
//     notFound();
//   }

//   return (
//     <PageShell maxWidth="wide">
//       <div className="space-y-3 lg:hidden">
//         <MobileHeader usuario={usuario} />

//         <EditarUsuarioForm usuario={usuario} />

//         <ResetPasswordPanel usuarioId={usuario.id} />
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Usuario"
//             value={rolLabel(usuario.rol)}
//             description="Rol actual del usuario."
//             icon={UserRound}
//             tone="cyan"
//           />

//           <StatCard
//             title="Estado"
//             value={estadoLabel(usuario.estado)}
//             description="Estado de acceso."
//             icon={CheckCircle2}
//             tone={usuario.estado === "activo" ? "emerald" : "red"}
//           />

//           <StatCard
//             title="Seguridad"
//             value={usuario.debeCambiarPassword ? "Cambiar" : "OK"}
//             description="Estado de la clave."
//             icon={KeyRound}
//             tone={usuario.debeCambiarPassword ? "amber" : "emerald"}
//           />

//           <StatCard
//             title="DNI"
//             value={usuario.dni || "-"}
//             description="Documento registrado."
//             icon={IdCard}
//             tone="violet"
//           />

//           <StatCard
//             title="Creado"
//             value={formatDate(usuario.creadoEn)}
//             description="Fecha de alta."
//             icon={CalendarClock}
//             tone="amber"
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Usuarios
//                 </p>

//                 <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                   Editar usuario
//                 </h1>

//                 <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   Modificá datos básicos, rol, estado de acceso y configuración
//                   operativa del usuario.
//                 </p>
//               </div>

//               <EditarUsuarioForm usuario={usuario} />

//               <ResetPasswordPanel usuarioId={usuario.id} />
//             </DashboardMain>

//             <DashboardAside>
//               <ResumenUsuario usuario={usuario} />

//               <div className="rounded-[1.45rem] border border-amber-300 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm shadow-amber-950/5 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 dark:shadow-none">
//                 <p className="font-medium">Importante</p>

//                 <p className="mt-1">
//                   El reset de contraseña mostrará la clave temporal una sola
//                   vez. Copiala antes de salir de esta pantalla.
//                 </p>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }


// // src/app/(dashboard)/usuarios/[id]/editar/page.tsx

// import { notFound } from "next/navigation";
// import {
//   CalendarClock,
//   CheckCircle2,
//   IdCard,
//   KeyRound,
//   Mail,
//   ShieldCheck,
//   UserRound,
// } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import { EditarUsuarioForm } from "@/components/forms/EditarUsuarioForm";
// import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
// import { obtenerUsuarioPorId } from "@/services/usuario.service";
// import type { UsuarioSafe } from "@/types/usuario.types";

// type EditarUsuarioPageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Editar usuario",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof UserRound;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// const cardBase =
//   "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// const statToneClasses = {
//   cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
//   emerald:
//     "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950",
//   amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
//   red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
//   violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
// };

// function rolLabel(rol: string) {
//   if (rol === "admin") return "Admin";
//   if (rol === "cobrador") return "Cobrador";
//   return "Cliente";
// }

// function estadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   return "Suspendido";
// }

// function getNombreCompleto(usuario: UsuarioSafe) {
//   const apellido = String(usuario.apellido || "").trim();
//   const nombre = String(usuario.nombre || "").trim();

//   const completo = `${apellido}, ${nombre}`
//     .replace(/^,\s*/, "")
//     .replace(/,\s*$/, "")
//     .trim();

//   return completo || "Usuario";
// }

// function formatDate(value?: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin fecha";

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

// function getUltimoAcceso(usuario: UsuarioSafe) {
//   const usuarioConAcceso = usuario as UsuarioSafe & {
//     ultimoAcceso?: string | null;
//   };

//   return usuarioConAcceso.ultimoAcceso || null;
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
//           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ${statToneClasses[tone]}`}
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

// function MobileHeader({ usuario }: { usuario: UsuarioSafe }) {
//   return (
//     <section className={`${cardBase} p-3`}>
//       <div className="flex items-start gap-3">
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           <UserRound className="h-5 w-5" />
//         </div>

//         <div className="min-w-0 flex-1">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Editar usuario
//           </p>

//           <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             {getNombreCompleto(usuario)}
//           </h1>

//           <div className="mt-2 flex flex-wrap gap-2">
//             <span className="inline-flex rounded-full border border-cyan-300 bg-cyan-50 px-2.5 py-1 text-[10px] font-medium text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-300">
//               {rolLabel(usuario.rol)}
//             </span>

//             <span
//               className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//                 usuario.estado === "activo"
//                   ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//                   : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
//               }`}
//             >
//               {estadoLabel(usuario.estado)}
//             </span>

//             <span
//               className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//                 usuario.debeCambiarPassword
//                   ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300"
//                   : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//               }`}
//             >
//               {usuario.debeCambiarPassword ? "Cambiar clave" : "Clave OK"}
//             </span>
//           </div>

//           <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             DNI {usuario.dni || "-"} · {usuario.email}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ResumenUsuario({ usuario }: { usuario: UsuarioSafe }) {
//   return (
//     <div className={`${cardBase} p-3.5`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div>
//           <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Resumen
//           </p>

//           <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//             Información del usuario
//           </h2>
//         </div>

//         <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//           <UserRound className="h-4 w-4" />
//         </div>
//       </div>

//       <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <UserRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Rol
//           </span>

//           <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//             {rolLabel(usuario.rol)}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <ShieldCheck className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Estado
//           </span>

//           <span
//             className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//               usuario.estado === "activo"
//                 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                 : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//             }`}
//           >
//             {estadoLabel(usuario.estado)}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <KeyRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Contraseña
//           </span>

//           <span
//             className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//               usuario.debeCambiarPassword
//                 ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
//                 : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//             }`}
//           >
//             {usuario.debeCambiarPassword ? "Cambio requerido" : "OK"}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <Mail className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Email
//           </span>

//           <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//             {usuario.email}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Último acceso
//           </span>

//           <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//             {formatDateTime(getUltimoAcceso(usuario))}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//           <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//             <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Creado
//           </span>

//           <span className="text-right text-[11px] text-slate-500 dark:text-slate-400">
//             {formatDate(usuario.creadoEn)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ResetPasswordPanel({ usuarioId }: { usuarioId: string }) {
//   return (
//     <div className={`${cardBase} p-3 sm:p-3.5`}>
//       <div className="mb-3 flex items-start gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-900/70">
//           <KeyRound className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
//             Reset de contraseña
//           </p>

//           <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//             Generar contraseña temporal
//           </h2>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Usá esta opción si el usuario olvidó su clave. La clave temporal se
//             mostrará una sola vez.
//           </p>
//         </div>
//       </div>

//       <ResetPasswordForm usuarioId={usuarioId} />
//     </div>
//   );
// }

// export default async function EditarUsuarioPage({
//   params,
// }: EditarUsuarioPageProps) {
//   const usuario = await obtenerUsuarioPorId(params.id);

//   if (!usuario) {
//     notFound();
//   }

//   return (
//     <PageShell maxWidth="wide">
//       <div className="space-y-3 lg:hidden">
//         <MobileHeader usuario={usuario} />

//         <EditarUsuarioForm usuario={usuario} />

//         <ResetPasswordPanel usuarioId={usuario.id} />
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Usuario"
//             value={rolLabel(usuario.rol)}
//             description="Rol actual."
//             icon={UserRound}
//             tone="cyan"
//           />

//           <StatCard
//             title="Estado"
//             value={estadoLabel(usuario.estado)}
//             description="Acceso al sistema."
//             icon={CheckCircle2}
//             tone={usuario.estado === "activo" ? "emerald" : "red"}
//           />

//           <StatCard
//             title="Seguridad"
//             value={usuario.debeCambiarPassword ? "Cambiar" : "OK"}
//             description="Estado de clave."
//             icon={KeyRound}
//             tone={usuario.debeCambiarPassword ? "amber" : "emerald"}
//           />

//           <StatCard
//             title="DNI"
//             value={usuario.dni || "-"}
//             description="Documento."
//             icon={IdCard}
//             tone="violet"
//           />

//           <StatCard
//             title="Creado"
//             value={formatDate(usuario.creadoEn)}
//             description="Fecha de alta."
//             icon={CalendarClock}
//             tone="amber"
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <EditarUsuarioForm usuario={usuario} variant="desktop" />

//               <div className="mt-3">
//                 <ResetPasswordPanel usuarioId={usuario.id} />
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <ResumenUsuario usuario={usuario} />

//               <div className="rounded-[1.45rem] border border-amber-300 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm shadow-amber-950/5 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 dark:shadow-none">
//                 <p className="font-medium">Importante</p>

//                 <p className="mt-1">
//                   El reset de contraseña mostrará la clave temporal una sola
//                   vez. Copiala antes de salir de esta pantalla.
//                 </p>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/usuarios/[id]/editar/page.tsx

import { notFound } from "next/navigation";
import {
  CalendarClock,
  CheckCircle2,
  IdCard,
  KeyRound,
  Mail,
  ShieldAlert,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import { EditarUsuarioForm } from "@/components/forms/EditarUsuarioForm";
import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerUsuarioPorId } from "@/services/usuario.service";
import type { UsuarioSafe } from "@/types/usuario.types";

type EditarUsuarioPageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Editar usuario",
};

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: typeof UserRound;
  tone: "cyan" | "emerald" | "amber" | "red" | "violet";
};

type PermisosEdicion = {
  actorEsProtegido: boolean;
  usuarioEsProtegido: boolean;
  puedeEditarDatos: boolean;
  puedeCambiarRolEstado: boolean;
  puedeResetearPassword: boolean;
  avisoEdicion?: string;
  avisoReset?: string;
};

const cardBase =
  "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

const statToneClasses = {
  cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
  emerald:
    "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950",
  amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
  red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
  violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
};

function rolLabel(rol: string) {
  if (rol === "admin") return "Admin";
  if (rol === "cobrador") return "Cobrador";
  return "Cliente";
}

function estadoLabel(estado: string) {
  if (estado === "activo") return "Activo";
  return "Suspendido";
}

function getNombreCompleto(usuario: UsuarioSafe) {
  const apellido = String(usuario.apellido || "").trim();
  const nombre = String(usuario.nombre || "").trim();

  const completo = `${apellido}, ${nombre}`
    .replace(/^,\s*/, "")
    .replace(/,\s*$/, "")
    .trim();

  return completo || "Usuario";
}

function formatDate(value?: string | null) {
  if (!value) return "Sin fecha";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Sin fecha";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatDateTime(value?: string | null) {
  if (!value) return "Nunca";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Nunca";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function getUltimoAcceso(usuario: UsuarioSafe) {
  const usuarioConAcceso = usuario as UsuarioSafe & {
    ultimoAcceso?: string | null;
  };

  return usuarioConAcceso.ultimoAcceso || null;
}

function construirPermisos(
  usuario: UsuarioSafe,
  actor: UsuarioSafe | null,
): PermisosEdicion {
  const actorEsProtegido = Boolean(actor?.esProtegido);
  const usuarioEsProtegido = Boolean(usuario.esProtegido);

  if (!usuarioEsProtegido) {
    return {
      actorEsProtegido,
      usuarioEsProtegido,
      puedeEditarDatos: true,
      puedeCambiarRolEstado: true,
      puedeResetearPassword: true,
    };
  }

  if (actorEsProtegido) {
    return {
      actorEsProtegido,
      usuarioEsProtegido,
      puedeEditarDatos: true,
      puedeCambiarRolEstado: false,
      puedeResetearPassword: true,
      avisoEdicion:
        "Administrador protegido: podés editar datos básicos, pero no cambiar rol ni suspenderlo.",
      avisoReset:
        "Administrador protegido: el reset de contraseña está permitido solo entre administradores protegidos.",
    };
  }

  return {
    actorEsProtegido,
    usuarioEsProtegido,
    puedeEditarDatos: false,
    puedeCambiarRolEstado: false,
    puedeResetearPassword: false,
    avisoEdicion:
      "Este administrador está protegido. Solo otro administrador protegido puede editar sus datos básicos.",
    avisoReset:
      "Este administrador está protegido. Solo otro administrador protegido puede generar una contraseña temporal.",
  };
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
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ${statToneClasses[tone]}`}
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

function MobileHeader({ usuario }: { usuario: UsuarioSafe }) {
  return (
    <section className={`${cardBase} p-3`}>
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
          <UserRound className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
            Editar usuario
          </p>

          <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {getNombreCompleto(usuario)}
          </h1>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-cyan-300 bg-cyan-50 px-2.5 py-1 text-[10px] font-medium text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-300">
              {rolLabel(usuario.rol)}
            </span>

            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                usuario.estado === "activo"
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
                  : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
              }`}
            >
              {estadoLabel(usuario.estado)}
            </span>

            {usuario.esProtegido ? (
              <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[10px] font-medium text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300">
                Protegido
              </span>
            ) : null}

            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                usuario.debeCambiarPassword
                  ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300"
                  : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
              }`}
            >
              {usuario.debeCambiarPassword ? "Cambiar clave" : "Clave OK"}
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
            DNI {usuario.dni || "-"} · {usuario.email}
          </p>
        </div>
      </div>
    </section>
  );
}

function ResumenUsuario({ usuario }: { usuario: UsuarioSafe }) {
  return (
    <div className={`${cardBase} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Resumen
          </p>

          <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            Información del usuario
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
          <UserRound className="h-4 w-4" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            <UserRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
            Rol
          </span>

          <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            {rolLabel(usuario.rol)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
            Estado
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              usuario.estado === "activo"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
            }`}
          >
            {estadoLabel(usuario.estado)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            <ShieldAlert className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
            Protección
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              usuario.esProtegido
                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            {usuario.esProtegido ? "Protegido" : "Normal"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            <KeyRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
            Contraseña
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              usuario.debeCambiarPassword
                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
            }`}
          >
            {usuario.debeCambiarPassword ? "Cambio requerido" : "OK"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            <Mail className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
            Email
          </span>

          <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
            {usuario.email}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
            Último acceso
          </span>

          <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
            {formatDateTime(getUltimoAcceso(usuario))}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 px-3 py-2.5">
          <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
            <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
            Creado
          </span>

          <span className="text-right text-[11px] text-slate-500 dark:text-slate-400">
            {formatDate(usuario.creadoEn)}
          </span>
        </div>
      </div>
    </div>
  );
}

function ResetPasswordPanel({
  usuarioId,
  permisos,
}: {
  usuarioId: string;
  permisos: PermisosEdicion;
}) {
  return (
    <div className={`${cardBase} p-3 sm:p-3.5`}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-900/70">
          <KeyRound className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            Reset de contraseña
          </p>

          <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
            Generar contraseña temporal
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
            Usá esta opción si el usuario olvidó su clave. La clave temporal se
            mostrará una sola vez.
          </p>
        </div>
      </div>

      <ResetPasswordForm
        usuarioId={usuarioId}
        disabled={!permisos.puedeResetearPassword}
        disabledMessage={permisos.avisoReset}
      />
    </div>
  );
}

export default async function EditarUsuarioPage({
  params,
}: EditarUsuarioPageProps) {
  const usuario = await obtenerUsuarioPorId(params.id);

  if (!usuario) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  const actor = currentUser?.userId
    ? await obtenerUsuarioPorId(currentUser.userId)
    : null;

  const permisos = construirPermisos(usuario, actor);

  return (
    <PageShell maxWidth="wide">
      <div className="space-y-3 lg:hidden">
        <MobileHeader usuario={usuario} />

        <EditarUsuarioForm
          usuario={usuario}
          puedeEditarDatos={permisos.puedeEditarDatos}
          puedeCambiarRolEstado={permisos.puedeCambiarRolEstado}
          avisoPermisos={permisos.avisoEdicion}
        />

        <ResetPasswordPanel usuarioId={usuario.id} permisos={permisos} />
      </div>

      <div className="hidden lg:block">
        <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Usuario"
            value={rolLabel(usuario.rol)}
            description={usuario.esProtegido ? "Admin protegido." : "Rol actual."}
            icon={UserRound}
            tone="cyan"
          />

          <StatCard
            title="Estado"
            value={estadoLabel(usuario.estado)}
            description="Acceso al sistema."
            icon={CheckCircle2}
            tone={usuario.estado === "activo" ? "emerald" : "red"}
          />

          <StatCard
            title="Seguridad"
            value={usuario.debeCambiarPassword ? "Cambiar" : "OK"}
            description="Estado de clave."
            icon={KeyRound}
            tone={usuario.debeCambiarPassword ? "amber" : "emerald"}
          />

          <StatCard
            title="DNI"
            value={usuario.dni || "-"}
            description="Documento."
            icon={IdCard}
            tone="violet"
          />

          <StatCard
            title="Protección"
            value={usuario.esProtegido ? "Sí" : "No"}
            description={
              usuario.esProtegido
                ? "Solo admins protegidos."
                : "Gestión normal."
            }
            icon={ShieldAlert}
            tone={usuario.esProtegido ? "amber" : "emerald"}
          />
        </div>

        <div className="mt-5">
          <DashboardGrid>
            <DashboardMain>
              <EditarUsuarioForm
                usuario={usuario}
                variant="desktop"
                puedeEditarDatos={permisos.puedeEditarDatos}
                puedeCambiarRolEstado={permisos.puedeCambiarRolEstado}
                avisoPermisos={permisos.avisoEdicion}
              />

              <div className="mt-3">
                <ResetPasswordPanel usuarioId={usuario.id} permisos={permisos} />
              </div>
            </DashboardMain>

            <DashboardAside>
              <ResumenUsuario usuario={usuario} />

              <div className="rounded-[1.45rem] border border-amber-300 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm shadow-amber-950/5 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 dark:shadow-none">
                <p className="font-medium">Importante</p>

                <p className="mt-1">
                  El reset de contraseña mostrará la clave temporal una sola
                  vez. Copiala antes de salir de esta pantalla.
                </p>
              </div>
            </DashboardAside>
          </DashboardGrid>
        </div>
      </div>
    </PageShell>
  );
}
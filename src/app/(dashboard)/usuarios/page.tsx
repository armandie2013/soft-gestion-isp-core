// // src/app/(dashboard)/usuarios/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   ArrowRight,
//   Clock3,
//   Search,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerUsuarios } from "@/services/usuario.service";
// import { UsuariosTable } from "@/components/tables/UsuariosTable";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import type { UsuarioSafe } from "@/types/usuario.types";

// export const metadata = {
//   title: "Usuarios",
// };

// type UsuariosPageProps = {
//   searchParams?: {
//     q?: string;
//     rol?: string;
//     estado?: string;
//     seguridad?: string;
//   };
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof UsersRound;
//   tone: "cyan" | "emerald" | "amber" | "violet" | "red";
// };

// const toneClasses = {
//   cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
//   emerald:
//     "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
//   amber:
//     "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
//   violet:
//     "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
//   red: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
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
//     <div className="flex h-full min-h-[78px] flex-col justify-between rounded-2xl border border-slate-200 bg-white/85 p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:min-h-[122px] sm:rounded-[1.35rem] sm:p-3.5">
//       <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
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

//           <p className="mt-0.5 text-lg font-medium leading-none tracking-tight text-slate-950 dark:text-white sm:mt-1 sm:text-xl">
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

// function normalizarTexto(value: string) {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/\p{Diacritic}/gu, "")
//     .trim();
// }

// function filtrarUsuarios({
//   usuarios,
//   q,
//   rol,
//   estado,
//   seguridad,
// }: {
//   usuarios: UsuarioSafe[];
//   q: string;
//   rol: string;
//   estado: string;
//   seguridad: string;
// }) {
//   const busqueda = normalizarTexto(q);

//   return usuarios.filter((usuario) => {
//     const textoUsuario = normalizarTexto(
//       `${usuario.nombre} ${usuario.apellido} ${usuario.email} ${usuario.dni}`,
//     );

//     const coincideBusqueda = !busqueda || textoUsuario.includes(busqueda);
//     const coincideRol = rol === "todos" || usuario.rol === rol;
//     const coincideEstado = estado === "todos" || usuario.estado === estado;

//     const coincideSeguridad =
//       seguridad === "todos" ||
//       (seguridad === "cambio" && usuario.debeCambiarPassword) ||
//       (seguridad === "ok" && !usuario.debeCambiarPassword);

//     return (
//       coincideBusqueda && coincideRol && coincideEstado && coincideSeguridad
//     );
//   });
// }

// const quickActions = [
//   {
//     label: "Ver administradores",
//     description: "Filtrar usuarios con acceso total",
//     href: "/usuarios?rol=admin",
//     icon: ShieldCheck,
//   },
//   {
//     label: "Ver cobradores",
//     description: "Filtrar usuarios cobradores",
//     href: "/usuarios?rol=cobrador",
//     icon: WalletCards,
//   },
//   {
//     label: "Ver clientes",
//     description: "Filtrar usuarios clientes",
//     href: "/usuarios?rol=cliente",
//     icon: UserRound,
//   },
// ];

// export default async function UsuariosPage({ searchParams }: UsuariosPageProps) {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const usuarios = await obtenerUsuarios();

//   const q = String(searchParams?.q || "");
//   const rol = String(searchParams?.rol || "todos");
//   const estado = String(searchParams?.estado || "todos");
//   const seguridad = String(searchParams?.seguridad || "todos");

//   const usuariosFiltrados = filtrarUsuarios({
//     usuarios,
//     q,
//     rol,
//     estado,
//     seguridad,
//   });

//   const totalUsuarios = usuarios.length;
//   const totalAdmins = usuarios.filter(
//     (usuario) => usuario.rol === "admin",
//   ).length;
//   const totalCobradores = usuarios.filter(
//     (usuario) => usuario.rol === "cobrador",
//   ).length;
//   const totalClientes = usuarios.filter(
//     (usuario) => usuario.rol === "cliente",
//   ).length;
//   const totalSuspendidos = usuarios.filter(
//     (usuario) => usuario.estado === "suspendido",
//   ).length;
//   const totalCambioRequerido = usuarios.filter(
//     (usuario) => usuario.debeCambiarPassword,
//   ).length;
//   const totalActivos = usuarios.filter(
//     (usuario) => usuario.estado === "activo",
//   ).length;

//   const usuariosRecientes = usuarios.slice(0, 3);

//   return (
//     <PageShell maxWidth="wide">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Usuarios totales"
//           shortTitle="Usuarios"
//           value={String(totalUsuarios)}
//           description="Todos los usuarios registrados."
//           icon={UsersRound}
//           tone="cyan"
//         />

//         <StatCard
//           title="Administradores"
//           shortTitle="Admin"
//           value={String(totalAdmins)}
//           description="Acceso completo al sistema."
//           icon={ShieldCheck}
//           tone="emerald"
//         />

//         <StatCard
//           title="Cobradores"
//           shortTitle="Cobr."
//           value={String(totalCobradores)}
//           description="Usuarios con cobranza asignada."
//           icon={WalletCards}
//           tone="amber"
//         />

//         <StatCard
//           title="Clientes"
//           value={String(totalClientes)}
//           description="Acceso limitado al portal."
//           icon={UserRound}
//           tone="violet"
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Pendientes"
//             value={String(totalCambioRequerido)}
//             description="Usuarios con cambio requerido."
//             icon={Clock3}
//             tone={totalCambioRequerido > 0 ? "red" : "emerald"}
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-2.5 flex flex-col gap-2.5">
//               <div>
//                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Usuarios
//                 </p>

//                 <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                   Gestión de usuarios
//                 </h1>

//                 <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                   Administrá roles, estado de acceso y seguridad de los usuarios
//                   que se registraron en el sistema.
//                 </p>
//               </div>
//             </div>

//             <form
//               action="/usuarios"
//               className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-950/50 lg:grid-cols-[minmax(280px,1fr)_150px_135px_155px_auto]"
//             >
//               <div className="relative">
//                 <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

//                 <input
//                   name="q"
//                   defaultValue={q}
//                   placeholder="Buscar por nombre, email o DNI"
//                   className="h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 pl-8 text-[11px] text-slate-950 outline-none transition placeholder:text-[11px] placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600"
//                 />
//               </div>

//               <select
//                 name="rol"
//                 defaultValue={rol}
//                 className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
//               >
//                 <option value="todos">Todos los roles</option>
//                 <option value="admin">Admin</option>
//                 <option value="cobrador">Cobrador</option>
//                 <option value="cliente">Cliente</option>
//               </select>

//               <select
//                 name="estado"
//                 defaultValue={estado}
//                 className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
//               >
//                 <option value="todos">Todos</option>
//                 <option value="activo">Activos</option>
//                 <option value="suspendido">Suspendidos</option>
//               </select>

//               <select
//                 name="seguridad"
//                 defaultValue={seguridad}
//                 className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
//               >
//                 <option value="todos">Seguridad</option>
//                 <option value="ok">Clave OK</option>
//                 <option value="cambio">Cambiar clave</option>
//               </select>

//               <div className="flex gap-2">
//                 <button
//                   type="submit"
//                   className="inline-flex h-8 flex-1 items-center justify-center rounded-lg bg-cyan-600 px-3 text-[11px] font-medium text-white transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 lg:flex-none"
//                 >
//                   Filtrar
//                 </button>

//                 <Link
//                   href="/usuarios"
//                   className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
//                 >
//                   Limpiar
//                 </Link>
//               </div>
//             </form>
//           </div>

//           <UsuariosTable
//             usuarios={usuariosFiltrados}
//             totalUsuarios={totalUsuarios}
//           />
//         </DashboardMain>

//         <DashboardAside>
//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Acciones rápidas
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Filtros rápidos de usuarios
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               {quickActions.map((item) => {
//                 const Icon = item.icon;

//                 return (
//                   <Link
//                     key={item.href}
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
//                 Estado de accesos
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Información general
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Usuarios activos
//                 </span>

//                 <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                   {totalActivos}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Suspendidos
//                 </span>

//                 <span className="text-xs font-medium text-red-700 dark:text-red-300">
//                   {totalSuspendidos}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Cambio requerido
//                 </span>

//                 <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                   {totalCambioRequerido}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Filtro aplicado
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   {usuariosFiltrados.length}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Usuarios recientes
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Últimos registros del sistema
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               {usuariosRecientes.length === 0 ? (
//                 <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                   No hay usuarios recientes.
//                 </div>
//               ) : (
//                 usuariosRecientes.map((usuario) => (
//                   <Link
//                     key={usuario.id}
//                     href={`/usuarios/${usuario.id}/editar`}
//                     className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//                   >
//                     <div className="min-w-0">
//                       <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                         {usuario.apellido}, {usuario.nombre}
//                       </p>

//                       <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                         {usuario.email}
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

// // src/app/(dashboard)/usuarios/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   ArrowRight,
//   CheckCircle2,
//   ChevronDown,
//   Clock3,
//   KeyRound,
//   Search,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerUsuarios } from "@/services/usuario.service";
// import { UsuariosTable } from "@/components/tables/UsuariosTable";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import type { UsuarioSafe } from "@/types/usuario.types";

// export const metadata = {
//   title: "Usuarios",
// };

// type UsuariosPageProps = {
//   searchParams?: {
//     q?: string;
//     rol?: string;
//     estado?: string;
//     seguridad?: string;
//   };
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof UsersRound;
//   tone: "cyan" | "emerald" | "amber" | "violet" | "red";
// };

// const toneClasses = {
//   cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
//   emerald:
//     "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950",
//   amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
//   violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
//   red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
// };

// const cardBase =
//   "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// function formatMoney(value?: number | null) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function normalizarTexto(value: string) {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/\p{Diacritic}/gu, "")
//     .trim();
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

// function getInitials(usuario: UsuarioSafe) {
//   const nombreCompleto = getNombreCompleto(usuario)
//     .replace(",", " ")
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (nombreCompleto.length === 0) return "US";

//   return nombreCompleto
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function getLimiteCajaCobrador(usuario: UsuarioSafe) {
//   const usuarioConLimite = usuario as UsuarioSafe & {
//     limiteCajaCobrador?: number | null;
//   };

//   if (usuario.rol !== "cobrador") return null;

//   return Math.max(Number(usuarioConLimite.limiteCajaCobrador || 100000), 100000);
// }

// function filtrarUsuarios({
//   usuarios,
//   q,
//   rol,
//   estado,
//   seguridad,
// }: {
//   usuarios: UsuarioSafe[];
//   q: string;
//   rol: string;
//   estado: string;
//   seguridad: string;
// }) {
//   const busqueda = normalizarTexto(q);

//   return usuarios.filter((usuario) => {
//     const textoUsuario = normalizarTexto(
//       `${usuario.nombre} ${usuario.apellido} ${usuario.email} ${usuario.dni}`,
//     );

//     const coincideBusqueda = !busqueda || textoUsuario.includes(busqueda);
//     const coincideRol = rol === "todos" || usuario.rol === rol;
//     const coincideEstado = estado === "todos" || usuario.estado === estado;

//     const coincideSeguridad =
//       seguridad === "todos" ||
//       (seguridad === "cambio" && usuario.debeCambiarPassword) ||
//       (seguridad === "ok" && !usuario.debeCambiarPassword);

//     return (
//       coincideBusqueda && coincideRol && coincideEstado && coincideSeguridad
//     );
//   });
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

// function RolBadge({ rol }: { rol: string }) {
//   const className =
//     rol === "admin"
//       ? "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-300"
//       : rol === "cobrador"
//         ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300"
//         : "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/35 dark:text-violet-300";

//   const label =
//     rol === "admin" ? "Admin" : rol === "cobrador" ? "Cobrador" : "Cliente";

//   return (
//     <span
//       className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-medium ${className}`}
//     >
//       {label}
//     </span>
//   );
// }

// function EstadoBadge({ estado }: { estado: string }) {
//   const activo = estado === "activo";

//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//         activo
//           ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//           : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
//       }`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {activo ? "Activo" : "Suspendido"}
//     </span>
//   );
// }

// function SelectFiltro({
//   name,
//   value,
//   children,
// }: {
//   name: string;
//   value: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="relative">
//       <select
//         name={name}
//         defaultValue={value}
//         className="h-10 w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 px-3 pr-8 text-[10px] font-medium text-slate-700 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-cyan-700 dark:focus:bg-slate-900 dark:focus:ring-cyan-500/10"
//       >
//         {children}
//       </select>

//       <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
//     </div>
//   );
// }

// function FiltrosUsuarios({
//   q,
//   rol,
//   estado,
//   seguridad,
// }: {
//   q: string;
//   rol: string;
//   estado: string;
//   seguridad: string;
// }) {
//   const inputClassName =
//     "h-10 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 pl-9 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-700 dark:focus:bg-slate-900";

//   return (
//     <form
//       action="/usuarios"
//       className="grid gap-2 rounded-2xl border border-slate-300 bg-white p-2 shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none lg:grid-cols-[minmax(280px,1fr)_150px_135px_155px_auto]"
//     >
//       <div className="relative">
//         <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

//         <input
//           name="q"
//           defaultValue={q}
//           placeholder="Buscar por nombre, email o DNI"
//           className={inputClassName}
//         />
//       </div>

//       <SelectFiltro name="rol" value={rol}>
//         <option value="todos">Todos los roles</option>
//         <option value="admin">Admin</option>
//         <option value="cobrador">Cobrador</option>
//         <option value="cliente">Cliente</option>
//       </SelectFiltro>

//       <SelectFiltro name="estado" value={estado}>
//         <option value="todos">Todos</option>
//         <option value="activo">Activos</option>
//         <option value="suspendido">Suspendidos</option>
//       </SelectFiltro>

//       <SelectFiltro name="seguridad" value={seguridad}>
//         <option value="todos">Seguridad</option>
//         <option value="ok">Clave OK</option>
//         <option value="cambio">Cambiar clave</option>
//       </SelectFiltro>

//       <div className="flex gap-2">
//         <button
//           type="submit"
//           className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-cyan-600 px-3 text-[11px] font-medium text-white transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 lg:flex-none"
//         >
//           Filtrar
//         </button>

//         <Link
//           href="/usuarios"
//           className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-[11px] font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
//         >
//           Limpiar
//         </Link>
//       </div>
//     </form>
//   );
// }

// function MobileUsuarioCard({ usuario }: { usuario: UsuarioSafe }) {
//   const limiteCaja = getLimiteCajaCobrador(usuario);

//   return (
//     <article className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//       <div className="flex items-start gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-semibold text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           {getInitials(usuario)}
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex items-start justify-between gap-2">
//             <div className="min-w-0">
//               <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//                 {getNombreCompleto(usuario)}
//               </p>

//               <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
//                 {usuario.email}
//               </p>
//             </div>

//             <EstadoBadge estado={usuario.estado} />
//           </div>

//           <div className="mt-3 flex flex-wrap gap-2">
//             <RolBadge rol={usuario.rol} />

//             {usuario.debeCambiarPassword ? (
//               <span className="inline-flex w-fit items-center rounded-full border border-red-300 bg-red-50 px-2.5 py-1 text-[10px] font-medium text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300">
//                 Cambiar clave
//               </span>
//             ) : (
//               <span className="inline-flex w-fit items-center rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
//                 Clave OK
//               </span>
//             )}
//           </div>

//           <div className="mt-3 grid grid-cols-2 gap-2">
//             <div className="rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
//               <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//                 DNI
//               </p>

//               <p className="mt-1 truncate text-xs font-medium text-slate-950 dark:text-white">
//                 {usuario.dni || "-"}
//               </p>
//             </div>

//             <div className="rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
//               <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//                 Estado
//               </p>

//               <p className="mt-1 truncate text-xs font-medium text-slate-950 dark:text-white">
//                 {usuario.estado === "activo" ? "Activo" : "Suspendido"}
//               </p>
//             </div>
//           </div>

//           {usuario.rol === "cobrador" ? (
//             <div className="mt-2 rounded-2xl border border-amber-300 bg-amber-50 px-3 py-2 dark:border-amber-900/70 dark:bg-amber-950/30">
//               <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
//                 Límite de caja
//               </p>

//               <p className="mt-1 text-sm font-medium text-amber-800 dark:text-amber-300">
//                 {formatMoney(limiteCaja)}
//               </p>
//             </div>
//           ) : null}

//           <div className="mt-3">
//             <Link
//               href={`/usuarios/${usuario.id}/editar`}
//               className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//             >
//               Editar usuario
//               <ArrowRight className="h-3.5 w-3.5" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// function MobileUsuariosGestion({
//   usuarios,
//   q,
//   rol,
//   estado,
//   seguridad,
// }: {
//   usuarios: UsuarioSafe[];
//   q: string;
//   rol: string;
//   estado: string;
//   seguridad: string;
// }) {
//   return (
//     <div className="space-y-3">
//       <section className={`${cardBase} p-3`}>
//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Usuarios
//           </p>

//           <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             Gestión de usuarios
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Buscá por nombre, email o DNI y entrá a editar el usuario correcto.
//           </p>
//         </div>
//       </section>

//       <section className={`${cardBase} p-3`}>
//         <div className="mb-3">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Buscar
//           </p>

//           <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//             Filtros de usuarios
//           </h2>
//         </div>

//         <FiltrosUsuarios
//           q={q}
//           rol={rol}
//           estado={estado}
//           seguridad={seguridad}
//         />
//       </section>

//       <section className={`${cardBase} p-3`}>
//         <div className="mb-3 flex items-center justify-between gap-3">
//           <div>
//             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//               Resultados
//             </p>

//             <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//               {usuarios.length} usuario{usuarios.length === 1 ? "" : "s"}
//             </h2>
//           </div>

//           <Link
//             href="/usuarios"
//             className="inline-flex h-8 items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-[11px] font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
//           >
//             Ver todos
//           </Link>
//         </div>

//         {usuarios.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//             No hay usuarios que coincidan con los filtros aplicados.
//           </div>
//         ) : (
//           <div className="grid gap-2">
//             {usuarios.map((usuario) => (
//               <MobileUsuarioCard key={usuario.id} usuario={usuario} />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// export default async function UsuariosPage({ searchParams }: UsuariosPageProps) {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const usuarios = await obtenerUsuarios();

//   const q = String(searchParams?.q || "");
//   const rol = String(searchParams?.rol || "todos");
//   const estado = String(searchParams?.estado || "todos");
//   const seguridad = String(searchParams?.seguridad || "todos");

//   const usuariosFiltrados = filtrarUsuarios({
//     usuarios,
//     q,
//     rol,
//     estado,
//     seguridad,
//   });

//   const totalUsuarios = usuarios.length;
//   const totalAdmins = usuarios.filter(
//     (usuario) => usuario.rol === "admin",
//   ).length;
//   const totalCobradores = usuarios.filter(
//     (usuario) => usuario.rol === "cobrador",
//   ).length;
//   const totalClientes = usuarios.filter(
//     (usuario) => usuario.rol === "cliente",
//   ).length;
//   const totalSuspendidos = usuarios.filter(
//     (usuario) => usuario.estado === "suspendido",
//   ).length;
//   const totalCambioRequerido = usuarios.filter(
//     (usuario) => usuario.debeCambiarPassword,
//   ).length;
//   const totalActivos = usuarios.filter(
//     (usuario) => usuario.estado === "activo",
//   ).length;

//   const usuariosRecientes = usuarios.slice(0, 4);

//   return (
//     <PageShell maxWidth="wide">
//       <div className="lg:hidden">
//         <MobileUsuariosGestion
//           usuarios={usuariosFiltrados}
//           q={q}
//           rol={rol}
//           estado={estado}
//           seguridad={seguridad}
//         />
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Usuarios totales"
//             value={String(totalUsuarios)}
//             description="Registrados."
//             icon={UsersRound}
//             tone="cyan"
//           />

//           <StatCard
//             title="Administradores"
//             value={String(totalAdmins)}
//             description="Acceso total."
//             icon={ShieldCheck}
//             tone="emerald"
//           />

//           <StatCard
//             title="Cobradores"
//             value={String(totalCobradores)}
//             description="Cobranza asignada."
//             icon={WalletCards}
//             tone="amber"
//           />

//           <StatCard
//             title="Clientes"
//             value={String(totalClientes)}
//             description="Portal cliente."
//             icon={UserRound}
//             tone="violet"
//           />

//           <StatCard
//             title="Pendientes"
//             value={String(totalCambioRequerido)}
//             description="Cambio requerido."
//             icon={Clock3}
//             tone={totalCambioRequerido > 0 ? "red" : "emerald"}
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3">
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Usuarios
//                   </p>

//                   <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                     Gestión de usuarios
//                   </h1>
//                 </div>

//                 <FiltrosUsuarios
//                   q={q}
//                   rol={rol}
//                   estado={estado}
//                   seguridad={seguridad}
//                 />
//               </div>

//               <div className="mt-3">
//                 <UsuariosTable
//                   usuarios={usuariosFiltrados}
//                   totalUsuarios={totalUsuarios}
//                 />
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Estado de accesos
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Información general
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <KeyRound className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                       <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-300" />
//                       Usuarios activos
//                     </span>

//                     <strong className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                       {totalActivos}
//                     </strong>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="text-xs text-slate-700 dark:text-slate-300">
//                       Suspendidos
//                     </span>

//                     <strong className="text-xs font-medium text-red-700 dark:text-red-300">
//                       {totalSuspendidos}
//                     </strong>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="text-xs text-slate-700 dark:text-slate-300">
//                       Cambio requerido
//                     </span>

//                     <strong className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                       {totalCambioRequerido}
//                     </strong>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                     <span className="text-xs text-slate-700 dark:text-slate-300">
//                       Filtro aplicado
//                     </span>

//                     <strong className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                       {usuariosFiltrados.length}
//                     </strong>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3">
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Usuarios recientes
//                   </p>

//                   <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                     Últimos registros del sistema
//                   </h2>
//                 </div>

//                 <div className="grid gap-2">
//                   {usuariosRecientes.length === 0 ? (
//                     <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                       No hay usuarios recientes.
//                     </div>
//                   ) : (
//                     usuariosRecientes.map((usuario) => (
//                       <Link
//                         key={usuario.id}
//                         href={`/usuarios/${usuario.id}/editar`}
//                         className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//                       >
//                         <div className="min-w-0">
//                           <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                             {getNombreCompleto(usuario)}
//                           </p>

//                           <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                             {usuario.email}
//                           </p>
//                         </div>

//                         <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
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

// src/app/(dashboard)/usuarios/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Clock3,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerUsuarios } from "@/services/usuario.service";
import { UsuariosTable } from "@/components/tables/UsuariosTable";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import type { UsuarioSafe } from "@/types/usuario.types";

export const metadata = {
  title: "Usuarios",
};

type UsuariosPageProps = {
  searchParams?: {
    q?: string;
    rol?: string;
    estado?: string;
    seguridad?: string;
  };
};

const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

const inputClass =
  "h-8 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-[12px] font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500";

const buttonPrimaryClass =
  "inline-flex h-8 items-center justify-center rounded-lg bg-blue-600 px-3 text-[12px] font-medium text-white transition hover:bg-blue-700 active:scale-[0.99] dark:bg-blue-500 dark:hover:bg-blue-400";

const buttonSecondaryClass =
  "inline-flex h-8 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

const sectionTitleClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

const sectionSubtitleClass =
  "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

const sectionDescriptionClass =
  "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

function normalizarTexto(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function rolLabel(value: string) {
  if (value === "admin") return "Administradores";
  if (value === "cobrador") return "Cobradores";
  if (value === "cliente") return "Clientes";
  return "Todos los roles";
}

function estadoLabel(value: string) {
  if (value === "activo") return "Activos";
  if (value === "suspendido") return "Suspendidos";
  return "Todos los estados";
}

function seguridadLabel(value: string) {
  if (value === "ok") return "Clave OK";
  if (value === "cambio") return "Cambio requerido";
  return "Todos";
}

function ordenarUsuarios(usuarios: UsuarioSafe[]) {
  const prioridadRol: Record<string, number> = {
    admin: 1,
    cobrador: 2,
    cliente: 3,
  };

  return [...usuarios].sort((a, b) => {
    const prioridadA = prioridadRol[a.rol] || 99;
    const prioridadB = prioridadRol[b.rol] || 99;

    if (prioridadA !== prioridadB) return prioridadA - prioridadB;

    const apellidoA = normalizarTexto(a.apellido || "");
    const apellidoB = normalizarTexto(b.apellido || "");

    if (apellidoA !== apellidoB) return apellidoA.localeCompare(apellidoB);

    return normalizarTexto(a.nombre || "").localeCompare(
      normalizarTexto(b.nombre || ""),
    );
  });
}

function filtrarUsuarios({
  usuarios,
  q,
  rol,
  estado,
  seguridad,
}: {
  usuarios: UsuarioSafe[];
  q: string;
  rol: string;
  estado: string;
  seguridad: string;
}) {
  const busqueda = normalizarTexto(q);

  return usuarios.filter((usuario) => {
    const textoUsuario = normalizarTexto(
      `${usuario.nombre} ${usuario.apellido} ${usuario.email} ${usuario.dni}`,
    );

    const coincideBusqueda = !busqueda || textoUsuario.includes(busqueda);
    const coincideRol = rol === "todos" || usuario.rol === rol;
    const coincideEstado = estado === "todos" || usuario.estado === estado;

    const coincideSeguridad =
      seguridad === "todos" ||
      (seguridad === "cambio" && usuario.debeCambiarPassword) ||
      (seguridad === "ok" && !usuario.debeCambiarPassword);

    return (
      coincideBusqueda && coincideRol && coincideEstado && coincideSeguridad
    );
  });
}

const quickActions = [
  {
    label: "Administradores",
    description: "Usuarios con acceso total",
    href: "/usuarios?rol=admin",
    icon: ShieldCheck,
  },
  {
    label: "Cobradores",
    description: "Usuarios que registran cobros",
    href: "/usuarios?rol=cobrador",
    icon: WalletCards,
  },
  {
    label: "Clientes",
    description: "Usuarios vinculados a clientes",
    href: "/usuarios?rol=cliente",
    icon: UserRound,
  },
  {
    label: "Cambio requerido",
    description: "Usuarios que deben actualizar clave",
    href: "/usuarios?seguridad=cambio",
    icon: Clock3,
  },
];

function ResumenItem({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  tone?: "neutral" | "success" | "danger" | "warning" | "primary";
}) {
  const toneClass = {
    neutral: "text-slate-950 dark:text-white",
    success: "text-emerald-700 dark:text-emerald-300",
    danger: "text-red-700 dark:text-red-300",
    warning: "text-amber-700 dark:text-amber-300",
    primary: "text-blue-700 dark:text-blue-300",
  }[tone];

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700">
      <span className="text-[12px] text-slate-700 dark:text-slate-300">
        {label}
      </span>

      <span className={`text-[12px] font-semibold ${toneClass}`}>{value}</span>
    </div>
  );
}

export default async function UsuariosPage({ searchParams }: UsuariosPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  const usuarios = await obtenerUsuarios();

  const q = String(searchParams?.q || "");
  const rol = String(searchParams?.rol || "todos");
  const estado = String(searchParams?.estado || "todos");
  const seguridad = String(searchParams?.seguridad || "todos");

  const usuariosFiltrados = ordenarUsuarios(
    filtrarUsuarios({
      usuarios,
      q,
      rol,
      estado,
      seguridad,
    }),
  );

  const totalUsuarios = usuarios.length;
  const totalActivos = usuarios.filter((usuario) => usuario.estado === "activo")
    .length;
  const totalSuspendidos = usuarios.filter(
    (usuario) => usuario.estado === "suspendido",
  ).length;
  const totalCambioRequerido = usuarios.filter(
    (usuario) => usuario.debeCambiarPassword,
  ).length;

  const filtroActivo =
    q.trim() !== "" ||
    rol !== "todos" ||
    estado !== "todos" ||
    seguridad !== "todos";

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <section className={`${panelClass} overflow-hidden`}>
            <div className="border-b border-slate-200 px-3.5 py-3.5 dark:border-slate-700 sm:border-b-0 sm:pb-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <p className={sectionTitleClass}>Usuarios</p>

                  <h1 className={sectionSubtitleClass}>
                    Gestión de usuarios
                  </h1>

                  <p className={`${sectionDescriptionClass} max-w-3xl`}>
                    Administración de accesos, roles, estados y seguridad de los
                    usuarios registrados en el sistema.
                  </p>
                </div>

                <div className="hidden shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-[12px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400 sm:flex">
                  <UsersRound className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                  Mostrando{" "}
                  <span className="font-semibold text-slate-950 dark:text-white">
                    {usuariosFiltrados.length}
                  </span>{" "}
                  de {totalUsuarios}
                </div>
              </div>
            </div>

            <div className="px-3.5 py-3 sm:pt-0">
              <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-[12px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400 sm:hidden">
                <UsersRound className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                Mostrando{" "}
                <span className="font-semibold text-slate-950 dark:text-white">
                  {usuariosFiltrados.length}
                </span>{" "}
                de {totalUsuarios}
              </div>

              <form
                action="/usuarios"
                className="grid gap-2 rounded-lg border border-slate-300 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-950/50 lg:grid-cols-[minmax(260px,1fr)_140px_140px_145px_auto]"
              >
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                  <input
                    name="q"
                    defaultValue={q}
                    placeholder="Buscar usuario"
                    className={`${inputClass} pl-8`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 lg:contents">
                  <select name="rol" defaultValue={rol} className={inputClass}>
                    <option value="todos">Roles</option>
                    <option value="admin">Admin</option>
                    <option value="cobrador">Cobrador</option>
                    <option value="cliente">Cliente</option>
                  </select>

                  <select
                    name="estado"
                    defaultValue={estado}
                    className={inputClass}
                  >
                    <option value="todos">Estados</option>
                    <option value="activo">Activos</option>
                    <option value="suspendido">Suspendidos</option>
                  </select>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-2 lg:contents">
                  <select
                    name="seguridad"
                    defaultValue={seguridad}
                    className={inputClass}
                  >
                    <option value="todos">Seguridad</option>
                    <option value="ok">Clave OK</option>
                    <option value="cambio">Cambiar clave</option>
                  </select>

                  <div className="flex gap-2">
                    <button type="submit" className={buttonPrimaryClass}>
                      Filtrar
                    </button>

                    <Link href="/usuarios" className={buttonSecondaryClass}>
                      Limpiar
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </section>

          <UsuariosTable
            usuarios={usuariosFiltrados}
            totalUsuarios={totalUsuarios}
          />
        </DashboardMain>

        <DashboardAside>
          <section className={`${panelClass} p-3.5`}>
            <div className="mb-3">
              <p className={sectionTitleClass}>Filtro actual</p>

              <h2 className={sectionSubtitleClass}>Vista aplicada</h2>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
              <ResumenItem label="Búsqueda" value={q.trim() || "Sin texto"} />
              <ResumenItem label="Rol" value={rolLabel(rol)} />
              <ResumenItem label="Estado" value={estadoLabel(estado)} />
              <ResumenItem label="Seguridad" value={seguridadLabel(seguridad)} />
              <ResumenItem
                label="Filtro aplicado"
                value={filtroActivo ? "Sí" : "No"}
                tone={filtroActivo ? "primary" : "neutral"}
              />
            </div>
          </section>

          <section className={`${panelClass} p-3.5`}>
            <div className="mb-3">
              <p className={sectionTitleClass}>Estado de accesos</p>

              <h2 className={sectionSubtitleClass}>Información general</h2>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
              <ResumenItem label="Total usuarios" value={totalUsuarios} />
              <ResumenItem
                label="Activos"
                value={totalActivos}
                tone="success"
              />
              <ResumenItem
                label="Suspendidos"
                value={totalSuspendidos}
                tone={totalSuspendidos > 0 ? "danger" : "neutral"}
              />
              <ResumenItem
                label="Cambio requerido"
                value={totalCambioRequerido}
                tone={totalCambioRequerido > 0 ? "warning" : "success"}
              />
            </div>
          </section>

          <section className={`${panelClass} hidden p-3.5 xl:block`}>
            <div className="mb-3">
              <p className={sectionTitleClass}>Accesos rápidos</p>

              <h2 className={sectionSubtitleClass}>Filtros frecuentes</h2>
            </div>

            <div className="grid gap-2">
              {quickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
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
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
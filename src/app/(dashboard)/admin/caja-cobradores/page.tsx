// // src/app/(dashboard)/admin/caja-cobradores/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   ArrowRight,
//   Banknote,
//   CheckCircle2,
//   KeyRound,
//   ShieldAlert,
//   UsersRound,
//   WalletCards,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerAdminCajaCobradoresResumen } from "@/services/cobro.service";
// import { AdminCobradoresCajaTable } from "@/components/tables/AdminCobradoresCajaTable";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Caja cobradores",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof WalletCards;
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

// const quickActions = [
//   {
//     label: "Ver cierres realizados",
//     description: "Consultar historial de cierres",
//     href: "/admin/caja-cobradores/cierres",
//     icon: CheckCircle2,
//   },
//   {
//     label: "Usuarios cobradores",
//     description: "Filtrar usuarios con rol cobrador",
//     href: "/usuarios?rol=cobrador",
//     icon: UsersRound,
//   },
//   {
//     label: "Panel administrador",
//     description: "Volver al dashboard principal",
//     href: "/admin",
//     icon: Banknote,
//   },
// ];

// export default async function AdminCajaCobradoresPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const resumen = await obtenerAdminCajaCobradoresResumen();

//   const cobradoresConCodigo = resumen.cobradores.filter(
//     (cobrador) => cobrador.codigoPendiente,
//   );

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="En caja cobradores"
//           shortTitle="En caja"
//           value={formatCompactMoney(resumen.totalSaldoCobradores)}
//           description="Importe total pendiente de cierre."
//           icon={WalletCards}
//           tone={resumen.totalSaldoCobradores > 0 ? "red" : "emerald"}
//         />

//         <StatCard
//           title="Recibido por admin"
//           shortTitle="Admin"
//           value={formatCompactMoney(resumen.totalRecibidoAdmin)}
//           description="Total acumulado por cierres confirmados."
//           icon={Banknote}
//           tone="cyan"
//         />

//         <StatCard
//           title="Con saldo"
//           value={String(resumen.cantidadCobradoresConSaldo)}
//           description={`De ${resumen.cantidadCobradores} cobradores registrados.`}
//           icon={ShieldAlert}
//           tone={resumen.cantidadCobradoresConSaldo > 0 ? "amber" : "emerald"}
//         />

//         <StatCard
//           title="Códigos"
//           shortTitle="Cód."
//           value={String(resumen.cantidadCodigosPendientes)}
//           description="Códigos activos pendientes de uso."
//           icon={KeyRound}
//           tone={resumen.cantidadCodigosPendientes > 0 ? "amber" : "emerald"}
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Cierres realizados"
//             shortTitle="Cierres"
//             value={String(resumen.cantidadCierresRealizados)}
//             description="Cobradores con cierres registrados."
//             icon={CheckCircle2}
//             tone="violet"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
//               <div>
//                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Caja cobradores
//                 </p>

//                 <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                   Gestión de caja de cobradores
//                 </h1>

//                 <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                   Visualizá el saldo de cada cobrador, lo recibido por cierres y
//                   generá códigos de cierre por el importe exacto de caja.
//                 </p>
//               </div>

//               <Link
//                 href="/admin/caja-cobradores/cierres"
//                 className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 Ver cierres
//                 <ArrowRight className="h-3.5 w-3.5" />
//               </Link>
//             </div>
//           </div>

//           <AdminCobradoresCajaTable cobradores={resumen.cobradores} />
//         </DashboardMain>

//         <DashboardAside>
//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Acciones rápidas
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Atajos para caja y cobradores
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
//                 Estado de caja
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Información general
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Total en caja
//                 </span>

//                 <span
//                   className={`text-right text-xs font-medium ${
//                     resumen.totalSaldoCobradores > 0
//                       ? "text-red-700 dark:text-red-300"
//                       : "text-emerald-700 dark:text-emerald-300"
//                   }`}
//                 >
//                   {formatMoney(resumen.totalSaldoCobradores)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Recibido admin
//                 </span>

//                 <span className="text-right text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                   {formatMoney(resumen.totalRecibidoAdmin)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Cobradores con saldo
//                 </span>

//                 <span className="text-right text-xs font-medium text-amber-700 dark:text-amber-300">
//                   {resumen.cantidadCobradoresConSaldo}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Códigos pendientes
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   {resumen.cantidadCodigosPendientes}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Códigos activos
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Cierres pendientes de validación
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               {cobradoresConCodigo.length === 0 ? (
//                 <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                   No hay códigos activos.
//                 </div>
//               ) : (
//                 cobradoresConCodigo.map((cobrador) => (
//                   <div
//                     key={cobrador.cobradorId}
//                     className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/50"
//                   >
//                     <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                       {cobrador.apellido}, {cobrador.nombre}
//                     </p>

//                     <div className="mt-1 flex items-center justify-between gap-2">
//                       <span className="font-mono text-sm font-medium text-amber-700 dark:text-amber-300">
//                         {cobrador.codigoPendiente?.codigo}
//                       </span>

//                       <span className="text-[11px] text-slate-500 dark:text-slate-400">
//                         {formatMoney(cobrador.codigoPendiente?.importe || 0)}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/admin/caja-cobradores/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   ArrowRight,
//   Banknote,
//   CheckCircle2,
//   KeyRound,
//   ShieldAlert,
//   UsersRound,
//   WalletCards,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerAdminCajaCobradoresResumen } from "@/services/cobro.service";
// import { AdminCobradoresCajaTable } from "@/components/tables/AdminCobradoresCajaTable";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Caja cobradores",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof WalletCards;
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
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
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
//     label: "Ver cierres realizados",
//     description: "Consultar historial de cierres",
//     href: "/admin/caja-cobradores/cierres",
//     icon: CheckCircle2,
//   },
//   {
//     label: "Usuarios cobradores",
//     description: "Filtrar usuarios cobradores",
//     href: "/usuarios?rol=cobrador",
//     icon: UsersRound,
//   },
//   {
//     label: "Panel administrador",
//     description: "Volver al dashboard",
//     href: "/admin",
//     icon: Banknote,
//   },
// ];

// export default async function AdminCajaCobradoresPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const resumen = await obtenerAdminCajaCobradoresResumen();

//   const cobradoresConCodigo = resumen.cobradores.filter(
//     (cobrador) => cobrador.codigoPendiente,
//   );

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="lg:hidden">
//         <div className="mb-3 px-1">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Caja cobradores
//           </p>

//           <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             Gestión de caja
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Saldos, códigos y cierres de cobradores.
//           </p>
//         </div>

//         <AdminCobradoresCajaTable cobradores={resumen.cobradores} />
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="En caja cobradores"
//             value={formatCompactMoney(resumen.totalSaldoCobradores)}
//             description="Pendiente de cierre."
//             icon={WalletCards}
//             tone={resumen.totalSaldoCobradores > 0 ? "red" : "emerald"}
//           />

//           <StatCard
//             title="Recibido por admin"
//             value={formatCompactMoney(resumen.totalRecibidoAdmin)}
//             description="Cierres confirmados."
//             icon={Banknote}
//             tone="cyan"
//           />

//           <StatCard
//             title="Con saldo"
//             value={String(resumen.cantidadCobradoresConSaldo)}
//             description={`De ${resumen.cantidadCobradores} cobradores.`}
//             icon={ShieldAlert}
//             tone={resumen.cantidadCobradoresConSaldo > 0 ? "amber" : "emerald"}
//           />

//           <StatCard
//             title="Códigos"
//             value={String(resumen.cantidadCodigosPendientes)}
//             description="Pendientes de uso."
//             icon={KeyRound}
//             tone={resumen.cantidadCodigosPendientes > 0 ? "amber" : "emerald"}
//           />

//           <StatCard
//             title="Cierres realizados"
//             value={String(resumen.cantidadCierresRealizados)}
//             description="Historial registrado."
//             icon={CheckCircle2}
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
//                       <WalletCards className="h-4 w-4" />
//                     </div>

//                     <div className="min-w-0">
//                       <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                         Caja cobradores
//                       </p>

//                       <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                         Gestión de caja de cobradores
//                       </h1>

//                       <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                         Visualizá saldos, cierres confirmados y códigos
//                         pendientes.
//                       </p>
//                     </div>
//                   </div>

//                   <Link
//                     href="/admin/caja-cobradores/cierres"
//                     className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:bg-slate-800"
//                   >
//                     Ver cierres
//                     <ArrowRight className="h-3.5 w-3.5" />
//                   </Link>
//                 </div>
//               </div>

//               <AdminCobradoresCajaTable cobradores={resumen.cobradores} />
//             </DashboardMain>

//             <DashboardAside>
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
//                     <ArrowRight className="h-4 w-4" />
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
//                             <span className="block truncate">{item.label}</span>
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
//                       Estado de caja
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Información general
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <WalletCards className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className={innerCardBase}>
//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Total en caja
//                     </span>

//                     <span
//                       className={`text-right text-xs font-medium ${
//                         resumen.totalSaldoCobradores > 0
//                           ? "text-red-700 dark:text-red-300"
//                           : "text-emerald-700 dark:text-emerald-300"
//                       }`}
//                     >
//                       {formatMoney(resumen.totalSaldoCobradores)}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <Banknote className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Recibido admin
//                     </span>

//                     <span className="text-right text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                       {formatMoney(resumen.totalRecibidoAdmin)}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <ShieldAlert className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Cobradores con saldo
//                     </span>

//                     <span className="text-right text-xs font-medium text-amber-700 dark:text-amber-300">
//                       {resumen.cantidadCobradoresConSaldo}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <KeyRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Códigos pendientes
//                     </span>

//                     <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                       {resumen.cantidadCodigosPendientes}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Códigos activos
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Pendientes de validación
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <KeyRound className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className="grid gap-2">
//                   {cobradoresConCodigo.length === 0 ? (
//                     <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                       No hay códigos activos.
//                     </div>
//                   ) : (
//                     cobradoresConCodigo.map((cobrador) => (
//                       <div
//                         key={cobrador.cobradorId}
//                         className="rounded-2xl border border-slate-300 bg-white px-3 py-2.5 shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none"
//                       >
//                         <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                           {cobrador.apellido}, {cobrador.nombre}
//                         </p>

//                         <div className="mt-1 flex items-center justify-between gap-2">
//                           <span className="font-mono text-sm font-medium text-amber-700 dark:text-amber-300">
//                             {cobrador.codigoPendiente?.codigo}
//                           </span>

//                           <span className="text-[11px] text-slate-500 dark:text-slate-400">
//                             {formatMoney(
//                               cobrador.codigoPendiente?.importe || 0,
//                             )}
//                           </span>
//                         </div>
//                       </div>
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

// // src/app/(dashboard)/admin/caja-cobradores/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   ArrowRight,
//   Banknote,
//   CheckCircle2,
//   History,
//   KeyRound,
//   ShieldAlert,
//   UsersRound,
//   WalletCards,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerAdminCajaCobradoresResumen } from "@/services/cobro.service";
// import { AdminCobradoresCajaTable } from "@/components/tables/AdminCobradoresCajaTable";
// import { AdminCajaMovimientosRecientes } from "@/components/sections/AdminCajaMovimientosRecientes";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Caja cobradores",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof WalletCards;
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
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
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
//     label: "Ver cierres realizados",
//     description: "Consultar historial de cierres",
//     href: "/admin/caja-cobradores/cierres",
//     icon: CheckCircle2,
//   },
//   {
//     label: "Usuarios cobradores",
//     description: "Filtrar usuarios cobradores",
//     href: "/usuarios?rol=cobrador",
//     icon: UsersRound,
//   },
//   {
//     label: "Panel administrador",
//     description: "Volver al dashboard",
//     href: "/admin",
//     icon: Banknote,
//   },
// ];

// export default async function AdminCajaCobradoresPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const resumen = await obtenerAdminCajaCobradoresResumen();

//   const cobradoresConCodigo = resumen.cobradores.filter(
//     (cobrador) => cobrador.codigoPendiente,
//   );

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="lg:hidden">
//         <div className="mb-3 px-1">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Caja cobradores
//           </p>

//           <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             Gestión de caja
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Saldos, códigos, cierres y ajustes post-cierre.
//           </p>
//         </div>

//         <AdminCobradoresCajaTable cobradores={resumen.cobradores} />

//         <div className="mt-3">
//           <AdminCajaMovimientosRecientes cobradores={resumen.cobradores} />
//         </div>
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="En caja cobradores"
//             value={formatCompactMoney(resumen.totalSaldoCobradores)}
//             description="Pendiente de cierre."
//             icon={WalletCards}
//             tone={resumen.totalSaldoCobradores > 0 ? "red" : "emerald"}
//           />

//           <StatCard
//             title="Recibido por admin"
//             value={formatCompactMoney(resumen.totalRecibidoAdmin)}
//             description="Cierres confirmados."
//             icon={Banknote}
//             tone="cyan"
//           />

//           <StatCard
//             title="Con saldo"
//             value={String(resumen.cantidadCobradoresConSaldo)}
//             description={`De ${resumen.cantidadCobradores} cobradores.`}
//             icon={ShieldAlert}
//             tone={resumen.cantidadCobradoresConSaldo > 0 ? "amber" : "emerald"}
//           />

//           <StatCard
//             title="Post-cierre"
//             value={formatCompactMoney(resumen.totalAjustesPostCierre)}
//             description="Diferencias posteriores."
//             icon={History}
//             tone={resumen.totalAjustesPostCierre > 0 ? "amber" : "emerald"}
//           />

//           <StatCard
//             title="Cierres realizados"
//             value={String(resumen.cantidadCierresRealizados)}
//             description="Historial registrado."
//             icon={CheckCircle2}
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
//                       <WalletCards className="h-4 w-4" />
//                     </div>

//                     <div className="min-w-0">
//                       <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                         Caja cobradores
//                       </p>

//                       <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                         Gestión de caja de cobradores
//                       </h1>

//                       <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                         Visualizá saldos, cierres confirmados, códigos
//                         pendientes y correcciones posteriores al cierre.
//                       </p>
//                     </div>
//                   </div>

//                   <Link
//                     href="/admin/caja-cobradores/cierres"
//                     className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:bg-slate-800"
//                   >
//                     Ver cierres
//                     <ArrowRight className="h-3.5 w-3.5" />
//                   </Link>
//                 </div>
//               </div>

//               <AdminCobradoresCajaTable cobradores={resumen.cobradores} />

//               <AdminCajaMovimientosRecientes cobradores={resumen.cobradores} />
//             </DashboardMain>

//             <DashboardAside>
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
//                     <ArrowRight className="h-4 w-4" />
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
//                             <span className="block truncate">{item.label}</span>
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
//                       Estado de caja
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Información general
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <WalletCards className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className={innerCardBase}>
//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Total en caja
//                     </span>

//                     <span
//                       className={`text-right text-xs font-medium ${
//                         resumen.totalSaldoCobradores > 0
//                           ? "text-red-700 dark:text-red-300"
//                           : "text-emerald-700 dark:text-emerald-300"
//                       }`}
//                     >
//                       {formatMoney(resumen.totalSaldoCobradores)}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <Banknote className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Recibido admin
//                     </span>

//                     <span className="text-right text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                       {formatMoney(resumen.totalRecibidoAdmin)}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <History className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Ajustes post-cierre
//                     </span>

//                     <span className="text-right text-xs font-medium text-amber-700 dark:text-amber-300">
//                       {formatMoney(resumen.totalAjustesPostCierre)}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <ShieldAlert className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Cobradores con saldo
//                     </span>

//                     <span className="text-right text-xs font-medium text-amber-700 dark:text-amber-300">
//                       {resumen.cantidadCobradoresConSaldo}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <KeyRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Códigos pendientes
//                     </span>

//                     <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                       {resumen.cantidadCodigosPendientes}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Códigos activos
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Pendientes de validación
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <KeyRound className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className="grid gap-2">
//                   {cobradoresConCodigo.length === 0 ? (
//                     <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                       No hay códigos activos.
//                     </div>
//                   ) : (
//                     cobradoresConCodigo.map((cobrador) => (
//                       <div
//                         key={cobrador.cobradorId}
//                         className="rounded-2xl border border-slate-300 bg-white px-3 py-2.5 shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none"
//                       >
//                         <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                           {cobrador.apellido}, {cobrador.nombre}
//                         </p>

//                         <div className="mt-1 flex items-center justify-between gap-2">
//                           <span className="font-mono text-sm font-medium text-amber-700 dark:text-amber-300">
//                             {cobrador.codigoPendiente?.codigo}
//                           </span>

//                           <span className="text-[11px] text-slate-500 dark:text-slate-400">
//                             {formatMoney(
//                               cobrador.codigoPendiente?.importe || 0,
//                             )}
//                           </span>
//                         </div>
//                       </div>
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

// src/app/(dashboard)/admin/caja-cobradores/page.tsx

import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  History,
  KeyRound,
  ShieldAlert,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerAdminCajaCobradoresResumen } from "@/services/cobro.service";
import { AdminCobradoresCajaTable } from "@/components/tables/AdminCobradoresCajaTable";
import { AdminCajaMovimientosRecientes } from "@/components/sections/AdminCajaMovimientosRecientes";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Caja cobradores",
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

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
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

function HeaderCajaCobradores() {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Caja cobradores</p>

          <h1 className={sectionSubtitleClass}>
            Gestión de caja de cobradores
          </h1>

          <p className={`${sectionDescriptionClass} max-w-3xl`}>
            Visualizá saldos, cierres confirmados, códigos pendientes y
            correcciones posteriores al cierre.
          </p>
        </div>

        <Link
          href="/admin/caja-cobradores/cierres"
          className="hidden h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900 sm:inline-flex"
        >
          Ver cierres
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

function AccionesRapidasAside() {
  const quickActions = [
    {
      label: "Ver cierres realizados",
      description: "Consultar historial de cierres",
      href: "/admin/caja-cobradores/cierres",
      icon: CheckCircle2,
    },
    {
      label: "Usuarios cobradores",
      description: "Filtrar usuarios cobradores",
      href: "/usuarios?rol=cobrador",
      icon: UsersRound,
    },
    {
      label: "Panel administrador",
      description: "Volver al dashboard",
      href: "/admin",
      icon: Banknote,
    },
  ];

  return (
    <section className={`${panelClass} p-3.5`}>
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

function EstadoCajaAside({
  totalSaldoCobradores,
  totalRecibidoAdmin,
  totalAjustesPostCierre,
  cantidadCobradoresConSaldo,
  cantidadCodigosPendientes,
}: {
  totalSaldoCobradores: number;
  totalRecibidoAdmin: number;
  totalAjustesPostCierre: number;
  cantidadCobradoresConSaldo: number;
  cantidadCodigosPendientes: number;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Estado de caja</p>

          <h2 className={sectionSubtitleClass}>Información general</h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <WalletCards className="h-4 w-4" />
        </div>
      </div>

      <div className={innerPanelClass}>
        <ResumenItem
          icon={<WalletCards className="h-3.5 w-3.5" />}
          label="Total en caja"
          value={formatMoney(totalSaldoCobradores)}
          tone={totalSaldoCobradores > 0 ? "danger" : "success"}
        />

        <ResumenItem
          icon={<Banknote className="h-3.5 w-3.5" />}
          label="Recibido admin"
          value={formatMoney(totalRecibidoAdmin)}
          tone="primary"
        />

        <ResumenItem
          icon={<History className="h-3.5 w-3.5" />}
          label="Ajustes post-cierre"
          value={formatMoney(totalAjustesPostCierre)}
          tone={totalAjustesPostCierre > 0 ? "warning" : "neutral"}
        />

        <ResumenItem
          icon={<ShieldAlert className="h-3.5 w-3.5" />}
          label="Cobradores con saldo"
          value={cantidadCobradoresConSaldo}
          tone={cantidadCobradoresConSaldo > 0 ? "warning" : "success"}
        />

        <ResumenItem
          icon={<KeyRound className="h-3.5 w-3.5" />}
          label="Códigos pendientes"
          value={cantidadCodigosPendientes}
          tone={cantidadCodigosPendientes > 0 ? "primary" : "neutral"}
        />
      </div>
    </section>
  );
}

function CodigosActivosAside({
  cobradoresConCodigo,
}: {
  cobradoresConCodigo: Awaited<
    ReturnType<typeof obtenerAdminCajaCobradoresResumen>
  >["cobradores"];
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Códigos activos</p>

          <h2 className={sectionSubtitleClass}>Pendientes de validación</h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <KeyRound className="h-4 w-4" />
        </div>
      </div>

      <div className="grid gap-2">
        {cobradoresConCodigo.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-[12px] leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
            No hay códigos activos.
          </div>
        ) : (
          cobradoresConCodigo.map((cobrador) => (
            <div
              key={cobrador.cobradorId}
              className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/55 dark:shadow-black/10"
            >
              <p className="truncate text-[12px] font-semibold text-slate-950 dark:text-white">
                {cobrador.apellido}, {cobrador.nombre}
              </p>

              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-semibold tracking-[0.12em] text-amber-700 dark:text-amber-300">
                  {cobrador.codigoPendiente?.codigo}
                </span>

                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {formatMoney(cobrador.codigoPendiente?.importe || 0)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default async function AdminCajaCobradoresPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  const resumen = await obtenerAdminCajaCobradoresResumen();

  const cobradoresConCodigo = resumen.cobradores.filter(
    (cobrador) => cobrador.codigoPendiente,
  );

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <HeaderCajaCobradores />

          <div className="mt-3">
            <AdminCobradoresCajaTable cobradores={resumen.cobradores} />
          </div>

          <div className="mt-3">
            <AdminCajaMovimientosRecientes cobradores={resumen.cobradores} />
          </div>
        </DashboardMain>

        <DashboardAside>
          <AccionesRapidasAside />

          <div className="mt-3">
            <EstadoCajaAside
              totalSaldoCobradores={resumen.totalSaldoCobradores}
              totalRecibidoAdmin={resumen.totalRecibidoAdmin}
              totalAjustesPostCierre={resumen.totalAjustesPostCierre}
              cantidadCobradoresConSaldo={
                resumen.cantidadCobradoresConSaldo
              }
              cantidadCodigosPendientes={resumen.cantidadCodigosPendientes}
            />
          </div>

          <div className="mt-3">
            <CodigosActivosAside cobradoresConCodigo={cobradoresConCodigo} />
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
// // src/app/(dashboard)/admin/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   ArrowRight,
//   Banknote,
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   FileText,
//   ReceiptText,
//   Settings,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerAdminDashboardResumen } from "@/services/admin-dashboard.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Administrador",
// };

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function formatDate(value: string | null) {
//   if (!value) return "Sin cierre";

//   return new Intl.DateTimeFormat("es-AR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   }).format(new Date(value));
// }

// function formatDateTime(value: string | null) {
//   if (!value) return "Sin fecha";

//   return new Intl.DateTimeFormat("es-AR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(value));
// }

// function movimientoLabel(tipo: string) {
//   const labels: Record<string, string> = {
//     factura: "Factura",
//     pago: "Cobro",
//     nota_debito: "Nota débito",
//     nota_credito: "Nota crédito",
//   };

//   return labels[tipo] || "Movimiento";
// }

// function getInitials(name: string) {
//   const parts = name
//     .replace(",", " ")
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   href: string;
//   icon: typeof Banknote;
//   tone: "dark" | "red" | "cyan" | "violet" | "amber";
// };

// const statToneClasses = {
//   dark: "bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950",
//   red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
//   cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
//   violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
//   amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
// };

// function StatCard({
//   title,
//   value,
//   description,
//   href,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <Link
//       href={href}
//       className="group flex h-full min-h-[122px] flex-col justify-between rounded-[1.35rem] border border-slate-200 bg-white/85 p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/75 dark:hover:border-cyan-800"
//     >
//       <div className="flex items-start gap-3">
//         <div
//           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm ${statToneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
//             {title}
//           </p>

//           <p
//             className={`mt-1 text-xl font-medium tracking-tight ${
//               tone === "red"
//                 ? "text-red-700 dark:text-red-300"
//                 : "text-slate-950 dark:text-white"
//             }`}
//           >
//             {value}
//           </p>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             {description}
//           </p>
//         </div>
//       </div>

//       <div className="mt-3 flex items-center justify-end border-t border-slate-200 pt-2.5 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
//         Ver detalle
//         <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
//       </div>
//     </Link>
//   );
// }

// const quickActions = [
//   {
//     label: "Ver usuarios",
//     href: "/usuarios",
//     icon: UsersRound,
//   },
//   {
//     label: "Ver clientes",
//     href: "/clientes",
//     icon: UserRound,
//   },
//   {
//     label: "Caja cobradores",
//     href: "/admin/caja-cobradores",
//     icon: WalletCards,
//   },
//   {
//     label: "Facturación mensual",
//     href: "/admin/configuracion/facturacion",
//     icon: ReceiptText,
//   },
//   {
//     label: "Configuración",
//     href: "/admin/configuracion",
//     icon: Settings,
//   },
// ];

// export default async function AdminPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const resumen = await obtenerAdminDashboardResumen();
//   const hayMasDeUnCobrador = resumen.cobradores.length > 1;
//   const fechaActual = new Date().toISOString();

//   return (
//     <PageShell maxWidth="wide">
//       <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//         <StatCard
//           title="Cuenta administración"
//           value={formatMoney(resumen.totalCuentaAdmin)}
//           description="Total recibido por cierres de caja confirmados."
//           href="/admin/caja-cobradores/cierres"
//           icon={Banknote}
//           tone="dark"
//         />

//         <StatCard
//           title="En cobradores"
//           value={formatMoney(resumen.totalEnCajaCobradores)}
//           description="Total en cajas de cobradores sin confirmar."
//           href="/admin/caja-cobradores"
//           icon={WalletCards}
//           tone="red"
//         />

//         <div className="hidden h-full lg:block">
//           <StatCard
//             title="Cobradores activos"
//             value={String(resumen.totalCobradores)}
//             description="Cobradores con cuenta asignada activa."
//             href="/usuarios?rol=cobrador"
//             icon={UsersRound}
//             tone="cyan"
//           />
//         </div>

//         <div className="hidden h-full lg:block">
//           <StatCard
//             title="Clientes registrados"
//             value={String(resumen.totalClientes)}
//             description={`${resumen.clientesActivos} activos en el sistema.`}
//             href="/clientes"
//             icon={UserRound}
//             tone="violet"
//           />
//         </div>

//         <div className="hidden h-full lg:block">
//           <StatCard
//             title="Facturas emitidas"
//             value={String(resumen.facturasEmitidas)}
//             description="Movimientos emitidos como factura."
//             href="/admin/configuracion/facturacion"
//             icon={FileText}
//             tone="amber"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//               <div>
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Cobradores
//                 </p>

//                 <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                   Cuentas activas
//                 </h2>
//               </div>

//               <Link
//                 href="/admin/caja-cobradores"
//                 className="hidden items-center justify-end gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200 md:inline-flex"
//               >
//                 Ver caja cobradores
//                 <ArrowRight className="h-3.5 w-3.5" />
//               </Link>
//             </div>

//             {resumen.cobradores.length === 0 ? (
//               <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                 Todavía no hay usuarios con rol cobrador.
//               </div>
//             ) : (
//               <>
//                 <div className="hidden overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 md:block">
//                   <div className="grid grid-cols-[minmax(180px,1.25fr)_1fr_1fr_1fr_0.8fr_110px] border-b border-slate-200 bg-slate-50 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//                     <span>Cobrador</span>
//                     <span>Cuenta actual</span>
//                     <span>Último retiro</span>
//                     <span>Último cierre</span>
//                     <span>Situación</span>
//                     <span className="text-right">Acción</span>
//                   </div>

//                   <div className="divide-y divide-slate-200 dark:divide-slate-800">
//                     {resumen.cobradores.map((cobrador) => {
//                       const tieneSaldoPendiente = cobrador.saldoActual > 0;

//                       return (
//                         <div
//                           key={cobrador.cobradorId}
//                           className="grid grid-cols-[minmax(180px,1.25fr)_1fr_1fr_1fr_0.8fr_110px] items-center gap-3 px-3 py-3"
//                         >
//                           <div className="flex min-w-0 items-center gap-2.5">
//                             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                               {getInitials(cobrador.nombreCompleto)}
//                             </div>

//                             <div className="min-w-0">
//                               <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                                 {cobrador.nombreCompleto}
//                               </p>

//                               <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                                 {cobrador.email || "Sin email"}
//                               </p>
//                             </div>
//                           </div>

//                           <p
//                             className={`truncate text-xs font-medium ${
//                               tieneSaldoPendiente
//                                 ? "text-red-700 dark:text-red-300"
//                                 : "text-slate-950 dark:text-white"
//                             }`}
//                           >
//                             {formatMoney(cobrador.saldoActual)}
//                           </p>

//                           <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
//                             {formatMoney(cobrador.ultimoRetiroImporte)}
//                           </p>

//                           <p className="truncate text-xs text-slate-500 dark:text-slate-400">
//                             {formatDate(cobrador.ultimoRetiroFecha)}
//                           </p>

//                           <span
//                             title={
//                               tieneSaldoPendiente
//                                 ? "El cobrador tiene dinero pendiente de cierre o entrega."
//                                 : "El cobrador no tiene saldo pendiente en caja."
//                             }
//                             className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${
//                               tieneSaldoPendiente
//                                 ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300"
//                                 : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300"
//                             }`}
//                           >
//                             <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                             {tieneSaldoPendiente ? "Pendiente" : "Al día"}
//                           </span>

//                           <div className="text-right">
//                             <Link
//                               href="/admin/caja-cobradores"
//                               className="inline-flex h-8 items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 text-[11px] font-medium text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-cyan-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//                             >
//                               Ver detalle
//                             </Link>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="w-full overflow-hidden rounded-2xl md:hidden">
//                   <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//                     <div className="flex snap-x snap-mandatory">
//                       {resumen.cobradores.map((cobrador) => (
//                         <div
//                           key={cobrador.cobradorId}
//                           className="w-full min-w-full shrink-0 snap-start"
//                         >
//                           <Link
//                             href="/admin/caja-cobradores"
//                             className="block min-h-[140px] rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-cyan-800"
//                           >
//                             <div className="flex min-h-[116px] flex-col justify-between gap-2">
//                               <div className="min-w-0">
//                                 <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                                   {cobrador.nombreCompleto}
//                                 </p>

//                                 <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                                   Cuenta actual
//                                 </p>
//                               </div>

//                               <p
//                                 className={`text-2xl font-medium leading-none tracking-tight ${
//                                   cobrador.saldoActual > 0
//                                     ? "text-red-700 dark:text-red-300"
//                                     : "text-slate-950 dark:text-white"
//                                 }`}
//                               >
//                                 {formatMoney(cobrador.saldoActual)}
//                               </p>

//                               <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-2 dark:border-slate-800">
//                                 <div className="min-w-0">
//                                   <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//                                     Último retiro
//                                   </p>

//                                   <p className="truncate text-xs font-medium leading-5 text-slate-800 dark:text-slate-200">
//                                     {formatMoney(cobrador.ultimoRetiroImporte)}
//                                   </p>
//                                 </div>

//                                 <div className="min-w-0 text-right">
//                                   <div className="flex items-center justify-end gap-1 text-slate-500 dark:text-slate-400">
//                                     <CalendarClock className="h-3 w-3" />

//                                     <p className="text-[10px] font-medium uppercase tracking-[0.12em]">
//                                       Último cierre
//                                     </p>
//                                   </div>

//                                   <p className="truncate text-[11px] leading-5 text-slate-500 dark:text-slate-400">
//                                     {formatDate(cobrador.ultimoRetiroFecha)}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </Link>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {hayMasDeUnCobrador ? (
//                   <div className="mt-3 flex items-center justify-center gap-1.5 md:hidden">
//                     {resumen.cobradores.map((cobrador) => (
//                       <span
//                         key={cobrador.cobradorId}
//                         className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"
//                       />
//                     ))}
//                   </div>
//                 ) : null}

//                 <div className="mt-4 flex items-center justify-end border-t border-slate-200 pt-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400 md:hidden">
//                   <Link
//                     href="/admin/caja-cobradores"
//                     className="group inline-flex items-center text-slate-500 transition hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
//                   >
//                     Ver detalle
//                     <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
//                   </Link>
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 lg:block">
//             <div className="mb-3 flex items-start justify-between gap-3">
//               <div>
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Últimos movimientos
//                 </p>

//                 <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                   Movimientos recientes en el sistema
//                 </h2>
//               </div>

//               <Link
//                 href="/clientes"
//                 className="hidden items-center gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200 sm:inline-flex"
//               >
//                 Ver clientes
//                 <ArrowRight className="h-3.5 w-3.5" />
//               </Link>
//             </div>

//             {resumen.ultimosMovimientos.length === 0 ? (
//               <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                 Todavía no hay movimientos financieros registrados.
//               </div>
//             ) : (
//               <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//                 <div className="hidden grid-cols-[150px_120px_1fr_130px_120px] border-b border-slate-200 bg-slate-50 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400 md:grid">
//                   <span>Fecha</span>
//                   <span>Tipo</span>
//                   <span>Detalle</span>
//                   <span>Importe</span>
//                   <span>Estado</span>
//                 </div>

//                 <div className="divide-y divide-slate-200 dark:divide-slate-800">
//                   {resumen.ultimosMovimientos.map((movimiento) => (
//                     <div
//                       key={movimiento.id}
//                       className="grid gap-3 p-3 md:grid-cols-[150px_120px_1fr_130px_120px] md:items-center"
//                     >
//                       <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
//                         {formatDateTime(movimiento.fecha)}
//                       </p>

//                       <div className="flex items-center gap-2">
//                         <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                           <ReceiptText className="h-3.5 w-3.5" />
//                         </span>

//                         <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
//                           {movimientoLabel(movimiento.tipoMovimiento)}
//                         </span>
//                       </div>

//                       <div className="min-w-0">
//                         <p className="truncate text-xs font-medium text-slate-900 dark:text-white">
//                           {movimiento.detalle}
//                         </p>

//                         <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                           {movimiento.usuarioNombre} · {movimiento.usuarioRol}
//                         </p>
//                       </div>

//                       <p className="text-xs font-medium text-slate-950 dark:text-white">
//                         {formatMoney(movimiento.importe)}
//                       </p>

//                       <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300">
//                         <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                         Confirmado
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Acciones rápidas
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Atajos a secciones principales
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
//                     <span className="flex items-center gap-2.5">
//                       <Icon className="h-3.5 w-3.5 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
//                       {item.label}
//                     </span>

//                     <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition group-hover:translate-x-0.5" />
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3 flex items-start justify-between gap-3">
//               <div>
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Resumen rápido
//                 </p>

//                 <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                   Datos principales
//                 </h2>
//               </div>

//               <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                 <ShieldCheck className="h-4 w-4" />
//               </div>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                   <UsersRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Clientes activos
//                 </span>

//                 <strong className="text-xs font-medium text-slate-950 dark:text-white">
//                   {resumen.clientesActivos}
//                 </strong>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                   <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Planes activos
//                 </span>

//                 <strong className="text-xs font-medium text-slate-950 dark:text-white">
//                   {resumen.planesActivos}
//                 </strong>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                   <Clock3 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Códigos pendientes
//                 </span>

//                 <strong
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                     resumen.codigosPendientes > 0
//                       ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
//                       : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
//                   }`}
//                 >
//                   {resumen.codigosPendientes}
//                 </strong>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                   <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Actualizado
//                 </span>

//                 <strong className="text-right text-[11px] font-medium text-slate-500 dark:text-slate-400">
//                   {formatDateTime(fechaActual)}
//                 </strong>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Estado del sistema
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Información general
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
//                 <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
//                   <span className="h-2 w-2 rounded-full bg-emerald-500" />
//                   Sesión activa
//                 </span>

//                 <span className="font-medium text-emerald-700 dark:text-emerald-300">
//                   Sí
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
//                 <span className="text-slate-600 dark:text-slate-400">
//                   Rol actual
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   Admin
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
//                 <span className="text-slate-600 dark:text-slate-400">
//                   Cobradores con saldo
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                     resumen.totalEnCajaCobradores > 0
//                       ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
//                       : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
//                   }`}
//                 >
//                   {resumen.cobradores.filter((c) => c.saldoActual > 0).length}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
//                 <span className="text-slate-600 dark:text-slate-400">
//                   Estado general
//                 </span>

//                 <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-300">
//                   <CheckCircle2 className="h-3.5 w-3.5" />
//                   Activo
//                 </span>
//               </div>
//             </div>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/admin/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   ArrowRight,
//   Banknote,
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   FileText,
//   ReceiptText,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerAdminDashboardResumen } from "@/services/admin-dashboard.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Administrador",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatDate(value: string | null) {
//   if (!value) return "Sin cierre";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin cierre";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

// function formatDateTime(value: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin fecha";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month}/${year} ${hours}:${minutes}`;
// }

// function movimientoLabel(tipo: string) {
//   const labels: Record<string, string> = {
//     factura: "Factura",
//     pago: "Cobro",
//     nota_debito: "Nota débito",
//     nota_credito: "Nota crédito",
//   };

//   return labels[tipo] || "Movimiento";
// }

// function getInitials(name: string) {
//   const parts = name
//     .replace(",", " ")
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   href: string;
//   icon: typeof Banknote;
//   tone: "dark" | "red" | "cyan" | "violet" | "amber";
// };

// const statToneClasses = {
//   dark: "bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950",
//   red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
//   cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
//   violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
//   amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
// };

// const cardBase =
//   "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// const innerCardBase =
//   "rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none";

// function StatCard({
//   title,
//   value,
//   description,
//   href,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <Link
//       href={href}
//       className="group flex h-full min-h-[122px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-slate-50/95 p-3.5 shadow-sm shadow-slate-300/60 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none dark:hover:border-cyan-800"
//     >
//       <div className="flex items-start gap-3">
//         <div
//           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm ${statToneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
//             {title}
//           </p>

//           <p
//             className={`mt-1 text-xl font-medium tracking-tight ${
//               tone === "red"
//                 ? "text-red-700 dark:text-red-300"
//                 : "text-slate-950 dark:text-white"
//             }`}
//           >
//             {value}
//           </p>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             {description}
//           </p>
//         </div>
//       </div>

//       <div className="mt-3 flex items-center justify-end border-t border-slate-300 pt-2.5 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
//         Ver detalle
//         <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
//       </div>
//     </Link>
//   );
// }

// function MobileHeroCard({
//   totalCuentaAdmin,
//   totalEnCajaCobradores,
// }: {
//   totalCuentaAdmin: number;
//   totalEnCajaCobradores: number;
// }) {
//   return (
//     <div className="rounded-[1.45rem] border border-cyan-300 bg-gradient-to-br from-slate-50 via-cyan-50 to-sky-100 p-4 shadow-sm shadow-cyan-950/10 dark:border-cyan-900/80 dark:bg-slate-900/80 dark:bg-none">
//       <div className="flex items-start gap-3">
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           <ShieldCheck className="h-5 w-5" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Administración
//           </p>

//           <h1 className="mt-1 text-2xl font-medium tracking-tight text-slate-950 dark:text-white">
//             Panel principal
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Vista rápida de caja, cobradores y movimientos.
//           </p>
//         </div>
//       </div>

//       <div className="mt-4 grid gap-2">
//         <div className="rounded-2xl border border-slate-300 bg-white/85 px-3 py-2.5 shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/45 dark:shadow-none">
//           <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
//             Cuenta administración
//           </p>

//           <p className="mt-1 truncate text-3xl font-medium tracking-tight text-slate-950 dark:text-white">
//             {formatMoney(totalCuentaAdmin)}
//           </p>
//         </div>

//         <div className="rounded-2xl border border-red-300 bg-red-50 px-3 py-2.5 shadow-sm shadow-red-950/5 dark:border-red-900/70 dark:bg-red-950/25 dark:shadow-none">
//           <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-red-700 dark:text-red-300">
//             En cobradores
//           </p>

//           <p className="mt-1 truncate text-2xl font-medium tracking-tight text-red-700 dark:text-red-300">
//             {formatMoney(totalEnCajaCobradores)}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MobileResumenOperativo({
//   clientesActivos,
//   planesActivos,
//   codigosPendientes,
//   totalCobradores,
//   facturasEmitidas,
// }: {
//   clientesActivos: number;
//   planesActivos: number;
//   codigosPendientes: number;
//   totalCobradores: number;
//   facturasEmitidas: number;
// }) {
//   return (
//     <div className={`${cardBase} p-3`}>
//       <div className="mb-3">
//         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//           Resumen operativo
//         </p>

//         <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//           Estado actual del sistema
//         </h2>
//       </div>

//       <div className="grid grid-cols-2 gap-2">
//         <div className={`${innerCardBase} px-3 py-2.5`}>
//           <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//             Clientes activos
//           </p>
//           <p className="mt-1 text-xl font-medium text-slate-950 dark:text-white">
//             {clientesActivos}
//           </p>
//         </div>

//         <div className={`${innerCardBase} px-3 py-2.5`}>
//           <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//             Planes activos
//           </p>
//           <p className="mt-1 text-xl font-medium text-slate-950 dark:text-white">
//             {planesActivos}
//           </p>
//         </div>

//         <div className={`${innerCardBase} px-3 py-2.5`}>
//           <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//             Cobradores
//           </p>
//           <p className="mt-1 text-xl font-medium text-slate-950 dark:text-white">
//             {totalCobradores}
//           </p>
//         </div>

//         <div className={`${innerCardBase} px-3 py-2.5`}>
//           <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//             Facturas
//           </p>
//           <p className="mt-1 text-xl font-medium text-slate-950 dark:text-white">
//             {facturasEmitidas}
//           </p>
//         </div>

//         <div
//           className={`col-span-2 rounded-2xl border px-3 py-2.5 shadow-sm ${
//             codigosPendientes > 0
//               ? "border-red-300 bg-red-50 shadow-red-950/5 dark:border-red-900/70 dark:bg-red-950/30 dark:shadow-none"
//               : "border-emerald-300 bg-emerald-50 shadow-emerald-950/5 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:shadow-none"
//           }`}
//         >
//           <div className="flex items-center justify-between gap-3">
//             <p
//               className={`text-[9px] font-medium uppercase tracking-[0.14em] ${
//                 codigosPendientes > 0
//                   ? "text-red-700 dark:text-red-300"
//                   : "text-emerald-700 dark:text-emerald-300"
//               }`}
//             >
//               Códigos pendientes
//             </p>

//             <p
//               className={`text-xl font-medium ${
//                 codigosPendientes > 0
//                   ? "text-red-700 dark:text-red-300"
//                   : "text-emerald-700 dark:text-emerald-300"
//               }`}
//             >
//               {codigosPendientes}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MobileCobradorCard({
//   cobrador,
// }: {
//   cobrador: {
//     cobradorId: string;
//     nombreCompleto: string;
//     email: string;
//     saldoActual: number;
//     ultimoRetiroImporte: number;
//     ultimoRetiroFecha: string | null;
//     tieneCodigoPendiente: boolean;
//     codigoPendienteImporte: number;
//   };
// }) {
//   const tieneSaldoPendiente = cobrador.saldoActual > 0;

//   return (
//     <div className="rounded-[1.2rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//       <div className="flex items-start gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-semibold text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           {getInitials(cobrador.nombreCompleto)}
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex items-start justify-between gap-2">
//             <div className="min-w-0">
//               <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                 {cobrador.nombreCompleto}
//               </p>

//               <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                 {cobrador.email || "Sin email"}
//               </p>
//             </div>

//             <span
//               className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//                 tieneSaldoPendiente
//                   ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
//                   : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//               }`}
//             >
//               {tieneSaldoPendiente ? "Pendiente" : "Al día"}
//             </span>
//           </div>

//           <div
//             className={`mt-2 rounded-2xl border px-3 py-2 ${
//               tieneSaldoPendiente
//                 ? "border-red-200 bg-red-50 dark:border-red-900/70 dark:bg-red-950/25"
//                 : "border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70"
//             }`}
//           >
//             <div className="flex items-center justify-between gap-3">
//               <p
//                 className={`text-[9px] font-medium uppercase tracking-[0.14em] ${
//                   tieneSaldoPendiente
//                     ? "text-red-700 dark:text-red-300"
//                     : "text-slate-500 dark:text-slate-400"
//                 }`}
//               >
//                 Caja actual
//               </p>

//               {cobrador.tieneCodigoPendiente ? (
//                 <span className="shrink-0 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//                   Código activo
//                 </span>
//               ) : null}
//             </div>

//             <p
//               className={`mt-1 truncate text-2xl font-semibold tracking-tight ${
//                 tieneSaldoPendiente
//                   ? "text-red-700 dark:text-red-300"
//                   : "text-slate-950 dark:text-white"
//               }`}
//             >
//               {formatMoney(cobrador.saldoActual)}
//             </p>
//           </div>

//           <div className="mt-2 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="flex items-center justify-between gap-3">
//               <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//                 Último retiro
//               </p>

//               <p className="shrink-0 text-[11px] font-medium text-slate-500 dark:text-slate-400">
//                 {formatDate(cobrador.ultimoRetiroFecha)}
//               </p>
//             </div>

//             <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//               {formatMoney(cobrador.ultimoRetiroImporte)}
//             </p>
//           </div>

//           {cobrador.tieneCodigoPendiente ? (
//             <div className="mt-2 rounded-2xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//               Código pendiente por{" "}
//               <span className="font-medium">
//                 {formatMoney(cobrador.codigoPendienteImporte)}
//               </span>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MobileCobradoresList({
//   cobradores,
// }: {
//   cobradores: Array<{
//     cobradorId: string;
//     nombreCompleto: string;
//     email: string;
//     saldoActual: number;
//     ultimoRetiroImporte: number;
//     ultimoRetiroFecha: string | null;
//     tieneCodigoPendiente: boolean;
//     codigoPendienteImporte: number;
//   }>;
// }) {
//   const cobradoresConSaldo = cobradores.filter(
//     (cobrador) => cobrador.saldoActual > 0 || cobrador.tieneCodigoPendiente,
//   );

//   const listado = cobradoresConSaldo.length > 0 ? cobradoresConSaldo : cobradores;

//   return (
//     <div className={`${cardBase} p-3`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Cobradores
//           </p>

//           <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//             Vista rápida de cajas
//           </h2>

//           <p className="mt-0.5 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
//             Prioriza saldos pendientes y códigos activos.
//           </p>
//         </div>

//         <div className="shrink-0 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-right shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//           <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//             Total
//           </p>

//           <p className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//             {cobradores.length}
//           </p>
//         </div>
//       </div>

//       {listado.length === 0 ? (
//         <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay usuarios con rol cobrador.
//         </div>
//       ) : (
//         <div className="grid gap-2">
//           {listado.slice(0, 5).map((cobrador) => (
//             <MobileCobradorCard
//               key={cobrador.cobradorId}
//               cobrador={cobrador}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function MobileMovimientosList({
//   movimientos,
// }: {
//   movimientos: Array<{
//     id: string;
//     fecha: string;
//     tipoMovimiento: string;
//     detalle: string;
//     importe: number;
//     usuarioNombre: string;
//     usuarioRol: string;
//   }>;
// }) {
//   return (
//     <div className={`${cardBase} p-3`}>
//       <div className="mb-3">
//         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//           Movimientos recientes
//         </p>

//         <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//           Últimos registros
//         </h2>
//       </div>

//       {movimientos.length === 0 ? (
//         <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay movimientos financieros registrados.
//         </div>
//       ) : (
//         <div className="grid gap-2">
//           {movimientos.slice(0, 5).map((movimiento) => (
//             <div
//               key={movimiento.id}
//               className="rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/45 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none"
//             >
//               <div className="flex items-start justify-between gap-3">
//                 <div className="min-w-0">
//                   <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                     {movimientoLabel(movimiento.tipoMovimiento)}
//                   </p>

//                   <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
//                     {movimiento.detalle}
//                   </p>
//                 </div>

//                 <p className="shrink-0 text-right text-sm font-medium text-slate-950 dark:text-white">
//                   {formatMoney(movimiento.importe)}
//                 </p>
//               </div>

//               <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//                 <span className="truncate">
//                   {movimiento.usuarioNombre} · {movimiento.usuarioRol}
//                 </span>

//                 <span className="shrink-0">
//                   {formatDateTime(movimiento.fecha)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default async function AdminPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const resumen = await obtenerAdminDashboardResumen();
//   const fechaActual = new Date().toISOString();

//   return (
//     <PageShell maxWidth="wide">
//       <div className="space-y-3 lg:hidden">
//         <MobileHeroCard
//           totalCuentaAdmin={resumen.totalCuentaAdmin}
//           totalEnCajaCobradores={resumen.totalEnCajaCobradores}
//         />

//         <MobileResumenOperativo
//           clientesActivos={resumen.clientesActivos}
//           planesActivos={resumen.planesActivos}
//           codigosPendientes={resumen.codigosPendientes}
//           totalCobradores={resumen.totalCobradores}
//           facturasEmitidas={resumen.facturasEmitidas}
//         />

//         <MobileCobradoresList cobradores={resumen.cobradores} />

//         <MobileMovimientosList movimientos={resumen.ultimosMovimientos} />
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Cuenta administración"
//             value={formatMoney(resumen.totalCuentaAdmin)}
//             description="Total recibido por cierres de caja confirmados."
//             href="/admin/caja-cobradores/cierres"
//             icon={Banknote}
//             tone="dark"
//           />

//           <StatCard
//             title="En cobradores"
//             value={formatMoney(resumen.totalEnCajaCobradores)}
//             description="Total en cajas de cobradores sin confirmar."
//             href="/admin/caja-cobradores"
//             icon={WalletCards}
//             tone="red"
//           />

//           <StatCard
//             title="Cobradores activos"
//             value={String(resumen.totalCobradores)}
//             description="Cobradores con cuenta asignada activa."
//             href="/usuarios?rol=cobrador"
//             icon={UsersRound}
//             tone="cyan"
//           />

//           <StatCard
//             title="Clientes registrados"
//             value={String(resumen.totalClientes)}
//             description={`${resumen.clientesActivos} activos en el sistema.`}
//             href="/clientes"
//             icon={UserRound}
//             tone="violet"
//           />

//           <StatCard
//             title="Facturas emitidas"
//             value={String(resumen.facturasEmitidas)}
//             description="Movimientos emitidos como factura."
//             href="/admin/configuracion/facturacion"
//             icon={FileText}
//             tone="amber"
//           />
//         </div>

//         <DashboardGrid>
//           <DashboardMain>
//             <div className={`${cardBase} p-3.5`}>
//               <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//                 <div>
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Cobradores
//                   </p>

//                   <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                     Cuentas activas
//                   </h2>
//                 </div>

//                 <Link
//                   href="/admin/caja-cobradores"
//                   className="inline-flex items-center justify-end gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//                 >
//                   Ver caja cobradores
//                   <ArrowRight className="h-3.5 w-3.5" />
//                 </Link>
//               </div>

//               {resumen.cobradores.length === 0 ? (
//                 <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                   Todavía no hay usuarios con rol cobrador.
//                 </div>
//               ) : (
//                 <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//                   <div className="grid grid-cols-[minmax(180px,1.25fr)_1fr_1fr_1fr_0.8fr_110px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//                     <span>Cobrador</span>
//                     <span>Cuenta actual</span>
//                     <span>Último retiro</span>
//                     <span>Último cierre</span>
//                     <span>Situación</span>
//                     <span className="text-right">Acción</span>
//                   </div>

//                   <div className="divide-y divide-slate-200 dark:divide-slate-800">
//                     {resumen.cobradores.map((cobrador) => {
//                       const tieneSaldoPendiente = cobrador.saldoActual > 0;

//                       return (
//                         <div
//                           key={cobrador.cobradorId}
//                           className="grid grid-cols-[minmax(180px,1.25fr)_1fr_1fr_1fr_0.8fr_110px] items-center gap-3 px-3 py-3"
//                         >
//                           <div className="flex min-w-0 items-center gap-2.5">
//                             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                               {getInitials(cobrador.nombreCompleto)}
//                             </div>

//                             <div className="min-w-0">
//                               <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                                 {cobrador.nombreCompleto}
//                               </p>

//                               <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                                 {cobrador.email || "Sin email"}
//                               </p>
//                             </div>
//                           </div>

//                           <p
//                             className={`truncate text-xs font-medium ${
//                               tieneSaldoPendiente
//                                 ? "text-red-700 dark:text-red-300"
//                                 : "text-slate-950 dark:text-white"
//                             }`}
//                           >
//                             {formatMoney(cobrador.saldoActual)}
//                           </p>

//                           <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
//                             {formatMoney(cobrador.ultimoRetiroImporte)}
//                           </p>

//                           <p className="truncate text-xs text-slate-500 dark:text-slate-400">
//                             {formatDate(cobrador.ultimoRetiroFecha)}
//                           </p>

//                           <span
//                             className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${
//                               tieneSaldoPendiente
//                                 ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300"
//                                 : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300"
//                             }`}
//                           >
//                             <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                             {tieneSaldoPendiente ? "Pendiente" : "Al día"}
//                           </span>

//                           <div className="text-right">
//                             <Link
//                               href="/admin/caja-cobradores"
//                               className="inline-flex h-8 items-center justify-center rounded-xl border border-slate-300 bg-white px-2.5 text-[11px] font-medium text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-cyan-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//                             >
//                               Ver detalle
//                             </Link>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className={`${cardBase} p-3.5`}>
//               <div className="mb-3 flex items-start justify-between gap-3">
//                 <div>
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Últimos movimientos
//                   </p>

//                   <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                     Movimientos recientes en el sistema
//                   </h2>
//                 </div>

//                 <Link
//                   href="/clientes"
//                   className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//                 >
//                   Ver clientes
//                   <ArrowRight className="h-3.5 w-3.5" />
//                 </Link>
//               </div>

//               {resumen.ultimosMovimientos.length === 0 ? (
//                 <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                   Todavía no hay movimientos financieros registrados.
//                 </div>
//               ) : (
//                 <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//                   <div className="grid grid-cols-[150px_120px_1fr_130px_120px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//                     <span>Fecha</span>
//                     <span>Tipo</span>
//                     <span>Detalle</span>
//                     <span>Importe</span>
//                     <span>Estado</span>
//                   </div>

//                   <div className="divide-y divide-slate-200 dark:divide-slate-800">
//                     {resumen.ultimosMovimientos.map((movimiento) => (
//                       <div
//                         key={movimiento.id}
//                         className="grid grid-cols-[150px_120px_1fr_130px_120px] items-center gap-3 p-3"
//                       >
//                         <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
//                           {formatDateTime(movimiento.fecha)}
//                         </p>

//                         <div className="flex items-center gap-2">
//                           <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                             <ReceiptText className="h-3.5 w-3.5" />
//                           </span>

//                           <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
//                             {movimientoLabel(movimiento.tipoMovimiento)}
//                           </span>
//                         </div>

//                         <div className="min-w-0">
//                           <p className="truncate text-xs font-medium text-slate-900 dark:text-white">
//                             {movimiento.detalle}
//                           </p>

//                           <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                             {movimiento.usuarioNombre} ·{" "}
//                             {movimiento.usuarioRol}
//                           </p>
//                         </div>

//                         <p className="text-xs font-medium text-slate-950 dark:text-white">
//                           {formatMoney(movimiento.importe)}
//                         </p>

//                         <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300">
//                           <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                           Confirmado
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </DashboardMain>

//           <DashboardAside>
//             <div className={`${cardBase} p-3.5`}>
//               <div className="mb-3 flex items-start justify-between gap-3">
//                 <div>
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Resumen rápido
//                   </p>

//                   <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                     Datos principales
//                   </h2>
//                 </div>

//                 <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                   <ShieldCheck className="h-4 w-4" />
//                 </div>
//               </div>

//               <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//                 <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                   <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                     <UsersRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                     Clientes activos
//                   </span>

//                   <strong className="text-xs font-medium text-slate-950 dark:text-white">
//                     {resumen.clientesActivos}
//                   </strong>
//                 </div>

//                 <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                   <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                     <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                     Planes activos
//                   </span>

//                   <strong className="text-xs font-medium text-slate-950 dark:text-white">
//                     {resumen.planesActivos}
//                   </strong>
//                 </div>

//                 <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                   <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                     <Clock3 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                     Códigos pendientes
//                   </span>

//                   <strong
//                     className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                       resumen.codigosPendientes > 0
//                         ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
//                         : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
//                     }`}
//                   >
//                     {resumen.codigosPendientes}
//                   </strong>
//                 </div>

//                 <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                   <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                     <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                     Actualizado
//                   </span>

//                   <strong className="text-right text-[11px] font-medium text-slate-500 dark:text-slate-400">
//                     {formatDateTime(fechaActual)}
//                   </strong>
//                 </div>
//               </div>
//             </div>

//             <div className={`${cardBase} p-3.5`}>
//               <div className="mb-3">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Estado del sistema
//                 </p>

//                 <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                   Información general
//                 </h2>
//               </div>

//               <div className="grid gap-2">
//                 <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                   <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
//                     <span className="h-2 w-2 rounded-full bg-emerald-500" />
//                     Sesión activa
//                   </span>

//                   <span className="font-medium text-emerald-700 dark:text-emerald-300">
//                     Sí
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                   <span className="text-slate-600 dark:text-slate-400">
//                     Rol actual
//                   </span>

//                   <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                     Admin
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                   <span className="text-slate-600 dark:text-slate-400">
//                     Cobradores con saldo
//                   </span>

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                       resumen.totalEnCajaCobradores > 0
//                         ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
//                         : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
//                     }`}
//                   >
//                     {
//                       resumen.cobradores.filter(
//                         (cobrador) => cobrador.saldoActual > 0,
//                       ).length
//                     }
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                   <span className="text-slate-600 dark:text-slate-400">
//                     Estado general
//                   </span>

//                   <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-300">
//                     <CheckCircle2 className="h-3.5 w-3.5" />
//                     Activo
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </DashboardAside>
//         </DashboardGrid>
//       </div>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/admin/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   ArrowRight,
//   Banknote,
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   FileText,
//   ReceiptText,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerAdminDashboardResumen } from "@/services/admin-dashboard.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Administrador",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatDate(value: string | null) {
//   if (!value) return "Sin cierre";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin cierre";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

// function formatDateTime(value: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin fecha";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month}/${year} ${hours}:${minutes}`;
// }

// function movimientoLabel(tipo: string) {
//   const labels: Record<string, string> = {
//     factura: "Factura",
//     pago: "Cobro",
//     nota_debito: "Nota débito",
//     nota_credito: "Nota crédito",
//   };

//   return labels[tipo] || "Movimiento";
// }

// function getInitials(name: string) {
//   const parts = name
//     .replace(",", " ")
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   href: string;
//   icon: typeof Banknote;
//   tone: "dark" | "red" | "cyan" | "violet" | "amber";
// };

// const statToneClasses = {
//   dark: "bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950",
//   red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
//   cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
//   violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
//   amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
// };

// const cardBase =
//   "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// const innerCardBase =
//   "rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none";

// function StatCard({
//   title,
//   value,
//   description,
//   href,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <Link
//       href={href}
//       className="group flex h-full min-h-[108px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-white hover:shadow-md hover:shadow-cyan-950/10 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none dark:hover:border-cyan-700 dark:hover:bg-cyan-950/20 dark:hover:shadow-md dark:hover:shadow-cyan-950/25"
//     >
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

//       <div className="mt-2 flex items-center justify-end border-t border-slate-300 pt-2 text-[11px] font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
//         Ver detalle
//         <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
//       </div>
//     </Link>
//   );
// }

// function MobileHeroCard({
//   totalCuentaAdmin,
//   totalEnCajaCobradores,
// }: {
//   totalCuentaAdmin: number;
//   totalEnCajaCobradores: number;
// }) {
//   return (
//     <div className="rounded-[1.45rem] border border-cyan-300 bg-gradient-to-br from-slate-50 via-cyan-50 to-sky-100 p-4 shadow-sm shadow-cyan-950/10 dark:border-cyan-900/80 dark:bg-slate-900/80 dark:bg-none">
//       <div className="flex items-start gap-3">
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           <ShieldCheck className="h-5 w-5" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Administración
//           </p>

//           <h1 className="mt-1 text-2xl font-medium tracking-tight text-slate-950 dark:text-white">
//             Panel principal
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Vista rápida de caja, cobradores y movimientos.
//           </p>
//         </div>
//       </div>

//       <div className="mt-4 grid gap-2">
//         <div className="rounded-2xl border border-slate-300 bg-white/85 px-3 py-2.5 shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/45 dark:shadow-none">
//           <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
//             Cuenta administración
//           </p>

//           <p className="mt-1 truncate text-3xl font-medium tracking-tight text-slate-950 dark:text-white">
//             {formatMoney(totalCuentaAdmin)}
//           </p>
//         </div>

//         <div className="rounded-2xl border border-red-300 bg-red-50 px-3 py-2.5 shadow-sm shadow-red-950/5 dark:border-red-900/70 dark:bg-red-950/25 dark:shadow-none">
//           <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-red-700 dark:text-red-300">
//             En cobradores
//           </p>

//           <p className="mt-1 truncate text-2xl font-medium tracking-tight text-red-700 dark:text-red-300">
//             {formatMoney(totalEnCajaCobradores)}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MobileResumenOperativo({
//   clientesActivos,
//   planesActivos,
//   codigosPendientes,
//   totalCobradores,
//   facturasEmitidas,
// }: {
//   clientesActivos: number;
//   planesActivos: number;
//   codigosPendientes: number;
//   totalCobradores: number;
//   facturasEmitidas: number;
// }) {
//   return (
//     <div className={`${cardBase} p-3`}>
//       <div className="mb-3">
//         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//           Resumen operativo
//         </p>

//         <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//           Estado actual del sistema
//         </h2>
//       </div>

//       <div className="grid grid-cols-2 gap-2">
//         <div className={`${innerCardBase} px-3 py-2.5`}>
//           <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//             Clientes activos
//           </p>

//           <p className="mt-1 text-xl font-medium text-slate-950 dark:text-white">
//             {clientesActivos}
//           </p>
//         </div>

//         <div className={`${innerCardBase} px-3 py-2.5`}>
//           <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//             Planes activos
//           </p>

//           <p className="mt-1 text-xl font-medium text-slate-950 dark:text-white">
//             {planesActivos}
//           </p>
//         </div>

//         <div className={`${innerCardBase} px-3 py-2.5`}>
//           <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//             Cobradores
//           </p>

//           <p className="mt-1 text-xl font-medium text-slate-950 dark:text-white">
//             {totalCobradores}
//           </p>
//         </div>

//         <div className={`${innerCardBase} px-3 py-2.5`}>
//           <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//             Facturas
//           </p>

//           <p className="mt-1 text-xl font-medium text-slate-950 dark:text-white">
//             {facturasEmitidas}
//           </p>
//         </div>

//         <div
//           className={`col-span-2 rounded-2xl border px-3 py-2.5 shadow-sm ${
//             codigosPendientes > 0
//               ? "border-red-300 bg-red-50 shadow-red-950/5 dark:border-red-900/70 dark:bg-red-950/30 dark:shadow-none"
//               : "border-emerald-300 bg-emerald-50 shadow-emerald-950/5 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:shadow-none"
//           }`}
//         >
//           <div className="flex items-center justify-between gap-3">
//             <p
//               className={`text-[9px] font-medium uppercase tracking-[0.14em] ${
//                 codigosPendientes > 0
//                   ? "text-red-700 dark:text-red-300"
//                   : "text-emerald-700 dark:text-emerald-300"
//               }`}
//             >
//               Códigos pendientes
//             </p>

//             <p
//               className={`text-xl font-medium ${
//                 codigosPendientes > 0
//                   ? "text-red-700 dark:text-red-300"
//                   : "text-emerald-700 dark:text-emerald-300"
//               }`}
//             >
//               {codigosPendientes}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MobileCobradorCard({
//   cobrador,
// }: {
//   cobrador: {
//     cobradorId: string;
//     nombreCompleto: string;
//     email: string;
//     saldoActual: number;
//     ultimoRetiroImporte: number;
//     ultimoRetiroFecha: string | null;
//     tieneCodigoPendiente: boolean;
//     codigoPendienteImporte: number;
//   };
// }) {
//   const tieneSaldoPendiente = cobrador.saldoActual > 0;

//   return (
//     <div className="rounded-[1.2rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//       <div className="flex items-start gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-semibold text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           {getInitials(cobrador.nombreCompleto)}
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex items-start justify-between gap-2">
//             <div className="min-w-0">
//               <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                 {cobrador.nombreCompleto}
//               </p>

//               <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                 {cobrador.email || "Sin email"}
//               </p>
//             </div>

//             <span
//               className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//                 tieneSaldoPendiente
//                   ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
//                   : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//               }`}
//             >
//               {tieneSaldoPendiente ? "Pendiente" : "Al día"}
//             </span>
//           </div>

//           <div
//             className={`mt-2 rounded-2xl border px-3 py-2 ${
//               tieneSaldoPendiente
//                 ? "border-red-200 bg-red-50 dark:border-red-900/70 dark:bg-red-950/25"
//                 : "border-slate-300 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70"
//             }`}
//           >
//             <div className="flex items-center justify-between gap-3">
//               <p
//                 className={`text-[9px] font-medium uppercase tracking-[0.14em] ${
//                   tieneSaldoPendiente
//                     ? "text-red-700 dark:text-red-300"
//                     : "text-slate-500 dark:text-slate-400"
//                 }`}
//               >
//                 Caja actual
//               </p>

//               {cobrador.tieneCodigoPendiente ? (
//                 <span className="shrink-0 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[9px] font-medium text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//                   Código activo
//                 </span>
//               ) : null}
//             </div>

//             <p
//               className={`mt-1 truncate text-2xl font-semibold tracking-tight ${
//                 tieneSaldoPendiente
//                   ? "text-red-700 dark:text-red-300"
//                   : "text-slate-950 dark:text-white"
//               }`}
//             >
//               {formatMoney(cobrador.saldoActual)}
//             </p>
//           </div>

//           <div className="mt-2 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="flex items-center justify-between gap-3">
//               <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//                 Último retiro
//               </p>

//               <p className="shrink-0 text-[11px] font-medium text-slate-500 dark:text-slate-400">
//                 {formatDate(cobrador.ultimoRetiroFecha)}
//               </p>
//             </div>

//             <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//               {formatMoney(cobrador.ultimoRetiroImporte)}
//             </p>
//           </div>

//           {cobrador.tieneCodigoPendiente ? (
//             <div className="mt-2 rounded-2xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//               Código pendiente por{" "}
//               <span className="font-medium">
//                 {formatMoney(cobrador.codigoPendienteImporte)}
//               </span>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MobileCobradoresList({
//   cobradores,
// }: {
//   cobradores: Array<{
//     cobradorId: string;
//     nombreCompleto: string;
//     email: string;
//     saldoActual: number;
//     ultimoRetiroImporte: number;
//     ultimoRetiroFecha: string | null;
//     tieneCodigoPendiente: boolean;
//     codigoPendienteImporte: number;
//   }>;
// }) {
//   const cobradoresConSaldo = cobradores.filter(
//     (cobrador) => cobrador.saldoActual > 0 || cobrador.tieneCodigoPendiente,
//   );

//   const listado = cobradoresConSaldo.length > 0 ? cobradoresConSaldo : cobradores;

//   return (
//     <div className={`${cardBase} p-3`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Cobradores
//           </p>

//           <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//             Vista rápida de cajas
//           </h2>

//           <p className="mt-0.5 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
//             Prioriza saldos pendientes y códigos activos.
//           </p>
//         </div>

//         <div className="shrink-0 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-right shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//           <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//             Total
//           </p>

//           <p className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//             {cobradores.length}
//           </p>
//         </div>
//       </div>

//       {listado.length === 0 ? (
//         <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay usuarios con rol cobrador.
//         </div>
//       ) : (
//         <div className="grid gap-2">
//           {listado.slice(0, 5).map((cobrador) => (
//             <MobileCobradorCard
//               key={cobrador.cobradorId}
//               cobrador={cobrador}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function MobileMovimientosList({
//   movimientos,
// }: {
//   movimientos: Array<{
//     id: string;
//     fecha: string | null;
//     tipoMovimiento: string;
//     detalle: string;
//     importe: number;
//     usuarioNombre: string;
//     usuarioRol: string;
//   }>;
// }) {
//   return (
//     <div className={`${cardBase} p-3`}>
//       <div className="mb-3">
//         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//           Movimientos recientes
//         </p>

//         <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//           Últimos registros
//         </h2>
//       </div>

//       {movimientos.length === 0 ? (
//         <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay movimientos financieros registrados.
//         </div>
//       ) : (
//         <div className="grid gap-2">
//           {movimientos.slice(0, 5).map((movimiento) => (
//             <div
//               key={movimiento.id}
//               className="rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/45 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none"
//             >
//               <div className="flex items-start justify-between gap-3">
//                 <div className="min-w-0">
//                   <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                     {movimientoLabel(movimiento.tipoMovimiento)}
//                   </p>

//                   <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
//                     {movimiento.detalle}
//                   </p>
//                 </div>

//                 <p className="shrink-0 text-right text-sm font-medium text-slate-950 dark:text-white">
//                   {formatMoney(movimiento.importe)}
//                 </p>
//               </div>

//               <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//                 <span className="truncate">
//                   {movimiento.usuarioNombre} · {movimiento.usuarioRol}
//                 </span>

//                 <span className="shrink-0">
//                   {formatDateTime(movimiento.fecha)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default async function AdminPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const resumen = await obtenerAdminDashboardResumen();
//   const fechaActual = new Date().toISOString();

//   return (
//     <PageShell maxWidth="wide">
//       <div className="space-y-3 lg:hidden">
//         <MobileHeroCard
//           totalCuentaAdmin={resumen.totalCuentaAdmin}
//           totalEnCajaCobradores={resumen.totalEnCajaCobradores}
//         />

//         <MobileResumenOperativo
//           clientesActivos={resumen.clientesActivos}
//           planesActivos={resumen.planesActivos}
//           codigosPendientes={resumen.codigosPendientes}
//           totalCobradores={resumen.totalCobradores}
//           facturasEmitidas={resumen.facturasEmitidas}
//         />

//         <MobileCobradoresList cobradores={resumen.cobradores} />

//         <MobileMovimientosList movimientos={resumen.ultimosMovimientos} />
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Cuenta administración"
//             value={formatMoney(resumen.totalCuentaAdmin)}
//             description="Cierres confirmados."
//             href="/admin/caja-cobradores/cierres"
//             icon={Banknote}
//             tone="dark"
//           />

//           <StatCard
//             title="En cobradores"
//             value={formatMoney(resumen.totalEnCajaCobradores)}
//             description="Pendiente de cierre."
//             href="/admin/caja-cobradores"
//             icon={WalletCards}
//             tone="red"
//           />

//           <StatCard
//             title="Cobradores activos"
//             value={String(resumen.totalCobradores)}
//             description="Usuarios cobradores."
//             href="/usuarios?rol=cobrador"
//             icon={UsersRound}
//             tone="cyan"
//           />

//           <StatCard
//             title="Clientes registrados"
//             value={String(resumen.totalClientes)}
//             description={`${resumen.clientesActivos} activos.`}
//             href="/clientes"
//             icon={UserRound}
//             tone="violet"
//           />

//           <StatCard
//             title="Facturas emitidas"
//             value={String(resumen.facturasEmitidas)}
//             description="Comprobantes emitidos."
//             href="/admin/configuracion/facturacion"
//             icon={FileText}
//             tone="amber"
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Cobradores
//                     </p>

//                     <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                       Cuentas activas
//                     </h2>
//                   </div>

//                   <Link
//                     href="/admin/caja-cobradores"
//                     className="inline-flex items-center justify-end gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//                   >
//                     Ver caja cobradores
//                     <ArrowRight className="h-3.5 w-3.5" />
//                   </Link>
//                 </div>

//                 {resumen.cobradores.length === 0 ? (
//                   <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                     Todavía no hay usuarios con rol cobrador.
//                   </div>
//                 ) : (
//                   <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//                     <div className="grid grid-cols-[minmax(180px,1.25fr)_1fr_0.8fr_0.8fr_110px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//                       <span>Cobrador</span>
//                       <span>Cuenta actual</span>
//                       <span>Último retiro</span>
//                       <span>Situación</span>
//                       <span className="text-right">Acción</span>
//                     </div>

//                     <div className="divide-y divide-slate-200 dark:divide-slate-800">
//                       {resumen.cobradores.map((cobrador) => {
//                         const tieneSaldoPendiente = cobrador.saldoActual > 0;

//                         return (
//                           <div
//                             key={cobrador.cobradorId}
//                             className="grid grid-cols-[minmax(180px,1.25fr)_1fr_0.8fr_0.8fr_110px] items-center gap-3 px-3 py-3"
//                           >
//                             <div className="flex min-w-0 items-center gap-2.5">
//                               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                                 {getInitials(cobrador.nombreCompleto)}
//                               </div>

//                               <div className="min-w-0">
//                                 <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                                   {cobrador.nombreCompleto}
//                                 </p>

//                                 <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                                   {cobrador.email || "Sin email"}
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="min-w-0">
//                               <p
//                                 className={`truncate text-sm font-semibold ${
//                                   tieneSaldoPendiente
//                                     ? "text-red-700 dark:text-red-300"
//                                     : "text-slate-950 dark:text-white"
//                                 }`}
//                               >
//                                 {formatMoney(cobrador.saldoActual)}
//                               </p>

//                               <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
//                                 Último cierre:{" "}
//                                 {formatDate(cobrador.ultimoRetiroFecha)}
//                               </p>
//                             </div>

//                             <div className="min-w-0">
//                               <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
//                                 {formatMoney(cobrador.ultimoRetiroImporte)}
//                               </p>

//                               <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
//                                 {formatDate(cobrador.ultimoRetiroFecha)}
//                               </p>
//                             </div>

//                             <span
//                               className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${
//                                 tieneSaldoPendiente
//                                   ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300"
//                                   : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300"
//                               }`}
//                             >
//                               <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                               {tieneSaldoPendiente ? "Pendiente" : "Al día"}
//                             </span>

//                             <div className="text-right">
//                               <Link
//                                 href="/admin/caja-cobradores"
//                                 className="inline-flex h-8 items-center justify-center rounded-xl border border-slate-300 bg-white px-2.5 text-[11px] font-medium text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-cyan-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//                               >
//                                 Ver detalle
//                               </Link>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Últimos movimientos
//                     </p>

//                     <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                       Movimientos recientes en el sistema
//                     </h2>
//                   </div>

//                   <Link
//                     href="/clientes"
//                     className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//                   >
//                     Ver clientes
//                     <ArrowRight className="h-3.5 w-3.5" />
//                   </Link>
//                 </div>

//                 {resumen.ultimosMovimientos.length === 0 ? (
//                   <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                     Todavía no hay movimientos financieros registrados.
//                   </div>
//                 ) : (
//                   <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//                     <div className="grid grid-cols-[130px_105px_1fr_120px_105px] border-b border-slate-300 bg-slate-100 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//                       <span>Fecha</span>
//                       <span>Tipo</span>
//                       <span>Detalle</span>
//                       <span>Importe</span>
//                       <span>Estado</span>
//                     </div>

//                     <div className="divide-y divide-slate-200 dark:divide-slate-800">
//                       {resumen.ultimosMovimientos.map((movimiento) => (
//                         <div
//                           key={movimiento.id}
//                           className="grid grid-cols-[130px_105px_1fr_120px_105px] items-center gap-3 px-3 py-2.5"
//                         >
//                           <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
//                             {formatDateTime(movimiento.fecha)}
//                           </p>

//                           <div className="flex items-center gap-2">
//                             <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                               <ReceiptText className="h-3.5 w-3.5" />
//                             </span>

//                             <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
//                               {movimientoLabel(movimiento.tipoMovimiento)}
//                             </span>
//                           </div>

//                           <div className="min-w-0">
//                             <p className="truncate text-xs font-medium text-slate-900 dark:text-white">
//                               {movimiento.detalle}
//                             </p>

//                             <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                               {movimiento.usuarioNombre} ·{" "}
//                               {movimiento.usuarioRol}
//                             </p>
//                           </div>

//                           <p className="text-xs font-semibold text-slate-950 dark:text-white">
//                             {formatMoney(movimiento.importe)}
//                           </p>

//                           <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300">
//                             <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                             Confirmado
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Resumen rápido
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Datos principales
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <ShieldCheck className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                       <UsersRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Clientes activos
//                     </span>

//                     <strong className="text-xs font-medium text-slate-950 dark:text-white">
//                       {resumen.clientesActivos}
//                     </strong>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                       <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Planes activos
//                     </span>

//                     <strong className="text-xs font-medium text-slate-950 dark:text-white">
//                       {resumen.planesActivos}
//                     </strong>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                       <Clock3 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Códigos pendientes
//                     </span>

//                     <strong
//                       className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                         resumen.codigosPendientes > 0
//                           ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
//                           : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
//                       }`}
//                     >
//                       {resumen.codigosPendientes}
//                     </strong>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                     <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                       <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Actualizado
//                     </span>

//                     <strong className="text-right text-[11px] font-medium text-slate-500 dark:text-slate-400">
//                       {formatDateTime(fechaActual)}
//                     </strong>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3">
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Estado del sistema
//                   </p>

//                   <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                     Información general
//                   </h2>
//                 </div>

//                 <div className="grid gap-2">
//                   <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                     <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
//                       <span className="h-2 w-2 rounded-full bg-emerald-500" />
//                       Sesión activa
//                     </span>

//                     <span className="font-medium text-emerald-700 dark:text-emerald-300">
//                       Sí
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                     <span className="text-slate-600 dark:text-slate-400">
//                       Rol actual
//                     </span>

//                     <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                       Admin
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                     <span className="text-slate-600 dark:text-slate-400">
//                       Cobradores con saldo
//                     </span>

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                         resumen.totalEnCajaCobradores > 0
//                           ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
//                           : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
//                       }`}
//                     >
//                       {
//                         resumen.cobradores.filter(
//                           (cobrador) => cobrador.saldoActual > 0,
//                         ).length
//                       }
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                     <span className="text-slate-600 dark:text-slate-400">
//                       Estado general
//                     </span>

//                     <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-300">
//                       <CheckCircle2 className="h-3.5 w-3.5" />
//                       Activo
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/admin/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import type { LucideIcon } from "lucide-react";
// import {
//   ArrowRight,
//   Banknote,
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   FileClock,
//   FileText,
//   ReceiptText,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import {
//   obtenerAdminDashboardResumen,
//   type AdminDashboardCobradorCard,
//   type AdminDashboardUltimoMovimiento,
// } from "@/services/admin-dashboard.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Administrador",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatDate(value: string | null) {
//   if (!value) return "Sin cierre";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin cierre";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

// function formatDateTime(value: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin fecha";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month}/${year} ${hours}:${minutes}`;
// }

// function movimientoLabel(tipo: string) {
//   const labels: Record<string, string> = {
//     factura: "Factura",
//     pago: "Cobro",
//     nota_debito: "Nota débito",
//     nota_credito: "Nota crédito",
//   };

//   return labels[tipo] || "Movimiento";
// }

// function getInitials(name: string) {
//   const parts = name
//     .replace(",", " ")
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function getSaldoTone(value: number) {
//   if (value > 0) {
//     return "text-red-700 dark:text-red-300";
//   }

//   if (value < 0) {
//     return "text-sky-700 dark:text-sky-300";
//   }

//   return "text-emerald-700 dark:text-emerald-300";
// }

// function getMobileCobradorEstado(cobrador: AdminDashboardCobradorCard) {
//   if (cobrador.tieneCodigoPendiente) {
//     return {
//       label: "Código activo",
//       title: "Código pendiente",
//       amount:
//         cobrador.codigoPendienteImporte > 0
//           ? cobrador.codigoPendienteImporte
//           : cobrador.saldoActual,
//       description: "Tiene código de cierre generado y pendiente.",
//       border:
//         "border-amber-300 bg-amber-50 dark:border-amber-900/70 dark:bg-amber-950/25",
//       text: "text-amber-700 dark:text-amber-300",
//       pill:
//         "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300",
//     };
//   }

//   if (cobrador.saldoActual > 0) {
//     return {
//       label: "Pendiente",
//       title: "Caja actual",
//       amount: cobrador.saldoActual,
//       description: "Saldo positivo pendiente de cierre.",
//       border:
//         "border-red-300 bg-red-50 dark:border-red-900/70 dark:bg-red-950/25",
//       text: "text-red-700 dark:text-red-300",
//       pill:
//         "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300",
//     };
//   }

//   if (cobrador.saldoActual < 0) {
//     return {
//       label: "A compensar",
//       title: "Caja actual",
//       amount: cobrador.saldoActual,
//       description: "Saldo negativo a compensar con próximos cobros.",
//       border:
//         "border-sky-300 bg-sky-50 dark:border-sky-900/70 dark:bg-sky-950/25",
//       text: "text-sky-700 dark:text-sky-300",
//       pill:
//         "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/35 dark:text-sky-300",
//     };
//   }

//   return {
//     label: "Al día",
//     title: "Caja actual",
//     amount: cobrador.saldoActual,
//     description: "Sin saldo pendiente ni código activo.",
//     border:
//       "border-emerald-300 bg-emerald-50 dark:border-emerald-900/70 dark:bg-emerald-950/25",
//     text: "text-emerald-700 dark:text-emerald-300",
//     pill:
//       "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300",
//   };
// }

// function ordenarCobradoresMobile(cobradores: AdminDashboardCobradorCard[]) {
//   return [...cobradores].sort((a, b) => {
//     const prioridadA = a.tieneCodigoPendiente
//       ? 1
//       : a.saldoActual > 0
//         ? 2
//         : a.saldoActual < 0
//           ? 3
//           : 4;

//     const prioridadB = b.tieneCodigoPendiente
//       ? 1
//       : b.saldoActual > 0
//         ? 2
//         : b.saldoActual < 0
//           ? 3
//           : 4;

//     if (prioridadA !== prioridadB) return prioridadA - prioridadB;

//     const nombreA = a.nombreCompleto.toLowerCase();
//     const nombreB = b.nombreCompleto.toLowerCase();

//     return nombreA.localeCompare(nombreB);
//   });
// }

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   href: string;
//   icon: LucideIcon;
//   tone: "dark" | "red" | "cyan" | "violet" | "amber";
// };

// const statToneClasses = {
//   dark: "bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950",
//   red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
//   cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
//   violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
//   amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
// };

// const cardBase =
//   "rounded-[1.35rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// function StatCard({
//   title,
//   value,
//   description,
//   href,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <Link
//       href={href}
//       className="group flex h-full min-h-[108px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-white hover:shadow-md hover:shadow-cyan-950/10 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none dark:hover:border-cyan-700 dark:hover:bg-cyan-950/20"
//     >
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

//       <div className="mt-2 flex items-center justify-end border-t border-slate-300 pt-2 text-[11px] font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
//         Ver detalle
//         <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
//       </div>
//     </Link>
//   );
// }

// function MobileTopResumen({
//   totalCuentaAdmin,
//   totalEnCajaCobradores,
// }: {
//   totalCuentaAdmin: number;
//   totalEnCajaCobradores: number;
// }) {
//   return (
//     <div className="rounded-[1.35rem] border border-cyan-300 bg-cyan-50/80 p-3 shadow-sm shadow-cyan-950/10 dark:border-cyan-900/70 dark:bg-cyan-950/20 dark:shadow-none">
//       <div className="mb-3 flex items-center justify-between gap-3">
//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Resumen principal
//           </p>

//           <h2 className="mt-0.5 truncate text-sm font-medium text-slate-950 dark:text-white">
//             Estado de caja general
//           </h2>
//         </div>

//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 ring-1 ring-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           <WalletCards className="h-4 w-4" />
//         </div>
//       </div>

//       <div className="grid gap-2">
//         <Link
//           href="/admin/caja-cobradores/cierres"
//           className="rounded-2xl border border-slate-300 bg-white px-3 py-3 shadow-sm shadow-slate-200/60 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//         >
//           <div className="flex items-center justify-between gap-3">
//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
//                 En administración
//               </p>

//               <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
//                 {formatMoney(totalCuentaAdmin)}
//               </p>
//             </div>

//             <Banknote className="h-5 w-5 shrink-0 text-cyan-700 dark:text-cyan-300" />
//           </div>
//         </Link>

//         <Link
//           href="/admin/caja-cobradores"
//           className="rounded-2xl border border-red-300 bg-red-50 px-3 py-3 shadow-sm shadow-red-950/5 transition hover:border-red-400 hover:bg-red-100 dark:border-red-900/70 dark:bg-red-950/25 dark:shadow-none dark:hover:bg-red-950/40"
//         >
//           <div className="flex items-center justify-between gap-3">
//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-red-700 dark:text-red-300">
//                 En cobradores
//               </p>

//               <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-red-700 dark:text-red-300">
//                 {formatMoney(totalEnCajaCobradores)}
//               </p>
//             </div>

//             <WalletCards className="h-5 w-5 shrink-0 text-red-700 dark:text-red-300" />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

// function MobileResumenOperativo({
//   clientesActivos,
//   planesActivos,
//   codigosPendientes,
//   totalCobradores,
//   facturasEmitidas,
// }: {
//   clientesActivos: number;
//   planesActivos: number;
//   codigosPendientes: number;
//   totalCobradores: number;
//   facturasEmitidas: number;
// }) {
//   const items = [
//     {
//       label: "Clientes",
//       value: clientesActivos,
//       icon: UsersRound,
//       className:
//         "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 ring-emerald-200 dark:ring-emerald-900/70",
//     },
//     {
//       label: "Planes",
//       value: planesActivos,
//       icon: Wifi,
//       className:
//         "text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/30 ring-cyan-200 dark:ring-cyan-900/70",
//     },
//     {
//       label: "Cobradores",
//       value: totalCobradores,
//       icon: UsersRound,
//       className:
//         "text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/30 ring-red-200 dark:ring-red-900/70",
//     },
//     {
//       label: "Facturas",
//       value: facturasEmitidas,
//       icon: FileText,
//       className:
//         "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 ring-amber-200 dark:ring-amber-900/70",
//     },
//   ];

//   return (
//     <div className={`${cardBase} p-3`}>
//       <div className="mb-3">
//         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//           Resumen operativo
//         </p>

//         <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//           Estado actual del sistema
//         </h2>
//       </div>

//       <div className="grid grid-cols-4 gap-2">
//         {items.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={item.label}
//               className="min-w-0 rounded-2xl border border-slate-300 bg-white px-2 py-2.5 text-center shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none"
//             >
//               <div
//                 className={`mx-auto flex h-8 w-8 items-center justify-center rounded-xl ring-1 ${item.className}`}
//               >
//                 <Icon className="h-4 w-4" />
//               </div>

//               <p className="mt-2 truncate text-[9px] font-medium uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
//                 {item.label}
//               </p>

//               <p className="mt-0.5 text-xl font-semibold text-slate-950 dark:text-white">
//                 {item.value}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2.5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300">
//         <span className="inline-flex min-w-0 items-center gap-2">
//           <CheckCircle2 className="h-4 w-4 shrink-0" />

//           <span className="truncate text-[10px] font-medium uppercase tracking-[0.13em]">
//             Códigos pendientes
//           </span>
//         </span>

//         <span className="text-xl font-semibold">{codigosPendientes}</span>
//       </div>
//     </div>
//   );
// }

// function MobileAuditoriaAccess() {
//   return (
//     <Link
//       href="/admin/auditoria"
//       className={`${cardBase} group flex items-center justify-between gap-3 p-3 transition hover:border-cyan-300 hover:bg-white dark:hover:border-cyan-800 dark:hover:bg-cyan-950/20`}
//     >
//       <div className="flex min-w-0 items-center gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700 ring-1 ring-red-100 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900">
//           <FileClock className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Auditoría
//           </p>

//           <h2 className="mt-0.5 truncate text-sm font-medium text-slate-950 dark:text-white">
//             Registros del sistema
//           </h2>

//           <p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
//             Accesos, cobros, cierres y cambios administrativos.
//           </p>
//         </div>
//       </div>

//       <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
//     </Link>
//   );
// }

// function MobileCobradorCard({
//   cobrador,
// }: {
//   cobrador: AdminDashboardCobradorCard;
// }) {
//   const estado = getMobileCobradorEstado(cobrador);

//   return (
//     <Link
//       href="/admin/caja-cobradores"
//       className="block rounded-[1.15rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none"
//     >
//       <div className="flex min-w-0 items-start gap-3">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-[11px] font-semibold text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           {getInitials(cobrador.nombreCompleto)}
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex min-w-0 items-start justify-between gap-2">
//             <div className="min-w-0">
//               <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                 {cobrador.nombreCompleto}
//               </p>

//               <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                 {cobrador.email || "Sin email"}
//               </p>
//             </div>

//             <span
//               className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${estado.pill}`}
//             >
//               {estado.label}
//             </span>
//           </div>

//           <div className="mt-2 grid gap-2">
//             <div className={`rounded-2xl border px-3 py-2 ${estado.border}`}>
//               <p
//                 className={`text-[10px] font-medium uppercase tracking-[0.14em] ${estado.text}`}
//               >
//                 {estado.title}
//               </p>

//               <p
//                 className={`mt-1 break-words text-2xl font-semibold tracking-tight ${estado.text}`}
//               >
//                 {formatMoney(estado.amount)}
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-2">
//               <div className="min-w-0 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//                   Último retiro
//                 </p>

//                 <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//                   {formatMoney(cobrador.ultimoRetiroImporte)}
//                 </p>
//               </div>

//               <div className="min-w-0 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-right dark:border-slate-800 dark:bg-slate-900/70">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//                   Fecha
//                 </p>

//                 <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//                   {formatDate(cobrador.ultimoRetiroFecha)}
//                 </p>
//               </div>
//             </div>

//             {estado.description ? (
//               <p className="rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-[11px] leading-4 text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
//                 {estado.description}
//               </p>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// function MobileCobradorGroup({
//   title,
//   description,
//   index,
//   cobradores,
// }: {
//   title: string;
//   description: string;
//   index: number;
//   cobradores: AdminDashboardCobradorCard[];
// }) {
//   if (cobradores.length === 0) {
//     return null;
//   }

//   const groupColor =
//     index === 1
//       ? "text-amber-700 dark:text-amber-300"
//       : index === 2
//         ? "text-red-700 dark:text-red-300"
//         : index === 3
//           ? "text-sky-700 dark:text-sky-300"
//           : "text-emerald-700 dark:text-emerald-300";

//   return (
//     <div className="rounded-[1.2rem] border border-slate-300 bg-slate-50/80 p-2.5 dark:border-slate-800 dark:bg-slate-950/35">
//       <div className="mb-2 px-1">
//         <p
//           className={`text-[10px] font-medium uppercase tracking-[0.16em] ${groupColor}`}
//         >
//           {title}
//         </p>

//         <p className="mt-0.5 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
//           {description}
//         </p>
//       </div>

//       <div className="grid gap-2">
//         {cobradores.map((cobrador) => (
//           <MobileCobradorCard
//             key={cobrador.cobradorId}
//             cobrador={cobrador}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function MobileCobradoresList({
//   cobradores,
// }: {
//   cobradores: AdminDashboardCobradorCard[];
// }) {
//   const ordenados = ordenarCobradoresMobile(cobradores);

//   const conCodigo = ordenados.filter(
//     (cobrador) => cobrador.tieneCodigoPendiente,
//   );

//   const pendientes = ordenados.filter(
//     (cobrador) => cobrador.saldoActual > 0 && !cobrador.tieneCodigoPendiente,
//   );

//   const aCompensar = ordenados.filter(
//     (cobrador) => cobrador.saldoActual < 0 && !cobrador.tieneCodigoPendiente,
//   );

//   const alDia = ordenados.filter(
//     (cobrador) =>
//       cobrador.saldoActual === 0 && !cobrador.tieneCodigoPendiente,
//   );

//   return (
//     <div className={`${cardBase} p-3`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Cobradores
//           </p>

//           <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//             Vista rápida de cajas
//           </h2>

//           <p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
//             Todos los cobradores ordenados por prioridad.
//           </p>
//         </div>

//         <div className="shrink-0 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-right shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//           <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//             Total
//           </p>

//           <p className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//             {cobradores.length}
//           </p>
//         </div>
//       </div>

//       {cobradores.length === 0 ? (
//         <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay usuarios con rol cobrador.
//         </div>
//       ) : (
//         <div className="grid gap-2">
//           <MobileCobradorGroup
//             title="Con código activo"
//             description="Cobradores con código de cierre pendiente."
//             index={1}
//             cobradores={conCodigo}
//           />

//           <MobileCobradorGroup
//             title="Pendientes de cierre"
//             description="Cobradores con saldo positivo pendiente de cierre."
//             index={2}
//             cobradores={pendientes}
//           />

//           <MobileCobradorGroup
//             title="Saldo a compensar"
//             description="Cobradores con saldo negativo operativo."
//             index={3}
//             cobradores={aCompensar}
//           />

//           <MobileCobradorGroup
//             title="Al día"
//             description="Cobradores sin saldo pendiente ni código activo."
//             index={4}
//             cobradores={alDia}
//           />

//           <Link
//             href="/admin/caja-cobradores"
//             className="mt-1 flex h-10 items-center justify-center gap-2 border-t border-slate-300 pt-3 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:border-slate-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//           >
//             Ver todos los cobradores
//             <ArrowRight className="h-3.5 w-3.5" />
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// function MobileMovimientoCard({
//   movimiento,
// }: {
//   movimiento: AdminDashboardUltimoMovimiento;
// }) {
//   return (
//     <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/45 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none">
//       <div className="min-w-0">
//         <div className="flex min-w-0 items-start justify-between gap-2">
//           <div className="min-w-0 flex-1">
//             <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
//               {movimientoLabel(movimiento.tipoMovimiento)}
//             </p>

//             <p className="mt-0.5 line-clamp-2 text-xs leading-4 text-slate-500 dark:text-slate-400">
//               {movimiento.detalle}
//             </p>
//           </div>

//           <p className="max-w-[135px] shrink-0 break-words text-right text-sm font-medium leading-5 text-slate-950 dark:text-white">
//             {formatMoney(movimiento.importe)}
//           </p>
//         </div>

//         <div className="mt-2 flex min-w-0 items-center justify-between gap-2 border-t border-slate-200 pt-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//           <span className="min-w-0 truncate">
//             {movimiento.usuarioNombre} · {movimiento.usuarioRol}
//           </span>

//           <span className="shrink-0 text-right">
//             {formatDateTime(movimiento.fecha)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MobileMovimientosList({
//   movimientos,
// }: {
//   movimientos: AdminDashboardUltimoMovimiento[];
// }) {
//   return (
//     <div className={`${cardBase} overflow-hidden p-3`}>
//       <div className="mb-3">
//         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//           Movimientos recientes
//         </p>

//         <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//           Últimos registros
//         </h2>
//       </div>

//       {movimientos.length === 0 ? (
//         <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay movimientos financieros registrados.
//         </div>
//       ) : (
//         <div className="grid gap-2">
//           {movimientos.slice(0, 4).map((movimiento) => (
//             <MobileMovimientoCard
//               key={movimiento.id}
//               movimiento={movimiento}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default async function AdminPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const resumen = await obtenerAdminDashboardResumen();
//   const fechaActual = new Date().toISOString();

//   return (
//     <PageShell maxWidth="wide" className="max-lg:space-y-3 max-lg:pb-20">
//       <div className="space-y-3 lg:hidden">
//         <MobileTopResumen
//           totalCuentaAdmin={resumen.totalCuentaAdmin}
//           totalEnCajaCobradores={resumen.totalEnCajaCobradores}
//         />

//         <MobileResumenOperativo
//           clientesActivos={resumen.clientesActivos}
//           planesActivos={resumen.planesActivos}
//           codigosPendientes={resumen.codigosPendientes}
//           totalCobradores={resumen.totalCobradores}
//           facturasEmitidas={resumen.facturasEmitidas}
//         />

//         <MobileAuditoriaAccess />

//         <MobileCobradoresList cobradores={resumen.cobradores} />

//         <MobileMovimientosList movimientos={resumen.ultimosMovimientos} />
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-6">
//           <StatCard
//             title="Cuenta administración"
//             value={formatMoney(resumen.totalCuentaAdmin)}
//             description="Cierres confirmados."
//             href="/admin/caja-cobradores/cierres"
//             icon={Banknote}
//             tone="dark"
//           />

//           <StatCard
//             title="En cobradores"
//             value={formatMoney(resumen.totalEnCajaCobradores)}
//             description="Pendiente de cierre."
//             href="/admin/caja-cobradores"
//             icon={WalletCards}
//             tone="red"
//           />

//           <StatCard
//             title="Cobradores activos"
//             value={String(resumen.totalCobradores)}
//             description="Usuarios cobradores."
//             href="/usuarios?rol=cobrador"
//             icon={UsersRound}
//             tone="cyan"
//           />

//           <StatCard
//             title="Clientes registrados"
//             value={String(resumen.totalClientes)}
//             description={`${resumen.clientesActivos} activos.`}
//             href="/clientes"
//             icon={UserRound}
//             tone="violet"
//           />

//           <StatCard
//             title="Facturas emitidas"
//             value={String(resumen.facturasEmitidas)}
//             description="Comprobantes emitidos."
//             href="/admin/configuracion/facturacion"
//             icon={FileText}
//             tone="amber"
//           />

//           <StatCard
//             title="Auditoría"
//             value="Logs"
//             description="Acciones sensibles."
//             href="/admin/auditoria"
//             icon={FileClock}
//             tone="cyan"
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Cobradores
//                     </p>

//                     <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                       Cuentas activas
//                     </h2>
//                   </div>

//                   <Link
//                     href="/admin/caja-cobradores"
//                     className="inline-flex items-center justify-end gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//                   >
//                     Ver caja cobradores
//                     <ArrowRight className="h-3.5 w-3.5" />
//                   </Link>
//                 </div>

//                 {resumen.cobradores.length === 0 ? (
//                   <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                     Todavía no hay usuarios con rol cobrador.
//                   </div>
//                 ) : (
//                   <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//                     <div className="grid grid-cols-[minmax(180px,1.25fr)_1fr_0.8fr_0.8fr_110px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//                       <span>Cobrador</span>
//                       <span>Cuenta actual</span>
//                       <span>Último retiro</span>
//                       <span>Situación</span>
//                       <span className="text-right">Acción</span>
//                     </div>

//                     <div className="divide-y divide-slate-200 dark:divide-slate-800">
//                       {resumen.cobradores.map((cobrador) => {
//                         const tieneSaldoPendiente = cobrador.saldoActual > 0;

//                         return (
//                           <div
//                             key={cobrador.cobradorId}
//                             className="grid grid-cols-[minmax(180px,1.25fr)_1fr_0.8fr_0.8fr_110px] items-center gap-3 px-3 py-3"
//                           >
//                             <div className="flex min-w-0 items-center gap-2.5">
//                               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                                 {getInitials(cobrador.nombreCompleto)}
//                               </div>

//                               <div className="min-w-0">
//                                 <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                                   {cobrador.nombreCompleto}
//                                 </p>

//                                 <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                                   {cobrador.email || "Sin email"}
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="min-w-0">
//                               <p
//                                 className={`truncate text-sm font-semibold ${getSaldoTone(
//                                   cobrador.saldoActual,
//                                 )}`}
//                               >
//                                 {formatMoney(cobrador.saldoActual)}
//                               </p>

//                               <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
//                                 Total cobrado:{" "}
//                                 {formatMoney(cobrador.totalCobrado)}
//                               </p>
//                             </div>

//                             <div className="min-w-0">
//                               <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                                 {formatMoney(cobrador.ultimoRetiroImporte)}
//                               </p>

//                               <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
//                                 {formatDate(cobrador.ultimoRetiroFecha)}
//                               </p>
//                             </div>

//                             <span
//                               className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${
//                                 tieneSaldoPendiente
//                                   ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300"
//                                   : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300"
//                               }`}
//                             >
//                               <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                               {tieneSaldoPendiente ? "Pendiente" : "Al día"}
//                             </span>

//                             <div className="text-right">
//                               <Link
//                                 href="/admin/caja-cobradores"
//                                 className="inline-flex h-8 items-center justify-center rounded-xl border border-slate-300 bg-white px-2.5 text-[11px] font-medium text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-cyan-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//                               >
//                                 Ver detalle
//                               </Link>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Últimos movimientos
//                     </p>

//                     <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                       Movimientos recientes en el sistema
//                     </h2>
//                   </div>

//                   <Link
//                     href="/clientes"
//                     className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//                   >
//                     Ver clientes
//                     <ArrowRight className="h-3.5 w-3.5" />
//                   </Link>
//                 </div>

//                 {resumen.ultimosMovimientos.length === 0 ? (
//                   <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                     Todavía no hay movimientos financieros registrados.
//                   </div>
//                 ) : (
//                   <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//                     <div className="grid grid-cols-[145px_120px_minmax(0,1fr)_130px_110px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//                       <span>Fecha</span>
//                       <span>Tipo</span>
//                       <span>Detalle</span>
//                       <span>Importe</span>
//                       <span>Estado</span>
//                     </div>

//                     <div className="divide-y divide-slate-200 dark:divide-slate-800">
//                       {resumen.ultimosMovimientos.map((movimiento) => (
//                         <div
//                           key={movimiento.id}
//                           className="grid grid-cols-[145px_120px_minmax(0,1fr)_130px_110px] items-center gap-3 px-3 py-3"
//                         >
//                           <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
//                             {formatDateTime(movimiento.fecha)}
//                           </p>

//                           <div className="flex items-center gap-2">
//                             <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                               <ReceiptText className="h-3.5 w-3.5" />
//                             </span>

//                             <span className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
//                               {movimientoLabel(movimiento.tipoMovimiento)}
//                             </span>
//                           </div>

//                           <div className="min-w-0">
//                             <p className="truncate text-xs font-medium text-slate-900 dark:text-white">
//                               {movimiento.detalle}
//                             </p>

//                             <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                               {movimiento.usuarioNombre} ·{" "}
//                               {movimiento.usuarioRol}
//                             </p>
//                           </div>

//                           <p className="truncate text-xs font-semibold text-slate-950 dark:text-white">
//                             {formatMoney(movimiento.importe)}
//                           </p>

//                           <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300">
//                             <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                             Confirmado
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Resumen rápido
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Datos principales
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <ShieldCheck className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                       <UsersRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Clientes activos
//                     </span>

//                     <strong className="text-xs font-medium text-slate-950 dark:text-white">
//                       {resumen.clientesActivos}
//                     </strong>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                       <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Planes activos
//                     </span>

//                     <strong className="text-xs font-medium text-slate-950 dark:text-white">
//                       {resumen.planesActivos}
//                     </strong>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                       <Clock3 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Códigos pendientes
//                     </span>

//                     <strong
//                       className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                         resumen.codigosPendientes > 0
//                           ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
//                           : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
//                       }`}
//                     >
//                       {resumen.codigosPendientes}
//                     </strong>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                     <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//                       <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Actualizado
//                     </span>

//                     <strong className="text-right text-[11px] font-medium text-slate-500 dark:text-slate-400">
//                       {formatDateTime(fechaActual)}
//                     </strong>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3">
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Estado del sistema
//                   </p>

//                   <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                     Información general
//                   </h2>
//                 </div>

//                 <div className="grid gap-2">
//                   <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                     <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
//                       <span className="h-2 w-2 rounded-full bg-emerald-500" />
//                       Sesión activa
//                     </span>

//                     <span className="font-medium text-emerald-700 dark:text-emerald-300">
//                       Sí
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                     <span className="text-slate-600 dark:text-slate-400">
//                       Rol actual
//                     </span>

//                     <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                       Admin
//                     </span>
//                   </div>

//                   <Link
//                     href="/admin/auditoria"
//                     className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//                   >
//                     <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
//                       <FileClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Auditoría
//                     </span>

//                     <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-700 dark:bg-red-950/30 dark:text-red-300">
//                       Activa
//                     </span>
//                   </Link>

//                   <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                     <span className="text-slate-600 dark:text-slate-400">
//                       Cobradores con saldo
//                     </span>

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                         resumen.totalEnCajaCobradores > 0
//                           ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
//                           : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
//                       }`}
//                     >
//                       {
//                         resumen.cobradores.filter(
//                           (cobrador) => cobrador.saldoActual > 0,
//                         ).length
//                       }
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none">
//                     <span className="text-slate-600 dark:text-slate-400">
//                       Estado general
//                     </span>

//                     <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-300">
//                       <CheckCircle2 className="h-3.5 w-3.5" />
//                       Activo
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/admin/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import type { LucideIcon } from "lucide-react";
// import {
//   ArrowRight,
//   Banknote,
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   FileClock,
//   FileText,
//   ReceiptText,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import {
//   obtenerAdminDashboardResumen,
//   type AdminDashboardCobradorCard,
//   type AdminDashboardUltimoMovimiento,
// } from "@/services/admin-dashboard.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Administrador",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatDate(value: string | null) {
//   if (!value) return "Sin cierre";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin cierre";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

// function formatDateTime(value: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin fecha";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month}/${year} ${hours}:${minutes}`;
// }

// function movimientoLabel(tipo: string) {
//   const labels: Record<string, string> = {
//     factura: "Factura",
//     pago: "Cobro",
//     nota_debito: "Nota débito",
//     nota_credito: "Nota crédito",
//     ajuste: "Ajuste",
//   };

//   return labels[tipo] || "Movimiento";
// }

// function getInitials(name: string) {
//   const parts = name
//     .replace(",", " ")
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function getSaldoTextClass(value: number) {
//   if (value > 0) return "text-red-700 dark:text-red-300";
//   if (value < 0) return "text-blue-700 dark:text-blue-300";
//   return "text-emerald-700 dark:text-emerald-300";
// }

// function getCobradorEstado(cobrador: AdminDashboardCobradorCard) {
//   if (cobrador.tieneCodigoPendiente) {
//     return {
//       label: "Código activo",
//       tone:
//         "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300",
//       amount:
//         cobrador.codigoPendienteImporte > 0
//           ? cobrador.codigoPendienteImporte
//           : cobrador.saldoActual,
//       title: "Código pendiente",
//       description: "Tiene código de cierre generado.",
//     };
//   }

//   if (cobrador.saldoActual > 0) {
//     return {
//       label: "Pendiente",
//       tone:
//         "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300",
//       amount: cobrador.saldoActual,
//       title: "Caja actual",
//       description: "Saldo pendiente de cierre.",
//     };
//   }

//   if (cobrador.saldoActual < 0) {
//     return {
//       label: "A compensar",
//       tone:
//         "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-blue-300",
//       amount: cobrador.saldoActual,
//       title: "Caja actual",
//       description: "Saldo negativo operativo.",
//     };
//   }

//   return {
//     label: "Al día",
//     tone:
//       "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300",
//     amount: cobrador.saldoActual,
//     title: "Caja actual",
//     description: "Sin saldo pendiente.",
//   };
// }

// function ordenarCobradores(cobradores: AdminDashboardCobradorCard[]) {
//   return [...cobradores].sort((a, b) => {
//     const prioridadA = a.tieneCodigoPendiente
//       ? 1
//       : a.saldoActual > 0
//         ? 2
//         : a.saldoActual < 0
//           ? 3
//           : 4;

//     const prioridadB = b.tieneCodigoPendiente
//       ? 1
//       : b.saldoActual > 0
//         ? 2
//         : b.saldoActual < 0
//           ? 3
//           : 4;

//     if (prioridadA !== prioridadB) return prioridadA - prioridadB;

//     return a.nombreCompleto.localeCompare(b.nombreCompleto);
//   });
// }

// const panelClass =
//   "rounded-xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900/82 dark:shadow-none";

// const innerPanelClass =
//   "rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/45 dark:shadow-none";

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   href: string;
//   icon: LucideIcon;
//   tone: "primary" | "danger" | "success" | "warning" | "neutral";
// };

// const statToneClasses = {
//   primary:
//     "bg-blue-50 text-blue-700 ring-blue-100 dark:bg-blue-950/35 dark:text-blue-300 dark:ring-blue-900/70",
//   danger:
//     "bg-red-50 text-red-700 ring-red-100 dark:bg-red-950/35 dark:text-red-300 dark:ring-red-900/70",
//   success:
//     "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950/35 dark:text-emerald-300 dark:ring-emerald-900/70",
//   warning:
//     "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/35 dark:text-amber-300 dark:ring-amber-900/70",
//   neutral:
//     "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700",
// };

// function StatCard({
//   title,
//   value,
//   description,
//   href,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <Link
//       href={href}
//       className="group flex min-h-[112px] flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm shadow-slate-200/60 transition hover:border-blue-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/82 dark:shadow-none dark:hover:border-blue-900/80 dark:hover:bg-slate-900"
//     >
//       <div className="flex items-start gap-3">
//         <div
//           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${statToneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//             {title}
//           </p>

//           <p
//             className={`mt-1 truncate text-xl font-semibold tracking-tight ${
//               tone === "danger"
//                 ? "text-red-700 dark:text-red-300"
//                 : "text-slate-950 dark:text-white"
//             }`}
//           >
//             {value}
//           </p>

//           <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
//             {description}
//           </p>
//         </div>
//       </div>

//       <div className="mt-3 flex items-center justify-end border-t border-slate-200 pt-2 text-[12px] font-medium text-slate-500 transition group-hover:text-blue-700 dark:border-slate-800 dark:text-slate-400 dark:group-hover:text-blue-300">
//         Ver detalle
//         <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
//       </div>
//     </Link>
//   );
// }

// function SectionHeader({
//   eyebrow,
//   title,
//   description,
//   href,
//   hrefLabel,
// }: {
//   eyebrow: string;
//   title: string;
//   description?: string;
//   href?: string;
//   hrefLabel?: string;
// }) {
//   return (
//     <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
//       <div className="min-w-0">
//         <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
//           {eyebrow}
//         </p>

//         <h2 className="mt-0.5 text-base font-semibold text-slate-950 dark:text-white">
//           {title}
//         </h2>

//         {description ? (
//           <p className="mt-0.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">
//             {description}
//           </p>
//         ) : null}
//       </div>

//       {href && hrefLabel ? (
//         <Link
//           href={href}
//           className="inline-flex items-center gap-1.5 text-[12px] font-medium text-blue-700 transition hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
//         >
//           {hrefLabel}
//           <ArrowRight className="h-3.5 w-3.5" />
//         </Link>
//       ) : null}
//     </div>
//   );
// }

// function MobileTopResumen({
//   totalCuentaAdmin,
//   totalEnCajaCobradores,
// }: {
//   totalCuentaAdmin: number;
//   totalEnCajaCobradores: number;
// }) {
//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
//             Panel general
//           </p>

//           <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             Resumen administrativo
//           </h1>

//           <p className="mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
//             Vista rápida de caja, cobradores y actividad reciente.
//           </p>
//         </div>

//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/35 dark:text-blue-300 dark:ring-blue-900/70">
//           <ShieldCheck className="h-4 w-4" />
//         </div>
//       </div>

//       <div className="grid gap-2">
//         <Link
//           href="/admin/caja-cobradores/cierres"
//           className={`${innerPanelClass} block px-3 py-3 transition hover:border-blue-200 hover:bg-slate-50 dark:hover:border-blue-900/80`}
//         >
//           <div className="flex items-center justify-between gap-3">
//             <div className="min-w-0">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//                 En administración
//               </p>

//               <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
//                 {formatMoney(totalCuentaAdmin)}
//               </p>
//             </div>

//             <Banknote className="h-5 w-5 shrink-0 text-blue-700 dark:text-blue-300" />
//           </div>
//         </Link>

//         <Link
//           href="/admin/caja-cobradores"
//           className="block rounded-lg border border-red-200 bg-red-50 px-3 py-3 shadow-sm shadow-red-950/5 transition hover:border-red-300 hover:bg-red-100 dark:border-red-900/70 dark:bg-red-950/25 dark:shadow-none dark:hover:bg-red-950/40"
//         >
//           <div className="flex items-center justify-between gap-3">
//             <div className="min-w-0">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-700 dark:text-red-300">
//                 En cobradores
//               </p>

//               <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-red-700 dark:text-red-300">
//                 {formatMoney(totalEnCajaCobradores)}
//               </p>
//             </div>

//             <WalletCards className="h-5 w-5 shrink-0 text-red-700 dark:text-red-300" />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

// function MobileResumenOperativo({
//   clientesActivos,
//   planesActivos,
//   codigosPendientes,
//   totalCobradores,
//   facturasEmitidas,
// }: {
//   clientesActivos: number;
//   planesActivos: number;
//   codigosPendientes: number;
//   totalCobradores: number;
//   facturasEmitidas: number;
// }) {
//   const items = [
//     {
//       label: "Clientes",
//       value: clientesActivos,
//       icon: UsersRound,
//     },
//     {
//       label: "Planes",
//       value: planesActivos,
//       icon: Wifi,
//     },
//     {
//       label: "Cobradores",
//       value: totalCobradores,
//       icon: UsersRound,
//     },
//     {
//       label: "Facturas",
//       value: facturasEmitidas,
//       icon: FileText,
//     },
//   ];

//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Resumen operativo"
//         title="Estado actual"
//         description="Indicadores principales del sistema."
//       />

//       <div className="grid grid-cols-2 gap-2">
//         {items.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div key={item.label} className={`${innerPanelClass} px-3 py-2.5`}>
//               <div className="flex items-center justify-between gap-2">
//                 <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
//                   {item.label}
//                 </p>

//                 <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
//               </div>

//               <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">
//                 {item.value}
//               </p>
//             </div>
//           );
//         })}

//         <div
//           className={`col-span-2 rounded-lg border px-3 py-2.5 ${
//             codigosPendientes > 0
//               ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300"
//               : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300"
//           }`}
//         >
//           <div className="flex items-center justify-between gap-3">
//             <span className="inline-flex min-w-0 items-center gap-2">
//               <Clock3 className="h-4 w-4 shrink-0" />

//               <span className="truncate text-[11px] font-semibold uppercase tracking-[0.12em]">
//                 Códigos pendientes
//               </span>
//             </span>

//             <span className="text-2xl font-semibold">{codigosPendientes}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MobileAuditoriaAccess() {
//   return (
//     <Link
//       href="/admin/auditoria"
//       className={`${panelClass} group flex items-center justify-between gap-3 p-3.5 transition hover:border-blue-200 hover:bg-white dark:hover:border-blue-900/80 dark:hover:bg-slate-900`}
//     >
//       <div className="flex min-w-0 items-center gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
//           <FileClock className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
//             Auditoría
//           </p>

//           <h2 className="mt-0.5 truncate text-sm font-semibold text-slate-950 dark:text-white">
//             Registros del sistema
//           </h2>

//           <p className="mt-0.5 line-clamp-1 text-[12px] leading-5 text-slate-500 dark:text-slate-400">
//             Accesos, cobros, cierres y cambios administrativos.
//           </p>
//         </div>
//       </div>

//       <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
//     </Link>
//   );
// }

// function MobileCobradorCard({
//   cobrador,
// }: {
//   cobrador: AdminDashboardCobradorCard;
// }) {
//   const estado = getCobradorEstado(cobrador);

//   return (
//     <Link
//       href="/admin/caja-cobradores"
//       className={`${innerPanelClass} block p-3 transition hover:border-blue-200 hover:bg-slate-50 dark:hover:border-blue-900/80`}
//     >
//       <div className="flex items-start gap-3">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
//           {getInitials(cobrador.nombreCompleto)}
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex min-w-0 items-start justify-between gap-2">
//             <div className="min-w-0">
//               <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//                 {cobrador.nombreCompleto}
//               </p>

//               <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">
//                 {cobrador.email || "Sin email"}
//               </p>
//             </div>

//             <span
//               className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-medium ${estado.tone}`}
//             >
//               {estado.label}
//             </span>
//           </div>

//           <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//               {estado.title}
//             </p>

//             <p
//               className={`mt-1 break-words text-xl font-semibold tracking-tight ${getSaldoTextClass(
//                 estado.amount,
//               )}`}
//             >
//               {formatMoney(estado.amount)}
//             </p>
//           </div>

//           <div className="mt-2 grid grid-cols-2 gap-2">
//             <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
//                 Último retiro
//               </p>

//               <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//                 {formatMoney(cobrador.ultimoRetiroImporte)}
//               </p>
//             </div>

//             <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-right dark:border-slate-800 dark:bg-slate-900/70">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
//                 Fecha
//               </p>

//               <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//                 {formatDate(cobrador.ultimoRetiroFecha)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// function MobileCobradoresList({
//   cobradores,
// }: {
//   cobradores: AdminDashboardCobradorCard[];
// }) {
//   const ordenados = ordenarCobradores(cobradores);

//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Cobradores"
//         title="Vista rápida de cajas"
//         description="Ordenados por códigos activos y saldos pendientes."
//         href="/admin/caja-cobradores"
//         hrefLabel="Ver caja"
//       />

//       {ordenados.length === 0 ? (
//         <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay usuarios con rol cobrador.
//         </div>
//       ) : (
//         <div className="grid gap-2">
//           {ordenados.slice(0, 6).map((cobrador) => (
//             <MobileCobradorCard
//               key={cobrador.cobradorId}
//               cobrador={cobrador}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function MobileMovimientoCard({
//   movimiento,
// }: {
//   movimiento: AdminDashboardUltimoMovimiento;
// }) {
//   return (
//     <div className={`${innerPanelClass} p-3`}>
//       <div className="flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//             {movimientoLabel(movimiento.tipoMovimiento)}
//           </p>

//           <p className="mt-0.5 line-clamp-2 text-[12px] leading-5 text-slate-500 dark:text-slate-400">
//             {movimiento.detalle}
//           </p>
//         </div>

//         <p className="max-w-[135px] shrink-0 break-words text-right text-sm font-semibold text-slate-950 dark:text-white">
//           {formatMoney(movimiento.importe)}
//         </p>
//       </div>

//       <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 text-[12px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//         <span className="truncate">
//           {movimiento.usuarioNombre} · {movimiento.usuarioRol}
//         </span>

//         <span className="shrink-0">{formatDateTime(movimiento.fecha)}</span>
//       </div>
//     </div>
//   );
// }

// function MobileMovimientosList({
//   movimientos,
// }: {
//   movimientos: AdminDashboardUltimoMovimiento[];
// }) {
//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Movimientos recientes"
//         title="Últimos registros"
//         href="/clientes"
//         hrefLabel="Ver clientes"
//       />

//       {movimientos.length === 0 ? (
//         <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay movimientos financieros registrados.
//         </div>
//       ) : (
//         <div className="grid gap-2">
//           {movimientos.slice(0, 5).map((movimiento) => (
//             <MobileMovimientoCard
//               key={movimiento.id}
//               movimiento={movimiento}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// const quickActions = [
//   {
//     label: "Ver usuarios",
//     href: "/usuarios",
//     icon: UsersRound,
//   },
//   {
//     label: "Ver clientes",
//     href: "/clientes",
//     icon: UserRound,
//   },
//   {
//     label: "Caja cobradores",
//     href: "/admin/caja-cobradores",
//     icon: WalletCards,
//   },
//   {
//     label: "Facturación mensual",
//     href: "/admin/configuracion/facturacion",
//     icon: ReceiptText,
//   },
//   {
//     label: "Auditoría",
//     href: "/admin/auditoria",
//     icon: FileClock,
//   },
// ];

// function CobradoresTable({
//   cobradores,
// }: {
//   cobradores: AdminDashboardCobradorCard[];
// }) {
//   const ordenados = ordenarCobradores(cobradores);

//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Cobradores"
//         title="Cuentas activas"
//         description="Resumen de cajas, retiros y situación de cada cobrador."
//         href="/admin/caja-cobradores"
//         hrefLabel="Ver caja cobradores"
//       />

//       {ordenados.length === 0 ? (
//         <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay usuarios con rol cobrador.
//         </div>
//       ) : (
//         <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/40">
//           <div className="grid grid-cols-[minmax(190px,1.25fr)_1fr_1fr_1fr_0.8fr_105px] border-b border-slate-200 bg-slate-50 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//             <span>Cobrador</span>
//             <span>Cuenta actual</span>
//             <span>Último retiro</span>
//             <span>Último cierre</span>
//             <span>Situación</span>
//             <span className="text-right">Acción</span>
//           </div>

//           <div className="divide-y divide-slate-200 dark:divide-slate-800">
//             {ordenados.map((cobrador) => {
//               const estado = getCobradorEstado(cobrador);

//               return (
//                 <div
//                   key={cobrador.cobradorId}
//                   className="grid grid-cols-[minmax(190px,1.25fr)_1fr_1fr_1fr_0.8fr_105px] items-center gap-3 px-3 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-900/70"
//                 >
//                   <div className="flex min-w-0 items-center gap-2.5">
//                     <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
//                       {getInitials(cobrador.nombreCompleto)}
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-[13px] font-semibold text-slate-950 dark:text-white">
//                         {cobrador.nombreCompleto}
//                       </p>

//                       <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">
//                         {cobrador.email || "Sin email"}
//                       </p>
//                     </div>
//                   </div>

//                   <p
//                     className={`truncate text-[13px] font-semibold ${getSaldoTextClass(
//                       cobrador.saldoActual,
//                     )}`}
//                   >
//                     {formatMoney(cobrador.saldoActual)}
//                   </p>

//                   <p className="truncate text-[13px] font-medium text-slate-800 dark:text-slate-200">
//                     {formatMoney(cobrador.ultimoRetiroImporte)}
//                   </p>

//                   <p className="truncate text-[13px] text-slate-500 dark:text-slate-400">
//                     {formatDate(cobrador.ultimoRetiroFecha)}
//                   </p>

//                   <span
//                     className={`inline-flex w-fit items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium leading-5 ${estado.tone}`}
//                   >
//                     <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                     {estado.label}
//                   </span>

//                   <div className="text-right">
//                     <Link
//                       href="/admin/caja-cobradores"
//                       className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 text-[12px] font-medium text-blue-700 transition hover:border-blue-200 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-blue-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30"
//                     >
//                       Ver
//                     </Link>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function MovimientosTable({
//   movimientos,
// }: {
//   movimientos: AdminDashboardUltimoMovimiento[];
// }) {
//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Últimos movimientos"
//         title="Movimientos recientes"
//         description="Actividad financiera registrada recientemente."
//         href="/clientes"
//         hrefLabel="Ver clientes"
//       />

//       {movimientos.length === 0 ? (
//         <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay movimientos financieros registrados.
//         </div>
//       ) : (
//         <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/40">
//           <div className="grid grid-cols-[150px_120px_1fr_130px_120px] border-b border-slate-200 bg-slate-50 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//             <span>Fecha</span>
//             <span>Tipo</span>
//             <span>Detalle</span>
//             <span>Importe</span>
//             <span>Estado</span>
//           </div>

//           <div className="divide-y divide-slate-200 dark:divide-slate-800">
//             {movimientos.map((movimiento) => (
//               <div
//                 key={movimiento.id}
//                 className="grid grid-cols-[150px_120px_1fr_130px_120px] items-center gap-3 px-3 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-900/70"
//               >
//                 <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400">
//                   {formatDateTime(movimiento.fecha)}
//                 </p>

//                 <div className="flex items-center gap-2">
//                   <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/35 dark:text-blue-300 dark:ring-blue-900/70">
//                     <ReceiptText className="h-3.5 w-3.5" />
//                   </span>

//                   <span className="text-[13px] font-medium text-slate-800 dark:text-slate-200">
//                     {movimientoLabel(movimiento.tipoMovimiento)}
//                   </span>
//                 </div>

//                 <div className="min-w-0">
//                   <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">
//                     {movimiento.detalle}
//                   </p>

//                   <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">
//                     {movimiento.usuarioNombre} · {movimiento.usuarioRol}
//                   </p>
//                 </div>

//                 <p className="text-[13px] font-semibold text-slate-950 dark:text-white">
//                   {formatMoney(movimiento.importe)}
//                 </p>

//                 <span className="inline-flex w-fit items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300">
//                   <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                   Confirmado
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function QuickActions() {
//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Acciones rápidas"
//         title="Atajos principales"
//         description="Accesos directos de administración."
//       />

//       <div className="grid gap-2">
//         {quickActions.map((item) => {
//           const Icon = item.icon;

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="group flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
//             >
//               <span className="flex min-w-0 items-center gap-2.5">
//                 <Icon className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-blue-700 dark:text-slate-400 dark:group-hover:text-blue-300" />
//                 <span className="truncate">{item.label}</span>
//               </span>

//               <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function ResumenRapido({
//   resumen,
//   fechaActual,
// }: {
//   resumen: Awaited<ReturnType<typeof obtenerAdminDashboardResumen>>;
//   fechaActual: string;
// }) {
//   const rows = [
//     {
//       label: "Clientes activos",
//       value: resumen.clientesActivos,
//       icon: UsersRound,
//     },
//     {
//       label: "Planes activos",
//       value: resumen.planesActivos,
//       icon: Wifi,
//     },
//     {
//       label: "Códigos pendientes",
//       value: resumen.codigosPendientes,
//       icon: Clock3,
//       danger: resumen.codigosPendientes > 0,
//     },
//     {
//       label: "Actualizado",
//       value: formatDateTime(fechaActual),
//       icon: CalendarClock,
//       isDate: true,
//     },
//   ];

//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Resumen rápido"
//         title="Datos principales"
//         description="Indicadores operativos."
//       />

//       <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/40">
//         {rows.map((row, index) => {
//           const Icon = row.icon;

//           return (
//             <div
//               key={row.label}
//               className={`flex items-center justify-between gap-3 px-3 py-2.5 ${
//                 index !== rows.length - 1
//                   ? "border-b border-slate-200 dark:border-slate-800"
//                   : ""
//               }`}
//             >
//               <span className="flex min-w-0 items-center gap-2.5 text-[13px] text-slate-700 dark:text-slate-300">
//                 <Icon className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
//                 <span className="truncate">{row.label}</span>
//               </span>

//               <strong
//                 className={`shrink-0 text-right text-[13px] font-semibold ${
//                   row.danger
//                     ? "text-red-700 dark:text-red-300"
//                     : row.isDate
//                       ? "text-slate-500 dark:text-slate-400"
//                       : "text-slate-950 dark:text-white"
//                 }`}
//               >
//                 {row.value}
//               </strong>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function EstadoSistema({
//   resumen,
// }: {
//   resumen: Awaited<ReturnType<typeof obtenerAdminDashboardResumen>>;
// }) {
//   const cobradoresConSaldo = resumen.cobradores.filter(
//     (cobrador) => cobrador.saldoActual > 0,
//   ).length;

//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Estado del sistema"
//         title="Información general"
//         description="Lectura rápida del entorno."
//       />

//       <div className="grid gap-2">
//         <div className={`${innerPanelClass} flex items-center justify-between gap-3 px-3 py-2.5`}>
//           <span className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-400">
//             <span className="h-2 w-2 rounded-full bg-emerald-500" />
//             Sesión activa
//           </span>

//           <span className="font-semibold text-emerald-700 dark:text-emerald-300">
//             Sí
//           </span>
//         </div>

//         <div className={`${innerPanelClass} flex items-center justify-between gap-3 px-3 py-2.5`}>
//           <span className="text-[13px] text-slate-600 dark:text-slate-400">
//             Rol actual
//           </span>

//           <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[12px] font-semibold text-blue-700 dark:bg-blue-950/35 dark:text-blue-300">
//             Admin
//           </span>
//         </div>

//         <Link
//           href="/admin/auditoria"
//           className={`${innerPanelClass} flex items-center justify-between gap-3 px-3 py-2.5 transition hover:border-blue-200 hover:bg-blue-50 dark:hover:border-blue-900 dark:hover:bg-blue-950/30`}
//         >
//           <span className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-400">
//             <FileClock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
//             Auditoría
//           </span>

//           <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
//             Activa
//           </span>
//         </Link>

//         <div className={`${innerPanelClass} flex items-center justify-between gap-3 px-3 py-2.5`}>
//           <span className="text-[13px] text-slate-600 dark:text-slate-400">
//             Cobradores con saldo
//           </span>

//           <span
//             className={`rounded-md px-2.5 py-1 text-[12px] font-semibold ${
//               cobradoresConSaldo > 0
//                 ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
//                 : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
//             }`}
//           >
//             {cobradoresConSaldo}
//           </span>
//         </div>

//         <div className={`${innerPanelClass} flex items-center justify-between gap-3 px-3 py-2.5`}>
//           <span className="text-[13px] text-slate-600 dark:text-slate-400">
//             Estado general
//           </span>

//           <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300">
//             <CheckCircle2 className="h-3.5 w-3.5" />
//             Activo
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default async function AdminPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const resumen = await obtenerAdminDashboardResumen();
//   const fechaActual = new Date().toISOString();

//   return (
//     <PageShell maxWidth="wide">
//       <div className="space-y-3 lg:hidden">
//         <MobileTopResumen
//           totalCuentaAdmin={resumen.totalCuentaAdmin}
//           totalEnCajaCobradores={resumen.totalEnCajaCobradores}
//         />

//         <MobileResumenOperativo
//           clientesActivos={resumen.clientesActivos}
//           planesActivos={resumen.planesActivos}
//           codigosPendientes={resumen.codigosPendientes}
//           totalCobradores={resumen.totalCobradores}
//           facturasEmitidas={resumen.facturasEmitidas}
//         />

//         <MobileAuditoriaAccess />

//         <MobileCobradoresList cobradores={resumen.cobradores} />

//         <MobileMovimientosList movimientos={resumen.ultimosMovimientos} />
//       </div>

//       <div className="hidden lg:block">
//         <div className="mb-5 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Cuenta administración"
//             value={formatMoney(resumen.totalCuentaAdmin)}
//             description="Total recibido por cierres de caja confirmados."
//             href="/admin/caja-cobradores/cierres"
//             icon={Banknote}
//             tone="neutral"
//           />

//           <StatCard
//             title="En cobradores"
//             value={formatMoney(resumen.totalEnCajaCobradores)}
//             description="Total en cajas de cobradores sin confirmar."
//             href="/admin/caja-cobradores"
//             icon={WalletCards}
//             tone="danger"
//           />

//           <StatCard
//             title="Cobradores activos"
//             value={String(resumen.totalCobradores)}
//             description="Cobradores con cuenta asignada activa."
//             href="/usuarios?rol=cobrador"
//             icon={UsersRound}
//             tone="primary"
//           />

//           <StatCard
//             title="Clientes registrados"
//             value={String(resumen.totalClientes)}
//             description={`${resumen.clientesActivos} activos en el sistema.`}
//             href="/clientes"
//             icon={UserRound}
//             tone="success"
//           />

//           <StatCard
//             title="Facturas emitidas"
//             value={String(resumen.facturasEmitidas)}
//             description="Movimientos emitidos como factura."
//             href="/admin/configuracion/facturacion"
//             icon={FileText}
//             tone="warning"
//           />
//         </div>

//         <DashboardGrid>
//           <DashboardMain>
//             <CobradoresTable cobradores={resumen.cobradores} />

//             <MovimientosTable movimientos={resumen.ultimosMovimientos} />
//           </DashboardMain>

//           <DashboardAside>
//             <QuickActions />

//             <ResumenRapido resumen={resumen} fechaActual={fechaActual} />

//             <EstadoSistema resumen={resumen} />
//           </DashboardAside>
//         </DashboardGrid>
//       </div>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/admin/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import type { LucideIcon } from "lucide-react";
// import {
//   ArrowRight,
//   Banknote,
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   FileClock,
//   FileText,
//   ReceiptText,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import {
//   obtenerAdminDashboardResumen,
//   type AdminDashboardCobradorCard,
//   type AdminDashboardUltimoMovimiento,
// } from "@/services/admin-dashboard.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Administrador",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatDate(value: string | null) {
//   if (!value) return "Sin cierre";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin cierre";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

// function formatDateTime(value: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Sin fecha";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month}/${year} ${hours}:${minutes}`;
// }

// function movimientoLabel(tipo: string) {
//   const labels: Record<string, string> = {
//     factura: "Factura",
//     pago: "Cobro",
//     nota_debito: "Nota débito",
//     nota_credito: "Nota crédito",
//     ajuste: "Ajuste",
//   };

//   return labels[tipo] || "Movimiento";
// }

// function getInitials(name: string) {
//   const parts = name
//     .replace(",", " ")
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function getSaldoTextClass(value: number) {
//   if (value > 0) return "text-red-700 dark:text-red-300";
//   if (value < 0) return "text-blue-700 dark:text-blue-300";
//   return "text-emerald-700 dark:text-emerald-300";
// }

// function getCobradorEstado(cobrador: AdminDashboardCobradorCard) {
//   if (cobrador.tieneCodigoPendiente) {
//     return {
//       label: "Código activo",
//       tone:
//         "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700/80 dark:bg-amber-950/30 dark:text-amber-300",
//       amount:
//         cobrador.codigoPendienteImporte > 0
//           ? cobrador.codigoPendienteImporte
//           : cobrador.saldoActual,
//       title: "Código pendiente",
//       description: "Tiene código de cierre generado.",
//     };
//   }

//   if (cobrador.saldoActual > 0) {
//     return {
//       label: "Pendiente",
//       tone:
//         "border-red-300 bg-red-50 text-red-700 dark:border-red-700/80 dark:bg-red-950/30 dark:text-red-300",
//       amount: cobrador.saldoActual,
//       title: "Caja actual",
//       description: "Saldo pendiente de cierre.",
//     };
//   }

//   if (cobrador.saldoActual < 0) {
//     return {
//       label: "A compensar",
//       tone:
//         "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700/80 dark:bg-blue-950/30 dark:text-blue-300",
//       amount: cobrador.saldoActual,
//       title: "Caja actual",
//       description: "Saldo negativo operativo.",
//     };
//   }

//   return {
//     label: "Al día",
//     tone:
//       "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-950/30 dark:text-emerald-300",
//     amount: cobrador.saldoActual,
//     title: "Caja actual",
//     description: "Sin saldo pendiente.",
//   };
// }

// function ordenarCobradores(cobradores: AdminDashboardCobradorCard[]) {
//   return [...cobradores].sort((a, b) => {
//     const prioridadA = a.tieneCodigoPendiente
//       ? 1
//       : a.saldoActual > 0
//         ? 2
//         : a.saldoActual < 0
//           ? 3
//           : 4;

//     const prioridadB = b.tieneCodigoPendiente
//       ? 1
//       : b.saldoActual > 0
//         ? 2
//         : b.saldoActual < 0
//           ? 3
//           : 4;

//     if (prioridadA !== prioridadB) return prioridadA - prioridadB;

//     return a.nombreCompleto.localeCompare(b.nombreCompleto);
//   });
// }

// const panelClass =
//   "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

// const innerPanelClass =
//   "rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/45 ring-1 ring-white/60 dark:border-slate-700 dark:bg-slate-950/55 dark:shadow-black/10 dark:ring-slate-800/70";

// const tablePanelClass =
//   "overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10";

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   href: string;
//   icon: LucideIcon;
//   tone: "primary" | "danger" | "success" | "warning" | "neutral";
// };

// const statToneClasses = {
//   primary:
//     "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/35 dark:text-blue-300 dark:ring-blue-700/70",
//   danger:
//     "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/35 dark:text-red-300 dark:ring-red-700/70",
//   success:
//     "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/35 dark:text-emerald-300 dark:ring-emerald-700/70",
//   warning:
//     "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/35 dark:text-amber-300 dark:ring-amber-700/70",
//   neutral:
//     "bg-slate-100 text-slate-700 ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600",
// };

// function StatCard({
//   title,
//   value,
//   description,
//   href,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <Link
//       href={href}
//       className="group flex min-h-[112px] flex-col justify-between rounded-xl border border-slate-300 bg-white p-3.5 shadow-md shadow-slate-300/50 ring-1 ring-white/70 transition hover:border-blue-300 hover:bg-slate-50 hover:shadow-slate-400/40 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80 dark:hover:border-blue-700/80 dark:hover:bg-slate-900"
//     >
//       <div className="flex items-start gap-3">
//         <div
//           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${statToneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//             {title}
//           </p>

//           <p
//             className={`mt-1 truncate text-xl font-semibold tracking-tight ${
//               tone === "danger"
//                 ? "text-red-700 dark:text-red-300"
//                 : "text-slate-950 dark:text-white"
//             }`}
//           >
//             {value}
//           </p>

//           <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
//             {description}
//           </p>
//         </div>
//       </div>

//       <div className="mt-3 flex items-center justify-end border-t border-slate-300 pt-2 text-[12px] font-medium text-slate-500 transition group-hover:text-blue-700 dark:border-slate-700 dark:text-slate-400 dark:group-hover:text-blue-300">
//         Ver detalle
//         <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
//       </div>
//     </Link>
//   );
// }

// function SectionHeader({
//   eyebrow,
//   title,
//   description,
//   href,
//   hrefLabel,
// }: {
//   eyebrow: string;
//   title: string;
//   description?: string;
//   href?: string;
//   hrefLabel?: string;
// }) {
//   return (
//     <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
//       <div className="min-w-0">
//         <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
//           {eyebrow}
//         </p>

//         <h2 className="mt-0.5 text-base font-semibold text-slate-950 dark:text-white">
//           {title}
//         </h2>

//         {description ? (
//           <p className="mt-0.5 text-[12px] leading-5 text-slate-500 dark:text-slate-400">
//             {description}
//           </p>
//         ) : null}
//       </div>

//       {href && hrefLabel ? (
//         <Link
//           href={href}
//           className="inline-flex items-center gap-1.5 text-[12px] font-medium text-blue-700 transition hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
//         >
//           {hrefLabel}
//           <ArrowRight className="h-3.5 w-3.5" />
//         </Link>
//       ) : null}
//     </div>
//   );
// }

// function MobileTopResumen({
//   totalCuentaAdmin,
//   totalEnCajaCobradores,
// }: {
//   totalCuentaAdmin: number;
//   totalEnCajaCobradores: number;
// }) {
//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
//             Panel general
//           </p>

//           <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             Resumen administrativo
//           </h1>

//           <p className="mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
//             Vista rápida de caja, cobradores y actividad reciente.
//           </p>
//         </div>

//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/35 dark:text-blue-300 dark:ring-blue-700/70">
//           <ShieldCheck className="h-4 w-4" />
//         </div>
//       </div>

//       <div className="grid gap-2">
//         <Link
//           href="/admin/caja-cobradores/cierres"
//           className={`${innerPanelClass} block px-3 py-3 transition hover:border-blue-300 hover:bg-slate-50 dark:hover:border-blue-700/80`}
//         >
//           <div className="flex items-center justify-between gap-3">
//             <div className="min-w-0">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//                 En administración
//               </p>

//               <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
//                 {formatMoney(totalCuentaAdmin)}
//               </p>
//             </div>

//             <Banknote className="h-5 w-5 shrink-0 text-blue-700 dark:text-blue-300" />
//           </div>
//         </Link>

//         <Link
//           href="/admin/caja-cobradores"
//           className="block rounded-lg border border-red-300 bg-red-50 px-3 py-3 shadow-sm shadow-red-950/5 ring-1 ring-red-100 transition hover:border-red-400 hover:bg-red-100 dark:border-red-700/80 dark:bg-red-950/25 dark:ring-red-900/40 dark:shadow-none dark:hover:bg-red-950/40"
//         >
//           <div className="flex items-center justify-between gap-3">
//             <div className="min-w-0">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-700 dark:text-red-300">
//                 En cobradores
//               </p>

//               <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-red-700 dark:text-red-300">
//                 {formatMoney(totalEnCajaCobradores)}
//               </p>
//             </div>

//             <WalletCards className="h-5 w-5 shrink-0 text-red-700 dark:text-red-300" />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

// function MobileResumenOperativo({
//   clientesActivos,
//   planesActivos,
//   codigosPendientes,
//   totalCobradores,
//   facturasEmitidas,
// }: {
//   clientesActivos: number;
//   planesActivos: number;
//   codigosPendientes: number;
//   totalCobradores: number;
//   facturasEmitidas: number;
// }) {
//   const items = [
//     {
//       label: "Clientes",
//       value: clientesActivos,
//       icon: UsersRound,
//     },
//     {
//       label: "Planes",
//       value: planesActivos,
//       icon: Wifi,
//     },
//     {
//       label: "Cobradores",
//       value: totalCobradores,
//       icon: UsersRound,
//     },
//     {
//       label: "Facturas",
//       value: facturasEmitidas,
//       icon: FileText,
//     },
//   ];

//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Resumen operativo"
//         title="Estado actual"
//         description="Indicadores principales del sistema."
//       />

//       <div className="grid grid-cols-2 gap-2">
//         {items.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div key={item.label} className={`${innerPanelClass} px-3 py-2.5`}>
//               <div className="flex items-center justify-between gap-2">
//                 <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
//                   {item.label}
//                 </p>

//                 <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
//               </div>

//               <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">
//                 {item.value}
//               </p>
//             </div>
//           );
//         })}

//         <div
//           className={`col-span-2 rounded-lg border px-3 py-2.5 ring-1 ${
//             codigosPendientes > 0
//               ? "border-amber-300 bg-amber-50 text-amber-800 ring-amber-100 dark:border-amber-700/80 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900/40"
//               : "border-emerald-300 bg-emerald-50 text-emerald-700 ring-emerald-100 dark:border-emerald-700/80 dark:bg-emerald-950/30 dark:text-emerald-300 dark:ring-emerald-900/40"
//           }`}
//         >
//           <div className="flex items-center justify-between gap-3">
//             <span className="inline-flex min-w-0 items-center gap-2">
//               <Clock3 className="h-4 w-4 shrink-0" />

//               <span className="truncate text-[11px] font-semibold uppercase tracking-[0.12em]">
//                 Códigos pendientes
//               </span>
//             </span>

//             <span className="text-2xl font-semibold">{codigosPendientes}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MobileAuditoriaAccess() {
//   return (
//     <Link
//       href="/admin/auditoria"
//       className={`${panelClass} group flex items-center justify-between gap-3 p-3.5 transition hover:border-blue-300 hover:bg-white dark:hover:border-blue-700/80 dark:hover:bg-slate-900`}
//     >
//       <div className="flex min-w-0 items-center gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600">
//           <FileClock className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
//             Auditoría
//           </p>

//           <h2 className="mt-0.5 truncate text-sm font-semibold text-slate-950 dark:text-white">
//             Registros del sistema
//           </h2>

//           <p className="mt-0.5 line-clamp-1 text-[12px] leading-5 text-slate-500 dark:text-slate-400">
//             Accesos, cobros, cierres y cambios administrativos.
//           </p>
//         </div>
//       </div>

//       <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
//     </Link>
//   );
// }

// function MobileCobradorCard({
//   cobrador,
// }: {
//   cobrador: AdminDashboardCobradorCard;
// }) {
//   const estado = getCobradorEstado(cobrador);

//   return (
//     <Link
//       href="/admin/caja-cobradores"
//       className={`${innerPanelClass} block p-3 transition hover:border-blue-300 hover:bg-slate-50 dark:hover:border-blue-700/80`}
//     >
//       <div className="flex items-start gap-3">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600">
//           {getInitials(cobrador.nombreCompleto)}
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex min-w-0 items-start justify-between gap-2">
//             <div className="min-w-0">
//               <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//                 {cobrador.nombreCompleto}
//               </p>

//               <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">
//                 {cobrador.email || "Sin email"}
//               </p>
//             </div>

//             <span
//               className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-medium ${estado.tone}`}
//             >
//               {estado.label}
//             </span>
//           </div>

//           <div className="mt-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 ring-1 ring-white/60 dark:border-slate-700 dark:bg-slate-900/70 dark:ring-slate-800/70">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//               {estado.title}
//             </p>

//             <p
//               className={`mt-1 break-words text-xl font-semibold tracking-tight ${getSaldoTextClass(
//                 estado.amount,
//               )}`}
//             >
//               {formatMoney(estado.amount)}
//             </p>
//           </div>

//           <div className="mt-2 grid grid-cols-2 gap-2">
//             <div className="min-w-0 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 ring-1 ring-white/60 dark:border-slate-700 dark:bg-slate-900/70 dark:ring-slate-800/70">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
//                 Último retiro
//               </p>

//               <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//                 {formatMoney(cobrador.ultimoRetiroImporte)}
//               </p>
//             </div>

//             <div className="min-w-0 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-right ring-1 ring-white/60 dark:border-slate-700 dark:bg-slate-900/70 dark:ring-slate-800/70">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
//                 Fecha
//               </p>

//               <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//                 {formatDate(cobrador.ultimoRetiroFecha)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// function MobileCobradoresList({
//   cobradores,
// }: {
//   cobradores: AdminDashboardCobradorCard[];
// }) {
//   const ordenados = ordenarCobradores(cobradores);

//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Cobradores"
//         title="Vista rápida de cajas"
//         description="Ordenados por códigos activos y saldos pendientes."
//         href="/admin/caja-cobradores"
//         hrefLabel="Ver caja"
//       />

//       {ordenados.length === 0 ? (
//         <div className="rounded-lg border border-dashed border-slate-400 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-600 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay usuarios con rol cobrador.
//         </div>
//       ) : (
//         <div className="grid gap-2">
//           {ordenados.slice(0, 6).map((cobrador) => (
//             <MobileCobradorCard
//               key={cobrador.cobradorId}
//               cobrador={cobrador}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function MobileMovimientoCard({
//   movimiento,
// }: {
//   movimiento: AdminDashboardUltimoMovimiento;
// }) {
//   return (
//     <div className={`${innerPanelClass} p-3`}>
//       <div className="flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//             {movimientoLabel(movimiento.tipoMovimiento)}
//           </p>

//           <p className="mt-0.5 line-clamp-2 text-[12px] leading-5 text-slate-500 dark:text-slate-400">
//             {movimiento.detalle}
//           </p>
//         </div>

//         <p className="max-w-[135px] shrink-0 break-words text-right text-sm font-semibold text-slate-950 dark:text-white">
//           {formatMoney(movimiento.importe)}
//         </p>
//       </div>

//       <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 text-[12px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
//         <span className="truncate">
//           {movimiento.usuarioNombre} · {movimiento.usuarioRol}
//         </span>

//         <span className="shrink-0">{formatDateTime(movimiento.fecha)}</span>
//       </div>
//     </div>
//   );
// }

// function MobileMovimientosList({
//   movimientos,
// }: {
//   movimientos: AdminDashboardUltimoMovimiento[];
// }) {
//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Movimientos recientes"
//         title="Últimos registros"
//         href="/clientes"
//         hrefLabel="Ver clientes"
//       />

//       {movimientos.length === 0 ? (
//         <div className="rounded-lg border border-dashed border-slate-400 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-600 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay movimientos financieros registrados.
//         </div>
//       ) : (
//         <div className="grid gap-2">
//           {movimientos.slice(0, 5).map((movimiento) => (
//             <MobileMovimientoCard
//               key={movimiento.id}
//               movimiento={movimiento}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// const quickActions = [
//   {
//     label: "Ver usuarios",
//     href: "/usuarios",
//     icon: UsersRound,
//   },
//   {
//     label: "Ver clientes",
//     href: "/clientes",
//     icon: UserRound,
//   },
//   {
//     label: "Caja cobradores",
//     href: "/admin/caja-cobradores",
//     icon: WalletCards,
//   },
//   {
//     label: "Facturación mensual",
//     href: "/admin/configuracion/facturacion",
//     icon: ReceiptText,
//   },
//   {
//     label: "Auditoría",
//     href: "/admin/auditoria",
//     icon: FileClock,
//   },
// ];

// function CobradoresTable({
//   cobradores,
// }: {
//   cobradores: AdminDashboardCobradorCard[];
// }) {
//   const ordenados = ordenarCobradores(cobradores);

//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Cobradores"
//         title="Cuentas activas"
//         description="Resumen de cajas, retiros y situación de cada cobrador."
//         href="/admin/caja-cobradores"
//         hrefLabel="Ver caja cobradores"
//       />

//       {ordenados.length === 0 ? (
//         <div className="rounded-lg border border-dashed border-slate-400 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-600 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay usuarios con rol cobrador.
//         </div>
//       ) : (
//         <div className={tablePanelClass}>
//           <div className="grid grid-cols-[minmax(190px,1.25fr)_1fr_1fr_1fr_0.8fr_105px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-400">
//             <span>Cobrador</span>
//             <span>Cuenta actual</span>
//             <span>Último retiro</span>
//             <span>Último cierre</span>
//             <span>Situación</span>
//             <span className="text-right">Acción</span>
//           </div>

//           <div className="divide-y divide-slate-300 dark:divide-slate-700">
//             {ordenados.map((cobrador) => {
//               const estado = getCobradorEstado(cobrador);

//               return (
//                 <div
//                   key={cobrador.cobradorId}
//                   className="grid grid-cols-[minmax(190px,1.25fr)_1fr_1fr_1fr_0.8fr_105px] items-center gap-3 px-3 py-3 transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
//                 >
//                   <div className="flex min-w-0 items-center gap-2.5">
//                     <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600">
//                       {getInitials(cobrador.nombreCompleto)}
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-[13px] font-semibold text-slate-950 dark:text-white">
//                         {cobrador.nombreCompleto}
//                       </p>

//                       <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">
//                         {cobrador.email || "Sin email"}
//                       </p>
//                     </div>
//                   </div>

//                   <p
//                     className={`truncate text-[13px] font-semibold ${getSaldoTextClass(
//                       cobrador.saldoActual,
//                     )}`}
//                   >
//                     {formatMoney(cobrador.saldoActual)}
//                   </p>

//                   <p className="truncate text-[13px] font-medium text-slate-800 dark:text-slate-200">
//                     {formatMoney(cobrador.ultimoRetiroImporte)}
//                   </p>

//                   <p className="truncate text-[13px] text-slate-500 dark:text-slate-400">
//                     {formatDate(cobrador.ultimoRetiroFecha)}
//                   </p>

//                   <span
//                     className={`inline-flex w-fit items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium leading-5 ${estado.tone}`}
//                   >
//                     <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                     {estado.label}
//                   </span>

//                   <div className="text-right">
//                     <Link
//                       href="/admin/caja-cobradores"
//                       className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-300 bg-white px-2.5 text-[12px] font-medium text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950/60 dark:text-blue-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
//                     >
//                       Ver
//                     </Link>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function MovimientosTable({
//   movimientos,
// }: {
//   movimientos: AdminDashboardUltimoMovimiento[];
// }) {
//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Últimos movimientos"
//         title="Movimientos recientes"
//         description="Actividad financiera registrada recientemente."
//         href="/clientes"
//         hrefLabel="Ver clientes"
//       />

//       {movimientos.length === 0 ? (
//         <div className="rounded-lg border border-dashed border-slate-400 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-600 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay movimientos financieros registrados.
//         </div>
//       ) : (
//         <div className={tablePanelClass}>
//           <div className="grid grid-cols-[150px_120px_1fr_130px_120px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-400">
//             <span>Fecha</span>
//             <span>Tipo</span>
//             <span>Detalle</span>
//             <span>Importe</span>
//             <span>Estado</span>
//           </div>

//           <div className="divide-y divide-slate-300 dark:divide-slate-700">
//             {movimientos.map((movimiento) => (
//               <div
//                 key={movimiento.id}
//                 className="grid grid-cols-[150px_120px_1fr_130px_120px] items-center gap-3 px-3 py-3 transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
//               >
//                 <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400">
//                   {formatDateTime(movimiento.fecha)}
//                 </p>

//                 <div className="flex items-center gap-2">
//                   <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/35 dark:text-blue-300 dark:ring-blue-700/70">
//                     <ReceiptText className="h-3.5 w-3.5" />
//                   </span>

//                   <span className="text-[13px] font-medium text-slate-800 dark:text-slate-200">
//                     {movimientoLabel(movimiento.tipoMovimiento)}
//                   </span>
//                 </div>

//                 <div className="min-w-0">
//                   <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">
//                     {movimiento.detalle}
//                   </p>

//                   <p className="truncate text-[12px] text-slate-500 dark:text-slate-400">
//                     {movimiento.usuarioNombre} · {movimiento.usuarioRol}
//                   </p>
//                 </div>

//                 <p className="text-[13px] font-semibold text-slate-950 dark:text-white">
//                   {formatMoney(movimiento.importe)}
//                 </p>

//                 <span className="inline-flex w-fit items-center gap-1 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium leading-5 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-950/30 dark:text-emerald-300">
//                   <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                   Confirmado
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function QuickActions() {
//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Acciones rápidas"
//         title="Atajos principales"
//         description="Accesos directos de administración."
//       />

//       <div className="grid gap-2">
//         {quickActions.map((item) => {
//           const Icon = item.icon;

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="group flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 ring-1 ring-white/50 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:ring-slate-800/60 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
//             >
//               <span className="flex min-w-0 items-center gap-2.5">
//                 <Icon className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-blue-700 dark:text-slate-400 dark:group-hover:text-blue-300" />
//                 <span className="truncate">{item.label}</span>
//               </span>

//               <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function ResumenRapido({
//   resumen,
//   fechaActual,
// }: {
//   resumen: Awaited<ReturnType<typeof obtenerAdminDashboardResumen>>;
//   fechaActual: string;
// }) {
//   const rows = [
//     {
//       label: "Clientes activos",
//       value: resumen.clientesActivos,
//       icon: UsersRound,
//     },
//     {
//       label: "Planes activos",
//       value: resumen.planesActivos,
//       icon: Wifi,
//     },
//     {
//       label: "Códigos pendientes",
//       value: resumen.codigosPendientes,
//       icon: Clock3,
//       danger: resumen.codigosPendientes > 0,
//     },
//     {
//       label: "Actualizado",
//       value: formatDateTime(fechaActual),
//       icon: CalendarClock,
//       isDate: true,
//     },
//   ];

//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Resumen rápido"
//         title="Datos principales"
//         description="Indicadores operativos."
//       />

//       <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/35 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
//         {rows.map((row, index) => {
//           const Icon = row.icon;

//           return (
//             <div
//               key={row.label}
//               className={`flex items-center justify-between gap-3 px-3 py-2.5 ${
//                 index !== rows.length - 1
//                   ? "border-b border-slate-300 dark:border-slate-700"
//                   : ""
//               }`}
//             >
//               <span className="flex min-w-0 items-center gap-2.5 text-[13px] text-slate-700 dark:text-slate-300">
//                 <Icon className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
//                 <span className="truncate">{row.label}</span>
//               </span>

//               <strong
//                 className={`shrink-0 text-right text-[13px] font-semibold ${
//                   row.danger
//                     ? "text-red-700 dark:text-red-300"
//                     : row.isDate
//                       ? "text-slate-500 dark:text-slate-400"
//                       : "text-slate-950 dark:text-white"
//                 }`}
//               >
//                 {row.value}
//               </strong>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function EstadoSistema({
//   resumen,
// }: {
//   resumen: Awaited<ReturnType<typeof obtenerAdminDashboardResumen>>;
// }) {
//   const cobradoresConSaldo = resumen.cobradores.filter(
//     (cobrador) => cobrador.saldoActual > 0,
//   ).length;

//   return (
//     <div className={`${panelClass} p-3.5`}>
//       <SectionHeader
//         eyebrow="Estado del sistema"
//         title="Información general"
//         description="Lectura rápida del entorno."
//       />

//       <div className="grid gap-2">
//         <div
//           className={`${innerPanelClass} flex items-center justify-between gap-3 px-3 py-2.5`}
//         >
//           <span className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-400">
//             <span className="h-2 w-2 rounded-full bg-emerald-500" />
//             Sesión activa
//           </span>

//           <span className="font-semibold text-emerald-700 dark:text-emerald-300">
//             Sí
//           </span>
//         </div>

//         <div
//           className={`${innerPanelClass} flex items-center justify-between gap-3 px-3 py-2.5`}
//         >
//           <span className="text-[13px] text-slate-600 dark:text-slate-400">
//             Rol actual
//           </span>

//           <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-[12px] font-semibold text-blue-700 dark:border-blue-700/70 dark:bg-blue-950/35 dark:text-blue-300">
//             Admin
//           </span>
//         </div>

//         <Link
//           href="/admin/auditoria"
//           className={`${innerPanelClass} flex items-center justify-between gap-3 px-3 py-2.5 transition hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-700 dark:hover:bg-blue-950/30`}
//         >
//           <span className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-400">
//             <FileClock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
//             Auditoría
//           </span>

//           <span className="rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
//             Activa
//           </span>
//         </Link>

//         <div
//           className={`${innerPanelClass} flex items-center justify-between gap-3 px-3 py-2.5`}
//         >
//           <span className="text-[13px] text-slate-600 dark:text-slate-400">
//             Cobradores con saldo
//           </span>

//           <span
//             className={`rounded-md border px-2.5 py-1 text-[12px] font-semibold ${
//               cobradoresConSaldo > 0
//                 ? "border-red-300 bg-red-50 text-red-700 dark:border-red-700/80 dark:bg-red-950/30 dark:text-red-300"
//                 : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-950/30 dark:text-emerald-300"
//             }`}
//           >
//             {cobradoresConSaldo}
//           </span>
//         </div>

//         <div
//           className={`${innerPanelClass} flex items-center justify-between gap-3 px-3 py-2.5`}
//         >
//           <span className="text-[13px] text-slate-600 dark:text-slate-400">
//             Estado general
//           </span>

//           <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300">
//             <CheckCircle2 className="h-3.5 w-3.5" />
//             Activo
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default async function AdminPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const resumen = await obtenerAdminDashboardResumen();
//   const fechaActual = new Date().toISOString();

//   return (
//     <PageShell maxWidth="wide">
//       <div className="space-y-3 lg:hidden">
//         <MobileTopResumen
//           totalCuentaAdmin={resumen.totalCuentaAdmin}
//           totalEnCajaCobradores={resumen.totalEnCajaCobradores}
//         />

//         <MobileResumenOperativo
//           clientesActivos={resumen.clientesActivos}
//           planesActivos={resumen.planesActivos}
//           codigosPendientes={resumen.codigosPendientes}
//           totalCobradores={resumen.totalCobradores}
//           facturasEmitidas={resumen.facturasEmitidas}
//         />

//         <MobileAuditoriaAccess />

//         <MobileCobradoresList cobradores={resumen.cobradores} />

//         <MobileMovimientosList movimientos={resumen.ultimosMovimientos} />
//       </div>

//       <div className="hidden lg:block">
//         <div className="mb-5 grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Cuenta administración"
//             value={formatMoney(resumen.totalCuentaAdmin)}
//             description="Total recibido por cierres de caja confirmados."
//             href="/admin/caja-cobradores/cierres"
//             icon={Banknote}
//             tone="neutral"
//           />

//           <StatCard
//             title="En cobradores"
//             value={formatMoney(resumen.totalEnCajaCobradores)}
//             description="Total en cajas de cobradores sin confirmar."
//             href="/admin/caja-cobradores"
//             icon={WalletCards}
//             tone="danger"
//           />

//           <StatCard
//             title="Cobradores activos"
//             value={String(resumen.totalCobradores)}
//             description="Cobradores con cuenta asignada activa."
//             href="/usuarios?rol=cobrador"
//             icon={UsersRound}
//             tone="primary"
//           />

//           <StatCard
//             title="Clientes registrados"
//             value={String(resumen.totalClientes)}
//             description={`${resumen.clientesActivos} activos en el sistema.`}
//             href="/clientes"
//             icon={UserRound}
//             tone="success"
//           />

//           <StatCard
//             title="Facturas emitidas"
//             value={String(resumen.facturasEmitidas)}
//             description="Movimientos emitidos como factura."
//             href="/admin/configuracion/facturacion"
//             icon={FileText}
//             tone="warning"
//           />
//         </div>

//         <DashboardGrid>
//           <DashboardMain>
//             <CobradoresTable cobradores={resumen.cobradores} />

//             <MovimientosTable movimientos={resumen.ultimosMovimientos} />
//           </DashboardMain>

//           <DashboardAside>
//             <QuickActions />

//             <ResumenRapido resumen={resumen} fechaActual={fechaActual} />

//             <EstadoSistema resumen={resumen} />
//           </DashboardAside>
//         </DashboardGrid>
//       </div>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/admin/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Banknote,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileClock,
  FileText,
  ReceiptText,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
  Wifi,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import {
  obtenerAdminDashboardResumen,
  type AdminDashboardCobradorCard,
  type AdminDashboardUltimoMovimiento,
} from "@/services/admin-dashboard.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Administrador",
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatDate(value: string | null) {
  if (!value) return "Sin cierre";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Sin cierre";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatDateTime(value: string | null) {
  if (!value) return "Sin fecha";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Sin fecha";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function movimientoLabel(tipo: string) {
  const labels: Record<string, string> = {
    factura: "Factura",
    pago: "Cobro",
    nota_debito: "Nota débito",
    nota_credito: "Nota crédito",
    ajuste: "Ajuste",
  };

  return labels[tipo] || "Movimiento";
}

function getInitials(name: string) {
  const parts = name
    .replace(",", " ")
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) return "CB";

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getSaldoTone(value: number) {
  if (value > 0) return "text-red-700 dark:text-red-300";
  if (value < 0) return "text-blue-700 dark:text-blue-300";
  return "text-emerald-700 dark:text-emerald-300";
}

function getMobileCobradorEstado(cobrador: AdminDashboardCobradorCard) {
  if (cobrador.tieneCodigoPendiente) {
    return {
      label: "Código activo",
      title: "Código pendiente",
      amount:
        cobrador.codigoPendienteImporte > 0
          ? cobrador.codigoPendienteImporte
          : cobrador.saldoActual,
      description: "Tiene código de cierre generado y pendiente.",
      border:
        "border-amber-300 bg-amber-50 dark:border-amber-700/80 dark:bg-amber-950/25",
      text: "text-amber-700 dark:text-amber-300",
      pill:
        "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700/80 dark:bg-amber-950/35 dark:text-amber-300",
    };
  }

  if (cobrador.saldoActual > 0) {
    return {
      label: "Pendiente",
      title: "Caja actual",
      amount: cobrador.saldoActual,
      description: "Saldo positivo pendiente de cierre.",
      border:
        "border-red-300 bg-red-50 dark:border-red-700/80 dark:bg-red-950/25",
      text: "text-red-700 dark:text-red-300",
      pill:
        "border-red-300 bg-red-50 text-red-700 dark:border-red-700/80 dark:bg-red-950/35 dark:text-red-300",
    };
  }

  if (cobrador.saldoActual < 0) {
    return {
      label: "A compensar",
      title: "Caja actual",
      amount: cobrador.saldoActual,
      description: "Saldo negativo a compensar con próximos cobros.",
      border:
        "border-blue-300 bg-blue-50 dark:border-blue-700/80 dark:bg-blue-950/25",
      text: "text-blue-700 dark:text-blue-300",
      pill:
        "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700/80 dark:bg-blue-950/35 dark:text-blue-300",
    };
  }

  return {
    label: "Al día",
    title: "Caja actual",
    amount: cobrador.saldoActual,
    description: "Sin saldo pendiente ni código activo.",
    border:
      "border-emerald-300 bg-emerald-50 dark:border-emerald-700/80 dark:bg-emerald-950/25",
    text: "text-emerald-700 dark:text-emerald-300",
    pill:
      "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-950/35 dark:text-emerald-300",
  };
}

function ordenarCobradoresMobile(cobradores: AdminDashboardCobradorCard[]) {
  return [...cobradores].sort((a, b) => {
    const prioridadA = a.tieneCodigoPendiente
      ? 1
      : a.saldoActual > 0
        ? 2
        : a.saldoActual < 0
          ? 3
          : 4;

    const prioridadB = b.tieneCodigoPendiente
      ? 1
      : b.saldoActual > 0
        ? 2
        : b.saldoActual < 0
          ? 3
          : 4;

    if (prioridadA !== prioridadB) return prioridadA - prioridadB;

    return a.nombreCompleto.toLowerCase().localeCompare(b.nombreCompleto.toLowerCase());
  });
}

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: "neutral" | "red" | "blue" | "violet" | "amber";
};

const statToneClasses = {
  neutral:
    "bg-slate-100 text-slate-700 ring-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600",
  red:
    "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/35 dark:text-red-300 dark:ring-red-700/70",
  blue:
    "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/35 dark:text-blue-300 dark:ring-blue-700/70",
  violet:
    "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950/35 dark:text-violet-300 dark:ring-violet-700/70",
  amber:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/35 dark:text-amber-300 dark:ring-amber-700/70",
};

const cardBase =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

function StatCard({
  title,
  value,
  description,
  href,
  icon: Icon,
  tone,
}: StatCardProps) {
  const isDanger = tone === "red";

  return (
    <Link
      href={href}
      className="group flex h-full min-h-[112px] flex-col justify-between rounded-xl border border-slate-300 bg-white p-3.5 shadow-md shadow-slate-300/50 ring-1 ring-white/70 transition hover:border-blue-300 hover:bg-slate-50 hover:shadow-slate-400/40 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80 dark:hover:border-blue-700/80 dark:hover:bg-slate-900"
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ${statToneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-medium uppercase leading-3 tracking-[0.1em] text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p
            className={`mt-2 truncate text-[24px] font-medium leading-none tracking-tight ${
              isDanger
                ? "text-red-700 dark:text-red-300"
                : "text-slate-950 dark:text-white"
            }`}
          >
            {value}
          </p>

          <p className="mt-2 line-clamp-2 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end border-t border-slate-300 pt-2 text-[11px] font-medium text-slate-500 transition group-hover:text-blue-700 dark:border-slate-700 dark:text-slate-400 dark:group-hover:text-blue-300">
        Ver detalle
        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function MobileTopResumen({
  totalCuentaAdmin,
  totalEnCajaCobradores,
}: {
  totalCuentaAdmin: number;
  totalEnCajaCobradores: number;
}) {
  return (
    <div className="rounded-xl border border-blue-300 bg-blue-50/80 p-3 shadow-sm shadow-blue-950/10 dark:border-blue-700/80 dark:bg-blue-950/20 dark:shadow-none">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">
            Resumen principal
          </p>

          <h2 className="mt-0.5 truncate text-sm font-semibold text-slate-950 dark:text-white">
            Estado de caja general
          </h2>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-700/70">
          <WalletCards className="h-4 w-4" />
        </div>
      </div>

      <div className="grid gap-2">
        <Link
          href="/admin/caja-cobradores/cierres"
          className="rounded-lg border border-slate-300 bg-white px-3 py-3 shadow-sm shadow-slate-200/60 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950/60 dark:shadow-none dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
                En administración
              </p>

              <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {formatMoney(totalCuentaAdmin)}
              </p>
            </div>

            <Banknote className="h-5 w-5 shrink-0 text-blue-700 dark:text-blue-300" />
          </div>
        </Link>

        <Link
          href="/admin/caja-cobradores"
          className="rounded-lg border border-red-300 bg-red-50 px-3 py-3 shadow-sm shadow-red-950/5 transition hover:border-red-400 hover:bg-red-100 dark:border-red-700/80 dark:bg-red-950/25 dark:shadow-none dark:hover:bg-red-950/40"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-red-700 dark:text-red-300">
                En cobradores
              </p>

              <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-red-700 dark:text-red-300">
                {formatMoney(totalEnCajaCobradores)}
              </p>
            </div>

            <WalletCards className="h-5 w-5 shrink-0 text-red-700 dark:text-red-300" />
          </div>
        </Link>
      </div>
    </div>
  );
}

function MobileResumenOperativo({
  clientesActivos,
  planesActivos,
  codigosPendientes,
  totalCobradores,
  facturasEmitidas,
}: {
  clientesActivos: number;
  planesActivos: number;
  codigosPendientes: number;
  totalCobradores: number;
  facturasEmitidas: number;
}) {
  const items = [
    {
      label: "Clientes",
      value: clientesActivos,
      icon: UsersRound,
      className:
        "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 ring-emerald-200 dark:ring-emerald-700/70",
    },
    {
      label: "Planes",
      value: planesActivos,
      icon: Wifi,
      className:
        "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30 ring-blue-200 dark:ring-blue-700/70",
    },
    {
      label: "Cobradores",
      value: totalCobradores,
      icon: UsersRound,
      className:
        "text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/30 ring-red-200 dark:ring-red-700/70",
    },
    {
      label: "Facturas",
      value: facturasEmitidas,
      icon: FileText,
      className:
        "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 ring-amber-200 dark:ring-amber-700/70",
    },
  ];

  return (
    <div className={`${cardBase} p-3`}>
      <div className="mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">
          Resumen operativo
        </p>

        <h2 className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
          Estado actual del sistema
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="min-w-0 rounded-lg border border-slate-300 bg-white px-2 py-2.5 text-center shadow-sm shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-950/55 dark:shadow-none"
            >
              <div
                className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg ring-1 ${item.className}`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <p className="mt-2 truncate text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                {item.label}
              </p>

              <p className="mt-0.5 text-xl font-semibold text-slate-950 dark:text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-2 flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 ${
          codigosPendientes > 0
            ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700/80 dark:bg-amber-950/30 dark:text-amber-300"
            : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-950/30 dark:text-emerald-300"
        }`}
      >
        <span className="inline-flex min-w-0 items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />

          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.12em]">
            Códigos pendientes
          </span>
        </span>

        <span className="text-xl font-semibold">{codigosPendientes}</span>
      </div>
    </div>
  );
}

function MobileAuditoriaAccess() {
  return (
    <Link
      href="/admin/auditoria"
      className={`${cardBase} group flex items-center justify-between gap-3 p-3 transition hover:border-blue-300 hover:bg-white dark:hover:border-blue-700 dark:hover:bg-blue-950/20`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-700/70">
          <FileClock className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">
            Auditoría
          </p>

          <h2 className="mt-0.5 truncate text-sm font-semibold text-slate-950 dark:text-white">
            Registros del sistema
          </h2>

          <p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
            Accesos, cobros, cierres y cambios administrativos.
          </p>
        </div>
      </div>

      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
    </Link>
  );
}

function MobileCobradorCard({
  cobrador,
}: {
  cobrador: AdminDashboardCobradorCard;
}) {
  const estado = getMobileCobradorEstado(cobrador);

  return (
    <Link
      href="/admin/caja-cobradores"
      className="block rounded-xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-700 dark:bg-slate-950/60 dark:shadow-none"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[11px] font-semibold text-blue-800 ring-1 ring-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-700/70">
          {getInitials(cobrador.nombreCompleto)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                {cobrador.nombreCompleto}
              </p>

              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                {cobrador.email || "Sin email"}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${estado.pill}`}
            >
              {estado.label}
            </span>
          </div>

          <div className="mt-2 grid gap-2">
            <div className={`rounded-lg border px-3 py-2 ${estado.border}`}>
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.13em] ${estado.text}`}
              >
                {estado.title}
              </p>

              <p
                className={`mt-1 break-words text-2xl font-semibold tracking-tight ${estado.text}`}
              >
                {formatMoney(estado.amount)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="min-w-0 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/70">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                  Último retiro
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">
                  {formatMoney(cobrador.ultimoRetiroImporte)}
                </p>
              </div>

              <div className="min-w-0 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-right dark:border-slate-700 dark:bg-slate-900/70">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                  Fecha
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">
                  {formatDate(cobrador.ultimoRetiroFecha)}
                </p>
              </div>
            </div>

            {estado.description ? (
              <p className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-[11px] leading-4 text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400">
                {estado.description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

function MobileCobradorGroup({
  title,
  description,
  index,
  cobradores,
}: {
  title: string;
  description: string;
  index: number;
  cobradores: AdminDashboardCobradorCard[];
}) {
  if (cobradores.length === 0) return null;

  const groupColor =
    index === 1
      ? "text-amber-700 dark:text-amber-300"
      : index === 2
        ? "text-red-700 dark:text-red-300"
        : index === 3
          ? "text-blue-700 dark:text-blue-300"
          : "text-emerald-700 dark:text-emerald-300";

  return (
    <div className="rounded-xl border border-slate-300 bg-slate-50/80 p-2.5 dark:border-slate-700 dark:bg-slate-950/35">
      <div className="mb-2 px-1">
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${groupColor}`}
        >
          {title}
        </p>

        <p className="mt-0.5 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div className="grid gap-2">
        {cobradores.map((cobrador) => (
          <MobileCobradorCard
            key={cobrador.cobradorId}
            cobrador={cobrador}
          />
        ))}
      </div>
    </div>
  );
}

function MobileCobradoresList({
  cobradores,
}: {
  cobradores: AdminDashboardCobradorCard[];
}) {
  const ordenados = ordenarCobradoresMobile(cobradores);

  const conCodigo = ordenados.filter(
    (cobrador) => cobrador.tieneCodigoPendiente,
  );

  const pendientes = ordenados.filter(
    (cobrador) => cobrador.saldoActual > 0 && !cobrador.tieneCodigoPendiente,
  );

  const aCompensar = ordenados.filter(
    (cobrador) => cobrador.saldoActual < 0 && !cobrador.tieneCodigoPendiente,
  );

  const alDia = ordenados.filter(
    (cobrador) =>
      cobrador.saldoActual === 0 && !cobrador.tieneCodigoPendiente,
  );

  return (
    <div className={`${cardBase} p-3`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">
            Cobradores
          </p>

          <h2 className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
            Vista rápida de cajas
          </h2>

          <p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
            Todos los cobradores ordenados por prioridad.
          </p>
        </div>

        <div className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-right shadow-sm shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-950/60 dark:shadow-none">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
            Total
          </p>

          <p className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
            {cobradores.length}
          </p>
        </div>
      </div>

      {cobradores.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
          Todavía no hay usuarios con rol cobrador.
        </div>
      ) : (
        <div className="grid gap-2">
          <MobileCobradorGroup
            title="Con código activo"
            description="Cobradores con código de cierre pendiente."
            index={1}
            cobradores={conCodigo}
          />

          <MobileCobradorGroup
            title="Pendientes de cierre"
            description="Cobradores con saldo positivo pendiente de cierre."
            index={2}
            cobradores={pendientes}
          />

          <MobileCobradorGroup
            title="Saldo a compensar"
            description="Cobradores con saldo negativo operativo."
            index={3}
            cobradores={aCompensar}
          />

          <MobileCobradorGroup
            title="Al día"
            description="Cobradores sin saldo pendiente ni código activo."
            index={4}
            cobradores={alDia}
          />

          <Link
            href="/admin/caja-cobradores"
            className="mt-1 flex h-10 items-center justify-center gap-2 border-t border-slate-300 pt-3 text-xs font-semibold text-blue-700 transition hover:text-blue-800 dark:border-slate-700 dark:text-blue-300 dark:hover:text-blue-200"
          >
            Ver todos los cobradores
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

function MobileMovimientoCard({
  movimiento,
}: {
  movimiento: AdminDashboardUltimoMovimiento;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/45 dark:border-slate-700 dark:bg-slate-950/55 dark:shadow-none">
      <div className="min-w-0">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
              {movimientoLabel(movimiento.tipoMovimiento)}
            </p>

            <p className="mt-0.5 line-clamp-2 text-xs leading-4 text-slate-500 dark:text-slate-400">
              {movimiento.detalle}
            </p>
          </div>

          <p className="max-w-[135px] shrink-0 break-words text-right text-sm font-semibold leading-5 text-slate-950 dark:text-white">
            {formatMoney(movimiento.importe)}
          </p>
        </div>

        <div className="mt-2 flex min-w-0 items-center justify-between gap-2 border-t border-slate-200 pt-2 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
          <span className="min-w-0 truncate">
            {movimiento.usuarioNombre} · {movimiento.usuarioRol}
          </span>

          <span className="shrink-0 text-right">
            {formatDateTime(movimiento.fecha)}
          </span>
        </div>
      </div>
    </div>
  );
}

function MobileMovimientosList({
  movimientos,
}: {
  movimientos: AdminDashboardUltimoMovimiento[];
}) {
  return (
    <div className={`${cardBase} overflow-hidden p-3`}>
      <div className="mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-800 dark:text-blue-300">
          Movimientos recientes
        </p>

        <h2 className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
          Últimos registros
        </h2>
      </div>

      {movimientos.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
          Todavía no hay movimientos financieros registrados.
        </div>
      ) : (
        <div className="grid gap-2">
          {movimientos.slice(0, 4).map((movimiento) => (
            <MobileMovimientoCard
              key={movimiento.id}
              movimiento={movimiento}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  const resumen = await obtenerAdminDashboardResumen();
  const fechaActual = new Date().toISOString();

  return (
    <PageShell maxWidth="wide" className="max-lg:space-y-3 max-lg:pb-20">
      <div className="space-y-3 lg:hidden">
        <MobileTopResumen
          totalCuentaAdmin={resumen.totalCuentaAdmin}
          totalEnCajaCobradores={resumen.totalEnCajaCobradores}
        />

        <MobileResumenOperativo
          clientesActivos={resumen.clientesActivos}
          planesActivos={resumen.planesActivos}
          codigosPendientes={resumen.codigosPendientes}
          totalCobradores={resumen.totalCobradores}
          facturasEmitidas={resumen.facturasEmitidas}
        />

        <MobileAuditoriaAccess />

        <MobileCobradoresList cobradores={resumen.cobradores} />

        <MobileMovimientosList movimientos={resumen.ultimosMovimientos} />
      </div>

      <div className="hidden lg:block">
        <div className="mb-5 grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <StatCard
            title="Cuenta administración"
            value={formatMoney(resumen.totalCuentaAdmin)}
            description="Cierres confirmados."
            href="/admin/caja-cobradores/cierres"
            icon={Banknote}
            tone="neutral"
          />

          <StatCard
            title="En cobradores"
            value={formatMoney(resumen.totalEnCajaCobradores)}
            description="Pendiente de cierre."
            href="/admin/caja-cobradores"
            icon={WalletCards}
            tone="red"
          />

          <StatCard
            title="Cobradores activos"
            value={String(resumen.totalCobradores)}
            description="Usuarios cobradores."
            href="/usuarios?rol=cobrador"
            icon={UsersRound}
            tone="blue"
          />

          <StatCard
            title="Clientes registrados"
            value={String(resumen.totalClientes)}
            description={`${resumen.clientesActivos} activos.`}
            href="/clientes"
            icon={UserRound}
            tone="violet"
          />

          <StatCard
            title="Facturas emitidas"
            value={String(resumen.facturasEmitidas)}
            description="Comprobantes emitidos."
            href="/admin/configuracion/facturacion"
            icon={FileText}
            tone="amber"
          />

          <StatCard
            title="Auditoría"
            value="Logs"
            description="Acciones sensibles."
            href="/admin/auditoria"
            icon={FileClock}
            tone="blue"
          />
        </div>

        <DashboardGrid>
          <DashboardMain>
            <div className={`${cardBase} p-3.5`}>
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
                    Cobradores
                  </p>

                  <h2 className="mt-0.5 text-base font-semibold text-slate-950 dark:text-white">
                    Cuentas activas
                  </h2>
                </div>

                <Link
                  href="/admin/caja-cobradores"
                  className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-blue-700 transition hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
                >
                  Ver caja cobradores
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {resumen.cobradores.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                  Todavía no hay usuarios con rol cobrador.
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
                  <div className="grid grid-cols-[minmax(180px,1.25fr)_1fr_0.8fr_0.8fr_110px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
                    <span>Cobrador</span>
                    <span>Cuenta actual</span>
                    <span>Último retiro</span>
                    <span>Situación</span>
                    <span className="text-right">Acción</span>
                  </div>

                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {resumen.cobradores.map((cobrador) => {
                      const tieneSaldoPendiente = cobrador.saldoActual > 0;

                      return (
                        <div
                          key={cobrador.cobradorId}
                          className="grid grid-cols-[minmax(180px,1.25fr)_1fr_0.8fr_0.8fr_110px] items-center gap-3 px-3 py-3 transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-700/70">
                              {getInitials(cobrador.nombreCompleto)}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-slate-950 dark:text-white">
                                {cobrador.nombreCompleto}
                              </p>

                              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                                {cobrador.email || "Sin email"}
                              </p>
                            </div>
                          </div>

                          <div className="min-w-0">
                            <p
                              className={`truncate text-sm font-semibold ${getSaldoTone(
                                cobrador.saldoActual,
                              )}`}
                            >
                              {formatMoney(cobrador.saldoActual)}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                              Total cobrado:{" "}
                              {formatMoney(cobrador.totalCobrado)}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-slate-950 dark:text-white">
                              {formatMoney(cobrador.ultimoRetiroImporte)}
                            </p>

                            <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
                              {formatDate(cobrador.ultimoRetiroFecha)}
                            </p>
                          </div>

                          <span
                            className={`inline-flex w-fit items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold leading-5 ${
                              tieneSaldoPendiente
                                ? "border-red-300 bg-red-50 text-red-700 dark:border-red-700/80 dark:bg-red-950/30 dark:text-red-300"
                                : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-950/30 dark:text-emerald-300"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {tieneSaldoPendiente ? "Pendiente" : "Al día"}
                          </span>

                          <div className="text-right">
                            <Link
                              href="/admin/caja-cobradores"
                              className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-300 bg-white px-2.5 text-[11px] font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950/60 dark:text-blue-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                            >
                              Ver detalle
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className={`${cardBase} p-3.5`}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
                    Últimos movimientos
                  </p>

                  <h2 className="mt-0.5 text-base font-semibold text-slate-950 dark:text-white">
                    Movimientos recientes en el sistema
                  </h2>
                </div>

                <Link
                  href="/clientes"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 transition hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
                >
                  Ver clientes
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {resumen.ultimosMovimientos.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                  Todavía no hay movimientos financieros registrados.
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
                  <div className="grid grid-cols-[145px_120px_minmax(0,1fr)_130px_110px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
                    <span>Fecha</span>
                    <span>Tipo</span>
                    <span>Detalle</span>
                    <span>Importe</span>
                    <span>Estado</span>
                  </div>

                  <div className="divide-y divide-slate-200 dark:divide-slate-700">
                    {resumen.ultimosMovimientos.map((movimiento) => (
                      <div
                        key={movimiento.id}
                        className="grid grid-cols-[145px_120px_minmax(0,1fr)_130px_110px] items-center gap-3 px-3 py-3 transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
                      >
                        <p className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {formatDateTime(movimiento.fecha)}
                        </p>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-700/70">
                            <ReceiptText className="h-3.5 w-3.5" />
                          </span>

                          <span className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {movimientoLabel(movimiento.tipoMovimiento)}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">
                            {movimiento.detalle}
                          </p>

                          <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                            {movimiento.usuarioNombre} ·{" "}
                            {movimiento.usuarioRol}
                          </p>
                        </div>

                        <p className="truncate text-xs font-semibold text-slate-950 dark:text-white">
                          {formatMoney(movimiento.importe)}
                        </p>

                        <span className="inline-flex w-fit items-center gap-1 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold leading-5 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-950/30 dark:text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          Confirmado
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DashboardMain>

          <DashboardAside>
            <div className={`${cardBase} p-3.5`}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
                    Resumen rápido
                  </p>

                  <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    Datos principales
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-700/70">
                  <ShieldCheck className="h-4 w-4" />
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
                  <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <UsersRound className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
                    Clientes activos
                  </span>

                  <strong className="text-xs font-semibold text-slate-950 dark:text-white">
                    {resumen.clientesActivos}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
                  <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Wifi className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
                    Planes activos
                  </span>

                  <strong className="text-xs font-semibold text-slate-950 dark:text-white">
                    {resumen.planesActivos}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
                  <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Clock3 className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
                    Códigos pendientes
                  </span>

                  <strong
                    className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                      resumen.codigosPendientes > 0
                        ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                    }`}
                  >
                    {resumen.codigosPendientes}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                  <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CalendarClock className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
                    Actualizado
                  </span>

                  <strong className="text-right text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {formatDateTime(fechaActual)}
                  </strong>
                </div>
              </div>
            </div>

            <div className={`${cardBase} p-3.5`}>
              <div className="mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
                  Estado del sistema
                </p>

                <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                  Información general
                </h2>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-none">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Sesión activa
                  </span>

                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                    Sí
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-none">
                  <span className="text-slate-600 dark:text-slate-400">
                    Rol actual
                  </span>

                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    Admin
                  </span>
                </div>

                <Link
                  href="/admin/auditoria"
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-none dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                >
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <FileClock className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
                    Auditoría
                  </span>

                  <span className="rounded-md bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-300">
                    Activa
                  </span>
                </Link>

                <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-none">
                  <span className="text-slate-600 dark:text-slate-400">
                    Cobradores con saldo
                  </span>

                  <span
                    className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                      resumen.totalEnCajaCobradores > 0
                        ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                    }`}
                  >
                    {
                      resumen.cobradores.filter(
                        (cobrador) => cobrador.saldoActual > 0,
                      ).length
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-none">
                  <span className="text-slate-600 dark:text-slate-400">
                    Estado general
                  </span>

                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Activo
                  </span>
                </div>
              </div>
            </div>
          </DashboardAside>
        </DashboardGrid>
      </div>
    </PageShell>
  );
}
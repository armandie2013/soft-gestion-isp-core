// // src/app/(dashboard)/admin/configuracion/page.tsx

// import Link from "next/link";
// import {
//   ArrowRight,
//   Banknote,
//   CheckCircle2,
//   FileText,
//   KeyRound,
//   ReceiptText,
//   Settings,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Configuración",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof Settings;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// type ConfigCardProps = {
//   title: string;
//   description: string;
//   href?: string;
//   icon: typeof Settings;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet" | "slate";
//   disabled?: boolean;
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
//   slate:
//     "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
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

// function ConfigCard({
//   title,
//   description,
//   href,
//   icon: Icon,
//   tone,
//   disabled,
// }: ConfigCardProps) {
//   const content = (
//     <>
//       <div className="flex items-start justify-between gap-3">
//         <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${toneClasses[tone]}`}>
//           <Icon className="h-4 w-4" />
//         </div>

//         {href && !disabled ? (
//           <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
//         ) : null}
//       </div>

//       <div className="mt-4">
//         <h2 className="text-sm font-medium text-slate-950 dark:text-white">
//           {title}
//         </h2>

//         <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//           {description}
//         </p>
//       </div>

//       <div className="mt-4 border-t border-slate-200 pt-3 text-[11px] font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
//         {disabled ? "Pendiente" : "Abrir configuración"}
//       </div>
//     </>
//   );

//   if (href && !disabled) {
//     return (
//       <Link
//         href={href}
//         className="group flex min-h-[170px] flex-col justify-between rounded-[1.35rem] border border-slate-200 bg-white/85 p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/75 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/20"
//       >
//         {content}
//       </Link>
//     );
//   }

//   return (
//     <div className="flex min-h-[170px] flex-col justify-between rounded-[1.35rem] border border-dashed border-slate-300 bg-white/60 p-3.5 shadow-sm dark:border-slate-700 dark:bg-slate-900/40">
//       {content}
//     </div>
//   );
// }

// const quickActions = [
//   {
//     label: "Facturación mensual",
//     description: "Generar facturas a clientes activos",
//     href: "/admin/configuracion/facturacion",
//     icon: ReceiptText,
//   },
//   {
//     label: "Panel administrador",
//     description: "Volver al resumen principal",
//     href: "/admin",
//     icon: ShieldCheck,
//   },
//   {
//     label: "Clientes",
//     description: "Administrar clientes y estados",
//     href: "/clientes",
//     icon: UserRound,
//   },
//   {
//     label: "Planes",
//     description: "Administrar planes comerciales",
//     href: "/planes",
//     icon: Wifi,
//   },
// ];

// export default function ConfiguracionPage() {
//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Facturación"
//           shortTitle="Factura"
//           value="Manual"
//           description="Generación mensual de facturas."
//           icon={ReceiptText}
//           tone="cyan"
//         />

//         <StatCard
//           title="Usuarios"
//           value="Roles"
//           description="Gestión de accesos y permisos."
//           icon={UsersRound}
//           tone="emerald"
//         />

//         <StatCard
//           title="Caja"
//           value="Códigos"
//           description="Cierres de caja de cobradores."
//           icon={WalletCards}
//           tone="amber"
//         />

//         <StatCard
//           title="Sistema"
//           value="Activo"
//           description="Configuración general del ISP."
//           icon={Settings}
//           tone="violet"
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Seguridad"
//             value="Admin"
//             description="Opciones solo para administradores."
//             icon={KeyRound}
//             tone="red"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div>
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Configuración
//               </p>

//               <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                 Panel de configuración
//               </h1>

//               <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                 Accesos administrativos para procesos generales del sistema,
//                 facturación mensual y futuras configuraciones del ISP.
//               </p>
//             </div>
//           </div>

//           <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
//             <ConfigCard
//               title="Facturación mensual"
//               description="Generar manualmente facturas mensuales para todos los clientes activos con plan contratado."
//               href="/admin/configuracion/facturacion"
//               icon={ReceiptText}
//               tone="cyan"
//             />

//             <ConfigCard
//               title="Usuarios y roles"
//               description="Gestionar usuarios registrados, roles, estado de acceso y seguridad de contraseña."
//               href="/usuarios"
//               icon={UsersRound}
//               tone="emerald"
//             />

//             <ConfigCard
//               title="Planes comerciales"
//               description="Administrar planes disponibles para asignar a los clientes del servicio."
//               href="/planes"
//               icon={Wifi}
//               tone="violet"
//             />

//             <ConfigCard
//               title="Caja de cobradores"
//               description="Controlar saldos pendientes, códigos de cierre y dinero recibido por administración."
//               href="/admin/caja-cobradores"
//               icon={WalletCards}
//               tone="amber"
//             />

//             <ConfigCard
//               title="Cierres confirmados"
//               description="Consultar el historial de cierres de caja ya confirmados por los cobradores."
//               href="/admin/caja-cobradores/cierres"
//               icon={CheckCircle2}
//               tone="cyan"
//             />

//             <ConfigCard
//               title="Parámetros generales"
//               description="Más adelante agregaremos opciones globales del ISP, vencimientos, avisos y reglas generales."
//               icon={Settings}
//               tone="slate"
//               disabled
//             />
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Acciones rápidas
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Atajos administrativos
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
//                 Estado del módulo
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Configuración disponible
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Facturación mensual
//                 </span>

//                 <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                   Activa
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Gestión de usuarios
//                 </span>

//                 <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                   Activa
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Caja cobradores
//                 </span>

//                 <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                   Activa
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Parámetros generales
//                 </span>

//                 <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
//                   Pendiente
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Recomendación
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Uso operativo
//               </h2>
//             </div>

//             <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//               Generá la facturación mensual una sola vez por período. El sistema
//               omite clientes que ya tengan factura para el mes y año elegido.
//             </div>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }


// // src/app/(dashboard)/admin/configuracion/page.tsx

// import Link from "next/link";
// import {
//   ArrowRight,
//   Banknote,
//   CheckCircle2,
//   FileText,
//   KeyRound,
//   ReceiptText,
//   Settings,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Configuración",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof Settings;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// type ConfigCardProps = {
//   title: string;
//   description: string;
//   href?: string;
//   icon: typeof Settings;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet" | "slate";
//   disabled?: boolean;
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
//   slate:
//     "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
// };

// const softToneClasses = {
//   cyan: "bg-cyan-50 text-cyan-700 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900",
//   emerald:
//     "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900",
//   amber:
//     "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-900",
//   red: "bg-red-50 text-red-700 ring-red-100 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900",
//   violet:
//     "bg-violet-50 text-violet-700 ring-violet-100 dark:bg-violet-950/50 dark:text-violet-300 dark:ring-violet-900",
//   slate:
//     "bg-slate-100 text-slate-500 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700",
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

// function ConfigCard({
//   title,
//   description,
//   href,
//   icon: Icon,
//   tone,
//   disabled,
// }: ConfigCardProps) {
//   const content = (
//     <>
//       <div className="flex items-start justify-between gap-3">
//         <div
//           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1 ${softToneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         {href && !disabled ? (
//           <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
//         ) : null}
//       </div>

//       <div className="mt-4">
//         <h2 className="text-sm font-medium text-slate-950 dark:text-white">
//           {title}
//         </h2>

//         <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//           {description}
//         </p>
//       </div>

//       <div className="mt-4 border-t border-slate-200 pt-3 text-[11px] font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
//         {disabled ? "Pendiente" : "Abrir configuración"}
//       </div>
//     </>
//   );

//   if (href && !disabled) {
//     return (
//       <Link
//         href={href}
//         className="group flex min-h-[170px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-white p-3.5 shadow-sm shadow-slate-300/40 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/20"
//       >
//         {content}
//       </Link>
//     );
//   }

//   return (
//     <div className="flex min-h-[170px] flex-col justify-between rounded-[1.35rem] border border-dashed border-slate-300 bg-white/70 p-3.5 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/30 dark:shadow-none">
//       {content}
//     </div>
//   );
// }

// const quickActions = [
//   {
//     label: "Facturación mensual",
//     description: "Generar facturas a clientes activos",
//     href: "/admin/configuracion/facturacion",
//     icon: ReceiptText,
//   },
//   {
//     label: "Panel administrador",
//     description: "Volver al resumen principal",
//     href: "/admin",
//     icon: ShieldCheck,
//   },
//   {
//     label: "Clientes",
//     description: "Administrar clientes y estados",
//     href: "/clientes",
//     icon: UserRound,
//   },
//   {
//     label: "Planes",
//     description: "Administrar planes comerciales",
//     href: "/planes",
//     icon: Wifi,
//   },
// ];

// export default function ConfiguracionPage() {
//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="lg:hidden">
//         <div className="mb-3 px-1">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Configuración
//           </p>

//           <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             Panel de configuración
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Accesos administrativos del sistema.
//           </p>
//         </div>

//         <div className="grid gap-3">
//           <ConfigCard
//             title="Facturación mensual"
//             description="Generar manualmente facturas mensuales para clientes activos."
//             href="/admin/configuracion/facturacion"
//             icon={ReceiptText}
//             tone="cyan"
//           />

//           <ConfigCard
//             title="Usuarios y roles"
//             description="Gestionar usuarios registrados, roles y estado de acceso."
//             href="/usuarios"
//             icon={UsersRound}
//             tone="emerald"
//           />

//           <ConfigCard
//             title="Planes comerciales"
//             description="Administrar planes disponibles para asignar a clientes."
//             href="/planes"
//             icon={Wifi}
//             tone="violet"
//           />

//           <ConfigCard
//             title="Caja de cobradores"
//             description="Controlar saldos, códigos de cierre y dinero recibido."
//             href="/admin/caja-cobradores"
//             icon={WalletCards}
//             tone="amber"
//           />

//           <ConfigCard
//             title="Cierres confirmados"
//             description="Consultar el historial de cierres de caja confirmados."
//             href="/admin/caja-cobradores/cierres"
//             icon={CheckCircle2}
//             tone="cyan"
//           />

//           <ConfigCard
//             title="Parámetros generales"
//             description="Más adelante agregaremos opciones globales del ISP."
//             icon={Settings}
//             tone="slate"
//             disabled
//           />
//         </div>
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Facturación"
//             value="Manual"
//             description="Generación mensual."
//             icon={ReceiptText}
//             tone="cyan"
//           />

//           <StatCard
//             title="Usuarios"
//             value="Roles"
//             description="Accesos y permisos."
//             icon={UsersRound}
//             tone="emerald"
//           />

//           <StatCard
//             title="Caja"
//             value="Códigos"
//             description="Cierres de cobradores."
//             icon={WalletCards}
//             tone="amber"
//           />

//           <StatCard
//             title="Sistema"
//             value="Activo"
//             description="Configuración general."
//             icon={Settings}
//             tone="violet"
//           />

//           <StatCard
//             title="Seguridad"
//             value="Admin"
//             description="Solo administradores."
//             icon={KeyRound}
//             tone="red"
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="flex min-w-0 items-start gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <Settings className="h-4 w-4" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Configuración
//                     </p>

//                     <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                       Panel de configuración
//                     </h1>

//                     <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                       Accesos administrativos para procesos generales del
//                       sistema, facturación mensual y futuras configuraciones del
//                       ISP.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
//                 <ConfigCard
//                   title="Facturación mensual"
//                   description="Generar manualmente facturas mensuales para todos los clientes activos con plan contratado."
//                   href="/admin/configuracion/facturacion"
//                   icon={ReceiptText}
//                   tone="cyan"
//                 />

//                 <ConfigCard
//                   title="Usuarios y roles"
//                   description="Gestionar usuarios registrados, roles, estado de acceso y seguridad de contraseña."
//                   href="/usuarios"
//                   icon={UsersRound}
//                   tone="emerald"
//                 />

//                 <ConfigCard
//                   title="Planes comerciales"
//                   description="Administrar planes disponibles para asignar a los clientes del servicio."
//                   href="/planes"
//                   icon={Wifi}
//                   tone="violet"
//                 />

//                 <ConfigCard
//                   title="Caja de cobradores"
//                   description="Controlar saldos pendientes, códigos de cierre y dinero recibido por administración."
//                   href="/admin/caja-cobradores"
//                   icon={WalletCards}
//                   tone="amber"
//                 />

//                 <ConfigCard
//                   title="Cierres confirmados"
//                   description="Consultar el historial de cierres de caja ya confirmados por los cobradores."
//                   href="/admin/caja-cobradores/cierres"
//                   icon={CheckCircle2}
//                   tone="cyan"
//                 />

//                 <ConfigCard
//                   title="Parámetros generales"
//                   description="Más adelante agregaremos opciones globales del ISP, vencimientos, avisos y reglas generales."
//                   icon={Settings}
//                   tone="slate"
//                   disabled
//                 />
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Acciones rápidas
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Atajos administrativos
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
//                       Estado del módulo
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Configuración disponible
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <FileText className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className={innerCardBase}>
//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <ReceiptText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Facturación mensual
//                     </span>

//                     <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                       Activa
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <UsersRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Gestión de usuarios
//                     </span>

//                     <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                       Activa
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Caja cobradores
//                     </span>

//                     <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                       Activa
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <Settings className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Parámetros generales
//                     </span>

//                     <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
//                       Pendiente
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3">
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Recomendación
//                   </p>

//                   <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                     Uso operativo
//                   </h2>
//                 </div>

//                 <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//                   Generá la facturación mensual una sola vez por período. El
//                   sistema omite clientes que ya tengan factura para el mes y año
//                   elegido.
//                 </div>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/admin/configuracion/page.tsx

// import Link from "next/link";
// import {
//   ArrowRight,
//   CheckCircle2,
//   FileClock,
//   FileText,
//   KeyRound,
//   ReceiptText,
//   Settings,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Configuración",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof Settings;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// type ConfigCardProps = {
//   title: string;
//   description: string;
//   href?: string;
//   icon: typeof Settings;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet" | "slate";
//   disabled?: boolean;
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

// const softToneClasses = {
//   cyan: "bg-cyan-50 text-cyan-700 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900",
//   emerald:
//     "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900",
//   amber:
//     "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-900",
//   red: "bg-red-50 text-red-700 ring-red-100 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900",
//   violet:
//     "bg-violet-50 text-violet-700 ring-violet-100 dark:bg-violet-950/50 dark:text-violet-300 dark:ring-violet-900",
//   slate:
//     "bg-slate-100 text-slate-500 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700",
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

// function ConfigCard({
//   title,
//   description,
//   href,
//   icon: Icon,
//   tone,
//   disabled,
// }: ConfigCardProps) {
//   const content = (
//     <>
//       <div className="flex items-start justify-between gap-3">
//         <div
//           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1 ${softToneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         {href && !disabled ? (
//           <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
//         ) : null}
//       </div>

//       <div className="mt-4">
//         <h2 className="text-sm font-medium text-slate-950 dark:text-white">
//           {title}
//         </h2>

//         <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//           {description}
//         </p>
//       </div>

//       <div className="mt-4 border-t border-slate-200 pt-3 text-[11px] font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
//         {disabled ? "Pendiente" : "Abrir configuración"}
//       </div>
//     </>
//   );

//   if (href && !disabled) {
//     return (
//       <Link
//         href={href}
//         className="group flex min-h-[170px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-white p-3.5 shadow-sm shadow-slate-300/40 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/20"
//       >
//         {content}
//       </Link>
//     );
//   }

//   return (
//     <div className="flex min-h-[170px] flex-col justify-between rounded-[1.35rem] border border-dashed border-slate-300 bg-white/70 p-3.5 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/30 dark:shadow-none">
//       {content}
//     </div>
//   );
// }

// const quickActions = [
//   {
//     label: "Facturación mensual",
//     description: "Generar facturas a clientes activos",
//     href: "/admin/configuracion/facturacion",
//     icon: ReceiptText,
//   },
//   {
//     label: "Auditoría",
//     description: "Ver acciones sensibles del sistema",
//     href: "/admin/auditoria",
//     icon: FileClock,
//   },
//   {
//     label: "Panel administrador",
//     description: "Volver al resumen principal",
//     href: "/admin",
//     icon: ShieldCheck,
//   },
//   {
//     label: "Clientes",
//     description: "Administrar clientes y estados",
//     href: "/clientes",
//     icon: UserRound,
//   },
//   {
//     label: "Planes",
//     description: "Administrar planes comerciales",
//     href: "/planes",
//     icon: Wifi,
//   },
// ];

// export default function ConfiguracionPage() {
//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="lg:hidden">
//         <div className="mb-3 px-1">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Configuración
//           </p>

//           <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             Panel de configuración
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Accesos administrativos del sistema.
//           </p>
//         </div>

//         <div className="grid gap-3">
//           <ConfigCard
//             title="Facturación mensual"
//             description="Generar manualmente facturas mensuales para clientes activos."
//             href="/admin/configuracion/facturacion"
//             icon={ReceiptText}
//             tone="cyan"
//           />

//           <ConfigCard
//             title="Usuarios y roles"
//             description="Gestionar usuarios registrados, roles y estado de acceso."
//             href="/usuarios"
//             icon={UsersRound}
//             tone="emerald"
//           />

//           <ConfigCard
//             title="Planes comerciales"
//             description="Administrar planes disponibles para asignar a clientes."
//             href="/planes"
//             icon={Wifi}
//             tone="violet"
//           />

//           <ConfigCard
//             title="Caja de cobradores"
//             description="Controlar saldos, códigos de cierre y dinero recibido."
//             href="/admin/caja-cobradores"
//             icon={WalletCards}
//             tone="amber"
//           />

//           <ConfigCard
//             title="Cierres confirmados"
//             description="Consultar el historial de cierres de caja confirmados."
//             href="/admin/caja-cobradores/cierres"
//             icon={CheckCircle2}
//             tone="cyan"
//           />

//           <ConfigCard
//             title="Auditoría del sistema"
//             description="Ver acciones sensibles, accesos, cobros, cierres y cambios administrativos."
//             href="/admin/auditoria"
//             icon={FileClock}
//             tone="red"
//           />

//           <ConfigCard
//             title="Parámetros generales"
//             description="Más adelante agregaremos opciones globales del ISP."
//             icon={Settings}
//             tone="slate"
//             disabled
//           />
//         </div>
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Facturación"
//             value="Manual"
//             description="Generación mensual."
//             icon={ReceiptText}
//             tone="cyan"
//           />

//           <StatCard
//             title="Usuarios"
//             value="Roles"
//             description="Accesos y permisos."
//             icon={UsersRound}
//             tone="emerald"
//           />

//           <StatCard
//             title="Caja"
//             value="Códigos"
//             description="Cierres de cobradores."
//             icon={WalletCards}
//             tone="amber"
//           />

//           <StatCard
//             title="Auditoría"
//             value="Logs"
//             description="Acciones sensibles."
//             icon={FileClock}
//             tone="red"
//           />

//           <StatCard
//             title="Seguridad"
//             value="Admin"
//             description="Solo administradores."
//             icon={KeyRound}
//             tone="violet"
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="flex min-w-0 items-start gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <Settings className="h-4 w-4" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Configuración
//                     </p>

//                     <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                       Panel de configuración
//                     </h1>

//                     <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                       Accesos administrativos para procesos generales del
//                       sistema, facturación mensual, auditoría y futuras
//                       configuraciones del ISP.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
//                 <ConfigCard
//                   title="Facturación mensual"
//                   description="Generar manualmente facturas mensuales para todos los clientes activos con plan contratado."
//                   href="/admin/configuracion/facturacion"
//                   icon={ReceiptText}
//                   tone="cyan"
//                 />

//                 <ConfigCard
//                   title="Usuarios y roles"
//                   description="Gestionar usuarios registrados, roles, estado de acceso y seguridad de contraseña."
//                   href="/usuarios"
//                   icon={UsersRound}
//                   tone="emerald"
//                 />

//                 <ConfigCard
//                   title="Planes comerciales"
//                   description="Administrar planes disponibles para asignar a los clientes del servicio."
//                   href="/planes"
//                   icon={Wifi}
//                   tone="violet"
//                 />

//                 <ConfigCard
//                   title="Caja de cobradores"
//                   description="Controlar saldos pendientes, códigos de cierre y dinero recibido por administración."
//                   href="/admin/caja-cobradores"
//                   icon={WalletCards}
//                   tone="amber"
//                 />

//                 <ConfigCard
//                   title="Cierres confirmados"
//                   description="Consultar el historial de cierres de caja ya confirmados por los cobradores."
//                   href="/admin/caja-cobradores/cierres"
//                   icon={CheckCircle2}
//                   tone="cyan"
//                 />

//                 <ConfigCard
//                   title="Auditoría del sistema"
//                   description="Ver acciones sensibles, accesos, cobros, cierres y cambios administrativos registrados."
//                   href="/admin/auditoria"
//                   icon={FileClock}
//                   tone="red"
//                 />

//                 <ConfigCard
//                   title="Parámetros generales"
//                   description="Más adelante agregaremos opciones globales del ISP, vencimientos, avisos y reglas generales."
//                   icon={Settings}
//                   tone="slate"
//                   disabled
//                 />
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3 flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Acciones rápidas
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Atajos administrativos
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
//                       Estado del módulo
//                     </p>

//                     <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                       Configuración disponible
//                     </h2>
//                   </div>

//                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <FileText className="h-4 w-4" />
//                   </div>
//                 </div>

//                 <div className={innerCardBase}>
//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <ReceiptText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Facturación mensual
//                     </span>

//                     <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                       Activa
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <UsersRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Gestión de usuarios
//                     </span>

//                     <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                       Activa
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Caja cobradores
//                     </span>

//                     <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                       Activa
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <FileClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Auditoría
//                     </span>

//                     <span className="text-xs font-medium text-red-700 dark:text-red-300">
//                       Activa
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                     <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                       <Settings className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Parámetros generales
//                     </span>

//                     <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
//                       Pendiente
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} p-3.5`}>
//                 <div className="mb-3">
//                   <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                     Recomendación
//                   </p>

//                   <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                     Uso operativo
//                   </h2>
//                 </div>

//                 <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//                   Generá la facturación mensual una sola vez por período. El
//                   sistema omite clientes que ya tengan factura para el mes y año
//                   elegido.
//                 </div>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/admin/configuracion/page.tsx

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileClock,
  FileText,
  KeyRound,
  ReceiptText,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
  Wifi,
} from "lucide-react";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Configuración",
};

type ConfigCardProps = {
  title: string;
  description: string;
  href?: string;
  icon: typeof Settings;
  tone: "primary" | "success" | "warning" | "danger" | "violet" | "neutral";
  disabled?: boolean;
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

const iconToneClasses = {
  primary:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300",
  danger:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300",
  violet:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/35 dark:text-violet-300",
  neutral:
    "border-slate-300 bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
};

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

function HeaderConfiguracion() {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <Settings className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className={sectionTitleClass}>Configuración</p>

          <h1 className={sectionSubtitleClass}>Panel de configuración</h1>

          <p className={`${sectionDescriptionClass} max-w-3xl`}>
            Accesos administrativos para procesos generales del sistema,
            facturación mensual, auditoría y futuras configuraciones del ISP.
          </p>
        </div>
      </div>
    </section>
  );
}

function ConfigCard({
  title,
  description,
  href,
  icon: Icon,
  tone,
  disabled,
}: ConfigCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${iconToneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        {href && !disabled ? (
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
        ) : null}
      </div>

      <div className="mt-3">
        <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
          {title}
        </h2>

        <p className="mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div className="mt-3 border-t border-slate-200 pt-2.5 text-[11px] font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
        {disabled ? "Pendiente" : "Abrir configuración"}
      </div>
    </>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className="group flex min-h-[150px] flex-col justify-between rounded-xl border border-slate-300 bg-white px-3 py-3 shadow-sm shadow-slate-300/35 ring-1 ring-white/70 transition hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-slate-400/30 dark:border-slate-700 dark:bg-slate-950/55 dark:shadow-black/10 dark:ring-slate-800/80 dark:hover:border-blue-700 dark:hover:bg-blue-950/25"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="flex min-h-[150px] flex-col justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 shadow-sm shadow-slate-300/20 dark:border-slate-700 dark:bg-slate-950/35 dark:shadow-none">
      {content}
    </div>
  );
}

function ConfiguracionGrid() {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Módulos</p>

        <h2 className={sectionSubtitleClass}>Accesos de configuración</h2>

        <p className={sectionDescriptionClass}>
          Seleccioná el módulo administrativo que querés revisar o configurar.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <ConfigCard
          title="Facturación mensual"
          description="Generar manualmente facturas mensuales para todos los clientes activos con plan contratado."
          href="/admin/configuracion/facturacion"
          icon={ReceiptText}
          tone="primary"
        />

        <ConfigCard
          title="Usuarios y roles"
          description="Gestionar usuarios registrados, roles, estado de acceso y seguridad de contraseña."
          href="/usuarios"
          icon={UsersRound}
          tone="success"
        />

        <ConfigCard
          title="Planes comerciales"
          description="Administrar planes disponibles para asignar a los clientes del servicio."
          href="/planes"
          icon={Wifi}
          tone="violet"
        />

        <ConfigCard
          title="Caja de cobradores"
          description="Controlar saldos pendientes, códigos de cierre y dinero recibido por administración."
          href="/admin/caja-cobradores"
          icon={WalletCards}
          tone="warning"
        />

        <ConfigCard
          title="Cierres confirmados"
          description="Consultar el historial de cierres de caja ya confirmados por los cobradores."
          href="/admin/caja-cobradores/cierres"
          icon={CheckCircle2}
          tone="primary"
        />

        <ConfigCard
          title="Auditoría del sistema"
          description="Ver acciones sensibles, accesos, cobros, cierres y cambios administrativos registrados."
          href="/admin/auditoria"
          icon={FileClock}
          tone="danger"
        />

        <ConfigCard
          title="Parámetros generales"
          description="Más adelante agregaremos opciones globales del ISP, vencimientos, avisos y reglas generales."
          icon={Settings}
          tone="neutral"
          disabled
        />
      </div>
    </section>
  );
}

function AccionesRapidasAside() {
  const quickActions = [
    {
      label: "Facturación mensual",
      description: "Generar facturas a clientes activos",
      href: "/admin/configuracion/facturacion",
      icon: ReceiptText,
    },
    {
      label: "Auditoría",
      description: "Ver acciones sensibles del sistema",
      href: "/admin/auditoria",
      icon: FileClock,
    },
    {
      label: "Panel administrador",
      description: "Volver al resumen principal",
      href: "/admin",
      icon: ShieldCheck,
    },
    {
      label: "Clientes",
      description: "Administrar clientes y estados",
      href: "/clientes",
      icon: UserRound,
    },
    {
      label: "Planes",
      description: "Administrar planes comerciales",
      href: "/planes",
      icon: Wifi,
    },
  ];

  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Accesos rápidos</p>

        <h2 className={sectionSubtitleClass}>Atajos administrativos</h2>
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

function EstadoModuloAside() {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Estado del módulo</p>

          <h2 className={sectionSubtitleClass}>Configuración disponible</h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <FileText className="h-4 w-4" />
        </div>
      </div>

      <div className={innerPanelClass}>
        <ResumenItem
          icon={<ReceiptText className="h-3.5 w-3.5" />}
          label="Facturación mensual"
          value="Activa"
          tone="success"
        />

        <ResumenItem
          icon={<UsersRound className="h-3.5 w-3.5" />}
          label="Gestión de usuarios"
          value="Activa"
          tone="primary"
        />

        <ResumenItem
          icon={<WalletCards className="h-3.5 w-3.5" />}
          label="Caja cobradores"
          value="Activa"
          tone="warning"
        />

        <ResumenItem
          icon={<FileClock className="h-3.5 w-3.5" />}
          label="Auditoría"
          value="Activa"
          tone="danger"
        />

        <ResumenItem
          icon={<Settings className="h-3.5 w-3.5" />}
          label="Parámetros generales"
          value="Pendiente"
        />
      </div>
    </section>
  );
}

function RecomendacionAside() {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Recomendación</p>

        <h2 className={sectionSubtitleClass}>Uso operativo</h2>
      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
        Generá la facturación mensual una sola vez por período. El sistema omite
        clientes que ya tengan factura para el mes y año elegido.
      </div>
    </section>
  );
}

function SeguridadAside() {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Seguridad</p>

          <h2 className={sectionSubtitleClass}>Acceso administrativo</h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <KeyRound className="h-4 w-4" />
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-[12px] leading-5 text-blue-800 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-blue-300">
        Este módulo debe estar disponible solo para usuarios administradores.
        Desde acá se accede a procesos sensibles del sistema.
      </div>
    </section>
  );
}

export default function ConfiguracionPage() {
  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <HeaderConfiguracion />

          <div className="mt-3">
            <ConfiguracionGrid />
          </div>
        </DashboardMain>

        <DashboardAside>
          <AccionesRapidasAside />

          <div className="mt-3">
            <EstadoModuloAside />
          </div>

          <div className="mt-3">
            <RecomendacionAside />
          </div>

          <div className="mt-3">
            <SeguridadAside />
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
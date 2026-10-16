// // // // src/app/(dashboard)/cobrador/clientes/[id]/page.tsx

// // // import Link from "next/link";
// // // import { notFound, redirect } from "next/navigation";
// // // import {
// // //   AlertTriangle,
// // //   ArrowRight,
// // //   CreditCard,
// // //   Eye,
// // //   FileText,
// // //   Home,
// // //   IdCard,
// // //   MapPin,
// // //   Phone,
// // //   ReceiptText,
// // //   UserRound,
// // //   WalletCards,
// // //   Wifi,
// // // } from "lucide-react";
// // // import type { LucideIcon } from "lucide-react";
// // // import { Badge } from "@/components/ui/Badge";
// // // import { PageShell } from "@/components/ui/PageShell";
// // // import {
// // //   DashboardAside,
// // //   DashboardGrid,
// // //   DashboardMain,
// // // } from "@/components/ui/DashboardGrid";
// // // import { CopyDniButton } from "@/components/ui/CopyDniButton";
// // // import { getCurrentUser } from "@/lib/current-user";
// // // import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";

// // // type CobradorClientePageProps = {
// // //   params: {
// // //     id: string;
// // //   };
// // //   searchParams?: {
// // //     modo?: string;
// // //     dni?: string;
// // //   };
// // // };

// // // type StatCardProps = {
// // //   title: string;
// // //   value: string;
// // //   description: string;
// // //   icon: LucideIcon;
// // //   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// // // };

// // // export const metadata = {
// // //   title: "Cliente",
// // // };

// // // const toneClasses = {
// // //   cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
// // //   emerald:
// // //     "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
// // //   amber:
// // //     "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
// // //   red: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
// // //   violet:
// // //     "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
// // // };

// // // function limpiarDni(value?: string) {
// // //   return String(value || "").replace(/\D/g, "").slice(0, 12);
// // // }

// // // function formatMoney(value: number) {
// // //   const amount = Number(value || 0);
// // //   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
// // //   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// // //   return `$ ${formattedInteger},${decimalPart}`;
// // // }

// // // function formatCompactMoney(value: number) {
// // //   const amount = Number(value || 0);
// // //   const abs = Math.abs(amount);
// // //   const sign = amount < 0 ? "-" : "";

// // //   if (abs >= 1_000_000) {
// // //     return `${sign}$ ${(abs / 1_000_000).toLocaleString("es-AR", {
// // //       maximumFractionDigits: 1,
// // //     })} M`;
// // //   }

// // //   const integerPart = Math.round(abs)
// // //     .toString()
// // //     .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// // //   return `${sign}$ ${integerPart}`;
// // // }

// // // function getEstadoBadgeVariant(estado: string) {
// // //   if (estado === "activo") return "success";
// // //   if (estado === "suspendido") return "warning";
// // //   return "danger";
// // // }

// // // function getEstadoLabel(estado: string) {
// // //   if (estado === "activo") return "Activo";
// // //   if (estado === "suspendido") return "Suspendido";
// // //   return "Baja";
// // // }

// // // function getPeriodoBadge(estadoPeriodo: string) {
// // //   if (estadoPeriodo === "cancelado") {
// // //     return {
// // //       label: "Cancelado",
// // //       variant: "success",
// // //     };
// // //   }

// // //   if (estadoPeriodo === "a_favor") {
// // //     return {
// // //       label: "A favor",
// // //       variant: "info",
// // //     };
// // //   }

// // //   return {
// // //     label: "Pendiente",
// // //     variant: "danger",
// // //   };
// // // }

// // // function contarPeriodosPendientes(periodos: any[]) {
// // //   return periodos.filter((periodo) => Number(periodo.saldoPeriodo || 0) > 0)
// // //     .length;
// // // }

// // // function StatCard({
// // //   title,
// // //   value,
// // //   description,
// // //   icon: Icon,
// // //   tone,
// // // }: StatCardProps) {
// // //   return (
// // //     <div className="flex h-full min-h-[88px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none xl:min-h-[96px]">
// // //       <div className="flex min-w-0 items-start gap-3">
// // //         <div
// // //           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}
// // //         >
// // //           <Icon className="h-3.5 w-3.5" />
// // //         </div>

// // //         <div className="min-w-0">
// // //           <p className="truncate text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
// // //             {title}
// // //           </p>

// // //           <p className="mt-1 truncate text-base font-medium leading-none tracking-tight text-slate-950 dark:text-white xl:text-lg">
// // //             {value}
// // //           </p>

// // //           <p className="mt-1 hidden text-[11px] leading-4 text-slate-600 dark:text-slate-400 xl:block">
// // //             {description}
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function DataTile({
// // //   label,
// // //   value,
// // //   icon: Icon,
// // // }: {
// // //   label: string;
// // //   value?: string | number | null;
// // //   icon: LucideIcon;
// // // }) {
// // //   return (
// // //     <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
// // //       <div className="flex items-center gap-2">
// // //         <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />

// // //         <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
// // //           {label}
// // //         </p>
// // //       </div>

// // //       <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
// // //         {value || "-"}
// // //       </p>
// // //     </div>
// // //   );
// // // }

// // // function DataLine({
// // //   label,
// // //   value,
// // // }: {
// // //   label: string;
// // //   value?: string | number | null;
// // // }) {
// // //   return (
// // //     <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-2 last:border-b-0 dark:border-slate-800">
// // //       <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
// // //         {label}
// // //       </span>

// // //       <span className="min-w-0 truncate text-right text-sm font-medium text-slate-950 dark:text-white">
// // //         {value || "-"}
// // //       </span>
// // //     </div>
// // //   );
// // // }

// // // function SectionHeader({
// // //   icon: Icon,
// // //   eyebrow,
// // //   title,
// // //   description,
// // // }: {
// // //   icon: LucideIcon;
// // //   eyebrow: string;
// // //   title: string;
// // //   description: string;
// // // }) {
// // //   return (
// // //     <div className="mb-3 flex items-start gap-3">
// // //       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
// // //         <Icon className="h-4 w-4" />
// // //       </div>

// // //       <div className="min-w-0">
// // //         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// // //           {eyebrow}
// // //         </p>

// // //         <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
// // //           {title}
// // //         </h2>

// // //         <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
// // //           {description}
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function MobileClienteHero({
// // //   cliente,
// // //   tieneDeuda,
// // // }: {
// // //   cliente: any;
// // //   tieneDeuda: boolean;
// // // }) {
// // //   return (
// // //     <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
// // //       <div className="flex items-start gap-3">
// // //         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
// // //           <UserRound className="h-5 w-5" />
// // //         </div>

// // //         <div className="min-w-0 flex-1">
// // //           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// // //             Cliente N° {cliente.numeroCliente}
// // //           </p>

// // //           <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white">
// // //             {cliente.apellido}, {cliente.nombre}
// // //           </h1>

// // //           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
// // //             DNI {cliente.dni}
// // //           </p>
// // //         </div>
// // //       </div>

// // //       <div className="mt-3 flex flex-wrap gap-2">
// // //         <Badge variant={getEstadoBadgeVariant(cliente.estado) as any}>
// // //           {getEstadoLabel(cliente.estado)}
// // //         </Badge>

// // //         {cliente.plan ? (
// // //           <Badge variant="info">{cliente.plan.nombre}</Badge>
// // //         ) : (
// // //           <Badge variant="warning">Sin plan</Badge>
// // //         )}

// // //         <Badge variant={tieneDeuda ? "danger" : "success"}>
// // //           {tieneDeuda ? "Con deuda" : "Sin deuda"}
// // //         </Badge>
// // //       </div>

// // //       <div className="mt-3 flex justify-end">
// // //         <CopyDniButton dni={cliente.dni} />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function MobileServicioCard({ cliente }: { cliente: any }) {
// // //   return (
// // //     <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
// // //       <SectionHeader
// // //         icon={Home}
// // //         eyebrow="Servicio"
// // //         title="Datos del servicio"
// // //         description="Ubicación, contacto y plan contratado."
// // //       />

// // //       <div className="grid gap-2">
// // //         <DataTile label="Dirección" value={cliente.direccion} icon={MapPin} />
// // //         <DataTile label="Localidad" value={cliente.localidad} icon={MapPin} />
// // //         <DataTile label="Teléfono" value={cliente.telefono} icon={Phone} />
// // //         <DataTile
// // //           label="Plan"
// // //           value={cliente.plan?.nombre || "Sin plan"}
// // //           icon={Wifi}
// // //         />

// // //         <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
// // //           <DataLine label="Tipo" value={cliente.plan?.tipo || "-"} />
// // //           <DataLine
// // //             label="Importe"
// // //             value={cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
// // //           />
// // //           <DataLine label="Detalle" value={cliente.plan?.detalle || "-"} />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function MobileCuentaCard({
// // //   cliente,
// // //   totalPendiente,
// // //   tieneDeuda,
// // //   vieneDeCircuitoPago,
// // // }: {
// // //   cliente: any;
// // //   totalPendiente: number;
// // //   tieneDeuda: boolean;
// // //   vieneDeCircuitoPago: boolean;
// // // }) {
// // //   return (
// // //     <div
// // //       className={`rounded-[1.45rem] border-2 p-3 shadow-sm ${
// // //         tieneDeuda
// // //           ? "border-red-300 bg-red-50 text-red-950 dark:border-red-900/80 dark:bg-red-950/25 dark:text-red-100"
// // //           : "border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-900/80 dark:bg-emerald-950/25 dark:text-emerald-100"
// // //       }`}
// // //     >
// // //       <div className="flex items-start gap-3">
// // //         <div
// // //           className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
// // //             tieneDeuda
// // //               ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
// // //               : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
// // //           }`}
// // //         >
// // //           <WalletCards className="h-5 w-5" />
// // //         </div>

// // //         <div className="min-w-0">
// // //           <p
// // //             className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
// // //               tieneDeuda
// // //                 ? "text-red-700 dark:text-red-300"
// // //                 : "text-emerald-700 dark:text-emerald-300"
// // //             }`}
// // //           >
// // //             Cuenta del cliente
// // //           </p>

// // //           <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
// // //             Total pendiente
// // //           </h2>

// // //           <p
// // //             className={`mt-2 truncate text-4xl font-medium tracking-tight ${
// // //               tieneDeuda
// // //                 ? "text-red-700 dark:text-red-300"
// // //                 : "text-emerald-700 dark:text-emerald-300"
// // //             }`}
// // //           >
// // //             {formatMoney(totalPendiente)}
// // //           </p>
// // //         </div>
// // //       </div>

// // //       <div className="mt-3 rounded-2xl border border-white/70 bg-white/70 px-3 py-2 text-xs leading-5 text-slate-700 dark:border-slate-800 dark:bg-slate-950/45 dark:text-slate-300">
// // //         Este importe se actualiza con facturas, pagos, notas de débito y notas
// // //         de crédito.
// // //       </div>

// // //       {vieneDeCircuitoPago ? (
// // //         <Link
// // //           href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
// // //           className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
// // //         >
// // //           <CreditCard className="h-3.5 w-3.5" />
// // //           Registrar pago
// // //         </Link>
// // //       ) : (
// // //         <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
// // //           <div className="flex gap-2">
// // //             <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
// // //             <p>
// // //               Vista informativa. Para registrar un pago, iniciá desde el panel
// // //               del cobrador con DNI exacto.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // function EstadoCuentaListado({
// // //   cliente,
// // //   periodos,
// // //   destacadoMobile = false,
// // // }: {
// // //   cliente: any;
// // //   periodos: any[];
// // //   destacadoMobile?: boolean;
// // // }) {
// // //   return (
// // //     <div
// // //       className={
// // //         destacadoMobile
// // //           ? "rounded-[1.45rem] border-2 border-cyan-300 bg-cyan-50/70 p-3 shadow-sm dark:border-cyan-900/80 dark:bg-cyan-950/20"
// // //           : "rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-4"
// // //       }
// // //     >
// // //       <SectionHeader
// // //         icon={FileText}
// // //         eyebrow="Estado de cuenta"
// // //         title="Períodos del cliente"
// // //         description="Listado resumido por período con acceso al detalle."
// // //       />

// // //       {periodos.length === 0 ? (
// // //         <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
// // //           Este cliente todavía no tiene períodos facturados.
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <div className="grid gap-3 md:hidden">
// // //             {periodos.map((periodo) => {
// // //               const badge = getPeriodoBadge(periodo.estadoPeriodo);
// // //               const periodoConSaldo = periodo.saldoPeriodo > 0;

// // //               return (
// // //                 <div
// // //                   key={periodo.facturaId}
// // //                   className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
// // //                 >
// // //                   <div className="flex items-start justify-between gap-3">
// // //                     <div className="min-w-0">
// // //                       <div className="flex flex-wrap items-center gap-2">
// // //                         <p className="truncate text-base font-medium text-slate-950 dark:text-white">
// // //                           {periodo.periodoLabel}
// // //                         </p>

// // //                         <Badge variant={badge.variant as any}>
// // //                           {badge.label}
// // //                         </Badge>
// // //                       </div>

// // //                       <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
// // //                         Factura N° {periodo.numeroComprobante}
// // //                       </p>
// // //                     </div>

// // //                     <div
// // //                       className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${
// // //                         periodoConSaldo
// // //                           ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
// // //                           : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
// // //                       }`}
// // //                     >
// // //                       {periodoConSaldo ? "Debe" : "OK"}
// // //                     </div>
// // //                   </div>

// // //                   <div className="mt-3 grid grid-cols-2 gap-2">
// // //                     <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
// // //                       <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
// // //                         Original
// // //                       </p>

// // //                       <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
// // //                         {formatMoney(periodo.importeOriginal)}
// // //                       </p>
// // //                     </div>

// // //                     <div
// // //                       className={`rounded-2xl border px-3 py-2 ${
// // //                         periodoConSaldo
// // //                           ? "border-red-200 bg-red-50 dark:border-red-900/70 dark:bg-red-950/30"
// // //                           : "border-emerald-200 bg-emerald-50 dark:border-emerald-900/70 dark:bg-emerald-950/30"
// // //                       }`}
// // //                     >
// // //                       <p
// // //                         className={`text-[9px] font-medium uppercase tracking-[0.14em] ${
// // //                           periodoConSaldo
// // //                             ? "text-red-700 dark:text-red-300"
// // //                             : "text-emerald-700 dark:text-emerald-300"
// // //                         }`}
// // //                       >
// // //                         Saldo
// // //                       </p>

// // //                       <p
// // //                         className={`mt-1 truncate text-sm font-medium ${
// // //                           periodoConSaldo
// // //                             ? "text-red-700 dark:text-red-300"
// // //                             : "text-emerald-700 dark:text-emerald-300"
// // //                         }`}
// // //                       >
// // //                         {formatMoney(periodo.saldoPeriodo)}
// // //                       </p>
// // //                     </div>
// // //                   </div>

// // //                   <Link
// // //                     href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
// // //                     className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-medium text-slate-800 transition hover:bg-cyan-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
// // //                   >
// // //                     <Eye className="h-3.5 w-3.5" />
// // //                     Ver detalle
// // //                   </Link>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>

// // //           <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/50 md:block">
// // //             <div className="grid grid-cols-[minmax(170px,1fr)_120px_120px_110px] border-b border-slate-200 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
// // //               <span>Período</span>
// // //               <span className="text-right">Factura</span>
// // //               <span className="text-right">Saldo</span>
// // //               <span className="text-right">Acción</span>
// // //             </div>

// // //             {periodos.map((periodo) => {
// // //               const badge = getPeriodoBadge(periodo.estadoPeriodo);
// // //               const periodoConSaldo = periodo.saldoPeriodo > 0;

// // //               return (
// // //                 <div
// // //                   key={periodo.facturaId}
// // //                   className="grid grid-cols-[minmax(170px,1fr)_120px_120px_110px] items-center gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800"
// // //                 >
// // //                   <div className="min-w-0">
// // //                     <div className="flex flex-wrap items-center gap-2">
// // //                       <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
// // //                         {periodo.periodoLabel}
// // //                       </p>

// // //                       <Badge variant={badge.variant as any}>{badge.label}</Badge>
// // //                     </div>

// // //                     <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
// // //                       Original {formatMoney(periodo.importeOriginal)}
// // //                     </p>
// // //                   </div>

// // //                   <p className="text-right text-xs font-medium text-slate-700 dark:text-slate-300">
// // //                     N° {periodo.numeroComprobante}
// // //                   </p>

// // //                   <p
// // //                     className={`text-right text-sm font-medium ${
// // //                       periodoConSaldo
// // //                         ? "text-red-700 dark:text-red-300"
// // //                         : "text-emerald-700 dark:text-emerald-300"
// // //                     }`}
// // //                   >
// // //                     {formatMoney(periodo.saldoPeriodo)}
// // //                   </p>

// // //                   <div className="text-right">
// // //                     <Link
// // //                       href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
// // //                       className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-medium text-slate-800 transition hover:bg-cyan-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
// // //                     >
// // //                       <Eye className="h-3.5 w-3.5" />
// // //                       Ver detalle
// // //                     </Link>
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default async function CobradorClientePage({
// // //   params,
// // //   searchParams,
// // // }: CobradorClientePageProps) {
// // //   const user = await getCurrentUser();

// // //   if (!user) {
// // //     redirect("/login");
// // //   }

// // //   if (user.rol !== "cobrador") {
// // //     redirect(`/${user.rol}`);
// // //   }

// // //   const resumen = await obtenerResumenClienteParaCobrador(params.id);

// // //   if (!resumen) {
// // //     notFound();
// // //   }

// // //   const { cliente, estadoCuenta, totalPendiente } = resumen;
// // //   const tieneDeuda = totalPendiente > 0;

// // //   const dniHabilitante = limpiarDni(searchParams?.dni);
// // //   const vieneDeCircuitoPago =
// // //     searchParams?.modo === "pago" && dniHabilitante === cliente.dni;

// // //   const periodos = estadoCuenta.periodos || [];
// // //   const periodosPendientes = contarPeriodosPendientes(periodos);

// // //   return (
// // //     <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
// // //       <div className="space-y-3 lg:hidden">
// // //         <MobileClienteHero cliente={cliente} tieneDeuda={tieneDeuda} />

// // //         <MobileServicioCard cliente={cliente} />

// // //         <MobileCuentaCard
// // //           cliente={cliente}
// // //           totalPendiente={totalPendiente}
// // //           tieneDeuda={tieneDeuda}
// // //           vieneDeCircuitoPago={vieneDeCircuitoPago}
// // //         />

// // //         <EstadoCuentaListado
// // //           cliente={cliente}
// // //           periodos={periodos}
// // //           destacadoMobile
// // //         />
// // //       </div>

// // //       <div className="hidden lg:block">
// // //         <div className="grid grid-cols-2 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
// // //           <StatCard
// // //             title="Cliente"
// // //             value={`N° ${cliente.numeroCliente}`}
// // //             description="Número interno asignado."
// // //             icon={UserRound}
// // //             tone="cyan"
// // //           />

// // //           <StatCard
// // //             title="Estado"
// // //             value={getEstadoLabel(cliente.estado)}
// // //             description="Estado actual del servicio."
// // //             icon={Wifi}
// // //             tone={
// // //               cliente.estado === "activo"
// // //                 ? "emerald"
// // //                 : cliente.estado === "suspendido"
// // //                   ? "amber"
// // //                   : "red"
// // //             }
// // //           />

// // //           <StatCard
// // //             title="Pendiente"
// // //             value={formatCompactMoney(totalPendiente)}
// // //             description="Total adeudado por el cliente."
// // //             icon={WalletCards}
// // //             tone={tieneDeuda ? "red" : "emerald"}
// // //           />

// // //           <StatCard
// // //             title="Períodos"
// // //             value={String(periodosPendientes)}
// // //             description="Períodos con saldo pendiente."
// // //             icon={ReceiptText}
// // //             tone={periodosPendientes > 0 ? "amber" : "emerald"}
// // //           />
// // //         </div>

// // //         <DashboardGrid>
// // //           <DashboardMain>
// // //             <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-4">
// // //               <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
// // //                 <div className="flex min-w-0 items-start gap-3">
// // //                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
// // //                     <UserRound className="h-5 w-5" />
// // //                   </div>

// // //                   <div className="min-w-0">
// // //                     <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// // //                       Ficha del cliente
// // //                     </p>

// // //                     <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">
// // //                       {cliente.apellido}, {cliente.nombre}
// // //                     </h1>

// // //                     <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
// // //                       DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
// // //                     </p>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex flex-wrap gap-2">
// // //                   <Badge variant={getEstadoBadgeVariant(cliente.estado) as any}>
// // //                     {getEstadoLabel(cliente.estado)}
// // //                   </Badge>

// // //                   {cliente.plan ? (
// // //                     <Badge variant="info">{cliente.plan.nombre}</Badge>
// // //                   ) : (
// // //                     <Badge variant="warning">Sin plan</Badge>
// // //                   )}

// // //                   <Badge variant={tieneDeuda ? "danger" : "success"}>
// // //                     {tieneDeuda ? "Con deuda" : "Sin deuda"}
// // //                   </Badge>
// // //                 </div>
// // //               </div>

// // //               <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
// // //                 <DataTile label="DNI" value={cliente.dni} icon={IdCard} />

// // //                 <DataTile
// // //                   label="Teléfono"
// // //                   value={cliente.telefono}
// // //                   icon={Phone}
// // //                 />

// // //                 <DataTile
// // //                   label="Localidad"
// // //                   value={cliente.localidad}
// // //                   icon={MapPin}
// // //                 />

// // //                 <DataTile
// // //                   label="Plan"
// // //                   value={cliente.plan?.nombre || "Sin plan"}
// // //                   icon={Wifi}
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]">
// // //               <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-4">
// // //                 <SectionHeader
// // //                   icon={Home}
// // //                   eyebrow="Servicio"
// // //                   title="Datos del servicio"
// // //                   description="Ubicación, contacto y plan contratado."
// // //                 />

// // //                 <div className="grid gap-3 lg:grid-cols-2">
// // //                   <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/60">
// // //                     <DataLine label="Dirección" value={cliente.direccion} />
// // //                     <DataLine label="Localidad" value={cliente.localidad} />
// // //                     <DataLine label="Provincia" value={cliente.provincia} />
// // //                     <DataLine label="Teléfono" value={cliente.telefono} />
// // //                   </div>

// // //                   <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/60">
// // //                     <DataLine
// // //                       label="Plan"
// // //                       value={cliente.plan?.nombre || "Sin plan asignado"}
// // //                     />
// // //                     <DataLine label="Tipo" value={cliente.plan?.tipo || "-"} />
// // //                     <DataLine
// // //                       label="Importe"
// // //                       value={
// // //                         cliente.plan ? formatMoney(cliente.plan.importe) : "-"
// // //                       }
// // //                     />
// // //                     <DataLine
// // //                       label="Detalle"
// // //                       value={cliente.plan?.detalle || "-"}
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div className="mt-3 rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs leading-5 text-cyan-900 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200">
// // //                   <div className="flex gap-2">
// // //                     <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

// // //                     <p className="line-clamp-2">
// // //                       {cliente.direccion || "Sin dirección cargada"} ·{" "}
// // //                       {cliente.localidad || "Sin localidad"} ·{" "}
// // //                       {cliente.provincia || "Sin provincia"}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-4">
// // //                 <SectionHeader
// // //                   icon={WalletCards}
// // //                   eyebrow="Cuenta"
// // //                   title="Resumen financiero"
// // //                   description="Saldo actual del cliente."
// // //                 />

// // //                 <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
// // //                   <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
// // //                     Total pendiente
// // //                   </p>

// // //                   <p
// // //                     className={`mt-2 truncate text-4xl font-medium tracking-tight ${
// // //                       tieneDeuda
// // //                         ? "text-red-700 dark:text-red-300"
// // //                         : "text-emerald-700 dark:text-emerald-300"
// // //                     }`}
// // //                   >
// // //                     {formatMoney(totalPendiente)}
// // //                   </p>

// // //                   <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
// // //                     Calculado sobre facturas, pagos, notas de débito y notas de
// // //                     crédito.
// // //                   </p>
// // //                 </div>

// // //                 {vieneDeCircuitoPago ? (
// // //                   <Link
// // //                     href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
// // //                     className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
// // //                   >
// // //                     <CreditCard className="h-3.5 w-3.5" />
// // //                     Registrar pago
// // //                   </Link>
// // //                 ) : (
// // //                   <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
// // //                     <div className="flex gap-2">
// // //                       <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
// // //                       <p>
// // //                         Vista informativa. Para registrar un pago, iniciá desde
// // //                         el panel del cobrador con DNI exacto.
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             <EstadoCuentaListado cliente={cliente} periodos={periodos} movimientos={estadoCuenta.movimientos || []} />
// // //           </DashboardMain>

// // //           <DashboardAside>
// // //             <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
// // //               <div className="mb-3">
// // //                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// // //                   Cuenta
// // //                 </p>

// // //                 <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
// // //                   Resumen rápido
// // //                 </h2>
// // //               </div>

// // //               <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
// // //                 <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
// // //                   <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
// // //                     <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
// // //                     Pendiente
// // //                   </span>

// // //                   <span
// // //                     className={`text-right text-[11px] font-medium ${
// // //                       tieneDeuda
// // //                         ? "text-red-700 dark:text-red-300"
// // //                         : "text-emerald-700 dark:text-emerald-300"
// // //                     }`}
// // //                   >
// // //                     {formatMoney(totalPendiente)}
// // //                   </span>
// // //                 </div>

// // //                 <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
// // //                   <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
// // //                     <ReceiptText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
// // //                     Períodos con deuda
// // //                   </span>

// // //                   <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
// // //                     {periodosPendientes}
// // //                   </span>
// // //                 </div>

// // //                 <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
// // //                   <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
// // //                     <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
// // //                     Plan
// // //                   </span>

// // //                   <span className="truncate text-right text-[11px] font-medium text-slate-950 dark:text-white">
// // //                     {cliente.plan?.nombre || "Sin plan"}
// // //                   </span>
// // //                 </div>

// // //                 <div className="flex items-center justify-between gap-3 px-3 py-2">
// // //                   <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
// // //                     <UserRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
// // //                     Estado
// // //                   </span>

// // //                   <span
// // //                     className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
// // //                       cliente.estado === "activo"
// // //                         ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
// // //                         : cliente.estado === "suspendido"
// // //                           ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
// // //                           : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
// // //                     }`}
// // //                   >
// // //                     {getEstadoLabel(cliente.estado)}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               {vieneDeCircuitoPago ? (
// // //                 <Link
// // //                   href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
// // //                   className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
// // //                 >
// // //                   <CreditCard className="h-3.5 w-3.5" />
// // //                   Registrar pago
// // //                 </Link>
// // //               ) : null}
// // //             </div>

// // //             <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
// // //               <div className="mb-3">
// // //                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// // //                   Cliente
// // //                 </p>

// // //                 <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
// // //                   Datos rápidos
// // //                 </h2>
// // //               </div>

// // //               <div className="grid gap-2">
// // //                 <DataTile label="DNI" value={cliente.dni} icon={IdCard} />
// // //                 <DataTile
// // //                   label="Teléfono"
// // //                   value={cliente.telefono}
// // //                   icon={Phone}
// // //                 />
// // //                 <DataTile
// // //                   label="Localidad"
// // //                   value={cliente.localidad}
// // //                   icon={MapPin}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {!vieneDeCircuitoPago ? (
// // //               <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
// // //                 <div className="flex gap-2">
// // //                   <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

// // //                   <p>
// // //                     Esta ficha es informativa. Para registrar un pago, iniciá el
// // //                     circuito desde el panel del cobrador con DNI exacto.
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             ) : null}

// // //             <Link
// // //               href="/cobrador"
// // //               className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900"
// // //             >
// // //               Volver al panel
// // //               <ArrowRight className="h-3.5 w-3.5" />
// // //             </Link>
// // //           </DashboardAside>
// // //         </DashboardGrid>
// // //       </div>
// // //     </PageShell>
// // //   );
// // // }

// // // // src/app/(dashboard)/cobrador/clientes/[id]/page.tsx

// // // import Link from "next/link";
// // // import { notFound, redirect } from "next/navigation";
// // // import type { ReactNode } from "react";
// // // import {
// // //   AlertTriangle,
// // //   CheckCircle2,
// // //   CreditCard,
// // //   Eye,
// // //   FileText,
// // //   IdCard,
// // //   MapPin,
// // //   Phone,
// // //   ReceiptText,
// // //   UserRound,
// // //   WalletCards,
// // //   Wifi,
// // // } from "lucide-react";
// // // import type { LucideIcon } from "lucide-react";
// // // import { Badge } from "@/components/ui/Badge";
// // // import { PageShell } from "@/components/ui/PageShell";
// // // import {
// // //   DashboardAside,
// // //   DashboardGrid,
// // //   DashboardMain,
// // // } from "@/components/ui/DashboardGrid";
// // // import { CopyDniButton } from "@/components/ui/CopyDniButton";
// // // import { getCurrentUser } from "@/lib/current-user";
// // // import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";

// // // type CobradorClientePageProps = {
// // //   params: {
// // //     id: string;
// // //   };
// // //   searchParams?: {
// // //     modo?: string;
// // //     dni?: string;
// // //   };
// // // };

// // // type StatCardProps = {
// // //   title: string;
// // //   value: string;
// // //   description: string;
// // //   icon: LucideIcon;
// // //   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// // // };

// // // export const metadata = {
// // //   title: "Cliente",
// // // };

// // // const toneClasses = {
// // //   cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
// // //   emerald:
// // //     "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
// // //   amber:
// // //     "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
// // //   red: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
// // //   violet:
// // //     "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
// // // };

// // // function limpiarDni(value?: string) {
// // //   return String(value || "").replace(/\D/g, "").slice(0, 12);
// // // }

// // // function formatMoney(value: number) {
// // //   const amount = Number(value || 0);
// // //   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
// // //   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// // //   return `$ ${formattedInteger},${decimalPart}`;
// // // }

// // // function formatCompactMoney(value: number) {
// // //   const amount = Number(value || 0);
// // //   const abs = Math.abs(amount);
// // //   const sign = amount < 0 ? "-" : "";

// // //   if (abs >= 1_000_000) {
// // //     return `${sign}$ ${(abs / 1_000_000).toLocaleString("es-AR", {
// // //       maximumFractionDigits: 1,
// // //     })} M`;
// // //   }

// // //   const integerPart = Math.round(abs)
// // //     .toString()
// // //     .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// // //   return `${sign}$ ${integerPart}`;
// // // }

// // // function getEstadoBadgeVariant(estado: string) {
// // //   if (estado === "activo") return "success";
// // //   if (estado === "suspendido") return "warning";
// // //   return "danger";
// // // }

// // // function getEstadoLabel(estado: string) {
// // //   if (estado === "activo") return "Activo";
// // //   if (estado === "suspendido") return "Suspendido";
// // //   return "Baja";
// // // }

// // // function getPeriodoBadge(estadoPeriodo: string) {
// // //   if (estadoPeriodo === "cancelado") {
// // //     return {
// // //       label: "Cancelado",
// // //       variant: "success",
// // //     };
// // //   }

// // //   if (estadoPeriodo === "a_favor") {
// // //     return {
// // //       label: "A favor",
// // //       variant: "info",
// // //     };
// // //   }

// // //   return {
// // //     label: "Pendiente",
// // //     variant: "danger",
// // //   };
// // // }

// // // function contarPeriodosPendientes(periodos: any[]) {
// // //   return periodos.filter((periodo) => Number(periodo.saldoPeriodo || 0) > 0)
// // //     .length;
// // // }

// // // function StatCard({
// // //   title,
// // //   value,
// // //   description,
// // //   icon: Icon,
// // //   tone,
// // // }: StatCardProps) {
// // //   return (
// // //     <div className="flex h-full min-h-[88px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none xl:min-h-[96px]">
// // //       <div className="flex min-w-0 items-start gap-3">
// // //         <div
// // //           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}
// // //         >
// // //           <Icon className="h-3.5 w-3.5" />
// // //         </div>

// // //         <div className="min-w-0">
// // //           <p className="truncate text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
// // //             {title}
// // //           </p>

// // //           <p className="mt-1 truncate text-base font-medium leading-none tracking-tight text-slate-950 dark:text-white xl:text-lg">
// // //             {value}
// // //           </p>

// // //           <p className="mt-1 hidden text-[11px] leading-4 text-slate-600 dark:text-slate-400 xl:block">
// // //             {description}
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function InfoPill({
// // //   label,
// // //   value,
// // //   icon: Icon,
// // //   action,
// // // }: {
// // //   label: string;
// // //   value?: string | number | null;
// // //   icon: LucideIcon;
// // //   action?: ReactNode;
// // // }) {
// // //   return (
// // //     <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/60">
// // //       <Icon className="h-5 w-5 shrink-0 text-cyan-700 dark:text-cyan-300" />

// // //       <div className="min-w-0 flex-1">
// // //         <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
// // //           {label}
// // //         </p>

// // //         <div className="mt-1 flex min-w-0 items-center gap-2">
// // //           <p className="min-w-0 truncate text-sm font-medium leading-5 text-slate-950 dark:text-white sm:text-base">
// // //             {value || "-"}
// // //           </p>

// // //           {action ? <div className="shrink-0">{action}</div> : null}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function DataTile({
// // //   label,
// // //   value,
// // //   icon: Icon,
// // // }: {
// // //   label: string;
// // //   value?: string | number | null;
// // //   icon: LucideIcon;
// // // }) {
// // //   return (
// // //     <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
// // //       <div className="flex items-center gap-2">
// // //         <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />

// // //         <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
// // //           {label}
// // //         </p>
// // //       </div>

// // //       <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
// // //         {value || "-"}
// // //       </p>
// // //     </div>
// // //   );
// // // }

// // // function SectionHeader({
// // //   icon: Icon,
// // //   eyebrow,
// // //   title,
// // //   description,
// // // }: {
// // //   icon: LucideIcon;
// // //   eyebrow: string;
// // //   title: string;
// // //   description: string;
// // // }) {
// // //   return (
// // //     <div className="mb-3 flex items-start gap-3">
// // //       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
// // //         <Icon className="h-4 w-4" />
// // //       </div>

// // //       <div className="min-w-0">
// // //         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// // //           {eyebrow}
// // //         </p>

// // //         <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
// // //           {title}
// // //         </h2>

// // //         <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
// // //           {description}
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function ClienteConfirmadoCard({
// // //   cliente,
// // //   tieneDeuda,
// // // }: {
// // //   cliente: any;
// // //   tieneDeuda: boolean;
// // // }) {
// // //   const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;
// // //   const ubicacion = [cliente.localidad, cliente.provincia]
// // //     .filter(Boolean)
// // //     .join(" · ");

// // //   return (
// // //     <div className="overflow-hidden rounded-[1.5rem] border border-slate-300 bg-white shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
// // //       <div className="border-b border-slate-200 bg-emerald-50 px-4 py-4 dark:border-slate-800 dark:bg-emerald-950/20 sm:px-5">
// // //         <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
// // //           <div className="flex min-w-0 items-start gap-3">
// // //             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900/70">
// // //               <UserRound className="h-5 w-5" />
// // //             </div>

// // //             <div className="min-w-0">
// // //               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
// // //                 Cliente confirmado
// // //               </p>

// // //               <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">
// // //                 {nombreCompleto}
// // //               </h1>

// // //               <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
// // //                 Cliente validado. Revisá deuda, períodos y continuá con el pago.
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="flex flex-wrap gap-2">
// // //             <div className="flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-900/70 dark:bg-slate-900 dark:text-emerald-300">
// // //               <CheckCircle2 className="h-3.5 w-3.5" />
// // //               Validado
// // //             </div>

// // //             <Badge variant={getEstadoBadgeVariant(cliente.estado) as any}>
// // //               {getEstadoLabel(cliente.estado)}
// // //             </Badge>

// // //             <Badge variant={tieneDeuda ? "danger" : "success"}>
// // //               {tieneDeuda ? "Con deuda" : "Sin deuda"}
// // //             </Badge>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="p-4 sm:p-5">
// // //         <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
// // //           <InfoPill
// // //             label="DNI"
// // //             value={cliente.dni}
// // //             icon={IdCard}
// // //             action={
// // //               <CopyDniButton
// // //                 dni={cliente.dni}
// // //                 iconOnly
// // //                 className="rounded-xl"
// // //               />
// // //             }
// // //           />

// // //           <InfoPill
// // //             label="Cliente N°"
// // //             value={cliente.numeroCliente}
// // //             icon={CreditCard}
// // //           />

// // //           <InfoPill
// // //             label="Localidad"
// // //             value={cliente.localidad || "-"}
// // //             icon={MapPin}
// // //           />

// // //           <InfoPill
// // //             label="Teléfono"
// // //             value={cliente.telefono || "-"}
// // //             icon={Phone}
// // //           />
// // //         </div>

// // //         <div className="mt-3 rounded-3xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
// // //           <div className="flex items-start gap-3">
// // //             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-cyan-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-cyan-300 dark:ring-slate-800">
// // //               <MapPin className="h-4 w-4" />
// // //             </div>

// // //             <div className="min-w-0">
// // //               <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
// // //                 Dirección del servicio
// // //               </p>

// // //               <p className="mt-1 text-sm leading-6 text-slate-950 dark:text-white">
// // //                 {cliente.direccion || "Sin dirección cargada"}
// // //               </p>

// // //               <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
// // //                 {ubicacion || "Sin localidad cargada"}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function CuentaPagoCard({
// // //   cliente,
// // //   totalPendiente,
// // //   tieneDeuda,
// // //   vieneDeCircuitoPago,
// // // }: {
// // //   cliente: any;
// // //   totalPendiente: number;
// // //   tieneDeuda: boolean;
// // //   vieneDeCircuitoPago: boolean;
// // // }) {
// // //   return (
// // //     <div className="overflow-hidden rounded-[1.5rem] border border-slate-300 bg-white shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
// // //       <div className="border-b border-slate-200 bg-cyan-50 px-4 py-4 dark:border-slate-800 dark:bg-cyan-950/20 sm:px-5">
// // //         <div className="flex min-w-0 items-start gap-3">
// // //           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900/70">
// // //             <WalletCards className="h-5 w-5" />
// // //           </div>

// // //           <div className="min-w-0">
// // //             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// // //               Deuda y pago
// // //             </p>

// // //             <h2 className="mt-1 text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">
// // //               Cuenta del cliente
// // //             </h2>

// // //             <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
// // //               Revisá el saldo pendiente y continuá al registro del pago.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="p-4 sm:p-5">
// // //         <div className="grid grid-cols-2 gap-2">
// // //           <div
// // //             className={`rounded-2xl border px-3 py-3 ${
// // //               tieneDeuda
// // //                 ? "border-red-200 bg-red-50 dark:border-red-900/70 dark:bg-red-950/30"
// // //                 : "border-emerald-200 bg-emerald-50 dark:border-emerald-900/70 dark:bg-emerald-950/30"
// // //             }`}
// // //           >
// // //             <p
// // //               className={`text-[9px] font-medium uppercase tracking-[0.13em] ${
// // //                 tieneDeuda
// // //                   ? "text-red-700 dark:text-red-300"
// // //                   : "text-emerald-700 dark:text-emerald-300"
// // //               }`}
// // //             >
// // //               Total pendiente
// // //             </p>

// // //             <p
// // //               className={`mt-1 truncate text-base font-medium leading-5 sm:text-lg ${
// // //                 tieneDeuda
// // //                   ? "text-red-700 dark:text-red-300"
// // //                   : "text-emerald-700 dark:text-emerald-300"
// // //               }`}
// // //             >
// // //               {formatMoney(totalPendiente)}
// // //             </p>
// // //           </div>

// // //           <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/60">
// // //             <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
// // //               Estado
// // //             </p>

// // //             <p
// // //               className={`mt-1 truncate text-base font-medium leading-5 sm:text-lg ${
// // //                 tieneDeuda
// // //                   ? "text-red-700 dark:text-red-300"
// // //                   : "text-emerald-700 dark:text-emerald-300"
// // //               }`}
// // //             >
// // //               {tieneDeuda ? "Con deuda" : "Sin deuda"}
// // //             </p>
// // //           </div>
// // //         </div>

// // //         <div className="mt-3 rounded-3xl border border-slate-200 bg-slate-50 p-3.5 text-xs leading-5 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
// // //           El pago se registra en la siguiente pantalla, donde se selecciona el
// // //           período pendiente y se carga el importe recibido.
// // //         </div>

// // //         {vieneDeCircuitoPago ? (
// // //           <Link
// // //             href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
// // //             className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-cyan-500 bg-gradient-to-r from-cyan-600 to-sky-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20 transition hover:from-cyan-700 hover:to-sky-700 active:scale-[0.99] dark:border-cyan-300/70 dark:from-cyan-400 dark:to-sky-400 dark:text-slate-950 dark:shadow-cyan-500/20 dark:hover:from-cyan-300 dark:hover:to-sky-300"
// // //           >
// // //             Registrar pago
// // //           </Link>
// // //         ) : (
// // //           <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
// // //             <div className="flex gap-2">
// // //               <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

// // //               <p>
// // //                 Vista informativa. Para registrar un pago, iniciá desde el panel
// // //                 del cobrador con DNI exacto.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function EstadoCuentaListado({
// // //   cliente,
// // //   periodos,
// // //   destacadoMobile = false,
// // // }: {
// // //   cliente: any;
// // //   periodos: any[];
// // //   destacadoMobile?: boolean;
// // // }) {
// // //   return (
// // //     <div
// // //       className={
// // //         destacadoMobile
// // //           ? "rounded-[1.45rem] border-2 border-cyan-300 bg-cyan-50/70 p-3 shadow-sm dark:border-cyan-900/80 dark:bg-cyan-950/20"
// // //           : "rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-4"
// // //       }
// // //     >
// // //       <SectionHeader
// // //         icon={FileText}
// // //         eyebrow="Estado de cuenta"
// // //         title="Períodos del cliente"
// // //         description="Listado resumido por período con acceso al detalle."
// // //       />

// // //       {periodos.length === 0 ? (
// // //         <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
// // //           Este cliente todavía no tiene períodos facturados.
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <div className="grid gap-3 md:hidden">
// // //             {periodos.map((periodo) => {
// // //               const badge = getPeriodoBadge(periodo.estadoPeriodo);
// // //               const periodoConSaldo = periodo.saldoPeriodo > 0;

// // //               return (
// // //                 <div
// // //                   key={periodo.facturaId}
// // //                   className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
// // //                 >
// // //                   <div className="flex items-start justify-between gap-3">
// // //                     <div className="min-w-0">
// // //                       <div className="flex flex-wrap items-center gap-2">
// // //                         <p className="truncate text-base font-medium text-slate-950 dark:text-white">
// // //                           {periodo.periodoLabel}
// // //                         </p>

// // //                         <Badge variant={badge.variant as any}>
// // //                           {badge.label}
// // //                         </Badge>
// // //                       </div>

// // //                       <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
// // //                         Factura N° {periodo.numeroComprobante}
// // //                       </p>
// // //                     </div>

// // //                     <div
// // //                       className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${
// // //                         periodoConSaldo
// // //                           ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
// // //                           : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
// // //                       }`}
// // //                     >
// // //                       {periodoConSaldo ? "Debe" : "OK"}
// // //                     </div>
// // //                   </div>

// // //                   <div className="mt-3 grid grid-cols-2 gap-2">
// // //                     <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
// // //                       <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
// // //                         Original
// // //                       </p>

// // //                       <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
// // //                         {formatMoney(periodo.importeOriginal)}
// // //                       </p>
// // //                     </div>

// // //                     <div
// // //                       className={`rounded-2xl border px-3 py-2 ${
// // //                         periodoConSaldo
// // //                           ? "border-red-200 bg-red-50 dark:border-red-900/70 dark:bg-red-950/30"
// // //                           : "border-emerald-200 bg-emerald-50 dark:border-emerald-900/70 dark:bg-emerald-950/30"
// // //                       }`}
// // //                     >
// // //                       <p
// // //                         className={`text-[9px] font-medium uppercase tracking-[0.14em] ${
// // //                           periodoConSaldo
// // //                             ? "text-red-700 dark:text-red-300"
// // //                             : "text-emerald-700 dark:text-emerald-300"
// // //                         }`}
// // //                       >
// // //                         Saldo
// // //                       </p>

// // //                       <p
// // //                         className={`mt-1 truncate text-sm font-medium ${
// // //                           periodoConSaldo
// // //                             ? "text-red-700 dark:text-red-300"
// // //                             : "text-emerald-700 dark:text-emerald-300"
// // //                         }`}
// // //                       >
// // //                         {formatMoney(periodo.saldoPeriodo)}
// // //                       </p>
// // //                     </div>
// // //                   </div>

// // //                   <Link
// // //                     href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
// // //                     className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-medium text-slate-800 transition hover:bg-cyan-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
// // //                   >
// // //                     <Eye className="h-3.5 w-3.5" />
// // //                     Ver detalle
// // //                   </Link>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>

// // //           <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/50 md:block">
// // //             <div className="grid grid-cols-[minmax(170px,1fr)_120px_120px_110px] border-b border-slate-200 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
// // //               <span>Período</span>
// // //               <span className="text-right">Factura</span>
// // //               <span className="text-right">Saldo</span>
// // //               <span className="text-right">Acción</span>
// // //             </div>

// // //             {periodos.map((periodo) => {
// // //               const badge = getPeriodoBadge(periodo.estadoPeriodo);
// // //               const periodoConSaldo = periodo.saldoPeriodo > 0;

// // //               return (
// // //                 <div
// // //                   key={periodo.facturaId}
// // //                   className="grid grid-cols-[minmax(170px,1fr)_120px_120px_110px] items-center gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800"
// // //                 >
// // //                   <div className="min-w-0">
// // //                     <div className="flex flex-wrap items-center gap-2">
// // //                       <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
// // //                         {periodo.periodoLabel}
// // //                       </p>

// // //                       <Badge variant={badge.variant as any}>
// // //                         {badge.label}
// // //                       </Badge>
// // //                     </div>

// // //                     <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
// // //                       Original {formatMoney(periodo.importeOriginal)}
// // //                     </p>
// // //                   </div>

// // //                   <p className="text-right text-xs font-medium text-slate-700 dark:text-slate-300">
// // //                     N° {periodo.numeroComprobante}
// // //                   </p>

// // //                   <p
// // //                     className={`text-right text-sm font-medium ${
// // //                       periodoConSaldo
// // //                         ? "text-red-700 dark:text-red-300"
// // //                         : "text-emerald-700 dark:text-emerald-300"
// // //                     }`}
// // //                   >
// // //                     {formatMoney(periodo.saldoPeriodo)}
// // //                   </p>

// // //                   <div className="text-right">
// // //                     <Link
// // //                       href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
// // //                       className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-medium text-slate-800 transition hover:bg-cyan-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
// // //                     >
// // //                       <Eye className="h-3.5 w-3.5" />
// // //                       Ver detalle
// // //                     </Link>
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default async function CobradorClientePage({
// // //   params,
// // //   searchParams,
// // // }: CobradorClientePageProps) {
// // //   const user = await getCurrentUser();

// // //   if (!user) {
// // //     redirect("/login");
// // //   }

// // //   if (user.rol !== "cobrador") {
// // //     redirect(`/${user.rol}`);
// // //   }

// // //   const resumen = await obtenerResumenClienteParaCobrador(params.id);

// // //   if (!resumen) {
// // //     notFound();
// // //   }

// // //   const { cliente, estadoCuenta, totalPendiente } = resumen;
// // //   const tieneDeuda = totalPendiente > 0;

// // //   const dniHabilitante = limpiarDni(searchParams?.dni);
// // //   const vieneDeCircuitoPago =
// // //     searchParams?.modo === "pago" && dniHabilitante === cliente.dni;

// // //   const periodos = estadoCuenta.periodos || [];
// // //   const periodosPendientes = contarPeriodosPendientes(periodos);

// // //   return (
// // //     <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
// // //       <div className="space-y-3 lg:hidden">
// // //         <ClienteConfirmadoCard cliente={cliente} tieneDeuda={tieneDeuda} />

// // //         <CuentaPagoCard
// // //           cliente={cliente}
// // //           totalPendiente={totalPendiente}
// // //           tieneDeuda={tieneDeuda}
// // //           vieneDeCircuitoPago={vieneDeCircuitoPago}
// // //         />

// // //         <EstadoCuentaListado
// // //           cliente={cliente}
// // //           periodos={periodos}
// // //           destacadoMobile
// // //         />
// // //       </div>

// // //       <div className="hidden lg:block">
// // //         <div className="grid grid-cols-2 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
// // //           <StatCard
// // //             title="Cliente"
// // //             value={`N° ${cliente.numeroCliente}`}
// // //             description="Número interno asignado."
// // //             icon={UserRound}
// // //             tone="cyan"
// // //           />

// // //           <StatCard
// // //             title="Estado"
// // //             value={getEstadoLabel(cliente.estado)}
// // //             description="Estado actual del cliente."
// // //             icon={Wifi}
// // //             tone={
// // //               cliente.estado === "activo"
// // //                 ? "emerald"
// // //                 : cliente.estado === "suspendido"
// // //                   ? "amber"
// // //                   : "red"
// // //             }
// // //           />

// // //           <StatCard
// // //             title="Pendiente"
// // //             value={formatCompactMoney(totalPendiente)}
// // //             description="Total adeudado por el cliente."
// // //             icon={WalletCards}
// // //             tone={tieneDeuda ? "red" : "emerald"}
// // //           />

// // //           <StatCard
// // //             title="Períodos"
// // //             value={String(periodosPendientes)}
// // //             description="Períodos con saldo pendiente."
// // //             icon={ReceiptText}
// // //             tone={periodosPendientes > 0 ? "amber" : "emerald"}
// // //           />
// // //         </div>

// // //         <DashboardGrid>
// // //           <DashboardMain>
// // //             <ClienteConfirmadoCard cliente={cliente} tieneDeuda={tieneDeuda} />

// // //             <CuentaPagoCard
// // //               cliente={cliente}
// // //               totalPendiente={totalPendiente}
// // //               tieneDeuda={tieneDeuda}
// // //               vieneDeCircuitoPago={vieneDeCircuitoPago}
// // //             />

// // //             <EstadoCuentaListado cliente={cliente} periodos={periodos} movimientos={estadoCuenta.movimientos || []} />
// // //           </DashboardMain>

// // //           <DashboardAside>
// // //             <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
// // //               <div className="mb-3">
// // //                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// // //                   Cuenta
// // //                 </p>

// // //                 <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
// // //                   Resumen rápido
// // //                 </h2>
// // //               </div>

// // //               <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
// // //                 <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
// // //                   <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
// // //                     <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
// // //                     Pendiente
// // //                   </span>

// // //                   <span
// // //                     className={`text-right text-[11px] font-medium ${
// // //                       tieneDeuda
// // //                         ? "text-red-700 dark:text-red-300"
// // //                         : "text-emerald-700 dark:text-emerald-300"
// // //                     }`}
// // //                   >
// // //                     {formatMoney(totalPendiente)}
// // //                   </span>
// // //                 </div>

// // //                 <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
// // //                   <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
// // //                     <ReceiptText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
// // //                     Períodos con deuda
// // //                   </span>

// // //                   <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
// // //                     {periodosPendientes}
// // //                   </span>
// // //                 </div>

// // //                 <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
// // //                   <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
// // //                     <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
// // //                     Plan
// // //                   </span>

// // //                   <span className="truncate text-right text-[11px] font-medium text-slate-950 dark:text-white">
// // //                     {cliente.plan?.nombre || "Sin plan"}
// // //                   </span>
// // //                 </div>

// // //                 <div className="flex items-center justify-between gap-3 px-3 py-2">
// // //                   <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
// // //                     <UserRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
// // //                     Estado
// // //                   </span>

// // //                   <span
// // //                     className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
// // //                       cliente.estado === "activo"
// // //                         ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
// // //                         : cliente.estado === "suspendido"
// // //                           ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
// // //                           : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
// // //                     }`}
// // //                   >
// // //                     {getEstadoLabel(cliente.estado)}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               {vieneDeCircuitoPago ? (
// // //                 <Link
// // //                   href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
// // //                   className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-cyan-500 bg-gradient-to-r from-cyan-600 to-sky-600 px-4 text-xs font-semibold text-white shadow-lg shadow-cyan-900/20 transition hover:from-cyan-700 hover:to-sky-700 active:scale-[0.99] dark:border-cyan-300/70 dark:from-cyan-400 dark:to-sky-400 dark:text-slate-950 dark:shadow-cyan-500/20 dark:hover:from-cyan-300 dark:hover:to-sky-300"
// // //                 >
// // //                   Registrar pago
// // //                 </Link>
// // //               ) : null}
// // //             </div>

// // //             <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
// // //               <div className="mb-3">
// // //                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// // //                   Cliente
// // //                 </p>

// // //                 <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
// // //                   Datos rápidos
// // //                 </h2>
// // //               </div>

// // //               <div className="grid gap-2">
// // //                 <DataTile label="DNI" value={cliente.dni} icon={IdCard} />
// // //                 <DataTile
// // //                   label="Teléfono"
// // //                   value={cliente.telefono}
// // //                   icon={Phone}
// // //                 />
// // //                 <DataTile
// // //                   label="Localidad"
// // //                   value={cliente.localidad}
// // //                   icon={MapPin}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {!vieneDeCircuitoPago ? (
// // //               <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
// // //                 <div className="flex gap-2">
// // //                   <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

// // //                   <p>
// // //                     Esta ficha es informativa. Para registrar un pago, iniciá el
// // //                     circuito desde el panel del cobrador con DNI exacto.
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             ) : null}

// // //             <Link
// // //               href="/cobrador"
// // //               className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900"
// // //             >
// // //               Volver al panel
// // //             </Link>
// // //           </DashboardAside>
// // //         </DashboardGrid>
// // //       </div>
// // //     </PageShell>
// // //   );
// // // }

// // // src/app/(dashboard)/cobrador/clientes/[id]/page.tsx

// // import Link from "next/link";
// // import { notFound, redirect } from "next/navigation";
// // import type { ReactNode } from "react";
// // import type { LucideIcon } from "lucide-react";
// // import {
// //   AlertTriangle,
// //   ArrowLeft,
// //   CheckCircle2,
// //   CreditCard,
// //   Eye,
// //   FileText,
// //   IdCard,
// //   MapPin,
// //   Phone,
// //   ReceiptText,
// //   ShieldCheck,
// //   UserRound,
// //   WalletCards,
// //   Wifi,
// // } from "lucide-react";
// // import { PageShell } from "@/components/ui/PageShell";
// // import {
// //   DashboardAside,
// //   DashboardGrid,
// //   DashboardMain,
// // } from "@/components/ui/DashboardGrid";
// // import { CopyDniButton } from "@/components/ui/CopyDniButton";
// // import { getCurrentUser } from "@/lib/current-user";
// // import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";

// // export const metadata = {
// //   title: "Cliente",
// // };

// // type CobradorClientePageProps = {
// //   params: {
// //     id: string;
// //   };
// //   searchParams?: {
// //     modo?: string;
// //     dni?: string;
// //   };
// // };

// // type InfoTileProps = {
// //   label: string;
// //   value?: string | number | null;
// //   icon: LucideIcon;
// //   highlight?: boolean;
// //   action?: ReactNode;
// // };

// // const panelClass =
// //   "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

// // const innerPanelClass =
// //   "rounded-lg border border-slate-300 bg-slate-50 shadow-sm shadow-slate-300/35 dark:border-slate-700 dark:bg-slate-950/45 dark:shadow-none";

// // const mobileScreenClass =
// //   "rounded-[1.55rem] border border-blue-200 bg-gradient-to-b from-blue-50 via-slate-50 to-white p-2.5 shadow-xl shadow-blue-950/10 ring-1 ring-white/80 dark:border-blue-500/70 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 dark:shadow-black/35 dark:ring-blue-800/50";

// // const mobileModuleClass =
// //   "rounded-[1.18rem] border border-blue-200 bg-white/96 p-3.5 shadow-lg shadow-blue-950/10 ring-1 ring-white/80 backdrop-blur dark:border-blue-500/45 dark:bg-slate-950/72 dark:shadow-black/25 dark:ring-blue-950/60";

// // const sectionTitleClass =
// //   "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

// // const sectionSubtitleClass =
// //   "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

// // const sectionDescriptionClass =
// //   "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

// // const primaryButtonClass =
// //   "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-3 text-[13px] font-medium leading-none text-white shadow-sm shadow-blue-950/10 transition hover:border-blue-700 hover:bg-blue-700 active:scale-[0.99] dark:border-blue-500 dark:bg-blue-500 dark:hover:border-blue-600 dark:hover:bg-blue-600 sm:h-10 sm:w-auto";

// // const walletPrimaryButtonClass =
// //   "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-500 bg-gradient-to-r from-blue-600 via-blue-600 to-violet-600 px-3 text-[13px] font-semibold leading-none text-white shadow-md shadow-blue-950/15 transition hover:from-blue-700 hover:via-blue-700 hover:to-violet-700 active:scale-[0.99] dark:border-blue-400/70 dark:from-blue-500 dark:via-blue-600 dark:to-violet-600 dark:shadow-blue-950/20";

// // function limpiarDni(value?: string) {
// //   return String(value || "").replace(/\D/g, "").slice(0, 12);
// // }

// // function formatMoney(value: number) {
// //   const amount = Number(value || 0);
// //   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
// //   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// //   return `$ ${formattedInteger},${decimalPart}`;
// // }

// // function getEstadoLabel(estado: string) {
// //   if (estado === "activo") return "Activo";
// //   if (estado === "suspendido") return "Suspendido";
// //   return "Baja";
// // }

// // function getPeriodoBadge(estadoPeriodo: string) {
// //   if (estadoPeriodo === "cancelado") {
// //     return {
// //       label: "Cancelado",
// //       className:
// //         "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300",
// //     };
// //   }

// //   if (estadoPeriodo === "a_favor") {
// //     return {
// //       label: "A favor",
// //       className:
// //         "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-300",
// //     };
// //   }

// //   return {
// //     label: "Pendiente",
// //     className:
// //       "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300",
// //   };
// // }

// // function contarPeriodosPendientes(periodos: any[]) {
// //   return periodos.filter((periodo) => Number(periodo.saldoPeriodo || 0) > 0)
// //     .length;
// // }

// // function HeaderClienteCobrador({
// //   vieneDeCircuitoPago,
// // }: {
// //   vieneDeCircuitoPago: boolean;
// // }) {
// //   return (
// //     <section className={`${panelClass} hidden p-3.5 sm:block`}>
// //       <div className="flex items-start justify-between gap-4">
// //         <div className="flex min-w-0 items-start gap-3">
// //           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
// //             <ShieldCheck className="h-4 w-4" />
// //           </div>

// //           <div className="min-w-0">
// //             <p className={sectionTitleClass}>
// //               {vieneDeCircuitoPago ? "Circuito de cobro" : "Consulta cliente"}
// //             </p>

// //             <h1 className={sectionSubtitleClass}>Ficha del cliente</h1>

// //             <p className={`${sectionDescriptionClass} max-w-3xl`}>
// //               {vieneDeCircuitoPago
// //                 ? "Revisá la deuda, los períodos pendientes y continuá con el registro del pago."
// //                 : "Vista de consulta. Para registrar un pago, iniciá el circuito desde el panel con DNI exacto."}
// //             </p>
// //           </div>
// //         </div>

// //         <Link
// //           href="/cobrador"
// //           className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900"
// //         >
// //           <ArrowLeft className="h-3.5 w-3.5" />
// //           Volver
// //         </Link>
// //       </div>
// //     </section>
// //   );
// // }

// // function InfoTile({
// //   label,
// //   value,
// //   icon: Icon,
// //   highlight = false,
// //   action,
// // }: InfoTileProps) {
// //   return (
// //     <div
// //       className={`flex min-w-0 items-center gap-2.5 rounded-lg border px-3 py-2.5 shadow-sm ${
// //         highlight
// //           ? "border-blue-300 bg-blue-50/70 text-blue-800 shadow-blue-950/5 dark:border-blue-500/45 dark:bg-blue-950/30 dark:text-blue-100"
// //           : "border-slate-300 bg-white text-slate-950 shadow-slate-300/25 dark:border-slate-700 dark:bg-slate-950/45 dark:text-white dark:shadow-none"
// //       }`}
// //     >
// //       <div
// //         className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
// //           highlight
// //             ? "border-blue-300 bg-white text-blue-700 dark:border-blue-500/45 dark:bg-blue-950/45 dark:text-blue-200"
// //             : "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
// //         }`}
// //       >
// //         <Icon className="h-3.5 w-3.5" />
// //       </div>

// //       <div className="min-w-0 flex-1">
// //         <p
// //           className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
// //             highlight
// //               ? "text-blue-700 dark:text-blue-200"
// //               : "text-slate-500 dark:text-slate-400"
// //           }`}
// //         >
// //           {label}
// //         </p>

// //         <div className="mt-0.5 flex min-w-0 items-center gap-2">
// //           <p className="min-w-0 truncate text-sm font-semibold leading-5 text-slate-950 dark:text-white">
// //             {value || "-"}
// //           </p>

// //           {action ? <div className="shrink-0">{action}</div> : null}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function ClienteHeroMobile({
// //   cliente,
// //   tieneDeuda,
// //   vieneDeCircuitoPago,
// // }: {
// //   cliente: any;
// //   tieneDeuda: boolean;
// //   vieneDeCircuitoPago: boolean;
// // }) {
// //   const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;

// //   return (
// //     <section className="relative overflow-hidden rounded-[1.25rem] border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-600 to-violet-600 p-3.5 text-white shadow-md shadow-blue-950/15 ring-1 ring-blue-200/70 dark:border-blue-500/45 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 dark:shadow-black/20 dark:ring-white/10">
// //       <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/18 blur-2xl dark:bg-blue-300/20" />
// //       <div className="pointer-events-none absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-white/12 blur-3xl dark:bg-violet-400/16" />

// //       <div className="relative">
// //         <div className="flex items-start justify-between gap-3">
// //           <div className="min-w-0">
// //             <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
// //               {vieneDeCircuitoPago ? "Cliente validado" : "Ficha del cliente"}
// //             </p>

// //             <h1 className="mt-1 line-clamp-2 text-[22px] font-semibold leading-7 tracking-tight text-white">
// //               {nombreCompleto}
// //             </h1>

// //             <p className="mt-2 text-[12px] leading-5 text-white/78">
// //               DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
// //             </p>
// //           </div>

// //           <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full border border-white/35 bg-white/18 px-2 text-[10px] font-semibold leading-none text-white shadow-sm">
// //             <CheckCircle2 className="h-3.5 w-3.5" />
// //             {vieneDeCircuitoPago ? "Validado" : getEstadoLabel(cliente.estado)}
// //           </span>
// //         </div>

// //         <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-white/22 bg-white/14 p-2.5 shadow-sm shadow-blue-950/5 backdrop-blur dark:border-white/15 dark:bg-white/[0.08] dark:shadow-black/5">
// //           <div>
// //             <p className="truncate text-[9px] font-semibold uppercase tracking-[0.08em] text-white/68">
// //               Estado
// //             </p>

// //             <p className="mt-1 truncate text-[14px] font-semibold text-white">
// //               {tieneDeuda ? "Con deuda" : "Sin deuda"}
// //             </p>
// //           </div>

// //           <div className="border-l border-white/20 pl-2 text-right dark:border-white/15">
// //             <p className="truncate text-[9px] font-semibold uppercase tracking-[0.08em] text-white/68">
// //               Plan
// //             </p>

// //             <p className="mt-1 truncate text-[14px] font-semibold text-white">
// //               {cliente.plan?.nombre || "Sin plan"}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // function CuentaMobileCard({
// //   cliente,
// //   totalPendiente,
// //   tieneDeuda,
// //   periodosPendientes,
// //   vieneDeCircuitoPago,
// // }: {
// //   cliente: any;
// //   totalPendiente: number;
// //   tieneDeuda: boolean;
// //   periodosPendientes: number;
// //   vieneDeCircuitoPago: boolean;
// // }) {
// //   return (
// //     <section className={`${mobileModuleClass} mt-2.5`}>
// //       <div className="mb-3 flex items-start justify-between gap-3">
// //         <div className="min-w-0">
// //           <p className={sectionTitleClass}>Cuenta del cliente</p>

// //           <h2 className={sectionSubtitleClass}>Total pendiente</h2>

// //           <p className={sectionDescriptionClass}>
// //             Saldo disponible para registrar el pago.
// //           </p>
// //         </div>

// //         <div
// //           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
// //             tieneDeuda
// //               ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
// //               : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
// //           }`}
// //         >
// //           <WalletCards className="h-4 w-4" />
// //         </div>
// //       </div>

// //       <div
// //         className={`rounded-xl border p-3 ${
// //           tieneDeuda
// //             ? "border-red-200 bg-red-50/80 dark:border-red-900/70 dark:bg-red-950/24"
// //             : "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/70 dark:bg-emerald-950/24"
// //         }`}
// //       >
// //         <p
// //           className={`text-[34px] font-semibold leading-none tracking-tight ${
// //             tieneDeuda
// //               ? "text-red-700 dark:text-red-300"
// //               : "text-emerald-700 dark:text-emerald-300"
// //           }`}
// //         >
// //           {formatMoney(totalPendiente)}
// //         </p>

// //         <p className="mt-2 text-[12px] leading-5 text-slate-600 dark:text-blue-100/78">
// //           {periodosPendientes} período/s con saldo pendiente.
// //         </p>
// //       </div>

// //       {vieneDeCircuitoPago ? (
// //         <Link
// //           href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
// //           className={`${walletPrimaryButtonClass} mt-3`}
// //           style={{ color: "#ffffff" }}
// //         >
// //           <CreditCard className="h-4 w-4" style={{ color: "#ffffff" }} />

// //           <span
// //             className="text-[13px] font-semibold leading-none"
// //             style={{ color: "#ffffff" }}
// //           >
// //             Registrar pago
// //           </span>
// //         </Link>
// //       ) : (
// //         <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
// //           <div className="flex gap-2">
// //             <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

// //             <p>
// //               Vista informativa. Para registrar un pago, iniciá desde el panel
// //               con DNI exacto.
// //             </p>
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // }

// // function ClienteResumenDesktop({
// //   cliente,
// //   tieneDeuda,
// //   vieneDeCircuitoPago,
// // }: {
// //   cliente: any;
// //   tieneDeuda: boolean;
// //   vieneDeCircuitoPago: boolean;
// // }) {
// //   const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;
// //   const ubicacion = [cliente.localidad, cliente.provincia]
// //     .filter(Boolean)
// //     .join(" · ");

// //   return (
// //     <section className={`${panelClass} p-3.5`}>
// //       <div className="mb-3 flex items-start justify-between gap-3">
// //         <div className="flex min-w-0 items-start gap-3">
// //           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
// //             <UserRound className="h-4 w-4" />
// //           </div>

// //           <div className="min-w-0">
// //             <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
// //               {vieneDeCircuitoPago ? "Cliente validado" : "Consulta"}
// //             </p>

// //             <h2 className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
// //               {nombreCompleto}
// //             </h2>

// //             <p className="mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
// //               DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
// //             </p>
// //           </div>
// //         </div>

// //         <div className="flex shrink-0 flex-wrap justify-end gap-2">
// //           <span className="inline-flex h-6 items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 text-[10px] font-semibold leading-none text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
// //             <CheckCircle2 className="h-3.5 w-3.5" />
// //             {getEstadoLabel(cliente.estado)}
// //           </span>

// //           <span
// //             className={`inline-flex h-6 items-center rounded-full border px-2 text-[10px] font-semibold leading-none ${
// //               tieneDeuda
// //                 ? "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
// //                 : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
// //             }`}
// //           >
// //             {tieneDeuda ? "Con deuda" : "Sin deuda"}
// //           </span>
// //         </div>
// //       </div>

// //       <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
// //         <InfoTile
// //           label="DNI"
// //           value={cliente.dni}
// //           icon={IdCard}
// //           highlight
// //           action={<CopyDniButton dni={cliente.dni} />}
// //         />

// //         <InfoTile
// //           label="Cliente N°"
// //           value={cliente.numeroCliente}
// //           icon={CreditCard}
// //           highlight
// //         />

// //         <InfoTile
// //           label="Localidad"
// //           value={cliente.localidad || "-"}
// //           icon={MapPin}
// //         />

// //         <InfoTile
// //           label="Teléfono"
// //           value={cliente.telefono || "-"}
// //           icon={Phone}
// //         />
// //       </div>

// //       <div className={`${innerPanelClass} mt-3 p-3`}>
// //         <div className="flex items-start gap-3">
// //           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
// //             <MapPin className="h-4 w-4" />
// //           </div>

// //           <div className="min-w-0">
// //             <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
// //               Dirección del servicio
// //             </p>

// //             <p className="mt-1 text-sm leading-6 text-slate-950 dark:text-white">
// //               {cliente.direccion || "Sin dirección cargada"}
// //             </p>

// //             <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
// //               {ubicacion || "Sin localidad cargada"}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // function CuentaDesktopCard({
// //   cliente,
// //   totalPendiente,
// //   tieneDeuda,
// //   periodosPendientes,
// //   vieneDeCircuitoPago,
// // }: {
// //   cliente: any;
// //   totalPendiente: number;
// //   tieneDeuda: boolean;
// //   periodosPendientes: number;
// //   vieneDeCircuitoPago: boolean;
// // }) {
// //   return (
// //     <section className={`${panelClass} p-3.5`}>
// //       <div className="mb-3 flex items-start justify-between gap-3">
// //         <div className="flex min-w-0 items-start gap-3">
// //           <div
// //             className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
// //               tieneDeuda
// //                 ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
// //                 : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
// //             }`}
// //           >
// //             <WalletCards className="h-4 w-4" />
// //           </div>

// //           <div className="min-w-0">
// //             <p className={sectionTitleClass}>Cuenta del cliente</p>

// //             <h2 className={sectionSubtitleClass}>Resumen financiero</h2>

// //             <p className={sectionDescriptionClass}>
// //               Saldo pendiente y períodos disponibles para consultar.
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.5fr)]">
// //         <div
// //           className={`rounded-lg border p-3 ${
// //             tieneDeuda
// //               ? "border-red-200 bg-red-50/70 dark:border-red-900/70 dark:bg-red-950/24"
// //               : "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/70 dark:bg-emerald-950/24"
// //           }`}
// //         >
// //           <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
// //             Total pendiente
// //           </p>

// //           <p
// //             className={`mt-2 text-4xl font-semibold leading-none tracking-tight ${
// //               tieneDeuda
// //                 ? "text-red-700 dark:text-red-300"
// //                 : "text-emerald-700 dark:text-emerald-300"
// //             }`}
// //           >
// //             {formatMoney(totalPendiente)}
// //           </p>

// //           <p className="mt-2 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
// //             {periodosPendientes} período/s con saldo pendiente.
// //           </p>
// //         </div>

// //         <div className={`${innerPanelClass} p-3`}>
// //           <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2 dark:border-slate-700">
// //             <span className="text-[12px] text-slate-600 dark:text-slate-400">
// //               Estado
// //             </span>

// //             <span
// //               className={`text-[12px] font-semibold ${
// //                 tieneDeuda
// //                   ? "text-red-700 dark:text-red-300"
// //                   : "text-emerald-700 dark:text-emerald-300"
// //               }`}
// //             >
// //               {tieneDeuda ? "Con deuda" : "Sin deuda"}
// //             </span>
// //           </div>

// //           <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-2 dark:border-slate-700">
// //             <span className="text-[12px] text-slate-600 dark:text-slate-400">
// //               Plan
// //             </span>

// //             <span className="truncate text-right text-[12px] font-semibold text-slate-950 dark:text-white">
// //               {cliente.plan?.nombre || "Sin plan"}
// //             </span>
// //           </div>

// //           <div className="flex items-center justify-between gap-3 py-2">
// //             <span className="text-[12px] text-slate-600 dark:text-slate-400">
// //               Importe plan
// //             </span>

// //             <span className="text-right text-[12px] font-semibold text-slate-950 dark:text-white">
// //               {cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
// //             </span>
// //           </div>

// //           {vieneDeCircuitoPago ? (
// //             <Link
// //               href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
// //               className={`${primaryButtonClass} mt-1`}
// //               style={{ color: "#ffffff" }}
// //             >
// //               <CreditCard className="h-3.5 w-3.5" style={{ color: "#ffffff" }} />

// //               <span
// //                 className="text-[13px] font-medium leading-none"
// //                 style={{ color: "#ffffff" }}
// //               >
// //                 Registrar pago
// //               </span>
// //             </Link>
// //           ) : null}
// //         </div>
// //       </div>

// //       {!vieneDeCircuitoPago ? (
// //         <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
// //           <div className="flex gap-2">
// //             <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

// //             <p>
// //               Esta ficha es informativa. Para registrar un pago, iniciá desde el
// //               panel del cobrador con DNI exacto.
// //             </p>
// //           </div>
// //         </div>
// //       ) : null}
// //     </section>
// //   );
// // }

// // function PeriodoBadge({ estadoPeriodo }: { estadoPeriodo: string }) {
// //   const badge = getPeriodoBadge(estadoPeriodo);

// //   return (
// //     <span
// //       className={`inline-flex h-6 items-center rounded-full border px-2 text-[10px] font-semibold leading-none ${badge.className}`}
// //     >
// //       {badge.label}
// //     </span>
// //   );
// // }

// // function EstadoCuentaListado({
// //   cliente,
// //   periodos,
// // }: {
// //   cliente: any;
// //   periodos: any[];
// // }) {
// //   return (
// //     <section className={`${panelClass} p-3.5`}>
// //       <div className="mb-3 flex items-start gap-3">
// //         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
// //           <FileText className="h-4 w-4" />
// //         </div>

// //         <div className="min-w-0">
// //           <p className={sectionTitleClass}>Estado de cuenta</p>

// //           <h2 className={sectionSubtitleClass}>Períodos del cliente</h2>

// //           <p className={sectionDescriptionClass}>
// //             Listado resumido de períodos con acceso al detalle.
// //           </p>
// //         </div>
// //       </div>

// //       {periodos.length === 0 ? (
// //         <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
// //           Este cliente todavía no tiene períodos facturados.
// //         </div>
// //       ) : (
// //         <>
// //           <div className="grid gap-2 md:hidden">
// //             {periodos.map((periodo) => {
// //               const periodoConSaldo = Number(periodo.saldoPeriodo || 0) > 0;

// //               return (
// //                 <article
// //                   key={periodo.facturaId}
// //                   className="rounded-xl border border-blue-200 bg-blue-50/75 px-3.5 py-3 shadow-sm shadow-blue-950/5 dark:border-blue-500/35 dark:bg-blue-950/24 dark:shadow-black/10"
// //                 >
// //                   <div className="flex items-start justify-between gap-3">
// //                     <div className="min-w-0">
// //                       <div className="flex flex-wrap items-center gap-2">
// //                         <p className="truncate text-[13px] font-semibold text-slate-950 dark:text-white">
// //                           {periodo.periodoLabel}
// //                         </p>

// //                         <PeriodoBadge estadoPeriodo={periodo.estadoPeriodo} />
// //                       </div>

// //                       <p className="mt-1 text-[11px] text-slate-600 dark:text-blue-100/78">
// //                         Factura N° {periodo.numeroComprobante}
// //                       </p>
// //                     </div>

// //                     <p
// //                       className={`shrink-0 text-right text-[13px] font-semibold ${
// //                         periodoConSaldo
// //                           ? "text-red-700 dark:text-red-300"
// //                           : "text-emerald-700 dark:text-emerald-300"
// //                       }`}
// //                     >
// //                       {formatMoney(periodo.saldoPeriodo)}
// //                     </p>
// //                   </div>

// //                   <div className="mt-3 grid grid-cols-2 gap-2">
// //                     <div className="rounded-lg border border-blue-200 bg-white/80 px-3 py-2 dark:border-blue-500/35 dark:bg-blue-950/24">
// //                       <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-blue-100/65">
// //                         Original
// //                       </p>

// //                       <p className="mt-1 truncate text-[12px] font-semibold text-slate-950 dark:text-white">
// //                         {formatMoney(periodo.importeOriginal)}
// //                       </p>
// //                     </div>

// //                     <div className="rounded-lg border border-blue-200 bg-white/80 px-3 py-2 dark:border-blue-500/35 dark:bg-blue-950/24">
// //                       <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-blue-100/65">
// //                         Saldo
// //                       </p>

// //                       <p
// //                         className={`mt-1 truncate text-[12px] font-semibold ${
// //                           periodoConSaldo
// //                             ? "text-red-700 dark:text-red-300"
// //                             : "text-emerald-700 dark:text-emerald-300"
// //                         }`}
// //                       >
// //                         {formatMoney(periodo.saldoPeriodo)}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <Link
// //                     href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
// //                     className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-blue-950/5 transition hover:bg-blue-50 active:scale-[0.99] dark:border-blue-500/35 dark:bg-blue-950/24 dark:text-blue-200 dark:shadow-black/10 dark:hover:bg-blue-950/35"
// //                   >
// //                     <Eye className="h-3.5 w-3.5" />
// //                     Ver detalle
// //                   </Link>
// //                 </article>
// //               );
// //             })}
// //           </div>

// //           <div className="hidden overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none md:block">
// //             <div className="grid grid-cols-[minmax(180px,1fr)_130px_130px_120px] border-b border-slate-300 bg-slate-100 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
// //               <span>Período</span>
// //               <span className="text-right">Factura</span>
// //               <span className="text-right">Saldo</span>
// //               <span className="text-right">Acción</span>
// //             </div>

// //             {periodos.map((periodo) => {
// //               const periodoConSaldo = Number(periodo.saldoPeriodo || 0) > 0;

// //               return (
// //                 <div
// //                   key={periodo.facturaId}
// //                   className="grid grid-cols-[minmax(180px,1fr)_130px_130px_120px] items-center gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700"
// //                 >
// //                   <div className="min-w-0">
// //                     <div className="flex flex-wrap items-center gap-2">
// //                       <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
// //                         {periodo.periodoLabel}
// //                       </p>

// //                       <PeriodoBadge estadoPeriodo={periodo.estadoPeriodo} />
// //                     </div>

// //                     <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
// //                       Original {formatMoney(periodo.importeOriginal)}
// //                     </p>
// //                   </div>

// //                   <p className="text-right text-[12px] font-medium text-slate-700 dark:text-slate-300">
// //                     N° {periodo.numeroComprobante}
// //                   </p>

// //                   <p
// //                     className={`text-right text-sm font-semibold ${
// //                       periodoConSaldo
// //                         ? "text-red-700 dark:text-red-300"
// //                         : "text-emerald-700 dark:text-emerald-300"
// //                     }`}
// //                   >
// //                     {formatMoney(periodo.saldoPeriodo)}
// //                   </p>

// //                   <div className="text-right">
// //                     <Link
// //                       href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
// //                       className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900"
// //                     >
// //                       <Eye className="h-3.5 w-3.5" />
// //                       Ver
// //                     </Link>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </>
// //       )}
// //     </section>
// //   );
// // }

// // function AsideResumenCard({
// //   cliente,
// //   totalPendiente,
// //   periodosPendientes,
// //   tieneDeuda,
// //   vieneDeCircuitoPago,
// // }: {
// //   cliente: any;
// //   totalPendiente: number;
// //   periodosPendientes: number;
// //   tieneDeuda: boolean;
// //   vieneDeCircuitoPago: boolean;
// // }) {
// //   return (
// //     <section className={`${panelClass} hidden p-3.5 sm:block`}>
// //       <div className="mb-3">
// //         <p className={sectionTitleClass}>Resumen rápido</p>

// //         <h2 className={sectionSubtitleClass}>Cuenta</h2>
// //       </div>

// //       <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
// //         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
// //           <span className="inline-flex items-center gap-2 text-[12px] text-slate-700 dark:text-slate-300">
// //             <WalletCards className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
// //             Pendiente
// //           </span>

// //           <span
// //             className={`text-right text-[12px] font-semibold ${
// //               tieneDeuda
// //                 ? "text-red-700 dark:text-red-300"
// //                 : "text-emerald-700 dark:text-emerald-300"
// //             }`}
// //           >
// //             {formatMoney(totalPendiente)}
// //           </span>
// //         </div>

// //         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
// //           <span className="inline-flex items-center gap-2 text-[12px] text-slate-700 dark:text-slate-300">
// //             <ReceiptText className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
// //             Períodos
// //           </span>

// //           <span className="text-right text-[12px] font-semibold text-slate-950 dark:text-white">
// //             {periodosPendientes}
// //           </span>
// //         </div>

// //         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
// //           <span className="inline-flex items-center gap-2 text-[12px] text-slate-700 dark:text-slate-300">
// //             <Wifi className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
// //             Plan
// //           </span>

// //           <span className="truncate text-right text-[12px] font-semibold text-slate-950 dark:text-white">
// //             {cliente.plan?.nombre || "Sin plan"}
// //           </span>
// //         </div>

// //         <div className="flex items-center justify-between gap-3 px-3 py-2.5">
// //           <span className="inline-flex items-center gap-2 text-[12px] text-slate-700 dark:text-slate-300">
// //             <UserRound className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
// //             Estado
// //           </span>

// //           <span
// //             className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
// //               cliente.estado === "activo"
// //                 ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
// //                 : cliente.estado === "suspendido"
// //                   ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300"
// //                   : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
// //             }`}
// //           >
// //             {getEstadoLabel(cliente.estado)}
// //           </span>
// //         </div>
// //       </div>

// //       {vieneDeCircuitoPago ? (
// //         <Link
// //           href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
// //           className={`${primaryButtonClass} mt-3`}
// //           style={{ color: "#ffffff" }}
// //         >
// //           <CreditCard className="h-3.5 w-3.5" style={{ color: "#ffffff" }} />

// //           <span
// //             className="text-[13px] font-medium leading-none"
// //             style={{ color: "#ffffff" }}
// //           >
// //             Registrar pago
// //           </span>
// //         </Link>
// //       ) : null}
// //     </section>
// //   );
// // }

// // function AsideAvisoCard({
// //   vieneDeCircuitoPago,
// // }: {
// //   vieneDeCircuitoPago: boolean;
// // }) {
// //   return (
// //     <section
// //       className={`hidden rounded-xl border p-3.5 shadow-md sm:block ${
// //         vieneDeCircuitoPago
// //           ? "border-blue-300 bg-blue-50 text-blue-800 shadow-blue-950/5 dark:border-blue-900/70 dark:bg-blue-950/25 dark:text-blue-200"
// //           : "border-amber-300 bg-amber-50 text-amber-800 shadow-amber-950/5 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300"
// //       }`}
// //     >
// //       <div className="flex gap-2">
// //         {vieneDeCircuitoPago ? (
// //           <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
// //         ) : (
// //           <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
// //         )}

// //         <p className="text-[12px] leading-5">
// //           {vieneDeCircuitoPago
// //             ? "El cliente fue validado por DNI. Podés continuar con el registro del pago."
// //             : "Esta ficha es informativa. Para cobrar, iniciá desde el panel del cobrador con DNI exacto."}
// //         </p>
// //       </div>
// //     </section>
// //   );
// // }

// // export default async function CobradorClientePage({
// //   params,
// //   searchParams,
// // }: CobradorClientePageProps) {
// //   const user = await getCurrentUser();

// //   if (!user) {
// //     redirect("/login");
// //   }

// //   if (user.rol !== "cobrador") {
// //     redirect(`/${user.rol}`);
// //   }

// //   const resumen = await obtenerResumenClienteParaCobrador(params.id);

// //   if (!resumen) {
// //     notFound();
// //   }

// //   const { cliente, estadoCuenta, totalPendiente } = resumen;
// //   const periodos = estadoCuenta.periodos || [];

// //   const tieneDeuda = Number(totalPendiente || 0) > 0;
// //   const periodosPendientes = contarPeriodosPendientes(periodos);
// //   const dniHabilitante = limpiarDni(searchParams?.dni);

// //   const vieneDeCircuitoPago =
// //     searchParams?.modo === "pago" && dniHabilitante === cliente.dni;

// //   return (
// //     <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
// //       <div className="sm:hidden">
// //         <div className={mobileScreenClass}>
// //           <ClienteHeroMobile
// //             cliente={cliente}
// //             tieneDeuda={tieneDeuda}
// //             vieneDeCircuitoPago={vieneDeCircuitoPago}
// //           />

// //           <CuentaMobileCard
// //             cliente={cliente}
// //             totalPendiente={totalPendiente}
// //             tieneDeuda={tieneDeuda}
// //             periodosPendientes={periodosPendientes}
// //             vieneDeCircuitoPago={vieneDeCircuitoPago}
// //           />

// //           <div className="mt-2.5">
// //             <EstadoCuentaListado cliente={cliente} periodos={periodos} movimientos={estadoCuenta.movimientos || []} />
// //           </div>
// //         </div>
// //       </div>

// //       <div className="hidden sm:block">
// //         <DashboardGrid>
// //           <DashboardMain>
// //             <HeaderClienteCobrador
// //               vieneDeCircuitoPago={vieneDeCircuitoPago}
// //             />

// //             <div className="mt-3">
// //               <ClienteResumenDesktop
// //                 cliente={cliente}
// //                 tieneDeuda={tieneDeuda}
// //                 vieneDeCircuitoPago={vieneDeCircuitoPago}
// //               />
// //             </div>

// //             <div className="mt-3">
// //               <CuentaDesktopCard
// //                 cliente={cliente}
// //                 totalPendiente={totalPendiente}
// //                 tieneDeuda={tieneDeuda}
// //                 periodosPendientes={periodosPendientes}
// //                 vieneDeCircuitoPago={vieneDeCircuitoPago}
// //               />
// //             </div>

// //             <div className="mt-3">
// //               <EstadoCuentaListado cliente={cliente} periodos={periodos} movimientos={estadoCuenta.movimientos || []} />
// //             </div>
// //           </DashboardMain>

// //           <DashboardAside>
// //             <AsideResumenCard
// //               cliente={cliente}
// //               totalPendiente={totalPendiente}
// //               periodosPendientes={periodosPendientes}
// //               tieneDeuda={tieneDeuda}
// //               vieneDeCircuitoPago={vieneDeCircuitoPago}
// //             />

// //             <div className="mt-3">
// //               <AsideAvisoCard vieneDeCircuitoPago={vieneDeCircuitoPago} />
// //             </div>
// //           </DashboardAside>
// //         </DashboardGrid>
// //       </div>
// //     </PageShell>
// //   );
// // }

// import Link from "next/link";

// import { notFound, redirect } from "next/navigation";

// import type { ReactNode } from "react";

// import type { LucideIcon } from "lucide-react";

// import {
//   AlertTriangle,
//   ArrowLeft,
//   CheckCircle2,
//   CreditCard,
//   Eye,
//   FileText,
//   IdCard,
//   MapPin,
//   Phone,
//   ReceiptText,
//   ShieldCheck,
//   UserRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";

// import { PageShell } from "@/components/ui/PageShell";

// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// import { CopyDniButton } from "@/components/ui/CopyDniButton";

// import { getCurrentUser } from "@/lib/current-user";

// import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";

// export const metadata = {
//   title: "Cliente",
// };

// type CobradorClientePageProps = {
//   params: {
//     id: string;
//   };

//   searchParams?: {
//     modo?: string;

//     dni?: string;
//   };
// };

// type InfoTileProps = {
//   label: string;

//   value?: string | number | null;

//   icon: LucideIcon;

//   highlight?: boolean;

//   action?: ReactNode;
// };

// const panelClass =
//   "overflow-hidden rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-panel)] shadow-sm";

// const innerPanelClass =
//   "rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-bg)]";

// const mobileScreenClass = "space-y-3";

// const mobileModuleClass =
//   "rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-panel)] p-3 shadow-sm";

// const sectionTitleClass =
//   "text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--overview-blue-accent)]";

// const sectionSubtitleClass =
//   "mt-0.5 text-[14px] font-medium text-[var(--overview-text)]";

// const sectionDescriptionClass =
//   "mt-1 text-[12px] leading-5 text-[var(--overview-muted)]";

// const primaryButtonClass =
//   "inline-flex h-9 w-full items-center justify-center gap-2 rounded-[7px] border border-[var(--overview-blue)] bg-[var(--overview-blue)] px-3 text-[12px] font-medium leading-none text-white transition hover:brightness-95 sm:w-auto";

// const walletPrimaryButtonClass =
//   "inline-flex h-10 w-full items-center justify-center gap-2 rounded-[7px] border border-[var(--overview-blue)] bg-[var(--overview-blue)] px-3 text-[12px] font-medium leading-none text-white transition hover:brightness-95";

// function limpiarDni(value?: string) {
//   return String(value || "")
//     .replace(/\D/g, "")
//     .slice(0, 12);
// }

// function formatMoney(value: number) {
//   const amount = Number(value || 0);

//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");

//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function getEstadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";

//   if (estado === "suspendido") return "Suspendido";

//   return "Baja";
// }

// function getPeriodoBadge(estadoPeriodo: string) {
//   if (estadoPeriodo === "cancelado") {
//     return {
//       label: "Cancelado",

//       className:
//         "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300",
//     };
//   }

//   if (estadoPeriodo === "a_favor") {
//     return {
//       label: "A favor",

//       className:
//         "border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)]",
//     };
//   }

//   return {
//     label: "Pendiente",

//     className:
//       "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300",
//   };
// }

// function contarPeriodosPendientes(periodos: any[]) {
//   return periodos.filter((periodo) => Number(periodo.saldoPeriodo || 0) > 0)
//     .length;
// }

// function HeaderClienteCobrador({
//   vieneDeCircuitoPago,
// }: {
//   vieneDeCircuitoPago: boolean;
// }) {
//   return (
//     <section className={`${panelClass} hidden p-3.5 sm:block`}>
//       <div className="flex items-start justify-between gap-4">
//         <div className="flex min-w-0 items-start gap-3">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)]">
//             <ShieldCheck className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className={sectionTitleClass}>
//               {vieneDeCircuitoPago ? "Circuito de cobro" : "Consulta cliente"}
//             </p>

//             <h1 className={sectionSubtitleClass}>Ficha del cliente</h1>

//             <p className={`${sectionDescriptionClass} max-w-3xl`}>
//               {vieneDeCircuitoPago
//                 ? "Revisá la deuda, los períodos pendientes y continuá con el registro del pago."
//                 : "Vista de consulta. Para registrar un pago, iniciá el circuito desde el panel con DNI exacto."}
//             </p>
//           </div>
//         </div>

//         <Link
//           href="/cobrador"
//           className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[var(--overview-border)] bg-[var(--overview-panel)] px-3 text-[12px] font-medium text-[var(--overview-text)] shadow-sm transition hover:bg-[var(--overview-bg)] active:scale-[0.99] dark:border-[var(--overview-border)] dark:bg-[var(--overview-button)] dark:text-[var(--overview-text)] dark:shadow-black/10 dark:hover:bg-[var(--overview-soft)]"
//         >
//           <ArrowLeft className="h-3.5 w-3.5" />
//           Volver
//         </Link>
//       </div>
//     </section>
//   );
// }

// function InfoTile({
//   label,
//   value,
//   icon: Icon,
//   highlight = false,
//   action,
// }: InfoTileProps) {
//   return (
//     <div
//       className={`flex min-w-0 items-center gap-2.5 rounded-[7px] border px-2.5 py-2.5 ${
//         highlight
//           ? "border-[var(--overview-blue-accent)] bg-[var(--overview-soft)]"
//           : "border-[var(--overview-border)] bg-[var(--overview-bg)]"
//       }`}
//     >
//       <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[var(--overview-blue-tint)] text-[var(--overview-blue-accent)]">
//         <Icon className="h-4 w-4" />
//       </span>
//       <div className="min-w-0 flex-1">
//         <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--overview-muted)]">
//           {label}
//         </p>
//         <div className="mt-0.5 flex min-w-0 items-center gap-2">
//           <p className="min-w-0 truncate text-[12px] font-medium leading-5 text-[var(--overview-text)]">
//             {value || "-"}
//           </p>
//           {action ? <div className="shrink-0">{action}</div> : null}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ClienteHeroMobile({
//   cliente,
//   tieneDeuda,
//   vieneDeCircuitoPago,
// }: {
//   cliente: any;
//   tieneDeuda: boolean;
//   vieneDeCircuitoPago: boolean;
// }) {
//   const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;

//   return (
//     <section className={`${panelClass} p-3`}>
//       <div className="flex items-start justify-between gap-2.5">
//         <div className="min-w-0">
//           <p className={sectionTitleClass}>
//             {vieneDeCircuitoPago ? "Cliente validado" : "Ficha del cliente"}
//           </p>
//           <h1 className="mt-1 line-clamp-2 text-[18px] font-medium leading-6 tracking-tight text-[var(--overview-text)]">
//             {nombreCompleto}
//           </h1>
//           <p className="mt-1 text-[11px] text-[var(--overview-muted)]">
//             DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
//           </p>
//         </div>
//         <span
//           className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium ${
//             cliente.estado === "activo"
//               ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//               : cliente.estado === "suspendido"
//                 ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300"
//                 : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
//           }`}
//         >
//           <CheckCircle2 className="h-3.5 w-3.5" />
//           {vieneDeCircuitoPago ? "Validado" : getEstadoLabel(cliente.estado)}
//         </span>
//       </div>

//       <div className="mt-3 grid grid-cols-2 divide-x divide-[var(--overview-border)] rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-bg)]">
//         <div className="min-w-0 px-2.5 py-2">
//           <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--overview-muted)]">
//             Estado de cuenta
//           </p>
//           <p
//             className={`mt-0.5 truncate text-[12px] font-medium ${tieneDeuda ? "text-red-700 dark:text-red-300" : "text-emerald-700 dark:text-emerald-300"}`}
//           >
//             {tieneDeuda ? "Con deuda" : "Sin deuda"}
//           </p>
//         </div>
//         <div className="min-w-0 px-2.5 py-2">
//           <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--overview-muted)]">
//             Plan
//           </p>
//           <p className="mt-0.5 truncate text-[12px] font-medium text-[var(--overview-text)]">
//             {cliente.plan?.nombre || "Sin plan"}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// function CuentaMobileCard({
//   cliente,

//   totalPendiente,

//   tieneDeuda,

//   periodosPendientes,

//   vieneDeCircuitoPago,
// }: {
//   cliente: any;

//   totalPendiente: number;

//   tieneDeuda: boolean;

//   periodosPendientes: number;

//   vieneDeCircuitoPago: boolean;
// }) {
//   return (
//     <section className={mobileModuleClass}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <p className={sectionTitleClass}>Cuenta del cliente</p>

//           <h2 className={sectionSubtitleClass}>Total pendiente</h2>

//           <p className={sectionDescriptionClass}>
//             Saldo disponible para registrar el pago.
//           </p>
//         </div>

//         <div
//           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
//             tieneDeuda
//               ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
//               : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//           }`}
//         >
//           <WalletCards className="h-4 w-4" />
//         </div>
//       </div>

//       <div
//         className={`rounded-[7px] border p-3 ${
//           tieneDeuda
//             ? "border-red-200 bg-red-50/80 dark:border-red-900/70 dark:bg-red-950/24"
//             : "border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/70 dark:bg-emerald-950/24"
//         }`}
//       >
//         <p
//           className={`text-[34px] font-semibold leading-none tracking-tight ${
//             tieneDeuda
//               ? "text-red-700 dark:text-red-300"
//               : "text-emerald-700 dark:text-emerald-300"
//           }`}
//         >
//           {formatMoney(totalPendiente)}
//         </p>

//         <p className="mt-2 text-[12px] leading-5 text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//           {periodosPendientes} período/s con saldo pendiente.
//         </p>
//       </div>

//       {vieneDeCircuitoPago ? (
//         <Link
//           href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
//           className={`${walletPrimaryButtonClass} mt-3`}
//           style={{ color: "#ffffff" }}
//         >
//           <CreditCard className="h-4 w-4" style={{ color: "#ffffff" }} />

//           <span
//             className="text-[13px] font-semibold leading-none"
//             style={{ color: "#ffffff" }}
//           >
//             Registrar pago
//           </span>
//         </Link>
//       ) : (
//         <div className="mt-3 rounded-[7px] border border-amber-200 bg-amber-50 p-3 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//           <div className="flex gap-2">
//             <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

//             <p>
//               Vista informativa. Para registrar un pago, iniciá desde el panel
//               con DNI exacto.
//             </p>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// function ClienteResumenDesktop({
//   cliente,

//   tieneDeuda,

//   vieneDeCircuitoPago,
// }: {
//   cliente: any;

//   tieneDeuda: boolean;

//   vieneDeCircuitoPago: boolean;
// }) {
//   const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;

//   const ubicacion = [cliente.localidad, cliente.provincia]

//     .filter(Boolean)

//     .join(" · ");

//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div className="flex min-w-0 items-start gap-3">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
//             <UserRound className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
//               {vieneDeCircuitoPago ? "Cliente validado" : "Consulta"}
//             </p>

//             <h2 className="mt-0.5 text-sm font-semibold text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//               {nombreCompleto}
//             </h2>

//             <p className="mt-1 text-[12px] leading-5 text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//               DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
//             </p>
//           </div>
//         </div>

//         <div className="flex shrink-0 flex-wrap justify-end gap-2">
//           <span className="inline-flex h-6 items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 text-[10px] font-semibold leading-none text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
//             <CheckCircle2 className="h-3.5 w-3.5" />

//             {getEstadoLabel(cliente.estado)}
//           </span>

//           <span
//             className={`inline-flex h-6 items-center rounded-full border px-2 text-[10px] font-semibold leading-none ${
//               tieneDeuda
//                 ? "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
//                 : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//             }`}
//           >
//             {tieneDeuda ? "Con deuda" : "Sin deuda"}
//           </span>
//         </div>
//       </div>

//       <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
//         <InfoTile
//           label="DNI"
//           value={cliente.dni}
//           icon={IdCard}
//           highlight
//           action={<CopyDniButton dni={cliente.dni} />}
//         />

//         <InfoTile
//           label="Cliente N°"
//           value={cliente.numeroCliente}
//           icon={CreditCard}
//           highlight
//         />

//         <InfoTile
//           label="Localidad"
//           value={cliente.localidad || "-"}
//           icon={MapPin}
//         />

//         <InfoTile
//           label="Teléfono"
//           value={cliente.telefono || "-"}
//           icon={Phone}
//         />
//       </div>

//       <div className={`${innerPanelClass} mt-3 p-3`}>
//         <div className="flex items-start gap-3">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)]">
//             <MapPin className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//               Dirección del servicio
//             </p>

//             <p className="mt-1 text-sm leading-6 text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//               {cliente.direccion || "Sin dirección cargada"}
//             </p>

//             <p className="mt-0.5 text-xs leading-5 text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//               {ubicacion || "Sin localidad cargada"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function CuentaDesktopCard({
//   cliente,

//   totalPendiente,

//   tieneDeuda,

//   periodosPendientes,

//   vieneDeCircuitoPago,
// }: {
//   cliente: any;

//   totalPendiente: number;

//   tieneDeuda: boolean;

//   periodosPendientes: number;

//   vieneDeCircuitoPago: boolean;
// }) {
//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div className="flex min-w-0 items-start gap-3">
//           <div
//             className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
//               tieneDeuda
//                 ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
//                 : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//             }`}
//           >
//             <WalletCards className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className={sectionTitleClass}>Cuenta del cliente</p>

//             <h2 className={sectionSubtitleClass}>Resumen financiero</h2>

//             <p className={sectionDescriptionClass}>
//               Saldo pendiente y períodos disponibles para consultar.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.5fr)]">
//         <div
//           className={`rounded-lg border p-3 ${
//             tieneDeuda
//               ? "border-red-200 bg-red-50/70 dark:border-red-900/70 dark:bg-red-950/24"
//               : "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/70 dark:bg-emerald-950/24"
//           }`}
//         >
//           <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//             Total pendiente
//           </p>

//           <p
//             className={`mt-2 text-4xl font-semibold leading-none tracking-tight ${
//               tieneDeuda
//                 ? "text-red-700 dark:text-red-300"
//                 : "text-emerald-700 dark:text-emerald-300"
//             }`}
//           >
//             {formatMoney(totalPendiente)}
//           </p>

//           <p className="mt-2 text-[12px] leading-5 text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//             {periodosPendientes} período/s con saldo pendiente.
//           </p>
//         </div>

//         <div className={`${innerPanelClass} p-3`}>
//           <div className="flex items-center justify-between gap-3 border-b border-[var(--overview-border)] pb-2 dark:border-[var(--overview-border)]">
//             <span className="text-[12px] text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//               Estado
//             </span>

//             <span
//               className={`text-[12px] font-semibold ${
//                 tieneDeuda
//                   ? "text-red-700 dark:text-red-300"
//                   : "text-emerald-700 dark:text-emerald-300"
//               }`}
//             >
//               {tieneDeuda ? "Con deuda" : "Sin deuda"}
//             </span>
//           </div>

//           <div className="flex items-center justify-between gap-3 border-b border-[var(--overview-border)] py-2 dark:border-[var(--overview-border)]">
//             <span className="text-[12px] text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//               Plan
//             </span>

//             <span className="truncate text-right text-[12px] font-semibold text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//               {cliente.plan?.nombre || "Sin plan"}
//             </span>
//           </div>

//           <div className="flex items-center justify-between gap-3 py-2">
//             <span className="text-[12px] text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//               Importe plan
//             </span>

//             <span className="text-right text-[12px] font-semibold text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//               {cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
//             </span>
//           </div>

//           {vieneDeCircuitoPago ? (
//             <Link
//               href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
//               className={`${primaryButtonClass} mt-1`}
//               style={{ color: "#ffffff" }}
//             >
//               <CreditCard
//                 className="h-3.5 w-3.5"
//                 style={{ color: "#ffffff" }}
//               />

//               <span
//                 className="text-[13px] font-medium leading-none"
//                 style={{ color: "#ffffff" }}
//               >
//                 Registrar pago
//               </span>
//             </Link>
//           ) : null}
//         </div>
//       </div>

//       {!vieneDeCircuitoPago ? (
//         <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//           <div className="flex gap-2">
//             <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

//             <p>
//               Esta ficha es informativa. Para registrar un pago, iniciá desde el
//               panel del cobrador con DNI exacto.
//             </p>
//           </div>
//         </div>
//       ) : null}
//     </section>
//   );
// }

// function PeriodoBadge({ estadoPeriodo }: { estadoPeriodo: string }) {
//   const badge = getPeriodoBadge(estadoPeriodo);

//   return (
//     <span
//       className={`inline-flex h-6 items-center rounded-full border px-2 text-[10px] font-semibold leading-none ${badge.className}`}
//     >
//       {badge.label}
//     </span>
//   );
// }

// function EstadoCuentaListado({
//   cliente,

//   periodos,
// }: {
//   cliente: any;

//   periodos: any[];
// }) {
//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="mb-3 flex items-start gap-3">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)]">
//           <FileText className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className={sectionTitleClass}>Estado de cuenta</p>

//           <h2 className={sectionSubtitleClass}>Períodos del cliente</h2>

//           <p className={sectionDescriptionClass}>
//             Listado resumido de períodos con acceso al detalle.
//           </p>
//         </div>
//       </div>

//       {periodos.length === 0 ? (
//         <div className="rounded-lg border border-dashed border-[var(--overview-border)] bg-[var(--overview-bg)] p-4 text-[13px] text-[var(--overview-muted)] dark:border-[var(--overview-border)] dark:bg-[var(--overview-bg)] dark:text-[var(--overview-muted)]">
//           Este cliente todavía no tiene períodos facturados.
//         </div>
//       ) : (
//         <>
//           <div className="grid gap-2 md:hidden">
//             {periodos.map((periodo) => {
//               const periodoConSaldo = Number(periodo.saldoPeriodo || 0) > 0;

//               return (
//                 <article
//                   key={periodo.facturaId}
//                   className="rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-bg)] px-3 py-3 shadow-sm"
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="min-w-0">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <p className="truncate text-[13px] font-semibold text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//                           {periodo.periodoLabel}
//                         </p>

//                         <PeriodoBadge estadoPeriodo={periodo.estadoPeriodo} />
//                       </div>

//                       <p className="mt-1 text-[11px] text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//                         Factura N° {periodo.numeroComprobante}
//                       </p>
//                     </div>

//                     <p
//                       className={`shrink-0 text-right text-[13px] font-semibold ${
//                         periodoConSaldo
//                           ? "text-red-700 dark:text-red-300"
//                           : "text-emerald-700 dark:text-emerald-300"
//                       }`}
//                     >
//                       {formatMoney(periodo.saldoPeriodo)}
//                     </p>
//                   </div>

//                   <div className="mt-3 grid grid-cols-2 gap-2">
//                     <div className="rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-panel)] px-3 py-2">
//                       <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//                         Original
//                       </p>

//                       <p className="mt-1 truncate text-[12px] font-semibold text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//                         {formatMoney(periodo.importeOriginal)}
//                       </p>
//                     </div>

//                     <div className="rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-panel)] px-3 py-2">
//                       <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//                         Saldo
//                       </p>

//                       <p
//                         className={`mt-1 truncate text-[12px] font-semibold ${
//                           periodoConSaldo
//                             ? "text-red-700 dark:text-red-300"
//                             : "text-emerald-700 dark:text-emerald-300"
//                         }`}
//                       >
//                         {formatMoney(periodo.saldoPeriodo)}
//                       </p>
//                     </div>
//                   </div>

//                   <Link
//                     href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
//                     className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[var(--overview-border)] bg-[var(--overview-panel)] px-3 text-[12px] font-medium text-[var(--overview-text)] transition hover:bg-[var(--overview-soft)] active:scale-[0.99]"
//                   >
//                     <Eye className="h-3.5 w-3.5" />
//                     Ver detalle
//                   </Link>
//                 </article>
//               );
//             })}
//           </div>

//           <div className="hidden overflow-hidden rounded-lg border border-[var(--overview-border)] bg-[var(--overview-panel)] shadow-sm dark:border-[var(--overview-border)] dark:bg-[var(--overview-bg)] dark:shadow-none md:block">
//             <div className="grid grid-cols-[minmax(180px,1fr)_130px_130px_120px] border-b border-[var(--overview-border)] bg-[var(--overview-header)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--overview-muted)] dark:border-[var(--overview-border)] dark:bg-[var(--overview-bg)] dark:text-[var(--overview-muted)]">
//               <span>Período</span>

//               <span className="text-right">Factura</span>

//               <span className="text-right">Saldo</span>

//               <span className="text-right">Acción</span>
//             </div>

//             {periodos.map((periodo) => {
//               const periodoConSaldo = Number(periodo.saldoPeriodo || 0) > 0;

//               return (
//                 <div
//                   key={periodo.facturaId}
//                   className="grid grid-cols-[minmax(180px,1fr)_130px_130px_120px] items-center gap-2 border-b border-[var(--overview-border)] px-3 py-2.5 last:border-b-0 dark:border-[var(--overview-border)]"
//                 >
//                   <div className="min-w-0">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <p className="truncate text-sm font-semibold text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//                         {periodo.periodoLabel}
//                       </p>

//                       <PeriodoBadge estadoPeriodo={periodo.estadoPeriodo} />
//                     </div>

//                     <p className="mt-0.5 text-[11px] text-[var(--overview-muted)] dark:text-[var(--overview-muted)]">
//                       Original {formatMoney(periodo.importeOriginal)}
//                     </p>
//                   </div>

//                   <p className="text-right text-[12px] font-medium text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//                     N° {periodo.numeroComprobante}
//                   </p>

//                   <p
//                     className={`text-right text-sm font-semibold ${
//                       periodoConSaldo
//                         ? "text-red-700 dark:text-red-300"
//                         : "text-emerald-700 dark:text-emerald-300"
//                     }`}
//                   >
//                     {formatMoney(periodo.saldoPeriodo)}
//                   </p>

//                   <div className="text-right">
//                     <Link
//                       href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
//                       className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[var(--overview-border)] bg-[var(--overview-panel)] px-3 text-[12px] font-medium text-[var(--overview-text)] shadow-sm transition hover:bg-[var(--overview-bg)] active:scale-[0.99] dark:border-[var(--overview-border)] dark:bg-[var(--overview-button)] dark:text-[var(--overview-text)] dark:shadow-black/10 dark:hover:bg-[var(--overview-soft)]"
//                     >
//                       <Eye className="h-3.5 w-3.5" />
//                       Ver
//                     </Link>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </section>
//   );
// }

// function AsideResumenCard({
//   cliente,

//   totalPendiente,

//   periodosPendientes,

//   tieneDeuda,

//   vieneDeCircuitoPago,
// }: {
//   cliente: any;

//   totalPendiente: number;

//   periodosPendientes: number;

//   tieneDeuda: boolean;

//   vieneDeCircuitoPago: boolean;
// }) {
//   return (
//     <section className={`${panelClass} hidden p-3.5 sm:block`}>
//       <div className="mb-3">
//         <p className={sectionTitleClass}>Resumen rápido</p>

//         <h2 className={sectionSubtitleClass}>Cuenta</h2>
//       </div>

//       <div className="overflow-hidden rounded-lg border border-[var(--overview-border)] bg-[var(--overview-panel)] shadow-sm dark:border-[var(--overview-border)] dark:bg-[var(--overview-bg)] dark:shadow-none">
//         <div className="flex items-center justify-between gap-3 border-b border-[var(--overview-border)] px-3 py-2.5 dark:border-[var(--overview-border)]">
//           <span className="inline-flex items-center gap-2 text-[12px] text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//             <WalletCards className="h-3.5 w-3.5 text-[var(--overview-blue-accent)]" />
//             Pendiente
//           </span>

//           <span
//             className={`text-right text-[12px] font-semibold ${
//               tieneDeuda
//                 ? "text-red-700 dark:text-red-300"
//                 : "text-emerald-700 dark:text-emerald-300"
//             }`}
//           >
//             {formatMoney(totalPendiente)}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-[var(--overview-border)] px-3 py-2.5 dark:border-[var(--overview-border)]">
//           <span className="inline-flex items-center gap-2 text-[12px] text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//             <ReceiptText className="h-3.5 w-3.5 text-[var(--overview-blue-accent)]" />
//             Períodos
//           </span>

//           <span className="text-right text-[12px] font-semibold text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//             {periodosPendientes}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-[var(--overview-border)] px-3 py-2.5 dark:border-[var(--overview-border)]">
//           <span className="inline-flex items-center gap-2 text-[12px] text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//             <Wifi className="h-3.5 w-3.5 text-[var(--overview-blue-accent)]" />
//             Plan
//           </span>

//           <span className="truncate text-right text-[12px] font-semibold text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//             {cliente.plan?.nombre || "Sin plan"}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//           <span className="inline-flex items-center gap-2 text-[12px] text-[var(--overview-text)] dark:text-[var(--overview-text)]">
//             <UserRound className="h-3.5 w-3.5 text-[var(--overview-blue-accent)]" />
//             Estado
//           </span>

//           <span
//             className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
//               cliente.estado === "activo"
//                 ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//                 : cliente.estado === "suspendido"
//                   ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300"
//                   : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
//             }`}
//           >
//             {getEstadoLabel(cliente.estado)}
//           </span>
//         </div>
//       </div>

//       {vieneDeCircuitoPago ? (
//         <Link
//           href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
//           className={`${primaryButtonClass} mt-3`}
//           style={{ color: "#ffffff" }}
//         >
//           <CreditCard className="h-3.5 w-3.5" style={{ color: "#ffffff" }} />

//           <span
//             className="text-[13px] font-medium leading-none"
//             style={{ color: "#ffffff" }}
//           >
//             Registrar pago
//           </span>
//         </Link>
//       ) : null}
//     </section>
//   );
// }

// function AsideAvisoCard({
//   vieneDeCircuitoPago,
// }: {
//   vieneDeCircuitoPago: boolean;
// }) {
//   return (
//     <section
//       className={`hidden rounded-[7px] border p-3.5 shadow-sm sm:block ${
//         vieneDeCircuitoPago
//           ? "border-blue-300 bg-blue-50 text-[var(--overview-blue)] dark:border-[var(--overview-border)] dark:bg-[var(--overview-blue-tint)] dark:text-[var(--overview-text)]"
//           : "border-amber-300 bg-amber-50 text-amber-800 shadow-amber-950/5 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300"
//       }`}
//     >
//       <div className="flex gap-2">
//         {vieneDeCircuitoPago ? (
//           <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
//         ) : (
//           <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
//         )}

//         <p className="text-[12px] leading-5">
//           {vieneDeCircuitoPago
//             ? "El cliente fue validado por DNI. Podés continuar con el registro del pago."
//             : "Esta ficha es informativa. Para cobrar, iniciá desde el panel del cobrador con DNI exacto."}
//         </p>
//       </div>
//     </section>
//   );
// }

// export default async function CobradorClientePage({
//   params,

//   searchParams,
// }: CobradorClientePageProps) {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "cobrador") {
//     redirect(`/${user.rol}`);
//   }

//   const resumen = await obtenerResumenClienteParaCobrador(params.id);

//   if (!resumen) {
//     notFound();
//   }

//   const { cliente, estadoCuenta, totalPendiente } = resumen;

//   const periodos = estadoCuenta.periodos || [];

//   const tieneDeuda = Number(totalPendiente || 0) > 0;

//   const periodosPendientes = contarPeriodosPendientes(periodos);

//   const dniHabilitante = limpiarDni(searchParams?.dni);

//   const vieneDeCircuitoPago =
//     searchParams?.modo === "pago" && dniHabilitante === cliente.dni;

//   return (
//     <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
//       <div className="sm:hidden">
//         <div className={mobileScreenClass}>
//           <ClienteHeroMobile
//             cliente={cliente}
//             tieneDeuda={tieneDeuda}
//             vieneDeCircuitoPago={vieneDeCircuitoPago}
//           />

//           <CuentaMobileCard
//             cliente={cliente}
//             totalPendiente={totalPendiente}
//             tieneDeuda={tieneDeuda}
//             periodosPendientes={periodosPendientes}
//             vieneDeCircuitoPago={vieneDeCircuitoPago}
//           />

//           <div className="mt-2.5">
//             <EstadoCuentaListado cliente={cliente} periodos={periodos} movimientos={estadoCuenta.movimientos || []} />
//           </div>
//         </div>
//       </div>

//       <div className="hidden sm:block">
//         <DashboardGrid>
//           <DashboardMain>
//             <HeaderClienteCobrador vieneDeCircuitoPago={vieneDeCircuitoPago} />

//             <div className="mt-3">
//               <ClienteResumenDesktop
//                 cliente={cliente}
//                 tieneDeuda={tieneDeuda}
//                 vieneDeCircuitoPago={vieneDeCircuitoPago}
//               />
//             </div>

//             <div className="mt-3">
//               <CuentaDesktopCard
//                 cliente={cliente}
//                 totalPendiente={totalPendiente}
//                 tieneDeuda={tieneDeuda}
//                 periodosPendientes={periodosPendientes}
//                 vieneDeCircuitoPago={vieneDeCircuitoPago}
//               />
//             </div>

//             <div className="mt-3">
//               <EstadoCuentaListado cliente={cliente} periodos={periodos} movimientos={estadoCuenta.movimientos || []} />
//             </div>
//           </DashboardMain>

//           <DashboardAside>
//             <AsideResumenCard
//               cliente={cliente}
//               totalPendiente={totalPendiente}
//               periodosPendientes={periodosPendientes}
//               tieneDeuda={tieneDeuda}
//               vieneDeCircuitoPago={vieneDeCircuitoPago}
//             />

//             <div className="mt-3">
//               <AsideAvisoCard vieneDeCircuitoPago={vieneDeCircuitoPago} />
//             </div>
//           </DashboardAside>
//         </DashboardGrid>
//       </div>
//     </PageShell>
//   );
// }


// src/app/(dashboard)/cobrador/clientes/[id]/page.tsx

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  CreditCard,
  Eye,
  FileText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import type { MovimientoFinancieroSafe } from "@/types/movimiento-financiero.types";
import { PageShell } from "@/components/ui/PageShell";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";

export const metadata = {
  title: "Cliente",
};

type CobradorClientePageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    modo?: string;
    dni?: string;
  };
};


const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80 sm:overflow-hidden sm:rounded-[8px] sm:border-[var(--overview-border)] sm:bg-[var(--overview-panel)] sm:shadow-sm sm:ring-0";

const mobileScreenClass =
  "space-y-3 text-[var(--overview-text)]";

const mobileModuleClass =
  "overflow-hidden rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-panel)] p-3";

const sectionTitleClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300 sm:text-[10px] sm:font-medium sm:tracking-[0.14em] sm:text-[var(--overview-muted)]";

const sectionSubtitleClass =
  "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white sm:text-[14px] sm:font-medium sm:text-[var(--overview-text)]";

const sectionDescriptionClass =
  "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400 sm:text-[var(--overview-muted)]";

const primaryButtonClass =
  "inline-flex h-9 w-full items-center justify-center gap-2 rounded-[7px] border border-[var(--overview-blue)] bg-[var(--overview-blue)] px-3 text-[12px] font-medium leading-none text-white transition hover:brightness-95 sm:w-auto";

function limpiarDni(value?: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 12);
}

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function getEstadoLabel(estado: string) {
  if (estado === "activo") return "Activo";
  if (estado === "suspendido") return "Suspendido";
  return "Baja";
}

function getPeriodoBadge(estadoPeriodo: string) {
  if (estadoPeriodo === "cancelado") {
    return {
      label: "Cancelado",
      className:
        "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300",
    };
  }

  if (estadoPeriodo === "a_favor") {
    return {
      label: "A favor",
      className:
        "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-300",
    };
  }

  return {
    label: "Pendiente",
    className:
      "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300",
  };
}

function contarPeriodosPendientes(periodos: any[]) {
  return periodos.filter((periodo) => Number(periodo.saldoPeriodo || 0) > 0)
    .length;
}

function HeaderClienteCobrador({
  vieneDeCircuitoPago,
}: {
  vieneDeCircuitoPago: boolean;
}) {
  return (
    <section className={`${panelClass} hidden p-3.5 sm:block`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)]">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className={sectionTitleClass}>
              {vieneDeCircuitoPago ? "Circuito de cobro" : "Consulta cliente"}
            </p>

            <h1 className={sectionSubtitleClass}>Ficha del cliente</h1>

            <p className={`${sectionDescriptionClass} max-w-3xl`}>
              {vieneDeCircuitoPago
                ? "Revisá la deuda, los períodos pendientes y continuá con el registro del pago."
                : "Vista de consulta. Para registrar un pago, iniciá el circuito desde el panel con DNI exacto."}
            </p>
          </div>
        </div>

        <Link
          href="/cobrador"
          className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-panel)] px-3 text-[12px] font-medium text-[var(--overview-text)] shadow-sm transition hover:bg-[var(--overview-bg)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver
        </Link>
      </div>
    </section>
  );
}


function ClienteHeroMobile({
  cliente,
  vieneDeCircuitoPago,
}: {
  cliente: any;
  tieneDeuda: boolean;
  vieneDeCircuitoPago: boolean;
}) {
  const ubicacion = [cliente.localidad, cliente.provincia].filter(Boolean).join(" · ");
  const estadoTone = cliente.estado === "activo"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/25 dark:text-emerald-300"
    : "border-[var(--overview-border)] bg-[var(--overview-bg)] text-[var(--overview-muted)]";

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <Link
          href={vieneDeCircuitoPago ? "/cobrador" : "/cobrador/buscar-cliente"}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-[6px] px-1 text-[12px] text-[var(--overview-muted)] transition hover:text-[var(--overview-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--overview-blue)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
        {vieneDeCircuitoPago ? (
          <span className="inline-flex items-center gap-1 text-[11px] text-[var(--overview-muted)]">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--overview-blue)]" />
            DNI validado
          </span>
        ) : null}
      </div>

      <section className={mobileModuleClass}>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] text-[var(--overview-muted)]">Cliente N° {cliente.numeroCliente}</p>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-medium ${estadoTone}`}>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
            {getEstadoLabel(cliente.estado)}
          </span>
        </div>
        <h1 className="mt-1.5 break-words text-[19px] font-medium leading-6 tracking-tight text-[var(--overview-text)]">
          {cliente.apellido}, {cliente.nombre}
        </h1>
        <p className="mt-1 text-[12px] text-[var(--overview-muted)]">DNI {cliente.dni}</p>

        <details className="group mt-3 border-t border-[var(--overview-border)]">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 pt-2 [&::-webkit-details-marker]:hidden">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-[var(--overview-muted)]">Servicio contratado</p>
              <p className="mt-0.5 truncate text-[12px] text-[var(--overview-text)]">{cliente.plan?.nombre || "Sin plan asignado"}</p>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-[var(--overview-muted)] transition-transform group-open:rotate-180" />
          </summary>
          <dl className="mt-2 space-y-2 border-t border-[var(--overview-border)] pt-2 text-[12px] leading-5">
            <div className="flex justify-between gap-3"><dt className="text-[var(--overview-muted)]">Abono mensual</dt><dd className="text-right tabular-nums">{cliente.plan ? formatMoney(cliente.plan.importe) : "—"}</dd></div>
            <div><dt className="text-[10px] text-[var(--overview-muted)]">Dirección</dt><dd className="break-words">{cliente.direccion || "Sin cargar"}</dd></div>
            {ubicacion ? <div><dt className="text-[10px] text-[var(--overview-muted)]">Localidad</dt><dd className="break-words">{ubicacion}</dd></div> : null}
          </dl>
        </details>
      </section>
    </div>
  );
}

function CuentaMobileCard({
  cliente,
  totalPendiente,
  tieneDeuda,
  periodosPendientes,
  vieneDeCircuitoPago,
}: {
  cliente: any;
  totalPendiente: number;
  tieneDeuda: boolean;
  periodosPendientes: number;
  vieneDeCircuitoPago: boolean;
}) {
  const saldoAFavor = Number(totalPendiente) < 0;
  return (
    <section className={`overflow-hidden rounded-[8px] border p-3.5 ${
      tieneDeuda
        ? "border-red-200/80 bg-gradient-to-br from-red-50/80 to-[var(--overview-panel)] dark:border-red-900/50 dark:from-red-950/25"
        : "border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 to-[var(--overview-panel)] dark:border-emerald-900/50 dark:from-emerald-950/25"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-[11px] font-normal text-[var(--overview-muted)]">{saldoAFavor ? "Saldo a favor" : "Total pendiente"}</h2>
          <p className={`mt-1.5 break-words text-[28px] font-medium leading-8 tracking-tight tabular-nums ${tieneDeuda ? "text-red-700 dark:text-red-300" : "text-emerald-700 dark:text-emerald-300"}`}>
            {formatMoney(Math.abs(totalPendiente))}
          </p>
          <p className="mt-1.5 text-[11px] text-[var(--overview-muted)]">
            {tieneDeuda
              ? `${periodosPendientes} ${periodosPendientes === 1 ? "período pendiente" : "períodos pendientes"}`
              : saldoAFavor ? "Crédito disponible en la cuenta" : "Cuenta al día"}
          </p>
        </div>
        <WalletCards className={`mt-0.5 h-4 w-4 shrink-0 ${tieneDeuda ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`} />
      </div>
      {vieneDeCircuitoPago ? (
        <Link
          href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
          className="mt-3.5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[6px] border border-transparent bg-[var(--overview-blue)] px-3 text-[13px] font-medium text-white transition hover:brightness-95 dark:border-blue-500/60 dark:bg-blue-600 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--overview-blue)]"
          style={{ color: "#ffffff" }}
        >
          <CreditCard className="h-4 w-4" />
          Registrar pago
        </Link>
      ) : null}
    </section>
  );
}

function ClienteResumenDesktop({
  cliente,
  tieneDeuda,
  vieneDeCircuitoPago,
}: {
  cliente: any;
  tieneDeuda: boolean;
  vieneDeCircuitoPago: boolean;
}) {
  const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;
  const ubicacion = [cliente.localidad, cliente.provincia].filter(Boolean).join(" · ");

  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex items-start justify-between gap-3 border-b border-[var(--overview-border)] pb-2.5">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Servicio contratado</p>
          <h2 className="mt-0.5 truncate text-[14px] font-medium text-[var(--overview-text)]">
            {cliente.plan?.nombre || "Sin plan asignado"}
          </h2>
          <p className="mt-1 text-[12px] text-[var(--overview-muted)]">
            Abono mensual {cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
          </p>
        </div>
        <span className={`inline-flex shrink-0 items-center rounded-full border px-2 py-1 text-[10px] font-semibold ${
          tieneDeuda
            ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
            : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
        }`}>
          {tieneDeuda ? "Con deuda" : "Al día"}
        </span>
      </div>

      <div className="mt-2.5 grid gap-x-4 gap-y-1.5 text-[11px] leading-4 sm:grid-cols-2">
        <p className="truncate text-[var(--overview-text)]">
          <span className="text-[var(--overview-muted)]">Cliente </span>
          <span className="font-medium">N° {cliente.numeroCliente}</span>
        </p>
        <p className="truncate text-[var(--overview-text)]">
          <span className="text-[var(--overview-muted)]">DNI </span>
          <span className="font-medium">{cliente.dni}</span>
        </p>
        <p className="truncate text-[var(--overview-text)]">
          <span className="text-[var(--overview-muted)]">Dirección </span>
          <span className="font-medium">{cliente.direccion || "Sin cargar"}</span>
        </p>
        <p className="truncate text-[var(--overview-text)]">
          <span className="text-[var(--overview-muted)]">Localidad </span>
          <span className="font-medium">{ubicacion || "Sin cargar"}</span>
        </p>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-[var(--overview-border)] pt-2">
        <span className="text-[11px] text-[var(--overview-muted)]">
          {vieneDeCircuitoPago ? "Cliente validado para cobro" : "Consulta informativa"}
        </span>
        <span className={`text-[11px] font-medium ${cliente.estado === "activo" ? "text-emerald-700 dark:text-emerald-300" : "text-slate-600 dark:text-slate-300"}`}>
          {getEstadoLabel(cliente.estado)}
        </span>
      </div>
    </section>
  );
}

function CuentaDesktopCard({
  cliente,
  totalPendiente,
  tieneDeuda,
  periodosPendientes,
  vieneDeCircuitoPago,
}: {
  cliente: any;
  totalPendiente: number;
  tieneDeuda: boolean;
  periodosPendientes: number;
  vieneDeCircuitoPago: boolean;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Cuenta del cliente</p>
          <h2 className={sectionSubtitleClass}>Deuda pendiente</h2>
          <p className={sectionDescriptionClass}>Saldo y períodos pendientes de pago.</p>
        </div>
        <WalletCards className={`mt-1 h-4 w-4 shrink-0 ${tieneDeuda ? "text-amber-600 dark:text-amber-300" : "text-emerald-600 dark:text-emerald-300"}`} />
      </div>

      <div className={`mt-3 rounded-[7px] border px-3.5 py-3 ${
        tieneDeuda
          ? "border-red-200 bg-red-50/60 dark:border-red-900/60 dark:bg-red-950/20"
          : "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/20"
      }`}>
        <p className="text-[10px] font-medium text-[var(--overview-muted)]">Total pendiente</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
          <p className={`text-[28px] font-medium leading-none tracking-tight ${tieneDeuda ? "text-red-700 dark:text-red-300" : "text-emerald-700 dark:text-emerald-300"}`}>
            {formatMoney(totalPendiente)}
          </p>
          <p className="pb-0.5 text-[11px] text-[var(--overview-muted)]">
            {periodosPendientes} {periodosPendientes === 1 ? "período pendiente" : "períodos pendientes"}
          </p>
        </div>
      </div>

      {vieneDeCircuitoPago ? (
        <Link href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`} className={`${primaryButtonClass} mt-3`} style={{ color: "#ffffff" }}>
          <CreditCard className="h-3.5 w-3.5" style={{ color: "#ffffff" }} />
          <span className="text-[13px] font-medium leading-none" style={{ color: "#ffffff" }}>Registrar pago</span>
        </Link>
      ) : (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] leading-4 text-slate-600 dark:border-slate-700 dark:bg-slate-900/45 dark:text-slate-300">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
          <p>Consulta informativa. Para registrar un pago, iniciá desde el panel del cobrador con DNI exacto.</p>
        </div>
      )}
    </section>
  );
}

function PeriodoBadge({ estadoPeriodo }: { estadoPeriodo: string }) {
  const badge = getPeriodoBadge(estadoPeriodo);

  return (
    <span
      className={`inline-flex h-6 items-center rounded-full border px-2 text-[10px] font-semibold leading-none ${badge.className}`}
    >
      {badge.label}
    </span>
  );
}

function EstadoCuentaListado({ cliente, periodos, movimientos }: { cliente: any; periodos: any[]; movimientos: MovimientoFinancieroSafe[] }) {
  const pagosPorFactura = new Map<string, MovimientoFinancieroSafe[]>();
  for (const movimiento of movimientos) {
    if (movimiento.tipoMovimiento !== "pago" || !movimiento.facturaAsociadaId) continue;
    const pagos = pagosPorFactura.get(movimiento.facturaAsociadaId) || [];
    pagos.push(movimiento);
    pagosPorFactura.set(movimiento.facturaAsociadaId, pagos);
  }
  const estadoPago = (periodo: any, pagos: MovimientoFinancieroSafe[]) => {
    const saldo = Number(periodo.saldoPeriodo || 0);
    const pagado = Number(periodo.totalPagos || 0);
    if (saldo < 0) return { label: "Saldo a favor", classes: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300" };
    if (saldo > 0 && pagado > 0) return { label: "Pago parcial", classes: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/35 dark:text-amber-300" };
    if (saldo > 0) return { label: "Sin pago", classes: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/35 dark:text-red-300" };
    if (pagos.length) return { label: "Pagado", classes: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/35 dark:text-emerald-300" };
    return { label: "Saldado", classes: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300" };
  };
  const detalleHref = (facturaId: string) => `/cobrador/clientes/${cliente.id}/estado-cuenta/${facturaId}`;
  const badge = (status: { label: string; classes: string }) => <span className={`inline-flex h-6 items-center rounded-full border px-2 text-[10px] font-semibold ${status.classes}`}>{status.label}</span>;

  return (
    <section className={`${mobileModuleClass} sm:rounded-[10px] sm:border-[var(--overview-border)] sm:bg-[var(--overview-panel)] sm:p-0 sm:shadow-sm`}>
      <div className="mb-3 flex items-start gap-3 sm:mb-0 sm:border-b sm:border-[var(--overview-border)] sm:bg-[var(--overview-header)] sm:px-4 sm:py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)]"><FileText className="h-4 w-4" /></div>
        <div className="min-w-0"><p className="text-[11px] text-[var(--overview-muted)]">Estado de cuenta</p><h2 className="mt-0.5 text-[13px] font-[500] text-[var(--overview-text)]">Historial de períodos</h2><p className="mt-1 hidden text-[12px] leading-5 text-[var(--overview-muted)] sm:block">Comprobantes, pagos y movimientos asociados.</p></div>
      </div>
      {periodos.length === 0 ? <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-[13px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">Este cliente todavía no tiene períodos facturados.</div> : <>
        <div className="grid gap-2 md:hidden">{periodos.map((periodo) => {
          const pagos = pagosPorFactura.get(periodo.facturaId) || [];
          const status = estadoPago(periodo, pagos);
          const debe = Number(periodo.importeOriginal || 0) + Number(periodo.totalNotasDebito || 0);
          const haber = Number(periodo.totalNotasCredito || 0) + Number(periodo.totalPagos || 0);
          const saldo = Number(periodo.saldoPeriodo || 0);
          const saldoTone = saldo > 0 ? "text-red-700 dark:text-red-300" : saldo < 0 ? "text-blue-700 dark:text-blue-300" : "text-emerald-700 dark:text-emerald-300";
          return <details key={periodo.facturaId} className="group rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-bg)] open:bg-[var(--overview-panel)]">
            <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-2.5 px-3 py-2.5 [&::-webkit-details-marker]:hidden">
              <div className="min-w-0 flex-1"><p className="truncate text-[13px] font-medium text-[var(--overview-text)]">{periodo.periodoLabel}</p><p className="mt-0.5 truncate text-[10px] text-[var(--overview-muted)]">Comp. N° {periodo.numeroComprobante}</p></div>
              <div className="shrink-0 text-right"><p className="mb-0.5 text-[9px] text-[var(--overview-muted)]">Saldo</p><p className={`text-[13px] font-medium tabular-nums ${saldoTone}`}>{formatMoney(saldo)}</p><div className="mt-1">{badge(status)}</div></div>
              <ChevronDown aria-hidden="true" className="ml-0.5 h-4 w-4 shrink-0 text-[var(--overview-muted)] transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-[var(--overview-border)] px-3 pb-3 pt-2.5">
              {periodo.concepto ? <p className="mb-2.5 break-words text-[11px] leading-4 text-[var(--overview-muted)]">{periodo.concepto}</p> : null}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-[5px] border border-red-200/80 bg-red-50/70 px-2.5 py-2 text-red-700 dark:border-red-900/60 dark:bg-red-950/25 dark:text-red-300"><p className="text-[9px] font-medium uppercase tracking-[0.08em] opacity-75">Debe</p><p className="mt-0.5 text-[11px] font-semibold tabular-nums">{formatMoney(debe)}</p></div>
                <div className="rounded-[5px] border border-emerald-200/80 bg-emerald-50/70 px-2.5 py-2 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/25 dark:text-emerald-300"><p className="text-[9px] font-medium uppercase tracking-[0.08em] opacity-75">Haber</p><p className="mt-0.5 text-[11px] font-semibold tabular-nums">{formatMoney(haber)}</p></div>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <Link href={detalleHref(periodo.facturaId)} aria-label="Ver movimientos del período" title="Ver movimientos" className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--overview-border)] bg-[var(--overview-button)] text-[var(--overview-text)] transition hover:bg-[var(--overview-soft)]"><Eye className="h-4 w-4" /></Link>
                {pagos.length === 1 ? <a href={`/api/comprobantes/pagos/${pagos[0].id}/pdf?size=a4&download=1`} aria-label="Descargar recibo de pago" title="Descargar recibo" className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--overview-border)] bg-[var(--overview-button)] text-[var(--overview-text)] transition hover:bg-[var(--overview-soft)]"><FileText className="h-4 w-4" /></a> : pagos.length > 1 ? <Link href={detalleHref(periodo.facturaId)} aria-label={`Ver ${pagos.length} recibos de pago`} title={`Ver ${pagos.length} recibos`} className="relative inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--overview-border)] bg-[var(--overview-button)] text-[var(--overview-text)] transition hover:bg-[var(--overview-soft)]"><FileText className="h-4 w-4" /><span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-semibold text-white">{pagos.length}</span></Link> : null}
                <span className="ml-auto text-[10px] text-[var(--overview-muted)]">{pagos.length ? `${pagos.length} ${pagos.length === 1 ? "pago" : "pagos"}` : "Sin pagos registrados"}</span>
              </div>
            </div>
          </details>;
        })}</div>
        <div className="hidden overflow-hidden rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-panel)] md:block">
          <div className="grid grid-cols-[88px_minmax(220px,1fr)_130px_130px_130px_120px_88px] items-center border-b border-[var(--overview-border)] bg-[var(--overview-header)] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--overview-muted)]">
            <span className="text-right">Comprob.</span>
            <span className="pl-4">Período</span>
            <span className="text-right text-red-700 dark:text-red-300">Debe</span>
            <span className="text-right text-emerald-700 dark:text-emerald-300">Haber</span>
            <span className="text-right">Saldo</span>
            <span className="text-center">Estado</span>
            <span className="text-right">Acciones</span>
          </div>
          {periodos.map((periodo, index) => {
            const pagos = pagosPorFactura.get(periodo.facturaId) || [];
            const status = estadoPago(periodo, pagos);
            const debe = Number(periodo.importeOriginal || 0) + Number(periodo.totalNotasDebito || 0);
            const haber = Number(periodo.totalNotasCredito || 0) + Number(periodo.totalPagos || 0);
            const saldo = Number(periodo.saldoPeriodo || 0);
            const saldoTone = saldo > 0 ? "text-red-700 dark:text-red-300" : saldo < 0 ? "text-blue-700 dark:text-blue-300" : "text-emerald-700 dark:text-emerald-300";
            return (
              <div
                key={periodo.facturaId}
                className={`grid min-h-[60px] grid-cols-[88px_minmax(220px,1fr)_130px_130px_130px_120px_88px] items-center border-b border-[var(--overview-border)] px-3 py-2 last:border-b-0 ${index % 2 === 0 ? "bg-[var(--overview-bg)]" : "bg-[var(--overview-panel)]"} hover:bg-[var(--overview-soft)]`}
              >
                <p className="text-right text-[12px] font-medium text-[var(--overview-text)]">
                  N° {periodo.numeroComprobante}
                </p>
                <div className="min-w-0 pl-4">
                  <p className="truncate text-[13px] font-semibold text-[var(--overview-text)]">
                    {periodo.periodoLabel}
                  </p>
                  <p className="mt-0.5 truncate text-[12px] text-[var(--overview-muted)]">
                    {periodo.concepto || "Período facturado"}
                  </p>
                </div>
                <p className="text-right text-[12px] font-semibold tabular-nums text-red-700 dark:text-red-300">
                  {formatMoney(debe)}
                </p>
                <p className="text-right text-[12px] font-semibold tabular-nums text-emerald-700 dark:text-emerald-300">
                  {formatMoney(haber)}
                </p>
                <p className={`text-right text-[13px] font-semibold tabular-nums ${saldoTone}`}>
                  {formatMoney(saldo)}
                </p>
                <div className="flex justify-center">{badge(status)}</div>
                <div className="flex items-center justify-end gap-1.5">
                  <Link
                    href={detalleHref(periodo.facturaId)}
                    aria-label="Ver movimientos del período"
                    title="Ver movimientos"
                    className="inline-flex h-8 w-9 items-center justify-center rounded-[6px] border border-[var(--overview-border)] bg-[var(--overview-button)] text-[var(--overview-text)] transition hover:bg-[var(--overview-soft)]"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  {pagos.length === 1 ? (
                    <a
                      href={`/api/comprobantes/pagos/${pagos[0].id}/pdf?size=a4&download=1`}
                      aria-label="Descargar recibo de pago"
                      title="Descargar recibo"
                      className="inline-flex h-8 w-9 items-center justify-center rounded-[6px] border border-[var(--overview-border)] bg-[var(--overview-button)] text-[var(--overview-text)] transition hover:bg-[var(--overview-soft)]"
                    >
                      <FileText className="h-4 w-4" />
                    </a>
                  ) : pagos.length > 1 ? (
                    <Link
                      href={detalleHref(periodo.facturaId)}
                      aria-label={`Ver ${pagos.length} recibos de pago`}
                      title={`Ver ${pagos.length} recibos`}
                      className="relative inline-flex h-8 w-9 items-center justify-center rounded-[6px] border border-[var(--overview-border)] bg-[var(--overview-button)] text-[var(--overview-text)] transition hover:bg-[var(--overview-soft)]"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-semibold text-white">
                        {pagos.length}
                      </span>
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </>}
    </section>
  );
}

export default async function CobradorClientePage({
  params,
  searchParams,
}: CobradorClientePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const resumen = await obtenerResumenClienteParaCobrador(params.id);

  if (!resumen) {
    notFound();
  }

  const { cliente, estadoCuenta, totalPendiente } = resumen;
  const periodos = estadoCuenta.periodos || [];

  const tieneDeuda = Number(totalPendiente || 0) > 0;
  const periodosPendientes = contarPeriodosPendientes(periodos);
  const dniHabilitante = limpiarDni(searchParams?.dni);

  const vieneDeCircuitoPago =
    searchParams?.modo === "pago" && dniHabilitante === cliente.dni;

  return (
    <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
      <div className="mx-auto w-full max-w-7xl">
        <div className="sm:hidden">
          <div className={mobileScreenClass}>
            <ClienteHeroMobile
              cliente={cliente}
              tieneDeuda={tieneDeuda}
              vieneDeCircuitoPago={vieneDeCircuitoPago}
            />

            <CuentaMobileCard
              cliente={cliente}
              totalPendiente={totalPendiente}
              tieneDeuda={tieneDeuda}
              periodosPendientes={periodosPendientes}
              vieneDeCircuitoPago={vieneDeCircuitoPago}
            />

            <div className="mt-2.5">
              <EstadoCuentaListado cliente={cliente} periodos={periodos} movimientos={estadoCuenta.movimientos || []} />
            </div>
          </div>
        </div>

        <div className="hidden space-y-3 sm:block">
          <HeaderClienteCobrador vieneDeCircuitoPago={vieneDeCircuitoPago} />

          <div className="grid items-start gap-3 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.85fr)]">
            <CuentaDesktopCard
              cliente={cliente}
              totalPendiente={totalPendiente}
              tieneDeuda={tieneDeuda}
              periodosPendientes={periodosPendientes}
              vieneDeCircuitoPago={vieneDeCircuitoPago}
            />
            <ClienteResumenDesktop
              cliente={cliente}
              tieneDeuda={tieneDeuda}
              vieneDeCircuitoPago={vieneDeCircuitoPago}
            />
          </div>

          <EstadoCuentaListado cliente={cliente} periodos={periodos} movimientos={estadoCuenta.movimientos || []} />
        </div>
      </div>
    </PageShell>
  );
}

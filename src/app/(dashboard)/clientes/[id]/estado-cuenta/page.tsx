// // src/app/(dashboard)/clientes/[id]/estado-cuenta/page.tsx

// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   CheckCircle2,
//   FileText,
//   MinusCircle,
//   PlusCircle,
//   ReceiptText,
//   UserRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { EstadoCuentaTable } from "@/components/tables/EstadoCuentaTable";
// import { obtenerClientePorId } from "@/services/cliente.service";
// import { obtenerEstadoCuentaCliente } from "@/services/movimiento-financiero.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// type EstadoCuentaPageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Estado de cuenta",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof ReceiptText;
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
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatCompactMoney(value: number) {
//   const amount = Number(value || 0);
//   const sign = amount < 0 ? "-" : "";
//   const abs = Math.abs(amount);

//   if (abs >= 1_000_000) {
//     return `${sign}$ ${(abs / 1_000_000).toLocaleString("es-AR", {
//       maximumFractionDigits: 1,
//     })} M`;
//   }

//   const integerPart = Math.round(abs)
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `${sign}$ ${integerPart}`;
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

// function estadoClienteLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   if (estado === "suspendido") return "Suspendido";
//   return "Baja";
// }

// function estadoCuentaLabel(saldo: number) {
//   if (saldo > 0) return "Pendiente";
//   if (saldo < 0) return "A favor";
//   return "Al día";
// }

// function estadoCuentaTone(saldo: number): "emerald" | "amber" | "red" {
//   if (saldo > 0) return "red";
//   if (saldo < 0) return "amber";
//   return "emerald";
// }

// export default async function EstadoCuentaPage({
//   params,
// }: EstadoCuentaPageProps) {
//   const [cliente, estadoCuenta] = await Promise.all([
//     obtenerClientePorId(params.id),
//     obtenerEstadoCuentaCliente(params.id),
//   ]);

//   if (!cliente || !estadoCuenta) {
//     notFound();
//   }

//   const nombreCompleto =
//     `${cliente.apellido || ""}, ${cliente.nombre || ""}`.trim() ||
//     "Cliente sin nombre";

//   const cantidadPeriodos = estadoCuenta.periodos.length;
//   const periodosPendientes = estadoCuenta.periodos.filter(
//     (periodo) => periodo.estadoPeriodo === "pendiente",
//   ).length;
//   const periodosCancelados = estadoCuenta.periodos.filter(
//     (periodo) => periodo.estadoPeriodo === "cancelado",
//   ).length;
//   const periodosAFavor = estadoCuenta.periodos.filter(
//     (periodo) => periodo.estadoPeriodo === "a_favor",
//   ).length;

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Saldo"
//           shortTitle="Saldo"
//           value={formatCompactMoney(estadoCuenta.saldo)}
//           description="Saldo total del cliente."
//           icon={WalletCards}
//           tone={estadoCuentaTone(estadoCuenta.saldo)}
//         />

//         <StatCard
//           title="Períodos"
//           shortTitle="Per."
//           value={String(cantidadPeriodos)}
//           description="Períodos facturados."
//           icon={ReceiptText}
//           tone="cyan"
//         />

//         <StatCard
//           title="Pendientes"
//           shortTitle="Pend."
//           value={String(periodosPendientes)}
//           description="Períodos con saldo pendiente."
//           icon={MinusCircle}
//           tone={periodosPendientes > 0 ? "red" : "emerald"}
//         />

//         <StatCard
//           title="Estado"
//           value={estadoCuentaLabel(estadoCuenta.saldo)}
//           description="Estado general de la cuenta."
//           icon={CheckCircle2}
//           tone={estadoCuentaTone(estadoCuenta.saldo)}
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Cliente"
//             value={`N° ${cliente.numeroCliente}`}
//             description="Número interno del cliente."
//             icon={UserRound}
//             tone="violet"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//               <div>
//                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Estado de cuenta
//                 </p>

//                 <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                   Cuenta del cliente
//                 </h1>

//                 <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                   {nombreCompleto} · DNI {cliente.dni || "-"} · Cliente N°{" "}
//                   {cliente.numeroCliente}
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
//                 <Link
//                   href={`/clientes/${cliente.id}/nota-debito`}
//                   className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 text-[11px] font-medium text-amber-700 shadow-sm transition hover:bg-amber-100 active:scale-[0.99] dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
//                 >
//                   <PlusCircle className="h-3.5 w-3.5" />
//                   Débito
//                 </Link>

//                 <Link
//                   href={`/clientes/${cliente.id}/nota-credito`}
//                   className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-[11px] font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-100 active:scale-[0.99] dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
//                 >
//                   <MinusCircle className="h-3.5 w-3.5" />
//                   Crédito
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
//             <div className="mb-3 flex items-start gap-3">
//               <div
//                 className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
//                   estadoCuenta.saldo > 0
//                     ? "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"
//                     : estadoCuenta.saldo < 0
//                       ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
//                       : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
//                 }`}
//               >
//                 <WalletCards className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Resumen financiero
//                 </p>

//                 <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                   {formatMoney(estadoCuenta.saldo)}
//                 </h2>

//                 <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   {estadoCuenta.saldo > 0
//                     ? "El cliente registra saldo pendiente."
//                     : estadoCuenta.saldo < 0
//                       ? "El cliente registra saldo a favor."
//                       : "El cliente no registra saldo pendiente."}
//                 </p>
//               </div>
//             </div>

//             <div className="grid gap-3 sm:grid-cols-3">
//               <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                   Total debe
//                 </p>

//                 <p className="mt-1 truncate text-sm font-medium text-red-700 dark:text-red-300">
//                   {formatMoney(estadoCuenta.totalDebe)}
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                   Total haber
//                 </p>

//                 <p className="mt-1 truncate text-sm font-medium text-emerald-700 dark:text-emerald-300">
//                   {formatMoney(estadoCuenta.totalHaber)}
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                   Saldo
//                 </p>

//                 <p
//                   className={`mt-1 truncate text-sm font-medium ${
//                     estadoCuenta.saldo > 0
//                       ? "text-red-700 dark:text-red-300"
//                       : estadoCuenta.saldo < 0
//                         ? "text-amber-700 dark:text-amber-300"
//                         : "text-emerald-700 dark:text-emerald-300"
//                   }`}
//                 >
//                   {formatMoney(estadoCuenta.saldo)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
//             <div className="mb-3 flex items-start gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                 <FileText className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Períodos facturados
//                 </p>

//                 <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                   Historial por período
//                 </h2>

//                 <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   Entrá al detalle para ver factura, notas asociadas y pagos
//                   aplicados.
//                 </p>
//               </div>
//             </div>

//             <EstadoCuentaTable
//               clienteId={cliente.id}
//               periodos={estadoCuenta.periodos}
//             />
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Resumen
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Información de cuenta
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Cliente
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   N° {cliente.numeroCliente}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Estado cliente
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                     cliente.estado === "activo"
//                       ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                       : cliente.estado === "suspendido"
//                         ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
//                         : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                   }`}
//                 >
//                   {estadoClienteLabel(cliente.estado)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Plan
//                 </span>

//                 <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//                   {cliente.plan?.nombre || "Sin plan"}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Períodos
//                 </span>

//                 <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                   {cantidadPeriodos}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Cancelados
//                 </span>

//                 <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                   {periodosCancelados}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   A favor
//                 </span>

//                 <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                   {periodosAFavor}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Saldo final
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                     estadoCuenta.saldo > 0
//                       ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                       : estadoCuenta.saldo < 0
//                         ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
//                         : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                   }`}
//                 >
//                   {formatMoney(estadoCuenta.saldo)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Acciones
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Movimientos manuales
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               <Link
//                 href={`/clientes/${cliente.id}/nota-debito`}
//                 className="group flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs font-medium text-amber-700 transition hover:bg-amber-100 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
//               >
//                 <span className="flex min-w-0 items-center gap-2.5">
//                   <PlusCircle className="h-3.5 w-3.5 shrink-0" />
//                   Nota débito
//                 </span>
//               </Link>

//               <Link
//                 href={`/clientes/${cliente.id}/nota-credito`}
//                 className="group flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
//               >
//                 <span className="flex min-w-0 items-center gap-2.5">
//                   <MinusCircle className="h-3.5 w-3.5 shrink-0" />
//                   Nota crédito
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/clientes/[id]/estado-cuenta/page.tsx

// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   ArrowRight,
//   CheckCircle2,
//   FileText,
//   MinusCircle,
//   PlusCircle,
//   ReceiptText,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { EstadoCuentaTable } from "@/components/tables/EstadoCuentaTable";
// import { obtenerClientePorId } from "@/services/cliente.service";
// import { obtenerEstadoCuentaCliente } from "@/services/movimiento-financiero.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// type EstadoCuentaPageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Estado de cuenta",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof ReceiptText;
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
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function estadoClienteLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   if (estado === "suspendido") return "Suspendido";
//   return "Baja";
// }

// function estadoCuentaLabel(saldo: number) {
//   if (saldo > 0) return "Pendiente";
//   if (saldo < 0) return "A favor";
//   return "Al día";
// }

// function estadoCuentaTone(saldo: number): "emerald" | "amber" | "red" {
//   if (saldo > 0) return "red";
//   if (saldo < 0) return "amber";
//   return "emerald";
// }

// function saldoTexto(saldo: number) {
//   if (saldo > 0) {
//     return "El cliente registra saldo pendiente de pago.";
//   }

//   if (saldo < 0) {
//     return "El cliente tiene saldo a favor.";
//   }

//   return "El cliente no registra saldo pendiente.";
// }

// function getNombreCompleto(cliente: {
//   apellido?: string | null;
//   nombre?: string | null;
// }) {
//   const apellido = String(cliente.apellido || "").trim();
//   const nombre = String(cliente.nombre || "").trim();

//   const completo = `${apellido}, ${nombre}`
//     .replace(/^,\s*/, "")
//     .replace(/,\s*$/, "")
//     .trim();

//   return completo || "Cliente sin nombre";
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

// function MobileHeader({
//   cliente,
//   nombreCompleto,
//   saldo,
// }: {
//   cliente: any;
//   nombreCompleto: string;
//   saldo: number;
// }) {
//   return (
//     <section className={`${cardBase} p-3`}>
//       <div className="flex items-start gap-3">
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           <WalletCards className="h-5 w-5" />
//         </div>

//         <div className="min-w-0 flex-1">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Estado de cuenta
//           </p>

//           <h1 className="mt-0.5 truncate text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             {nombreCompleto}
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             N° {cliente.numeroCliente} · DNI {cliente.dni || "-"}
//           </p>

//           <div className="mt-2 flex flex-wrap gap-2">
//             <span
//               className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//                 saldo > 0
//                   ? "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
//                   : saldo < 0
//                     ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300"
//                     : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
//               }`}
//             >
//               {estadoCuentaLabel(saldo)}
//             </span>

//             <span className="inline-flex rounded-full border border-cyan-300 bg-cyan-50 px-2.5 py-1 text-[10px] font-medium text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-300">
//               {cliente.plan?.nombre || "Sin plan"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function MobileSaldoCard({
//   saldo,
//   cantidadPeriodos,
//   periodosPendientes,
//   periodosCancelados,
//   clienteId,
// }: {
//   saldo: number;
//   cantidadPeriodos: number;
//   periodosPendientes: number;
//   periodosCancelados: number;
//   clienteId: string;
// }) {
//   return (
//     <section className={`${cardBase} p-3`}>
//       <div className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none">
//         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
//           Saldo actual
//         </p>

//         <p
//           className={`mt-1 text-3xl font-semibold tracking-tight ${
//             saldo > 0
//               ? "text-red-700 dark:text-red-300"
//               : saldo < 0
//                 ? "text-amber-700 dark:text-amber-300"
//                 : "text-emerald-700 dark:text-emerald-300"
//           }`}
//         >
//           {formatMoney(saldo)}
//         </p>

//         <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//           {saldoTexto(saldo)}
//         </p>

//         <div className="mt-3 grid grid-cols-3 gap-2">
//           <div className="rounded-2xl border border-slate-300 bg-slate-50 px-2 py-2 text-center dark:border-slate-800 dark:bg-slate-900/70">
//             <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
//               Períodos
//             </p>

//             <p className="mt-1 truncate text-xs font-semibold text-slate-950 dark:text-white">
//               {cantidadPeriodos}
//             </p>
//           </div>

//           <div className="rounded-2xl border border-red-300 bg-red-50 px-2 py-2 text-center dark:border-red-900/70 dark:bg-red-950/30">
//             <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-red-700 dark:text-red-300">
//               Pend.
//             </p>

//             <p className="mt-1 truncate text-xs font-semibold text-red-700 dark:text-red-300">
//               {periodosPendientes}
//             </p>
//           </div>

//           <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-2 py-2 text-center dark:border-emerald-900/70 dark:bg-emerald-950/30">
//             <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
//               Canc.
//             </p>

//             <p className="mt-1 truncate text-xs font-semibold text-emerald-700 dark:text-emerald-300">
//               {periodosCancelados}
//             </p>
//           </div>
//         </div>

//         <div className="mt-3 grid grid-cols-2 gap-2">
//           <Link
//             href={`/clientes/${clienteId}/nota-debito`}
//             className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 text-xs font-medium text-amber-700 transition hover:bg-amber-100 active:scale-[0.99] dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
//           >
//             <PlusCircle className="h-3.5 w-3.5" />
//             Débito
//           </Link>

//           <Link
//             href={`/clientes/${clienteId}/nota-credito`}
//             className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 active:scale-[0.99] dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
//           >
//             <MinusCircle className="h-3.5 w-3.5" />
//             Crédito
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ResumenAside({
//   cliente,
//   saldo,
//   cantidadPeriodos,
//   periodosPendientes,
//   periodosCancelados,
//   periodosAFavor,
// }: {
//   cliente: any;
//   saldo: number;
//   cantidadPeriodos: number;
//   periodosPendientes: number;
//   periodosCancelados: number;
//   periodosAFavor: number;
// }) {
//   return (
//     <div className={`${cardBase} p-3.5`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div>
//           <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Resumen
//           </p>

//           <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//             Información de cuenta
//           </h2>
//         </div>

//         <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//           <WalletCards className="h-4 w-4" />
//         </div>
//       </div>

//       <div className={innerCardBase}>
//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Cliente
//           </span>

//           <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//             N° {cliente.numeroCliente}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Estado cliente
//           </span>

//           <span
//             className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//               cliente.estado === "activo"
//                 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                 : cliente.estado === "suspendido"
//                   ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
//                   : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//             }`}
//           >
//             {estadoClienteLabel(cliente.estado)}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Plan
//           </span>

//           <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//             {cliente.plan?.nombre || "Sin plan"}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Períodos
//           </span>

//           <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//             {cantidadPeriodos}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Pendientes
//           </span>

//           <span className="text-xs font-medium text-red-700 dark:text-red-300">
//             {periodosPendientes}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Cancelados
//           </span>

//           <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//             {periodosCancelados}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             A favor
//           </span>

//           <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//             {periodosAFavor}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Saldo final
//           </span>

//           <span
//             className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//               saldo > 0
//                 ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                 : saldo < 0
//                   ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
//                   : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//             }`}
//           >
//             {formatMoney(saldo)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AccionesAside({ clienteId }: { clienteId: string }) {
//   return (
//     <div className={`${cardBase} p-3.5`}>
//       <div className="mb-3">
//         <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//           Acciones
//         </p>

//         <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//           Movimientos manuales
//         </h2>
//       </div>

//       <div className="grid gap-2">
//         <Link
//           href={`/clientes/${clienteId}/nota-debito`}
//           className="group flex items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-3 py-2.5 text-xs font-medium text-amber-700 transition hover:bg-amber-100 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
//         >
//           <span className="flex min-w-0 items-center gap-2.5">
//             <PlusCircle className="h-3.5 w-3.5 shrink-0" />
//             Nota débito
//           </span>

//           <ArrowRight className="h-3.5 w-3.5 shrink-0 transition group-hover:translate-x-0.5" />
//         </Link>

//         <Link
//           href={`/clientes/${clienteId}/nota-credito`}
//           className="group flex items-center justify-between gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
//         >
//           <span className="flex min-w-0 items-center gap-2.5">
//             <MinusCircle className="h-3.5 w-3.5 shrink-0" />
//             Nota crédito
//           </span>

//           <ArrowRight className="h-3.5 w-3.5 shrink-0 transition group-hover:translate-x-0.5" />
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default async function EstadoCuentaPage({
//   params,
// }: EstadoCuentaPageProps) {
//   const [cliente, estadoCuenta] = await Promise.all([
//     obtenerClientePorId(params.id),
//     obtenerEstadoCuentaCliente(params.id),
//   ]);

//   if (!cliente || !estadoCuenta) {
//     notFound();
//   }

//   const nombreCompleto = getNombreCompleto(cliente);

//   const cantidadPeriodos = estadoCuenta.periodos.length;
//   const periodosPendientes = estadoCuenta.periodos.filter(
//     (periodo) => periodo.estadoPeriodo === "pendiente",
//   ).length;
//   const periodosCancelados = estadoCuenta.periodos.filter(
//     (periodo) => periodo.estadoPeriodo === "cancelado",
//   ).length;
//   const periodosAFavor = estadoCuenta.periodos.filter(
//     (periodo) => periodo.estadoPeriodo === "a_favor",
//   ).length;

//   return (
//     <PageShell maxWidth="wide">
//       <div className="space-y-3 lg:hidden">
//         <MobileHeader
//           cliente={cliente}
//           nombreCompleto={nombreCompleto}
//           saldo={estadoCuenta.saldo}
//         />

//         <MobileSaldoCard
//           saldo={estadoCuenta.saldo}
//           cantidadPeriodos={cantidadPeriodos}
//           periodosPendientes={periodosPendientes}
//           periodosCancelados={periodosCancelados}
//           clienteId={cliente.id}
//         />

//         <section className={`${cardBase} p-3`}>
//           <div className="mb-3 flex items-start gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//               <FileText className="h-4 w-4" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Períodos
//               </p>

//               <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                 Facturación del cliente
//               </h2>

//               <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                 Entrá a un período para ver pagos, notas y detalle del saldo.
//               </p>
//             </div>
//           </div>

//           <EstadoCuentaTable
//             clienteId={cliente.id}
//             periodos={estadoCuenta.periodos}
//           />
//         </section>
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Saldo"
//             value={formatMoney(estadoCuenta.saldo)}
//             description="Saldo total del cliente."
//             icon={WalletCards}
//             tone={estadoCuentaTone(estadoCuenta.saldo)}
//           />

//           <StatCard
//             title="Períodos"
//             value={String(cantidadPeriodos)}
//             description="Períodos facturados."
//             icon={ReceiptText}
//             tone="cyan"
//           />

//           <StatCard
//             title="Pendientes"
//             value={String(periodosPendientes)}
//             description="Períodos con deuda."
//             icon={PlusCircle}
//             tone={periodosPendientes > 0 ? "red" : "emerald"}
//           />

//           <StatCard
//             title="Cancelados"
//             value={String(periodosCancelados)}
//             description="Períodos sin deuda."
//             icon={CheckCircle2}
//             tone="emerald"
//           />

//           <StatCard
//             title="Estado"
//             value={estadoCuentaLabel(estadoCuenta.saldo)}
//             description="Estado general."
//             icon={Wifi}
//             tone={estadoCuentaTone(estadoCuenta.saldo)}
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Estado de cuenta
//                     </p>

//                     <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                       Períodos facturados
//                     </h1>

//                     <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                       {nombreCompleto} · DNI {cliente.dni || "-"} · Cliente N°{" "}
//                       {cliente.numeroCliente}
//                     </p>
//                   </div>

//                   <div className="flex shrink-0 gap-2">
//                     <Link
//                       href={`/clientes/${cliente.id}/nota-debito`}
//                       className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 text-xs font-medium text-amber-700 shadow-sm transition hover:bg-amber-100 active:scale-[0.99] dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
//                     >
//                       <PlusCircle className="h-3.5 w-3.5" />
//                       Débito
//                     </Link>

//                     <Link
//                       href={`/clientes/${cliente.id}/nota-credito`}
//                       className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3 text-xs font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-100 active:scale-[0.99] dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
//                     >
//                       <MinusCircle className="h-3.5 w-3.5" />
//                       Crédito
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               <div className={`${cardBase} mt-3 p-3.5`}>
//                 <div className="mb-3 flex items-start gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                     <FileText className="h-4 w-4" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Facturación
//                     </p>

//                     <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                       Resumen por período
//                     </h2>

//                     <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                       Cada fila representa un período facturado. Para ver pagos,
//                       notas de crédito o débito, entrá al detalle del período.
//                     </p>
//                   </div>
//                 </div>

//                 <EstadoCuentaTable
//                   clienteId={cliente.id}
//                   periodos={estadoCuenta.periodos}
//                 />
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <ResumenAside
//                 cliente={cliente}
//                 saldo={estadoCuenta.saldo}
//                 cantidadPeriodos={cantidadPeriodos}
//                 periodosPendientes={periodosPendientes}
//                 periodosCancelados={periodosCancelados}
//                 periodosAFavor={periodosAFavor}
//               />

//               <AccionesAside clienteId={cliente.id} />

//               <div className="rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3.5 text-xs leading-5 text-slate-600 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:text-slate-400 dark:shadow-none">
//                 <p className="font-medium text-slate-950 dark:text-white">
//                   Lectura rápida
//                 </p>

//                 <p className="mt-1">
//                   Esta vista muestra solo los períodos facturados. Para conocer
//                   cómo se formó el saldo de un período, abrí su detalle.
//                 </p>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/clientes/[id]/estado-cuenta/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MinusCircle,
  PlusCircle,
  ReceiptText,
  WalletCards,
  Wifi,
} from "lucide-react";
import { EstadoCuentaTable } from "@/components/tables/EstadoCuentaTable";
import { obtenerClientePorId } from "@/services/cliente.service";
import { obtenerEstadoCuentaCliente } from "@/services/movimiento-financiero.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

type EstadoCuentaPageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Estado de cuenta",
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

const buttonSecondaryClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900";

const debitButtonClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 text-[12px] font-medium text-amber-700 shadow-sm transition hover:bg-amber-100 active:scale-[0.99] dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70";

const creditButtonClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3 text-[12px] font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-100 active:scale-[0.99] dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70";

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function estadoClienteLabel(estado: string) {
  if (estado === "activo") return "Activo";
  if (estado === "suspendido") return "Suspendido";
  return "Baja";
}

function estadoClienteTone(estado: string): "success" | "warning" | "danger" {
  if (estado === "activo") return "success";
  if (estado === "suspendido") return "warning";
  return "danger";
}

function estadoCuentaLabel(saldo: number) {
  if (saldo > 0) return "Pendiente";
  if (saldo < 0) return "A favor";
  return "Al día";
}

function estadoCuentaTone(saldo: number): "success" | "warning" | "danger" {
  if (saldo > 0) return "danger";
  if (saldo < 0) return "warning";
  return "success";
}

function saldoTexto(saldo: number) {
  if (saldo > 0) {
    return "El cliente registra saldo pendiente de pago.";
  }

  if (saldo < 0) {
    return "El cliente tiene saldo a favor.";
  }

  return "El cliente no registra saldo pendiente.";
}

function getNombreCompleto(cliente: {
  apellido?: string | null;
  nombre?: string | null;
}) {
  const apellido = String(cliente.apellido || "").trim();
  const nombre = String(cliente.nombre || "").trim();

  const completo = `${apellido}, ${nombre}`
    .replace(/^,\s*/, "")
    .replace(/,\s*$/, "")
    .trim();

  return completo || "Cliente sin nombre";
}

function BackButton() {
  return (
    <Link
      href="/clientes"
      className="hidden h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900 sm:inline-flex"
    >
      Volver
    </Link>
  );
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "primary" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    neutral:
      "border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300",
    primary:
      "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
    success:
      "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300",
    warning:
      "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300",
    danger:
      "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300",
  }[tone];

  return (
    <span
      className={`inline-flex h-7 items-center rounded-full border px-2.5 text-[10px] font-semibold leading-none ${toneClass}`}
    >
      {children}
    </span>
  );
}

function HeaderCuenta({
  cliente,
  nombreCompleto,
  saldo,
}: {
  cliente: {
    numeroCliente: number;
    dni?: string | null;
    estado: string;
    plan?: {
      nombre: string;
    } | null;
  };
  nombreCompleto: string;
  saldo: number;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Estado de cuenta</p>

          <h1 className={sectionSubtitleClass}>Cuenta del cliente</h1>

          <p className={`${sectionDescriptionClass} max-w-3xl truncate`}>
            {nombreCompleto} · N° {cliente.numeroCliente} · DNI{" "}
            {cliente.dni || "-"}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 lg:items-end">
          <BackButton />

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Badge tone="primary">N° {cliente.numeroCliente}</Badge>

            <Badge tone={estadoClienteTone(cliente.estado)}>
              {estadoClienteLabel(cliente.estado)}
            </Badge>

            <Badge tone={estadoCuentaTone(saldo)}>
              {estadoCuentaLabel(saldo)}
            </Badge>

            <Badge tone={cliente.plan ? "success" : "warning"}>
              {cliente.plan?.nombre || "Sin plan"}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
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

function ResumenFinanciero({
  saldo,
  totalDebe,
  totalHaber,
  cantidadPeriodos,
  periodosPendientes,
  periodosCancelados,
  periodosAFavor,
}: {
  saldo: number;
  totalDebe: number;
  totalHaber: number;
  cantidadPeriodos: number;
  periodosPendientes: number;
  periodosCancelados: number;
  periodosAFavor: number;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <WalletCards className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className={sectionTitleClass}>Resumen financiero</p>

          <p className={sectionDescriptionClass}>{saldoTexto(saldo)}</p>
        </div>
      </div>

      <div className="md:hidden">
        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-3 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Saldo final
          </p>

          <p
            className={`mt-1 truncate text-[22px] font-semibold ${
              saldo > 0
                ? "text-red-700 dark:text-red-300"
                : saldo < 0
                  ? "text-amber-700 dark:text-amber-300"
                  : "text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {formatMoney(saldo)}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950/60">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Pendientes
              </p>

              <p
                className={`mt-1 text-[16px] font-semibold ${
                  periodosPendientes > 0
                    ? "text-red-700 dark:text-red-300"
                    : "text-emerald-700 dark:text-emerald-300"
                }`}
              >
                {periodosPendientes}
              </p>
            </div>

            <div className="rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950/60">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Períodos
              </p>

              <p className="mt-1 text-[16px] font-semibold text-blue-700 dark:text-blue-300">
                {cantidadPeriodos}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden gap-2 md:grid md:grid-cols-3 xl:grid-cols-6">
        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Total debe
          </p>

          <p className="mt-1 truncate text-[18px] font-semibold text-red-700 dark:text-red-300">
            {formatMoney(totalDebe)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Total haber
          </p>

          <p className="mt-1 truncate text-[18px] font-semibold text-emerald-700 dark:text-emerald-300">
            {formatMoney(totalHaber)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Períodos
          </p>

          <p className="mt-1 truncate text-[18px] font-semibold text-blue-700 dark:text-blue-300">
            {cantidadPeriodos}
          </p>
        </div>

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Pendientes
          </p>

          <p
            className={`mt-1 truncate text-[18px] font-semibold ${
              periodosPendientes > 0
                ? "text-red-700 dark:text-red-300"
                : "text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {periodosPendientes}
          </p>
        </div>

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Cancelados
          </p>

          <p className="mt-1 truncate text-[18px] font-semibold text-emerald-700 dark:text-emerald-300">
            {periodosCancelados}
          </p>
        </div>

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            A favor
          </p>

          <p className="mt-1 truncate text-[18px] font-semibold text-amber-700 dark:text-amber-300">
            {periodosAFavor}
          </p>
        </div>
      </div>
    </section>
  );
}

function FacturacionHeader({ clienteId }: { clienteId: string }) {
  return (
    <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <p className={sectionTitleClass}>Facturación</p>

        <h2 className={sectionSubtitleClass}>Resumen por período</h2>

        <p className={`${sectionDescriptionClass} max-w-3xl`}>
          Cada fila representa un período facturado. Entrá al detalle para ver
          pagos, notas y composición del saldo.
        </p>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:justify-end">
        <Link href={`/clientes/${clienteId}/nota-debito`} className={debitButtonClass}>
          <PlusCircle className="h-3.5 w-3.5" />
          Nota débito
        </Link>

        <Link
          href={`/clientes/${clienteId}/nota-credito`}
          className={creditButtonClass}
        >
          <MinusCircle className="h-3.5 w-3.5" />
          Nota crédito
        </Link>
      </div>
    </div>
  );
}

function FacturacionPanel({
  clienteId,
  periodos,
}: {
  clienteId: string;
  periodos: Parameters<typeof EstadoCuentaTable>[0]["periodos"];
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <FacturacionHeader clienteId={clienteId} />

      <EstadoCuentaTable clienteId={clienteId} periodos={periodos} />
    </section>
  );
}

function ResumenAside({
  cliente,
  saldo,
  cantidadPeriodos,
  periodosPendientes,
  periodosCancelados,
  periodosAFavor,
}: {
  cliente: {
    numeroCliente: number;
    estado: string;
    plan?: {
      nombre: string;
    } | null;
  };
  saldo: number;
  cantidadPeriodos: number;
  periodosPendientes: number;
  periodosCancelados: number;
  periodosAFavor: number;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Resumen</p>

        <h2 className={sectionSubtitleClass}>Información de cuenta</h2>
      </div>

      <div className={innerPanelClass}>
        <ResumenItem
          icon={<ReceiptText className="h-3.5 w-3.5" />}
          label="Cliente"
          value={`N° ${cliente.numeroCliente}`}
          tone="primary"
        />

        <ResumenItem
          icon={<CheckCircle2 className="h-3.5 w-3.5" />}
          label="Estado cliente"
          value={estadoClienteLabel(cliente.estado)}
          tone={estadoClienteTone(cliente.estado)}
        />

        <ResumenItem
          icon={<Wifi className="h-3.5 w-3.5" />}
          label="Plan"
          value={cliente.plan?.nombre || "Sin plan"}
          tone={cliente.plan ? "success" : "warning"}
        />

        <ResumenItem
          icon={<FileText className="h-3.5 w-3.5" />}
          label="Períodos"
          value={cantidadPeriodos}
          tone="primary"
        />

        <ResumenItem
          icon={<PlusCircle className="h-3.5 w-3.5" />}
          label="Pendientes"
          value={periodosPendientes}
          tone={periodosPendientes > 0 ? "danger" : "success"}
        />

        <ResumenItem
          icon={<CheckCircle2 className="h-3.5 w-3.5" />}
          label="Cancelados"
          value={periodosCancelados}
          tone="success"
        />

        <ResumenItem
          icon={<MinusCircle className="h-3.5 w-3.5" />}
          label="A favor"
          value={periodosAFavor}
          tone={periodosAFavor > 0 ? "warning" : "neutral"}
        />

        <ResumenItem
          icon={<WalletCards className="h-3.5 w-3.5" />}
          label="Saldo final"
          value={formatMoney(saldo)}
          tone={estadoCuentaTone(saldo)}
        />
      </div>
    </section>
  );
}

function AccionesAside({ clienteId }: { clienteId: string }) {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Acciones</p>

        <h2 className={sectionSubtitleClass}>Movimientos manuales</h2>
      </div>

      <div className="grid gap-2">
        <Link
          href={`/clientes/${clienteId}/nota-debito`}
          className="group flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 ring-1 ring-white/50 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:ring-slate-800/60 dark:hover:border-amber-900/70 dark:hover:bg-amber-950/30 dark:hover:text-amber-300"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <PlusCircle className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-amber-700 dark:text-slate-400 dark:group-hover:text-amber-300" />
            <span className="truncate">Nota débito</span>
          </span>

          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
        </Link>

        <Link
          href={`/clientes/${clienteId}/nota-credito`}
          className="group flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 ring-1 ring-white/50 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:ring-slate-800/60 dark:hover:border-emerald-900/70 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <MinusCircle className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-emerald-700 dark:text-slate-400 dark:group-hover:text-emerald-300" />
            <span className="truncate">Nota crédito</span>
          </span>

          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

function NotaLectura() {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Lectura rápida</p>

        <h2 className={sectionSubtitleClass}>Detalle del saldo</h2>
      </div>

      <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[12px] leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
        Esta vista muestra los períodos facturados. Para conocer cómo se formó
        el saldo de un período, abrí su detalle.
      </div>
    </section>
  );
}

export default async function EstadoCuentaPage({
  params,
}: EstadoCuentaPageProps) {
  const [cliente, estadoCuenta] = await Promise.all([
    obtenerClientePorId(params.id),
    obtenerEstadoCuentaCliente(params.id),
  ]);

  if (!cliente || !estadoCuenta) {
    notFound();
  }

  const nombreCompleto = getNombreCompleto(cliente);

  const cantidadPeriodos = estadoCuenta.periodos.length;
  const periodosPendientes = estadoCuenta.periodos.filter(
    (periodo) => periodo.estadoPeriodo === "pendiente",
  ).length;
  const periodosCancelados = estadoCuenta.periodos.filter(
    (periodo) => periodo.estadoPeriodo === "cancelado",
  ).length;
  const periodosAFavor = estadoCuenta.periodos.filter(
    (periodo) => periodo.estadoPeriodo === "a_favor",
  ).length;

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <HeaderCuenta
            cliente={cliente}
            nombreCompleto={nombreCompleto}
            saldo={estadoCuenta.saldo}
          />

          <div className="mt-3">
            <ResumenFinanciero
              saldo={estadoCuenta.saldo}
              totalDebe={estadoCuenta.totalDebe}
              totalHaber={estadoCuenta.totalHaber}
              cantidadPeriodos={cantidadPeriodos}
              periodosPendientes={periodosPendientes}
              periodosCancelados={periodosCancelados}
              periodosAFavor={periodosAFavor}
            />
          </div>

          <div className="mt-3">
            <FacturacionPanel
              clienteId={cliente.id}
              periodos={estadoCuenta.periodos}
            />
          </div>
        </DashboardMain>

        <DashboardAside>
          <ResumenAside
            cliente={cliente}
            saldo={estadoCuenta.saldo}
            cantidadPeriodos={cantidadPeriodos}
            periodosPendientes={periodosPendientes}
            periodosCancelados={periodosCancelados}
            periodosAFavor={periodosAFavor}
          />

          <div className="mt-3">
            <AccionesAside clienteId={cliente.id} />
          </div>

          <div className="mt-3">
            <NotaLectura />
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
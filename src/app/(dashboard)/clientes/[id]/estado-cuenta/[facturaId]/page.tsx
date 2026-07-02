// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   ArrowDownLeft,
//   ArrowUpRight,
//   FileText,
//   ReceiptText,
// } from "lucide-react";
// import { Badge } from "@/components/ui/Badge";
// import { PageHeader } from "@/components/ui/PageHeader";
// import { PageShell } from "@/components/ui/PageShell";
// import { SectionCard } from "@/components/ui/SectionCard";
// import { obtenerClientePorId } from "@/services/cliente.service";
// import { obtenerDetallePeriodoCliente } from "@/services/movimiento-financiero.service";
// import type { MovimientoFinancieroSafe } from "@/types/movimiento-financiero.types";

// type DetallePeriodoPageProps = {
//   params: {
//     id: string;
//     facturaId: string;
//   };
// };

// export const metadata = {
//   title: "Detalle del período",
// };

// function formatDate(value: string) {
//   if (!value) return "-";

//   return new Intl.DateTimeFormat("es-AR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   }).format(new Date(value));
// }

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value);
// }

// function getTipoLabel(tipo: string) {
//   if (tipo === "factura") return "Factura";
//   if (tipo === "nota_credito") return "Nota crédito";
//   if (tipo === "nota_debito") return "Nota débito";
//   if (tipo === "pago") return "Pago";
//   return "Ajuste";
// }

// function getTipoVariant(tipo: string) {
//   if (tipo === "factura") return "info";
//   if (tipo === "nota_credito") return "success";
//   if (tipo === "nota_debito") return "warning";
//   if (tipo === "pago") return "success";
//   return "default";
// }

// function getImpacto(movimiento: MovimientoFinancieroSafe) {
//   if (movimiento.debe > 0) {
//     return {
//       label: "Suma",
//       value: movimiento.debe,
//       sign: "+",
//       className: "text-[var(--app-danger)]",
//       icon: <ArrowUpRight className="h-4 w-4" />,
//     };
//   }

//   if (movimiento.haber > 0) {
//     return {
//       label: "Resta",
//       value: movimiento.haber,
//       sign: "-",
//       className: "text-[var(--app-success)]",
//       icon: <ArrowDownLeft className="h-4 w-4" />,
//     };
//   }

//   return {
//     label: "Sin impacto",
//     value: 0,
//     sign: "",
//     className: "text-[var(--app-muted)]",
//     icon: <FileText className="h-4 w-4" />,
//   };
// }

// function getEstadoPeriodoBadge(estado: string) {
//   if (estado === "cancelado") {
//     return <Badge variant="success">Cancelado</Badge>;
//   }

//   if (estado === "a_favor") {
//     return <Badge variant="info">A favor</Badge>;
//   }

//   return <Badge variant="danger">Pendiente</Badge>;
// }

// export default async function DetallePeriodoPage({
//   params,
// }: DetallePeriodoPageProps) {
//   const [cliente, detalle] = await Promise.all([
//     obtenerClientePorId(params.id),
//     obtenerDetallePeriodoCliente(params.id, params.facturaId),
//   ]);

//   if (!cliente || !detalle) {
//     notFound();
//   }

//   return (
//     <PageShell maxWidth="lg">
//       <PageHeader
//         eyebrow={`Factura N° ${detalle.periodo.numeroComprobante}`}
//         title={`Detalle ${detalle.periodo.periodoLabel}`}
//         description={`${cliente.apellido}, ${cliente.nombre} · DNI ${cliente.dni}`}
//         backHref={`/clientes/${cliente.id}/estado-cuenta`}
//         backLabel="Volver al estado de cuenta"
//       >
//         <div className="mt-3 flex flex-wrap gap-2">
//           {getEstadoPeriodoBadge(detalle.periodo.estadoPeriodo)}
//           <Badge variant="info">
//             {formatMoney(detalle.periodo.saldoPeriodo)}
//           </Badge>
//         </div>
//       </PageHeader>

//       <div className="grid gap-3 md:grid-cols-4">
//         <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-4 shadow-[var(--app-shadow-soft)]">
//           <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-muted)]">
//             Original
//           </p>
//           <p className="mt-2 text-lg font-semibold text-[var(--app-text-strong)]">
//             {formatMoney(detalle.periodo.importeOriginal)}
//           </p>
//         </div>

//         <div className="rounded-2xl border border-emerald-200 bg-[var(--app-success-soft)] p-4 text-[var(--app-success)] shadow-[var(--app-shadow-soft)] dark:border-emerald-900/70">
//           <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
//             Notas crédito
//           </p>
//           <p className="mt-2 text-lg font-semibold">
//             - {formatMoney(detalle.periodo.totalNotasCredito)}
//           </p>
//         </div>

//         <div className="rounded-2xl border border-red-200 bg-[var(--app-danger-soft)] p-4 text-[var(--app-danger)] shadow-[var(--app-shadow-soft)] dark:border-red-900/70">
//           <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
//             Notas débito
//           </p>
//           <p className="mt-2 text-lg font-semibold">
//             + {formatMoney(detalle.periodo.totalNotasDebito)}
//           </p>
//         </div>

//         <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-primary-soft)] p-4 text-[var(--app-primary)] shadow-[var(--app-shadow-soft)]">
//           <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
//             Saldo período
//           </p>
//           <p className="mt-2 text-lg font-semibold">
//             {formatMoney(detalle.periodo.saldoPeriodo)}
//           </p>
//         </div>
//       </div>

//       <SectionCard
//         title="Movimientos del período"
//         description="Detalle de la factura base y todos los movimientos asociados a este período."
//         icon={<FileText className="h-5 w-5" />}
//       >
//         <div className="space-y-2">
//           {detalle.movimientos.map((movimiento) => {
//             const impacto = getImpacto(movimiento);

//             return (
//               <div
//                 key={movimiento.id}
//                 className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-sm"
//               >
//                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                   <div className="min-w-0">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <Badge
//                         variant={
//                           getTipoVariant(movimiento.tipoMovimiento) as any
//                         }
//                       >
//                         {getTipoLabel(movimiento.tipoMovimiento)}
//                       </Badge>

//                       <span className="text-xs font-semibold text-[var(--app-muted)]">
//                         {formatDate(movimiento.fecha)} · Comp. N°{" "}
//                         {movimiento.numeroComprobante}
//                       </span>
//                     </div>

//                     <p className="mt-2 text-sm font-semibold text-[var(--app-text-strong)]">
//                       {movimiento.concepto}
//                     </p>

//                     {movimiento.observacion ? (
//                       <p className="mt-1 text-xs text-[var(--app-muted)]">
//                         {movimiento.observacion}
//                       </p>
//                     ) : null}
//                   </div>

//                   <div className="flex shrink-0 flex-col gap-2 sm:min-w-40">
//                     <div
//                       className={`flex items-center justify-between gap-3 rounded-xl bg-[var(--app-surface-soft)] px-3 py-2 ${impacto.className}`}
//                     >
//                       <div className="shrink-0">{impacto.icon}</div>

//                       <div className="text-right">
//                         <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
//                           {impacto.label}
//                         </p>
//                         <p className="text-sm font-semibold">
//                           {impacto.value > 0
//                             ? `${impacto.sign} ${formatMoney(impacto.value)}`
//                             : "-"}
//                         </p>
//                       </div>
//                     </div>

//                     {movimiento.tipoMovimiento === "pago" ? (
//                       <Link
//                         href={`/comprobantes/pagos/${movimiento.id}`}
//                         className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] px-3 text-xs font-semibold text-[var(--app-text)] transition hover:bg-[var(--app-primary-soft)] active:scale-[0.99]"
//                       >
//                         <ReceiptText className="h-3.5 w-3.5" />
//                         Ver comprobante
//                       </Link>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </SectionCard>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/clientes/[id]/estado-cuenta/[facturaId]/page.tsx

// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   FileText,
//   MinusCircle,
//   PlusCircle,
//   ReceiptText,
//   WalletCards,
// } from "lucide-react";
// import { obtenerClientePorId } from "@/services/cliente.service";
// import { obtenerDetallePeriodoCliente } from "@/services/movimiento-financiero.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// type DetallePeriodoPageProps = {
//   params: {
//     id: string;
//     facturaId: string;
//   };
// };

// export const metadata = {
//   title: "Detalle del período",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof ReceiptText;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// type MovimientoDetalle = {
//   id: string;
//   tipoMovimiento: string;
//   numeroComprobante?: number | string | null;
//   fecha?: string | null;
//   concepto?: string | null;
//   observacion?: string | null;
//   debe: number;
//   haber: number;
//   saldoPeriodo: number;
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

// function formatDate(value?: string | null) {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "-";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
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

// function getEstadoLabel(estadoPeriodo: string) {
//   if (estadoPeriodo === "cancelado") return "Cancelado";
//   if (estadoPeriodo === "a_favor") return "A favor";
//   return "Pendiente";
// }

// function getEstadoTone(estadoPeriodo: string): "emerald" | "amber" | "red" {
//   if (estadoPeriodo === "cancelado") return "emerald";
//   if (estadoPeriodo === "a_favor") return "amber";
//   return "red";
// }

// function getEstadoClass(estadoPeriodo: string) {
//   if (estadoPeriodo === "cancelado") {
//     return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   if (estadoPeriodo === "a_favor") {
//     return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
//   }

//   return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
// }

// function getTipoLabel(tipo: string) {
//   if (tipo === "factura") return "Factura";
//   if (tipo === "pago") return "Pago";
//   if (tipo === "nota_debito") return "Nota débito";
//   if (tipo === "nota_credito") return "Nota crédito";
//   return "Movimiento";
// }

// function getTipoClass(tipo: string) {
//   if (tipo === "factura" || tipo === "nota_debito") {
//     return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
//   }

//   if (tipo === "pago" || tipo === "nota_credito") {
//     return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   return "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300";
// }

// function getSaldoClass(value: number) {
//   if (value > 0) return "text-red-700 dark:text-red-300";
//   if (value < 0) return "text-amber-700 dark:text-amber-300";
//   return "text-emerald-700 dark:text-emerald-300";
// }

// function TipoPill({ tipo }: { tipo: string }) {
//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${getTipoClass(
//         tipo,
//       )}`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {getTipoLabel(tipo)}
//     </span>
//   );
// }

// function EstadoPill({ estado }: { estado: string }) {
//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${getEstadoClass(
//         estado,
//       )}`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {getEstadoLabel(estado)}
//     </span>
//   );
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

// function getMovimientoDebeHaber(movimiento: any) {
//   const tipo = String(movimiento.tipoMovimiento || "");

//   const debeExistente = Number(movimiento.debe || 0);
//   const haberExistente = Number(movimiento.haber || 0);

//   if (debeExistente > 0 || haberExistente > 0) {
//     return {
//       debe: debeExistente,
//       haber: haberExistente,
//     };
//   }

//   const importe = Number(movimiento.importe || 0);

//   if (tipo === "factura" || tipo === "nota_debito") {
//     return {
//       debe: importe,
//       haber: 0,
//     };
//   }

//   if (tipo === "pago" || tipo === "nota_credito") {
//     return {
//       debe: 0,
//       haber: importe,
//     };
//   }

//   return {
//     debe: 0,
//     haber: 0,
//   };
// }

// function ordenarMovimientos(rawMovimientos: any[]) {
//   return [...rawMovimientos].sort((a, b) => {
//     const fechaA = new Date(a.fecha || a.creadoEn || 0).getTime();
//     const fechaB = new Date(b.fecha || b.creadoEn || 0).getTime();

//     if (fechaA !== fechaB) return fechaA - fechaB;

//     return Number(a.numeroComprobante || 0) - Number(b.numeroComprobante || 0);
//   });
// }

// function construirMovimientosDetalle(detallePeriodo: any): MovimientoDetalle[] {
//   const periodo = detallePeriodo.periodo;
//   const rawMovimientos = Array.isArray(detallePeriodo.movimientos)
//     ? detallePeriodo.movimientos
//     : [];

//   const tieneFacturaBase = rawMovimientos.some((movimiento: any) => {
//     return (
//       movimiento.tipoMovimiento === "factura" ||
//       movimiento.id === periodo.facturaId ||
//       movimiento._id === periodo.facturaId
//     );
//   });

//   const facturaBase = tieneFacturaBase
//     ? []
//     : [
//         {
//           id: `factura-${periodo.facturaId}`,
//           tipoMovimiento: "factura",
//           numeroComprobante: periodo.numeroComprobante,
//           fecha: periodo.fecha || periodo.creadoEn || null,
//           concepto: periodo.concepto || `Factura período ${periodo.periodoLabel}`,
//           observacion: "Comprobante base del período",
//           debe: Number(periodo.importeOriginal || 0),
//           haber: 0,
//         },
//       ];

//   const movimientosOrdenados = ordenarMovimientos([
//     ...facturaBase,
//     ...rawMovimientos,
//   ]);

//   let saldoPeriodo = 0;

//   return movimientosOrdenados.map((movimiento: any) => {
//     const { debe, haber } = getMovimientoDebeHaber(movimiento);
//     saldoPeriodo += debe - haber;

//     return {
//       id:
//         movimiento.id ||
//         movimiento._id?.toString?.() ||
//         `${movimiento.tipoMovimiento}-${movimiento.numeroComprobante}`,
//       tipoMovimiento: movimiento.tipoMovimiento || "movimiento",
//       numeroComprobante: movimiento.numeroComprobante || null,
//       fecha: movimiento.fecha || movimiento.creadoEn || null,
//       concepto: movimiento.concepto || "",
//       observacion: movimiento.observacion || "",
//       debe,
//       haber,
//       saldoPeriodo,
//     };
//   });
// }

// function MobileHeader({
//   cliente,
//   nombreCompleto,
//   periodo,
// }: {
//   cliente: any;
//   nombreCompleto: string;
//   periodo: any;
// }) {
//   return (
//     <section className={`${cardBase} p-3`}>
//       <div className="flex items-start gap-3">
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           <ReceiptText className="h-5 w-5" />
//         </div>

//         <div className="min-w-0 flex-1">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Detalle del período
//           </p>

//           <h1 className="mt-0.5 truncate text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             {periodo.periodoLabel}
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             {nombreCompleto} · N° {cliente.numeroCliente}
//           </p>

//           <div className="mt-2 flex flex-wrap gap-2">
//             <EstadoPill estado={periodo.estadoPeriodo} />

//             <span className="inline-flex rounded-full border border-cyan-300 bg-cyan-50 px-2.5 py-1 text-[10px] font-medium text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-300">
//               Factura N° {periodo.numeroComprobante}
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function MobileSaldoCard({
//   periodo,
//   clienteId,
// }: {
//   periodo: any;
//   clienteId: string;
// }) {
//   return (
//     <section className={`${cardBase} p-3`}>
//       <div className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none">
//         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
//           Saldo del período
//         </p>

//         <p
//           className={`mt-1 text-3xl font-semibold tracking-tight ${getSaldoClass(
//             Number(periodo.saldoPeriodo || 0),
//           )}`}
//         >
//           {formatMoney(periodo.saldoPeriodo)}
//         </p>

//         <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//           Se calcula con la factura base, pagos aplicados y notas asociadas a
//           este período.
//         </p>

//         <div className="mt-3 grid grid-cols-2 gap-2">
//           <div className="rounded-2xl border border-slate-300 bg-slate-50 px-2 py-2 text-center dark:border-slate-800 dark:bg-slate-900/70">
//             <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
//               Facturado
//             </p>

//             <p className="mt-1 truncate text-xs font-semibold text-slate-950 dark:text-white">
//               {formatMoney(periodo.importeOriginal)}
//             </p>
//           </div>

//           <div className="rounded-2xl border border-red-300 bg-red-50 px-2 py-2 text-center dark:border-red-900/70 dark:bg-red-950/30">
//             <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-red-700 dark:text-red-300">
//               Débitos
//             </p>

//             <p className="mt-1 truncate text-xs font-semibold text-red-700 dark:text-red-300">
//               {formatMoney(periodo.totalNotasDebito)}
//             </p>
//           </div>

//           <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-2 py-2 text-center dark:border-emerald-900/70 dark:bg-emerald-950/30">
//             <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
//               Pagos
//             </p>

//             <p className="mt-1 truncate text-xs font-semibold text-emerald-700 dark:text-emerald-300">
//               {formatMoney(periodo.totalPagos)}
//             </p>
//           </div>

//           <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-2 py-2 text-center dark:border-emerald-900/70 dark:bg-emerald-950/30">
//             <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
//               Créditos
//             </p>

//             <p className="mt-1 truncate text-xs font-semibold text-emerald-700 dark:text-emerald-300">
//               {formatMoney(periodo.totalNotasCredito)}
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

// function MovimientoMobileCard({ movimiento }: { movimiento: MovimientoDetalle }) {
//   return (
//     <article className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//       <div className="flex items-start justify-between gap-3">
//         <div className="min-w-0">
//           <h2 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//             {getTipoLabel(movimiento.tipoMovimiento)}
//           </h2>

//           <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
//             {formatDate(movimiento.fecha)} · Comp. N°{" "}
//             {movimiento.numeroComprobante || "-"}
//           </p>
//         </div>

//         <TipoPill tipo={movimiento.tipoMovimiento} />
//       </div>

//       <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
//         {movimiento.concepto || "Sin concepto"}
//       </p>

//       <div className="mt-3 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
//         <div className="grid grid-cols-3 gap-2 text-center">
//           <div>
//             <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-red-700 dark:text-red-300">
//               Debe
//             </p>

//             <p className="mt-1 truncate font-medium text-red-700 dark:text-red-300">
//               {movimiento.debe > 0 ? formatMoney(movimiento.debe) : "-"}
//             </p>
//           </div>

//           <div>
//             <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
//               Haber
//             </p>

//             <p className="mt-1 truncate font-medium text-emerald-700 dark:text-emerald-300">
//               {movimiento.haber > 0 ? formatMoney(movimiento.haber) : "-"}
//             </p>
//           </div>

//           <div>
//             <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//               Saldo
//             </p>

//             <p
//               className={`mt-1 truncate font-medium ${getSaldoClass(
//                 movimiento.saldoPeriodo,
//               )}`}
//             >
//               {formatMoney(movimiento.saldoPeriodo)}
//             </p>
//           </div>
//         </div>

//         {movimiento.observacion ? (
//           <div className="mt-2 border-t border-slate-300 pt-2 dark:border-slate-800">
//             <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">
//               {movimiento.observacion}
//             </p>
//           </div>
//         ) : null}
//       </div>
//     </article>
//   );
// }

// function MovimientosPeriodoTable({
//   movimientos,
// }: {
//   movimientos: MovimientoDetalle[];
// }) {
//   return (
//     <>
//       <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none lg:block">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[980px] table-fixed text-left text-xs xl:min-w-0">
//             <colgroup>
//               <col className="w-[10%]" />
//               <col className="w-[12%]" />
//               <col className="w-[13%]" />
//               <col className="w-[32%]" />
//               <col className="w-[11%]" />
//               <col className="w-[11%]" />
//               <col className="w-[11%]" />
//             </colgroup>

//             <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//               <tr>
//                 <th className="px-3 py-2.5 font-medium">Fecha</th>
//                 <th className="px-3 py-2.5 font-medium">Comprobante</th>
//                 <th className="px-3 py-2.5 font-medium">Tipo</th>
//                 <th className="px-3 py-2.5 font-medium">Concepto</th>
//                 <th className="px-3 py-2.5 text-right font-medium">Debe</th>
//                 <th className="px-3 py-2.5 text-right font-medium">Haber</th>
//                 <th className="px-3 py-2.5 text-right font-medium">
//                   Saldo período
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
//               {movimientos.map((movimiento) => (
//                 <tr
//                   key={movimiento.id}
//                   className="transition hover:bg-slate-50/90 dark:hover:bg-cyan-950/10"
//                 >
//                   <td className="px-3 py-3">
//                     <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                       {formatDate(movimiento.fecha)}
//                     </p>
//                   </td>

//                   <td className="px-3 py-3">
//                     <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                       N° {movimiento.numeroComprobante || "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-3">
//                     <TipoPill tipo={movimiento.tipoMovimiento} />
//                   </td>

//                   <td className="px-3 py-3">
//                     <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                       {movimiento.concepto || "-"}
//                     </p>

//                     {movimiento.observacion ? (
//                       <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                         {movimiento.observacion}
//                       </p>
//                     ) : null}
//                   </td>

//                   <td className="px-3 py-3 text-right">
//                     <p className="truncate text-xs font-medium text-red-700 dark:text-red-300">
//                       {movimiento.debe > 0 ? formatMoney(movimiento.debe) : "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-3 text-right">
//                     <p className="truncate text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                       {movimiento.haber > 0
//                         ? formatMoney(movimiento.haber)
//                         : "-"}
//                     </p>
//                   </td>

//                   <td className="px-3 py-3 text-right">
//                     <p
//                       className={`truncate text-xs font-semibold ${getSaldoClass(
//                         movimiento.saldoPeriodo,
//                       )}`}
//                     >
//                       {formatMoney(movimiento.saldoPeriodo)}
//                     </p>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//           <span>
//             Mostrando {movimientos.length}{" "}
//             {movimientos.length === 1 ? "movimiento" : "movimientos"}
//           </span>

//           <span>Detalle del período</span>
//         </div>
//       </div>

//       <div className="grid gap-2 lg:hidden">
//         {movimientos.map((movimiento) => (
//           <MovimientoMobileCard key={movimiento.id} movimiento={movimiento} />
//         ))}
//       </div>
//     </>
//   );
// }

// function ResumenAside({ cliente, periodo }: { cliente: any; periodo: any }) {
//   return (
//     <div className={`${cardBase} p-3.5`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div>
//           <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Resumen
//           </p>

//           <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//             Información del período
//           </h2>
//         </div>

//         <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//           <ReceiptText className="h-4 w-4" />
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
//             Período
//           </span>

//           <span className="text-xs font-medium text-slate-950 dark:text-white">
//             {periodo.periodoLabel}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Factura
//           </span>

//           <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//             N° {periodo.numeroComprobante}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Estado
//           </span>

//           <EstadoPill estado={periodo.estadoPeriodo} />
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Facturado
//           </span>

//           <span className="text-xs font-medium text-slate-950 dark:text-white">
//             {formatMoney(periodo.importeOriginal)}
//           </span>
//         </div>

//         <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//           <span className="text-xs text-slate-700 dark:text-slate-300">
//             Saldo
//           </span>

//           <span
//             className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//               periodo.saldoPeriodo > 0
//                 ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                 : periodo.saldoPeriodo < 0
//                   ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
//                   : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//             }`}
//           >
//             {formatMoney(periodo.saldoPeriodo)}
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
//           Movimientos del período
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
//         </Link>

//         <Link
//           href={`/clientes/${clienteId}/nota-credito`}
//           className="group flex items-center justify-between gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
//         >
//           <span className="flex min-w-0 items-center gap-2.5">
//             <MinusCircle className="h-3.5 w-3.5 shrink-0" />
//             Nota crédito
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default async function DetallePeriodoPage({
//   params,
// }: DetallePeriodoPageProps) {
//   const [cliente, detallePeriodo] = await Promise.all([
//     obtenerClientePorId(params.id),
//     obtenerDetallePeriodoCliente(params.id, params.facturaId),
//   ]);

//   if (!cliente || !detallePeriodo) {
//     notFound();
//   }

//   const nombreCompleto = getNombreCompleto(cliente);
//   const periodo = detallePeriodo.periodo;
//   const movimientos = construirMovimientosDetalle(detallePeriodo);

//   return (
//     <PageShell maxWidth="wide">
//       <div className="space-y-3 lg:hidden">
//         <MobileHeader
//           cliente={cliente}
//           nombreCompleto={nombreCompleto}
//           periodo={periodo}
//         />

//         <MobileSaldoCard periodo={periodo} clienteId={cliente.id} />

//         <section className={`${cardBase} p-3`}>
//           <div className="mb-3 flex items-start gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//               <WalletCards className="h-4 w-4" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Movimientos
//               </p>

//               <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                 Cómo se formó el saldo
//               </h2>

//               <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                 Factura base, pagos, notas de débito y notas de crédito.
//               </p>
//             </div>
//           </div>

//           <MovimientosPeriodoTable movimientos={movimientos} />
//         </section>
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Facturado"
//             value={formatMoney(periodo.importeOriginal)}
//             description="Importe original."
//             icon={FileText}
//             tone="cyan"
//           />

//           <StatCard
//             title="Notas débito"
//             value={formatMoney(periodo.totalNotasDebito)}
//             description="Cargos adicionales."
//             icon={PlusCircle}
//             tone={periodo.totalNotasDebito > 0 ? "red" : "cyan"}
//           />

//           <StatCard
//             title="Pagos"
//             value={formatMoney(periodo.totalPagos)}
//             description="Pagos aplicados."
//             icon={MinusCircle}
//             tone="emerald"
//           />

//           <StatCard
//             title="Notas crédito"
//             value={formatMoney(periodo.totalNotasCredito)}
//             description="Créditos aplicados."
//             icon={MinusCircle}
//             tone="emerald"
//           />

//           <StatCard
//             title="Saldo"
//             value={formatMoney(periodo.saldoPeriodo)}
//             description="Saldo del período."
//             icon={WalletCards}
//             tone={getEstadoTone(periodo.estadoPeriodo)}
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Detalle del período
//                     </p>

//                     <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                       {periodo.periodoLabel} · Factura N°{" "}
//                       {periodo.numeroComprobante}
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
//                     <WalletCards className="h-4 w-4" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Composición del período
//                     </p>

//                     <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                       Movimientos aplicados
//                     </h2>

//                     <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                       Esta tabla muestra cómo se formó el saldo del período:
//                       debe aumenta la deuda y haber la reduce.
//                     </p>
//                   </div>
//                 </div>

//                 <MovimientosPeriodoTable movimientos={movimientos} />
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <ResumenAside cliente={cliente} periodo={periodo} />

//               <AccionesAside clienteId={cliente.id} />

//               <div className="rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3.5 text-xs leading-5 text-slate-600 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:text-slate-400 dark:shadow-none">
//                 <p className="font-medium text-slate-950 dark:text-white">
//                   Lectura rápida
//                 </p>

//                 <p className="mt-1">
//                   Esta vista muestra solamente el detalle del período
//                   seleccionado. Para ver otros períodos, volvé al estado de
//                   cuenta general desde el menú del navegador o desde la ficha del
//                   cliente.
//                 </p>
//               </div>
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/clientes/[id]/estado-cuenta/[facturaId]/page.tsx

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
} from "lucide-react";
import { obtenerClientePorId } from "@/services/cliente.service";
import { obtenerDetallePeriodoCliente } from "@/services/movimiento-financiero.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

type DetallePeriodoPageProps = {
  params: {
    id: string;
    facturaId: string;
  };
};

export const metadata = {
  title: "Detalle del período",
};

type MovimientoDetalle = {
  id: string;
  tipoMovimiento: string;
  numeroComprobante?: number | string | null;
  fecha?: string | null;
  concepto?: string | null;
  observacion?: string | null;
  debe: number;
  haber: number;
  saldoPeriodo: number;
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

function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
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

function getEstadoLabel(estadoPeriodo: string) {
  if (estadoPeriodo === "cancelado") return "Cancelado";
  if (estadoPeriodo === "a_favor") return "A favor";
  return "Pendiente";
}

function getEstadoTone(
  estadoPeriodo: string,
): "success" | "warning" | "danger" {
  if (estadoPeriodo === "cancelado") return "success";
  if (estadoPeriodo === "a_favor") return "warning";
  return "danger";
}

function getEstadoClass(estadoPeriodo: string) {
  if (estadoPeriodo === "cancelado") {
    return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
  }

  if (estadoPeriodo === "a_favor") {
    return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
  }

  return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
}

function getTipoLabel(tipo: string) {
  if (tipo === "factura") return "Factura";
  if (tipo === "pago") return "Pago";
  if (tipo === "nota_debito") return "Nota débito";
  if (tipo === "nota_credito") return "Nota crédito";
  return "Movimiento";
}

function getTipoClass(tipo: string) {
  if (tipo === "factura" || tipo === "nota_debito") {
    return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
  }

  if (tipo === "pago" || tipo === "nota_credito") {
    return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
  }

  return "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-300";
}

function getSaldoClass(value: number) {
  if (value > 0) return "text-red-700 dark:text-red-300";
  if (value < 0) return "text-amber-700 dark:text-amber-300";
  return "text-emerald-700 dark:text-emerald-300";
}

function getMovimientoDebeHaber(movimiento: any) {
  const tipo = String(movimiento.tipoMovimiento || "");

  const debeExistente = Number(movimiento.debe || 0);
  const haberExistente = Number(movimiento.haber || 0);

  if (debeExistente > 0 || haberExistente > 0) {
    return {
      debe: debeExistente,
      haber: haberExistente,
    };
  }

  const importe = Number(movimiento.importe || 0);

  if (tipo === "factura" || tipo === "nota_debito") {
    return {
      debe: importe,
      haber: 0,
    };
  }

  if (tipo === "pago" || tipo === "nota_credito") {
    return {
      debe: 0,
      haber: importe,
    };
  }

  return {
    debe: 0,
    haber: 0,
  };
}

function ordenarMovimientos(rawMovimientos: any[]) {
  return [...rawMovimientos].sort((a, b) => {
    const fechaA = new Date(a.fecha || a.creadoEn || 0).getTime();
    const fechaB = new Date(b.fecha || b.creadoEn || 0).getTime();

    if (fechaA !== fechaB) return fechaA - fechaB;

    return Number(a.numeroComprobante || 0) - Number(b.numeroComprobante || 0);
  });
}

function construirMovimientosDetalle(detallePeriodo: any): MovimientoDetalle[] {
  const periodo = detallePeriodo.periodo;
  const rawMovimientos = Array.isArray(detallePeriodo.movimientos)
    ? detallePeriodo.movimientos
    : [];

  const tieneFacturaBase = rawMovimientos.some((movimiento: any) => {
    return (
      movimiento.tipoMovimiento === "factura" ||
      movimiento.id === periodo.facturaId ||
      movimiento._id === periodo.facturaId
    );
  });

  const facturaBase = tieneFacturaBase
    ? []
    : [
        {
          id: `factura-${periodo.facturaId}`,
          tipoMovimiento: "factura",
          numeroComprobante: periodo.numeroComprobante,
          fecha: periodo.fecha || periodo.creadoEn || null,
          concepto:
            periodo.concepto || `Factura período ${periodo.periodoLabel}`,
          observacion: "Comprobante base del período",
          debe: Number(periodo.importeOriginal || 0),
          haber: 0,
        },
      ];

  const movimientosOrdenados = ordenarMovimientos([
    ...facturaBase,
    ...rawMovimientos,
  ]);

  let saldoPeriodo = 0;

  return movimientosOrdenados.map((movimiento: any) => {
    const { debe, haber } = getMovimientoDebeHaber(movimiento);
    saldoPeriodo += debe - haber;

    return {
      id:
        movimiento.id ||
        movimiento._id?.toString?.() ||
        `${movimiento.tipoMovimiento}-${movimiento.numeroComprobante}`,
      tipoMovimiento: movimiento.tipoMovimiento || "movimiento",
      numeroComprobante: movimiento.numeroComprobante || null,
      fecha: movimiento.fecha || movimiento.creadoEn || null,
      concepto: movimiento.concepto || "",
      observacion: movimiento.observacion || "",
      debe,
      haber,
      saldoPeriodo,
    };
  });
}

function BackButton({ clienteId }: { clienteId: string }) {
  return (
    <Link
      href={`/clientes/${clienteId}/estado-cuenta`}
      className={`${buttonSecondaryClass} hidden sm:inline-flex`}
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

function TipoPill({ tipo }: { tipo: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${getTipoClass(
        tipo,
      )}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {getTipoLabel(tipo)}
    </span>
  );
}

function EstadoPill({ estado }: { estado: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${getEstadoClass(
        estado,
      )}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {getEstadoLabel(estado)}
    </span>
  );
}

function HeaderDetalle({
  cliente,
  nombreCompleto,
  periodo,
}: {
  cliente: any;
  nombreCompleto: string;
  periodo: any;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Detalle del período</p>

          <h1 className={sectionSubtitleClass}>{periodo.periodoLabel}</h1>

          <p className={`${sectionDescriptionClass} max-w-3xl truncate`}>
            {nombreCompleto} · Cliente N° {cliente.numeroCliente} · DNI{" "}
            {cliente.dni || "-"}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 lg:items-end">
          <BackButton clienteId={cliente.id} />

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Badge tone="primary">Factura N° {periodo.numeroComprobante}</Badge>

            <Badge tone={getEstadoTone(periodo.estadoPeriodo)}>
              {getEstadoLabel(periodo.estadoPeriodo)}
            </Badge>

            <Badge
              tone={
                periodo.saldoPeriodo > 0
                  ? "danger"
                  : periodo.saldoPeriodo < 0
                    ? "warning"
                    : "success"
              }
            >
              {formatMoney(periodo.saldoPeriodo)}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumenPeriodo({ periodo }: { periodo: any }) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <WalletCards className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className={sectionTitleClass}>Resumen del período</p>

          <h2
            className={`mt-0.5 text-sm font-semibold ${getSaldoClass(
              Number(periodo.saldoPeriodo || 0),
            )}`}
          >
            {formatMoney(periodo.saldoPeriodo)}
          </h2>

          <p className={sectionDescriptionClass}>
            Saldo calculado con factura base, pagos aplicados y notas asociadas
            al período.
          </p>
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-5">
        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Facturado
          </p>

          <p className="mt-1 truncate text-[12px] font-semibold text-slate-950 dark:text-white">
            {formatMoney(periodo.importeOriginal)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-red-700 dark:text-red-300">
            Notas débito
          </p>

          <p className="mt-1 truncate text-[12px] font-semibold text-red-700 dark:text-red-300">
            {formatMoney(periodo.totalNotasDebito)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
            Pagos
          </p>

          <p className="mt-1 truncate text-[12px] font-semibold text-emerald-700 dark:text-emerald-300">
            {formatMoney(periodo.totalPagos)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
            Notas crédito
          </p>

          <p className="mt-1 truncate text-[12px] font-semibold text-emerald-700 dark:text-emerald-300">
            {formatMoney(periodo.totalNotasCredito)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Estado
          </p>

          <div className="mt-1">
            <EstadoPill estado={periodo.estadoPeriodo} />
          </div>
        </div>
      </div>
    </section>
  );
}

function MovimientosHeader({ clienteId }: { clienteId: string }) {
  return (
    <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <p className={sectionTitleClass}>Composición del período</p>

        <h2 className={sectionSubtitleClass}>Movimientos aplicados</h2>

        <p className={`${sectionDescriptionClass} max-w-3xl`}>
          Esta tabla muestra cómo se formó el saldo del período: debe aumenta la
          deuda y haber la reduce.
        </p>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:justify-end">
        <Link
          href={`/clientes/${clienteId}/nota-debito`}
          className={debitButtonClass}
        >
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

function MovimientoMobileCard({
  movimiento,
}: {
  movimiento: MovimientoDetalle;
}) {
  return (
    <article className="overflow-hidden rounded-[1.25rem] border border-slate-300 bg-white shadow-lg shadow-slate-400/35 ring-1 ring-white/80 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/25 dark:ring-slate-800/80">
      <div className="border-b border-slate-200 bg-white px-3.5 py-3.5 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-[14px] font-semibold text-slate-950 dark:text-white">
              {getTipoLabel(movimiento.tipoMovimiento)}
            </h2>

            <p className="mt-1 truncate text-[12px] text-slate-600 dark:text-slate-400">
              {formatDate(movimiento.fecha)} · Comp. N°{" "}
              {movimiento.numeroComprobante || "-"}
            </p>
          </div>

          <TipoPill tipo={movimiento.tipoMovimiento} />
        </div>

        <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
          {movimiento.concepto || "Sin concepto"}
        </p>
      </div>

      <div className="bg-slate-50 px-3.5 py-3 dark:bg-slate-950/35">
        <div className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-[12px] text-slate-600 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400 dark:shadow-black/10">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-red-700 dark:text-red-300">
                Debe
              </p>

              <p className="mt-1 truncate font-semibold text-red-700 dark:text-red-300">
                {movimiento.debe > 0 ? formatMoney(movimiento.debe) : "-"}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                Haber
              </p>

              <p className="mt-1 truncate font-semibold text-emerald-700 dark:text-emerald-300">
                {movimiento.haber > 0 ? formatMoney(movimiento.haber) : "-"}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Saldo
              </p>

              <p
                className={`mt-1 truncate font-semibold ${getSaldoClass(
                  movimiento.saldoPeriodo,
                )}`}
              >
                {formatMoney(movimiento.saldoPeriodo)}
              </p>
            </div>
          </div>

          {movimiento.observacion ? (
            <div className="mt-2 border-t border-slate-200 pt-2 dark:border-slate-700">
              <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                {movimiento.observacion}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function MovimientosPeriodoTable({
  movimientos,
}: {
  movimientos: MovimientoDetalle[];
}) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80 lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] table-fixed text-left text-[12px] xl:min-w-0">
            <colgroup>
              <col className="w-[10%]" />
              <col className="w-[12%]" />
              <col className="w-[13%]" />
              <col className="w-[32%]" />
              <col className="w-[11%]" />
              <col className="w-[11%]" />
              <col className="w-[11%]" />
            </colgroup>

            <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.08em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
              <tr>
                <th className="px-3 py-2.5 font-medium">Fecha</th>
                <th className="px-3 py-2.5 font-medium">Comprobante</th>
                <th className="px-3 py-2.5 font-medium">Tipo</th>
                <th className="px-3 py-2.5 font-medium">Concepto</th>
                <th className="px-3 py-2.5 text-right font-medium">Debe</th>
                <th className="px-3 py-2.5 text-right font-medium">Haber</th>
                <th className="px-3 py-2.5 text-right font-medium">
                  Saldo período
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {movimientos.map((movimiento) => (
                <tr
                  key={movimiento.id}
                  className="transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
                >
                  <td className="px-3 py-2.5">
                    <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
                      {formatDate(movimiento.fecha)}
                    </p>
                  </td>

                  <td className="px-3 py-2.5">
                    <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
                      N° {movimiento.numeroComprobante || "-"}
                    </p>
                  </td>

                  <td className="px-3 py-2.5">
                    <TipoPill tipo={movimiento.tipoMovimiento} />
                  </td>

                  <td className="px-3 py-2.5">
                    <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
                      {movimiento.concepto || "-"}
                    </p>

                    {movimiento.observacion ? (
                      <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                        {movimiento.observacion}
                      </p>
                    ) : null}
                  </td>

                  <td className="px-3 py-2.5 text-right">
                    <p className="truncate text-[12px] font-medium text-red-700 dark:text-red-300">
                      {movimiento.debe > 0 ? formatMoney(movimiento.debe) : "-"}
                    </p>
                  </td>

                  <td className="px-3 py-2.5 text-right">
                    <p className="truncate text-[12px] font-medium text-emerald-700 dark:text-emerald-300">
                      {movimiento.haber > 0
                        ? formatMoney(movimiento.haber)
                        : "-"}
                    </p>
                  </td>

                  <td className="px-3 py-2.5 text-right">
                    <p
                      className={`truncate text-[12px] font-semibold ${getSaldoClass(
                        movimiento.saldoPeriodo,
                      )}`}
                    >
                      {formatMoney(movimiento.saldoPeriodo)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
          <span>
            Mostrando {movimientos.length}{" "}
            {movimientos.length === 1 ? "movimiento" : "movimientos"}
          </span>

          <span>Detalle del período</span>
        </div>
      </div>

      <div className="grid gap-4 lg:hidden">
        {movimientos.map((movimiento) => (
          <MovimientoMobileCard key={movimiento.id} movimiento={movimiento} />
        ))}
      </div>
    </>
  );
}

function MovimientosPanel({
  clienteId,
  movimientos,
}: {
  clienteId: string;
  movimientos: MovimientoDetalle[];
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <MovimientosHeader clienteId={clienteId} />

      <MovimientosPeriodoTable movimientos={movimientos} />
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

function ResumenAside({ cliente, periodo }: { cliente: any; periodo: any }) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Resumen</p>

        <h2 className={sectionSubtitleClass}>Información del período</h2>
      </div>

      <div className={innerPanelClass}>
        <ResumenItem
          icon={<ReceiptText className="h-3.5 w-3.5" />}
          label="Cliente"
          value={`N° ${cliente.numeroCliente}`}
          tone="primary"
        />

        <ResumenItem
          icon={<FileText className="h-3.5 w-3.5" />}
          label="Período"
          value={periodo.periodoLabel}
          tone="primary"
        />

        <ResumenItem
          icon={<ReceiptText className="h-3.5 w-3.5" />}
          label="Factura"
          value={`N° ${periodo.numeroComprobante}`}
          tone="primary"
        />

        <ResumenItem
          icon={<CheckCircle2 className="h-3.5 w-3.5" />}
          label="Estado"
          value={getEstadoLabel(periodo.estadoPeriodo)}
          tone={getEstadoTone(periodo.estadoPeriodo)}
        />

        <ResumenItem
          icon={<FileText className="h-3.5 w-3.5" />}
          label="Facturado"
          value={formatMoney(periodo.importeOriginal)}
        />

        <ResumenItem
          icon={<WalletCards className="h-3.5 w-3.5" />}
          label="Saldo"
          value={formatMoney(periodo.saldoPeriodo)}
          tone={
            periodo.saldoPeriodo > 0
              ? "danger"
              : periodo.saldoPeriodo < 0
                ? "warning"
                : "success"
          }
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

        <h2 className={sectionSubtitleClass}>Movimientos del período</h2>
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
        Esta vista muestra solamente el detalle del período seleccionado. Para
        ver otros períodos, volvé al estado de cuenta general.
      </div>
    </section>
  );
}

export default async function DetallePeriodoPage({
  params,
}: DetallePeriodoPageProps) {
  const [cliente, detallePeriodo] = await Promise.all([
    obtenerClientePorId(params.id),
    obtenerDetallePeriodoCliente(params.id, params.facturaId),
  ]);

  if (!cliente || !detallePeriodo) {
    notFound();
  }

  const nombreCompleto = getNombreCompleto(cliente);
  const periodo = detallePeriodo.periodo;
  const movimientos = construirMovimientosDetalle(detallePeriodo);

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <HeaderDetalle
            cliente={cliente}
            nombreCompleto={nombreCompleto}
            periodo={periodo}
          />

          <div className="mt-3">
            <ResumenPeriodo periodo={periodo} />
          </div>

          <div className="mt-3">
            <MovimientosPanel
              clienteId={cliente.id}
              movimientos={movimientos}
            />
          </div>
        </DashboardMain>

        <DashboardAside>
          <ResumenAside cliente={cliente} periodo={periodo} />

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
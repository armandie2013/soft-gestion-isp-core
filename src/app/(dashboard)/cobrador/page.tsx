// // src/app/(dashboard)/cobrador/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   ArrowRight,
//   Banknote,
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   CreditCard,
//   FileText,
//   History,
//   ReceiptText,
//   Search,
//   ShieldCheck,
//   UserRound,
//   WalletCards,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import {
//   obtenerCajaCobradorResumen,
//   obtenerContextoCobroCobrador,
// } from "@/services/cobro.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import type { CajaCobradorMovimientoSafe } from "@/types/cobro.types";

// export const metadata = {
//   title: "Panel cobrador",
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
//   cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
//   emerald:
//     "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
//   amber:
//     "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
//   red: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
//   violet:
//     "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatCompactMoney(value: number) {
//   const amount = Number(value || 0);
//   const abs = Math.abs(amount);
//   const sign = amount < 0 ? "-" : "";

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

// function formatDateTime(value?: string | null) {
//   if (!value) return "Sin registro";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Sin registro";
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

// function formatDateShort(value?: string | null) {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "-";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month} ${hours}:${minutes}`;
// }

// function isToday(value?: string | null) {
//   if (!value) return false;

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return false;
//   }

//   const now = new Date();

//   return (
//     date.getDate() === now.getDate() &&
//     date.getMonth() === now.getMonth() &&
//     date.getFullYear() === now.getFullYear()
//   );
// }

// function getMovimientoTitle(movimiento: CajaCobradorMovimientoSafe) {
//   if (movimiento.tipoMovimiento === "cierre_caja") {
//     return "Cierre de caja";
//   }

//   const descripcion = movimiento.descripcion || "Cobro registrado";

//   return descripcion
//     .replace(/^Cobro a cliente\s*/i, "")
//     .replace(/\s-\sPago período.*$/i, "")
//     .replace(/\s-\sPago periodo.*$/i, "")
//     .trim();
// }

// function getMovimientoSubtitle(movimiento: CajaCobradorMovimientoSafe) {
//   if (movimiento.tipoMovimiento === "cierre_caja") {
//     return movimiento.observacion || "Caja cerrada";
//   }

//   return movimiento.descripcion || "Movimiento de caja";
// }

// function getTextFromMovimiento(
//   movimiento: CajaCobradorMovimientoSafe,
//   key: string,
// ) {
//   const record = movimiento as unknown as Record<string, unknown>;
//   const value = record[key];

//   if (typeof value === "string") return value;
//   if (typeof value === "number") return String(value);

//   return "";
// }

// function getClienteNombreFromMovimiento(
//   movimiento: CajaCobradorMovimientoSafe,
// ) {
//   const nombreDirecto =
//     getTextFromMovimiento(movimiento, "clienteNombre") ||
//     getTextFromMovimiento(movimiento, "nombreCliente") ||
//     getTextFromMovimiento(movimiento, "nombreCompletoCliente") ||
//     getTextFromMovimiento(movimiento, "cliente") ||
//     "";

//   if (nombreDirecto) return nombreDirecto;

//   const texto = `${movimiento.descripcion || ""} ${
//     movimiento.observacion || ""
//   }`;

//   const matchNombreAntesDni = texto.match(
//     /Cobro\s+a\s+cliente\s+(.+?)\s+DNI\s*[:#-]?\s*\d{6,10}/i,
//   );

//   if (matchNombreAntesDni?.[1]) {
//     return matchNombreAntesDni[1].trim();
//   }

//   const matchNombreAntesPago = texto.match(
//     /Cobro\s+a\s+cliente\s+(.+?)\s*-\s*Pago\s+per[ií]odo/i,
//   );

//   if (matchNombreAntesPago?.[1]) {
//     return matchNombreAntesPago[1].trim();
//   }

//   const matchNombreAntesFactura = texto.match(
//     /Cobro\s+a\s+cliente\s+(.+?)\s*-\s*Factura\s*N[°º]?/i,
//   );

//   if (matchNombreAntesFactura?.[1]) {
//     return matchNombreAntesFactura[1].trim();
//   }

//   const titulo = getMovimientoTitle(movimiento);

//   if (titulo) {
//     return titulo;
//   }

//   return "Cliente";
// }

// function getDniFromMovimiento(movimiento: CajaCobradorMovimientoSafe) {
//   const dniDirecto =
//     getTextFromMovimiento(movimiento, "clienteDni") ||
//     getTextFromMovimiento(movimiento, "dniCliente") ||
//     getTextFromMovimiento(movimiento, "dni") ||
//     "";

//   if (dniDirecto) return dniDirecto;

//   const texto = `${movimiento.descripcion || ""} ${
//     movimiento.observacion || ""
//   }`;

//   const match = texto.match(/DNI\s*[:#-]?\s*(\d{6,10})/i);

//   return match?.[1] || "-";
// }

// function getFacturaFromMovimiento(movimiento: CajaCobradorMovimientoSafe) {
//   const facturaDirecta =
//     getTextFromMovimiento(movimiento, "numeroFactura") ||
//     getTextFromMovimiento(movimiento, "facturaNumero") ||
//     getTextFromMovimiento(movimiento, "numeroComprobante") ||
//     "";

//   if (facturaDirecta) return `Factura N° ${facturaDirecta}`;

//   const texto = `${movimiento.descripcion || ""} ${
//     movimiento.observacion || ""
//   }`;

//   const match = texto.match(/Factura\s*N[°º]?\s*[:#-]?\s*(\d+)/i);

//   return match?.[1] ? `Factura N° ${match[1]}` : "Factura";
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
//     <div className="flex h-full min-h-[88px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none xl:min-h-[96px]">
//       <div className="flex min-w-0 items-start gap-3">
//         <div
//           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}
//         >
//           <Icon className="h-3.5 w-3.5" />
//         </div>

//         <div className="min-w-0">
//           <p className="truncate text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//             <span className="xl:hidden">{shortTitle || title}</span>
//             <span className="hidden xl:inline">{title}</span>
//           </p>

//           <p className="mt-1 truncate text-base font-medium leading-none tracking-tight text-slate-950 dark:text-white xl:text-lg">
//             {value}
//           </p>

//           <p className="mt-1 hidden text-[11px] leading-4 text-slate-600 dark:text-slate-400 xl:block">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CajaPrincipalCard({
//   saldoActual,
//   totalCobradoHoy,
//   limiteCajaCobrador,
//   disponibleCaja,
// }: {
//   saldoActual: number;
//   totalCobradoHoy: number;
//   limiteCajaCobrador: number;
//   disponibleCaja: number;
// }) {
//   const disponiblePositivo = disponibleCaja > 0;

//   return (
//     <div className="relative overflow-hidden rounded-[1.45rem] border border-cyan-400 bg-gradient-to-br from-white via-cyan-50 to-sky-100 p-4 shadow-md shadow-cyan-900/10 dark:border-cyan-500/50 dark:bg-slate-900/80 dark:bg-none dark:shadow-cyan-950/30 xl:p-4">
//       <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.18),transparent_32%),linear-gradient(135deg,rgba(14,165,233,0.08),transparent_42%)] dark:block" />

//       <div className="relative">
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex min-w-0 items-start gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-800/70">
//               <WalletCards className="h-4 w-4" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-800 dark:text-cyan-300">
//                 Caja cobrador
//               </p>

//               <h1 className="mt-1 text-lg font-medium tracking-tight text-slate-950 dark:text-white xl:text-xl">
//                 Mi caja actual
//               </h1>
//             </div>
//           </div>

//           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300 shadow-lg shadow-slate-900/25 dark:bg-slate-950">
//             <ShieldCheck className="h-5 w-5" />
//           </div>
//         </div>

//         <div className="mt-5">
//           <p
//             className={`truncate text-5xl font-medium leading-none tracking-tight xl:text-6xl ${
//               saldoActual > 0
//                 ? "text-slate-950 dark:text-white"
//                 : "text-emerald-700 dark:text-emerald-300"
//             }`}
//           >
//             {formatMoney(saldoActual)}
//           </p>
//         </div>

//         <div className="mt-5 grid grid-cols-3 gap-2 border-t border-cyan-200 pt-3 dark:border-slate-800">
//           <div className="min-w-0">
//             <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//               Cobros del día
//             </p>

//             <p className="mt-1 truncate text-xs font-medium text-slate-950 dark:text-white xl:text-sm">
//               {formatMoney(totalCobradoHoy)}
//             </p>
//           </div>

//           <div className="min-w-0 border-x border-cyan-200 px-2 dark:border-slate-800">
//             <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//               Límite caja
//             </p>

//             <p className="mt-1 truncate text-xs font-medium text-slate-950 dark:text-white xl:text-sm">
//               {formatMoney(limiteCajaCobrador)}
//             </p>
//           </div>

//           <div className="min-w-0 pl-1">
//             <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//               Disponible
//             </p>

//             <p
//               className={`mt-1 truncate text-xs font-medium xl:text-sm ${
//                 disponiblePositivo
//                   ? "text-emerald-700 dark:text-emerald-300"
//                   : "text-red-700 dark:text-red-300"
//               }`}
//             >
//               {formatMoney(disponibleCaja)}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MovimientoRow({
//   movimiento,
// }: {
//   movimiento: CajaCobradorMovimientoSafe;
// }) {
//   const esCierre = movimiento.tipoMovimiento === "cierre_caja";

//   if (esCierre) {
//     return (
//       <div className="grid gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800 md:grid-cols-[minmax(220px,1fr)_120px_120px_95px] md:items-center">
//         <div className="flex min-w-0 items-center gap-3">
//           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
//             <WalletCards className="h-3.5 w-3.5" />
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//               Cierre de caja
//             </p>

//             <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500 dark:text-slate-400">
//               {getMovimientoSubtitle(movimiento)}
//             </p>
//           </div>
//         </div>

//         <p className="text-xs font-medium text-amber-700 dark:text-amber-300 md:text-right">
//           {formatMoney(movimiento.importe)}
//         </p>

//         <p className="text-[11px] text-slate-500 dark:text-slate-400 md:text-right">
//           {formatDateShort(movimiento.creadoEn)}
//         </p>

//         <div className="md:text-right">
//           <span className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
//             <span className="h-1.5 w-1.5 rounded-full bg-current" />
//             Cierre
//           </span>
//         </div>
//       </div>
//     );
//   }

//   const clienteNombre = getClienteNombreFromMovimiento(movimiento);
//   const clienteDni = getDniFromMovimiento(movimiento);
//   const factura = getFacturaFromMovimiento(movimiento);

//   return (
//     <>
//       <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800 md:hidden">
//         <div className="min-w-0">
//           <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//             {clienteNombre}
//           </p>

//           <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
//             DNI {clienteDni}
//           </p>

//           <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
//             {factura} · {formatDateShort(movimiento.creadoEn)}
//           </p>
//         </div>

//         <p className="shrink-0 text-right text-xs font-medium text-cyan-700 dark:text-cyan-300">
//           {formatMoney(movimiento.importe)}
//         </p>
//       </div>

//       <div className="hidden gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800 md:grid md:grid-cols-[minmax(220px,1fr)_120px_120px_95px] md:items-center">
//         <div className="flex min-w-0 items-center gap-3">
//           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
//             <UserRound className="h-3.5 w-3.5" />
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//               {getMovimientoTitle(movimiento)}
//             </p>

//             <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500 dark:text-slate-400">
//               {getMovimientoSubtitle(movimiento)}
//             </p>
//           </div>
//         </div>

//         <p className="text-xs font-medium text-cyan-700 dark:text-cyan-300 md:text-right">
//           {formatMoney(movimiento.importe)}
//         </p>

//         <p className="text-[11px] text-slate-500 dark:text-slate-400 md:text-right">
//           {formatDateShort(movimiento.creadoEn)}
//         </p>

//         <div className="md:text-right">
//           <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
//             <span className="h-1.5 w-1.5 rounded-full bg-current" />
//             Cobrado
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }

// export default async function CobradorDashboardPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "cobrador") {
//     redirect(`/${user.rol}`);
//   }

//   const currentUser = user as typeof user & {
//     id?: string;
//     userId?: string;
//     nombre?: string;
//     apellido?: string;
//     email?: string;
//   };

//   const cobradorId = currentUser.userId || currentUser.id || "";

//   if (!cobradorId) {
//     redirect("/login");
//   }

//   const [caja, contextoCobro] = await Promise.all([
//     obtenerCajaCobradorResumen(cobradorId),
//     obtenerContextoCobroCobrador(cobradorId),
//   ]);

//   const limiteCajaCobrador = contextoCobro?.limiteCajaCobrador || 100000;
//   const disponibleCaja = Math.max(limiteCajaCobrador - caja.saldoActual, 0);

//   const movimientos = caja.movimientos || [];
//   const cobros = movimientos.filter(
//     (movimiento) => movimiento.tipoMovimiento === "cobro",
//   );
//   const cierres = movimientos.filter(
//     (movimiento) => movimiento.tipoMovimiento === "cierre_caja",
//   );

//   const cobrosHoy = cobros.filter((movimiento) => isToday(movimiento.creadoEn));

//   const totalCobradoHoy = cobrosHoy.reduce(
//     (acc, movimiento) => acc + movimiento.importe,
//     0,
//   );

//   const ultimosCobros = cobros.slice(0, 5);
//   const ultimoCierre = cierres[0];

//   return (
//     <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
//       <div className="hidden grid-cols-3 items-stretch gap-3 sm:grid xl:grid-cols-4">
//         <StatCard
//           title="Recaudado hoy"
//           shortTitle="Hoy"
//           value={formatCompactMoney(totalCobradoHoy)}
//           description="Total de cobros registrados en el día."
//           icon={Banknote}
//           tone="cyan"
//         />

//         <StatCard
//           title="Cobros del día"
//           shortTitle="Cobros"
//           value={String(cobrosHoy.length)}
//           description="Cantidad de pagos registrados hoy."
//           icon={ReceiptText}
//           tone="emerald"
//         />

//         <StatCard
//           title="Disponible para cobrar"
//           shortTitle="Disponible"
//           value={formatCompactMoney(disponibleCaja)}
//           description="Margen disponible antes del cierre de caja."
//           icon={WalletCards}
//           tone={disponibleCaja > 0 ? "amber" : "red"}
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Movimientos"
//             value={String(movimientos.length)}
//             description="Movimientos acumulados en la caja."
//             icon={History}
//             tone="violet"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <CajaPrincipalCard
//             saldoActual={caja.saldoActual}
//             totalCobradoHoy={totalCobradoHoy}
//             limiteCajaCobrador={limiteCajaCobrador}
//             disponibleCaja={disponibleCaja}
//           />

//           <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
//             <div className="mb-3 flex items-start gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
//                 <CreditCard className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                   Cliente
//                 </p>

//                 <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                   Registrar un pago
//                 </h2>

//                 <p className="mt-0.5 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
//                   Ingresá el DNI exacto para abrir el circuito seguro de cobro.
//                 </p>
//               </div>
//             </div>

//             <form
//               action="/cobrador/registrar-pago"
//               className="grid gap-2 lg:grid-cols-[minmax(260px,1fr)_150px]"
//             >
//               <div className="relative">
//                 <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 dark:text-cyan-300" />

//                 <input
//                   name="dni"
//                   type="text"
//                   inputMode="numeric"
//                   placeholder="Ingresá el DNI del cliente"
//                   className="h-11 w-full rounded-2xl border border-cyan-300 bg-cyan-50/70 px-3 pl-10 text-sm text-slate-950 shadow-inner outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-cyan-700 dark:bg-cyan-950/45 dark:text-white dark:shadow-cyan-950/30 dark:placeholder:text-cyan-200/60 dark:focus:border-cyan-400 dark:focus:bg-cyan-950/70 dark:focus:ring-cyan-400/20"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-cyan-100 px-3 text-xs font-medium text-cyan-800 transition hover:bg-cyan-200 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
//               >
//                 <CreditCard className="h-3.5 w-3.5" />
//                 Buscar
//               </button>
//             </form>
//           </div>

//           <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
//             <div className="mb-2.5 flex items-start justify-between gap-3">
//               <div className="flex min-w-0 items-start gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   <Clock3 className="h-4 w-4" />
//                 </div>

//                 <div className="min-w-0">
//                   <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                     Cobros recientes
//                   </p>

//                   <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                     Últimos pagos registrados
//                   </h2>
//                 </div>
//               </div>

//               <Link
//                 href="/cobrador/buscar-cliente"
//                 className="hidden items-center gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200 sm:inline-flex"
//               >
//                 Ver todos
//                 <ArrowRight className="h-3.5 w-3.5" />
//               </Link>
//             </div>

//             {ultimosCobros.length === 0 ? (
//               <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                 Todavía no registraste cobros.
//               </div>
//             ) : (
//               <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/50">
//                 <div className="hidden grid-cols-[minmax(220px,1fr)_120px_120px_95px] border-b border-slate-200 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:text-slate-400 md:grid">
//                   <span>Detalle</span>
//                   <span className="text-right">Importe</span>
//                   <span className="text-right">Fecha</span>
//                   <span className="text-right">Estado</span>
//                 </div>

//                 {ultimosCobros.map((movimiento) => (
//                   <MovimientoRow key={movimiento.id} movimiento={movimiento} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="hidden rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none xl:block">
//             <div className="mb-3">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                 Mi caja
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Resumen operativo
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Saldo actual
//                 </span>

//                 <span
//                   className={`text-right text-[11px] font-medium ${
//                     caja.saldoActual > 0
//                       ? "text-cyan-700 dark:text-cyan-300"
//                       : "text-emerald-700 dark:text-emerald-300"
//                   }`}
//                 >
//                   {formatMoney(caja.saldoActual)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <Banknote className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Disponible
//                 </span>

//                 <span
//                   className={`text-right text-[11px] font-medium ${
//                     disponibleCaja > 0
//                       ? "text-emerald-700 dark:text-emerald-300"
//                       : "text-red-700 dark:text-red-300"
//                   }`}
//                 >
//                   {formatMoney(disponibleCaja)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <ShieldCheck className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Límite caja
//                 </span>

//                 <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
//                   {formatMoney(limiteCajaCobrador)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <Banknote className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Cobros del día
//                 </span>

//                 <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
//                   {formatMoney(totalCobradoHoy)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Último cierre
//                 </span>

//                 <span className="truncate text-right text-[10px] text-slate-500 dark:text-slate-400">
//                   {formatDateTime(ultimoCierre?.creadoEn)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <CheckCircle2 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Estado
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
//                     caja.saldoActual > 0
//                       ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                       : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
//                   }`}
//                 >
//                   {caja.saldoActual > 0 ? "Abierta" : "Sin saldo"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
//             <div className="mb-3">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                 Accesos rápidos
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Operaciones frecuentes
//               </h2>
//             </div>

//             <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
//               <Link
//                 href="/cobrador/buscar-cliente"
//                 className="group flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 <span className="flex min-w-0 items-center gap-2.5">
//                   <FileText className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
//                   <span className="leading-5">Historial del cliente</span>
//                 </span>

//                 <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//               </Link>

//               <Link
//                 href="/cobrador/cerrar-caja"
//                 className="group flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 <span className="flex min-w-0 items-center gap-2.5">
//                   <WalletCards className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
//                   <span className="leading-5">Ver retiros</span>
//                 </span>

//                 <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//               </Link>

//               <Link
//                 href="/cobrador"
//                 className="group flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 <span className="flex min-w-0 items-center gap-2.5">
//                   <History className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
//                   <span className="leading-5">Mi panel</span>
//                 </span>

//                 <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//               </Link>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 xl:block">
//             <p className="font-medium">Importante</p>

//             <p className="mt-1">
//               Cuando tu caja alcance el límite disponible, deberás realizar el
//               cierre con el código generado por administración antes de seguir
//               cobrando.
//             </p>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }


// // src/app/(dashboard)/cobrador/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   ArrowRight,
//   Banknote,
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   FileText,
//   History,
//   ReceiptText,
//   ShieldCheck,
//   UserRound,
//   WalletCards,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import {
//   obtenerCajaCobradorResumen,
//   obtenerContextoCobroCobrador,
// } from "@/services/cobro.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import { CobradorRegistrarPagoCard } from "@/components/forms/CobradorRegistrarPagoCard";
// import type { CajaCobradorMovimientoSafe } from "@/types/cobro.types";

// export const metadata = {
//   title: "Panel cobrador",
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
//   cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
//   emerald:
//     "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
//   amber:
//     "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
//   red: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
//   violet:
//     "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatDateTime(value?: string | null) {
//   if (!value) return "Sin registro";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Sin registro";
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

// function formatDateShort(value?: string | null) {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "-";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month} ${hours}:${minutes}`;
// }

// function isToday(value?: string | null) {
//   if (!value) return false;

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return false;
//   }

//   const now = new Date();

//   return (
//     date.getDate() === now.getDate() &&
//     date.getMonth() === now.getMonth() &&
//     date.getFullYear() === now.getFullYear()
//   );
// }

// function getMovimientoTitle(movimiento: CajaCobradorMovimientoSafe) {
//   if (movimiento.tipoMovimiento === "cierre_caja") {
//     return "Cierre de caja";
//   }

//   const descripcion = movimiento.descripcion || "Cobro registrado";

//   return descripcion
//     .replace(/^Cobro a cliente\s*/i, "")
//     .replace(/\s-\sPago período.*$/i, "")
//     .replace(/\s-\sPago periodo.*$/i, "")
//     .trim();
// }

// function getMovimientoSubtitle(movimiento: CajaCobradorMovimientoSafe) {
//   if (movimiento.tipoMovimiento === "cierre_caja") {
//     return movimiento.observacion || "Caja cerrada";
//   }

//   return movimiento.descripcion || "Movimiento de caja";
// }

// function getTextFromMovimiento(
//   movimiento: CajaCobradorMovimientoSafe,
//   key: string,
// ) {
//   const record = movimiento as unknown as Record<string, unknown>;
//   const value = record[key];

//   if (typeof value === "string") return value;
//   if (typeof value === "number") return String(value);

//   return "";
// }

// function getClienteNombreFromMovimiento(
//   movimiento: CajaCobradorMovimientoSafe,
// ) {
//   const nombreDirecto =
//     getTextFromMovimiento(movimiento, "clienteNombre") ||
//     getTextFromMovimiento(movimiento, "nombreCliente") ||
//     getTextFromMovimiento(movimiento, "nombreCompletoCliente") ||
//     getTextFromMovimiento(movimiento, "cliente") ||
//     "";

//   if (nombreDirecto) return nombreDirecto;

//   const texto = `${movimiento.descripcion || ""} ${
//     movimiento.observacion || ""
//   }`;

//   const matchNombreAntesDni = texto.match(
//     /Cobro\s+a\s+cliente\s+(.+?)\s+DNI\s*[:#-]?\s*\d{6,10}/i,
//   );

//   if (matchNombreAntesDni?.[1]) {
//     return matchNombreAntesDni[1].trim();
//   }

//   const matchNombreAntesPago = texto.match(
//     /Cobro\s+a\s+cliente\s+(.+?)\s*-\s*Pago\s+per[ií]odo/i,
//   );

//   if (matchNombreAntesPago?.[1]) {
//     return matchNombreAntesPago[1].trim();
//   }

//   const matchNombreAntesFactura = texto.match(
//     /Cobro\s+a\s+cliente\s+(.+?)\s*-\s*Factura\s*N[°º]?/i,
//   );

//   if (matchNombreAntesFactura?.[1]) {
//     return matchNombreAntesFactura[1].trim();
//   }

//   const titulo = getMovimientoTitle(movimiento);

//   if (titulo) {
//     return titulo;
//   }

//   return "Cliente";
// }

// function getDniFromMovimiento(movimiento: CajaCobradorMovimientoSafe) {
//   const dniDirecto =
//     getTextFromMovimiento(movimiento, "clienteDni") ||
//     getTextFromMovimiento(movimiento, "dniCliente") ||
//     getTextFromMovimiento(movimiento, "dni") ||
//     "";

//   if (dniDirecto) return dniDirecto;

//   const texto = `${movimiento.descripcion || ""} ${
//     movimiento.observacion || ""
//   }`;

//   const match = texto.match(/DNI\s*[:#-]?\s*(\d{6,10})/i);

//   return match?.[1] || "-";
// }

// function getFacturaFromMovimiento(movimiento: CajaCobradorMovimientoSafe) {
//   const facturaDirecta =
//     getTextFromMovimiento(movimiento, "numeroFactura") ||
//     getTextFromMovimiento(movimiento, "facturaNumero") ||
//     getTextFromMovimiento(movimiento, "numeroComprobante") ||
//     "";

//   if (facturaDirecta) return `Factura N° ${facturaDirecta}`;

//   const texto = `${movimiento.descripcion || ""} ${
//     movimiento.observacion || ""
//   }`;

//   const match = texto.match(/Factura\s*N[°º]?\s*[:#-]?\s*(\d+)/i);

//   return match?.[1] ? `Factura N° ${match[1]}` : "Factura";
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
//     <div className="flex h-full min-h-[88px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none xl:min-h-[96px]">
//       <div className="flex min-w-0 items-start gap-3">
//         <div
//           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}
//         >
//           <Icon className="h-3.5 w-3.5" />
//         </div>

//         <div className="min-w-0">
//           <p className="truncate text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//             <span className="xl:hidden">{shortTitle || title}</span>
//             <span className="hidden xl:inline">{title}</span>
//           </p>

//           <p className="mt-1 truncate text-base font-medium leading-none tracking-tight text-slate-950 dark:text-white xl:text-lg">
//             {value}
//           </p>

//           <p className="mt-1 hidden text-[11px] leading-4 text-slate-600 dark:text-slate-400 xl:block">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CajaPrincipalCard({
//   saldoActual,
//   totalCobradoHoy,
//   limiteCajaCobrador,
//   disponibleCaja,
// }: {
//   saldoActual: number;
//   totalCobradoHoy: number;
//   limiteCajaCobrador: number;
//   disponibleCaja: number;
// }) {
//   const disponiblePositivo = disponibleCaja > 0;

//   return (
//     <div className="relative overflow-hidden rounded-[1.45rem] border border-cyan-400 bg-gradient-to-br from-white via-cyan-50 to-sky-100 p-4 shadow-md shadow-cyan-900/10 dark:border-cyan-500/50 dark:bg-slate-900/80 dark:bg-none dark:shadow-cyan-950/30 xl:p-4">
//       <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.18),transparent_32%),linear-gradient(135deg,rgba(14,165,233,0.08),transparent_42%)] dark:block" />

//       <div className="relative">
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex min-w-0 items-start gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-800/70">
//               <WalletCards className="h-4 w-4" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-800 dark:text-cyan-300">
//                 Caja cobrador
//               </p>

//               <h1 className="mt-1 text-lg font-medium tracking-tight text-slate-950 dark:text-white xl:text-xl">
//                 Mi caja actual
//               </h1>
//             </div>
//           </div>

//           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300 shadow-lg shadow-slate-900/25 dark:bg-slate-950">
//             <ShieldCheck className="h-5 w-5" />
//           </div>
//         </div>

//         <div className="mt-5">
//           <p
//             className={`truncate text-5xl font-medium leading-none tracking-tight xl:text-6xl ${
//               saldoActual > 0
//                 ? "text-slate-950 dark:text-white"
//                 : "text-emerald-700 dark:text-emerald-300"
//             }`}
//           >
//             {formatMoney(saldoActual)}
//           </p>
//         </div>

//         <div className="mt-5 grid grid-cols-3 gap-2 border-t border-cyan-200 pt-3 dark:border-slate-800">
//           <div className="min-w-0">
//             <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//               Cobros del día
//             </p>

//             <p className="mt-1 truncate text-xs font-medium text-slate-950 dark:text-white xl:text-sm">
//               {formatMoney(totalCobradoHoy)}
//             </p>
//           </div>

//           <div className="min-w-0 border-x border-cyan-200 px-2 dark:border-slate-800">
//             <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//               Límite caja
//             </p>

//             <p className="mt-1 truncate text-xs font-medium text-slate-950 dark:text-white xl:text-sm">
//               {formatMoney(limiteCajaCobrador)}
//             </p>
//           </div>

//           <div className="min-w-0 pl-1">
//             <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//               Disponible
//             </p>

//             <p
//               className={`mt-1 truncate text-xs font-medium xl:text-sm ${
//                 disponiblePositivo
//                   ? "text-emerald-700 dark:text-emerald-300"
//                   : "text-red-700 dark:text-red-300"
//               }`}
//             >
//               {formatMoney(disponibleCaja)}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function MovimientoRow({
//   movimiento,
// }: {
//   movimiento: CajaCobradorMovimientoSafe;
// }) {
//   const esCierre = movimiento.tipoMovimiento === "cierre_caja";

//   if (esCierre) {
//     return (
//       <div className="grid gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800 md:grid-cols-[minmax(220px,1fr)_120px_120px_95px] md:items-center">
//         <div className="flex min-w-0 items-center gap-3">
//           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
//             <WalletCards className="h-3.5 w-3.5" />
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//               Cierre de caja
//             </p>

//             <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500 dark:text-slate-400">
//               {getMovimientoSubtitle(movimiento)}
//             </p>
//           </div>
//         </div>

//         <p className="text-xs font-medium text-amber-700 dark:text-amber-300 md:text-right">
//           {formatMoney(movimiento.importe)}
//         </p>

//         <p className="text-[11px] text-slate-500 dark:text-slate-400 md:text-right">
//           {formatDateShort(movimiento.creadoEn)}
//         </p>

//         <div className="md:text-right">
//           <span className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
//             <span className="h-1.5 w-1.5 rounded-full bg-current" />
//             Cierre
//           </span>
//         </div>
//       </div>
//     );
//   }

//   const clienteNombre = getClienteNombreFromMovimiento(movimiento);
//   const clienteDni = getDniFromMovimiento(movimiento);
//   const factura = getFacturaFromMovimiento(movimiento);

//   return (
//     <>
//       <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800 md:hidden">
//         <div className="min-w-0">
//           <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//             {clienteNombre}
//           </p>

//           <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
//             DNI {clienteDni}
//           </p>

//           <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
//             {factura} · {formatDateShort(movimiento.creadoEn)}
//           </p>
//         </div>

//         <p className="shrink-0 text-right text-xs font-medium text-cyan-700 dark:text-cyan-300">
//           {formatMoney(movimiento.importe)}
//         </p>
//       </div>

//       <div className="hidden gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800 md:grid md:grid-cols-[minmax(220px,1fr)_120px_120px_95px] md:items-center">
//         <div className="flex min-w-0 items-center gap-3">
//           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
//             <UserRound className="h-3.5 w-3.5" />
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//               {getMovimientoTitle(movimiento)}
//             </p>

//             <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500 dark:text-slate-400">
//               {getMovimientoSubtitle(movimiento)}
//             </p>
//           </div>
//         </div>

//         <p className="text-xs font-medium text-cyan-700 dark:text-cyan-300 md:text-right">
//           {formatMoney(movimiento.importe)}
//         </p>

//         <p className="text-[11px] text-slate-500 dark:text-slate-400 md:text-right">
//           {formatDateShort(movimiento.creadoEn)}
//         </p>

//         <div className="md:text-right">
//           <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
//             <span className="h-1.5 w-1.5 rounded-full bg-current" />
//             Cobrado
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }

// export default async function CobradorDashboardPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "cobrador") {
//     redirect(`/${user.rol}`);
//   }

//   const currentUser = user as typeof user & {
//     id?: string;
//     userId?: string;
//     nombre?: string;
//     apellido?: string;
//     email?: string;
//   };

//   const cobradorId = currentUser.userId || currentUser.id || "";

//   if (!cobradorId) {
//     redirect("/login");
//   }

//   const [caja, contextoCobro] = await Promise.all([
//     obtenerCajaCobradorResumen(cobradorId),
//     obtenerContextoCobroCobrador(cobradorId),
//   ]);

//   const limiteCajaCobrador = contextoCobro?.limiteCajaCobrador || 100000;
//   const disponibleCaja = Math.max(limiteCajaCobrador - caja.saldoActual, 0);

//   const movimientos = caja.movimientos || [];
//   const cobros = movimientos.filter(
//     (movimiento) => movimiento.tipoMovimiento === "cobro",
//   );
//   const cierres = movimientos.filter(
//     (movimiento) => movimiento.tipoMovimiento === "cierre_caja",
//   );

//   const cobrosHoy = cobros.filter((movimiento) => isToday(movimiento.creadoEn));

//   const totalCobradoHoy = cobrosHoy.reduce(
//     (acc, movimiento) => acc + movimiento.importe,
//     0,
//   );

//   const ultimosCobros = cobros.slice(0, 5);
//   const ultimoCierre = cierres[0];

//   return (
//     <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
//       <div className="hidden grid-cols-3 items-stretch gap-3 sm:grid xl:grid-cols-4">
//         <StatCard
//           title="Recaudado hoy"
//           shortTitle="Hoy"
//           value={formatMoney(totalCobradoHoy)}
//           description="Total de cobros registrados en el día."
//           icon={Banknote}
//           tone="cyan"
//         />

//         <StatCard
//           title="Cobros del día"
//           shortTitle="Cobros"
//           value={String(cobrosHoy.length)}
//           description="Cantidad de pagos registrados hoy."
//           icon={ReceiptText}
//           tone="emerald"
//         />

//         <StatCard
//           title="Disponible para cobrar"
//           shortTitle="Disponible"
//           value={formatMoney(disponibleCaja)}
//           description="Margen disponible antes del cierre de caja."
//           icon={WalletCards}
//           tone={disponibleCaja > 0 ? "amber" : "red"}
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Movimientos"
//             value={String(movimientos.length)}
//             description="Movimientos acumulados en la caja."
//             icon={History}
//             tone="violet"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <CajaPrincipalCard
//             saldoActual={caja.saldoActual}
//             totalCobradoHoy={totalCobradoHoy}
//             limiteCajaCobrador={limiteCajaCobrador}
//             disponibleCaja={disponibleCaja}
//           />

//           <CobradorRegistrarPagoCard />

//           <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
//             <div className="mb-2.5 flex items-start justify-between gap-3">
//               <div className="flex min-w-0 items-start gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   <Clock3 className="h-4 w-4" />
//                 </div>

//                 <div className="min-w-0">
//                   <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                     Cobros recientes
//                   </p>

//                   <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                     Últimos pagos registrados
//                   </h2>
//                 </div>
//               </div>

//               <Link
//                 href="/cobrador/buscar-cliente"
//                 className="hidden items-center gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200 sm:inline-flex"
//               >
//                 Ver todos
//                 <ArrowRight className="h-3.5 w-3.5" />
//               </Link>
//             </div>

//             {ultimosCobros.length === 0 ? (
//               <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                 Todavía no registraste cobros.
//               </div>
//             ) : (
//               <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/50">
//                 <div className="hidden grid-cols-[minmax(220px,1fr)_120px_120px_95px] border-b border-slate-200 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:text-slate-400 md:grid">
//                   <span>Detalle</span>
//                   <span className="text-right">Importe</span>
//                   <span className="text-right">Fecha</span>
//                   <span className="text-right">Estado</span>
//                 </div>

//                 {ultimosCobros.map((movimiento) => (
//                   <MovimientoRow key={movimiento.id} movimiento={movimiento} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="hidden rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none xl:block">
//             <div className="mb-3">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                 Mi caja
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Resumen operativo
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Saldo actual
//                 </span>

//                 <span
//                   className={`text-right text-[11px] font-medium ${
//                     caja.saldoActual > 0
//                       ? "text-cyan-700 dark:text-cyan-300"
//                       : "text-emerald-700 dark:text-emerald-300"
//                   }`}
//                 >
//                   {formatMoney(caja.saldoActual)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <Banknote className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Disponible
//                 </span>

//                 <span
//                   className={`text-right text-[11px] font-medium ${
//                     disponibleCaja > 0
//                       ? "text-emerald-700 dark:text-emerald-300"
//                       : "text-red-700 dark:text-red-300"
//                   }`}
//                 >
//                   {formatMoney(disponibleCaja)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <ShieldCheck className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Límite caja
//                 </span>

//                 <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
//                   {formatMoney(limiteCajaCobrador)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <Banknote className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Cobros del día
//                 </span>

//                 <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
//                   {formatMoney(totalCobradoHoy)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Último cierre
//                 </span>

//                 <span className="truncate text-right text-[10px] text-slate-500 dark:text-slate-400">
//                   {formatDateTime(ultimoCierre?.creadoEn)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2">
//                 <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//                   <CheckCircle2 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Estado
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
//                     caja.saldoActual > 0
//                       ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                       : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
//                   }`}
//                 >
//                   {caja.saldoActual > 0 ? "Abierta" : "Sin saldo"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
//             <div className="mb-3">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                 Accesos rápidos
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Operaciones frecuentes
//               </h2>
//             </div>

//             <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
//               <Link
//                 href="/cobrador/buscar-cliente"
//                 className="group flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 <span className="flex min-w-0 items-center gap-2.5">
//                   <FileText className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
//                   <span className="leading-5">Historial del cliente</span>
//                 </span>

//                 <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//               </Link>

//               <Link
//                 href="/cobrador/cerrar-caja"
//                 className="group flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 <span className="flex min-w-0 items-center gap-2.5">
//                   <WalletCards className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
//                   <span className="leading-5">Ver retiros</span>
//                 </span>

//                 <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//               </Link>

//               <Link
//                 href="/cobrador"
//                 className="group flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 <span className="flex min-w-0 items-center gap-2.5">
//                   <History className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
//                   <span className="leading-5">Mi panel</span>
//                 </span>

//                 <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//               </Link>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 xl:block">
//             <p className="font-medium">Importante</p>

//             <p className="mt-1">
//               Cuando tu caja alcance el límite disponible, deberás realizar el
//               cierre con el código generado por administración antes de seguir
//               cobrando.
//             </p>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/cobrador/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Banknote,
  CalendarClock,
  CheckCircle2,
  Clock3,
  History,
  ReceiptText,
  Search,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import {
  obtenerCajaCobradorResumen,
  obtenerContextoCobroCobrador,
} from "@/services/cobro.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import { CobradorRegistrarPagoCard } from "@/components/forms/CobradorRegistrarPagoCard";
import type { CajaCobradorMovimientoSafe } from "@/types/cobro.types";

export const metadata = {
  title: "Panel cobrador",
};

type ModuleCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone: "primary" | "success" | "warning" | "danger" | "violet";
};

const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

const innerPanelClass =
  "overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none";

const mobileScreenClass =
  "rounded-[1.55rem] border border-blue-200 bg-gradient-to-b from-blue-50 via-slate-50 to-white p-2.5 shadow-xl shadow-blue-950/10 ring-1 ring-white/80 dark:border-blue-500/70 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 dark:shadow-black/35 dark:ring-blue-800/50";

const mobileModuleClass =
  "rounded-[1.18rem] border border-blue-200 bg-white/96 p-3.5 shadow-lg shadow-blue-950/10 ring-1 ring-white/80 backdrop-blur dark:border-blue-500/45 dark:bg-slate-950/72 dark:shadow-black/25 dark:ring-blue-950/60";

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
};

const valueToneClasses = {
  primary: "text-blue-700 dark:text-blue-300",
  success: "text-emerald-700 dark:text-emerald-300",
  warning: "text-amber-700 dark:text-amber-300",
  danger: "text-red-700 dark:text-red-300",
  violet: "text-violet-700 dark:text-violet-300",
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatDateTime(value?: string | null) {
  if (!value) return "Sin registro";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Sin registro";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "p. m." : "a. m.";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${day}/${month}/${year}, ${String(hours).padStart(
    2,
    "0",
  )}:${minutes} ${period}`;
}

function formatDateShort(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month} ${hours}:${minutes}`;
}

function isToday(value?: string | null) {
  if (!value) return false;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const now = new Date();

  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function getMovimientoTitle(movimiento: CajaCobradorMovimientoSafe) {
  if (movimiento.tipoMovimiento === "cierre_caja") {
    return "Cierre de caja";
  }

  const descripcion = movimiento.descripcion || "Cobro registrado";

  return descripcion
    .replace(/^Cobro a cliente\s*/i, "")
    .replace(/\s-\sPago período.*$/i, "")
    .replace(/\s-\sPago periodo.*$/i, "")
    .trim();
}

function getMovimientoSubtitle(movimiento: CajaCobradorMovimientoSafe) {
  if (movimiento.tipoMovimiento === "cierre_caja") {
    return movimiento.observacion || "Caja cerrada";
  }

  return movimiento.descripcion || "Movimiento de caja";
}

function getTextFromMovimiento(
  movimiento: CajaCobradorMovimientoSafe,
  key: string,
) {
  const record = movimiento as unknown as Record<string, unknown>;
  const value = record[key];

  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);

  return "";
}

function getClienteNombreFromMovimiento(
  movimiento: CajaCobradorMovimientoSafe,
) {
  const nombreDirecto =
    getTextFromMovimiento(movimiento, "clienteNombre") ||
    getTextFromMovimiento(movimiento, "nombreCliente") ||
    getTextFromMovimiento(movimiento, "nombreCompletoCliente") ||
    getTextFromMovimiento(movimiento, "cliente") ||
    "";

  if (nombreDirecto) return nombreDirecto;

  const texto = `${movimiento.descripcion || ""} ${
    movimiento.observacion || ""
  }`;

  const matchNombreAntesDni = texto.match(
    /Cobro\s+a\s+cliente\s+(.+?)\s+DNI\s*[:#-]?\s*\d{6,10}/i,
  );

  if (matchNombreAntesDni?.[1]) {
    return matchNombreAntesDni[1].trim();
  }

  const matchNombreAntesPago = texto.match(
    /Cobro\s+a\s+cliente\s+(.+?)\s*-\s*Pago\s+per[ií]odo/i,
  );

  if (matchNombreAntesPago?.[1]) {
    return matchNombreAntesPago[1].trim();
  }

  const matchNombreAntesFactura = texto.match(
    /Cobro\s+a\s+cliente\s+(.+?)\s*-\s*Factura\s*N[°º]?/i,
  );

  if (matchNombreAntesFactura?.[1]) {
    return matchNombreAntesFactura[1].trim();
  }

  const titulo = getMovimientoTitle(movimiento);

  if (titulo) {
    return titulo;
  }

  return "Cliente";
}

function getDniFromMovimiento(movimiento: CajaCobradorMovimientoSafe) {
  const dniDirecto =
    getTextFromMovimiento(movimiento, "clienteDni") ||
    getTextFromMovimiento(movimiento, "dniCliente") ||
    getTextFromMovimiento(movimiento, "dni") ||
    "";

  if (dniDirecto) return dniDirecto;

  const texto = `${movimiento.descripcion || ""} ${
    movimiento.observacion || ""
  }`;

  const match = texto.match(/DNI\s*[:#-]?\s*(\d{6,10})/i);

  return match?.[1] || "-";
}

function getFacturaFromMovimiento(movimiento: CajaCobradorMovimientoSafe) {
  const facturaDirecta =
    getTextFromMovimiento(movimiento, "numeroFactura") ||
    getTextFromMovimiento(movimiento, "facturaNumero") ||
    getTextFromMovimiento(movimiento, "numeroComprobante") ||
    "";

  if (facturaDirecta) return `Factura N° ${facturaDirecta}`;

  const texto = `${movimiento.descripcion || ""} ${
    movimiento.observacion || ""
  }`;

  const match = texto.match(/Factura\s*N[°º]?\s*[:#-]?\s*(\d+)/i);

  return match?.[1] ? `Factura N° ${match[1]}` : "Factura";
}

function HeaderCobrador() {
  return (
    <section className={`${panelClass} hidden p-3.5 sm:block`}>
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <ShieldCheck className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className={sectionTitleClass}>Panel cobrador</p>

          <h1 className={sectionSubtitleClass}>Resumen operativo</h1>

          <p className={`${sectionDescriptionClass} max-w-3xl`}>
            Controlá tu caja actual, registrá pagos y revisá los últimos cobros
            realizados durante la jornada.
          </p>
        </div>
      </div>
    </section>
  );
}

function ModuleCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: ModuleCardProps) {
  return (
    <article className={`${panelClass} p-3.5`}>
      <div className="flex min-w-0 items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${iconToneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p
            className={`mt-1 truncate text-lg font-semibold leading-none tracking-tight ${valueToneClasses[tone]}`}
          >
            {value}
          </p>

          <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

function ModulosResumen({
  totalCobradoHoy,
  cobrosHoy,
  disponibleCaja,
  movimientos,
}: {
  totalCobradoHoy: number;
  cobrosHoy: number;
  disponibleCaja: number;
  movimientos: number;
}) {
  return (
    <section className="hidden gap-3 sm:grid sm:grid-cols-2 xl:grid-cols-4">
      <ModuleCard
        title="Recaudado hoy"
        value={formatMoney(totalCobradoHoy)}
        description="Total registrado durante la jornada."
        icon={Banknote}
        tone="primary"
      />

      <ModuleCard
        title="Cobros del día"
        value={String(cobrosHoy)}
        description="Cantidad de pagos confirmados hoy."
        icon={ReceiptText}
        tone="success"
      />

      <ModuleCard
        title="Disponible"
        value={formatMoney(disponibleCaja)}
        description="Margen disponible antes del cierre."
        icon={WalletCards}
        tone={disponibleCaja > 0 ? "warning" : "danger"}
      />

      <ModuleCard
        title="Movimientos"
        value={String(movimientos)}
        description="Registros acumulados en la caja."
        icon={History}
        tone="violet"
      />
    </section>
  );
}

function MobileWalletPanel({
  saldoActual,
  totalCobradoHoy,
  disponibleCaja,
  cobrosHoy,
}: {
  saldoActual: number;
  totalCobradoHoy: number;
  disponibleCaja: number;
  cobrosHoy: number;
}) {
  const cajaConSaldo = saldoActual > 0;

  return (
    <section className="relative overflow-hidden rounded-[1.25rem] border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-600 to-violet-600 p-3.5 text-white shadow-md shadow-blue-950/15 ring-1 ring-blue-200/70 backdrop-blur dark:border-blue-500/45 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 dark:shadow-black/20 dark:ring-white/10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/18 blur-2xl dark:bg-blue-300/20" />
      <div className="pointer-events-none absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-white/12 blur-3xl dark:bg-violet-400/16" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
              Mi caja
            </p>

            <h1 className="mt-0.5 text-sm font-semibold text-white">
              Saldo para rendir
            </h1>
          </div>

          <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-white/35 bg-white/18 px-2 text-[10px] font-semibold leading-none text-white shadow-sm">
            {cajaConSaldo ? "Caja abierta" : "Sin saldo"}
          </span>
        </div>

        <p className="mt-5 break-words text-[40px] font-semibold leading-none tracking-tight text-white">
          {formatMoney(saldoActual)}
        </p>

        <p className="mt-2 text-[12px] leading-5 text-white/78">
          Resumen rápido de la jornada actual.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-white/22 bg-white/14 p-2.5 shadow-sm shadow-blue-950/5 backdrop-blur dark:border-white/15 dark:bg-white/[0.08] dark:shadow-black/5">
          <div>
            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.08em] text-white/68">
              Hoy
            </p>

            <p className="mt-1 truncate text-[12px] font-semibold text-white">
              {formatMoney(totalCobradoHoy)}
            </p>
          </div>

          <div className="border-x border-white/20 px-2 dark:border-white/15">
            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.08em] text-white/68">
              Disponible
            </p>

            <p className="mt-1 truncate text-[12px] font-semibold text-white">
              {formatMoney(disponibleCaja)}
            </p>
          </div>

          <div className="pl-1 text-right">
            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.08em] text-white/68">
              Cobros
            </p>

            <p className="mt-1 text-[12px] font-semibold text-white">
              {cobrosHoy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CajaPrincipalCard({
  saldoActual,
  totalCobradoHoy,
  limiteCajaCobrador,
  disponibleCaja,
}: {
  saldoActual: number;
  totalCobradoHoy: number;
  limiteCajaCobrador: number;
  disponibleCaja: number;
}) {
  const disponiblePositivo = disponibleCaja > 0;
  const cajaConSaldo = saldoActual > 0;

  return (
    <section
      className={`relative hidden overflow-hidden rounded-xl border p-3.5 shadow-md ring-1 sm:block ${
        cajaConSaldo
          ? "border-blue-300 bg-blue-50/90 shadow-blue-950/10 ring-blue-100 dark:border-blue-800 dark:bg-blue-950/24 dark:shadow-black/20 dark:ring-blue-900/50"
          : "border-emerald-300 bg-emerald-50/85 shadow-emerald-950/10 ring-emerald-100 dark:border-emerald-900/70 dark:bg-emerald-950/20 dark:shadow-black/20 dark:ring-emerald-900/50"
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                cajaConSaldo
                  ? "border-blue-300 bg-white text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                  : "border-emerald-300 bg-white text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
              }`}
            >
              <WalletCards className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                  cajaConSaldo
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-emerald-700 dark:text-emerald-300"
                }`}
              >
                Caja cobrador
              </p>

              <h2 className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
                Mi caja actual
              </h2>

              <p className="mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
                Saldo operativo pendiente de cierre.
              </p>
            </div>
          </div>

          <p
            className={`mt-4 break-words text-4xl font-semibold leading-none tracking-tight sm:text-5xl ${
              cajaConSaldo
                ? "text-slate-950 dark:text-white"
                : "text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {formatMoney(saldoActual)}
          </p>
        </div>

        <div
          className={`w-full rounded-lg border bg-white/80 p-3 shadow-sm dark:bg-slate-950/35 lg:w-[280px] ${
            cajaConSaldo
              ? "border-blue-300 dark:border-blue-900/70"
              : "border-emerald-300 dark:border-emerald-900/70"
          }`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2 dark:border-slate-700">
            <span className="text-[12px] text-slate-600 dark:text-slate-400">
              Estado
            </span>

            <span
              className={`inline-flex h-6 items-center rounded-full border px-2 text-[10px] font-semibold leading-none ${
                cajaConSaldo
                  ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/35 dark:text-blue-300"
                  : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
              }`}
            >
              {cajaConSaldo ? "Abierta" : "Sin saldo"}
            </span>
          </div>

          <div className="grid gap-2 pt-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] text-slate-600 dark:text-slate-400">
                Cobros del día
              </span>

              <span className="text-[12px] font-semibold text-slate-950 dark:text-white">
                {formatMoney(totalCobradoHoy)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] text-slate-600 dark:text-slate-400">
                Límite caja
              </span>

              <span className="text-[12px] font-semibold text-slate-950 dark:text-white">
                {formatMoney(limiteCajaCobrador)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] text-slate-600 dark:text-slate-400">
                Disponible
              </span>

              <span
                className={`text-[12px] font-semibold ${
                  disponiblePositivo
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-red-700 dark:text-red-300"
                }`}
              >
                {formatMoney(disponibleCaja)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MovimientoRow({
  movimiento,
}: {
  movimiento: CajaCobradorMovimientoSafe;
}) {
  const esCierre = movimiento.tipoMovimiento === "cierre_caja";

  if (esCierre) {
    return (
      <div className="grid gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700 md:grid-cols-[minmax(220px,1fr)_120px_120px_95px] md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300">
            <WalletCards className="h-3.5 w-3.5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-950 dark:text-white">
              Cierre de caja
            </p>

            <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500 dark:text-slate-400">
              {getMovimientoSubtitle(movimiento)}
            </p>
          </div>
        </div>

        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 md:text-right">
          {formatMoney(movimiento.importe)}
        </p>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 md:text-right">
          {formatDateShort(movimiento.creadoEn)}
        </p>

        <div className="md:text-right">
          <span className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold leading-5 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Cierre
          </span>
        </div>
      </div>
    );
  }

  const clienteNombre = getClienteNombreFromMovimiento(movimiento);
  const clienteDni = getDniFromMovimiento(movimiento);
  const factura = getFacturaFromMovimiento(movimiento);

  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700 md:hidden">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-slate-950 dark:text-white">
            {clienteNombre}
          </p>

          <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
            DNI {clienteDni}
          </p>

          <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
            {factura} · {formatDateShort(movimiento.creadoEn)}
          </p>
        </div>

        <p className="shrink-0 text-right text-xs font-semibold text-blue-700 dark:text-blue-300">
          {formatMoney(movimiento.importe)}
        </p>
      </div>

      <div className="hidden gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700 md:grid md:grid-cols-[minmax(220px,1fr)_120px_120px_95px] md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
            <UserRound className="h-3.5 w-3.5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-950 dark:text-white">
              {getMovimientoTitle(movimiento)}
            </p>

            <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500 dark:text-slate-400">
              {getMovimientoSubtitle(movimiento)}
            </p>
          </div>
        </div>

        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 md:text-right">
          {formatMoney(movimiento.importe)}
        </p>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 md:text-right">
          {formatDateShort(movimiento.creadoEn)}
        </p>

        <div className="md:text-right">
          <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Cobrado
          </span>
        </div>
      </div>
    </>
  );
}

function CobrosRecientesPanel({
  ultimosCobros,
}: {
  ultimosCobros: CajaCobradorMovimientoSafe[];
}) {
  return (
    <section className={`${panelClass} hidden p-3.5 sm:block`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 sm:flex">
            <Clock3 className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className={sectionTitleClass}>Cobros recientes</p>

            <h2 className={sectionSubtitleClass}>Últimos pagos</h2>

            <p className={`${sectionDescriptionClass} hidden sm:block`}>
              Movimientos recientes confirmados por el cobrador.
            </p>
          </div>
        </div>

        <Link
          href="/cobrador/buscar-cliente"
          className="hidden h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900 sm:inline-flex"
        >
          Ver todos
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {ultimosCobros.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400 dark:shadow-none">
          Todavía no registraste cobros.
        </div>
      ) : (
        <div className={innerPanelClass}>
          <div className="hidden grid-cols-[minmax(220px,1fr)_120px_120px_95px] border-b border-slate-300 bg-slate-100 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400 md:grid">
            <span>Detalle</span>
            <span className="text-right">Importe</span>
            <span className="text-right">Fecha</span>
            <span className="text-right">Estado</span>
          </div>

          {ultimosCobros.map((movimiento) => (
            <MovimientoRow key={movimiento.id} movimiento={movimiento} />
          ))}
        </div>
      )}
    </section>
  );
}

function MobileCobrosRecientesPanel({
  ultimosCobros,
}: {
  ultimosCobros: CajaCobradorMovimientoSafe[];
}) {
  return (
    <section className={mobileModuleClass}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
            Cobros recientes
          </p>

          <h2 className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
            Últimos pagos
          </h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/60 dark:bg-violet-500/18 dark:text-violet-200">
          <Clock3 className="h-4 w-4" />
        </div>
      </div>

      {ultimosCobros.length === 0 ? (
        <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50/70 p-4 text-[12px] leading-5 text-slate-600 dark:border-blue-500/35 dark:bg-blue-950/24 dark:text-blue-100/82">
          Todavía no registraste cobros.
        </div>
      ) : (
        <div className="grid gap-2.5">
          {ultimosCobros.slice(0, 4).map((movimiento) => {
            const clienteNombre = getClienteNombreFromMovimiento(movimiento);
            const clienteDni = getDniFromMovimiento(movimiento);
            const factura = getFacturaFromMovimiento(movimiento);

            return (
              <article
                key={movimiento.id}
                className="rounded-xl border border-blue-200 bg-blue-50/75 px-3.5 py-3 shadow-sm shadow-blue-950/5 dark:border-blue-500/35 dark:bg-blue-950/24 dark:shadow-black/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-slate-950 dark:text-white">
                      {clienteNombre}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-slate-600 dark:text-blue-100/78">
                      DNI {clienteDni}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-slate-600 dark:text-blue-100/78">
                      {factura} · {formatDateShort(movimiento.creadoEn)}
                    </p>
                  </div>

                  <p className="shrink-0 text-right text-[13px] font-semibold text-blue-700 dark:text-blue-200">
                    {formatMoney(movimiento.importe)}
                  </p>
                </div>
              </article>
            );
          })}

          <Link
            href="/cobrador/buscar-cliente"
            className="group flex h-11 items-center justify-between rounded-xl border border-blue-200 bg-white px-3.5 text-[13px] font-semibold text-blue-700 shadow-sm shadow-blue-950/5 transition hover:bg-blue-50 active:scale-[0.99] dark:border-blue-500/35 dark:bg-blue-950/24 dark:text-blue-200 dark:shadow-black/10 dark:hover:bg-blue-950/35"
          >
            Ver todos los cobros
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
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

function MiCajaAside({
  saldoActual,
  disponibleCaja,
  limiteCajaCobrador,
  totalCobradoHoy,
  ultimoCierreFecha,
}: {
  saldoActual: number;
  disponibleCaja: number;
  limiteCajaCobrador: number;
  totalCobradoHoy: number;
  ultimoCierreFecha?: string | null;
}) {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Mi caja</p>

          <h2 className={sectionSubtitleClass}>Resumen operativo</h2>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <WalletCards className="h-4 w-4" />
        </div>
      </div>

      <div className={innerPanelClass}>
        <ResumenItem
          icon={<WalletCards className="h-3.5 w-3.5" />}
          label="Saldo actual"
          value={formatMoney(saldoActual)}
          tone={saldoActual > 0 ? "primary" : "success"}
        />

        <ResumenItem
          icon={<Banknote className="h-3.5 w-3.5" />}
          label="Disponible"
          value={formatMoney(disponibleCaja)}
          tone={disponibleCaja > 0 ? "success" : "danger"}
        />

        <ResumenItem
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
          label="Límite caja"
          value={formatMoney(limiteCajaCobrador)}
        />

        <ResumenItem
          icon={<Banknote className="h-3.5 w-3.5" />}
          label="Cobros del día"
          value={formatMoney(totalCobradoHoy)}
          tone="primary"
        />

        <ResumenItem
          icon={<CalendarClock className="h-3.5 w-3.5" />}
          label="Último cierre"
          value={formatDateTime(ultimoCierreFecha)}
        />

        <ResumenItem
          icon={<CheckCircle2 className="h-3.5 w-3.5" />}
          label="Estado"
          value={saldoActual > 0 ? "Abierta" : "Sin saldo"}
          tone={saldoActual > 0 ? "primary" : "neutral"}
        />
      </div>
    </section>
  );
}

function AccesosRapidosAside() {
  const links = [
    {
      label: "Buscar cliente",
      description: "Consultar cuenta del cliente",
      href: "/cobrador/buscar-cliente",
      icon: Search,
    },
    {
      label: "Cerrar caja",
      description: "Validar código y confirmar cierre",
      href: "/cobrador/caja/cierre",
      icon: WalletCards,
    },
    {
      label: "Mi caja",
      description: "Revisar estado operativo",
      href: "/cobrador/caja",
      icon: History,
    },
  ];

  return (
    <section className={`${panelClass} hidden p-3.5 sm:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Accesos rápidos</p>

        <h2 className={sectionSubtitleClass}>Operaciones frecuentes</h2>
      </div>

      <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-[58px] items-center justify-between gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 ring-1 ring-white/50 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:ring-slate-800/60 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
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

function ImportanteAside() {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Importante</p>

        <h2 className={sectionSubtitleClass}>Límite de caja</h2>
      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
        Cuando tu caja alcance el límite disponible, deberás realizar el cierre
        con el código generado por administración antes de seguir cobrando.
      </div>
    </section>
  );
}

export default async function CobradorDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const currentUser = user as typeof user & {
    id?: string;
    userId?: string;
    nombre?: string;
    apellido?: string;
    email?: string;
  };

  const cobradorId = currentUser.userId || currentUser.id || "";

  if (!cobradorId) {
    redirect("/login");
  }

  const [caja, contextoCobro] = await Promise.all([
    obtenerCajaCobradorResumen(cobradorId),
    obtenerContextoCobroCobrador(cobradorId),
  ]);

  const limiteCajaCobrador = contextoCobro?.limiteCajaCobrador || 100000;
  const disponibleCaja = Math.max(limiteCajaCobrador - caja.saldoActual, 0);

  const movimientos = caja.movimientos || [];
  const cobros = movimientos.filter(
    (movimiento) => movimiento.tipoMovimiento === "cobro",
  );
  const cierres = movimientos.filter(
    (movimiento) => movimiento.tipoMovimiento === "cierre_caja",
  );

  const cobrosHoy = cobros.filter((movimiento) => isToday(movimiento.creadoEn));

  const totalCobradoHoy = cobrosHoy.reduce(
    (acc, movimiento) => acc + movimiento.importe,
    0,
  );

  const ultimosCobros = cobros.slice(0, 5);
  const ultimoCierre = cierres[0];

  return (
    <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
      <div className="sm:hidden">
        <div className={mobileScreenClass}>
          <MobileWalletPanel
            saldoActual={caja.saldoActual}
            totalCobradoHoy={totalCobradoHoy}
            disponibleCaja={disponibleCaja}
            cobrosHoy={cobrosHoy.length}
          />

          <div className="mt-2.5">
            <CobradorRegistrarPagoCard variant="wallet" />
          </div>

          <div className="mt-2.5">
            <MobileCobrosRecientesPanel ultimosCobros={ultimosCobros} />
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <DashboardGrid>
          <DashboardMain>
            <HeaderCobrador />

            <div className="mt-3">
              <ModulosResumen
                totalCobradoHoy={totalCobradoHoy}
                cobrosHoy={cobrosHoy.length}
                disponibleCaja={disponibleCaja}
                movimientos={movimientos.length}
              />
            </div>

            <div className="mt-3">
              <CajaPrincipalCard
                saldoActual={caja.saldoActual}
                totalCobradoHoy={totalCobradoHoy}
                limiteCajaCobrador={limiteCajaCobrador}
                disponibleCaja={disponibleCaja}
              />
            </div>

            <div className="mt-3">
              <CobradorRegistrarPagoCard />
            </div>

            <div className="mt-3">
              <CobrosRecientesPanel ultimosCobros={ultimosCobros} />
            </div>
          </DashboardMain>

          <DashboardAside>
            <MiCajaAside
              saldoActual={caja.saldoActual}
              disponibleCaja={disponibleCaja}
              limiteCajaCobrador={limiteCajaCobrador}
              totalCobradoHoy={totalCobradoHoy}
              ultimoCierreFecha={ultimoCierre?.creadoEn}
            />

            <div className="mt-3">
              <AccesosRapidosAside />
            </div>

            <div className="mt-3">
              <ImportanteAside />
            </div>
          </DashboardAside>
        </DashboardGrid>
      </div>
    </PageShell>
  );
}
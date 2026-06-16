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


// src/app/(dashboard)/cobrador/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileText,
  History,
  ReceiptText,
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

type StatCardProps = {
  title: string;
  shortTitle?: string;
  value: string;
  description: string;
  icon: typeof WalletCards;
  tone: "cyan" | "emerald" | "amber" | "red" | "violet";
};

const toneClasses = {
  cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
  emerald:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  amber:
    "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  red: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
  violet:
    "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
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

function StatCard({
  title,
  shortTitle,
  value,
  description,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <div className="flex h-full min-h-[88px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none xl:min-h-[96px]">
      <div className="flex min-w-0 items-start gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            <span className="xl:hidden">{shortTitle || title}</span>
            <span className="hidden xl:inline">{title}</span>
          </p>

          <p className="mt-1 truncate text-base font-medium leading-none tracking-tight text-slate-950 dark:text-white xl:text-lg">
            {value}
          </p>

          <p className="mt-1 hidden text-[11px] leading-4 text-slate-600 dark:text-slate-400 xl:block">
            {description}
          </p>
        </div>
      </div>
    </div>
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

  return (
    <div className="relative overflow-hidden rounded-[1.45rem] border border-cyan-400 bg-gradient-to-br from-white via-cyan-50 to-sky-100 p-4 shadow-md shadow-cyan-900/10 dark:border-cyan-500/50 dark:bg-slate-900/80 dark:bg-none dark:shadow-cyan-950/30 xl:p-4">
      <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.18),transparent_32%),linear-gradient(135deg,rgba(14,165,233,0.08),transparent_42%)] dark:block" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-800/70">
              <WalletCards className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-800 dark:text-cyan-300">
                Caja cobrador
              </p>

              <h1 className="mt-1 text-lg font-medium tracking-tight text-slate-950 dark:text-white xl:text-xl">
                Mi caja actual
              </h1>
            </div>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300 shadow-lg shadow-slate-900/25 dark:bg-slate-950">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5">
          <p
            className={`truncate text-5xl font-medium leading-none tracking-tight xl:text-6xl ${
              saldoActual > 0
                ? "text-slate-950 dark:text-white"
                : "text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {formatMoney(saldoActual)}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-cyan-200 pt-3 dark:border-slate-800">
          <div className="min-w-0">
            <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Cobros del día
            </p>

            <p className="mt-1 truncate text-xs font-medium text-slate-950 dark:text-white xl:text-sm">
              {formatMoney(totalCobradoHoy)}
            </p>
          </div>

          <div className="min-w-0 border-x border-cyan-200 px-2 dark:border-slate-800">
            <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Límite caja
            </p>

            <p className="mt-1 truncate text-xs font-medium text-slate-950 dark:text-white xl:text-sm">
              {formatMoney(limiteCajaCobrador)}
            </p>
          </div>

          <div className="min-w-0 pl-1">
            <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Disponible
            </p>

            <p
              className={`mt-1 truncate text-xs font-medium xl:text-sm ${
                disponiblePositivo
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-red-700 dark:text-red-300"
              }`}
            >
              {formatMoney(disponibleCaja)}
            </p>
          </div>
        </div>
      </div>
    </div>
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
      <div className="grid gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800 md:grid-cols-[minmax(220px,1fr)_120px_120px_95px] md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
            <WalletCards className="h-3.5 w-3.5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
              Cierre de caja
            </p>

            <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500 dark:text-slate-400">
              {getMovimientoSubtitle(movimiento)}
            </p>
          </div>
        </div>

        <p className="text-xs font-medium text-amber-700 dark:text-amber-300 md:text-right">
          {formatMoney(movimiento.importe)}
        </p>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 md:text-right">
          {formatDateShort(movimiento.creadoEn)}
        </p>

        <div className="md:text-right">
          <span className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
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
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800 md:hidden">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
            {clienteNombre}
          </p>

          <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
            DNI {clienteDni}
          </p>

          <p className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-slate-400">
            {factura} · {formatDateShort(movimiento.creadoEn)}
          </p>
        </div>

        <p className="shrink-0 text-right text-xs font-medium text-cyan-700 dark:text-cyan-300">
          {formatMoney(movimiento.importe)}
        </p>
      </div>

      <div className="hidden gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800 md:grid md:grid-cols-[minmax(220px,1fr)_120px_120px_95px] md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
            <UserRound className="h-3.5 w-3.5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
              {getMovimientoTitle(movimiento)}
            </p>

            <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-500 dark:text-slate-400">
              {getMovimientoSubtitle(movimiento)}
            </p>
          </div>
        </div>

        <p className="text-xs font-medium text-cyan-700 dark:text-cyan-300 md:text-right">
          {formatMoney(movimiento.importe)}
        </p>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 md:text-right">
          {formatDateShort(movimiento.creadoEn)}
        </p>

        <div className="md:text-right">
          <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Cobrado
          </span>
        </div>
      </div>
    </>
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
      <div className="hidden grid-cols-3 items-stretch gap-3 sm:grid xl:grid-cols-4">
        <StatCard
          title="Recaudado hoy"
          shortTitle="Hoy"
          value={formatMoney(totalCobradoHoy)}
          description="Total de cobros registrados en el día."
          icon={Banknote}
          tone="cyan"
        />

        <StatCard
          title="Cobros del día"
          shortTitle="Cobros"
          value={String(cobrosHoy.length)}
          description="Cantidad de pagos registrados hoy."
          icon={ReceiptText}
          tone="emerald"
        />

        <StatCard
          title="Disponible para cobrar"
          shortTitle="Disponible"
          value={formatMoney(disponibleCaja)}
          description="Margen disponible antes del cierre de caja."
          icon={WalletCards}
          tone={disponibleCaja > 0 ? "amber" : "red"}
        />

        <div className="hidden xl:block">
          <StatCard
            title="Movimientos"
            value={String(movimientos.length)}
            description="Movimientos acumulados en la caja."
            icon={History}
            tone="violet"
          />
        </div>
      </div>

      <DashboardGrid>
        <DashboardMain>
          <CajaPrincipalCard
            saldoActual={caja.saldoActual}
            totalCobradoHoy={totalCobradoHoy}
            limiteCajaCobrador={limiteCajaCobrador}
            disponibleCaja={disponibleCaja}
          />

          <CobradorRegistrarPagoCard />

          <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
            <div className="mb-2.5 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
                  <Clock3 className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                    Cobros recientes
                  </p>

                  <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
                    Últimos pagos registrados
                  </h2>
                </div>
              </div>

              <Link
                href="/cobrador/buscar-cliente"
                className="hidden items-center gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200 sm:inline-flex"
              >
                Ver todos
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {ultimosCobros.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                Todavía no registraste cobros.
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="hidden grid-cols-[minmax(220px,1fr)_120px_120px_95px] border-b border-slate-200 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:text-slate-400 md:grid">
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
          </div>
        </DashboardMain>

        <DashboardAside>
          <div className="hidden rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none xl:block">
            <div className="mb-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                Mi caja
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Resumen operativo
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
                <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                  <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                  Saldo actual
                </span>

                <span
                  className={`text-right text-[11px] font-medium ${
                    caja.saldoActual > 0
                      ? "text-cyan-700 dark:text-cyan-300"
                      : "text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  {formatMoney(caja.saldoActual)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
                <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                  <Banknote className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                  Disponible
                </span>

                <span
                  className={`text-right text-[11px] font-medium ${
                    disponibleCaja > 0
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-red-700 dark:text-red-300"
                  }`}
                >
                  {formatMoney(disponibleCaja)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
                <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                  Límite caja
                </span>

                <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
                  {formatMoney(limiteCajaCobrador)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
                <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                  <Banknote className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                  Cobros del día
                </span>

                <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
                  {formatMoney(totalCobradoHoy)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
                <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                  <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                  Último cierre
                </span>

                <span className="truncate text-right text-[10px] text-slate-500 dark:text-slate-400">
                  {formatDateTime(ultimoCierre?.creadoEn)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-2">
                <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                  Estado
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                    caja.saldoActual > 0
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {caja.saldoActual > 0 ? "Abierta" : "Sin saldo"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
            <div className="mb-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                Accesos rápidos
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Operaciones frecuentes
              </h2>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
              <Link
                href="/cobrador/buscar-cliente"
                className="group flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <FileText className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
                  <span className="leading-5">Historial del cliente</span>
                </span>

                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/cobrador/cerrar-caja"
                className="group flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <WalletCards className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
                  <span className="leading-5">Ver retiros</span>
                </span>

                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/cobrador"
                className="group flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <History className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
                  <span className="leading-5">Mi panel</span>
                </span>

                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="hidden rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 xl:block">
            <p className="font-medium">Importante</p>

            <p className="mt-1">
              Cuando tu caja alcance el límite disponible, deberás realizar el
              cierre con el código generado por administración antes de seguir
              cobrando.
            </p>
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
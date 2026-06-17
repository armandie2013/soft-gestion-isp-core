// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   CalendarClock,
//   CreditCard,
//   KeyRound,
//   WalletCards,
// } from "lucide-react";
// import { CajaCobradorTable } from "@/components/tables/CajaCobradorTable";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerCajaCobradorResumen } from "@/services/cobro.service";

// export const metadata = {
//   title: "Mi caja",
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

// export default async function CobradorCajaPage() {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "cobrador") {
//     redirect(`/${user.rol}`);
//   }

//   const caja = await obtenerCajaCobradorResumen(user.userId);

//   const ultimoCierre =
//     caja.movimientos.find(
//       (movimiento) => movimiento.tipoMovimiento === "cierre_caja",
//     ) || null;

//   const tieneSaldo = caja.saldoActual > 0;

//   return (
//     <section className="mx-auto w-full max-w-7xl space-y-4">
//       <div className="rounded-[1.6rem] border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:p-5">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div className="min-w-0">
//             <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-200">
//               <CreditCard className="h-3.5 w-3.5" />
//               Cobrador
//             </div>

//             <div className="mt-4 flex items-start gap-3">
//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950">
//                 <WalletCards className="h-5 w-5" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
//                   Mi caja actual
//                 </p>

//                 <h1
//                   className={`mt-1 text-3xl font-semibold tracking-tight sm:text-4xl ${
//                     caja.saldoActual > 0
//                       ? "text-red-700 dark:text-red-300"
//                       : "text-slate-950 dark:text-white"
//                   }`}
//                 >
//                   {formatMoney(caja.saldoActual)}
//                 </h1>

//                 <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
//                   Total pendiente de cierre en tu caja.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {tieneSaldo ? (
//             <Link
//               href="/cobrador/caja/cierre"
//               className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-amber-300 bg-amber-100 px-5 text-sm font-semibold text-amber-950 shadow-sm transition hover:bg-amber-200 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60"
//             >
//               <KeyRound className="h-4 w-4" />
//               Cerrar caja
//             </Link>
//           ) : (
//             <div className="inline-flex h-11 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-semibold text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300">
//               Caja en cero
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
//         <div className="grid gap-3 sm:grid-cols-2">
//           <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
//             <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//               Total cobrado
//             </p>

//             <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//               {formatMoney(caja.totalCobrado)}
//             </p>

//             <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
//               Suma histórica de cobros registrados.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
//             <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//               Total cerrado
//             </p>

//             <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//               {formatMoney(caja.totalCierres)}
//             </p>

//             <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
//               Importes ya cerrados y entregados.
//             </p>
//           </div>
//         </div>

//         <div className="mt-3 grid gap-3 border-t border-slate-200 pt-3 dark:border-slate-800 sm:grid-cols-2">
//           <div className="min-w-0">
//             <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//               Último retiro
//             </p>

//             <p className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">
//               {formatMoney(ultimoCierre?.importe || 0)}
//             </p>
//           </div>

//           <div className="min-w-0 sm:text-right">
//             <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 sm:justify-end">
//               <CalendarClock className="h-3 w-3" />

//               <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">
//                 Fecha último retiro
//               </p>
//             </div>

//             <p className="mt-1 truncate text-[11px] text-slate-500 dark:text-slate-400">
//               {formatDate(ultimoCierre?.creadoEn || null)}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
//         <div className="mb-4">
//           <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Movimientos
//           </p>

//           <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
//             Historial de caja
//           </h2>

//           <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
//             Cobros registrados, comprobantes y cierres realizados.
//           </p>
//         </div>

//         <CajaCobradorTable movimientos={caja.movimientos} />
//       </div>
//     </section>
//   );
// }

// src/app/(dashboard)/cobrador/caja/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarClock,
  CheckCircle2,
  CreditCard,
  FileText,
  KeyRound,
  ReceiptText,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CajaCobradorTable } from "@/components/tables/CajaCobradorTable";
import { PageShell } from "@/components/ui/PageShell";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerCajaCobradorResumen } from "@/services/cobro.service";

export const metadata = {
  title: "Mi caja",
};

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone: "cyan" | "emerald" | "amber" | "red";
};

const toneClasses = {
  cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
  emerald:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  amber:
    "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  red: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatCompactMoney(value: number) {
  const amount = Number(value || 0);
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (abs >= 1_000_000) {
    return `${sign}$ ${(abs / 1_000_000).toLocaleString("es-AR", {
      maximumFractionDigits: 1,
    })} M`;
  }

  const integerPart = Math.round(abs)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${sign}$ ${integerPart}`;
}

function formatDate(value: string | null) {
  if (!value) return "Sin cierre";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string | null) {
  if (!value) return "Sin cierre";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <div className="flex h-full min-h-[92px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none xl:min-h-[100px]">
      <div className="flex min-w-0 items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {title}
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

export default async function CobradorCajaPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const caja = await obtenerCajaCobradorResumen(user.userId);

  const ultimoCierre =
    caja.movimientos.find(
      (movimiento) => movimiento.tipoMovimiento === "cierre_caja",
    ) || null;

  const ultimoMovimiento = caja.movimientos[0] || null;
  const cantidadCobros = caja.movimientos.filter(
    (movimiento) => movimiento.tipoMovimiento === "cobro",
  ).length;
  const cantidadCierres = caja.movimientos.filter(
    (movimiento) => movimiento.tipoMovimiento === "cierre_caja",
  ).length;

  const tieneSaldo = caja.saldoActual > 0;

  return (
    <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
      <section className="w-full space-y-3">
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-300 bg-white shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
          <div
            className={`border-b px-4 py-4 dark:border-slate-800 sm:px-5 ${
              tieneSaldo
                ? "border-red-200 bg-red-50 dark:bg-red-950/20"
                : "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20"
            }`}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${
                    tieneSaldo
                      ? "bg-red-100 text-red-700 ring-red-200 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900/70"
                      : "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900/70"
                  }`}
                >
                  <WalletCards className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
                      tieneSaldo
                        ? "text-red-700 dark:text-red-300"
                        : "text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    Mi caja actual
                  </p>

                  <h1
                    className={`mt-1 truncate text-4xl font-semibold tracking-tight sm:text-5xl ${
                      tieneSaldo
                        ? "text-red-700 dark:text-red-300"
                        : "text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    {formatMoney(caja.saldoActual)}
                  </h1>

                  <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:text-sm sm:leading-6">
                    Este es el saldo pendiente de cierre. Cuando entregues la
                    caja, el administrador debe generar el código de cierre.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                {tieneSaldo ? (
                  <Link
                    href="/cobrador/caja/cierre"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-amber-400 bg-gradient-to-r from-amber-400 to-orange-400 px-5 text-sm font-semibold text-amber-950 shadow-lg shadow-amber-900/15 transition hover:from-amber-300 hover:to-orange-300 active:scale-[0.99] dark:border-amber-300/70 dark:from-amber-300 dark:to-orange-300 dark:text-slate-950 dark:shadow-amber-500/20 sm:w-auto"
                  >
                    <KeyRound className="h-4 w-4" />
                    Cerrar caja
                  </Link>
                ) : (
                  <div className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 text-sm font-semibold text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300 sm:w-auto">
                    <CheckCircle2 className="h-4 w-4" />
                    Caja en cero
                  </div>
                )}

                <Link
                  href="/cobrador"
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
                >
                  Volver al panel
                </Link>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
              <StatCard
                title="Total cobrado"
                value={formatCompactMoney(caja.totalCobrado)}
                description="Suma histórica de cobros registrados."
                icon={CreditCard}
                tone="cyan"
              />

              <StatCard
                title="Total cerrado"
                value={formatCompactMoney(caja.totalCierres)}
                description="Importes ya cerrados y entregados."
                icon={CheckCircle2}
                tone="emerald"
              />

              <StatCard
                title="Cobros"
                value={String(cantidadCobros)}
                description="Cantidad de cobros registrados."
                icon={ReceiptText}
                tone="cyan"
              />

              <StatCard
                title="Cierres"
                value={String(cantidadCierres)}
                description="Cantidad de cierres realizados."
                icon={KeyRound}
                tone={cantidadCierres > 0 ? "amber" : "emerald"}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-300 bg-white shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50 sm:px-5">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
                  <FileText className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                    Movimientos
                  </p>

                  <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
                    Historial de caja
                  </h2>

                  <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    Cobros registrados, comprobantes y cierres realizados.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <CajaCobradorTable movimientos={caja.movimientos} />
            </div>
          </div>

          <aside className="space-y-3">
            <div className="overflow-hidden rounded-[1.35rem] border border-slate-300 bg-white shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
              <div className="border-b border-slate-200 bg-cyan-50 px-4 py-4 dark:border-slate-800 dark:bg-cyan-950/20">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
                    <CalendarClock className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                      Último cierre
                    </p>

                    <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
                      Retiro de caja
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid gap-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
                      Importe
                    </p>

                    <p className="mt-1 truncate text-base font-medium text-slate-950 dark:text-white">
                      {formatMoney(ultimoCierre?.importe || 0)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
                      Fecha
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
                      {formatDate(ultimoCierre?.creadoEn || null)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                    <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
                      Último movimiento
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
                      {formatDateTime(ultimoMovimiento?.creadoEn || null)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
              <div className="flex gap-2">
                <KeyRound className="mt-0.5 h-4 w-4 shrink-0" />

                <p>
                  Para cerrar caja necesitás el código generado por el
                  administrador. El cierre descuenta el saldo actual y deja tu
                  caja en cero.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
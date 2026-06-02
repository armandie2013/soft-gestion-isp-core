import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarClock,
  CreditCard,
  KeyRound,
  WalletCards,
} from "lucide-react";
import { CajaCobradorTable } from "@/components/tables/CajaCobradorTable";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerCajaCobradorResumen } from "@/services/cobro.service";

export const metadata = {
  title: "Mi caja",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatDate(value: string | null) {
  if (!value) return "Sin cierre";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
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

  const tieneSaldo = caja.saldoActual > 0;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="rounded-[1.6rem] border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-200">
              <CreditCard className="h-3.5 w-3.5" />
              Cobrador
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950">
                <WalletCards className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Mi caja actual
                </p>

                <h1
                  className={`mt-1 text-3xl font-semibold tracking-tight sm:text-4xl ${
                    caja.saldoActual > 0
                      ? "text-red-700 dark:text-red-300"
                      : "text-slate-950 dark:text-white"
                  }`}
                >
                  {formatMoney(caja.saldoActual)}
                </h1>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Total pendiente de cierre en tu caja.
                </p>
              </div>
            </div>
          </div>

          {tieneSaldo ? (
            <Link
              href="/cobrador/caja/cierre"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-amber-300 bg-amber-100 px-5 text-sm font-semibold text-amber-950 shadow-sm transition hover:bg-amber-200 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60"
            >
              <KeyRound className="h-4 w-4" />
              Cerrar caja
            </Link>
          ) : (
            <div className="inline-flex h-11 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-semibold text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300">
              Caja en cero
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Total cobrado
            </p>

            <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {formatMoney(caja.totalCobrado)}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Suma histórica de cobros registrados.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Total cerrado
            </p>

            <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {formatMoney(caja.totalCierres)}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Importes ya cerrados y entregados.
            </p>
          </div>
        </div>

        <div className="mt-3 grid gap-3 border-t border-slate-200 pt-3 dark:border-slate-800 sm:grid-cols-2">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Último retiro
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">
              {formatMoney(ultimoCierre?.importe || 0)}
            </p>
          </div>

          <div className="min-w-0 sm:text-right">
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 sm:justify-end">
              <CalendarClock className="h-3 w-3" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                Fecha último retiro
              </p>
            </div>

            <p className="mt-1 truncate text-[11px] text-slate-500 dark:text-slate-400">
              {formatDate(ultimoCierre?.creadoEn || null)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Movimientos
          </p>

          <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
            Historial de caja
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Cobros registrados, comprobantes y cierres realizados.
          </p>
        </div>

        <CajaCobradorTable movimientos={caja.movimientos} />
      </div>
    </section>
  );
}
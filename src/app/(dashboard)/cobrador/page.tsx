import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarClock,
  CreditCard,
  Search,
  UserRound,
  WalletCards,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerCajaCobradorResumen } from "@/services/cobro.service";

export const metadata = {
  title: "Panel cobrador",
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

export default async function CobradorPage() {
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

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <Link
        href="/cobrador/caja"
        className="group block overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/75 dark:hover:border-cyan-800 sm:p-5"
      >
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

          <div className="flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60 sm:min-w-64">
            <div className="grid w-full grid-cols-2 gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Último retiro
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">
                  {formatMoney(ultimoCierre?.importe || 0)}
                </p>
              </div>

              <div className="min-w-0 text-right">
                <div className="flex items-center justify-end gap-1 text-slate-500 dark:text-slate-400">
                  <CalendarClock className="h-3 w-3" />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                    Último cierre
                  </p>
                </div>

                <p className="mt-1 truncate text-[11px] text-slate-500 dark:text-slate-400">
                  {formatDate(ultimoCierre?.creadoEn || null)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <Link
        href="/cobrador/buscar-cliente"
        className="group block rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-cyan-800"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            <Search className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Buscar cliente
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
              Buscar por DNI
            </h2>

            <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">
              Consultar cliente, estado de cuenta y registrar pago.
            </p>
          </div>
        </div>
      </Link>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
            <UserRound className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Sesión activa
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
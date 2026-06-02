import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  CalendarClock,
  ShieldCheck,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerAdminDashboardResumen } from "@/services/admin-dashboard.service";

export const metadata = {
  title: "Administrador",
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

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  const resumen = await obtenerAdminDashboardResumen();
  const hayMasDeUnCobrador = resumen.cobradores.length > 1;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <Link
        href="/admin/caja-cobradores/cierres"
        className="group block overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/75 dark:hover:border-cyan-800 sm:p-5"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              Administración
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950">
                <Banknote className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Cuenta administración
                </p>

                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {formatMoney(resumen.totalCuentaAdmin)}
                </h1>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Total recibido por cierres de caja confirmados.
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60 sm:min-w-56">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                En cobradores
              </p>

              <p
                className={`mt-1 text-base font-semibold ${
                  resumen.totalEnCajaCobradores > 0
                    ? "text-red-700 dark:text-red-300"
                    : "text-emerald-700 dark:text-emerald-300"
                }`}
              >
                {formatMoney(resumen.totalEnCajaCobradores)}
              </p>
            </div>

            <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
          </div>
        </div>
      </Link>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Cobradores
          </p>

          <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
            Cuentas activas
          </h2>
        </div>

        {resumen.cobradores.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
            Todavía no hay usuarios con rol cobrador.
          </div>
        ) : (
          <>
            <div className="w-full overflow-hidden rounded-2xl">
              <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex snap-x snap-mandatory">
                  {resumen.cobradores.map((cobrador) => (
                    <div
                      key={cobrador.cobradorId}
                      className="w-full min-w-full shrink-0 snap-start"
                    >
                      <Link
                        href="/admin/caja-cobradores"
                        className="block min-h-[140px] rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-cyan-800"
                      >
                        <div className="flex min-h-[116px] flex-col justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                              {cobrador.nombreCompleto}
                            </p>

                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                              Cuenta actual
                            </p>
                          </div>

                          <p
                            className={`text-2xl font-semibold leading-none tracking-tight ${
                              cobrador.saldoActual > 0
                                ? "text-red-700 dark:text-red-300"
                                : "text-slate-950 dark:text-white"
                            }`}
                          >
                            {formatMoney(cobrador.saldoActual)}
                          </p>

                          <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-2 dark:border-slate-800">
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                                Último retiro
                              </p>

                              <p className="truncate text-xs font-semibold leading-5 text-slate-800 dark:text-slate-200">
                                {formatMoney(cobrador.ultimoRetiroImporte)}
                              </p>
                            </div>

                            <div className="min-w-0 text-right">
                              <div className="flex items-center justify-end gap-1 text-slate-500 dark:text-slate-400">
                                <CalendarClock className="h-3 w-3" />

                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                                  Último cierre
                                </p>
                              </div>

                              <p className="truncate text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                                {formatDate(cobrador.ultimoRetiroFecha)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {hayMasDeUnCobrador ? (
              <div className="mt-3 flex items-center justify-center gap-1.5">
                {resumen.cobradores.map((cobrador) => (
                  <span
                    key={cobrador.cobradorId}
                    className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"
                  />
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
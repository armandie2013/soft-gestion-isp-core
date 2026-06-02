import { redirect } from "next/navigation";
import {
  CreditCard,
  KeyRound,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { CierreCajaCobradorForm } from "@/components/forms/CierreCajaCobradorForm";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerCajaCobradorResumen } from "@/services/cobro.service";

export const metadata = {
  title: "Cerrar caja",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export default async function CierreCajaCobradorPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const caja = await obtenerCajaCobradorResumen(user.userId);
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
                  Cerrar caja
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
                  Importe pendiente que debe coincidir con el código generado
                  por administración.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`inline-flex h-11 items-center justify-center rounded-2xl border px-5 text-sm font-semibold ${
              tieneSaldo
                ? "border-amber-300 bg-amber-100 text-amber-950 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-200"
                : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300"
            }`}
          >
            {tieneSaldo ? "Código requerido" : "Caja en cero"}
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            <KeyRound className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Validar código
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
              Código de cierre
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Ingresá el código de 6 dígitos generado por el administrador. El
              código solo es válido si coincide con tu usuario y con el importe
              actual de tu caja.
            </p>
          </div>
        </div>

        {tieneSaldo ? (
          <CierreCajaCobradorForm />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">
                  Tu caja ya está en $0.
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  No hay saldo pendiente para cerrar.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
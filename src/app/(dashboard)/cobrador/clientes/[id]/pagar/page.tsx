// src/app/(dashboard)/cobrador/clientes/[id]/pagar/page.tsx

import { notFound, redirect } from "next/navigation";
import { UserRound, WalletCards } from "lucide-react";
import { CobroForm } from "@/components/forms/CobroForm";
import { PageShell } from "@/components/ui/PageShell";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";
import { obtenerContextoCobroCobrador } from "@/services/cobro.service";

type RegistrarPagoPageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    dni?: string;
  };
};

export const metadata = {
  title: "Registrar pago",
};

function limpiarDni(value?: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 12);
}

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

export default async function RegistrarPagoPage({
  params,
  searchParams,
}: RegistrarPagoPageProps) {
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
  };

  const cobradorId = currentUser.userId || currentUser.id || "";

  if (!cobradorId) {
    redirect("/login");
  }

  const [resumen, contextoCobro] = await Promise.all([
    obtenerResumenClienteParaCobrador(params.id),
    obtenerContextoCobroCobrador(cobradorId),
  ]);

  if (!resumen) {
    notFound();
  }

  if (!contextoCobro) {
    redirect("/cobrador");
  }

  const { cliente, periodosPendientes, totalPendiente } = resumen;
  const dniHabilitante = limpiarDni(searchParams?.dni);

  if (!dniHabilitante || dniHabilitante !== cliente.dni) {
    redirect("/cobrador/registrar-pago");
  }

  const volverCuentaHref = `/cobrador/clientes/${cliente.id}?modo=pago&dni=${cliente.dni}`;

  return (
    <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
      <section className="mx-auto w-full max-w-6xl space-y-3">
        <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
              <UserRound className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                Registrar pago
              </p>

              <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                {cliente.apellido}, {cliente.nombre}
              </h1>

              <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-[1.25rem] border border-red-300 bg-red-50 px-4 py-3 shadow-sm shadow-red-950/5 dark:border-red-900/70 dark:bg-red-950/25">
            <div className="flex items-start gap-3">
              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 sm:flex">
                <WalletCards className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-red-700 dark:text-red-300">
                  Saldo pendiente
                </p>

                <p className="mt-1 truncate text-4xl font-semibold tracking-tight text-red-700 dark:text-red-300 sm:text-5xl">
                  {formatMoney(totalPendiente)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.45rem] border-2 border-cyan-300 bg-cyan-50/70 p-3 shadow-sm shadow-cyan-950/5 dark:border-cyan-900/80 dark:bg-cyan-950/15 sm:p-4">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
              <WalletCards className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                Datos del pago
              </p>

              <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
                Seleccionar período e ingresar importe
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
                Revisá el período habilitado y cargá el monto recibido.
              </p>
            </div>
          </div>

          <CobroForm
            clienteId={cliente.id}
            periodosPendientes={periodosPendientes}
            saldoCajaActual={contextoCobro.saldoCajaActual}
            limiteCajaCobrador={contextoCobro.limiteCajaCobrador}
            returnHref={volverCuentaHref}
          />
        </div>
      </section>
    </PageShell>
  );
}
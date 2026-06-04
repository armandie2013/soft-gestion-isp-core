// src/app/(dashboard)/cobrador/clientes/[id]/pagar/page.tsx

import { notFound, redirect } from "next/navigation";
import { CreditCard, FileText, UserRound, WalletCards } from "lucide-react";
import { CobroForm } from "@/components/forms/CobroForm";
import { Badge } from "@/components/ui/Badge";
import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";

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
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function getEstadoBadgeVariant(estado: string) {
  if (estado === "activo") return "success";
  if (estado === "suspendido") return "warning";
  return "danger";
}

export default async function RegistrarPagoPage({
  params,
  searchParams,
}: RegistrarPagoPageProps) {
  const resumen = await obtenerResumenClienteParaCobrador(params.id);

  if (!resumen) {
    notFound();
  }

  const { cliente, periodosPendientes, totalPendiente } = resumen;
  const dniHabilitante = limpiarDni(searchParams?.dni);

  if (!dniHabilitante || dniHabilitante !== cliente.dni) {
    redirect("/cobrador/registrar-pago");
  }

  const tieneDeuda = totalPendiente > 0;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="rounded-[1.6rem] border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-200">
              <CreditCard className="h-3.5 w-3.5" />
              Registrar pago
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950">
                <UserRound className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Cliente N° {cliente.numeroCliente}
                </p>

                <h1 className="mt-1 truncate text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {cliente.apellido}, {cliente.nombre}
                </h1>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  DNI {cliente.dni}
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60 sm:min-w-72">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Total pendiente
              </p>

              <p
                className={`mt-1 text-2xl font-semibold tracking-tight ${
                  tieneDeuda
                    ? "text-red-700 dark:text-red-300"
                    : "text-slate-950 dark:text-white"
                }`}
              >
                {formatMoney(totalPendiente)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={getEstadoBadgeVariant(cliente.estado) as any}>
                {cliente.estado}
              </Badge>

              {cliente.plan ? (
                <Badge variant="info">{cliente.plan.nombre}</Badge>
              ) : (
                <Badge variant="warning">Sin plan</Badge>
              )}

              <Badge variant={tieneDeuda ? "danger" : "success"}>
                {tieneDeuda ? "Con deuda" : "Sin deuda"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            <WalletCards className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Datos del pago
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
              Seleccionar período e importe
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              El pago se aplicará sobre un período pendiente y generará su
              comprobante correspondiente.
            </p>
          </div>
        </div>

        <CobroForm
          clienteId={cliente.id}
          periodosPendientes={periodosPendientes}
        />
      </div>

      <div className="rounded-[1.6rem] border border-cyan-200 bg-cyan-50 p-4 text-sm leading-6 text-cyan-900 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
            <FileText className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
              Circuito validado
            </p>

            <p className="mt-1">
              Este pago fue habilitado desde el circuito seguro por DNI exacto.
              Luego de registrar el pago, quedará asentado en la cuenta corriente
              del cliente y también en tu caja de cobrador.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
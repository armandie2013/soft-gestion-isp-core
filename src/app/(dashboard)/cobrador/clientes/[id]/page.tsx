// src/app/(dashboard)/cobrador/clientes/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  CreditCard,
  Eye,
  FileText,
  UserRound,
  WalletCards,
  Wifi,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";

type CobradorClientePageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    modo?: string;
    dni?: string;
  };
};

export const metadata = {
  title: "Cliente",
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

function getPeriodoBadge(estadoPeriodo: string) {
  if (estadoPeriodo === "cancelado") {
    return {
      label: "Cancelado",
      variant: "success",
    };
  }

  if (estadoPeriodo === "a_favor") {
    return {
      label: "A favor",
      variant: "info",
    };
  }

  return {
    label: "Pendiente",
    variant: "danger",
  };
}

function DataLine({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-2 last:border-b-0 dark:border-slate-800">
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-slate-950 dark:text-white">
        {value || "-"}
      </span>
    </div>
  );
}

export default async function CobradorClientePage({
  params,
  searchParams,
}: CobradorClientePageProps) {
  const resumen = await obtenerResumenClienteParaCobrador(params.id);

  if (!resumen) {
    notFound();
  }

  const { cliente, estadoCuenta, totalPendiente } = resumen;
  const tieneDeuda = totalPendiente > 0;

  const dniHabilitante = limpiarDni(searchParams?.dni);
  const vieneDeCircuitoPago =
    searchParams?.modo === "pago" && dniHabilitante === cliente.dni;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="rounded-[1.6rem] border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-200">
              <UserRound className="h-3.5 w-3.5" />
              Cliente N° {cliente.numeroCliente}
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950">
                <UserRound className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Ficha del cliente
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

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            <Wifi className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Datos del servicio
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
              Información del cliente
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Datos personales y plan contratado.
            </p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/60">
            <DataLine label="Teléfono" value={cliente.telefono} />
            <DataLine label="Dirección" value={cliente.direccion} />
            <DataLine label="Localidad" value={cliente.localidad} />
            <DataLine label="Provincia" value={cliente.provincia} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/60">
            <DataLine
              label="Plan"
              value={cliente.plan?.nombre || "Sin plan asignado"}
            />
            <DataLine label="Tipo" value={cliente.plan?.tipo || "-"} />
            <DataLine
              label="Importe"
              value={cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
            />
            <DataLine label="Detalle" value={cliente.plan?.detalle || "-"} />
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                <WalletCards className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Cuenta del cliente
                </p>

                <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
                  Total pendiente
                </h2>

                <p
                  className={`mt-2 text-3xl font-semibold tracking-tight ${
                    tieneDeuda
                      ? "text-red-700 dark:text-red-300"
                      : "text-slate-950 dark:text-white"
                  }`}
                >
                  {formatMoney(totalPendiente)}
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Calculado sobre períodos facturados con saldo mayor a cero.
                </p>
              </div>
            </div>
          </div>

          {vieneDeCircuitoPago ? (
            <Link
              href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-5 text-sm font-semibold text-cyan-800 shadow-sm transition hover:bg-cyan-100 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 sm:w-auto"
            >
              <CreditCard className="h-4 w-4" />
              Registrar pago
            </Link>
          ) : (
            <div className="max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
              <div className="flex gap-2">
                <AlertTriangle className="mt-1 h-4 w-4 shrink-0" />
                <p>
                  Esta ficha es solo informativa. Para registrar un pago, el
                  cobrador debe iniciar el circuito desde Registrar un pago con
                  DNI exacto.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            <FileText className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Estado de cuenta
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
              Períodos del cliente
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Vista resumida por período. Entrá al detalle para ver factura,
              pagos, notas y comprobantes.
            </p>
          </div>
        </div>

        {estadoCuenta.periodos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
            Este cliente todavía no tiene períodos facturados.
          </div>
        ) : (
          <div className="grid gap-2">
            {estadoCuenta.periodos.map((periodo) => {
              const badge = getPeriodoBadge(periodo.estadoPeriodo);
              const periodoConSaldo = periodo.saldoPeriodo > 0;

              return (
                <div
                  key={periodo.facturaId}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-950 dark:text-white">
                          {periodo.periodoLabel}
                        </p>

                        <Badge variant={badge.variant as any}>
                          {badge.label}
                        </Badge>
                      </div>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Factura N° {periodo.numeroComprobante} · Original{" "}
                        {formatMoney(periodo.importeOriginal)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:min-w-72 sm:items-end">
                      <div className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900/80 sm:w-auto sm:min-w-40">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                          Saldo
                        </p>

                        <p
                          className={`mt-0.5 text-sm font-semibold ${
                            periodoConSaldo
                              ? "text-red-700 dark:text-red-300"
                              : "text-slate-950 dark:text-white"
                          }`}
                        >
                          {formatMoney(periodo.saldoPeriodo)}
                        </p>
                      </div>

                      <Link
                        href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
                        className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 transition hover:bg-cyan-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
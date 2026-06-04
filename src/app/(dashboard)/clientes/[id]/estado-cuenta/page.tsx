// src/app/(dashboard)/clientes/[id]/estado-cuenta/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  FileText,
  MinusCircle,
  PlusCircle,
  ReceiptText,
  UserRound,
  WalletCards,
  Wifi,
} from "lucide-react";
import { EstadoCuentaTable } from "@/components/tables/EstadoCuentaTable";
import { obtenerClientePorId } from "@/services/cliente.service";
import { obtenerEstadoCuentaCliente } from "@/services/movimiento-financiero.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

type EstadoCuentaPageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Estado de cuenta",
};

type StatCardProps = {
  title: string;
  shortTitle?: string;
  value: string;
  description: string;
  icon: typeof ReceiptText;
  tone: "cyan" | "emerald" | "amber" | "red" | "violet";
};

const toneClasses = {
  cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
  emerald:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  amber:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  red: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
  violet:
    "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatCompactMoney(value: number) {
  const amount = Number(value || 0);
  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);

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

function StatCard({
  title,
  shortTitle,
  value,
  description,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <div className="flex h-full min-h-[78px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:min-h-[122px] sm:rounded-[1.35rem] sm:p-3.5">
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl ${toneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 sm:text-[10px] sm:tracking-[0.15em]">
            <span className="sm:hidden">{shortTitle || title}</span>
            <span className="hidden sm:inline">{title}</span>
          </p>

          <p className="mt-0.5 truncate text-[15px] font-medium leading-none tracking-tight text-slate-950 dark:text-white sm:mt-1 sm:text-xl">
            {value}
          </p>

          <p className="mt-1 hidden text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function estadoClienteLabel(estado: string) {
  if (estado === "activo") return "Activo";
  if (estado === "suspendido") return "Suspendido";
  return "Baja";
}

function estadoCuentaLabel(saldo: number) {
  if (saldo > 0) return "Pendiente";
  if (saldo < 0) return "A favor";
  return "Al día";
}

function estadoCuentaTone(saldo: number): "emerald" | "amber" | "red" {
  if (saldo > 0) return "red";
  if (saldo < 0) return "amber";
  return "emerald";
}

export default async function EstadoCuentaPage({
  params,
}: EstadoCuentaPageProps) {
  const [cliente, estadoCuenta] = await Promise.all([
    obtenerClientePorId(params.id),
    obtenerEstadoCuentaCliente(params.id),
  ]);

  if (!cliente || !estadoCuenta) {
    notFound();
  }

  const nombreCompleto =
    `${cliente.apellido || ""}, ${cliente.nombre || ""}`.trim() ||
    "Cliente sin nombre";

  const cantidadPeriodos = estadoCuenta.periodos.length;
  const periodosPendientes = estadoCuenta.periodos.filter(
    (periodo) => periodo.estadoPeriodo === "pendiente",
  ).length;
  const periodosCancelados = estadoCuenta.periodos.filter(
    (periodo) => periodo.estadoPeriodo === "cancelado",
  ).length;
  const periodosAFavor = estadoCuenta.periodos.filter(
    (periodo) => periodo.estadoPeriodo === "a_favor",
  ).length;

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
        <StatCard
          title="Saldo"
          shortTitle="Saldo"
          value={formatCompactMoney(estadoCuenta.saldo)}
          description="Saldo total del cliente."
          icon={WalletCards}
          tone={estadoCuentaTone(estadoCuenta.saldo)}
        />

        <StatCard
          title="Períodos"
          shortTitle="Per."
          value={String(cantidadPeriodos)}
          description="Períodos facturados."
          icon={ReceiptText}
          tone="cyan"
        />

        <StatCard
          title="Pendientes"
          shortTitle="Pend."
          value={String(periodosPendientes)}
          description="Períodos con saldo pendiente."
          icon={MinusCircle}
          tone={periodosPendientes > 0 ? "red" : "emerald"}
        />

        <StatCard
          title="Estado"
          value={estadoCuentaLabel(estadoCuenta.saldo)}
          description="Estado general de la cuenta."
          icon={CheckCircle2}
          tone={estadoCuentaTone(estadoCuenta.saldo)}
        />

        <div className="hidden xl:block">
          <StatCard
            title="Cliente"
            value={`N° ${cliente.numeroCliente}`}
            description="Número interno del cliente."
            icon={UserRound}
            tone="violet"
          />
        </div>
      </div>

      <DashboardGrid>
        <DashboardMain>
          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Estado de cuenta
                </p>

                <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
                  Cuenta del cliente
                </h1>

                <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
                  {nombreCompleto} · DNI {cliente.dni || "-"} · Cliente N°{" "}
                  {cliente.numeroCliente}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                <Link
                  href={`/clientes/${cliente.id}/nota-debito`}
                  className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 text-[11px] font-medium text-amber-700 shadow-sm transition hover:bg-amber-100 active:scale-[0.99] dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Débito
                </Link>

                <Link
                  href={`/clientes/${cliente.id}/nota-credito`}
                  className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-[11px] font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-100 active:scale-[0.99] dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
                >
                  <MinusCircle className="h-3.5 w-3.5" />
                  Crédito
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
            <div className="mb-3 flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                  estadoCuenta.saldo > 0
                    ? "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                    : estadoCuenta.saldo < 0
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                      : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                }`}
              >
                <WalletCards className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Resumen financiero
                </p>

                <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
                  {formatMoney(estadoCuenta.saldo)}
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  {estadoCuenta.saldo > 0
                    ? "El cliente registra saldo pendiente."
                    : estadoCuenta.saldo < 0
                      ? "El cliente registra saldo a favor."
                      : "El cliente no registra saldo pendiente."}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Total debe
                </p>

                <p className="mt-1 truncate text-sm font-medium text-red-700 dark:text-red-300">
                  {formatMoney(estadoCuenta.totalDebe)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Total haber
                </p>

                <p className="mt-1 truncate text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {formatMoney(estadoCuenta.totalHaber)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Saldo
                </p>

                <p
                  className={`mt-1 truncate text-sm font-medium ${
                    estadoCuenta.saldo > 0
                      ? "text-red-700 dark:text-red-300"
                      : estadoCuenta.saldo < 0
                        ? "text-amber-700 dark:text-amber-300"
                        : "text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  {formatMoney(estadoCuenta.saldo)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
            <div className="mb-3 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                <FileText className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Períodos facturados
                </p>

                <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
                  Historial por período
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  Entrá al detalle para ver factura, notas asociadas y pagos
                  aplicados.
                </p>
              </div>
            </div>

            <EstadoCuentaTable
              clienteId={cliente.id}
              periodos={estadoCuenta.periodos}
            />
          </div>
        </DashboardMain>

        <DashboardAside>
          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Resumen
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Información de cuenta
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Cliente
                </span>

                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                  N° {cliente.numeroCliente}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Estado cliente
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    cliente.estado === "activo"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : cliente.estado === "suspendido"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                        : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                  }`}
                >
                  {estadoClienteLabel(cliente.estado)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Plan
                </span>

                <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
                  {cliente.plan?.nombre || "Sin plan"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Períodos
                </span>

                <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
                  {cantidadPeriodos}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Cancelados
                </span>

                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  {periodosCancelados}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  A favor
                </span>

                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                  {periodosAFavor}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Saldo final
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    estadoCuenta.saldo > 0
                      ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                      : estadoCuenta.saldo < 0
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  }`}
                >
                  {formatMoney(estadoCuenta.saldo)}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Acciones
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Movimientos manuales
              </h2>
            </div>

            <div className="grid gap-2">
              <Link
                href={`/clientes/${cliente.id}/nota-debito`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs font-medium text-amber-700 transition hover:bg-amber-100 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <PlusCircle className="h-3.5 w-3.5 shrink-0" />
                  Nota débito
                </span>
              </Link>

              <Link
                href={`/clientes/${cliente.id}/nota-credito`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <MinusCircle className="h-3.5 w-3.5 shrink-0" />
                  Nota crédito
                </span>
              </Link>
            </div>
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
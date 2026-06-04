// src/app/(dashboard)/clientes/[id]/nota-credito/page.tsx

import { notFound } from "next/navigation";
import {
  CheckCircle2,
  FileText,
  MinusCircle,
  ReceiptText,
  ShieldAlert,
  UserRound,
  WalletCards,
} from "lucide-react";
import { NotaFinancieraForm } from "@/components/forms/NotaFinancieraForm";
import { obtenerClientePorId } from "@/services/cliente.service";
import { obtenerFacturasCliente } from "@/services/movimiento-financiero.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

type PageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Nota de crédito",
};

type StatCardProps = {
  title: string;
  shortTitle?: string;
  value: string;
  description: string;
  icon: typeof MinusCircle;
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
  const abs = Math.abs(amount);

  if (abs >= 1_000_000) {
    return `$ ${(abs / 1_000_000).toLocaleString("es-AR", {
      maximumFractionDigits: 1,
    })} M`;
  }

  const integerPart = Math.round(abs)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${integerPart}`;
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

export default async function NotaCreditoPage({ params }: PageProps) {
  const [cliente, facturas] = await Promise.all([
    obtenerClientePorId(params.id),
    obtenerFacturasCliente(params.id),
  ]);

  if (!cliente) {
    notFound();
  }

  const nombreCompleto =
    `${cliente.apellido || ""}, ${cliente.nombre || ""}`.trim() ||
    "Cliente sin nombre";

  const facturasConSaldo = facturas.filter(
    (factura) => Number(factura.saldoFactura || 0) > 0,
  );

  const totalFacturas = facturas.length;
  const totalFacturasConSaldo = facturasConSaldo.length;

  const saldoFacturas = facturas.reduce(
    (acc, factura) => acc + Number(factura.saldoFactura || 0),
    0,
  );

  const saldoDisponibleCredito = facturasConSaldo.reduce(
    (acc, factura) => acc + Number(factura.saldoFactura || 0),
    0,
  );

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
        <StatCard
          title="Tipo"
          value="Crédito"
          description="Descuenta saldo de una factura."
          icon={MinusCircle}
          tone="emerald"
        />

        <StatCard
          title="Cliente"
          shortTitle="Cliente"
          value={`N° ${cliente.numeroCliente}`}
          description="Número interno del cliente."
          icon={UserRound}
          tone="cyan"
        />

        <StatCard
          title="Facturas"
          shortTitle="Fact."
          value={String(totalFacturas)}
          description="Facturas emitidas del cliente."
          icon={ReceiptText}
          tone={totalFacturas > 0 ? "emerald" : "red"}
        />

        <StatCard
          title="Con saldo"
          shortTitle="Saldo"
          value={String(totalFacturasConSaldo)}
          description="Facturas disponibles para crédito."
          icon={FileText}
          tone={totalFacturasConSaldo > 0 ? "amber" : "red"}
        />

        <div className="hidden xl:block">
          <StatCard
            title="Disponible"
            shortTitle="Disp."
            value={formatCompactMoney(saldoDisponibleCredito)}
            description="Saldo máximo aplicable."
            icon={WalletCards}
            tone={saldoDisponibleCredito > 0 ? "emerald" : "red"}
          />
        </div>
      </div>

      <DashboardGrid>
        <DashboardMain>
          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                Estado de cuenta
              </p>

              <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
                Crear nota de crédito
              </h1>

              <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
                {nombreCompleto} · DNI {cliente.dni || "-"} · Cliente N°{" "}
                {cliente.numeroCliente}
              </p>
            </div>
          </div>

          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
            <div className="mb-3 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <MinusCircle className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                  Datos de la nota
                </p>

                <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
                  Descuento sobre factura
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  La nota de crédito debe asociarse a una factura con saldo
                  pendiente y descuenta el importe indicado de esa factura.
                </p>
              </div>
            </div>

            <NotaFinancieraForm
              clienteId={cliente.id}
              tipo="credito"
              facturas={facturas}
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
                Información del cliente
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
                  Estado
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
                  Facturas emitidas
                </span>

                <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
                  {totalFacturas}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Facturas con saldo
                </span>

                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                  {totalFacturasConSaldo}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Saldo total
                </span>

                <span
                  className={`text-right text-xs font-medium ${
                    saldoFacturas > 0
                      ? "text-red-700 dark:text-red-300"
                      : "text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  {formatMoney(saldoFacturas)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Disponible crédito
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    saldoDisponibleCredito > 0
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                  }`}
                >
                  {formatMoney(saldoDisponibleCredito)}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden rounded-[1.45rem] border border-emerald-200 bg-emerald-50 p-3.5 text-xs leading-5 text-emerald-800 shadow-sm dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300 xl:block">
            <div className="flex gap-2">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

              <div>
                <p className="font-medium">Importante</p>

                <p className="mt-1">
                  La nota de crédito disminuye el saldo de la factura seleccionada.
                  Usala para bonificaciones, descuentos, correcciones o ajustes a
                  favor del cliente.
                </p>
              </div>
            </div>
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
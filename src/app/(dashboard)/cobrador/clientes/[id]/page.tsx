// src/app/(dashboard)/cobrador/clientes/[id]/page.tsx

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CreditCard,
  Eye,
  FileText,
  Home,
  IdCard,
  MapPin,
  Phone,
  ReceiptText,
  UserRound,
  WalletCards,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import { CopyDniButton } from "@/components/ui/CopyDniButton";
import { getCurrentUser } from "@/lib/current-user";
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

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone: "cyan" | "emerald" | "amber" | "red" | "violet";
};

export const metadata = {
  title: "Cliente",
};

const toneClasses = {
  cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
  emerald:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  amber:
    "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  red: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
  violet:
    "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
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

function getEstadoBadgeVariant(estado: string) {
  if (estado === "activo") return "success";
  if (estado === "suspendido") return "warning";
  return "danger";
}

function getEstadoLabel(estado: string) {
  if (estado === "activo") return "Activo";
  if (estado === "suspendido") return "Suspendido";
  return "Baja";
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

function contarPeriodosPendientes(periodos: any[]) {
  return periodos.filter((periodo) => Number(periodo.saldoPeriodo || 0) > 0)
    .length;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <div className="flex h-full min-h-[88px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none xl:min-h-[96px]">
      <div className="flex min-w-0 items-start gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}
        >
          <Icon className="h-3.5 w-3.5" />
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

function DataTile({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string | number | null;
  icon: LucideIcon;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />

        <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
        {value || "-"}
      </p>
    </div>
  );
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
      <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span className="min-w-0 truncate text-right text-sm font-medium text-slate-950 dark:text-white">
        {value || "-"}
      </span>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-3 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
          {eyebrow}
        </p>

        <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
          {title}
        </h2>

        <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function MobileClienteHero({
  cliente,
  tieneDeuda,
}: {
  cliente: any;
  tieneDeuda: boolean;
}) {
  return (
    <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
          <UserRound className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
            Cliente N° {cliente.numeroCliente}
          </p>

          <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white">
            {cliente.apellido}, {cliente.nombre}
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
            DNI {cliente.dni}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant={getEstadoBadgeVariant(cliente.estado) as any}>
          {getEstadoLabel(cliente.estado)}
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

      <div className="mt-3 flex justify-end">
        <CopyDniButton dni={cliente.dni} />
      </div>
    </div>
  );
}

function MobileServicioCard({ cliente }: { cliente: any }) {
  return (
    <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
      <SectionHeader
        icon={Home}
        eyebrow="Servicio"
        title="Datos del servicio"
        description="Ubicación, contacto y plan contratado."
      />

      <div className="grid gap-2">
        <DataTile label="Dirección" value={cliente.direccion} icon={MapPin} />
        <DataTile label="Localidad" value={cliente.localidad} icon={MapPin} />
        <DataTile label="Teléfono" value={cliente.telefono} icon={Phone} />
        <DataTile
          label="Plan"
          value={cliente.plan?.nombre || "Sin plan"}
          icon={Wifi}
        />

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
          <DataLine label="Tipo" value={cliente.plan?.tipo || "-"} />
          <DataLine
            label="Importe"
            value={cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
          />
          <DataLine label="Detalle" value={cliente.plan?.detalle || "-"} />
        </div>
      </div>
    </div>
  );
}

function MobileCuentaCard({
  cliente,
  totalPendiente,
  tieneDeuda,
  vieneDeCircuitoPago,
}: {
  cliente: any;
  totalPendiente: number;
  tieneDeuda: boolean;
  vieneDeCircuitoPago: boolean;
}) {
  return (
    <div
      className={`rounded-[1.45rem] border-2 p-3 shadow-sm ${
        tieneDeuda
          ? "border-red-300 bg-red-50 text-red-950 dark:border-red-900/80 dark:bg-red-950/25 dark:text-red-100"
          : "border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-900/80 dark:bg-emerald-950/25 dark:text-emerald-100"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            tieneDeuda
              ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
          }`}
        >
          <WalletCards className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p
            className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
              tieneDeuda
                ? "text-red-700 dark:text-red-300"
                : "text-emerald-700 dark:text-emerald-300"
            }`}
          >
            Cuenta del cliente
          </p>

          <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
            Total pendiente
          </h2>

          <p
            className={`mt-2 truncate text-4xl font-medium tracking-tight ${
              tieneDeuda
                ? "text-red-700 dark:text-red-300"
                : "text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {formatMoney(totalPendiente)}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-white/70 bg-white/70 px-3 py-2 text-xs leading-5 text-slate-700 dark:border-slate-800 dark:bg-slate-950/45 dark:text-slate-300">
        Este importe se actualiza con facturas, pagos, notas de débito y notas
        de crédito.
      </div>

      {vieneDeCircuitoPago ? (
        <Link
          href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
          className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
        >
          <CreditCard className="h-3.5 w-3.5" />
          Registrar pago
        </Link>
      ) : (
        <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
          <div className="flex gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Vista informativa. Para registrar un pago, iniciá desde el panel
              del cobrador con DNI exacto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function EstadoCuentaListado({
  cliente,
  periodos,
  destacadoMobile = false,
}: {
  cliente: any;
  periodos: any[];
  destacadoMobile?: boolean;
}) {
  return (
    <div
      className={
        destacadoMobile
          ? "rounded-[1.45rem] border-2 border-cyan-300 bg-cyan-50/70 p-3 shadow-sm dark:border-cyan-900/80 dark:bg-cyan-950/20"
          : "rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-4"
      }
    >
      <SectionHeader
        icon={FileText}
        eyebrow="Estado de cuenta"
        title="Períodos del cliente"
        description="Listado resumido por período con acceso al detalle."
      />

      {periodos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
          Este cliente todavía no tiene períodos facturados.
        </div>
      ) : (
        <>
          <div className="grid gap-3 md:hidden">
            {periodos.map((periodo) => {
              const badge = getPeriodoBadge(periodo.estadoPeriodo);
              const periodoConSaldo = periodo.saldoPeriodo > 0;

              return (
                <div
                  key={periodo.facturaId}
                  className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-base font-medium text-slate-950 dark:text-white">
                          {periodo.periodoLabel}
                        </p>

                        <Badge variant={badge.variant as any}>
                          {badge.label}
                        </Badge>
                      </div>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Factura N° {periodo.numeroComprobante}
                      </p>
                    </div>

                    <div
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        periodoConSaldo
                          ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      }`}
                    >
                      {periodoConSaldo ? "Debe" : "OK"}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/70">
                      <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        Original
                      </p>

                      <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
                        {formatMoney(periodo.importeOriginal)}
                      </p>
                    </div>

                    <div
                      className={`rounded-2xl border px-3 py-2 ${
                        periodoConSaldo
                          ? "border-red-200 bg-red-50 dark:border-red-900/70 dark:bg-red-950/30"
                          : "border-emerald-200 bg-emerald-50 dark:border-emerald-900/70 dark:bg-emerald-950/30"
                      }`}
                    >
                      <p
                        className={`text-[9px] font-medium uppercase tracking-[0.14em] ${
                          periodoConSaldo
                            ? "text-red-700 dark:text-red-300"
                            : "text-emerald-700 dark:text-emerald-300"
                        }`}
                      >
                        Saldo
                      </p>

                      <p
                        className={`mt-1 truncate text-sm font-medium ${
                          periodoConSaldo
                            ? "text-red-700 dark:text-red-300"
                            : "text-emerald-700 dark:text-emerald-300"
                        }`}
                      >
                        {formatMoney(periodo.saldoPeriodo)}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
                    className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-medium text-slate-800 transition hover:bg-cyan-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Ver detalle
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/50 md:block">
            <div className="grid grid-cols-[minmax(170px,1fr)_120px_120px_110px] border-b border-slate-200 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>Período</span>
              <span className="text-right">Factura</span>
              <span className="text-right">Saldo</span>
              <span className="text-right">Acción</span>
            </div>

            {periodos.map((periodo) => {
              const badge = getPeriodoBadge(periodo.estadoPeriodo);
              const periodoConSaldo = periodo.saldoPeriodo > 0;

              return (
                <div
                  key={periodo.facturaId}
                  className="grid grid-cols-[minmax(170px,1fr)_120px_120px_110px] items-center gap-2 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
                        {periodo.periodoLabel}
                      </p>

                      <Badge variant={badge.variant as any}>{badge.label}</Badge>
                    </div>

                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      Original {formatMoney(periodo.importeOriginal)}
                    </p>
                  </div>

                  <p className="text-right text-xs font-medium text-slate-700 dark:text-slate-300">
                    N° {periodo.numeroComprobante}
                  </p>

                  <p
                    className={`text-right text-sm font-medium ${
                      periodoConSaldo
                        ? "text-red-700 dark:text-red-300"
                        : "text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    {formatMoney(periodo.saldoPeriodo)}
                  </p>

                  <div className="text-right">
                    <Link
                      href={`/cobrador/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-medium text-slate-800 transition hover:bg-cyan-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Ver detalle
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default async function CobradorClientePage({
  params,
  searchParams,
}: CobradorClientePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const resumen = await obtenerResumenClienteParaCobrador(params.id);

  if (!resumen) {
    notFound();
  }

  const { cliente, estadoCuenta, totalPendiente } = resumen;
  const tieneDeuda = totalPendiente > 0;

  const dniHabilitante = limpiarDni(searchParams?.dni);
  const vieneDeCircuitoPago =
    searchParams?.modo === "pago" && dniHabilitante === cliente.dni;

  const periodos = estadoCuenta.periodos || [];
  const periodosPendientes = contarPeriodosPendientes(periodos);

  return (
    <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
      <div className="space-y-3 lg:hidden">
        <MobileClienteHero cliente={cliente} tieneDeuda={tieneDeuda} />

        <MobileServicioCard cliente={cliente} />

        <MobileCuentaCard
          cliente={cliente}
          totalPendiente={totalPendiente}
          tieneDeuda={tieneDeuda}
          vieneDeCircuitoPago={vieneDeCircuitoPago}
        />

        <EstadoCuentaListado
          cliente={cliente}
          periodos={periodos}
          destacadoMobile
        />
      </div>

      <div className="hidden lg:block">
        <div className="grid grid-cols-2 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
          <StatCard
            title="Cliente"
            value={`N° ${cliente.numeroCliente}`}
            description="Número interno asignado."
            icon={UserRound}
            tone="cyan"
          />

          <StatCard
            title="Estado"
            value={getEstadoLabel(cliente.estado)}
            description="Estado actual del servicio."
            icon={Wifi}
            tone={
              cliente.estado === "activo"
                ? "emerald"
                : cliente.estado === "suspendido"
                  ? "amber"
                  : "red"
            }
          />

          <StatCard
            title="Pendiente"
            value={formatCompactMoney(totalPendiente)}
            description="Total adeudado por el cliente."
            icon={WalletCards}
            tone={tieneDeuda ? "red" : "emerald"}
          />

          <StatCard
            title="Períodos"
            value={String(periodosPendientes)}
            description="Períodos con saldo pendiente."
            icon={ReceiptText}
            tone={periodosPendientes > 0 ? "amber" : "emerald"}
          />
        </div>

        <DashboardGrid>
          <DashboardMain>
            <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                      Ficha del cliente
                    </p>

                    <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                      {cliente.apellido}, {cliente.nombre}
                    </h1>

                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                      DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant={getEstadoBadgeVariant(cliente.estado) as any}>
                    {getEstadoLabel(cliente.estado)}
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

              <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                <DataTile label="DNI" value={cliente.dni} icon={IdCard} />

                <DataTile
                  label="Teléfono"
                  value={cliente.telefono}
                  icon={Phone}
                />

                <DataTile
                  label="Localidad"
                  value={cliente.localidad}
                  icon={MapPin}
                />

                <DataTile
                  label="Plan"
                  value={cliente.plan?.nombre || "Sin plan"}
                  icon={Wifi}
                />
              </div>
            </div>

            <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]">
              <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-4">
                <SectionHeader
                  icon={Home}
                  eyebrow="Servicio"
                  title="Datos del servicio"
                  description="Ubicación, contacto y plan contratado."
                />

                <div className="grid gap-3 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/60">
                    <DataLine label="Dirección" value={cliente.direccion} />
                    <DataLine label="Localidad" value={cliente.localidad} />
                    <DataLine label="Provincia" value={cliente.provincia} />
                    <DataLine label="Teléfono" value={cliente.telefono} />
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/60">
                    <DataLine
                      label="Plan"
                      value={cliente.plan?.nombre || "Sin plan asignado"}
                    />
                    <DataLine label="Tipo" value={cliente.plan?.tipo || "-"} />
                    <DataLine
                      label="Importe"
                      value={
                        cliente.plan ? formatMoney(cliente.plan.importe) : "-"
                      }
                    />
                    <DataLine
                      label="Detalle"
                      value={cliente.plan?.detalle || "-"}
                    />
                  </div>
                </div>

                <div className="mt-3 rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs leading-5 text-cyan-900 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200">
                  <div className="flex gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

                    <p className="line-clamp-2">
                      {cliente.direccion || "Sin dirección cargada"} ·{" "}
                      {cliente.localidad || "Sin localidad"} ·{" "}
                      {cliente.provincia || "Sin provincia"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-4">
                <SectionHeader
                  icon={WalletCards}
                  eyebrow="Cuenta"
                  title="Resumen financiero"
                  description="Saldo actual del cliente."
                />

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Total pendiente
                  </p>

                  <p
                    className={`mt-2 truncate text-4xl font-medium tracking-tight ${
                      tieneDeuda
                        ? "text-red-700 dark:text-red-300"
                        : "text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    {formatMoney(totalPendiente)}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    Calculado sobre facturas, pagos, notas de débito y notas de
                    crédito.
                  </p>
                </div>

                {vieneDeCircuitoPago ? (
                  <Link
                    href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
                    className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    Registrar pago
                  </Link>
                ) : (
                  <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
                    <div className="flex gap-2">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>
                        Vista informativa. Para registrar un pago, iniciá desde
                        el panel del cobrador con DNI exacto.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <EstadoCuentaListado cliente={cliente} periodos={periodos} />
          </DashboardMain>

          <DashboardAside>
            <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
              <div className="mb-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                  Cuenta
                </p>

                <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                  Resumen rápido
                </h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
                  <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                    <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                    Pendiente
                  </span>

                  <span
                    className={`text-right text-[11px] font-medium ${
                      tieneDeuda
                        ? "text-red-700 dark:text-red-300"
                        : "text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    {formatMoney(totalPendiente)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
                  <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                    <ReceiptText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                    Períodos con deuda
                  </span>

                  <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
                    {periodosPendientes}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
                  <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                    <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                    Plan
                  </span>

                  <span className="truncate text-right text-[11px] font-medium text-slate-950 dark:text-white">
                    {cliente.plan?.nombre || "Sin plan"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 px-3 py-2">
                  <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                    <UserRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                    Estado
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      cliente.estado === "activo"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : cliente.estado === "suspendido"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                          : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                    }`}
                  >
                    {getEstadoLabel(cliente.estado)}
                  </span>
                </div>
              </div>

              {vieneDeCircuitoPago ? (
                <Link
                  href={`/cobrador/clientes/${cliente.id}/pagar?dni=${cliente.dni}`}
                  className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Registrar pago
                </Link>
              ) : null}
            </div>

            <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
              <div className="mb-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                  Cliente
                </p>

                <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                  Datos rápidos
                </h2>
              </div>

              <div className="grid gap-2">
                <DataTile label="DNI" value={cliente.dni} icon={IdCard} />
                <DataTile
                  label="Teléfono"
                  value={cliente.telefono}
                  icon={Phone}
                />
                <DataTile
                  label="Localidad"
                  value={cliente.localidad}
                  icon={MapPin}
                />
              </div>
            </div>

            {!vieneDeCircuitoPago ? (
              <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
                <div className="flex gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

                  <p>
                    Esta ficha es informativa. Para registrar un pago, iniciá el
                    circuito desde el panel del cobrador con DNI exacto.
                  </p>
                </div>
              </div>
            ) : null}

            <Link
              href="/cobrador"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Volver al panel
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </DashboardAside>
        </DashboardGrid>
      </div>
    </PageShell>
  );
}
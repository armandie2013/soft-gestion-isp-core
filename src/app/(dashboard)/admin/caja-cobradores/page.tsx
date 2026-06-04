// src/app/(dashboard)/admin/caja-cobradores/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  KeyRound,
  ShieldAlert,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerAdminCajaCobradoresResumen } from "@/services/cobro.service";
import { AdminCobradoresCajaTable } from "@/components/tables/AdminCobradoresCajaTable";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Caja cobradores",
};

type StatCardProps = {
  title: string;
  shortTitle?: string;
  value: string;
  description: string;
  icon: typeof WalletCards;
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
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatCompactMoney(value: number) {
  const amount = Number(value || 0);

  if (amount >= 1_000_000) {
    return `$ ${(amount / 1_000_000).toLocaleString("es-AR", {
      maximumFractionDigits: 1,
    })} M`;
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
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

const quickActions = [
  {
    label: "Ver cierres realizados",
    description: "Consultar historial de cierres",
    href: "/admin/caja-cobradores/cierres",
    icon: CheckCircle2,
  },
  {
    label: "Usuarios cobradores",
    description: "Filtrar usuarios con rol cobrador",
    href: "/usuarios?rol=cobrador",
    icon: UsersRound,
  },
  {
    label: "Panel administrador",
    description: "Volver al dashboard principal",
    href: "/admin",
    icon: Banknote,
  },
];

export default async function AdminCajaCobradoresPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  const resumen = await obtenerAdminCajaCobradoresResumen();

  const cobradoresConCodigo = resumen.cobradores.filter(
    (cobrador) => cobrador.codigoPendiente,
  );

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
        <StatCard
          title="En caja cobradores"
          shortTitle="En caja"
          value={formatCompactMoney(resumen.totalSaldoCobradores)}
          description="Importe total pendiente de cierre."
          icon={WalletCards}
          tone={resumen.totalSaldoCobradores > 0 ? "red" : "emerald"}
        />

        <StatCard
          title="Recibido por admin"
          shortTitle="Admin"
          value={formatCompactMoney(resumen.totalRecibidoAdmin)}
          description="Total acumulado por cierres confirmados."
          icon={Banknote}
          tone="cyan"
        />

        <StatCard
          title="Con saldo"
          value={String(resumen.cantidadCobradoresConSaldo)}
          description={`De ${resumen.cantidadCobradores} cobradores registrados.`}
          icon={ShieldAlert}
          tone={resumen.cantidadCobradoresConSaldo > 0 ? "amber" : "emerald"}
        />

        <StatCard
          title="Códigos"
          shortTitle="Cód."
          value={String(resumen.cantidadCodigosPendientes)}
          description="Códigos activos pendientes de uso."
          icon={KeyRound}
          tone={resumen.cantidadCodigosPendientes > 0 ? "amber" : "emerald"}
        />

        <div className="hidden xl:block">
          <StatCard
            title="Cierres realizados"
            shortTitle="Cierres"
            value={String(resumen.cantidadCierresRealizados)}
            description="Cobradores con cierres registrados."
            icon={CheckCircle2}
            tone="violet"
          />
        </div>
      </div>

      <DashboardGrid>
        <DashboardMain>
          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Caja cobradores
                </p>

                <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
                  Gestión de caja de cobradores
                </h1>

                <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
                  Visualizá el saldo de cada cobrador, lo recibido por cierres y
                  generá códigos de cierre por el importe exacto de caja.
                </p>
              </div>

              <Link
                href="/admin/caja-cobradores/cierres"
                className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
              >
                Ver cierres
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <AdminCobradoresCajaTable cobradores={resumen.cobradores} />
        </DashboardMain>

        <DashboardAside>
          <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Acciones rápidas
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Atajos para caja y cobradores
              </h2>
            </div>

            <div className="grid gap-2">
              {quickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />

                      <span className="min-w-0">
                        <span className="block truncate">{item.label}</span>
                        <span className="block truncate text-[11px] font-normal text-slate-500 dark:text-slate-400">
                          {item.description}
                        </span>
                      </span>
                    </span>

                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Estado de caja
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Información general
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Total en caja
                </span>

                <span
                  className={`text-right text-xs font-medium ${
                    resumen.totalSaldoCobradores > 0
                      ? "text-red-700 dark:text-red-300"
                      : "text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  {formatMoney(resumen.totalSaldoCobradores)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Recibido admin
                </span>

                <span className="text-right text-xs font-medium text-cyan-700 dark:text-cyan-300">
                  {formatMoney(resumen.totalRecibidoAdmin)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Cobradores con saldo
                </span>

                <span className="text-right text-xs font-medium text-amber-700 dark:text-amber-300">
                  {resumen.cantidadCobradoresConSaldo}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Códigos pendientes
                </span>

                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                  {resumen.cantidadCodigosPendientes}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Códigos activos
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Cierres pendientes de validación
              </h2>
            </div>

            <div className="grid gap-2">
              {cobradoresConCodigo.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                  No hay códigos activos.
                </div>
              ) : (
                cobradoresConCodigo.map((cobrador) => (
                  <div
                    key={cobrador.cobradorId}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/50"
                  >
                    <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                      {cobrador.apellido}, {cobrador.nombre}
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-medium text-amber-700 dark:text-amber-300">
                        {cobrador.codigoPendiente?.codigo}
                      </span>

                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {formatMoney(cobrador.codigoPendiente?.importe || 0)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
// src/app/(dashboard)/planes/page.tsx

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Plus,
  RadioTower,
  Settings,
  Wifi,
  WifiOff,
} from "lucide-react";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import { PlanesTable } from "@/components/tables/PlanesTable";
import { obtenerPlanes } from "@/services/plan.service";

export const metadata = {
  title: "Planes",
};

type StatCardProps = {
  title: string;
  shortTitle?: string;
  value: string;
  mobileValue?: string;
  description: string;
  icon: typeof Wifi;
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
  mobileValue,
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

          <p className="mt-0.5 min-w-0 truncate text-[15px] font-medium leading-none tracking-tight text-slate-950 dark:text-white sm:mt-1 sm:text-xl">
            <span className="sm:hidden">{mobileValue || value}</span>
            <span className="hidden sm:inline">{value}</span>
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
    label: "Nuevo plan",
    description: "Registrar un plan comercial",
    href: "/planes/nuevo",
    icon: Plus,
  },
  {
    label: "Planes activos",
    description: "Ver planes disponibles",
    href: "/planes",
    icon: CheckCircle2,
  },
  {
    label: "Configuración",
    description: "Opciones generales del sistema",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

export default async function PlanesPage() {
  const planes = await obtenerPlanes();

  const totalPlanes = planes.length;
  const totalActivos = planes.filter((plan) => plan.estado === "activo").length;
  const totalInactivos = planes.filter(
    (plan) => plan.estado === "inactivo",
  ).length;

  const importePromedio =
    totalPlanes > 0
      ? planes.reduce((acc, plan) => acc + Number(plan.importe || 0), 0) /
        totalPlanes
      : 0;

  const planMasCaro = planes.reduce(
    (mayor, plan) => (plan.importe > mayor ? plan.importe : mayor),
    0,
  );

  const planesRecientes = planes.slice(0, 3);

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
        <StatCard
          title="Planes totales"
          shortTitle="Planes"
          value={String(totalPlanes)}
          description="Todos los planes registrados."
          icon={Wifi}
          tone="cyan"
        />

        <StatCard
          title="Activos"
          value={String(totalActivos)}
          description="Planes disponibles para clientes."
          icon={CheckCircle2}
          tone="emerald"
        />

        <StatCard
          title="Inactivos"
          shortTitle="Inact."
          value={String(totalInactivos)}
          description="Planes fuera de uso."
          icon={WifiOff}
          tone="red"
        />

        <StatCard
          title="Promedio"
          shortTitle="Prom."
          value={formatMoney(importePromedio)}
          mobileValue={formatCompactMoney(importePromedio)}
          description="Importe promedio de los planes."
          icon={Clock3}
          tone="amber"
        />

        <div className="hidden xl:block">
          <StatCard
            title="Mayor importe"
            shortTitle="Mayor"
            value={formatMoney(planMasCaro)}
            mobileValue={formatCompactMoney(planMasCaro)}
            description="Plan con mayor importe registrado."
            icon={RadioTower}
            tone="violet"
          />
        </div>
      </div>

      <DashboardGrid>
        <DashboardMain className="space-y-3 sm:space-y-4">
          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Planes
                </p>

                <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
                  Gestión de planes
                </h1>

                <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
                  Administrá los planes comerciales que luego se asignan a los
                  clientes del sistema.
                </p>
              </div>

              <Link
                href="/planes/nuevo"
                className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 text-[11px] font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
              >
                <Plus className="h-3.5 w-3.5" />
                Nuevo plan
              </Link>
            </div>
          </div>

          <PlanesTable planes={planes} />
        </DashboardMain>

        <DashboardAside>
          <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Acciones rápidas
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Atajos para administrar planes
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
                Estado de planes
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Información general
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Activos
                </span>

                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  {totalActivos}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Inactivos
                </span>

                <span className="text-xs font-medium text-red-700 dark:text-red-300">
                  {totalInactivos}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Promedio
                </span>

                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                  {formatMoney(importePromedio)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Mayor importe
                </span>

                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                  {formatMoney(planMasCaro)}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Planes recientes
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Últimos planes registrados
              </h2>
            </div>

            <div className="grid gap-2">
              {planesRecientes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                  No hay planes recientes.
                </div>
              ) : (
                planesRecientes.map((plan) => (
                  <Link
                    key={plan.id}
                    href={`/planes/${plan.id}/editar`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                        {plan.nombre}
                      </p>

                      <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                        {plan.tipo} · {formatMoney(plan.importe)}
                      </p>
                    </div>

                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
                  </Link>
                ))
              )}
            </div>
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
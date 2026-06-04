// src/app/(dashboard)/planes/nuevo/page.tsx

import {
  CheckCircle2,
  FileText,
  RadioTower,
  Settings,
  Wifi,
} from "lucide-react";
import { CrearPlanForm } from "@/components/forms/CrearPlanForm";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Nuevo plan",
};

type StatCardProps = {
  title: string;
  shortTitle?: string;
  value: string;
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

export default function NuevoPlanPage() {
  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
        <StatCard
          title="Plan"
          value="Nuevo"
          description="Alta de plan comercial."
          icon={Wifi}
          tone="cyan"
        />

        <StatCard
          title="Importe"
          value="Entero"
          description="Sin decimales en base de datos."
          icon={FileText}
          tone="amber"
        />

        <StatCard
          title="Estado"
          value="Activo"
          description="Disponible para nuevos clientes."
          icon={CheckCircle2}
          tone="emerald"
        />

        <StatCard
          title="Tipo"
          value="Servicio"
          description="Categoría comercial del plan."
          icon={RadioTower}
          tone="violet"
        />

        <div className="hidden xl:block">
          <StatCard
            title="Formato"
            value="$ 0,00"
            description="Visualización argentina."
            icon={Settings}
            tone="cyan"
          />
        </div>
      </div>

      <DashboardGrid>
        <DashboardMain>
          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Planes
              </p>

              <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
                Nuevo plan
              </h1>

              <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
                Cargá el nombre, tipo, detalle, importe mensual y estado del
                plan comercial. El importe se guarda como entero.
              </p>
            </div>
          </div>

          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
            <div className="mb-3 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                <Wifi className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Alta de plan
                </p>

                <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
                  Datos del nuevo plan
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  El importe no acepta decimales. Se mostrará como moneda, pero
                  se enviará al backend como entero.
                </p>
              </div>
            </div>

            <CrearPlanForm />
          </div>
        </DashboardMain>

        <DashboardAside>
          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Reglas del alta
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Validaciones del plan
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Nombre
                </span>

                <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
                  Único
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Importe
                </span>

                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                  Entero
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Decimales
                </span>

                <span className="text-xs font-medium text-red-700 dark:text-red-300">
                  No permitidos
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Estado inicial
                </span>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Activo
                </span>
              </div>
            </div>
          </div>

          <div className="hidden rounded-[1.45rem] border border-amber-200 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 xl:block">
            <p className="font-medium">Importante</p>

            <p className="mt-1">
              El campo importe se ve como moneda argentina, pero el formulario
              envía solo números enteros para respetar el tipo Int32 en MongoDB.
            </p>
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
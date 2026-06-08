// // src/app/(dashboard)/clientes/nuevo/page.tsx

// import {
//   CheckCircle2,
//   FileText,
//   MapPin,
//   UserRound,
//   Wifi,
// } from "lucide-react";
// import { ClienteForm } from "@/components/forms/ClienteForm";
// import { obtenerPlanesActivos } from "@/services/plan.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Nuevo cliente",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof UserRound;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// const toneClasses = {
//   cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
//   emerald:
//     "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
//   amber:
//     "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
//   red: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
//   violet:
//     "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
// };

// function StatCard({
//   title,
//   shortTitle,
//   value,
//   description,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <div className="flex h-full min-h-[78px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:min-h-[122px] sm:rounded-[1.35rem] sm:p-3.5">
//       <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
//         <div
//           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl ${toneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 sm:text-[10px] sm:tracking-[0.15em]">
//             <span className="sm:hidden">{shortTitle || title}</span>
//             <span className="hidden sm:inline">{title}</span>
//           </p>

//           <p className="mt-0.5 truncate text-[15px] font-medium leading-none tracking-tight text-slate-950 dark:text-white sm:mt-1 sm:text-xl">
//             {value}
//           </p>

//           <p className="mt-1 hidden text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default async function NuevoClientePage() {
//   const planes = await obtenerPlanesActivos();

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Cliente"
//           value="Nuevo"
//           description="Alta de cliente en el sistema."
//           icon={UserRound}
//           tone="cyan"
//         />

//         <StatCard
//           title="Número"
//           shortTitle="N°"
//           value="Auto"
//           description="Se genera al guardar el cliente."
//           icon={FileText}
//           tone="emerald"
//         />

//         <StatCard
//           title="Planes activos"
//           shortTitle="Planes"
//           value={String(planes.length)}
//           description="Planes disponibles para asignar."
//           icon={Wifi}
//           tone={planes.length > 0 ? "violet" : "red"}
//         />

//         <StatCard
//           title="Estado"
//           value="Activo"
//           description="Estado sugerido para el alta."
//           icon={CheckCircle2}
//           tone="amber"
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Ubicación"
//             value="Requerida"
//             description="Dirección, localidad y provincia."
//             icon={MapPin}
//             tone="cyan"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div>
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Clientes
//               </p>

//               <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                 Nuevo cliente
//               </h1>

//               <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                 Cargá los datos personales, domicilio, contacto y plan contratado.
//                 El número de cliente se genera automáticamente al guardar.
//               </p>
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
//             <div className="mb-3 flex items-start gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                 <UserRound className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Alta de cliente
//                 </p>

//                 <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                   Datos del nuevo cliente
//                 </h2>

//                 <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   Los campos principales son obligatorios. El email es opcional.
//                 </p>
//               </div>
//             </div>

//             <ClienteForm planes={planes} />
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Reglas del alta
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Datos requeridos
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Número cliente
//                 </span>

//                 <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                   Automático
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   DNI
//                 </span>

//                 <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                   Único
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Plan contratado
//                 </span>

//                 <span
//                   className={`text-xs font-medium ${
//                     planes.length > 0
//                       ? "text-emerald-700 dark:text-emerald-300"
//                       : "text-red-700 dark:text-red-300"
//                   }`}
//                 >
//                   {planes.length > 0 ? "Disponible" : "Sin planes"}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Estado inicial
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   Activo
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-amber-200 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 xl:block">
//             <p className="font-medium">Importante</p>

//             <p className="mt-1">
//               Para crear un cliente tiene que existir al menos un plan activo. Si
//               no aparece ningún plan, revisá el módulo Planes.
//             </p>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/clientes/nuevo/page.tsx

import {
  CheckCircle2,
  FileText,
  MapPin,
  UserRound,
  Wifi,
} from "lucide-react";
import { ClienteForm } from "@/components/forms/ClienteForm";
import { obtenerPlanesActivos } from "@/services/plan.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Nuevo cliente",
};

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: typeof UserRound;
  tone: "cyan" | "emerald" | "amber" | "red" | "violet";
};

const cardBase =
  "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

const innerCardBase =
  "overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none";

const toneClasses = {
  cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
  emerald:
    "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950",
  amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
  red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
  violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
};

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <div className="flex h-full min-h-[108px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ${toneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p
            className={`mt-1 truncate text-xl font-semibold tracking-tight ${
              tone === "red"
                ? "text-red-700 dark:text-red-300"
                : "text-slate-950 dark:text-white"
            }`}
          >
            {value}
          </p>

          <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileHeader({ planesCount }: { planesCount: number }) {
  return (
    <section className={`${cardBase} p-3`}>
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
          <UserRound className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
            Clientes
          </p>

          <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Nuevo cliente
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
            Cargá los datos del titular, domicilio y plan contratado.
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
              N° automático
            </span>

            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                planesCount > 0
                  ? "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-300"
                  : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
              }`}
            >
              {planesCount > 0
                ? `${planesCount} planes activos`
                : "Sin planes activos"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function NuevoClientePage() {
  const planes = await obtenerPlanesActivos();

  return (
    <PageShell maxWidth="wide">
      <div className="space-y-3 lg:hidden">
        <MobileHeader planesCount={planes.length} />

        <ClienteForm planes={planes} />
      </div>

      <div className="hidden lg:block">
        <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Cliente"
            value="Nuevo"
            description="Alta de cliente."
            icon={UserRound}
            tone="cyan"
          />

          <StatCard
            title="Número"
            value="Auto"
            description="Se genera al guardar."
            icon={FileText}
            tone="emerald"
          />

          <StatCard
            title="Planes activos"
            value={String(planes.length)}
            description="Disponibles para asignar."
            icon={Wifi}
            tone={planes.length > 0 ? "violet" : "red"}
          />

          <StatCard
            title="Estado inicial"
            value="Activo"
            description="Estado sugerido."
            icon={CheckCircle2}
            tone="amber"
          />

          <StatCard
            title="Ubicación"
            value="Requerida"
            description="Domicilio del servicio."
            icon={MapPin}
            tone="cyan"
          />
        </div>

        <div className="mt-5">
          <DashboardGrid>
            <DashboardMain>
              <div className={`${cardBase} p-3.5`}>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                    Clientes
                  </p>

                  <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
                    Nuevo cliente
                  </h1>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
                    Cargá los datos personales, domicilio, contacto y plan
                    contratado. El número de cliente se genera automáticamente
                    al guardar.
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <ClienteForm planes={planes} variant="desktop" />
              </div>
            </DashboardMain>

            <DashboardAside>
              <div className={`${cardBase} p-3.5`}>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                      Reglas del alta
                    </p>

                    <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                      Datos requeridos
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
                    <UserRound className="h-4 w-4" />
                  </div>
                </div>

                <div className={innerCardBase}>
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      Número cliente
                    </span>

                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      Automático
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      DNI
                    </span>

                    <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
                      Único
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      Plan contratado
                    </span>

                    <span
                      className={`text-xs font-medium ${
                        planes.length > 0
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-red-700 dark:text-red-300"
                      }`}
                    >
                      {planes.length > 0 ? "Disponible" : "Sin planes"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      Estado inicial
                    </span>

                    <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                      Activo
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.45rem] border border-amber-300 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm shadow-amber-950/5 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 dark:shadow-none">
                <p className="font-medium">Importante</p>

                <p className="mt-1">
                  Para crear un cliente tiene que existir al menos un plan
                  activo. Si no aparece ningún plan, revisá el módulo Planes.
                </p>
              </div>
            </DashboardAside>
          </DashboardGrid>
        </div>
      </div>
    </PageShell>
  );
}
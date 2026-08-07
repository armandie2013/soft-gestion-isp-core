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

// // src/app/(dashboard)/clientes/nuevo/page.tsx

// import Link from "next/link";
// import {
//   CheckCircle2,
//   FileText,
//   MapPin,
//   ShieldCheck,
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

// const panelClass =
//   "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

// const sectionTitleClass =
//   "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

// const sectionSubtitleClass =
//   "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

// const sectionDescriptionClass =
//   "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

// function BackButton() {
//   return (
//     <Link
//       href="/clientes"
//       className="hidden h-8 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900 sm:inline-flex"
//     >
//       Volver
//     </Link>
//   );
// }

// function ResumenItem({
//   label,
//   value,
//   tone = "neutral",
// }: {
//   label: string;
//   value: string | number;
//   tone?: "neutral" | "success" | "danger" | "warning" | "primary";
// }) {
//   const toneClass = {
//     neutral: "text-slate-950 dark:text-white",
//     success: "text-emerald-700 dark:text-emerald-300",
//     danger: "text-red-700 dark:text-red-300",
//     warning: "text-amber-700 dark:text-amber-300",
//     primary: "text-blue-700 dark:text-blue-300",
//   }[tone];

//   return (
//     <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700">
//       <span className="text-[12px] text-slate-700 dark:text-slate-300">
//         {label}
//       </span>

//       <span className={`text-[12px] font-semibold ${toneClass}`}>{value}</span>
//     </div>
//   );
// }

// function ReglasAlta({ planesCount }: { planesCount: number }) {
//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div>
//           <p className={sectionTitleClass}>Reglas del alta</p>

//           <h2 className={sectionSubtitleClass}>Datos requeridos</h2>
//         </div>

//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
//           <UserRound className="h-4 w-4" />
//         </div>
//       </div>

//       <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
//         <ResumenItem label="Número cliente" value="Automático" tone="success" />
//         <ResumenItem label="DNI" value="Único" tone="primary" />
//         <ResumenItem
//           label="Plan contratado"
//           value={planesCount > 0 ? "Disponible" : "Sin planes"}
//           tone={planesCount > 0 ? "success" : "danger"}
//         />
//         <ResumenItem label="Estado inicial" value="Activo" tone="success" />
//       </div>
//     </section>
//   );
// }

// function EstadoAlta({ planesCount }: { planesCount: number }) {
//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="mb-3">
//         <p className={sectionTitleClass}>Estado del alta</p>

//         <h2 className={sectionSubtitleClass}>Información general</h2>
//       </div>

//       <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
//         <ResumenItem label="Cliente" value="Nuevo" tone="primary" />
//         <ResumenItem label="Número" value="Auto" tone="success" />
//         <ResumenItem
//           label="Planes activos"
//           value={planesCount}
//           tone={planesCount > 0 ? "success" : "danger"}
//         />
//         <ResumenItem label="Ubicación" value="Requerida" tone="warning" />
//       </div>
//     </section>
//   );
// }

// function NotaPlanes() {
//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="mb-3">
//         <p className={sectionTitleClass}>Importante</p>

//         <h2 className={sectionSubtitleClass}>Planes activos</h2>
//       </div>

//       <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300">
//         Para crear un cliente tiene que existir al menos un plan activo. Si no
//         aparece ningún plan, revisá el módulo Planes.
//       </div>
//     </section>
//   );
// }

// export default async function NuevoClientePage() {
//   const planes = await obtenerPlanesActivos();

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <DashboardGrid>
//         <DashboardMain>
//           <section className={`${panelClass} p-3.5`}>
//             <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
//               <div className="min-w-0">
//                 <p className={sectionTitleClass}>Clientes</p>

//                 <h1 className={sectionSubtitleClass}>Nuevo cliente</h1>

//                 <p className={`${sectionDescriptionClass} max-w-3xl`}>
//                   Cargá los datos personales, domicilio, contacto y plan
//                   contratado. El número de cliente se genera automáticamente al
//                   guardar.
//                 </p>
//               </div>

//               <BackButton />
//             </div>
//           </section>

//           <div className="mt-3">
//             <ClienteForm planes={planes} />
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <ReglasAlta planesCount={planes.length} />

//           <div className="mt-3">
//             <EstadoAlta planesCount={planes.length} />
//           </div>

//           <div className="mt-3 hidden xl:block">
//             <NotaPlanes />
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

import Link from "next/link";
import {
  CheckCircle2,
  CircleAlert,
  FileText,
  MapPin,
  ShieldCheck,
  UserRound,
  Wifi,
} from "lucide-react";

import { ClienteForm } from "@/components/forms/ClienteForm";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import { PageShell } from "@/components/ui/PageShell";
import { obtenerPlanesActivos } from "@/services/plan.service";

export const metadata = {
  title: "Nuevo cliente",
};

type ResumenItemProps = {
  label: string;
  value: string | number;
  tone?:
    | "neutral"
    | "success"
    | "danger"
    | "warning"
    | "primary";
  dotClass?: string;
};

const panelClass =
  "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm " +
  "dark:border-[#263451] dark:bg-[#111b31] " +
  "dark:shadow-[0_12px_32px_rgba(0,0,0,0.24)]";

const buttonBaseClass =
  "inline-flex h-8 items-center justify-center rounded-lg border px-3 " +
  "text-[12px] font-medium leading-none shadow-sm transition " +
  "active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60";

const secondaryButtonClass =
  `${buttonBaseClass} border-slate-300 bg-white text-slate-700 ` +
  "hover:border-slate-400 hover:bg-slate-50 " +
  "dark:border-[#354462] dark:bg-[#111b31] dark:text-slate-200 " +
  "dark:hover:border-slate-500 dark:hover:bg-[#16223c]";

function BackButton() {
  return (
    <Link
      href="/clientes"
      className={`${secondaryButtonClass} hidden sm:inline-flex`}
    >
      <span className="text-[12px] leading-none">
        Volver
      </span>
    </Link>
  );
}

function ResumenItem({
  label,
  value,
  tone = "neutral",
  dotClass,
}: ResumenItemProps) {
  const toneClass = {
    neutral: "text-slate-900 dark:text-slate-100",
    success: "text-emerald-700 dark:text-emerald-300",
    danger: "text-red-700 dark:text-red-300",
    warning: "text-amber-700 dark:text-amber-300",
    primary: "text-blue-700 dark:text-blue-300",
  }[tone];

  return (
    <div
      className="
        flex items-center justify-between gap-3
        border-b border-slate-200 px-3 py-2.5
        last:border-b-0
        dark:border-[#263451]
      "
    >
      <span
        className="
          flex min-w-0 items-center gap-2
          text-[12px] text-slate-600
          dark:text-slate-300
        "
      >
        {dotClass ? (
          <span
            className={`
              h-1.5 w-1.5 shrink-0 rounded-full
              ${dotClass}
            `}
          />
        ) : null}

        <span className="truncate">
          {label}
        </span>
      </span>

      <span
        className={`
          shrink-0 text-[12px]
          font-medium tabular-nums
          ${toneClass}
        `}
      >
        {value}
      </span>
    </div>
  );
}

function ReglasAlta({
  planesCount,
}: {
  planesCount: number;
}) {
  return (
    <section className={`${panelClass} p-4`}>
      <div className="flex items-center gap-2">
        <ShieldCheck
          className="
            h-4 w-4
            text-blue-700
            dark:text-blue-300
          "
        />

        <h2
          className="
            text-sm font-medium
            text-slate-950 dark:text-white
          "
        >
          Reglas del alta
        </h2>
      </div>

      <div
        className="
          mt-3 overflow-hidden rounded-lg
          border border-slate-200 bg-slate-50
          dark:border-[#2b3957]
          dark:bg-[#0d172a]
        "
      >
        <ResumenItem
          label="Número de cliente"
          value="Automático"
          tone="success"
          dotClass="bg-emerald-500"
        />

        <ResumenItem
          label="DNI"
          value="Único"
          tone="primary"
          dotClass="bg-blue-500"
        />

        <ResumenItem
          label="Plan contratado"
          value={
            planesCount > 0
              ? "Disponible"
              : "Sin planes"
          }
          tone={
            planesCount > 0
              ? "success"
              : "danger"
          }
          dotClass={
            planesCount > 0
              ? "bg-emerald-500"
              : "bg-red-500"
          }
        />

        <ResumenItem
          label="Estado inicial"
          value="Activo"
          tone="success"
          dotClass="bg-emerald-500"
        />
      </div>
    </section>
  );
}

function EstadoAlta({
  planesCount,
}: {
  planesCount: number;
}) {
  return (
    <section className={`${panelClass} p-4`}>
      <div className="flex items-center gap-2">
        <UserRound
          className="
            h-4 w-4
            text-blue-700
            dark:text-blue-300
          "
        />

        <h2
          className="
            text-sm font-medium
            text-slate-950 dark:text-white
          "
        >
          Estado del alta
        </h2>
      </div>

      <div
        className="
          mt-3 overflow-hidden rounded-lg
          border border-slate-200 bg-slate-50
          dark:border-[#2b3957]
          dark:bg-[#0d172a]
        "
      >
        <ResumenItem
          label="Cliente"
          value="Nuevo"
          tone="primary"
          dotClass="bg-blue-500"
        />

        <ResumenItem
          label="Número"
          value="Auto"
          tone="success"
          dotClass="bg-emerald-500"
        />

        <ResumenItem
          label="Planes activos"
          value={planesCount}
          tone={
            planesCount > 0
              ? "success"
              : "danger"
          }
          dotClass={
            planesCount > 0
              ? "bg-emerald-500"
              : "bg-red-500"
          }
        />

        <ResumenItem
          label="Ubicación"
          value="Requerida"
          tone="warning"
          dotClass="bg-amber-500"
        />
      </div>
    </section>
  );
}

function NotaPlanes() {
  return (
    <section className={`${panelClass} p-4`}>
      <div className="flex items-center gap-2">
        <CircleAlert
          className="
            h-4 w-4
            text-amber-700
            dark:text-amber-300
          "
        />

        <h2
          className="
            text-sm font-medium
            text-slate-950 dark:text-white
          "
        >
          Planes activos
        </h2>
      </div>

      <div
        className="
          mt-3 rounded-lg border
          border-amber-200 bg-amber-50
          px-3 py-2.5
          text-[12px] leading-5
          text-amber-800
          dark:border-amber-800/70
          dark:bg-amber-950/25
          dark:text-amber-300
        "
      >
        Para crear un cliente debe existir al menos
        un plan activo. Si no aparece ningún plan,
        revisá el módulo Planes.
      </div>
    </section>
  );
}

export default async function NuevoClientePage() {
  const planes = await obtenerPlanesActivos();

  return (
    <PageShell
      maxWidth="wide"
      className="pb-20 lg:pb-6"
    >
      <DashboardGrid>
        <DashboardMain>
          <section className={panelClass}>
            <div
              className="
                border-b border-slate-200
                bg-slate-50/80 px-3 py-3
                dark:border-[#263451]
                dark:bg-[#0e172a]
                sm:px-4
              "
            >
              <div
                className="
                  flex min-h-12 items-center
                  justify-between gap-3
                "
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <UserRound
                      className="
                        h-5 w-5 shrink-0
                        text-blue-700
                        dark:text-blue-300
                      "
                    />

                    <h1
                      className="
                        truncate text-base font-medium
                        text-slate-950 dark:text-white
                      "
                    >
                      Nuevo cliente
                    </h1>
                  </div>

                  <p
                    className="
                      mt-1 hidden max-w-3xl
                      truncate text-[12px] leading-5
                      text-slate-600
                      dark:text-slate-400
                      sm:block
                    "
                  >
                    Cargá los datos personales, domicilio,
                    contacto y plan contratado. El número
                    de cliente se genera automáticamente.
                  </p>

                  <p
                    className="
                      mt-1 truncate text-[11px]
                      text-slate-500
                      dark:text-slate-400
                      sm:hidden
                    "
                  >
                    Datos personales y servicio
                  </p>
                </div>

                <div
                  className="
                    flex h-8 shrink-0
                    items-center gap-2
                  "
                >
                  <BackButton />
                </div>
              </div>
            </div>
          </section>

          <div className="mt-3">
            <ClienteForm planes={planes} />
          </div>
        </DashboardMain>

        <div className="hidden lg:block">
          <DashboardAside>
            <ReglasAlta
              planesCount={planes.length}
            />

            <div className="mt-3">
              <EstadoAlta
                planesCount={planes.length}
              />
            </div>

            <div className="mt-3 hidden xl:block">
              <NotaPlanes />
            </div>
          </DashboardAside>
        </div>
      </DashboardGrid>
    </PageShell>
  );
}
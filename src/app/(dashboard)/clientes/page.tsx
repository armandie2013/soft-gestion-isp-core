// // src/app/(dashboard)/clientes/page.tsx

// import Link from "next/link";
// import {
//   ArrowRight,
//   Ban,
//   CheckCircle2,
//   Clock3,
//   FileText,
//   Plus,
//   UserRound,
//   UsersRound,
//   Wifi,
// } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import { ClientesTable } from "@/components/tables/ClientesTable";
// import { obtenerClientes } from "@/services/cliente.service";

// export const metadata = {
//   title: "Clientes",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof UsersRound;
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
//     <div className="flex h-full min-h-[78px] flex-col justify-between rounded-2xl border border-slate-200 bg-white/85 p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:min-h-[122px] sm:rounded-[1.35rem] sm:p-3.5">
//       <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
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

//           <p className="mt-0.5 text-lg font-medium leading-none tracking-tight text-slate-950 dark:text-white sm:mt-1 sm:text-xl">
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

// const quickActions = [
//   {
//     label: "Nuevo cliente",
//     description: "Registrar un cliente en el sistema",
//     href: "/clientes/nuevo",
//     icon: Plus,
//   },
//   {
//     label: "Clientes activos",
//     description: "Ver clientes habilitados",
//     href: "/clientes",
//     icon: CheckCircle2,
//   },
//   {
//     label: "Clientes suspendidos",
//     description: "Controlar clientes con servicio suspendido",
//     href: "/clientes",
//     icon: Clock3,
//   },
//   {
//     label: "Facturación mensual",
//     description: "Generar cargos mensuales",
//     href: "/admin/configuracion/facturacion",
//     icon: FileText,
//   },
// ];

// export default async function ClientesPage() {
//   const clientes = await obtenerClientes();

//   const totalClientes = clientes.length;
//   const totalActivos = clientes.filter(
//     (cliente) => cliente.estado === "activo",
//   ).length;
//   const totalSuspendidos = clientes.filter(
//     (cliente) => cliente.estado === "suspendido",
//   ).length;
//   const totalBaja = clientes.filter((cliente) => cliente.estado === "baja").length;
//   const clientesConPlan = clientes.filter((cliente) => cliente.plan).length;

//   const clientesRecientes = clientes.slice(0, 3);

//   return (
//     <PageShell maxWidth="wide">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Clientes totales"
//           shortTitle="Clientes"
//           value={String(totalClientes)}
//           description="Todos los clientes registrados."
//           icon={UsersRound}
//           tone="cyan"
//         />

//         <StatCard
//           title="Activos"
//           value={String(totalActivos)}
//           description="Clientes con servicio activo."
//           icon={CheckCircle2}
//           tone="emerald"
//         />

//         <StatCard
//           title="Suspendidos"
//           shortTitle="Susp."
//           value={String(totalSuspendidos)}
//           description="Clientes con servicio suspendido."
//           icon={Clock3}
//           tone="amber"
//         />

//         <div className="hidden sm:block">
//           <StatCard
//             title="Baja"
//             value={String(totalBaja)}
//             description="Clientes dados de baja."
//             icon={Ban}
//             tone="red"
//           />
//         </div>

//         <StatCard
//           title="Con plan"
//           value={String(clientesConPlan)}
//           description="Clientes con plan contratado."
//           icon={Wifi}
//           tone="violet"
//         />
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
//               <div>
//                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Clientes
//                 </p>

//                 <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                   Gestión de clientes
//                 </h1>

//                 <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                   Administrá datos personales, planes contratados, estado del
//                   servicio y accesos al estado de cuenta.
//                 </p>
//               </div>

//               <Link
//                 href="/clientes/nuevo"
//                 className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 text-[11px] font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//               >
//                 <Plus className="h-3.5 w-3.5" />
//                 Nuevo cliente
//               </Link>
//             </div>
//           </div>

//           <ClientesTable clientes={clientes} />
//         </DashboardMain>

//         <DashboardAside>
//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Acciones rápidas
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Atajos para administrar clientes
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               {quickActions.map((item) => {
//                 const Icon = item.icon;

//                 return (
//                   <Link
//                     key={item.href + item.label}
//                     href={item.href}
//                     className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                   >
//                     <span className="flex min-w-0 items-center gap-2.5">
//                       <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />

//                       <span className="min-w-0">
//                         <span className="block truncate">{item.label}</span>
//                         <span className="block truncate text-[11px] font-normal text-slate-500 dark:text-slate-400">
//                           {item.description}
//                         </span>
//                       </span>
//                     </span>

//                     <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Estado de clientes
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Información general
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Activos
//                 </span>

//                 <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
//                   {totalActivos}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Suspendidos
//                 </span>

//                 <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                   {totalSuspendidos}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Baja
//                 </span>

//                 <span className="text-xs font-medium text-red-700 dark:text-red-300">
//                   {totalBaja}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Con plan contratado
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   {clientesConPlan}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Clientes recientes
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Últimos registros del sistema
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               {clientesRecientes.length === 0 ? (
//                 <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//                   No hay clientes recientes.
//                 </div>
//               ) : (
//                 clientesRecientes.map((cliente) => (
//                   <Link
//                     key={cliente.id}
//                     href={`/clientes/${cliente.id}`}
//                     className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
//                   >
//                     <div className="min-w-0">
//                       <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                         {cliente.apellido}, {cliente.nombre}
//                       </p>

//                       <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
//                         N° {cliente.numeroCliente} · {cliente.dni}
//                       </p>
//                     </div>

//                     <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
//                   </Link>
//                 ))
//               )}
//             </div>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/clientes/page.tsx

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import { ClientesTable } from "@/components/tables/ClientesTable";
import { obtenerClientes } from "@/services/cliente.service";
import type { ClienteSafe } from "@/types/cliente.types";

export const metadata = {
  title: "Clientes",
};

type ClientesPageProps = {
  searchParams?: {
    q?: string;
    estado?: string;
    plan?: string;
  };
};

const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

const inputClass =
  "h-8 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-[12px] font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500";

const buttonPrimaryClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 text-[12px] font-medium text-white shadow-sm shadow-blue-950/10 transition hover:bg-blue-700 active:scale-[0.99] dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600";

const filterButtonBaseClass =
  "inline-flex h-8 items-center justify-center rounded-lg border px-3 !text-[12px] !font-medium !leading-none shadow-sm transition active:scale-[0.99]";

const filterButtonPrimaryClass =
  `${filterButtonBaseClass} border-blue-600 bg-blue-600 text-white shadow-blue-950/10 hover:border-blue-700 hover:bg-blue-700 dark:border-blue-500 dark:bg-blue-500 dark:text-white dark:hover:border-blue-600 dark:hover:bg-blue-600`;

const filterButtonSecondaryClass =
  `${filterButtonBaseClass} border-slate-300 bg-white text-slate-700 shadow-slate-300/35 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900`;

const sectionTitleClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

const sectionSubtitleClass =
  "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

const sectionDescriptionClass =
  "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

function normalizarTexto(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function estadoLabel(value: string) {
  if (value === "activo") return "Activos";
  if (value === "suspendido") return "Suspendidos";
  if (value === "baja") return "Baja";
  return "Todos los estados";
}

function planLabel(value: string) {
  if (value === "con-plan") return "Con plan";
  if (value === "sin-plan") return "Sin plan";
  return "Todos";
}

function ordenarClientes(clientes: ClienteSafe[]) {
  return [...clientes].sort((a, b) => {
    const apellidoA = normalizarTexto(a.apellido || "");
    const apellidoB = normalizarTexto(b.apellido || "");

    if (apellidoA !== apellidoB) return apellidoA.localeCompare(apellidoB);

    const nombreA = normalizarTexto(a.nombre || "");
    const nombreB = normalizarTexto(b.nombre || "");

    if (nombreA !== nombreB) return nombreA.localeCompare(nombreB);

    return Number(a.numeroCliente || 0) - Number(b.numeroCliente || 0);
  });
}

function filtrarClientes({
  clientes,
  q,
  estado,
  plan,
}: {
  clientes: ClienteSafe[];
  q: string;
  estado: string;
  plan: string;
}) {
  const busqueda = normalizarTexto(q);

  return clientes.filter((cliente) => {
    const textoCliente = normalizarTexto(
      [
        cliente.numeroCliente,
        cliente.nombre,
        cliente.apellido,
        cliente.dni,
        cliente.direccion,
        cliente.localidad,
        cliente.provincia,
        cliente.telefono,
        cliente.email,
        cliente.estado,
        cliente.plan?.nombre,
        cliente.plan?.tipo,
        cliente.plan?.detalle,
        cliente.plan?.importe,
        cliente.fechaAlta,
      ]
        .filter(Boolean)
        .join(" "),
    );

    const coincideBusqueda = !busqueda || textoCliente.includes(busqueda);
    const coincideEstado = estado === "todos" || cliente.estado === estado;
    const coincidePlan =
      plan === "todos" ||
      (plan === "con-plan" && Boolean(cliente.plan)) ||
      (plan === "sin-plan" && !cliente.plan);

    return coincideBusqueda && coincideEstado && coincidePlan;
  });
}

const quickActions = [
  {
    label: "Nuevo cliente",
    description: "Registrar un cliente",
    href: "/clientes/nuevo",
    icon: Plus,
  },
  {
    label: "Clientes activos",
    description: "Servicio habilitado",
    href: "/clientes?estado=activo",
    icon: CheckCircle2,
  },
  {
    label: "Clientes suspendidos",
    description: "Servicio suspendido",
    href: "/clientes?estado=suspendido",
    icon: Clock3,
  },
  {
    label: "Facturación mensual",
    description: "Generar cargos mensuales",
    href: "/facturacion-mensual",
    icon: FileText,
  },
];

function ResumenItem({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  tone?: "neutral" | "success" | "danger" | "warning" | "primary";
}) {
  const toneClass = {
    neutral: "text-slate-950 dark:text-white",
    success: "text-emerald-700 dark:text-emerald-300",
    danger: "text-red-700 dark:text-red-300",
    warning: "text-amber-700 dark:text-amber-300",
    primary: "text-blue-700 dark:text-blue-300",
  }[tone];

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700">
      <span className="text-[12px] text-slate-700 dark:text-slate-300">
        {label}
      </span>

      <span className={`text-[12px] font-semibold ${toneClass}`}>{value}</span>
    </div>
  );
}

export default async function ClientesPage({ searchParams }: ClientesPageProps) {
  const clientes = await obtenerClientes();

  const q = String(searchParams?.q || "");
  const estado = String(searchParams?.estado || "todos");
  const plan = String(searchParams?.plan || "todos");

  const clientesFiltrados = ordenarClientes(
    filtrarClientes({
      clientes,
      q,
      estado,
      plan,
    }),
  );

  const totalClientes = clientes.length;
  const totalActivos = clientes.filter(
    (cliente) => cliente.estado === "activo",
  ).length;
  const totalSuspendidos = clientes.filter(
    (cliente) => cliente.estado === "suspendido",
  ).length;
  const totalBaja = clientes.filter((cliente) => cliente.estado === "baja")
    .length;
  const clientesConPlan = clientes.filter((cliente) => cliente.plan).length;
  const clientesSinPlan = totalClientes - clientesConPlan;

  const filtroActivo =
    q.trim() !== "" || estado !== "todos" || plan !== "todos";

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <section className={`${panelClass} overflow-hidden`}>
            <div className="border-b border-slate-200 px-3.5 py-3.5 dark:border-slate-700 sm:border-b-0 sm:pb-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <p className={sectionTitleClass}>Clientes</p>

                  <h1 className={sectionSubtitleClass}>Gestión de clientes</h1>

                  <p className={`${sectionDescriptionClass} max-w-3xl`}>
                    Administración de datos personales, planes contratados,
                    estado del servicio y accesos al estado de cuenta.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                  <div className="hidden shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-[12px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400 sm:flex">
                    <UsersRound className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                    Mostrando{" "}
                    <span className="font-semibold text-slate-950 dark:text-white">
                      {clientesFiltrados.length}
                    </span>{" "}
                    de {totalClientes}
                  </div>

                  <Link href="/clientes/nuevo" className={buttonPrimaryClass}>
                    <Plus className="h-3.5 w-3.5 text-white" />
                    <span className="text-white">Nuevo cliente</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="px-3.5 py-3 sm:pt-0">
              <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-[12px] text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400 sm:hidden">
                <UsersRound className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                Mostrando{" "}
                <span className="font-semibold text-slate-950 dark:text-white">
                  {clientesFiltrados.length}
                </span>{" "}
                de {totalClientes}
              </div>

              <form
                action="/clientes"
                className="grid gap-2 rounded-lg border border-slate-300 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-950/50 lg:grid-cols-[minmax(260px,1fr)_150px_130px_auto]"
              >
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                  <input
                    name="q"
                    defaultValue={q}
                    placeholder="Buscar cliente"
                    className={`${inputClass} pl-8`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 lg:contents">
                  <select
                    name="estado"
                    defaultValue={estado}
                    className={inputClass}
                  >
                    <option value="todos">Estados</option>
                    <option value="activo">Activos</option>
                    <option value="suspendido">Suspendidos</option>
                    <option value="baja">Baja</option>
                  </select>

                  <select name="plan" defaultValue={plan} className={inputClass}>
                    <option value="todos">Planes</option>
                    <option value="con-plan">Con plan</option>
                    <option value="sin-plan">Sin plan</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button type="submit" className={filterButtonPrimaryClass}>
                    <span className="text-[12px] leading-none">Filtrar</span>
                  </button>

                  <Link href="/clientes" className={filterButtonSecondaryClass}>
                    <span className="text-[12px] leading-none">Limpiar</span>
                  </Link>
                </div>
              </form>
            </div>
          </section>

          <ClientesTable
            clientes={clientesFiltrados}
            totalClientes={totalClientes}
          />
        </DashboardMain>

        <DashboardAside>
          <section className={`${panelClass} p-3.5`}>
            <div className="mb-3">
              <p className={sectionTitleClass}>Filtro actual</p>

              <h2 className={sectionSubtitleClass}>Vista aplicada</h2>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
              <ResumenItem label="Búsqueda" value={q.trim() || "Sin texto"} />
              <ResumenItem label="Estado" value={estadoLabel(estado)} />
              <ResumenItem label="Plan" value={planLabel(plan)} />
              <ResumenItem
                label="Filtro aplicado"
                value={filtroActivo ? "Sí" : "No"}
                tone={filtroActivo ? "primary" : "neutral"}
              />
            </div>
          </section>

          <section className={`${panelClass} p-3.5`}>
            <div className="mb-3">
              <p className={sectionTitleClass}>Estado de clientes</p>

              <h2 className={sectionSubtitleClass}>Información general</h2>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
              <ResumenItem label="Total clientes" value={totalClientes} />

              <ResumenItem
                label="Activos"
                value={totalActivos}
                tone="success"
              />

              <ResumenItem
                label="Suspendidos"
                value={totalSuspendidos}
                tone={totalSuspendidos > 0 ? "warning" : "neutral"}
              />

              <ResumenItem
                label="Baja"
                value={totalBaja}
                tone={totalBaja > 0 ? "danger" : "neutral"}
              />

              <ResumenItem
                label="Con plan contratado"
                value={clientesConPlan}
                tone="primary"
              />

              <ResumenItem
                label="Sin plan"
                value={clientesSinPlan}
                tone={clientesSinPlan > 0 ? "warning" : "success"}
              />
            </div>
          </section>

          <section className={`${panelClass} hidden p-3.5 xl:block`}>
            <div className="mb-3">
              <p className={sectionTitleClass}>Accesos rápidos</p>

              <h2 className={sectionSubtitleClass}>Atajos del módulo</h2>
            </div>

            <div className="grid gap-2">
              {quickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 ring-1 ring-white/50 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:ring-slate-800/60 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-blue-700 dark:text-slate-400 dark:group-hover:text-blue-300" />

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
          </section>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
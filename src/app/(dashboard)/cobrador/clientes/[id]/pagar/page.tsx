// // src/app/(dashboard)/cobrador/clientes/[id]/pagar/page.tsx

// import { notFound, redirect } from "next/navigation";
// import { UserRound, WalletCards } from "lucide-react";
// import { CobroForm } from "@/components/forms/CobroForm";
// import { PageShell } from "@/components/ui/PageShell";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";
// import { obtenerContextoCobroCobrador } from "@/services/cobro.service";

// type RegistrarPagoPageProps = {
//   params: {
//     id: string;
//   };
//   searchParams?: {
//     dni?: string;
//   };
// };

// export const metadata = {
//   title: "Registrar pago",
// };

// function limpiarDni(value?: string) {
//   return String(value || "").replace(/\D/g, "").slice(0, 12);
// }

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// export default async function RegistrarPagoPage({
//   params,
//   searchParams,
// }: RegistrarPagoPageProps) {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "cobrador") {
//     redirect(`/${user.rol}`);
//   }

//   const currentUser = user as typeof user & {
//     id?: string;
//     userId?: string;
//   };

//   const cobradorId = currentUser.userId || currentUser.id || "";

//   if (!cobradorId) {
//     redirect("/login");
//   }

//   const [resumen, contextoCobro] = await Promise.all([
//     obtenerResumenClienteParaCobrador(params.id),
//     obtenerContextoCobroCobrador(cobradorId),
//   ]);

//   if (!resumen) {
//     notFound();
//   }

//   if (!contextoCobro) {
//     redirect("/cobrador");
//   }

//   const { cliente, periodosPendientes, totalPendiente } = resumen;
//   const dniHabilitante = limpiarDni(searchParams?.dni);

//   if (!dniHabilitante || dniHabilitante !== cliente.dni) {
//     redirect("/cobrador/registrar-pago");
//   }

//   const volverCuentaHref = `/cobrador/clientes/${cliente.id}?modo=pago&dni=${cliente.dni}`;

//   return (
//     <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
//       <section className="mx-auto w-full max-w-6xl space-y-3">
//         <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-4">
//           <div className="flex min-w-0 items-start gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
//               <UserRound className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                 Registrar pago
//               </p>

//               <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">
//                 {cliente.apellido}, {cliente.nombre}
//               </h1>

//               <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                 DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
//               </p>
//             </div>
//           </div>

//           <div className="mt-4 rounded-[1.25rem] border border-red-300 bg-red-50 px-4 py-3 shadow-sm shadow-red-950/5 dark:border-red-900/70 dark:bg-red-950/25">
//             <div className="flex items-start gap-3">
//               <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 sm:flex">
//                 <WalletCards className="h-5 w-5" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-red-700 dark:text-red-300">
//                   Saldo pendiente
//                 </p>

//                 <p className="mt-1 truncate text-4xl font-semibold tracking-tight text-red-700 dark:text-red-300 sm:text-5xl">
//                   {formatMoney(totalPendiente)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-[1.45rem] border-2 border-cyan-300 bg-cyan-50/70 p-3 shadow-sm shadow-cyan-950/5 dark:border-cyan-900/80 dark:bg-cyan-950/15 sm:p-4">
//           <div className="mb-4 flex items-start gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
//               <WalletCards className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                 Datos del pago
//               </p>

//               <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                 Seleccionar período e ingresar importe
//               </h2>

//               <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
//                 Revisá el período habilitado y cargá el monto recibido.
//               </p>
//             </div>
//           </div>

//           <CobroForm
//             clienteId={cliente.id}
//             periodosPendientes={periodosPendientes}
//             saldoCajaActual={contextoCobro.saldoCajaActual}
//             limiteCajaCobrador={contextoCobro.limiteCajaCobrador}
//             returnHref={volverCuentaHref}
//           />
//         </div>
//       </section>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/cobrador/clientes/[id]/pagar/page.tsx

// import { notFound, redirect } from "next/navigation";
// import { UserRound, WalletCards } from "lucide-react";
// import { CobroForm } from "@/components/forms/CobroForm";
// import { PageShell } from "@/components/ui/PageShell";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";
// import { obtenerContextoCobroCobrador } from "@/services/cobro.service";

// type RegistrarPagoPageProps = {
//   params: {
//     id: string;
//   };
//   searchParams?: {
//     dni?: string;
//   };
// };

// export const metadata = {
//   title: "Registrar pago",
// };

// function limpiarDni(value?: string) {
//   return String(value || "").replace(/\D/g, "").slice(0, 12);
// }

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// export default async function RegistrarPagoPage({
//   params,
//   searchParams,
// }: RegistrarPagoPageProps) {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "cobrador") {
//     redirect(`/${user.rol}`);
//   }

//   const currentUser = user as typeof user & {
//     id?: string;
//     userId?: string;
//   };

//   const cobradorId = currentUser.userId || currentUser.id || "";

//   if (!cobradorId) {
//     redirect("/login");
//   }

//   const [resumen, contextoCobro] = await Promise.all([
//     obtenerResumenClienteParaCobrador(params.id),
//     obtenerContextoCobroCobrador(cobradorId),
//   ]);

//   if (!resumen) {
//     notFound();
//   }

//   if (!contextoCobro) {
//     redirect("/cobrador");
//   }

//   const { cliente, periodosPendientes, totalPendiente } = resumen;
//   const dniHabilitante = limpiarDni(searchParams?.dni);

//   if (!dniHabilitante || dniHabilitante !== cliente.dni) {
//     redirect("/cobrador/registrar-pago");
//   }

//   const volverCuentaHref = `/cobrador/clientes/${cliente.id}?modo=pago&dni=${cliente.dni}`;

//   return (
//     <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
//       <section className="mx-auto w-full max-w-6xl space-y-3">
//         <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-4">
//           <div className="flex min-w-0 items-start gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
//               <UserRound className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                 Registrar pago
//               </p>

//               <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">
//                 {cliente.apellido}, {cliente.nombre}
//               </h1>

//               <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                 DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
//               </p>
//             </div>
//           </div>

//           <div className="mt-4 rounded-[1.25rem] border border-red-300 bg-red-50 px-4 py-3 shadow-sm shadow-red-950/5 dark:border-red-900/70 dark:bg-red-950/25">
//             <div className="flex items-start gap-3">
//               <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 sm:flex">
//                 <WalletCards className="h-5 w-5" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-red-700 dark:text-red-300">
//                   Saldo pendiente
//                 </p>

//                 <p className="mt-1 truncate text-4xl font-semibold tracking-tight text-red-700 dark:text-red-300 sm:text-5xl">
//                   {formatMoney(totalPendiente)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-[1.45rem] border-2 border-cyan-300 bg-cyan-50/70 p-3 shadow-sm shadow-cyan-950/5 dark:border-cyan-900/80 dark:bg-cyan-950/15 sm:p-4">
//           <div className="mb-4 flex items-start gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
//               <WalletCards className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//                 Datos del pago
//               </p>

//               <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                 Seleccionar período e ingresar importe
//               </h2>

//               <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">
//                 Revisá el período habilitado y cargá el monto recibido.
//               </p>
//             </div>
//           </div>

//           <CobroForm
//             clienteId={cliente.id}
//             periodosPendientes={periodosPendientes}
//             saldoCajaActual={contextoCobro.saldoCajaActual}
//             limiteCajaCobrador={contextoCobro.limiteCajaCobrador}
//             returnHref={volverCuentaHref}
//           />
//         </div>
//       </section>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/cobrador/clientes/[id]/pagar/page.tsx

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import { CobroForm } from "@/components/forms/CobroForm";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";
import { obtenerContextoCobroCobrador } from "@/services/cobro.service";

type RegistrarPagoPageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    dni?: string;
  };
};

export const metadata = {
  title: "Registrar pago",
};

const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

const innerPanelClass =
  "rounded-lg border border-slate-300 bg-slate-50 shadow-sm shadow-slate-300/35 dark:border-slate-700 dark:bg-slate-950/45 dark:shadow-none";

const mobileScreenClass =
  "rounded-[1.55rem] border border-blue-200 bg-gradient-to-b from-blue-50 via-slate-50 to-white p-2.5 shadow-xl shadow-blue-950/10 ring-1 ring-white/80 dark:border-blue-500/70 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 dark:shadow-black/35 dark:ring-blue-800/50";

const mobileModuleClass =
  "rounded-[1.18rem] border border-blue-200 bg-white/96 p-3.5 shadow-lg shadow-blue-950/10 ring-1 ring-white/80 backdrop-blur dark:border-blue-500/45 dark:bg-slate-950/72 dark:shadow-black/25 dark:ring-blue-950/60";

const sectionTitleClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

const sectionSubtitleClass =
  "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

const sectionDescriptionClass =
  "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

const secondaryButtonClass =
  "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900";

function limpiarDni(value?: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 12);
}

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function HeaderRegistrarPago({
  volverCuentaHref,
}: {
  volverCuentaHref: string;
}) {
  return (
    <section className={`${panelClass} hidden p-3.5 sm:block`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className={sectionTitleClass}>Circuito de cobro</p>

            <h1 className={sectionSubtitleClass}>Registrar pago</h1>

            <p className={`${sectionDescriptionClass} max-w-3xl`}>
              Seleccioná el período habilitado, ingresá el importe recibido y
              confirmá el cobro.
            </p>
          </div>
        </div>

        <Link href={volverCuentaHref} className={secondaryButtonClass}>
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver
        </Link>
      </div>
    </section>
  );
}

function MobilePagoHero({
  cliente,
  totalPendiente,
}: {
  cliente: {
    apellido: string;
    nombre: string;
    dni: string;
    numeroCliente: number;
  };
  totalPendiente: number;
}) {
  const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;

  return (
    <section className="relative overflow-hidden rounded-[1.25rem] border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-600 to-violet-600 p-3.5 text-white shadow-md shadow-blue-950/15 ring-1 ring-blue-200/70 dark:border-blue-500/45 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 dark:shadow-black/20 dark:ring-white/10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/18 blur-2xl dark:bg-blue-300/20" />
      <div className="pointer-events-none absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-white/12 blur-3xl dark:bg-violet-400/16" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
              Registrar pago
            </p>

            <h1 className="mt-1 line-clamp-2 text-[22px] font-semibold leading-7 tracking-tight text-white">
              {nombreCompleto}
            </h1>

            <p className="mt-2 text-[12px] leading-5 text-white/78">
              DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
            </p>
          </div>

          <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full border border-white/35 bg-white/18 px-2 text-[10px] font-semibold leading-none text-white shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Validado
          </span>
        </div>

        <div className="mt-4 rounded-xl border border-white/22 bg-white/14 p-2.5 shadow-sm shadow-blue-950/5 backdrop-blur dark:border-white/15 dark:bg-white/[0.08] dark:shadow-black/5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/68">
            Saldo pendiente
          </p>

          <p className="mt-1 break-words text-[38px] font-semibold leading-none tracking-tight text-white">
            {formatMoney(totalPendiente)}
          </p>

          <p className="mt-2 text-[12px] leading-5 text-white/78">
            Este es el importe máximo disponible para cobrar según la deuda del
            cliente.
          </p>
        </div>
      </div>
    </section>
  );
}

function DesktopClientePagoCard({
  cliente,
  totalPendiente,
}: {
  cliente: {
    apellido: string;
    nombre: string;
    dni: string;
    numeroCliente: number;
  };
  totalPendiente: number;
}) {
  const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;

  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
            <UserRound className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              Cliente validado
            </p>

            <h2 className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
              {nombreCompleto}
            </h2>

            <p className="mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
              DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
            </p>
          </div>
        </div>

        <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 text-[10px] font-semibold leading-none text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Validado
        </span>
      </div>

      <div className="rounded-lg border border-red-200 bg-red-50/80 p-3 shadow-sm shadow-red-950/5 dark:border-red-900/70 dark:bg-red-950/24">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-white text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300">
            <WalletCards className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-red-700 dark:text-red-300">
              Saldo pendiente
            </p>

            <p className="mt-1 text-4xl font-semibold leading-none tracking-tight text-red-700 dark:text-red-300">
              {formatMoney(totalPendiente)}
            </p>

            <p className="mt-2 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
              El formulario permite cobrar solo sobre períodos pendientes
              habilitados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormularioPagoCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <CreditCard className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className={sectionTitleClass}>Datos del pago</p>

          <h2 className={sectionSubtitleClass}>Período e importe</h2>

          <p className={sectionDescriptionClass}>
            Cargá solo el importe recibido y confirmá el registro.
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function AsideResumenPago({
  totalPendiente,
  saldoCajaActual,
  limiteCajaCobrador,
}: {
  totalPendiente: number;
  saldoCajaActual: number;
  limiteCajaCobrador: number;
}) {
  const disponible = Math.max(limiteCajaCobrador - saldoCajaActual, 0);

  return (
    <section className={`${panelClass} hidden p-3.5 sm:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Resumen rápido</p>

        <h2 className={sectionSubtitleClass}>Caja y deuda</h2>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
          <span className="text-[12px] text-slate-700 dark:text-slate-300">
            Deuda cliente
          </span>

          <span className="text-right text-[12px] font-semibold text-red-700 dark:text-red-300">
            {formatMoney(totalPendiente)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
          <span className="text-[12px] text-slate-700 dark:text-slate-300">
            Caja actual
          </span>

          <span className="text-right text-[12px] font-semibold text-slate-950 dark:text-white">
            {formatMoney(saldoCajaActual)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
          <span className="text-[12px] text-slate-700 dark:text-slate-300">
            Límite caja
          </span>

          <span className="text-right text-[12px] font-semibold text-slate-950 dark:text-white">
            {formatMoney(limiteCajaCobrador)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 px-3 py-2.5">
          <span className="text-[12px] text-slate-700 dark:text-slate-300">
            Disponible
          </span>

          <span className="text-right text-[12px] font-semibold text-emerald-700 dark:text-emerald-300">
            {formatMoney(disponible)}
          </span>
        </div>
      </div>
    </section>
  );
}

function AsideImportantePago() {
  return (
    <section className="hidden rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-amber-800 shadow-md shadow-amber-950/5 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 sm:block">
      <div className="flex gap-2">
        <WalletCards className="mt-0.5 h-4 w-4 shrink-0" />

        <p className="text-[12px] leading-5">
          Si la caja alcanza el límite operativo, el sistema bloqueará nuevos
          cobros hasta realizar el cierre correspondiente.
        </p>
      </div>
    </section>
  );
}

export default async function RegistrarPagoPage({
  params,
  searchParams,
}: RegistrarPagoPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const currentUser = user as typeof user & {
    id?: string;
    userId?: string;
  };

  const cobradorId = currentUser.userId || currentUser.id || "";

  if (!cobradorId) {
    redirect("/login");
  }

  const [resumen, contextoCobro] = await Promise.all([
    obtenerResumenClienteParaCobrador(params.id),
    obtenerContextoCobroCobrador(cobradorId),
  ]);

  if (!resumen) {
    notFound();
  }

  if (!contextoCobro) {
    redirect("/cobrador");
  }

  const { cliente, periodosPendientes, totalPendiente } = resumen;
  const dniHabilitante = limpiarDni(searchParams?.dni);

  if (!dniHabilitante || dniHabilitante !== cliente.dni) {
    redirect("/cobrador/registrar-pago");
  }

  const volverCuentaHref = `/cobrador/clientes/${cliente.id}?modo=pago&dni=${cliente.dni}`;

  return (
    <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
      <div className="sm:hidden">
        <div className={mobileScreenClass}>
          <MobilePagoHero cliente={cliente} totalPendiente={totalPendiente} />

          <div className="mt-2.5">
            <section className={mobileModuleClass}>
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500 bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md shadow-blue-950/15 dark:border-blue-400/70 dark:from-blue-500 dark:to-violet-600 dark:shadow-blue-950/20">
                  <CreditCard className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className={sectionTitleClass}>Datos del pago</p>

                  <h2 className={sectionSubtitleClass}>Período e importe</h2>

                  <p className={sectionDescriptionClass}>
                    Seleccioná el período habilitado y cargá el monto recibido.
                  </p>
                </div>
              </div>

              <CobroForm
                clienteId={cliente.id}
                periodosPendientes={periodosPendientes}
                saldoCajaActual={contextoCobro.saldoCajaActual}
                limiteCajaCobrador={contextoCobro.limiteCajaCobrador}
                returnHref={volverCuentaHref}
              />
            </section>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <DashboardGrid>
          <DashboardMain>
            <HeaderRegistrarPago volverCuentaHref={volverCuentaHref} />

            <div className="mt-3">
              <DesktopClientePagoCard
                cliente={cliente}
                totalPendiente={totalPendiente}
              />
            </div>

            <div className="mt-3">
              <FormularioPagoCard>
                <CobroForm
                  clienteId={cliente.id}
                  periodosPendientes={periodosPendientes}
                  saldoCajaActual={contextoCobro.saldoCajaActual}
                  limiteCajaCobrador={contextoCobro.limiteCajaCobrador}
                  returnHref={volverCuentaHref}
                />
              </FormularioPagoCard>
            </div>
          </DashboardMain>

          <DashboardAside>
            <AsideResumenPago
              totalPendiente={totalPendiente}
              saldoCajaActual={contextoCobro.saldoCajaActual}
              limiteCajaCobrador={contextoCobro.limiteCajaCobrador}
            />

            <div className="mt-3">
              <AsideImportantePago />
            </div>
          </DashboardAside>
        </DashboardGrid>
      </div>
    </PageShell>
  );
}
// import Link from "next/link";
// import { notFound, redirect } from "next/navigation";
// import type { ReactNode } from "react";
// import {
//   ArrowLeft,
//   Banknote,
//   FileWarning,
//   History,
//   ReceiptText,
//   ShieldAlert,
//   UserRound,
//   WalletCards,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { obtenerContextoCorreccionPago } from "@/services/cobro.service";
// import { CorreccionPagoForm } from "@/components/forms/CorreccionPagoForm";
// import { PageShell } from "@/components/ui/PageShell";

// export const metadata = {
//   title: "Corregir pago",
// };

// type CorregirPagoPageProps = {
//   params: {
//     movimientoId: string;
//   };
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatDate(value: string | null) {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "-";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month}/${year}, ${hours}:${minutes}`;
// }

// function DataLine({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-1.5 last:border-b-0 dark:border-slate-800">
//       <span className="shrink-0 text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
//         {label}
//       </span>

//       <span className="text-right text-xs font-medium text-slate-950 dark:text-white">
//         {value}
//       </span>
//     </div>
//   );
// }

// function InfoCard({
//   title,
//   icon,
//   children,
// }: {
//   title: string;
//   icon: ReactNode;
//   children: ReactNode;
// }) {
//   return (
//     <div className="rounded-[1.2rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//       <div className="mb-2 flex items-center gap-2">
//         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//           {icon}
//         </div>

//         <h2 className="text-xs font-semibold text-slate-950 dark:text-white">
//           {title}
//         </h2>
//       </div>

//       {children}
//     </div>
//   );
// }

// export default async function CorregirPagoPage({
//   params,
// }: CorregirPagoPageProps) {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "admin") {
//     redirect(`/${user.rol}`);
//   }

//   const contexto = await obtenerContextoCorreccionPago(params.movimientoId);

//   if (!contexto) {
//     notFound();
//   }

//   return (
//     <PageShell maxWidth="wide" className="space-y-3 pb-20 sm:pb-0">
//       <div className="rounded-[1.25rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
//         <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//           <div className="min-w-0">
//             <Link
//               href={`/comprobantes/pagos/${contexto.movimientoId}`}
//               className="inline-flex items-center gap-2 text-[11px] font-medium text-cyan-700 transition hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-cyan-200"
//             >
//               <ArrowLeft className="h-3.5 w-3.5" />
//               Volver al comprobante
//             </Link>

//             <div className="mt-3 flex items-start gap-3">
//               <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 ring-1 ring-red-200 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900">
//                 <FileWarning className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-700 dark:text-red-300">
//                   Corrección administrativa
//                 </p>

//                 <h1 className="mt-0.5 text-lg font-semibold tracking-tight text-slate-950 dark:text-white sm:text-xl">
//                   Corregir pago N° {contexto.numeroComprobante}
//                 </h1>

//                 <p className="mt-1 max-w-4xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   El pago original no se elimina: queda corregido parcialmente y
//                   la verificación pública mostrará el importe válido actual.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-[11px] font-medium text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
//             <ShieldAlert className="h-3.5 w-3.5" />
//             Acción irreversible
//           </div>
//         </div>
//       </div>

//       <div
//         className={`rounded-[1.2rem] border px-3 py-2.5 shadow-sm ${
//           contexto.cobroYaCerrado
//             ? "border-amber-300 bg-amber-50 text-amber-900 shadow-amber-200/60 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200 dark:shadow-none"
//             : "border-cyan-300 bg-cyan-50 text-cyan-900 shadow-cyan-200/60 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200 dark:shadow-none"
//         }`}
//       >
//         <div className="flex items-start gap-3">
//           <div
//             className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${
//               contexto.cobroYaCerrado
//                 ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
//                 : "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300"
//             }`}
//           >
//             {contexto.cobroYaCerrado ? (
//               <History className="h-4 w-4" />
//             ) : (
//               <WalletCards className="h-4 w-4" />
//             )}
//           </div>

//           <div className="min-w-0">
//             <p className="text-xs font-semibold">
//               {contexto.cobroYaCerrado
//                 ? "Corrección sobre una caja ya cerrada"
//                 : "Corrección sobre caja abierta"}
//             </p>

//             <p className="mt-1 text-xs leading-5">
//               {contexto.cobroYaCerrado
//                 ? "La diferencia se descontará como saldo pendiente de la próxima caja del cobrador y quedará asociada al cierre donde se rindió ese cobro."
//                 : "La diferencia se descontará de la caja actual y se cancelarán códigos pendientes de cierre."}
//             </p>

//             {contexto.cobroYaCerrado ? (
//               <p className="mt-1 text-[11px] leading-5 opacity-90">
//                 Cierre asociado:{" "}
//                 {contexto.cierreCajaId
//                   ? contexto.cierreCajaId.slice(-6).toUpperCase()
//                   : "-"}{" "}
//                 · {formatDate(contexto.cierreCajaFecha)}
//               </p>
//             ) : null}
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-3 md:grid-cols-3">
//         <InfoCard
//           title="Comprobante original"
//           icon={<ReceiptText className="h-4 w-4" />}
//         >
//           <DataLine
//             label="Comprobante"
//             value={`N° ${contexto.numeroComprobante}`}
//           />
//           <DataLine label="Fecha" value={formatDate(contexto.fecha)} />
//           <DataLine
//             label="Factura"
//             value={
//               contexto.facturaNumeroComprobante
//                 ? `N° ${contexto.facturaNumeroComprobante}`
//                 : "-"
//             }
//           />
//           <DataLine label="Período" value={contexto.periodoLabel} />
//           <DataLine
//             label="Registrado"
//             value={formatMoney(contexto.importeRegistrado)}
//           />
//         </InfoCard>

//         <InfoCard
//           title="Cliente y cobrador"
//           icon={<UserRound className="h-4 w-4" />}
//         >
//           <DataLine label="Cliente" value={contexto.clienteNombre} />
//           <DataLine label="DNI" value={contexto.clienteDni || "-"} />
//           <DataLine label="Cobrador" value={contexto.cobradorNombre} />
//           <DataLine
//             label="Saldo cliente"
//             value={formatMoney(contexto.saldoClienteDespuesDelPago)}
//           />
//         </InfoCard>

//         <InfoCard
//           title="Estado de caja"
//           icon={<WalletCards className="h-4 w-4" />}
//         >
//           <DataLine
//             label="Caja actual"
//             value={formatMoney(contexto.saldoCajaActual)}
//           />
//           <DataLine
//             label="Estado"
//             value={contexto.cobroYaCerrado ? "Caja cerrada" : "Caja abierta"}
//           />
//           <DataLine
//             label="Impacto"
//             value={
//               contexto.cobroYaCerrado
//                 ? "Saldo pendiente próxima caja"
//                 : "Descuenta caja actual"
//             }
//           />
//           <DataLine
//             label="Comprobante"
//             value={
//               contexto.estadoComprobante === "corregido_parcialmente"
//                 ? "Corregido"
//                 : "Vigente"
//             }
//           />
//         </InfoCard>
//       </div>

//       <section className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//         <div className="mb-3 flex items-start gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//             <Banknote className="h-4 w-4" />
//           </div>

//           <div>
//             <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
//               Datos de la corrección
//             </h2>
//             <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//               Cargá el importe real recibido. El sistema calcula la diferencia y
//               aplica el impacto según el estado de la caja.
//             </p>
//           </div>
//         </div>

//         <CorreccionPagoForm contexto={contexto} />
//       </section>
//     </PageShell>
//   );
// }

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Banknote,
  FileWarning,
  History,
  ReceiptText,
  ShieldAlert,
  UserRound,
  WalletCards,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerContextoCorreccionPago } from "@/services/cobro.service";
import { CorreccionPagoForm } from "@/components/forms/CorreccionPagoForm";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Corregir pago",
};

type CorregirPagoPageProps = {
  params: {
    movimientoId: string;
  };
};

const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

const innerPanelClass =
  "overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none";

const sectionTitleClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

const sectionSubtitleClass =
  "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

const sectionDescriptionClass =
  "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatDate(value: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

function DataLine({
  icon,
  label,
  value,
  tone = "neutral",
}: {
  icon?: ReactNode;
  label: string;
  value: string | number;
  tone?: "neutral" | "primary" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    neutral: "text-slate-950 dark:text-white",
    primary: "text-blue-700 dark:text-blue-300",
    success: "text-emerald-700 dark:text-emerald-300",
    warning: "text-amber-700 dark:text-amber-300",
    danger: "text-red-700 dark:text-red-300",
  }[tone];

  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700">
      <span className="inline-flex min-w-0 items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
        {icon ? (
          <span className="shrink-0 text-blue-700 dark:text-blue-300">
            {icon}
          </span>
        ) : null}

        <span className="truncate">{label}</span>
      </span>

      <span
        className={`min-w-0 text-right text-xs font-semibold ${toneClass}`}
        title={String(value)}
      >
        {value}
      </span>
    </div>
  );
}

function HeaderCorreccionPago({
  movimientoId,
  numeroComprobante,
  importeRegistrado,
}: {
  movimientoId: string;
  numeroComprobante: string | number;
  importeRegistrado: number;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-700 dark:text-red-300">
            Corrección administrativa
          </p>

          <h1 className={sectionSubtitleClass}>
            Corregir pago N° {numeroComprobante}
          </h1>

          <p className={`${sectionDescriptionClass} max-w-4xl`}>
            El pago original no se elimina: queda corregido parcialmente y la
            verificación pública mostrará el importe válido actual.
          </p>

          <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold leading-none text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300">
            <ShieldAlert className="h-3.5 w-3.5" />
            Acción irreversible
          </div>
        </div>

        <Link
          href={`/comprobantes/pagos/${movimientoId}`}
          className="hidden h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900 sm:inline-flex"
        >
          Volver
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        </Link>
      </div>

      <div className="mt-3 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-[12px] leading-5 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300">
        Importe registrado originalmente:{" "}
        <span className="font-semibold">{formatMoney(importeRegistrado)}</span>
      </div>
    </section>
  );
}

function ImpactoCajaPanel({
  cobroYaCerrado,
  cierreCajaId,
  cierreCajaFecha,
}: {
  cobroYaCerrado: boolean;
  cierreCajaId?: string | null;
  cierreCajaFecha?: string | null;
}) {
  return (
    <section
      className={`rounded-xl border px-3.5 py-3 shadow-sm ${
        cobroYaCerrado
          ? "border-amber-300 bg-amber-50 text-amber-900 shadow-amber-200/60 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200 dark:shadow-none"
          : "border-blue-300 bg-blue-50 text-blue-900 shadow-blue-200/60 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-blue-200 dark:shadow-none"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
            cobroYaCerrado
              ? "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/60 dark:text-amber-300"
              : "border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/60 dark:text-blue-300"
          }`}
        >
          {cobroYaCerrado ? (
            <History className="h-4 w-4" />
          ) : (
            <WalletCards className="h-4 w-4" />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-[12px] font-semibold">
            {cobroYaCerrado
              ? "Corrección sobre una caja ya cerrada"
              : "Corrección sobre caja abierta"}
          </p>

          <p className="mt-1 text-[12px] leading-5">
            {cobroYaCerrado
              ? "La diferencia se descontará como saldo pendiente de la próxima caja del cobrador y quedará asociada al cierre donde se rindió ese cobro."
              : "La diferencia se descontará de la caja actual y se cancelarán códigos pendientes de cierre."}
          </p>

          {cobroYaCerrado ? (
            <p className="mt-1 text-[11px] leading-5 opacity-90">
              Cierre asociado:{" "}
              {cierreCajaId ? cierreCajaId.slice(-6).toUpperCase() : "-"} ·{" "}
              {formatDate(cierreCajaFecha || null)}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          {icon}
        </div>

        <div className="min-w-0">
          <p className={sectionTitleClass}>{title}</p>
          <h2 className={sectionSubtitleClass}>Información</h2>
        </div>
      </div>

      <div className={innerPanelClass}>{children}</div>
    </section>
  );
}

function FormPanel({
  contexto,
}: {
  contexto: Awaited<ReturnType<typeof obtenerContextoCorreccionPago>>;
}) {
  if (!contexto) return null;

  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start gap-3 border-b border-slate-200 pb-3 dark:border-slate-700">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          <Banknote className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className={sectionTitleClass}>Datos de la corrección</p>

          <h2 className={sectionSubtitleClass}>Importe real recibido</h2>

          <p className={sectionDescriptionClass}>
            Cargá el importe real recibido. El sistema calcula la diferencia y
            aplica el impacto según el estado de la caja.
          </p>
        </div>
      </div>

      <CorreccionPagoForm contexto={contexto} />
    </section>
  );
}

function ResumenAside({
  numeroComprobante,
  importeRegistrado,
  clienteNombre,
  cobradorNombre,
  cobroYaCerrado,
}: {
  numeroComprobante: string | number;
  importeRegistrado: number;
  clienteNombre: string;
  cobradorNombre: string;
  cobroYaCerrado: boolean;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Resumen</p>

        <h2 className={sectionSubtitleClass}>Pago seleccionado</h2>
      </div>

      <div className={innerPanelClass}>
        <DataLine
          icon={<ReceiptText className="h-3.5 w-3.5" />}
          label="Comprobante"
          value={`N° ${numeroComprobante}`}
          tone="primary"
        />

        <DataLine
          icon={<Banknote className="h-3.5 w-3.5" />}
          label="Registrado"
          value={formatMoney(importeRegistrado)}
          tone="warning"
        />

        <DataLine
          icon={<UserRound className="h-3.5 w-3.5" />}
          label="Cliente"
          value={clienteNombre}
        />

        <DataLine
          icon={<WalletCards className="h-3.5 w-3.5" />}
          label="Cobrador"
          value={cobradorNombre}
        />

        <DataLine
          icon={<ShieldAlert className="h-3.5 w-3.5" />}
          label="Caja"
          value={cobroYaCerrado ? "Cerrada" : "Abierta"}
          tone={cobroYaCerrado ? "warning" : "primary"}
        />
      </div>
    </section>
  );
}

function NotaAside() {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Importante</p>

        <h2 className={sectionSubtitleClass}>Corrección de pago</h2>
      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
        Esta acción no elimina el pago original. Registra una corrección y deja
        trazabilidad administrativa sobre el comprobante y la caja del cobrador.
      </div>
    </section>
  );
}

export default async function CorregirPagoPage({
  params,
}: CorregirPagoPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  const contexto = await obtenerContextoCorreccionPago(params.movimientoId);

  if (!contexto) {
    notFound();
  }

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <HeaderCorreccionPago
            movimientoId={contexto.movimientoId}
            numeroComprobante={contexto.numeroComprobante}
            importeRegistrado={contexto.importeRegistrado}
          />

          <div className="mt-3">
            <ImpactoCajaPanel
              cobroYaCerrado={contexto.cobroYaCerrado}
              cierreCajaId={contexto.cierreCajaId}
              cierreCajaFecha={contexto.cierreCajaFecha}
            />
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-3">
            <InfoCard
              title="Comprobante original"
              icon={<ReceiptText className="h-4 w-4" />}
            >
              <DataLine
                label="Comprobante"
                value={`N° ${contexto.numeroComprobante}`}
                tone="primary"
              />

              <DataLine label="Fecha" value={formatDate(contexto.fecha)} />

              <DataLine
                label="Factura"
                value={
                  contexto.facturaNumeroComprobante
                    ? `N° ${contexto.facturaNumeroComprobante}`
                    : "-"
                }
              />

              <DataLine label="Período" value={contexto.periodoLabel} />

              <DataLine
                label="Registrado"
                value={formatMoney(contexto.importeRegistrado)}
                tone="warning"
              />
            </InfoCard>

            <InfoCard
              title="Cliente y cobrador"
              icon={<UserRound className="h-4 w-4" />}
            >
              <DataLine label="Cliente" value={contexto.clienteNombre} />

              <DataLine label="DNI" value={contexto.clienteDni || "-"} />

              <DataLine label="Cobrador" value={contexto.cobradorNombre} />

              <DataLine
                label="Saldo cliente"
                value={formatMoney(contexto.saldoClienteDespuesDelPago)}
                tone="primary"
              />
            </InfoCard>

            <InfoCard
              title="Estado de caja"
              icon={<WalletCards className="h-4 w-4" />}
            >
              <DataLine
                label="Caja actual"
                value={formatMoney(contexto.saldoCajaActual)}
                tone="primary"
              />

              <DataLine
                label="Estado"
                value={contexto.cobroYaCerrado ? "Caja cerrada" : "Caja abierta"}
                tone={contexto.cobroYaCerrado ? "warning" : "primary"}
              />

              <DataLine
                label="Impacto"
                value={
                  contexto.cobroYaCerrado
                    ? "Saldo pendiente próxima caja"
                    : "Descuenta caja actual"
                }
              />

              <DataLine
                label="Comprobante"
                value={
                  contexto.estadoComprobante === "corregido_parcialmente"
                    ? "Corregido"
                    : "Vigente"
                }
              />
            </InfoCard>
          </div>

          <div className="mt-3">
            <FormPanel contexto={contexto} />
          </div>
        </DashboardMain>

        <DashboardAside>
          <ResumenAside
            numeroComprobante={contexto.numeroComprobante}
            importeRegistrado={contexto.importeRegistrado}
            clienteNombre={contexto.clienteNombre}
            cobradorNombre={contexto.cobradorNombre}
            cobroYaCerrado={contexto.cobroYaCerrado}
          />

          <div className="mt-3">
            <NotaAside />
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
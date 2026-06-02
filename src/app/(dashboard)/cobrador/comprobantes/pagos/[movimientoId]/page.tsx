// import { notFound } from "next/navigation";
// import { ArrowLeft, ReceiptText } from "lucide-react";
// import Link from "next/link";
// import { Badge } from "@/components/ui/Badge";
// import { PageShell } from "@/components/ui/PageShell";
// import { SectionCard } from "@/components/ui/SectionCard";
// import { PrintButton } from "@/components/ui/PrintButton";
// import { obtenerComprobantePagoCliente } from "@/services/comprobante.service";

// type ComprobantePagoPageProps = {
//   params: {
//     movimientoId: string;
//   };
// };

// export const metadata = {
//   title: "Comprobante de pago",
// };

// function formatDate(value: string) {
//   if (!value) return "-";

//   return new Intl.DateTimeFormat("es-AR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(value));
// }

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value);
// }

// function DataLine({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | number;
// }) {
//   return (
//     <div className="flex items-start justify-between gap-3 border-b border-[var(--app-border)] py-2 last:border-b-0">
//       <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
//         {label}
//       </span>

//       <span className="text-right text-sm font-medium text-[var(--app-text-strong)]">
//         {value}
//       </span>
//     </div>
//   );
// }

// export default async function ComprobantePagoPage({
//   params,
// }: ComprobantePagoPageProps) {
//   const comprobante = await obtenerComprobantePagoCliente(params.movimientoId);

//   if (!comprobante) {
//     notFound();
//   }

//   return (
//     <PageShell maxWidth="md">
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
//         <Link
//           href="/cobrador/caja"
//           className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-primary)] transition hover:text-[var(--app-primary-hover)]"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Volver a mi caja
//         </Link>

//         <PrintButton />
//       </div>

//       <div className="rounded-[1.7rem] border border-[var(--app-border)] bg-[var(--app-card)] p-4 shadow-[var(--app-shadow-soft)] sm:p-6 print:border-slate-300 print:bg-white print:shadow-none">
//         <div className="flex flex-col gap-4 border-b border-[var(--app-border)] pb-4 sm:flex-row sm:items-start sm:justify-between">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--app-primary)]">
//               Comprobante de pago
//             </p>

//             <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--app-text-strong)]">
//               N° {comprobante.numeroComprobante}
//             </h1>

//             <p className="mt-1 text-sm text-[var(--app-muted)]">
//               {formatDate(comprobante.fecha)}
//             </p>
//           </div>

//           <Badge variant="success">Pago registrado</Badge>
//         </div>

//         <div className="mt-5 rounded-2xl border border-emerald-200 bg-[var(--app-success-soft)] p-4 text-[var(--app-success)] dark:border-emerald-900/70 print:border-slate-300 print:bg-white print:text-slate-950">
//           <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
//             Importe pagado
//           </p>

//           <p className="mt-2 text-4xl font-semibold tracking-tight">
//             {formatMoney(comprobante.importePagado)}
//           </p>

//           <p className="mt-1 text-sm opacity-90">
//             Período {comprobante.periodoLabel}
//           </p>
//         </div>

//         <div className="mt-5 grid gap-4 lg:grid-cols-2">
//           <SectionCard
//             title="Cliente"
//             icon={<ReceiptText className="h-5 w-5" />}
//           >
//             <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2 print:border-slate-300 print:bg-white">
//               <DataLine
//                 label="Cliente"
//                 value={`${comprobante.clienteApellido}, ${comprobante.clienteNombre}`}
//               />
//               <DataLine label="N° cliente" value={comprobante.clienteNumero} />
//               <DataLine label="DNI" value={comprobante.clienteDni} />
//               <DataLine label="Dirección" value={comprobante.clienteDireccion} />
//               <DataLine label="Localidad" value={comprobante.clienteLocalidad} />
//               <DataLine label="Provincia" value={comprobante.clienteProvincia} />
//             </div>
//           </SectionCard>

//           <SectionCard
//             title="Detalle del pago"
//             icon={<ReceiptText className="h-5 w-5" />}
//           >
//             <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2 print:border-slate-300 print:bg-white">
//               <DataLine label="Período" value={comprobante.periodoLabel} />
//               <DataLine
//                 label="Factura"
//                 value={
//                   comprobante.facturaNumeroComprobante
//                     ? `N° ${comprobante.facturaNumeroComprobante}`
//                     : "-"
//                 }
//               />
//               <DataLine label="Concepto" value={comprobante.concepto} />
//               <DataLine label="Cobrador" value={comprobante.cobradorNombre} />
//               <DataLine
//                 label="Saldo posterior"
//                 value={formatMoney(comprobante.saldoClienteDespuesDelPago)}
//               />
//             </div>
//           </SectionCard>
//         </div>

//         {comprobante.observacion ? (
//           <div className="mt-5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-4 print:border-slate-300 print:bg-white">
//             <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-muted)]">
//               Observación
//             </p>

//             <p className="mt-2 text-sm leading-6 text-[var(--app-text-strong)]">
//               {comprobante.observacion}
//             </p>
//           </div>
//         ) : null}

//         <div className="mt-6 border-t border-[var(--app-border)] pt-4 text-center text-xs leading-5 text-[var(--app-muted)]">
//           <p>
//             Este comprobante fue generado por el sistema al registrar el pago.
//           </p>
//           <p>
//             Conserve este comprobante como constancia de la operación realizada.
//           </p>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

import { redirect } from "next/navigation";

type PageProps = {
  params: {
    movimientoId: string;
  };
};

export default function OldComprobantePagoPage({ params }: PageProps) {
  redirect(`/comprobantes/pagos/${params.movimientoId}`);
}
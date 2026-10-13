// // import { notFound } from "next/navigation";
// // import { Clock3, WalletCards } from "lucide-react";
// // import { Badge } from "@/components/ui/Badge";
// // import { PageHeader } from "@/components/ui/PageHeader";
// // import { PageShell } from "@/components/ui/PageShell";
// // import { SectionCard } from "@/components/ui/SectionCard";
// // import { obtenerDetalleCierreCajaAdmin } from "@/services/admin-caja.service";

// // type AdminDetalleCierrePageProps = {
// //   params: {
// //     id: string;
// //   };
// // };

// // export const metadata = {
// //   title: "Detalle cierre",
// // };

// // function formatDate(value: string | null) {
// //   if (!value) return "-";

// //   return new Intl.DateTimeFormat("es-AR", {
// //     day: "2-digit",
// //     month: "2-digit",
// //     year: "numeric",
// //     hour: "2-digit",
// //     minute: "2-digit",
// //   }).format(new Date(value));
// // }

// // function formatMoney(value: number) {
// //   return new Intl.NumberFormat("es-AR", {
// //     style: "currency",
// //     currency: "ARS",
// //     maximumFractionDigits: 2,
// //   }).format(value);
// // }

// // function DataLine({
// //   label,
// //   value,
// // }: {
// //   label: string;
// //   value: string | number;
// // }) {
// //   return (
// //     <div className="flex items-start justify-between gap-3 border-b border-[var(--app-border)] py-2 last:border-b-0">
// //       <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
// //         {label}
// //       </span>

// //       <span className="text-right text-sm font-medium text-[var(--app-text-strong)]">
// //         {value}
// //       </span>
// //     </div>
// //   );
// // }

// // export default async function AdminDetalleCierrePage({
// //   params,
// // }: AdminDetalleCierrePageProps) {
// //   const detalle = await obtenerDetalleCierreCajaAdmin(params.id);

// //   if (!detalle) {
// //     notFound();
// //   }

// //   return (
// //     <PageShell maxWidth="lg">
// //       <PageHeader
// //         eyebrow={`Código ${detalle.cierre.codigo}`}
// //         title="Detalle del cierre"
// //         description={`${detalle.cierre.cobradorNombre} · ${formatMoney(
// //           detalle.cierre.importe,
// //         )}`}
// //         backHref="/admin/caja-cobradores/cierres"
// //         backLabel="Volver a cierres"
// //       >
// //         <div className="mt-3 flex flex-wrap gap-2">
// //           <Badge variant="success">Cierre confirmado</Badge>
// //           <Badge variant="info">{formatMoney(detalle.cierre.importe)}</Badge>
// //         </div>
// //       </PageHeader>

// //       <div className="grid gap-4 lg:grid-cols-2">
// //         <SectionCard
// //           title="Datos del cierre"
// //           description="Información principal del cierre confirmado."
// //           icon={<WalletCards className="h-5 w-5" />}
// //         >
// //           <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2">
// //             <DataLine label="Cobrador" value={detalle.cierre.cobradorNombre} />
// //             <DataLine label="Importe cerrado" value={formatMoney(detalle.cierre.importe)} />
// //             <DataLine label="Fecha cierre" value={formatDate(detalle.cierre.creadoEn)} />
// //             <DataLine label="Descripción" value={detalle.cierre.descripcion} />
// //           </div>
// //         </SectionCard>

// //         <SectionCard
// //           title="Código utilizado"
// //           description="Datos del código de autorización usado para cerrar caja."
// //           icon={<Clock3 className="h-5 w-5" />}
// //         >
// //           <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2">
// //             <DataLine label="Código" value={detalle.cierre.codigo} />
// //             <DataLine label="Estado" value={detalle.cierre.codigoEstado} />
// //             <DataLine label="Generado por" value={detalle.cierre.generadoPorAdminNombre} />
// //             <DataLine label="Generado" value={formatDate(detalle.cierre.codigoCreadoEn)} />
// //             <DataLine label="Usado" value={formatDate(detalle.cierre.codigoUsadoEn)} />
// //           </div>
// //         </SectionCard>
// //       </div>

// //       <SectionCard
// //         title="Cobros incluidos"
// //         description="Cobros registrados por el cobrador desde el cierre anterior hasta este cierre."
// //         icon={<WalletCards className="h-5 w-5" />}
// //       >
// //         <div className="mb-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-primary-soft)] p-4 text-[var(--app-primary)]">
// //           <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
// //             Total de cobros incluidos
// //           </p>

// //           <p className="mt-2 text-2xl font-semibold">
// //             {formatMoney(detalle.totalCobrosIncluidos)}
// //           </p>

// //           <p className="mt-1 text-sm leading-6 opacity-85">
// //             {detalle.cierreAnteriorFecha
// //               ? `Desde el cierre anterior del ${formatDate(
// //                   detalle.cierreAnteriorFecha,
// //                 )}.`
// //               : "Primer cierre registrado para este cobrador."}
// //           </p>
// //         </div>

// //         {detalle.cobrosIncluidos.length === 0 ? (
// //           <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-4">
// //             <p className="text-sm font-semibold text-[var(--app-text-strong)]">
// //               No se encontraron cobros asociados a este cierre.
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="grid gap-2">
// //             {detalle.cobrosIncluidos.map((cobro) => (
// //               <div
// //                 key={cobro.id}
// //                 className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-sm"
// //               >
// //                 <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
// //                   <div className="min-w-0">
// //                     <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
// //                       {formatDate(cobro.creadoEn)}
// //                     </p>

// //                     <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
// //                       {cobro.descripcion}
// //                     </p>

// //                     {cobro.observacion ? (
// //                       <p className="mt-1 text-xs text-[var(--app-muted)]">
// //                         {cobro.observacion}
// //                       </p>
// //                     ) : null}
// //                   </div>

// //                   <div className="shrink-0 text-right">
// //                     <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
// //                       Importe
// //                     </p>

// //                     <p className="mt-1 text-sm font-semibold text-[var(--app-success)]">
// //                       {formatMoney(cobro.importe)}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </SectionCard>
// //     </PageShell>
// //   );
// // }

// import Link from "next/link";
// import type { ReactNode } from "react";
// import { notFound } from "next/navigation";
// import {
//   ArrowRight,
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   KeyRound,
//   ShieldCheck,
//   UserRound,
//   WalletCards,
// } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";
// import { obtenerDetalleCierreCajaAdmin } from "@/services/admin-caja.service";

// type AdminDetalleCierrePageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Detalle cierre",
// };

// const panelClass =
//   "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

// const innerPanelClass =
//   "overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none";

// const sectionTitleClass =
//   "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

// const sectionSubtitleClass =
//   "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

// const sectionDescriptionClass =
//   "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

// function formatDate(value: string | null) {
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
//   }).format(value || 0);
// }

// function Badge({
//   children,
//   tone = "neutral",
// }: {
//   children: ReactNode;
//   tone?: "neutral" | "success" | "primary" | "warning" | "danger";
// }) {
//   const toneClass = {
//     neutral:
//       "border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300",
//     success:
//       "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300",
//     primary:
//       "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/35 dark:text-blue-300",
//     warning:
//       "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300",
//     danger:
//       "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300",
//   }[tone];

//   return (
//     <span
//       className={`inline-flex h-6 w-fit items-center rounded-full border px-2 text-[10px] font-semibold leading-none ${toneClass}`}
//     >
//       {children}
//     </span>
//   );
// }

// function DataLine({
//   icon,
//   label,
//   value,
//   tone = "neutral",
// }: {
//   icon?: ReactNode;
//   label: string;
//   value: string | number;
//   tone?: "neutral" | "primary" | "success" | "warning" | "danger";
// }) {
//   const toneClass = {
//     neutral: "text-slate-950 dark:text-white",
//     primary: "text-blue-700 dark:text-blue-300",
//     success: "text-emerald-700 dark:text-emerald-300",
//     warning: "text-amber-700 dark:text-amber-300",
//     danger: "text-red-700 dark:text-red-300",
//   }[tone];

//   return (
//     <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700">
//       <span className="inline-flex min-w-0 items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
//         {icon ? (
//           <span className="shrink-0 text-blue-700 dark:text-blue-300">
//             {icon}
//           </span>
//         ) : null}

//         <span className="truncate">{label}</span>
//       </span>

//       <span
//         className={`min-w-0 text-right text-xs font-semibold ${toneClass}`}
//         title={String(value)}
//       >
//         {value}
//       </span>
//     </div>
//   );
// }

// function HeaderDetalleCierre({
//   codigo,
//   cobradorNombre,
//   importe,
// }: {
//   codigo: string;
//   cobradorNombre: string;
//   importe: number;
// }) {
//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
//         <div className="min-w-0">
//           <p className={sectionTitleClass}>Código {codigo}</p>

//           <h1 className={sectionSubtitleClass}>Detalle del cierre</h1>

//           <p className={`${sectionDescriptionClass} max-w-3xl`}>
//             {cobradorNombre} · {formatMoney(importe)}
//           </p>

//           <div className="mt-2 flex flex-wrap items-center gap-2">
//             <Badge tone="success">Cierre confirmado</Badge>
//             <Badge tone="primary">{formatMoney(importe)}</Badge>
//           </div>
//         </div>

//         <Link
//           href="/admin/caja-cobradores/cierres"
//           className="hidden h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900 sm:inline-flex"
//         >
//           Volver
//           <ArrowRight className="h-3.5 w-3.5 rotate-180" />
//         </Link>
//       </div>
//     </section>
//   );
// }

// function DatosCierrePanel({
//   cobradorNombre,
//   importe,
//   creadoEn,
//   descripcion,
// }: {
//   cobradorNombre: string;
//   importe: number;
//   creadoEn: string | null;
//   descripcion: string;
// }) {
//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="mb-3 flex items-start gap-3">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
//           <WalletCards className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className={sectionTitleClass}>Datos del cierre</p>

//           <h2 className={sectionSubtitleClass}>Información principal</h2>

//           <p className={sectionDescriptionClass}>
//             Datos principales del cierre confirmado.
//           </p>
//         </div>
//       </div>

//       <div className={innerPanelClass}>
//         <DataLine
//           icon={<UserRound className="h-3.5 w-3.5" />}
//           label="Cobrador"
//           value={cobradorNombre}
//           tone="primary"
//         />

//         <DataLine
//           icon={<WalletCards className="h-3.5 w-3.5" />}
//           label="Importe cerrado"
//           value={formatMoney(importe)}
//           tone="success"
//         />

//         <DataLine
//           icon={<CalendarClock className="h-3.5 w-3.5" />}
//           label="Fecha cierre"
//           value={formatDate(creadoEn)}
//         />

//         <DataLine label="Descripción" value={descripcion || "-"} />
//       </div>
//     </section>
//   );
// }

// function CodigoUtilizadoPanel({
//   codigo,
//   codigoEstado,
//   generadoPorAdminNombre,
//   codigoCreadoEn,
//   codigoUsadoEn,
// }: {
//   codigo: string;
//   codigoEstado: string;
//   generadoPorAdminNombre: string;
//   codigoCreadoEn: string | null;
//   codigoUsadoEn: string | null;
// }) {
//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="mb-3 flex items-start gap-3">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
//           <KeyRound className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className={sectionTitleClass}>Código utilizado</p>

//           <h2 className={sectionSubtitleClass}>Autorización del cierre</h2>

//           <p className={sectionDescriptionClass}>
//             Datos del código usado para cerrar la caja.
//           </p>
//         </div>
//       </div>

//       <div className={innerPanelClass}>
//         <DataLine
//           icon={<KeyRound className="h-3.5 w-3.5" />}
//           label="Código"
//           value={codigo}
//           tone="primary"
//         />

//         <DataLine
//           icon={<CheckCircle2 className="h-3.5 w-3.5" />}
//           label="Estado"
//           value={codigoEstado}
//           tone="success"
//         />

//         <DataLine
//           icon={<ShieldCheck className="h-3.5 w-3.5" />}
//           label="Generado por"
//           value={generadoPorAdminNombre}
//         />

//         <DataLine
//           icon={<Clock3 className="h-3.5 w-3.5" />}
//           label="Generado"
//           value={formatDate(codigoCreadoEn)}
//         />

//         <DataLine
//           icon={<Clock3 className="h-3.5 w-3.5" />}
//           label="Usado"
//           value={formatDate(codigoUsadoEn)}
//         />
//       </div>
//     </section>
//   );
// }

// function CobroIncluidoCard({
//   creadoEn,
//   descripcion,
//   observacion,
//   importe,
// }: {
//   creadoEn: string;
//   descripcion: string;
//   observacion?: string | null;
//   importe: number;
// }) {
//   return (
//     <article className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2.5 shadow-sm shadow-slate-300/35 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/15 dark:ring-slate-800/80">
//       <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
//         <div className="min-w-0">
//           <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
//             {formatDate(creadoEn)}
//           </p>

//           <p className="mt-1 text-[13px] font-semibold text-slate-950 dark:text-white">
//             {descripcion || "Cobro registrado"}
//           </p>

//           {observacion ? (
//             <p className="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
//               {observacion}
//             </p>
//           ) : null}
//         </div>

//         <div className="shrink-0 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-right dark:border-emerald-900/70 dark:bg-emerald-950/35">
//           <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">
//             Importe
//           </p>

//           <p className="mt-1 text-[13px] font-semibold text-emerald-700 dark:text-emerald-300">
//             {formatMoney(importe)}
//           </p>
//         </div>
//       </div>
//     </article>
//   );
// }

// function CobrosIncluidosPanel({
//   totalCobrosIncluidos,
//   cierreAnteriorFecha,
//   cobrosIncluidos,
// }: {
//   totalCobrosIncluidos: number;
//   cierreAnteriorFecha: string | null;
//   cobrosIncluidos: {
//     id: string;
//     creadoEn: string;
//     descripcion: string;
//     observacion?: string | null;
//     importe: number;
//   }[];
// }) {
//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="mb-3 flex items-start gap-3">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
//           <WalletCards className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className={sectionTitleClass}>Cobros incluidos</p>

//           <h2 className={sectionSubtitleClass}>Movimientos del período</h2>

//           <p className={sectionDescriptionClass}>
//             Cobros registrados por el cobrador desde el cierre anterior hasta
//             este cierre.
//           </p>
//         </div>
//       </div>

//       <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-blue-800 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-blue-300">
//         <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
//           Total de cobros incluidos
//         </p>

//         <p className="mt-1 text-xl font-semibold">
//           {formatMoney(totalCobrosIncluidos)}
//         </p>

//         <p className="mt-1 text-[12px] leading-5">
//           {cierreAnteriorFecha
//             ? `Desde el cierre anterior del ${formatDate(
//                 cierreAnteriorFecha,
//               )}.`
//             : "Primer cierre registrado para este cobrador."}
//         </p>
//       </div>

//       {cobrosIncluidos.length === 0 ? (
//         <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-[12px] leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
//           No se encontraron cobros asociados a este cierre.
//         </div>
//       ) : (
//         <div className="grid gap-2.5">
//           {cobrosIncluidos.map((cobro) => (
//             <CobroIncluidoCard
//               key={cobro.id}
//               creadoEn={cobro.creadoEn}
//               descripcion={cobro.descripcion}
//               observacion={cobro.observacion}
//               importe={cobro.importe}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// function ResumenAside({
//   codigo,
//   importe,
//   cobradorNombre,
//   creadoEn,
// }: {
//   codigo: string;
//   importe: number;
//   cobradorNombre: string;
//   creadoEn: string | null;
// }) {
//   return (
//     <section className={`${panelClass} p-3.5`}>
//       <div className="mb-3">
//         <p className={sectionTitleClass}>Resumen</p>

//         <h2 className={sectionSubtitleClass}>Cierre seleccionado</h2>
//       </div>

//       <div className={innerPanelClass}>
//         <DataLine
//           icon={<KeyRound className="h-3.5 w-3.5" />}
//           label="Código"
//           value={codigo}
//           tone="primary"
//         />

//         <DataLine
//           icon={<WalletCards className="h-3.5 w-3.5" />}
//           label="Importe"
//           value={formatMoney(importe)}
//           tone="success"
//         />

//         <DataLine
//           icon={<UserRound className="h-3.5 w-3.5" />}
//           label="Cobrador"
//           value={cobradorNombre}
//         />

//         <DataLine
//           icon={<CalendarClock className="h-3.5 w-3.5" />}
//           label="Fecha"
//           value={formatDate(creadoEn)}
//         />
//       </div>
//     </section>
//   );
// }

// function NotaAside() {
//   return (
//     <section className={`${panelClass} hidden p-3.5 xl:block`}>
//       <div className="mb-3">
//         <p className={sectionTitleClass}>Nota</p>

//         <h2 className={sectionSubtitleClass}>Auditoría del cierre</h2>
//       </div>

//       <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[12px] leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
//         Este detalle permite revisar el código utilizado, el importe autorizado
//         y los cobros incluidos dentro del cierre confirmado.
//       </div>
//     </section>
//   );
// }

// export default async function AdminDetalleCierrePage({
//   params,
// }: AdminDetalleCierrePageProps) {
//   const detalle = await obtenerDetalleCierreCajaAdmin(params.id);

//   if (!detalle) {
//     notFound();
//   }

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <DashboardGrid>
//         <DashboardMain>
//           <HeaderDetalleCierre
//             codigo={detalle.cierre.codigo}
//             cobradorNombre={detalle.cierre.cobradorNombre}
//             importe={detalle.cierre.importe}
//           />

//           <div className="mt-3 grid gap-3 xl:grid-cols-2">
//             <DatosCierrePanel
//               cobradorNombre={detalle.cierre.cobradorNombre}
//               importe={detalle.cierre.importe}
//               creadoEn={detalle.cierre.creadoEn}
//               descripcion={detalle.cierre.descripcion}
//             />

//             <CodigoUtilizadoPanel
//               codigo={detalle.cierre.codigo}
//               codigoEstado={detalle.cierre.codigoEstado}
//               generadoPorAdminNombre={detalle.cierre.generadoPorAdminNombre}
//               codigoCreadoEn={detalle.cierre.codigoCreadoEn}
//               codigoUsadoEn={detalle.cierre.codigoUsadoEn}
//             />
//           </div>

//           <div className="mt-3">
//             <CobrosIncluidosPanel
//               totalCobrosIncluidos={detalle.totalCobrosIncluidos}
//               cierreAnteriorFecha={detalle.cierreAnteriorFecha}
//               cobrosIncluidos={detalle.cobrosIncluidos}
//             />
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <ResumenAside
//             codigo={detalle.cierre.codigo}
//             importe={detalle.cierre.importe}
//             cobradorNombre={detalle.cierre.cobradorNombre}
//             creadoEn={detalle.cierre.creadoEn}
//           />

//           <div className="mt-3">
//             <NotaAside />
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileClock,
  KeyRound,
  Wallet,
} from "lucide-react";
import {
  cajaStyles as styles,
  movementStyles as movements,
} from "@/components/ui/dashboard-styles";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerDetalleCierreCajaAdmin } from "@/services/admin-caja.service";
import type { CajaCobradorMovimientoSafe } from "@/types/cobro.types";

export const metadata = { title: "Detalle del cierre" };
export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
};

function money(value: number) {
  const [integer, decimal] = (Number.isFinite(value) ? value : 0)
    .toFixed(2)
    .split(".");

  return `$ ${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${decimal}`;
}

function dateTime(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";

  const parts = new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value || "";

  return `${part("day")}/${part("month")}/${part("year")} ${part("hour")}:${part("minute")}`;
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>
          {icon}
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[100px_minmax(0,1fr)] items-start gap-3 border-b border-[var(--overview-border)] py-[9px] last:border-b-0">
      <dt className="text-[var(--overview-muted)]">{label}</dt>
      <dd className="m-0 min-w-0 text-right [overflow-wrap:anywhere]">
        {children}
      </dd>
    </div>
  );
}

function movementLabel(movimiento: CajaCobradorMovimientoSafe) {
  if (movimiento.tipoMovimiento === "cobro") return "Cobro";

  if (
    movimiento.tipoMovimiento === "ajuste_correccion_pago_post_cierre"
  ) {
    return "Ajuste posterior";
  }

  if (movimiento.tipoMovimiento === "ajuste_correccion_pago") {
    return "Ajuste";
  }

  return "Cierre";
}

function MovementBadge({
  movimiento,
}: {
  movimiento: CajaCobradorMovimientoSafe;
}) {
  return (
    <span
      className={`${styles.badge} ${
        movimiento.tipoMovimiento === "cobro"
          ? styles.greenBadge
          : styles.amberBadge
      }`}
    >
      {movementLabel(movimiento)}
    </span>
  );
}

export default async function AdminDetalleCierrePage({ params }: Props) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.rol !== "admin") redirect(`/${user.rol}`);

  const detalle = await obtenerDetalleCierreCajaAdmin(params.id);
  if (!detalle) notFound();

  const {
    cierre,
    cobrosIncluidos,
    totalCobrosIncluidos,
    cierreAnteriorFecha,
  } = detalle;

  const codeStates: Record<string, string> = {
    usado: "Usado",
    pendiente: "Pendiente",
    vencido: "Vencido",
    cancelado: "Cancelado",
  };

  const codeTone =
    cierre.codigoEstado === "usado"
      ? styles.greenBadge
      : cierre.codigoEstado === "pendiente"
        ? styles.amberBadge
        : styles.blueBadge;

  const detailText = (movimiento: CajaCobradorMovimientoSafe) =>
    [
      movimiento.descripcion || movementLabel(movimiento),
      movimiento.observacion,
    ]
      .filter(Boolean)
      .join(" · ");

  return (
    <div className={styles.page}>
      <header className={`${styles.heading} flex-wrap`}>
        <div className="min-w-0">
          <h1>Detalle del cierre</h1>
          <p className={`${styles.description} [overflow-wrap:anywhere]`}>
            {cierre.cobradorNombre || "Cobrador"} ·{" "}
            {dateTime(cierre.creadoEn)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`${styles.badge} ${styles.greenBadge}`}>
            <CheckCircle2
              className="!size-3.5"
              aria-hidden="true"
            />
            Cierre confirmado
          </span>

          <Link
            href="/admin/caja-cobradores/cierres"
            className={styles.button}
          >
            <ArrowLeft aria-hidden="true" />
            Volver a cierres
          </Link>
        </div>
      </header>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className="grid min-w-0 gap-[14px] min-[900px]:grid-cols-2">
            <Panel
              title="Datos del cierre"
              icon={
                <Wallet
                  className="!inline-block !size-3.5 text-emerald-700 dark:text-emerald-300"
                  aria-hidden="true"
                />
              }
            >
              <dl className={`${styles.sideBody} m-0`}>
                <Fact label="Cobrador">
                  {cierre.cobradorNombre || "—"}
                </Fact>

                <Fact label="Importe cerrado">
                  <span className={`tabular-nums ${styles.green}`}>
                    {money(cierre.importe)}
                  </span>
                </Fact>

                <Fact label="Fecha y hora">
                  {dateTime(cierre.creadoEn)}
                </Fact>

                <Fact label="Descripción">
                  {cierre.descripcion || "—"}
                </Fact>

                {cierre.observacion && (
                  <Fact label="Observación">
                    {cierre.observacion}
                  </Fact>
                )}
              </dl>
            </Panel>

            <Panel
              title="Autorización del cierre"
              icon={
                <KeyRound
                  className="!inline-block !size-3.5 text-violet-700 dark:text-violet-300"
                  aria-hidden="true"
                />
              }
            >
              <dl className={`${styles.sideBody} m-0`}>
                <Fact label="Código">
                  <span className="rounded-[5px] bg-violet-50 px-2 py-1 tabular-nums text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                    {cierre.codigo || "—"}
                  </span>
                </Fact>

                <Fact label="Estado">
                  <span className={`${styles.badge} ${codeTone}`}>
                    {codeStates[cierre.codigoEstado] ||
                      cierre.codigoEstado ||
                      "—"}
                  </span>
                </Fact>

                <Fact label="Generado por">
                  {cierre.generadoPorAdminNombre || "—"}
                </Fact>

                <Fact label="Generado">
                  {dateTime(cierre.codigoCreadoEn)}
                </Fact>

                <Fact label="Utilizado">
                  {dateTime(cierre.codigoUsadoEn)}
                </Fact>
              </dl>
            </Panel>
          </div>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>
                <CalendarClock
                  className="!inline-block !size-3.5 text-blue-700 dark:text-blue-300"
                  aria-hidden="true"
                />
                Movimientos del cierre
              </h2>

              <span className={styles.count}>
                {cobrosIncluidos.length} registros
              </span>
            </div>

            {cobrosIncluidos.length === 0 ? (
              <p className="px-[14px] py-5 text-[12px] text-[var(--overview-muted)]">
                No se encontraron movimientos asociados a este cierre.
              </p>
            ) : (
              <>
                <div className={styles.desktopTable}>
                  <table
                    className={`${movements.table} !min-w-[700px]`}
                  >
                    <caption className="sr-only">
                      Movimientos asociados al cierre de caja
                    </caption>

                    <colgroup>
                      <col className="w-[155px]" />
                      <col className="w-[125px]" />
                      <col />
                      <col className="w-[145px]" />
                    </colgroup>

                    <thead>
                      <tr>
                        <th scope="col">Fecha y hora</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Detalle</th>
                        <th
                          scope="col"
                          className={movements.right}
                        >
                          Importe
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {cobrosIncluidos.map((movimiento) => (
                        <tr key={movimiento.id}>
                          <td className={movements.date}>
                            {dateTime(movimiento.creadoEn)}
                          </td>

                          <td>
                            <MovementBadge movimiento={movimiento} />
                          </td>

                          <td>
                            <span
                              className={movements.ellipsis}
                              title={detailText(movimiento)}
                            >
                              {detailText(movimiento)}
                            </span>
                          </td>

                          <td
                            className={`${movements.right} tabular-nums ${
                              movimiento.tipoMovimiento === "cobro"
                                ? styles.green
                                : styles.amber
                            }`}
                          >
                            {money(movimiento.importe)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className={styles.cards}>
                  {cobrosIncluidos.map((movimiento) => (
                    <article
                      key={movimiento.id}
                      className={styles.card}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={movements.date}>
                          {dateTime(movimiento.creadoEn)}
                        </span>
                        <MovementBadge movimiento={movimiento} />
                      </div>

                      <p className="mt-2 text-[12px] leading-[1.7] [overflow-wrap:anywhere]">
                        {movimiento.descripcion ||
                          movementLabel(movimiento)}
                      </p>

                      {movimiento.observacion && (
                        <p className="mt-1 text-[11px] leading-[1.7] text-[var(--overview-muted)] [overflow-wrap:anywhere]">
                          {movimiento.observacion}
                        </p>
                      )}

                      <p
                        className={`mt-3 text-right text-[17px] tabular-nums ${
                          movimiento.tipoMovimiento === "cobro"
                            ? styles.green
                            : styles.amber
                        }`}
                      >
                        {money(movimiento.importe)}
                      </p>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>

        <aside className="grid min-w-0 content-start gap-[14px] min-[700px]:grid-cols-2 min-[1500px]:grid-cols-1">
          <Panel
            title="Período revisado"
            icon={
              <CalendarClock
                className="!inline-block !size-3.5 text-blue-700 dark:text-blue-300"
                aria-hidden="true"
              />
            }
          >
            <div className={styles.sideBody}>
              <p className="text-[11px] text-[var(--overview-muted)]">
                Total neto de movimientos
              </p>

              <p
                className={`mt-2 text-[22px] tabular-nums [overflow-wrap:anywhere] ${styles.blue}`}
              >
                {money(totalCobrosIncluidos)}
              </p>

              <p className="mt-2 text-[11px] leading-[1.7] text-[var(--overview-muted)]">
                Incluye cobros y descuenta los ajustes de corrección.
              </p>

              <dl className="m-0 mt-2">
                <Fact label="Cierre anterior">
                  {cierreAnteriorFecha
                    ? dateTime(cierreAnteriorFecha)
                    : "Primer cierre"}
                </Fact>

                <Fact label="Hasta">
                  {dateTime(cierre.creadoEn)}
                </Fact>
              </dl>
            </div>
          </Panel>

          <Panel
            title="Accesos rápidos"
            icon={
              <FileClock
                className="!inline-block !size-3.5 text-violet-700 dark:text-violet-300"
                aria-hidden="true"
              />
            }
          >
            <div className={`${styles.sideBody} grid gap-2`}>
              <Link
                href={`/admin/caja-cobradores/${cierre.cobradorId}`}
                className={`${styles.button} !h-auto !justify-start !py-[10px] !text-[var(--overview-green)]`}
              >
                <Wallet aria-hidden="true" />
                <span className="flex-1">Caja del cobrador</span>
                <ArrowRight aria-hidden="true" />
              </Link>

              <Link
                href="/admin/auditoria"
                className={`${styles.button} !h-auto !justify-start !py-[10px] !text-violet-700 dark:!text-violet-300`}
              >
                <FileClock aria-hidden="true" />
                <span className="flex-1">Auditoría</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}
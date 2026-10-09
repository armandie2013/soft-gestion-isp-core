// // import Link from "next/link";
// // import { notFound } from "next/navigation";
// // import { ArrowLeft } from "lucide-react";
// // import { GenerarFacturaManualForm } from "@/components/forms/GenerarFacturaManualForm";
// // import { obtenerClientePorId } from "@/services/cliente.service";

// // type PageProps = {
// //   params: {
// //     id: string;
// //   };
// // };

// // export const metadata = {
// //   title: "Generar factura",
// // };

// // export default async function GenerarFacturaPage({ params }: PageProps) {
// //   const cliente = await obtenerClientePorId(params.id);

// //   if (!cliente) {
// //     notFound();
// //   }

// //   return (
// //     <section className="mx-auto w-full max-w-3xl space-y-4">
// //       <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
// //         <Link
// //           href={`/clientes/${cliente.id}/estado-cuenta`}
// //           className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300"
// //         >
// //           <ArrowLeft className="h-4 w-4" />
// //           Volver al estado de cuenta
// //         </Link>

// //         <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
// //           Generar factura manual
// //         </h1>

// //         <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
// //           Cliente N° {cliente.numeroCliente} · {cliente.apellido}, {cliente.nombre}
// //         </p>
// //       </div>

// //       <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
// //         <GenerarFacturaManualForm clienteId={cliente.id} />
// //       </div>
// //     </section>
// //   );
// // }

// // src/app/(dashboard)/clientes/[id]/factura/page.tsx

// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   ArrowLeft,
//   ArrowRight,
//   ReceiptText,
//   ShieldAlert,
//   UserRound,
// } from "lucide-react";
// import { obtenerClientePorId } from "@/services/cliente.service";
// import { PageShell } from "@/components/ui/PageShell";

// type PageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Generar factura",
// };

// export default async function GenerarFacturaPage({ params }: PageProps) {
//   const cliente = await obtenerClientePorId(params.id);

//   if (!cliente) {
//     notFound();
//   }

//   return (
//     <PageShell maxWidth="lg" className="pb-20 sm:pb-0">
//       <section className="mx-auto w-full max-w-3xl space-y-4">
//         <div className="rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3.5 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
//           <Link
//             href={`/clientes/${cliente.id}/estado-cuenta`}
//             className="inline-flex items-center gap-2 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//           >
//             <ArrowLeft className="h-3.5 w-3.5" />
//             Volver al estado de cuenta
//           </Link>

//           <div className="mt-5 flex items-start gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//               <ReceiptText className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Facturación
//               </p>

//               <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//                 Generar factura mensual
//               </h1>

//               <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
//                 Cliente N° {cliente.numeroCliente} · {cliente.apellido},{" "}
//                 {cliente.nombre}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3.5 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
//           <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//             <div className="flex gap-2">
//               <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

//               <div>
//                 <p className="font-medium">Proceso centralizado</p>

//                 <p className="mt-1">
//                   La generación de facturas mensuales se realiza desde el módulo
//                   de configuración. El sistema genera facturas para clientes
//                   activos y omite automáticamente los períodos que ya fueron
//                   facturados.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-4 rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none">
//             <div className="flex items-start gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                 <UserRound className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Cliente seleccionado
//                 </p>

//                 <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                   {cliente.apellido}, {cliente.nombre}
//                 </h2>

//                 <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   Para generar la facturación mensual, ingresá al módulo general
//                   de facturación.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
//             <Link
//               href={`/clientes/${cliente.id}/estado-cuenta`}
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:bg-slate-800"
//             >
//               <ArrowLeft className="h-3.5 w-3.5" />
//               Estado de cuenta
//             </Link>

//             <Link
//               href="/admin/configuracion/facturacion"
//               className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//             >
//               Ir a facturación mensual
//               <ArrowRight className="h-3.5 w-3.5" />
//             </Link>
//           </div>
//         </div>
//       </section>
//     </PageShell>
//   );
// }

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarClock, ReceiptText, UserRound, Wallet } from "lucide-react";
import { cajaStyles as styles } from "@/components/ui/dashboard-styles";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerClientePorId } from "@/services/cliente.service";

export const metadata = { title: "Facturación del cliente" };
export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

export default async function FacturaPage({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.rol !== "admin") redirect(`/${user.rol}`);

  const cliente = await obtenerClientePorId(params.id);
  if (!cliente) notFound();

  const nombre = [cliente.apellido, cliente.nombre]
    .map((value) => value.trim())
    .filter(Boolean)
    .join(", ") || "Cliente sin nombre";
  const estadoLabel = { activo: "Activo", suspendido: "Suspendido", baja: "Baja" }[cliente.estado];
  const estadoTone = cliente.estado === "activo"
    ? styles.greenBadge
    : cliente.estado === "suspendido"
      ? styles.amberBadge
      : "!bg-red-50 text-red-700 dark:!bg-red-950/40 dark:text-red-300";
  const cuentaHref = `/clientes/${cliente.id}/estado-cuenta`;

  return (
    <div className={styles.page}>
      <header className={`${styles.heading} flex-wrap`}>
        <div className="min-w-0">
          <h1>Facturación del cliente</h1>
          <p className={`${styles.description} [overflow-wrap:anywhere]`}>
            {nombre} · N° {cliente.numeroCliente}
          </p>
        </div>
        <Link href={cuentaHref} className={`${styles.button} shrink-0 !whitespace-normal`}>
          <ArrowLeft aria-hidden="true" /> Volver al estado de cuenta
        </Link>
      </header>

      <div className={styles.layout}>
        <div className={styles.main}>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>
                <ReceiptText className="!inline-block !size-3.5 text-[var(--overview-blue)]" aria-hidden="true" />
                Facturación mensual
              </h2>
              <span className={styles.count}>Proceso general</span>
            </div>
            <div className="grid gap-[14px] p-[14px]">
              <p className="text-[12px] leading-[1.8] text-[var(--overview-muted)]">
                Las facturas mensuales se generan desde Configuración. Allí podés elegir
                hasta qué mes completar la facturación pendiente.
              </p>
              <div className="flex items-start gap-3 rounded-[7px] border border-blue-200 bg-blue-50 p-3 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
                <CalendarClock className="mt-0.5 !size-4 shrink-0" aria-hidden="true" />
                <div className="min-w-0 text-[12px] leading-[1.8]">
                  <p>La ejecución incluye a todos los clientes activos.</p>
                  <p className="mt-1 text-[11px]">
                    Abrir el módulo desde esta ficha no limita la generación a {nombre}.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 min-[700px]:grid-cols-3">
                {[
                  { title: "Corte día 28", text: "La facturación utiliza el corte mensual del día 28." },
                  { title: "Períodos pendientes", text: "Se completan desde el alta hasta el mes elegido, con los prorrateos correspondientes." },
                  { title: "Facturas existentes", text: "Se omiten o se ajustan según corresponda, sin duplicar la factura del período." },
                ].map((item) => (
                  <div key={item.title} className="min-w-0 rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-bg)] p-3">
                    <h3 className="text-[12px] font-normal text-[var(--overview-text)]">{item.title}</h3>
                    <p className="mt-1 text-[11px] leading-[1.8] text-[var(--overview-muted)]">{item.text}</p>
                  </div>
                ))}
              </div>
              {cliente.estado !== "activo" && (
                <p className="rounded-[7px] border border-amber-200 bg-amber-50 p-3 text-[12px] leading-[1.8] text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                  Este cliente está {cliente.estado === "suspendido" ? "suspendido" : "dado de baja"}.
                  La generación mensual procesa únicamente clientes activos.
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[var(--overview-border)] p-[14px]">
              <Link href="/admin/configuracion/facturacion" className={`${styles.button} w-full !whitespace-normal !border-blue-600 !bg-blue-600 !text-white hover:!bg-blue-700 min-[700px]:w-auto`}>
                Ir a facturación mensual <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>

        <aside className="grid min-w-0 content-start gap-[14px] min-[700px]:grid-cols-2 min-[1500px]:grid-cols-1">
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Servicio del cliente</h2>
            </div>
            <div className={styles.sideBody}>
              <div className={styles.sideRow}>
                <span>Estado</span>
                <span className={`${styles.badge} ${estadoTone}`}>{estadoLabel}</span>
              </div>
              <div className="mt-3 border-t border-[var(--overview-border)] pt-3">
                <p className="text-[11px] text-[var(--overview-muted)]">Plan contratado</p>
                <p className="mt-1 text-[12px] leading-[1.7] [overflow-wrap:anywhere]">
                  {cliente.plan?.nombre || "Sin plan disponible"}
                </p>
              </div>
            </div>
          </section>
          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Accesos rápidos</h2>
            </div>
            <div className={`${styles.sideBody} grid gap-2`}>
              <Link href={cuentaHref} className={`${styles.button} !justify-start !whitespace-normal !py-[10px] !text-violet-700 dark:!text-violet-300`}>
                <Wallet aria-hidden="true" /><span className="min-w-0 flex-1">Estado de cuenta</span><ArrowRight aria-hidden="true" />
              </Link>
              <Link href={`/clientes/${cliente.id}`} className={`${styles.button} !justify-start !whitespace-normal !py-[10px] !text-[var(--overview-blue)]`}>
                <UserRound aria-hidden="true" /><span className="min-w-0 flex-1">Ficha del cliente</span><ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import { GenerarFacturaManualForm } from "@/components/forms/GenerarFacturaManualForm";
// import { obtenerClientePorId } from "@/services/cliente.service";

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
//     <section className="mx-auto w-full max-w-3xl space-y-4">
//       <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
//         <Link
//           href={`/clientes/${cliente.id}/estado-cuenta`}
//           className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Volver al estado de cuenta
//         </Link>

//         <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
//           Generar factura manual
//         </h1>

//         <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
//           Cliente N° {cliente.numeroCliente} · {cliente.apellido}, {cliente.nombre}
//         </p>
//       </div>

//       <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
//         <GenerarFacturaManualForm clienteId={cliente.id} />
//       </div>
//     </section>
//   );
// }

// src/app/(dashboard)/clientes/[id]/factura/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ReceiptText,
  ShieldAlert,
  UserRound,
} from "lucide-react";
import { obtenerClientePorId } from "@/services/cliente.service";
import { PageShell } from "@/components/ui/PageShell";

type PageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Generar factura",
};

export default async function GenerarFacturaPage({ params }: PageProps) {
  const cliente = await obtenerClientePorId(params.id);

  if (!cliente) {
    notFound();
  }

  return (
    <PageShell maxWidth="lg" className="pb-20 sm:pb-0">
      <section className="mx-auto w-full max-w-3xl space-y-4">
        <div className="rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3.5 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
          <Link
            href={`/clientes/${cliente.id}/estado-cuenta`}
            className="inline-flex items-center gap-2 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al estado de cuenta
          </Link>

          <div className="mt-5 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
              <ReceiptText className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Facturación
              </p>

              <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Generar factura mensual
              </h1>

              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Cliente N° {cliente.numeroCliente} · {cliente.apellido},{" "}
                {cliente.nombre}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3.5 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
            <div className="flex gap-2">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

              <div>
                <p className="font-medium">Proceso centralizado</p>

                <p className="mt-1">
                  La generación de facturas mensuales se realiza desde el módulo
                  de configuración. El sistema genera facturas para clientes
                  activos y omite automáticamente los períodos que ya fueron
                  facturados.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
                <UserRound className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Cliente seleccionado
                </p>

                <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
                  {cliente.apellido}, {cliente.nombre}
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  Para generar la facturación mensual, ingresá al módulo general
                  de facturación.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Link
              href={`/clientes/${cliente.id}/estado-cuenta`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Estado de cuenta
            </Link>

            <Link
              href="/admin/configuracion/facturacion"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
            >
              Ir a facturación mensual
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
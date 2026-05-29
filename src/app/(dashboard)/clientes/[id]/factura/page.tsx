import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GenerarFacturaManualForm } from "@/components/forms/GenerarFacturaManualForm";
import { obtenerClientePorId } from "@/services/cliente.service";

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
    <section className="mx-auto w-full max-w-3xl space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
        <Link
          href={`/clientes/${cliente.id}/estado-cuenta`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al estado de cuenta
        </Link>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          Generar factura manual
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Cliente N° {cliente.numeroCliente} · {cliente.apellido}, {cliente.nombre}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
        <GenerarFacturaManualForm clienteId={cliente.id} />
      </div>
    </section>
  );
}
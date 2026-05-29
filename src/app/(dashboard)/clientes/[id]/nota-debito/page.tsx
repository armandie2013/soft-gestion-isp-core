import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { NotaFinancieraForm } from "@/components/forms/NotaFinancieraForm";
import { obtenerClientePorId } from "@/services/cliente.service";
import { obtenerFacturasCliente } from "@/services/movimiento-financiero.service";

type PageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Nota de débito",
};

export default async function NotaDebitoPage({ params }: PageProps) {
  const [cliente, facturas] = await Promise.all([
    obtenerClientePorId(params.id),
    obtenerFacturasCliente(params.id),
  ]);

  if (!cliente) {
    notFound();
  }

  return (
    <PageShell maxWidth="sm">
      <PageHeader
        eyebrow="Estado de cuenta"
        title="Crear nota de débito"
        description="La nota de débito debe asociarse a una factura emitida y suma saldo a esa factura."
        backHref={`/clientes/${cliente.id}/estado-cuenta`}
        backLabel="Volver al estado de cuenta"
      />

      <SectionCard
        title="Datos de la nota"
        description="Seleccioná una factura emitida para asociar el cargo adicional."
        icon={<Plus className="h-5 w-5" />}
      >
        <NotaFinancieraForm
          clienteId={cliente.id}
          tipo="debito"
          facturas={facturas}
        />
      </SectionCard>
    </PageShell>
  );
}
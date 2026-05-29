import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
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
  title: "Nota de crédito",
};

export default async function NotaCreditoPage({ params }: PageProps) {
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
        title="Crear nota de crédito"
        description="La nota de crédito debe asociarse a una factura emitida y descuenta el saldo de esa factura."
        backHref={`/clientes/${cliente.id}/estado-cuenta`}
        backLabel="Volver al estado de cuenta"
      />

      <SectionCard
        title="Datos de la nota"
        description="No puede superar el saldo actual de la factura seleccionada."
        icon={<FileText className="h-5 w-5" />}
      >
        <NotaFinancieraForm
          clienteId={cliente.id}
          tipo="credito"
          facturas={facturas}
        />
      </SectionCard>
    </PageShell>
  );
}
import { ReceiptText } from "lucide-react";
import { FacturacionManualForm } from "@/components/forms/FacturacionManualForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";

export const metadata = {
  title: "Facturación mensual",
};

export default function FacturacionPage() {
  return (
    <PageShell maxWidth="md">
      <PageHeader
        eyebrow="Configuración"
        title="Facturación mensual manual"
        description="Generá facturas mensuales para todos los clientes activos según el importe de su plan contratado."
        backHref="/admin/configuracion"
        backLabel="Volver a configuración"
      />

      <SectionCard
        title="Generar facturación"
        description="El sistema omitirá clientes que ya tengan factura emitida para el mes y año seleccionado."
        icon={<ReceiptText className="h-5 w-5" />}
      >
        <FacturacionManualForm />
      </SectionCard>
    </PageShell>
  );
}
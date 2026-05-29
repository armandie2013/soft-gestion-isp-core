import { ReceiptText, Settings } from "lucide-react";
import { AppButtonLink } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";

export const metadata = {
  title: "Configuración",
};

export default function ConfiguracionPage() {
  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow="Administración"
        title="Configuración"
        description="Accesos administrativos para procesos generales del sistema."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <SectionCard
          title="Facturación mensual"
          description="Generar manualmente facturas mensuales para todos los clientes activos."
          icon={<ReceiptText className="h-5 w-5" />}
        >
          <AppButtonLink href="/admin/configuracion/facturacion">
            <ReceiptText className="h-4 w-4" />
            Abrir facturación
          </AppButtonLink>
        </SectionCard>

        <SectionCard
          title="Próximamente"
          description="Desde acá agregaremos parámetros generales del ISP."
          icon={<Settings className="h-5 w-5" />}
          className="border-dashed"
        >
          <p className="text-sm text-[var(--app-muted)]">
            Pendiente de configuración general.
          </p>
        </SectionCard>
      </div>
    </PageShell>
  );
}
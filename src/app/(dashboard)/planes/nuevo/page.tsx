import { Wifi } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { PlanForm } from "@/components/forms/PlanForm";

export const metadata = {
  title: "Nuevo plan",
};

export default function NuevoPlanPage() {
  return (
    <PageShell maxWidth="md">
      <PageHeader
        eyebrow="Planes"
        title="Nuevo plan"
        description="Cargá un plan comercial para luego asignarlo a los clientes."
        backHref="/planes"
        backLabel="Volver a planes"
      />

      <SectionCard
        title="Datos del plan"
        description="Definí nombre, tipo, detalle, importe y estado."
        icon={<Wifi className="h-5 w-5" />}
      >
        <PlanForm />
      </SectionCard>
    </PageShell>
  );
}
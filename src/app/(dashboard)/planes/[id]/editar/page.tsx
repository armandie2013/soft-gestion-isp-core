import { notFound } from "next/navigation";
import { Wifi } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { EditarPlanForm } from "@/components/forms/EditarPlanForm";
import { obtenerPlanPorId } from "@/services/plan.service";

type EditarPlanPageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Editar plan",
};

function getEstadoBadgeVariant(estado: string) {
  if (estado === "activo") return "success";
  return "danger";
}

export default async function EditarPlanPage({ params }: EditarPlanPageProps) {
  const plan = await obtenerPlanPorId(params.id);

  if (!plan) {
    notFound();
  }

  return (
    <PageShell maxWidth="md">
      <PageHeader
        eyebrow="Planes"
        title="Editar plan"
        description="Modificá los datos comerciales del plan."
        backHref="/planes"
        backLabel="Volver a planes"
        actions={
          <div className="flex flex-wrap gap-2">
            <Badge>{plan.tipo}</Badge>
            <Badge variant={getEstadoBadgeVariant(plan.estado) as any}>
              {plan.estado}
            </Badge>
          </div>
        }
      />

      <SectionCard
        title="Datos del plan"
        description="Los cambios impactarán en nuevas facturaciones futuras."
        icon={<Wifi className="h-5 w-5" />}
      >
        <EditarPlanForm plan={plan} />
      </SectionCard>
    </PageShell>
  );
}
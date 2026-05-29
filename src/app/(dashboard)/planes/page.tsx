import { Plus, Wifi } from "lucide-react";
import { AppButtonLink } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { PlanesTable } from "@/components/tables/PlanesTable";
import { obtenerPlanes } from "@/services/plan.service";

export const metadata = {
  title: "Planes",
};

export default async function PlanesPage() {
  const planes = await obtenerPlanes();

  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow="Administración"
        title="Planes"
        description="Gestioná los planes comerciales del ISP. Cada cliente tendrá un plan contratado con su importe mensual en pesos."
        actions={
          <AppButtonLink href="/planes/nuevo">
            <Plus className="h-4 w-4" />
            Nuevo plan
          </AppButtonLink>
        }
      />

      <SectionCard
        title="Listado de planes"
        description="Planes disponibles para asignar a clientes."
        icon={<Wifi className="h-5 w-5" />}
      >
        <PlanesTable planes={planes} />
      </SectionCard>
    </PageShell>
  );
}
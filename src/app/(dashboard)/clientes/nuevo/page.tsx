import { UserRound } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { ClienteForm } from "@/components/forms/ClienteForm";
import { obtenerPlanesActivos } from "@/services/plan.service";

export const metadata = {
  title: "Nuevo cliente",
};

export default async function NuevoClientePage() {
  const planes = await obtenerPlanesActivos();

  return (
    <PageShell maxWidth="md">
      <PageHeader
        eyebrow="Clientes"
        title="Nuevo cliente"
        description="El número de cliente se genera automáticamente al guardar."
        backHref="/clientes"
        backLabel="Volver a clientes"
      />

      <SectionCard
        title="Datos del cliente"
        description="Cargá datos personales, domicilio, estado y plan contratado."
        icon={<UserRound className="h-5 w-5" />}
      >
        <ClienteForm planes={planes} />
      </SectionCard>
    </PageShell>
  );
}
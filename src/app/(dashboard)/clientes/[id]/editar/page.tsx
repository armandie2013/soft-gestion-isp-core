import { notFound } from "next/navigation";
import { UserRound } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { EditarClienteForm } from "@/components/forms/EditarClienteForm";
import { obtenerClientePorId } from "@/services/cliente.service";
import { obtenerPlanesActivos } from "@/services/plan.service";

type EditarClientePageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Editar cliente",
};

function getEstadoBadgeVariant(estado: string) {
  if (estado === "activo") return "success";
  if (estado === "suspendido") return "warning";
  return "danger";
}

export default async function EditarClientePage({
  params,
}: EditarClientePageProps) {
  const [cliente, planes] = await Promise.all([
    obtenerClientePorId(params.id),
    obtenerPlanesActivos(),
  ]);

  if (!cliente) {
    notFound();
  }

  return (
    <PageShell maxWidth="md">
      <PageHeader
        eyebrow={`Cliente N° ${cliente.numeroCliente}`}
        title="Editar cliente"
        description="Modificá datos personales, domicilio, estado y plan contratado."
        backHref="/clientes"
        backLabel="Volver a clientes"
        actions={
          <Badge variant={getEstadoBadgeVariant(cliente.estado) as any}>
            {cliente.estado}
          </Badge>
        }
      />

      <SectionCard
        title="Datos del cliente"
        description="El número de cliente no es editable."
        icon={<UserRound className="h-5 w-5" />}
      >
        <EditarClienteForm cliente={cliente} planes={planes} />
      </SectionCard>
    </PageShell>
  );
}
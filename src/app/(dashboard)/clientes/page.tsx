import { Plus, UserRound } from "lucide-react";
import { AppButtonLink } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { ClientesTable } from "@/components/tables/ClientesTable";
import { obtenerClientes } from "@/services/cliente.service";

export const metadata = {
  title: "Clientes",
};

export default async function ClientesPage() {
  const clientes = await obtenerClientes();

  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow="Administración"
        title="Clientes"
        description="Gestioná los clientes del ISP. Cada cliente tendrá un número automático, datos personales, estado y un plan contratado."
        actions={
          <AppButtonLink href="/clientes/nuevo">
            <Plus className="h-4 w-4" />
            Nuevo cliente
          </AppButtonLink>
        }
      />

      <SectionCard
        title="Listado de clientes"
        description="Visualizá clientes, planes contratados, estado actual y acciones principales."
        icon={<UserRound className="h-5 w-5" />}
      >
        <ClientesTable clientes={clientes} />
      </SectionCard>
    </PageShell>
  );
}
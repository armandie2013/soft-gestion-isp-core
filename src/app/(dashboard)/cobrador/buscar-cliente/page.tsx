import { redirect } from "next/navigation";
import { Search, UserRound } from "lucide-react";
import { BuscarClienteDniForm } from "@/components/forms/BuscarClienteDniForm";
import { AppButtonLink } from "@/components/ui/AppButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { buscarClientePorDniParaCobrador } from "@/services/cobrador.service";

type BuscarClientePageProps = {
  searchParams?: {
    dni?: string;
  };
};

export const metadata = {
  title: "Buscar cliente",
};

export default async function BuscarClientePage({
  searchParams,
}: BuscarClientePageProps) {
  const dni = searchParams?.dni?.replace(/\D/g, "").trim() || "";

  if (dni.length >= 7) {
    const cliente = await buscarClientePorDniParaCobrador(dni);

    if (cliente) {
      redirect(`/cobrador/clientes/${cliente.id}`);
    }
  }

  return (
    <PageShell maxWidth="sm">
      <PageHeader
        eyebrow="Cobrador"
        title="Buscar cliente"
        description="Ingresá el DNI del cliente para consultar su ficha y estado de cuenta."
        backHref="/cobrador"
        backLabel="Volver al panel"
      />

      <SectionCard
        title="Buscar por DNI"
        description="Por seguridad operativa, el cobrador solo puede consultar clientes por DNI."
        icon={<Search className="h-5 w-5" />}
      >
        <BuscarClienteDniForm />
      </SectionCard>

      {dni.length >= 7 ? (
        <EmptyState
          title="No se encontró un cliente con ese DNI."
          description="Verificá que el número esté bien escrito o consultá al administrador."
          action={
            <AppButtonLink href="/cobrador/buscar-cliente" variant="secondary">
              <UserRound className="h-4 w-4" />
              Nueva búsqueda
            </AppButtonLink>
          }
        />
      ) : null}
    </PageShell>
  );
}
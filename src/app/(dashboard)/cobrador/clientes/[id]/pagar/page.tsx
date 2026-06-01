import { notFound } from "next/navigation";
import { CreditCard } from "lucide-react";
import { CobroForm } from "@/components/forms/CobroForm";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";

type RegistrarPagoPageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Registrar pago",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function RegistrarPagoPage({
  params,
}: RegistrarPagoPageProps) {
  const resumen = await obtenerResumenClienteParaCobrador(params.id);

  if (!resumen) {
    notFound();
  }

  const { cliente, periodosPendientes, totalPendiente } = resumen;

  return (
    <PageShell maxWidth="md">
      <PageHeader
        eyebrow={`Cliente N° ${cliente.numeroCliente}`}
        title="Registrar pago"
        description={`${cliente.apellido}, ${cliente.nombre} · DNI ${cliente.dni}`}
        backHref={`/cobrador/clientes/${cliente.id}`}
        backLabel="Volver al cliente"
      >
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant={totalPendiente > 0 ? "danger" : "success"}>
            Pendiente {formatMoney(totalPendiente)}
          </Badge>

          {cliente.plan ? (
            <Badge variant="info">{cliente.plan.nombre}</Badge>
          ) : (
            <Badge variant="warning">Sin plan</Badge>
          )}
        </div>
      </PageHeader>

      <SectionCard
        title="Datos del pago"
        description="Seleccioná el período y registrá el importe cobrado."
        icon={<CreditCard className="h-5 w-5" />}
      >
        <CobroForm
          clienteId={cliente.id}
          periodosPendientes={periodosPendientes}
        />
      </SectionCard>
    </PageShell>
  );
}
import { notFound } from "next/navigation";
import { FileText, Pencil, UserRound, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AppButtonLink } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { obtenerClientePorId } from "@/services/cliente.service";

type VerClientePageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Ver cliente",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function getEstadoBadgeVariant(estado: string) {
  if (estado === "activo") return "success";
  if (estado === "suspendido") return "warning";
  return "danger";
}

function DataRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--app-border)] py-2 last:border-b-0">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-[var(--app-text-strong)]">
        {value || "-"}
      </span>
    </div>
  );
}

export default async function VerClientePage({ params }: VerClientePageProps) {
  const cliente = await obtenerClientePorId(params.id);

  if (!cliente) {
    notFound();
  }

  return (
    <PageShell maxWidth="md">
      <PageHeader
        eyebrow={`Cliente N° ${cliente.numeroCliente}`}
        title={`${cliente.apellido}, ${cliente.nombre}`}
        description={`DNI ${cliente.dni}`}
        backHref="/clientes"
        backLabel="Volver a clientes"
        actions={
          <>
            <AppButtonLink
              href={`/clientes/${cliente.id}/estado-cuenta`}
              variant="secondary"
            >
              <FileText className="h-4 w-4" />
              Estado de cuenta
            </AppButtonLink>

            <AppButtonLink href={`/clientes/${cliente.id}/editar`}>
              <Pencil className="h-4 w-4" />
              Editar
            </AppButtonLink>
          </>
        }
      >
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant={getEstadoBadgeVariant(cliente.estado) as any}>
            {cliente.estado}
          </Badge>

          {cliente.plan ? (
            <Badge variant="info">{cliente.plan.nombre}</Badge>
          ) : (
            <Badge variant="warning">Sin plan</Badge>
          )}
        </div>
      </PageHeader>

      <SectionCard
        title="Ficha del cliente"
        description="Resumen general del cliente y servicio contratado."
        icon={<UserRound className="h-5 w-5" />}
        className="pb-4"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2">
            <DataRow label="Teléfono" value={cliente.telefono} />
            <DataRow label="Email" value={cliente.email || "-"} />
            <DataRow label="Dirección" value={cliente.direccion} />
            <DataRow label="Localidad" value={cliente.localidad} />
            <DataRow label="Provincia" value={cliente.provincia} />
          </div>

          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2">
            <DataRow
              label="Plan"
              value={cliente.plan?.nombre || "Sin plan asignado"}
            />
            <DataRow label="Tipo" value={cliente.plan?.tipo || "-"} />
            <DataRow
              label="Importe"
              value={
                cliente.plan ? formatMoney(cliente.plan.importe) : "-"
              }
            />
            <DataRow label="Estado" value={cliente.estado} />
            <DataRow
              label="Detalle"
              value={cliente.plan?.detalle || "-"}
            />
          </div>
        </div>
      </SectionCard>

      <div className="sticky bottom-3 z-10 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-3 shadow-[var(--app-shadow)] backdrop-blur sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <AppButtonLink
            href={`/clientes/${cliente.id}/estado-cuenta`}
            variant="secondary"
            className="w-full"
          >
            <FileText className="h-4 w-4" />
            Cuenta
          </AppButtonLink>

          <AppButtonLink
            href={`/clientes/${cliente.id}/editar`}
            className="w-full"
          >
            <Pencil className="h-4 w-4" />
            Editar
          </AppButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
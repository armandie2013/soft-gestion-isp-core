import { notFound } from "next/navigation";
import { FileText, Plus } from "lucide-react";
import { EstadoCuentaTable } from "@/components/tables/EstadoCuentaTable";
import { AppButtonLink } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { obtenerClientePorId } from "@/services/cliente.service";
import { obtenerEstadoCuentaCliente } from "@/services/movimiento-financiero.service";

type EstadoCuentaPageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Estado de cuenta",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function AccountSummary({
  saldo,
  cantidadPeriodos,
}: {
  saldo: number;
  cantidadPeriodos: number;
}) {
  const tieneDeuda = saldo > 0;

  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] shadow-[var(--app-shadow-soft)]">
      <div className="bg-[var(--app-primary-soft)] px-4 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--app-primary)]">
          Estado de cuenta
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-3xl font-semibold tracking-tight text-[var(--app-text-strong)] sm:text-4xl">
              {formatMoney(saldo)}
            </p>

            <p className="mt-1 text-sm text-[var(--app-muted)]">
              {tieneDeuda
                ? "Saldo total pendiente de todos los períodos."
                : "El cliente no registra saldo pendiente."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant={tieneDeuda ? "danger" : "success"}>
              {tieneDeuda ? "Con saldo pendiente" : "Sin saldo pendiente"}
            </Badge>

            <Badge variant="info">
              {cantidadPeriodos} {cantidadPeriodos === 1 ? "período" : "períodos"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function EstadoCuentaPage({
  params,
}: EstadoCuentaPageProps) {
  const [cliente, estadoCuenta] = await Promise.all([
    obtenerClientePorId(params.id),
    obtenerEstadoCuentaCliente(params.id),
  ]);

  if (!cliente || !estadoCuenta) {
    notFound();
  }

  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow={`Cliente N° ${cliente.numeroCliente}`}
        title="Estado de cuenta"
        description={`${cliente.apellido}, ${cliente.nombre} · DNI ${cliente.dni}`}
        backHref={`/clientes/${cliente.id}`}
        backLabel="Volver al cliente"
        actions={
          <>
            <AppButtonLink
              href={`/clientes/${cliente.id}/nota-debito`}
              variant="warning"
            >
              <Plus className="h-4 w-4" />
              Nota débito
            </AppButtonLink>

            <AppButtonLink
              href={`/clientes/${cliente.id}/nota-credito`}
              variant="success"
            >
              <FileText className="h-4 w-4" />
              Nota crédito
            </AppButtonLink>
          </>
        }
      >
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {cliente.plan ? (
            <Badge variant="info">{cliente.plan.nombre}</Badge>
          ) : (
            <Badge variant="warning">Sin plan</Badge>
          )}
        </div>
      </PageHeader>

      <AccountSummary
        saldo={estadoCuenta.saldo}
        cantidadPeriodos={estadoCuenta.periodos.length}
      />

      <SectionCard
        title="Períodos facturados"
        description="Resumen por período. Entrá al detalle para ver factura, notas asociadas y futuros pagos aplicados."
        icon={<FileText className="h-5 w-5" />}
      >
        <EstadoCuentaTable
          clienteId={cliente.id}
          periodos={estadoCuenta.periodos}
        />
      </SectionCard>
    </PageShell>
  );
}
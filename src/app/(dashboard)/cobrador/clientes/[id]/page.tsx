import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CreditCard,
  Eye,
  FileText,
  Search,
  UserRound,
  Wifi,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AppButtonLink } from "@/components/ui/AppButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { obtenerResumenClienteParaCobrador } from "@/services/cobrador.service";

type CobradorClientePageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Cliente",
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

function getPeriodoBadge(estadoPeriodo: string) {
  if (estadoPeriodo === "cancelado") {
    return {
      label: "Cancelado",
      variant: "success",
    };
  }

  if (estadoPeriodo === "a_favor") {
    return {
      label: "A favor",
      variant: "info",
    };
  }

  return {
    label: "Pendiente",
    variant: "danger",
  };
}

function DataLine({
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

export default async function CobradorClientePage({
  params,
}: CobradorClientePageProps) {
  const resumen = await obtenerResumenClienteParaCobrador(params.id);

  if (!resumen) {
    notFound();
  }

  const { cliente, estadoCuenta, periodosPendientes, totalPendiente } = resumen;

  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow={`Cliente N° ${cliente.numeroCliente}`}
        title={`${cliente.apellido}, ${cliente.nombre}`}
        description={`DNI ${cliente.dni}`}
        backHref="/cobrador/buscar-cliente"
        backLabel="Buscar otro cliente"
        actions={
          <AppButtonLink href="/cobrador/buscar-cliente" variant="secondary">
            <Search className="h-4 w-4" />
            Nueva búsqueda
          </AppButtonLink>
        }
      >
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant={getEstadoBadgeVariant(cliente.estado) as any}>
            {cliente.estado}
          </Badge>

          {cliente.plan ? (
            <Badge variant="info">{cliente.plan.nombre}</Badge>
          ) : (
            <Badge variant="warning">Sin plan</Badge>
          )}

          <Badge variant={totalPendiente > 0 ? "danger" : "success"}>
            {totalPendiente > 0
              ? `Pendiente ${formatMoney(totalPendiente)}`
              : "Sin deuda"}
          </Badge>
        </div>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Ficha del cliente"
          description="Información útil para confirmar identidad y servicio."
          icon={<UserRound className="h-5 w-5" />}
        >
          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2">
            <DataLine label="Teléfono" value={cliente.telefono} />
            <DataLine label="Dirección" value={cliente.direccion} />
            <DataLine label="Localidad" value={cliente.localidad} />
            <DataLine label="Provincia" value={cliente.provincia} />
          </div>

          <div className="mt-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2">
            <DataLine
              label="Plan"
              value={cliente.plan?.nombre || "Sin plan asignado"}
            />
            <DataLine label="Tipo" value={cliente.plan?.tipo || "-"} />
            <DataLine
              label="Importe"
              value={cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Resumen de deuda"
          description="Períodos pendientes disponibles para cobro."
          icon={<FileText className="h-5 w-5" />}
        >
          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-primary-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--app-primary)]">
              Total pendiente
            </p>

            <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--app-text-strong)]">
              {formatMoney(totalPendiente)}
            </p>

            <p className="mt-1 text-sm text-[var(--app-muted)]">
              Calculado sobre períodos facturados con saldo mayor a cero.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <AppButtonLink
              href={`/cobrador/clientes/${cliente.id}/pagar`}
              className="w-full sm:w-auto"
            >
              <CreditCard className="h-4 w-4" />
              Registrar pago
            </AppButtonLink>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Períodos del cliente"
        description="Vista resumida por período. Más adelante el cobrador podrá aplicar pagos a uno o varios períodos."
        icon={<Wifi className="h-5 w-5" />}
      >
        {estadoCuenta.periodos.length === 0 ? (
          <EmptyState
            title="Este cliente todavía no tiene períodos facturados."
            description="No hay deuda para consultar o cobrar."
          />
        ) : (
          <div className="grid gap-2">
            {estadoCuenta.periodos.map((periodo) => {
              const badge = getPeriodoBadge(periodo.estadoPeriodo);

              return (
                <div
                  key={periodo.facturaId}
                  className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-[var(--app-text-strong)]">
                          {periodo.periodoLabel}
                        </p>

                        <Badge variant={badge.variant as any}>
                          {badge.label}
                        </Badge>
                      </div>

                      <p className="mt-1 text-xs text-[var(--app-muted)]">
                        Factura N° {periodo.numeroComprobante} · Original{" "}
                        {formatMoney(periodo.importeOriginal)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:min-w-72">
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                          Saldo
                        </p>
                        <p className="text-sm font-semibold text-[var(--app-text-strong)]">
                          {formatMoney(periodo.saldoPeriodo)}
                        </p>
                      </div>

                      <Link
                        href={`/clientes/${cliente.id}/estado-cuenta/${periodo.facturaId}`}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] px-3 text-xs font-semibold text-[var(--app-text)] transition hover:bg-[var(--app-primary-soft)] active:scale-[0.99]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </PageShell>
  );
}
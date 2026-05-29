import { notFound } from "next/navigation";
import { ArrowDownLeft, ArrowUpRight, FileText, Plus } from "lucide-react";
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
  totalDebe,
  totalHaber,
}: {
  saldo: number;
  totalDebe: number;
  totalHaber: number;
}) {
  const tieneDeuda = saldo > 0;

  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] shadow-[var(--app-shadow-soft)]">
      <div className="bg-[var(--app-primary-soft)] px-4 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--app-primary)]">
          Saldo actual
        </p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-3xl font-semibold tracking-tight text-[var(--app-text-strong)] sm:text-4xl">
              {formatMoney(saldo)}
            </p>

            <p className="mt-1 text-sm text-[var(--app-muted)]">
              {tieneDeuda
                ? "Importe pendiente de regularización."
                : "El cliente no registra deuda pendiente."}
            </p>
          </div>

          <Badge variant={tieneDeuda ? "danger" : "success"}>
            {tieneDeuda ? "Con deuda" : "Sin deuda"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-[var(--app-border)] border-t border-[var(--app-border)]">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-danger-soft)] text-[var(--app-danger)]">
              <ArrowUpRight className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                Cargos
              </p>
              <p className="text-sm font-semibold text-[var(--app-text-strong)]">
                {formatMoney(totalDebe)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-success-soft)] text-[var(--app-success)]">
              <ArrowDownLeft className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                Créditos
              </p>
              <p className="text-sm font-semibold text-[var(--app-text-strong)]">
                {formatMoney(totalHaber)}
              </p>
            </div>
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
        totalDebe={estadoCuenta.totalDebe}
        totalHaber={estadoCuenta.totalHaber}
      />

      <SectionCard
        title="Movimientos"
        description="Extracto de facturas, notas de crédito, notas de débito y futuros pagos."
        icon={<FileText className="h-5 w-5" />}
      >
        <EstadoCuentaTable movimientos={estadoCuenta.movimientos} />
      </SectionCard>
    </PageShell>
  );
}
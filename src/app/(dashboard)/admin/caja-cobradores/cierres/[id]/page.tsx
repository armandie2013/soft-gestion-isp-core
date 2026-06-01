import { notFound } from "next/navigation";
import { Clock3, WalletCards } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { obtenerDetalleCierreCajaAdmin } from "@/services/admin-caja.service";

type AdminDetalleCierrePageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Detalle cierre",
};

function formatDate(value: string | null) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function DataLine({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--app-border)] py-2 last:border-b-0">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-[var(--app-text-strong)]">
        {value}
      </span>
    </div>
  );
}

export default async function AdminDetalleCierrePage({
  params,
}: AdminDetalleCierrePageProps) {
  const detalle = await obtenerDetalleCierreCajaAdmin(params.id);

  if (!detalle) {
    notFound();
  }

  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow={`Código ${detalle.cierre.codigo}`}
        title="Detalle del cierre"
        description={`${detalle.cierre.cobradorNombre} · ${formatMoney(
          detalle.cierre.importe,
        )}`}
        backHref="/admin/caja-cobradores/cierres"
        backLabel="Volver a cierres"
      >
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="success">Cierre confirmado</Badge>
          <Badge variant="info">{formatMoney(detalle.cierre.importe)}</Badge>
        </div>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Datos del cierre"
          description="Información principal del cierre confirmado."
          icon={<WalletCards className="h-5 w-5" />}
        >
          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2">
            <DataLine label="Cobrador" value={detalle.cierre.cobradorNombre} />
            <DataLine label="Importe cerrado" value={formatMoney(detalle.cierre.importe)} />
            <DataLine label="Fecha cierre" value={formatDate(detalle.cierre.creadoEn)} />
            <DataLine label="Descripción" value={detalle.cierre.descripcion} />
          </div>
        </SectionCard>

        <SectionCard
          title="Código utilizado"
          description="Datos del código de autorización usado para cerrar caja."
          icon={<Clock3 className="h-5 w-5" />}
        >
          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2">
            <DataLine label="Código" value={detalle.cierre.codigo} />
            <DataLine label="Estado" value={detalle.cierre.codigoEstado} />
            <DataLine label="Generado por" value={detalle.cierre.generadoPorAdminNombre} />
            <DataLine label="Generado" value={formatDate(detalle.cierre.codigoCreadoEn)} />
            <DataLine label="Usado" value={formatDate(detalle.cierre.codigoUsadoEn)} />
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Cobros incluidos"
        description="Cobros registrados por el cobrador desde el cierre anterior hasta este cierre."
        icon={<WalletCards className="h-5 w-5" />}
      >
        <div className="mb-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-primary-soft)] p-4 text-[var(--app-primary)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
            Total de cobros incluidos
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {formatMoney(detalle.totalCobrosIncluidos)}
          </p>

          <p className="mt-1 text-sm leading-6 opacity-85">
            {detalle.cierreAnteriorFecha
              ? `Desde el cierre anterior del ${formatDate(
                  detalle.cierreAnteriorFecha,
                )}.`
              : "Primer cierre registrado para este cobrador."}
          </p>
        </div>

        {detalle.cobrosIncluidos.length === 0 ? (
          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-4">
            <p className="text-sm font-semibold text-[var(--app-text-strong)]">
              No se encontraron cobros asociados a este cierre.
            </p>
          </div>
        ) : (
          <div className="grid gap-2">
            {detalle.cobrosIncluidos.map((cobro) => (
              <div
                key={cobro.id}
                className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-sm"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                      {formatDate(cobro.creadoEn)}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
                      {cobro.descripcion}
                    </p>

                    {cobro.observacion ? (
                      <p className="mt-1 text-xs text-[var(--app-muted)]">
                        {cobro.observacion}
                      </p>
                    ) : null}
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                      Importe
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[var(--app-success)]">
                      {formatMoney(cobro.importe)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </PageShell>
  );
}
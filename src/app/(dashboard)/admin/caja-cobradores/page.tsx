import { KeyRound, WalletCards } from "lucide-react";
import { AdminCobradoresCajaTable } from "@/components/tables/AdminCobradoresCajaTable";
import { AppButtonLink } from "@/components/ui/AppButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { obtenerAdminCajaCobradoresResumen } from "@/services/cobro.service";

export const metadata = {
  title: "Caja cobradores",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function AdminCajaResumenCard({
  title,
  value,
  description,
  variant,
}: {
  title: string;
  value: string;
  description: string;
  variant: "primary" | "success" | "warning" | "danger";
}) {
  const variantClass = {
    primary:
      "border-[var(--app-border)] bg-[var(--app-primary-soft)] text-[var(--app-primary)]",
    success:
      "border-emerald-200 bg-[var(--app-success-soft)] text-[var(--app-success)] dark:border-emerald-900/70",
    warning:
      "border-amber-200 bg-[var(--app-warning-soft)] text-[var(--app-warning)] dark:border-amber-900/70",
    danger:
      "border-red-200 bg-[var(--app-danger-soft)] text-[var(--app-danger)] dark:border-red-900/70",
  };

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${variantClass[variant]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
        {title}
      </p>

      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-sm leading-6 opacity-85">{description}</p>
    </div>
  );
}

export default async function AdminCajaCobradoresPage() {
  const resumen = await obtenerAdminCajaCobradoresResumen();

  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow="Administración"
        title="Caja de cobradores"
        description="Visualizá el saldo de cada cobrador, lo recibido por cierres y generá códigos de cierre por el importe exacto de caja."
        backHref="/admin"
        backLabel="Volver al panel"
        actions={
          <AppButtonLink
            href="/admin/caja-cobradores/cierres"
            variant="secondary"
          >
            <WalletCards className="h-4 w-4" />
            Ver cierres realizados
          </AppButtonLink>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <AdminCajaResumenCard
          title="En caja cobradores"
          value={formatMoney(resumen.totalSaldoCobradores)}
          description="Importe total que todavía tienen los cobradores pendiente de cierre."
          variant={resumen.totalSaldoCobradores > 0 ? "danger" : "success"}
        />

        <AdminCajaResumenCard
          title="Recibido por admin"
          value={formatMoney(resumen.totalRecibidoAdmin)}
          description="Total acumulado por cierres de caja confirmados."
          variant="primary"
        />

        <AdminCajaResumenCard
          title="Cobradores con saldo"
          value={String(resumen.cantidadCobradoresConSaldo)}
          description={`De ${resumen.cantidadCobradores} cobradores registrados.`}
          variant={resumen.cantidadCobradoresConSaldo > 0 ? "warning" : "success"}
        />

        <AdminCajaResumenCard
          title="Códigos pendientes"
          value={String(resumen.cantidadCodigosPendientes)}
          description="Códigos generados que todavía no fueron usados."
          variant={resumen.cantidadCodigosPendientes > 0 ? "warning" : "success"}
        />
      </div>

      <SectionCard
        title="Códigos de cierre"
        description="Cada código tiene 6 dígitos, vence en 30 minutos y solo sirve para el cobrador e importe exacto indicado."
        icon={<KeyRound className="h-5 w-5" />}
      >
        <AdminCobradoresCajaTable cobradores={resumen.cobradores} />
      </SectionCard>

      <SectionCard
        title="Regla operativa"
        description="El cobrador no puede cerrar caja sin un código generado previamente por el administrador."
        icon={<WalletCards className="h-5 w-5" />}
        className="border-dashed"
      >
        <p className="text-sm leading-6 text-[var(--app-muted)]">
          Cuando el cobrador confirma un cierre, su caja queda en $0 y ese
          importe pasa a formar parte del total recibido por administración.
          Si el cobrador registra nuevos pagos después de generado el código,
          el importe de su caja cambia y el código deja de ser válido.
        </p>
      </SectionCard>
    </PageShell>
  );
}
import { redirect } from "next/navigation";
import { Clock3, KeyRound, WalletCards } from "lucide-react";
import { CajaCobradorTable } from "@/components/tables/CajaCobradorTable";
import { AppButtonLink } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerCajaCobradorResumen } from "@/services/cobro.service";

export const metadata = {
  title: "Mi caja",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function CajaResumenCard({
  title,
  value,
  description,
  variant,
}: {
  title: string;
  value: string;
  description: string;
  variant: "primary" | "success" | "warning";
}) {
  const variantClass = {
    primary:
      "border-[var(--app-border)] bg-[var(--app-primary-soft)] text-[var(--app-primary)]",
    success:
      "border-emerald-200 bg-[var(--app-success-soft)] text-[var(--app-success)] dark:border-emerald-900/70",
    warning:
      "border-amber-200 bg-[var(--app-warning-soft)] text-[var(--app-warning)] dark:border-amber-900/70",
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

export default async function CajaCobradorPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const caja = await obtenerCajaCobradorResumen(user.userId);

  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow="Cobrador"
        title="Mi caja"
        description="Historial de cobros realizados y saldo actual pendiente de cierre."
        backHref="/cobrador"
        backLabel="Volver al panel"
        actions={
          <AppButtonLink
            href="/cobrador/caja/cierre"
            variant={caja.saldoActual > 0 ? "warning" : "secondary"}
          >
            <KeyRound className="h-4 w-4" />
            Cerrar caja
          </AppButtonLink>
        }
      >
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant={caja.saldoActual > 0 ? "danger" : "success"}>
            {caja.saldoActual > 0 ? "Caja con saldo" : "Caja en cero"}
          </Badge>

          <Badge variant="info">{user.nombre}</Badge>
        </div>
      </PageHeader>

      <div className="grid gap-3 md:grid-cols-3">
        <CajaResumenCard
          title="Saldo actual"
          value={formatMoney(caja.saldoActual)}
          description="Importe que actualmente figura en tu caja."
          variant="primary"
        />

        <CajaResumenCard
          title="Total cobrado"
          value={formatMoney(caja.totalCobrado)}
          description="Suma histórica de cobros registrados."
          variant="success"
        />

        <CajaResumenCard
          title="Total cerrado"
          value={formatMoney(caja.totalCierres)}
          description="Importes ya cerrados y entregados."
          variant="warning"
        />
      </div>

      <SectionCard
        title="Movimientos de caja"
        description="Cada pago registrado genera un movimiento de caja. Los cierres descuentan el saldo."
        icon={<Clock3 className="h-5 w-5" />}
      >
        <CajaCobradorTable movimientos={caja.movimientos} />
      </SectionCard>

      <SectionCard
        title="Cierre con código"
        description="El cierre requiere un código de 6 dígitos generado por el administrador para el importe exacto de tu caja."
        icon={<WalletCards className="h-5 w-5" />}
        className="border-dashed"
      >
        <p className="text-sm leading-6 text-[var(--app-muted)]">
          El código solo puede usarse una vez. Si registrás nuevos cobros después
          de que el admin genere el código, deberás pedir uno nuevo porque el
          importe de tu caja habrá cambiado.
        </p>
      </SectionCard>
    </PageShell>
  );
}
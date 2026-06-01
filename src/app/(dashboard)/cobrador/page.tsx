import { redirect } from "next/navigation";
import { CreditCard, Search, WalletCards } from "lucide-react";
import { AppButtonLink } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerCajaCobradorResumen } from "@/services/cobro.service";

export const metadata = {
  title: "Panel cobrador",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function CobradorPage() {
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
        title="Panel cobrador"
        description="Desde este panel podés buscar clientes por DNI, consultar su estado de cuenta y registrar pagos."
      >
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant={caja.saldoActual > 0 ? "danger" : "success"}>
            Caja actual: {formatMoney(caja.saldoActual)}
          </Badge>
        </div>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="Buscar cliente"
          description="Buscá un cliente exclusivamente por DNI para ver su ficha y sus períodos pendientes."
          icon={<Search className="h-5 w-5" />}
        >
          <AppButtonLink href="/cobrador/buscar-cliente">
            <Search className="h-4 w-4" />
            Buscar por DNI
          </AppButtonLink>
        </SectionCard>

        <SectionCard
          title="Mi caja"
          description="Consultá tus cobros realizados, saldo actual y próximos cierres de caja."
          icon={<WalletCards className="h-5 w-5" />}
        >
          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-primary-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--app-primary)]">
              Saldo actual
            </p>

            <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--app-text-strong)]">
              {formatMoney(caja.saldoActual)}
            </p>

            <p className="mt-1 text-sm text-[var(--app-muted)]">
              Importe pendiente de cierre.
            </p>
          </div>

          <div className="mt-4">
            <AppButtonLink href="/cobrador/caja" variant="secondary">
              <WalletCards className="h-4 w-4" />
              Ver mi caja
            </AppButtonLink>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Flujo de cobro"
        description="Primero se busca el cliente, luego se revisan sus períodos pendientes y finalmente se registra el pago."
        icon={<CreditCard className="h-5 w-5" />}
      >
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-primary)]">
              Paso 1
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--app-text-strong)]">
              Buscar por DNI
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--app-muted)]">
              El cobrador no lista todos los clientes, solo busca por DNI.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-primary)]">
              Paso 2
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--app-text-strong)]">
              Ver estado de cuenta
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--app-muted)]">
              Se muestran los períodos facturados y saldos pendientes.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-primary)]">
              Paso 3
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--app-text-strong)]">
              Registrar pago
            </p>
            <p className="mt-1 text-sm leading-6 text-[var(--app-muted)]">
              El pago impacta en el cliente y suma saldo a tu caja.
            </p>
          </div>
        </div>
      </SectionCard>
    </PageShell>
  );
}
import { redirect } from "next/navigation";
import { KeyRound } from "lucide-react";
import { CierreCajaCobradorForm } from "@/components/forms/CierreCajaCobradorForm";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerCajaCobradorResumen } from "@/services/cobro.service";

export const metadata = {
  title: "Cerrar caja",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function CierreCajaCobradorPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const caja = await obtenerCajaCobradorResumen(user.userId);

  return (
    <PageShell maxWidth="sm">
      <PageHeader
        eyebrow="Cobrador"
        title="Cerrar caja"
        description="Ingresá el código de 6 dígitos generado por el administrador."
        backHref="/cobrador/caja"
        backLabel="Volver a mi caja"
      >
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant={caja.saldoActual > 0 ? "danger" : "success"}>
            Caja actual: {formatMoney(caja.saldoActual)}
          </Badge>
        </div>
      </PageHeader>

      <SectionCard
        title="Validar código"
        description="El código debe coincidir con tu usuario y con el importe actual de tu caja."
        icon={<KeyRound className="h-5 w-5" />}
      >
        {caja.saldoActual > 0 ? (
          <CierreCajaCobradorForm />
        ) : (
          <div className="rounded-2xl border border-emerald-200 bg-[var(--app-success-soft)] p-4 text-[var(--app-success)] dark:border-emerald-900/70">
            <p className="text-sm font-semibold">Tu caja ya está en $0.</p>
            <p className="mt-1 text-sm leading-6 opacity-90">
              No hay saldo pendiente para cerrar.
            </p>
          </div>
        )}
      </SectionCard>
    </PageShell>
  );
}
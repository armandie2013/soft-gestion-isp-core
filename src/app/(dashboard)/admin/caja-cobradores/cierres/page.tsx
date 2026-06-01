import { WalletCards } from "lucide-react";
import { AdminCierresCajaTable } from "@/components/tables/AdminCierresCajaTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageShell } from "@/components/ui/PageShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { obtenerHistorialCierresCajaAdmin } from "@/services/admin-caja.service";

export const metadata = {
  title: "Historial de cierres",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function ResumenCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-primary-soft)] p-4 text-[var(--app-primary)] shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
        {title}
      </p>

      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-sm leading-6 opacity-85">{description}</p>
    </div>
  );
}

export default async function AdminCierresCajaPage() {
  const resumen = await obtenerHistorialCierresCajaAdmin();

  return (
    <PageShell maxWidth="lg">
      <PageHeader
        eyebrow="Administración"
        title="Historial de cierres"
        description="Consultá los cierres de caja confirmados por los cobradores."
        backHref="/admin/caja-cobradores"
        backLabel="Volver a caja cobradores"
      />

      <div className="grid gap-3 md:grid-cols-2">
        <ResumenCard
          title="Total recibido"
          value={formatMoney(resumen.totalCierres)}
          description="Suma acumulada de cierres confirmados."
        />

        <ResumenCard
          title="Cierres realizados"
          value={String(resumen.cantidadCierres)}
          description="Cantidad total de cierres registrados."
        />
      </div>

      <SectionCard
        title="Cierres registrados"
        description="Cada cierre corresponde a una caja de cobrador autorizada mediante código de 6 dígitos."
        icon={<WalletCards className="h-5 w-5" />}
      >
        <AdminCierresCajaTable cierres={resumen.cierres} />
      </SectionCard>
    </PageShell>
  );
}
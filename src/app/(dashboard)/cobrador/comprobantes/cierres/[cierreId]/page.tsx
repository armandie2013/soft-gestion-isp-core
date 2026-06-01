import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, KeyRound, WalletCards } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PageShell } from "@/components/ui/PageShell";
import { PrintButton } from "@/components/ui/PrintButton";
import { SectionCard } from "@/components/ui/SectionCard";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerComprobanteCierreCaja } from "@/services/comprobante.service";

type ComprobanteCierreCajaPageProps = {
  params: {
    cierreId: string;
  };
};

export const metadata = {
  title: "Comprobante cierre de caja",
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

export default async function ComprobanteCierreCajaPage({
  params,
}: ComprobanteCierreCajaPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const comprobante = await obtenerComprobanteCierreCaja(params.cierreId);

  if (!comprobante) {
    notFound();
  }

  if (comprobante.cobradorId !== user.userId) {
    notFound();
  }

  return (
    <PageShell maxWidth="md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <Link
          href="/cobrador/caja"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-primary)] transition hover:text-[var(--app-primary-hover)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a mi caja
        </Link>

        <PrintButton />
      </div>

      <div className="rounded-[1.7rem] border border-[var(--app-border)] bg-[var(--app-card)] p-4 shadow-[var(--app-shadow-soft)] sm:p-6 print:border-slate-300 print:bg-white print:shadow-none">
        <div className="flex flex-col gap-4 border-b border-[var(--app-border)] pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--app-primary)]">
              Comprobante de cierre de caja
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--app-text-strong)]">
              Código {comprobante.codigo}
            </h1>

            <p className="mt-1 text-sm text-[var(--app-muted)]">
              {formatDate(comprobante.fechaCierre)}
            </p>
          </div>

          <Badge variant="success">Cierre confirmado</Badge>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-[var(--app-warning-soft)] p-4 text-[var(--app-warning)] dark:border-amber-900/70 print:border-slate-300 print:bg-white print:text-slate-950">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
            Importe cerrado
          </p>

          <p className="mt-2 text-4xl font-semibold tracking-tight">
            {formatMoney(comprobante.importeCerrado)}
          </p>

          <p className="mt-1 text-sm opacity-90">
            Caja posterior: {formatMoney(comprobante.saldoCajaDespuesDelCierre)}
          </p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <SectionCard
            title="Cobrador"
            icon={<WalletCards className="h-5 w-5" />}
          >
            <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2 print:border-slate-300 print:bg-white">
              <DataLine label="Cobrador" value={comprobante.cobradorNombre} />
              <DataLine label="Email" value={comprobante.cobradorEmail || "-"} />
              <DataLine
                label="Fecha cierre"
                value={formatDate(comprobante.fechaCierre)}
              />
              <DataLine
                label="Saldo posterior"
                value={formatMoney(comprobante.saldoCajaDespuesDelCierre)}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Código de autorización"
            icon={<KeyRound className="h-5 w-5" />}
          >
            <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 py-2 print:border-slate-300 print:bg-white">
              <DataLine label="Código" value={comprobante.codigo} />
              <DataLine label="Estado" value={comprobante.codigoEstado} />
              <DataLine
                label="Generado por"
                value={comprobante.codigoGeneradoPor}
              />
              <DataLine
                label="Generado"
                value={formatDate(comprobante.codigoCreadoEn)}
              />
              <DataLine
                label="Usado"
                value={formatDate(comprobante.codigoUsadoEn)}
              />
            </div>
          </SectionCard>
        </div>

        {comprobante.observacion ? (
          <div className="mt-5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-4 print:border-slate-300 print:bg-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-muted)]">
              Observación
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--app-text-strong)]">
              {comprobante.observacion}
            </p>
          </div>
        ) : null}

        <div className="mt-6 border-t border-[var(--app-border)] pt-4 text-center text-xs leading-5 text-[var(--app-muted)]">
          <p>
            Este comprobante fue generado automáticamente al confirmar el cierre
            de caja.
          </p>
          <p>
            El cierre fue autorizado mediante código de 6 dígitos generado por
            administración.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  Banknote,
  FileWarning,
  History,
  ReceiptText,
  ShieldAlert,
  UserRound,
  WalletCards,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerContextoCorreccionPago } from "@/services/cobro.service";
import { CorreccionPagoForm } from "@/components/forms/CorreccionPagoForm";
import { PageShell } from "@/components/ui/PageShell";

export const metadata = {
  title: "Corregir pago",
};

type CorregirPagoPageProps = {
  params: {
    movimientoId: string;
  };
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatDate(value: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

function DataLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-1.5 last:border-b-0 dark:border-slate-800">
      <span className="shrink-0 text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span className="text-right text-xs font-medium text-slate-950 dark:text-white">
        {value}
      </span>
    </div>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.2rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
          {icon}
        </div>

        <h2 className="text-xs font-semibold text-slate-950 dark:text-white">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}

export default async function CorregirPagoPage({
  params,
}: CorregirPagoPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  const contexto = await obtenerContextoCorreccionPago(params.movimientoId);

  if (!contexto) {
    notFound();
  }

  return (
    <PageShell maxWidth="wide" className="space-y-3 pb-20 sm:pb-0">
      <div className="rounded-[1.25rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Link
              href={`/comprobantes/pagos/${contexto.movimientoId}`}
              className="inline-flex items-center gap-2 text-[11px] font-medium text-cyan-700 transition hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver al comprobante
            </Link>

            <div className="mt-3 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 ring-1 ring-red-200 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900">
                <FileWarning className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-700 dark:text-red-300">
                  Corrección administrativa
                </p>

                <h1 className="mt-0.5 text-lg font-semibold tracking-tight text-slate-950 dark:text-white sm:text-xl">
                  Corregir pago N° {contexto.numeroComprobante}
                </h1>

                <p className="mt-1 max-w-4xl text-xs leading-5 text-slate-600 dark:text-slate-400">
                  El pago original no se elimina: queda corregido parcialmente y
                  la verificación pública mostrará el importe válido actual.
                </p>
              </div>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-[11px] font-medium text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
            <ShieldAlert className="h-3.5 w-3.5" />
            Acción irreversible
          </div>
        </div>
      </div>

      <div
        className={`rounded-[1.2rem] border px-3 py-2.5 shadow-sm ${
          contexto.cobroYaCerrado
            ? "border-amber-300 bg-amber-50 text-amber-900 shadow-amber-200/60 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200 dark:shadow-none"
            : "border-cyan-300 bg-cyan-50 text-cyan-900 shadow-cyan-200/60 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200 dark:shadow-none"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${
              contexto.cobroYaCerrado
                ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                : "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300"
            }`}
          >
            {contexto.cobroYaCerrado ? (
              <History className="h-4 w-4" />
            ) : (
              <WalletCards className="h-4 w-4" />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold">
              {contexto.cobroYaCerrado
                ? "Corrección sobre una caja ya cerrada"
                : "Corrección sobre caja abierta"}
            </p>

            <p className="mt-1 text-xs leading-5">
              {contexto.cobroYaCerrado
                ? "La diferencia se descontará como saldo pendiente de la próxima caja del cobrador y quedará asociada al cierre donde se rindió ese cobro."
                : "La diferencia se descontará de la caja actual y se cancelarán códigos pendientes de cierre."}
            </p>

            {contexto.cobroYaCerrado ? (
              <p className="mt-1 text-[11px] leading-5 opacity-90">
                Cierre asociado:{" "}
                {contexto.cierreCajaId
                  ? contexto.cierreCajaId.slice(-6).toUpperCase()
                  : "-"}{" "}
                · {formatDate(contexto.cierreCajaFecha)}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <InfoCard
          title="Comprobante original"
          icon={<ReceiptText className="h-4 w-4" />}
        >
          <DataLine
            label="Comprobante"
            value={`N° ${contexto.numeroComprobante}`}
          />
          <DataLine label="Fecha" value={formatDate(contexto.fecha)} />
          <DataLine
            label="Factura"
            value={
              contexto.facturaNumeroComprobante
                ? `N° ${contexto.facturaNumeroComprobante}`
                : "-"
            }
          />
          <DataLine label="Período" value={contexto.periodoLabel} />
          <DataLine
            label="Registrado"
            value={formatMoney(contexto.importeRegistrado)}
          />
        </InfoCard>

        <InfoCard
          title="Cliente y cobrador"
          icon={<UserRound className="h-4 w-4" />}
        >
          <DataLine label="Cliente" value={contexto.clienteNombre} />
          <DataLine label="DNI" value={contexto.clienteDni || "-"} />
          <DataLine label="Cobrador" value={contexto.cobradorNombre} />
          <DataLine
            label="Saldo cliente"
            value={formatMoney(contexto.saldoClienteDespuesDelPago)}
          />
        </InfoCard>

        <InfoCard
          title="Estado de caja"
          icon={<WalletCards className="h-4 w-4" />}
        >
          <DataLine
            label="Caja actual"
            value={formatMoney(contexto.saldoCajaActual)}
          />
          <DataLine
            label="Estado"
            value={contexto.cobroYaCerrado ? "Caja cerrada" : "Caja abierta"}
          />
          <DataLine
            label="Impacto"
            value={
              contexto.cobroYaCerrado
                ? "Saldo pendiente próxima caja"
                : "Descuenta caja actual"
            }
          />
          <DataLine
            label="Comprobante"
            value={
              contexto.estadoComprobante === "corregido_parcialmente"
                ? "Corregido"
                : "Vigente"
            }
          />
        </InfoCard>
      </div>

      <section className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
        <div className="mb-3 flex items-start gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
            <Banknote className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
              Datos de la corrección
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
              Cargá el importe real recibido. El sistema calcula la diferencia y
              aplica el impacto según el estado de la caja.
            </p>
          </div>
        </div>

        <CorreccionPagoForm contexto={contexto} />
      </section>
    </PageShell>
  );
}
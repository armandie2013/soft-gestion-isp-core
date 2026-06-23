import Link from "next/link";
import { notFound, redirect } from "next/navigation";
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

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function DataLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-2 last:border-b-0 dark:border-slate-800">
      <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-slate-950 dark:text-white">
        {value}
      </span>
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
    <PageShell maxWidth="wide" className="space-y-4 pb-20 sm:pb-0">
      <div className="rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-4 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <Link
              href={`/comprobantes/pagos/${contexto.movimientoId}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-cyan-700 transition hover:text-cyan-900 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver al comprobante
            </Link>

            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 ring-1 ring-red-200 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900">
                <FileWarning className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-red-700 dark:text-red-300">
                  Corrección administrativa
                </p>

                <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                  Corregir pago N° {contexto.numeroComprobante}
                </h1>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Usá este circuito cuando el pago fue emitido por un importe
                  mayor al dinero realmente recibido. El pago original no se
                  elimina: queda corregido parcialmente y la verificación pública
                  mostrará el importe válido actual.
                </p>
              </div>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
            <ShieldAlert className="h-3.5 w-3.5" />
            Acción irreversible
          </div>
        </div>
      </div>

      <div
        className={`rounded-[1.45rem] border p-4 shadow-sm ${
          contexto.cobroYaCerrado
            ? "border-amber-300 bg-amber-50 text-amber-900 shadow-amber-200/60 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200 dark:shadow-none"
            : "border-cyan-300 bg-cyan-50 text-cyan-900 shadow-cyan-200/60 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200 dark:shadow-none"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
              contexto.cobroYaCerrado
                ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                : "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300"
            }`}
          >
            {contexto.cobroYaCerrado ? (
              <History className="h-5 w-5" />
            ) : (
              <WalletCards className="h-5 w-5" />
            )}
          </div>

          <div>
            <p className="text-sm font-semibold">
              {contexto.cobroYaCerrado
                ? "Corrección sobre una caja ya cerrada"
                : "Corrección sobre caja abierta"}
            </p>

            <p className="mt-1 text-sm leading-6">
              {contexto.cobroYaCerrado
                ? "Este pago ya pertenece a un cierre anterior. La corrección no va a modificar la caja actual del cobrador; quedará como ajuste post-cierre asociado al cierre donde se rindió ese cobro."
                : "Este pago todavía pertenece a la caja abierta del cobrador. La diferencia se descontará directamente de la caja actual y se cancelarán códigos pendientes de cierre."}
            </p>

            {contexto.cobroYaCerrado ? (
              <p className="mt-2 text-xs leading-5 opacity-90">
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

      <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-[1.35rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
            <div className="mb-3 flex items-center gap-2">
              <ReceiptText className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
              <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
                Comprobante original
              </h2>
            </div>

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
              label="Importe registrado"
              value={formatMoney(contexto.importeRegistrado)}
            />
          </div>

          <div className="rounded-[1.35rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
            <div className="mb-3 flex items-center gap-2">
              <UserRound className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
              <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
                Cliente y cobrador
              </h2>
            </div>

            <DataLine label="Cliente" value={contexto.clienteNombre} />
            <DataLine label="DNI" value={contexto.clienteDni || "-"} />
            <DataLine label="Cobrador" value={contexto.cobradorNombre} />
          </div>

          <div className="rounded-[1.35rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
            <div className="mb-3 flex items-center gap-2">
              <WalletCards className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
              <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
                Estado de caja
              </h2>
            </div>

            <DataLine
              label="Caja actual"
              value={formatMoney(contexto.saldoCajaActual)}
            />
            <DataLine
              label="Estado cobro"
              value={
                contexto.cobroYaCerrado ? "Caja cerrada" : "Caja abierta"
              }
            />
            <DataLine
              label="Impacto"
              value={
                contexto.cobroYaCerrado
                  ? "Ajuste post-cierre"
                  : "Descuenta caja actual"
              }
            />
            <DataLine
              label="Saldo cliente tras pago"
              value={formatMoney(contexto.saldoClienteDespuesDelPago)}
            />
            <DataLine
              label="Estado comprobante"
              value={
                contexto.estadoComprobante === "corregido_parcialmente"
                  ? "Corregido parcialmente"
                  : "Vigente"
              }
            />
          </div>
        </aside>

        <section className="rounded-[1.45rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
          <div className="mb-4 flex items-start gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
              <Banknote className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-950 dark:text-white">
                Datos de la corrección
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Cargá el importe real que recibió el cobrador. El sistema calcula
                la diferencia, genera el comprobante de corrección y aplica el
                impacto correspondiente según el estado de la caja.
              </p>
            </div>
          </div>

          <CorreccionPagoForm contexto={contexto} />
        </section>
      </div>
    </PageShell>
  );
}
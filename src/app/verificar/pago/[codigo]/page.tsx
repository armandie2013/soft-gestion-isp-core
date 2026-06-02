import { ShieldAlert, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { verificarPagoPorCodigo } from "@/services/comprobante.service";

type VerificarPagoPageProps = {
  params: {
    codigo: string;
  };
};

export const metadata = {
  title: "Verificar comprobante",
};

function formatDate(value?: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatMoney(value?: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function DataLine({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-2 last:border-b-0">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-slate-950">
        {value}
      </span>
    </div>
  );
}

export default async function VerificarPagoPage({
  params,
}: VerificarPagoPageProps) {
  const resultado = await verificarPagoPorCodigo(params.codigo);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-xl">
        <div className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5">
          <div className="flex flex-col items-center text-center">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                resultado.valido
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {resultado.valido ? (
                <ShieldCheck className="h-7 w-7" />
              ) : (
                <ShieldAlert className="h-7 w-7" />
              )}
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Verificación de comprobante
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              {resultado.valido ? "Comprobante válido" : "Comprobante inválido"}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {resultado.mensaje}
            </p>

            <div className="mt-3">
              <Badge variant={resultado.valido ? "success" : "danger"}>
                {resultado.valido ? "Verificado" : "No verificado"}
              </Badge>
            </div>
          </div>

          {resultado.valido ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">
              <DataLine
                label="Comprobante"
                value={`N° ${resultado.numeroComprobante}`}
              />
              <DataLine label="Fecha" value={formatDate(resultado.fecha)} />
              <DataLine
                label="Cliente"
                value={resultado.clienteNombre || "-"}
              />
              <DataLine label="DNI" value={resultado.clienteDni || "-"} />
              <DataLine
                label="Período"
                value={resultado.periodoLabel || "-"}
              />
              <DataLine
                label="Factura"
                value={
                  resultado.facturaNumeroComprobante
                    ? `N° ${resultado.facturaNumeroComprobante}`
                    : "-"
                }
              />
              <DataLine
                label="Importe"
                value={formatMoney(resultado.importePagado)}
              />
              <DataLine
                label="Cobrador"
                value={resultado.cobradorNombre || "-"}
              />
              <DataLine
                label="Firma"
                value={resultado.firmaCorta || "-"}
              />
            </div>
          ) : null}

          <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs leading-5 text-slate-500">
            <p>
              La validez del comprobante depende de los datos registrados en el
              sistema.
            </p>
            <p>
              Si el documento impreso o descargado fue modificado, esta página
              mostrará los datos reales.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
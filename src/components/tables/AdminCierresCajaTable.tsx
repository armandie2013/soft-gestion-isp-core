import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { AdminCierreCajaSafe } from "@/types/admin-caja.types";

type AdminCierresCajaTableProps = {
  cierres: AdminCierreCajaSafe[];
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

export function AdminCierresCajaTable({
  cierres,
}: AdminCierresCajaTableProps) {
  if (cierres.length === 0) {
    return (
      <EmptyState
        title="Todavía no hay cierres de caja."
        description="Cuando los cobradores confirmen cierres autorizados, aparecerán en este historial."
      />
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] shadow-[var(--app-shadow-soft)] lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[var(--app-border)] bg-[var(--app-surface-soft)] text-xs uppercase tracking-wide text-[var(--app-muted)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Fecha cierre</th>
                <th className="px-4 py-3 font-semibold">Cobrador</th>
                <th className="px-4 py-3 font-semibold">Código</th>
                <th className="px-4 py-3 font-semibold">Generado por</th>
                <th className="px-4 py-3 text-right font-semibold">Importe</th>
                <th className="px-4 py-3 text-right font-semibold">Acción</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--app-border)]">
              {cierres.map((cierre) => (
                <tr
                  key={cierre.id}
                  className="transition hover:bg-[var(--app-surface-soft)]"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-[var(--app-muted)]">
                    {formatDate(cierre.creadoEn)}
                  </td>

                  <td className="px-4 py-3 font-semibold text-[var(--app-text-strong)]">
                    {cierre.cobradorNombre}
                  </td>

                  <td className="px-4 py-3">
                    <Badge variant="info">{cierre.codigo}</Badge>
                  </td>

                  <td className="px-4 py-3 text-[var(--app-muted)]">
                    {cierre.generadoPorAdminNombre}
                  </td>

                  <td className="px-4 py-3 text-right font-semibold text-[var(--app-text-strong)]">
                    {formatMoney(cierre.importe)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/caja-cobradores/cierres/${cierre.id}`}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-xs font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-2 lg:hidden">
        {cierres.map((cierre) => (
          <div
            key={cierre.id}
            className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-[var(--app-shadow-soft)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                  {formatDate(cierre.creadoEn)}
                </p>

                <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
                  {cierre.cobradorNombre}
                </p>
              </div>

              <Badge variant="info">{cierre.codigo}</Badge>
            </div>

            <div className="mt-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
                Importe cerrado
              </p>

              <p className="mt-1 text-lg font-semibold text-[var(--app-text-strong)]">
                {formatMoney(cierre.importe)}
              </p>
            </div>

            <p className="mt-2 text-xs text-[var(--app-muted)]">
              Código generado por {cierre.generadoPorAdminNombre}
            </p>

            <Link
              href={`/admin/caja-cobradores/cierres/${cierre.id}`}
              className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] px-3 text-xs font-semibold text-[var(--app-text)] transition hover:bg-[var(--app-primary-soft)] active:scale-[0.99]"
            >
              <Eye className="h-3.5 w-3.5" />
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
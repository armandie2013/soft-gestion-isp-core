import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { eliminarPlanAction } from "@/actions/plan.actions";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { PlanSafe } from "@/types/plan.types";

type PlanesTableProps = {
  planes: PlanSafe[];
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function getEstadoBadgeVariant(estado: string) {
  if (estado === "activo") return "success";
  return "danger";
}

function getTipoBadgeVariant(tipo: string) {
  if (tipo === "dedicado" || tipo === "corporativo") return "info";
  if (tipo === "comercial") return "warning";
  return "default";
}

export function PlanesTable({ planes }: PlanesTableProps) {
  if (planes.length === 0) {
    return (
      <EmptyState
        title="No hay planes cargados."
        description="Creá el primer plan para luego asignarlo a clientes y generar facturación mensual."
      />
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] shadow-[var(--app-shadow-soft)] md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[var(--app-border)] bg-[var(--app-surface-soft)] text-xs uppercase tracking-wide text-[var(--app-muted)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Plan</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Importe</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 text-right font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--app-border)]">
              {planes.map((plan) => (
                <tr
                  key={plan.id}
                  className="transition hover:bg-[var(--app-surface-soft)]"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-[var(--app-text-strong)]">
                      {plan.nombre}
                    </p>
                    <p className="mt-1 line-clamp-1 text-xs text-[var(--app-muted)]">
                      {plan.detalle}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <Badge variant={getTipoBadgeVariant(plan.tipo) as any}>
                      {plan.tipo}
                    </Badge>
                  </td>

                  <td className="px-4 py-3 font-semibold text-[var(--app-text-strong)]">
                    {formatMoney(plan.importe)}
                  </td>

                  <td className="px-4 py-3">
                    <Badge variant={getEstadoBadgeVariant(plan.estado) as any}>
                      {plan.estado}
                    </Badge>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/planes/${plan.id}/editar`}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-xs font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Editar
                      </Link>

                      <form action={eliminarPlanAction}>
                        <input type="hidden" name="id" value={plan.id} />
                        <button
                          type="submit"
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-red-200 bg-[var(--app-danger-soft)] px-3 text-xs font-semibold text-[var(--app-danger)] shadow-sm transition hover:brightness-95 active:scale-[0.99] dark:border-red-900/70"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {planes.map((plan) => (
          <div
            key={plan.id}
            className="rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-4 shadow-[var(--app-shadow-soft)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-[var(--app-text-strong)]">
                  {plan.nombre}
                </h2>

                <p className="mt-1 text-sm font-semibold text-[var(--app-text)]">
                  {formatMoney(plan.importe)}
                </p>
              </div>

              <Badge variant={getEstadoBadgeVariant(plan.estado) as any}>
                {plan.estado}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant={getTipoBadgeVariant(plan.tipo) as any}>
                {plan.tipo}
              </Badge>
            </div>

            <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
              {plan.detalle}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href={`/planes/${plan.id}/editar`}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-sm font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </Link>

              <form action={eliminarPlanAction}>
                <input type="hidden" name="id" value={plan.id} />
                <button
                  type="submit"
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-[var(--app-danger-soft)] px-3 text-sm font-semibold text-[var(--app-danger)] shadow-sm transition hover:brightness-95 active:scale-[0.99] dark:border-red-900/70"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, FileText, Pencil, Search, Trash2, X } from "lucide-react";
import { eliminarClienteAction } from "@/actions/cliente.actions";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { ClienteSafe } from "@/types/cliente.types";

type ClientesTableProps = {
  clientes: ClienteSafe[];
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
  if (estado === "suspendido") return "warning";
  return "danger";
}

function normalizarTexto(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function ClientesTable({ clientes }: ClientesTableProps) {
  const [busqueda, setBusqueda] = useState("");

  const clientesFiltrados = useMemo(() => {
    const query = normalizarTexto(busqueda);

    if (!query) {
      return clientes;
    }

    return clientes.filter((cliente) => {
      const textoBuscable = normalizarTexto(
        [
          cliente.numeroCliente,
          cliente.nombre,
          cliente.apellido,
          cliente.dni,
          cliente.direccion,
          cliente.localidad,
          cliente.provincia,
          cliente.telefono,
          cliente.email,
          cliente.estado,
          cliente.plan?.nombre,
          cliente.plan?.tipo,
          cliente.plan?.detalle,
          cliente.plan?.importe,
        ]
          .filter(Boolean)
          .join(" "),
      );

      return textoBuscable.includes(query);
    });
  }, [busqueda, clientes]);

  if (clientes.length === 0) {
    return (
      <EmptyState
        title="No hay clientes cargados."
        description="Creá el primer cliente desde el botón superior para empezar a gestionar planes, facturación y estado de cuenta."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-[var(--app-shadow-soft)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-muted)]" />

            <input
              type="text"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Buscar por cliente, DNI, número, localidad, plan..."
              className="h-11 w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] pl-10 pr-10 text-sm text-[var(--app-text-strong)] outline-none transition placeholder:text-[var(--app-muted)] focus:border-[var(--app-primary)] focus:bg-[var(--app-surface-solid)] focus:ring-4 focus:ring-[rgba(127,152,182,0.16)] dark:focus:ring-[rgba(6,182,212,0.12)]"
            />

            {busqueda ? (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--app-muted)] transition hover:bg-[var(--app-primary-soft)] hover:text-[var(--app-primary)]"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-muted)] sm:justify-end">
            <span>Total: {clientes.length}</span>
            <span>Mostrados: {clientesFiltrados.length}</span>
          </div>
        </div>
      </div>

      {clientesFiltrados.length === 0 ? (
        <EmptyState
          title="No se encontraron clientes."
          description="Probá con otro nombre, DNI, número de cliente, localidad o plan."
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] shadow-[var(--app-shadow-soft)] lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-[var(--app-border)] bg-[var(--app-surface-soft)] text-xs uppercase tracking-wide text-[var(--app-muted)]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">N°</th>
                    <th className="px-4 py-3 font-semibold">Cliente</th>
                    <th className="px-4 py-3 font-semibold">DNI</th>
                    <th className="px-4 py-3 font-semibold">Localidad</th>
                    <th className="px-4 py-3 font-semibold">Plan</th>
                    <th className="px-4 py-3 font-semibold">Estado</th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[var(--app-border)]">
                  {clientesFiltrados.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className="transition hover:bg-[var(--app-surface-soft)]"
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--app-text-strong)]">
                        {cliente.numeroCliente}
                      </td>

                      <td className="px-4 py-3">
                        <p className="font-medium text-[var(--app-text-strong)]">
                          {cliente.apellido}, {cliente.nombre}
                        </p>
                        <p className="mt-1 text-xs text-[var(--app-muted)]">
                          {cliente.telefono}
                        </p>
                      </td>

                      <td className="px-4 py-3 text-[var(--app-muted)]">
                        {cliente.dni}
                      </td>

                      <td className="px-4 py-3 text-[var(--app-muted)]">
                        {cliente.localidad}
                      </td>

                      <td className="px-4 py-3">
                        <p className="font-medium text-[var(--app-text-strong)]">
                          {cliente.plan?.nombre || "-"}
                        </p>
                        <p className="mt-1 text-xs text-[var(--app-muted)]">
                          {cliente.plan
                            ? formatMoney(cliente.plan.importe)
                            : "-"}
                        </p>
                      </td>

                      <td className="px-4 py-3">
                        <Badge
                          variant={getEstadoBadgeVariant(cliente.estado) as any}
                        >
                          {cliente.estado}
                        </Badge>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/clientes/${cliente.id}`}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-xs font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Ver
                          </Link>

                          <Link
                            href={`/clientes/${cliente.id}/estado-cuenta`}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-xs font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Cuenta
                          </Link>

                          <Link
                            href={`/clientes/${cliente.id}/editar`}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-xs font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Editar
                          </Link>

                          <form action={eliminarClienteAction}>
                            <input type="hidden" name="id" value={cliente.id} />
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

          <div className="grid gap-2 lg:hidden">
            {clientesFiltrados.map((cliente) => (
              <div
                key={cliente.id}
                className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-[var(--app-shadow-soft)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="shrink-0 rounded-lg bg-[var(--app-primary-soft)] px-2 py-1 text-[11px] font-bold text-[var(--app-primary)]">
                        N° {cliente.numeroCliente}
                      </span>

                      <h2 className="truncate text-sm font-semibold text-[var(--app-text-strong)]">
                        {cliente.apellido}, {cliente.nombre}
                      </h2>
                    </div>

                    <p className="mt-1 text-xs text-[var(--app-muted)]">
                      DNI {cliente.dni} · {cliente.localidad}
                    </p>

                    <p className="mt-1 truncate text-xs text-[var(--app-muted)]">
                      {cliente.plan?.nombre || "Sin plan"} ·{" "}
                      {cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <Badge variant={getEstadoBadgeVariant(cliente.estado) as any}>
                      {cliente.estado}
                    </Badge>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Link
                    href={`/clientes/${cliente.id}`}
                    className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-soft)] px-2 text-xs font-semibold text-[var(--app-text)] transition hover:bg-[var(--app-primary-soft)] active:scale-[0.99]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Ver
                  </Link>

                  <Link
                    href={`/clientes/${cliente.id}/estado-cuenta`}
                    className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-soft)] px-2 text-xs font-semibold text-[var(--app-text)] transition hover:bg-[var(--app-primary-soft)] active:scale-[0.99]"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Cuenta
                  </Link>

                  <Link
                    href={`/clientes/${cliente.id}/editar`}
                    className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-soft)] px-2 text-xs font-semibold text-[var(--app-text)] transition hover:bg-[var(--app-primary-soft)] active:scale-[0.99]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
// src/components/tables/PlanesTable.tsx

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Search,
  Trash2,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { eliminarPlanAction } from "@/actions/plan.actions";
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
  }).format(value || 0);
}

function estadoLabel(estado: string) {
  if (estado === "activo") return "Activo";
  return "Inactivo";
}

function estadoClass(estado: string) {
  if (estado === "activo") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
  }

  return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
}

function normalizarTexto(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function EstadoPill({ estado }: { estado: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${estadoClass(
        estado,
      )}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {estadoLabel(estado)}
    </span>
  );
}

function getPlanIcon(estado: string) {
  if (estado === "activo") {
    return <Wifi className="h-4 w-4" />;
  }

  return <WifiOff className="h-4 w-4" />;
}

export function PlanesTable({ planes }: PlanesTableProps) {
  const [busqueda, setBusqueda] = useState("");

  const planesFiltrados = useMemo(() => {
    const query = normalizarTexto(busqueda);

    if (!query) {
      return planes;
    }

    return planes.filter((plan) => {
      const textoBuscable = normalizarTexto(
        [
          plan.nombre,
          plan.tipo,
          plan.detalle,
          plan.importe,
          plan.estado,
        ]
          .filter(Boolean)
          .join(" "),
      );

      return textoBuscable.includes(query);
    });
  }, [busqueda, planes]);

  if (planes.length === 0) {
    return (
      <EmptyState
        title="No hay planes cargados."
        description="Creá el primer plan para poder asignarlo luego a los clientes."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

            <input
              type="text"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Buscar por nombre, tipo, detalle o importe"
              className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 pl-8 pr-8 text-[11px] text-slate-950 outline-none transition placeholder:text-[11px] placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-500 dark:focus:bg-slate-900"
            />

            {busqueda ? (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="absolute right-1.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-500 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-300"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 sm:justify-end">
            <span>Total: {planes.length}</span>
            <span>Mostrados: {planesFiltrados.length}</span>
          </div>
        </div>
      </div>

      {planesFiltrados.length === 0 ? (
        <EmptyState
          title="No se encontraron planes."
          description="Probá con otro nombre, tipo, detalle o importe."
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] table-fixed text-left text-xs xl:min-w-0">
                <colgroup>
                  <col className="w-[25%]" />
                  <col className="w-[16%]" />
                  <col className="w-[26%]" />
                  <col className="w-[13%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                </colgroup>

                <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
                  <tr>
                    <th className="px-3 py-2.5 font-medium">Plan</th>
                    <th className="px-3 py-2.5 font-medium">Tipo</th>
                    <th className="px-3 py-2.5 font-medium">Detalle</th>
                    <th className="px-3 py-2.5 font-medium">Importe</th>
                    <th className="px-3 py-2.5 font-medium">Estado</th>
                    <th className="px-3 py-2.5 text-right font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {planesFiltrados.map((plan) => (
                    <tr
                      key={plan.id}
                      className="transition hover:bg-slate-50/80 dark:hover:bg-slate-950/35"
                    >
                      <td className="px-3 py-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${
                              plan.estado === "activo"
                                ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300"
                                : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                            }`}
                          >
                            {getPlanIcon(plan.estado)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                              {plan.nombre}
                            </p>

                            <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                              ID {plan.id.slice(-6).toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                          {plan.tipo || "-"}
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                          {plan.detalle || "-"}
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                          {formatMoney(plan.importe)}
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        <EstadoPill estado={plan.estado} />
                      </td>

                      <td className="px-3 py-3 text-right">
                        <div className="flex justify-end gap-1.5">
                          <Link
                            href={`/planes/${plan.id}/editar`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
                            title="Editar plan"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>

                          <form action={eliminarPlanAction}>
                            <input type="hidden" name="id" value={plan.id} />
                            <button
                              type="submit"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-700 shadow-sm transition hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
                              title="Eliminar plan"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>
                Mostrando {planesFiltrados.length} de {planes.length} planes
              </span>

              <span>Vista administrativa</span>
            </div>
          </div>

          <div className="grid gap-3 md:hidden">
            {planesFiltrados.map((plan) => (
              <div
                key={plan.id}
                className="rounded-[1.35rem] border border-slate-200 bg-white/85 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        plan.estado === "activo"
                          ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300"
                          : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                      }`}
                    >
                      {getPlanIcon(plan.estado)}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-medium text-slate-950 dark:text-white">
                        {plan.nombre}
                      </h2>

                      <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                        {plan.tipo || "Sin tipo"}
                      </p>
                    </div>
                  </div>

                  <EstadoPill estado={plan.estado} />
                </div>

                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                      Importe
                    </span>

                    <span className="shrink-0 text-right font-medium text-cyan-700 dark:text-cyan-300">
                      {formatMoney(plan.importe)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-start justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
                    <span className="min-w-0 text-slate-500 dark:text-slate-400">
                      Detalle
                    </span>

                    <span className="max-w-[65%] text-right text-slate-700 dark:text-slate-300">
                      {plan.detalle || "-"}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">
                      Código interno
                    </span>

                    <span className="text-right text-slate-700 dark:text-slate-300">
                      {plan.id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link
                    href={`/planes/${plan.id}/editar`}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </Link>

                  <form action={eliminarPlanAction}>
                    <input type="hidden" name="id" value={plan.id} />
                    <button
                      type="submit"
                      className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-2 text-xs font-medium text-red-700 shadow-sm transition hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Eliminar
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
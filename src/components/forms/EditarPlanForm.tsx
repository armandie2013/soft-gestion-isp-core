"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { actualizarPlanAction, type PlanActionState } from "@/actions/plan.actions";
import type { PlanSafe } from "@/types/plan.types";

type EditarPlanFormProps = {
  plan: PlanSafe;
};

const initialState: PlanActionState = {
  ok: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-sm font-semibold text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Guardando...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Guardar cambios
        </>
      )}
    </button>
  );
}

export function EditarPlanForm({ plan }: EditarPlanFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(actualizarPlanAction, initialState);

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={plan.id} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="nombre"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Nombre del plan
          </label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            defaultValue={plan.nombre}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="tipo"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Tipo
          </label>

          <select
            id="tipo"
            name="tipo"
            defaultValue={plan.tipo}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="residencial">Residencial</option>
            <option value="comercial">Comercial</option>
            <option value="corporativo">Corporativo</option>
            <option value="dedicado">Dedicado</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="importe"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Importe en pesos
          </label>

          <input
            id="importe"
            name="importe"
            type="number"
            min="0"
            step="0.01"
            defaultValue={plan.importe}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="estado"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Estado
          </label>

          <select
            id="estado"
            name="estado"
            defaultValue={plan.estado}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label
            htmlFor="detalle"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Detalle
          </label>

          <textarea
            id="detalle"
            name="detalle"
            rows={4}
            defaultValue={plan.detalle}
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
      </div>

      {state.message ? (
        <div
          className={
            state.ok
              ? "rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          }
        >
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/planes")}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
        >
          Volver
        </button>

        <SubmitButton />
      </div>
    </form>
  );
}
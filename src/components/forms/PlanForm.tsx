"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { crearPlanAction, type PlanActionState } from "@/actions/plan.actions";
import { AlertBox } from "@/components/ui/AlertBox";
import { FormField } from "@/components/ui/FormField";

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
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-[var(--app-primary)] px-4 text-sm font-semibold text-[var(--app-primary-foreground)] shadow-sm transition hover:bg-[var(--app-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Guardando...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Guardar plan
        </>
      )}
    </button>
  );
}

export function PlanForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(crearPlanAction, initialState);

  useEffect(() => {
    if (state.ok) {
      router.push("/planes");
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Nombre del plan" htmlFor="nombre">
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej: Plan Familiar"
            className="app-input"
          />
        </FormField>

        <FormField label="Tipo" htmlFor="tipo">
          <select
            id="tipo"
            name="tipo"
            defaultValue="residencial"
            className="app-input"
          >
            <option value="residencial">Residencial</option>
            <option value="comercial">Comercial</option>
            <option value="corporativo">Corporativo</option>
            <option value="dedicado">Dedicado</option>
            <option value="otro">Otro</option>
          </select>
        </FormField>

        <FormField label="Importe en pesos" htmlFor="importe">
          <input
            id="importe"
            name="importe"
            type="number"
            min="0"
            step="0.01"
            placeholder="15000"
            className="app-input"
          />
        </FormField>

        <FormField label="Estado" htmlFor="estado">
          <select
            id="estado"
            name="estado"
            defaultValue="activo"
            className="app-input"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </FormField>

        <div className="md:col-span-2">
          <FormField label="Detalle" htmlFor="detalle">
            <textarea
              id="detalle"
              name="detalle"
              rows={4}
              placeholder="Detalle del servicio incluido en el plan"
              className="app-textarea"
            />
          </FormField>
        </div>
      </div>

      {state.message ? (
        <AlertBox variant={state.ok ? "success" : "danger"}>
          {state.message}
        </AlertBox>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/planes")}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 text-sm font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99] sm:w-auto"
        >
          Cancelar
        </button>

        <SubmitButton />
      </div>
    </form>
  );
}
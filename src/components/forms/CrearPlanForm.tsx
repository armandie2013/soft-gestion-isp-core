// src/components/forms/CrearPlanForm.tsx

"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { FileText, Loader2, RadioTower, Save, Wifi } from "lucide-react";
import {
  crearPlanAction,
  type PlanActionState,
} from "@/actions/plan.actions";
import { CurrencyInput } from "@/components/forms/CurrencyInput";

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
      className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-3 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Guardando
        </>
      ) : (
        <>
          <Save className="h-3.5 w-3.5" />
          Guardar plan
        </>
      )}
    </button>
  );
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
    >
      {children}
    </label>
  );
}

function FormSection({
  icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/40 sm:p-3.5">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
            {eyebrow}
          </p>

          <h3 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
            {title}
          </h3>

          {description ? (
            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {children}
    </div>
  );
}

const inputClass =
  "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white";

export function CrearPlanForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(crearPlanAction, initialState);

  useEffect(() => {
    if (state.ok) {
      router.push("/planes");
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form action={formAction} className="space-y-4">
      <FormSection
        icon={<Wifi className="h-4 w-4" />}
        eyebrow="Identificación"
        title="Datos principales"
        description="Nombre comercial y detalle visible del plan."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej: Plan Estándar + TV"
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="tipo">Tipo</FieldLabel>

            <select
              id="tipo"
              name="tipo"
              defaultValue="residencial"
              className={inputClass}
            >
              <option value="residencial">Residencial</option>
              <option value="comercial">Comercial</option>
              <option value="corporativo">Corporativo</option>
              <option value="dedicado">Dedicado</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <FieldLabel htmlFor="detalle">Detalle</FieldLabel>

            <textarea
              id="detalle"
              name="detalle"
              rows={3}
              placeholder="Detalle del servicio incluido en el plan"
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600"
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        icon={<FileText className="h-4 w-4" />}
        eyebrow="Facturación"
        title="Importe mensual"
        description="Solo se permiten importes enteros. Se muestra con formato argentino y se guarda como Int32."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="importe">Importe</FieldLabel>

            <CurrencyInput
              id="importe"
              name="importe"
              defaultValue=""
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="estado">Estado</FieldLabel>

            <select
              id="estado"
              name="estado"
              defaultValue="activo"
              className={inputClass}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormSection
        icon={<RadioTower className="h-4 w-4" />}
        eyebrow="Referencia"
        title="Uso del plan"
        description="Esta información ayuda a mantener consistencia operativa."
      >
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
          El plan activo aparecerá disponible para nuevas altas de clientes. Si
          lo dejás inactivo, quedará guardado pero no se podrá seleccionar en
          nuevos clientes.
        </div>
      </FormSection>

      {state.message ? (
        <div
          className={`rounded-2xl border px-3 py-2 text-xs leading-5 ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
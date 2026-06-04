// src/components/forms/ClienteForm.tsx

"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Loader2, MapPin, Save, UserRound, Wifi } from "lucide-react";
import {
  crearClienteAction,
  type ClienteActionState,
} from "@/actions/cliente.actions";
import type { PlanSafe } from "@/types/plan.types";

type ClienteFormProps = {
  planes: PlanSafe[];
};

const initialState: ClienteActionState = {
  ok: false,
  message: "",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
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
          Guardar cliente
        </>
      )}
    </button>
  );
}

function FieldLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
    >
      <span>{children}</span>

      {optional ? (
        <span className="text-[10px] normal-case tracking-normal text-slate-400 dark:text-slate-500">
          Opcional
        </span>
      ) : null}
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

export function ClienteForm({ planes }: ClienteFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(crearClienteAction, initialState);

  useEffect(() => {
    if (state.ok) {
      router.push("/clientes");
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form action={formAction} className="space-y-4">
      <FormSection
        icon={<UserRound className="h-4 w-4" />}
        eyebrow="Titular"
        title="Datos personales"
        description="Información básica del titular del servicio."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="given-name"
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="apellido">Apellido</FieldLabel>

            <input
              id="apellido"
              name="apellido"
              type="text"
              autoComplete="family-name"
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="dni">DNI</FieldLabel>

            <input
              id="dni"
              name="dni"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>

            <input
              id="telefono"
              name="telefono"
              type="text"
              inputMode="tel"
              autoComplete="tel"
              className={inputClass}
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        icon={<MapPin className="h-4 w-4" />}
        eyebrow="Ubicación"
        title="Domicilio y contacto"
        description="Datos necesarios para ubicar al cliente."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel htmlFor="direccion">Dirección</FieldLabel>

            <input
              id="direccion"
              name="direccion"
              type="text"
              autoComplete="street-address"
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="localidad">Localidad</FieldLabel>

            <input
              id="localidad"
              name="localidad"
              type="text"
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="provincia">Provincia</FieldLabel>

            <input
              id="provincia"
              name="provincia"
              type="text"
              defaultValue="Catamarca"
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <FieldLabel htmlFor="email" optional>
              Email
            </FieldLabel>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={inputClass}
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        icon={<Wifi className="h-4 w-4" />}
        eyebrow="Servicio"
        title="Plan contratado"
        description="Seleccioná el plan activo que tendrá el cliente."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="estado">Estado</FieldLabel>

            <select
              id="estado"
              name="estado"
              defaultValue="activo"
              className={inputClass}
            >
              <option value="activo">Activo</option>
              <option value="suspendido">Suspendido</option>
              <option value="baja">Baja</option>
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="planId">Plan</FieldLabel>

            <select
              id="planId"
              name="planId"
              defaultValue=""
              className={inputClass}
            >
              <option value="">Seleccionar plan</option>
              {planes.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.nombre} - {formatMoney(plan.importe)}
                </option>
              ))}
            </select>
          </div>
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

      {planes.length === 0 ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300">
          No hay planes activos disponibles. Primero cargá o activá un plan.
        </div>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton disabled={planes.length === 0} />
      </div>
    </form>
  );
}
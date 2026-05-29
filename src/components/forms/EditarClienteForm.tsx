"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Loader2, MapPin, Save, UserRound, Wifi } from "lucide-react";
import {
  actualizarClienteAction,
  type ClienteActionState,
} from "@/actions/cliente.actions";
import { AlertBox } from "@/components/ui/AlertBox";
import { FormField } from "@/components/ui/FormField";
import type { ClienteSafe } from "@/types/cliente.types";
import type { PlanSafe } from "@/types/plan.types";

type EditarClienteFormProps = {
  cliente: ClienteSafe;
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
  }).format(value);
}

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
          Guardar cambios
        </>
      )}
    </button>
  );
}

function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-sm sm:p-4">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--app-primary-soft)] text-[var(--app-primary)]">
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[var(--app-text-strong)]">
            {title}
          </h3>

          {description ? (
            <p className="mt-1 text-xs leading-5 text-[var(--app-muted)]">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {children}
    </div>
  );
}

export function EditarClienteForm({ cliente, planes }: EditarClienteFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(actualizarClienteAction, initialState);

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={cliente.id} />

      <FormSection
        icon={<UserRound className="h-4 w-4" />}
        title="Datos personales"
        description="Información básica del titular del servicio."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="Número de cliente">
            <input
              value={cliente.numeroCliente}
              disabled
              className="app-input cursor-not-allowed opacity-70"
            />
          </FormField>

          <FormField label="Estado" htmlFor="estado">
            <select
              id="estado"
              name="estado"
              defaultValue={cliente.estado}
              className="app-input"
            >
              <option value="activo">Activo</option>
              <option value="suspendido">Suspendido</option>
              <option value="baja">Baja</option>
            </select>
          </FormField>

          <FormField label="Nombre" htmlFor="nombre">
            <input
              id="nombre"
              name="nombre"
              type="text"
              defaultValue={cliente.nombre}
              autoComplete="given-name"
              className="app-input"
            />
          </FormField>

          <FormField label="Apellido" htmlFor="apellido">
            <input
              id="apellido"
              name="apellido"
              type="text"
              defaultValue={cliente.apellido}
              autoComplete="family-name"
              className="app-input"
            />
          </FormField>

          <FormField label="DNI" htmlFor="dni">
            <input
              id="dni"
              name="dni"
              type="text"
              inputMode="numeric"
              defaultValue={cliente.dni}
              autoComplete="off"
              className="app-input"
            />
          </FormField>

          <FormField label="Teléfono" htmlFor="telefono">
            <input
              id="telefono"
              name="telefono"
              type="text"
              inputMode="tel"
              defaultValue={cliente.telefono}
              autoComplete="tel"
              className="app-input"
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection
        icon={<MapPin className="h-4 w-4" />}
        title="Ubicación y contacto"
        description="Datos necesarios para ubicar al cliente."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField label="Dirección" htmlFor="direccion">
              <input
                id="direccion"
                name="direccion"
                type="text"
                defaultValue={cliente.direccion}
                autoComplete="street-address"
                className="app-input"
              />
            </FormField>
          </div>

          <FormField label="Localidad" htmlFor="localidad">
            <input
              id="localidad"
              name="localidad"
              type="text"
              defaultValue={cliente.localidad}
              className="app-input"
            />
          </FormField>

          <FormField label="Provincia" htmlFor="provincia">
            <input
              id="provincia"
              name="provincia"
              type="text"
              defaultValue={cliente.provincia}
              className="app-input"
            />
          </FormField>

          <div className="sm:col-span-2">
            <FormField label="Email" htmlFor="email" description="Opcional">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={cliente.email}
                autoComplete="email"
                className="app-input"
              />
            </FormField>
          </div>
        </div>
      </FormSection>

      <FormSection
        icon={<Wifi className="h-4 w-4" />}
        title="Plan contratado"
        description="Modificá el plan activo asignado al cliente."
      >
        <div className="grid gap-3">
          <FormField label="Plan" htmlFor="planId">
            <select
              id="planId"
              name="planId"
              defaultValue={cliente.planId}
              className="app-input"
            >
              <option value="">Seleccionar plan</option>
              {planes.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.nombre} - {formatMoney(plan.importe)}
                </option>
              ))}
            </select>
          </FormField>

          {cliente.plan ? (
            <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-muted)]">
                Plan actual
              </p>

              <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
                {cliente.plan.nombre}
              </p>

              <p className="mt-1 text-xs text-[var(--app-muted)]">
                {cliente.plan.tipo} · {formatMoney(cliente.plan.importe)}
              </p>
            </div>
          ) : null}
        </div>
      </FormSection>

      {state.message ? (
        <AlertBox variant={state.ok ? "success" : "danger"}>
          {state.message}
        </AlertBox>
      ) : null}

      <div className="sticky bottom-3 z-10 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-3 shadow-[var(--app-shadow)] backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push(`/clientes/${cliente.id}`)}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 text-sm font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99] sm:w-auto"
          >
            Volver
          </button>

          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2, ReceiptText } from "lucide-react";
import {
  generarFacturacionManualAction,
  type FacturacionManualActionState,
} from "@/actions/movimiento-financiero.actions";
import { AlertBox } from "@/components/ui/AlertBox";
import { FormField } from "@/components/ui/FormField";

const initialState: FacturacionManualActionState = {
  ok: false,
  message: "",
  generadas: 0,
  omitidas: 0,
};

const meses = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

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
          Generando facturación...
        </>
      ) : (
        <>
          <ReceiptText className="h-4 w-4" />
          Generar facturación
        </>
      )}
    </button>
  );
}

export function FacturacionManualForm() {
  const [state, formAction] = useFormState(
    generarFacturacionManualAction,
    initialState,
  );

  const now = new Date();

  return (
    <form action={formAction} className="space-y-5">
      <AlertBox variant="warning" title="Importante">
        Esta acción generará una factura mensual para todos los clientes activos
        con plan contratado. Si un cliente ya tiene factura para el mes y año
        seleccionado, se omitirá para evitar duplicados.
      </AlertBox>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Mes a facturar" htmlFor="referenciaMes">
          <select
            id="referenciaMes"
            name="referenciaMes"
            defaultValue={now.getMonth() + 1}
            className="app-input"
          >
            {meses.map((mes) => (
              <option key={mes.value} value={mes.value}>
                {mes.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Año" htmlFor="referenciaAnio">
          <input
            id="referenciaAnio"
            name="referenciaAnio"
            type="number"
            defaultValue={now.getFullYear()}
            className="app-input"
          />
        </FormField>
      </div>

      <FormField label="Observación" htmlFor="observacion">
        <textarea
          id="observacion"
          name="observacion"
          rows={3}
          placeholder="Opcional"
          className="app-textarea"
        />
      </FormField>

      {state.message ? (
        <AlertBox variant={state.ok ? "success" : "danger"}>
          <p>{state.message}</p>

          {state.ok ? (
            <p className="mt-2 text-xs">
              Generadas: {state.generadas || 0} · Omitidas:{" "}
              {state.omitidas || 0}
            </p>
          ) : null}
        </AlertBox>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
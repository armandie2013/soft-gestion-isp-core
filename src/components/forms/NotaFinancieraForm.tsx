"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2, Save } from "lucide-react";
import {
  crearNotaCreditoAction,
  crearNotaDebitoAction,
  type MovimientoActionState,
} from "@/actions/movimiento-financiero.actions";
import { AlertBox } from "@/components/ui/AlertBox";
import { FormField } from "@/components/ui/FormField";
import type { FacturaClienteSafe } from "@/types/movimiento-financiero.types";

type NotaFinancieraFormProps = {
  clienteId: string;
  tipo: "credito" | "debito";
  facturas: FacturaClienteSafe[];
};

const initialState: MovimientoActionState = {
  ok: false,
  message: "",
};

function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value);
}

function SubmitButton({ tipo }: { tipo: "credito" | "debito" }) {
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
          {tipo === "credito" ? "Crear nota de crédito" : "Crear nota de débito"}
        </>
      )}
    </button>
  );
}

export function NotaFinancieraForm({
  clienteId,
  tipo,
  facturas,
}: NotaFinancieraFormProps) {
  const action =
    tipo === "credito" ? crearNotaCreditoAction : crearNotaDebitoAction;

  const [state, formAction] = useFormState(action, initialState);

  const facturasDisponibles =
    tipo === "credito"
      ? facturas.filter((factura) => factura.saldoFactura > 0)
      : facturas;

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="clienteId" value={clienteId} />

      <AlertBox variant="info" title="Factura asociada obligatoria">
        Las notas de crédito y débito solo pueden generarse sobre una factura ya
        emitida. La nota modificará el saldo de esa factura.
      </AlertBox>

      <FormField label="Factura asociada" htmlFor="facturaAsociadaId">
        <select
          id="facturaAsociadaId"
          name="facturaAsociadaId"
          defaultValue=""
          className="app-input"
        >
          <option value="">Seleccionar factura</option>

          {facturasDisponibles.map((factura) => (
            <option key={factura.id} value={factura.id}>
              Factura N° {factura.numeroComprobante} ·{" "}
              {factura.referenciaMes && factura.referenciaAnio
                ? `${factura.referenciaMes}/${factura.referenciaAnio}`
                : formatDate(factura.fecha)}{" "}
              · Original {formatMoney(factura.importeOriginal)} · Saldo{" "}
              {formatMoney(factura.saldoFactura)}
            </option>
          ))}
        </select>

        {facturasDisponibles.length === 0 ? (
          <p className="text-xs text-[var(--app-danger)]">
            {tipo === "credito"
              ? "No hay facturas con saldo disponible para aplicar nota de crédito."
              : "No hay facturas emitidas para asociar una nota de débito."}
          </p>
        ) : null}
      </FormField>

      <FormField label="Concepto" htmlFor="concepto">
        <input
          id="concepto"
          name="concepto"
          type="text"
          placeholder={
            tipo === "credito"
              ? "Ej: Bonificación sobre factura"
              : "Ej: Cargo adicional sobre factura"
          }
          className="app-input"
        />
      </FormField>

      <FormField label="Importe" htmlFor="importe">
        <input
          id="importe"
          name="importe"
          type="number"
          min="0"
          step="0.01"
          placeholder="0"
          className="app-input"
        />
      </FormField>

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
          {state.message}
        </AlertBox>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton tipo={tipo} />
      </div>
    </form>
  );
}
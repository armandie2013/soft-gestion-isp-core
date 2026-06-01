"use client";

import { useFormState, useFormStatus } from "react-dom";
import { KeyRound, Loader2 } from "lucide-react";
import {
  generarCodigoCierreCajaAction,
  type CodigoCierreActionState,
} from "@/actions/cobro.actions";
import { AlertBox } from "@/components/ui/AlertBox";

type GenerarCodigoCierreCajaFormProps = {
  cobradorId: string;
  disabled?: boolean;
};

const initialState: CodigoCierreActionState = {
  ok: false,
  message: "",
};

function formatMoney(value?: number) {
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
      className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-primary)] px-3 text-xs font-semibold text-[var(--app-primary-foreground)] shadow-sm transition hover:bg-[var(--app-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.99]"
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Generando...
        </>
      ) : (
        <>
          <KeyRound className="h-3.5 w-3.5" />
          Generar código
        </>
      )}
    </button>
  );
}

export function GenerarCodigoCierreCajaForm({
  cobradorId,
  disabled,
}: GenerarCodigoCierreCajaFormProps) {
  const [state, formAction] = useFormState(
    generarCodigoCierreCajaAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="cobradorId" value={cobradorId} />

      <SubmitButton disabled={disabled} />

      {state.message ? (
        <AlertBox variant={state.ok ? "success" : "danger"}>
          <p>{state.message}</p>

          {state.ok && state.codigo ? (
            <div className="mt-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--app-muted)]">
                Código generado
              </p>
              <p className="mt-1 text-3xl font-bold tracking-[0.2em] text-[var(--app-text-strong)]">
                {state.codigo}
              </p>
              <p className="mt-1 text-xs text-[var(--app-muted)]">
                Importe: {formatMoney(state.importe)}
              </p>
            </div>
          ) : null}
        </AlertBox>
      ) : null}
    </form>
  );
}
// src/components/forms/GenerarCodigoCierreCajaForm.tsx

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { KeyRound, Loader2 } from "lucide-react";
import {
  generarCodigoCierreCajaAction,
  type CodigoCierreActionState,
} from "@/actions/cobro.actions";

type GenerarCodigoCierreCajaFormProps = {
  cobradorId: string;
  disabled?: boolean;
  fullWidth?: boolean;
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

function SubmitButton({
  disabled,
  fullWidth,
}: {
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-xl px-2.5 text-[11px] font-medium transition active:scale-[0.99] ${
        fullWidth ? "w-full" : ""
      } ${
        disabled
          ? "cursor-not-allowed border border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-600"
          : "border border-cyan-200 bg-cyan-50 text-cyan-700 hover:border-cyan-300 hover:bg-cyan-100 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Generando
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
  fullWidth,
}: GenerarCodigoCierreCajaFormProps) {
  const [state, formAction] = useFormState(
    generarCodigoCierreCajaAction,
    initialState,
  );

  return (
    <form action={formAction} className={fullWidth ? "w-full" : ""}>
      <input type="hidden" name="cobradorId" value={cobradorId} />

      <SubmitButton disabled={disabled} fullWidth={fullWidth} />

      {state.message ? (
        <div
          className={`mt-2 rounded-xl border px-3 py-2 text-[11px] ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          <p>{state.message}</p>

          {state.ok && state.codigo ? (
            <div className="mt-2 rounded-xl border border-slate-200 bg-white/80 p-3 text-center dark:border-slate-800 dark:bg-slate-950/50">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Código generado
              </p>

              <p className="mt-1 font-mono text-2xl font-medium tracking-[0.18em] text-slate-950 dark:text-white">
                {state.codigo}
              </p>

              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Importe: {formatMoney(state.importe)}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
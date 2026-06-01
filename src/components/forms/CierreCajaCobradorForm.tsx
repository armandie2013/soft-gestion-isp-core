"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";
import {
  confirmarCierreCajaAction,
  validarCodigoCierreCajaAction,
  type CodigoCierreActionState,
} from "@/actions/cobro.actions";
import { AlertBox } from "@/components/ui/AlertBox";
import { FormField } from "@/components/ui/FormField";

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

function ValidarButton() {
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
          Validando...
        </>
      ) : (
        <>
          <KeyRound className="h-4 w-4" />
          Validar código
        </>
      )}
    </button>
  );
}

function ConfirmarButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-[var(--app-success)] px-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Cerrando...
        </>
      ) : (
        <>
          <CheckCircle2 className="h-4 w-4" />
          Confirmar cierre
        </>
      )}
    </button>
  );
}

export function CierreCajaCobradorForm() {
  const [codigo, setCodigo] = useState("");
  const [validacionState, validarAction] = useFormState(
    validarCodigoCierreCajaAction,
    initialState,
  );
  const [confirmacionState, confirmarAction] = useFormState(
    confirmarCierreCajaAction,
    initialState,
  );

  const codigoLimpio = codigo.replace(/\D/g, "").slice(0, 6);

  return (
    <div className="space-y-5">
      <form action={validarAction} className="space-y-4">
        <FormField
          label="Código de cierre"
          htmlFor="codigo"
          description="Ingresá el código de 6 dígitos generado por el administrador."
        >
          <input
            id="codigo"
            name="codigo"
            type="text"
            inputMode="numeric"
            value={codigoLimpio}
            onChange={(event) => setCodigo(event.target.value)}
            placeholder="000000"
            className="app-input text-center text-xl font-semibold tracking-[0.3em]"
          />
        </FormField>

        <ValidarButton />

        {validacionState.message ? (
          <AlertBox variant={validacionState.ok ? "success" : "danger"}>
            <p>{validacionState.message}</p>

            {validacionState.ok ? (
              <p className="mt-2 text-xs">
                Importe autorizado: {formatMoney(validacionState.importe)}
              </p>
            ) : null}
          </AlertBox>
        ) : null}
      </form>

      {validacionState.ok ? (
        <form action={confirmarAction} className="space-y-4">
          <input type="hidden" name="codigo" value={codigoLimpio} />

          <AlertBox variant="warning" title="Confirmación final">
            Al confirmar, tu caja quedará en $0 y el código no podrá volver a
            utilizarse.
          </AlertBox>

          <ConfirmarButton />

          {confirmacionState.message ? (
            <AlertBox variant={confirmacionState.ok ? "success" : "danger"}>
              {confirmacionState.message}
            </AlertBox>
          ) : null}
        </form>
      ) : null}
    </div>
  );
}
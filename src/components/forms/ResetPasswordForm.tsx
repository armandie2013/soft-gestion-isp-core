"use client";

import { useFormState, useFormStatus } from "react-dom";
import { KeyRound, Loader2 } from "lucide-react";
import {
  resetPasswordUsuarioAction,
  type ResetPasswordUsuarioActionState,
} from "@/actions/usuario.actions";

type ResetPasswordFormProps = {
  usuarioId: string;
};

const initialState: ResetPasswordUsuarioActionState = {
  ok: false,
  message: "",
  passwordTemporal: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generando...
        </>
      ) : (
        <>
          <KeyRound className="h-4 w-4" />
          Generar contraseña temporal
        </>
      )}
    </button>
  );
}

export function ResetPasswordForm({ usuarioId }: ResetPasswordFormProps) {
  const [state, formAction] = useFormState(
    resetPasswordUsuarioAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={usuarioId} />

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/70 dark:bg-amber-950/30">
        <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
          Reset de contraseña
        </p>

        <p className="mt-2 text-sm leading-6 text-amber-700 dark:text-amber-300">
          El administrador no define la contraseña. El sistema generará una clave
          temporal automática y el usuario deberá cambiarla al volver a iniciar sesión.
        </p>
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

      {state.ok && state.passwordTemporal ? (
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/70 dark:bg-cyan-950/40">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Contraseña temporal
          </p>

          <div className="mt-2 rounded-xl border border-cyan-200 bg-white px-3 py-3 font-mono text-sm font-semibold text-slate-950 dark:border-cyan-900/70 dark:bg-slate-950 dark:text-cyan-200">
            {state.passwordTemporal}
          </div>

          <p className="mt-2 text-xs leading-5 text-cyan-700 dark:text-cyan-300">
            Copiala ahora. Por seguridad, esta clave no se volverá a mostrar.
          </p>
        </div>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
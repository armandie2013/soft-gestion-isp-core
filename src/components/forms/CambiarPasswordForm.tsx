"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2 } from "lucide-react";
import {
  cambiarPasswordAction,
  type CambiarPasswordActionState,
} from "@/actions/auth.actions";

const initialState: CambiarPasswordActionState = {
  ok: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-sm font-semibold text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Actualizando...
        </>
      ) : (
        <>
          <KeyRound className="h-4 w-4" />
          Cambiar contraseña
        </>
      )}
    </button>
  );
}

export function CambiarPasswordForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(cambiarPasswordAction, initialState);

  useEffect(() => {
    if (state.ok && state.redirectTo) {
      router.push(state.redirectTo);
      router.refresh();
    }
  }, [router, state.ok, state.redirectTo]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="actualPassword" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Contraseña actual
        </label>
        <input
          id="actualPassword"
          name="actualPassword"
          type="password"
          placeholder="Contraseña temporal o actual"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="nuevaPassword" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Nueva contraseña
        </label>
        <input
          id="nuevaPassword"
          name="nuevaPassword"
          type="password"
          placeholder="Mínimo 8 caracteres"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="confirmarPassword" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Confirmar nueva contraseña
        </label>
        <input
          id="confirmarPassword"
          name="confirmarPassword"
          type="password"
          placeholder="Repetí la nueva contraseña"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        />
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

      <SubmitButton />
    </form>
  );
}
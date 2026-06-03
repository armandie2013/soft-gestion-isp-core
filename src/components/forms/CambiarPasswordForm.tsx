// src/components/forms/CambiarPasswordForm.tsx

"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
} from "lucide-react";
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
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-500/20 bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-cyan-300/20 dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:h-11"
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

function PasswordField({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  visible,
  onToggle,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300"
      >
        {label}
      </label>

      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="h-10 w-full rounded-2xl border border-slate-300 bg-white/90 px-3 pl-10 pr-11 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:placeholder:text-transparent focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-600 dark:focus:border-cyan-500 sm:h-11"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export function CambiarPasswordForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(cambiarPasswordAction, initialState);

  const [mostrarActual, setMostrarActual] = useState(false);
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const currentState: CambiarPasswordActionState = state ?? initialState;

  useEffect(() => {
    if (currentState.ok && currentState.redirectTo) {
      router.push(currentState.redirectTo);
      router.refresh();
    }
  }, [router, currentState.ok, currentState.redirectTo]);

  return (
    <form action={formAction} className="space-y-3.5">
      <PasswordField
        id="actualPassword"
        name="actualPassword"
        label="Contraseña actual"
        placeholder="Temporal o actual"
        autoComplete="current-password"
        visible={mostrarActual}
        onToggle={() => setMostrarActual((value) => !value)}
      />

      <PasswordField
        id="nuevaPassword"
        name="nuevaPassword"
        label="Nueva contraseña"
        placeholder="Mínimo 8 caracteres"
        autoComplete="new-password"
        visible={mostrarNueva}
        onToggle={() => setMostrarNueva((value) => !value)}
      />

      <PasswordField
        id="confirmarPassword"
        name="confirmarPassword"
        label="Confirmar contraseña"
        placeholder="Repetir nueva contraseña"
        autoComplete="new-password"
        visible={mostrarConfirmar}
        onToggle={() => setMostrarConfirmar((value) => !value)}
      />

      {currentState.message ? (
        <div
          className={
            currentState.ok
              ? "flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }
        >
          {currentState.ok ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}

          <span>{currentState.message}</span>
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
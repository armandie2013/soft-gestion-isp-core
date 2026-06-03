"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { loginAction, type LoginActionState } from "@/actions/auth.actions";

const initialState: LoginActionState = {
  ok: false,
  message: "",
  redirectTo: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-5 text-sm font-semibold text-cyan-800 shadow-sm transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Ingresando...
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" />
          Iniciar sesión
        </>
      )}
    </button>
  );
}

function InputField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:placeholder:text-transparent focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
      />
    </div>
  );
}

function PasswordField({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor="password"
        className="text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        Contraseña
      </label>

      <div className="relative">
        <input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Ingresá tu contraseña"
          className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-3 pr-11 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:placeholder:text-transparent focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
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

export function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(loginAction, initialState);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const currentState: LoginActionState = state ?? initialState;

  useEffect(() => {
    if (currentState.ok && currentState.redirectTo) {
      router.push(currentState.redirectTo);
      router.refresh();
    }
  }, [router, currentState.ok, currentState.redirectTo]);

  return (
    <form action={formAction} className="space-y-4">
      <InputField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="usuario@demo.com"
      />

      <PasswordField
        visible={mostrarPassword}
        onToggle={() => setMostrarPassword((value) => !value)}
      />

      {currentState.message ? (
        <div
          className={
            currentState.ok
              ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }
        >
          {currentState.message}
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
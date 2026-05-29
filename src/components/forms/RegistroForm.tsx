"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";
import { registroAction, type RegistroActionState } from "@/actions/auth.actions";

const initialState: RegistroActionState = {
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
          Registrando...
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Registrarme
        </>
      )}
    </button>
  );
}

export function RegistroForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(registroAction, initialState);

  useEffect(() => {
    if (state.ok) {
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 900);

      return () => clearTimeout(timeout);
    }
  }, [router, state.ok]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="nombre"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Nombre
          </label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="apellido"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Apellido
          </label>

          <input
            id="apellido"
            name="apellido"
            type="text"
            placeholder="Apellido"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="dni"
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          DNI
        </label>

        <input
          id="dni"
          name="dni"
          type="text"
          inputMode="numeric"
          placeholder="Solo números"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="usuario@demo.com"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Contraseña
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="confirmarPassword"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Confirmar contraseña
          </label>

          <input
            id="confirmarPassword"
            name="confirmarPassword"
            type="password"
            placeholder="Repetí la contraseña"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
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
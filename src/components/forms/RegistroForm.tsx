"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
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
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-5 text-sm font-semibold text-cyan-800 shadow-sm transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
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

function InputField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  inputMode,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
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
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:placeholder:text-transparent focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
      />
    </div>
  );
}

function PasswordField({
  id,
  name,
  label,
  placeholder,
  visible,
  onToggle,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete="new-password"
          placeholder={placeholder}
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

export function RegistroForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(registroAction, initialState);

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] =
    useState(false);

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
        <InputField
          id="nombre"
          name="nombre"
          label="Nombre"
          placeholder="Nombre"
          autoComplete="given-name"
        />

        <InputField
          id="apellido"
          name="apellido"
          label="Apellido"
          placeholder="Apellido"
          autoComplete="family-name"
        />
      </div>

      <InputField
        id="dni"
        name="dni"
        label="DNI"
        placeholder="Solo números"
        inputMode="numeric"
        autoComplete="off"
      />

      <InputField
        id="email"
        name="email"
        label="Email"
        type="email"
        placeholder="usuario@demo.com"
        autoComplete="email"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <PasswordField
          id="password"
          name="password"
          label="Contraseña"
          placeholder="Mínimo 8 caracteres"
          visible={mostrarPassword}
          onToggle={() => setMostrarPassword((value) => !value)}
        />

        <PasswordField
          id="confirmarPassword"
          name="confirmarPassword"
          label="Confirmar contraseña"
          placeholder="Repetí la contraseña"
          visible={mostrarConfirmarPassword}
          onToggle={() => setMostrarConfirmarPassword((value) => !value)}
        />
      </div>

      {state.message ? (
        <div
          className={
            state.ok
              ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }
        >
          {state.message}
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
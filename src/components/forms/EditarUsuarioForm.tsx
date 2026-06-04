// src/components/forms/EditarUsuarioForm.tsx

"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Banknote, Loader2, Save, UserCog } from "lucide-react";
import {
  actualizarUsuarioAction,
  type UsuarioActionState,
} from "@/actions/usuario.actions";
import type { UserRole, UsuarioSafe } from "@/types/usuario.types";

type EditarUsuarioFormProps = {
  usuario: UsuarioSafe;
};

const LIMITE_CAJA_MINIMO = 100000;

const initialState: UsuarioActionState = {
  ok: false,
  message: "",
};

const inputClass =
  "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white";

function extraerEntero(value?: number | string | null) {
  if (value === null || value === undefined) return "";

  const raw = String(value).trim();

  if (!raw) return "";

  const sinMoneda = raw.replace(/\$/g, "").replace(/\s/g, "");
  const parteEntera = sinMoneda.includes(",")
    ? sinMoneda.split(",")[0]
    : sinMoneda;

  return parteEntera.replace(/\D/g, "");
}

function formatCurrencyFromDigits(digits: string) {
  const cleanDigits = extraerEntero(digits);

  if (!cleanDigits) return "$ ";

  const formattedInteger = cleanDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},00`;
}

function formatMoney(value?: number | null) {
  const number = Number(value || 0);
  const [integerPart, decimalPart] = number.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-3 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Guardando
        </>
      ) : (
        <>
          <Save className="h-3.5 w-3.5" />
          Guardar cambios
        </>
      )}
    </button>
  );
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
    >
      {children}
    </label>
  );
}

function LimiteCajaInput({ defaultValue }: { defaultValue?: number | null }) {
  const initialDigits = useMemo(() => {
    return extraerEntero(defaultValue || LIMITE_CAJA_MINIMO);
  }, [defaultValue]);

  const [digitsValue, setDigitsValue] = useState(initialDigits);
  const [displayValue, setDisplayValue] = useState(
    formatCurrencyFromDigits(initialDigits),
  );

  function updateValue(nextValue: string) {
    const nextDigits = extraerEntero(nextValue);
    setDigitsValue(nextDigits);
    setDisplayValue(formatCurrencyFromDigits(nextDigits));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const allowedControlKeys = [
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "Escape",
      "Enter",
    ];

    if (allowedControlKeys.includes(event.key)) return;
    if (event.ctrlKey || event.metaKey) return;

    if (event.key === "Backspace") {
      event.preventDefault();
      updateValue(digitsValue.slice(0, -1));
      return;
    }

    if (event.key === "Delete") {
      event.preventDefault();
      updateValue("");
      return;
    }

    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      updateValue(digitsValue === "0" ? event.key : `${digitsValue}${event.key}`);
      return;
    }

    event.preventDefault();
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    updateValue(event.clipboardData.getData("text"));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    updateValue(event.target.value);
  }

  return (
    <>
      <input type="hidden" name="limiteCajaCobrador" value={digitsValue} />

      <input
        id="limiteCajaCobradorDisplay"
        type="text"
        inputMode="numeric"
        value={displayValue}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onChange={handleChange}
        placeholder="$ 100.000,00"
        className="h-9 w-full rounded-xl border border-cyan-300 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-cyan-800 dark:bg-slate-950/60 dark:text-white"
      />
    </>
  );
}

export function EditarUsuarioForm({ usuario }: EditarUsuarioFormProps) {
  const router = useRouter();
  const [rolSeleccionado, setRolSeleccionado] = useState<UserRole>(usuario.rol);
  const [state, formAction] = useFormState(actualizarUsuarioAction, initialState);

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  const limiteActual =
    usuario.rol === "cobrador"
      ? usuario.limiteCajaCobrador || LIMITE_CAJA_MINIMO
      : LIMITE_CAJA_MINIMO;

  return (
    <form
      action={formAction}
      className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5"
    >
      <input type="hidden" name="id" value={usuario.id} />

      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
          <UserCog className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Datos del usuario
          </p>

          <h2 className="mt-0.5 truncate text-sm font-medium text-slate-950 dark:text-white">
            {usuario.apellido}, {usuario.nombre}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
            El administrador puede cambiar rol, estado y configuración operativa.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

          <input
            id="nombre"
            name="nombre"
            type="text"
            defaultValue={usuario.nombre}
            className={inputClass}
          />
        </div>

        <div>
          <FieldLabel htmlFor="apellido">Apellido</FieldLabel>

          <input
            id="apellido"
            name="apellido"
            type="text"
            defaultValue={usuario.apellido}
            className={inputClass}
          />
        </div>

        <div>
          <FieldLabel htmlFor="dni">DNI</FieldLabel>

          <input
            id="dni"
            name="dni"
            type="text"
            inputMode="numeric"
            defaultValue={usuario.dni}
            className={inputClass}
          />
        </div>

        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>

          <input
            id="email"
            name="email"
            type="email"
            defaultValue={usuario.email}
            className={inputClass}
          />
        </div>
      </div>

      <div
        className={`mt-3 grid gap-3 ${
          rolSeleccionado === "cobrador"
            ? "md:grid-cols-2 xl:grid-cols-[minmax(180px,220px)_minmax(180px,220px)_minmax(260px,1fr)_minmax(150px,190px)]"
            : "md:grid-cols-2 xl:grid-cols-[minmax(180px,220px)_minmax(180px,220px)_1fr]"
        }`}
      >
        <div>
          <FieldLabel htmlFor="rol">Rol</FieldLabel>

          <select
            id="rol"
            name="rol"
            value={rolSeleccionado}
            onChange={(event) =>
              setRolSeleccionado(event.target.value as UserRole)
            }
            className={inputClass}
          >
            <option value="admin">Administrador</option>
            <option value="cobrador">Cobrador</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>

        <div>
          <FieldLabel htmlFor="estado">Estado</FieldLabel>

          <select
            id="estado"
            name="estado"
            defaultValue={usuario.estado}
            className={inputClass}
          >
            <option value="activo">Activo</option>
            <option value="suspendido">Suspendido</option>
          </select>
        </div>

        {rolSeleccionado === "cobrador" ? (
          <>
            <div>
              <FieldLabel htmlFor="limiteCajaCobradorDisplay">
                Límite máximo de caja
              </FieldLabel>

              <LimiteCajaInput defaultValue={limiteActual} />
            </div>

            <div className="rounded-xl border border-cyan-300 bg-cyan-50 px-3 py-2 dark:border-cyan-900/70 dark:bg-cyan-950/30">
              <div className="flex items-center gap-2">
                <Banknote className="h-3.5 w-3.5 text-cyan-800 dark:text-cyan-300" />

                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-cyan-800 dark:text-cyan-300">
                  Mínimo
                </p>
              </div>

              <p className="mt-1 text-sm font-medium text-slate-950 dark:text-white">
                {formatMoney(LIMITE_CAJA_MINIMO)}
              </p>
            </div>
          </>
        ) : null}
      </div>

      {state.message ? (
        <div
          className={`mt-3 rounded-2xl border px-3 py-2 text-xs leading-5 ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <div className="mt-3 flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
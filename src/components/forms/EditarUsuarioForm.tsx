"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Loader2, Save, WalletCards } from "lucide-react";
import {
  actualizarUsuarioAction,
  type UsuarioActionState,
} from "@/actions/usuario.actions";
import type { UserRole, UsuarioSafe } from "@/types/usuario.types";

type EditarUsuarioFormProps = {
  usuario: UsuarioSafe;
};

const initialState: UsuarioActionState = {
  ok: false,
  message: "",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function limpiarNumeroEntero(value: string) {
  return value.replace(/\D/g, "");
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-sm font-semibold text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Guardando...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Guardar cambios
        </>
      )}
    </button>
  );
}

export function EditarUsuarioForm({ usuario }: EditarUsuarioFormProps) {
  const router = useRouter();

  const [state, formAction] = useFormState(
    actualizarUsuarioAction,
    initialState,
  );

  const [rolSeleccionado, setRolSeleccionado] = useState<UserRole>(
    usuario.rol,
  );

  const [limiteCajaTexto, setLimiteCajaTexto] = useState(
    String(usuario.limiteCajaCobrador || 100000),
  );

  const limiteCajaNumerico = Number(limiteCajaTexto || 0);
  const limiteCajaParaEnviar =
    limiteCajaNumerico >= 100000 ? limiteCajaNumerico : 100000;

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={usuario.id} />

      <div className="grid gap-4 md:grid-cols-2">
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
            defaultValue={usuario.nombre}
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
            defaultValue={usuario.apellido}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
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
            defaultValue={usuario.dni}
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
            defaultValue={usuario.email}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="rol"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Rol
          </label>

          <select
            id="rol"
            name="rol"
            value={rolSeleccionado}
            onChange={(event) => {
              const nuevoRol = event.target.value as UserRole;
              setRolSeleccionado(nuevoRol);

              if (nuevoRol === "cobrador" && !limiteCajaTexto) {
                setLimiteCajaTexto("100000");
              }
            }}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="admin">Administrador</option>
            <option value="cobrador">Cobrador</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="estado"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Estado
          </label>

          <select
            id="estado"
            name="estado"
            defaultValue={usuario.estado}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="activo">Activo</option>
            <option value="suspendido">Suspendido</option>
          </select>
        </div>
      </div>

      {rolSeleccionado === "cobrador" ? (
        <div className="rounded-[1.4rem] border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/70 dark:bg-amber-950/30">
          <div className="mb-3 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              <WalletCards className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                Límite de caja
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-200">
                Si la caja actual del cobrador más un nuevo pago supera este
                límite, el sistema bloqueará el cobro y pedirá cerrar caja.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="space-y-1.5">
              <label
                htmlFor="limiteCajaCobradorVisible"
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Máximo permitido en caja
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  $
                </span>

                <input
                  id="limiteCajaCobradorVisible"
                  type="text"
                  inputMode="numeric"
                  value={limiteCajaTexto}
                  onChange={(event) => {
                    setLimiteCajaTexto(limpiarNumeroEntero(event.target.value));
                  }}
                  placeholder="100000"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-8 pr-3 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:placeholder:text-transparent focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <input
                type="hidden"
                name="limiteCajaCobrador"
                value={limiteCajaParaEnviar}
              />

              <p className="text-xs leading-5 text-amber-800 dark:text-amber-200">
                Se guardará como{" "}
                <span className="font-semibold">
                  {formatMoney(limiteCajaParaEnviar)}
                </span>
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-white px-3 py-2 text-xs text-amber-800 dark:border-amber-900/70 dark:bg-slate-950/60 dark:text-amber-200 sm:min-w-52">
              <p className="font-semibold uppercase tracking-[0.12em]">
                Mínimo permitido
              </p>

              <p className="mt-1 text-sm font-semibold">
                {formatMoney(100000)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <input
          type="hidden"
          name="limiteCajaCobrador"
          value={
            usuario.limiteCajaCobrador && usuario.limiteCajaCobrador >= 100000
              ? usuario.limiteCajaCobrador
              : 100000
          }
        />
      )}

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

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/usuarios")}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
        >
          Volver
        </button>

        <SubmitButton />
      </div>
    </form>
  );
}
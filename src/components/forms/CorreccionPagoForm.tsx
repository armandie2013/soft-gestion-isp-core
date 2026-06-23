"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import {
  corregirPagoCobradorAction,
  type CorreccionPagoActionState,
} from "@/actions/correccion-pago.actions";
import { AlertBox } from "@/components/ui/AlertBox";
import type { CorreccionPagoContextoSafe } from "@/types/cobro.types";

const initialState: CorreccionPagoActionState = {
  ok: false,
  message: "",
};

type CorreccionPagoFormProps = {
  contexto: CorreccionPagoContextoSafe;
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function parseMoneyInput(value: string) {
  const normalized = value
    .replace(/\$/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const number = Number(normalized);

  if (!Number.isFinite(number)) return 0;

  return number;
}

function formatCurrencyInputFromDigits(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "$ 0,00";
  }

  const cents = Number(digits);
  const amount = cents / 100;

  return formatMoney(amount);
}

function formatDateSafe(value: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-500 dark:text-white dark:hover:bg-red-400 sm:w-auto"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <CheckCircle2 className="h-4 w-4" />
      )}
      Confirmar corrección
    </button>
  );
}

export function CorreccionPagoForm({ contexto }: CorreccionPagoFormProps) {
  const [state, formAction] = useFormState(
    corregirPagoCobradorAction,
    initialState,
  );

  const [importeReal, setImporteReal] = useState(
    formatMoney(contexto.importeValidoActual || contexto.importeRegistrado),
  );

  const importeRealNumber = useMemo(
    () => parseMoneyInput(importeReal),
    [importeReal],
  );

  const diferencia = Math.max(contexto.importeRegistrado - importeRealNumber, 0);
  const cajaSuficiente =
    contexto.cobroYaCerrado || contexto.saldoCajaActual >= diferencia;
  const importeValido =
    importeRealNumber >= 0 && importeRealNumber < contexto.importeRegistrado;
  const puedeEnviar = contexto.puedeCorregir && importeValido && cajaSuficiente;

  useEffect(() => {
    if (state.ok && state.correccionMovimientoId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.ok, state.correccionMovimientoId]);

  function handleImporteRealChange(value: string) {
    setImporteReal(formatCurrencyInputFromDigits(value));
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="movimientoId" value={contexto.movimientoId} />
      <input type="hidden" name="clienteId" value={contexto.clienteId} />
      <input type="hidden" name="cobradorId" value={contexto.cobradorId} />
      <input
        type="hidden"
        name="facturaAsociadaId"
        value={contexto.facturaAsociadaId}
      />

      {state.message ? (
        <AlertBox variant={state.ok ? "success" : "danger"}>
          {state.message}
        </AlertBox>
      ) : null}

      {!contexto.puedeCorregir ? (
        <AlertBox variant="warning" title="Este pago no se puede corregir">
          {contexto.motivoNoPuedeCorregir ||
            "El comprobante no está disponible para corrección."}
        </AlertBox>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            Registrado
          </p>

          <p className="mt-1 text-lg font-medium text-slate-950 dark:text-white">
            {formatMoney(contexto.importeRegistrado)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            Real recibido
          </p>

          <p className="mt-1 text-lg font-medium text-cyan-700 dark:text-cyan-300">
            {formatMoney(importeRealNumber)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            A corregir
          </p>

          <p className="mt-1 text-lg font-medium text-red-700 dark:text-red-300">
            {formatMoney(diferencia)}
          </p>
        </div>
      </div>

      <div
        className={`rounded-[1.35rem] border p-4 ${
          contexto.cobroYaCerrado
            ? "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200"
            : "border-cyan-200 bg-cyan-50 text-cyan-900 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200"
        }`}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <p className="text-sm font-medium">
              {contexto.cobroYaCerrado
                ? "Este cobro pertenece a una caja ya cerrada"
                : "Este cobro todavía está en caja abierta"}
            </p>

            <div className="mt-2 space-y-1 text-xs leading-5">
              {contexto.cobroYaCerrado ? (
                <>
                  <p>
                    La corrección no va a descontar la caja actual del cobrador.
                  </p>
                  <p>
                    Se generará un ajuste post-cierre asociado al cierre anterior.
                  </p>
                  <p>
                    Cierre asociado:{" "}
                    {contexto.cierreCajaId
                      ? contexto.cierreCajaId.slice(-6).toUpperCase()
                      : "-"}{" "}
                    · {formatDateSafe(contexto.cierreCajaFecha)}
                  </p>
                </>
              ) : (
                <>
                  <p>La diferencia se descontará de la caja actual.</p>
                  <p>
                    Los códigos pendientes de cierre del cobrador serán
                    cancelados.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="importeReal"
                className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
              >
                Importe real recibido por el cobrador
              </label>

              <input
                id="importeReal"
                name="importeReal"
                type="text"
                inputMode="numeric"
                value={importeReal}
                onChange={(event) =>
                  handleImporteRealChange(event.target.value)
                }
                disabled={!contexto.puedeCorregir || state.ok}
                className="mt-2 h-11 w-full rounded-2xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
              />

              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Escribí solo números. El sistema lo formatea automáticamente.
              </p>

              {!importeValido ? (
                <p className="mt-2 text-xs leading-5 text-red-700 dark:text-red-300">
                  El importe real debe ser menor al importe registrado y no puede
                  ser negativo.
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="motivo"
                className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
              >
                Motivo de la corrección
              </label>

              <textarea
                id="motivo"
                name="motivo"
                rows={4}
                maxLength={300}
                disabled={!contexto.puedeCorregir || state.ok}
                placeholder="Ejemplo: el cliente solo abonó una parte del total y el pago fue registrado por el importe completo."
                className="mt-2 w-full resize-none rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-4 text-amber-900 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="text-sm font-medium">Impacto de esta corrección</p>

              <div className="mt-2 space-y-1 text-xs leading-5">
                <p>El comprobante original queda corregido parcialmente.</p>
                <p>El cliente vuelve a deber {formatMoney(diferencia)}.</p>

                {contexto.cobroYaCerrado ? (
                  <p>
                    Se registra diferencia post-cierre por{" "}
                    {formatMoney(diferencia)}.
                  </p>
                ) : (
                  <p>La caja del cobrador baja {formatMoney(diferencia)}.</p>
                )}

                {!contexto.cobroYaCerrado ? (
                  <p>Los códigos pendientes de cierre del cobrador se cancelan.</p>
                ) : null}
              </div>
            </div>
          </div>

          {!cajaSuficiente ? (
            <div className="mt-3 rounded-2xl border border-red-300 bg-red-50 p-3 text-xs leading-5 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300">
              La caja actual del cobrador no alcanza para descontar esta
              diferencia. Caja actual: {formatMoney(contexto.saldoCajaActual)}.
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-end">
        <SubmitButton disabled={!puedeEnviar || state.ok} />
      </div>
    </form>
  );
}
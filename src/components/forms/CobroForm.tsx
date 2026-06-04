"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CalendarDays,
  Loader2,
  Save,
  WalletCards,
} from "lucide-react";
import {
  registrarPagoCobradorAction,
  type CobroActionState,
} from "@/actions/cobro.actions";
import { AlertBox } from "@/components/ui/AlertBox";
import type { PeriodoCuentaClienteSafe } from "@/types/movimiento-financiero.types";

type CobroFormProps = {
  clienteId: string;
  periodosPendientes: PeriodoCuentaClienteSafe[];
  saldoCajaActual: number;
  limiteCajaCobrador: number;
};

const initialState: CobroActionState = {
  ok: false,
  message: "",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatInputMoney(value: string) {
  const soloNumeros = value.replace(/\D/g, "");

  if (!soloNumeros) return "";

  const numero = Number(soloNumeros) / 100;

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numero);
}

function moneyInputToNumber(value: string) {
  const soloNumeros = value.replace(/\D/g, "");

  if (!soloNumeros) return 0;

  return Number(soloNumeros) / 100;
}

function numberToInputMoney(value: number) {
  if (!value || value <= 0) return "";

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function ordenarPeriodosPendientes(periodos: PeriodoCuentaClienteSafe[]) {
  return [...periodos].sort((a, b) => {
    const anioA = a.referenciaAnio || 0;
    const anioB = b.referenciaAnio || 0;

    if (anioA !== anioB) return anioA - anioB;

    const mesA = a.referenciaMes || 0;
    const mesB = b.referenciaMes || 0;

    if (mesA !== mesB) return mesA - mesB;

    return Number(a.numeroComprobante || 0) - Number(b.numeroComprobante || 0);
  });
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-5 text-sm font-semibold text-cyan-800 shadow-sm transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Registrando pago...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Registrar pago
        </>
      )}
    </button>
  );
}

export function CobroForm({
  clienteId,
  periodosPendientes,
  saldoCajaActual,
  limiteCajaCobrador,
}: CobroFormProps) {
  const router = useRouter();

  const [state, formAction] = useFormState(
    registrarPagoCobradorAction,
    initialState,
  );

  const [facturaSeleccionadaId, setFacturaSeleccionadaId] = useState("");
  const [importeVisual, setImporteVisual] = useState("");

  const periodosOrdenados = useMemo(() => {
    return ordenarPeriodosPendientes(periodosPendientes);
  }, [periodosPendientes]);

  const primerPeriodoPendiente = periodosOrdenados[0] || null;

  const periodoSeleccionado = useMemo(() => {
    return (
      periodosOrdenados.find(
        (periodo) => periodo.facturaId === facturaSeleccionadaId,
      ) || null
    );
  }, [facturaSeleccionadaId, periodosOrdenados]);

  const limiteCaja = Math.max(Number(limiteCajaCobrador || 100000), 100000);
  const importeNumerico = moneyInputToNumber(importeVisual);
  const saldoCajaProyectado = saldoCajaActual + importeNumerico;
  const excedeLimiteCaja =
    importeNumerico > 0 && saldoCajaProyectado > limiteCaja;
  const disponibleCaja = Math.max(limiteCaja - saldoCajaActual, 0);
  const hayPeriodoSeleccionado = Boolean(periodoSeleccionado);
  const importeValido = importeNumerico > 0;
  const puedeRegistrarPago =
    hayPeriodoSeleccionado && importeValido && !excedeLimiteCaja;

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  function completarSaldo() {
    if (!periodoSeleccionado) return;

    setImporteVisual(numberToInputMoney(periodoSeleccionado.saldoPeriodo));
  }

  function handleImporteChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!periodoSeleccionado) return;

    const formateado = formatInputMoney(event.target.value);
    setImporteVisual(formateado);
  }

  if (periodosOrdenados.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200">
        <p className="text-sm font-semibold">Sin deuda pendiente</p>
        <p className="mt-1 text-sm leading-6 opacity-90">
          Este cliente no tiene períodos con saldo pendiente para cobrar.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="clienteId" value={clienteId} />

      <div className="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 text-cyan-900 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200">
        <p className="text-sm font-semibold">Regla de cobro</p>
        <p className="mt-1 text-sm leading-6 opacity-90">
          El pago se aplicará siempre al período pendiente más antiguo. Para
          cobrar un período nuevo, primero deben cancelarse los períodos
          anteriores.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Caja actual
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
              {formatMoney(saldoCajaActual)}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Límite permitido
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
              {formatMoney(limiteCaja)}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Disponible para cobrar
            </p>
            <p
              className={`mt-1 text-sm font-semibold ${
                disponibleCaja > 0
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-red-700 dark:text-red-300"
              }`}
            >
              {formatMoney(disponibleCaja)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            <CalendarDays className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Paso 1
            </p>

            <h3 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
              Seleccionar período
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Solo se habilita el período pendiente más antiguo.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="facturaAsociadaId"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
          >
            Período a pagar
          </label>

          <select
            id="facturaAsociadaId"
            name="facturaAsociadaId"
            value={facturaSeleccionadaId}
            onChange={(event) => {
              setFacturaSeleccionadaId(event.target.value);
              setImporteVisual("");
            }}
            className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="">Seleccionar período</option>

            {periodosOrdenados.map((periodo, index) => {
              const esPrimerPeriodoPendiente = index === 0;

              return (
                <option
                  key={periodo.facturaId}
                  value={periodo.facturaId}
                  disabled={!esPrimerPeriodoPendiente}
                >
                  {periodo.periodoLabel} · Factura N°{" "}
                  {periodo.numeroComprobante} · Saldo{" "}
                  {formatMoney(periodo.saldoPeriodo)}
                  {!esPrimerPeriodoPendiente
                    ? " · Bloqueado por deuda anterior"
                    : ""}
                </option>
              );
            })}
          </select>

          {primerPeriodoPendiente ? (
            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
              Próximo período habilitado:{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {primerPeriodoPendiente.periodoLabel} · Factura N°{" "}
                {primerPeriodoPendiente.numeroComprobante}
              </span>
            </p>
          ) : null}
        </div>

        {periodoSeleccionado ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/80">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Período seleccionado
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
              {periodoSeleccionado.periodoLabel} · Factura N°{" "}
              {periodoSeleccionado.numeroComprobante}
            </p>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950/60">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Original
                </p>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">
                  {formatMoney(periodoSeleccionado.importeOriginal)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950/60">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Créditos / pagos
                </p>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {formatMoney(
                    periodoSeleccionado.totalNotasCredito +
                      periodoSeleccionado.totalPagos,
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950/60">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Saldo pendiente
                </p>
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                  {formatMoney(periodoSeleccionado.saldoPeriodo)}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            <WalletCards className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Paso 2
            </p>

            <h3 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
              Ingresar importe
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              El campo se habilita únicamente después de seleccionar un período.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="importeVisual"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
          >
            Importe a cobrar
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <input
                id="importeVisual"
                type="text"
                inputMode="numeric"
                value={importeVisual}
                onChange={handleImporteChange}
                disabled={!periodoSeleccionado}
                placeholder={
                  periodoSeleccionado
                    ? "$ 0,00"
                    : "Primero seleccioná un período"
                }
                className="h-16 w-full rounded-2xl border-2 border-slate-300 bg-white px-5 text-right text-2xl font-semibold tracking-tight text-slate-950 outline-none transition placeholder:text-base placeholder:font-medium placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-80 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-600 dark:disabled:bg-slate-950 dark:disabled:text-slate-600 sm:text-3xl"
              />

              <input type="hidden" name="importe" value={importeNumerico} />
            </div>

            <button
              type="button"
              onClick={completarSaldo}
              disabled={!periodoSeleccionado}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:h-16"
            >
              Cobrar saldo
            </button>
          </div>

          {!periodoSeleccionado ? (
            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
              El importe se habilita únicamente después de seleccionar el
              período pendiente más antiguo.
            </p>
          ) : null}
        </div>
      </div>

      {excedeLimiteCaja ? (
        <div className="rounded-[1.4rem] border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div className="min-w-0">
  <p className="text-sm font-semibold">
    No se puede registrar este cobro
  </p>

  <p className="mt-1 text-sm leading-6 opacity-90">
    Tu caja alcanzó el límite operativo permitido. Para continuar registrando
    cobros, primero tenés que realizar el cierre de caja correspondiente.
  </p>
</div>
          </div>
        </div>
      ) : null}

      <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
        <div className="space-y-2">
          <label
            htmlFor="observacion"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
          >
            Observación
          </label>

          <textarea
            id="observacion"
            name="observacion"
            rows={3}
            placeholder="Opcional"
            className="w-full rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-600"
          />
        </div>
      </div>

      {state.message ? (
        <AlertBox variant={state.ok ? "success" : "danger"}>
          {state.message}
        </AlertBox>
      ) : null}

      <div className="sticky bottom-3 z-10 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push(`/cobrador/clientes/${clienteId}`)}
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
          >
            Volver
          </button>

          <SubmitButton disabled={!puedeRegistrarPago} />
        </div>
      </div>
    </form>
  );
}
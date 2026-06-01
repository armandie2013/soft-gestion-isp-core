"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2, Save } from "lucide-react";
import {
  registrarPagoCobradorAction,
  type CobroActionState,
} from "@/actions/cobro.actions";
import { AlertBox } from "@/components/ui/AlertBox";
import { FormField } from "@/components/ui/FormField";
import type { PeriodoCuentaClienteSafe } from "@/types/movimiento-financiero.types";

type CobroFormProps = {
  clienteId: string;
  periodosPendientes: PeriodoCuentaClienteSafe[];
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
  }).format(value);
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-[var(--app-primary)] px-4 text-sm font-semibold text-[var(--app-primary-foreground)] shadow-sm transition hover:bg-[var(--app-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] sm:w-auto"
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

export function CobroForm({ clienteId, periodosPendientes }: CobroFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(registrarPagoCobradorAction, initialState);
  const [facturaSeleccionadaId, setFacturaSeleccionadaId] = useState("");
  const [importe, setImporte] = useState("");

  const periodoSeleccionado = useMemo(() => {
    return (
      periodosPendientes.find(
        (periodo) => periodo.facturaId === facturaSeleccionadaId,
      ) || null
    );
  }, [facturaSeleccionadaId, periodosPendientes]);

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  function completarSaldo() {
    if (!periodoSeleccionado) return;
    setImporte(String(periodoSeleccionado.saldoPeriodo));
  }

  if (periodosPendientes.length === 0) {
    return (
      <AlertBox variant="success" title="Sin deuda pendiente">
        Este cliente no tiene períodos con saldo pendiente para cobrar.
      </AlertBox>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="clienteId" value={clienteId} />

      <AlertBox variant="info" title="Registro de pago">
        El pago se aplicará al período seleccionado y también se sumará a la caja
        actual del cobrador.
      </AlertBox>

      <FormField label="Período a pagar" htmlFor="facturaAsociadaId">
        <select
          id="facturaAsociadaId"
          name="facturaAsociadaId"
          value={facturaSeleccionadaId}
          onChange={(event) => {
            setFacturaSeleccionadaId(event.target.value);
            setImporte("");
          }}
          className="app-input"
        >
          <option value="">Seleccionar período</option>

          {periodosPendientes.map((periodo) => (
            <option key={periodo.facturaId} value={periodo.facturaId}>
              {periodo.periodoLabel} · Factura N° {periodo.numeroComprobante} ·
              Saldo {formatMoney(periodo.saldoPeriodo)}
            </option>
          ))}
        </select>
      </FormField>

      {periodoSeleccionado ? (
        <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--app-muted)]">
            Período seleccionado
          </p>

          <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
            {periodoSeleccionado.periodoLabel} · Factura N°{" "}
            {periodoSeleccionado.numeroComprobante}
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div>
              <p className="text-xs text-[var(--app-muted)]">Original</p>
              <p className="text-sm font-semibold text-[var(--app-text-strong)]">
                {formatMoney(periodoSeleccionado.importeOriginal)}
              </p>
            </div>

            <div>
              <p className="text-xs text-[var(--app-muted)]">Créditos / pagos</p>
              <p className="text-sm font-semibold text-[var(--app-success)]">
                {formatMoney(
                  periodoSeleccionado.totalNotasCredito +
                    periodoSeleccionado.totalPagos,
                )}
              </p>
            </div>

            <div>
              <p className="text-xs text-[var(--app-muted)]">Saldo pendiente</p>
              <p className="text-sm font-semibold text-[var(--app-danger)]">
                {formatMoney(periodoSeleccionado.saldoPeriodo)}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <FormField label="Importe a cobrar" htmlFor="importe">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="importe"
            name="importe"
            type="number"
            min="0"
            step="0.01"
            value={importe}
            onChange={(event) => setImporte(event.target.value)}
            placeholder="0"
            className="app-input"
          />

          <button
            type="button"
            onClick={completarSaldo}
            disabled={!periodoSeleccionado}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 text-sm font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.99]"
          >
            Cobrar saldo
          </button>
        </div>
      </FormField>

      <FormField label="Observación" htmlFor="observacion">
        <textarea
          id="observacion"
          name="observacion"
          rows={3}
          placeholder="Opcional"
          className="app-textarea"
        />
      </FormField>

      {state.message ? (
        <AlertBox variant={state.ok ? "success" : "danger"}>
          {state.message}
        </AlertBox>
      ) : null}

      <div className="sticky bottom-3 z-10 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-3 shadow-[var(--app-shadow)] backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push(`/cobrador/clientes/${clienteId}`)}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 text-sm font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99] sm:w-auto"
          >
            Volver
          </button>

          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
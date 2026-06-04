// src/components/forms/NotaFinancieraForm.tsx

"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  CheckCircle2,
  FileText,
  Loader2,
  MinusCircle,
  PlusCircle,
  Save,
  ShieldAlert,
} from "lucide-react";
import {
  crearNotaCreditoAction,
  crearNotaDebitoAction,
  type MovimientoActionState,
} from "@/actions/movimiento-financiero.actions";
import type { FacturaClienteSafe } from "@/types/movimiento-financiero.types";

type NotaFinancieraFormProps = {
  clienteId: string;
  tipo: "credito" | "debito";
  facturas: FacturaClienteSafe[];
};

const initialState: MovimientoActionState = {
  ok: false,
  message: "",
};

function formatDate(value: string) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatCompactMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$${formattedInteger},${decimalPart}`;
}

function getPeriodoFactura(factura: FacturaClienteSafe) {
  if (factura.referenciaMes && factura.referenciaAnio) {
    return `${factura.referenciaMes}/${factura.referenciaAnio}`;
  }

  return formatDate(factura.fecha);
}

function getFacturaOptionLabel(factura: FacturaClienteSafe) {
  return `N° ${factura.numeroComprobante} · ${getPeriodoFactura(
    factura,
  )} · Original ${formatCompactMoney(
    factura.importeOriginal,
  )} · Saldo ${formatCompactMoney(factura.saldoFactura)}`;
}

function SubmitButton({
  tipo,
  disabled,
}: {
  tipo: "credito" | "debito";
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  const isCredito = tipo === "credito";

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={`inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl px-3 text-xs font-medium shadow-sm transition disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] sm:w-auto ${
        isCredito
          ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
          : "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Guardando
        </>
      ) : (
        <>
          <Save className="h-3.5 w-3.5" />
          {isCredito ? "Crear nota de crédito" : "Crear nota de débito"}
        </>
      )}
    </button>
  );
}

function FieldLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
    >
      <span>{children}</span>

      {optional ? (
        <span className="text-[10px] normal-case tracking-normal text-slate-400 dark:text-slate-500">
          Opcional
        </span>
      ) : null}
    </label>
  );
}

const inputClass =
  "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white";

const selectClass =
  "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 pr-8 text-[11px] leading-none text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white sm:text-xs";

export function NotaFinancieraForm({
  clienteId,
  tipo,
  facturas,
}: NotaFinancieraFormProps) {
  const isCredito = tipo === "credito";
  const action = isCredito ? crearNotaCreditoAction : crearNotaDebitoAction;

  const [state, formAction] = useFormState(action, initialState);

  const facturasDisponibles = isCredito
    ? facturas.filter((factura) => factura.saldoFactura > 0)
    : facturas;

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="clienteId" value={clienteId} />

      <div
        className={`rounded-2xl border p-3 text-xs leading-5 ${
          isCredito
            ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300"
            : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300"
        }`}
      >
        <div className="flex gap-2">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

          <div>
            <p className="font-medium">Factura asociada obligatoria</p>

            <p className="mt-1">
              {isCredito
                ? "La nota de crédito descuenta saldo de una factura con saldo pendiente."
                : "La nota de débito suma saldo a una factura emitida."}
            </p>
          </div>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="facturaAsociadaId">Factura asociada</FieldLabel>

        <select
          id="facturaAsociadaId"
          name="facturaAsociadaId"
          defaultValue=""
          className={selectClass}
        >
          <option className="text-[11px]" value="">
            Seleccionar factura
          </option>

          {facturasDisponibles.map((factura) => (
            <option
              key={factura.id}
              value={factura.id}
              className="text-[11px]"
            >
              {getFacturaOptionLabel(factura)}
            </option>
          ))}
        </select>

        <p className="mt-1.5 text-[10px] leading-4 text-slate-500 dark:text-slate-500">
          Seleccioná la factura sobre la que se aplicará el movimiento.
        </p>

        {facturasDisponibles.length === 0 ? (
          <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300">
            {isCredito
              ? "No hay facturas con saldo disponible para aplicar una nota de crédito."
              : "No hay facturas emitidas para asociar una nota de débito."}
          </p>
        ) : null}
      </div>

      <div>
        <FieldLabel htmlFor="concepto">Concepto</FieldLabel>

        <div className="relative">
          <FileText className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

          <input
            id="concepto"
            name="concepto"
            type="text"
            placeholder={
              isCredito
                ? "Ej: Bonificación sobre factura"
                : "Ej: Cargo adicional sobre factura"
            }
            className={`${inputClass} pl-9`}
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="importe">Importe</FieldLabel>

        <input
          id="importe"
          name="importe"
          type="number"
          min="0"
          step="0.01"
          placeholder="0"
          className={inputClass}
        />
      </div>

      <div>
        <FieldLabel htmlFor="observacion" optional>
          Observación
        </FieldLabel>

        <textarea
          id="observacion"
          name="observacion"
          rows={3}
          placeholder="Opcional"
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600"
        />
      </div>

      {state.message ? (
        <div
          className={`rounded-2xl border px-3 py-2 text-xs leading-5 ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          <div className="flex gap-2">
            {state.ok ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : isCredito ? (
              <MinusCircle className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <PlusCircle className="mt-0.5 h-4 w-4 shrink-0" />
            )}

            <p>{state.message}</p>
          </div>
        </div>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton
          tipo={tipo}
          disabled={facturasDisponibles.length === 0}
        />
      </div>
    </form>
  );
}
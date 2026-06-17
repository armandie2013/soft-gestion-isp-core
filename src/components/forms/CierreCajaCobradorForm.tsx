// "use client";

// import { useState } from "react";
// import { useFormState, useFormStatus } from "react-dom";
// import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";
// import {
//   confirmarCierreCajaAction,
//   validarCodigoCierreCajaAction,
//   type CodigoCierreActionState,
// } from "@/actions/cobro.actions";
// import { AlertBox } from "@/components/ui/AlertBox";
// import { FormField } from "@/components/ui/FormField";

// const initialState: CodigoCierreActionState = {
//   ok: false,
//   message: "",
// };

// function formatMoney(value?: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function ValidarButton({ disabled }: { disabled: boolean }) {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending || disabled}
//       className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-[var(--app-primary)] px-4 text-sm font-semibold text-[var(--app-primary-foreground)] shadow-sm transition hover:bg-[var(--app-primary-hover)] disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] sm:w-auto"
//     >
//       {pending ? (
//         <>
//           <Loader2 className="h-4 w-4 animate-spin" />
//           Validando...
//         </>
//       ) : (
//         <>
//           <KeyRound className="h-4 w-4" />
//           Validar código
//         </>
//       )}
//     </button>
//   );
// }

// function ConfirmarButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-[var(--app-success)] px-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] sm:w-auto"
//     >
//       {pending ? (
//         <>
//           <Loader2 className="h-4 w-4 animate-spin" />
//           Cerrando...
//         </>
//       ) : (
//         <>
//           <CheckCircle2 className="h-4 w-4" />
//           Confirmar cierre
//         </>
//       )}
//     </button>
//   );
// }

// export function CierreCajaCobradorForm() {
//   const [codigo, setCodigo] = useState("");

//   const [validacionState, validarAction] = useFormState(
//     validarCodigoCierreCajaAction,
//     initialState,
//   );

//   const [confirmacionState, confirmarAction] = useFormState(
//     confirmarCierreCajaAction,
//     initialState,
//   );

//   const codigoLimpio = codigo.replace(/\D/g, "").slice(0, 6);
//   const codigoCompleto = codigoLimpio.length === 6;

//   function handleCodigoChange(event: React.ChangeEvent<HTMLInputElement>) {
//     const soloNumeros = event.target.value.replace(/\D/g, "").slice(0, 6);
//     setCodigo(soloNumeros);
//   }

//   return (
//     <div className="space-y-5">
//       <form action={validarAction} className="space-y-4">
//         <FormField
//           label="Código de cierre"
//           htmlFor="codigo"
//           description="Ingresá el código de 6 dígitos generado por el administrador."
//         >
//           <input
//             id="codigo"
//             name="codigo"
//             type="text"
//             inputMode="numeric"
//             autoComplete="one-time-code"
//             maxLength={6}
//             value={codigoLimpio}
//             onChange={handleCodigoChange}
//             placeholder="000000"
//             className="app-input text-center text-xl font-semibold tracking-[0.3em] placeholder:text-center placeholder:text-xl placeholder:font-semibold placeholder:tracking-[0.3em] placeholder:text-slate-300 focus:placeholder:text-transparent dark:placeholder:text-slate-700"
//           />
//         </FormField>

//         <ValidarButton disabled={!codigoCompleto} />

//         {validacionState.message ? (
//           <AlertBox variant={validacionState.ok ? "success" : "danger"}>
//             <p>{validacionState.message}</p>

//             {validacionState.ok ? (
//               <p className="mt-2 text-xs">
//                 Importe autorizado: {formatMoney(validacionState.importe)}
//               </p>
//             ) : null}
//           </AlertBox>
//         ) : null}
//       </form>

//       {validacionState.ok ? (
//         <form action={confirmarAction} className="space-y-4">
//           <input type="hidden" name="codigo" value={codigoLimpio} />

//           <AlertBox variant="warning" title="Confirmación final">
//             Al confirmar, tu caja quedará en $0 y el código no podrá volver a
//             utilizarse.
//           </AlertBox>

//           <ConfirmarButton />

//           {confirmacionState.message ? (
//             <AlertBox variant={confirmacionState.ok ? "success" : "danger"}>
//               {confirmacionState.message}
//             </AlertBox>
//           ) : null}
//         </form>
//       ) : null}
//     </div>
//   );
// }

// src/components/forms/CierreCajaCobradorForm.tsx

"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  Loader2,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";
import {
  confirmarCierreCajaAction,
  validarCodigoCierreCajaAction,
  type CodigoCierreActionState,
} from "@/actions/cobro.actions";
import { AlertBox } from "@/components/ui/AlertBox";

const initialState: CodigoCierreActionState = {
  ok: false,
  message: "",
};

const DURACION_ANIMACION_CIERRE_MS = 10000;

type CierreCajaCobradorFormProps = {
  tieneSaldo: boolean;
};

function formatMoney(value?: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function limpiarCodigo(value: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 6);
}

function esperar(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function ValidarCodigoButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-500 bg-gradient-to-r from-cyan-600 to-sky-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20 transition hover:from-cyan-700 hover:to-sky-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99] dark:border-cyan-300/70 dark:from-cyan-400 dark:to-sky-400 dark:text-slate-950 dark:shadow-cyan-500/20 dark:hover:from-cyan-300 dark:hover:to-sky-300"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Validando...
        </>
      ) : (
        <>
          <KeyRound className="h-4 w-4" />
          Validar código
        </>
      )}
    </button>
  );
}

function ConfirmarCierreButton({ processing }: { processing: boolean }) {
  return (
    <button
      type="submit"
      disabled={processing}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-emerald-500 bg-gradient-to-r from-emerald-600 to-green-600 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:from-emerald-700 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-emerald-300/70 dark:from-emerald-400 dark:to-green-400 dark:text-slate-950 dark:shadow-emerald-500/20 dark:hover:from-emerald-300 dark:hover:to-green-300"
    >
      {processing ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Confirmando cierre...
        </>
      ) : (
        <>
          <CheckCircle2 className="h-4 w-4" />
          Confirmar cierre
        </>
      )}
    </button>
  );
}

export function CierreCajaCobradorForm({
  tieneSaldo,
}: CierreCajaCobradorFormProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [codigoDigits, setCodigoDigits] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [codigoValidado, setCodigoValidado] = useState(false);
  const [importeValidado, setImporteValidado] = useState<number | undefined>();
  const [procesandoCierre, setProcesandoCierre] = useState(false);
  const [mostrarResultadoOk, setMostrarResultadoOk] = useState(false);
  const [confirmacionState, setConfirmacionState] =
    useState<CodigoCierreActionState>(initialState);

  const [validacionState, validarAction] = useFormState(
    validarCodigoCierreCajaAction,
    initialState,
  );

  const codigoLimpio = codigoDigits.join("");
  const codigoCompleto = codigoDigits.every((digit) => /^\d$/.test(digit));

  useEffect(() => {
    if (!validacionState.message) {
      return;
    }

    if (validacionState.ok) {
      setCodigoValidado(true);
      setImporteValidado(validacionState.importe);
      setConfirmacionState(initialState);
    }
  }, [validacionState]);

  function abrirModal() {
    if (!tieneSaldo && !procesandoCierre && !mostrarResultadoOk) return;

    setModalAbierto(true);
    setMostrarResultadoOk(false);
    setConfirmacionState(initialState);
  }

  function cerrarModal() {
    if (procesandoCierre) return;

    setModalAbierto(false);
  }

  function limpiarValidacion() {
    setCodigoValidado(false);
    setImporteValidado(undefined);
    setMostrarResultadoOk(false);
    setConfirmacionState(initialState);
  }

  function setDigitAt(index: number, digit: string) {
    setCodigoDigits((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    limpiarValidacion();
  }

  function distribuirCodigoDesde(index: number, value: string) {
    const digits = limpiarCodigo(value).split("");

    if (digits.length === 0) return;

    setCodigoDigits((current) => {
      const next = [...current];

      for (let i = 0; i < digits.length; i += 1) {
        const position = index + i;

        if (position > 5) break;

        next[position] = digits[i];
      }

      return next;
    });

    limpiarValidacion();

    const nextFocusIndex = Math.min(index + digits.length, 5);

    window.setTimeout(() => {
      inputRefs.current[nextFocusIndex]?.focus();
      inputRefs.current[nextFocusIndex]?.select();
    }, 0);
  }

  function handleCodigoChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const value = event.target.value;

    if (value.length > 1) {
      distribuirCodigoDesde(index, value);
      return;
    }

    const digit = value.replace(/\D/g, "").slice(0, 1);

    setDigitAt(index, digit);

    if (digit && index < 5) {
      window.setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }, 0);
    }
  }

  function handleCodigoKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace") {
      event.preventDefault();

      if (codigoDigits[index]) {
        setDigitAt(index, "");
        return;
      }

      if (index > 0) {
        setDigitAt(index - 1, "");

        window.setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
          inputRefs.current[index - 1]?.select();
        }, 0);
      }

      return;
    }

    if (event.key === "Delete") {
      event.preventDefault();
      setDigitAt(index, "");
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.select();
      return;
    }

    if (event.key === "ArrowRight" && index < 5) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      inputRefs.current[0]?.focus();
      inputRefs.current[0]?.select();
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      inputRefs.current[5]?.focus();
      inputRefs.current[5]?.select();
      return;
    }

    if (/^\d$/.test(event.key)) {
      event.preventDefault();

      setDigitAt(index, event.key);

      if (index < 5) {
        window.setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
          inputRefs.current[index + 1]?.select();
        }, 0);
      }

      return;
    }

    if (
      event.key === "Tab" ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
  }

  function handleCodigoPaste(
    index: number,
    event: ClipboardEvent<HTMLInputElement>,
  ) {
    event.preventDefault();

    const pasted = event.clipboardData.getData("text");

    distribuirCodigoDesde(index, pasted);
  }

  function handleValidarSubmit(event: FormEvent<HTMLFormElement>) {
    if (!codigoCompleto) {
      event.preventDefault();
    }
  }

  function handleConfirmarSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (procesandoCierre) return;

    const formData = new FormData(event.currentTarget);

    setProcesandoCierre(true);
    setMostrarResultadoOk(false);
    setConfirmacionState(initialState);

    void (async () => {
      await esperar(DURACION_ANIMACION_CIERRE_MS);

      try {
        const result = await confirmarCierreCajaAction(initialState, formData);

        setConfirmacionState(result);
        setProcesandoCierre(false);

        if (result.ok) {
          setMostrarResultadoOk(true);
        }
      } catch {
        setConfirmacionState({
          ok: false,
          message: "No se pudo confirmar el cierre. Intentá nuevamente.",
        });
        setProcesandoCierre(false);
      }
    })();
  }

  return (
    <>
      {tieneSaldo || procesandoCierre || mostrarResultadoOk ? (
        <button
          type="button"
          onClick={abrirModal}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-500 bg-gradient-to-r from-cyan-600 to-sky-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20 transition hover:from-cyan-700 hover:to-sky-700 active:scale-[0.99] dark:border-cyan-300/70 dark:from-cyan-400 dark:to-sky-400 dark:text-slate-950 dark:shadow-cyan-500/20 dark:hover:from-cyan-300 dark:hover:to-sky-300 sm:w-auto"
        >
          <KeyRound className="h-4 w-4" />
          Validar código
        </button>
      ) : (
        <div className="rounded-[1.35rem] border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-medium">Tu caja está en $0.</p>

              <p className="mt-1 text-xs leading-5 opacity-90">
                No hay saldo pendiente para cerrar.
              </p>
            </div>
          </div>
        </div>
      )}

      {modalAbierto ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-[430px] overflow-hidden rounded-[1.7rem] border border-cyan-200 bg-white text-slate-950 shadow-2xl shadow-slate-950/30 dark:border-cyan-700/70 dark:bg-slate-900 dark:text-white dark:shadow-cyan-950/20">
            {procesandoCierre ? (
              <div className="p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 ring-1 ring-cyan-200 dark:bg-cyan-950/40 dark:ring-cyan-700/70">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-700/25 dark:bg-cyan-400 dark:text-slate-950">
                    <Loader2 className="h-7 w-7 animate-spin" />
                  </div>
                </div>

                <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Confirmando cierre
                </p>

                <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  Registrando el retiro
                </h3>

                <p className="mx-auto mt-2 max-w-[300px] text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Esperá un momento. Estamos cerrando la caja y dejando el saldo
                  en cero.
                </p>

                <div className="mt-5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 w-full animate-pulse rounded-full bg-cyan-500 dark:bg-cyan-400" />
                </div>
              </div>
            ) : mostrarResultadoOk && confirmacionState.ok ? (
              <div>
                <div className="border-b border-emerald-200 bg-emerald-50 px-5 py-6 text-center dark:border-emerald-900/70 dark:bg-emerald-950/25">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-800/80">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                    Cierre confirmado
                  </p>

                  <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    Caja cerrada correctamente
                  </h3>

                  <p className="mx-auto mt-2 max-w-[320px] text-sm leading-6 text-slate-600 dark:text-slate-400">
                    El retiro fue registrado y tu caja quedó en $0.
                  </p>
                </div>

                <div className="p-5">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950/60">
                    <WalletCards className="mx-auto h-7 w-7 text-cyan-700 dark:text-cyan-300" />

                    <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      Importe cerrado
                    </p>

                    <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                      {formatMoney(confirmacionState.importe)}
                    </p>
                  </div>

                  <Link
                    href="/cobrador/caja"
                    className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-cyan-500 bg-gradient-to-r from-cyan-600 to-sky-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20 transition hover:from-cyan-700 hover:to-sky-700 active:scale-[0.99] dark:border-cyan-300/70 dark:from-cyan-400 dark:to-sky-400 dark:text-slate-950 dark:shadow-cyan-500/20 dark:hover:from-cyan-300 dark:hover:to-sky-300"
                  >
                    Volver a mi caja
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="border-b border-slate-200 bg-cyan-50 px-5 py-4 dark:border-slate-800 dark:bg-cyan-950/20">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900/70">
                        <KeyRound className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                          Validar código
                        </p>

                        <h3 className="mt-1 text-2xl font-medium tracking-tight text-slate-950 dark:text-white">
                          Código de cierre
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                          Ingresá el código de 6 dígitos generado por el
                          administrador.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={cerrarModal}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                      aria-label="Cerrar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  {!codigoValidado ? (
                    <form
                      action={validarAction}
                      onSubmit={handleValidarSubmit}
                      className="space-y-4"
                    >
                      <input type="hidden" name="codigo" value={codigoLimpio} />

                      <div>
                        <label
                          htmlFor="codigo-0"
                          className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
                        >
                          Código de 6 dígitos
                        </label>

                        <div className="mt-1.5 grid grid-cols-6 gap-2 rounded-2xl border-2 border-cyan-300 bg-cyan-50/60 px-3 py-3 shadow-inner dark:border-cyan-900/80 dark:bg-slate-950/70">
                          {codigoDigits.map((digit, index) => (
                            <input
                              key={index}
                              ref={(element) => {
                                inputRefs.current[index] = element;
                              }}
                              id={`codigo-${index}`}
                              type="text"
                              inputMode="numeric"
                              autoComplete={
                                index === 0 ? "one-time-code" : "off"
                              }
                              maxLength={1}
                              value={digit}
                              onFocus={(event) => event.target.select()}
                              onChange={(event) =>
                                handleCodigoChange(index, event)
                              }
                              onKeyDown={(event) =>
                                handleCodigoKeyDown(index, event)
                              }
                              onPaste={(event) =>
                                handleCodigoPaste(index, event)
                              }
                              className="h-14 rounded-xl border border-slate-300 bg-white/70 text-center text-4xl font-semibold leading-none text-slate-950 outline-none transition focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-950/80 dark:text-white dark:focus:border-cyan-400 sm:h-16 sm:text-5xl"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
                        <div className="flex gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

                          <p>
                            El código solo será válido si corresponde a tu
                            usuario y al importe actual de tu caja.
                          </p>
                        </div>
                      </div>

                      <ValidarCodigoButton disabled={!codigoCompleto} />

                      {validacionState.message && !validacionState.ok ? (
                        <AlertBox variant="danger">
                          {validacionState.message}
                        </AlertBox>
                      ) : null}
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-[1.35rem] border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                            <ShieldCheck className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold">
                              Código validado
                            </p>

                            <p className="mt-1 text-xs leading-5 opacity-90">
                              El código coincide con tu usuario y con el importe
                              actual de tu caja.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                          <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
                            Código
                          </p>

                          <p className="mt-1 truncate text-base font-medium text-slate-950 dark:text-white">
                            {codigoLimpio}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-3 dark:border-red-900/70 dark:bg-red-950/30">
                          <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-red-700 dark:text-red-300">
                            Importe
                          </p>

                          <p className="mt-1 truncate text-base font-medium text-red-700 dark:text-red-300">
                            {formatMoney(importeValidado)}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
                        <div className="flex gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

                          <p>
                            Al confirmar, el retiro será registrado y tu caja
                            quedará en $0.
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleConfirmarSubmit}>
                        <input
                          type="hidden"
                          name="codigo"
                          value={codigoLimpio}
                        />

                        <ConfirmarCierreButton processing={procesandoCierre} />
                      </form>

                      {confirmacionState.message &&
                      !confirmacionState.ok &&
                      !procesandoCierre ? (
                        <AlertBox variant="danger">
                          {confirmacionState.message}
                        </AlertBox>
                      ) : null}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
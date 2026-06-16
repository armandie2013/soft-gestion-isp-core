// // src/components/forms/CobroForm.tsx

// "use client";

// import {
//   useEffect,
//   useMemo,
//   useState,
//   type ChangeEvent,
//   type ClipboardEvent,
//   type KeyboardEvent,
// } from "react";
// import { useFormState, useFormStatus } from "react-dom";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   AlertTriangle,
//   CalendarDays,
//   CheckCircle2,
//   Loader2,
//   Save,
//   WalletCards,
// } from "lucide-react";
// import {
//   registrarPagoCobradorAction,
//   type CobroActionState,
// } from "@/actions/cobro.actions";
// import { AlertBox } from "@/components/ui/AlertBox";
// import type { PeriodoCuentaClienteSafe } from "@/types/movimiento-financiero.types";

// type CobroFormProps = {
//   clienteId: string;
//   periodosPendientes: PeriodoCuentaClienteSafe[];
//   saldoCajaActual: number;
//   limiteCajaCobrador: number;
//   returnHref?: string;
// };

// const initialState: CobroActionState = {
//   ok: false,
//   message: "",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function extraerSoloDigitos(value: string) {
//   return String(value || "").replace(/\D/g, "");
// }

// function limpiarCerosIzquierda(value: string) {
//   return value.replace(/^0+/, "");
// }

// function formatCurrencyFromDigits(digits: string) {
//   const cleanDigits = limpiarCerosIzquierda(extraerSoloDigitos(digits));

//   if (!cleanDigits) return "";

//   const formattedInteger = cleanDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},00`;
// }

// function moneyInputToNumber(digits: string) {
//   const cleanDigits = limpiarCerosIzquierda(extraerSoloDigitos(digits));

//   if (!cleanDigits) return 0;

//   return Number(cleanDigits);
// }

// function ordenarPeriodosPendientes(periodos: PeriodoCuentaClienteSafe[]) {
//   return [...periodos].sort((a, b) => {
//     const anioA = a.referenciaAnio || 0;
//     const anioB = b.referenciaAnio || 0;

//     if (anioA !== anioB) return anioA - anioB;

//     const mesA = a.referenciaMes || 0;
//     const mesB = b.referenciaMes || 0;

//     if (mesA !== mesB) return mesA - mesB;

//     return Number(a.numeroComprobante || 0) - Number(b.numeroComprobante || 0);
//   });
// }

// function SubmitButton({ disabled }: { disabled: boolean }) {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending || disabled}
//       className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
//     >
//       {pending ? (
//         <>
//           <Loader2 className="h-3.5 w-3.5 animate-spin" />
//           Registrando...
//         </>
//       ) : (
//         <>
//           <Save className="h-3.5 w-3.5" />
//           Registrar pago
//         </>
//       )}
//     </button>
//   );
// }

// export function CobroForm({
//   clienteId,
//   periodosPendientes,
//   saldoCajaActual,
//   limiteCajaCobrador,
//   returnHref,
// }: CobroFormProps) {
//   const router = useRouter();

//   const [state, formAction] = useFormState(
//     registrarPagoCobradorAction,
//     initialState,
//   );

//   const [facturaSeleccionadaId, setFacturaSeleccionadaId] = useState("");
//   const [importeDigits, setImporteDigits] = useState("");

//   const periodosOrdenados = useMemo(() => {
//     return ordenarPeriodosPendientes(periodosPendientes);
//   }, [periodosPendientes]);

//   const primerPeriodoPendiente = periodosOrdenados[0] || null;

//   const periodoSeleccionado = useMemo(() => {
//     return (
//       periodosOrdenados.find(
//         (periodo) => periodo.facturaId === facturaSeleccionadaId,
//       ) || null
//     );
//   }, [facturaSeleccionadaId, periodosOrdenados]);

//   const limiteCaja = Math.max(Number(limiteCajaCobrador || 100000), 100000);
//   const importeNumerico = moneyInputToNumber(importeDigits);
//   const importeVisual = formatCurrencyFromDigits(importeDigits);
//   const saldoCajaProyectado = saldoCajaActual + importeNumerico;

//   const excedeLimiteCaja =
//     importeNumerico > 0 && saldoCajaProyectado > limiteCaja;

//   const superaSaldoPeriodo =
//     Boolean(periodoSeleccionado) &&
//     importeNumerico > Number(periodoSeleccionado?.saldoPeriodo || 0);

//   const hayPeriodoSeleccionado = Boolean(periodoSeleccionado);
//   const importeValido = importeNumerico > 0;

//   const puedeRegistrarPago =
//     hayPeriodoSeleccionado &&
//     importeValido &&
//     !excedeLimiteCaja &&
//     !superaSaldoPeriodo;

//   const volverHref = returnHref || `/cobrador/clientes/${clienteId}`;

//   useEffect(() => {
//     if (state.ok) {
//       setFacturaSeleccionadaId("");
//       setImporteDigits("");
//       router.refresh();
//     }
//   }, [router, state.ok]);

//   function appendDigit(digit: string) {
//     setImporteDigits((current) =>
//       limpiarCerosIzquierda(`${current}${digit}`),
//     );
//   }

//   function handleImporteKeyDown(event: KeyboardEvent<HTMLInputElement>) {
//     const allowedControlKeys = [
//       "Tab",
//       "ArrowLeft",
//       "ArrowRight",
//       "ArrowUp",
//       "ArrowDown",
//       "Home",
//       "End",
//       "Escape",
//       "Enter",
//     ];

//     if (allowedControlKeys.includes(event.key)) return;

//     if (event.ctrlKey || event.metaKey) return;

//     if (event.key === "Backspace") {
//       event.preventDefault();
//       setImporteDigits((current) => current.slice(0, -1));
//       return;
//     }

//     if (event.key === "Delete") {
//       event.preventDefault();
//       setImporteDigits("");
//       return;
//     }

//     if (/^\d$/.test(event.key)) {
//       event.preventDefault();
//       appendDigit(event.key);
//       return;
//     }

//     event.preventDefault();
//   }

//   function handleImporteChange(event: ChangeEvent<HTMLInputElement>) {
//     const nativeEvent = event.nativeEvent as InputEvent;
//     const inputType = nativeEvent.inputType;
//     const data = nativeEvent.data;

//     if (inputType === "deleteContentBackward") {
//       setImporteDigits((current) => current.slice(0, -1));
//       return;
//     }

//     if (inputType === "deleteContentForward") {
//       setImporteDigits("");
//       return;
//     }

//     if (data && /^\d$/.test(data)) {
//       appendDigit(data);
//       return;
//     }

//     const digits = limpiarCerosIzquierda(
//       extraerSoloDigitos(event.target.value),
//     );

//     setImporteDigits(digits);
//   }

//   function handleImportePaste(event: ClipboardEvent<HTMLInputElement>) {
//     event.preventDefault();

//     const pasted = event.clipboardData.getData("text");
//     const digits = limpiarCerosIzquierda(extraerSoloDigitos(pasted));

//     setImporteDigits(digits);
//   }

//   if (periodosOrdenados.length === 0) {
//     return (
//       <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200">
//         <p className="text-sm font-medium">Sin deuda pendiente</p>

//         <p className="mt-1 text-xs leading-5 opacity-90">
//           Este cliente no tiene períodos con saldo pendiente para cobrar.
//         </p>

//         <div className="mt-3">
//           <Link
//             href={volverHref}
//             className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 active:scale-[0.99] dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60 sm:w-auto"
//           >
//             Volver a la cuenta
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <form action={formAction} className="space-y-3">
//       <input type="hidden" name="clienteId" value={clienteId} />

//       <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
//         <div className="mb-3 flex items-start gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
//             <CalendarDays className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//               Paso 1
//             </p>

//             <h3 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//               Seleccionar período
//             </h3>

//             <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
//               Solo se habilita el período pendiente más antiguo.
//             </p>
//           </div>
//         </div>

//         <label
//           htmlFor="facturaAsociadaId"
//           className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
//         >
//           Período a pagar
//         </label>

//         <select
//           id="facturaAsociadaId"
//           name="facturaAsociadaId"
//           value={facturaSeleccionadaId}
//           onChange={(event) => {
//             setFacturaSeleccionadaId(event.target.value);
//             setImporteDigits("");
//           }}
//           className="mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100"
//         >
//           <option value="">Seleccionar período</option>

//           {periodosOrdenados.map((periodo, index) => {
//             const esPrimerPeriodoPendiente = index === 0;

//             return (
//               <option
//                 key={periodo.facturaId}
//                 value={periodo.facturaId}
//                 disabled={!esPrimerPeriodoPendiente}
//               >
//                 {periodo.periodoLabel} · Factura N° {periodo.numeroComprobante} ·
//                 Saldo {formatMoney(periodo.saldoPeriodo)}
//                 {!esPrimerPeriodoPendiente
//                   ? " · Bloqueado por deuda anterior"
//                   : ""}
//               </option>
//             );
//           })}
//         </select>

//         {primerPeriodoPendiente ? (
//           <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
//             Período habilitado:{" "}
//             <span className="font-medium text-slate-800 dark:text-slate-200">
//               {primerPeriodoPendiente.periodoLabel} · Factura N°{" "}
//               {primerPeriodoPendiente.numeroComprobante}
//             </span>
//           </p>
//         ) : null}

//         {periodoSeleccionado ? (
//           <div className="mt-3 grid gap-2 sm:grid-cols-3">
//             <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
//               <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//                 Original
//               </p>

//               <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//                 {formatMoney(periodoSeleccionado.importeOriginal)}
//               </p>
//             </div>

//             <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
//               <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//                 Pagos / créditos
//               </p>

//               <p className="mt-1 truncate text-sm font-medium text-emerald-700 dark:text-emerald-300">
//                 {formatMoney(
//                   periodoSeleccionado.totalNotasCredito +
//                     periodoSeleccionado.totalPagos,
//                 )}
//               </p>
//             </div>

//             <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 dark:border-red-900/70 dark:bg-red-950/30">
//               <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-red-700 dark:text-red-300">
//                 Saldo pendiente
//               </p>

//               <p className="mt-1 truncate text-sm font-medium text-red-700 dark:text-red-300">
//                 {formatMoney(periodoSeleccionado.saldoPeriodo)}
//               </p>
//             </div>
//           </div>
//         ) : null}
//       </div>

//       <div className="rounded-[1.35rem] border-2 border-cyan-300 bg-white p-3 shadow-sm dark:border-cyan-900/80 dark:bg-slate-900/80">
//         <div className="mb-3 flex items-start gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
//             <WalletCards className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//               Paso 2
//             </p>

//             <h3 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//               Ingresar importe
//             </h3>

//             <p className="mt-0.5 text-xs leading-5 text-slate-700 dark:text-slate-300">
//               Escribí el monto recibido.
//             </p>
//           </div>
//         </div>

//         <label
//           htmlFor="importeVisual"
//           className="text-[10px] font-medium uppercase tracking-[0.14em] text-cyan-800 dark:text-cyan-300"
//         >
//           Importe a cobrar
//         </label>

//         <input
//           id="importeVisual"
//           type="text"
//           inputMode="numeric"
//           value={importeVisual}
//           onKeyDown={handleImporteKeyDown}
//           onChange={handleImporteChange}
//           onPaste={handleImportePaste}
//           disabled={!periodoSeleccionado}
//           placeholder="$ 0,00"
//           style={{
//             fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
//             lineHeight: "1",
//             fontWeight: 800,
//           }}
//           className="mt-1.5 h-18 w-full rounded-2xl border-2 border-cyan-300 bg-cyan-50/60 px-3 text-center tracking-tight text-slate-950 outline-none transition placeholder:text-center placeholder:font-extrabold placeholder:tracking-tight placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-80 dark:border-cyan-900/80 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:disabled:bg-slate-950 dark:disabled:text-slate-600 sm:h-20"
//         />

//         <input type="hidden" name="importe" value={importeNumerico} />

//         {!periodoSeleccionado ? (
//           <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
//             Primero seleccioná un período para habilitar el importe.
//           </div>
//         ) : (
//           <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
//             Saldo máximo del período:{" "}
//             <span className="font-medium text-red-700 dark:text-red-300">
//               {formatMoney(periodoSeleccionado.saldoPeriodo)}
//             </span>
//           </div>
//         )}
//       </div>

//       {superaSaldoPeriodo ? (
//         <div className="rounded-[1.35rem] border border-red-200 bg-red-50 p-3 text-red-800 shadow-sm dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200">
//           <div className="flex items-start gap-3">
//             <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

//             <p className="text-xs leading-5">
//               El importe ingresado no puede superar el saldo pendiente del
//               período seleccionado.
//             </p>
//           </div>
//         </div>
//       ) : null}

//       {excedeLimiteCaja ? (
//         <div className="rounded-[1.35rem] border border-red-200 bg-red-50 p-3 text-red-800 shadow-sm dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200">
//           <div className="flex items-start gap-3">
//             <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

//             <p className="text-xs leading-5">
//               Tu caja alcanzó el límite operativo permitido. Para continuar
//               registrando cobros, primero tenés que realizar el cierre de caja.
//             </p>
//           </div>
//         </div>
//       ) : null}

//       {importeNumerico > 0 && !excedeLimiteCaja && !superaSaldoPeriodo ? (
//         <div className="rounded-[1.35rem] border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 shadow-sm dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200">
//           <div className="flex items-start gap-3">
//             <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

//             <p className="text-xs leading-5">
//               Importe válido. Revisá los datos y confirmá el registro del pago.
//             </p>
//           </div>
//         </div>
//       ) : null}

//       <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
//         <label
//           htmlFor="observacion"
//           className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
//         >
//           Observación
//         </label>

//         <textarea
//           id="observacion"
//           name="observacion"
//           rows={3}
//           placeholder="Opcional"
//           className="mt-1.5 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600"
//         />
//       </div>

//       <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//         <div className="flex items-start gap-3">
//           <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

//           <p className="text-xs leading-5">
//             Antes de registrar, verificá que el período seleccionado y el
//             importe coincidan con el pago recibido.
//           </p>
//         </div>
//       </div>

//       {state.message ? (
//         <AlertBox variant={state.ok ? "success" : "danger"}>
//           {state.message}
//         </AlertBox>
//       ) : null}

//       <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
//         <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
//           <Link
//             href={volverHref}
//             className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
//           >
//             Volver
//           </Link>

//           <SubmitButton disabled={!puedeRegistrarPago} />
//         </div>
//       </div>
//     </form>
//   );
// }

// src/components/forms/CobroForm.tsx

"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Eye,
  Loader2,
  ReceiptText,
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
  returnHref?: string;
};

const initialState: CobroActionState = {
  ok: false,
  message: "",
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function extraerSoloDigitos(value: string) {
  return String(value || "").replace(/\D/g, "");
}

function limpiarCerosIzquierda(value: string) {
  return value.replace(/^0+/, "");
}

function formatCurrencyFromDigits(digits: string) {
  const cleanDigits = limpiarCerosIzquierda(extraerSoloDigitos(digits));

  if (!cleanDigits) return "";

  const formattedInteger = cleanDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},00`;
}

function moneyInputToNumber(digits: string) {
  const cleanDigits = limpiarCerosIzquierda(extraerSoloDigitos(digits));

  if (!cleanDigits) return 0;

  return Number(cleanDigits);
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

function SubmitButton({
  disabled,
  processing,
}: {
  disabled: boolean;
  processing: boolean;
}) {
  const { pending } = useFormStatus();
  const isBusy = pending || processing;

  return (
    <button
      type="submit"
      disabled={isBusy || disabled}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-sm font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
    >
      {isBusy ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Procesando pago...
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
  returnHref,
}: CobroFormProps) {
  const router = useRouter();

  const [state, formAction] = useFormState(
    registrarPagoCobradorAction,
    initialState,
  );

  const processingStartedAtRef = useRef<number | null>(null);

  const [facturaSeleccionadaId, setFacturaSeleccionadaId] = useState("");
  const [importeDigits, setImporteDigits] = useState("");
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [mostrarResultadoOk, setMostrarResultadoOk] = useState(false);

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
  const importeNumerico = moneyInputToNumber(importeDigits);
  const importeVisual = formatCurrencyFromDigits(importeDigits);
  const saldoCajaProyectado = saldoCajaActual + importeNumerico;

  const excedeLimiteCaja =
    importeNumerico > 0 && saldoCajaProyectado > limiteCaja;

  const superaSaldoPeriodo =
    Boolean(periodoSeleccionado) &&
    importeNumerico > Number(periodoSeleccionado?.saldoPeriodo || 0);

  const hayPeriodoSeleccionado = Boolean(periodoSeleccionado);
  const importeValido = importeNumerico > 0;

  const puedeRegistrarPago =
    hayPeriodoSeleccionado &&
    importeValido &&
    !excedeLimiteCaja &&
    !superaSaldoPeriodo;

  const volverHref = returnHref || `/cobrador/clientes/${clienteId}`;

  useEffect(() => {
    if (!state.message || !processingStartedAtRef.current) {
      return;
    }

    const elapsed = Date.now() - processingStartedAtRef.current;
    const remaining = Math.max(0, 7000 - elapsed);

    const timer = window.setTimeout(() => {
      setProcesandoPago(false);
      processingStartedAtRef.current = null;

      if (state.ok) {
        setFacturaSeleccionadaId("");
        setImporteDigits("");
        setMostrarResultadoOk(true);
        router.refresh();
      }
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [router, state.message, state.ok]);

  function appendDigit(digit: string) {
    setImporteDigits((current) =>
      limpiarCerosIzquierda(`${current}${digit}`),
    );
  }

  function handleImporteKeyDown(event: KeyboardEvent<HTMLInputElement>) {
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
      setImporteDigits((current) => current.slice(0, -1));
      return;
    }

    if (event.key === "Delete") {
      event.preventDefault();
      setImporteDigits("");
      return;
    }

    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      appendDigit(event.key);
      return;
    }

    event.preventDefault();
  }

  function handleImporteChange(event: ChangeEvent<HTMLInputElement>) {
    const nativeEvent = event.nativeEvent as InputEvent;
    const inputType = nativeEvent.inputType;
    const data = nativeEvent.data;

    if (inputType === "deleteContentBackward") {
      setImporteDigits((current) => current.slice(0, -1));
      return;
    }

    if (inputType === "deleteContentForward") {
      setImporteDigits("");
      return;
    }

    if (data && /^\d$/.test(data)) {
      appendDigit(data);
      return;
    }

    const digits = limpiarCerosIzquierda(
      extraerSoloDigitos(event.target.value),
    );

    setImporteDigits(digits);
  }

  function handleImportePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pasted = event.clipboardData.getData("text");
    const digits = limpiarCerosIzquierda(extraerSoloDigitos(pasted));

    setImporteDigits(digits);
  }

  if (mostrarResultadoOk && state.ok) {
    return (
      <div className="space-y-3">
        <div className="overflow-hidden rounded-[1.45rem] border border-emerald-300 bg-white shadow-sm shadow-emerald-950/10 dark:border-emerald-700/70 dark:bg-slate-900/90 dark:shadow-none">
          <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-5 text-center dark:border-emerald-900/70 dark:bg-emerald-950/25">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-800/80">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Pago registrado
            </p>

            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Pago realizado correctamente
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              El cobro fue registrado y el comprobante ya está disponible para
              visualizar o imprimir.
            </p>
          </div>

          <div className="p-4 sm:p-5">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950/60">
              <ReceiptText className="mx-auto h-7 w-7 text-cyan-700 dark:text-cyan-300" />

              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Comprobante
              </p>

              <p className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                N° {state.numeroComprobante || "-"}
              </p>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
              <Link
                href={volverHref}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
              >
                Volver a la cuenta
              </Link>

              {state.movimientoId ? (
                <Link
                  href={`/comprobantes/pagos/${state.movimientoId}`}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-500 bg-gradient-to-r from-cyan-600 to-sky-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20 transition hover:from-cyan-700 hover:to-sky-700 active:scale-[0.99] dark:border-cyan-300/70 dark:from-cyan-400 dark:to-sky-400 dark:text-slate-950 dark:shadow-cyan-500/20 dark:hover:from-cyan-300 dark:hover:to-sky-300 sm:min-w-[210px]"
                >
                  <Eye className="h-4 w-4" />
                  Visualizar recibo
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (periodosOrdenados.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200">
        <p className="text-sm font-medium">Sin deuda pendiente</p>

        <p className="mt-1 text-xs leading-5 opacity-90">
          Este cliente no tiene períodos con saldo pendiente para cobrar.
        </p>

        <div className="mt-3">
          <Link
            href={volverHref}
            className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 active:scale-[0.99] dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60 sm:w-auto"
          >
            Volver a la cuenta
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!puedeRegistrarPago) {
          event.preventDefault();
          return;
        }

        setMostrarResultadoOk(false);
        setProcesandoPago(true);
        processingStartedAtRef.current = Date.now();
      }}
      className="space-y-3"
    >
      <input type="hidden" name="clienteId" value={clienteId} />

      {procesandoPago ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-[380px] rounded-[1.7rem] border border-cyan-200 bg-white p-6 text-center shadow-2xl shadow-slate-950/30 dark:border-cyan-700/70 dark:bg-slate-900 dark:shadow-cyan-950/20">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 ring-1 ring-cyan-200 dark:bg-cyan-950/40 dark:ring-cyan-700/70">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-700/25 dark:bg-cyan-400 dark:text-slate-950">
                <Loader2 className="h-7 w-7 animate-spin" />
              </div>
            </div>

            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Procesando pago
            </p>

            <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Registrando el cobro
            </h3>

            <p className="mx-auto mt-2 max-w-[290px] text-sm leading-6 text-slate-600 dark:text-slate-400">
              Esperá un momento. Estamos guardando el pago y generando el
              comprobante.
            </p>

            <div className="mt-5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-2 w-full animate-pulse rounded-full bg-cyan-500 dark:bg-cyan-400" />
            </div>
          </div>
        </div>
      ) : null}

      <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
            <CalendarDays className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
              Paso 1
            </p>

            <h3 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
              Seleccionar período
            </h3>

            <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
              Solo se habilita el período pendiente más antiguo.
            </p>
          </div>
        </div>

        <label
          htmlFor="facturaAsociadaId"
          className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
        >
          Período a pagar
        </label>

        <select
          id="facturaAsociadaId"
          name="facturaAsociadaId"
          value={facturaSeleccionadaId}
          onChange={(event) => {
            setFacturaSeleccionadaId(event.target.value);
            setImporteDigits("");
          }}
          disabled={procesandoPago}
          className="mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100"
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
                {periodo.periodoLabel} · Factura N° {periodo.numeroComprobante} ·
                Saldo {formatMoney(periodo.saldoPeriodo)}
                {!esPrimerPeriodoPendiente
                  ? " · Bloqueado por deuda anterior"
                  : ""}
              </option>
            );
          })}
        </select>

        {primerPeriodoPendiente ? (
          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Período habilitado:{" "}
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {primerPeriodoPendiente.periodoLabel} · Factura N°{" "}
              {primerPeriodoPendiente.numeroComprobante}
            </span>
          </p>
        ) : null}

        {periodoSeleccionado ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Original
              </p>

              <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
                {formatMoney(periodoSeleccionado.importeOriginal)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Pagos / créditos
              </p>

              <p className="mt-1 truncate text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {formatMoney(
                  periodoSeleccionado.totalNotasCredito +
                    periodoSeleccionado.totalPagos,
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 dark:border-red-900/70 dark:bg-red-950/30">
              <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-red-700 dark:text-red-300">
                Saldo pendiente
              </p>

              <p className="mt-1 truncate text-sm font-medium text-red-700 dark:text-red-300">
                {formatMoney(periodoSeleccionado.saldoPeriodo)}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-[1.35rem] border-2 border-cyan-300 bg-white p-3 shadow-sm dark:border-cyan-900/80 dark:bg-slate-900/80">
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
            <WalletCards className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
              Paso 2
            </p>

            <h3 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
              Ingresar importe
            </h3>

            <p className="mt-0.5 text-xs leading-5 text-slate-700 dark:text-slate-300">
              Escribí el monto recibido.
            </p>
          </div>
        </div>

        <label
          htmlFor="importeVisual"
          className="text-[10px] font-medium uppercase tracking-[0.14em] text-cyan-800 dark:text-cyan-300"
        >
          Importe a cobrar
        </label>

        <input
          id="importeVisual"
          type="text"
          inputMode="numeric"
          value={importeVisual}
          onKeyDown={handleImporteKeyDown}
          onChange={handleImporteChange}
          onPaste={handleImportePaste}
          disabled={!periodoSeleccionado || procesandoPago}
          placeholder="$ 0,00"
          style={{
            fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
            lineHeight: "1",
            fontWeight: 800,
          }}
          className="mt-1.5 h-18 w-full rounded-2xl border-2 border-cyan-300 bg-cyan-50/60 px-3 text-center tracking-tight text-slate-950 outline-none transition placeholder:text-center placeholder:font-extrabold placeholder:tracking-tight placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-80 dark:border-cyan-900/80 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:disabled:bg-slate-950 dark:disabled:text-slate-600 sm:h-20"
        />

        <input type="hidden" name="importe" value={importeNumerico} />

        {!periodoSeleccionado ? (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            Primero seleccioná un período para habilitar el importe.
          </div>
        ) : (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            Saldo máximo del período:{" "}
            <span className="font-medium text-red-700 dark:text-red-300">
              {formatMoney(periodoSeleccionado.saldoPeriodo)}
            </span>
          </div>
        )}
      </div>

      {superaSaldoPeriodo ? (
        <div className="rounded-[1.35rem] border border-red-200 bg-red-50 p-3 text-red-800 shadow-sm dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

            <p className="text-xs leading-5">
              El importe ingresado no puede superar el saldo pendiente del
              período seleccionado.
            </p>
          </div>
        </div>
      ) : null}

      {excedeLimiteCaja ? (
        <div className="rounded-[1.35rem] border border-red-200 bg-red-50 p-3 text-red-800 shadow-sm dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

            <p className="text-xs leading-5">
              Tu caja alcanzó el límite operativo permitido. Para continuar
              registrando cobros, primero tenés que realizar el cierre de caja.
            </p>
          </div>
        </div>
      ) : null}

      {importeNumerico > 0 && !excedeLimiteCaja && !superaSaldoPeriodo ? (
        <div className="rounded-[1.35rem] border border-emerald-200 bg-emerald-50 p-3 text-emerald-800 shadow-sm dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

            <p className="text-xs leading-5">
              Importe válido. Revisá los datos y confirmá el registro del pago.
            </p>
          </div>
        </div>
      ) : null}

      <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <label
          htmlFor="observacion"
          className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
        >
          Observación
        </label>

        <textarea
          id="observacion"
          name="observacion"
          rows={3}
          placeholder="Opcional"
          disabled={procesandoPago}
          className="mt-1.5 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600"
        />
      </div>

      <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

          <p className="text-xs leading-5">
            Antes de registrar, verificá que el período seleccionado y el
            importe coincidan con el pago recibido.
          </p>
        </div>
      </div>

      {state.message && !state.ok && !procesandoPago ? (
        <AlertBox variant="danger">{state.message}</AlertBox>
      ) : null}

      <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Link
            href={volverHref}
            className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
          >
            Volver
          </Link>

          <SubmitButton
            disabled={!puedeRegistrarPago}
            processing={procesandoPago}
          />
        </div>
      </div>
    </form>
  );
}
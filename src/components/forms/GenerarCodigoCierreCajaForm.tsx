// // src/components/forms/GenerarCodigoCierreCajaForm.tsx

// "use client";

// import { useFormState, useFormStatus } from "react-dom";
// import { KeyRound, Loader2 } from "lucide-react";
// import {
//   generarCodigoCierreCajaAction,
//   type CodigoCierreActionState,
// } from "@/actions/cobro.actions";

// type GenerarCodigoCierreCajaFormProps = {
//   cobradorId: string;
//   disabled?: boolean;
//   fullWidth?: boolean;
// };

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

// function SubmitButton({
//   disabled,
//   fullWidth,
// }: {
//   disabled?: boolean;
//   fullWidth?: boolean;
// }) {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending || disabled}
//       className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-xl px-2.5 text-[11px] font-medium transition active:scale-[0.99] ${
//         fullWidth ? "w-full" : ""
//       } ${
//         disabled
//           ? "cursor-not-allowed border border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-600"
//           : "border border-cyan-200 bg-cyan-50 text-cyan-700 hover:border-cyan-300 hover:bg-cyan-100 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
//       }`}
//     >
//       {pending ? (
//         <>
//           <Loader2 className="h-3.5 w-3.5 animate-spin" />
//           Generando
//         </>
//       ) : (
//         <>
//           <KeyRound className="h-3.5 w-3.5" />
//           Generar código
//         </>
//       )}
//     </button>
//   );
// }

// export function GenerarCodigoCierreCajaForm({
//   cobradorId,
//   disabled,
//   fullWidth,
// }: GenerarCodigoCierreCajaFormProps) {
//   const [state, formAction] = useFormState(
//     generarCodigoCierreCajaAction,
//     initialState,
//   );

//   return (
//     <form action={formAction} className={fullWidth ? "w-full" : ""}>
//       <input type="hidden" name="cobradorId" value={cobradorId} />

//       <SubmitButton disabled={disabled} fullWidth={fullWidth} />

//       {state.message ? (
//         <div
//           className={`mt-2 rounded-xl border px-3 py-2 text-[11px] ${
//             state.ok
//               ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//               : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
//           }`}
//         >
//           <p>{state.message}</p>

//           {state.ok && state.codigo ? (
//             <div className="mt-2 rounded-xl border border-slate-200 bg-white/80 p-3 text-center dark:border-slate-800 dark:bg-slate-950/50">
//               <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                 Código generado
//               </p>

//               <p className="mt-1 font-mono text-2xl font-medium tracking-[0.18em] text-slate-950 dark:text-white">
//                 {state.codigo}
//               </p>

//               <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
//                 Importe: {formatMoney(state.importe)}
//               </p>
//             </div>
//           ) : null}
//         </div>
//       ) : null}
//     </form>
//   );
// }

// // src/components/forms/GenerarCodigoCierreCajaForm.tsx

// "use client";

// import { useEffect, useState } from "react";
// import { useFormState, useFormStatus } from "react-dom";
// import {
//   AlertTriangle,
//   CheckCircle2,
//   KeyRound,
//   Loader2,
//   X,
// } from "lucide-react";
// import {
//   generarCodigoCierreCajaAction,
//   type CodigoCierreActionState,
// } from "@/actions/cobro.actions";

// type GenerarCodigoCierreCajaFormProps = {
//   cobradorId: string;
//   disabled?: boolean;
//   fullWidth?: boolean;
// };

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

// function SubmitButton({
//   disabled,
//   fullWidth,
// }: {
//   disabled?: boolean;
//   fullWidth?: boolean;
// }) {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending || disabled}
//       className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-xl px-2.5 text-[11px] font-medium transition active:scale-[0.99] ${
//         fullWidth ? "w-full" : ""
//       } ${
//         disabled
//           ? "cursor-not-allowed border border-slate-300 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-600"
//           : "border border-cyan-300 bg-cyan-50 text-cyan-700 shadow-sm shadow-slate-300/30 hover:border-cyan-400 hover:bg-cyan-100 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:shadow-none dark:hover:bg-cyan-950/70"
//       }`}
//     >
//       {pending ? (
//         <>
//           <Loader2 className="h-3.5 w-3.5 animate-spin" />
//           Generando
//         </>
//       ) : (
//         <>
//           <KeyRound className="h-3.5 w-3.5" />
//           Generar código
//         </>
//       )}
//     </button>
//   );
// }

// function CodigoGeneradoModal({
//   open,
//   ok,
//   message,
//   codigo,
//   importe,
//   onClose,
// }: {
//   open: boolean;
//   ok: boolean;
//   message: string;
//   codigo?: string;
//   importe?: number;
//   onClose: () => void;
// }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm">
//       <div className="w-full max-w-sm overflow-hidden rounded-[1.6rem] border border-slate-300 bg-white shadow-2xl shadow-slate-950/30 dark:border-slate-800 dark:bg-slate-900">
//         <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
//           <div className="flex min-w-0 items-start gap-3">
//             <div
//               className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
//                 ok
//                   ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900"
//                   : "bg-red-50 text-red-700 ring-1 ring-red-100 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900"
//               }`}
//             >
//               {ok ? (
//                 <CheckCircle2 className="h-4 w-4" />
//               ) : (
//                 <AlertTriangle className="h-4 w-4" />
//               )}
//             </div>

//             <div className="min-w-0">
//               <p
//                 className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
//                   ok
//                     ? "text-emerald-700 dark:text-emerald-300"
//                     : "text-red-700 dark:text-red-300"
//                 }`}
//               >
//                 {ok ? "Código generado" : "No se pudo generar"}
//               </p>

//               <h2 className="mt-0.5 text-base font-semibold tracking-tight text-slate-950 dark:text-white">
//                 Cierre de caja
//               </h2>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
//             aria-label="Cerrar"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>

//         <div className="px-4 py-4">
//           <p
//             className={`rounded-2xl border px-3 py-2.5 text-xs leading-5 ${
//               ok
//                 ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200"
//                 : "border-red-200 bg-red-50 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200"
//             }`}
//           >
//             {message}
//           </p>

//           {ok && codigo ? (
//             <div className="mt-4 rounded-[1.35rem] border border-slate-300 bg-slate-50 p-4 text-center shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
//                 Código
//               </p>

//               <p className="mt-2 font-mono text-3xl font-semibold tracking-[0.22em] text-slate-950 dark:text-white">
//                 {codigo}
//               </p>

//               <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
//                 Importe:{" "}
//                 <span className="font-medium text-slate-800 dark:text-slate-200">
//                   {formatMoney(importe)}
//                 </span>
//               </p>
//             </div>
//           ) : null}

//           <button
//             type="button"
//             onClick={onClose}
//             className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//           >
//             Entendido
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export function GenerarCodigoCierreCajaForm({
//   cobradorId,
//   disabled,
//   fullWidth,
// }: GenerarCodigoCierreCajaFormProps) {
//   const [state, formAction] = useFormState(
//     generarCodigoCierreCajaAction,
//     initialState,
//   );
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     if (state.message) {
//       setModalOpen(true);
//     }
//   }, [state.message, state.codigo]);

//   return (
//     <>
//       <form action={formAction} className={fullWidth ? "w-full" : ""}>
//         <input type="hidden" name="cobradorId" value={cobradorId} />

//         <SubmitButton disabled={disabled} fullWidth={fullWidth} />
//       </form>

//       <CodigoGeneradoModal
//         open={modalOpen}
//         ok={state.ok}
//         message={state.message}
//         codigo={state.codigo}
//         importe={state.importe}
//         onClose={() => setModalOpen(false)}
//       />
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  KeyRound,
  Loader2,
  X,
} from "lucide-react";
import {
  generarCodigoCierreCajaModalAction,
  type CodigoCierreActionState,
} from "@/actions/cobro.actions";

type GenerarCodigoCierreCajaFormProps = {
  cobradorId: string;
  disabled?: boolean;
  fullWidth?: boolean;
};

const initialState: CodigoCierreActionState = {
  ok: false,
  message: "",
};

function formatMoney(value?: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function CopyCodigoButton({ codigo }: { codigo: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-cyan-50 px-4 text-xs font-medium text-cyan-800 transition hover:bg-cyan-100 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copiar código
        </>
      )}
    </button>
  );
}

function CodigoGeneradoModal({
  open,
  state,
  onClose,
}: {
  open: boolean;
  state: CodigoCierreActionState;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-[1.6rem] border border-slate-300 bg-white shadow-2xl shadow-slate-950/30 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                state.ok
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900"
                  : "bg-red-50 text-red-700 ring-1 ring-red-100 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900"
              }`}
            >
              {state.ok ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
            </div>

            <div className="min-w-0">
              <p
                className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
                  state.ok
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-red-700 dark:text-red-300"
                }`}
              >
                {state.ok ? "Código generado" : "No se pudo generar"}
              </p>

              <h2 className="mt-0.5 text-base font-semibold tracking-tight text-slate-950 dark:text-white">
                Cierre de caja
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-4 py-4">
          <p
            className={`rounded-2xl border px-3 py-2.5 text-xs leading-5 ${
              state.ok
                ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200"
                : "border-red-200 bg-red-50 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200"
            }`}
          >
            {state.message || "No se recibió respuesta del servidor."}
          </p>

          {state.ok && state.codigo ? (
            <div className="mt-4 rounded-[1.35rem] border border-slate-300 bg-slate-50 p-4 text-center shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Código para el cobrador
              </p>

              <p className="mt-3 select-all font-mono text-4xl font-semibold tracking-[0.28em] text-slate-950 dark:text-white sm:text-5xl">
                {state.codigo}
              </p>

              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Importe exacto:{" "}
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {formatMoney(state.importe)}
                </span>
              </p>

              <div className="mt-4">
                <CopyCodigoButton codigo={state.codigo} />
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

export function GenerarCodigoCierreCajaForm({
  cobradorId,
  disabled,
  fullWidth,
}: GenerarCodigoCierreCajaFormProps) {
  const router = useRouter();

  const [pending, setPending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState<CodigoCierreActionState>(initialState);
  const [refreshOnClose, setRefreshOnClose] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (disabled || pending) {
      return;
    }

    setPending(true);

    try {
      const formData = new FormData(event.currentTarget);
      const result = await generarCodigoCierreCajaModalAction(
        initialState,
        formData,
      );

      setState(result ?? initialState);
      setRefreshOnClose(Boolean(result?.ok));
      setModalOpen(true);
    } catch {
      setState({
        ok: false,
        message: "No se pudo generar el código. Intentá nuevamente.",
      });
      setRefreshOnClose(false);
      setModalOpen(true);
    } finally {
      setPending(false);
    }
  }

  function handleCloseModal() {
    setModalOpen(false);

    if (refreshOnClose) {
      window.setTimeout(() => {
        router.refresh();
      }, 150);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={fullWidth ? "w-full" : ""}>
        <input type="hidden" name="cobradorId" value={cobradorId} />

        <button
          type="submit"
          disabled={pending || disabled}
          className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-xl px-2.5 text-[11px] font-medium transition active:scale-[0.99] ${
            fullWidth ? "w-full" : ""
          } ${
            disabled
              ? "cursor-not-allowed border border-slate-300 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-600"
              : "border border-cyan-300 bg-cyan-50 text-cyan-700 shadow-sm shadow-slate-300/30 hover:border-cyan-400 hover:bg-cyan-100 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:shadow-none dark:hover:bg-cyan-950/70"
          }`}
        >
          {pending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Generando
            </>
          ) : (
            <>
              <KeyRound className="h-3.5 w-3.5" />
              Generar código
            </>
          )}
        </button>
      </form>

      <CodigoGeneradoModal
        open={modalOpen}
        state={state}
        onClose={handleCloseModal}
      />
    </>
  );
}
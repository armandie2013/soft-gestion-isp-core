// // src/components/forms/FacturacionManualForm.tsx

// "use client";

// import { useFormState, useFormStatus } from "react-dom";
// import { CheckCircle2, Loader2, ReceiptText, ShieldAlert } from "lucide-react";
// import {
//   generarFacturacionManualAction,
//   type FacturacionManualActionState,
// } from "@/actions/movimiento-financiero.actions";

// type FacturacionManualFormProps = {
//   defaultMes: number;
//   defaultAnio: number;
// };

// const initialState: FacturacionManualActionState = {
//   ok: false,
//   message: "",
//   generadas: 0,
//   omitidas: 0,
//   ajustes: 0,
// };

// const meses = [
//   { value: 1, label: "Enero" },
//   { value: 2, label: "Febrero" },
//   { value: 3, label: "Marzo" },
//   { value: 4, label: "Abril" },
//   { value: 5, label: "Mayo" },
//   { value: 6, label: "Junio" },
//   { value: 7, label: "Julio" },
//   { value: 8, label: "Agosto" },
//   { value: 9, label: "Septiembre" },
//   { value: 10, label: "Octubre" },
//   { value: 11, label: "Noviembre" },
//   { value: 12, label: "Diciembre" },
// ];

// const inputClass =
//   "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white";

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-3 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
//     >
//       {pending ? (
//         <>
//           <Loader2 className="h-3.5 w-3.5 animate-spin" />
//           Ejecutando
//         </>
//       ) : (
//         <>
//           <ReceiptText className="h-3.5 w-3.5" />
//           Ejecutar facturación
//         </>
//       )}
//     </button>
//   );
// }

// export function FacturacionManualForm({
//   defaultMes,
//   defaultAnio,
// }: FacturacionManualFormProps) {
//   const [state, formAction] = useFormState(
//     generarFacturacionManualAction,
//     initialState,
//   );

//   return (
//     <form action={formAction} className="space-y-4">
//       <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//         <div className="flex gap-2">
//           <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

//           <div>
//             <p className="font-medium">Importante</p>

//             <p className="mt-1">
//               Este botón usa la misma lógica que usará el cron. El corte es fijo
//               el día 28 de cada mes, no se puede modificar. Si un cliente fue
//               dado de alta en meses anteriores, genera automáticamente los
//               períodos pendientes desde el alta hasta el período seleccionado.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-3 sm:grid-cols-3">
//         <div>
//           <label
//             htmlFor="referenciaMes"
//             className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
//           >
//             Hasta mes
//           </label>

//           <select
//             id="referenciaMes"
//             name="referenciaMes"
//             defaultValue={defaultMes}
//             className={inputClass}
//           >
//             {meses.map((mes) => (
//               <option key={mes.value} value={mes.value}>
//                 {mes.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label
//             htmlFor="referenciaAnio"
//             className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
//           >
//             Año
//           </label>

//           <input
//             id="referenciaAnio"
//             name="referenciaAnio"
//             type="number"
//             defaultValue={defaultAnio}
//             className={inputClass}
//           />
//         </div>

//         <div>
//           <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//             Corte
//           </span>

//           <div className="flex h-9 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
//             Día 28 de cada mes
//           </div>
//         </div>
//       </div>

//       <div>
//         <label
//           htmlFor="observacion"
//           className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
//         >
//           Observación
//         </label>

//         <textarea
//           id="observacion"
//           name="observacion"
//           rows={3}
//           placeholder="Opcional"
//           className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600"
//         />
//       </div>

//       {state.message ? (
//         <div
//           className={`rounded-2xl border p-3 text-xs leading-5 ${
//             state.ok
//               ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//               : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
//           }`}
//         >
//           <div className="flex gap-2">
//             <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

//             <div>
//               <p>{state.message}</p>

//               {state.ok ? (
//                 <p className="mt-1 text-[11px]">
//                   Facturas: {state.generadas || 0} · Ajustes:{" "}
//                   {state.ajustes || 0} · Omitidas: {state.omitidas || 0}
//                 </p>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       ) : null}

//       <div className="flex justify-end">
//         <SubmitButton />
//       </div>
//     </form>
//   );
// }

// src/components/forms/FacturacionManualForm.tsx

"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  ReceiptText,
  ShieldAlert,
} from "lucide-react";
import {
  generarFacturacionManualAction,
  type FacturacionManualActionState,
} from "@/actions/movimiento-financiero.actions";

type FacturacionManualFormProps = {
  defaultMes: number;
  defaultAnio: number;
};

const initialState: FacturacionManualActionState = {
  ok: false,
  message: "",
  generadas: 0,
  omitidas: 0,
  ajustes: 0,
};

const meses = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const inputClass =
  "h-8 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-[12px] font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500";

const selectClass =
  "h-8 w-full appearance-none rounded-lg border border-slate-300 bg-white px-2.5 pr-8 text-[12px] font-normal text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-blue-500";

const textareaClass =
  "h-20 w-full resize-none rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-[12px] font-normal leading-5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500";

const labelClass =
  "mb-1 block text-[11px] font-medium text-slate-700 dark:text-slate-300";

const submitButtonClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-blue-600 bg-blue-600 px-3 !text-[12px] !font-medium !leading-none text-white shadow-sm shadow-blue-950/10 transition hover:border-blue-700 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-blue-500 dark:bg-blue-500 dark:text-white dark:hover:border-blue-600 dark:hover:bg-blue-600";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={submitButtonClass}>
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
          <span className="text-[12px] leading-none text-white">
            Ejecutando
          </span>
        </>
      ) : (
        <>
          <ReceiptText className="h-3.5 w-3.5 text-white" />
          <span className="text-[12px] leading-none text-white">
            Ejecutar facturación
          </span>
        </>
      )}
    </button>
  );
}

export function FacturacionManualForm({
  defaultMes,
  defaultAnio,
}: FacturacionManualFormProps) {
  const [state, formAction] = useFormState(
    generarFacturacionManualAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
        <div className="flex gap-2.5">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

          <div>
            <p className="font-semibold">Importante</p>

            <p className="mt-1">
              Este botón usa la misma lógica que usará el cron. El corte es fijo
              el día 28 de cada mes, no se puede modificar. Si un cliente fue
              dado de alta en meses anteriores, genera automáticamente los
              períodos pendientes desde el alta hasta el período seleccionado.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="referenciaMes" className={labelClass}>
            Hasta mes
          </label>

          <div className="relative">
            <select
              id="referenciaMes"
              name="referenciaMes"
              defaultValue={defaultMes}
              className={selectClass}
            >
              {meses.map((mes) => (
                <option key={mes.value} value={mes.value}>
                  {mes.label}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          </div>
        </div>

        <div>
          <label htmlFor="referenciaAnio" className={labelClass}>
            Año
          </label>

          <input
            id="referenciaAnio"
            name="referenciaAnio"
            type="number"
            defaultValue={defaultAnio}
            className={inputClass}
          />
        </div>

        <div>
          <span className={labelClass}>Corte</span>

          <div className="flex h-8 items-center rounded-lg border border-slate-300 bg-slate-50 px-2.5 text-[12px] font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300">
            Día 28 de cada mes
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="observacion" className={labelClass}>
          Observación
        </label>

        <textarea
          id="observacion"
          name="observacion"
          rows={3}
          placeholder="Opcional"
          className={textareaClass}
        />
      </div>

      {state.message ? (
        <div
          className={`rounded-lg border px-3 py-2.5 text-[12px] leading-5 ${
            state.ok
              ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          <div className="flex gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

            <div>
              <p>{state.message}</p>

              {state.ok ? (
                <p className="mt-1 text-[11px]">
                  Facturas: {state.generadas || 0} · Ajustes:{" "}
                  {state.ajustes || 0} · Omitidas: {state.omitidas || 0}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
// // src/components/forms/FacturacionManualForm.tsx

// "use client";

// import { useFormState, useFormStatus } from "react-dom";
// import {
//   CheckCircle2,
//   Loader2,
//   ReceiptText,
//   ShieldAlert,
// } from "lucide-react";
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
//           Generando
//         </>
//       ) : (
//         <>
//           <ReceiptText className="h-3.5 w-3.5" />
//           Generar facturación
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
//               Esta acción generará una factura mensual para todos los clientes
//               activos con plan contratado. Si un cliente ya tiene factura para el
//               mes y año seleccionado, se omitirá para evitar duplicados.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-3 sm:grid-cols-2">
//         <div>
//           <label
//             htmlFor="referenciaMes"
//             className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
//           >
//             Mes a facturar
//           </label>

//           <select
//             id="referenciaMes"
//             name="referenciaMes"
//             defaultValue={defaultMes}
//             className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
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
//             className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white"
//           />
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
//                   Generadas: {state.generadas || 0} · Omitidas:{" "}
//                   {state.omitidas || 0}
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
  CalendarDays,
  CheckCircle2,
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
  defaultFechaCorte?: string;
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
  "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white";

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
          Ejecutando
        </>
      ) : (
        <>
          <ReceiptText className="h-3.5 w-3.5" />
          Ejecutar facturación
        </>
      )}
    </button>
  );
}

export function FacturacionManualForm({
  defaultMes,
  defaultAnio,
  defaultFechaCorte,
}: FacturacionManualFormProps) {
  const [state, formAction] = useFormState(
    generarFacturacionManualAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
        <div className="flex gap-2">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

          <div>
            <p className="font-medium">Importante</p>

            <p className="mt-1">
              Este botón usa la misma lógica que usará el cron. Regulariza
              proporcionales hasta la fecha de corte y genera la mensualidad del
              período seleccionado, evitando duplicados.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label
            htmlFor="referenciaMes"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
          >
            Mes a facturar
          </label>

          <select
            id="referenciaMes"
            name="referenciaMes"
            defaultValue={defaultMes}
            className={inputClass}
          >
            {meses.map((mes) => (
              <option key={mes.value} value={mes.value}>
                {mes.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="referenciaAnio"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
          >
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
          <label
            htmlFor="fechaCorte"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
          >
            Fecha de corte
          </label>

          <div className="relative">
            <input
              id="fechaCorte"
              name="fechaCorte"
              type="date"
              defaultValue={defaultFechaCorte}
              className={`${inputClass} pr-9`}
            />

            <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="observacion"
          className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
        >
          Observación
        </label>

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
          className={`rounded-2xl border p-3 text-xs leading-5 ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          <div className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

            <div>
              <p>{state.message}</p>

              {state.ok ? (
                <p className="mt-1 text-[11px]">
                  Mensualidades: {state.generadas || 0} · Ajustes:{" "}
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
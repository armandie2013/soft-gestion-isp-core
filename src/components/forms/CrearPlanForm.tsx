// // src/components/forms/CrearPlanForm.tsx

// "use client";

// import { useEffect } from "react";
// import type { ReactNode } from "react";
// import { useFormState, useFormStatus } from "react-dom";
// import { useRouter } from "next/navigation";
// import { FileText, Loader2, RadioTower, Save, Wifi } from "lucide-react";
// import {
//   crearPlanAction,
//   type PlanActionState,
// } from "@/actions/plan.actions";
// import { CurrencyInput } from "@/components/forms/CurrencyInput";

// const initialState: PlanActionState = {
//   ok: false,
//   message: "",
// };

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
//           Guardando
//         </>
//       ) : (
//         <>
//           <Save className="h-3.5 w-3.5" />
//           Guardar plan
//         </>
//       )}
//     </button>
//   );
// }

// function FieldLabel({
//   htmlFor,
//   children,
// }: {
//   htmlFor: string;
//   children: ReactNode;
// }) {
//   return (
//     <label
//       htmlFor={htmlFor}
//       className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
//     >
//       {children}
//     </label>
//   );
// }

// function FormSection({
//   icon,
//   eyebrow,
//   title,
//   description,
//   children,
// }: {
//   icon: ReactNode;
//   eyebrow: string;
//   title: string;
//   description?: string;
//   children: ReactNode;
// }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/40 sm:p-3.5">
//       <div className="mb-3 flex items-start gap-3">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//           {icon}
//         </div>

//         <div className="min-w-0">
//           <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
//             {eyebrow}
//           </p>

//           <h3 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//             {title}
//           </h3>

//           {description ? (
//             <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//               {description}
//             </p>
//           ) : null}
//         </div>
//       </div>

//       {children}
//     </div>
//   );
// }

// const inputClass =
//   "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white";

// export function CrearPlanForm() {
//   const router = useRouter();
//   const [state, formAction] = useFormState(crearPlanAction, initialState);

//   useEffect(() => {
//     if (state.ok) {
//       router.push("/planes");
//       router.refresh();
//     }
//   }, [router, state.ok]);

//   return (
//     <form action={formAction} className="space-y-4">
//       <FormSection
//         icon={<Wifi className="h-4 w-4" />}
//         eyebrow="Identificación"
//         title="Datos principales"
//         description="Nombre comercial y detalle visible del plan."
//       >
//         <div className="grid gap-3 md:grid-cols-2">
//           <div>
//             <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

//             <input
//               id="nombre"
//               name="nombre"
//               type="text"
//               placeholder="Ej: Plan Estándar + TV"
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <FieldLabel htmlFor="tipo">Tipo</FieldLabel>

//             <select
//               id="tipo"
//               name="tipo"
//               defaultValue="residencial"
//               className={inputClass}
//             >
//               <option value="residencial">Residencial</option>
//               <option value="comercial">Comercial</option>
//               <option value="corporativo">Corporativo</option>
//               <option value="dedicado">Dedicado</option>
//               <option value="otro">Otro</option>
//             </select>
//           </div>

//           <div className="md:col-span-2">
//             <FieldLabel htmlFor="detalle">Detalle</FieldLabel>

//             <textarea
//               id="detalle"
//               name="detalle"
//               rows={3}
//               placeholder="Detalle del servicio incluido en el plan"
//               className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600"
//             />
//           </div>
//         </div>
//       </FormSection>

//       <FormSection
//         icon={<FileText className="h-4 w-4" />}
//         eyebrow="Facturación"
//         title="Importe mensual"
//         description="Solo se permiten importes enteros. Se muestra con formato argentino y se guarda como Int32."
//       >
//         <div className="grid gap-3 md:grid-cols-2">
//           <div>
//             <FieldLabel htmlFor="importe">Importe</FieldLabel>

//             <CurrencyInput
//               id="importe"
//               name="importe"
//               defaultValue=""
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <FieldLabel htmlFor="estado">Estado</FieldLabel>

//             <select
//               id="estado"
//               name="estado"
//               defaultValue="activo"
//               className={inputClass}
//             >
//               <option value="activo">Activo</option>
//               <option value="inactivo">Inactivo</option>
//             </select>
//           </div>
//         </div>
//       </FormSection>

//       <FormSection
//         icon={<RadioTower className="h-4 w-4" />}
//         eyebrow="Referencia"
//         title="Uso del plan"
//         description="Esta información ayuda a mantener consistencia operativa."
//       >
//         <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//           El plan activo aparecerá disponible para nuevas altas de clientes. Si
//           lo dejás inactivo, quedará guardado pero no se podrá seleccionar en
//           nuevos clientes.
//         </div>
//       </FormSection>

//       {state.message ? (
//         <div
//           className={`rounded-2xl border px-3 py-2 text-xs leading-5 ${
//             state.ok
//               ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//               : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
//           }`}
//         >
//           {state.message}
//         </div>
//       ) : null}

//       <div className="flex justify-end">
//         <SubmitButton />
//       </div>
//     </form>
//   );
// }

// // src/components/forms/CrearPlanForm.tsx

// "use client";

// import { useEffect } from "react";
// import type { ReactNode } from "react";
// import { useFormState, useFormStatus } from "react-dom";
// import { useRouter } from "next/navigation";
// import { ChevronDown, FileText, Loader2, Save, Wifi } from "lucide-react";
// import {
//   crearPlanAction,
//   type PlanActionState,
// } from "@/actions/plan.actions";
// import { CurrencyInput } from "@/components/forms/CurrencyInput";

// const initialState: PlanActionState = {
//   ok: false,
//   message: "",
// };

// const cardBase =
//   "rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none";

// const inputClass =
//   "h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600 sm:h-9 sm:text-xs";

// const selectClass =
//   "h-10 w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 pr-9 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-cyan-700 sm:h-9 sm:text-xs";

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-sm font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:h-10 sm:w-auto sm:min-w-[170px] sm:text-xs"
//     >
//       {pending ? (
//         <>
//           <Loader2 className="h-4 w-4 animate-spin sm:h-3.5 sm:w-3.5" />
//           Guardando...
//         </>
//       ) : (
//         <>
//           <Save className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
//           Guardar plan
//         </>
//       )}
//     </button>
//   );
// }

// function FieldLabel({
//   htmlFor,
//   children,
// }: {
//   htmlFor: string;
//   children: ReactNode;
// }) {
//   return (
//     <label
//       htmlFor={htmlFor}
//       className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:mb-1"
//     >
//       {children}
//     </label>
//   );
// }

// function SelectField({
//   id,
//   name,
//   defaultValue,
//   children,
// }: {
//   id: string;
//   name: string;
//   defaultValue: string;
//   children: ReactNode;
// }) {
//   return (
//     <div className="relative">
//       <select
//         id={id}
//         name={name}
//         defaultValue={defaultValue}
//         className={selectClass}
//       >
//         {children}
//       </select>

//       <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500 sm:h-3.5 sm:w-3.5" />
//     </div>
//   );
// }

// function FormSection({
//   icon,
//   eyebrow,
//   title,
//   children,
// }: {
//   icon: ReactNode;
//   eyebrow: string;
//   title: string;
//   children: ReactNode;
// }) {
//   return (
//     <section className={cardBase}>
//       <div className="mb-4 flex items-start gap-3 sm:mb-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900 sm:h-9 sm:w-9 sm:rounded-xl">
//           {icon}
//         </div>

//         <div className="min-w-0">
//           <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300 sm:text-[10px]">
//             {eyebrow}
//           </p>

//           <h3 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white sm:text-sm">
//             {title}
//           </h3>
//         </div>
//       </div>

//       {children}
//     </section>
//   );
// }

// function MessageBox({
//   ok,
//   children,
// }: {
//   ok: boolean;
//   children: ReactNode;
// }) {
//   return (
//     <div
//       className={`rounded-2xl border px-3 py-2.5 shadow-sm ${
//         ok
//           ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200"
//           : "border-red-300 bg-red-50 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200"
//       }`}
//     >
//       <p className="text-xs leading-5 sm:text-[11px] sm:leading-4">
//         {children}
//       </p>
//     </div>
//   );
// }

// export function CrearPlanForm() {
//   const router = useRouter();
//   const [state, formAction] = useFormState(crearPlanAction, initialState);

//   useEffect(() => {
//     if (state.ok) {
//       router.push("/planes");
//       router.refresh();
//     }
//   }, [router, state.ok]);

//   return (
//     <form action={formAction} className="space-y-3">
//       <FormSection
//         icon={<Wifi className="h-4 w-4" />}
//         eyebrow="Plan"
//         title="Datos principales"
//       >
//         <div className="grid gap-3 md:grid-cols-2">
//           <div>
//             <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

//             <input
//               id="nombre"
//               name="nombre"
//               type="text"
//               placeholder="Ej: Plan Estándar + TV"
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <FieldLabel htmlFor="tipo">Tipo</FieldLabel>

//             <SelectField id="tipo" name="tipo" defaultValue="residencial">
//               <option value="residencial">Residencial</option>
//               <option value="comercial">Comercial</option>
//               <option value="corporativo">Corporativo</option>
//               <option value="dedicado">Dedicado</option>
//               <option value="otro">Otro</option>
//             </SelectField>
//           </div>

//           <div className="md:col-span-2">
//             <FieldLabel htmlFor="detalle">Detalle</FieldLabel>

//             <textarea
//               id="detalle"
//               name="detalle"
//               rows={2}
//               placeholder="Detalle del servicio incluido en el plan"
//               className="h-20 w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm leading-5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600 sm:h-16 sm:text-xs"
//             />
//           </div>
//         </div>
//       </FormSection>

//       <FormSection
//         icon={<FileText className="h-4 w-4" />}
//         eyebrow="Facturación"
//         title="Importe y estado"
//       >
//         <div className="grid gap-3 md:grid-cols-2">
//           <div>
//             <FieldLabel htmlFor="importe">Importe</FieldLabel>

//             <CurrencyInput
//               id="importe"
//               name="importe"
//               defaultValue=""
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <FieldLabel htmlFor="estado">Estado</FieldLabel>

//             <SelectField id="estado" name="estado" defaultValue="activo">
//               <option value="activo">Activo</option>
//               <option value="inactivo">Inactivo</option>
//             </SelectField>
//           </div>
//         </div>
//       </FormSection>

//       {state.message ? (
//         <MessageBox ok={state.ok}>{state.message}</MessageBox>
//       ) : null}

//       <section className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
//         <div className="flex justify-end">
//           <SubmitButton />
//         </div>
//       </section>
//     </form>
//   );
// }

// src/components/forms/CrearPlanForm.tsx

"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { ChevronDown, FileText, Loader2, Save, Wifi } from "lucide-react";
import {
  crearPlanAction,
  type PlanActionState,
} from "@/actions/plan.actions";
import { CurrencyInput } from "@/components/forms/CurrencyInput";

const initialState: PlanActionState = {
  ok: false,
  message: "",
};

const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

const inputClass =
  "h-8 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-[12px] font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500";

const selectClass =
  "h-8 w-full appearance-none rounded-lg border border-slate-300 bg-white px-2.5 pr-8 text-[12px] font-normal text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-blue-500";

const textareaClass =
  "h-16 w-full resize-none rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-[12px] font-normal leading-5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500";

const sectionTitleClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

const sectionSubtitleClass =
  "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

const sectionDescriptionClass =
  "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

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
            Guardando...
          </span>
        </>
      ) : (
        <>
          <Save className="h-3.5 w-3.5 text-white" />
          <span className="text-[12px] leading-none text-white">
            Guardar plan
          </span>
        </>
      )}
    </button>
  );
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 block text-[11px] font-medium text-slate-700 dark:text-slate-300"
    >
      {children}
    </label>
  );
}

function SelectField({
  id,
  name,
  defaultValue,
  children,
}: {
  id: string;
  name: string;
  defaultValue: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={selectClass}
      >
        {children}
      </select>

      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
    </div>
  );
}

function FormSection({
  icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          {icon}
        </div>

        <div className="min-w-0">
          <p className={sectionTitleClass}>{eyebrow}</p>

          <h3 className={sectionSubtitleClass}>{title}</h3>

          {description ? (
            <p className={sectionDescriptionClass}>{description}</p>
          ) : null}
        </div>
      </div>

      {children}
    </section>
  );
}

function MessageBox({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 shadow-sm ${
        ok
          ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200"
          : "border-red-300 bg-red-50 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200"
      }`}
    >
      <p className="text-[12px] leading-5">{children}</p>
    </div>
  );
}

export function CrearPlanForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(crearPlanAction, initialState);

  useEffect(() => {
    if (state.ok) {
      router.push("/planes");
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form action={formAction} className="space-y-3">
      <FormSection
        icon={<Wifi className="h-4 w-4" />}
        eyebrow="Plan"
        title="Datos principales"
        description="Definí el nombre comercial, tipo y detalle del servicio."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej: Plan Estándar + TV"
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="tipo">Tipo</FieldLabel>

            <SelectField id="tipo" name="tipo" defaultValue="residencial">
              <option value="residencial">Residencial</option>
              <option value="comercial">Comercial</option>
              <option value="corporativo">Corporativo</option>
              <option value="dedicado">Dedicado</option>
              <option value="otro">Otro</option>
            </SelectField>
          </div>

          <div className="md:col-span-2">
            <FieldLabel htmlFor="detalle">Detalle</FieldLabel>

            <textarea
              id="detalle"
              name="detalle"
              rows={2}
              placeholder="Detalle del servicio incluido en el plan"
              className={textareaClass}
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        icon={<FileText className="h-4 w-4" />}
        eyebrow="Facturación"
        title="Importe y estado"
        description="Configurá el valor mensual y la disponibilidad del plan."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="importe">Importe</FieldLabel>

            <CurrencyInput
              id="importe"
              name="importe"
              defaultValue=""
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel htmlFor="estado">Estado</FieldLabel>

            <SelectField id="estado" name="estado" defaultValue="activo">
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </SelectField>
          </div>
        </div>
      </FormSection>

      {state.message ? (
        <MessageBox ok={state.ok}>{state.message}</MessageBox>
      ) : null}

      <section className={`${panelClass} p-3.5`}>
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </section>
    </form>
  );
}
// // src/components/forms/EditarClienteForm.tsx

// "use client";

// import { useEffect } from "react";
// import type { ReactNode } from "react";
// import { useFormState, useFormStatus } from "react-dom";
// import { useRouter } from "next/navigation";
// import { Loader2, MapPin, Save, UserRound, Wifi } from "lucide-react";
// import {
//   actualizarClienteAction,
//   type ClienteActionState,
// } from "@/actions/cliente.actions";
// import type { ClienteSafe } from "@/types/cliente.types";
// import type { PlanSafe } from "@/types/plan.types";

// type EditarClienteFormProps = {
//   cliente: ClienteSafe;
//   planes: PlanSafe[];
// };

// const initialState: ClienteActionState = {
//   ok: false,
//   message: "",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

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
//           Guardar cambios
//         </>
//       )}
//     </button>
//   );
// }

// function FieldLabel({
//   htmlFor,
//   children,
//   optional,
// }: {
//   htmlFor: string;
//   children: ReactNode;
//   optional?: boolean;
// }) {
//   return (
//     <label
//       htmlFor={htmlFor}
//       className="mb-1.5 flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
//     >
//       <span>{children}</span>

//       {optional ? (
//         <span className="text-[10px] normal-case tracking-normal text-slate-400 dark:text-slate-500">
//           Opcional
//         </span>
//       ) : null}
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

// export function EditarClienteForm({
//   cliente,
//   planes,
// }: EditarClienteFormProps) {
//   const router = useRouter();
//   const [state, formAction] = useFormState(actualizarClienteAction, initialState);

//   useEffect(() => {
//     if (state.ok) {
//       router.refresh();
//     }
//   }, [router, state.ok]);

//   return (
//     <form action={formAction} className="space-y-4">
//       <input type="hidden" name="id" value={cliente.id} />

//       <FormSection
//         icon={<UserRound className="h-4 w-4" />}
//         eyebrow="Titular"
//         title="Datos personales"
//         description="Información básica del titular del servicio."
//       >
//         <div className="grid gap-3 md:grid-cols-2">
//           <div>
//             <FieldLabel htmlFor="numeroCliente">Número de cliente</FieldLabel>

//             <input
//               id="numeroCliente"
//               value={cliente.numeroCliente}
//               disabled
//               className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500 dark:bg-slate-900/60 dark:text-slate-500`}
//             />
//           </div>

//           <div>
//             <FieldLabel htmlFor="estado">Estado</FieldLabel>

//             <select
//               id="estado"
//               name="estado"
//               defaultValue={cliente.estado}
//               className={inputClass}
//             >
//               <option value="activo">Activo</option>
//               <option value="suspendido">Suspendido</option>
//               <option value="baja">Baja</option>
//             </select>
//           </div>

//           <div>
//             <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

//             <input
//               id="nombre"
//               name="nombre"
//               type="text"
//               defaultValue={cliente.nombre}
//               autoComplete="given-name"
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <FieldLabel htmlFor="apellido">Apellido</FieldLabel>

//             <input
//               id="apellido"
//               name="apellido"
//               type="text"
//               defaultValue={cliente.apellido}
//               autoComplete="family-name"
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <FieldLabel htmlFor="dni">DNI</FieldLabel>

//             <input
//               id="dni"
//               name="dni"
//               type="text"
//               inputMode="numeric"
//               defaultValue={cliente.dni}
//               autoComplete="off"
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>

//             <input
//               id="telefono"
//               name="telefono"
//               type="text"
//               inputMode="tel"
//               defaultValue={cliente.telefono}
//               autoComplete="tel"
//               className={inputClass}
//             />
//           </div>
//         </div>
//       </FormSection>

//       <FormSection
//         icon={<MapPin className="h-4 w-4" />}
//         eyebrow="Ubicación"
//         title="Domicilio y contacto"
//         description="Datos necesarios para ubicar al cliente."
//       >
//         <div className="grid gap-3 md:grid-cols-2">
//           <div className="md:col-span-2">
//             <FieldLabel htmlFor="direccion">Dirección</FieldLabel>

//             <input
//               id="direccion"
//               name="direccion"
//               type="text"
//               defaultValue={cliente.direccion}
//               autoComplete="street-address"
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <FieldLabel htmlFor="localidad">Localidad</FieldLabel>

//             <input
//               id="localidad"
//               name="localidad"
//               type="text"
//               defaultValue={cliente.localidad}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <FieldLabel htmlFor="provincia">Provincia</FieldLabel>

//             <input
//               id="provincia"
//               name="provincia"
//               type="text"
//               defaultValue={cliente.provincia}
//               className={inputClass}
//             />
//           </div>

//           <div className="md:col-span-2">
//             <FieldLabel htmlFor="email" optional>
//               Email
//             </FieldLabel>

//             <input
//               id="email"
//               name="email"
//               type="email"
//               defaultValue={cliente.email}
//               autoComplete="email"
//               className={inputClass}
//             />
//           </div>
//         </div>
//       </FormSection>

//       <FormSection
//         icon={<Wifi className="h-4 w-4" />}
//         eyebrow="Servicio"
//         title="Plan contratado"
//         description="Modificá el plan asignado al cliente."
//       >
//         <div className="grid gap-3 md:grid-cols-2">
//           <div>
//             <FieldLabel htmlFor="planId">Plan</FieldLabel>

//             <select
//               id="planId"
//               name="planId"
//               defaultValue={cliente.planId}
//               className={inputClass}
//             >
//               <option value="">Seleccionar plan</option>

//               {planes.map((plan) => (
//                 <option key={plan.id} value={plan.id}>
//                   {plan.nombre} - {formatMoney(plan.importe)}
//                   {plan.estado !== "activo" ? " (inactivo)" : ""}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
//             <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//               Plan actual
//             </p>

//             <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//               {cliente.plan?.nombre || "Sin plan"}
//             </p>

//             <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
//               {cliente.plan
//                 ? `${cliente.plan.tipo} · ${formatMoney(cliente.plan.importe)}`
//                 : "No hay plan asignado"}
//             </p>
//           </div>
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

//       {planes.length === 0 ? (
//         <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300">
//           No hay planes disponibles para asignar.
//         </div>
//       ) : null}

//       <div className="flex justify-end">
//         <SubmitButton />
//       </div>
//     </form>
//   );
// }

// src/components/forms/EditarClienteForm.tsx

"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Loader2,
  MapPin,
  Save,
  UserRound,
  Wifi,
} from "lucide-react";
import {
  actualizarClienteAction,
  type ClienteActionState,
} from "@/actions/cliente.actions";
import type { ClienteSafe } from "@/types/cliente.types";
import type { PlanSafe } from "@/types/plan.types";

type EditarClienteFormProps = {
  cliente: ClienteSafe;
  planes: PlanSafe[];
  variant?: "default" | "desktop";
};

const initialState: ClienteActionState = {
  ok: false,
  message: "",
};

const inputClass =
  "h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-700 dark:disabled:bg-slate-900/60 dark:disabled:text-slate-500 lg:h-9";

const selectClass =
  "h-10 w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 pr-9 text-[11px] font-medium text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:focus:border-cyan-700 lg:h-9 lg:text-[10px]";

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function getNombreCompleto(cliente: ClienteSafe) {
  const apellido = String(cliente.apellido || "").trim();
  const nombre = String(cliente.nombre || "").trim();

  const completo = `${apellido}, ${nombre}`
    .replace(/^,\s*/, "")
    .replace(/,\s*$/, "")
    .trim();

  return completo || "Cliente sin nombre";
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto lg:h-9"
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Guardando
        </>
      ) : (
        <>
          <Save className="h-3.5 w-3.5" />
          Guardar cambios
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
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
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

function SelectField({
  id,
  name,
  defaultValue,
  children,
}: {
  id: string;
  name: string;
  defaultValue?: string;
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

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
    </div>
  );
}

function FormSection({
  icon,
  eyebrow,
  title,
  description,
  children,
  compact = false,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none sm:p-3.5">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
            {eyebrow}
          </p>

          <h3 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
            {title}
          </h3>

          {description ? (
            <p
              className={`mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400 ${
                compact ? "hidden sm:block" : ""
              }`}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {children}
    </div>
  );
}

export function EditarClienteForm({
  cliente,
  planes,
  variant = "default",
}: EditarClienteFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(actualizarClienteAction, initialState);
  const isDesktop = variant === "desktop";

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form
      action={formAction}
      className={
        isDesktop
          ? "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3.5 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none"
          : "space-y-3"
      }
    >
      <input type="hidden" name="id" value={cliente.id} />

      {isDesktop ? (
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
            <UserRound className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              Datos del cliente
            </p>

            <h2 className="mt-0.5 truncate text-sm font-medium text-slate-950 dark:text-white">
              {getNombreCompleto(cliente)}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
              El número de cliente no se puede modificar.
            </p>
          </div>
        </div>
      ) : null}

      <div className={isDesktop ? "grid gap-3" : "space-y-3"}>
        <FormSection
          icon={<UserRound className="h-4 w-4" />}
          eyebrow="Titular"
          title="Datos personales"
          description="Información básica del titular del servicio."
          compact={!isDesktop}
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <FieldLabel htmlFor="numeroCliente">Número cliente</FieldLabel>

              <input
                id="numeroCliente"
                value={cliente.numeroCliente}
                disabled
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel htmlFor="estado">Estado</FieldLabel>

              <SelectField
                id="estado"
                name="estado"
                defaultValue={cliente.estado}
              >
                <option value="activo">Activo</option>
                <option value="suspendido">Suspendido</option>
                <option value="baja">Baja</option>
              </SelectField>
            </div>

            <div>
              <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

              <input
                id="nombre"
                name="nombre"
                type="text"
                defaultValue={cliente.nombre}
                autoComplete="given-name"
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel htmlFor="apellido">Apellido</FieldLabel>

              <input
                id="apellido"
                name="apellido"
                type="text"
                defaultValue={cliente.apellido}
                autoComplete="family-name"
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel htmlFor="dni">DNI</FieldLabel>

              <input
                id="dni"
                name="dni"
                type="text"
                inputMode="numeric"
                defaultValue={cliente.dni}
                autoComplete="off"
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>

              <input
                id="telefono"
                name="telefono"
                type="text"
                inputMode="tel"
                defaultValue={cliente.telefono}
                autoComplete="tel"
                className={inputClass}
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          icon={<MapPin className="h-4 w-4" />}
          eyebrow="Ubicación"
          title="Domicilio y contacto"
          description="Datos necesarios para ubicar al cliente."
          compact={!isDesktop}
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="md:col-span-2 xl:col-span-2">
              <FieldLabel htmlFor="direccion">Dirección</FieldLabel>

              <input
                id="direccion"
                name="direccion"
                type="text"
                defaultValue={cliente.direccion}
                autoComplete="street-address"
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel htmlFor="localidad">Localidad</FieldLabel>

              <input
                id="localidad"
                name="localidad"
                type="text"
                defaultValue={cliente.localidad}
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel htmlFor="provincia">Provincia</FieldLabel>

              <input
                id="provincia"
                name="provincia"
                type="text"
                defaultValue={cliente.provincia}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2 xl:col-span-4">
              <FieldLabel htmlFor="email" optional>
                Email
              </FieldLabel>

              <input
                id="email"
                name="email"
                type="email"
                defaultValue={cliente.email}
                autoComplete="email"
                className={inputClass}
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          icon={<Wifi className="h-4 w-4" />}
          eyebrow="Servicio"
          title="Plan contratado"
          description="Modificá el plan asignado al cliente."
          compact={!isDesktop}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="planId">Plan</FieldLabel>

              <SelectField
                id="planId"
                name="planId"
                defaultValue={cliente.planId}
              >
                <option value="">Seleccionar plan</option>

                {planes.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.nombre} - {formatMoney(plan.importe)}
                    {plan.estado !== "activo" ? " (inactivo)" : ""}
                  </option>
                ))}
              </SelectField>
            </div>

            <div className="rounded-2xl border border-slate-300 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Plan actual
              </p>

              <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
                {cliente.plan?.nombre || "Sin plan"}
              </p>

              <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                {cliente.plan
                  ? `${cliente.plan.tipo} · ${formatMoney(cliente.plan.importe)}`
                  : "No hay plan asignado"}
              </p>
            </div>
          </div>
        </FormSection>
      </div>

      {state.message ? (
        <div
          className={`mt-3 rounded-2xl border px-3 py-2 text-xs leading-5 ${
            state.ok
              ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      {planes.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-red-300 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300">
          No hay planes disponibles para asignar.
        </div>
      ) : null}

      <div className="mt-3 flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
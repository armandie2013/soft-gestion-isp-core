// // // src/components/forms/ClienteForm.tsx

// // "use client";

// // import { useEffect } from "react";
// // import type { ReactNode } from "react";
// // import { useFormState, useFormStatus } from "react-dom";
// // import { useRouter } from "next/navigation";
// // import { Loader2, MapPin, Save, UserRound, Wifi } from "lucide-react";
// // import {
// //   crearClienteAction,
// //   type ClienteActionState,
// // } from "@/actions/cliente.actions";
// // import type { PlanSafe } from "@/types/plan.types";

// // type ClienteFormProps = {
// //   planes: PlanSafe[];
// // };

// // const initialState: ClienteActionState = {
// //   ok: false,
// //   message: "",
// // };

// // function formatMoney(value: number) {
// //   return new Intl.NumberFormat("es-AR", {
// //     style: "currency",
// //     currency: "ARS",
// //     maximumFractionDigits: 2,
// //   }).format(value || 0);
// // }

// // function SubmitButton({ disabled }: { disabled?: boolean }) {
// //   const { pending } = useFormStatus();

// //   return (
// //     <button
// //       type="submit"
// //       disabled={pending || disabled}
// //       className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-3 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
// //     >
// //       {pending ? (
// //         <>
// //           <Loader2 className="h-3.5 w-3.5 animate-spin" />
// //           Guardando
// //         </>
// //       ) : (
// //         <>
// //           <Save className="h-3.5 w-3.5" />
// //           Guardar cliente
// //         </>
// //       )}
// //     </button>
// //   );
// // }

// // function FieldLabel({
// //   htmlFor,
// //   children,
// //   optional,
// // }: {
// //   htmlFor: string;
// //   children: ReactNode;
// //   optional?: boolean;
// // }) {
// //   return (
// //     <label
// //       htmlFor={htmlFor}
// //       className="mb-1.5 flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
// //     >
// //       <span>{children}</span>

// //       {optional ? (
// //         <span className="text-[10px] normal-case tracking-normal text-slate-400 dark:text-slate-500">
// //           Opcional
// //         </span>
// //       ) : null}
// //     </label>
// //   );
// // }

// // function FormSection({
// //   icon,
// //   eyebrow,
// //   title,
// //   description,
// //   children,
// // }: {
// //   icon: ReactNode;
// //   eyebrow: string;
// //   title: string;
// //   description?: string;
// //   children: ReactNode;
// // }) {
// //   return (
// //     <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/40 sm:p-3.5">
// //       <div className="mb-3 flex items-start gap-3">
// //         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
// //           {icon}
// //         </div>

// //         <div className="min-w-0">
// //           <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
// //             {eyebrow}
// //           </p>

// //           <h3 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
// //             {title}
// //           </h3>

// //           {description ? (
// //             <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
// //               {description}
// //             </p>
// //           ) : null}
// //         </div>
// //       </div>

// //       {children}
// //     </div>
// //   );
// // }

// // const inputClass =
// //   "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white";

// // export function ClienteForm({ planes }: ClienteFormProps) {
// //   const router = useRouter();
// //   const [state, formAction] = useFormState(crearClienteAction, initialState);

// //   useEffect(() => {
// //     if (state.ok) {
// //       router.push("/clientes");
// //       router.refresh();
// //     }
// //   }, [router, state.ok]);

// //   return (
// //     <form action={formAction} className="space-y-4">
// //       <FormSection
// //         icon={<UserRound className="h-4 w-4" />}
// //         eyebrow="Titular"
// //         title="Datos personales"
// //         description="Información básica del titular del servicio."
// //       >
// //         <div className="grid gap-3 md:grid-cols-2">
// //           <div>
// //             <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

// //             <input
// //               id="nombre"
// //               name="nombre"
// //               type="text"
// //               autoComplete="given-name"
// //               className={inputClass}
// //             />
// //           </div>

// //           <div>
// //             <FieldLabel htmlFor="apellido">Apellido</FieldLabel>

// //             <input
// //               id="apellido"
// //               name="apellido"
// //               type="text"
// //               autoComplete="family-name"
// //               className={inputClass}
// //             />
// //           </div>

// //           <div>
// //             <FieldLabel htmlFor="dni">DNI</FieldLabel>

// //             <input
// //               id="dni"
// //               name="dni"
// //               type="text"
// //               inputMode="numeric"
// //               autoComplete="off"
// //               className={inputClass}
// //             />
// //           </div>

// //           <div>
// //             <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>

// //             <input
// //               id="telefono"
// //               name="telefono"
// //               type="text"
// //               inputMode="tel"
// //               autoComplete="tel"
// //               className={inputClass}
// //             />
// //           </div>
// //         </div>
// //       </FormSection>

// //       <FormSection
// //         icon={<MapPin className="h-4 w-4" />}
// //         eyebrow="Ubicación"
// //         title="Domicilio y contacto"
// //         description="Datos necesarios para ubicar al cliente."
// //       >
// //         <div className="grid gap-3 md:grid-cols-2">
// //           <div className="md:col-span-2">
// //             <FieldLabel htmlFor="direccion">Dirección</FieldLabel>

// //             <input
// //               id="direccion"
// //               name="direccion"
// //               type="text"
// //               autoComplete="street-address"
// //               className={inputClass}
// //             />
// //           </div>

// //           <div>
// //             <FieldLabel htmlFor="localidad">Localidad</FieldLabel>

// //             <input
// //               id="localidad"
// //               name="localidad"
// //               type="text"
// //               className={inputClass}
// //             />
// //           </div>

// //           <div>
// //             <FieldLabel htmlFor="provincia">Provincia</FieldLabel>

// //             <input
// //               id="provincia"
// //               name="provincia"
// //               type="text"
// //               defaultValue="Catamarca"
// //               className={inputClass}
// //             />
// //           </div>

// //           <div className="md:col-span-2">
// //             <FieldLabel htmlFor="email" optional>
// //               Email
// //             </FieldLabel>

// //             <input
// //               id="email"
// //               name="email"
// //               type="email"
// //               autoComplete="email"
// //               className={inputClass}
// //             />
// //           </div>
// //         </div>
// //       </FormSection>

// //       <FormSection
// //         icon={<Wifi className="h-4 w-4" />}
// //         eyebrow="Servicio"
// //         title="Plan contratado"
// //         description="Seleccioná el plan activo que tendrá el cliente."
// //       >
// //         <div className="grid gap-3 md:grid-cols-2">
// //           <div>
// //             <FieldLabel htmlFor="estado">Estado</FieldLabel>

// //             <select
// //               id="estado"
// //               name="estado"
// //               defaultValue="activo"
// //               className={inputClass}
// //             >
// //               <option value="activo">Activo</option>
// //               <option value="suspendido">Suspendido</option>
// //               <option value="baja">Baja</option>
// //             </select>
// //           </div>

// //           <div>
// //             <FieldLabel htmlFor="planId">Plan</FieldLabel>

// //             <select
// //               id="planId"
// //               name="planId"
// //               defaultValue=""
// //               className={inputClass}
// //             >
// //               <option value="">Seleccionar plan</option>
// //               {planes.map((plan) => (
// //                 <option key={plan.id} value={plan.id}>
// //                   {plan.nombre} - {formatMoney(plan.importe)}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         </div>
// //       </FormSection>

// //       {state.message ? (
// //         <div
// //           className={`rounded-2xl border px-3 py-2 text-xs leading-5 ${
// //             state.ok
// //               ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
// //               : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
// //           }`}
// //         >
// //           {state.message}
// //         </div>
// //       ) : null}

// //       {planes.length === 0 ? (
// //         <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300">
// //           No hay planes activos disponibles. Primero cargá o activá un plan.
// //         </div>
// //       ) : null}

// //       <div className="flex justify-end">
// //         <SubmitButton disabled={planes.length === 0} />
// //       </div>
// //     </form>
// //   );
// // }

// // // src/components/forms/ClienteForm.tsx

// // "use client";

// // import { useEffect } from "react";
// // import type { ReactNode } from "react";
// // import { useFormState, useFormStatus } from "react-dom";
// // import { useRouter } from "next/navigation";
// // import {
// //   ChevronDown,
// //   Loader2,
// //   MapPin,
// //   Save,
// //   UserRound,
// //   Wifi,
// // } from "lucide-react";
// // import {
// //   crearClienteAction,
// //   type ClienteActionState,
// // } from "@/actions/cliente.actions";
// // import type { PlanSafe } from "@/types/plan.types";

// // type ClienteFormProps = {
// //   planes: PlanSafe[];
// //   variant?: "default" | "desktop";
// // };

// // const initialState: ClienteActionState = {
// //   ok: false,
// //   message: "",
// // };

// // const inputClass =
// //   "h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-700 lg:h-9";

// // const selectClass =
// //   "h-10 w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 pr-9 text-[11px] font-medium text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:focus:border-cyan-700 lg:h-9 lg:text-[10px]";

// // function formatMoney(value: number) {
// //   const amount = Number(value || 0);
// //   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
// //   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// //   return `$ ${formattedInteger},${decimalPart}`;
// // }

// // function SubmitButton({ disabled }: { disabled?: boolean }) {
// //   const { pending } = useFormStatus();

// //   return (
// //     <button
// //       type="submit"
// //       disabled={pending || disabled}
// //       className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto lg:h-9"
// //     >
// //       {pending ? (
// //         <>
// //           <Loader2 className="h-3.5 w-3.5 animate-spin" />
// //           Guardando
// //         </>
// //       ) : (
// //         <>
// //           <Save className="h-3.5 w-3.5" />
// //           Guardar cliente
// //         </>
// //       )}
// //     </button>
// //   );
// // }

// // function FieldLabel({
// //   htmlFor,
// //   children,
// //   optional,
// // }: {
// //   htmlFor: string;
// //   children: ReactNode;
// //   optional?: boolean;
// // }) {
// //   return (
// //     <label
// //       htmlFor={htmlFor}
// //       className="mb-1.5 flex items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
// //     >
// //       <span>{children}</span>

// //       {optional ? (
// //         <span className="text-[10px] normal-case tracking-normal text-slate-400 dark:text-slate-500">
// //           Opcional
// //         </span>
// //       ) : null}
// //     </label>
// //   );
// // }

// // function SelectField({
// //   id,
// //   name,
// //   defaultValue,
// //   children,
// // }: {
// //   id: string;
// //   name: string;
// //   defaultValue?: string;
// //   children: ReactNode;
// // }) {
// //   return (
// //     <div className="relative">
// //       <select
// //         id={id}
// //         name={name}
// //         defaultValue={defaultValue}
// //         className={selectClass}
// //       >
// //         {children}
// //       </select>

// //       <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
// //     </div>
// //   );
// // }

// // function FormSection({
// //   icon,
// //   eyebrow,
// //   title,
// //   description,
// //   children,
// //   compact = false,
// // }: {
// //   icon: ReactNode;
// //   eyebrow: string;
// //   title: string;
// //   description?: string;
// //   children: ReactNode;
// //   compact?: boolean;
// // }) {
// //   return (
// //     <div className="rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/55 dark:shadow-none sm:p-3.5">
// //       <div className="mb-3 flex items-start gap-3">
// //         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
// //           {icon}
// //         </div>

// //         <div className="min-w-0">
// //           <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
// //             {eyebrow}
// //           </p>

// //           <h3 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
// //             {title}
// //           </h3>

// //           {description ? (
// //             <p
// //               className={`mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400 ${
// //                 compact ? "hidden sm:block" : ""
// //               }`}
// //             >
// //               {description}
// //             </p>
// //           ) : null}
// //         </div>
// //       </div>

// //       {children}
// //     </div>
// //   );
// // }

// // export function ClienteForm({ planes, variant = "default" }: ClienteFormProps) {
// //   const router = useRouter();
// //   const [state, formAction] = useFormState(crearClienteAction, initialState);
// //   const isDesktop = variant === "desktop";

// //   useEffect(() => {
// //     if (state.ok) {
// //       router.push("/clientes");
// //       router.refresh();
// //     }
// //   }, [router, state.ok]);

// //   return (
// //     <form
// //       action={formAction}
// //       className={
// //         isDesktop
// //           ? "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3.5 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none"
// //           : "space-y-3"
// //       }
// //     >
// //       {isDesktop ? (
// //         <div className="mb-3 flex items-start gap-3">
// //           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
// //             <UserRound className="h-4 w-4" />
// //           </div>

// //           <div className="min-w-0">
// //             <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
// //               Alta de cliente
// //             </p>

// //             <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
// //               Datos del nuevo cliente
// //             </h2>

// //             <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
// //               Los campos principales son obligatorios. El email es opcional.
// //             </p>
// //           </div>
// //         </div>
// //       ) : null}

// //       <div className={isDesktop ? "grid gap-3" : "space-y-3"}>
// //         <FormSection
// //           icon={<UserRound className="h-4 w-4" />}
// //           eyebrow="Titular"
// //           title="Datos personales"
// //           description="Información básica del titular del servicio."
// //           compact={!isDesktop}
// //         >
// //           <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
// //             <div>
// //               <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

// //               <input
// //                 id="nombre"
// //                 name="nombre"
// //                 type="text"
// //                 autoComplete="given-name"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="apellido">Apellido</FieldLabel>

// //               <input
// //                 id="apellido"
// //                 name="apellido"
// //                 type="text"
// //                 autoComplete="family-name"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="dni">DNI</FieldLabel>

// //               <input
// //                 id="dni"
// //                 name="dni"
// //                 type="text"
// //                 inputMode="numeric"
// //                 autoComplete="off"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>

// //               <input
// //                 id="telefono"
// //                 name="telefono"
// //                 type="text"
// //                 inputMode="tel"
// //                 autoComplete="tel"
// //                 className={inputClass}
// //               />
// //             </div>
// //           </div>
// //         </FormSection>

// //         <FormSection
// //           icon={<MapPin className="h-4 w-4" />}
// //           eyebrow="Ubicación"
// //           title="Domicilio y contacto"
// //           description="Datos necesarios para ubicar al cliente."
// //           compact={!isDesktop}
// //         >
// //           <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
// //             <div className="md:col-span-2 xl:col-span-2">
// //               <FieldLabel htmlFor="direccion">Dirección</FieldLabel>

// //               <input
// //                 id="direccion"
// //                 name="direccion"
// //                 type="text"
// //                 autoComplete="street-address"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="localidad">Localidad</FieldLabel>

// //               <input
// //                 id="localidad"
// //                 name="localidad"
// //                 type="text"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="provincia">Provincia</FieldLabel>

// //               <input
// //                 id="provincia"
// //                 name="provincia"
// //                 type="text"
// //                 defaultValue="Catamarca"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div className="md:col-span-2 xl:col-span-4">
// //               <FieldLabel htmlFor="email" optional>
// //                 Email
// //               </FieldLabel>

// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 autoComplete="email"
// //                 className={inputClass}
// //               />
// //             </div>
// //           </div>
// //         </FormSection>

// //         <FormSection
// //           icon={<Wifi className="h-4 w-4" />}
// //           eyebrow="Servicio"
// //           title="Plan contratado"
// //           description="Seleccioná el plan activo que tendrá el cliente."
// //           compact={!isDesktop}
// //         >
// //           <div className="grid gap-3 md:grid-cols-2">
// //             <div>
// //               <FieldLabel htmlFor="estado">Estado</FieldLabel>

// //               <SelectField id="estado" name="estado" defaultValue="activo">
// //                 <option value="activo">Activo</option>
// //                 <option value="suspendido">Suspendido</option>
// //                 <option value="baja">Baja</option>
// //               </SelectField>
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="planId">Plan</FieldLabel>

// //               <SelectField id="planId" name="planId" defaultValue="">
// //                 <option value="">Seleccionar plan</option>
// //                 {planes.map((plan) => (
// //                   <option key={plan.id} value={plan.id}>
// //                     {plan.nombre} - {formatMoney(plan.importe)}
// //                   </option>
// //                 ))}
// //               </SelectField>
// //             </div>
// //           </div>
// //         </FormSection>
// //       </div>

// //       {state.message ? (
// //         <div
// //           className={`mt-3 rounded-2xl border px-3 py-2 text-xs leading-5 ${
// //             state.ok
// //               ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
// //               : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
// //           }`}
// //         >
// //           {state.message}
// //         </div>
// //       ) : null}

// //       {planes.length === 0 ? (
// //         <div className="mt-3 rounded-2xl border border-red-300 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300">
// //           No hay planes activos disponibles. Primero cargá o activá un plan.
// //         </div>
// //       ) : null}

// //       <div className="mt-3 flex justify-end">
// //         <SubmitButton disabled={planes.length === 0} />
// //       </div>
// //     </form>
// //   );
// // }

// // // // src/components/forms/ClienteForm.tsx

// // "use client";

// // import { useEffect } from "react";
// // import type { ReactNode } from "react";
// // import { useFormState, useFormStatus } from "react-dom";
// // import { useRouter } from "next/navigation";
// // import {
// //   CalendarDays,
// //   ChevronDown,
// //   Loader2,
// //   MapPin,
// //   Save,
// //   UserRound,
// //   Wifi,
// // } from "lucide-react";
// // import {
// //   crearClienteAction,
// //   type ClienteActionState,
// // } from "@/actions/cliente.actions";
// // import type { PlanSafe } from "@/types/plan.types";

// // type ClienteFormProps = {
// //   planes: PlanSafe[];
// //   variant?: "default" | "desktop";
// // };

// // const initialState: ClienteActionState = {
// //   ok: false,
// //   message: "",
// // };

// // const panelClass =
// //   "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

// // const inputClass =
// //   "h-8 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-[12px] font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500";

// // const selectClass =
// //   "h-8 w-full appearance-none rounded-lg border border-slate-300 bg-white px-2.5 pr-8 text-[12px] font-normal text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-blue-500";

// // const buttonPrimaryClass =
// //   "inline-flex h-8 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 text-[12px] font-medium text-white shadow-sm shadow-blue-950/10 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600 sm:w-auto";

// // const sectionTitleClass =
// //   "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

// // const sectionSubtitleClass =
// //   "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

// // const sectionDescriptionClass =
// //   "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

// // function getTodayInputDate() {
// //   const today = new Date();
// //   const year = today.getFullYear();
// //   const month = String(today.getMonth() + 1).padStart(2, "0");
// //   const day = String(today.getDate()).padStart(2, "0");

// //   return `${year}-${month}-${day}`;
// // }

// // function formatMoney(value: number) {
// //   const amount = Number(value || 0);
// //   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
// //   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// //   return `$ ${formattedInteger},${decimalPart}`;
// // }

// // function SubmitButton({ disabled }: { disabled?: boolean }) {
// //   const { pending } = useFormStatus();

// //   return (
// //     <button
// //       type="submit"
// //       disabled={pending || disabled}
// //       className={buttonPrimaryClass}
// //     >
// //       {pending ? (
// //         <>
// //           <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
// //           Guardando
// //         </>
// //       ) : (
// //         <>
// //           <Save className="h-3.5 w-3.5 text-white" />
// //           Guardar cliente
// //         </>
// //       )}
// //     </button>
// //   );
// // }

// // function FieldLabel({
// //   htmlFor,
// //   children,
// //   optional,
// // }: {
// //   htmlFor: string;
// //   children: ReactNode;
// //   optional?: boolean;
// // }) {
// //   return (
// //     <label
// //       htmlFor={htmlFor}
// //       className="mb-1.5 flex items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400"
// //     >
// //       <span>{children}</span>

// //       {optional ? (
// //         <span className="text-[10px] normal-case tracking-normal text-slate-400 dark:text-slate-500">
// //           Opcional
// //         </span>
// //       ) : null}
// //     </label>
// //   );
// // }

// // function SelectField({
// //   id,
// //   name,
// //   defaultValue,
// //   children,
// // }: {
// //   id: string;
// //   name: string;
// //   defaultValue?: string;
// //   children: ReactNode;
// // }) {
// //   return (
// //     <div className="relative">
// //       <select
// //         id={id}
// //         name={name}
// //         defaultValue={defaultValue}
// //         className={selectClass}
// //       >
// //         {children}
// //       </select>

// //       <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
// //     </div>
// //   );
// // }

// // function FormSection({
// //   icon,
// //   eyebrow,
// //   title,
// //   description,
// //   children,
// // }: {
// //   icon: ReactNode;
// //   eyebrow: string;
// //   title: string;
// //   description?: string;
// //   children: ReactNode;
// // }) {
// //   return (
// //     <section className="rounded-lg border border-slate-300 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-950/50">
// //       <div className="mb-3 flex items-start gap-3">
// //         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
// //           {icon}
// //         </div>

// //         <div className="min-w-0">
// //           <p className={sectionTitleClass}>{eyebrow}</p>

// //           <h3 className={sectionSubtitleClass}>{title}</h3>

// //           {description ? (
// //             <p className={sectionDescriptionClass}>{description}</p>
// //           ) : null}
// //         </div>
// //       </div>

// //       {children}
// //     </section>
// //   );
// // }

// // export function ClienteForm({ planes }: ClienteFormProps) {
// //   const router = useRouter();
// //   const [state, formAction] = useFormState(crearClienteAction, initialState);

// //   useEffect(() => {
// //     if (state.ok) {
// //       router.push("/clientes");
// //       router.refresh();
// //     }
// //   }, [router, state.ok]);

// //   return (
// //     <form action={formAction} className={`${panelClass} p-3.5`}>
// //       <div className="mb-3">
// //         <p className={sectionTitleClass}>Alta de cliente</p>

// //         <h2 className={sectionSubtitleClass}>Datos del nuevo cliente</h2>

// //         <p className={sectionDescriptionClass}>
// //           Los campos principales son obligatorios. El email es opcional.
// //         </p>
// //       </div>

// //       <div className="grid gap-3">
// //         <FormSection
// //           icon={<UserRound className="h-4 w-4" />}
// //           eyebrow="Titular"
// //           title="Datos personales"
// //           description="Información básica del titular del servicio."
// //         >
// //           <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
// //             <div>
// //               <FieldLabel htmlFor="nombre">Nombre</FieldLabel>

// //               <input
// //                 id="nombre"
// //                 name="nombre"
// //                 type="text"
// //                 autoComplete="given-name"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="apellido">Apellido</FieldLabel>

// //               <input
// //                 id="apellido"
// //                 name="apellido"
// //                 type="text"
// //                 autoComplete="family-name"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="dni">DNI</FieldLabel>

// //               <input
// //                 id="dni"
// //                 name="dni"
// //                 type="text"
// //                 inputMode="numeric"
// //                 autoComplete="off"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>

// //               <input
// //                 id="telefono"
// //                 name="telefono"
// //                 type="text"
// //                 inputMode="tel"
// //                 autoComplete="tel"
// //                 className={inputClass}
// //               />
// //             </div>
// //           </div>
// //         </FormSection>

// //         <FormSection
// //           icon={<MapPin className="h-4 w-4" />}
// //           eyebrow="Ubicación"
// //           title="Domicilio y contacto"
// //           description="Datos necesarios para ubicar al cliente."
// //         >
// //           <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
// //             <div className="md:col-span-2 xl:col-span-2">
// //               <FieldLabel htmlFor="direccion">Dirección</FieldLabel>

// //               <input
// //                 id="direccion"
// //                 name="direccion"
// //                 type="text"
// //                 autoComplete="street-address"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="localidad">Localidad</FieldLabel>

// //               <input
// //                 id="localidad"
// //                 name="localidad"
// //                 type="text"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="provincia">Provincia</FieldLabel>

// //               <input
// //                 id="provincia"
// //                 name="provincia"
// //                 type="text"
// //                 defaultValue="Catamarca"
// //                 className={inputClass}
// //               />
// //             </div>

// //             <div className="md:col-span-2 xl:col-span-4">
// //               <FieldLabel htmlFor="email" optional>
// //                 Email
// //               </FieldLabel>

// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 autoComplete="email"
// //                 className={inputClass}
// //               />
// //             </div>
// //           </div>
// //         </FormSection>

// //         <FormSection
// //           icon={<Wifi className="h-4 w-4" />}
// //           eyebrow="Servicio"
// //           title="Plan contratado"
// //           description="Seleccioná el plan activo que tendrá el cliente."
// //         >
// //           <div className="grid gap-3 md:grid-cols-3">
// //             <div>
// //               <FieldLabel htmlFor="estado">Estado</FieldLabel>

// //               <SelectField id="estado" name="estado" defaultValue="activo">
// //                 <option value="activo">Activo</option>
// //                 <option value="suspendido">Suspendido</option>
// //                 <option value="baja">Baja</option>
// //               </SelectField>
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="fechaAlta">Alta</FieldLabel>

// //               <div className="relative">
// //                 <input
// //                   id="fechaAlta"
// //                   name="fechaAlta"
// //                   type="date"
// //                   defaultValue={getTodayInputDate()}
// //                   className={`${inputClass} pr-8`}
// //                 />

// //                 <CalendarDays className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
// //               </div>
// //             </div>

// //             <div>
// //               <FieldLabel htmlFor="planId">Plan</FieldLabel>

// //               <SelectField id="planId" name="planId" defaultValue="">
// //                 <option value="">Seleccionar plan</option>
// //                 {planes.map((plan) => (
// //                   <option key={plan.id} value={plan.id}>
// //                     {plan.nombre} - {formatMoney(plan.importe)}
// //                   </option>
// //                 ))}
// //               </SelectField>
// //             </div>
// //           </div>
// //         </FormSection>
// //       </div>

// //       {state.message ? (
// //         <div
// //           className={`mt-3 rounded-lg border px-3 py-2 text-[12px] leading-5 ${
// //             state.ok
// //               ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
// //               : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
// //           }`}
// //         >
// //           {state.message}
// //         </div>
// //       ) : null}

// //       {planes.length === 0 ? (
// //         <div className="mt-3 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-[12px] leading-5 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300">
// //           No hay planes activos disponibles. Primero cargá o activá un plan.
// //         </div>
// //       ) : null}

// //       <div className="mt-3 flex justify-end">
// //         <SubmitButton disabled={planes.length === 0} />
// //       </div>
// //     </form>
// //   );
// // }

// "use client";

// import { useEffect } from "react";
// import type { ReactNode } from "react";
// import {
//   useFormState,
//   useFormStatus,
// } from "react-dom";
// import { useRouter } from "next/navigation";
// import {
//   CalendarDays,
//   ChevronDown,
//   Loader2,
//   MapPin,
//   Save,
//   UserRound,
//   Wifi,
// } from "lucide-react";

// import {
//   crearClienteAction,
//   type ClienteActionState,
// } from "@/actions/cliente.actions";
// import type { PlanSafe } from "@/types/plan.types";

// type ClienteFormProps = {
//   planes: PlanSafe[];
//   variant?: "default" | "desktop";
// };

// const initialState: ClienteActionState = {
//   ok: false,
//   message: "",
// };

// const panelClass =
//   "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm " +
//   "dark:border-[#263451] dark:bg-[#111b31] " +
//   "dark:shadow-[0_12px_32px_rgba(0,0,0,0.24)]";

// const inputClass =
//   "h-8 w-full rounded-lg border border-slate-300 bg-white px-2.5 " +
//   "text-[12px] font-normal text-slate-950 outline-none transition " +
//   "placeholder:text-slate-400 focus:border-blue-500 " +
//   "focus:ring-2 focus:ring-blue-500/10 " +
//   "dark:border-[#354462] dark:bg-[#0b1326] dark:text-white " +
//   "dark:placeholder:text-slate-500 dark:focus:border-blue-500 " +
//   "dark:focus:ring-blue-500/15";

// const selectClass =
//   "h-8 w-full appearance-none rounded-lg border border-slate-300 " +
//   "bg-white px-2.5 pr-8 text-[12px] font-normal text-slate-950 " +
//   "outline-none transition focus:border-blue-500 " +
//   "focus:ring-2 focus:ring-blue-500/10 " +
//   "dark:border-[#354462] dark:bg-[#0b1326] dark:text-white " +
//   "dark:focus:border-blue-500 dark:focus:ring-blue-500/15";

// const buttonBaseClass =
//   "inline-flex h-8 items-center justify-center rounded-lg border px-3 " +
//   "text-[12px] font-medium leading-none shadow-sm transition " +
//   "active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60";

// const primaryButtonClass =
//   `${buttonBaseClass} w-full gap-1.5 border-blue-600 bg-blue-600 ` +
//   "!text-white hover:border-blue-700 hover:bg-blue-700 " +
//   "hover:!text-white dark:border-blue-500 dark:bg-blue-500 " +
//   "dark:!text-white dark:hover:border-blue-600 " +
//   "dark:hover:bg-blue-600 dark:hover:!text-white sm:w-auto";

// function getTodayInputDate() {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(
//     today.getMonth() + 1,
//   ).padStart(2, "0");
//   const day = String(
//     today.getDate(),
//   ).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// }

// function formatMoney(value: number) {
//   const amount = Number(value || 0);

//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// }

// function SubmitButton({
//   disabled,
// }: {
//   disabled?: boolean;
// }) {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending || disabled}
//       className={primaryButtonClass}
//     >
//       {pending ? (
//         <>
//           <Loader2
//             className="
//               h-3.5 w-3.5 shrink-0
//               animate-spin !text-white
//             "
//           />

//           <span
//             className="
//               text-[12px] leading-none
//               !text-white
//             "
//           >
//             Guardando
//           </span>
//         </>
//       ) : (
//         <>
//           <Save
//             className="
//               h-3.5 w-3.5 shrink-0
//               !text-white
//             "
//           />

//           <span
//             className="
//               text-[12px] leading-none
//               !text-white
//             "
//           >
//             Guardar cliente
//           </span>
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
//       className="
//         mb-1.5 flex items-center
//         justify-between gap-2
//         text-[10px] font-medium
//         uppercase tracking-[0.08em]
//         text-slate-500
//         dark:text-slate-400
//       "
//     >
//       <span>{children}</span>

//       {optional ? (
//         <span
//           className="
//             text-[10px] font-normal
//             normal-case tracking-normal
//             text-slate-400
//             dark:text-slate-500
//           "
//         >
//           Opcional
//         </span>
//       ) : null}
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
//   defaultValue?: string;
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

//       <ChevronDown
//         className="
//           pointer-events-none absolute
//           right-2.5 top-1/2
//           h-3.5 w-3.5
//           -translate-y-1/2
//           text-slate-400
//           dark:text-slate-500
//         "
//       />
//     </div>
//   );
// }

// function FormSection({
//   icon,
//   title,
//   description,
//   children,
// }: {
//   icon: ReactNode;
//   title: string;
//   description?: string;
//   children: ReactNode;
// }) {
//   return (
//     <section
//       className="
//         rounded-lg border border-slate-200
//         bg-slate-50 p-3
//         dark:border-[#2b3957]
//         dark:bg-[#0d172a]
//       "
//     >
//       <div className="mb-3 flex items-start gap-2.5">
//         <div
//           className="
//             flex h-8 w-8 shrink-0
//             items-center justify-center
//             rounded-lg border
//             border-blue-200 bg-blue-50
//             text-blue-700
//             dark:border-blue-800/70
//             dark:bg-blue-950/25
//             dark:text-blue-300
//           "
//         >
//           {icon}
//         </div>

//         <div className="min-w-0">
//           <h3
//             className="
//               text-sm font-medium
//               text-slate-950 dark:text-white
//             "
//           >
//             {title}
//           </h3>

//           {description ? (
//             <p
//               className="
//                 mt-0.5 text-[11px] leading-5
//                 text-slate-500
//                 dark:text-slate-400
//                 sm:text-[12px]
//               "
//             >
//               {description}
//             </p>
//           ) : null}
//         </div>
//       </div>

//       {children}
//     </section>
//   );
// }

// export function ClienteForm({
//   planes,
// }: ClienteFormProps) {
//   const router = useRouter();

//   const [state, formAction] = useFormState(
//     crearClienteAction,
//     initialState,
//   );

//   useEffect(() => {
//     if (state.ok) {
//       router.push("/clientes");
//       router.refresh();
//     }
//   }, [router, state.ok]);

//   return (
//     <form
//       action={formAction}
//       className={panelClass}
//     >
//       <div
//         className="
//           border-b border-slate-200
//           bg-slate-50/80 px-3 py-3
//           dark:border-[#263451]
//           dark:bg-[#0e172a]
//           sm:px-4
//         "
//       >
//         <div className="flex min-h-12 items-center">
//           <div className="min-w-0">
//             <div className="flex items-center gap-2.5">
//               <FileTextIcon />

//               <h2
//                 className="
//                   truncate text-base font-medium
//                   text-slate-950 dark:text-white
//                 "
//               >
//                 Datos del nuevo cliente
//               </h2>
//             </div>

//             <p
//               className="
//                 mt-1 hidden max-w-3xl
//                 truncate text-[12px] leading-5
//                 text-slate-600
//                 dark:text-slate-400
//                 sm:block
//               "
//             >
//               Los campos principales son obligatorios.
//               El email es opcional.
//             </p>

//             <p
//               className="
//                 mt-1 text-[11px]
//                 text-slate-500
//                 dark:text-slate-400
//                 sm:hidden
//               "
//             >
//               Información personal y del servicio
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="p-3 sm:p-4">
//         <div className="grid gap-3">
//           <FormSection
//             icon={
//               <UserRound className="h-4 w-4" />
//             }
//             title="Datos personales"
//             description="Información básica del titular del servicio."
//           >
//             <div
//               className="
//                 grid gap-3
//                 md:grid-cols-2
//                 xl:grid-cols-4
//               "
//             >
//               <div>
//                 <FieldLabel htmlFor="nombre">
//                   Nombre
//                 </FieldLabel>

//                 <input
//                   id="nombre"
//                   name="nombre"
//                   type="text"
//                   autoComplete="given-name"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <FieldLabel htmlFor="apellido">
//                   Apellido
//                 </FieldLabel>

//                 <input
//                   id="apellido"
//                   name="apellido"
//                   type="text"
//                   autoComplete="family-name"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <FieldLabel htmlFor="dni">
//                   DNI
//                 </FieldLabel>

//                 <input
//                   id="dni"
//                   name="dni"
//                   type="text"
//                   inputMode="numeric"
//                   autoComplete="off"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <FieldLabel htmlFor="telefono">
//                   Teléfono
//                 </FieldLabel>

//                 <input
//                   id="telefono"
//                   name="telefono"
//                   type="text"
//                   inputMode="tel"
//                   autoComplete="tel"
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//           </FormSection>

//           <FormSection
//             icon={
//               <MapPin className="h-4 w-4" />
//             }
//             title="Domicilio y contacto"
//             description="Datos necesarios para ubicar al cliente."
//           >
//             <div
//               className="
//                 grid gap-3
//                 md:grid-cols-2
//                 xl:grid-cols-4
//               "
//             >
//               <div className="md:col-span-2 xl:col-span-2">
//                 <FieldLabel htmlFor="direccion">
//                   Dirección
//                 </FieldLabel>

//                 <input
//                   id="direccion"
//                   name="direccion"
//                   type="text"
//                   autoComplete="street-address"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <FieldLabel htmlFor="localidad">
//                   Localidad
//                 </FieldLabel>

//                 <input
//                   id="localidad"
//                   name="localidad"
//                   type="text"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <FieldLabel htmlFor="provincia">
//                   Provincia
//                 </FieldLabel>

//                 <input
//                   id="provincia"
//                   name="provincia"
//                   type="text"
//                   defaultValue="Catamarca"
//                   className={inputClass}
//                 />
//               </div>

//               <div className="md:col-span-2 xl:col-span-4">
//                 <FieldLabel
//                   htmlFor="email"
//                   optional
//                 >
//                   Email
//                 </FieldLabel>

//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//           </FormSection>

//           <FormSection
//             icon={
//               <Wifi className="h-4 w-4" />
//             }
//             title="Plan contratado"
//             description="Seleccioná el plan activo que tendrá el cliente."
//           >
//             <div
//               className="
//                 grid gap-3
//                 md:grid-cols-3
//               "
//             >
//               <div>
//                 <FieldLabel htmlFor="estado">
//                   Estado
//                 </FieldLabel>

//                 <SelectField
//                   id="estado"
//                   name="estado"
//                   defaultValue="activo"
//                 >
//                   <option value="activo">
//                     Activo
//                   </option>

//                   <option value="suspendido">
//                     Suspendido
//                   </option>

//                   <option value="baja">
//                     Baja
//                   </option>
//                 </SelectField>
//               </div>

//               <div>
//                 <FieldLabel htmlFor="fechaAlta">
//                   Alta
//                 </FieldLabel>

//                 <div className="relative">
//                   <input
//                     id="fechaAlta"
//                     name="fechaAlta"
//                     type="date"
//                     defaultValue={getTodayInputDate()}
//                     className={`${inputClass} pr-8`}
//                   />

//                   <CalendarDays
//                     className="
//                       pointer-events-none absolute
//                       right-2.5 top-1/2
//                       h-3.5 w-3.5
//                       -translate-y-1/2
//                       text-slate-400
//                       dark:text-slate-500
//                     "
//                   />
//                 </div>
//               </div>

//               <div>
//                 <FieldLabel htmlFor="planId">
//                   Plan
//                 </FieldLabel>

//                 <SelectField
//                   id="planId"
//                   name="planId"
//                   defaultValue=""
//                 >
//                   <option value="">
//                     Seleccionar plan
//                   </option>

//                   {planes.map((plan) => (
//                     <option
//                       key={plan.id}
//                       value={plan.id}
//                     >
//                       {plan.nombre} -{" "}
//                       {formatMoney(plan.importe)}
//                     </option>
//                   ))}
//                 </SelectField>
//               </div>
//             </div>
//           </FormSection>
//         </div>

//         {state.message ? (
//           <div
//             role="status"
//             className={`
//               mt-3 rounded-lg border
//               px-3 py-2 text-[12px] leading-5
//               ${
//                 state.ok
//                   ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/70 dark:bg-emerald-950/25 dark:text-emerald-300"
//                   : "border-red-200 bg-red-50 text-red-700 dark:border-red-800/70 dark:bg-red-950/25 dark:text-red-300"
//               }
//             `}
//           >
//             {state.message}
//           </div>
//         ) : null}

//         {planes.length === 0 ? (
//           <div
//             className="
//               mt-3 rounded-lg border
//               border-red-200 bg-red-50
//               px-3 py-2
//               text-[12px] leading-5
//               text-red-700
//               dark:border-red-800/70
//               dark:bg-red-950/25
//               dark:text-red-300
//             "
//           >
//             No hay planes activos disponibles.
//             Primero cargá o activá un plan.
//           </div>
//         ) : null}

//         <div className="mt-3 flex justify-end">
//           <SubmitButton
//             disabled={planes.length === 0}
//           />
//         </div>
//       </div>
//     </form>
//   );
// }

// function FileTextIcon() {
//   return (
//     <div
//       className="
//         flex h-5 w-5 shrink-0
//         items-center justify-center
//         text-blue-700
//         dark:text-blue-300
//       "
//     >
//       <UserRound className="h-5 w-5" />
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  type ReactNode,
  type InputHTMLAttributes,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import {
  CircleAlert,
  Loader2,
  MapPin,
  Save,
  UserRound,
  Wifi,
} from "lucide-react";

import {
  crearClienteAction,
  type ClienteActionState,
} from "@/actions/cliente.actions";
import { cajaStyles as styles } from "@/components/ui/dashboard-styles";
import type { PlanSafe } from "@/types/plan.types";

type ClienteFormProps = {
  planes: PlanSafe[];
  fechaAltaInicial?: string;
  variant?: "default" | "desktop";
};

const initialState: ClienteActionState = {
  ok: false,
  message: "",
};

const inputClass =
  "h-9 w-full min-w-0 rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-bg)] px-[10px] text-[16px] font-normal text-[var(--overview-text)] outline-none transition-colors placeholder:text-[var(--overview-muted)] focus-visible:outline-2 focus-visible:outline-[var(--overview-blue)] min-[700px]:text-[12px] dark:[color-scheme:dark]";

function money(value: number) {
  const [integer, decimal] = (
    Number.isFinite(value) ? value : 0
  )
    .toFixed(2)
    .split(".");

  return `$ ${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${decimal}`;
}

function normalizeInstallationAmount(value: string, padDecimals = false) {
  const hasCurrencyPrefix = value.includes("$");
  const clean = value.replace(/[^\d.,]/g, "");
  if (!clean) return { raw: "", display: "" };

  const commaIndex = clean.lastIndexOf(",");
  const dotIndex = clean.lastIndexOf(".");
  let decimalSeparator: "," | "." | null = null;

  if (commaIndex >= 0 && dotIndex >= 0) {
    decimalSeparator = commaIndex > dotIndex ? "," : ".";
  } else if (commaIndex >= 0) {
    decimalSeparator = ",";
  } else if (
    dotIndex >= 0 &&
    !hasCurrencyPrefix &&
    clean.length - dotIndex - 1 <= 2
  ) {
    // Se acepta punto decimal en el valor pegado sin formato.
    // En el valor con $ el punto siempre es separador de miles.
    decimalSeparator = ".";
  }

  const separatorIndex = decimalSeparator === "," ? commaIndex : dotIndex;
  const integerSource = decimalSeparator
    ? clean.slice(0, separatorIndex)
    : clean;
  const decimalSource = decimalSeparator
    ? clean.slice(separatorIndex + 1)
    : "";
  const integerDigits = integerSource.replace(/\D/g, "") || "0";
  const decimalDigits = decimalSource.replace(/\D/g, "").slice(0, 2);
  const groupedInteger = integerDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const hasDecimal = decimalSeparator !== null;
  const raw = `${integerDigits}${hasDecimal ? `.${decimalDigits}` : ""}`;
  const shownDecimals = hasDecimal || padDecimals
    ? `,${decimalDigits.padEnd(padDecimals ? 2 : 0, "0")}`
    : "";

  return {
    raw,
    display: `$${groupedInteger}${shownDecimals}`,
  };
}

function parseAmountCents(value: string) {
  const normalized = value.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{0,2})?$/.test(normalized)) return 0;
  return Math.round(Number(normalized) * 100);
}

function formatInstallmentMonth(start: string, offset: number) {
  if (!/^\d{4}-\d{2}$/.test(start)) return `Mes ${offset + 1}`;
  const [year, month] = start.split("-").map(Number);
  const date = new Date(year, month - 1 + offset, 1);
  const label = new Intl.DateTimeFormat("es-AR", {
    month: "long",
    year: "numeric",
  }).format(date);
  return label.charAt(0).toLocaleUpperCase("es-AR") + label.slice(1);
}

function Field({
  id,
  label,
  optional = false,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-[6px] flex items-center justify-between gap-2 text-[12px] text-[var(--overview-text)]"
      >
        <span>{label}</span>

        {optional && (
          <span className="text-[10px] text-[var(--overview-muted)]">
            Opcional
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

function Input({
  id,
  label,
  optional = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <Field id={id} label={label} optional={optional}>
      <input
        {...props}
        id={id}
        name={id}
        required={!optional}
        className={inputClass}
      />
    </Field>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className={`${styles.button} w-full !border-blue-600 !bg-blue-600 !text-white hover:!bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 min-[700px]:w-auto`}
    >
      {pending ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : (
        <Save aria-hidden="true" />
      )}

      {pending ? "Guardando…" : "Guardar cliente"}
    </button>
  );
}

export function ClienteForm({
  planes,
  fechaAltaInicial = "",
}: ClienteFormProps) {
  const router = useRouter();

  const [state, formAction] = useFormState(
    crearClienteAction,
    initialState
  );

  const [planId, setPlanId] = useState("");
  const [fechaAlta, setFechaAlta] = useState(fechaAltaInicial);
  const [incluyeInstalacion, setIncluyeInstalacion] = useState(false);
  const [importeInstalacion, setImporteInstalacion] = useState("");
  const [importeEnEdicion, setImporteEnEdicion] = useState(false);
  const [cuotasInstalacion, setCuotasInstalacion] = useState("1");
  const [inicioInstalacion, setInicioInstalacion] = useState(
    fechaAltaInicial?.slice(0, 7) || new Date().toISOString().slice(0, 7),
  );

  const selectedPlan = planes.find((plan) => plan.id === planId);
  const totalInstalacionCentavos = parseAmountCents(importeInstalacion);
  const cantidadCuotas = Math.min(36, Math.max(1, Number(cuotasInstalacion) || 1));
  const cuotasPreview = Array.from({ length: cantidadCuotas }, (_, index) => {
    const base = Math.floor(totalInstalacionCentavos / cantidadCuotas);
    const resto = totalInstalacionCentavos % cantidadCuotas;
    return (base + (index < resto ? 1 : 0)) / 100;
  });

  useEffect(() => {
    if (state.ok) {
      router.push("/clientes");
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form
      action={formAction}
      className="grid min-w-0 gap-[14px]"
    >
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            <UserRound
              className="!inline-block !size-3.5 text-[var(--overview-blue)]"
              aria-hidden="true"
            />
            Datos personales
          </h2>

          <span className={styles.count}>Titular</span>
        </div>

        <div className="grid gap-3 p-[14px] min-[700px]:grid-cols-2 min-[1200px]:grid-cols-4">
          <Input
            id="nombre"
            label="Nombre"
            type="text"
            autoComplete="given-name"
            minLength={2}
            maxLength={80}
          />

          <Input
            id="apellido"
            label="Apellido"
            type="text"
            autoComplete="family-name"
            minLength={2}
            maxLength={80}
          />

          <Input
            id="dni"
            label="DNI"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            pattern="[0-9]{7,8}"
            minLength={7}
            maxLength={8}
            title="Ingresá 7 u 8 dígitos numéricos."
          />

          <Input
            id="telefono"
            label="Teléfono"
            type="tel"
            autoComplete="tel"
            minLength={6}
            maxLength={30}
          />
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            <MapPin
              className="!inline-block !size-3.5 text-violet-700 dark:text-violet-300"
              aria-hidden="true"
            />
            Domicilio y contacto
          </h2>
        </div>

        <div className="grid gap-3 p-[14px] min-[700px]:grid-cols-2 min-[1200px]:grid-cols-4">
          <div className="min-[700px]:col-span-2">
            <Input
              id="direccion"
              label="Dirección"
              type="text"
              autoComplete="street-address"
              minLength={2}
              maxLength={140}
            />
          </div>

          <Input
            id="localidad"
            label="Localidad"
            type="text"
            autoComplete="address-level2"
            minLength={2}
            maxLength={80}
          />

          <Input
            id="provincia"
            label="Provincia"
            type="text"
            autoComplete="address-level1"
            defaultValue="Catamarca"
            minLength={2}
            maxLength={80}
          />

          <div className="min-[700px]:col-span-2">
            <Input
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              maxLength={120}
              optional
            />
          </div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>
            <Wifi
              className="!inline-block !size-3.5 text-[var(--overview-green)]"
              aria-hidden="true"
            />
            Servicio contratado
          </h2>

          <span className={styles.count}>
            {planes.length} planes activos
          </span>
        </div>

        <div className="grid gap-3 p-[14px] min-[700px]:grid-cols-4">
          <div className="min-[700px]:col-span-2">
            <Field id="planId" label="Plan">
              <select
                id="planId"
                name="planId"
                value={planId}
                onChange={(event) => setPlanId(event.target.value)}
                required
                disabled={!planes.length}
                className={`${inputClass} disabled:opacity-60`}
              >
                <option value="">Seleccionar plan</option>

                {planes.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.nombre} · {money(plan.importe)}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="estado" label="Estado">
            <select
              id="estado"
              name="estado"
              defaultValue="activo"
              required
              className={inputClass}
            >
              <option value="activo">Activo</option>
              <option value="suspendido">Suspendido</option>
              <option value="baja">Baja</option>
            </select>
          </Field>

          <Input
            id="fechaAlta"
            label="Fecha de alta"
            type="date"
            defaultValue={fechaAltaInicial}
            onChange={(event) => {
              const nextFechaAlta = event.target.value;
              setFechaAlta(nextFechaAlta);
              const minPeriodo = nextFechaAlta.slice(0, 7);
              if (minPeriodo && inicioInstalacion < minPeriodo) {
                setInicioInstalacion(minPeriodo);
              }
            }}
            optional
          />

          {selectedPlan && (
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-green-tint)] p-3 min-[700px]:col-span-4">
              <div className="min-w-0 flex-1">
                <p className="text-[12px] [overflow-wrap:anywhere]">
                  {selectedPlan.nombre}
                </p>

                <p className="mt-1 text-[11px] leading-[1.6] text-[var(--overview-muted)] [overflow-wrap:anywhere]">
                  {selectedPlan.detalle || "Sin descripción adicional."}
                </p>
              </div>

              <span className="shrink-0 text-[18px] tabular-nums text-[var(--overview-green)]">
                {money(selectedPlan.importe)}
              </span>
            </div>
          )}

          {!planes.length && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-[7px] border border-amber-200 bg-amber-50 p-3 text-[12px] leading-[1.6] text-amber-800 min-[700px]:col-span-4 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
            >
              <CircleAlert
                className="mt-0.5 !size-3.5 shrink-0"
                aria-hidden="true"
              />

              <span>
                No hay planes activos disponibles.{" "}
                <Link
                  href="/planes"
                  className="underline underline-offset-2"
                >
                  Cargá o activá un plan
                </Link>{" "}
                antes de registrar el cliente.
              </span>
            </div>
          )}
        </div>
      </section>

      <section className={styles.panel}>
        <div className={`${styles.panelHeader} flex-wrap gap-2`}>
          <h2 className={styles.panelTitle}>Cargo de instalación</h2>
          <label className="flex shrink-0 cursor-pointer items-center gap-2 text-[12px] text-[var(--overview-text)]">
            <input
              type="checkbox"
              name="incluyeInstalacion"
              checked={incluyeInstalacion}
              onChange={(event) => setIncluyeInstalacion(event.target.checked)}
              className="size-4 accent-blue-600"
            />
            ¿Incluye instalación?
          </label>
        </div>

        {incluyeInstalacion ? (
          <div className="grid grid-cols-1 gap-2.5 p-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
            <div className="min-w-0 sm:col-span-2 2xl:col-span-2">
              <Input
                id="instalacionConcepto"
                label="Concepto"
                type="text"
                defaultValue="Instalación"
                maxLength={180}
              />
            </div>

            <div className="min-w-0 sm:col-span-2 2xl:col-span-2">
              <Field id="instalacionImporteTotal" label="Importe total">
                <input
                  id="instalacionImporteTotal"
                  type="text"
                  inputMode="decimal"
                  placeholder="$0,00"
                  value={normalizeInstallationAmount(
                    importeInstalacion,
                    !importeEnEdicion,
                  ).display}
                  onFocus={() => setImporteEnEdicion(true)}
                  onBlur={() => setImporteEnEdicion(false)}
                  onChange={(event) => {
                    const input = event.currentTarget;
                    const cursor = input.selectionStart ?? input.value.length;
                    const nativeInputEvent = event.nativeEvent as InputEvent;
                    let inputValue = input.value;

                    // El punto del teclado numérico también se usa como decimal.
                    // El campo agrega los puntos de miles automáticamente.
                    if (nativeInputEvent.data === ".") {
                      const lastDot = inputValue.lastIndexOf(".");
                      if (lastDot >= 0) {
                        inputValue = `${inputValue.slice(0, lastDot)},${inputValue.slice(lastDot + 1)}`;
                      }
                    }

                    const prefix = inputValue.slice(0, cursor);
                    const normalized = normalizeInstallationAmount(inputValue);
                    const normalizedPrefix = normalizeInstallationAmount(prefix).raw;
                    const decimalPosition = normalizedPrefix.indexOf(".");
                    const digitsBeforeCursor = normalizedPrefix
                      .slice(0, decimalPosition >= 0 ? decimalPosition : undefined)
                      .replace(/\D/g, "").length;
                    const decimalsBeforeCursor = decimalPosition >= 0
                      ? normalizedPrefix.slice(decimalPosition + 1).replace(/\D/g, "").length
                      : 0;
                    const cursorIsInDecimals = decimalPosition >= 0;
                    const nextDisplay = normalizeInstallationAmount(
                      normalized.raw,
                      !importeEnEdicion,
                    ).display;

                    setImporteInstalacion(normalized.raw);

                    requestAnimationFrame(() => {
                      if (cursorIsInDecimals) {
                        const comma = nextDisplay.indexOf(",");
                        const nextCursor = comma >= 0
                          ? comma + 1 + decimalsBeforeCursor
                          : nextDisplay.length;
                        input.setSelectionRange(nextCursor, nextCursor);
                        return;
                      }

                      let nextCursor = nextDisplay.startsWith("$") ? 1 : 0;
                      let seenDigits = 0;
                      while (nextCursor < nextDisplay.length && seenDigits < digitsBeforeCursor) {
                        if (/\d/.test(nextDisplay[nextCursor])) seenDigits += 1;
                        nextCursor += 1;
                      }
                      input.setSelectionRange(nextCursor, nextCursor);
                    });
                  }}
                  required={incluyeInstalacion}
                  title="Usá hasta dos decimales."
                  className={inputClass}
                />
                <input
                  type="hidden"
                  name="instalacionImporteTotal"
                  value={(totalInstalacionCentavos / 100).toFixed(2)}
                />
                <p className="mt-1 text-[10px] text-[var(--overview-muted)]">
                  Usá coma o punto para los decimales; los miles se separan automáticamente.
                </p>
              </Field>
            </div>

            <div className="min-w-0 xl:col-span-2 2xl:col-span-1">
              <Field id="instalacionCantidadCuotas" label="Cantidad de cuotas">
                <input
                  id="instalacionCantidadCuotas"
                  name="instalacionCantidadCuotas"
                  type="number"
                  min={1}
                  max={36}
                  step={1}
                  value={cuotasInstalacion}
                  onChange={(event) => setCuotasInstalacion(event.target.value)}
                  required={incluyeInstalacion}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="min-w-0 xl:col-span-2 2xl:col-span-1">
              <Field id="instalacionPeriodoInicio" label="Mes de inicio de las cuotas">
                <input
                  id="instalacionPeriodoInicio"
                  name="instalacionPeriodoInicio"
                  type="month"
                  value={inicioInstalacion}
                  onChange={(event) => setInicioInstalacion(event.target.value)}
                  min={(fechaAlta || fechaAltaInicial || new Date().toISOString().slice(0, 10)).slice(0, 7)}
                  required={incluyeInstalacion}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="min-w-0 rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-green-tint)] p-3 sm:col-span-2 xl:col-span-4 2xl:col-span-6">
              <p className="text-[12px] font-medium text-[var(--overview-text)]">
                Vista previa de cuotas
              </p>
              {totalInstalacionCentavos > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {cuotasPreview.map((importe, index) => (
                    <span
                      key={index}
                      className="rounded-md border border-[var(--overview-border)] bg-[var(--overview-bg)] px-2 py-1 text-[11px] tabular-nums"
                    >
                      Cuota {index + 1} · {formatInstallmentMonth(inicioInstalacion, index)}: {money(importe)}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-[11px] text-[var(--overview-muted)]">
                  Ingresá el total para calcular el importe de cada cuota.
                </p>
              )}
            </div>
          </div>
        ) : null}
      </section>

      {state.message && (
        <div
          role={state.ok ? "status" : "alert"}
          className={`rounded-[8px] border p-3 text-[12px] leading-[1.6] ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          {state.message}
        </div>
      )}

      <div
        className={`${styles.panel} flex flex-wrap items-center justify-between gap-3 p-[14px]`}
      >
        <p className="text-[11px] leading-[1.6] text-[var(--overview-muted)]">
          El número de cliente se genera automáticamente al guardar.
        </p>

        <div className="flex w-full flex-col-reverse gap-2 min-[700px]:w-auto min-[700px]:flex-row">
          <Link href="/clientes" className={styles.button}>
            Cancelar
          </Link>

          <SubmitButton disabled={!planes.length} />
        </div>
      </div>
    </form>
  );
}

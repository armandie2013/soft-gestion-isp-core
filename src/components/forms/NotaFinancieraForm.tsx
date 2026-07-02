// // src/components/forms/NotaFinancieraForm.tsx

// "use client";

// import { useFormState, useFormStatus } from "react-dom";
// import {
//   CheckCircle2,
//   FileText,
//   Loader2,
//   MinusCircle,
//   PlusCircle,
//   Save,
//   ShieldAlert,
// } from "lucide-react";
// import {
//   crearNotaCreditoAction,
//   crearNotaDebitoAction,
//   type MovimientoActionState,
// } from "@/actions/movimiento-financiero.actions";
// import type { FacturaClienteSafe } from "@/types/movimiento-financiero.types";

// type NotaFinancieraFormProps = {
//   clienteId: string;
//   tipo: "credito" | "debito";
//   facturas: FacturaClienteSafe[];
// };

// const initialState: MovimientoActionState = {
//   ok: false,
//   message: "",
// };

// function formatDate(value: string) {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "-";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatCompactMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$${formattedInteger},${decimalPart}`;
// }

// function getPeriodoFactura(factura: FacturaClienteSafe) {
//   if (factura.referenciaMes && factura.referenciaAnio) {
//     return `${factura.referenciaMes}/${factura.referenciaAnio}`;
//   }

//   return formatDate(factura.fecha);
// }

// function getFacturaOptionLabel(factura: FacturaClienteSafe) {
//   return `N° ${factura.numeroComprobante} · ${getPeriodoFactura(
//     factura,
//   )} · Original ${formatCompactMoney(
//     factura.importeOriginal,
//   )} · Saldo ${formatCompactMoney(factura.saldoFactura)}`;
// }

// function SubmitButton({
//   tipo,
//   disabled,
// }: {
//   tipo: "credito" | "debito";
//   disabled?: boolean;
// }) {
//   const { pending } = useFormStatus();

//   const isCredito = tipo === "credito";

//   return (
//     <button
//       type="submit"
//       disabled={pending || disabled}
//       className={`inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl px-3 text-xs font-medium shadow-sm transition disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] sm:w-auto ${
//         isCredito
//           ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
//           : "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
//       }`}
//     >
//       {pending ? (
//         <>
//           <Loader2 className="h-3.5 w-3.5 animate-spin" />
//           Guardando
//         </>
//       ) : (
//         <>
//           <Save className="h-3.5 w-3.5" />
//           {isCredito ? "Crear nota de crédito" : "Crear nota de débito"}
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
//   children: React.ReactNode;
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

// const inputClass =
//   "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white";

// const selectClass =
//   "h-9 w-full rounded-xl border border-slate-200 bg-white px-3 pr-8 text-[11px] leading-none text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white sm:text-xs";

// export function NotaFinancieraForm({
//   clienteId,
//   tipo,
//   facturas,
// }: NotaFinancieraFormProps) {
//   const isCredito = tipo === "credito";
//   const action = isCredito ? crearNotaCreditoAction : crearNotaDebitoAction;

//   const [state, formAction] = useFormState(action, initialState);

//   const facturasDisponibles = isCredito
//     ? facturas.filter((factura) => factura.saldoFactura > 0)
//     : facturas;

//   return (
//     <form action={formAction} className="space-y-4">
//       <input type="hidden" name="clienteId" value={clienteId} />

//       <div
//         className={`rounded-2xl border p-3 text-xs leading-5 ${
//           isCredito
//             ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300"
//             : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300"
//         }`}
//       >
//         <div className="flex gap-2">
//           <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

//           <div>
//             <p className="font-medium">Factura asociada obligatoria</p>

//             <p className="mt-1">
//               {isCredito
//                 ? "La nota de crédito descuenta saldo de una factura con saldo pendiente."
//                 : "La nota de débito suma saldo a una factura emitida."}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div>
//         <FieldLabel htmlFor="facturaAsociadaId">Factura asociada</FieldLabel>

//         <select
//           id="facturaAsociadaId"
//           name="facturaAsociadaId"
//           defaultValue=""
//           className={selectClass}
//         >
//           <option className="text-[11px]" value="">
//             Seleccionar factura
//           </option>

//           {facturasDisponibles.map((factura) => (
//             <option
//               key={factura.id}
//               value={factura.id}
//               className="text-[11px]"
//             >
//               {getFacturaOptionLabel(factura)}
//             </option>
//           ))}
//         </select>

//         <p className="mt-1.5 text-[10px] leading-4 text-slate-500 dark:text-slate-500">
//           Seleccioná la factura sobre la que se aplicará el movimiento.
//         </p>

//         {facturasDisponibles.length === 0 ? (
//           <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300">
//             {isCredito
//               ? "No hay facturas con saldo disponible para aplicar una nota de crédito."
//               : "No hay facturas emitidas para asociar una nota de débito."}
//           </p>
//         ) : null}
//       </div>

//       <div>
//         <FieldLabel htmlFor="concepto">Concepto</FieldLabel>

//         <div className="relative">
//           <FileText className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

//           <input
//             id="concepto"
//             name="concepto"
//             type="text"
//             placeholder={
//               isCredito
//                 ? "Ej: Bonificación sobre factura"
//                 : "Ej: Cargo adicional sobre factura"
//             }
//             className={`${inputClass} pl-9`}
//           />
//         </div>
//       </div>

//       <div>
//         <FieldLabel htmlFor="importe">Importe</FieldLabel>

//         <input
//           id="importe"
//           name="importe"
//           type="number"
//           min="0"
//           step="0.01"
//           placeholder="0"
//           className={inputClass}
//         />
//       </div>

//       <div>
//         <FieldLabel htmlFor="observacion" optional>
//           Observación
//         </FieldLabel>

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
//           className={`rounded-2xl border px-3 py-2 text-xs leading-5 ${
//             state.ok
//               ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//               : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
//           }`}
//         >
//           <div className="flex gap-2">
//             {state.ok ? (
//               <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
//             ) : isCredito ? (
//               <MinusCircle className="mt-0.5 h-4 w-4 shrink-0" />
//             ) : (
//               <PlusCircle className="mt-0.5 h-4 w-4 shrink-0" />
//             )}

//             <p>{state.message}</p>
//           </div>
//         </div>
//       ) : null}

//       <div className="flex justify-end">
//         <SubmitButton
//           tipo={tipo}
//           disabled={facturasDisponibles.length === 0}
//         />
//       </div>
//     </form>
//   );
// }

// // src/components/forms/NotaFinancieraForm.tsx

// "use client";

// import {
//   useEffect,
//   useMemo,
//   useState,
//   type ChangeEvent,
//   type ClipboardEvent,
//   type KeyboardEvent,
//   type ReactNode,
// } from "react";
// import { useFormState, useFormStatus } from "react-dom";
// import { useRouter } from "next/navigation";
// import {
//   AlertTriangle,
//   CheckCircle2,
//   ChevronDown,
//   FileText,
//   Info,
//   Loader2,
//   MessageCircle,
//   MinusCircle,
//   PlusCircle,
//   Save,
// } from "lucide-react";
// import {
//   crearNotaCreditoAction,
//   crearNotaDebitoAction,
//   type MovimientoActionState,
// } from "@/actions/movimiento-financiero.actions";
// import type { FacturaClienteSafe } from "@/types/movimiento-financiero.types";

// type NotaFinancieraFormProps = {
//   clienteId: string;
//   tipo: "credito" | "debito";
//   facturas: FacturaClienteSafe[];
//   clienteNombre?: string;
//   variant?: "default" | "desktop";
// };

// const initialState: MovimientoActionState = {
//   ok: false,
//   message: "",
// };

// const selectClass =
//   "h-10 w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 pr-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600 dark:focus:border-cyan-700 sm:h-9 sm:text-xs";

// function formatDate(value: string) {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "-";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }

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
//   return extraerSoloDigitos(value).replace(/^0+(?=\d)/, "");
// }

// function formatCurrencyFromDigits(digits: string) {
//   const cleanDigits = limpiarCerosIzquierda(digits);

//   if (!cleanDigits) return "$ 0,00";

//   const formattedInteger = cleanDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},00`;
// }

// function moneyInputToNumber(digits: string) {
//   const cleanDigits = limpiarCerosIzquierda(extraerSoloDigitos(digits));

//   if (!cleanDigits) return 0;

//   return Number(cleanDigits);
// }

// function getFacturaPeriodo(factura: FacturaClienteSafe) {
//   if (factura.referenciaMes && factura.referenciaAnio) {
//     return `${factura.referenciaMes}/${factura.referenciaAnio}`;
//   }

//   return formatDate(factura.fecha);
// }

// function ordenarFacturas(facturas: FacturaClienteSafe[]) {
//   return [...facturas].sort((a, b) => {
//     const anioA = a.referenciaAnio || 0;
//     const anioB = b.referenciaAnio || 0;

//     if (anioA !== anioB) return anioA - anioB;

//     const mesA = a.referenciaMes || 0;
//     const mesB = b.referenciaMes || 0;

//     if (mesA !== mesB) return mesA - mesB;

//     return Number(a.numeroComprobante || 0) - Number(b.numeroComprobante || 0);
//   });
// }

// function SubmitButton({
//   disabled,
//   tipo,
// }: {
//   disabled: boolean;
//   tipo: "credito" | "debito";
// }) {
//   const { pending } = useFormStatus();

//   const label =
//     tipo === "credito" ? "Crear nota de crédito" : "Crear nota de débito";

//   return (
//     <button
//       type="submit"
//       disabled={pending || disabled}
//       className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99] sm:h-10 sm:w-auto sm:min-w-[210px] sm:text-xs ${
//         tipo === "debito"
//           ? "bg-amber-500 text-slate-950 shadow-amber-950/10 hover:bg-amber-400 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
//           : "bg-emerald-600 text-white shadow-emerald-950/10 hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
//       }`}
//     >
//       {pending ? (
//         <>
//           <Loader2 className="h-4 w-4 animate-spin sm:h-3.5 sm:w-3.5" />
//           Guardando...
//         </>
//       ) : (
//         <>
//           <Save className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
//           {label}
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

// function AlertBox({
//   variant,
//   children,
//   compact = false,
// }: {
//   variant: "success" | "danger" | "warning" | "info";
//   children: ReactNode;
//   compact?: boolean;
// }) {
//   const classes = {
//     success:
//       "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200",
//     danger:
//       "border-red-300 bg-red-50 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200",
//     warning:
//       "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300",
//     info: "border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200",
//   };

//   return (
//     <div
//       className={`rounded-2xl border shadow-sm ${classes[variant]} ${
//         compact ? "px-3 py-2.5" : "p-3"
//       }`}
//     >
//       <div className="flex items-start gap-2.5">
//         {variant === "success" ? (
//           <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
//         ) : variant === "danger" || variant === "warning" ? (
//           <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
//         ) : (
//           <FileText className="mt-0.5 h-4 w-4 shrink-0" />
//         )}

//         <p className="text-xs leading-5 sm:text-[11px] sm:leading-4">
//           {children}
//         </p>
//       </div>
//     </div>
//   );
// }

// function SelectField({
//   id,
//   name,
//   value,
//   onChange,
//   children,
// }: {
//   id: string;
//   name: string;
//   value: string;
//   onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
//   children: ReactNode;
// }) {
//   return (
//     <div className="relative">
//       <select
//         id={id}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={selectClass}
//       >
//         {children}
//       </select>

//       <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500 sm:h-3.5 sm:w-3.5" />
//     </div>
//   );
// }

// export function NotaFinancieraForm({
//   clienteId,
//   tipo,
//   facturas,
//   clienteNombre = "",
//   variant = "default",
// }: NotaFinancieraFormProps) {
//   const router = useRouter();
//   const isDesktop = variant === "desktop";
//   const action =
//     tipo === "credito" ? crearNotaCreditoAction : crearNotaDebitoAction;

//   const [state, formAction] = useFormState(action, initialState);
//   const [facturaSeleccionadaId, setFacturaSeleccionadaId] = useState("");
//   const [importeDigits, setImporteDigits] = useState("");

//   const facturasDisponibles = useMemo(() => {
//     const lista =
//       tipo === "credito"
//         ? facturas.filter((factura) => factura.saldoFactura > 0)
//         : facturas;

//     return ordenarFacturas(lista);
//   }, [facturas, tipo]);

//   const facturaSeleccionada = useMemo(() => {
//     return (
//       facturasDisponibles.find(
//         (factura) => factura.id === facturaSeleccionadaId,
//       ) || null
//     );
//   }, [facturaSeleccionadaId, facturasDisponibles]);

//   const importeNumerico = moneyInputToNumber(importeDigits);
//   const importeVisual = formatCurrencyFromDigits(importeDigits);
//   const importeValido = importeNumerico > 0;
//   const hayFacturaSeleccionada = Boolean(facturaSeleccionada);
//   const excedeSaldo =
//     tipo === "credito" &&
//     facturaSeleccionada &&
//     importeNumerico > facturaSeleccionada.saldoFactura;

//   const puedeRegistrar =
//     hayFacturaSeleccionada &&
//     importeValido &&
//     !excedeSaldo &&
//     facturasDisponibles.length > 0;

//   useEffect(() => {
//     if (state.ok) {
//       setFacturaSeleccionadaId("");
//       setImporteDigits("");
//       router.refresh();
//     }
//   }, [router, state.ok]);

//   function appendDigit(digit: string) {
//     setImporteDigits((current) => limpiarCerosIzquierda(`${current}${digit}`));
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

//     setImporteDigits(
//       limpiarCerosIzquierda(extraerSoloDigitos(event.target.value)),
//     );
//   }

//   function handleImportePaste(event: ClipboardEvent<HTMLInputElement>) {
//     event.preventDefault();

//     const pasted = event.clipboardData.getData("text");
//     setImporteDigits(limpiarCerosIzquierda(extraerSoloDigitos(pasted)));
//   }

//   const title =
//     tipo === "debito"
//       ? "Datos de la nota de débito"
//       : "Datos de la nota de crédito";

//   const subtitle =
//     tipo === "debito"
//       ? "La nota de débito sumará deuda a la factura seleccionada."
//       : "La nota de crédito reducirá deuda de la factura seleccionada.";

//   const toneClass =
//     tipo === "debito"
//       ? "border-amber-300 bg-amber-50/70 dark:border-amber-900/70 dark:bg-amber-950/30"
//       : "border-emerald-300 bg-emerald-50/70 dark:border-emerald-900/70 dark:bg-emerald-950/30";

//   const iconBoxClass =
//     tipo === "debito"
//       ? "bg-amber-100 text-amber-800 ring-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-900"
//       : "bg-emerald-100 text-emerald-800 ring-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-900";

//   const iconTextClass =
//     tipo === "debito"
//       ? "text-amber-700 dark:text-amber-300"
//       : "text-emerald-700 dark:text-emerald-300";

//   const Icon = tipo === "debito" ? PlusCircle : MinusCircle;

//   if (facturasDisponibles.length === 0) {
//     return (
//       <div className="rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-3.5">
//         <AlertBox variant="warning">
//           {tipo === "credito"
//             ? "No hay facturas con saldo disponible para aplicar una nota de crédito."
//             : "Este cliente todavía no tiene facturas emitidas para asociar una nota de débito."}
//         </AlertBox>
//       </div>
//     );
//   }

//   return (
//     <form
//       action={formAction}
//       className={
//         isDesktop
//           ? "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-4 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none"
//           : "space-y-3"
//       }
//     >
//       <input type="hidden" name="clienteId" value={clienteId} />
//       <input type="hidden" name="importe" value={importeNumerico} />

//       {isDesktop ? (
//         <div className="mb-4 flex items-start gap-3">
//           <div
//             className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1 ${iconBoxClass}`}
//           >
//             <Icon className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p
//               className={`text-[11px] font-medium uppercase tracking-[0.18em] ${iconTextClass}`}
//             >
//               {tipo === "debito" ? "Nota de débito" : "Nota de crédito"}
//             </p>

//             <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//               {clienteNombre || "Cliente seleccionado"}
//             </h2>
//           </div>
//         </div>
//       ) : null}

//       <div
//         className={`rounded-[1.45rem] border p-4 shadow-sm dark:shadow-none sm:p-4 ${toneClass}`}
//       >
//         {!isDesktop ? (
//           <div className="mb-4 flex items-start gap-3">
//             <div
//               className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1 ${iconBoxClass}`}
//             >
//               <Icon className="h-4 w-4" />
//             </div>

//             <div className="min-w-0">
//               <p
//                 className={`text-[11px] font-medium uppercase tracking-[0.18em] ${iconTextClass}`}
//               >
//                 Movimiento
//               </p>

//               <h3 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
//                 {title}
//               </h3>
//             </div>
//           </div>
//         ) : null}

//         <div className="grid gap-4 md:grid-cols-[1.55fr_0.7fr]">
//           <div>
//             <FieldLabel htmlFor="facturaAsociadaId">
//               Factura asociada
//             </FieldLabel>

//             <SelectField
//               id="facturaAsociadaId"
//               name="facturaAsociadaId"
//               value={facturaSeleccionadaId}
//               onChange={(event) => setFacturaSeleccionadaId(event.target.value)}
//             >
//               <option value="">Seleccionar factura</option>

//               {facturasDisponibles.map((factura) => (
//                 <option key={factura.id} value={factura.id}>
//                   Factura N° {factura.numeroComprobante} ·{" "}
//                   {getFacturaPeriodo(factura)} · Saldo{" "}
//                   {formatMoney(factura.saldoFactura)}
//                 </option>
//               ))}
//             </SelectField>

//             {facturaSeleccionada ? (
//               <div className="mt-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs leading-5 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
//                 Saldo factura:{" "}
//                 <span
//                   className={`font-medium ${
//                     facturaSeleccionada.saldoFactura > 0
//                       ? "text-red-700 dark:text-red-300"
//                       : facturaSeleccionada.saldoFactura < 0
//                         ? "text-amber-700 dark:text-amber-300"
//                         : "text-emerald-700 dark:text-emerald-300"
//                   }`}
//                 >
//                   {formatMoney(facturaSeleccionada.saldoFactura)}
//                 </span>
//               </div>
//             ) : null}
//           </div>

//           <div>
//             <FieldLabel htmlFor="importeVisual">Importe</FieldLabel>

//             <input
//               id="importeVisual"
//               type="text"
//               inputMode="numeric"
//               value={importeVisual}
//               onKeyDown={handleImporteKeyDown}
//               onChange={handleImporteChange}
//               onPaste={handleImportePaste}
//               placeholder="$ 0,00"
//               className={`h-12 w-full rounded-xl border-2 px-3 text-center text-lg font-semibold tracking-tight text-slate-950 outline-none transition placeholder:text-center placeholder:text-sm placeholder:font-medium placeholder:text-slate-400 focus:bg-white focus:ring-4 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-600 dark:focus:bg-slate-950 sm:h-11 sm:text-base ${
//                 tipo === "debito"
//                   ? "border-amber-300 bg-amber-50/60 focus:border-amber-500 focus:ring-amber-500/10 dark:border-amber-900/80 dark:focus:border-amber-400"
//                   : "border-emerald-300 bg-emerald-50/60 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-emerald-900/80 dark:focus:border-emerald-400"
//               }`}
//             />

//             {excedeSaldo ? (
//               <p className="mt-2 text-xs leading-5 text-red-700 dark:text-red-300">
//                 La nota de crédito no puede superar el saldo de la factura.
//               </p>
//             ) : null}
//           </div>
//         </div>

//         <div className="mt-4 hidden items-start gap-3 border-t border-amber-200 pt-3 text-xs leading-5 text-slate-600 dark:border-amber-900/50 dark:text-slate-400 md:flex">
//           <Info className={`mt-0.5 h-4 w-4 shrink-0 ${iconTextClass}`} />
//           <p>{subtitle}</p>
//         </div>
//       </div>

//       <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
//         <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
//           <FieldLabel htmlFor="concepto">Concepto</FieldLabel>

//           <div className="relative">
//             <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

//             <input
//               id="concepto"
//               name="concepto"
//               type="text"
//               required
//               placeholder={
//                 tipo === "credito"
//                   ? "Ej: Bonificación sobre factura"
//                   : "Ej: Cargo adicional sobre factura"
//               }
//               className="h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600 sm:h-9 sm:text-xs"
//             />
//           </div>
//         </div>

//         <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
//           <FieldLabel htmlFor="observacion">Observación</FieldLabel>

//           <div className="relative">
//             <MessageCircle className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />

//             <textarea
//               id="observacion"
//               name="observacion"
//               rows={2}
//               placeholder="Opcional"
//               className="h-12 w-full resize-none rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600 sm:h-10 sm:text-xs"
//             />
//           </div>
//         </div>
//       </div>

//       {state.message ? (
//         <AlertBox variant={state.ok ? "success" : "danger"} compact>
//           {state.message}
//         </AlertBox>
//       ) : null}

//       <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
//         <div className="flex flex-col gap-3 border-t border-dashed border-slate-300 pt-3 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-start gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
//             <Info className={`mt-0.5 h-4 w-4 shrink-0 ${iconTextClass}`} />
//             <p>Verificá factura e importe antes de registrar.</p>
//           </div>

//           <SubmitButton disabled={!puedeRegistrar} tipo={tipo} />
//         </div>
//       </div>
//     </form>
//   );
// }

// src/components/forms/NotaFinancieraForm.tsx

"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  FileText,
  Info,
  Loader2,
  MessageCircle,
  MinusCircle,
  PlusCircle,
  Save,
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
  clienteNombre?: string;
  variant?: "default" | "desktop";
};

const initialState: MovimientoActionState = {
  ok: false,
  message: "",
};

const inputClass =
  "h-8 w-full rounded-lg border border-slate-300 bg-white px-2.5 text-[12px] font-normal text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500";

const selectClass =
  "h-8 w-full appearance-none rounded-lg border border-slate-300 bg-white px-2.5 pr-8 text-[12px] font-normal text-slate-950 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-blue-500";

const textAreaClass =
  "h-10 w-full resize-none rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-[12px] leading-5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-500";

const sectionTitleClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

const sectionSubtitleClass =
  "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

const sectionDescriptionClass =
  "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

function formatDate(value: string) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

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

function extraerSoloDigitos(value: string) {
  return String(value || "").replace(/\D/g, "");
}

function limpiarCerosIzquierda(value: string) {
  return extraerSoloDigitos(value).replace(/^0+(?=\d)/, "");
}

function formatCurrencyFromDigits(digits: string) {
  const cleanDigits = limpiarCerosIzquierda(digits);

  if (!cleanDigits) return "$ 0,00";

  const formattedInteger = cleanDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},00`;
}

function moneyInputToNumber(digits: string) {
  const cleanDigits = limpiarCerosIzquierda(extraerSoloDigitos(digits));

  if (!cleanDigits) return 0;

  return Number(cleanDigits);
}

function getFacturaPeriodo(factura: FacturaClienteSafe) {
  if (factura.referenciaMes && factura.referenciaAnio) {
    return `${factura.referenciaMes}/${factura.referenciaAnio}`;
  }

  return formatDate(factura.fecha);
}

function ordenarFacturas(facturas: FacturaClienteSafe[]) {
  return [...facturas].sort((a, b) => {
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
  tipo,
}: {
  disabled: boolean;
  tipo: "credito" | "debito";
}) {
  const { pending } = useFormStatus();

  const isCredito = tipo === "credito";
  const label = isCredito ? "Crear nota de crédito" : "Crear nota de débito";

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={`inline-flex h-8 w-full items-center justify-center gap-2 rounded-lg px-3 text-[12px] font-medium shadow-sm transition disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] sm:w-auto ${
        isCredito
          ? "bg-emerald-600 text-white shadow-emerald-950/10 hover:bg-emerald-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-600"
          : "bg-amber-500 text-slate-950 shadow-amber-950/10 hover:bg-amber-400 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
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
          {label}
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
      className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400"
    >
      {children}
    </label>
  );
}

function AlertBox({
  variant,
  children,
  compact = false,
}: {
  variant: "success" | "danger" | "warning" | "info";
  children: ReactNode;
  compact?: boolean;
}) {
  const classes = {
    success:
      "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300",
    danger:
      "border-red-300 bg-red-50 text-red-800 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300",
    warning:
      "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300",
    info: "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-900/70 dark:bg-blue-950/35 dark:text-blue-300",
  };

  return (
    <div
      className={`rounded-lg border shadow-sm ${classes[variant]} ${
        compact ? "px-3 py-2" : "p-3"
      }`}
    >
      <div className="flex items-start gap-2.5">
        {variant === "success" ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        ) : variant === "danger" || variant === "warning" ? (
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        ) : (
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
        )}

        <p className="text-[12px] leading-5">{children}</p>
      </div>
    </div>
  );
}

function SelectField({
  id,
  name,
  value,
  onChange,
  children,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={selectClass}
      >
        {children}
      </select>

      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
    </div>
  );
}

export function NotaFinancieraForm({
  clienteId,
  tipo,
  facturas,
  clienteNombre = "",
  variant = "default",
}: NotaFinancieraFormProps) {
  const router = useRouter();
  const isDesktop = variant === "desktop";
  const action =
    tipo === "credito" ? crearNotaCreditoAction : crearNotaDebitoAction;

  const [state, formAction] = useFormState(action, initialState);
  const [facturaSeleccionadaId, setFacturaSeleccionadaId] = useState("");
  const [importeDigits, setImporteDigits] = useState("");

  const facturasDisponibles = useMemo(() => {
    const lista =
      tipo === "credito"
        ? facturas.filter((factura) => factura.saldoFactura > 0)
        : facturas;

    return ordenarFacturas(lista);
  }, [facturas, tipo]);

  const facturaSeleccionada = useMemo(() => {
    return (
      facturasDisponibles.find(
        (factura) => factura.id === facturaSeleccionadaId,
      ) || null
    );
  }, [facturaSeleccionadaId, facturasDisponibles]);

  const importeNumerico = moneyInputToNumber(importeDigits);
  const importeVisual = formatCurrencyFromDigits(importeDigits);
  const importeValido = importeNumerico > 0;
  const hayFacturaSeleccionada = Boolean(facturaSeleccionada);
  const excedeSaldo =
    tipo === "credito" &&
    facturaSeleccionada &&
    importeNumerico > facturaSeleccionada.saldoFactura;

  const puedeRegistrar =
    hayFacturaSeleccionada &&
    importeValido &&
    !excedeSaldo &&
    facturasDisponibles.length > 0;

  useEffect(() => {
    if (state.ok) {
      setFacturaSeleccionadaId("");
      setImporteDigits("");
      router.refresh();
    }
  }, [router, state.ok]);

  function appendDigit(digit: string) {
    setImporteDigits((current) => limpiarCerosIzquierda(`${current}${digit}`));
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

    setImporteDigits(
      limpiarCerosIzquierda(extraerSoloDigitos(event.target.value)),
    );
  }

  function handleImportePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pasted = event.clipboardData.getData("text");
    setImporteDigits(limpiarCerosIzquierda(extraerSoloDigitos(pasted)));
  }

  const title =
    tipo === "debito"
      ? "Datos de la nota de débito"
      : "Datos de la nota de crédito";

  const subtitle =
    tipo === "debito"
      ? "La nota de débito sumará deuda a la factura seleccionada."
      : "La nota de crédito reducirá deuda de la factura seleccionada.";

  const isCredito = tipo === "credito";
  const Icon = isCredito ? MinusCircle : PlusCircle;

  const toneClass = isCredito
    ? "border-emerald-300 bg-emerald-50/55 dark:border-emerald-900/70 dark:bg-emerald-950/30"
    : "border-amber-300 bg-amber-50/55 dark:border-amber-900/70 dark:bg-amber-950/30";

  const iconBoxClass = isCredito
    ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
    : "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300";

  const iconTextClass = isCredito
    ? "text-emerald-700 dark:text-emerald-300"
    : "text-amber-700 dark:text-amber-300";

  if (facturasDisponibles.length === 0) {
    return (
      <div
        className={
          isDesktop
            ? "rounded-lg border border-slate-300 bg-slate-50 p-3.5 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10"
            : "rounded-xl border border-slate-300 bg-white/95 p-3.5 shadow-md shadow-slate-300/55 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20"
        }
      >
        <AlertBox variant="warning">
          {isCredito
            ? "No hay facturas con saldo disponible para aplicar una nota de crédito."
            : "Este cliente todavía no tiene facturas emitidas para asociar una nota de débito."}
        </AlertBox>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className={
        isDesktop
          ? "rounded-lg border border-slate-300 bg-slate-50 p-3.5 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10"
          : "space-y-3"
      }
    >
      <input type="hidden" name="clienteId" value={clienteId} />
      <input type="hidden" name="importe" value={importeNumerico} />

      {isDesktop ? (
        <div className="mb-5 flex items-start gap-3 border-b border-slate-200 pb-3 dark:border-slate-700">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${iconBoxClass}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className={sectionTitleClass}>
              {isCredito ? "Nota de crédito" : "Nota de débito"}
            </p>

            <h2 className={sectionSubtitleClass}>
              {clienteNombre || "Cliente seleccionado"}
            </h2>

            <p className={sectionDescriptionClass}>{subtitle}</p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-3">
        <section className={`rounded-lg border p-3.5 shadow-sm ${toneClass}`}>
          {!isDesktop ? (
            <div className="mb-3 flex items-start gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${iconBoxClass}`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className={sectionTitleClass}>Movimiento</p>

                <h3 className={sectionSubtitleClass}>{title}</h3>

                <p className={sectionDescriptionClass}>{subtitle}</p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-3 md:grid-cols-[1.55fr_0.7fr]">
            <div>
              <FieldLabel htmlFor="facturaAsociadaId">
                Factura asociada
              </FieldLabel>

              <SelectField
                id="facturaAsociadaId"
                name="facturaAsociadaId"
                value={facturaSeleccionadaId}
                onChange={(event) =>
                  setFacturaSeleccionadaId(event.target.value)
                }
              >
                <option value="">Seleccionar factura</option>

                {facturasDisponibles.map((factura) => (
                  <option key={factura.id} value={factura.id}>
                    Factura N° {factura.numeroComprobante} ·{" "}
                    {getFacturaPeriodo(factura)} · Saldo{" "}
                    {formatMoney(factura.saldoFactura)}
                  </option>
                ))}
              </SelectField>

              {facturaSeleccionada ? (
                <div className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-[12px] leading-5 text-slate-700 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300 dark:shadow-black/10">
                  Saldo factura:{" "}
                  <span
                    className={`font-semibold ${
                      facturaSeleccionada.saldoFactura > 0
                        ? "text-red-700 dark:text-red-300"
                        : facturaSeleccionada.saldoFactura < 0
                          ? "text-amber-700 dark:text-amber-300"
                          : "text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    {formatMoney(facturaSeleccionada.saldoFactura)}
                  </span>
                </div>
              ) : null}
            </div>

            <div>
              <FieldLabel htmlFor="importeVisual">Importe</FieldLabel>

              <input
                id="importeVisual"
                type="text"
                inputMode="numeric"
                value={importeVisual}
                onKeyDown={handleImporteKeyDown}
                onChange={handleImporteChange}
                onPaste={handleImportePaste}
                placeholder="$ 0,00"
                className={`h-10 w-full rounded-lg border-2 px-3 text-center text-[14px] font-semibold tracking-tight text-slate-950 outline-none transition placeholder:text-center placeholder:text-[12px] placeholder:font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-600 dark:focus:bg-slate-950 ${
                  isCredito
                    ? "border-emerald-300 bg-emerald-50/60 focus:border-emerald-500 focus:ring-emerald-500/10 dark:border-emerald-900/80 dark:focus:border-emerald-400"
                    : "border-amber-300 bg-amber-50/60 focus:border-amber-500 focus:ring-amber-500/10 dark:border-amber-900/80 dark:focus:border-amber-400"
                }`}
              />

              {excedeSaldo ? (
                <p className="mt-2 text-[12px] leading-5 text-red-700 dark:text-red-300">
                  La nota de crédito no puede superar el saldo de la factura.
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 border-t border-slate-200 pt-3 text-[12px] leading-5 text-slate-600 dark:border-slate-700 dark:text-slate-400">
            <Info className={`mt-0.5 h-4 w-4 shrink-0 ${iconTextClass}`} />
            <p>{subtitle}</p>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
            <FieldLabel htmlFor="concepto">Concepto</FieldLabel>

            <div className="relative">
              <FileText className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

              <input
                id="concepto"
                name="concepto"
                type="text"
                required
                placeholder={
                  isCredito
                    ? "Ej: Bonificación sobre factura"
                    : "Ej: Cargo adicional sobre factura"
                }
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>

          <div className="rounded-lg border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
            <FieldLabel htmlFor="observacion">Observación</FieldLabel>

            <div className="relative">
              <MessageCircle className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />

              <textarea
                id="observacion"
                name="observacion"
                rows={2}
                placeholder="Opcional"
                className={textAreaClass}
              />
            </div>
          </div>
        </section>

        {state.message ? (
          <AlertBox variant={state.ok ? "success" : "danger"} compact>
            {state.message}
          </AlertBox>
        ) : null}

        <section className="rounded-lg border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-950/50 dark:shadow-black/10">
          <div className="flex flex-col gap-3 border-t border-dashed border-slate-300 pt-3 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2 text-[12px] leading-5 text-slate-500 dark:text-slate-400">
              <Info className={`mt-0.5 h-4 w-4 shrink-0 ${iconTextClass}`} />
              <p>Verificá factura e importe antes de registrar.</p>
            </div>

            <SubmitButton disabled={!puedeRegistrar} tipo={tipo} />
          </div>
        </section>
      </div>
    </form>
  );
}
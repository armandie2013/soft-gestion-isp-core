// // src/components/forms/CobradorRegistrarPagoCard.tsx

// "use client";

// import { FormEvent, useMemo, useState, useTransition } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   AlertTriangle,
//   CreditCard,
//   Loader2,
//   Search,
//   SearchCheck,
//   X,
// } from "lucide-react";
// import { validarClientePorDniCobradorAction } from "@/actions/cobrador-validacion.actions";

// function limpiarDni(value: string) {
//   return String(value || "").replace(/\D/g, "").slice(0, 12);
// }

// export function CobradorRegistrarPagoCard() {
//   const router = useRouter();

//   const [dni, setDni] = useState("");
//   const [modalAbierto, setModalAbierto] = useState(false);
//   const [mensaje, setMensaje] = useState("");
//   const [dniBuscado, setDniBuscado] = useState("");
//   const [isPending, startTransition] = useTransition();

//   const dniNormalizado = useMemo(() => limpiarDni(dni), [dni]);

//   function cerrarModal() {
//     setModalAbierto(false);
//   }

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const dniActual = limpiarDni(dni);

//     setMensaje("");
//     setDniBuscado(dniActual);

//     if (!dniActual) {
//       setMensaje("Ingresá el DNI del cliente.");
//       setModalAbierto(true);
//       return;
//     }

//     if (dniActual.length < 7 || dniActual.length > 8) {
//       setMensaje("El DNI debe tener 7 u 8 dígitos.");
//       setModalAbierto(true);
//       return;
//     }

//     startTransition(async () => {
//       const result = await validarClientePorDniCobradorAction(dniActual);

//       if (result.encontrado && result.dni) {
//         router.push(`/cobrador/registrar-pago?dni=${result.dni}`);
//         return;
//       }

//       setMensaje(result.message || "No se encontró el cliente.");
//       setDniBuscado(result.dni || dniActual);
//       setModalAbierto(true);
//     });
//   }

//   return (
//     <>
//       <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
//         <div className="mb-3 flex items-start gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
//             <CreditCard className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//               Cliente
//             </p>

//             <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//               Registrar un pago
//             </h2>

//             <p className="mt-0.5 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
//               Ingresá el DNI exacto para validar el cliente antes de continuar.
//             </p>
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="grid gap-2 sm:grid-cols-[minmax(260px,1fr)_150px]"
//         >
//           <div className="relative">
//             <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 dark:text-cyan-300" />

//             <input
//               name="dni"
//               type="text"
//               inputMode="numeric"
//               value={dni}
//               onChange={(event) => setDni(limpiarDni(event.target.value))}
//               placeholder="Ingresá el DNI del cliente"
//               className="h-11 w-full rounded-2xl border border-cyan-300 bg-cyan-50/70 px-3 pl-10 text-sm text-slate-950 shadow-inner outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-cyan-700 dark:bg-cyan-950/45 dark:text-white dark:shadow-cyan-950/30 dark:placeholder:text-cyan-200/60 dark:focus:border-cyan-400 dark:focus:bg-cyan-950/70 dark:focus:ring-cyan-400/20"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isPending}
//             className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300 bg-cyan-100 px-3 text-sm font-medium text-cyan-800 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
//           >
//             {isPending ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Validando
//               </>
//             ) : (
//               <>
//                 <SearchCheck className="h-4 w-4" />
//                 Buscar
//               </>
//             )}
//           </button>
//         </form>
//       </div>

//       {modalAbierto ? (
//         <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/55 px-4 py-4 backdrop-blur-sm sm:items-center">
//           <div className="w-full max-w-md overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/30 dark:border-slate-800 dark:bg-slate-900">
//             <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-red-50 px-4 py-4 dark:border-slate-800 dark:bg-red-950/25">
//               <div className="flex min-w-0 gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-950/70 dark:text-red-300">
//                   <AlertTriangle className="h-5 w-5" />
//                 </div>

//                 <div className="min-w-0">
//                   <p className="text-sm font-medium text-red-800 dark:text-red-200">
//                     Cliente no encontrado
//                   </p>

//                   <p className="mt-1 text-xs leading-5 text-red-700/85 dark:text-red-200/80">
//                     {mensaje}
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={cerrarModal}
//                 className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-red-700 transition hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-950/60"
//                 aria-label="Cerrar modal"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>

//             <div className="px-4 py-4">
//               <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/60">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                   DNI ingresado
//                 </p>

//                 <p className="mt-1 text-lg font-medium tracking-tight text-slate-950 dark:text-white">
//                   {dniBuscado || dniNormalizado || "-"}
//                 </p>
//               </div>

//               <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                 Verificá que el número esté bien escrito. También podés usar la
//                 búsqueda general para encontrar al cliente por nombre, apellido,
//                 últimos dígitos de DNI, número de cliente o localidad.
//               </p>

//               <div className="mt-4 grid gap-2 sm:grid-cols-2">
//                 <button
//                   type="button"
//                   onClick={cerrarModal}
//                   className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900"
//                 >
//                   Corregir DNI
//                 </button>

//                 <Link
//                   href="/cobrador/buscar-cliente"
//                   className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//                 >
//                   Buscar cliente
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }

// // src/components/forms/CobradorRegistrarPagoCard.tsx

// "use client";

// import { FormEvent, useRef, useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import {
//   CreditCard,
//   Loader2,
//   Search,
//   SearchCheck,
//   UserX,
// } from "lucide-react";
// import { validarClientePorDniCobradorAction } from "@/actions/cobrador-validacion.actions";

// function limpiarDni(value: string) {
//   return String(value || "").replace(/\D/g, "").slice(0, 12);
// }

// export function CobradorRegistrarPagoCard() {
//   const router = useRouter();
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const [dni, setDni] = useState("");
//   const [modalAbierto, setModalAbierto] = useState(false);
//   const [mensaje, setMensaje] = useState("");
//   const [isPending, startTransition] = useTransition();

//   function cerrarModal() {
//     setModalAbierto(false);
//   }

//   function reintentar() {
//     setModalAbierto(false);

//     setTimeout(() => {
//       inputRef.current?.focus();
//       inputRef.current?.select();
//     }, 80);
//   }

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const dniActual = limpiarDni(dni);

//     setMensaje("");

//     if (!dniActual) {
//       setMensaje("Ingresá el DNI del cliente para continuar.");
//       setModalAbierto(true);
//       return;
//     }

//     if (dniActual.length < 7 || dniActual.length > 8) {
//       setMensaje("El DNI ingresado debe tener 7 u 8 dígitos.");
//       setModalAbierto(true);
//       return;
//     }

//     startTransition(async () => {
//       const result = await validarClientePorDniCobradorAction(dniActual);

//       if (result.encontrado && result.dni) {
//         router.push(`/cobrador/registrar-pago?dni=${result.dni}`);
//         return;
//       }

//       setMensaje(
//         "No pudimos localizar ningún registro asociado al número proporcionado. Por favor, verificá los datos.",
//       );
//       setModalAbierto(true);
//     });
//   }

//   return (
//     <>
//       <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
//         <div className="mb-3 flex items-start gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
//             <CreditCard className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//               Cliente
//             </p>

//             <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//               Registrar un pago
//             </h2>

//             <p className="mt-0.5 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
//               Ingresá el DNI exacto para validar el cliente antes de continuar.
//             </p>
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="grid gap-2 sm:grid-cols-[minmax(260px,1fr)_150px]"
//         >
//           <div className="relative">
//             <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 dark:text-cyan-300" />

//             <input
//               ref={inputRef}
//               name="dni"
//               type="text"
//               inputMode="numeric"
//               value={dni}
//               onChange={(event) => setDni(limpiarDni(event.target.value))}
//               placeholder="Ingresá el DNI del cliente"
//               className="h-11 w-full rounded-2xl border border-cyan-300 bg-cyan-50/70 px-3 pl-10 text-sm text-slate-950 shadow-inner outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-cyan-700 dark:bg-cyan-950/45 dark:text-white dark:shadow-cyan-950/30 dark:placeholder:text-cyan-200/60 dark:focus:border-cyan-400 dark:focus:bg-cyan-950/70 dark:focus:ring-cyan-400/20"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isPending}
//             className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300 bg-cyan-100 px-3 text-sm font-medium text-cyan-800 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
//           >
//             {isPending ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Validando
//               </>
//             ) : (
//               <>
//                 <SearchCheck className="h-4 w-4" />
//                 Continuar
//               </>
//             )}
//           </button>
//         </form>
//       </div>

//       {modalAbierto ? (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-5 py-6 backdrop-blur-md">
//           <div className="w-full max-w-[360px] rounded-[1.65rem] border border-cyan-400/25 bg-[#0b2333]/95 px-5 py-6 text-center shadow-2xl shadow-black/40 ring-1 ring-white/5 sm:max-w-[390px] sm:px-6">
//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-300/25 bg-slate-800/70 text-red-300 shadow-inner shadow-black/30">
//               <UserX className="h-7 w-7" />
//             </div>

//             <h3 className="mt-4 text-[22px] font-semibold leading-tight tracking-tight text-slate-100">
//               DNI no encontrado
//             </h3>

//             <p className="mx-auto mt-3 max-w-[300px] text-sm font-medium leading-6 text-slate-300">
//               {mensaje}
//             </p>

//             <button
//               type="button"
//               onClick={reintentar}
//               className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-cyan-400 px-4 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-300 active:scale-[0.99]"
//             >
//               Reintentar
//             </button>

//             <button
//               type="button"
//               onClick={cerrarModal}
//               className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-xl text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-slate-200 active:scale-[0.99]"
//             >
//               Cancelar
//             </button>

//             <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-600">
//               ERR_SYS_484_IDENT
//             </p>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }

// // src/components/forms/CobradorRegistrarPagoCard.tsx

// "use client";

// import { FormEvent, useRef, useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import {
//   AlertCircle,
//   CreditCard,
//   Loader2,
//   Search,
//   SearchCheck,
// } from "lucide-react";
// import { validarClientePorDniCobradorAction } from "@/actions/cobrador-validacion.actions";

// function limpiarDni(value: string) {
//   return String(value || "").replace(/\D/g, "").slice(0, 12);
// }

// export function CobradorRegistrarPagoCard() {
//   const router = useRouter();
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const [dni, setDni] = useState("");
//   const [modalAbierto, setModalAbierto] = useState(false);
//   const [mensaje, setMensaje] = useState("");
//   const [isPending, startTransition] = useTransition();

//   function cerrarModal() {
//     setModalAbierto(false);

//     setTimeout(() => {
//       inputRef.current?.focus();
//       inputRef.current?.select();
//     }, 80);
//   }

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const dniActual = limpiarDni(dni);

//     setMensaje("");

//     if (!dniActual) {
//       setMensaje("Ingresá el DNI del cliente para continuar.");
//       setModalAbierto(true);
//       return;
//     }

//     if (dniActual.length < 7 || dniActual.length > 8) {
//       setMensaje("El DNI ingresado debe tener 7 u 8 dígitos.");
//       setModalAbierto(true);
//       return;
//     }

//     startTransition(async () => {
//       const result = await validarClientePorDniCobradorAction(dniActual);

//       if (result.encontrado && result.dni) {
//         router.push(`/cobrador/registrar-pago?dni=${result.dni}`);
//         return;
//       }

//       setMensaje(
//         "No se encontró ningún cliente asociado al DNI ingresado. Verificá el número y volvé a intentar.",
//       );
//       setModalAbierto(true);
//     });
//   }

//   return (
//     <>
//       <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
//         <div className="mb-3 flex items-start gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
//             <CreditCard className="h-4 w-4" />
//           </div>

//           <div className="min-w-0">
//             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//               Cliente
//             </p>

//             <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//               Registrar un pago
//             </h2>

//             <p className="mt-0.5 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
//               Ingresá el DNI exacto para validar el cliente antes de continuar.
//             </p>
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="grid gap-2 sm:grid-cols-[minmax(260px,1fr)_150px]"
//         >
//           <div className="relative">
//             <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 dark:text-cyan-300" />

//             <input
//               ref={inputRef}
//               name="dni"
//               type="text"
//               inputMode="numeric"
//               value={dni}
//               onChange={(event) => setDni(limpiarDni(event.target.value))}
//               placeholder="Ingresá el DNI del cliente"
//               className="h-11 w-full rounded-2xl border border-cyan-300 bg-cyan-50/70 px-3 pl-10 text-sm text-slate-950 shadow-inner outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-cyan-700 dark:bg-cyan-950/45 dark:text-white dark:shadow-cyan-950/30 dark:placeholder:text-cyan-200/60 dark:focus:border-cyan-400 dark:focus:bg-cyan-950/70 dark:focus:ring-cyan-400/20"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isPending}
//             className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300 bg-cyan-100 px-3 text-sm font-medium text-cyan-800 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
//           >
//             {isPending ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Validando
//               </>
//             ) : (
//               <>
//                 <SearchCheck className="h-4 w-4" />
//                 Continuar
//               </>
//             )}
//           </button>
//         </form>
//       </div>

//       {modalAbierto ? (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
//           <div className="w-full max-w-[430px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/30 dark:border-slate-800 dark:bg-slate-900">
//             <div className="h-2 bg-red-500 dark:bg-red-400" />

//             <div className="px-5 pb-5 pt-6 text-center sm:px-6">
//               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-100 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900/70">
//                 <AlertCircle className="h-8 w-8" />
//               </div>

//               <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
//                 DNI no encontrado
//               </h3>

//               <p className="mx-auto mt-3 max-w-[330px] text-sm leading-6 text-slate-600 dark:text-slate-400">
//                 {mensaje}
//               </p>

//               <button
//                 type="button"
//                 onClick={cerrarModal}
//                 className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-cyan-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//               >
//                 Cerrar
//               </button>

//               <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600">
//                 Verificá el DNI y volvé a intentarlo
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }

// src/components/forms/CobradorRegistrarPagoCard.tsx

"use client";

import { FormEvent, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CreditCard,
  Loader2,
  Search,
  SearchCheck,
} from "lucide-react";
import { validarClientePorDniCobradorAction } from "@/actions/cobrador-validacion.actions";

function limpiarDni(value: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 12);
}

export function CobradorRegistrarPagoCard() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [dni, setDni] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [isPending, startTransition] = useTransition();

  function cerrarModal() {
    setModalAbierto(false);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 80);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dniActual = limpiarDni(dni);

    setMensaje("");

    if (!dniActual) {
      setMensaje("Ingresá el DNI del cliente para continuar.");
      setModalAbierto(true);
      return;
    }

    if (dniActual.length < 7 || dniActual.length > 8) {
      setMensaje("El DNI ingresado debe tener 7 u 8 dígitos.");
      setModalAbierto(true);
      return;
    }

    startTransition(async () => {
      const result = await validarClientePorDniCobradorAction(dniActual);

      if (result.encontrado && result.dni) {
        router.push(`/cobrador/registrar-pago?dni=${result.dni}`);
        return;
      }

      setMensaje(
        "No se encontró ningún cliente asociado al DNI ingresado. Verificá el número y volvé a intentar.",
      );
      setModalAbierto(true);
    });
  }

  return (
    <>
      <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
            <CreditCard className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
              Cliente
            </p>

            <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
              Registrar un pago
            </h2>

            <p className="mt-0.5 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
              Ingresá el DNI exacto para validar el cliente antes de continuar.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-2 sm:grid-cols-[minmax(260px,1fr)_150px]"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 dark:text-cyan-300" />

            <input
              ref={inputRef}
              name="dni"
              type="text"
              inputMode="numeric"
              value={dni}
              onChange={(event) => setDni(limpiarDni(event.target.value))}
              placeholder="Ingresá el DNI del cliente"
              className="h-11 w-full rounded-2xl border border-cyan-300 bg-cyan-50/70 px-3 pl-10 text-sm text-slate-950 shadow-inner outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-cyan-700 dark:bg-cyan-950/45 dark:text-white dark:shadow-cyan-950/30 dark:placeholder:text-cyan-200/60 dark:focus:border-cyan-400 dark:focus:bg-cyan-950/70 dark:focus:ring-cyan-400/20"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300 bg-cyan-100 px-3 text-sm font-medium text-cyan-800 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Validando
              </>
            ) : (
              <>
                <SearchCheck className="h-4 w-4" />
                Buscar
              </>
            )}
          </button>
        </form>
      </div>

      {modalAbierto ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-[390px] rounded-[1.7rem] border border-slate-200 bg-white p-5 text-center shadow-2xl shadow-slate-950/30 ring-1 ring-transparent dark:border-cyan-700/70 dark:bg-slate-900 dark:ring-cyan-400/20 sm:p-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100 dark:bg-red-950/35 dark:text-red-300 dark:ring-red-900/60">
              <AlertCircle className="h-7 w-7" />
            </div>

            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              DNI no encontrado
            </h3>

            <p className="mx-auto mt-2 max-w-[300px] text-sm leading-6 text-slate-600 dark:text-slate-400">
              {mensaje}
            </p>

            <button
              type="button"
              onClick={cerrarModal}
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-cyan-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
            >
              Cerrar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
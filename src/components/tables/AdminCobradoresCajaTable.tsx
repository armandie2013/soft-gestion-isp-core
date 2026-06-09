// // src/components/tables/AdminCobradoresCajaTable.tsx

// "use client";

// import { useMemo, useState } from "react";
// import {
//   CalendarClock,
//   CheckCircle2,
//   Clock3,
//   KeyRound,
//   Search,
//   ShieldAlert,
//   UserRound,
//   WalletCards,
//   X,
// } from "lucide-react";
// import { GenerarCodigoCierreCajaForm } from "@/components/forms/GenerarCodigoCierreCajaForm";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { CobradorCajaResumenSafe } from "@/types/cobro.types";

// type AdminCobradoresCajaTableProps = {
//   cobradores: CobradorCajaResumenSafe[];
// };

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function formatDateTime(value?: string | null) {
//   if (!value) return "Sin fecha";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Sin fecha";
//   }

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();

//   let hours = date.getHours();
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const period = hours >= 12 ? "p. m." : "a. m.";

//   hours = hours % 12;
//   hours = hours === 0 ? 12 : hours;

//   const formattedHours = String(hours).padStart(2, "0");

//   return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${period}`;
// }

// function normalizarTexto(value: string) {
//   return value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .trim();
// }

// function getInitials(cobrador: CobradorCajaResumenSafe) {
//   const parts = `${cobrador.nombre} ${cobrador.apellido}`
//     .split(" ")
//     .map((part) => part.trim())
//     .filter(Boolean);

//   if (parts.length === 0) return "CB";

//   return parts
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase())
//     .join("");
// }

// function nombreCompleto(cobrador: CobradorCajaResumenSafe) {
//   const apellido = cobrador.apellido || "";
//   const nombre = cobrador.nombre || "";

//   if (!apellido && !nombre) return "Cobrador sin nombre";

//   return `${apellido}, ${nombre}`.trim();
// }

// function EstadoPill({ saldoActual }: { saldoActual: number }) {
//   const tieneSaldo = saldoActual > 0;

//   return (
//     <span
//       className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${
//         tieneSaldo
//           ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
//           : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
//       }`}
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-current" />
//       {tieneSaldo ? "Pendiente" : "Al día"}
//     </span>
//   );
// }

// function CodigoPill({ cobrador }: { cobrador: CobradorCajaResumenSafe }) {
//   if (!cobrador.codigoPendiente) {
//     return (
//       <span className="inline-flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//         Sin código
//       </span>
//     );
//   }

//   return (
//     <span className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
//       <KeyRound className="h-3 w-3" />
//       {cobrador.codigoPendiente.codigo}
//     </span>
//   );
// }

// export function AdminCobradoresCajaTable({
//   cobradores,
// }: AdminCobradoresCajaTableProps) {
//   const [busqueda, setBusqueda] = useState("");

//   const cobradoresFiltrados = useMemo(() => {
//     const query = normalizarTexto(busqueda);

//     if (!query) {
//       return cobradores;
//     }

//     return cobradores.filter((cobrador) => {
//       const textoBuscable = normalizarTexto(
//         [
//           cobrador.nombre,
//           cobrador.apellido,
//           cobrador.email,
//           cobrador.saldoActual,
//           cobrador.totalCobrado,
//           cobrador.totalCierres,
//           cobrador.codigoPendiente?.codigo,
//         ]
//           .filter(Boolean)
//           .join(" "),
//       );

//       return textoBuscable.includes(query);
//     });
//   }, [busqueda, cobradores]);

//   if (cobradores.length === 0) {
//     return (
//       <EmptyState
//         title="No hay cobradores registrados."
//         description="Cuando asignes usuarios con rol cobrador, aparecerán en este listado."
//       />
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//         <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full">
//             <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

//             <input
//               type="text"
//               value={busqueda}
//               onChange={(event) => setBusqueda(event.target.value)}
//               placeholder="Buscar por cobrador, email o código"
//               className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 pl-8 pr-8 text-[11px] text-slate-950 outline-none transition placeholder:text-[11px] placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-500 dark:focus:bg-slate-900"
//             />

//             {busqueda ? (
//               <button
//                 type="button"
//                 onClick={() => setBusqueda("")}
//                 className="absolute right-1.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-500 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-300"
//                 aria-label="Limpiar búsqueda"
//               >
//                 <X className="h-3.5 w-3.5" />
//               </button>
//             ) : null}
//           </div>

//           <div className="flex shrink-0 items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 sm:justify-end">
//             <span>Total: {cobradores.length}</span>
//             <span>Mostrados: {cobradoresFiltrados.length}</span>
//           </div>
//         </div>
//       </div>

//       {cobradoresFiltrados.length === 0 ? (
//         <EmptyState
//           title="No se encontraron cobradores."
//           description="Probá con otro nombre, email o código activo."
//         />
//       ) : (
//         <>
//           <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:block">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-[1040px] table-fixed text-left text-xs xl:min-w-0">
//                 <colgroup>
//                   <col className="w-[22%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[11%]" />
//                   <col className="w-[13%]" />
//                   <col className="w-[15%]" />
//                 </colgroup>

//                 <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//                   <tr>
//                     <th className="px-3 py-2.5 font-medium">Cobrador</th>
//                     <th className="px-3 py-2.5 font-medium">Caja actual</th>
//                     <th className="px-3 py-2.5 font-medium">Total cobrado</th>
//                     <th className="px-3 py-2.5 font-medium">Total cerrado</th>
//                     <th className="px-3 py-2.5 font-medium">Estado</th>
//                     <th className="px-3 py-2.5 font-medium">Código</th>
//                     <th className="px-3 py-2.5 text-right font-medium">
//                       Acción
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
//                   {cobradoresFiltrados.map((cobrador) => (
//                     <tr
//                       key={cobrador.cobradorId}
//                       className="transition hover:bg-slate-50/80 dark:hover:bg-slate-950/35"
//                     >
//                       <td className="px-3 py-3">
//                         <div className="flex min-w-0 items-center gap-2.5">
//                           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                             {getInitials(cobrador)}
//                           </div>

//                           <div className="min-w-0">
//                             <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
//                               {nombreCompleto(cobrador)}
//                             </p>

//                             <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
//                               {cobrador.email || "Sin email"}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p
//                           className={`truncate text-xs font-medium ${
//                             cobrador.saldoActual > 0
//                               ? "text-red-700 dark:text-red-300"
//                               : "text-slate-950 dark:text-white"
//                           }`}
//                         >
//                           {formatMoney(cobrador.saldoActual)}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {formatMoney(cobrador.totalCobrado)}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <p className="truncate text-xs text-slate-600 dark:text-slate-300">
//                           {formatMoney(cobrador.totalCierres)}
//                         </p>
//                       </td>

//                       <td className="px-3 py-3">
//                         <EstadoPill saldoActual={cobrador.saldoActual} />
//                       </td>

//                       <td className="px-3 py-3">
//                         <CodigoPill cobrador={cobrador} />
//                       </td>

//                       <td className="px-3 py-3 text-right">
//                         <GenerarCodigoCierreCajaForm
//                           cobradorId={cobrador.cobradorId}
//                           disabled={cobrador.saldoActual <= 0}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
//               <span>
//                 Mostrando {cobradoresFiltrados.length} de {cobradores.length}{" "}
//                 cobradores
//               </span>

//               <span>Gestión de caja</span>
//             </div>
//           </div>

//           <div className="grid gap-3 md:hidden">
//             {cobradoresFiltrados.map((cobrador) => (
//               <div
//                 key={cobrador.cobradorId}
//                 className="rounded-[1.35rem] border border-slate-200 bg-white/85 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex min-w-0 gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-xs font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                       {getInitials(cobrador)}
//                     </div>

//                     <div className="min-w-0">
//                       <h2 className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                         {nombreCompleto(cobrador)}
//                       </h2>

//                       <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
//                         {cobrador.email || "Sin email"}
//                       </p>
//                     </div>
//                   </div>

//                   <EstadoPill saldoActual={cobrador.saldoActual} />
//                 </div>

//                 <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//                   <div className="flex items-center justify-between gap-3">
//                     <span className="inline-flex items-center gap-1.5">
//                       <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                       Caja actual
//                     </span>

//                     <span
//                       className={`shrink-0 text-right font-medium ${
//                         cobrador.saldoActual > 0
//                           ? "text-red-700 dark:text-red-300"
//                           : "text-cyan-700 dark:text-cyan-300"
//                       }`}
//                     >
//                       {formatMoney(cobrador.saldoActual)}
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-1.5">
//                       <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
//                       Total cobrado
//                     </span>

//                     <span className="text-right">
//                       {formatMoney(cobrador.totalCobrado)}
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-1.5">
//                       <ShieldAlert className="h-3.5 w-3.5 text-slate-400" />
//                       Total cerrado
//                     </span>

//                     <span className="text-right">
//                       {formatMoney(cobrador.totalCierres)}
//                     </span>
//                   </div>

//                   <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                     <span className="inline-flex items-center gap-1.5">
//                       <Clock3 className="h-3.5 w-3.5 text-slate-400" />
//                       Código
//                     </span>

//                     <CodigoPill cobrador={cobrador} />
//                   </div>

//                   {cobrador.codigoPendiente ? (
//                     <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-200 pt-2 dark:border-slate-800">
//                       <span className="inline-flex items-center gap-1.5">
//                         <CalendarClock className="h-3.5 w-3.5 text-slate-400" />
//                         Vence
//                       </span>

//                       <span className="truncate text-right">
//                         {formatDateTime(cobrador.codigoPendiente.venceEn)}
//                       </span>
//                     </div>
//                   ) : null}
//                 </div>

//                 <div className="mt-3">
//                   <GenerarCodigoCierreCajaForm
//                     cobradorId={cobrador.cobradorId}
//                     disabled={cobrador.saldoActual <= 0}
//                     fullWidth
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// src/components/tables/AdminCobradoresCajaTable.tsx

"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  CalendarClock,
  CheckCircle2,
  KeyRound,
  Search,
  WalletCards,
  X,
} from "lucide-react";
import { GenerarCodigoCierreCajaForm } from "@/components/forms/GenerarCodigoCierreCajaForm";
import { EmptyState } from "@/components/ui/EmptyState";
import type { CobradorCajaResumenSafe } from "@/types/cobro.types";

type AdminCobradoresCajaTableProps = {
  cobradores: CobradorCajaResumenSafe[];
};

const cardBase =
  "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatDateTime(value?: string | null) {
  if (!value) return "Sin fecha";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "p. m." : "a. m.";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const formattedHours = String(hours).padStart(2, "0");

  return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${period}`;
}

function normalizarTexto(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getInitials(cobrador: CobradorCajaResumenSafe) {
  const parts = `${cobrador.apellido} ${cobrador.nombre}`
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) return "CB";

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function nombreCompleto(cobrador: CobradorCajaResumenSafe) {
  const apellido = cobrador.apellido || "";
  const nombre = cobrador.nombre || "";

  if (!apellido && !nombre) return "Cobrador sin nombre";

  return `${apellido}, ${nombre}`.trim();
}

function EstadoPill({ saldoActual }: { saldoActual: number }) {
  const tieneSaldo = saldoActual > 0;

  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
        tieneSaldo
          ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300"
          : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {tieneSaldo ? "Pendiente" : "Al día"}
    </span>
  );
}

function CodigoPill({ cobrador }: { cobrador: CobradorCajaResumenSafe }) {
  if (!cobrador.codigoPendiente) {
    return (
      <span className="inline-flex w-fit items-center gap-1 rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
        Sin código
      </span>
    );
  }

  return (
    <span className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300">
      <KeyRound className="h-3 w-3" />
      {cobrador.codigoPendiente.codigo}
    </span>
  );
}

function MobileCobradorCard({
  cobrador,
}: {
  cobrador: CobradorCajaResumenSafe;
}) {
  const tieneSaldo = cobrador.saldoActual > 0;
  const tieneCodigoPendiente = Boolean(cobrador.codigoPendiente);

  return (
    <article className="rounded-[1.25rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-semibold text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
            {getInitials(cobrador)}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-slate-950 dark:text-white">
              {nombreCompleto(cobrador)}
            </h2>

            <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
              {cobrador.email || "Sin email"}
            </p>
          </div>
        </div>

        <EstadoPill saldoActual={cobrador.saldoActual} />
      </div>

      <div className="mt-3 rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <WalletCards className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />
            <span className="truncate">Caja actual</span>
          </span>

          <span
            className={`shrink-0 text-right font-medium ${
              tieneSaldo
                ? "text-amber-700 dark:text-amber-300"
                : "text-cyan-700 dark:text-cyan-300"
            }`}
          >
            {formatMoney(cobrador.saldoActual)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-800">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Banknote className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">Total cobrado</span>
          </span>

          <span className="shrink-0 text-right font-medium text-slate-700 dark:text-slate-300">
            {formatMoney(cobrador.totalCobrado)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-800">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">Total cerrado</span>
          </span>

          <span className="shrink-0 text-right font-medium text-slate-700 dark:text-slate-300">
            {formatMoney(cobrador.totalCierres)}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-300 pt-2 dark:border-slate-800">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <KeyRound className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">Código</span>
          </span>

          <CodigoPill cobrador={cobrador} />
        </div>

        {cobrador.codigoPendiente ? (
          <div className="mt-2 flex items-center gap-1.5 border-t border-slate-300 pt-2 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <CalendarClock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">
              Vence: {formatDateTime(cobrador.codigoPendiente.venceEn)}
            </span>
          </div>
        ) : null}
      </div>

      {tieneSaldo && !tieneCodigoPendiente ? (
        <div className="mt-3">
          <GenerarCodigoCierreCajaForm
            cobradorId={cobrador.cobradorId}
            fullWidth
          />
        </div>
      ) : null}
    </article>
  );
}

export function AdminCobradoresCajaTable({
  cobradores,
}: AdminCobradoresCajaTableProps) {
  const [busqueda, setBusqueda] = useState("");

  const cobradoresFiltrados = useMemo(() => {
    const query = normalizarTexto(busqueda);

    if (!query) {
      return cobradores;
    }

    return cobradores.filter((cobrador) => {
      const textoBuscable = normalizarTexto(
        [
          cobrador.nombre,
          cobrador.apellido,
          cobrador.email,
          cobrador.saldoActual,
          cobrador.totalCobrado,
          cobrador.totalCierres,
          cobrador.codigoPendiente?.codigo,
        ]
          .filter(Boolean)
          .join(" "),
      );

      return textoBuscable.includes(query);
    });
  }, [busqueda, cobradores]);

  if (cobradores.length === 0) {
    return (
      <EmptyState
        title="No hay cobradores registrados."
        description="Cuando asignes usuarios con rol cobrador, aparecerán en este listado."
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className={`${cardBase} p-3`}>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

            <input
              type="text"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Buscar por cobrador, email o código"
              className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 pl-9 pr-9 text-xs text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-700 dark:focus:bg-slate-900 lg:h-9"
            />

            {busqueda ? (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-500 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-300"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 sm:justify-end">
            <span>Total: {cobradores.length}</span>
            <span>Mostrados: {cobradoresFiltrados.length}</span>
          </div>
        </div>
      </div>

      {cobradoresFiltrados.length === 0 ? (
        <EmptyState
          title="No se encontraron cobradores."
          description="Probá con otro nombre, email o código activo."
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1040px] table-fixed text-left text-xs xl:min-w-0">
                <colgroup>
                  <col className="w-[22%]" />
                  <col className="w-[13%]" />
                  <col className="w-[13%]" />
                  <col className="w-[13%]" />
                  <col className="w-[11%]" />
                  <col className="w-[13%]" />
                  <col className="w-[15%]" />
                </colgroup>

                <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                  <tr>
                    <th className="px-3 py-2.5 font-medium">Cobrador</th>
                    <th className="px-3 py-2.5 font-medium">Caja actual</th>
                    <th className="px-3 py-2.5 font-medium">Total cobrado</th>
                    <th className="px-3 py-2.5 font-medium">Total cerrado</th>
                    <th className="px-3 py-2.5 font-medium">Estado</th>
                    <th className="px-3 py-2.5 font-medium">Código</th>
                    <th className="px-3 py-2.5 text-right font-medium">
                      Acción
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {cobradoresFiltrados.map((cobrador) => {
                    const tieneCodigoPendiente = Boolean(
                      cobrador.codigoPendiente,
                    );

                    return (
                      <tr
                        key={cobrador.cobradorId}
                        className="transition hover:bg-slate-50/90 dark:hover:bg-cyan-950/10"
                      >
                        <td className="px-3 py-3">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
                              {getInitials(cobrador)}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                                {nombreCompleto(cobrador)}
                              </p>

                              <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                                {cobrador.email || "Sin email"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <p
                            className={`truncate text-xs font-medium ${
                              cobrador.saldoActual > 0
                                ? "text-amber-700 dark:text-amber-300"
                                : "text-slate-950 dark:text-white"
                            }`}
                          >
                            {formatMoney(cobrador.saldoActual)}
                          </p>
                        </td>

                        <td className="px-3 py-3">
                          <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                            {formatMoney(cobrador.totalCobrado)}
                          </p>
                        </td>

                        <td className="px-3 py-3">
                          <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                            {formatMoney(cobrador.totalCierres)}
                          </p>
                        </td>

                        <td className="px-3 py-3">
                          <EstadoPill saldoActual={cobrador.saldoActual} />
                        </td>

                        <td className="px-3 py-3">
                          <CodigoPill cobrador={cobrador} />
                        </td>

                        <td className="px-3 py-3 text-right">
                          <GenerarCodigoCierreCajaForm
                            cobradorId={cobrador.cobradorId}
                            disabled={
                              cobrador.saldoActual <= 0 ||
                              tieneCodigoPendiente
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span>
                Mostrando {cobradoresFiltrados.length} de {cobradores.length}{" "}
                cobradores
              </span>

              <span>Vista administrativa</span>
            </div>
          </div>

          <div className="grid gap-2 lg:hidden">
            {cobradoresFiltrados.map((cobrador) => (
              <MobileCobradorCard
                key={cobrador.cobradorId}
                cobrador={cobrador}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
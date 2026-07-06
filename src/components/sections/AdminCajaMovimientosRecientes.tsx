// import Link from "next/link";
// import {
//   ArrowDownLeft,
//   ArrowUpRight,
//   FileWarning,
//   History,
//   ReceiptText,
// } from "lucide-react";
// import { obtenerCajaCobradorResumen } from "@/services/cobro.service";
// import type {
//   CajaCobradorMovimientoSafe,
//   CobradorCajaResumenSafe,
// } from "@/types/cobro.types";

// type AdminCajaMovimientosRecientesProps = {
//   cobradores: CobradorCajaResumenSafe[];
// };

// type MovimientoConCobrador = CajaCobradorMovimientoSafe & {
//   cobradorNombre: string;
// };

// function formatDate(value: string) {
//   if (!value) return "-";

//   return new Intl.DateTimeFormat("es-AR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(value));
// }

// function formatMoney(value: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function getNombreCobrador(cobrador: CobradorCajaResumenSafe) {
//   const apellido = String(cobrador.apellido || "").trim();
//   const nombre = String(cobrador.nombre || "").trim();

//   const nombreCompleto = `${apellido}, ${nombre}`
//     .replace(/^,\s*/, "")
//     .replace(/,\s*$/, "")
//     .trim();

//   return nombreCompleto || cobrador.email || "Cobrador";
// }

// function getMovimientoLabel(tipoMovimiento: string) {
//   if (tipoMovimiento === "cobro") {
//     return {
//       label: "Cobro",
//       icon: ArrowUpRight,
//       badge:
//         "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300",
//       iconBox:
//         "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
//       amount: "text-emerald-700 dark:text-emerald-300",
//       sign: "+",
//     };
//   }

//   if (tipoMovimiento === "ajuste_correccion_pago") {
//     return {
//       label: "Corrección",
//       icon: ArrowDownLeft,
//       badge:
//         "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300",
//       iconBox:
//         "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
//       amount: "text-red-700 dark:text-red-300",
//       sign: "-",
//     };
//   }

//   if (tipoMovimiento === "ajuste_correccion_pago_post_cierre") {
//     return {
//       label: "Post-cierre",
//       icon: History,
//       badge:
//         "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300",
//       iconBox:
//         "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
//       amount: "text-amber-700 dark:text-amber-300",
//       sign: "-",
//     };
//   }

//   return {
//     label: "Cierre",
//     icon: ArrowDownLeft,
//     badge:
//       "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300",
//     iconBox:
//       "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
//     amount: "text-red-700 dark:text-red-300",
//     sign: "-",
//   };
// }

// function getEstadoLabel(movimiento: CajaCobradorMovimientoSafe) {
//   if (movimiento.tipoMovimiento === "ajuste_correccion_pago_post_cierre") {
//     return "Ajuste de caja cerrada";
//   }

//   if (movimiento.estadoCaja === "cerrado") {
//     return "Caja cerrada";
//   }

//   return "Caja abierta";
// }

// export async function AdminCajaMovimientosRecientes({
//   cobradores,
// }: AdminCajaMovimientosRecientesProps) {
//   const movimientosPorCobrador = await Promise.all(
//     cobradores.map(async (cobrador) => {
//       const caja = await obtenerCajaCobradorResumen(cobrador.cobradorId);
//       const cobradorNombre = getNombreCobrador(cobrador);

//       return caja.movimientos.map((movimiento) => ({
//         ...movimiento,
//         cobradorNombre,
//       }));
//     }),
//   );

//   const movimientos: MovimientoConCobrador[] = movimientosPorCobrador
//     .flat()
//     .filter((movimiento) =>
//       [
//         "cobro",
//         "ajuste_correccion_pago",
//         "ajuste_correccion_pago_post_cierre",
//       ].includes(movimiento.tipoMovimiento),
//     )
//     .sort(
//       (a, b) =>
//         new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime(),
//     )
//     .slice(0, 20);

//   return (
//     <section className="rounded-[1.45rem] border border-slate-300 bg-slate-50/95 p-3.5 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
//       <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Movimientos recientes
//           </p>

//           <h2 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//             Cobros y correcciones
//           </h2>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Desde acá el administrador puede entrar al comprobante y corregir un
//             pago emitido por error. Si el cobro ya fue cerrado, la corrección
//             queda asociada al cierre anterior.
//           </p>
//         </div>
//       </div>

//       {movimientos.length === 0 ? (
//         <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
//           Todavía no hay cobros registrados para mostrar.
//         </div>
//       ) : (
//         <>
//           <div className="hidden overflow-hidden rounded-2xl border border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-950/50 lg:block">
//             <div className="grid grid-cols-[150px_140px_minmax(0,1fr)_130px_150px_140px_210px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
//               <span>Fecha</span>
//               <span>Tipo</span>
//               <span>Detalle</span>
//               <span>Estado</span>
//               <span>Cobrador</span>
//               <span className="text-right">Importe</span>
//               <span className="text-right">Acciones</span>
//             </div>

//             <div className="divide-y divide-slate-200 dark:divide-slate-800">
//               {movimientos.map((movimiento) => {
//                 const info = getMovimientoLabel(movimiento.tipoMovimiento);
//                 const Icon = info.icon;

//                 return (
//                   <div
//                     key={movimiento.id}
//                     className="grid grid-cols-[150px_140px_minmax(0,1fr)_130px_150px_140px_210px] items-center gap-3 px-3 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-900/60"
//                   >
//                     <p className="truncate text-xs text-slate-600 dark:text-slate-400">
//                       {formatDate(movimiento.creadoEn)}
//                     </p>

//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${info.iconBox}`}
//                       >
//                         <Icon className="h-3.5 w-3.5" />
//                       </div>

//                       <span
//                         className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${info.badge}`}
//                       >
//                         {info.label}
//                       </span>
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
//                         {movimiento.descripcion || "Movimiento de caja"}
//                       </p>

//                       {movimiento.observacion ? (
//                         <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
//                           {movimiento.observacion}
//                         </p>
//                       ) : null}
//                     </div>

//                     <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
//                       {getEstadoLabel(movimiento)}
//                     </p>

//                     <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-300">
//                       {movimiento.cobradorNombre}
//                     </p>

//                     <p
//                       className={`truncate text-right text-sm font-medium ${info.amount}`}
//                     >
//                       {info.sign} {formatMoney(movimiento.importe)}
//                     </p>

//                     <div className="flex justify-end gap-2">
//                       {movimiento.movimientoFinancieroId &&
//                       movimiento.tipoMovimiento === "cobro" ? (
//                         <Link
//                           href={`/comprobantes/pagos/${movimiento.movimientoFinancieroId}`}
//                           className="inline-flex h-8 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2.5 text-[11px] font-medium text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                         >
//                           <ReceiptText className="h-3.5 w-3.5" />
//                           Ver
//                         </Link>
//                       ) : null}

//                       {movimiento.tipoMovimiento === "cobro" &&
//                       movimiento.movimientoFinancieroId ? (
//                         <Link
//                           href={`/admin/caja-cobradores/corregir-pago/${movimiento.movimientoFinancieroId}`}
//                           className="inline-flex h-8 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-2.5 text-[11px] font-medium text-red-700 transition hover:bg-red-100 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/60"
//                         >
//                           <FileWarning className="h-3.5 w-3.5" />
//                           Corregir
//                         </Link>
//                       ) : null}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="grid gap-2 lg:hidden">
//             {movimientos.map((movimiento) => {
//               const info = getMovimientoLabel(movimiento.tipoMovimiento);
//               const Icon = info.icon;

//               return (
//                 <article
//                   key={movimiento.id}
//                   className="rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-none"
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex min-w-0 items-start gap-3">
//                       <div
//                         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${info.iconBox}`}
//                       >
//                         <Icon className="h-4 w-4" />
//                       </div>

//                       <div className="min-w-0">
//                         <p className="text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
//                           {formatDate(movimiento.creadoEn)}
//                         </p>

//                         <h3 className="mt-1 line-clamp-2 text-sm font-medium text-slate-950 dark:text-white">
//                           {movimiento.descripcion || "Movimiento de caja"}
//                         </h3>

//                         <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
//                           {movimiento.cobradorNombre}
//                         </p>

//                         <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
//                           {getEstadoLabel(movimiento)}
//                         </p>
//                       </div>
//                     </div>

//                     <span
//                       className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${info.badge}`}
//                     >
//                       {info.label}
//                     </span>
//                   </div>

//                   <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/60">
//                     <div className="flex items-center justify-between gap-3">
//                       <span className="text-xs text-slate-500 dark:text-slate-400">
//                         Importe
//                       </span>

//                       <span className={`text-sm font-medium ${info.amount}`}>
//                         {info.sign} {formatMoney(movimiento.importe)}
//                       </span>
//                     </div>
//                   </div>

//                   {movimiento.tipoMovimiento === "cobro" &&
//                   movimiento.movimientoFinancieroId ? (
//                     <div className="mt-3 grid grid-cols-2 gap-2">
//                       <Link
//                         href={`/comprobantes/pagos/${movimiento.movimientoFinancieroId}`}
//                         className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 transition hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-cyan-950/30"
//                       >
//                         <ReceiptText className="h-3.5 w-3.5" />
//                         Ver
//                       </Link>

//                       <Link
//                         href={`/admin/caja-cobradores/corregir-pago/${movimiento.movimientoFinancieroId}`}
//                         className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 text-xs font-medium text-red-700 transition hover:bg-red-100 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300"
//                       >
//                         <FileWarning className="h-3.5 w-3.5" />
//                         Corregir
//                       </Link>
//                     </div>
//                   ) : null}
//                 </article>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </section>
//   );
// }

import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  FileWarning,
  History,
  ReceiptText,
} from "lucide-react";
import { obtenerCajaCobradorResumen } from "@/services/cobro.service";
import type {
  CajaCobradorMovimientoSafe,
  CobradorCajaResumenSafe,
} from "@/types/cobro.types";

type AdminCajaMovimientosRecientesProps = {
  cobradores: CobradorCajaResumenSafe[];
};

type MovimientoConCobrador = CajaCobradorMovimientoSafe & {
  cobradorNombre: string;
};

const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

const innerPanelClass =
  "overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none";

const sectionTitleClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

const sectionSubtitleClass =
  "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

const sectionDescriptionClass =
  "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

const actionLinkClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 text-[11px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-300 dark:shadow-black/10 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300";

const dangerActionLinkClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-red-300 bg-red-50 px-2.5 text-[11px] font-medium text-red-700 shadow-sm shadow-red-950/5 transition hover:border-red-400 hover:bg-red-100 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300 dark:shadow-black/10 dark:hover:border-red-800 dark:hover:bg-red-950/55";

function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function getNombreCobrador(cobrador: CobradorCajaResumenSafe) {
  const apellido = String(cobrador.apellido || "").trim();
  const nombre = String(cobrador.nombre || "").trim();

  const nombreCompleto = `${apellido}, ${nombre}`
    .replace(/^,\s*/, "")
    .replace(/,\s*$/, "")
    .trim();

  return nombreCompleto || cobrador.email || "Cobrador";
}

function getMovimientoLabel(tipoMovimiento: string) {
  if (tipoMovimiento === "cobro") {
    return {
      label: "Cobro",
      icon: ArrowUpRight,
      badge:
        "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300",
      iconBox:
        "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300",
      amount: "text-emerald-700 dark:text-emerald-300",
      sign: "+",
    };
  }

  if (tipoMovimiento === "ajuste_correccion_pago") {
    return {
      label: "Corrección",
      icon: ArrowDownLeft,
      badge:
        "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300",
      iconBox:
        "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300",
      amount: "text-red-700 dark:text-red-300",
      sign: "-",
    };
  }

  if (tipoMovimiento === "ajuste_correccion_pago_post_cierre") {
    return {
      label: "Post-cierre",
      icon: History,
      badge:
        "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300",
      iconBox:
        "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300",
      amount: "text-amber-700 dark:text-amber-300",
      sign: "-",
    };
  }

  return {
    label: "Cierre",
    icon: ArrowDownLeft,
    badge:
      "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300",
    iconBox:
      "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300",
    amount: "text-red-700 dark:text-red-300",
    sign: "-",
  };
}

function getEstadoLabel(movimiento: CajaCobradorMovimientoSafe) {
  if (movimiento.tipoMovimiento === "ajuste_correccion_pago_post_cierre") {
    return "Ajuste de caja cerrada";
  }

  if (movimiento.estadoCaja === "cerrado") {
    return "Caja cerrada";
  }

  return "Caja abierta";
}

export async function AdminCajaMovimientosRecientes({
  cobradores,
}: AdminCajaMovimientosRecientesProps) {
  const movimientosPorCobrador = await Promise.all(
    cobradores.map(async (cobrador) => {
      const caja = await obtenerCajaCobradorResumen(cobrador.cobradorId);
      const cobradorNombre = getNombreCobrador(cobrador);

      return caja.movimientos.map((movimiento) => ({
        ...movimiento,
        cobradorNombre,
      }));
    }),
  );

  const movimientos: MovimientoConCobrador[] = movimientosPorCobrador
    .flat()
    .filter((movimiento) =>
      [
        "cobro",
        "ajuste_correccion_pago",
        "ajuste_correccion_pago_post_cierre",
      ].includes(movimiento.tipoMovimiento),
    )
    .sort(
      (a, b) =>
        new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime(),
    )
    .slice(0, 20);

  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Movimientos recientes</p>

        <h2 className={sectionSubtitleClass}>Cobros y correcciones</h2>

        <p className={`${sectionDescriptionClass} max-w-4xl`}>
          Desde acá el administrador puede entrar al comprobante y corregir un
          pago emitido por error. Si el cobro ya fue cerrado, la corrección
          queda asociada al cierre anterior.
        </p>
      </div>

      {movimientos.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-[12px] leading-5 text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
          Todavía no hay cobros registrados para mostrar.
        </div>
      ) : (
        <>
          <div className={`${innerPanelClass} hidden lg:block`}>
            <div className="grid grid-cols-[140px_126px_minmax(0,1fr)_126px_140px_130px_182px] border-b border-slate-300 bg-slate-100 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.08em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
              <span>Fecha</span>
              <span>Tipo</span>
              <span>Detalle</span>
              <span>Estado</span>
              <span>Cobrador</span>
              <span className="text-right">Importe</span>
              <span className="text-right">Acciones</span>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {movimientos.map((movimiento) => {
                const info = getMovimientoLabel(movimiento.tipoMovimiento);
                const Icon = info.icon;

                return (
                  <div
                    key={movimiento.id}
                    className="grid grid-cols-[140px_126px_minmax(0,1fr)_126px_140px_130px_182px] items-center gap-3 px-3 py-2.5 transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
                  >
                    <p className="truncate text-[12px] text-slate-600 dark:text-slate-400">
                      {formatDate(movimiento.creadoEn)}
                    </p>

                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${info.iconBox}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                      <span
                        className={`inline-flex h-6 items-center rounded-full border px-2 text-[10px] font-semibold leading-none ${info.badge}`}
                      >
                        {info.label}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-slate-950 dark:text-white">
                        {movimiento.descripcion || "Movimiento de caja"}
                      </p>

                      {movimiento.observacion ? (
                        <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
                          {movimiento.observacion}
                        </p>
                      ) : null}
                    </div>

                    <p className="truncate text-[12px] font-medium text-slate-500 dark:text-slate-400">
                      {getEstadoLabel(movimiento)}
                    </p>

                    <p className="truncate text-[12px] font-medium text-slate-700 dark:text-slate-300">
                      {movimiento.cobradorNombre}
                    </p>

                    <p
                      className={`truncate text-right text-[12px] font-semibold ${info.amount}`}
                    >
                      {info.sign} {formatMoney(movimiento.importe)}
                    </p>

                    <div className="flex justify-end gap-2">
                      {movimiento.movimientoFinancieroId &&
                      movimiento.tipoMovimiento === "cobro" ? (
                        <Link
                          href={`/comprobantes/pagos/${movimiento.movimientoFinancieroId}`}
                          className={actionLinkClass}
                        >
                          <ReceiptText className="h-3.5 w-3.5" />
                          Ver
                        </Link>
                      ) : null}

                      {movimiento.tipoMovimiento === "cobro" &&
                      movimiento.movimientoFinancieroId ? (
                        <Link
                          href={`/admin/caja-cobradores/corregir-pago/${movimiento.movimientoFinancieroId}`}
                          className={dangerActionLinkClass}
                        >
                          <FileWarning className="h-3.5 w-3.5" />
                          Corregir
                        </Link>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2.5 lg:hidden">
            {movimientos.map((movimiento) => {
              const info = getMovimientoLabel(movimiento.tipoMovimiento);
              const Icon = info.icon;

              return (
                <article
                  key={movimiento.id}
                  className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2.5 shadow-sm shadow-slate-300/35 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/15 dark:ring-slate-800/80"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-2.5">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${info.iconBox}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                          {formatDate(movimiento.creadoEn)}
                        </p>

                        <h3 className="mt-1 line-clamp-2 text-[13px] font-semibold text-slate-950 dark:text-white">
                          {movimiento.descripcion || "Movimiento de caja"}
                        </h3>

                        <p className="mt-1 truncate text-[11px] text-slate-500 dark:text-slate-400">
                          {movimiento.cobradorNombre}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                          {getEstadoLabel(movimiento)}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[10px] font-semibold leading-none ${info.badge}`}
                    >
                      {info.label}
                    </span>
                  </div>

                  <div className="mt-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950/50">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-slate-500 dark:text-slate-400">
                        Importe
                      </span>

                      <span className={`text-[13px] font-semibold ${info.amount}`}>
                        {info.sign} {formatMoney(movimiento.importe)}
                      </span>
                    </div>
                  </div>

                  {movimiento.tipoMovimiento === "cobro" &&
                  movimiento.movimientoFinancieroId ? (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Link
                        href={`/comprobantes/pagos/${movimiento.movimientoFinancieroId}`}
                        className={actionLinkClass}
                      >
                        <ReceiptText className="h-3.5 w-3.5" />
                        Ver
                      </Link>

                      <Link
                        href={`/admin/caja-cobradores/corregir-pago/${movimiento.movimientoFinancieroId}`}
                        className={dangerActionLinkClass}
                      >
                        <FileWarning className="h-3.5 w-3.5" />
                        Corregir
                      </Link>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
// import Link from "next/link";
// import { Eye } from "lucide-react";
// import { Badge } from "@/components/ui/Badge";
// import { EmptyState } from "@/components/ui/EmptyState";
// import type { AdminCierreCajaSafe } from "@/types/admin-caja.types";

// type AdminCierresCajaTableProps = {
//   cierres: AdminCierreCajaSafe[];
// };

// function formatDate(value: string | null) {
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
//   }).format(value);
// }

// export function AdminCierresCajaTable({
//   cierres,
// }: AdminCierresCajaTableProps) {
//   if (cierres.length === 0) {
//     return (
//       <EmptyState
//         title="Todavía no hay cierres de caja."
//         description="Cuando los cobradores confirmen cierres autorizados, aparecerán en este historial."
//       />
//     );
//   }

//   return (
//     <>
//       <div className="hidden overflow-hidden rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] shadow-[var(--app-shadow-soft)] lg:block">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-left text-sm">
//             <thead className="border-b border-[var(--app-border)] bg-[var(--app-surface-soft)] text-xs uppercase tracking-wide text-[var(--app-muted)]">
//               <tr>
//                 <th className="px-4 py-3 font-semibold">Fecha cierre</th>
//                 <th className="px-4 py-3 font-semibold">Cobrador</th>
//                 <th className="px-4 py-3 font-semibold">Código</th>
//                 <th className="px-4 py-3 font-semibold">Generado por</th>
//                 <th className="px-4 py-3 text-right font-semibold">Importe</th>
//                 <th className="px-4 py-3 text-right font-semibold">Acción</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-[var(--app-border)]">
//               {cierres.map((cierre) => (
//                 <tr
//                   key={cierre.id}
//                   className="transition hover:bg-[var(--app-surface-soft)]"
//                 >
//                   <td className="whitespace-nowrap px-4 py-3 text-[var(--app-muted)]">
//                     {formatDate(cierre.creadoEn)}
//                   </td>

//                   <td className="px-4 py-3 font-semibold text-[var(--app-text-strong)]">
//                     {cierre.cobradorNombre}
//                   </td>

//                   <td className="px-4 py-3">
//                     <Badge variant="info">{cierre.codigo}</Badge>
//                   </td>

//                   <td className="px-4 py-3 text-[var(--app-muted)]">
//                     {cierre.generadoPorAdminNombre}
//                   </td>

//                   <td className="px-4 py-3 text-right font-semibold text-[var(--app-text-strong)]">
//                     {formatMoney(cierre.importe)}
//                   </td>

//                   <td className="px-4 py-3 text-right">
//                     <Link
//                       href={`/admin/caja-cobradores/cierres/${cierre.id}`}
//                       className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-xs font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
//                     >
//                       <Eye className="h-3.5 w-3.5" />
//                       Ver detalle
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="grid gap-2 lg:hidden">
//         {cierres.map((cierre) => (
//           <div
//             key={cierre.id}
//             className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-3 shadow-[var(--app-shadow-soft)]"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="min-w-0">
//                 <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
//                   {formatDate(cierre.creadoEn)}
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-[var(--app-text-strong)]">
//                   {cierre.cobradorNombre}
//                 </p>
//               </div>

//               <Badge variant="info">{cierre.codigo}</Badge>
//             </div>

//             <div className="mt-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] p-3">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--app-muted)]">
//                 Importe cerrado
//               </p>

//               <p className="mt-1 text-lg font-semibold text-[var(--app-text-strong)]">
//                 {formatMoney(cierre.importe)}
//               </p>
//             </div>

//             <p className="mt-2 text-xs text-[var(--app-muted)]">
//               Código generado por {cierre.generadoPorAdminNombre}
//             </p>

//             <Link
//               href={`/admin/caja-cobradores/cierres/${cierre.id}`}
//               className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-soft)] px-3 text-xs font-semibold text-[var(--app-text)] transition hover:bg-[var(--app-primary-soft)] active:scale-[0.99]"
//             >
//               <Eye className="h-3.5 w-3.5" />
//               Ver detalle
//             </Link>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

import Link from "next/link";
import {
  CalendarClock,
  Eye,
  KeyRound,
  UserRound,
  WalletCards,
} from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import type { AdminCierreCajaSafe } from "@/types/admin-caja.types";

type AdminCierresCajaTableProps = {
  cierres: AdminCierreCajaSafe[];
};

const innerPanelClass =
  "overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none";

const actionLinkClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-blue-600 bg-blue-600 px-2.5 text-[11px] font-medium text-white shadow-sm shadow-blue-950/10 transition hover:border-blue-700 hover:bg-blue-700 active:scale-[0.99] dark:border-blue-500 dark:bg-blue-500 dark:text-white dark:hover:border-blue-600 dark:hover:bg-blue-600";

function formatDate(value: string | null) {
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

function CodigoBadge({ codigo }: { codigo: string }) {
  return (
    <span className="inline-flex h-6 w-fit items-center gap-1 rounded-full border border-blue-300 bg-blue-50 px-2 font-mono text-[10px] font-semibold leading-none tracking-[0.08em] text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/35 dark:text-blue-300">
      <KeyRound className="h-3 w-3" />
      {codigo}
    </span>
  );
}

function MobileCierreCard({ cierre }: { cierre: AdminCierreCajaSafe }) {
  return (
    <article className="rounded-xl border border-slate-300 bg-white/95 px-3 py-2.5 shadow-sm shadow-slate-300/35 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/15 dark:ring-slate-800/80">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
            <CalendarClock className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{formatDate(cierre.creadoEn)}</span>
          </div>

          <h3 className="mt-1 truncate text-[13px] font-semibold text-slate-950 dark:text-white">
            {cierre.cobradorNombre}
          </h3>

          <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
            Generado por {cierre.generadoPorAdminNombre}
          </p>
        </div>

        <CodigoBadge codigo={cierre.codigo} />
      </div>

      <div className="mt-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950/50">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[12px] text-slate-500 dark:text-slate-400">
            <WalletCards className="h-3.5 w-3.5" />
            Importe cerrado
          </span>

          <span className="text-[13px] font-semibold text-slate-950 dark:text-white">
            {formatMoney(cierre.importe)}
          </span>
        </div>
      </div>

      <Link
        href={`/admin/caja-cobradores/cierres/${cierre.id}`}
        className={`${actionLinkClass} mt-2 w-full`}
      >
        <Eye className="h-3.5 w-3.5 text-white" />
        <span className="text-[11px] leading-none text-white">Ver detalle</span>
      </Link>
    </article>
  );
}

export function AdminCierresCajaTable({
  cierres,
}: AdminCierresCajaTableProps) {
  if (cierres.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/50">
        <EmptyState
          title="Todavía no hay cierres de caja."
          description="Cuando los cobradores confirmen cierres autorizados, aparecerán en este historial."
        />
      </div>
    );
  }

  return (
    <>
      <div className={`${innerPanelClass} hidden lg:block`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] table-fixed text-left text-[12px] xl:min-w-0">
            <colgroup>
              <col className="w-[17%]" />
              <col className="w-[22%]" />
              <col className="w-[13%]" />
              <col className="w-[20%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
            </colgroup>

            <thead className="border-b border-slate-300 bg-slate-100 text-[10px] uppercase tracking-[0.08em] text-slate-500 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-400">
              <tr>
                <th className="px-3 py-2.5 font-medium">Fecha cierre</th>
                <th className="px-3 py-2.5 font-medium">Cobrador</th>
                <th className="px-3 py-2.5 font-medium">Código</th>
                <th className="px-3 py-2.5 font-medium">Generado por</th>
                <th className="px-3 py-2.5 text-right font-medium">Importe</th>
                <th className="px-3 py-2.5 text-right font-medium">Acción</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {cierres.map((cierre) => (
                <tr
                  key={cierre.id}
                  className="transition hover:bg-blue-50/55 dark:hover:bg-blue-950/12"
                >
                  <td className="px-3 py-2.5">
                    <div className="flex min-w-0 items-center gap-2">
                      <CalendarClock className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                      <span className="truncate text-[12px] text-slate-600 dark:text-slate-400">
                        {formatDate(cierre.creadoEn)}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
                        <UserRound className="h-3.5 w-3.5" />
                      </span>

                      <span className="truncate text-[12px] font-semibold text-slate-950 dark:text-white">
                        {cierre.cobradorNombre}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-2.5">
                    <CodigoBadge codigo={cierre.codigo} />
                  </td>

                  <td className="px-3 py-2.5">
                    <p className="truncate text-[12px] text-slate-600 dark:text-slate-300">
                      {cierre.generadoPorAdminNombre}
                    </p>
                  </td>

                  <td className="px-3 py-2.5 text-right">
                    <p className="truncate text-[12px] font-semibold text-slate-950 dark:text-white">
                      {formatMoney(cierre.importe)}
                    </p>
                  </td>

                  <td className="px-3 py-2.5 text-right">
                    <Link
                      href={`/admin/caja-cobradores/cierres/${cierre.id}`}
                      className={actionLinkClass}
                    >
                      <Eye className="h-3.5 w-3.5 text-white" />
                      <span className="text-[11px] leading-none text-white">
                        Ver detalle
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-300 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
          <span>
            Mostrando {cierres.length}{" "}
            {cierres.length === 1 ? "cierre" : "cierres"}
          </span>

          <span>Vista administrativa</span>
        </div>
      </div>

      <div className="grid gap-2.5 lg:hidden">
        {cierres.map((cierre) => (
          <MobileCierreCard key={cierre.id} cierre={cierre} />
        ))}
      </div>
    </>
  );
}
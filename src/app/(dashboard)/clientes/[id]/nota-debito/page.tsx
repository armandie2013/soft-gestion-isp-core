// // src/app/(dashboard)/clientes/[id]/nota-debito/page.tsx

// import { notFound } from "next/navigation";
// import {
//   CheckCircle2,
//   FileText,
//   PlusCircle,
//   ReceiptText,
//   ShieldAlert,
//   UserRound,
//   WalletCards,
// } from "lucide-react";
// import { NotaFinancieraForm } from "@/components/forms/NotaFinancieraForm";
// import { obtenerClientePorId } from "@/services/cliente.service";
// import { obtenerFacturasCliente } from "@/services/movimiento-financiero.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// type PageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Nota de débito",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof PlusCircle;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// const toneClasses = {
//   cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
//   emerald:
//     "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
//   amber:
//     "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
//   red: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
//   violet:
//     "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function formatCompactMoney(value: number) {
//   const amount = Number(value || 0);
//   const abs = Math.abs(amount);

//   if (abs >= 1_000_000) {
//     return `$ ${(abs / 1_000_000).toLocaleString("es-AR", {
//       maximumFractionDigits: 1,
//     })} M`;
//   }

//   const integerPart = Math.round(abs)
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${integerPart}`;
// }

// function StatCard({
//   title,
//   shortTitle,
//   value,
//   description,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <div className="flex h-full min-h-[78px] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:min-h-[122px] sm:rounded-[1.35rem] sm:p-3.5">
//       <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
//         <div
//           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl ${toneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 sm:text-[10px] sm:tracking-[0.15em]">
//             <span className="sm:hidden">{shortTitle || title}</span>
//             <span className="hidden sm:inline">{title}</span>
//           </p>

//           <p className="mt-0.5 truncate text-[15px] font-medium leading-none tracking-tight text-slate-950 dark:text-white sm:mt-1 sm:text-xl">
//             {value}
//           </p>

//           <p className="mt-1 hidden text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function estadoClienteLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   if (estado === "suspendido") return "Suspendido";
//   return "Baja";
// }

// export default async function NotaDebitoPage({ params }: PageProps) {
//   const [cliente, facturas] = await Promise.all([
//     obtenerClientePorId(params.id),
//     obtenerFacturasCliente(params.id),
//   ]);

//   if (!cliente) {
//     notFound();
//   }

//   const nombreCompleto =
//     `${cliente.apellido || ""}, ${cliente.nombre || ""}`.trim() ||
//     "Cliente sin nombre";

//   const totalFacturas = facturas.length;
//   const facturasConSaldo = facturas.filter(
//     (factura) => factura.saldoFactura > 0,
//   ).length;
//   const saldoFacturas = facturas.reduce(
//     (acc, factura) => acc + Number(factura.saldoFactura || 0),
//     0,
//   );

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Tipo"
//           value="Débito"
//           description="Suma saldo a una factura emitida."
//           icon={PlusCircle}
//           tone="amber"
//         />

//         <StatCard
//           title="Cliente"
//           shortTitle="Cliente"
//           value={`N° ${cliente.numeroCliente}`}
//           description="Número interno del cliente."
//           icon={UserRound}
//           tone="cyan"
//         />

//         <StatCard
//           title="Facturas"
//           shortTitle="Fact."
//           value={String(totalFacturas)}
//           description="Facturas disponibles para asociar."
//           icon={ReceiptText}
//           tone={totalFacturas > 0 ? "emerald" : "red"}
//         />

//         <StatCard
//           title="Saldo"
//           value={formatCompactMoney(saldoFacturas)}
//           description="Saldo total de facturas."
//           icon={WalletCards}
//           tone={saldoFacturas > 0 ? "red" : "emerald"}
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Con saldo"
//             shortTitle="Pend."
//             value={String(facturasConSaldo)}
//             description="Facturas con saldo pendiente."
//             icon={FileText}
//             tone={facturasConSaldo > 0 ? "amber" : "emerald"}
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div>
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
//                 Estado de cuenta
//               </p>

//               <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                 Crear nota de débito
//               </h1>

//               <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                 {nombreCompleto} · DNI {cliente.dni || "-"} · Cliente N°{" "}
//                 {cliente.numeroCliente}
//               </p>
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
//             <div className="mb-3 flex items-start gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
//                 <PlusCircle className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
//                   Datos de la nota
//                 </p>

//                 <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
//                   Cargo adicional sobre factura
//                 </h2>

//                 <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   La nota de débito debe asociarse a una factura emitida y aumenta
//                   el saldo de esa factura.
//                 </p>
//               </div>
//             </div>

//             <NotaFinancieraForm
//               clienteId={cliente.id}
//               tipo="debito"
//               facturas={facturas}
//             />
//           </div>
//         </DashboardMain>

//         <DashboardAside>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Resumen
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Información del cliente
//               </h2>
//             </div>

//             <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Cliente
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   N° {cliente.numeroCliente}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Estado
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                     cliente.estado === "activo"
//                       ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                       : cliente.estado === "suspendido"
//                         ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
//                         : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                   }`}
//                 >
//                   {estadoClienteLabel(cliente.estado)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Facturas emitidas
//                 </span>

//                 <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
//                   {totalFacturas}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Facturas con saldo
//                 </span>

//                 <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
//                   {facturasConSaldo}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="text-xs text-slate-700 dark:text-slate-300">
//                   Saldo facturas
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
//                     saldoFacturas > 0
//                       ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                       : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                   }`}
//                 >
//                   {formatMoney(saldoFacturas)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-amber-200 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 xl:block">
//             <div className="flex gap-2">
//               <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

//               <div>
//                 <p className="font-medium">Importante</p>

//                 <p className="mt-1">
//                   La nota de débito aumenta el saldo de la factura seleccionada.
//                   Usala para cargos adicionales, diferencias o ajustes a favor
//                   del proveedor.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/clientes/[id]/nota-debito/page.tsx

import { notFound } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  PlusCircle,
  ReceiptText,
  WalletCards,
} from "lucide-react";
import { NotaFinancieraForm } from "@/components/forms/NotaFinancieraForm";
import { obtenerClientePorId } from "@/services/cliente.service";
import {
  obtenerEstadoCuentaCliente,
  obtenerFacturasCliente,
} from "@/services/movimiento-financiero.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

type PageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Nota de débito",
};

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: typeof ReceiptText;
  tone: "cyan" | "emerald" | "amber" | "red" | "violet";
};

const cardBase =
  "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

const innerCardBase =
  "overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none";

const toneClasses = {
  cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
  emerald:
    "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950",
  amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
  red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
  violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
};

function formatMoney(value: number) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function getNombreCompleto(cliente: {
  apellido?: string | null;
  nombre?: string | null;
}) {
  const apellido = String(cliente.apellido || "").trim();
  const nombre = String(cliente.nombre || "").trim();

  const completo = `${apellido}, ${nombre}`
    .replace(/^,\s*/, "")
    .replace(/,\s*$/, "")
    .trim();

  return completo || "Cliente sin nombre";
}

function estadoCuentaLabel(saldo: number) {
  if (saldo > 0) return "Pendiente";
  if (saldo < 0) return "A favor";
  return "Al día";
}

function estadoCuentaTone(saldo: number): "emerald" | "amber" | "red" {
  if (saldo > 0) return "red";
  if (saldo < 0) return "amber";
  return "emerald";
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <div className="flex h-full min-h-[108px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ${toneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p
            className={`mt-1 truncate text-xl font-semibold tracking-tight ${
              tone === "red"
                ? "text-red-700 dark:text-red-300"
                : "text-slate-950 dark:text-white"
            }`}
            title={value}
          >
            {value}
          </p>

          <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileHeader({
  cliente,
  nombreCompleto,
  saldo,
}: {
  cliente: any;
  nombreCompleto: string;
  saldo: number;
}) {
  return (
    <section className={`${cardBase} p-3`}>
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 ring-1 ring-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-900">
          <PlusCircle className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            Nota de débito
          </p>

          <h1 className="mt-0.5 truncate text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {nombreCompleto}
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
            Cliente N° {cliente.numeroCliente} · DNI {cliente.dni || "-"}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[10px] font-medium text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300">
              Aumenta deuda
            </span>

            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                saldo > 0
                  ? "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
                  : saldo < 0
                    ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300"
                    : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300"
              }`}
            >
              Saldo {formatMoney(saldo)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumenAside({
  cliente,
  saldo,
  cantidadFacturas,
  facturasConSaldo,
}: {
  cliente: any;
  saldo: number;
  cantidadFacturas: number;
  facturasConSaldo: number;
}) {
  return (
    <div className={`${cardBase} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Resumen
          </p>

          <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            Información de cuenta
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
          <WalletCards className="h-4 w-4" />
        </div>
      </div>

      <div className={innerCardBase}>
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="text-xs text-slate-700 dark:text-slate-300">
            Cliente
          </span>

          <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
            N° {cliente.numeroCliente}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="text-xs text-slate-700 dark:text-slate-300">
            Plan
          </span>

          <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
            {cliente.plan?.nombre || "Sin plan"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="text-xs text-slate-700 dark:text-slate-300">
            Facturas emitidas
          </span>

          <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
            {cantidadFacturas}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="text-xs text-slate-700 dark:text-slate-300">
            Con saldo
          </span>

          <span className="text-xs font-medium text-red-700 dark:text-red-300">
            {facturasConSaldo}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 px-3 py-2.5">
          <span className="text-xs text-slate-700 dark:text-slate-300">
            Saldo actual
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              saldo > 0
                ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                : saldo < 0
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
            }`}
          >
            {formatMoney(saldo)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function NotaDebitoPage({ params }: PageProps) {
  const [cliente, facturas, estadoCuenta] = await Promise.all([
    obtenerClientePorId(params.id),
    obtenerFacturasCliente(params.id),
    obtenerEstadoCuentaCliente(params.id),
  ]);

  if (!cliente || !estadoCuenta) {
    notFound();
  }

  const nombreCompleto = getNombreCompleto(cliente);
  const cantidadFacturas = facturas.length;
  const facturasConSaldo = facturas.filter(
    (factura) => factura.saldoFactura > 0,
  ).length;

  return (
    <PageShell maxWidth="wide">
      <div className="space-y-3 lg:hidden">
        <MobileHeader
          cliente={cliente}
          nombreCompleto={nombreCompleto}
          saldo={estadoCuenta.saldo}
        />

        <NotaFinancieraForm
          clienteId={cliente.id}
          tipo="debito"
          facturas={facturas}
          clienteNombre={nombreCompleto}
        />
      </div>

      <div className="hidden lg:block">
        <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Movimiento"
            value="Débito"
            description="Aumenta el saldo deudor."
            icon={PlusCircle}
            tone="amber"
          />

          <StatCard
            title="Saldo actual"
            value={formatMoney(estadoCuenta.saldo)}
            description="Antes de registrar."
            icon={WalletCards}
            tone={estadoCuentaTone(estadoCuenta.saldo)}
          />

          <StatCard
            title="Facturas"
            value={String(cantidadFacturas)}
            description="Emitidas al cliente."
            icon={ReceiptText}
            tone="cyan"
          />

          <StatCard
            title="Con saldo"
            value={String(facturasConSaldo)}
            description="Facturas pendientes."
            icon={AlertTriangle}
            tone={facturasConSaldo > 0 ? "red" : "emerald"}
          />

          <StatCard
            title="Estado"
            value={estadoCuentaLabel(estadoCuenta.saldo)}
            description="Estado general."
            icon={CheckCircle2}
            tone={estadoCuentaTone(estadoCuenta.saldo)}
          />
        </div>

        <div className="mt-5">
          <DashboardGrid>
            <DashboardMain>
              <div className={`${cardBase} p-3.5`}>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                    Nota de débito
                  </p>

                  <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
                    Registrar cargo adicional
                  </h1>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
                    {nombreCompleto} · DNI {cliente.dni || "-"} · Cliente N°{" "}
                    {cliente.numeroCliente}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <NotaFinancieraForm
                  clienteId={cliente.id}
                  tipo="debito"
                  facturas={facturas}
                  clienteNombre={nombreCompleto}
                  variant="desktop"
                />
              </div>
            </DashboardMain>

            <DashboardAside>
              <ResumenAside
                cliente={cliente}
                saldo={estadoCuenta.saldo}
                cantidadFacturas={cantidadFacturas}
                facturasConSaldo={facturasConSaldo}
              />

              <div className="rounded-[1.45rem] border border-amber-300 bg-amber-50 p-3.5 text-xs leading-5 text-amber-800 shadow-sm shadow-amber-950/5 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 dark:shadow-none">
                <p className="font-medium">Importante</p>

                <p className="mt-1">
                  La nota de débito suma deuda a la factura seleccionada. Usala
                  para cargos adicionales, reconexiones, diferencias o ajustes
                  que aumenten el saldo del cliente.
                </p>
              </div>
            </DashboardAside>
          </DashboardGrid>
        </div>
      </div>
    </PageShell>
  );
}
// // src/app/(dashboard)/clientes/[id]/page.tsx

// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   CheckCircle2,
//   FileText,
//   IdCard,
//   Mail,
//   MapPin,
//   Pencil,
//   Phone,
//   ReceiptText,
//   UserRound,
//   Wifi,
// } from "lucide-react";
// import { obtenerClientePorId } from "@/services/cliente.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// type VerClientePageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Ver cliente",
// };

// type StatCardProps = {
//   title: string;
//   shortTitle?: string;
//   value: string;
//   description: string;
//   icon: typeof UserRound;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// type InfoRowProps = {
//   label: string;
//   value?: string | number | null;
//   icon?: typeof UserRound;
//   accent?: boolean;
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

// function estadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   if (estado === "suspendido") return "Suspendido";
//   return "Baja";
// }

// function estadoTone(estado: string): "emerald" | "amber" | "red" {
//   if (estado === "activo") return "emerald";
//   if (estado === "suspendido") return "amber";
//   return "red";
// }

// function estadoPillClass(estado: string) {
//   if (estado === "activo") {
//     return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   if (estado === "suspendido") {
//     return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300";
//   }

//   return "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300";
// }

// function InfoRow({ label, value, icon: Icon, accent }: InfoRowProps) {
//   return (
//     <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800">
//       <span className="inline-flex min-w-0 items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//         {Icon ? (
//           <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />
//         ) : null}
//         <span className="truncate">{label}</span>
//       </span>

//       <span
//         className={`truncate text-right text-[11px] ${
//           accent
//             ? "font-medium text-cyan-700 dark:text-cyan-300"
//             : "text-slate-500 dark:text-slate-400"
//         }`}
//       >
//         {value || "-"}
//       </span>
//     </div>
//   );
// }

// export default async function VerClientePage({ params }: VerClientePageProps) {
//   const cliente = await obtenerClientePorId(params.id);

//   if (!cliente) {
//     notFound();
//   }

//   const nombreCompleto =
//     `${cliente.apellido || ""}, ${cliente.nombre || ""}`.trim() ||
//     "Cliente sin nombre";

//   return (
//     <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
//       <div className="grid grid-cols-4 items-stretch gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-5">
//         <StatCard
//           title="Cliente"
//           shortTitle="Cliente"
//           value={`N° ${cliente.numeroCliente}`}
//           description="Número interno del cliente."
//           icon={FileText}
//           tone="cyan"
//         />

//         <StatCard
//           title="Estado"
//           value={estadoLabel(cliente.estado)}
//           description="Estado actual del servicio."
//           icon={CheckCircle2}
//           tone={estadoTone(cliente.estado)}
//         />

//         <StatCard
//           title="Plan"
//           value={cliente.plan?.nombre || "Sin plan"}
//           description="Plan actualmente contratado."
//           icon={Wifi}
//           tone={cliente.plan ? "violet" : "red"}
//         />

//         <StatCard
//           title="DNI"
//           value={cliente.dni || "-"}
//           description="Documento del titular."
//           icon={IdCard}
//           tone="amber"
//         />

//         <div className="hidden xl:block">
//           <StatCard
//             title="Localidad"
//             value={cliente.localidad || "-"}
//             description="Ubicación principal del cliente."
//             icon={MapPin}
//             tone="cyan"
//           />
//         </div>
//       </div>

//       <DashboardGrid>
//         <DashboardMain>
//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
//             <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//               <div>
//                 <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Clientes
//                 </p>

//                 <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                   Ver cliente
//                 </h1>

//                 <p className="mt-1 hidden max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400 sm:block">
//                   Ficha general del cliente, datos de contacto, domicilio y plan
//                   contratado.
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
//                 <Link
//                   href={`/clientes/${cliente.id}/estado-cuenta`}
//                   className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                 >
//                   <ReceiptText className="h-3.5 w-3.5" />
//                   Cuenta
//                 </Link>

//                 <Link
//                   href={`/clientes/${cliente.id}/editar`}
//                   className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 text-[11px] font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//                 >
//                   <Pencil className="h-3.5 w-3.5" />
//                   Editar
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-3.5">
//             <div className="mb-3 flex items-start gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                 <UserRound className="h-4 w-4" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                   Ficha del cliente
//                 </p>

//                 <h2 className="mt-0.5 truncate text-sm font-medium text-slate-950 dark:text-white">
//                   {nombreCompleto}
//                 </h2>

//                 <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                   Cliente N° {cliente.numeroCliente} · DNI {cliente.dni || "-"}
//                 </p>
//               </div>
//             </div>

//             <div className="grid gap-3 xl:grid-cols-2">
//               <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
//                 <div className="border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                   <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                     Datos personales
//                   </p>
//                 </div>

//                 <InfoRow
//                   label="Nombre completo"
//                   value={nombreCompleto}
//                   icon={UserRound}
//                   accent
//                 />

//                 <InfoRow label="DNI" value={cliente.dni} icon={IdCard} />

//                 <InfoRow
//                   label="Teléfono"
//                   value={cliente.telefono}
//                   icon={Phone}
//                 />

//                 <InfoRow label="Email" value={cliente.email || "-"} icon={Mail} />
//               </div>

//               <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
//                 <div className="border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                   <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                     Ubicación
//                   </p>
//                 </div>

//                 <InfoRow
//                   label="Dirección"
//                   value={cliente.direccion}
//                   icon={MapPin}
//                   accent
//                 />

//                 <InfoRow
//                   label="Localidad"
//                   value={cliente.localidad}
//                   icon={MapPin}
//                 />

//                 <InfoRow
//                   label="Provincia"
//                   value={cliente.provincia}
//                   icon={MapPin}
//                 />
//               </div>

//               <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50 xl:col-span-2">
//                 <div className="border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                   <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                     Servicio contratado
//                   </p>
//                 </div>

//                 <div className="grid gap-0 md:grid-cols-2">
//                   <InfoRow
//                     label="Plan"
//                     value={cliente.plan?.nombre || "Sin plan asignado"}
//                     icon={Wifi}
//                     accent
//                   />

//                   <InfoRow
//                     label="Tipo"
//                     value={cliente.plan?.tipo || "-"}
//                     icon={Wifi}
//                   />

//                   <InfoRow
//                     label="Importe"
//                     value={cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
//                     icon={FileText}
//                     accent
//                   />

//                   <InfoRow
//                     label="Estado"
//                     value={estadoLabel(cliente.estado)}
//                     icon={CheckCircle2}
//                   />
//                 </div>

//                 <div className="border-t border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                   <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                     Detalle del plan
//                   </p>

//                   <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                     {cliente.plan?.detalle || "Sin detalle disponible."}
//                   </p>
//                 </div>
//               </div>
//             </div>
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
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <FileText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Número
//                 </span>

//                 <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
//                   {cliente.numeroCliente}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <CheckCircle2 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Estado
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${estadoPillClass(
//                     cliente.estado,
//                   )}`}
//                 >
//                   {estadoLabel(cliente.estado)}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Plan
//                 </span>

//                 <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//                   {cliente.plan?.nombre || "Sin plan"}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <ReceiptText className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Importe
//                 </span>

//                 <span className="text-right text-[11px] font-medium text-cyan-700 dark:text-cyan-300">
//                   {cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <Phone className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Teléfono
//                 </span>

//                 <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//                   {cliente.telefono || "-"}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-3 px-3 py-2.5">
//                 <span className="inline-flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//                   <MapPin className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Ubicación
//                 </span>

//                 <span className="truncate text-right text-[11px] text-slate-500 dark:text-slate-400">
//                   {cliente.localidad || "-"}, {cliente.provincia || "-"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
//             <div className="mb-3">
//               <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                 Acciones
//               </p>

//               <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//                 Gestión del cliente
//               </h2>
//             </div>

//             <div className="grid gap-2">
//               <Link
//                 href={`/clientes/${cliente.id}/estado-cuenta`}
//                 className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 <span className="flex min-w-0 items-center gap-2.5">
//                   <ReceiptText className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
//                   Estado de cuenta
//                 </span>
//               </Link>

//               <Link
//                 href={`/clientes/${cliente.id}/editar`}
//                 className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//               >
//                 <span className="flex min-w-0 items-center gap-2.5">
//                   <Pencil className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
//                   Editar cliente
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/clientes/[id]/page.tsx

// import Link from "next/link";
// import { notFound } from "next/navigation";
// import {
//   ArrowRight,
//   CheckCircle2,
//   FileText,
//   IdCard,
//   Mail,
//   MapPin,
//   Pencil,
//   Phone,
//   ReceiptText,
//   UserRound,
//   Wifi,
// } from "lucide-react";
// import { obtenerClientePorId } from "@/services/cliente.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// type VerClientePageProps = {
//   params: {
//     id: string;
//   };
// };

// export const metadata = {
//   title: "Ver cliente",
// };

// type StatCardProps = {
//   title: string;
//   value: string;
//   description: string;
//   icon: typeof UserRound;
//   tone: "cyan" | "emerald" | "amber" | "red" | "violet";
// };

// type InfoRowProps = {
//   label: string;
//   value?: string | number | null;
//   icon?: typeof UserRound;
//   accent?: boolean;
// };

// const cardBase =
//   "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

// const innerCardBase =
//   "overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none";

// const toneClasses = {
//   cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
//   emerald:
//     "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950",
//   amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
//   red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
//   violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
// };

// function formatMoney(value: number) {
//   const amount = Number(value || 0);
//   const [integerPart, decimalPart] = amount.toFixed(2).split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//   return `$ ${formattedInteger},${decimalPart}`;
// }

// function estadoLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   if (estado === "suspendido") return "Suspendido";
//   return "Baja";
// }

// function estadoTone(estado: string): "emerald" | "amber" | "red" {
//   if (estado === "activo") return "emerald";
//   if (estado === "suspendido") return "amber";
//   return "red";
// }

// function estadoPillClass(estado: string) {
//   if (estado === "activo") {
//     return "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   if (estado === "suspendido") {
//     return "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
//   }

//   return "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
// }

// function getNombreCompleto(cliente: {
//   apellido?: string | null;
//   nombre?: string | null;
// }) {
//   const apellido = String(cliente.apellido || "").trim();
//   const nombre = String(cliente.nombre || "").trim();

//   const completo = `${apellido}, ${nombre}`
//     .replace(/^,\s*/, "")
//     .replace(/,\s*$/, "")
//     .trim();

//   return completo || "Cliente sin nombre";
// }

// function StatCard({
//   title,
//   value,
//   description,
//   icon: Icon,
//   tone,
// }: StatCardProps) {
//   return (
//     <div className="flex h-full min-h-[108px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
//       <div className="flex items-start gap-3">
//         <div
//           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ${toneClasses[tone]}`}
//         >
//           <Icon className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//             {title}
//           </p>

//           <p
//             className={`mt-1 truncate text-xl font-semibold tracking-tight ${
//               tone === "red"
//                 ? "text-red-700 dark:text-red-300"
//                 : "text-slate-950 dark:text-white"
//             }`}
//           >
//             {value}
//           </p>

//           <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({ label, value, icon: Icon, accent }: InfoRowProps) {
//   return (
//     <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800">
//       <span className="inline-flex min-w-0 items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
//         {Icon ? (
//           <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />
//         ) : null}

//         <span className="truncate">{label}</span>
//       </span>

//       <span
//         className={`truncate text-right text-[11px] ${
//           accent
//             ? "font-medium text-cyan-700 dark:text-cyan-300"
//             : "text-slate-500 dark:text-slate-400"
//         }`}
//       >
//         {value || "-"}
//       </span>
//     </div>
//   );
// }

// function MobileHeader({
//   cliente,
//   nombreCompleto,
// }: {
//   cliente: any;
//   nombreCompleto: string;
// }) {
//   return (
//     <section className={`${cardBase} p-3`}>
//       <div className="flex items-start gap-3">
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:ring-cyan-900">
//           <UserRound className="h-5 w-5" />
//         </div>

//         <div className="min-w-0 flex-1">
//           <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//             Cliente
//           </p>

//           <h1 className="mt-0.5 truncate text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
//             {nombreCompleto}
//           </h1>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             N° {cliente.numeroCliente} · DNI {cliente.dni || "-"}
//           </p>

//           <div className="mt-2 flex flex-wrap gap-2">
//             <span
//               className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${estadoPillClass(
//                 cliente.estado,
//               )}`}
//             >
//               {estadoLabel(cliente.estado)}
//             </span>

//             <span
//               className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${
//                 cliente.plan
//                   ? "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-300"
//                   : "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300"
//               }`}
//             >
//               {cliente.plan?.nombre || "Sin plan"}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="mt-3 grid grid-cols-2 gap-2">
//         <Link
//           href={`/clientes/${cliente.id}/estado-cuenta`}
//           className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//         >
//           <ReceiptText className="h-3.5 w-3.5" />
//           Cuenta
//         </Link>

//         <Link
//           href={`/clientes/${cliente.id}/editar`}
//           className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-3 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//         >
//           <Pencil className="h-3.5 w-3.5" />
//           Editar
//         </Link>
//       </div>
//     </section>
//   );
// }

// function FichaClienteCard({
//   cliente,
//   nombreCompleto,
// }: {
//   cliente: any;
//   nombreCompleto: string;
// }) {
//   return (
//     <div className={`${cardBase} p-3 sm:p-3.5`}>
//       <div className="mb-3 flex items-start gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//           <UserRound className="h-4 w-4" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Ficha del cliente
//           </p>

//           <h2 className="mt-0.5 truncate text-sm font-medium text-slate-950 dark:text-white">
//             {nombreCompleto}
//           </h2>

//           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//             Cliente N° {cliente.numeroCliente} · DNI {cliente.dni || "-"}
//           </p>
//         </div>
//       </div>

//       <div className="grid gap-3 xl:grid-cols-2">
//         <div className={innerCardBase}>
//           <div className="border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//             <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//               Datos personales
//             </p>
//           </div>

//           <InfoRow
//             label="Nombre completo"
//             value={nombreCompleto}
//             icon={UserRound}
//             accent
//           />

//           <InfoRow label="DNI" value={cliente.dni} icon={IdCard} />

//           <InfoRow label="Teléfono" value={cliente.telefono} icon={Phone} />

//           <InfoRow label="Email" value={cliente.email || "-"} icon={Mail} />
//         </div>

//         <div className={innerCardBase}>
//           <div className="border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//             <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//               Ubicación
//             </p>
//           </div>

//           <InfoRow
//             label="Dirección"
//             value={cliente.direccion}
//             icon={MapPin}
//             accent
//           />

//           <InfoRow label="Localidad" value={cliente.localidad} icon={MapPin} />

//           <InfoRow label="Provincia" value={cliente.provincia} icon={MapPin} />
//         </div>

//         <div className={`${innerCardBase} xl:col-span-2`}>
//           <div className="border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
//             <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//               Servicio contratado
//             </p>
//           </div>

//           <div className="grid gap-0 md:grid-cols-2">
//             <InfoRow
//               label="Plan"
//               value={cliente.plan?.nombre || "Sin plan asignado"}
//               icon={Wifi}
//               accent
//             />

//             <InfoRow label="Tipo" value={cliente.plan?.tipo || "-"} icon={Wifi} />

//             <InfoRow
//               label="Importe"
//               value={cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
//               icon={FileText}
//               accent
//             />

//             <InfoRow
//               label="Estado"
//               value={estadoLabel(cliente.estado)}
//               icon={CheckCircle2}
//             />
//           </div>

//           <div className="border-t border-slate-200 px-3 py-2.5 dark:border-slate-800">
//             <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//               Detalle del plan
//             </p>

//             <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//               {cliente.plan?.detalle || "Sin detalle disponible."}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ResumenCliente({ cliente }: { cliente: any }) {
//   return (
//     <div className={`${cardBase} p-3.5`}>
//       <div className="mb-3 flex items-start justify-between gap-3">
//         <div>
//           <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//             Resumen
//           </p>

//           <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//             Información del cliente
//           </h2>
//         </div>

//         <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//           <UserRound className="h-4 w-4" />
//         </div>
//       </div>

//       <div className={innerCardBase}>
//         <InfoRow
//           label="Número"
//           value={cliente.numeroCliente}
//           icon={FileText}
//           accent
//         />

//         <InfoRow
//           label="Estado"
//           value={estadoLabel(cliente.estado)}
//           icon={CheckCircle2}
//         />

//         <InfoRow
//           label="Plan"
//           value={cliente.plan?.nombre || "Sin plan"}
//           icon={Wifi}
//         />

//         <InfoRow
//           label="Importe"
//           value={cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
//           icon={ReceiptText}
//           accent
//         />

//         <InfoRow label="Teléfono" value={cliente.telefono || "-"} icon={Phone} />

//         <InfoRow
//           label="Ubicación"
//           value={`${cliente.localidad || "-"}, ${cliente.provincia || "-"}`}
//           icon={MapPin}
//         />
//       </div>
//     </div>
//   );
// }

// function DesktopActions({ cliente }: { cliente: any }) {
//   return (
//     <div className={`${cardBase} p-3.5`}>
//       <div className="mb-3">
//         <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//           Acciones
//         </p>

//         <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//           Gestión del cliente
//         </h2>
//       </div>

//       <div className="grid gap-2">
//         <Link
//           href={`/clientes/${cliente.id}/estado-cuenta`}
//           className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//         >
//           <span className="flex min-w-0 items-center gap-2.5">
//             <ReceiptText className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
//             Estado de cuenta
//           </span>

//           <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//         </Link>

//         <Link
//           href={`/clientes/${cliente.id}/editar`}
//           className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//         >
//           <span className="flex min-w-0 items-center gap-2.5">
//             <Pencil className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
//             Editar cliente
//           </span>

//           <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default async function VerClientePage({ params }: VerClientePageProps) {
//   const cliente = await obtenerClientePorId(params.id);

//   if (!cliente) {
//     notFound();
//   }

//   const nombreCompleto = getNombreCompleto(cliente);

//   return (
//     <PageShell maxWidth="wide">
//       <div className="space-y-3 lg:hidden">
//         <MobileHeader cliente={cliente} nombreCompleto={nombreCompleto} />

//         <FichaClienteCard cliente={cliente} nombreCompleto={nombreCompleto} />
//       </div>

//       <div className="hidden lg:block">
//         <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
//           <StatCard
//             title="Cliente"
//             value={`N° ${cliente.numeroCliente}`}
//             description="Número interno."
//             icon={FileText}
//             tone="cyan"
//           />

//           <StatCard
//             title="Estado"
//             value={estadoLabel(cliente.estado)}
//             description="Estado del servicio."
//             icon={CheckCircle2}
//             tone={estadoTone(cliente.estado)}
//           />

//           <StatCard
//             title="Plan"
//             value={cliente.plan?.nombre || "Sin plan"}
//             description="Plan contratado."
//             icon={Wifi}
//             tone={cliente.plan ? "violet" : "red"}
//           />

//           <StatCard
//             title="DNI"
//             value={cliente.dni || "-"}
//             description="Documento."
//             icon={IdCard}
//             tone="amber"
//           />

//           <StatCard
//             title="Localidad"
//             value={cliente.localidad || "-"}
//             description="Ubicación principal."
//             icon={MapPin}
//             tone="cyan"
//           />
//         </div>

//         <div className="mt-5">
//           <DashboardGrid>
//             <DashboardMain>
//               <div className={`${cardBase} p-3.5`}>
//                 <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//                   <div>
//                     <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
//                       Clientes
//                     </p>

//                     <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
//                       Ver cliente
//                     </h1>

//                     <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
//                       Ficha general del cliente, datos de contacto, domicilio y
//                       plan contratado.
//                     </p>
//                   </div>

//                   <div className="flex shrink-0 gap-2">
//                     <Link
//                       href={`/clientes/${cliente.id}/estado-cuenta`}
//                       className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
//                     >
//                       <ReceiptText className="h-3.5 w-3.5" />
//                       Cuenta
//                     </Link>

//                     <Link
//                       href={`/clientes/${cliente.id}/editar`}
//                       className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-3.5 text-xs font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//                     >
//                       <Pencil className="h-3.5 w-3.5" />
//                       Editar
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <FichaClienteCard
//                   cliente={cliente}
//                   nombreCompleto={nombreCompleto}
//                 />
//               </div>
//             </DashboardMain>

//             <DashboardAside>
//               <ResumenCliente cliente={cliente} />

//               <DesktopActions cliente={cliente} />
//             </DashboardAside>
//           </DashboardGrid>
//         </div>
//       </div>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/clientes/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  IdCard,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ReceiptText,
  UserRound,
  Wifi,
} from "lucide-react";
import { obtenerClientePorId } from "@/services/cliente.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import type { ClienteSafe } from "@/types/cliente.types";

type VerClientePageProps = {
  params: {
    id: string;
  };
};

export const metadata = {
  title: "Ver cliente",
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

const buttonPrimaryClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 text-[12px] font-medium text-white shadow-sm shadow-blue-950/10 transition hover:bg-blue-700 active:scale-[0.99] dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600";

const buttonSecondaryClass =
  "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900";

function formatMoney(value?: number | null) {
  const amount = Number(value || 0);
  const [integerPart, decimalPart] = amount.toFixed(2).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formattedInteger},${decimalPart}`;
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) return value;

  return `${day}/${month}/${year}`;
}

function estadoLabel(estado: string) {
  if (estado === "activo") return "Activo";
  if (estado === "suspendido") return "Suspendido";
  return "Baja";
}

function estadoTone(estado: string): "success" | "warning" | "danger" {
  if (estado === "activo") return "success";
  if (estado === "suspendido") return "warning";
  return "danger";
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

function BackButton() {
  return (
    <Link
      href="/clientes"
      className={`${buttonSecondaryClass} hidden sm:inline-flex`}
    >
      Volver
    </Link>
  );
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "primary" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    neutral:
      "border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300",
    primary:
      "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
    success:
      "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300",
    warning:
      "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/35 dark:text-amber-300",
    danger:
      "border-red-300 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300",
  }[tone];

  return (
    <span
      className={`inline-flex h-7 items-center rounded-full border px-2.5 text-[10px] font-semibold leading-none ${toneClass}`}
    >
      {children}
    </span>
  );
}

function HeaderCliente({ cliente }: { cliente: ClienteSafe }) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className={sectionTitleClass}>Clientes</p>

          <h1 className={sectionSubtitleClass}>Ver cliente</h1>

          <p className={`${sectionDescriptionClass} max-w-3xl truncate`}>
            {getNombreCompleto(cliente)} · N° {cliente.numeroCliente} · DNI{" "}
            {cliente.dni || "-"}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 lg:items-end">
          <BackButton />

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Badge tone="primary">N° {cliente.numeroCliente}</Badge>

            <Badge tone={estadoTone(cliente.estado)}>
              {estadoLabel(cliente.estado)}
            </Badge>

            <Badge tone={cliente.plan ? "success" : "warning"}>
              {cliente.plan ? "Con plan" : "Sin plan"}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  tone = "neutral",
}: {
  icon: ReactNode;
  label: string;
  value?: string | number | null;
  tone?: "neutral" | "primary" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    neutral: "text-slate-950 dark:text-white",
    primary: "text-blue-700 dark:text-blue-300",
    success: "text-emerald-700 dark:text-emerald-300",
    warning: "text-amber-700 dark:text-amber-300",
    danger: "text-red-700 dark:text-red-300",
  }[tone];

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-700">
      <span className="inline-flex min-w-0 items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
        <span className="shrink-0 text-blue-700 dark:text-blue-300">
          {icon}
        </span>

        <span className="truncate">{label}</span>
      </span>

      <span className={`truncate text-right text-xs font-semibold ${toneClass}`}>
        {value || "-"}
      </span>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={innerPanelClass}>
      <div className="border-b border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950/50">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          {title}
        </p>
      </div>

      {children}
    </section>
  );
}

function FichaCliente({
  cliente,
  nombreCompleto,
}: {
  cliente: ClienteSafe;
  nombreCompleto: string;
}) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Ficha del cliente</p>

        <h2 className={sectionSubtitleClass}>Datos registrados</h2>

        <p className={sectionDescriptionClass}>
          Información personal, ubicación y servicio contratado.
        </p>
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <DetailSection title="Datos personales">
          <InfoRow
            icon={<UserRound className="h-3.5 w-3.5" />}
            label="Nombre completo"
            value={nombreCompleto}
            tone="primary"
          />

          <InfoRow
            icon={<IdCard className="h-3.5 w-3.5" />}
            label="DNI"
            value={cliente.dni}
          />

          <InfoRow
            icon={<Phone className="h-3.5 w-3.5" />}
            label="Teléfono"
            value={cliente.telefono}
          />

          <InfoRow
            icon={<Mail className="h-3.5 w-3.5" />}
            label="Email"
            value={cliente.email || "-"}
          />
        </DetailSection>

        <DetailSection title="Ubicación">
          <InfoRow
            icon={<MapPin className="h-3.5 w-3.5" />}
            label="Dirección"
            value={cliente.direccion}
            tone="primary"
          />

          <InfoRow
            icon={<MapPin className="h-3.5 w-3.5" />}
            label="Localidad"
            value={cliente.localidad}
          />

          <InfoRow
            icon={<MapPin className="h-3.5 w-3.5" />}
            label="Provincia"
            value={cliente.provincia}
          />
        </DetailSection>

        <section className={`${innerPanelClass} xl:col-span-2`}>
          <div className="border-b border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950/50">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              Servicio contratado
            </p>
          </div>

          <div className="grid gap-0 md:grid-cols-2">
            <InfoRow
              icon={<Wifi className="h-3.5 w-3.5" />}
              label="Plan"
              value={cliente.plan?.nombre || "Sin plan asignado"}
              tone={cliente.plan ? "primary" : "warning"}
            />

            <InfoRow
              icon={<Wifi className="h-3.5 w-3.5" />}
              label="Tipo"
              value={cliente.plan?.tipo || "-"}
            />

            <InfoRow
              icon={<FileText className="h-3.5 w-3.5" />}
              label="Importe"
              value={cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
              tone={cliente.plan ? "primary" : "neutral"}
            />

            <InfoRow
              icon={<CheckCircle2 className="h-3.5 w-3.5" />}
              label="Estado"
              value={estadoLabel(cliente.estado)}
              tone={estadoTone(cliente.estado)}
            />

            <InfoRow
              icon={<FileText className="h-3.5 w-3.5" />}
              label="Fecha de alta"
              value={formatDate(cliente.fechaAlta)}
            />

            <InfoRow
              icon={<FileText className="h-3.5 w-3.5" />}
              label="Último cambio"
              value={cliente.ultimoCambioPlan || "Sin cambios"}
            />
          </div>

          <div className="border-t border-slate-200 px-3 py-2.5 dark:border-slate-700">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              Detalle del plan
            </p>

            <p className="mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
              {cliente.plan?.detalle || "Sin detalle disponible."}
            </p>
          </div>
        </section>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Link
          href={`/clientes/${cliente.id}/estado-cuenta`}
          className={buttonSecondaryClass}
        >
          <ReceiptText className="h-3.5 w-3.5" />
          Estado de cuenta
        </Link>

        <Link
          href={`/clientes/${cliente.id}/editar`}
          className={buttonPrimaryClass}
        >
          <Pencil className="h-3.5 w-3.5 text-white" />
          <span className="text-white">Editar cliente</span>
        </Link>
      </div>
    </section>
  );
}

function ResumenCliente({ cliente }: { cliente: ClienteSafe }) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Resumen</p>

        <h2 className={sectionSubtitleClass}>Información del cliente</h2>
      </div>

      <div className={innerPanelClass}>
        <InfoRow
          icon={<FileText className="h-3.5 w-3.5" />}
          label="Número"
          value={cliente.numeroCliente}
          tone="primary"
        />

        <InfoRow
          icon={<CheckCircle2 className="h-3.5 w-3.5" />}
          label="Estado"
          value={estadoLabel(cliente.estado)}
          tone={estadoTone(cliente.estado)}
        />

        <InfoRow
          icon={<Wifi className="h-3.5 w-3.5" />}
          label="Plan"
          value={cliente.plan?.nombre || "Sin plan"}
          tone={cliente.plan ? "success" : "warning"}
        />

        <InfoRow
          icon={<ReceiptText className="h-3.5 w-3.5" />}
          label="Importe"
          value={cliente.plan ? formatMoney(cliente.plan.importe) : "-"}
          tone={cliente.plan ? "primary" : "neutral"}
        />

        <InfoRow
          icon={<Phone className="h-3.5 w-3.5" />}
          label="Teléfono"
          value={cliente.telefono || "-"}
        />

        <InfoRow
          icon={<MapPin className="h-3.5 w-3.5" />}
          label="Ubicación"
          value={`${cliente.localidad || "-"}, ${cliente.provincia || "-"}`}
        />
      </div>
    </section>
  );
}

function AccionesCliente({ cliente }: { cliente: ClienteSafe }) {
  return (
    <section className={`${panelClass} hidden p-3.5 xl:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Acciones</p>

        <h2 className={sectionSubtitleClass}>Gestión del cliente</h2>
      </div>

      <div className="grid gap-2">
        <Link
          href={`/clientes/${cliente.id}/estado-cuenta`}
          className="group flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 ring-1 ring-white/50 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:ring-slate-800/60 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <ReceiptText className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-blue-700 dark:text-slate-400 dark:group-hover:text-blue-300" />
            <span className="truncate">Estado de cuenta</span>
          </span>

          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
        </Link>

        <Link
          href={`/clientes/${cliente.id}/editar`}
          className="group flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-[13px] font-medium text-slate-700 shadow-sm shadow-slate-300/30 ring-1 ring-white/50 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:ring-slate-800/60 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <Pencil className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-blue-700 dark:text-slate-400 dark:group-hover:text-blue-300" />
            <span className="truncate">Editar cliente</span>
          </span>

          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

export default async function VerClientePage({ params }: VerClientePageProps) {
  const cliente = await obtenerClientePorId(params.id);

  if (!cliente) {
    notFound();
  }

  const nombreCompleto = getNombreCompleto(cliente);

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          <HeaderCliente cliente={cliente} />

          <div className="mt-3">
            <FichaCliente cliente={cliente} nombreCompleto={nombreCompleto} />
          </div>
        </DashboardMain>

        <DashboardAside>
          <ResumenCliente cliente={cliente} />

          <div className="mt-3">
            <AccionesCliente cliente={cliente} />
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
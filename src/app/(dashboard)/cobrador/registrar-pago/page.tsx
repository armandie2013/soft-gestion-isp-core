// // src/app/(dashboard)/cobrador/registrar-pago/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   AlertTriangle,
//   ArrowRight,
//   CheckCircle2,
//   CreditCard,
//   IdCard,
//   MapPin,
//   Phone,
//   UserRound,
//   WalletCards,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { buscarClienteParaCobradorPorDni } from "@/services/cobrador.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Registrar un pago",
// };

// type RegistrarPagoDniPageProps = {
//   searchParams?: {
//     dni?: string;
//   };
// };

// type ClienteEncontrado = {
//   id: string;
//   apellido: string;
//   nombre: string;
//   dni: string;
//   numeroCliente: number;
//   direccion?: string;
//   localidad?: string;
//   provincia?: string;
//   telefono?: string;
// };

// function limpiarDni(value: string) {
//   return String(value || "").replace(/\D/g, "").slice(0, 12);
// }

// function DataItem({
//   label,
//   value,
//   icon: Icon,
// }: {
//   label: string;
//   value?: string | number | null;
//   icon: typeof IdCard;
// }) {
//   return (
//     <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
//       <div className="flex items-center gap-2">
//         <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />

//         <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//           {label}
//         </p>
//       </div>

//       <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
//         {value || "-"}
//       </p>
//     </div>
//   );
// }

// function ClienteEncontradoCard({ cliente }: { cliente: ClienteEncontrado }) {
//   return (
//     <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-4">
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//         <div className="flex min-w-0 items-start gap-3">
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
//             <UserRound className="h-5 w-5" />
//           </div>

//           <div className="min-w-0">
//             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
//               Cliente encontrado
//             </p>

//             <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">
//               {cliente.apellido}, {cliente.nombre}
//             </h1>

//             <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//               Confirmá los datos principales antes de abrir la cuenta.
//             </p>
//           </div>
//         </div>

//         <div className="hidden rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300 lg:block">
//           Listo para continuar
//         </div>
//       </div>

//       <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
//         <DataItem label="DNI" value={cliente.dni} icon={IdCard} />

//         <DataItem
//           label="Cliente N°"
//           value={cliente.numeroCliente}
//           icon={CreditCard}
//         />

//         <DataItem
//           label="Localidad"
//           value={cliente.localidad || "-"}
//           icon={MapPin}
//         />

//         <DataItem
//           label="Teléfono"
//           value={cliente.telefono || "-"}
//           icon={Phone}
//         />
//       </div>

//       <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
//         <div className="flex items-start gap-2">
//           <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />

//           <div className="min-w-0">
//             <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//               Dirección del servicio
//             </p>

//             <p className="mt-1 text-sm leading-5 text-slate-950 dark:text-white">
//               {cliente.direccion || "Sin dirección cargada"}
//               <span className="text-slate-500 dark:text-slate-400">
//                 {" "}
//                 · {cliente.localidad || "Sin localidad"} ·{" "}
//                 {cliente.provincia || "Sin provincia"}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
//         <Link
//           href="/cobrador"
//           className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
//         >
//           Cancelar
//         </Link>

//         <Link
//           href={`/cobrador/clientes/${cliente.id}?modo=pago&dni=${cliente.dni}`}
//           className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
//         >
//           Abrir detalle de cuenta
//           <ArrowRight className="h-3.5 w-3.5" />
//         </Link>
//       </div>
//     </div>
//   );
// }

// function ClienteNoEncontrado({ dniBuscado }: { dniBuscado: string }) {
//   return (
//     <div className="rounded-[1.45rem] border border-red-200 bg-red-50 p-3 text-red-800 shadow-sm dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200 sm:p-4">
//       <div className="flex gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">
//           <AlertTriangle className="h-5 w-5" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-sm font-medium">Cliente no encontrado</p>

//           <p className="mt-1 text-xs leading-5 opacity-90">
//             No se encontró ningún cliente con DNI{" "}
//             <span className="font-medium">{dniBuscado}</span>. Verificá el dato
//             ingresado desde el panel del cobrador.
//           </p>

//           <div className="mt-3 flex flex-col gap-2 sm:flex-row">
//             <Link
//               href="/cobrador"
//               className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-red-200 bg-white px-4 text-xs font-medium text-red-700 transition hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-950/60 sm:w-auto"
//             >
//               Volver al panel
//             </Link>

//             <Link
//               href="/cobrador/buscar-cliente"
//               className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
//             >
//               Ir a búsqueda general
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AsideFlujoCard() {
//   return (
//     <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
//       <div className="mb-3">
//         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//           Flujo de pago
//         </p>

//         <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//           Confirmación previa
//         </h2>
//       </div>

//       <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//             <IdCard className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             DNI validado
//           </span>

//           <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
//         </div>

//         <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
//           <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//             <UserRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Cliente encontrado
//           </span>

//           <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
//         </div>

//         <div className="flex items-center justify-between gap-3 px-3 py-2">
//           <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
//             <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//             Siguiente paso
//           </span>

//           <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
//             Cuenta
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default async function RegistrarPagoDniPage({
//   searchParams,
// }: RegistrarPagoDniPageProps) {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "cobrador") {
//     redirect(`/${user.rol}`);
//   }

//   const dniBuscado = limpiarDni(searchParams?.dni || "");

//   if (!dniBuscado) {
//     redirect("/cobrador");
//   }

//   const cliente = await buscarClienteParaCobradorPorDni(dniBuscado);

//   return (
//     <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
//       <DashboardGrid>
//         <DashboardMain>
//           {cliente ? (
//             <ClienteEncontradoCard cliente={cliente} />
//           ) : (
//             <ClienteNoEncontrado dniBuscado={dniBuscado} />
//           )}
//         </DashboardMain>

//         <DashboardAside>
//           {cliente ? <AsideFlujoCard /> : null}

//           <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//             <p className="font-medium">Importante</p>

//             <p className="mt-1">
//               El pago se registra recién desde el detalle de cuenta del cliente.
//               Esta pantalla solo confirma que el DNI corresponde al cliente
//               encontrado.
//             </p>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// // src/app/(dashboard)/cobrador/registrar-pago/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   AlertTriangle,
//   CheckCircle2,
//   CreditCard,
//   IdCard,
//   MapPin,
//   Phone,
//   UserRound,
//   WalletCards,
// } from "lucide-react";
// import { getCurrentUser } from "@/lib/current-user";
// import { buscarClienteParaCobradorPorDni } from "@/services/cobrador.service";
// import { PageShell } from "@/components/ui/PageShell";
// import {
//   DashboardAside,
//   DashboardGrid,
//   DashboardMain,
// } from "@/components/ui/DashboardGrid";

// export const metadata = {
//   title: "Registrar un pago",
// };

// type RegistrarPagoDniPageProps = {
//   searchParams?: {
//     dni?: string;
//   };
// };

// type ClienteEncontrado = {
//   id: string;
//   apellido: string;
//   nombre: string;
//   dni: string;
//   numeroCliente: number;
//   direccion?: string;
//   localidad?: string;
//   provincia?: string;
//   telefono?: string;
// };

// function limpiarDni(value: string) {
//   return String(value || "").replace(/\D/g, "").slice(0, 12);
// }

// function InfoPill({
//   label,
//   value,
//   icon: Icon,
// }: {
//   label: string;
//   value?: string | number | null;
//   icon: typeof IdCard;
// }) {
//   return (
//     <div className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-950/60">
//       <Icon className="h-5 w-5 shrink-0 text-cyan-700 dark:text-cyan-300" />

//       <div className="min-w-0">
//         <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
//           {label}
//         </p>

//         <p className="mt-1 truncate text-sm font-medium leading-5 text-slate-950 dark:text-white sm:text-base">
//           {value || "-"}
//         </p>
//       </div>
//     </div>
//   );
// }

// function ClienteEncontradoCard({ cliente }: { cliente: ClienteEncontrado }) {
//   const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;
//   const ubicacion = [cliente.localidad, cliente.provincia]
//     .filter(Boolean)
//     .join(" · ");

//   return (
//     <div className="overflow-hidden rounded-[1.5rem] border border-slate-300 bg-white shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
//       <div className="border-b border-slate-200 bg-emerald-50 px-4 py-4 dark:border-slate-800 dark:bg-emerald-950/20 sm:px-5">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//           <div className="flex min-w-0 items-start gap-3">
//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900/70">
//               <UserRound className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
//                 Cliente encontrado
//               </p>

//               <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">
//                 {nombreCompleto}
//               </h1>

//               <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                 Verificá los datos del cliente antes de continuar con el pago.
//               </p>
//             </div>
//           </div>

//           <div className="flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-900/70 dark:bg-slate-900 dark:text-emerald-300">
//             <CheckCircle2 className="h-3.5 w-3.5" />
//             Validado
//           </div>
//         </div>
//       </div>

//       <div className="p-4 sm:p-5">
//         <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
//           <InfoPill label="DNI" value={cliente.dni} icon={IdCard} />

//           <InfoPill
//             label="Cliente N°"
//             value={cliente.numeroCliente}
//             icon={CreditCard}
//           />

//           <InfoPill
//             label="Localidad"
//             value={cliente.localidad || "-"}
//             icon={MapPin}
//           />

//           <InfoPill
//             label="Teléfono"
//             value={cliente.telefono || "-"}
//             icon={Phone}
//           />
//         </div>

//         <div className="mt-3 rounded-3xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
//           <div className="flex items-start gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-cyan-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-cyan-300 dark:ring-slate-800">
//               <MapPin className="h-4 w-4" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
//                 Dirección del servicio
//               </p>

//               <p className="mt-1 text-sm leading-6 text-slate-950 dark:text-white">
//                 {cliente.direccion || "Sin dirección cargada"}
//               </p>

//               <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
//                 {ubicacion || "Sin localidad cargada"}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-3 grid gap-2">
//           <Link
//             href={`/cobrador/clientes/${cliente.id}?modo=pago&dni=${cliente.dni}`}
//             className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-cyan-500 bg-gradient-to-r from-cyan-600 to-sky-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20 transition hover:from-cyan-700 hover:to-sky-700 active:scale-[0.99] dark:border-cyan-300/70 dark:from-cyan-400 dark:to-sky-400 dark:text-slate-950 dark:shadow-cyan-500/20 dark:hover:from-cyan-300 dark:hover:to-sky-300"
//           >
//             Ver deuda y registrar pago
//           </Link>

//           <Link
//             href="/cobrador"
//             className="inline-flex h-10 w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900"
//           >
//             Cancelar
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ClienteNoEncontrado({ dniBuscado }: { dniBuscado: string }) {
//   return (
//     <div className="rounded-[1.45rem] border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200">
//       <div className="flex gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">
//           <AlertTriangle className="h-5 w-5" />
//         </div>

//         <div className="min-w-0">
//           <p className="text-sm font-medium">Cliente no encontrado</p>

//           <p className="mt-1 text-xs leading-5 opacity-90">
//             No se encontró ningún cliente con DNI{" "}
//             <span className="font-medium">{dniBuscado}</span>. Verificá el dato
//             ingresado desde el panel del cobrador.
//           </p>

//           <div className="mt-3 flex flex-col gap-2 sm:flex-row">
//             <Link
//               href="/cobrador"
//               className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-red-200 bg-white px-4 text-xs font-medium text-red-700 transition hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-950/60 sm:w-auto"
//             >
//               Volver al panel
//             </Link>

//             <Link
//               href="/cobrador/buscar-cliente"
//               className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
//             >
//               Ir a búsqueda general
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AsideConfirmacionCard() {
//   return (
//     <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
//       <div className="mb-3">
//         <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
//           Siguiente paso
//         </p>

//         <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
//           Continuar al pago
//         </h2>
//       </div>

//       <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-3 dark:border-cyan-900/70 dark:bg-cyan-950/25">
//         <div className="flex items-start gap-3">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-cyan-700 ring-1 ring-cyan-100 dark:bg-slate-900 dark:text-cyan-300 dark:ring-cyan-900/70">
//             <WalletCards className="h-4 w-4" />
//           </div>

//           <div>
//             <p className="text-xs font-medium text-slate-950 dark:text-white">
//               Ver deuda y registrar pago
//             </p>

//             <p className="mt-1 text-[11px] leading-5 text-slate-600 dark:text-slate-400">
//               En la siguiente pantalla se mostrarán los períodos pendientes y
//               la acción para registrar el pago.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default async function RegistrarPagoDniPage({
//   searchParams,
// }: RegistrarPagoDniPageProps) {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   if (user.rol !== "cobrador") {
//     redirect(`/${user.rol}`);
//   }

//   const dniBuscado = limpiarDni(searchParams?.dni || "");

//   if (!dniBuscado) {
//     redirect("/cobrador");
//   }

//   const cliente = await buscarClienteParaCobradorPorDni(dniBuscado);

//   return (
//     <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
//       <DashboardGrid>
//         <DashboardMain>
//           {cliente ? (
//             <ClienteEncontradoCard cliente={cliente} />
//           ) : (
//             <ClienteNoEncontrado dniBuscado={dniBuscado} />
//           )}
//         </DashboardMain>

//         <DashboardAside>
//           {cliente ? <AsideConfirmacionCard /> : null}

//           <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
//             <p className="font-medium">Importante</p>

//             <p className="mt-1">
//               Esta pantalla confirma la identidad del cliente. El pago se
//               registra recién en la siguiente vista, donde se muestran la deuda
//               y los períodos pendientes.
//             </p>
//           </div>
//         </DashboardAside>
//       </DashboardGrid>
//     </PageShell>
//   );
// }

// src/app/(dashboard)/cobrador/registrar-pago/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  IdCard,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { buscarClienteParaCobradorPorDni } from "@/services/cobrador.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Registrar un pago",
};

type RegistrarPagoDniPageProps = {
  searchParams?: {
    dni?: string;
  };
};

type ClienteEncontrado = {
  id: string;
  apellido: string;
  nombre: string;
  dni: string;
  numeroCliente: number;
  direccion?: string;
  localidad?: string;
  provincia?: string;
  telefono?: string;
};

const panelClass =
  "rounded-xl border border-slate-300 bg-white/95 shadow-md shadow-slate-300/55 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900/86 dark:shadow-black/20 dark:ring-slate-800/80";

const innerPanelClass =
  "rounded-lg border border-slate-300 bg-slate-50 shadow-sm shadow-slate-300/35 dark:border-slate-700 dark:bg-slate-950/45 dark:shadow-none";

const mobileScreenClass =
  "rounded-[1.55rem] border border-blue-200 bg-gradient-to-b from-blue-50 via-slate-50 to-white p-2.5 shadow-xl shadow-blue-950/10 ring-1 ring-white/80 dark:border-blue-500/70 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 dark:shadow-black/35 dark:ring-blue-800/50";

const mobileModuleClass =
  "rounded-[1.18rem] border border-blue-200 bg-white/96 p-3.5 shadow-lg shadow-blue-950/10 ring-1 ring-white/80 backdrop-blur dark:border-blue-500/45 dark:bg-slate-950/72 dark:shadow-black/25 dark:ring-blue-950/60";

const sectionTitleClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300";

const sectionSubtitleClass =
  "mt-0.5 text-sm font-semibold text-slate-950 dark:text-white";

const sectionDescriptionClass =
  "mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400";

const primaryButtonClass =
  "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-3 text-[13px] font-medium leading-none text-white shadow-sm shadow-blue-950/10 transition hover:border-blue-700 hover:bg-blue-700 active:scale-[0.99] dark:border-blue-500 dark:bg-blue-500 dark:hover:border-blue-600 dark:hover:bg-blue-600 sm:h-10 sm:w-auto";

const walletPrimaryButtonClass =
  "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-500 bg-gradient-to-r from-blue-600 via-blue-600 to-violet-600 px-3 text-[13px] font-semibold leading-none text-white shadow-md shadow-blue-950/15 transition hover:from-blue-700 hover:via-blue-700 hover:to-violet-700 active:scale-[0.99] dark:border-blue-400/70 dark:from-blue-500 dark:via-blue-600 dark:to-violet-600 dark:shadow-blue-950/20";

function limpiarDni(value: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 12);
}

function HeaderRegistrarPago() {
  return (
    <section className={`${panelClass} hidden p-3.5 sm:block`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className={sectionTitleClass}>Circuito de cobro</p>

            <h1 className={sectionSubtitleClass}>Validación del cliente</h1>

            <p className={`${sectionDescriptionClass} max-w-3xl`}>
              Confirmá que el DNI ingresado corresponde a un cliente existente
              antes de consultar la deuda y registrar el pago.
            </p>
          </div>
        </div>

        <Link
          href="/cobrador"
          className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-[12px] font-medium text-slate-700 shadow-sm shadow-slate-300/35 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:shadow-black/10 dark:hover:bg-slate-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver
        </Link>
      </div>
    </section>
  );
}

function InfoPill({
  label,
  value,
  icon: Icon,
  highlight = false,
}: {
  label: string;
  value?: string | number | null;
  icon: LucideIcon;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 items-center gap-2.5 rounded-lg border px-3 py-2.5 shadow-sm ${
        highlight
          ? "border-blue-300 bg-blue-50/70 text-blue-800 shadow-blue-950/5 dark:border-blue-500/45 dark:bg-blue-950/30 dark:text-blue-100"
          : "border-slate-300 bg-white text-slate-950 shadow-slate-300/25 dark:border-slate-700 dark:bg-slate-950/45 dark:text-white dark:shadow-none"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
          highlight
            ? "border-blue-300 bg-white text-blue-700 dark:border-blue-500/45 dark:bg-blue-950/45 dark:text-blue-200"
            : "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>

      <div className="min-w-0">
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
            highlight
              ? "text-blue-700 dark:text-blue-200"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold leading-5 text-slate-950 dark:text-white">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

function ClienteEncontradoMobile({
  cliente,
}: {
  cliente: ClienteEncontrado;
}) {
  const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;
  const ubicacion = [cliente.localidad, cliente.provincia]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={mobileScreenClass}>
      <section className="relative overflow-hidden rounded-[1.25rem] border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-600 to-violet-600 p-3.5 text-white shadow-md shadow-blue-950/15 ring-1 ring-blue-200/70 dark:border-blue-500/45 dark:from-slate-950 dark:via-blue-950 dark:to-violet-950 dark:shadow-black/20 dark:ring-white/10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/18 blur-2xl dark:bg-blue-300/20" />
        <div className="pointer-events-none absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-white/12 blur-3xl dark:bg-violet-400/16" />

        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
                Cliente encontrado
              </p>

              <h1 className="mt-1 line-clamp-2 text-[22px] font-semibold leading-7 tracking-tight text-white">
                {nombreCompleto}
              </h1>

              <p className="mt-2 text-[12px] leading-5 text-white/78">
                DNI validado para continuar con el circuito de cobro.
              </p>
            </div>

            <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full border border-white/35 bg-white/18 px-2 text-[10px] font-semibold leading-none text-white shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Validado
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-white/22 bg-white/14 p-2.5 shadow-sm shadow-blue-950/5 backdrop-blur dark:border-white/15 dark:bg-white/[0.08] dark:shadow-black/5">
            <div>
              <p className="truncate text-[9px] font-semibold uppercase tracking-[0.08em] text-white/68">
                DNI
              </p>

              <p className="mt-1 truncate text-[18px] font-semibold text-white">
                {cliente.dni}
              </p>
            </div>

            <div className="border-l border-white/20 pl-2 text-right dark:border-white/15">
              <p className="truncate text-[9px] font-semibold uppercase tracking-[0.08em] text-white/68">
                Cliente N°
              </p>

              <p className="mt-1 truncate text-[18px] font-semibold text-white">
                {cliente.numeroCliente}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${mobileModuleClass} mt-2.5`}>
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500 bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md shadow-blue-950/15 dark:border-blue-400/70 dark:from-blue-500 dark:to-violet-600 dark:shadow-blue-950/20">
            <UserRound className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className={sectionTitleClass}>Datos principales</p>

            <h2 className={sectionSubtitleClass}>Confirmación del cliente</h2>

            <p className={sectionDescriptionClass}>
              Revisá estos datos antes de abrir la deuda del cliente.
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <InfoPill
            label="Localidad"
            value={cliente.localidad || "-"}
            icon={MapPin}
          />

          <InfoPill
            label="Teléfono"
            value={cliente.telefono || "-"}
            icon={Phone}
          />

          <div className="rounded-xl border border-blue-200 bg-blue-50/75 p-3 shadow-sm shadow-blue-950/5 dark:border-blue-500/35 dark:bg-blue-950/24 dark:shadow-black/10">
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700 dark:border-blue-500/45 dark:bg-blue-950/45 dark:text-blue-200">
                <MapPin className="h-3.5 w-3.5" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-blue-700 dark:text-blue-200">
                  Dirección del servicio
                </p>

                <p className="mt-1 text-[13px] font-semibold leading-5 text-slate-950 dark:text-white">
                  {cliente.direccion || "Sin dirección cargada"}
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-slate-600 dark:text-blue-100/78">
                  {ubicacion || "Sin localidad cargada"}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/cobrador/clientes/${cliente.id}?modo=pago&dni=${cliente.dni}`}
            className={`${walletPrimaryButtonClass} mt-1`}
            style={{ color: "#ffffff" }}
          >
            <span
              className="text-[13px] font-semibold leading-none"
              style={{ color: "#ffffff" }}
            >
              Ver deuda y registrar pago
            </span>

            <ArrowRight
              className="h-4 w-4"
              style={{ color: "#ffffff" }}
            />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ClienteEncontradoDesktop({
  cliente,
}: {
  cliente: ClienteEncontrado;
}) {
  const nombreCompleto = `${cliente.apellido}, ${cliente.nombre}`;
  const ubicacion = [cliente.localidad, cliente.provincia]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
            <UserRound className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              Validación correcta
            </p>

            <h2 className="mt-0.5 text-sm font-semibold text-slate-950 dark:text-white">
              {nombreCompleto}
            </h2>

            <p className="mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
              El cliente fue encontrado y está listo para consultar deuda.
            </p>
          </div>
        </div>

        <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 text-[10px] font-semibold leading-none text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
          DNI validado
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <InfoPill label="DNI" value={cliente.dni} icon={IdCard} highlight />

        <InfoPill
          label="Cliente N°"
          value={cliente.numeroCliente}
          icon={CreditCard}
          highlight
        />

        <InfoPill
          label="Localidad"
          value={cliente.localidad || "-"}
          icon={MapPin}
        />

        <InfoPill
          label="Teléfono"
          value={cliente.telefono || "-"}
          icon={Phone}
        />
      </div>

      <div className={`${innerPanelClass} mt-3 p-3`}>
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
            <MapPin className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Dirección del servicio
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-950 dark:text-white">
              {cliente.direccion || "Sin dirección cargada"}
            </p>

            <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
              {ubicacion || "Sin localidad cargada"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <Link
          href={`/cobrador/clientes/${cliente.id}?modo=pago&dni=${cliente.dni}`}
          className={primaryButtonClass}
          style={{ color: "#ffffff" }}
        >
          <span
            className="text-[13px] font-medium leading-none"
            style={{ color: "#ffffff" }}
          >
            Ver deuda y registrar pago
          </span>

          <ArrowRight
            className="h-3.5 w-3.5"
            style={{ color: "#ffffff" }}
          />
        </Link>
      </div>
    </section>
  );
}

function ClienteNoEncontrado({ dniBuscado }: { dniBuscado: string }) {
  return (
    <section className={`${panelClass} p-3.5`}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/35 dark:text-red-300">
          <AlertTriangle className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-700 dark:text-red-300">
            Cliente no encontrado
          </p>

          <h1 className={sectionSubtitleClass}>No encontramos ese DNI</h1>

          <p className="mt-1 text-[12px] leading-5 text-slate-600 dark:text-slate-400">
            No se encontró ningún cliente con DNI{" "}
            <span className="font-semibold text-slate-950 dark:text-white">
              {dniBuscado}
            </span>
            .
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] leading-5 text-red-800 dark:border-red-900/70 dark:bg-red-950/25 dark:text-red-200">
        Verificá el número ingresado desde el panel del cobrador. También podés
        usar la búsqueda general para consultar por nombre, apellido, localidad
        o número de cliente.
      </div>

      <div className="mt-3 flex justify-end">
        <Link
          href="/cobrador/buscar-cliente"
          className={primaryButtonClass}
          style={{ color: "#ffffff" }}
        >
          <span
            className="text-[13px] font-medium leading-none"
            style={{ color: "#ffffff" }}
          >
            Ir a búsqueda general
          </span>

          <ArrowRight
            className="h-3.5 w-3.5"
            style={{ color: "#ffffff" }}
          />
        </Link>
      </div>
    </section>
  );
}

function AsideConfirmacionCard() {
  return (
    <section className={`${panelClass} hidden p-3.5 sm:block`}>
      <div className="mb-3">
        <p className={sectionTitleClass}>Flujo de pago</p>

        <h2 className={sectionSubtitleClass}>Confirmación previa</h2>

        <p className={sectionDescriptionClass}>
          Esta vista confirma que el DNI pertenece a un cliente existente.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-700 dark:bg-slate-950/40 dark:shadow-none">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
          <span className="inline-flex items-center gap-2 text-[12px] text-slate-700 dark:text-slate-300">
            <IdCard className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
            DNI validado
          </span>

          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
          <span className="inline-flex items-center gap-2 text-[12px] text-slate-700 dark:text-slate-300">
            <UserRound className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
            Cliente encontrado
          </span>

          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
        </div>

        <div className="flex items-center justify-between gap-3 px-3 py-2.5">
          <span className="inline-flex items-center gap-2 text-[12px] text-slate-700 dark:text-slate-300">
            <WalletCards className="h-3.5 w-3.5 text-blue-700 dark:text-blue-300" />
            Siguiente paso
          </span>

          <span className="text-right text-[12px] font-semibold text-slate-950 dark:text-white">
            Deuda
          </span>
        </div>
      </div>
    </section>
  );
}

function AsideImportanteCard() {
  return (
    <section className={`${panelClass} hidden p-3.5 sm:block`}>
      <div className="mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
          Importante
        </p>

        <h2 className={sectionSubtitleClass}>Registro del pago</h2>
      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-[12px] leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
        El pago se registra recién en la siguiente vista, donde se muestran la
        deuda y los períodos pendientes del cliente.
      </div>
    </section>
  );
}

export default async function RegistrarPagoDniPage({
  searchParams,
}: RegistrarPagoDniPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const dniBuscado = limpiarDni(searchParams?.dni || "");

  if (!dniBuscado) {
    redirect("/cobrador");
  }

  const cliente = await buscarClienteParaCobradorPorDni(dniBuscado);

  return (
    <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
      <div className="sm:hidden">
        {cliente ? (
          <ClienteEncontradoMobile cliente={cliente} />
        ) : (
          <ClienteNoEncontrado dniBuscado={dniBuscado} />
        )}
      </div>

      <div className="hidden sm:block">
        <DashboardGrid>
          <DashboardMain>
            <HeaderRegistrarPago />

            <div className="mt-3">
              {cliente ? (
                <ClienteEncontradoDesktop cliente={cliente} />
              ) : (
                <ClienteNoEncontrado dniBuscado={dniBuscado} />
              )}
            </div>
          </DashboardMain>

          <DashboardAside>
            {cliente ? <AsideConfirmacionCard /> : null}

            <div className={cliente ? "mt-3" : ""}>
              <AsideImportanteCard />
            </div>
          </DashboardAside>
        </DashboardGrid>
      </div>
    </PageShell>
  );
}
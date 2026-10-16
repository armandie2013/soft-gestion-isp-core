// // // src/app/(dashboard)/cobrador/buscar-cliente/page.tsx

// // import Link from "next/link";
// // import { redirect } from "next/navigation";
// // import {
// //   AlertTriangle,
// //   ArrowRight,
// //   Eye,
// //   FileSearch,
// //   Filter,
// //   Hash,
// //   IdCard,
// //   Info,
// //   MapPin,
// //   Search,
// //   UserRound,
// // } from "lucide-react";
// // import { getCurrentUser } from "@/lib/current-user";
// // import {
// //   buscarClientesParaCobrador,
// //   type BuscarClientesCobradorFiltros,
// // } from "@/services/cobrador.service";
// // import type { ClienteSafe } from "@/types/cliente.types";

// // export const metadata = {
// //   title: "Buscar cliente",
// // };

// // type BuscarClienteCobradorPageProps = {
// //   searchParams?: {
// //     q?: string;
// //     nombre?: string;
// //     apellido?: string;
// //     dni?: string;
// //     numeroCliente?: string;
// //     localidad?: string;
// //     provincia?: string;
// //   };
// // };

// // function limpiarTexto(value?: string) {
// //   return String(value || "").trim();
// // }

// // function limpiarDni(value?: string) {
// //   return String(value || "").replace(/\D/g, "").slice(0, 12);
// // }

// // function normalizarFiltros(
// //   searchParams?: BuscarClienteCobradorPageProps["searchParams"],
// // ): BuscarClientesCobradorFiltros {
// //   return {
// //     q: limpiarTexto(searchParams?.q),
// //     nombre: limpiarTexto(searchParams?.nombre),
// //     apellido: limpiarTexto(searchParams?.apellido),
// //     dni: limpiarDni(searchParams?.dni),
// //     numeroCliente: limpiarTexto(searchParams?.numeroCliente).replace(/\D/g, ""),
// //     localidad: limpiarTexto(searchParams?.localidad),
// //     provincia: limpiarTexto(searchParams?.provincia),
// //   };
// // }

// // function hayFiltros(filtros: BuscarClientesCobradorFiltros) {
// //   return Boolean(
// //     filtros.q ||
// //       filtros.nombre ||
// //       filtros.apellido ||
// //       filtros.dni ||
// //       filtros.numeroCliente ||
// //       filtros.localidad ||
// //       filtros.provincia,
// //   );
// // }

// // function estadoClienteLabel(estado: string) {
// //   if (estado === "activo") return "Activo";
// //   if (estado === "suspendido") return "Suspendido";
// //   return "Baja";
// // }

// // function estadoClienteClasses(estado: string) {
// //   if (estado === "activo") {
// //     return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/70";
// //   }

// //   if (estado === "suspendido") {
// //     return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/70";
// //   }

// //   return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/70";
// // }

// // function InputField({
// //   label,
// //   name,
// //   defaultValue,
// //   placeholder,
// //   inputMode,
// // }: {
// //   label: string;
// //   name: string;
// //   defaultValue?: string;
// //   placeholder: string;
// //   inputMode?: "text" | "numeric";
// // }) {
// //   return (
// //     <div className="space-y-1.5">
// //       <label
// //         htmlFor={name}
// //         className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
// //       >
// //         {label}
// //       </label>

// //       <input
// //         id={name}
// //         name={name}
// //         type="text"
// //         inputMode={inputMode || "text"}
// //         defaultValue={defaultValue}
// //         placeholder={placeholder}
// //         className="h-10 w-full rounded-2xl border border-slate-300 bg-white px-3 text-xs text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-600"
// //       />
// //     </div>
// //   );
// // }

// // function ClienteResultCard({ cliente }: { cliente: ClienteSafe }) {
// //   return (
// //     <Link
// //       href={`/cobrador/clientes/${cliente.id}`}
// //       className="group block rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 transition hover:border-cyan-400 hover:bg-cyan-50/50 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/20"
// //     >
// //       <div className="flex items-start justify-between gap-3">
// //         <div className="flex min-w-0 items-start gap-3">
// //           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
// //             <UserRound className="h-4 w-4" />
// //           </div>

// //           <div className="min-w-0">
// //             <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
// //               {cliente.apellido}, {cliente.nombre}
// //             </p>

// //             <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
// //               DNI {cliente.dni} Â· Cliente NÂ° {cliente.numeroCliente}
// //             </p>

// //             <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
// //               {cliente.direccion || "-"} Â· {cliente.localidad || "-"},{" "}
// //               {cliente.provincia || "-"}
// //             </p>
// //           </div>
// //         </div>

// //         <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
// //       </div>

// //       <div className="mt-3 flex flex-wrap items-center gap-2">
// //         <span
// //           className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${estadoClienteClasses(
// //             cliente.estado,
// //           )}`}
// //         >
// //           {estadoClienteLabel(cliente.estado)}
// //         </span>

// //         <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[10px] font-medium text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300">
// //           {cliente.plan?.nombre || "Sin plan"}
// //         </span>

// //         <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
// //           <Eye className="h-3 w-3" />
// //           Ver ficha informativa
// //         </span>
// //       </div>
// //     </Link>
// //   );
// // }

// // export default async function BuscarClienteCobradorPage({
// //   searchParams,
// // }: BuscarClienteCobradorPageProps) {
// //   const user = await getCurrentUser();

// //   if (!user) {
// //     redirect("/login");
// //   }

// //   if (user.rol !== "cobrador") {
// //     redirect(`/${user.rol}`);
// //   }

// //   const filtros = normalizarFiltros(searchParams);
// //   const busquedaRealizada = hayFiltros(filtros);
// //   const clientes = busquedaRealizada
// //     ? await buscarClientesParaCobrador(filtros)
// //     : [];

// //   return (
// //     <section className="mx-auto w-full max-w-7xl space-y-4">
// //       <div className="rounded-[1.6rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-5">
// //         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
// //           <div className="min-w-0">
// //             <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-200">
// //               <FileSearch className="h-3.5 w-3.5" />
// //               Consulta informativa
// //             </div>

// //             <div className="mt-4 flex items-start gap-3">
// //               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950">
// //                 <Search className="h-5 w-5" />
// //               </div>

// //               <div className="min-w-0">
// //                 <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
// //                   Buscar cliente
// //                 </p>

// //                 <h1 className="mt-1 text-3xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-4xl">
// //                   BÃºsqueda general
// //                 </h1>

// //                 <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
// //                   UsÃ¡ esta vista para encontrar clientes por nombre, apellido,
// //                   DNI parcial, nÃºmero de cliente, localidad o provincia. Esta
// //                   bÃºsqueda no habilita pagos.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 lg:max-w-md">
// //             <div className="flex gap-2">
// //               <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

// //               <p>
// //                 Para registrar un pago se debe usar el circuito seguro desde el
// //                 dashboard, ingresando el DNI exacto del cliente.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="rounded-[1.6rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-5">
// //         <div className="mb-4 flex items-start gap-3">
// //           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
// //             <Filter className="h-4 w-4" />
// //           </div>

// //           <div className="min-w-0">
// //             <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// //               Filtros
// //             </p>

// //             <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
// //               Datos para buscar
// //             </h2>

// //             <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
// //               PodÃ©s usar un filtro o combinar varios para reducir resultados.
// //             </p>
// //           </div>
// //         </div>

// //         <form method="GET" action="/cobrador/buscar-cliente" className="space-y-3">
// //           <div className="relative">
// //             <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 dark:text-cyan-300" />

// //             <input
// //               name="q"
// //               type="text"
// //               defaultValue={filtros.q}
// //               placeholder="Buscar por nombre, apellido, DNI, cliente, localidad o provincia"
// //               className="h-11 w-full rounded-2xl border border-cyan-300 bg-cyan-50/70 px-3 pl-10 text-sm text-slate-950 shadow-inner outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-cyan-700 dark:bg-cyan-950/45 dark:text-white dark:shadow-cyan-950/30 dark:placeholder:text-cyan-200/60 dark:focus:border-cyan-400 dark:focus:bg-cyan-950/70 dark:focus:ring-cyan-400/20"
// //             />
// //           </div>

// //           <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
// //             <InputField
// //               label="Apellido"
// //               name="apellido"
// //               defaultValue={filtros.apellido}
// //               placeholder="Ej: Barros"
// //             />

// //             <InputField
// //               label="Nombre"
// //               name="nombre"
// //               defaultValue={filtros.nombre}
// //               placeholder="Ej: Juan"
// //             />

// //             <InputField
// //               label="DNI parcial"
// //               name="dni"
// //               defaultValue={filtros.dni}
// //               placeholder="Ãšltimos 3 o mÃ¡s"
// //               inputMode="numeric"
// //             />

// //             <InputField
// //               label="Cliente NÂ°"
// //               name="numeroCliente"
// //               defaultValue={filtros.numeroCliente}
// //               placeholder="Ej: 102"
// //               inputMode="numeric"
// //             />

// //             <InputField
// //               label="Localidad"
// //               name="localidad"
// //               defaultValue={filtros.localidad}
// //               placeholder="Ej: Capital"
// //             />

// //             <InputField
// //               label="Provincia"
// //               name="provincia"
// //               defaultValue={filtros.provincia}
// //               placeholder="Ej: Catamarca"
// //             />
// //           </div>

// //           <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
// //             <Link
// //               href="/cobrador/buscar-cliente"
// //               className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
// //             >
// //               Limpiar
// //             </Link>

// //             <button
// //               type="submit"
// //               className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-cyan-100 px-4 text-xs font-medium text-cyan-800 transition hover:bg-cyan-200 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70 sm:w-auto"
// //             >
// //               <Search className="h-3.5 w-3.5" />
// //               Buscar clientes
// //             </button>
// //           </div>
// //         </form>
// //       </div>

// //       {busquedaRealizada ? (
// //         <div className="rounded-[1.6rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-5">
// //           <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
// //             <div className="min-w-0">
// //               <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
// //                 Resultados
// //               </p>

// //               <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
// //                 {clientes.length === 1
// //                   ? "1 cliente encontrado"
// //                   : `${clientes.length} clientes encontrados`}
// //               </h2>
// //             </div>

// //             <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
// //               <Info className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
// //               Vista sin botÃ³n de pago
// //             </div>
// //           </div>

// //           {clientes.length === 0 ? (
// //             <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
// //               No se encontraron clientes con los filtros indicados.
// //             </div>
// //           ) : (
// //             <div className="grid gap-3">
// //               {clientes.map((cliente) => (
// //                 <ClienteResultCard key={cliente.id} cliente={cliente} />
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       ) : (
// //         <div className="rounded-[1.6rem] border border-cyan-200 bg-cyan-50 p-4 text-sm leading-6 text-cyan-900 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200 sm:p-5">
// //           <div className="flex gap-3">
// //             <Info className="mt-0.5 h-5 w-5 shrink-0" />

// //             <div>
// //               <p className="font-medium">CÃ³mo usar esta bÃºsqueda</p>

// //               <p className="mt-1">
// //                 Esta vista sirve para identificar clientes y consultar su ficha.
// //                 Para evitar errores, el pago solo se habilita desde el circuito
// //                 seguro por DNI exacto.
// //               </p>

// //               <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
// //                 <div className="flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white/70 px-3 py-2 dark:border-cyan-900/70 dark:bg-cyan-950/40">
// //                   <IdCard className="h-4 w-4 shrink-0" />
// //                   DNI parcial
// //                 </div>

// //                 <div className="flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white/70 px-3 py-2 dark:border-cyan-900/70 dark:bg-cyan-950/40">
// //                   <Hash className="h-4 w-4 shrink-0" />
// //                   Cliente NÂ°
// //                 </div>

// //                 <div className="flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white/70 px-3 py-2 dark:border-cyan-900/70 dark:bg-cyan-950/40">
// //                   <MapPin className="h-4 w-4 shrink-0" />
// //                   Localidad/provincia
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // }

// // src/app/(dashboard)/cobrador/buscar-cliente/page.tsx

// import Link from "next/link";
// import { redirect } from "next/navigation";
// import {
//   AlertTriangle,
//   Eye,
//   FileSearch,
//   Filter,
//   Hash,
//   IdCard,
//   Info,
//   MapPin,
//   Phone,
//   Search,
//   UserRound,
//   Wifi,
// } from "lucide-react";
// import type { LucideIcon } from "lucide-react";
// import { PageShell } from "@/components/ui/PageShell";
// import { getCurrentUser } from "@/lib/current-user";
// import {
//   buscarClientesParaCobrador,
//   type BuscarClientesCobradorFiltros,
// } from "@/services/cobrador.service";
// import type { ClienteSafe } from "@/types/cliente.types";

// export const metadata = {
//   title: "Buscar cliente",
// };

// type BuscarClienteCobradorPageProps = {
//   searchParams?: {
//     q?: string;
//     nombre?: string;
//     apellido?: string;
//     dni?: string;
//     numeroCliente?: string;
//     localidad?: string;
//     provincia?: string;
//   };
// };

// function limpiarTexto(value?: string) {
//   return String(value || "").trim();
// }

// function limpiarDni(value?: string) {
//   return String(value || "")
//     .replace(/\D/g, "")
//     .slice(0, 12);
// }

// function normalizarFiltros(
//   searchParams?: BuscarClienteCobradorPageProps["searchParams"],
// ): BuscarClientesCobradorFiltros {
//   return {
//     q: limpiarTexto(searchParams?.q),
//     nombre: limpiarTexto(searchParams?.nombre),
//     apellido: limpiarTexto(searchParams?.apellido),
//     dni: limpiarDni(searchParams?.dni),
//     numeroCliente: limpiarTexto(searchParams?.numeroCliente).replace(/\D/g, ""),
//     localidad: limpiarTexto(searchParams?.localidad),
//     provincia: limpiarTexto(searchParams?.provincia),
//   };
// }

// function hayFiltros(filtros: BuscarClientesCobradorFiltros) {
//   return Boolean(
//     filtros.q ||
//       filtros.nombre ||
//       filtros.apellido ||
//       filtros.dni ||
//       filtros.numeroCliente ||
//       filtros.localidad ||
//       filtros.provincia,
//   );
// }

// function estadoClienteLabel(estado: string) {
//   if (estado === "activo") return "Activo";
//   if (estado === "suspendido") return "Suspendido";
//   return "Baja";
// }

// function estadoClienteClasses(estado: string) {
//   if (estado === "activo") {
//     return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
//   }

//   if (estado === "suspendido") {
//     return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
//   }

//   return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
// }

// function InputField({
//   label,
//   name,
//   defaultValue,
//   placeholder,
//   inputMode,
//   icon: Icon,
// }: {
//   label: string;
//   name: string;
//   defaultValue?: string;
//   placeholder: string;
//   inputMode?: "text" | "numeric";
//   icon: LucideIcon;
// }) {
//   return (
//     <div className="space-y-1.5">
//       <label
//         htmlFor={name}
//         className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400"
//       >
//         {label}
//       </label>

//       <div className="relative">
//         <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 dark:text-cyan-300" />

//         <input
//           id={name}
//           name={name}
//           type="text"
//           inputMode={inputMode || "text"}
//           defaultValue={defaultValue}
//           placeholder={placeholder}
//           className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-3 pl-10 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-500"
//         />
//       </div>
//     </div>
//   );
// }

// function InfoLine({
//   label,
//   value,
//   icon: Icon,
// }: {
//   label: string;
//   value?: string | number | null;
//   icon: LucideIcon;
// }) {
//   return (
//     <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
//       <Icon className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />

//       <div className="min-w-0">
//         <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
//           {label}
//         </p>

//         <p className="mt-0.5 truncate text-sm font-medium text-slate-950 dark:text-white">
//           {value || "-"}
//         </p>
//       </div>
//     </div>
//   );
// }

// function ClienteResultCard({ cliente }: { cliente: ClienteSafe }) {
//   const ubicacion = [cliente.localidad, cliente.provincia]
//     .filter(Boolean)
//     .join(" Â· ");

//   return (
//     <Link
//       href={`/cobrador/clientes/${cliente.id}`}
//       className="group block overflow-hidden rounded-[1.45rem] border border-slate-300 bg-white shadow-sm shadow-slate-200/70 transition hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-950/10 active:scale-[0.995] dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none dark:hover:border-cyan-800"
//     >
//       <div className="grid lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)_140px]">
//         <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/50 lg:border-b-0 lg:border-r">
//           <div className="flex min-w-0 items-start gap-3">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 ring-1 ring-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900/70">
//               <UserRound className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <div className="flex flex-wrap items-center gap-2">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-800 dark:text-cyan-300">
//                   Cliente
//                 </p>

//                 <span
//                   className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${estadoClienteClasses(
//                     cliente.estado,
//                   )}`}
//                 >
//                   {estadoClienteLabel(cliente.estado)}
//                 </span>
//               </div>

//               <h3 className="mt-1 truncate text-xl font-medium tracking-tight text-slate-950 dark:text-white">
//                 {cliente.apellido}, {cliente.nombre}
//               </h3>

//               <p className="mt-1 truncate text-xs leading-5 text-slate-600 dark:text-slate-400">
//                 {cliente.direccion || "Sin direcciÃ³n cargada"}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="p-3.5 lg:p-4">
//           <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
//             <InfoLine label="DNI" value={cliente.dni} icon={IdCard} />

//             <InfoLine
//               label="Cliente NÂ°"
//               value={cliente.numeroCliente}
//               icon={Hash}
//             />

//             <InfoLine
//               label="Localidad"
//               value={cliente.localidad || "-"}
//               icon={MapPin}
//             />

//             <InfoLine
//               label="TelÃ©fono"
//               value={cliente.telefono || "-"}
//               icon={Phone}
//             />
//           </div>

//           <div className="mt-3 grid gap-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
//             <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300">
//               <Wifi className="h-4 w-4 shrink-0" />
//               <span className="truncate">
//                 {cliente.plan?.nombre || "Sin plan"}
//               </span>
//             </div>

//             <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
//               <MapPin className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
//               <span className="truncate">{ubicacion || "Sin localidad"}</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center border-t border-slate-200 px-3.5 pb-3.5 dark:border-slate-800 lg:border-l lg:border-t-0 lg:p-4">
//           <div className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition group-hover:border-cyan-400 group-hover:bg-cyan-50 group-hover:text-cyan-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:group-hover:border-cyan-800 dark:group-hover:bg-cyan-950/30 dark:group-hover:text-cyan-300">
//             <Eye className="h-4 w-4" />
//             Ver ficha
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  AlertTriangle,
  Eye,
  FileSearch,
  Filter,
  Hash,
  IdCard,
  Info,
  MapPin,
  Phone,
  Search,
  UserRound,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/ui/PageShell";
import { getCurrentUser } from "@/lib/current-user";
import {
  buscarClientesParaCobrador,
  type BuscarClientesCobradorFiltros,
} from "@/services/cobrador.service";
import type { ClienteSafe } from "@/types/cliente.types";

export const metadata = {
  title: "Buscar cliente",
};

type BuscarClienteCobradorPageProps = {
  searchParams?: {
    q?: string;
    nombre?: string;
    apellido?: string;
    dni?: string;
    numeroCliente?: string;
    localidad?: string;
    provincia?: string;
  };
};

function limpiarTexto(value?: string) {
  return String(value || "").trim();
}

function limpiarDni(value?: string) {
  return String(value || "")
    .replace(/\D/g, "")
    .slice(0, 12);
}

function normalizarFiltros(
  searchParams?: BuscarClienteCobradorPageProps["searchParams"],
): BuscarClientesCobradorFiltros {
  return {
    q: limpiarTexto(searchParams?.q),
    nombre: limpiarTexto(searchParams?.nombre),
    apellido: limpiarTexto(searchParams?.apellido),
    dni: limpiarDni(searchParams?.dni),
    numeroCliente: limpiarTexto(searchParams?.numeroCliente).replace(/\D/g, ""),
    localidad: limpiarTexto(searchParams?.localidad),
    provincia: limpiarTexto(searchParams?.provincia),
  };
}

function hayFiltros(filtros: BuscarClientesCobradorFiltros) {
  return Boolean(
    filtros.q ||
      filtros.nombre ||
      filtros.apellido ||
      filtros.dni ||
      filtros.numeroCliente ||
      filtros.localidad ||
      filtros.provincia,
  );
}

function estadoClienteLabel(estado: string) {
  if (estado === "activo") return "Activo";
  if (estado === "suspendido") return "Suspendido";
  return "Baja";
}

function estadoClienteClasses(estado: string) {
  if (estado === "activo") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
  }

  if (estado === "suspendido") {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
  }

  return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
}

function InputField({
  label,
  name,
  defaultValue,
  placeholder,
  inputMode,
  icon: Icon,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder: string;
  inputMode?: "text" | "numeric";
  icon: LucideIcon;
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <label
        htmlFor={name}
        className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--overview-muted)]"
      >
        {label}
      </label>

      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--overview-blue-accent)]" />

        <input
          id={name}
          name={name}
          type="text"
          inputMode={inputMode || "text"}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="h-10 w-full min-w-0 rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-bg)] px-3 pl-10 text-[13px] text-[var(--overview-text)] outline-none transition placeholder:text-[var(--overview-muted)] focus:border-[var(--overview-blue)] focus:ring-2 focus:ring-[var(--overview-blue)]/15"
        />
      </div>
    </div>
  );
}

function InfoLine({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string | number | null;
  icon: LucideIcon;
}) {
  return (
    <div className="min-w-0 border-b border-[var(--overview-border)]/70 pb-2.5 xl:border-b-0 xl:border-r xl:pr-3 xl:last:border-r-0">
      <p className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--overview-muted)]">
        <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--overview-blue-accent)]" />
        {label}
      </p>

      <p className="mt-1 truncate text-[13px] font-medium leading-5 text-[var(--overview-text)] sm:text-[14px]">
        {value || "-"}
      </p>
    </div>
  );
}

function ClienteResultCard({ cliente }: { cliente: ClienteSafe }) {
  const ubicacion = [cliente.localidad, cliente.provincia]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/cobrador/clientes/${cliente.id}`}
      className="group block overflow-hidden rounded-[10px] border border-[var(--overview-border)] bg-[var(--overview-panel)] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[var(--overview-blue-accent)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--overview-blue)] focus-visible:ring-offset-2"
    >
      <div>
        <div className="flex min-w-0 items-center gap-2.5 border-b border-[var(--overview-border)] bg-[var(--overview-header)] px-2.5 py-2.5 sm:justify-between sm:px-4 sm:py-3">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-[9px] border border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)] shadow-sm sm:flex">
              <UserRound className="h-5 w-5" />
          </div>

          <h3 className="min-w-0 flex-1 truncate text-[14px] font-semibold tracking-tight text-[var(--overview-text)] group-hover:text-[var(--overview-blue)] sm:text-[16px]">
            {cliente.apellido}, {cliente.nombre}
          </h3>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--overview-border)] bg-[var(--overview-panel)] px-2 py-1 text-[9px] font-medium text-[var(--overview-muted)] sm:gap-1.5 sm:px-2.5 sm:text-[10px]">
              <Hash className="h-3 w-3 text-[var(--overview-blue-accent)] sm:h-3.5 sm:w-3.5" />
              <span className="sm:hidden">{cliente.numeroCliente || "-"}</span>
              <span className="hidden sm:inline">Cliente N° {cliente.numeroCliente || "-"}</span>
            </span>
            <span
              className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-medium sm:px-2.5 sm:text-[10px] ${estadoClienteClasses(
                cliente.estado,
              )}`}
            >
              {estadoClienteLabel(cliente.estado)}
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-6 xl:grid-cols-4 xl:gap-4">
            <InfoLine label="DNI" value={cliente.dni} icon={IdCard} />
            <InfoLine label="Teléfono" value={cliente.telefono} icon={Phone} />
            <InfoLine label="Ubicación" value={ubicacion} icon={MapPin} />
            <InfoLine label="Plan" value={cliente.plan?.nombre} icon={Wifi} />
          </div>

          <div className="mt-3 flex flex-col gap-3 border-t border-[var(--overview-border)] pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-2 text-[12px] text-[var(--overview-muted)]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--overview-blue-accent)]" />
              <span className="min-w-0">
                <span className="mr-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--overview-muted)]">
                  Dirección
                </span>
                <span className="text-[12px] leading-5 text-[var(--overview-text)]">
                  {cliente.direccion || "Sin dirección cargada"}
                </span>
              </span>
            </div>

            <div className="inline-flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-button)] px-3 text-[12px] font-medium text-[var(--overview-text)] transition group-hover:border-[var(--overview-blue)] group-hover:bg-[var(--overview-blue)] group-hover:text-white sm:w-auto sm:min-w-[120px]">
              <Eye className="h-4 w-4" />
              Ver ficha
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function BuscarClienteCobradorPage({
  searchParams,
}: BuscarClienteCobradorPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  const filtros = normalizarFiltros(searchParams);
  const busquedaRealizada = hayFiltros(filtros);
  const clientes = busquedaRealizada
    ? await buscarClientesParaCobrador(filtros)
    : [];

  return (
    <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
      <section className="w-full space-y-4 sm:space-y-5">
        <div className="overflow-hidden rounded-[10px] border border-[var(--overview-border)] bg-[var(--overview-panel)] shadow-sm">
          <div className="border-b border-[var(--overview-border)] bg-[var(--overview-header)] px-3 py-3 sm:px-5 sm:py-4">
            <div className="flex items-center justify-between gap-2 sm:items-start">
              <div className="flex min-w-0 items-center gap-2.5 sm:items-start sm:gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] border border-[var(--overview-border)] bg-[var(--overview-blue-tint)] text-[var(--overview-blue)] shadow-sm">
                  <FileSearch className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--overview-blue-accent)]">
                    Consulta informativa
                  </p>

                  <h1 className="mt-1 text-[19px] font-semibold tracking-tight text-[var(--overview-text)] sm:text-[22px]">
                    Buscar cliente
                  </h1>

                  <p className="mt-1 hidden max-w-3xl text-[12px] leading-5 text-[var(--overview-muted)] sm:block">
                    Buscá clientes para consultar su ficha. Para registrar un
                    pago, el circuito debe iniciar desde el dashboard con DNI
                    exacto.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1.5 text-[10px] font-semibold text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300 sm:gap-2 sm:px-3 sm:text-[11px]">
                <AlertTriangle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Sin pago directo
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-5">
            <form
              method="GET"
              action="/cobrador/buscar-cliente"
              className="space-y-3.5 sm:space-y-4"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_92px] gap-2 sm:grid-cols-[minmax(0,1fr)_140px]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--overview-muted)]" />

                  <input
                    name="q"
                    type="text"
                    defaultValue={filtros.q}
                    placeholder="Nombre, DNI, cliente o localidad"
                    className="h-10 w-full rounded-[8px] border border-[var(--overview-border)] bg-[var(--overview-bg)] px-3 pl-9 text-[13px] text-[var(--overview-text)] outline-none transition placeholder:text-[var(--overview-muted)] focus:border-[var(--overview-blue)] focus:ring-2 focus:ring-[var(--overview-blue)]/15 sm:h-11"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[8px] border border-[var(--overview-blue)] bg-[var(--overview-blue)] px-3 text-[12px] font-semibold text-white shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--overview-blue)] focus-visible:ring-offset-2 sm:h-11 sm:w-auto sm:px-5"
                >
                  <Search className="h-4 w-4" />
                  Buscar
                </button>
              </div>

              <details
                className="group overflow-hidden rounded-[9px] border border-[var(--overview-border)] bg-[var(--overview-panel)]"
                open={
                  Boolean(
                    filtros.nombre ||
                      filtros.apellido ||
                      filtros.dni ||
                      filtros.numeroCliente ||
                      filtros.localidad ||
                      filtros.provincia,
                  ) || undefined
                }
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-[12px] font-semibold text-[var(--overview-text)] outline-none transition hover:bg-[var(--overview-soft)] sm:px-4">
                  <span className="inline-flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[var(--overview-blue-accent)]" />
                    Búsqueda avanzada
                  </span>

                  <span className="text-[11px] font-normal text-[var(--overview-muted)] group-open:hidden">
                    Mostrar filtros
                  </span>

                  <span className="hidden text-[11px] font-normal text-[var(--overview-muted)] group-open:inline">
                    Ocultar filtros
                  </span>
                </summary>

                <div className="border-t border-[var(--overview-border)] bg-[var(--overview-panel)] p-2.5 sm:p-3">
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-3">
                    <InputField
                      label="Apellido"
                      name="apellido"
                      defaultValue={filtros.apellido}
                      placeholder="Ej: Barros"
                      icon={UserRound}
                    />

                    <InputField
                      label="Nombre"
                      name="nombre"
                      defaultValue={filtros.nombre}
                      placeholder="Ej: Juan"
                      icon={UserRound}
                    />

                    <InputField
                      label="DNI parcial"
                      name="dni"
                      defaultValue={filtros.dni}
                      placeholder="Últimos 3 o más"
                      inputMode="numeric"
                      icon={IdCard}
                    />

                    <InputField
                      label="Cliente N°"
                      name="numeroCliente"
                      defaultValue={filtros.numeroCliente}
                      placeholder="Ej: 102"
                      inputMode="numeric"
                      icon={Hash}
                    />

                    <InputField
                      label="Localidad"
                      name="localidad"
                      defaultValue={filtros.localidad}
                      placeholder="Ej: Capital"
                      icon={MapPin}
                    />

                    <InputField
                      label="Provincia"
                      name="provincia"
                      defaultValue={filtros.provincia}
                      placeholder="Ej: Catamarca"
                      icon={MapPin}
                    />
                  </div>
                </div>
              </details>

              <div className="flex flex-col gap-2.5 border-t border-[var(--overview-border)] pt-3 sm:flex-row sm:items-center sm:justify-between sm:pt-3.5">
                <div className="text-[10px] leading-4 text-[var(--overview-muted)]">
                  Para cobrar, usá el ingreso por DNI exacto desde el panel.
                </div>

                {busquedaRealizada ? (
                  <Link
                    href="/cobrador/buscar-cliente"
                    className="inline-flex h-9 w-full items-center justify-center rounded-[7px] border border-[var(--overview-border)] bg-[var(--overview-button)] px-4 text-[11px] font-medium text-[var(--overview-text)] transition hover:bg-[var(--overview-soft)] sm:w-auto"
                  >
                    Limpiar búsqueda
                  </Link>
                ) : null}
              </div>
            </form>
          </div>
        </div>

        {busquedaRealizada ? (
          <div className="overflow-hidden rounded-[10px] border border-[var(--overview-border)] bg-[var(--overview-panel)] shadow-sm">
            <div className="border-b border-[var(--overview-border)] bg-[var(--overview-header)] px-3 py-3.5 sm:px-5 sm:py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--overview-muted)]">
                    Resultados
                  </p>

                  <h2 className="mt-0.5 text-[14px] font-semibold text-[var(--overview-text)]">
                    {clientes.length === 1
                      ? "1 cliente encontrado"
                      : `${clientes.length} clientes encontrados`}
                  </h2>
                </div>

                  <div className="hidden w-fit items-center gap-2 rounded-[6px] border border-[var(--overview-border)] bg-[var(--overview-bg)] px-2.5 py-1.5 text-[11px] text-[var(--overview-muted)] sm:inline-flex">
                  <Info className="h-4 w-4 text-[var(--overview-blue-accent)]" />
                  Vista informativa
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              {clientes.length === 0 ? (
                <div className="flex min-h-24 items-center justify-center rounded-[9px] border border-dashed border-[var(--overview-border)] bg-[var(--overview-bg)] p-5 text-center text-[12px] text-[var(--overview-muted)]">
                  No se encontraron clientes con los filtros indicados.
                </div>
              ) : (
                <div className="grid gap-3">
                  {clientes.map((cliente) => (
                    <ClienteResultCard key={cliente.id} cliente={cliente} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </section>
    </PageShell>
  );
}

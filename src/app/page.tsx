// import Link from "next/link";
// import {
//   ArrowRight,
//   BadgeCheck,
//   Moon,
//   ShieldCheck,
//   Smartphone,
//   UserPlus,
// } from "lucide-react";
// import { ThemeToggle } from "@/components/layout/ThemeToggle";
// import { brandConfig } from "@/config/brand.config";

// const features = [
//   {
//     title: "Clientes y planes",
//     description:
//       "Gestión ordenada de clientes, planes contratados, estados y datos de servicio.",
//     icon: BadgeCheck,
//   },
//   {
//     title: "Cobros seguros",
//     description:
//       "Registro de pagos, comprobantes verificables, caja de cobradores y cierres controlados.",
//     icon: ShieldCheck,
//   },
//   {
//     title: "Mobile first",
//     description:
//       "Interfaz pensada para operar desde celulares, tablets, notebooks y escritorio.",
//     icon: Smartphone,
//   },
//   {
//     title: "Claro / oscuro",
//     description:
//       "Diseño moderno con soporte para modo claro y modo oscuro según preferencia.",
//     icon: Moon,
//   },
// ];

// export default function HomePage() {
//   return (
//     <main className="min-h-screen px-4 py-4 text-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
//       <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col">
//         <header className="flex items-center justify-between gap-3 py-2">
//           <div className="min-w-0">
//             <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
//               {brandConfig.ispName}
//             </p>

//             <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
//               {brandConfig.appName}
//             </h1>
//           </div>

//           <ThemeToggle />
//         </header>

//         <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
//           <div className="space-y-6">
//             <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-200">
//               Core de gestión ISP
//             </div>

//             <div className="space-y-4">
//               <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
//                 Plataforma moderna para administrar clientes, planes, cobros y
//                 operaciones.
//               </h2>

//               <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
//                 Un sistema preparado para proveedores de internet, con gestión
//                 de clientes, facturación, cobradores, comprobantes y control de
//                 caja desde una interfaz clara y segura.
//               </p>
//             </div>

//             <div className="flex flex-col gap-3 sm:flex-row">
//               <Link
//                 href="/login"
//                 className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-5 text-sm font-semibold text-cyan-800 shadow-sm transition hover:bg-cyan-100 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
//               >
//                 Iniciar sesión
//                 <ArrowRight className="h-4 w-4" />
//               </Link>

//               <Link
//                 href="/registro"
//                 className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
//               >
//                 <UserPlus className="h-4 w-4" />
//                 Crear cuenta
//               </Link>
//             </div>

//             <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
//               Si ya sos usuario del sistema, ingresá con tus credenciales. Si
//               todavía no tenés cuenta, podés registrarte y luego el
//               administrador podrá vincular tu usuario al cliente correspondiente.
//             </p>
//           </div>

//           <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-950/5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/10 sm:p-5">
//             <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/80 sm:p-5">
//               <div className="mb-5 flex items-center justify-between gap-3">
//                 <div>
//                   <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
//                     Estado del sistema
//                   </p>

//                   <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
//                     Plataforma disponible
//                   </h3>
//                 </div>

//                 <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
//                   Online
//                 </span>
//               </div>

//               <div className="grid gap-3">
//                 {features.map((feature) => {
//                   const Icon = feature.icon;

//                   return (
//                     <div
//                       key={feature.title}
//                       className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/70"
//                     >
//                       <div className="flex gap-3">
//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
//                           <Icon className="h-5 w-5" />
//                         </div>

//                         <div>
//                           <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
//                             {feature.title}
//                           </h4>

//                           <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
//                             {feature.description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }


// // src/app/page.tsx

// import Link from "next/link";
// import {
//   ArrowRight,
//   BadgeCheck,
//   CheckCircle2,
//   Moon,
//   ShieldCheck,
//   Smartphone,
//   UserPlus,
//   Wifi,
// } from "lucide-react";
// import { ThemeToggle } from "@/components/layout/ThemeToggle";
// import { brandConfig } from "@/config/brand.config";

// const features = [
//   {
//     title: "Clientes y planes",
//     description:
//       "Gestión ordenada de clientes, planes contratados, estados y datos de servicio.",
//     icon: BadgeCheck,
//   },
//   {
//     title: "Cobros seguros",
//     description:
//       "Registro de pagos, comprobantes verificables, caja de cobradores y cierres controlados.",
//     icon: ShieldCheck,
//   },
//   {
//     title: "Mobile first",
//     description:
//       "Interfaz pensada para celulares, tablets, notebooks y escritorio.",
//     icon: Smartphone,
//   },
//   {
//     title: "Claro / oscuro",
//     description: "Diseño moderno con soporte para modo claro y modo oscuro.",
//     icon: Moon,
//   },
// ];

// const highlights = [
//   "Clientes",
//   "Planes",
//   "Cobros",
//   "Facturación",
//   "Caja",
//   "Comprobantes",
// ];

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
//       <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
//         <header className="flex items-center justify-between gap-3 py-2 lg:rounded-[1.5rem] lg:border lg:border-slate-200 lg:bg-white/80 lg:px-5 lg:py-4 lg:shadow-sm lg:shadow-slate-300/50 lg:backdrop-blur dark:lg:border-slate-800 dark:lg:bg-slate-900/70 dark:lg:shadow-none">
//           <div className="flex min-w-0 items-center gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-sm shadow-cyan-950/20 dark:bg-cyan-500 dark:text-cyan-950">
//               <Wifi className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
//                 {brandConfig.ispName}
//               </p>

//               <h1 className="truncate text-base font-semibold tracking-tight text-slate-950 dark:text-white sm:text-lg">
//                 {brandConfig.appName}
//               </h1>
//             </div>
//           </div>

//           <ThemeToggle />
//         </header>

//         <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
//           <div className="space-y-6">
//             <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-800 shadow-sm dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-200">
//               <CheckCircle2 className="h-3.5 w-3.5" />
//               Core de gestión ISP
//             </div>

//             <div className="space-y-4">
//               <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
//                 Plataforma moderna para administrar clientes, planes, cobros y
//                 operaciones.
//               </h2>

//               <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base lg:text-lg">
//                 Un sistema preparado para proveedores de internet, con gestión
//                 de clientes, facturación, cobradores, comprobantes y control de
//                 caja desde una interfaz clara y segura.
//               </p>
//             </div>

//             <div className="flex flex-col gap-3 sm:flex-row">
//               <Link
//                 href="/login"
//                 className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//               >
//                 Iniciar sesión
//                 <ArrowRight className="h-4 w-4" />
//               </Link>

//               <Link
//                 href="/registro"
//                 className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
//               >
//                 <UserPlus className="h-4 w-4" />
//                 Crear cuenta
//               </Link>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {highlights.map((item) => (
//                 <span
//                   key={item}
//                   className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
//                 >
//                   {item}
//                 </span>
//               ))}
//             </div>

//             <p className="max-w-xl text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm sm:leading-6">
//               Si ya sos usuario del sistema, ingresá con tus credenciales. Si
//               todavía no tenés cuenta, podés registrarte y luego el
//               administrador podrá vincular tu usuario al cliente correspondiente.
//             </p>
//           </div>

//           <div className="lg:rounded-[1.7rem] lg:border lg:border-slate-200 lg:bg-white/80 lg:p-4 lg:shadow-xl lg:shadow-slate-300/40 dark:lg:border-slate-800 dark:lg:bg-slate-900/70 dark:lg:shadow-slate-950/40">
//             <div className="mb-4 flex items-start justify-between gap-3 lg:rounded-[1.35rem] lg:border lg:border-slate-200 lg:bg-slate-50 lg:p-4 dark:lg:border-slate-800 dark:lg:bg-slate-950/50">
//               <div className="min-w-0">
//                 <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
//                   Estado del sistema
//                 </p>

//                 <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white sm:text-xl">
//                   Plataforma disponible
//                 </h3>

//                 <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
//                   Acceso operativo para usuarios registrados.
//                 </p>
//               </div>

//               <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
//                 Online
//               </span>
//             </div>

//             <div className="grid gap-3">
//               {features.map((feature) => {
//                 const Icon = feature.icon;

//                 return (
//                   <div
//                     key={feature.title}
//                     className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50/40 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/20 sm:p-4"
//                   >
//                     <div className="flex gap-3">
//                       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                         <Icon className="h-5 w-5" />
//                       </div>

//                       <div className="min-w-0">
//                         <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
//                           {feature.title}
//                         </h4>

//                         <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400 sm:text-sm sm:leading-6">
//                           {feature.description}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50 px-3 py-3 text-xs leading-5 text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200">
//               Sistema preparado para operar desde el panel administrador,
//               cobrador y cliente, con permisos según el rol del usuario.
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }


// // src/app/page.tsx

// import Link from "next/link";
// import {
//   ArrowRight,
//   BadgeCheck,
//   CheckCircle2,
//   CreditCard,
//   Moon,
//   ShieldCheck,
//   Smartphone,
//   UserPlus,
//   UsersRound,
//   Wifi,
// } from "lucide-react";
// import { ThemeToggle } from "@/components/layout/ThemeToggle";
// import { brandConfig } from "@/config/brand.config";

// const features = [
//   {
//     title: "Clientes",
//     description: "Gestión de clientes, estados y datos del servicio.",
//     icon: UsersRound,
//   },
//   {
//     title: "Planes",
//     description: "Planes comerciales asociados a cada cliente.",
//     icon: Wifi,
//   },
//   {
//     title: "Cobros",
//     description: "Pagos, comprobantes y caja de cobradores.",
//     icon: CreditCard,
//   },
//   {
//     title: "Seguridad",
//     description: "Acceso por roles y operaciones controladas.",
//     icon: ShieldCheck,
//   },
// ];

// export default function HomePage() {
//   return (
//     <main className="relative min-h-screen overflow-hidden bg-slate-100 px-4 py-4 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
//         <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />
//       </div>

//       <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col">
//         <header className="flex items-center justify-between gap-3 py-2">
//           <Link href="/" className="flex min-w-0 items-center gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-950/10 dark:bg-cyan-500 dark:text-cyan-950">
//               <Wifi className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
//                 {brandConfig.ispName}
//               </p>

//               <h1 className="truncate text-lg font-semibold tracking-tight text-slate-950 dark:text-white sm:text-xl">
//                 {brandConfig.appName}
//               </h1>
//             </div>
//           </Link>

//           <ThemeToggle />
//         </header>

//         <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1fr_420px] lg:py-10">
//           <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
//             <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-800 shadow-sm dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-200">
//               <CheckCircle2 className="h-3.5 w-3.5" />
//               Core de gestión ISP
//             </div>

//             <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
//               Administración simple para proveedores de internet.
//             </h2>

//             <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base lg:mx-0">
//               Gestioná clientes, planes, cobros, facturación y caja de
//               cobradores desde una plataforma clara, moderna y segura.
//             </p>

//             <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
//               <Link
//                 href="/login"
//                 className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
//               >
//                 Iniciar sesión
//                 <ArrowRight className="h-4 w-4" />
//               </Link>

//               <Link
//                 href="/registro"
//                 className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
//               >
//                 <UserPlus className="h-4 w-4" />
//                 Crear cuenta
//               </Link>
//             </div>

//             <p className="mx-auto mt-5 max-w-lg text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm sm:leading-6 lg:mx-0">
//               Si ya sos usuario, ingresá con tus credenciales. Si todavía no
//               tenés cuenta, podés registrarte y luego el administrador podrá
//               vincular tu usuario.
//             </p>
//           </div>

//           <div className="mx-auto w-full max-w-md">
//             <div className="rounded-[1.7rem] border border-slate-200 bg-white/85 p-4 shadow-xl shadow-slate-300/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-slate-950/40 sm:p-5">
//               <div className="mb-4 flex items-start justify-between gap-3">
//                 <div>
//                   <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
//                     Plataforma
//                   </p>

//                   <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
//                     Disponible
//                   </h3>
//                 </div>

//                 <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
//                   Online
//                 </span>
//               </div>

//               <div className="grid gap-3">
//                 {features.map((feature) => {
//                   const Icon = feature.icon;

//                   return (
//                     <div
//                       key={feature.title}
//                       className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50"
//                     >
//                       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
//                         <Icon className="h-5 w-5" />
//                       </div>

//                       <div className="min-w-0">
//                         <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
//                           {feature.title}
//                         </h4>

//                         <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                           {feature.description}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 p-2 text-[11px] font-medium text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200">
//                 <span className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/70 px-2 py-2 dark:bg-slate-950/40">
//                   <BadgeCheck className="h-3.5 w-3.5" />
//                   Admin
//                 </span>

//                 <span className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/70 px-2 py-2 dark:bg-slate-950/40">
//                   <CreditCard className="h-3.5 w-3.5" />
//                   Cobrador
//                 </span>

//                 <span className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/70 px-2 py-2 dark:bg-slate-950/40">
//                   <Smartphone className="h-3.5 w-3.5" />
//                   Cliente
//                 </span>
//               </div>

//               <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
//                 <span className="inline-flex items-center gap-2">
//                   <Moon className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
//                   Modo claro / oscuro
//                 </span>

//                 <span className="font-medium text-slate-900 dark:text-white">
//                   Activo
//                 </span>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// // src/app/page.tsx

// import Link from "next/link";
// import {
//   ArrowRight,
//   BadgeCheck,
//   CreditCard,
//   FileCheck2,
//   LockKeyhole,
//   Moon,
//   ShieldCheck,
//   Smartphone,
//   UserPlus,
//   UsersRound,
//   Wifi,
// } from "lucide-react";
// import { ThemeToggle } from "@/components/layout/ThemeToggle";
// import { brandConfig } from "@/config/brand.config";

// const modules = [
//   {
//     title: "Clientes",
//     description: "Altas, datos de servicio, estados y cuenta corriente.",
//     icon: UsersRound,
//   },
//   {
//     title: "Cobros",
//     description: "Pagos, comprobantes verificables y movimientos.",
//     icon: CreditCard,
//   },
//   {
//     title: "Caja",
//     description: "Control de cobradores, cierres y códigos de validación.",
//     icon: LockKeyhole,
//   },
//   {
//     title: "Facturación",
//     description: "Facturas, notas y documentación asociada al cliente.",
//     icon: FileCheck2,
//   },
// ];

// const roleItems = ["Administrador", "Cobrador", "Cliente"];

// export default function HomePage() {
//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#eef6ff] px-4 py-4 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-sky-300/35 blur-3xl dark:bg-cyan-500/10" />
//         <div className="absolute right-[-8rem] top-1/3 h-96 w-96 rounded-full bg-cyan-200/55 blur-3xl dark:bg-sky-500/10" />
//         <div className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-indigo-200/45 blur-3xl dark:bg-emerald-500/10" />
//         <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.70),rgba(238,246,255,0.25))] dark:bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.10),transparent_42%)]" />
//       </div>

//       <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl flex-col">
//         <header className="flex items-center justify-between gap-3 rounded-[1.35rem] border border-white/70 bg-white/55 px-3 py-3 shadow-sm shadow-slate-300/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/45 dark:shadow-none sm:px-4">
//           <Link href="/" className="flex min-w-0 items-center gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-950/10 dark:bg-cyan-400 dark:text-slate-950">
//               <Wifi className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] uppercase tracking-[0.24em] text-sky-700 dark:text-cyan-300">
//                 {brandConfig.ispName}
//               </p>
//               <h1 className="truncate text-base tracking-tight text-slate-950 dark:text-white sm:text-lg">
//                 {brandConfig.appName}
//               </h1>
//             </div>
//           </Link>

//           <ThemeToggle />
//         </header>

//         <section className="grid flex-1 items-center gap-8 py-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(390px,0.75fr)] lg:gap-10 lg:py-10 xl:gap-14">
//           <div className="mx-auto w-full max-w-3xl text-center lg:mx-0 lg:text-left">
//             <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-3 py-1.5 text-xs text-sky-800 shadow-sm backdrop-blur dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200">
//               <BadgeCheck className="h-3.5 w-3.5" />
//               Sistema core para proveedores de internet
//             </div>

//             <h2 className="mt-6 text-4xl tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl xl:text-7xl">
//               Gestión clara para clientes, cobros y operaciones ISP.
//             </h2>

//             <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base lg:mx-0">
//               Una plataforma preparada para administrar clientes, planes,
//               cobranzas, comprobantes y caja de cobradores desde una interfaz
//               simple, segura y adaptable a celulares, notebooks y escritorio.
//             </p>

//             <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
//               <Link
//                 href="/login"
//                 className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 text-sm text-white shadow-lg shadow-sky-950/15 transition hover:bg-sky-600 active:scale-[0.99] dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
//               >
//                 Iniciar sesión
//                 <ArrowRight className="h-4 w-4" />
//               </Link>

//               <Link
//                 href="/registro"
//                 className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-5 text-sm text-slate-800 shadow-sm transition hover:bg-white active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
//               >
//                 <UserPlus className="h-4 w-4" />
//                 Crear cuenta
//               </Link>
//             </div>

//             <div className="mt-7 grid gap-2 text-left sm:grid-cols-3">
//               {roleItems.map((item) => (
//                 <div
//                   key={item}
//                   className="rounded-2xl border border-white/75 bg-white/55 px-3 py-3 text-sm text-slate-700 shadow-sm shadow-slate-300/30 backdrop-blur dark:border-slate-800 dark:bg-slate-900/45 dark:text-slate-300 dark:shadow-none"
//                 >
//                   <div className="flex items-center gap-2">
//                     <ShieldCheck className="h-4 w-4 text-sky-600 dark:text-cyan-300" />
//                     <span>{item}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mx-auto w-full max-w-md lg:max-w-none">
//             <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-2xl shadow-slate-400/20 backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-900/60 dark:shadow-black/30">
//               <div className="border-b border-slate-200/80 bg-white/65 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/35">
//                 <div className="flex items-center justify-between gap-3">
//                   <div>
//                     <p className="text-[10px] uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">
//                       Panel operativo
//                     </p>
//                     <h3 className="mt-1 text-xl tracking-tight text-slate-950 dark:text-white">
//                       Plataforma disponible
//                     </h3>
//                   </div>

//                   <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
//                     Online
//                   </span>
//                 </div>
//               </div>

//               <div className="grid gap-3 p-4 sm:p-5">
//                 {modules.map((module) => {
//                   const Icon = module.icon;

//                   return (
//                     <div
//                       key={module.title}
//                       className="group rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/65 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/20"
//                     >
//                       <div className="flex gap-3">
//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900/70">
//                           <Icon className="h-5 w-5" />
//                         </div>

//                         <div className="min-w-0">
//                           <h4 className="text-sm text-slate-950 dark:text-white">
//                             {module.title}
//                           </h4>
//                           <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                             {module.description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}

//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="rounded-2xl border border-sky-200 bg-sky-50 px-3 py-3 text-xs leading-5 text-sky-800 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200">
//                     <Smartphone className="mb-2 h-4 w-4" />
//                     Vista cuidada para celulares.
//                   </div>

//                   <div className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-3 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-950/45 dark:text-slate-400">
//                     <Moon className="mb-2 h-4 w-4 text-sky-700 dark:text-cyan-300" />
//                     Modo claro y oscuro conservado.
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// src/app/page.tsx

import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Headset,
  LockKeyhole,
  ShieldCheck,
  UserPlus,
  UsersRound,
  Wifi,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { brandConfig } from "@/config/brand.config";

const accessAreas = [
  {
    title: "Administración",
    description: "Gestión interna de clientes, servicios y operación general.",
    icon: ShieldCheck,
  },
  {
    title: "Cobranzas",
    description: "Registro de pagos, caja y movimientos autorizados.",
    icon: Banknote,
  },
  {
    title: "Clientes",
    description: "Acceso privado para consultar información vinculada al servicio.",
    icon: UsersRound,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-4 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-3 rounded-[1.35rem] border border-slate-200 bg-white px-3 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-white dark:bg-cyan-400 dark:text-slate-950">
              <Wifi className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">
                {brandConfig.ispName}
              </p>
              <h1 className="truncate text-base tracking-tight text-slate-950 dark:text-white sm:text-lg">
                {brandConfig.appName}
              </h1>
            </div>
          </Link>

          <ThemeToggle />
        </header>

        <section className="flex flex-1 items-center py-7 sm:py-8 lg:py-10">
          <div className="w-full">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/25">
              <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="p-5 sm:p-7 lg:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs text-sky-800 dark:border-cyan-900/70 dark:bg-cyan-950/35 dark:text-cyan-200">
                    <LockKeyhole className="h-3.5 w-3.5" />
                    Portal privado de acceso
                  </div>

                  <h2 className="mt-6 max-w-3xl text-4xl tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
                    Gestión interna para proveedores de internet.
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                    Plataforma privada para administrar la operación del ISP
                    desde accesos separados por rol. El ingreso está reservado
                    exclusivamente a usuarios autorizados.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/login"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 text-sm text-white shadow-sm transition hover:bg-sky-600 active:scale-[0.99] dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                    >
                      Iniciar sesión
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/registro"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 text-sm text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <UserPlus className="h-4 w-4" />
                      Solicitar acceso
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {accessAreas.map((area) => {
                      const Icon = area.icon;

                      return (
                        <div
                          key={area.title}
                          className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/65"
                        >
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sky-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-cyan-300 dark:ring-slate-800">
                            <Icon className="h-5 w-5" />
                          </div>

                          <h3 className="text-sm text-slate-950 dark:text-white">
                            {area.title}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                            {area.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <aside className="border-t border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
                  <div className="flex h-full flex-col justify-between gap-7">
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500 text-white dark:bg-cyan-400 dark:text-slate-950">
                        <Wifi className="h-6 w-6" />
                      </div>

                      <h3 className="mt-5 text-2xl tracking-tight text-slate-950 dark:text-white">
                        Acceso seguro al sistema
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        Esta landing no expone información operativa, datos de
                        clientes, importes, cajas ni movimientos internos.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                            <ShieldCheck className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-sm text-slate-950 dark:text-white">
                              Información protegida
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                              Los módulos internos quedan disponibles solo
                              después de iniciar sesión.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                            <Headset className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-sm text-slate-950 dark:text-white">
                              Uso operativo
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                              Pensado para administración, cobranza y consulta
                              privada de clientes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-slate-500 dark:text-slate-500">
              Sistema privado. El acceso no autorizado a información interna no
              está permitido.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
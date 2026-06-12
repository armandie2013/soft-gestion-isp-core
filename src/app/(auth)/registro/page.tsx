// // src/app/(auth)/registro/page.tsx

// import Link from "next/link";
// import {
//   BadgeCheck,
//   Fingerprint,
//   KeyRound,
//   ShieldCheck,
//   UserRound,
//   Wifi,
// } from "lucide-react";
// import { RegistroForm } from "@/components/forms/RegistroForm";
// import { ThemeToggle } from "@/components/layout/ThemeToggle";
// import { brandConfig } from "@/config/brand.config";

// export const metadata = {
//   title: "Registro",
// };

// export default function RegistroPage() {
//   return (
//     <main className="relative min-h-screen overflow-hidden bg-slate-100 px-4 py-4 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
//         <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_35%)]" />
//       </div>

//       <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col">
//         <header className="flex items-center justify-between gap-3 py-2">
//           <Link href="/" className="flex min-w-0 items-center gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-600 text-white shadow-lg shadow-cyan-950/10 dark:border-cyan-400/20 dark:bg-cyan-500 dark:text-cyan-950">
//               <Wifi className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
//                 {brandConfig.ispName}
//               </p>
//               <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
//                 {brandConfig.appName}
//               </h1>
//             </div>
//           </Link>

//           <ThemeToggle />
//         </header>

//         <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
//           <div className="hidden lg:block">
//             <div className="flex h-auto max-w-2xl flex-col justify-between overflow-hidden rounded-[2rem] border border-white/70 bg-white/45 p-6 shadow-2xl shadow-slate-950/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/35 dark:shadow-cyan-950/10 lg:h-[560px]">
//               <div>
//                 <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-200">
//                   Registro de usuario
//                 </div>

//                 <div className="mt-5 space-y-3">
//                   <h2 className="max-w-2xl text-[2.55rem] font-semibold leading-[1.05] tracking-tight text-slate-950 dark:text-white">
//                     Creá tu acceso al sistema de gestión.
//                   </h2>

//                   <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
//                     Registrá tus datos personales para crear tu cuenta. Luego el
//                     administrador podrá asignar el rol correspondiente y
//                     habilitar los accesos según corresponda.
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-5 grid max-w-xl grid-cols-2 gap-3">
//                 <div className="rounded-2xl border border-slate-200 bg-white/75 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
//                   <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300">
//                     <UserRound className="h-4 w-4" />
//                   </div>
//                   <p className="text-sm font-semibold text-slate-950 dark:text-white">
//                     Usuario
//                   </p>
//                   <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                     Datos básicos de identificación.
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-slate-200 bg-white/75 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
//                   <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
//                     <Fingerprint className="h-4 w-4" />
//                   </div>
//                   <p className="text-sm font-semibold text-slate-950 dark:text-white">
//                     DNI
//                   </p>
//                   <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                     Identificador único del usuario.
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-slate-200 bg-white/75 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
//                   <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
//                     <ShieldCheck className="h-4 w-4" />
//                   </div>
//                   <p className="text-sm font-semibold text-slate-950 dark:text-white">
//                     Seguridad
//                   </p>
//                   <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                     Contraseña personal protegida.
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-slate-200 bg-white/75 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
//                   <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
//                     <BadgeCheck className="h-4 w-4" />
//                   </div>
//                   <p className="text-sm font-semibold text-slate-950 dark:text-white">
//                     Acceso
//                   </p>
//                   <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
//                     Ingreso según rol asignado.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mx-auto w-full max-w-md">
//             <div className="flex h-auto flex-col justify-center rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-950/75 dark:shadow-cyan-950/10 sm:p-6 lg:h-[560px]">
//               <div>
//                 <div className="mb-4">
//                   <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-300">
//                     <KeyRound className="h-5 w-5" />
//                   </div>

//                   <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
//                     Registro
//                   </p>

//                   <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
//                     Crear cuenta
//                   </h2>

//                   <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
//                     Completá tus datos para solicitar el acceso al sistema.
//                   </p>
//                 </div>

//                 <RegistroForm />

//                 <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
//                   ¿Ya tenés cuenta?{" "}
//                   <Link
//                     href="/login"
//                     className="font-semibold text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
//                   >
//                     Iniciar sesión
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// src/app/(auth)/registro/page.tsx

import Link from "next/link";
import {
  KeyRound,
  ShieldCheck,
  UserCheck,
  Wifi,
} from "lucide-react";
import { RegistroForm } from "@/components/forms/RegistroForm";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { brandConfig } from "@/config/brand.config";

export const metadata = {
  title: "Registro",
};

export default function RegistroPage() {
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
          <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/25 lg:grid-cols-[minmax(0,1fr)_520px]">
            <div className="hidden bg-slate-50 p-8 dark:bg-slate-950/70 lg:block">
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-500 text-white dark:bg-cyan-400 dark:text-slate-950">
                    <UserCheck className="h-7 w-7" />
                  </div>

                  <h2 className="mt-6 max-w-xl text-5xl tracking-tight text-slate-950 dark:text-white">
                    Registro de usuario.
                  </h2>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-400">
                    Completá tus datos para crear una cuenta de acceso. Luego el
                    administrador podrá vincular el usuario al cliente o asignar
                    el rol correspondiente.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                      <ShieldCheck className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm text-slate-950 dark:text-white">
                        Acceso controlado
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                        El registro no habilita funciones internas por sí solo.
                        Los permisos dependen del rol asignado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 lg:p-8">
              <div className="mb-5">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-50 text-sky-700 ring-1 ring-sky-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900/60">
                  <KeyRound className="h-6 w-6" />
                </div>

                <p className="text-[10px] uppercase tracking-[0.22em] text-sky-700 dark:text-cyan-300">
                  Registro
                </p>

                <h2 className="mt-2 text-3xl tracking-tight text-slate-950 dark:text-white">
                  Crear cuenta
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Completá tus datos para solicitar el acceso al sistema.
                </p>
              </div>

              <RegistroForm />

              <Link
                href="/login"
                className="mt-5 block rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm text-slate-600 transition hover:border-sky-200 hover:bg-white hover:text-slate-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400 dark:hover:border-cyan-900/70 dark:hover:bg-slate-950 dark:hover:text-slate-200"
              >
                ¿Ya tenés cuenta?{" "}
                <span className="font-semibold text-sky-700 dark:text-cyan-300">
                  Iniciá sesión
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
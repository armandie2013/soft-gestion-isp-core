// src/app/(auth)/login/page.tsx

import Link from "next/link";
import {
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  Users,
  Wifi,
} from "lucide-react";
import { LoginForm } from "@/components/forms/LoginForm";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { brandConfig } from "@/config/brand.config";

export const metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-100 px-4 py-4 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_35%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-3 py-2">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-600 text-white shadow-lg shadow-cyan-950/10 dark:border-cyan-400/20 dark:bg-cyan-500 dark:text-cyan-950">
              <Wifi className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
                {brandConfig.ispName}
              </p>
              <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
                {brandConfig.appName}
              </h1>
            </div>
          </Link>

          <ThemeToggle />
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
          <div className="hidden lg:block">
            <div className="flex h-auto max-w-2xl flex-col justify-between rounded-[2rem] border border-white/70 bg-white/45 p-6 shadow-2xl shadow-slate-950/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/35 dark:shadow-cyan-950/10 lg:h-[560px]">
              <div>
                <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-200">
                  Acceso seguro al sistema
                </div>

                <div className="mt-6 space-y-4">
                  <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white xl:text-5xl">
                    Gestión ISP simple, moderna y controlada.
                  </h2>

                  <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 xl:text-base">
                    Ingresá al panel para administrar clientes, planes,
                    cobranzas, usuarios, cajas y movimientos según el rol de
                    cada usuario.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid max-w-xl grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300">
                    <Users className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    Clientes
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    Datos, planes e historial financiero.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    Cobranzas
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    Pagos, facturas, caja y retiros.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    Roles
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    Admin, cobrador y cliente.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    Control
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    Accesos y operaciones protegidas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="flex h-auto flex-col justify-center rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-950/75 dark:shadow-cyan-950/10 sm:p-6 lg:h-[560px]">
              <div>
                <div className="mb-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-300">
                    <Wifi className="h-5 w-5" />
                  </div>

                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
                    Login
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    Iniciar sesión
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Ingresá tus credenciales para acceder al panel
                    correspondiente.
                  </p>
                </div>

                <LoginForm />

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
                  ¿No tenés cuenta?{" "}
                  <Link
                    href="/registro"
                    className="font-semibold text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
                  >
                    Registrarse
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
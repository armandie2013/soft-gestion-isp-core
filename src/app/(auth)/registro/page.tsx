import Link from "next/link";
import { Wifi } from "lucide-react";
import { RegistroForm } from "@/components/forms/RegistroForm";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { brandConfig } from "@/config/brand.config";

export const metadata = {
  title: "Registro",
};

export default function RegistroPage() {
  return (
    <main className="min-h-screen px-4 py-4 text-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-3 py-2">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-950/10 dark:bg-cyan-500 dark:text-cyan-950">
              <Wifi className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
                {brandConfig.ispName}
              </p>
              <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
                {brandConfig.appName}
              </h1>
            </div>
          </Link>

          <ThemeToggle />
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1fr_0.9fr] lg:py-12">
          <div className="hidden space-y-5 lg:block">
            <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-200">
              Registro de usuario
            </div>

            <h2 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Creá tu acceso al sistema.
            </h2>

            <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              El usuario se registra con su propia contraseña. Luego el administrador
              podrá vincularlo a un cliente real del sistema si corresponde.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-2xl shadow-slate-950/5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/75 dark:shadow-cyan-950/10 sm:p-6">
              <div className="mb-6 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
                  Registro
                </p>

                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  Crear cuenta
                </h2>

                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Ingresá tus datos para crear tu usuario.
                </p>
              </div>

              <RegistroForm />

              <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
                ¿Ya tenés cuenta?{" "}
                <Link href="/login" className="font-semibold text-cyan-700 dark:text-cyan-300">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
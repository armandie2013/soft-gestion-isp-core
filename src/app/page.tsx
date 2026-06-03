import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Moon,
  ShieldCheck,
  Smartphone,
  UserPlus,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { brandConfig } from "@/config/brand.config";

const features = [
  {
    title: "Clientes y planes",
    description:
      "Gestión ordenada de clientes, planes contratados, estados y datos de servicio.",
    icon: BadgeCheck,
  },
  {
    title: "Cobros seguros",
    description:
      "Registro de pagos, comprobantes verificables, caja de cobradores y cierres controlados.",
    icon: ShieldCheck,
  },
  {
    title: "Mobile first",
    description:
      "Interfaz pensada para operar desde celulares, tablets, notebooks y escritorio.",
    icon: Smartphone,
  },
  {
    title: "Claro / oscuro",
    description:
      "Diseño moderno con soporte para modo claro y modo oscuro según preferencia.",
    icon: Moon,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-4 text-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-3 py-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
              {brandConfig.ispName}
            </p>

            <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
              {brandConfig.appName}
            </h1>
          </div>

          <ThemeToggle />
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-200">
              Core de gestión ISP
            </div>

            <div className="space-y-4">
              <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
                Plataforma moderna para administrar clientes, planes, cobros y
                operaciones.
              </h2>

              <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                Un sistema preparado para proveedores de internet, con gestión
                de clientes, facturación, cobradores, comprobantes y control de
                caja desde una interfaz clara y segura.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-5 text-sm font-semibold text-cyan-800 shadow-sm transition hover:bg-cyan-100 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
              >
                Iniciar sesión
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/registro"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <UserPlus className="h-4 w-4" />
                Crear cuenta
              </Link>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Si ya sos usuario del sistema, ingresá con tus credenciales. Si
              todavía no tenés cuenta, podés registrarte y luego el
              administrador podrá vincular tu usuario al cliente correspondiente.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-950/5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/10 sm:p-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/80 sm:p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Estado del sistema
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
                    Plataforma disponible
                  </h3>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Online
                </span>
              </div>

              <div className="grid gap-3">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/70"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
                            {feature.title}
                          </h4>

                          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
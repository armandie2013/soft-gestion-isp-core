import { redirect } from "next/navigation";
import {
  CreditCard,
  ReceiptText,
  ShieldCheck,
  UserRound,
  UsersRound,
  Wifi,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";

export const metadata = {
  title: "Panel administrador",
};

const cards = [
  {
    title: "Usuarios",
    description: "Administración de accesos, roles y estado de cuentas.",
    value: "Base",
    icon: UsersRound,
  },
  {
    title: "Clientes",
    description: "Gestión de clientes, datos personales y plan contratado.",
    value: "Módulo",
    icon: UserRound,
  },
  {
    title: "Planes",
    description: "Configuración de planes comerciales para el ISP.",
    value: "ISP",
    icon: Wifi,
  },
  {
    title: "Cobranzas",
    description: "Control de cobros, movimientos, retiros y caja.",
    value: "Admin",
    icon: CreditCard,
  },
];

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/50 dark:text-cyan-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              Administrador
            </div>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Panel principal
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Desde acá vamos a centralizar la gestión del ISP: usuarios, clientes,
              planes, cobros, retiros y configuración general del sistema.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/70">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Sesión
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {card.value}
                </span>
              </div>

              <h2 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">
                {card.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <ReceiptText className="h-5 w-5 text-cyan-700 dark:text-cyan-300" />
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Próximos pasos
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            "Crear módulo de usuarios",
            "Crear módulo de planes",
            "Crear módulo de clientes",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { redirect } from "next/navigation";
import { CreditCard, ReceiptText, Search, WalletCards } from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";

export const metadata = {
  title: "Panel cobrador",
};

const cards = [
  {
    title: "Buscar cliente",
    description: "Consultar cliente por DNI para revisar estado y registrar cobros.",
    icon: Search,
  },
  {
    title: "Registrar cobro",
    description: "Seleccionar facturas pendientes y generar recibo.",
    icon: CreditCard,
  },
  {
    title: "Mis cobros",
    description: "Ver movimientos y recaudación acumulada.",
    icon: ReceiptText,
  },
  {
    title: "Retiros",
    description: "Validar códigos de retiro generados por administración.",
    icon: WalletCards,
  },
];

export default async function CobradorPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
          Cobrador
        </p>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          Panel de cobranza
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Desde este panel vamos a permitir buscar clientes, registrar pagos,
          ver recaudación y gestionar retiros.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <Icon className="h-5 w-5" />
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
    </section>
  );
}
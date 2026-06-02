import Link from "next/link";
import { redirect } from "next/navigation";
import { CreditCard, Search, UserRound } from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { buscarClienteParaCobradorPorDni } from "@/services/cobrador.service";

export const metadata = {
  title: "Buscar cliente",
};

type BuscarClienteCobradorPageProps = {
  searchParams?: {
    dni?: string;
  };
};

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

  const dniBuscado = String(searchParams?.dni || "")
    .replace(/\D/g, "")
    .slice(0, 12);

  const cliente = dniBuscado
    ? await buscarClienteParaCobradorPorDni(dniBuscado)
    : null;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="rounded-[1.6rem] border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/75 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-200">
              <CreditCard className="h-3.5 w-3.5" />
              Cobrador
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950">
                <Search className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Buscar cliente
                </p>

                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  Buscar por DNI
                </h1>

                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Consultá la cuenta del cliente, revisá sus períodos pendientes
                  y registrá pagos.
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60 sm:min-w-64">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                <UserRound className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Sesión activa
                </p>

                <p className="mt-1 truncate text-xs font-semibold text-slate-950 dark:text-white">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Consulta
          </p>

          <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
            Ingresar DNI del cliente
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
            El cobrador solo puede buscar clientes por DNI.
          </p>
        </div>

        <form className="space-y-3" method="GET" action="/cobrador/buscar-cliente">
          <div className="space-y-2">
            <label
              htmlFor="dni"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
            >
              DNI
            </label>

            <input
              id="dni"
              name="dni"
              type="text"
              inputMode="numeric"
              defaultValue={dniBuscado}
              placeholder="Ingresá el DNI"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:placeholder:text-transparent focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99] dark:border-slate-800 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 sm:w-auto"
          >
            <Search className="h-4 w-4" />
            Buscar cliente
          </button>
        </form>
      </div>

      {dniBuscado ? (
        <div className="rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:p-5">
          {cliente ? (
            <Link
              href={`/cobrador/clientes/${cliente.id}`}
              className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-cyan-800"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Cliente encontrado
              </p>

              <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                {cliente.apellido}, {cliente.nombre}
              </h3>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
              </p>

              <p className="mt-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                Abrir ficha del cliente
              </p>
            </Link>
          ) : (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200">
              <p className="text-sm font-semibold">Cliente no encontrado</p>
              <p className="mt-1 text-sm leading-6 opacity-90">
                No se encontró ningún cliente con DNI {dniBuscado}.
              </p>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
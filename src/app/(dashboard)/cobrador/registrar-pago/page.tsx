// src/app/(dashboard)/cobrador/registrar-pago/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CreditCard,
  IdCard,
  MapPin,
  Search,
  UserRound,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { buscarClienteParaCobradorPorDni } from "@/services/cobrador.service";

export const metadata = {
  title: "Registrar un pago",
};

type RegistrarPagoDniPageProps = {
  searchParams?: {
    dni?: string;
  };
};

function limpiarDni(value: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 12);
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
  const cliente = dniBuscado
    ? await buscarClienteParaCobradorPorDni(dniBuscado)
    : null;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="rounded-[1.6rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
            <CreditCard className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
              Circuito seguro
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Registrar un pago
            </h1>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Para registrar un pago, el cobrador debe ingresar el DNI exacto
              del cliente. Este paso evita pagos cargados a clientes
              incorrectos.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
            <Search className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
              DNI exacto
            </p>

            <h2 className="mt-1 text-base font-semibold text-slate-950 dark:text-white">
              Buscar cliente para pago
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Ingresá el DNI completo del cliente antes de continuar.
            </p>
          </div>
        </div>

        <form
          className="grid gap-2 lg:grid-cols-[minmax(260px,1fr)_160px]"
          method="GET"
          action="/cobrador/registrar-pago"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 dark:text-cyan-300" />

            <input
              id="dni"
              name="dni"
              type="text"
              inputMode="numeric"
              defaultValue={dniBuscado}
              placeholder="Ingresá el DNI del cliente"
              className="h-11 w-full rounded-2xl border border-cyan-300 bg-cyan-50/70 px-3 pl-10 text-sm text-slate-950 shadow-inner outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-cyan-700 dark:bg-cyan-950/45 dark:text-white dark:shadow-cyan-950/30 dark:placeholder:text-cyan-200/60 dark:focus:border-cyan-400 dark:focus:bg-cyan-950/70 dark:focus:ring-cyan-400/20"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-cyan-300 bg-cyan-100 px-4 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-200 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
          >
            <Search className="h-4 w-4" />
            Buscar
          </button>
        </form>
      </div>

      {dniBuscado ? (
        <div className="rounded-[1.6rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-5">
          {cliente ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <UserRound className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                    Cliente encontrado
                  </p>

                  <h2 className="mt-1 truncate text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {cliente.apellido}, {cliente.nombre}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Confirmá los datos antes de abrir el detalle de la cuenta.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Apellido y nombre
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">
                    {cliente.apellido}, {cliente.nombre}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    DNI
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">
                    {cliente.dni}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Cliente N°
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">
                    {cliente.numeroCliente}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Localidad
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-slate-950 dark:text-white">
                    {cliente.localidad || "-"}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-3 text-sm leading-6 text-cyan-900 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200">
                <div className="flex gap-2">
                  <IdCard className="mt-1 h-4 w-4 shrink-0" />
                  <p>
                    El pago quedará habilitado solo para este cliente y este DNI.
                    Si los datos no corresponden, no continúes con la operatoria.
                  </p>
                </div>
              </div>

              <Link
                href={`/cobrador/clientes/${cliente.id}?modo=pago&dni=${cliente.dni}`}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
              >
                Abrir detalle de cuenta
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200">
              <div className="flex gap-2">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

                <div>
                  <p className="text-sm font-semibold">Cliente no encontrado</p>

                  <p className="mt-1 text-sm leading-6 opacity-90">
                    No se encontró ningún cliente con DNI {dniBuscado}. Si el
                    cobrador no tiene el DNI correcto, debe usar la búsqueda
                    general solo para consulta, no para registrar pagos.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
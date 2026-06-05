// src/app/(dashboard)/cobrador/registrar-pago/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  IdCard,
  MapPin,
  Phone,
  UserRound,
  WalletCards,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { buscarClienteParaCobradorPorDni } from "@/services/cobrador.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Registrar un pago",
};

type RegistrarPagoDniPageProps = {
  searchParams?: {
    dni?: string;
  };
};

type ClienteEncontrado = {
  id: string;
  apellido: string;
  nombre: string;
  dni: string;
  numeroCliente: number;
  direccion?: string;
  localidad?: string;
  provincia?: string;
  telefono?: string;
};

function limpiarDni(value: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 12);
}

function DataItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string | number | null;
  icon: typeof IdCard;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-700 dark:text-cyan-300" />

        <p className="truncate text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-1 truncate text-sm font-medium text-slate-950 dark:text-white">
        {value || "-"}
      </p>
    </div>
  );
}

function ClienteEncontradoCard({ cliente }: { cliente: ClienteEncontrado }) {
  return (
    <div className="rounded-[1.45rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            <UserRound className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              Cliente encontrado
            </p>

            <h1 className="mt-1 truncate text-2xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              {cliente.apellido}, {cliente.nombre}
            </h1>

            <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
              Confirmá los datos principales antes de abrir la cuenta.
            </p>
          </div>
        </div>

        <div className="hidden rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300 lg:block">
          Listo para continuar
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <DataItem label="DNI" value={cliente.dni} icon={IdCard} />

        <DataItem
          label="Cliente N°"
          value={cliente.numeroCliente}
          icon={CreditCard}
        />

        <DataItem
          label="Localidad"
          value={cliente.localidad || "-"}
          icon={MapPin}
        />

        <DataItem
          label="Teléfono"
          value={cliente.telefono || "-"}
          icon={Phone}
        />
      </div>

      <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />

          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Dirección del servicio
            </p>

            <p className="mt-1 text-sm leading-5 text-slate-950 dark:text-white">
              {cliente.direccion || "Sin dirección cargada"}
              <span className="text-slate-500 dark:text-slate-400">
                {" "}
                · {cliente.localidad || "Sin localidad"} ·{" "}
                {cliente.provincia || "Sin provincia"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Link
          href="/cobrador"
          className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
        >
          Cancelar
        </Link>

        <Link
          href={`/cobrador/clientes/${cliente.id}?modo=pago&dni=${cliente.dni}`}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 text-xs font-medium text-white shadow-lg shadow-cyan-950/15 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 sm:w-auto"
        >
          Abrir detalle de cuenta
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function ClienteNoEncontrado({ dniBuscado }: { dniBuscado: string }) {
  return (
    <div className="rounded-[1.45rem] border border-red-200 bg-red-50 p-3 text-red-800 shadow-sm dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200 sm:p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium">Cliente no encontrado</p>

          <p className="mt-1 text-xs leading-5 opacity-90">
            No se encontró ningún cliente con DNI{" "}
            <span className="font-medium">{dniBuscado}</span>. Verificá el dato
            ingresado desde el panel del cobrador.
          </p>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/cobrador"
              className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-red-200 bg-white px-4 text-xs font-medium text-red-700 transition hover:bg-red-100 active:scale-[0.99] dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-950/60 sm:w-auto"
            >
              Volver al panel
            </Link>

            <Link
              href="/cobrador/buscar-cliente"
              className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
            >
              Ir a búsqueda general
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AsideFlujoCard() {
  return (
    <div className="rounded-[1.35rem] border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
      <div className="mb-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
          Flujo de pago
        </p>

        <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
          Confirmación previa
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
            <IdCard className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
            DNI validado
          </span>

          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
            <UserRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
            Cliente encontrado
          </span>

          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
        </div>

        <div className="flex items-center justify-between gap-3 px-3 py-2">
          <span className="inline-flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
            <WalletCards className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
            Siguiente paso
          </span>

          <span className="text-right text-[11px] font-medium text-slate-950 dark:text-white">
            Cuenta
          </span>
        </div>
      </div>
    </div>
  );
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

  if (!dniBuscado) {
    redirect("/cobrador");
  }

  const cliente = await buscarClienteParaCobradorPorDni(dniBuscado);

  return (
    <PageShell maxWidth="wide" className="pb-24 sm:pb-0">
      <DashboardGrid>
        <DashboardMain>
          {cliente ? (
            <ClienteEncontradoCard cliente={cliente} />
          ) : (
            <ClienteNoEncontrado dniBuscado={dniBuscado} />
          )}
        </DashboardMain>

        <DashboardAside>
          {cliente ? <AsideFlujoCard /> : null}

          <div className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 shadow-sm dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
            <p className="font-medium">Importante</p>

            <p className="mt-1">
              El pago se registra recién desde el detalle de cuenta del cliente.
              Esta pantalla solo confirma que el DNI corresponde al cliente
              encontrado.
            </p>
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
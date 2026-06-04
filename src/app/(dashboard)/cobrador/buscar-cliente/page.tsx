// src/app/(dashboard)/cobrador/buscar-cliente/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Eye,
  FileSearch,
  Filter,
  Hash,
  IdCard,
  Info,
  MapPin,
  Search,
  UserRound,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import {
  buscarClientesParaCobrador,
  type BuscarClientesCobradorFiltros,
} from "@/services/cobrador.service";
import type { ClienteSafe } from "@/types/cliente.types";

export const metadata = {
  title: "Buscar cliente",
};

type BuscarClienteCobradorPageProps = {
  searchParams?: {
    q?: string;
    nombre?: string;
    apellido?: string;
    dni?: string;
    numeroCliente?: string;
    localidad?: string;
    provincia?: string;
  };
};

function limpiarTexto(value?: string) {
  return String(value || "").trim();
}

function limpiarDni(value?: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 12);
}

function normalizarFiltros(
  searchParams?: BuscarClienteCobradorPageProps["searchParams"],
): BuscarClientesCobradorFiltros {
  return {
    q: limpiarTexto(searchParams?.q),
    nombre: limpiarTexto(searchParams?.nombre),
    apellido: limpiarTexto(searchParams?.apellido),
    dni: limpiarDni(searchParams?.dni),
    numeroCliente: limpiarTexto(searchParams?.numeroCliente).replace(/\D/g, ""),
    localidad: limpiarTexto(searchParams?.localidad),
    provincia: limpiarTexto(searchParams?.provincia),
  };
}

function hayFiltros(filtros: BuscarClientesCobradorFiltros) {
  return Boolean(
    filtros.q ||
      filtros.nombre ||
      filtros.apellido ||
      filtros.dni ||
      filtros.numeroCliente ||
      filtros.localidad ||
      filtros.provincia,
  );
}

function estadoClienteLabel(estado: string) {
  if (estado === "activo") return "Activo";
  if (estado === "suspendido") return "Suspendido";
  return "Baja";
}

function estadoClienteClasses(estado: string) {
  if (estado === "activo") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/70";
  }

  if (estado === "suspendido") {
    return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/70";
  }

  return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/70";
}

function InputField({
  label,
  name,
  defaultValue,
  placeholder,
  inputMode,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder: string;
  inputMode?: "text" | "numeric";
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="text"
        inputMode={inputMode || "text"}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-10 w-full rounded-2xl border border-slate-300 bg-white px-3 text-xs text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-600"
      />
    </div>
  );
}

function ClienteResultCard({ cliente }: { cliente: ClienteSafe }) {
  return (
    <Link
      href={`/cobrador/clientes/${cliente.id}`}
      className="group block rounded-2xl border border-slate-300 bg-white p-3 shadow-sm shadow-slate-200/70 transition hover:border-cyan-400 hover:bg-cyan-50/50 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
            <UserRound className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
              {cliente.apellido}, {cliente.nombre}
            </p>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              DNI {cliente.dni} · Cliente N° {cliente.numeroCliente}
            </p>

            <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
              {cliente.direccion || "-"} · {cliente.localidad || "-"},{" "}
              {cliente.provincia || "-"}
            </p>
          </div>
        </div>

        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-medium ${estadoClienteClasses(
            cliente.estado,
          )}`}
        >
          {estadoClienteLabel(cliente.estado)}
        </span>

        <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[10px] font-medium text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300">
          {cliente.plan?.nombre || "Sin plan"}
        </span>

        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <Eye className="h-3 w-3" />
          Ver ficha informativa
        </span>
      </div>
    </Link>
  );
}

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

  const filtros = normalizarFiltros(searchParams);
  const busquedaRealizada = hayFiltros(filtros);
  const clientes = busquedaRealizada
    ? await buscarClientesParaCobrador(filtros)
    : [];

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4">
      <div className="rounded-[1.6rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-cyan-800 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-200">
              <FileSearch className="h-3.5 w-3.5" />
              Consulta informativa
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950">
                <Search className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Buscar cliente
                </p>

                <h1 className="mt-1 text-3xl font-medium tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  Búsqueda general
                </h1>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Usá esta vista para encontrar clientes por nombre, apellido,
                  DNI parcial, número de cliente, localidad o provincia. Esta
                  búsqueda no habilita pagos.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300 lg:max-w-md">
            <div className="flex gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

              <p>
                Para registrar un pago se debe usar el circuito seguro desde el
                dashboard, ingresando el DNI exacto del cliente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300">
            <Filter className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
              Filtros
            </p>

            <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
              Datos para buscar
            </h2>

            <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
              Podés usar un filtro o combinar varios para reducir resultados.
            </p>
          </div>
        </div>

        <form method="GET" action="/cobrador/buscar-cliente" className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-700 dark:text-cyan-300" />

            <input
              name="q"
              type="text"
              defaultValue={filtros.q}
              placeholder="Buscar por nombre, apellido, DNI, cliente, localidad o provincia"
              className="h-11 w-full rounded-2xl border border-cyan-300 bg-cyan-50/70 px-3 pl-10 text-sm text-slate-950 shadow-inner outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15 dark:border-cyan-700 dark:bg-cyan-950/45 dark:text-white dark:shadow-cyan-950/30 dark:placeholder:text-cyan-200/60 dark:focus:border-cyan-400 dark:focus:bg-cyan-950/70 dark:focus:ring-cyan-400/20"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <InputField
              label="Apellido"
              name="apellido"
              defaultValue={filtros.apellido}
              placeholder="Ej: Barros"
            />

            <InputField
              label="Nombre"
              name="nombre"
              defaultValue={filtros.nombre}
              placeholder="Ej: Juan"
            />

            <InputField
              label="DNI parcial"
              name="dni"
              defaultValue={filtros.dni}
              placeholder="Últimos 3 o más"
              inputMode="numeric"
            />

            <InputField
              label="Cliente N°"
              name="numeroCliente"
              defaultValue={filtros.numeroCliente}
              placeholder="Ej: 102"
              inputMode="numeric"
            />

            <InputField
              label="Localidad"
              name="localidad"
              defaultValue={filtros.localidad}
              placeholder="Ej: Capital"
            />

            <InputField
              label="Provincia"
              name="provincia"
              defaultValue={filtros.provincia}
              placeholder="Ej: Catamarca"
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Link
              href="/cobrador/buscar-cliente"
              className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
            >
              Limpiar
            </Link>

            <button
              type="submit"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-cyan-100 px-4 text-xs font-medium text-cyan-800 transition hover:bg-cyan-200 active:scale-[0.99] dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70 sm:w-auto"
            >
              <Search className="h-3.5 w-3.5" />
              Buscar clientes
            </button>
          </div>
        </form>
      </div>

      {busquedaRealizada ? (
        <div className="rounded-[1.6rem] border border-slate-300 bg-white p-4 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-800 dark:text-cyan-300">
                Resultados
              </p>

              <h2 className="mt-0.5 text-sm font-medium text-slate-950 dark:text-white">
                {clientes.length === 1
                  ? "1 cliente encontrado"
                  : `${clientes.length} clientes encontrados`}
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
              <Info className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
              Vista sin botón de pago
            </div>
          </div>

          {clientes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
              No se encontraron clientes con los filtros indicados.
            </div>
          ) : (
            <div className="grid gap-3">
              {clientes.map((cliente) => (
                <ClienteResultCard key={cliente.id} cliente={cliente} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-[1.6rem] border border-cyan-200 bg-cyan-50 p-4 text-sm leading-6 text-cyan-900 dark:border-cyan-900/70 dark:bg-cyan-950/30 dark:text-cyan-200 sm:p-5">
          <div className="flex gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-medium">Cómo usar esta búsqueda</p>

              <p className="mt-1">
                Esta vista sirve para identificar clientes y consultar su ficha.
                Para evitar errores, el pago solo se habilita desde el circuito
                seguro por DNI exacto.
              </p>

              <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white/70 px-3 py-2 dark:border-cyan-900/70 dark:bg-cyan-950/40">
                  <IdCard className="h-4 w-4 shrink-0" />
                  DNI parcial
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white/70 px-3 py-2 dark:border-cyan-900/70 dark:bg-cyan-950/40">
                  <Hash className="h-4 w-4 shrink-0" />
                  Cliente N°
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-cyan-200 bg-white/70 px-3 py-2 dark:border-cyan-900/70 dark:bg-cyan-950/40">
                  <MapPin className="h-4 w-4 shrink-0" />
                  Localidad/provincia
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
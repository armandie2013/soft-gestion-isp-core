// src/app/(dashboard)/usuarios/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Clock3,
  Search,
  ShieldCheck,
  UserRound,
  UserPlus,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerUsuarios } from "@/services/usuario.service";
import { UsuariosTable } from "@/components/tables/UsuariosTable";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import type { UsuarioSafe } from "@/types/usuario.types";

export const metadata = {
  title: "Usuarios",
};

type UsuariosPageProps = {
  searchParams?: {
    q?: string;
    rol?: string;
    estado?: string;
    seguridad?: string;
  };
};

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: typeof UsersRound;
  tone: "cyan" | "emerald" | "amber" | "violet" | "red";
};

const toneClasses = {
  cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
  emerald:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  amber:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  violet:
    "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
  red: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
};

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <div className="flex h-full min-h-[122px] flex-col justify-between rounded-[1.35rem] border border-slate-200 bg-white/85 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${toneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-1 text-xl font-medium tracking-tight text-slate-950 dark:text-white">
            {value}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function normalizarTexto(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function filtrarUsuarios({
  usuarios,
  q,
  rol,
  estado,
  seguridad,
}: {
  usuarios: UsuarioSafe[];
  q: string;
  rol: string;
  estado: string;
  seguridad: string;
}) {
  const busqueda = normalizarTexto(q);

  return usuarios.filter((usuario) => {
    const textoUsuario = normalizarTexto(
      `${usuario.nombre} ${usuario.apellido} ${usuario.email} ${usuario.dni}`,
    );

    const coincideBusqueda = !busqueda || textoUsuario.includes(busqueda);
    const coincideRol = rol === "todos" || usuario.rol === rol;
    const coincideEstado = estado === "todos" || usuario.estado === estado;

    const coincideSeguridad =
      seguridad === "todos" ||
      (seguridad === "cambio" && usuario.debeCambiarPassword) ||
      (seguridad === "ok" && !usuario.debeCambiarPassword);

    return (
      coincideBusqueda && coincideRol && coincideEstado && coincideSeguridad
    );
  });
}

const quickActions = [
  {
    label: "Registrar usuario",
    description: "Crear una cuenta desde el registro",
    href: "/registro",
    icon: UserPlus,
  },
  {
    label: "Ver administradores",
    description: "Filtrar usuarios con acceso total",
    href: "/usuarios?rol=admin",
    icon: ShieldCheck,
  },
  {
    label: "Ver cobradores",
    description: "Filtrar usuarios cobradores",
    href: "/usuarios?rol=cobrador",
    icon: WalletCards,
  },
  {
    label: "Ver clientes",
    description: "Filtrar usuarios clientes",
    href: "/usuarios?rol=cliente",
    icon: UserRound,
  },
];

export default async function UsuariosPage({ searchParams }: UsuariosPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  const usuarios = await obtenerUsuarios();

  const q = String(searchParams?.q || "");
  const rol = String(searchParams?.rol || "todos");
  const estado = String(searchParams?.estado || "todos");
  const seguridad = String(searchParams?.seguridad || "todos");

  const usuariosFiltrados = filtrarUsuarios({
    usuarios,
    q,
    rol,
    estado,
    seguridad,
  });

  const totalUsuarios = usuarios.length;
  const totalAdmins = usuarios.filter(
    (usuario) => usuario.rol === "admin",
  ).length;
  const totalCobradores = usuarios.filter(
    (usuario) => usuario.rol === "cobrador",
  ).length;
  const totalClientes = usuarios.filter(
    (usuario) => usuario.rol === "cliente",
  ).length;
  const totalSuspendidos = usuarios.filter(
    (usuario) => usuario.estado === "suspendido",
  ).length;
  const totalCambioRequerido = usuarios.filter(
    (usuario) => usuario.debeCambiarPassword,
  ).length;
  const totalActivos = usuarios.filter(
    (usuario) => usuario.estado === "activo",
  ).length;

  const usuariosRecientes = usuarios.slice(0, 3);

  return (
    <PageShell maxWidth="wide">
      <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Usuarios totales"
          value={String(totalUsuarios)}
          description="Todos los usuarios registrados."
          icon={UsersRound}
          tone="cyan"
        />

        <StatCard
          title="Administradores"
          value={String(totalAdmins)}
          description="Acceso completo al sistema."
          icon={ShieldCheck}
          tone="emerald"
        />

        <StatCard
          title="Cobradores"
          value={String(totalCobradores)}
          description="Usuarios con cobranza asignada."
          icon={WalletCards}
          tone="amber"
        />

        <StatCard
          title="Clientes"
          value={String(totalClientes)}
          description="Acceso limitado al portal."
          icon={UserRound}
          tone="violet"
        />

        <StatCard
          title="Pendientes"
          value={String(totalCambioRequerido)}
          description="Usuarios con cambio requerido."
          icon={Clock3}
          tone={totalCambioRequerido > 0 ? "red" : "emerald"}
        />
      </div>

      <DashboardGrid>
        <DashboardMain>
          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-2.5 flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Usuarios
                </p>

                <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
                  Gestión de usuarios
                </h1>
              </div>

              <Link
                href="/registro"
                className="inline-flex h-8 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 text-[11px] font-medium text-white shadow-lg shadow-cyan-950/10 transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Registrar usuario
              </Link>
            </div>

            <form
              action="/usuarios"
              className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-950/50 lg:grid-cols-[minmax(280px,1fr)_150px_135px_155px_auto]"
            >
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Buscar por nombre, email o DNI"
                  className="h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 pl-8 text-[11px] text-slate-950 outline-none transition placeholder:text-[11px] placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600"
                />
              </div>

              <select
                name="rol"
                defaultValue={rol}
                className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="todos">Todos los roles</option>
                <option value="admin">Admin</option>
                <option value="cobrador">Cobrador</option>
                <option value="cliente">Cliente</option>
              </select>

              <select
                name="estado"
                defaultValue={estado}
                className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="todos">Todos</option>
                <option value="activo">Activos</option>
                <option value="suspendido">Suspendidos</option>
              </select>

              <select
                name="seguridad"
                defaultValue={seguridad}
                className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="todos">Seguridad</option>
                <option value="ok">Clave OK</option>
                <option value="cambio">Cambiar clave</option>
              </select>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="inline-flex h-8 flex-1 items-center justify-center rounded-lg bg-cyan-600 px-3 text-[11px] font-medium text-white transition hover:bg-cyan-700 active:scale-[0.99] dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400 lg:flex-none"
                >
                  Filtrar
                </button>

                <Link
                  href="/usuarios"
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Limpiar
                </Link>
              </div>
            </form>
          </div>

          <UsuariosTable
            usuarios={usuariosFiltrados}
            totalUsuarios={totalUsuarios}
          />
        </DashboardMain>

        <DashboardAside>
          <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Acciones rápidas
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Atajos para administrar usuarios
              </h2>
            </div>

            <div className="grid gap-2">
              {quickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />

                      <span className="min-w-0">
                        <span className="block truncate">{item.label}</span>
                        <span className="block truncate text-[11px] font-normal text-slate-500 dark:text-slate-400">
                          {item.description}
                        </span>
                      </span>
                    </span>

                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Estado de accesos
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Información general
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Usuarios activos
                </span>

                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  {totalActivos}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Suspendidos
                </span>

                <span className="text-xs font-medium text-red-700 dark:text-red-300">
                  {totalSuspendidos}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Cambio requerido
                </span>

                <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                  {totalCambioRequerido}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Filtro aplicado
                </span>

                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                  {usuariosFiltrados.length}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Usuarios recientes
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Últimos registros del sistema
              </h2>
            </div>

            <div className="grid gap-2">
              {usuariosRecientes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                  No hay usuarios recientes.
                </div>
              ) : (
                usuariosRecientes.map((usuario) => (
                  <Link
                    key={usuario.id}
                    href={`/usuarios/${usuario.id}/editar`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                        {usuario.apellido}, {usuario.nombre}
                      </p>

                      <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                        {usuario.email}
                      </p>
                    </div>

                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
                  </Link>
                ))
              )}
            </div>
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
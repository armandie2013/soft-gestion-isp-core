// src/components/tables/UsuariosTable.tsx

import Link from "next/link";
import type { ReactNode } from "react";
import {
  CalendarClock,
  IdCard,
  KeyRound,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import type { UsuarioSafe } from "@/types/usuario.types";

type UsuariosTableProps = {
  usuarios: UsuarioSafe[];
  totalUsuarios: number;
};

function formatDate(value?: string | null) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value?: string | null) {
  if (!value) return "Nunca";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getInitials(usuario: UsuarioSafe) {
  const nombre = `${usuario.nombre} ${usuario.apellido}`
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean);

  if (nombre.length === 0) return "US";

  return nombre
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function rolLabel(rol: string) {
  if (rol === "admin") return "Admin";
  if (rol === "cobrador") return "Cobrador";
  return "Cliente";
}

function rolClass(rol: string) {
  if (rol === "admin") {
    return "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300";
  }

  if (rol === "cobrador") {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
  }

  return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-300";
}

function estadoClass(estado: string) {
  if (estado === "activo") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
  }

  return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300";
}

function seguridadClass(debeCambiarPassword: boolean) {
  if (debeCambiarPassword) {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300";
}

function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${className}`}
    >
      {children}
    </span>
  );
}

export function UsuariosTable({ usuarios, totalUsuarios }: UsuariosTableProps) {
  if (usuarios.length === 0) {
    return (
      <EmptyState
        title="No se encontraron usuarios."
        description="Probá limpiar los filtros o cambiar el texto de búsqueda."
      />
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] table-fixed text-left text-xs xl:min-w-0">
            <colgroup>
              <col className="w-[20%]" />
              <col className="w-[21%]" />
              <col className="w-[9%]" />
              <col className="w-[9%]" />
              <col className="w-[10%]" />
              <col className="w-[12%]" />
              <col className="w-[13%]" />
              <col className="w-[6%]" />
            </colgroup>

            <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-[0.13em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
              <tr>
                <th className="px-3 py-2.5 font-medium">Usuario</th>
                <th className="px-3 py-2.5 font-medium">Email</th>
                <th className="px-3 py-2.5 font-medium">DNI</th>
                <th className="px-3 py-2.5 font-medium">Rol</th>
                <th className="px-3 py-2.5 font-medium">Estado</th>
                <th className="px-3 py-2.5 font-medium">Seguridad</th>
                <th className="px-3 py-2.5 font-medium">Último acceso</th>
                <th className="px-3 py-2.5 text-right font-medium">Acción</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="transition hover:bg-slate-50/80 dark:hover:bg-slate-950/35"
                >
                  <td className="px-3 py-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                        {getInitials(usuario)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                          {usuario.apellido}, {usuario.nombre}
                        </p>

                        <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                          Creado {formatDate(usuario.creadoEn)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                      {usuario.email}
                    </p>
                  </td>

                  <td className="px-3 py-3">
                    <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                      {usuario.dni || "-"}
                    </p>
                  </td>

                  <td className="px-3 py-3">
                    <Pill className={rolClass(usuario.rol)}>
                      {rolLabel(usuario.rol)}
                    </Pill>
                  </td>

                  <td className="px-3 py-3">
                    <Pill className={estadoClass(usuario.estado)}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {usuario.estado === "activo" ? "Activo" : "Suspendido"}
                    </Pill>
                  </td>

                  <td className="px-3 py-3">
                    <Pill className={seguridadClass(usuario.debeCambiarPassword)}>
                      <ShieldCheck className="h-3 w-3" />
                      {usuario.debeCambiarPassword ? "Cambiar" : "Clave OK"}
                    </Pill>
                  </td>

                  <td className="px-3 py-3">
                    <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                      {formatDateTime(usuario.ultimoAcceso)}
                    </p>
                  </td>

                  <td className="px-3 py-3 text-right">
                    <Link
                      href={`/usuarios/${usuario.id}/editar`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
                      title="Editar usuario"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span>
            Mostrando {usuarios.length} de {totalUsuarios} usuarios
          </span>

          <span>Vista administrativa</span>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-xs font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                  {getInitials(usuario)}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-sm font-medium text-slate-950 dark:text-white">
                    {usuario.apellido}, {usuario.nombre}
                  </h2>

                  <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
                    <Mail className="h-3.5 w-3.5" />
                    {usuario.email}
                  </p>

                  <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
                    <IdCard className="h-3.5 w-3.5" />
                    DNI {usuario.dni || "-"}
                  </p>
                </div>
              </div>

              <Pill className={estadoClass(usuario.estado)}>
                {usuario.estado === "activo" ? "Activo" : "Suspendido"}
              </Pill>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Pill className={rolClass(usuario.rol)}>
                <UserRound className="h-3.5 w-3.5" />
                {rolLabel(usuario.rol)}
              </Pill>

              <Pill className={seguridadClass(usuario.debeCambiarPassword)}>
                <KeyRound className="h-3.5 w-3.5" />
                {usuario.debeCambiarPassword ? "Cambio requerido" : "Clave OK"}
              </Pill>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5" />
                  Último acceso
                </span>

                <span className="text-right">
                  {formatDateTime(usuario.ultimoAcceso)}
                </span>
              </div>
            </div>

            <Link
              href={`/usuarios/${usuario.id}/editar`}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-200"
            >
              <Pencil className="h-4 w-4" />
              Editar usuario
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
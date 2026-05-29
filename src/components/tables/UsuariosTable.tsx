import Link from "next/link";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { UsuarioSafe } from "@/types/usuario.types";

type UsuariosTableProps = {
  usuarios: UsuarioSafe[];
};

function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function getRolBadgeVariant(rol: string) {
  if (rol === "admin") return "info";
  if (rol === "cobrador") return "warning";
  return "default";
}

function getEstadoBadgeVariant(estado: string) {
  if (estado === "activo") return "success";
  return "danger";
}

export function UsuariosTable({ usuarios }: UsuariosTableProps) {
  if (usuarios.length === 0) {
    return (
      <EmptyState
        title="No hay usuarios registrados."
        description="Los usuarios aparecerán acá cuando se registren desde la pantalla de registro."
      />
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] shadow-[var(--app-shadow-soft)] md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[var(--app-border)] bg-[var(--app-surface-soft)] text-xs uppercase tracking-wide text-[var(--app-muted)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Usuario</th>
                <th className="px-4 py-3 font-semibold">DNI</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Rol</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 font-semibold">Contraseña</th>
                <th className="px-4 py-3 text-right font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--app-border)]">
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="transition hover:bg-[var(--app-surface-soft)]"
                >
                  <td className="px-4 py-3 font-medium text-[var(--app-text-strong)]">
                    {usuario.apellido}, {usuario.nombre}
                  </td>

                  <td className="px-4 py-3 text-[var(--app-muted)]">
                    {usuario.dni || "-"}
                  </td>

                  <td className="px-4 py-3 text-[var(--app-muted)]">
                    {usuario.email}
                  </td>

                  <td className="px-4 py-3">
                    <Badge variant={getRolBadgeVariant(usuario.rol) as any}>
                      {usuario.rol}
                    </Badge>
                  </td>

                  <td className="px-4 py-3">
                    <Badge
                      variant={getEstadoBadgeVariant(usuario.estado) as any}
                    >
                      {usuario.estado}
                    </Badge>
                  </td>

                  <td className="px-4 py-3">
                    {usuario.debeCambiarPassword ? (
                      <Badge variant="warning">pendiente</Badge>
                    ) : (
                      <Badge variant="success">personal</Badge>
                    )}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/usuarios/${usuario.id}/editar`}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-xs font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface-solid)] p-4 shadow-[var(--app-shadow-soft)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-[var(--app-text-strong)]">
                  {usuario.apellido}, {usuario.nombre}
                </h2>

                <p className="mt-1 truncate text-sm text-[var(--app-muted)]">
                  DNI {usuario.dni || "-"}
                </p>

                <p className="mt-1 truncate text-sm text-[var(--app-muted)]">
                  {usuario.email}
                </p>
              </div>

              <Badge variant={getEstadoBadgeVariant(usuario.estado) as any}>
                {usuario.estado}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant={getRolBadgeVariant(usuario.rol) as any}>
                {usuario.rol}
              </Badge>

              {usuario.debeCambiarPassword ? (
                <Badge variant="warning">cambio pendiente</Badge>
              ) : (
                <Badge variant="success">clave personal</Badge>
              )}

              <Badge>{formatDate(usuario.creadoEn)}</Badge>
            </div>

            <Link
              href={`/usuarios/${usuario.id}/editar`}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-3 text-sm font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
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
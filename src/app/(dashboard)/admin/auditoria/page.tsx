// src/app/(dashboard)/admin/auditoria/page.tsx

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileClock,
  Info,
  MonitorSmartphone,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";
import {
  obtenerAuditLogs,
  type AuditLogResumen,
  type AuditLogSafe,
} from "@/services/audit-query.service";

type AuditoriaPageProps = {
  searchParams?: {
    resultado?: string;
  };
};

export const metadata = {
  title: "Auditoría",
};

const cardBase =
  "rounded-[1.45rem] border border-slate-300 bg-slate-50/95 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none";

const innerCardBase =
  "overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none";

function formatDateTime(value?: string | null) {
  if (!value) return "Sin fecha";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function actionLabel(action: string) {
  const labels: Record<string, string> = {
    AUTH_LOGIN_SUCCESS: "Login correcto",
    AUTH_LOGIN_FAILED: "Login fallido",
    AUTH_LOGIN_RATE_LIMIT: "Login limitado",
    AUTH_REGISTRO_SUCCESS: "Registro correcto",
    AUTH_REGISTRO_FAILED: "Registro fallido",
    AUTH_REGISTRO_RATE_LIMIT: "Registro limitado",
    AUTH_CAMBIAR_PASSWORD_SUCCESS: "Cambio de contraseña",
    AUTH_CAMBIAR_PASSWORD_FAILED: "Cambio fallido",
    AUTH_CAMBIAR_PASSWORD_RATE_LIMIT: "Cambio limitado",
    AUTH_CAMBIAR_PASSWORD_SIN_SESION: "Cambio sin sesión",
    AUTH_CAMBIAR_PASSWORD_TOKEN_MISSING: "Sesión no renovada",
    AUTH_LOGOUT: "Cierre de sesión",

    USUARIO_ACTUALIZAR_SUCCESS: "Usuario actualizado",
    USUARIO_ACTUALIZAR_FAILED: "Edición fallida",
    USUARIO_RESET_PASSWORD_SUCCESS: "Password reseteada",
    USUARIO_RESET_PASSWORD_FAILED: "Reset fallido",
    USUARIO_CAMBIAR_ESTADO_SUCCESS: "Estado cambiado",
    USUARIO_CAMBIAR_ESTADO_FAILED: "Cambio fallido",

    COBRO_REGISTRAR_PAGO_SUCCESS: "Pago registrado",
    COBRO_REGISTRAR_PAGO_FAILED: "Pago fallido",
    CAJA_GENERAR_CODIGO_CIERRE_SUCCESS: "Código de cierre",
    CAJA_GENERAR_CODIGO_CIERRE_FAILED: "Código fallido",
    CAJA_VALIDAR_CODIGO_CIERRE_SUCCESS: "Código validado",
    CAJA_VALIDAR_CODIGO_CIERRE_FAILED: "Validación fallida",
    CAJA_CONFIRMAR_CIERRE_SUCCESS: "Cierre confirmado",
    CAJA_CONFIRMAR_CIERRE_FAILED: "Cierre fallido",

    FACTURACION_MANUAL_SUCCESS: "Facturación mensual",
    FACTURACION_MANUAL_FAILED: "Facturación fallida",
    NOTA_DEBITO_CREAR_SUCCESS: "Nota de débito",
    NOTA_DEBITO_CREAR_FAILED: "Nota débito fallida",
    NOTA_CREDITO_CREAR_SUCCESS: "Nota de crédito",
    NOTA_CREDITO_CREAR_FAILED: "Nota crédito fallida",
  };

  return labels[action] || action.replaceAll("_", " ").toLowerCase();
}

function resultadoBadge(resultado: AuditLogSafe["resultado"]) {
  if (resultado === "success") {
    return <Badge variant="success">Correcto</Badge>;
  }

  if (resultado === "failure") {
    return <Badge variant="danger">Fallido</Badge>;
  }

  if (resultado === "warning") {
    return <Badge variant="warning">Advertencia</Badge>;
  }

  return <Badge variant="info">Info</Badge>;
}

function ResultadoIcon({ resultado }: { resultado: AuditLogSafe["resultado"] }) {
  if (resultado === "success") {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900">
        <CheckCircle2 className="h-4 w-4" />
      </div>
    );
  }

  if (resultado === "failure") {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700 ring-1 ring-red-100 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900">
        <XCircle className="h-4 w-4" />
      </div>
    );
  }

  if (resultado === "warning") {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-900">
        <AlertTriangle className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
      <Info className="h-4 w-4" />
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: typeof Activity;
  tone: "cyan" | "emerald" | "amber" | "red" | "violet";
}) {
  const tones = {
    cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
    emerald:
      "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950",
    amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
    red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
    violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
  };

  return (
    <div className="flex h-full min-h-[108px] flex-col justify-between rounded-[1.35rem] border border-slate-300 bg-slate-50/95 p-3 shadow-sm shadow-slate-300/60 dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-none">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm ${tones[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-1 truncate text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {value}
          </p>

          <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FilterLink({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-9 items-center justify-center rounded-xl border px-3 text-xs font-medium transition ${
        active
          ? "border-cyan-300 bg-cyan-50 text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200"
          : "border-slate-300 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
      }`}
    >
      {label}
    </Link>
  );
}

function AuditDesktopTable({ logs }: { logs: AuditLogSafe[] }) {
  return (
    <div className={innerCardBase}>
      <div className="max-h-[640px] overflow-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-xs dark:divide-slate-800">
          <thead className="sticky top-0 z-10 bg-slate-100/95 text-[10px] uppercase tracking-[0.14em] text-slate-500 backdrop-blur dark:bg-slate-950/95 dark:text-slate-400">
            <tr>
              <th className="px-3 py-3 font-medium">Fecha</th>
              <th className="px-3 py-3 font-medium">Acción</th>
              <th className="px-3 py-3 font-medium">Resultado</th>
              <th className="px-3 py-3 font-medium">Actor</th>
              <th className="px-3 py-3 font-medium">Entidad</th>
              <th className="px-3 py-3 font-medium">IP</th>
              <th className="px-3 py-3 font-medium">Mensaje</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950/40">
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  No hay registros de auditoría para este filtro.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className="align-top transition hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20"
                >
                  <td className="whitespace-nowrap px-3 py-3 text-slate-600 dark:text-slate-400">
                    {formatDateTime(log.createdAt)}
                  </td>

                  <td className="px-3 py-3">
                    <p className="font-medium text-slate-950 dark:text-white">
                      {actionLabel(log.action)}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      {log.action}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {resultadoBadge(log.resultado)}
                  </td>

                  <td className="px-3 py-3">
                    <p className="font-medium text-slate-950 dark:text-white">
                      {log.actorNombre || "Sistema"}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      {log.actorEmail || "-"} · {log.actorRol || "-"}
                    </p>
                  </td>

                  <td className="px-3 py-3">
                    <p className="font-medium text-slate-950 dark:text-white">
                      {log.entidadTipo || "-"}
                    </p>
                    <p className="mt-0.5 max-w-[180px] truncate text-[11px] text-slate-500 dark:text-slate-400">
                      {log.entidadLabel || log.entidadId || "-"}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3 text-slate-600 dark:text-slate-400">
                    {log.ip || "-"}
                  </td>

                  <td className="px-3 py-3">
                    <p className="max-w-[260px] text-slate-700 dark:text-slate-300">
                      {log.mensaje || "-"}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AuditMobileList({ logs }: { logs: AuditLogSafe[] }) {
  if (logs.length === 0) {
    return (
      <div
        className={`${cardBase} p-4 text-sm text-slate-600 dark:text-slate-400`}
      >
        No hay registros de auditoría para este filtro.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {logs.map((log) => (
        <div key={log.id} className={`${cardBase} p-3`}>
          <div className="flex items-start gap-3">
            <ResultadoIcon resultado={log.resultado} />

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
                    {actionLabel(log.action)}
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                    {formatDateTime(log.createdAt)}
                  </p>
                </div>

                <div className="shrink-0">{resultadoBadge(log.resultado)}</div>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                {log.mensaje || "Sin mensaje registrado."}
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-2 rounded-2xl border border-slate-300 bg-white p-3 text-xs shadow-sm shadow-slate-300/40 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">Actor</span>
              <span className="truncate text-right font-medium text-slate-950 dark:text-white">
                {log.actorNombre || "Sistema"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">Rol</span>
              <span className="truncate text-right font-medium text-slate-950 dark:text-white">
                {log.actorRol || "-"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">
                Entidad
              </span>
              <span className="truncate text-right font-medium text-slate-950 dark:text-white">
                {log.entidadTipo || "-"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 dark:text-slate-400">IP</span>
              <span className="truncate text-right font-medium text-slate-950 dark:text-white">
                {log.ip || "-"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResumenAside({ resumen }: { resumen: AuditLogResumen }) {
  const items = [
    {
      label: "Correctos",
      value: resumen.success,
      tone: "text-emerald-700 dark:text-emerald-300",
    },
    {
      label: "Fallidos",
      value: resumen.failure,
      tone: "text-red-700 dark:text-red-300",
    },
    {
      label: "Advertencias",
      value: resumen.warning,
      tone: "text-amber-700 dark:text-amber-300",
    },
    {
      label: "Informativos",
      value: resumen.info,
      tone: "text-cyan-700 dark:text-cyan-300",
    },
  ];

  return (
    <div className={`${cardBase} p-3.5`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Resumen
          </p>

          <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            Registros guardados
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
          <FileClock className="h-4 w-4" />
        </div>
      </div>

      <div className={innerCardBase}>
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
          <span className="text-xs text-slate-700 dark:text-slate-300">
            Total
          </span>
          <span className="text-xs font-semibold text-slate-950 dark:text-white">
            {resumen.total}
          </span>
        </div>

        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 last:border-b-0 dark:border-slate-800"
          >
            <span className="text-xs text-slate-700 dark:text-slate-300">
              {item.label}
            </span>
            <span className={`text-xs font-semibold ${item.tone}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function AuditoriaPage({
  searchParams,
}: AuditoriaPageProps) {
  const resultado = searchParams?.resultado || "";
  const { logs, resumen, filtroResultado } = await obtenerAuditLogs({
    resultado,
    limit: 120,
  });

  const filtroActivo = filtroResultado || "todos";

  return (
    <PageShell maxWidth="wide" className="pb-20 sm:pb-0">
      <div className="lg:hidden">
        <div className="mb-3 px-1">
          <Link
            href="/admin/configuracion"
            className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a configuración
          </Link>

          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Auditoría
          </p>

          <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Registros del sistema
          </h1>

          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
            Últimas acciones sensibles registradas.
          </p>
        </div>

        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          <FilterLink
            href="/admin/auditoria"
            active={filtroActivo === "todos"}
            label="Todos"
          />
          <FilterLink
            href="/admin/auditoria?resultado=success"
            active={filtroActivo === "success"}
            label="Correctos"
          />
          <FilterLink
            href="/admin/auditoria?resultado=failure"
            active={filtroActivo === "failure"}
            label="Fallidos"
          />
          <FilterLink
            href="/admin/auditoria?resultado=warning"
            active={filtroActivo === "warning"}
            label="Advertencias"
          />
          <FilterLink
            href="/admin/auditoria?resultado=info"
            active={filtroActivo === "info"}
            label="Info"
          />
        </div>

        <AuditMobileList logs={logs} />
      </div>

      <div className="hidden lg:block">
        <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total"
            value={resumen.total}
            description="Registros guardados."
            icon={Activity}
            tone="cyan"
          />

          <StatCard
            title="Correctos"
            value={resumen.success}
            description="Acciones realizadas."
            icon={ShieldCheck}
            tone="emerald"
          />

          <StatCard
            title="Fallidos"
            value={resumen.failure}
            description="Intentos rechazados."
            icon={ShieldAlert}
            tone="red"
          />

          <StatCard
            title="Advertencias"
            value={resumen.warning}
            description="Eventos limitados."
            icon={AlertTriangle}
            tone="amber"
          />

          <StatCard
            title="Info"
            value={resumen.info}
            description="Eventos informativos."
            icon={Info}
            tone="violet"
          />
        </div>

        <div className="mt-5">
          <DashboardGrid>
            <DashboardMain>
              <div className={`${cardBase} p-3.5`}>
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
                      <FileClock className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                        Auditoría
                      </p>

                      <h1 className="mt-0.5 text-base font-medium tracking-tight text-slate-950 dark:text-white">
                        Registros del sistema
                      </h1>

                      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
                        Consulta de acciones sensibles, accesos, operaciones de
                        caja, cobros y cambios administrativos.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/admin/configuracion"
                    className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Configuración
                  </Link>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <FilterLink
                  href="/admin/auditoria"
                  active={filtroActivo === "todos"}
                  label="Todos"
                />
                <FilterLink
                  href="/admin/auditoria?resultado=success"
                  active={filtroActivo === "success"}
                  label="Correctos"
                />
                <FilterLink
                  href="/admin/auditoria?resultado=failure"
                  active={filtroActivo === "failure"}
                  label="Fallidos"
                />
                <FilterLink
                  href="/admin/auditoria?resultado=warning"
                  active={filtroActivo === "warning"}
                  label="Advertencias"
                />
                <FilterLink
                  href="/admin/auditoria?resultado=info"
                  active={filtroActivo === "info"}
                  label="Info"
                />
              </div>

              <div className="mt-3">
                <AuditDesktopTable logs={logs} />
              </div>
            </DashboardMain>

            <DashboardAside>
              <ResumenAside resumen={resumen} />

              <div className={`${cardBase} p-3.5`}>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                      Alcance
                    </p>

                    <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                      Eventos registrados
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 dark:bg-cyan-950/50 dark:text-cyan-300 dark:ring-cyan-900">
                    <MonitorSmartphone className="h-4 w-4" />
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300">
                  Este panel muestra los últimos 120 registros. Más adelante
                  podemos agregar búsqueda por usuario, IP, acción y rango de
                  fechas.
                </div>
              </div>

              <div className={`${cardBase} p-3.5`}>
                <div className="mb-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                    Accesos
                  </p>

                  <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    Atajos administrativos
                  </h2>
                </div>

                <div className="grid gap-2">
                  <Link
                    href="/usuarios"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
                  >
                    <span className="inline-flex items-center gap-2">
                      <UserRound className="h-3.5 w-3.5" />
                      Usuarios
                    </span>
                    <Clock3 className="h-3.5 w-3.5 text-slate-400" />
                  </Link>

                  <Link
                    href="/admin/caja-cobradores"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 shadow-sm shadow-slate-300/40 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200 dark:shadow-none dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Activity className="h-3.5 w-3.5" />
                      Caja cobradores
                    </span>
                    <Clock3 className="h-3.5 w-3.5 text-slate-400" />
                  </Link>
                </div>
              </div>
            </DashboardAside>
          </DashboardGrid>
        </div>
      </div>
    </PageShell>
  );
}
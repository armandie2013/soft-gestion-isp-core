"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, FileClock, Search, X } from "lucide-react";
import {
  cajaStyles as styles,
  movementStyles as actions,
} from "@/components/ui/dashboard-styles";
import type { AuditLogSafe } from "@/services/audit-query.service";

export type AuditRow = AuditLogSafe & { fechaLabel: string };
export function actionLabel(action: string) {
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
    USUARIO_RESET_PASSWORD_SUCCESS: "Contraseña restablecida",
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

const results = {
  success: { label: "Correcto", tone: styles.greenBadge },
  failure: {
    label: "Fallido",
    tone: "!bg-red-50 text-red-700 dark:!bg-red-950/50 dark:text-red-300",
  },
  warning: { label: "Advertencia", tone: styles.amberBadge },
  info: { label: "Info", tone: styles.blueBadge },
};
function Badge({ log }: { log: AuditRow }) {
  const result = results[log.resultado] || results.info;
  return (
    <span className={`${styles.badge} ${result.tone}`}>{result.label}</span>
  );
}
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
function actor(log: AuditRow) {
  return log.actorNombre || log.actorEmail || "Sin actor registrado";
}
function Fact({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="grid min-w-0 gap-1 border-b border-[var(--overview-border)] py-2 last:border-b-0 min-[600px]:grid-cols-[130px_minmax(0,1fr)] min-[600px]:gap-3">
      <dt className="text-[11px] text-[var(--overview-muted)]">{label}</dt>
      <dd className="m-0 min-w-0 whitespace-pre-wrap text-[12px] leading-[1.6] [overflow-wrap:anywhere]">
        {value || "—"}
      </dd>
    </div>
  );
}

function Detail({
  log,
  onOpen,
}: {
  log: AuditRow;
  onOpen: (log: AuditRow) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(log)}
      className={`${actions.action} ${actions.detailAction}`}
      aria-label={`Ver registro ${actionLabel(log.action)} del ${log.fechaLabel}`}
      title="Ver registro"
    >
      <Eye aria-hidden="true" />
    </button>
  );
}

export function AuditoriaTable({ logs }: { logs: AuditRow[] }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AuditRow | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open)
      dialog.current.showModal();
  }, [selected]);
  const query = normalize(search);
  const visible = logs.filter(
    (log) =>
      !query ||
      normalize(
        [
          log.fechaLabel,
          log.action,
          actionLabel(log.action),
          results[log.resultado]?.label,
          log.actorNombre,
          log.actorEmail,
          log.actorRol,
          log.actorId,
          log.entidadTipo,
          log.entidadLabel,
          log.entidadId,
          log.ip,
          log.mensaje,
        ]
          .filter(Boolean)
          .join(" "),
      ).includes(query),
  );
  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Search aria-hidden="true" />
          <input
            type="search"
            aria-label="Buscar registros cargados"
            className="[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
            placeholder="Usuario, acción, entidad, IP o mensaje…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => setSearch("")}
            >
              <X className="!size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
        <span aria-live="polite">
          {visible.length} de {logs.length} registros cargados
        </span>
      </div>
      {visible.length === 0 ? (
        <div className={styles.empty}>
          <FileClock aria-hidden="true" />
          <p>
            {query
              ? "No hay coincidencias entre los registros cargados."
              : "No hay registros de auditoría para este filtro."}
          </p>
        </div>
      ) : (
        <>
          <div className={`${styles.desktopTable} max-h-[640px]`}>
            <table
              className={`${actions.table} !min-w-[1100px]`}
              aria-label="Registros de auditoría"
            >
              <colgroup>
                <col className="w-[140px]" />
                <col className="w-[170px]" />
                <col className="w-[114px]" />
                <col className="w-[145px]" />
                <col className="w-[120px]" />
                <col className="w-[130px]" />
                <col />
                <col className="w-[64px]" />
              </colgroup>
              <thead className="sticky top-0 z-10">
                <tr>
                  <th scope="col">Fecha y hora</th>
                  <th scope="col">Acción</th>
                  <th scope="col">Resultado</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Entidad</th>
                  <th scope="col">IP</th>
                  <th scope="col">Mensaje</th>
                  <th scope="col" className={actions.right}>
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((log) => (
                  <tr key={log.id}>
                    <td className="text-[11px] tabular-nums text-[var(--overview-muted)]">
                      {log.fechaLabel}
                    </td>
                    <td>
                      <span className={actions.ellipsis} title={log.action}>
                        {actionLabel(log.action)}
                      </span>
                    </td>
                    <td>
                      <Badge log={log} />
                    </td>
                    <td>
                      <span
                        className={actions.ellipsis}
                        title={[actor(log), log.actorEmail, log.actorRol]
                          .filter(Boolean)
                          .join(" · ")}
                      >
                        {actor(log)}
                      </span>
                    </td>
                    <td>
                      <span
                        className={actions.ellipsis}
                        title={[
                          log.entidadTipo,
                          log.entidadLabel,
                          log.entidadId,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      >
                        {log.entidadLabel || log.entidadTipo || "—"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`${actions.ellipsis} text-[11px] tabular-nums text-[var(--overview-muted)]`}
                        title={log.ip || ""}
                      >
                        {log.ip || "—"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={actions.ellipsis}
                        title={log.mensaje || ""}
                      >
                        {log.mensaje || "—"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end">
                        <Detail log={log} onOpen={setSelected} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.cards}>
            {visible.map((log) => (
              <article key={log.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className="min-w-0">
                    <h3 className="text-[12px] font-normal leading-[1.6] [overflow-wrap:anywhere]">
                      {actionLabel(log.action)}
                    </h3>
                    <p className="mt-1 text-[10px] tabular-nums text-[var(--overview-muted)]">
                      {log.fechaLabel}
                    </p>
                  </div>
                  <Badge log={log} />
                </div>
                <p className="mt-3 line-clamp-3 text-[12px] leading-[1.7] [overflow-wrap:anywhere]">
                  {log.mensaje || "Sin mensaje registrado."}
                </p>
                <dl className="my-3 grid gap-2 text-[11px]">
                  <div className="grid grid-cols-[55px_minmax(0,1fr)] gap-3">
                    <dt className="text-[var(--overview-muted)]">Usuario</dt>
                    <dd className="m-0 text-right [overflow-wrap:anywhere]">
                      {actor(log)}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[55px_minmax(0,1fr)] gap-3">
                    <dt className="text-[var(--overview-muted)]">Entidad</dt>
                    <dd className="m-0 text-right [overflow-wrap:anywhere]">
                      {log.entidadLabel || log.entidadTipo || "—"}
                    </dd>
                  </div>
                </dl>
                <div className="flex min-w-0 items-center justify-between gap-3 border-t border-[var(--overview-border)] pt-[10px]">
                  <span className="min-w-0 text-[10px] tabular-nums text-[var(--overview-muted)] [overflow-wrap:anywhere]">
                    IP: {log.ip || "—"}
                  </span>
                  <Detail log={log} onOpen={setSelected} />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
      <p className={styles.footer}>
        Búsqueda sobre los últimos {logs.length} registros cargados del filtro
        elegido. Horarios de Argentina (UTC−3).
      </p>
      <dialog
        ref={dialog}
        className={`${styles.dialog} !w-[min(620px,calc(100%_-_24px))]`}
        aria-labelledby="audit-detail-title"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              event.currentTarget.close();
          }
        }}
      >
        {selected && (
          <div>
            <div className={styles.panelHeader}>
              <h2 id="audit-detail-title" className={styles.panelTitle}>
                Registro de auditoría
              </h2>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="Cerrar registro"
                onClick={() => dialog.current?.close()}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="p-[14px]">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12px]">
                  {actionLabel(selected.action)}
                </span>
                <Badge log={selected} />
              </div>
              <dl className="m-0">
                <Fact
                  label="Fecha y hora"
                  value={selected.fechaLabel + " (Argentina)"}
                />
                <Fact label="Código de acción" value={selected.action} />
                <Fact label="Usuario" value={actor(selected)} />
                <Fact label="Email" value={selected.actorEmail} />
                <Fact label="Rol" value={selected.actorRol} />
                <Fact label="ID de usuario" value={selected.actorId} />
                <Fact label="Tipo de entidad" value={selected.entidadTipo} />
                <Fact label="Entidad" value={selected.entidadLabel} />
                <Fact label="ID de entidad" value={selected.entidadId} />
                <Fact label="IP" value={selected.ip} />
                <Fact
                  label="Navegador / dispositivo"
                  value={selected.userAgent}
                />
                <Fact label="Mensaje" value={selected.mensaje} />
                <Fact label="ID del registro" value={selected.id} />
              </dl>
              {selected.metadata &&
                Object.keys(selected.metadata).length > 0 && (
                  <div className="mt-3 border-t border-[var(--overview-border)] pt-3">
                    <h3 className="text-[11px] font-normal text-[var(--overview-muted)]">
                      Datos adicionales registrados
                    </h3>
                    <pre className="mt-2 min-w-0 rounded-[6px] border border-[var(--overview-border)] bg-[var(--overview-bg)] p-3 text-[11px] leading-[1.7] whitespace-pre-wrap [overflow-wrap:anywhere]">
                      {JSON.stringify(selected.metadata, null, 2)}
                    </pre>
                  </div>
                )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

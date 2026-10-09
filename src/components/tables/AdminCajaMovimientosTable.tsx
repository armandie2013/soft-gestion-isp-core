"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Download,
  Eye,
  FileWarning,
  History,
  ReceiptText,
  X,
} from "lucide-react";
import type { AdminMovimientoCajaSafe } from "@/types/admin-cobrador-caja.types";
import {
  cajaStyles as shared,
  movementStyles as styles,
} from "@/components/ui/dashboard-styles";

type Movimiento = AdminMovimientoCajaSafe;
function money(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}
function date(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? "—"
    : new Intl.DateTimeFormat("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(parsed);
}
function info(m: Movimiento) {
  if (m.tipoMovimiento === "cobro")
    return {
      label: "Cobro",
      color: shared.green,
      badge: shared.greenBadge,
      sign: "+",
    };
  if (m.tipoMovimiento === "ajuste_correccion_pago")
    return {
      label: "Corrección",
      color: shared.blue,
      badge: shared.blueBadge,
      sign: "−",
    };
  if (m.tipoMovimiento === "cierre_caja")
    return {
      label: "Cierre",
      color: shared.blue,
      badge: shared.blueBadge,
      sign: "−",
    };
  return {
    label: "Post-cierre",
    color: shared.amber,
    badge: shared.amberBadge,
    sign: "−",
  };
}
function status(m: Movimiento) {
  if (m.tipoMovimiento === "cierre_caja") return "Cierre confirmado";
  if (m.tipoMovimiento === "ajuste_correccion_pago_post_cierre")
    return "Ajuste post-cierre";
  const caja = m.estadoCaja === "cerrado" ? "Caja cerrada" : "Caja abierta";
  return m.estadoComprobante === "corregido_parcialmente"
    ? `${caja} · Pago corregido`
    : caja;
}

export function AdminCajaMovimientosTable({
  movimientos,
  mostrarCobrador = true,
  cantidadTotal,
}: {
  movimientos: Movimiento[];
  mostrarCobrador?: boolean;
  cantidadTotal?: number;
}) {
  const [selected, setSelected] = useState<Movimiento | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
    if (!selected && dialog?.open) dialog.close();
  }, [selected]);
  const selectedInfo = selected ? info(selected) : null;

  return (
    <>
      <section className={shared.panel}>
        <div className={shared.panelHeader}>
          <h2 className={shared.panelTitle}>
            <History aria-hidden="true" /> Movimientos recientes
          </h2>
          <span className={shared.count}>Últimos {movimientos.length}</span>
        </div>
        {movimientos.length === 0 ? (
          <div className={shared.empty}>
            <ReceiptText aria-hidden="true" />
            <span>Todavía no hay movimientos registrados para mostrar.</span>
          </div>
        ) : (
          <>
            <div
              className={styles.scroll}
              role="region"
              aria-label="Listado de movimientos; desplazamiento horizontal disponible"
              tabIndex={0}
            >
              <table
                className={styles.table}
                aria-label="Últimos cobros y correcciones"
              >
                <colgroup>
                  <col style={{ width: 140 }} />
                  <col style={{ width: 104 }} />
                  <col />
                  {mostrarCobrador && <col style={{ width: 150 }} />}
                  <col style={{ width: 166 }} />
                  <col style={{ width: 148 }} />
                  <col style={{ width: 160 }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">Fecha y hora</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Detalle</th>
                    {mostrarCobrador && <th scope="col">Cobrador</th>}
                    <th scope="col">Estado</th>
                    <th scope="col" className={styles.right}>
                      Importe
                    </th>
                    <th scope="col" className={styles.right}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {movimientos.map((m) => {
                    const item = info(m);
                    const hasPayment =
                      m.tipoMovimiento === "cobro" &&
                      m.movimientoFinancieroId &&
                      m.comprobanteDisponible === true;
                    return (
                      <tr key={m.id}>
                        <td>
                          <span className={styles.date}>
                            {date(m.creadoEn)}
                          </span>
                        </td>
                        <td>
                          <span className={`${shared.badge} ${item.badge}`}>
                            {item.label}
                          </span>
                        </td>
                        <td>
                          <span
                            className={styles.ellipsis}
                            title={m.descripcion}
                          >
                            {m.descripcion || "Sin descripción"}
                          </span>
                        </td>
                        {mostrarCobrador && (
                          <td>
                            <Link
                              className={`${styles.ellipsis} !text-inherit !no-underline focus-visible:outline-2 focus-visible:outline-[var(--overview-blue)]`}
                              href={`/admin/caja-cobradores/${m.cobradorId}`}
                              title={m.cobradorNombre}
                            >
                              {m.cobradorNombre}
                            </Link>
                          </td>
                        )}
                        <td>
                          <span className={styles.ellipsis} title={status(m)}>
                            {status(m)}
                          </span>
                        </td>
                        <td
                          className={`${styles.right} ${shared.money} ${item.color}`}
                        >
                          {item.sign} {money(m.importe)}
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <button
                              type="button"
                              className={`${styles.action} ${styles.detailAction}`}
                              onClick={() => setSelected(m)}
                              aria-label={`Ver detalle: ${m.descripcion}`}
                              title="Ver detalle"
                            >
                              <Eye aria-hidden="true" />
                            </button>
                            {hasPayment && (
                              <>
                                <Link
                                  className={`${styles.action} ${styles.receiptAction}`}
                                  href={`/comprobantes/pagos/${m.movimientoFinancieroId}`}
                                  aria-label={`Ver comprobante: ${m.descripcion}`}
                                  title="Ver comprobante"
                                >
                                  <ReceiptText aria-hidden="true" />
                                </Link>
                                <a
                                  className={`${styles.action} ${styles.downloadAction}`}
                                  href={`/api/comprobantes/pagos/${m.movimientoFinancieroId}/pdf?size=a4&download=1`}
                                  download
                                  aria-label={`Descargar comprobante: ${m.descripcion}`}
                                  title="Descargar comprobante"
                                >
                                  <Download aria-hidden="true" />
                                </a>
                                {m.puedeCorregir === true && (
                                  <Link
                                    className={`${styles.action} ${styles.correctionAction}`}
                                    href={`/admin/caja-cobradores/corregir-pago/${m.movimientoFinancieroId}`}
                                    aria-label={`Corregir pago: ${m.descripcion}`}
                                    title="Corregir pago"
                                  >
                                    <FileWarning aria-hidden="true" />
                                  </Link>
                                )}
                              </>
                            )}
                            {m.tipoMovimiento === "cierre_caja" && (
                              <Link
                                className={`${styles.action} ${styles.receiptAction}`}
                                href={`/admin/caja-cobradores/cierres/${m.id}`}
                                aria-label={`Ver cierre: ${m.descripcion}`}
                                title="Ver cierre"
                              >
                                <ReceiptText aria-hidden="true" />
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className={shared.footer}>
              {cantidadTotal === undefined
                ? "Hasta 20 movimientos."
                : `Mostrando ${movimientos.length} de ${cantidadTotal} movimientos.`}{" "}
              Consultá la información completa con el ícono del ojo.
            </div>
          </>
        )}
      </section>

      <dialog
        ref={dialogRef}
        className={`${shared.dialog} ${styles.dialog}`}
        aria-labelledby="movement-detail-title"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
      >
        <div className={shared.panelHeader}>
          <h2 id="movement-detail-title" className={shared.panelTitle}>
            Detalle del movimiento
          </h2>
          <button
            type="button"
            className={shared.iconButton}
            aria-label="Cerrar detalle"
            onClick={() => setSelected(null)}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        {selected && selectedInfo && (
          <div className={shared.dialogBody}>
            <dl className={shared.dialogFacts}>
              <div>
                <dt>Fecha y hora</dt>
                <dd>{date(selected.creadoEn)}</dd>
              </div>
              <div>
                <dt>Tipo</dt>
                <dd>{selectedInfo.label}</dd>
              </div>
              <div>
                <dt>Cobrador</dt>
                <dd>{selected.cobradorNombre}</dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>{status(selected)}</dd>
              </div>
              <div>
                <dt>Importe</dt>
                <dd className={selectedInfo.color}>
                  {selectedInfo.sign} {money(selected.importe)}
                </dd>
              </div>
              <div>
                <dt>Saldo después</dt>
                <dd>{money(selected.saldoCaja)}</dd>
              </div>
              {selected.numeroComprobante && (
                <div>
                  <dt>Comprobante</dt>
                  <dd>N° {selected.numeroComprobante}</dd>
                </div>
              )}
              {selected.estadoComprobante && (
                <div>
                  <dt>Estado del pago</dt>
                  <dd>
                    {selected.estadoComprobante === "corregido_parcialmente"
                      ? "Corregido parcialmente"
                      : "Vigente"}
                  </dd>
                </div>
              )}
              {selected.cerradoEn && (
                <div>
                  <dt>Cerrado el</dt>
                  <dd>{date(selected.cerradoEn)}</dd>
                </div>
              )}
            </dl>
            <div className={styles.detailBlock}>
              <h3>Descripción</h3>
              <p>{selected.descripcion || "Sin descripción."}</p>
            </div>
            {selected.observacion && (
              <div className={styles.detailBlock}>
                <h3>Observaciones</h3>
                <p>{selected.observacion}</p>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

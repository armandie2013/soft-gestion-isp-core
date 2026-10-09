import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, KeyRound, UserRound, WalletCards } from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerDetalleCajaCobradorAdmin } from "@/services/admin-cobrador-caja.service";
import { AdminCajaMovimientosTable } from "@/components/tables/AdminCajaMovimientosTable";
import { AdminCodigoCierreCaja } from "@/components/tables/AdminCobradoresCajaTable";
import { GenerarCodigoCierreCajaForm } from "@/components/forms/GenerarCodigoCierreCajaForm";
import { cajaStyles as styles } from "@/components/ui/dashboard-styles";

export const metadata = { title: "Caja del cobrador" };
export const dynamic = "force-dynamic";

function money(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function CajaCobradorAdminPage({
  params,
}: {
  params: { cobradorId: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.rol !== "admin") redirect(`/${user.rol}`);
  const detalle = await obtenerDetalleCajaCobradorAdmin(params.cobradorId);
  if (!detalle) notFound();
  const { cobrador } = detalle;
  const nombre =
    [cobrador.apellido, cobrador.nombre].filter(Boolean).join(", ") ||
    cobrador.email;
  const tieneCodigo = Boolean(cobrador.codigoPendiente);
  return (
    <div className={`${styles.page} grid-cols-1`}>
      <header className={`${styles.heading} flex-wrap`}>
        <div>
          <h1>Caja del cobrador</h1>
          <p className={styles.description}>{nombre}</p>
        </div>
        <Link href="/admin/caja-cobradores" className={styles.button}>
          <ArrowLeft aria-hidden="true" /> Volver a cajas
        </Link>
      </header>
      <div className="grid min-w-0 grid-cols-1 gap-[14px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className={styles.panel} aria-label="Datos del cobrador">
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              <UserRound aria-hidden="true" /> Datos del cobrador
            </h2>
          </div>
          <div className={styles.sideBody}>
            <dl
              className={`${styles.dialogFacts} [&_dd]:max-w-full [&_dd]:text-right [&_dd]:[overflow-wrap:anywhere]`}
            >
              <div>
                <dt>Nombre</dt>
                <dd>{nombre}</dd>
              </div>
              <div>
                <dt>DNI</dt>
                <dd>{cobrador.dni || "Sin DNI"}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{cobrador.email || "Sin email"}</dd>
              </div>
              <div>
                <dt>Cuenta</dt>
                <dd>{cobrador.estado === "activo" ? "Activa" : "Inactiva"}</dd>
              </div>
            </dl>
          </div>
        </section>
        <section
          className={styles.panel}
          aria-label="Saldo y rendición del cobrador"
        >
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>
              <WalletCards aria-hidden="true" /> Saldo y rendición
            </h2>
          </div>
          <div className={styles.sideBody}>
            <p className={styles.muted}>Disponible para rendir</p>
            <p className="mt-1 text-[length:26px] font-medium text-[var(--overview-green)] tabular-nums">
              {money(detalle.disponibleParaRendir)}
            </p>
            <div className={styles.sideRow}>
              <span>Saldo actual de caja</span>
              <span className={styles.money}>
                {money(cobrador.saldoActual)}
              </span>
            </div>
            {cobrador.saldoActual < 0 && (
              <p className="mt-2 text-[length:12px] text-[var(--overview-amber)]">
                El saldo negativo se compensa con los próximos cobros. No hay
                importe disponible para rendir.
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              {tieneCodigo ? (
                <AdminCodigoCierreCaja cobrador={cobrador} />
              ) : (
                <span className={styles.muted}>
                  <KeyRound className="mr-1 inline" aria-hidden="true" /> Sin
                  código activo
                </span>
              )}
              <GenerarCodigoCierreCajaForm
                cobradorId={cobrador.cobradorId}
                disabled={
                  cobrador.saldoActual <= 0 ||
                  tieneCodigo ||
                  cobrador.estado !== "activo"
                }
              />
            </div>
          </div>
        </section>
      </div>
      <AdminCajaMovimientosTable
        movimientos={detalle.movimientos}
        mostrarCobrador={false}
        cantidadTotal={detalle.cantidadMovimientos}
      />
    </div>
  );
}

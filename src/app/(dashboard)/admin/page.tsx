// src/app/(dashboard)/admin/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileText,
  ReceiptText,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
  Wifi,
} from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { obtenerAdminDashboardResumen } from "@/services/admin-dashboard.service";
import { PageShell } from "@/components/ui/PageShell";
import {
  DashboardAside,
  DashboardGrid,
  DashboardMain,
} from "@/components/ui/DashboardGrid";

export const metadata = {
  title: "Administrador",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatDate(value: string | null) {
  if (!value) return "Sin cierre";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string | null) {
  if (!value) return "Sin fecha";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function movimientoLabel(tipo: string) {
  const labels: Record<string, string> = {
    factura: "Factura",
    pago: "Cobro",
    nota_debito: "Nota débito",
    nota_credito: "Nota crédito",
  };

  return labels[tipo] || "Movimiento";
}

function getInitials(name: string) {
  const parts = name
    .replace(",", " ")
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) return "CB";

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  href: string;
  icon: typeof Banknote;
  tone: "dark" | "red" | "cyan" | "violet" | "amber";
};

const statToneClasses = {
  dark: "bg-slate-950 text-white dark:bg-cyan-500 dark:text-slate-950",
  red: "bg-red-600 text-white dark:bg-red-500 dark:text-white",
  cyan: "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950",
  violet: "bg-violet-600 text-white dark:bg-violet-500 dark:text-white",
  amber: "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950",
};

function StatCard({
  title,
  value,
  description,
  href,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full min-h-[122px] flex-col justify-between rounded-[1.35rem] border border-slate-200 bg-white/85 p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/75 dark:hover:border-cyan-800"
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm ${statToneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p
            className={`mt-1 text-xl font-medium tracking-tight ${
              tone === "red"
                ? "text-red-700 dark:text-red-300"
                : "text-slate-950 dark:text-white"
            }`}
          >
            {value}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end border-t border-slate-200 pt-2.5 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Ver detalle
        <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
      </div>
    </Link>
  );
}

const quickActions = [
  {
    label: "Ver usuarios",
    href: "/usuarios",
    icon: UsersRound,
  },
  {
    label: "Ver clientes",
    href: "/clientes",
    icon: UserRound,
  },
  {
    label: "Caja cobradores",
    href: "/admin/caja-cobradores",
    icon: WalletCards,
  },
  {
    label: "Facturación mensual",
    href: "/admin/configuracion/facturacion",
    icon: ReceiptText,
  },
  {
    label: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "admin") {
    redirect(`/${user.rol}`);
  }

  const resumen = await obtenerAdminDashboardResumen();
  const hayMasDeUnCobrador = resumen.cobradores.length > 1;
  const fechaActual = new Date().toISOString();

  return (
    <PageShell maxWidth="wide">
      <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Cuenta administración"
          value={formatMoney(resumen.totalCuentaAdmin)}
          description="Total recibido por cierres de caja confirmados."
          href="/admin/caja-cobradores/cierres"
          icon={Banknote}
          tone="dark"
        />

        <StatCard
          title="En cobradores"
          value={formatMoney(resumen.totalEnCajaCobradores)}
          description="Total en cajas de cobradores sin confirmar."
          href="/admin/caja-cobradores"
          icon={WalletCards}
          tone="red"
        />

        <div className="hidden h-full lg:block">
          <StatCard
            title="Cobradores activos"
            value={String(resumen.totalCobradores)}
            description="Cobradores con cuenta asignada activa."
            href="/usuarios?rol=cobrador"
            icon={UsersRound}
            tone="cyan"
          />
        </div>

        <div className="hidden h-full lg:block">
          <StatCard
            title="Clientes registrados"
            value={String(resumen.totalClientes)}
            description={`${resumen.clientesActivos} activos en el sistema.`}
            href="/clientes"
            icon={UserRound}
            tone="violet"
          />
        </div>

        <div className="hidden h-full lg:block">
          <StatCard
            title="Facturas emitidas"
            value={String(resumen.facturasEmitidas)}
            description="Movimientos emitidos como factura."
            href="/admin/configuracion/facturacion"
            icon={FileText}
            tone="amber"
          />
        </div>
      </div>

      <DashboardGrid>
        <DashboardMain>
          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Cobradores
                </p>

                <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
                  Cuentas activas
                </h2>
              </div>

              <Link
                href="/admin/caja-cobradores"
                className="hidden items-center justify-end gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200 md:inline-flex"
              >
                Ver caja cobradores
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {resumen.cobradores.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                Todavía no hay usuarios con rol cobrador.
              </div>
            ) : (
              <>
                <div className="hidden overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 md:block">
                  <div className="grid grid-cols-[minmax(180px,1.25fr)_1fr_1fr_1fr_0.8fr_110px] border-b border-slate-200 bg-slate-50 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
                    <span>Cobrador</span>
                    <span>Cuenta actual</span>
                    <span>Último retiro</span>
                    <span>Último cierre</span>
                    <span>Situación</span>
                    <span className="text-right">Acción</span>
                  </div>

                  <div className="divide-y divide-slate-200 dark:divide-slate-800">
                    {resumen.cobradores.map((cobrador) => {
                      const tieneSaldoPendiente = cobrador.saldoActual > 0;

                      return (
                        <div
                          key={cobrador.cobradorId}
                          className="grid grid-cols-[minmax(180px,1.25fr)_1fr_1fr_1fr_0.8fr_110px] items-center gap-3 px-3 py-3"
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                              {getInitials(cobrador.nombreCompleto)}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-xs font-medium text-slate-950 dark:text-white">
                                {cobrador.nombreCompleto}
                              </p>

                              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                                {cobrador.email || "Sin email"}
                              </p>
                            </div>
                          </div>

                          <p
                            className={`truncate text-xs font-medium ${
                              tieneSaldoPendiente
                                ? "text-red-700 dark:text-red-300"
                                : "text-slate-950 dark:text-white"
                            }`}
                          >
                            {formatMoney(cobrador.saldoActual)}
                          </p>

                          <p className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
                            {formatMoney(cobrador.ultimoRetiroImporte)}
                          </p>

                          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {formatDate(cobrador.ultimoRetiroFecha)}
                          </p>

                          <span
                            title={
                              tieneSaldoPendiente
                                ? "El cobrador tiene dinero pendiente de cierre o entrega."
                                : "El cobrador no tiene saldo pendiente en caja."
                            }
                            className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-5 ${
                              tieneSaldoPendiente
                                ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300"
                                : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {tieneSaldoPendiente ? "Pendiente" : "Al día"}
                          </span>

                          <div className="text-right">
                            <Link
                              href="/admin/caja-cobradores"
                              className="inline-flex h-8 items-center justify-center rounded-xl border border-slate-200 bg-white px-2.5 text-[11px] font-medium text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-cyan-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/30"
                            >
                              Ver detalle
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full overflow-hidden rounded-2xl md:hidden">
                  <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex snap-x snap-mandatory">
                      {resumen.cobradores.map((cobrador) => (
                        <div
                          key={cobrador.cobradorId}
                          className="w-full min-w-full shrink-0 snap-start"
                        >
                          <Link
                            href="/admin/caja-cobradores"
                            className="block min-h-[140px] rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-cyan-800"
                          >
                            <div className="flex min-h-[116px] flex-col justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-slate-950 dark:text-white">
                                  {cobrador.nombreCompleto}
                                </p>

                                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                  Cuenta actual
                                </p>
                              </div>

                              <p
                                className={`text-2xl font-medium leading-none tracking-tight ${
                                  cobrador.saldoActual > 0
                                    ? "text-red-700 dark:text-red-300"
                                    : "text-slate-950 dark:text-white"
                                }`}
                              >
                                {formatMoney(cobrador.saldoActual)}
                              </p>

                              <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-2 dark:border-slate-800">
                                <div className="min-w-0">
                                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                                    Último retiro
                                  </p>

                                  <p className="truncate text-xs font-medium leading-5 text-slate-800 dark:text-slate-200">
                                    {formatMoney(cobrador.ultimoRetiroImporte)}
                                  </p>
                                </div>

                                <div className="min-w-0 text-right">
                                  <div className="flex items-center justify-end gap-1 text-slate-500 dark:text-slate-400">
                                    <CalendarClock className="h-3 w-3" />

                                    <p className="text-[10px] font-medium uppercase tracking-[0.12em]">
                                      Último cierre
                                    </p>
                                  </div>

                                  <p className="truncate text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                                    {formatDate(cobrador.ultimoRetiroFecha)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {hayMasDeUnCobrador ? (
                  <div className="mt-3 flex items-center justify-center gap-1.5 md:hidden">
                    {resumen.cobradores.map((cobrador) => (
                      <span
                        key={cobrador.cobradorId}
                        className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700"
                      />
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 flex items-center justify-end border-t border-slate-200 pt-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400 md:hidden">
                  <Link
                    href="/admin/caja-cobradores"
                    className="group inline-flex items-center text-slate-500 transition hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
                  >
                    Ver detalle
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 lg:block">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Últimos movimientos
                </p>

                <h2 className="mt-0.5 text-base font-medium text-slate-950 dark:text-white">
                  Movimientos recientes en el sistema
                </h2>
              </div>

              <Link
                href="/clientes"
                className="hidden items-center gap-1.5 text-xs font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200 sm:inline-flex"
              >
                Ver clientes
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {resumen.ultimosMovimientos.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                Todavía no hay movimientos financieros registrados.
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="hidden grid-cols-[150px_120px_1fr_130px_120px] border-b border-slate-200 bg-slate-50 px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400 md:grid">
                  <span>Fecha</span>
                  <span>Tipo</span>
                  <span>Detalle</span>
                  <span>Importe</span>
                  <span>Estado</span>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {resumen.ultimosMovimientos.map((movimiento) => (
                    <div
                      key={movimiento.id}
                      className="grid gap-3 p-3 md:grid-cols-[150px_120px_1fr_130px_120px] md:items-center"
                    >
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {formatDateTime(movimiento.fecha)}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                          <ReceiptText className="h-3.5 w-3.5" />
                        </span>

                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                          {movimientoLabel(movimiento.tipoMovimiento)}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-slate-900 dark:text-white">
                          {movimiento.detalle}
                        </p>

                        <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                          {movimiento.usuarioNombre} · {movimiento.usuarioRol}
                        </p>
                      </div>

                      <p className="text-xs font-medium text-slate-950 dark:text-white">
                        {formatMoney(movimiento.importe)}
                      </p>

                      <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium leading-5 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        Confirmado
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DashboardMain>

        <DashboardAside>
          <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Acciones rápidas
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Atajos a secciones principales
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
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 text-slate-500 transition group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-300" />
                      {item.label}
                    </span>

                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  Resumen rápido
                </p>

                <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                  Datos principales
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <UsersRound className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                  Clientes activos
                </span>

                <strong className="text-xs font-medium text-slate-950 dark:text-white">
                  {resumen.clientesActivos}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <Wifi className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                  Planes activos
                </span>

                <strong className="text-xs font-medium text-slate-950 dark:text-white">
                  {resumen.planesActivos}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-2.5 dark:border-slate-800">
                <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <Clock3 className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                  Códigos pendientes
                </span>

                <strong
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    resumen.codigosPendientes > 0
                      ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                      : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                  }`}
                >
                  {resumen.codigosPendientes}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <span className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CalendarClock className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                  Actualizado
                </span>

                <strong className="text-right text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {formatDateTime(fechaActual)}
                </strong>
              </div>
            </div>
          </div>

          <div className="hidden rounded-[1.45rem] border border-slate-200 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 xl:block">
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                Estado del sistema
              </p>

              <h2 className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Información general
              </h2>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Sesión activa
                </span>

                <span className="font-medium text-emerald-700 dark:text-emerald-300">
                  Sí
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
                <span className="text-slate-600 dark:text-slate-400">
                  Rol actual
                </span>

                <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                  Admin
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
                <span className="text-slate-600 dark:text-slate-400">
                  Cobradores con saldo
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    resumen.totalEnCajaCobradores > 0
                      ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                      : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                  }`}
                >
                  {resumen.cobradores.filter((c) => c.saldoActual > 0).length}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-950/50">
                <span className="text-slate-600 dark:text-slate-400">
                  Estado general
                </span>

                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Activo
                </span>
              </div>
            </div>
          </div>
        </DashboardAside>
      </DashboardGrid>
    </PageShell>
  );
}
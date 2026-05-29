import Link from "next/link";
import {
  CreditCard,
  FileText,
  Home,
  ReceiptText,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
  Wifi,
} from "lucide-react";
import { brandConfig } from "@/config/brand.config";
import type { UserRole } from "@/types/usuario.types";

type DashboardSidebarProps = {
  rol: UserRole;
};

const linksByRole = {
  admin: [
    {
      label: "Panel admin",
      href: "/admin",
      icon: ShieldCheck,
    },
    {
      label: "Usuarios",
      href: "/usuarios",
      icon: UsersRound,
    },
    {
      label: "Clientes",
      href: "/clientes",
      icon: UserRound,
    },
    {
      label: "Planes",
      href: "/planes",
      icon: Wifi,
    },
    {
      label: "Configuración",
      href: "/admin/configuracion",
      icon: Settings,
    },
    {
      label: "Facturación mensual",
      href: "/admin/configuracion/facturacion",
      icon: ReceiptText,
    },
  ],
  cobrador: [
    {
      label: "Panel cobrador",
      href: "/cobrador",
      icon: CreditCard,
    },
  ],
  cliente: [
    {
      label: "Mi panel",
      href: "/cliente",
      icon: Home,
    },
  ],
} satisfies Record<
  UserRole,
  Array<{ label: string; href: string; icon: typeof Home }>
>;

export function DashboardSidebar({ rol }: DashboardSidebarProps) {
  const links = linksByRole[rol];

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white/80 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 lg:sticky lg:top-0 lg:block">
      <div className="flex h-full flex-col">
        <Link
          href="/"
          className="mb-6 flex items-center gap-3 rounded-2xl px-2 py-2"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-950/10 dark:bg-cyan-500 dark:text-cyan-950">
            <Wifi className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
              {brandConfig.ispName}
            </p>
            <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
              {brandConfig.appName}
            </p>
          </div>
        </Link>

        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Rol activo
          </p>
          <p className="mt-1 text-sm font-semibold capitalize text-slate-950 dark:text-white">
            {rol}
          </p>
        </div>
      </div>
    </aside>
  );
}
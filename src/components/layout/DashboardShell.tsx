"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CalendarCheck, CreditCard, FileClock, Home, KeyRound,
  LayoutDashboard, Menu, ReceiptText, Search, Settings,
  UserRound, UsersRound, WalletCards, Wifi, X,
  type LucideIcon,
} from "lucide-react";
import { brandConfig } from "@/config/brand.config";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LogoutButton } from "@/components/layout/LogoutButton";
import type { AuthTokenPayload } from "@/lib/jwt";
import type { UserRole } from "@/types/usuario.types";
import { overviewStyles as styles } from "@/components/ui/dashboard-styles";

type NavLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  mobileLabel?: string;
};
type NavGroup = { label: string; links: NavLink[] };
type RoleNavigation = {
  label: string;
  area: string;
  home: NavLink;
  groups: NavGroup[];
};

const navigation: Record<UserRole, RoleNavigation> = {
  admin: {
    label: "Administrador",
    area: "Administración",
    home: { label: "Panel general", href: "/admin", icon: LayoutDashboard, mobileLabel: "Inicio" },
    groups: [
      { label: "Gestión", links: [
        { label: "Clientes", href: "/clientes", icon: UsersRound, mobileLabel: "Clientes" },
        { label: "Planes", href: "/planes", icon: Wifi },
        { label: "Usuarios", href: "/usuarios", icon: UserRound },
      ] },
      { label: "Finanzas", links: [
        { label: "Caja cobradores", href: "/admin/caja-cobradores", icon: WalletCards, mobileLabel: "Cajas" },
        { label: "Facturación mensual", href: "/admin/configuracion/facturacion", icon: ReceiptText },
        { label: "Cierres de caja", href: "/admin/caja-cobradores/cierres", icon: CalendarCheck },
      ] },
      { label: "Sistema", links: [
        { label: "Auditoría", href: "/admin/auditoria", icon: FileClock },
        { label: "Configuración", href: "/admin/configuracion", icon: Settings },
      ] },
    ],
  },
  cobrador: {
    label: "Cobrador",
    area: "Cobranzas",
    home: { label: "Panel cobrador", href: "/cobrador", icon: CreditCard, mobileLabel: "Inicio" },
    groups: [
      { label: "Gestión", links: [
        { label: "Buscar cliente", href: "/cobrador/buscar-cliente", icon: Search, mobileLabel: "Buscar" },
      ] },
      { label: "Caja", links: [
        { label: "Mi caja", href: "/cobrador/caja", icon: WalletCards, mobileLabel: "Mi caja" },
        { label: "Cerrar caja", href: "/cobrador/caja/cierre", icon: KeyRound },
      ] },
    ],
  },
  cliente: {
    label: "Cliente",
    area: "Mi cuenta",
    home: { label: "Mi panel", href: "/cliente", icon: Home, mobileLabel: "Inicio" },
    groups: [],
  },
};

function matchesPath(pathname: string, link: NavLink, homeHref: string) {
  return pathname === link.href ||
    (link.href !== homeHref && pathname.startsWith(`${link.href}/`));
}

export function DashboardShell({ user, children }: {
  user: AuthTokenPayload;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const config = navigation[user.rol];
  const links = [config.home, ...config.groups.flatMap((group) => group.links)];
  const active = links
    .filter((link) => matchesPath(pathname, link, config.home.href))
    .sort((a, b) => b.href.length - a.href.length)[0];
  const pageTitle = active?.label ?? "Comprobante";
  const bottomLinks = links.filter((link) => link.mobileLabel);
  const HomeIcon = config.home.icon;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  function closeMenu() {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  function renderLink(link: NavLink, mobile = false) {
    const Icon = link.icon;
    const isActive = active?.href === link.href;
    return (
      <Link key={link.href} href={link.href}
        className={mobile ? styles.menuLink : `${styles.navLink} ${isActive ? styles.activeLink : ""}`}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setMenuOpen(false)}>
        <Icon aria-hidden="true" /><span>{link.label}</span>
      </Link>
    );
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Navegación principal">
        <Link href={config.home.href} className={styles.brand}>
          <span className={styles.brandIcon}><Wifi aria-hidden="true" /></span>
          <span className={styles.brandText}>
            <span>{brandConfig.ispName}</span><small>{brandConfig.appName}</small>
          </span>
        </Link>
        <nav>
          {renderLink(config.home)}
          {config.groups.map((group) => (
            <div key={group.label}>
              <p className={styles.navLabel}>{group.label}</p>
              {group.links.map((link) => renderLink(link))}
            </div>
          ))}
        </nav>
        <div className={styles.account}>
          <span className={styles.avatar}>{user.nombre.trim().slice(0, 2).toUpperCase() || "US"}</span>
          <span className={styles.accountText}><span>{user.nombre}</span><small>{config.label}</small></span>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <span className={styles.breadcrumb}>{config.area} <span>/</span> {pageTitle}</span>
          <Link href={config.home.href} className={styles.mobileBrand}><Wifi aria-hidden="true" /><span>{brandConfig.appName}</span></Link>
          <div className={styles.headerActions}>
            <ThemeToggle />
            <div className={styles.desktopLogout}><LogoutButton /></div>
            <button type="button" ref={menuButtonRef} className={styles.mobileMenuButton}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen} aria-controls="dashboard-menu"
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </header>

        <nav id="dashboard-menu" className={styles.mobileMenu} hidden={!menuOpen}
          aria-label="Menú principal"
          onKeyDown={(event) => { if (event.key === "Escape") closeMenu(); }}>
          <div className={styles.mobileMenuHeader}>
            <span>{user.nombre} · {config.label}</span>
            <button type="button" className={styles.iconButton} onClick={closeMenu} aria-label="Cerrar menú"><X aria-hidden="true" /></button>
          </div>
          <div className={styles.menuGrid}>{renderLink(config.home, true)}</div>
          {config.groups.map((group) => (
            <div key={group.label}>
              <p className={styles.navLabel}>{group.label}</p>
              <div className={styles.menuGrid}>{group.links.map((link) => renderLink(link, true))}</div>
            </div>
          ))}
          <div className={styles.menuLogout}><LogoutButton /></div>
        </nav>

        <main className={styles.main}>{children}</main>
      </div>

      <nav className={styles.bottomNav} aria-label="Accesos principales"
        style={{ gridTemplateColumns: `repeat(${bottomLinks.length + 1}, minmax(0, 1fr))` }}>
        {bottomLinks.map((link) => {
          const Icon = link.href === config.home.href ? HomeIcon : link.icon;
          const isActive = active?.href === link.href ||
            (link.href !== config.home.href && active?.href.startsWith(`${link.href}/`));
          return <Link key={link.href} href={link.href}
            className={isActive ? styles.bottomActive : undefined}
            aria-current={active?.href === link.href ? "page" : undefined}
            onClick={() => setMenuOpen(false)}>
            <Icon aria-hidden="true" /><span>{link.mobileLabel}</span>
          </Link>;
        })}
        <button type="button" aria-expanded={menuOpen} aria-controls="dashboard-menu"
          onClick={() => {
            setMenuOpen(true);
            window.requestAnimationFrame(() => {
              document.getElementById("dashboard-menu")?.scrollIntoView({ block: "start" });
              menuButtonRef.current?.focus({ preventScroll: true });
            });
          }}><Menu aria-hidden="true" /><span>Más</span></button>
      </nav>
    </div>
  );
}
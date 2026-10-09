"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import {
  CalendarCheck,
  FileClock,
  LayoutDashboard,
  Menu,
  ReceiptText,
  Settings,
  UserRound,
  UsersRound,
  WalletCards,
  Wifi,
  X,
} from "lucide-react";
import { brandConfig } from "@/config/brand.config";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LogoutButton } from "@/components/layout/LogoutButton";
import type { AuthTokenPayload } from "@/lib/jwt";
import styles from "./admin-overview.module.css";

const groups = [
  {
    label: "Gestión",
    links: [
      { label: "Clientes", href: "/clientes", icon: UsersRound },
      { label: "Planes", href: "/planes", icon: Wifi },
      { label: "Usuarios", href: "/usuarios", icon: UserRound },
    ],
  },
  {
    label: "Finanzas",
    links: [
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
        label: "Cierres de caja",
        href: "/admin/caja-cobradores/cierres",
        icon: CalendarCheck,
      },
    ],
  },
  {
    label: "Sistema",
    links: [
      {
        label: "Auditoría",
        href: "/admin/auditoria",
        icon: FileClock,
      },
      {
        label: "Configuración",
        href: "/admin/configuracion",
        icon: Settings,
      },
    ],
  },
];

export function AdminOverviewShell({
  user,
  children,
}: {
  user: AuthTokenPayload;
  children: ReactNode;
}) {
  const pathname = usePathname();

  const pageTitle =
    pathname === "/admin/caja-cobradores"
      ? "Caja cobradores"
      : "Panel general";

  const linkClass = (href: string) =>
    `${styles.navLink} ${
      pathname === href ? styles.activeLink : ""
    }`;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <div className={styles.shell}>
      <aside
        className={styles.sidebar}
        aria-label="Navegación de administración"
      >
        <Link href="/admin" className={styles.brand}>
          <span className={styles.brandIcon}>
            <Wifi aria-hidden="true" />
          </span>

          <span className={styles.brandText}>
            <span>{brandConfig.ispName}</span>
            <small>{brandConfig.appName}</small>
          </span>
        </Link>

        <nav>
          <Link
            href="/admin"
            className={linkClass("/admin")}
            aria-current={
              pathname === "/admin" ? "page" : undefined
            }
          >
            <LayoutDashboard aria-hidden="true" />
            Panel general
          </Link>

          {groups.map((group) => (
            <div key={group.label}>
              <p className={styles.navLabel}>
                {group.label}
              </p>

              {group.links.map(
                ({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={linkClass(href)}
                    aria-current={
                      pathname === href ? "page" : undefined
                    }
                  >
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                ),
              )}
            </div>
          ))}
        </nav>

        <div className={styles.account}>
          <span className={styles.avatar}>
            {user.nombre
              .trim()
              .slice(0, 2)
              .toUpperCase() || "AD"}
          </span>

          <span className={styles.accountText}>
            <span>{user.nombre}</span>
            <small>Administrador</small>
          </span>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <span className={styles.breadcrumb}>
            Administración <span>/</span> {pageTitle}
          </span>

          <Link
            href="/admin"
            className={styles.mobileBrand}
          >
            <Wifi aria-hidden="true" />
            <span>{brandConfig.appName}</span>
          </Link>

          <div className={styles.headerActions}>
            <ThemeToggle />

            <div className={styles.desktopLogout}>
              <LogoutButton />
            </div>

            <button
              type="button"
              ref={menuButtonRef}
              className={styles.mobileMenuButton}
              aria-label={
                menuOpen ? "Cerrar menú" : "Abrir menú"
              }
              aria-expanded={menuOpen}
              aria-controls="admin-overview-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </button>
          </div>
        </header>

        <nav
          id="admin-overview-menu"
          className={styles.mobileMenu}
          hidden={!menuOpen}
          aria-label="Más opciones de administración"
          onKeyDown={(event) => {
            if (event.key === "Escape") closeMenu();
          }}
        >
          <div className={styles.mobileMenuHeader}>
            <span>
              {user.nombre} · Administrador
            </span>

            <button
              type="button"
              className={styles.iconButton}
              onClick={closeMenu}
              aria-label="Cerrar menú"
            >
              <X aria-hidden="true" />
            </button>
          </div>

          {groups.map((group) => (
            <div key={group.label}>
              <p className={styles.navLabel}>
                {group.label}
              </p>

              <div className={styles.menuGrid}>
                {group.links.map(
                  ({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={styles.menuLink}
                      aria-current={
                        pathname === href
                          ? "page"
                          : undefined
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}

          <div className={styles.menuLogout}>
            <LogoutButton />
          </div>
        </nav>

        <main className={styles.main}>
          {children}
        </main>
      </div>

      <nav
        className={styles.bottomNav}
        aria-label="Navegación principal"
      >
        <Link
          href="/admin"
          className={
            pathname === "/admin"
              ? styles.bottomActive
              : undefined
          }
          aria-current={
            pathname === "/admin" ? "page" : undefined
          }
        >
          <LayoutDashboard aria-hidden="true" />
          <span>Inicio</span>
        </Link>

        <Link href="/clientes">
          <UsersRound aria-hidden="true" />
          <span>Clientes</span>
        </Link>

        <Link
          href="/admin/caja-cobradores"
          className={
            pathname === "/admin/caja-cobradores"
              ? styles.bottomActive
              : undefined
          }
          aria-current={
            pathname === "/admin/caja-cobradores"
              ? "page"
              : undefined
          }
        >
          <WalletCards aria-hidden="true" />
          <span>Cajas</span>
        </Link>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="admin-overview-menu"
          onClick={() => {
            setMenuOpen(true);

            window.requestAnimationFrame(() => {
              document
                .getElementById("admin-overview-menu")
                ?.scrollIntoView({ block: "start" });

              menuButtonRef.current?.focus({
                preventScroll: true,
              });
            });
          }}
        >
          <Menu aria-hidden="true" />
          <span>Más</span>
        </button>
      </nav>
    </div>
  );
}
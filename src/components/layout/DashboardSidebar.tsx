// import Link from "next/link";
// import {
//   CreditCard,
//   Home,
//   KeyRound,
//   ReceiptText,
//   Search,
//   Settings,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { brandConfig } from "@/config/brand.config";
// import type { UserRole } from "@/types/usuario.types";

// type DashboardSidebarProps = {
//   rol: UserRole;
// };

// const linksByRole = {
//   admin: [
//     {
//       label: "Panel admin",
//       href: "/admin",
//       icon: ShieldCheck,
//     },
//     {
//       label: "Usuarios",
//       href: "/usuarios",
//       icon: UsersRound,
//     },
//     {
//       label: "Clientes",
//       href: "/clientes",
//       icon: UserRound,
//     },
//     {
//       label: "Planes",
//       href: "/planes",
//       icon: Wifi,
//     },
//     {
//       label: "Caja cobradores",
//       href: "/admin/caja-cobradores",
//       icon: WalletCards,
//     },
//     {
//       label: "Configuración",
//       href: "/admin/configuracion",
//       icon: Settings,
//     },
//     {
//       label: "Facturación mensual",
//       href: "/admin/configuracion/facturacion",
//       icon: ReceiptText,
//     },
//   ],

//   cobrador: [
//     {
//       label: "Panel cobrador",
//       href: "/cobrador",
//       icon: CreditCard,
//     },
//     {
//       label: "Buscar cliente",
//       href: "/cobrador/buscar-cliente",
//       icon: Search,
//     },
//     {
//       label: "Mi caja",
//       href: "/cobrador/caja",
//       icon: WalletCards,
//     },
//     {
//       label: "Cerrar caja",
//       href: "/cobrador/caja/cierre",
//       icon: KeyRound,
//     },
//   ],

//   cliente: [
//     {
//       label: "Mi panel",
//       href: "/cliente",
//       icon: Home,
//     },
//   ],
// } satisfies Record<
//   UserRole,
//   Array<{ label: string; href: string; icon: typeof Home }>
// >;

// export function DashboardSidebar({ rol }: DashboardSidebarProps) {
//   const links = linksByRole[rol];

//   return (
//     <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white/80 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 lg:sticky lg:top-0 lg:block">
//       <div className="flex h-full flex-col">
//         <Link
//           href="/"
//           className="mb-6 flex items-center gap-3 rounded-2xl px-2 py-2"
//         >
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-950/10 dark:bg-cyan-500 dark:text-cyan-950">
//             <Wifi className="h-5 w-5" />
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
//               {brandConfig.ispName}
//             </p>

//             <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//               {brandConfig.appName}
//             </p>
//           </div>
//         </Link>

//         <nav className="space-y-1">
//           {links.map((item) => {
//             const Icon = item.icon;

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
//               >
//                 <Icon className="h-4 w-4" />
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
//           <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
//             Rol activo
//           </p>

//           <p className="mt-1 text-sm font-semibold capitalize text-slate-950 dark:text-white">
//             {rol}
//           </p>
//         </div>
//       </div>
//     </aside>
//   );
// }

// import Link from "next/link";
// import {
//   CreditCard,
//   FileClock,
//   Home,
//   KeyRound,
//   ReceiptText,
//   Search,
//   Settings,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { brandConfig } from "@/config/brand.config";
// import type { UserRole } from "@/types/usuario.types";

// type DashboardSidebarProps = {
//   rol: UserRole;
// };

// const linksByRole = {
//   admin: [
//     {
//       label: "Panel General",
//       href: "/admin",
//       icon: ShieldCheck,
//     },
//     {
//       label: "Usuarios",
//       href: "/usuarios",
//       icon: UsersRound,
//     },
//     {
//       label: "Clientes",
//       href: "/clientes",
//       icon: UserRound,
//     },
//     {
//       label: "Planes",
//       href: "/planes",
//       icon: Wifi,
//     },
//     {
//       label: "Caja cobradores",
//       href: "/admin/caja-cobradores",
//       icon: WalletCards,
//     },
//     {
//       label: "Auditoría",
//       href: "/admin/auditoria",
//       icon: FileClock,
//     },
//     {
//       label: "Configuración",
//       href: "/admin/configuracion",
//       icon: Settings,
//     },
//     {
//       label: "Facturación mensual",
//       href: "/admin/configuracion/facturacion",
//       icon: ReceiptText,
//     },
//   ],

//   cobrador: [
//     {
//       label: "Panel cobrador",
//       href: "/cobrador",
//       icon: CreditCard,
//     },
//     {
//       label: "Buscar cliente",
//       href: "/cobrador/buscar-cliente",
//       icon: Search,
//     },
//     {
//       label: "Mi caja",
//       href: "/cobrador/caja",
//       icon: WalletCards,
//     },
//     {
//       label: "Cerrar caja",
//       href: "/cobrador/caja/cierre",
//       icon: KeyRound,
//     },
//   ],

//   cliente: [
//     {
//       label: "Mi panel",
//       href: "/cliente",
//       icon: Home,
//     },
//   ],
// } satisfies Record<
//   UserRole,
//   Array<{ label: string; href: string; icon: typeof Home }>
// >;

// export function DashboardSidebar({ rol }: DashboardSidebarProps) {
//   const links = linksByRole[rol];

//   return (
//     <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white/80 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 lg:sticky lg:top-0 lg:block">
//       <div className="flex h-full flex-col">
//         <Link
//           href="/"
//           className="mb-6 flex items-center gap-3 rounded-2xl px-2 py-2"
//         >
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-950/10 dark:bg-cyan-500 dark:text-cyan-950">
//             <Wifi className="h-5 w-5" />
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
//               {brandConfig.ispName}
//             </p>

//             <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//               {brandConfig.appName}
//             </p>
//           </div>
//         </Link>

//         <nav className="space-y-1">
//           {links.map((item) => {
//             const Icon = item.icon;

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
//               >
//                 <Icon className="h-4 w-4" />
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
//           <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
//             Rol activo
//           </p>

//           <p className="mt-1 text-sm font-semibold capitalize text-slate-950 dark:text-white">
//             {rol}
//           </p>
//         </div>
//       </div>
//     </aside>
//   );
// }

// // src/components/layout/DashboardSidebar.tsx

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import type { LucideIcon } from "lucide-react";
// import {
//   CreditCard,
//   FileClock,
//   Home,
//   KeyRound,
//   ReceiptText,
//   Search,
//   Settings,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
// } from "lucide-react";
// import { brandConfig } from "@/config/brand.config";
// import type { UserRole } from "@/types/usuario.types";

// type DashboardSidebarProps = {
//   rol: UserRole;
// };

// type SidebarLink = {
//   label: string;
//   href: string;
//   icon: LucideIcon;
// };

// const linksByRole = {
//   admin: [
//     {
//       label: "Panel General",
//       href: "/admin",
//       icon: ShieldCheck,
//     },
//     {
//       label: "Usuarios",
//       href: "/usuarios",
//       icon: UsersRound,
//     },
//     {
//       label: "Clientes",
//       href: "/clientes",
//       icon: UserRound,
//     },
//     {
//       label: "Planes",
//       href: "/planes",
//       icon: Wifi,
//     },
//     {
//       label: "Caja cobradores",
//       href: "/admin/caja-cobradores",
//       icon: WalletCards,
//     },
//     {
//       label: "Auditoría",
//       href: "/admin/auditoria",
//       icon: FileClock,
//     },
//     {
//       label: "Configuración",
//       href: "/admin/configuracion",
//       icon: Settings,
//     },
//     {
//       label: "Facturación mensual",
//       href: "/admin/configuracion/facturacion",
//       icon: ReceiptText,
//     },
//   ],

//   cobrador: [
//     {
//       label: "Panel cobrador",
//       href: "/cobrador",
//       icon: CreditCard,
//     },
//     {
//       label: "Buscar cliente",
//       href: "/cobrador/buscar-cliente",
//       icon: Search,
//     },
//     {
//       label: "Mi caja",
//       href: "/cobrador/caja",
//       icon: WalletCards,
//     },
//     {
//       label: "Cerrar caja",
//       href: "/cobrador/caja/cierre",
//       icon: KeyRound,
//     },
//   ],

//   cliente: [
//     {
//       label: "Mi panel",
//       href: "/cliente",
//       icon: Home,
//     },
//   ],
// } satisfies Record<UserRole, SidebarLink[]>;

// function isActivePath(pathname: string, href: string) {
//   if (href === "/admin") {
//     return pathname === "/admin";
//   }

//   if (href === "/cobrador") {
//     return pathname === "/cobrador";
//   }

//   if (href === "/cliente") {
//     return pathname === "/cliente";
//   }

//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function roleLabel(rol: UserRole) {
//   if (rol === "admin") return "Admin";
//   if (rol === "cobrador") return "Cobrador";
//   return "Cliente";
// }

// export function DashboardSidebar({ rol }: DashboardSidebarProps) {
//   const pathname = usePathname();
//   const links = linksByRole[rol];

//   return (
//     <aside className="hidden h-screen w-[17rem] shrink-0 border-r border-slate-200 bg-white/88 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/86 lg:sticky lg:top-0 lg:block">
//       <div className="flex h-full flex-col">
//         <Link
//           href="/"
//           className="mb-5 flex items-center gap-3 rounded-xl px-1 py-1.5 transition hover:bg-slate-100/80 dark:hover:bg-slate-800/70"
//         >
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm dark:bg-blue-500">
//             <Wifi className="h-5 w-5" />
//           </div>

//           <div className="min-w-0">
//             <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
//               {brandConfig.ispName}
//             </p>

//             <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
//               {brandConfig.appName}
//             </p>
//           </div>
//         </Link>

//         <div className="mb-3 border-t border-slate-200 dark:border-slate-800" />

//         <nav className="space-y-1">
//           {links.map((item) => {
//             const Icon = item.icon;
//             const active = isActivePath(pathname, item.href);

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
//                   active
//                     ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/30 dark:text-blue-300 dark:ring-blue-900/70"
//                     : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
//                 }`}
//               >
//                 <Icon
//                   className={`h-4 w-4 shrink-0 ${
//                     active
//                       ? "text-blue-700 dark:text-blue-300"
//                       : "text-slate-500 group-hover:text-slate-800 dark:text-slate-500 dark:group-hover:text-slate-200"
//                   }`}
//                 />

//                 <span className="truncate">{item.label}</span>
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="mt-auto rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//             Rol activo
//           </p>

//           <div className="mt-2 flex items-center gap-2">
//             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
//               {roleLabel(rol).slice(0, 2).toUpperCase()}
//             </div>

//             <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
//               {roleLabel(rol)}
//             </p>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// src/components/layout/DashboardSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  CreditCard,
  FileClock,
  Home,
  KeyRound,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
  Wifi,
} from "lucide-react";
import { brandConfig } from "@/config/brand.config";
import type { UserRole } from "@/types/usuario.types";

type DashboardSidebarProps = {
  rol: UserRole;
};

type SidebarLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const linksByRole = {
  admin: [
    {
      label: "Panel General",
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
      label: "Caja cobradores",
      href: "/admin/caja-cobradores",
      icon: WalletCards,
    },
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
    {
      label: "Buscar cliente",
      href: "/cobrador/buscar-cliente",
      icon: Search,
    },
    {
      label: "Mi caja",
      href: "/cobrador/caja",
      icon: WalletCards,
    },
    {
      label: "Cerrar caja",
      href: "/cobrador/caja/cierre",
      icon: KeyRound,
    },
  ],

  cliente: [
    {
      label: "Mi panel",
      href: "/cliente",
      icon: Home,
    },
  ],
} satisfies Record<UserRole, SidebarLink[]>;

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  if (href === "/cobrador") {
    return pathname === "/cobrador";
  }

  if (href === "/cliente") {
    return pathname === "/cliente";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function roleLabel(rol: UserRole) {
  if (rol === "admin") return "Admin";
  if (rol === "cobrador") return "Cobrador";
  return "Cliente";
}

function roleDescription(rol: UserRole) {
  if (rol === "admin") return "Acceso completo al sistema";
  if (rol === "cobrador") return "Gestión de cobros y caja";
  return "Consulta de cuenta personal";
}

function roleInitials(rol: UserRole) {
  return roleLabel(rol).slice(0, 2).toUpperCase();
}

function roleIcon(rol: UserRole) {
  if (rol === "admin") return ShieldCheck;
  if (rol === "cobrador") return WalletCards;
  return UserRound;
}

export function DashboardSidebar({ rol }: DashboardSidebarProps) {
  const pathname = usePathname();
  const links = linksByRole[rol];
  const RoleIcon = roleIcon(rol);

  return (
    <aside className="hidden h-screen w-[17rem] shrink-0 border-r border-slate-300 bg-white/90 p-4 shadow-md shadow-slate-300/35 backdrop-blur dark:border-slate-800 dark:bg-slate-900/86 dark:shadow-black/20 lg:sticky lg:top-0 lg:block">
      <div className="flex h-full flex-col">
        <Link
          href="/"
          className="mb-5 flex items-center gap-3 rounded-xl px-1 py-1.5 transition hover:bg-slate-100/80 dark:hover:bg-slate-800/70"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-500 bg-blue-600 text-white shadow-sm shadow-blue-950/10 dark:border-blue-400 dark:bg-blue-500">
            <Wifi className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
              {brandConfig.ispName}
            </p>

            <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
              {brandConfig.appName}
            </p>
          </div>
        </Link>

        <div className="mb-3 border-t border-slate-200 dark:border-slate-800" />

        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:ring-blue-900/70"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    active
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-slate-500 group-hover:text-slate-800 dark:text-slate-500 dark:group-hover:text-slate-200"
                  }`}
                />

                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-xl border border-slate-300 bg-white/95 p-3.5 shadow-md shadow-slate-300/45 ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-950/55 dark:shadow-black/20 dark:ring-slate-800/80">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
                Rol activo
              </p>

              <h2 className="mt-0.5 truncate text-sm font-semibold text-slate-950 dark:text-white">
                Sesión actual
              </h2>
            </div>

            <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 text-[10px] font-semibold leading-none text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" />
              Activo
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 shadow-sm shadow-slate-300/30 dark:border-slate-700 dark:bg-slate-900/60 dark:shadow-black/10">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-[12px] font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
              {roleInitials(rol)}

              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-emerald-500 text-white dark:border-slate-900">
                <RoleIcon className="h-2.5 w-2.5" />
              </span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                {roleLabel(rol)}
              </p>

              <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
                {roleDescription(rol)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
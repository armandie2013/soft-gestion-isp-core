// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import {
//   CreditCard,
//   Home,
//   KeyRound,
//   Menu,
//   ReceiptText,
//   Search,
//   Settings,
//   ShieldCheck,
//   UserRound,
//   UsersRound,
//   WalletCards,
//   Wifi,
//   X,
// } from "lucide-react";
// import type { UserRole } from "@/types/usuario.types";
// import { brandConfig } from "@/config/brand.config";

// type MobileNavProps = {
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

// export function MobileNav({ rol }: MobileNavProps) {
//   const [open, setOpen] = useState(false);
//   const links = linksByRole[rol];

//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => setOpen(true)}
//         className="fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-2xl shadow-cyan-950/20 active:scale-95 dark:bg-cyan-500 dark:text-cyan-950 lg:hidden"
//         aria-label="Abrir menú"
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {open ? (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <button
//             type="button"
//             aria-label="Cerrar menú"
//             onClick={() => setOpen(false)}
//             className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
//           />

//           <div className="absolute bottom-0 left-0 right-0 max-h-[82vh] overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
//             <div className="mb-4 flex items-center justify-between gap-3">
//               <div className="min-w-0">
//                 <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
//                   {brandConfig.ispName}
//                 </p>

//                 <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
//                   Menú principal
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
//                 aria-label="Cerrar menú"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>

//             <nav className="grid gap-2">
//               {links.map((item) => {
//                 const Icon = item.icon;

//                 return (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     onClick={() => setOpen(false)}
//                     className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
//                   >
//                     <Icon className="h-4 w-4" />
//                     {item.label}
//                   </Link>
//                 );
//               })}
//             </nav>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CreditCard,
  FileClock,
  Home,
  KeyRound,
  Menu,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
  Wifi,
  X,
} from "lucide-react";
import type { UserRole } from "@/types/usuario.types";
import { brandConfig } from "@/config/brand.config";

type MobileNavProps = {
  rol: UserRole;
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
} satisfies Record<
  UserRole,
  Array<{ label: string; href: string; icon: typeof Home }>
>;

export function MobileNav({ rol }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const links = linksByRole[rol];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-2xl shadow-cyan-950/20 active:scale-95 dark:bg-cyan-500 dark:text-cyan-950 lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[82vh] overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
                  {brandConfig.ispName}
                </p>

                <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                  Menú principal
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                aria-label="Cerrar menú"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="grid gap-2">
              {links.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
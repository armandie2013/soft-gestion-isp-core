// import { ThemeToggle } from "@/components/layout/ThemeToggle";
// import { LogoutButton } from "@/components/layout/LogoutButton";
// import type { AuthTokenPayload } from "@/lib/jwt";

// type DashboardHeaderProps = {
//   user: AuthTokenPayload;
// };

// export function DashboardHeader({ user }: DashboardHeaderProps) {
//   return (
//     <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/85 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85 sm:px-6 lg:px-8">
//       <div className="flex items-center justify-between gap-3">
//         <div className="min-w-0">
//           <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
//             {user.rol}
//           </p>
//           <h1 className="truncate text-base font-semibold text-slate-950 dark:text-white sm:text-lg">
//             Hola, {user.nombre}
//           </h1>
//         </div>

//         <div className="flex shrink-0 items-center gap-2">
//           <ThemeToggle />
//           <LogoutButton />
//         </div>
//       </div>
//     </header>
//   );
// }

// src/components/layout/DashboardHeader.tsx

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LogoutButton } from "@/components/layout/LogoutButton";
import type { AuthTokenPayload } from "@/lib/jwt";

type DashboardHeaderProps = {
  user: AuthTokenPayload;
};

function roleLabel(rol: string) {
  if (rol === "admin") return "Admin";
  if (rol === "cobrador") return "Cobrador";
  if (rol === "cliente") return "Cliente";
  return rol;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/84 px-4 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/84 sm:px-5 lg:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
            {roleLabel(user.rol)}
          </p>

          <h1 className="mt-0.5 truncate text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">
            Hola, {user.nombre}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
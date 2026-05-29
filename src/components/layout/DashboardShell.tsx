import type { ReactNode } from "react";
import type { AuthTokenPayload } from "@/lib/jwt";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileNav } from "@/components/layout/MobileNav";

type DashboardShellProps = {
  user: AuthTokenPayload;
  children: ReactNode;
};

export function DashboardShell({ user, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <DashboardSidebar rol={user.rol} />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader user={user} />

          <main className="flex-1 px-4 py-4 safe-bottom sm:px-6 sm:py-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>

      <MobileNav rol={user.rol} />
    </div>
  );
}
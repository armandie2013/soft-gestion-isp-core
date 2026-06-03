// src/components/ui/DashboardGrid.tsx

import type { ReactNode } from "react";

type DashboardGridProps = {
  children: ReactNode;
  className?: string;
};

type DashboardMainProps = {
  children: ReactNode;
  className?: string;
};

type DashboardAsideProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardGrid({
  children,
  className = "",
}: DashboardGridProps) {
  return (
    <div
      className={`grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_340px] ${className}`}
    >
      {children}
    </div>
  );
}

export function DashboardMain({ children, className = "" }: DashboardMainProps) {
  return <div className={`min-w-0 space-y-4 ${className}`}>{children}</div>;
}

export function DashboardAside({
  children,
  className = "",
}: DashboardAsideProps) {
  return <aside className={`space-y-4 ${className}`}>{children}</aside>;
}
// src/components/ui/PageShell.tsx

import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "wide" | "full";
  className?: string;
};

const maxWidthClass = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[88rem]",
  wide: "max-w-[1720px]",
  full: "max-w-none",
};

export function PageShell({
  children,
  maxWidth = "wide",
  className = "",
}: PageShellProps) {
  return (
    <section
      className={`mx-auto w-full ${maxWidthClass[maxWidth]} space-y-4 ${className}`}
    >
      {children}
    </section>
  );
}
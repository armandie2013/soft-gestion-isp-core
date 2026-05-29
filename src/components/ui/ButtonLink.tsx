import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition active:scale-[0.99]",
        variant === "primary" &&
          "bg-cyan-600 text-white shadow-lg shadow-cyan-950/10 hover:bg-cyan-700 dark:bg-cyan-500 dark:text-cyan-950 dark:hover:bg-cyan-400",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
      )}
    >
      {children}
    </Link>
  );
}
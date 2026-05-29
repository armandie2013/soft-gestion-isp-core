import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "success" | "warning" | "ghost";
type Size = "sm" | "md";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--app-primary)] text-[var(--app-primary-foreground)] hover:bg-[var(--app-primary-hover)] border-transparent",
  secondary:
    "bg-[var(--app-surface-solid)] text-[var(--app-text)] border-[var(--app-border)] hover:bg-[var(--app-surface-soft)]",
  danger:
    "bg-[var(--app-danger-soft)] text-[var(--app-danger)] border-red-200 hover:brightness-95 dark:border-red-900/70",
  success:
    "bg-[var(--app-success-soft)] text-[var(--app-success)] border-emerald-200 hover:brightness-95 dark:border-emerald-900/70",
  warning:
    "bg-[var(--app-warning-soft)] text-[var(--app-warning)] border-amber-200 hover:brightness-95 dark:border-amber-900/70",
  ghost:
    "bg-transparent text-[var(--app-text)] border-transparent hover:bg-[var(--app-surface-soft)]",
};

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-3 text-xs rounded-xl",
  md: "h-10 px-4 text-sm rounded-xl",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AppButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

type AppButtonLinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export function AppButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: AppButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 border font-semibold shadow-sm transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${sizeClass[size]} ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function AppButtonLink({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...props
}: AppButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 border font-semibold shadow-sm transition active:scale-[0.99] ${sizeClass[size]} ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
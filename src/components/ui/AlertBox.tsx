import type { ReactNode } from "react";

type AlertVariant = "info" | "success" | "warning" | "danger";

type AlertBoxProps = {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
};

const variantClass: Record<AlertVariant, string> = {
  info:
    "border-[var(--app-border-strong)] bg-[var(--app-primary-soft)] text-[var(--app-primary)]",
  success:
    "border-emerald-200 bg-[var(--app-success-soft)] text-[var(--app-success)] dark:border-emerald-900/70",
  warning:
    "border-amber-200 bg-[var(--app-warning-soft)] text-[var(--app-warning)] dark:border-amber-900/70",
  danger:
    "border-red-200 bg-[var(--app-danger-soft)] text-[var(--app-danger)] dark:border-red-900/70",
};

export function AlertBox({
  variant = "info",
  title,
  children,
}: AlertBoxProps) {
  return (
    <div className={`rounded-2xl border p-4 ${variantClass[variant]}`}>
      {title ? <p className="text-sm font-semibold">{title}</p> : null}
      <div className={title ? "mt-2 text-sm leading-6" : "text-sm leading-6"}>
        {children}
      </div>
    </div>
  );
}
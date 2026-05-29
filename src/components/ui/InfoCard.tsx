import type { ReactNode } from "react";

type InfoCardVariant = "default" | "primary" | "success" | "warning" | "danger";

type InfoCardProps = {
  title: string;
  value?: string;
  description?: string;
  icon?: ReactNode;
  variant?: InfoCardVariant;
  children?: ReactNode;
};

const variantClass: Record<InfoCardVariant, string> = {
  default:
    "border-[var(--app-border)] bg-[var(--app-card)] text-[var(--app-text)]",
  primary:
    "border-[var(--app-border-strong)] bg-[var(--app-primary-soft)] text-[var(--app-primary)]",
  success:
    "border-emerald-200 bg-[var(--app-success-soft)] text-[var(--app-success)] dark:border-emerald-900/70",
  warning:
    "border-amber-200 bg-[var(--app-warning-soft)] text-[var(--app-warning)] dark:border-amber-900/70",
  danger:
    "border-red-200 bg-[var(--app-danger-soft)] text-[var(--app-danger)] dark:border-red-900/70",
};

export function InfoCard({
  title,
  value,
  description,
  icon,
  variant = "default",
  children,
}: InfoCardProps) {
  return (
    <div
      className={`rounded-[1.7rem] border p-4 shadow-[var(--app-shadow-soft)] ${variantClass[variant]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
            {title}
          </p>

          {value ? (
            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {value}
            </p>
          ) : null}

          {description ? (
            <p className="mt-2 text-sm leading-6 opacity-85">{description}</p>
          ) : null}
        </div>

        {icon ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/45 dark:bg-slate-950/30">
            {icon}
          </div>
        ) : null}
      </div>

      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}
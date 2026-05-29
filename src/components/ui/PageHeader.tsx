import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export function PageHeader({
  eyebrow = "Administración",
  title,
  description,
  backHref,
  backLabel = "Volver",
  actions,
  children,
}: PageHeaderProps) {
  return (
    <div className="rounded-[1.7rem] border border-[var(--app-border)] bg-[var(--app-card)] p-4 shadow-[var(--app-shadow-soft)] backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          {backHref ? (
            <Link
              href={backHref}
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-primary)] transition hover:text-[var(--app-primary-hover)]"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          ) : null}

          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--app-primary)]">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--app-text-strong)] sm:text-3xl">
            {title}
          </h1>

          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--app-muted)]">
              {description}
            </p>
          ) : null}

          {children}
        </div>

        {actions ? (
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            {actions}
          </div>
        ) : null}
      </div>
    </div>
  );
}
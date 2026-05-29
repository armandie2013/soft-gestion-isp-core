import type { ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  icon?: ReactNode;
};

export function SectionCard({
  children,
  className = "",
  title,
  description,
  icon,
}: SectionCardProps) {
  return (
    <div
      className={`rounded-[1.7rem] border border-[var(--app-border)] bg-[var(--app-card)] p-4 shadow-[var(--app-shadow-soft)] backdrop-blur sm:p-6 ${className}`}
    >
      {title || description || icon ? (
        <div className="mb-5 flex items-start gap-3">
          {icon ? (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--app-primary-soft)] text-[var(--app-primary)]">
              {icon}
            </div>
          ) : null}

          <div className="min-w-0">
            {title ? (
              <h2 className="text-base font-semibold text-[var(--app-text-strong)]">
                {title}
              </h2>
            ) : null}

            {description ? (
              <p className="mt-1 text-sm leading-6 text-[var(--app-muted)]">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {children}
    </div>
  );
}
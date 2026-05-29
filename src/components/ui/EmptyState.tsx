import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-[1.7rem] border border-dashed border-[var(--app-border-strong)] bg-[var(--app-card)] p-8 text-center shadow-[var(--app-shadow-soft)]">
      <p className="text-sm font-semibold text-[var(--app-text-strong)]">
        {title}
      </p>

      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--app-muted)]">
          {description}
        </p>
      ) : null}

      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
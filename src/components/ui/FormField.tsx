import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  description?: string;
  children: ReactNode;
};

export function FormField({
  label,
  htmlFor,
  description,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="app-label">
        {label}
      </label>

      {children}

      {description ? (
        <p className="text-xs leading-5 text-[var(--app-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
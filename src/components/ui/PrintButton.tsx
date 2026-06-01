"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-solid)] px-4 text-sm font-semibold text-[var(--app-text)] shadow-sm transition hover:bg-[var(--app-surface-soft)] active:scale-[0.99]"
    >
      <Printer className="h-4 w-4" />
      Imprimir
    </button>
  );
}
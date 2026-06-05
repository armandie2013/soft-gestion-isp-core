// src/components/ui/CopyDniButton.tsx

"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyDniButtonProps = {
  dni: string | number;
  className?: string;
};

export function CopyDniButton({ dni, className = "" }: CopyDniButtonProps) {
  const [copied, setCopied] = useState(false);
  const dniValue = String(dni || "").trim();

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1400);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyWithClipboardApi(value: string) {
    if (!navigator.clipboard || !window.isSecureContext) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      return false;
    }
  }

  function copyWithFallback(value: string) {
    try {
      const textarea = document.createElement("textarea");

      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      const success = document.execCommand("copy");

      document.body.removeChild(textarea);

      return success;
    } catch {
      return false;
    }
  }

  async function handleCopy() {
    if (!dniValue) return;

    const copiedWithApi = await copyWithClipboardApi(dniValue);

    if (copiedWithApi) {
      setCopied(true);
      return;
    }

    const copiedWithFallback = copyWithFallback(dniValue);

    if (copiedWithFallback) {
      setCopied(true);
      return;
    }

    setCopied(false);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!dniValue}
      className={`inline-flex h-7 items-center justify-center gap-1.5 rounded-lg border px-2 text-[10px] font-medium transition disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.99] ${
        copied
          ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
          : "border-cyan-300 bg-cyan-50 text-cyan-800 hover:bg-cyan-100 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-950/70"
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          Copiar DNI
        </>
      )}
    </button>
  );
}
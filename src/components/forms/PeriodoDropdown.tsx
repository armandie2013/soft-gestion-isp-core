"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { PeriodoCuentaClienteSafe } from "@/types/movimiento-financiero.types";

type PeriodoDropdownProps = {
  periodos: PeriodoCuentaClienteSafe[];
  value: string;
  onChange: (facturaId: string) => void;
};

export function PeriodoDropdown({
  periodos,
  value,
  onChange,
}: PeriodoDropdownProps) {
  const [abierto, setAbierto] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const listId = useId();

  const seleccionado = periodos.find(
    (periodo) => periodo.facturaId === value,
  );

  useEffect(() => {
    if (!abierto) return;

    function cerrarAlTocarFuera(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setAbierto(false);
      }
    }

    document.addEventListener("pointerdown", cerrarAlTocarFuera);

    containerRef.current
      ?.querySelector<HTMLButtonElement>(
        'button[role="option"]:not(:disabled)',
      )
      ?.focus();

    return () => {
      document.removeEventListener(
        "pointerdown",
        cerrarAlTocarFuera,
      );
    };
  }, [abierto]);

  function cerrarConFoco() {
    setAbierto(false);
    triggerRef.current?.focus();
  }

  return (
    <div
      ref={containerRef}
      className="relative mt-1.5 min-w-0 sm:hidden"
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null,
          )
        ) {
          setAbierto(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && abierto) {
          event.preventDefault();
          event.stopPropagation();
          cerrarConFoco();
        }

        if (
          abierto &&
          (event.key === "ArrowDown" || event.key === "ArrowUp")
        ) {
          event.preventDefault();

          containerRef.current
            ?.querySelector<HTMLButtonElement>(
              'button[role="option"]:not(:disabled)',
            )
            ?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label="Seleccionar período"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-controls={abierto ? listId : undefined}
        onClick={() => setAbierto((current) => !current)}
        onKeyDown={(event) => {
          if (
            event.key === "ArrowDown" ||
            event.key === "ArrowUp"
          ) {
            event.preventDefault();
            setAbierto(true);
          }
        }}
        className="flex min-h-11 w-full items-center justify-between gap-2 rounded-[6px] border border-[var(--overview-border)] bg-[var(--overview-panel)] px-2.5 text-left text-[12px] text-[var(--overview-text)] outline-none focus-visible:border-[var(--overview-blue)] focus-visible:ring-2 focus-visible:ring-blue-500/15"
      >
        <span className="min-w-0 truncate">
          {seleccionado
            ? `${seleccionado.periodoLabel} · N° ${seleccionado.numeroComprobante}`
            : "Seleccionar período"}
        </span>

        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 shrink-0 text-[var(--overview-muted)] transition-transform ${
            abierto ? "rotate-180" : ""
          }`}
        />
      </button>

      {abierto ? (
        <div
          id={listId}
          role="listbox"
          aria-label="Períodos disponibles"
          className="absolute inset-x-0 top-full z-40 mt-1 max-h-44 overflow-y-auto overscroll-contain rounded-[6px] border border-[var(--overview-border)] bg-[var(--overview-panel)] p-1 shadow-lg shadow-black/10 dark:shadow-black/30"
        >
          {periodos.map((periodo, index) => {
            const activo = periodo.facturaId === value;

            return (
              <button
                key={periodo.facturaId}
                type="button"
                role="option"
                aria-selected={activo}
                aria-disabled={index !== 0}
                disabled={index !== 0}
                tabIndex={index === 0 ? 0 : -1}
                onClick={() => {
                  onChange(periodo.facturaId);
                  cerrarConFoco();
                }}
                className={`flex min-h-10 w-full items-center gap-1.5 rounded-[4px] px-2 py-2 text-left text-[11px] leading-4 outline-none disabled:cursor-not-allowed ${
                  index !== 0
                    ? "text-[var(--overview-muted)]"
                    : "text-[var(--overview-text)] hover:bg-[var(--overview-soft)] focus-visible:bg-[var(--overview-soft)]"
                } ${
                  activo ? "bg-[var(--overview-soft)]" : ""
                }`}
              >
                <span className="min-w-0 flex-1 truncate">
                  {periodo.periodoLabel} · N°{" "}
                  {periodo.numeroComprobante}
                </span>

                {index !== 0 ? (
                  <span className="shrink-0 text-[10px]">
                    bloqueado
                  </span>
                ) : activo ? (
                  <Check
                    aria-hidden="true"
                    className="h-3 w-3 shrink-0 text-[var(--overview-blue)]"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
// "use client";

// import { useRouter } from "next/navigation";
// import type { MouseEvent, ReactNode } from "react";

// type Props = { href: string; children: ReactNode };

// // El enlace del nombre permite navegar con teclado y abrir en otra pestaña.
// // El resto de la fila comparte el destino, sin interceptar sus controles.
// export function ClickableCollectorRow({ href, children }: Props) {
//   const router = useRouter();

//   function open(event: MouseEvent<HTMLTableRowElement>) {
//     if (event.defaultPrevented || event.button !== 0) return;
//     const target = event.target;
//     if (!(target instanceof Element)) return;
//     if (target.closest("a, button, form, input, select, textarea, [role='button']")) return;
//     if (window.getSelection()?.toString()) return;
//     if (event.ctrlKey || event.metaKey) {
//       window.open(href, "_blank", "noopener,noreferrer");
//       return;
//     }
//     router.push(href);
//   }

//   return <tr onClick={open} className="cursor-pointer focus-within:bg-[var(--overview-soft)]">{children}</tr>;
// }

"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type Props = { href: string; children: ReactNode };

export function ClickableCollectorRow({ href, children }: Props) {
  const router = useRouter();

  function open(event: MouseEvent<HTMLTableRowElement>) {
    if (event.defaultPrevented || event.button !== 0) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    if (
      target.closest(
        "a, button, form, input, select, textarea, [role='button']",
      )
    ) {
      return;
    }

    if (window.getSelection()?.toString()) return;

    if (event.ctrlKey || event.metaKey) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(href);
  }

  return (
    <tr
      onClick={open}
      className="cursor-pointer transition-colors hover:bg-[var(--overview-soft)] focus-within:bg-[var(--overview-soft)] active:bg-[var(--overview-soft)] dark:hover:bg-[var(--overview-soft)] dark:focus-within:bg-[var(--overview-soft)] dark:active:bg-[var(--overview-soft)]"
    >
      {children}
    </tr>
  );
}

export { ClickableCollectorRow as ClickableTableRow };
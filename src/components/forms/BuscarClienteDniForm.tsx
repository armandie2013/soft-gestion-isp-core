"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { FormField } from "@/components/ui/FormField";

export function BuscarClienteDniForm() {
  const router = useRouter();
  const [dni, setDni] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dniLimpio = dni.replace(/\D/g, "").trim();

    if (!dniLimpio) {
      return;
    }

    router.push(`/cobrador/buscar-cliente?dni=${encodeURIComponent(dniLimpio)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="DNI del cliente"
        htmlFor="dni"
        description="Ingresá solo números. El cobrador solo puede buscar clientes por DNI."
      >
        <input
          id="dni"
          type="text"
          inputMode="numeric"
          value={dni}
          onChange={(event) => setDni(event.target.value)}
          placeholder="Ej: 31126079"
          className="app-input"
        />
      </FormField>

      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-[var(--app-primary)] px-4 text-sm font-semibold text-[var(--app-primary-foreground)] shadow-sm transition hover:bg-[var(--app-primary-hover)] active:scale-[0.99] sm:w-auto"
      >
        <Search className="h-4 w-4" />
        Buscar cliente
      </button>
    </form>
  );
}
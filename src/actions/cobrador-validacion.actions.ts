// src/actions/cobrador-validacion.actions.ts

"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { buscarClienteParaCobradorPorDni } from "@/services/cobrador.service";

export type ValidarClientePorDniCobradorResult = {
  ok: boolean;
  encontrado: boolean;
  message: string;
  dni?: string;
  clienteId?: string;
};

function limpiarDni(value: string) {
  return String(value || "").replace(/\D/g, "").slice(0, 12);
}

async function requireCobrador() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.rol !== "cobrador") {
    redirect(`/${user.rol}`);
  }

  return user;
}

export async function validarClientePorDniCobradorAction(
  dniInput: string,
): Promise<ValidarClientePorDniCobradorResult> {
  await requireCobrador();

  const dni = limpiarDni(dniInput);

  if (!dni) {
    return {
      ok: false,
      encontrado: false,
      message: "Ingresá el DNI del cliente.",
    };
  }

  if (dni.length < 7 || dni.length > 8) {
    return {
      ok: false,
      encontrado: false,
      dni,
      message: "El DNI debe tener 7 u 8 dígitos.",
    };
  }

  const cliente = await buscarClienteParaCobradorPorDni(dni);

  if (!cliente) {
    return {
      ok: true,
      encontrado: false,
      dni,
      message: "No se encontró ningún cliente con el DNI ingresado.",
    };
  }

  return {
    ok: true,
    encontrado: true,
    dni: cliente.dni,
    clienteId: cliente.id,
    message: "Cliente encontrado.",
  };
}
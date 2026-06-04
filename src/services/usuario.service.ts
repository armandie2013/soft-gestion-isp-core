// src/services/usuario.service.ts

import crypto from "crypto";
import mongoose from "mongoose";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import Usuario from "@/models/Usuario";
import type { UserRole, UserStatus, UsuarioSafe } from "@/types/usuario.types";

const LIMITE_CAJA_MINIMO = 100000;

function normalizarImporteEntero(value: unknown) {
  const raw = String(value ?? "").trim();

  if (!raw) return undefined;

  const sinMoneda = raw.replace(/\$/g, "").replace(/\s/g, "");

  const parteEntera = sinMoneda.includes(",")
    ? sinMoneda.split(",")[0]
    : sinMoneda;

  const digits = parteEntera.replace(/\D/g, "");

  if (!digits) return undefined;

  return Number(digits);
}

const limiteCajaCobradorSchema = z.preprocess(
  normalizarImporteEntero,
  z
    .number({
      message: "El límite de caja debe ser un número válido.",
    })
    .int("El límite de caja no puede tener decimales.")
    .min(
      LIMITE_CAJA_MINIMO,
      "El límite mínimo permitido para un cobrador es $ 100.000,00.",
    )
    .optional(),
);

export const actualizarUsuarioSchema = z
  .object({
    id: z.string().min(1, "Falta el ID del usuario."),

    nombre: z
      .string()
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres.")
      .max(80, "El nombre no puede superar los 80 caracteres."),

    apellido: z
      .string()
      .trim()
      .min(2, "El apellido debe tener al menos 2 caracteres.")
      .max(80, "El apellido no puede superar los 80 caracteres."),

    dni: z
      .string()
      .trim()
      .regex(/^\d{7,8}$/, "El DNI debe tener 7 u 8 dígitos numéricos."),

    email: z
      .string()
      .trim()
      .email("Ingresá un email válido.")
      .max(120, "El email no puede superar los 120 caracteres."),

    rol: z.enum(["admin", "cobrador", "cliente"], {
      message: "Rol inválido.",
    }),

    estado: z.enum(["activo", "suspendido"], {
      message: "Estado inválido.",
    }),

    limiteCajaCobrador: limiteCajaCobradorSchema,
  })
  .superRefine((data, ctx) => {
    if (data.rol !== "cobrador") {
      return;
    }

    if (
      data.limiteCajaCobrador === undefined ||
      data.limiteCajaCobrador === null
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["limiteCajaCobrador"],
        message:
          "El límite de caja es obligatorio cuando el usuario tiene rol cobrador.",
      });
    }
  });

export const resetPasswordSchema = z.object({
  id: z.string().min(1, "Falta el ID del usuario."),
});

export type ActualizarUsuarioInput = z.infer<typeof actualizarUsuarioSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

function validarObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function generarPasswordTemporal() {
  const parteAleatoria = crypto.randomBytes(4).toString("hex");
  return `Temp-${parteAleatoria}`;
}

function normalizarOrden(value: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function ordenarUsuarios(a: UsuarioSafe, b: UsuarioSafe) {
  const prioridadRol: Record<UserRole, number> = {
    admin: 1,
    cobrador: 2,
    cliente: 3,
  };

  if (prioridadRol[a.rol] !== prioridadRol[b.rol]) {
    return prioridadRol[a.rol] - prioridadRol[b.rol];
  }

  const apellidoA = normalizarOrden(a.apellido);
  const apellidoB = normalizarOrden(b.apellido);

  if (apellidoA !== apellidoB) {
    return apellidoA.localeCompare(apellidoB, "es");
  }

  return normalizarOrden(a.nombre).localeCompare(
    normalizarOrden(b.nombre),
    "es",
  );
}

function toSafeUser(usuario: any): UsuarioSafe {
  const rol = usuario.rol as UserRole;

  return {
    id: usuario._id.toString(),
    nombre: usuario.nombre || "",
    apellido: usuario.apellido || "",
    dni: usuario.dni || "",
    email: usuario.email || "",
    rol,
    estado: usuario.estado as UserStatus,
    limiteCajaCobrador:
      rol === "cobrador"
        ? Number(usuario.limiteCajaCobrador ?? LIMITE_CAJA_MINIMO)
        : null,
    debeCambiarPassword: Boolean(usuario.debeCambiarPassword),
    clienteId: usuario.clienteId ? usuario.clienteId.toString() : null,
    creadoEn: usuario.creadoEn?.toISOString?.() || "",
    actualizadoEn: usuario.actualizadoEn?.toISOString?.() || "",
  };
}

export async function obtenerUsuarios() {
  await connectDB();

  const usuarios = await Usuario.find().lean();

  return usuarios.map(toSafeUser).sort(ordenarUsuarios);
}

export async function obtenerUsuarioPorId(id: string) {
  if (!validarObjectId(id)) {
    return null;
  }

  await connectDB();

  const usuario = await Usuario.findById(id).lean();

  if (!usuario) {
    return null;
  }

  return toSafeUser(usuario);
}

export async function actualizarUsuario(input: ActualizarUsuarioInput) {
  const parsed = actualizarUsuarioSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  const {
    id,
    nombre,
    apellido,
    dni,
    email,
    rol,
    estado,
    limiteCajaCobrador,
  } = parsed.data;

  if (!validarObjectId(id)) {
    return {
      ok: false,
      message: "ID de usuario inválido.",
    };
  }

  await connectDB();

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return {
      ok: false,
      message: "Usuario no encontrado.",
    };
  }

  const emailNormalizado = email.toLowerCase().trim();
  const dniNormalizado = dni.trim();

  const existeEmail = await Usuario.findOne({
    email: emailNormalizado,
    _id: { $ne: id },
  }).lean();

  if (existeEmail) {
    return {
      ok: false,
      message: "Ya existe otro usuario registrado con ese email.",
    };
  }

  const existeDni = await Usuario.findOne({
    dni: dniNormalizado,
    _id: { $ne: id },
  }).lean();

  if (existeDni) {
    return {
      ok: false,
      message: "Ya existe otro usuario registrado con ese DNI.",
    };
  }

  usuario.nombre = nombre.trim();
  usuario.apellido = apellido.trim();
  usuario.dni = dniNormalizado;
  usuario.email = emailNormalizado;
  usuario.rol = rol;
  usuario.estado = estado;

  if (rol === "cobrador") {
    usuario.limiteCajaCobrador = limiteCajaCobrador ?? LIMITE_CAJA_MINIMO;
  } else {
    usuario.set("limiteCajaCobrador", undefined);
  }

  await usuario.save();

  return {
    ok: true,
    message: "Usuario actualizado correctamente.",
  };
}

export async function resetearPasswordUsuario(input: ResetPasswordInput) {
  const parsed = resetPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
      passwordTemporal: "",
    };
  }

  const { id } = parsed.data;

  if (!validarObjectId(id)) {
    return {
      ok: false,
      message: "ID de usuario inválido.",
      passwordTemporal: "",
    };
  }

  await connectDB();

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return {
      ok: false,
      message: "Usuario no encontrado.",
      passwordTemporal: "",
    };
  }

  const passwordTemporal = generarPasswordTemporal();

  usuario.password = await hashPassword(passwordTemporal);
  usuario.debeCambiarPassword = true;

  await usuario.save();

  return {
    ok: true,
    message:
      "Contraseña temporal generada. El usuario deberá cambiarla al iniciar sesión.",
    passwordTemporal,
  };
}

export async function cambiarEstadoUsuario(id: string, estado: UserStatus) {
  if (!validarObjectId(id)) {
    return {
      ok: false,
      message: "ID de usuario inválido.",
    };
  }

  if (!["activo", "suspendido"].includes(estado)) {
    return {
      ok: false,
      message: "Estado inválido.",
    };
  }

  await connectDB();

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return {
      ok: false,
      message: "Usuario no encontrado.",
    };
  }

  usuario.estado = estado;

  await usuario.save();

  return {
    ok: true,
    message:
      estado === "activo"
        ? "Usuario activado correctamente."
        : "Usuario suspendido correctamente.",
  };
}
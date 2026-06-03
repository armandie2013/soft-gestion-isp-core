import crypto from "crypto";
import mongoose from "mongoose";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import Usuario from "@/models/Usuario";
import type { UserRole, UserStatus, UsuarioSafe } from "@/types/usuario.types";

export const actualizarUsuarioSchema = z.object({
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

function toSafeUser(usuario: any): UsuarioSafe {
  return {
    id: usuario._id.toString(),
    nombre: usuario.nombre || "",
    apellido: usuario.apellido || "",
    dni: usuario.dni || "",
    email: usuario.email,
    rol: usuario.rol as UserRole,
    estado: usuario.estado as UserStatus,
    debeCambiarPassword: Boolean(usuario.debeCambiarPassword),
    clienteId: usuario.clienteId ? usuario.clienteId.toString() : null,
    creadoEn: usuario.creadoEn?.toISOString?.() || "",
    actualizadoEn: usuario.actualizadoEn?.toISOString?.() || "",
    ultimoAcceso: usuario.ultimoAcceso?.toISOString?.() || null,
  };
}

export async function obtenerUsuarios() {
  await connectDB();

  const usuarios = await Usuario.find().sort({ creadoEn: -1 }).lean();

  return usuarios.map(toSafeUser);
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

  const { id, nombre, apellido, dni, email, rol, estado } = parsed.data;

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
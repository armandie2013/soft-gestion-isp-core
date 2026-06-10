// import { z } from "zod";
// import { connectDB } from "@/lib/db";
// import { comparePassword, hashPassword } from "@/lib/password";
// import Usuario from "@/models/Usuario";
// import { createAuthToken } from "@/lib/jwt";
// import type { UserRole } from "@/types/usuario.types";

// export const loginSchema = z.object({
//   email: z
//     .string()
//     .trim()
//     .min(1, "El email es obligatorio.")
//     .email("Ingresá un email válido.")
//     .max(120, "El email no puede superar los 120 caracteres."),
//   password: z
//     .string()
//     .min(1, "La contraseña es obligatoria.")
//     .min(8, "La contraseña debe tener al menos 8 caracteres."),
// });

// export const registroSchema = z
//   .object({
//     nombre: z
//       .string()
//       .trim()
//       .min(2, "El nombre debe tener al menos 2 caracteres.")
//       .max(80, "El nombre no puede superar los 80 caracteres."),

//     apellido: z
//       .string()
//       .trim()
//       .min(2, "El apellido debe tener al menos 2 caracteres.")
//       .max(80, "El apellido no puede superar los 80 caracteres."),

//     dni: z
//       .string()
//       .trim()
//       .regex(/^\d{7,8}$/, "El DNI debe tener 7 u 8 dígitos numéricos."),

//     email: z
//       .string()
//       .trim()
//       .email("Ingresá un email válido.")
//       .max(120, "El email no puede superar los 120 caracteres."),

//     password: z
//       .string()
//       .min(8, "La contraseña debe tener al menos 8 caracteres.")
//       .max(80, "La contraseña no puede superar los 80 caracteres."),

//     confirmarPassword: z
//       .string()
//       .min(8, "La confirmación debe tener al menos 8 caracteres."),
//   })
//   .refine((data) => data.password === data.confirmarPassword, {
//     message: "Las contraseñas no coinciden.",
//     path: ["confirmarPassword"],
//   });

// export const cambiarPasswordSchema = z
//   .object({
//     actualPassword: z
//       .string()
//       .min(8, "La contraseña actual debe tener al menos 8 caracteres."),
//     nuevaPassword: z
//       .string()
//       .min(8, "La nueva contraseña debe tener al menos 8 caracteres.")
//       .max(80, "La nueva contraseña no puede superar los 80 caracteres."),
//     confirmarPassword: z
//       .string()
//       .min(8, "La confirmación debe tener al menos 8 caracteres."),
//   })
//   .refine((data) => data.nuevaPassword === data.confirmarPassword, {
//     message: "La nueva contraseña y la confirmación no coinciden.",
//     path: ["confirmarPassword"],
//   });

// export type LoginInput = z.infer<typeof loginSchema>;
// export type RegistroInput = z.infer<typeof registroSchema>;
// export type CambiarPasswordInput = z.infer<typeof cambiarPasswordSchema>;

// export type LoginResult =
//   | {
//       ok: true;
//       token: string;
//       redirectTo: string;
//       user: {
//         id: string;
//         nombre: string;
//         apellido: string;
//         dni: string;
//         email: string;
//         rol: UserRole;
//         debeCambiarPassword: boolean;
//       };
//     }
//   | {
//       ok: false;
//       message: string;
//     };

// function getRedirectByRole(rol: UserRole) {
//   if (rol === "admin") return "/admin";
//   if (rol === "cobrador") return "/cobrador";
//   return "/cliente";
// }

// export async function loginUser(input: LoginInput): Promise<LoginResult> {
//   const parsed = loginSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//     };
//   }

//   const { email, password } = parsed.data;

//   await connectDB();

//   const usuario = await Usuario.findOne({
//     email: email.toLowerCase().trim(),
//   }).select("+password");

//   if (!usuario) {
//     return {
//       ok: false,
//       message: "Email o contraseña incorrectos.",
//     };
//   }

//   if (usuario.estado !== "activo") {
//     return {
//       ok: false,
//       message: "El usuario se encuentra suspendido.",
//     };
//   }

//   const passwordOk = await comparePassword(password, usuario.password);

//   if (!passwordOk) {
//     return {
//       ok: false,
//       message: "Email o contraseña incorrectos.",
//     };
//   }

//   usuario.ultimoAcceso = new Date();
//   await usuario.save();

//   const user = {
//     id: usuario._id.toString(),
//     nombre: usuario.nombre,
//     apellido: usuario.apellido,
//     dni: usuario.dni,
//     email: usuario.email,
//     rol: usuario.rol as UserRole,
//     debeCambiarPassword: Boolean(usuario.debeCambiarPassword),
//   };

//   const token = await createAuthToken({
//     userId: user.id,
//     nombre: user.nombre,
//     email: user.email,
//     rol: user.rol,
//     debeCambiarPassword: user.debeCambiarPassword,
//   });

//   return {
//     ok: true,
//     token,
//     redirectTo: user.debeCambiarPassword
//       ? "/cambiar-password"
//       : getRedirectByRole(user.rol),
//     user,
//   };
// }

// export async function registrarUsuario(input: RegistroInput) {
//   const parsed = registroSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//     };
//   }

//   await connectDB();

//   const { nombre, apellido, dni, email, password } = parsed.data;

//   const emailNormalizado = email.toLowerCase().trim();
//   const dniNormalizado = dni.trim();

//   const existeEmail = await Usuario.findOne({ email: emailNormalizado }).lean();

//   if (existeEmail) {
//     return {
//       ok: false,
//       message: "Ya existe un usuario registrado con ese email.",
//     };
//   }

//   const existeDni = await Usuario.findOne({ dni: dniNormalizado }).lean();

//   if (existeDni) {
//     return {
//       ok: false,
//       message: "Ya existe un usuario registrado con ese DNI.",
//     };
//   }

//   const hashedPassword = await hashPassword(password);

//   await Usuario.create({
//     nombre: nombre.trim(),
//     apellido: apellido.trim(),
//     dni: dniNormalizado,
//     email: emailNormalizado,
//     password: hashedPassword,
//     rol: "cliente",
//     estado: "activo",
//     debeCambiarPassword: false,
//   });

//   return {
//     ok: true,
//     message: "Usuario registrado correctamente. Ya podés iniciar sesión.",
//   };
// }

// export async function cambiarPasswordUsuario(
//   userId: string,
//   input: CambiarPasswordInput,
// ) {
//   const parsed = cambiarPasswordSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//     };
//   }

//   const { actualPassword, nuevaPassword } = parsed.data;

//   await connectDB();

//   const usuario = await Usuario.findById(userId).select("+password");

//   if (!usuario) {
//     return {
//       ok: false,
//       message: "Usuario no encontrado.",
//     };
//   }

//   const actualOk = await comparePassword(actualPassword, usuario.password);

//   if (!actualOk) {
//     return {
//       ok: false,
//       message: "La contraseña actual no es correcta.",
//     };
//   }

//   usuario.password = await hashPassword(nuevaPassword);
//   usuario.debeCambiarPassword = false;

//   await usuario.save();

//   const token = await createAuthToken({
//     userId: usuario._id.toString(),
//     nombre: usuario.nombre,
//     email: usuario.email,
//     rol: usuario.rol as UserRole,
//     debeCambiarPassword: false,
//   });

//   return {
//     ok: true,
//     message: "Contraseña actualizada correctamente.",
//     token,
//     redirectTo: getRedirectByRole(usuario.rol as UserRole),
//   };
// }

// src/services/auth.service.ts

import { z } from "zod";
import { connectDB } from "@/lib/db";
import { comparePassword, hashPassword } from "@/lib/password";
import Usuario from "@/models/Usuario";
import { createAuthToken } from "@/lib/jwt";
import type { UserRole } from "@/types/usuario.types";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio.")
    .email("Ingresá un email válido.")
    .max(120, "El email no puede superar los 120 caracteres."),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria.")
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export const registroSchema = z
  .object({
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

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .max(80, "La contraseña no puede superar los 80 caracteres."),

    confirmarPassword: z
      .string()
      .min(8, "La confirmación debe tener al menos 8 caracteres."),
  })
  .refine((data) => data.password === data.confirmarPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmarPassword"],
  });

export const cambiarPasswordSchema = z
  .object({
    actualPassword: z
      .string()
      .min(8, "La contraseña actual debe tener al menos 8 caracteres."),
    nuevaPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres.")
      .max(80, "La nueva contraseña no puede superar los 80 caracteres."),
    confirmarPassword: z
      .string()
      .min(8, "La confirmación debe tener al menos 8 caracteres."),
  })
  .refine((data) => data.nuevaPassword === data.confirmarPassword, {
    message: "La nueva contraseña y la confirmación no coinciden.",
    path: ["confirmarPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegistroInput = z.infer<typeof registroSchema>;
export type CambiarPasswordInput = z.infer<typeof cambiarPasswordSchema>;

export type LoginResult =
  | {
      ok: true;
      token: string;
      redirectTo: string;
      user: {
        id: string;
        nombre: string;
        apellido: string;
        dni: string;
        email: string;
        rol: UserRole;
        debeCambiarPassword: boolean;
      };
    }
  | {
      ok: false;
      message: string;
    };

function getRedirectByRole(rol: UserRole) {
  if (rol === "admin") return "/admin";
  if (rol === "cobrador") return "/cobrador";
  return "/cliente";
}

export async function loginUser(input: LoginInput): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  const { email, password } = parsed.data;

  await connectDB();

  const usuario = await Usuario.findOne({
    email: email.toLowerCase().trim(),
  }).select("+password");

  if (!usuario) {
    return {
      ok: false,
      message: "Email o contraseña incorrectos.",
    };
  }

  if (usuario.estado !== "activo") {
    return {
      ok: false,
      message: "El usuario se encuentra suspendido.",
    };
  }

  const passwordOk = await comparePassword(password, usuario.password);

  if (!passwordOk) {
    return {
      ok: false,
      message: "Email o contraseña incorrectos.",
    };
  }

  usuario.ultimoAcceso = new Date();
  await usuario.save();

  const user = {
    id: usuario._id.toString(),
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    dni: usuario.dni,
    email: usuario.email,
    rol: usuario.rol as UserRole,
    debeCambiarPassword: Boolean(usuario.debeCambiarPassword),
  };

  const token = await createAuthToken({
    userId: user.id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
    debeCambiarPassword: user.debeCambiarPassword,
  });

  return {
    ok: true,
    token,
    redirectTo: user.debeCambiarPassword
      ? "/cambiar-password"
      : getRedirectByRole(user.rol),
    user,
  };
}

export async function registrarUsuario(input: RegistroInput) {
  const parsed = registroSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  await connectDB();

  const { nombre, apellido, dni, email, password } = parsed.data;

  const emailNormalizado = email.toLowerCase().trim();
  const dniNormalizado = dni.trim();

  const existeEmail = await Usuario.findOne({ email: emailNormalizado }).lean();

  if (existeEmail) {
    return {
      ok: false,
      message: "Ya existe un usuario registrado con ese email.",
    };
  }

  const existeDni = await Usuario.findOne({ dni: dniNormalizado }).lean();

  if (existeDni) {
    return {
      ok: false,
      message: "Ya existe un usuario registrado con ese DNI.",
    };
  }

  const hashedPassword = await hashPassword(password);

  await Usuario.create({
    nombre: nombre.trim(),
    apellido: apellido.trim(),
    dni: dniNormalizado,
    email: emailNormalizado,
    password: hashedPassword,
    rol: "cliente",
    estado: "activo",
    debeCambiarPassword: false,
    esProtegido: false,
  });

  return {
    ok: true,
    message: "Usuario registrado correctamente. Ya podés iniciar sesión.",
  };
}

export async function cambiarPasswordUsuario(
  userId: string,
  input: CambiarPasswordInput,
) {
  const parsed = cambiarPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  const { actualPassword, nuevaPassword } = parsed.data;

  await connectDB();

  const usuario = await Usuario.findById(userId).select("+password");

  if (!usuario) {
    return {
      ok: false,
      message: "Usuario no encontrado.",
    };
  }

  if (usuario.estado !== "activo") {
    return {
      ok: false,
      message: "El usuario se encuentra suspendido.",
    };
  }

  const actualOk = await comparePassword(actualPassword, usuario.password);

  if (!actualOk) {
    return {
      ok: false,
      message: "La contraseña actual no es correcta.",
    };
  }

  usuario.password = await hashPassword(nuevaPassword);
  usuario.debeCambiarPassword = false;

  await usuario.save();

  const token = await createAuthToken({
    userId: usuario._id.toString(),
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol as UserRole,
    debeCambiarPassword: false,
  });

  return {
    ok: true,
    message: "Contraseña actualizada correctamente.",
    token,
    redirectTo: getRedirectByRole(usuario.rol as UserRole),
  };
}
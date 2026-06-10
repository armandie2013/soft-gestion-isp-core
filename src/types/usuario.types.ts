// // src/types/usuario.types.ts

// export const USER_ROLES = ["admin", "cobrador", "cliente"] as const;

// export type UserRole = (typeof USER_ROLES)[number];

// export const USER_STATUSES = ["activo", "suspendido"] as const;

// export type UserStatus = (typeof USER_STATUSES)[number];

// export type UsuarioSafe = {
//   id: string;
//   nombre: string;
//   apellido: string;
//   dni: string;
//   email: string;
//   rol: UserRole;
//   estado: UserStatus;
//   limiteCajaCobrador?: number | null;
//   debeCambiarPassword: boolean;
//   clienteId?: string | null;
//   creadoEn: string;
//   actualizadoEn: string;
// };

// src/types/usuario.types.ts

export const USER_ROLES = ["admin", "cobrador", "cliente"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const USER_STATUSES = ["activo", "suspendido"] as const;

export type UserStatus = (typeof USER_STATUSES)[number];

export type UsuarioSafe = {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  rol: UserRole;
  estado: UserStatus;
  limiteCajaCobrador?: number | null;
  debeCambiarPassword: boolean;
  esProtegido: boolean;
  clienteId?: string | null;
  ultimoAcceso?: string | null;
  creadoEn: string;
  actualizadoEn: string;
};
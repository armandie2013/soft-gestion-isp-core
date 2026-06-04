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
  debeCambiarPassword: boolean;
  limiteCajaCobrador: number;
  clienteId?: string | null;
  creadoEn: string;
  actualizadoEn: string;
  ultimoAcceso?: string | null;
};
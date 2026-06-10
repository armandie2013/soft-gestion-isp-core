// // src/models/Usuario.ts

// import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
// import { USER_ROLES, USER_STATUSES } from "@/types/usuario.types";

// const UsuarioSchema = new Schema(
//   {
//     nombre: {
//       type: String,
//       required: [true, "El nombre es obligatorio."],
//       trim: true,
//       minlength: [2, "El nombre debe tener al menos 2 caracteres."],
//       maxlength: [80, "El nombre no puede superar los 80 caracteres."],
//     },

//     apellido: {
//       type: String,
//       required: [true, "El apellido es obligatorio."],
//       trim: true,
//       minlength: [2, "El apellido debe tener al menos 2 caracteres."],
//       maxlength: [80, "El apellido no puede superar los 80 caracteres."],
//     },

//     dni: {
//       type: String,
//       required: [true, "El DNI es obligatorio."],
//       trim: true,
//       unique: true,
//       index: true,
//       minlength: [7, "El DNI debe tener al menos 7 dígitos."],
//       maxlength: [8, "El DNI no puede superar los 8 dígitos."],
//     },

//     email: {
//       type: String,
//       required: [true, "El email es obligatorio."],
//       trim: true,
//       lowercase: true,
//       unique: true,
//       index: true,
//       maxlength: [120, "El email no puede superar los 120 caracteres."],
//     },

//     password: {
//       type: String,
//       required: [true, "La contraseña es obligatoria."],
//       select: false,
//     },

//     rol: {
//       type: String,
//       enum: USER_ROLES,
//       default: "cliente",
//       required: true,
//       index: true,
//     },

//     estado: {
//       type: String,
//       enum: USER_STATUSES,
//       default: "activo",
//       required: true,
//       index: true,
//     },

//     limiteCajaCobrador: {
//       type: Number,
//       default: undefined,
//       min: [100000, "El límite mínimo de caja es $ 100.000,00."],
//     },

//     debeCambiarPassword: {
//       type: Boolean,
//       default: false,
//       required: true,
//       index: true,
//     },

//     clienteId: {
//       type: Schema.Types.ObjectId,
//       ref: "Cliente",
//       default: null,
//       index: true,
//     },

//     ultimoAcceso: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: {
//       createdAt: "creadoEn",
//       updatedAt: "actualizadoEn",
//     },
//   },
// );

// export type UsuarioDocument = InferSchemaType<typeof UsuarioSchema>;

// const Usuario: Model<UsuarioDocument> =
//   mongoose.models.Usuario ||
//   mongoose.model<UsuarioDocument>("Usuario", UsuarioSchema);

// export default Usuario;

// src/models/Usuario.ts

import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { USER_ROLES, USER_STATUSES } from "@/types/usuario.types";

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres."],
      maxlength: [80, "El nombre no puede superar los 80 caracteres."],
    },

    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio."],
      trim: true,
      minlength: [2, "El apellido debe tener al menos 2 caracteres."],
      maxlength: [80, "El apellido no puede superar los 80 caracteres."],
    },

    dni: {
      type: String,
      required: [true, "El DNI es obligatorio."],
      trim: true,
      unique: true,
      index: true,
      minlength: [7, "El DNI debe tener al menos 7 dígitos."],
      maxlength: [8, "El DNI no puede superar los 8 dígitos."],
    },

    email: {
      type: String,
      required: [true, "El email es obligatorio."],
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      maxlength: [120, "El email no puede superar los 120 caracteres."],
    },

    password: {
      type: String,
      required: [true, "La contraseña es obligatoria."],
      select: false,
    },

    rol: {
      type: String,
      enum: USER_ROLES,
      default: "cliente",
      required: true,
      index: true,
    },

    estado: {
      type: String,
      enum: USER_STATUSES,
      default: "activo",
      required: true,
      index: true,
    },

    limiteCajaCobrador: {
      type: Number,
      default: undefined,
      min: [100000, "El límite mínimo de caja es $ 100.000,00."],
    },

    debeCambiarPassword: {
      type: Boolean,
      default: false,
      required: true,
      index: true,
    },

    esProtegido: {
      type: Boolean,
      default: false,
      required: true,
      index: true,
    },

    clienteId: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      default: null,
      index: true,
    },

    ultimoAcceso: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "creadoEn",
      updatedAt: "actualizadoEn",
    },
  },
);

export type UsuarioDocument = InferSchemaType<typeof UsuarioSchema>;

const Usuario: Model<UsuarioDocument> =
  mongoose.models.Usuario ||
  mongoose.model<UsuarioDocument>("Usuario", UsuarioSchema);

export default Usuario;
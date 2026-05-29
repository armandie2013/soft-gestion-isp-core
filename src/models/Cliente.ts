import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import "@/models/Plan";
import "@/models/Usuario";
import { CLIENTE_STATUSES } from "@/types/cliente.types";

const ClienteSchema = new Schema(
  {
    numeroCliente: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

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

    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria."],
      trim: true,
      maxlength: [140, "La dirección no puede superar los 140 caracteres."],
    },

    localidad: {
      type: String,
      required: [true, "La localidad es obligatoria."],
      trim: true,
      maxlength: [80, "La localidad no puede superar los 80 caracteres."],
      index: true,
    },

    provincia: {
      type: String,
      required: [true, "La provincia es obligatoria."],
      trim: true,
      maxlength: [80, "La provincia no puede superar los 80 caracteres."],
      index: true,
    },

    telefono: {
      type: String,
      required: [true, "El teléfono es obligatorio."],
      trim: true,
      maxlength: [30, "El teléfono no puede superar los 30 caracteres."],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [120, "El email no puede superar los 120 caracteres."],
      default: "",
    },

    planId: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: [true, "El plan contratado es obligatorio."],
      index: true,
    },

    estado: {
      type: String,
      enum: CLIENTE_STATUSES,
      default: "activo",
      required: true,
      index: true,
    },

    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
      index: true,
    },
  },
  {
    timestamps: {
      createdAt: "creadoEn",
      updatedAt: "actualizadoEn",
    },
  },
);

export type ClienteDocument = InferSchemaType<typeof ClienteSchema>;

const Cliente: Model<ClienteDocument> =
  (mongoose.models.Cliente as Model<ClienteDocument>) ||
  mongoose.model<ClienteDocument>("Cliente", ClienteSchema);

export default Cliente;
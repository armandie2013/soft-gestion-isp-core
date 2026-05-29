import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { MOVIMIENTO_TIPOS } from "@/types/movimiento-financiero.types";

const MovimientoFinancieroSchema = new Schema(
  {
    numeroComprobante: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    clienteId: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
      index: true,
    },

    tipoMovimiento: {
      type: String,
      enum: MOVIMIENTO_TIPOS,
      required: true,
      index: true,
    },

    fecha: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },

    concepto: {
      type: String,
      required: true,
      trim: true,
      maxlength: [180, "El concepto no puede superar los 180 caracteres."],
    },

    debe: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    haber: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    saldo: {
      type: Number,
      required: true,
      default: 0,
    },

    referenciaMes: {
      type: Number,
      default: null,
      min: 1,
      max: 12,
      index: true,
    },

    referenciaAnio: {
      type: Number,
      default: null,
      min: 2000,
      max: 2100,
      index: true,
    },

    creadoPorUsuarioId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      index: true,
    },

    creadoPorNombre: {
      type: String,
      required: true,
      trim: true,
    },

    creadoPorRol: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    observacion: {
      type: String,
      trim: true,
      maxlength: [300, "La observación no puede superar los 300 caracteres."],
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "creadoEn",
      updatedAt: "actualizadoEn",
    },
  },
);

MovimientoFinancieroSchema.index({
  clienteId: 1,
  referenciaMes: 1,
  referenciaAnio: 1,
  tipoMovimiento: 1,
});

export type MovimientoFinancieroDocument = InferSchemaType<
  typeof MovimientoFinancieroSchema
>;

const MovimientoFinanciero: Model<MovimientoFinancieroDocument> =
  mongoose.models.MovimientoFinanciero ||
  mongoose.model<MovimientoFinancieroDocument>(
    "MovimientoFinanciero",
    MovimientoFinancieroSchema,
  );

export default MovimientoFinanciero;
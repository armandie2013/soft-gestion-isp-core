import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import "@/models/Cliente";
import "@/models/Plan";
import { CLIENTE_PLAN_HISTORIAL_MOTIVOS } from "@/types/cliente-plan-historial.types";

const ClientePlanHistorialSchema = new Schema(
  {
    clienteId: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
      index: true,
    },

    planId: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
      index: true,
    },

    planNombre: {
      type: String,
      required: true,
      trim: true,
    },

    planTipo: {
      type: String,
      required: true,
      trim: true,
    },

    planImporte: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    fechaDesde: {
      type: Date,
      required: true,
      index: true,
    },

    fechaHasta: {
      type: Date,
      default: null,
      index: true,
    },

    motivo: {
      type: String,
      enum: CLIENTE_PLAN_HISTORIAL_MOTIVOS,
      required: true,
      default: "alta",
      index: true,
    },

    observacion: {
      type: String,
      trim: true,
      maxlength: 300,
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

ClientePlanHistorialSchema.index({ clienteId: 1, fechaDesde: 1 });
ClientePlanHistorialSchema.index({ clienteId: 1, fechaHasta: 1 });
ClientePlanHistorialSchema.index({ clienteId: 1, planId: 1, fechaDesde: 1 });

export type ClientePlanHistorialDocument = InferSchemaType<
  typeof ClientePlanHistorialSchema
>;

const ClientePlanHistorial: Model<ClientePlanHistorialDocument> =
  (mongoose.models
    .ClientePlanHistorial as Model<ClientePlanHistorialDocument>) ||
  mongoose.model<ClientePlanHistorialDocument>(
    "ClientePlanHistorial",
    ClientePlanHistorialSchema,
  );

export default ClientePlanHistorial;
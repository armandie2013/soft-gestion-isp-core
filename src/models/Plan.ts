import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { PLAN_STATUSES, PLAN_TYPES } from "@/types/plan.types";

const PlanSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del plan es obligatorio."],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres."],
      maxlength: [80, "El nombre no puede superar los 80 caracteres."],
      index: true,
    },

    tipo: {
      type: String,
      enum: PLAN_TYPES,
      default: "residencial",
      required: true,
      index: true,
    },

    detalle: {
      type: String,
      required: [true, "El detalle del plan es obligatorio."],
      trim: true,
      minlength: [2, "El detalle debe tener al menos 2 caracteres."],
      maxlength: [300, "El detalle no puede superar los 300 caracteres."],
    },

    importe: {
      type: Number,
      required: [true, "El importe es obligatorio."],
      min: [0, "El importe no puede ser negativo."],
      default: 0,
    },

    estado: {
      type: String,
      enum: PLAN_STATUSES,
      default: "activo",
      required: true,
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

export type PlanDocument = InferSchemaType<typeof PlanSchema>;

const Plan: Model<PlanDocument> =
  mongoose.models.Plan || mongoose.model<PlanDocument>("Plan", PlanSchema);

export default Plan;
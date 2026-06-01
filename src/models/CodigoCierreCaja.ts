import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { CODIGO_CIERRE_CAJA_ESTADOS } from "@/types/cobro.types";

const CodigoCierreCajaSchema = new Schema(
  {
    codigo: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 6,
      index: true,
    },

    cobradorId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      index: true,
    },

    cobradorNombre: {
      type: String,
      required: true,
      trim: true,
    },

    importe: {
      type: Number,
      required: true,
      min: 0.01,
    },

    estado: {
      type: String,
      enum: CODIGO_CIERRE_CAJA_ESTADOS,
      default: "pendiente",
      required: true,
      index: true,
    },

    generadoPorAdminId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      index: true,
    },

    generadoPorAdminNombre: {
      type: String,
      required: true,
      trim: true,
    },

    usadoEn: {
      type: Date,
      default: null,
    },

    venceEn: {
      type: Date,
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

CodigoCierreCajaSchema.index({
  cobradorId: 1,
  estado: 1,
  creadoEn: -1,
});

export type CodigoCierreCajaDocument = InferSchemaType<
  typeof CodigoCierreCajaSchema
>;

const CodigoCierreCaja: Model<CodigoCierreCajaDocument> =
  (mongoose.models.CodigoCierreCaja as Model<CodigoCierreCajaDocument>) ||
  mongoose.model<CodigoCierreCajaDocument>(
    "CodigoCierreCaja",
    CodigoCierreCajaSchema,
  );

export default CodigoCierreCaja;
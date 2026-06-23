// import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
// import { CAJA_COBRADOR_TIPOS } from "@/types/cobro.types";

// const CajaCobradorSchema = new Schema(
//   {
//     cobradorId: {
//       type: Schema.Types.ObjectId,
//       ref: "Usuario",
//       required: true,
//       index: true,
//     },

//     tipoMovimiento: {
//       type: String,
//       enum: CAJA_COBRADOR_TIPOS,
//       required: true,
//       index: true,
//     },

//     clienteId: {
//       type: Schema.Types.ObjectId,
//       ref: "Cliente",
//       default: null,
//       index: true,
//     },

//     movimientoFinancieroId: {
//       type: Schema.Types.ObjectId,
//       ref: "MovimientoFinanciero",
//       default: null,
//       index: true,
//     },

//     facturaAsociadaId: {
//       type: Schema.Types.ObjectId,
//       ref: "MovimientoFinanciero",
//       default: null,
//       index: true,
//     },

//     codigoCierreId: {
//       type: Schema.Types.ObjectId,
//       ref: "CodigoCierreCaja",
//       default: null,
//       index: true,
//     },

//     importe: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     saldoCaja: {
//       type: Number,
//       required: true,
//       default: 0,
//     },

//     descripcion: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: [180, "La descripción no puede superar los 180 caracteres."],
//     },

//     observacion: {
//       type: String,
//       trim: true,
//       maxlength: [300, "La observación no puede superar los 300 caracteres."],
//       default: "",
//     },
//   },
//   {
//     timestamps: {
//       createdAt: "creadoEn",
//       updatedAt: "actualizadoEn",
//     },
//   },
// );

// CajaCobradorSchema.index({
//   cobradorId: 1,
//   tipoMovimiento: 1,
//   creadoEn: -1,
// });

// export type CajaCobradorDocument = InferSchemaType<typeof CajaCobradorSchema>;

// const CajaCobrador: Model<CajaCobradorDocument> =
//   (mongoose.models.CajaCobrador as Model<CajaCobradorDocument>) ||
//   mongoose.model<CajaCobradorDocument>("CajaCobrador", CajaCobradorSchema);

// export default CajaCobrador;

import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import {
  CAJA_COBRADOR_ESTADOS,
  CAJA_COBRADOR_TIPOS,
} from "@/types/cobro.types";

const CajaCobradorSchema = new Schema(
  {
    cobradorId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      index: true,
    },

    tipoMovimiento: {
      type: String,
      enum: CAJA_COBRADOR_TIPOS,
      required: true,
      index: true,
    },

    estadoCaja: {
      type: String,
      enum: CAJA_COBRADOR_ESTADOS,
      required: true,
      default: "abierto",
      index: true,
    },

    clienteId: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      default: null,
      index: true,
    },

    movimientoFinancieroId: {
      type: Schema.Types.ObjectId,
      ref: "MovimientoFinanciero",
      default: null,
      index: true,
    },

    facturaAsociadaId: {
      type: Schema.Types.ObjectId,
      ref: "MovimientoFinanciero",
      default: null,
      index: true,
    },

    codigoCierreId: {
      type: Schema.Types.ObjectId,
      ref: "CodigoCierreCaja",
      default: null,
      index: true,
    },

    cierreCajaId: {
      type: Schema.Types.ObjectId,
      ref: "CajaCobrador",
      default: null,
      index: true,
    },

    cerradoEn: {
      type: Date,
      default: null,
      index: true,
    },

    importe: {
      type: Number,
      required: true,
      min: 0,
    },

    saldoCaja: {
      type: Number,
      required: true,
      default: 0,
    },

    descripcion: {
      type: String,
      required: true,
      trim: true,
      maxlength: [180, "La descripción no puede superar los 180 caracteres."],
    },

    observacion: {
      type: String,
      trim: true,
      maxlength: [500, "La observación no puede superar los 500 caracteres."],
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

CajaCobradorSchema.index({
  cobradorId: 1,
  tipoMovimiento: 1,
  creadoEn: -1,
});

CajaCobradorSchema.index({
  cobradorId: 1,
  estadoCaja: 1,
  creadoEn: -1,
});

CajaCobradorSchema.index({
  cobradorId: 1,
  cierreCajaId: 1,
});

export type CajaCobradorDocument = InferSchemaType<typeof CajaCobradorSchema>;

const CajaCobrador: Model<CajaCobradorDocument> =
  (mongoose.models.CajaCobrador as Model<CajaCobradorDocument>) ||
  mongoose.model<CajaCobradorDocument>("CajaCobrador", CajaCobradorSchema);

export default CajaCobrador;
// import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
// import { MOVIMIENTO_TIPOS } from "@/types/movimiento-financiero.types";

// const MovimientoFinancieroSchema = new Schema(
//   {
//     numeroComprobante: {
//       type: Number,
//       required: true,
//       unique: true,
//       index: true,
//     },

//     clienteId: {
//       type: Schema.Types.ObjectId,
//       ref: "Cliente",
//       required: true,
//       index: true,
//     },

//     tipoMovimiento: {
//       type: String,
//       enum: MOVIMIENTO_TIPOS,
//       required: true,
//       index: true,
//     },

//     facturaAsociadaId: {
//       type: Schema.Types.ObjectId,
//       ref: "MovimientoFinanciero",
//       default: null,
//       index: true,
//     },

//     fecha: {
//       type: Date,
//       required: true,
//       default: Date.now,
//       index: true,
//     },

//     concepto: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: [180, "El concepto no puede superar los 180 caracteres."],
//     },

//     debe: {
//       type: Number,
//       required: true,
//       default: 0,
//       min: 0,
//     },

//     haber: {
//       type: Number,
//       required: true,
//       default: 0,
//       min: 0,
//     },

//     saldo: {
//       type: Number,
//       required: true,
//       default: 0,
//     },

//     referenciaMes: {
//       type: Number,
//       default: null,
//       min: 1,
//       max: 12,
//       index: true,
//     },

//     referenciaAnio: {
//       type: Number,
//       default: null,
//       min: 2000,
//       max: 2100,
//       index: true,
//     },

//     creadoPorUsuarioId: {
//       type: Schema.Types.ObjectId,
//       ref: "Usuario",
//       required: true,
//       index: true,
//     },

//     creadoPorNombre: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     creadoPorRol: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     observacion: {
//       type: String,
//       trim: true,
//       maxlength: [300, "La observación no puede superar los 300 caracteres."],
//       default: "",
//     },

//     codigoVerificacion: {
//       type: String,
//       trim: true,
//       default: undefined,
//       set: (value: unknown) => {
//         if (typeof value !== "string") return undefined;

//         const limpio = value.trim();

//         return limpio.length > 0 ? limpio : undefined;
//       },
//     },

//     firmaVerificacion: {
//       type: String,
//       trim: true,
//       default: undefined,
//       set: (value: unknown) => {
//         if (typeof value !== "string") return undefined;

//         const limpio = value.trim();

//         return limpio.length > 0 ? limpio : undefined;
//       },
//     },
//   },
//   {
//     timestamps: {
//       createdAt: "creadoEn",
//       updatedAt: "actualizadoEn",
//     },
//   },
// );

// MovimientoFinancieroSchema.pre("validate", function (next) {
//   if (this.codigoVerificacion === null) {
//     this.set("codigoVerificacion", undefined);
//   }

//   if (this.firmaVerificacion === null) {
//     this.set("firmaVerificacion", undefined);
//   }

//   next();
// });

// MovimientoFinancieroSchema.index({
//   clienteId: 1,
//   tipoMovimiento: 1,
//   referenciaAnio: 1,
//   referenciaMes: 1,
// });

// MovimientoFinancieroSchema.index({
//   clienteId: 1,
//   facturaAsociadaId: 1,
// });

// MovimientoFinancieroSchema.index(
//   { codigoVerificacion: 1 },
//   {
//     name: "codigoVerificacion_unico_si_existe",
//     unique: true,
//     partialFilterExpression: {
//       codigoVerificacion: {
//         $exists: true,
//         $type: "string",
//       },
//     },
//   },
// );

// export type MovimientoFinancieroDocument = InferSchemaType<
//   typeof MovimientoFinancieroSchema
// >;

// const MovimientoFinanciero: Model<MovimientoFinancieroDocument> =
//   (mongoose.models.MovimientoFinanciero as Model<MovimientoFinancieroDocument>) ||
//   mongoose.model<MovimientoFinancieroDocument>(
//     "MovimientoFinanciero",
//     MovimientoFinancieroSchema,
//   );

// export default MovimientoFinanciero;

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

    facturaAsociadaId: {
      type: Schema.Types.ObjectId,
      ref: "MovimientoFinanciero",
      default: null,
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
    },

    observacion: {
      type: String,
      trim: true,
      maxlength: [300, "La observación no puede superar los 300 caracteres."],
      default: "",
    },

    codigoVerificacion: {
      type: String,
      trim: true,
      default: undefined,
      set: (value: unknown) => {
        if (typeof value !== "string") return undefined;

        const limpio = value.trim();

        return limpio.length > 0 ? limpio : undefined;
      },
    },

    firmaVerificacion: {
      type: String,
      trim: true,
      default: undefined,
      set: (value: unknown) => {
        if (typeof value !== "string") return undefined;

        const limpio = value.trim();

        return limpio.length > 0 ? limpio : undefined;
      },
    },

    estadoComprobante: {
      type: String,
      enum: ["vigente", "corregido_parcialmente", "anulado"],
      required: true,
      default: "vigente",
      index: true,
    },

    pagoCorregidoId: {
      type: Schema.Types.ObjectId,
      ref: "MovimientoFinanciero",
      default: null,
      index: true,
    },

    corregidoPorMovimientoId: {
      type: Schema.Types.ObjectId,
      ref: "MovimientoFinanciero",
      default: null,
      index: true,
    },

    importeValidoFinal: {
      type: Number,
      default: null,
      min: 0,
    },

    importeCorregido: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: {
      createdAt: "creadoEn",
      updatedAt: "actualizadoEn",
    },
  },
);

MovimientoFinancieroSchema.pre("validate", function (next) {
  if (this.codigoVerificacion === null) {
    this.set("codigoVerificacion", undefined);
  }

  if (this.firmaVerificacion === null) {
    this.set("firmaVerificacion", undefined);
  }

  next();
});

MovimientoFinancieroSchema.index({
  clienteId: 1,
  tipoMovimiento: 1,
  referenciaAnio: 1,
  referenciaMes: 1,
});

MovimientoFinancieroSchema.index({
  clienteId: 1,
  facturaAsociadaId: 1,
});

MovimientoFinancieroSchema.index(
  { codigoVerificacion: 1 },
  {
    name: "codigoVerificacion_unico_si_existe",
    unique: true,
    partialFilterExpression: {
      codigoVerificacion: {
        $exists: true,
        $type: "string",
      },
    },
  },
);

export type MovimientoFinancieroDocument = InferSchemaType<
  typeof MovimientoFinancieroSchema
>;

const MovimientoFinanciero: Model<MovimientoFinancieroDocument> =
  (mongoose.models.MovimientoFinanciero as Model<MovimientoFinancieroDocument>) ||
  mongoose.model<MovimientoFinancieroDocument>(
    "MovimientoFinanciero",
    MovimientoFinancieroSchema,
  );

export default MovimientoFinanciero;
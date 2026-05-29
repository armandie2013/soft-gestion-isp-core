import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ContadorSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    valor: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export type ContadorDocument = InferSchemaType<typeof ContadorSchema>;

const Contador: Model<ContadorDocument> =
  mongoose.models.Contador ||
  mongoose.model<ContadorDocument>("Contador", ContadorSchema);

export default Contador;
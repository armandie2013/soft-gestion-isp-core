// src/models/AuditLog.ts

import mongoose, { Schema, model, models } from "mongoose";

export type AuditLogResultado = "success" | "failure" | "warning" | "info";

export type AuditLogDocument = {
  _id: mongoose.Types.ObjectId;
  action: string;
  resultado: AuditLogResultado;
  actorId?: string | null;
  actorNombre?: string | null;
  actorEmail?: string | null;
  actorRol?: string | null;
  entidadTipo?: string | null;
  entidadId?: string | null;
  entidadLabel?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  mensaje?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
};

const AuditLogSchema = new Schema<AuditLogDocument>(
  {
    action: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    resultado: {
      type: String,
      enum: ["success", "failure", "warning", "info"],
      default: "info",
      index: true,
    },

    actorId: {
      type: String,
      default: null,
      index: true,
    },

    actorNombre: {
      type: String,
      default: null,
      trim: true,
    },

    actorEmail: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      index: true,
    },

    actorRol: {
      type: String,
      default: null,
      trim: true,
      index: true,
    },

    entidadTipo: {
      type: String,
      default: null,
      trim: true,
      index: true,
    },

    entidadId: {
      type: String,
      default: null,
      trim: true,
      index: true,
    },

    entidadLabel: {
      type: String,
      default: null,
      trim: true,
    },

    ip: {
      type: String,
      default: null,
      trim: true,
      index: true,
    },

    userAgent: {
      type: String,
      default: null,
      trim: true,
    },

    mensaje: {
      type: String,
      default: null,
      trim: true,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ action: 1, createdAt: -1 });
AuditLogSchema.index({ actorId: 1, createdAt: -1 });
AuditLogSchema.index({ entidadTipo: 1, entidadId: 1, createdAt: -1 });

const AuditLog =
  models.AuditLog || model<AuditLogDocument>("AuditLog", AuditLogSchema);

export default AuditLog;
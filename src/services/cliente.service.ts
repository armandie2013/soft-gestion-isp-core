// import mongoose from "mongoose";
// import { z } from "zod";
// import { connectDB } from "@/lib/db";
// import Cliente from "@/models/Cliente";
// import Plan from "@/models/Plan";
// import { obtenerSiguienteNumeroCliente } from "@/utils/obtenerSiguienteNumeroCliente";
// import type { ClienteSafe, ClienteStatus } from "@/types/cliente.types";
// import type { PlanSafe, PlanStatus, PlanType } from "@/types/plan.types";

// const objectIdSchema = z
//   .string()
//   .min(1, "Debe seleccionar un plan.")
//   .refine((value) => mongoose.Types.ObjectId.isValid(value), {
//     message: "Plan inválido.",
//   });

// export const crearClienteSchema = z.object({
//   nombre: z
//     .string()
//     .trim()
//     .min(2, "El nombre debe tener al menos 2 caracteres.")
//     .max(80, "El nombre no puede superar los 80 caracteres."),

//   apellido: z
//     .string()
//     .trim()
//     .min(2, "El apellido debe tener al menos 2 caracteres.")
//     .max(80, "El apellido no puede superar los 80 caracteres."),

//   dni: z
//     .string()
//     .trim()
//     .regex(/^\d{7,8}$/, "El DNI debe tener 7 u 8 dígitos numéricos."),

//   direccion: z
//     .string()
//     .trim()
//     .min(2, "La dirección debe tener al menos 2 caracteres.")
//     .max(140, "La dirección no puede superar los 140 caracteres."),

//   localidad: z
//     .string()
//     .trim()
//     .min(2, "La localidad debe tener al menos 2 caracteres.")
//     .max(80, "La localidad no puede superar los 80 caracteres."),

//   provincia: z
//     .string()
//     .trim()
//     .min(2, "La provincia debe tener al menos 2 caracteres.")
//     .max(80, "La provincia no puede superar los 80 caracteres."),

//   telefono: z
//     .string()
//     .trim()
//     .min(6, "El teléfono debe tener al menos 6 caracteres.")
//     .max(30, "El teléfono no puede superar los 30 caracteres."),

//   email: z
//     .string()
//     .trim()
//     .max(120, "El email no puede superar los 120 caracteres.")
//     .optional()
//     .default("")
//     .refine(
//       (value) => value === "" || z.string().email().safeParse(value).success,
//       {
//         message: "Ingresá un email válido.",
//       },
//     ),

//   planId: objectIdSchema,

//   estado: z.enum(["activo", "suspendido", "baja"], {
//     message: "Estado inválido.",
//   }),
// });

// export const actualizarClienteSchema = crearClienteSchema.extend({
//   id: z.string().min(1, "Falta el ID del cliente."),
// });

// export const eliminarClienteSchema = z.object({
//   id: z.string().min(1, "Falta el ID del cliente."),
// });

// export type CrearClienteInput = z.infer<typeof crearClienteSchema>;
// export type ActualizarClienteInput = z.infer<typeof actualizarClienteSchema>;
// export type EliminarClienteInput = z.infer<typeof eliminarClienteSchema>;

// function validarObjectId(id: string) {
//   return mongoose.Types.ObjectId.isValid(id);
// }

// function toSafePlan(plan: any): PlanSafe | null {
//   if (!plan) return null;

//   return {
//     id: plan._id.toString(),
//     nombre: plan.nombre || "",
//     tipo: plan.tipo as PlanType,
//     detalle: plan.detalle || "",
//     importe: Number(plan.importe || 0),
//     estado: plan.estado as PlanStatus,
//     creadoEn: plan.creadoEn?.toISOString?.() || "",
//     actualizadoEn: plan.actualizadoEn?.toISOString?.() || "",
//   };
// }

// function toSafeCliente(cliente: any): ClienteSafe {
//   const plan =
//     cliente.planId && typeof cliente.planId === "object"
//       ? toSafePlan(cliente.planId)
//       : null;

//   return {
//     id: cliente._id.toString(),
//     numeroCliente: Number(cliente.numeroCliente || 0),
//     nombre: cliente.nombre || "",
//     apellido: cliente.apellido || "",
//     dni: cliente.dni || "",
//     direccion: cliente.direccion || "",
//     localidad: cliente.localidad || "",
//     provincia: cliente.provincia || "",
//     telefono: cliente.telefono || "",
//     email: cliente.email || "",
//     planId:
//       cliente.planId && typeof cliente.planId === "object"
//         ? cliente.planId._id.toString()
//         : cliente.planId?.toString?.() || "",
//     plan,
//     estado: cliente.estado as ClienteStatus,
//     usuarioId: cliente.usuarioId ? cliente.usuarioId.toString() : null,
//     creadoEn: cliente.creadoEn?.toISOString?.() || "",
//     actualizadoEn: cliente.actualizadoEn?.toISOString?.() || "",
//   };
// }

// export async function obtenerClientes() {
//   await connectDB();

//   const clientes = await Cliente.find()
//     .populate({ path: "planId", model: Plan })
//     .sort({ numeroCliente: -1 })
//     .lean();

//   return clientes.map(toSafeCliente);
// }

// export async function obtenerClientePorId(id: string) {
//   if (!validarObjectId(id)) {
//     return null;
//   }

//   await connectDB();

//   const cliente = await Cliente.findById(id)
//     .populate({ path: "planId", model: Plan })
//     .lean();

//   if (!cliente) {
//     return null;
//   }

//   return toSafeCliente(cliente);
// }

// export async function crearCliente(input: CrearClienteInput) {
//   const parsed = crearClienteSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//     };
//   }

//   await connectDB();

//   const {
//     nombre,
//     apellido,
//     dni,
//     direccion,
//     localidad,
//     provincia,
//     telefono,
//     email,
//     planId,
//     estado,
//   } = parsed.data;

//   const dniNormalizado = dni.trim();
//   const emailNormalizado = email?.toLowerCase().trim() || "";

//   const existeDni = await Cliente.findOne({ dni: dniNormalizado }).lean();

//   if (existeDni) {
//     return {
//       ok: false,
//       message: "Ya existe un cliente registrado con ese DNI.",
//     };
//   }

//   if (emailNormalizado) {
//     const existeEmail = await Cliente.findOne({ email: emailNormalizado }).lean();

//     if (existeEmail) {
//       return {
//         ok: false,
//         message: "Ya existe un cliente registrado con ese email.",
//       };
//     }
//   }

//   const plan = await Plan.findOne({
//     _id: planId,
//     estado: "activo",
//   }).lean();

//   if (!plan) {
//     return {
//       ok: false,
//       message: "El plan seleccionado no existe o no está activo.",
//     };
//   }

//   const numeroCliente = await obtenerSiguienteNumeroCliente();

//   await Cliente.create({
//     numeroCliente,
//     nombre: nombre.trim(),
//     apellido: apellido.trim(),
//     dni: dniNormalizado,
//     direccion: direccion.trim(),
//     localidad: localidad.trim(),
//     provincia: provincia.trim(),
//     telefono: telefono.trim(),
//     email: emailNormalizado,
//     planId,
//     estado,
//   });

//   return {
//     ok: true,
//     message: `Cliente creado correctamente. Número de cliente: ${numeroCliente}`,
//   };
// }

// export async function actualizarCliente(input: ActualizarClienteInput) {
//   const parsed = actualizarClienteSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//     };
//   }

//   const {
//     id,
//     nombre,
//     apellido,
//     dni,
//     direccion,
//     localidad,
//     provincia,
//     telefono,
//     email,
//     planId,
//     estado,
//   } = parsed.data;

//   if (!validarObjectId(id)) {
//     return {
//       ok: false,
//       message: "ID de cliente inválido.",
//     };
//   }

//   await connectDB();

//   const cliente = await Cliente.findById(id);

//   if (!cliente) {
//     return {
//       ok: false,
//       message: "Cliente no encontrado.",
//     };
//   }

//   const dniNormalizado = dni.trim();
//   const emailNormalizado = email?.toLowerCase().trim() || "";

//   const existeDni = await Cliente.findOne({
//     dni: dniNormalizado,
//     _id: { $ne: id },
//   }).lean();

//   if (existeDni) {
//     return {
//       ok: false,
//       message: "Ya existe otro cliente registrado con ese DNI.",
//     };
//   }

//   if (emailNormalizado) {
//     const existeEmail = await Cliente.findOne({
//       email: emailNormalizado,
//       _id: { $ne: id },
//     }).lean();

//     if (existeEmail) {
//       return {
//         ok: false,
//         message: "Ya existe otro cliente registrado con ese email.",
//       };
//     }
//   }

//   const plan = await Plan.findOne({
//     _id: planId,
//     estado: "activo",
//   }).lean();

//   if (!plan) {
//     return {
//       ok: false,
//       message: "El plan seleccionado no existe o no está activo.",
//     };
//   }

//   cliente.nombre = nombre.trim();
//   cliente.apellido = apellido.trim();
//   cliente.dni = dniNormalizado;
//   cliente.direccion = direccion.trim();
//   cliente.localidad = localidad.trim();
//   cliente.provincia = provincia.trim();
//   cliente.telefono = telefono.trim();
//   cliente.email = emailNormalizado;
//   cliente.planId = new mongoose.Types.ObjectId(planId);
//   cliente.estado = estado;

//   await cliente.save();

//   return {
//     ok: true,
//     message: "Cliente actualizado correctamente.",
//   };
// }

// export async function eliminarCliente(input: EliminarClienteInput) {
//   const parsed = eliminarClienteSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       ok: false,
//       message: parsed.error.issues[0]?.message || "Datos inválidos.",
//     };
//   }

//   const { id } = parsed.data;

//   if (!validarObjectId(id)) {
//     return {
//       ok: false,
//       message: "ID de cliente inválido.",
//     };
//   }

//   await connectDB();

//   const cliente = await Cliente.findById(id);

//   if (!cliente) {
//     return {
//       ok: false,
//       message: "Cliente no encontrado.",
//     };
//   }

//   await Cliente.deleteOne({ _id: id });

//   return {
//     ok: true,
//     message: "Cliente eliminado correctamente.",
//   };
// }

import mongoose from "mongoose";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Cliente from "@/models/Cliente";
import Plan from "@/models/Plan";
import ClientePlanHistorial from "@/models/ClientePlanHistorial";
import { obtenerSiguienteNumeroCliente } from "@/utils/obtenerSiguienteNumeroCliente";
import type { ClienteSafe, ClienteStatus } from "@/types/cliente.types";
import type { PlanSafe, PlanStatus, PlanType } from "@/types/plan.types";

const objectIdSchema = z
  .string()
  .min(1, "Debe seleccionar un plan.")
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Plan inválido.",
  });

const optionalDateSchema = z
  .string()
  .trim()
  .optional()
  .default("")
  .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "La fecha debe tener formato válido.",
  });

export const crearClienteSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(80, "El nombre no puede superar los 80 caracteres."),

  apellido: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres.")
    .max(80, "El apellido no puede superar los 80 caracteres."),

  dni: z
    .string()
    .trim()
    .regex(/^\d{7,8}$/, "El DNI debe tener 7 u 8 dígitos numéricos."),

  direccion: z
    .string()
    .trim()
    .min(2, "La dirección debe tener al menos 2 caracteres.")
    .max(140, "La dirección no puede superar los 140 caracteres."),

  localidad: z
    .string()
    .trim()
    .min(2, "La localidad debe tener al menos 2 caracteres.")
    .max(80, "La localidad no puede superar los 80 caracteres."),

  provincia: z
    .string()
    .trim()
    .min(2, "La provincia debe tener al menos 2 caracteres.")
    .max(80, "La provincia no puede superar los 80 caracteres."),

  telefono: z
    .string()
    .trim()
    .min(6, "El teléfono debe tener al menos 6 caracteres.")
    .max(30, "El teléfono no puede superar los 30 caracteres."),

  email: z
    .string()
    .trim()
    .max(120, "El email no puede superar los 120 caracteres.")
    .optional()
    .default("")
    .refine(
      (value) => value === "" || z.string().email().safeParse(value).success,
      {
        message: "Ingresá un email válido.",
      },
    ),

  planId: objectIdSchema,

  fechaAlta: optionalDateSchema,

  estado: z.enum(["activo", "suspendido", "baja"], {
    message: "Estado inválido.",
  }),
});

export const actualizarClienteSchema = crearClienteSchema.extend({
  id: z.string().min(1, "Falta el ID del cliente."),
  fechaCambioPlan: optionalDateSchema,
});

export const eliminarClienteSchema = z.object({
  id: z.string().min(1, "Falta el ID del cliente."),
});

export type CrearClienteInput = z.infer<typeof crearClienteSchema>;
export type ActualizarClienteInput = z.infer<typeof actualizarClienteSchema>;
export type EliminarClienteInput = z.infer<typeof eliminarClienteSchema>;

function validarObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function inicioDiaLocal(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function parseFechaLocal(value?: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return inicioDiaLocal(new Date());
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

function toInputDate(value?: Date | string | null) {
  if (!value) return "";

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function toSafePlan(plan: any): PlanSafe | null {
  if (!plan) return null;

  return {
    id: plan._id.toString(),
    nombre: plan.nombre || "",
    tipo: plan.tipo as PlanType,
    detalle: plan.detalle || "",
    importe: Number(plan.importe || 0),
    estado: plan.estado as PlanStatus,
    creadoEn: plan.creadoEn?.toISOString?.() || "",
    actualizadoEn: plan.actualizadoEn?.toISOString?.() || "",
  };
}

function toSafeCliente(cliente: any): ClienteSafe {
  const plan =
    cliente.planId && typeof cliente.planId === "object"
      ? toSafePlan(cliente.planId)
      : null;

  const fechaAlta = cliente.fechaAlta || cliente.creadoEn || new Date();

  return {
    id: cliente._id.toString(),
    numeroCliente: Number(cliente.numeroCliente || 0),
    nombre: cliente.nombre || "",
    apellido: cliente.apellido || "",
    dni: cliente.dni || "",
    direccion: cliente.direccion || "",
    localidad: cliente.localidad || "",
    provincia: cliente.provincia || "",
    telefono: cliente.telefono || "",
    email: cliente.email || "",
    planId:
      cliente.planId && typeof cliente.planId === "object"
        ? cliente.planId._id.toString()
        : cliente.planId?.toString?.() || "",
    plan,
    fechaAlta: toInputDate(fechaAlta),
    estado: cliente.estado as ClienteStatus,
    usuarioId: cliente.usuarioId ? cliente.usuarioId.toString() : null,
    creadoEn: cliente.creadoEn?.toISOString?.() || "",
    actualizadoEn: cliente.actualizadoEn?.toISOString?.() || "",
  };
}

async function crearPrimerHistorialPlan(params: {
  clienteId: string;
  plan: any;
  fechaDesde: Date;
}) {
  const historialExistente = await ClientePlanHistorial.exists({
    clienteId: params.clienteId,
  });

  if (historialExistente) return;

  await ClientePlanHistorial.create({
    clienteId: params.clienteId,
    planId: params.plan._id,
    planNombre: params.plan.nombre || "Plan",
    planTipo: params.plan.tipo || "residencial",
    planImporte: Number(params.plan.importe || 0),
    fechaDesde: params.fechaDesde,
    fechaHasta: null,
    motivo: "alta",
    observacion: "Historial inicial creado al dar de alta el cliente.",
  });
}

async function registrarCambioPlanSiCorresponde(params: {
  clienteId: string;
  planAnteriorId: string;
  planNuevo: any;
  fechaCambio: Date;
}) {
  if (params.planAnteriorId === params.planNuevo._id.toString()) {
    return false;
  }

  await ClientePlanHistorial.updateMany(
    {
      clienteId: params.clienteId,
      fechaHasta: null,
    },
    {
      $set: {
        fechaHasta: params.fechaCambio,
      },
    },
  );

  await ClientePlanHistorial.create({
    clienteId: params.clienteId,
    planId: params.planNuevo._id,
    planNombre: params.planNuevo.nombre || "Plan",
    planTipo: params.planNuevo.tipo || "residencial",
    planImporte: Number(params.planNuevo.importe || 0),
    fechaDesde: params.fechaCambio,
    fechaHasta: null,
    motivo: "cambio_plan",
    observacion: "Cambio de plan registrado desde edición del cliente.",
  });

  return true;
}

export async function obtenerClientes() {
  await connectDB();

  const clientes = await Cliente.find()
    .populate({ path: "planId", model: Plan })
    .sort({ numeroCliente: -1 })
    .lean();

  return clientes.map(toSafeCliente);
}

export async function obtenerClientePorId(id: string) {
  if (!validarObjectId(id)) {
    return null;
  }

  await connectDB();

  const cliente = await Cliente.findById(id)
    .populate({ path: "planId", model: Plan })
    .lean();

  if (!cliente) {
    return null;
  }

  return toSafeCliente(cliente);
}

export async function crearCliente(input: CrearClienteInput) {
  const parsed = crearClienteSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  await connectDB();

  const {
    nombre,
    apellido,
    dni,
    direccion,
    localidad,
    provincia,
    telefono,
    email,
    planId,
    fechaAlta,
    estado,
  } = parsed.data;

  const dniNormalizado = dni.trim();
  const emailNormalizado = email?.toLowerCase().trim() || "";
  const fechaAltaDate = parseFechaLocal(fechaAlta);

  const existeDni = await Cliente.findOne({ dni: dniNormalizado }).lean();

  if (existeDni) {
    return {
      ok: false,
      message: "Ya existe un cliente registrado con ese DNI.",
    };
  }

  if (emailNormalizado) {
    const existeEmail = await Cliente.findOne({ email: emailNormalizado }).lean();

    if (existeEmail) {
      return {
        ok: false,
        message: "Ya existe un cliente registrado con ese email.",
      };
    }
  }

  const plan = await Plan.findOne({
    _id: planId,
    estado: "activo",
  }).lean();

  if (!plan) {
    return {
      ok: false,
      message: "El plan seleccionado no existe o no está activo.",
    };
  }

  const numeroCliente = await obtenerSiguienteNumeroCliente();

  const cliente = await Cliente.create({
    numeroCliente,
    nombre: nombre.trim(),
    apellido: apellido.trim(),
    dni: dniNormalizado,
    direccion: direccion.trim(),
    localidad: localidad.trim(),
    provincia: provincia.trim(),
    telefono: telefono.trim(),
    email: emailNormalizado,
    planId,
    fechaAlta: fechaAltaDate,
    estado,
  });

  await crearPrimerHistorialPlan({
    clienteId: cliente._id.toString(),
    plan,
    fechaDesde: fechaAltaDate,
  });

  return {
    ok: true,
    message: `Cliente creado correctamente. Número de cliente: ${numeroCliente}`,
  };
}

export async function actualizarCliente(input: ActualizarClienteInput) {
  const parsed = actualizarClienteSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  const {
    id,
    nombre,
    apellido,
    dni,
    direccion,
    localidad,
    provincia,
    telefono,
    email,
    planId,
    fechaAlta,
    fechaCambioPlan,
    estado,
  } = parsed.data;

  if (!validarObjectId(id)) {
    return {
      ok: false,
      message: "ID de cliente inválido.",
    };
  }

  await connectDB();

  const cliente = await Cliente.findById(id);

  if (!cliente) {
    return {
      ok: false,
      message: "Cliente no encontrado.",
    };
  }

  const dniNormalizado = dni.trim();
  const emailNormalizado = email?.toLowerCase().trim() || "";
  const fechaAltaDate = parseFechaLocal(fechaAlta);
  const planAnteriorId = cliente.planId?.toString?.() || "";

  const existeDni = await Cliente.findOne({
    dni: dniNormalizado,
    _id: { $ne: id },
  }).lean();

  if (existeDni) {
    return {
      ok: false,
      message: "Ya existe otro cliente registrado con ese DNI.",
    };
  }

  if (emailNormalizado) {
    const existeEmail = await Cliente.findOne({
      email: emailNormalizado,
      _id: { $ne: id },
    }).lean();

    if (existeEmail) {
      return {
        ok: false,
        message: "Ya existe otro cliente registrado con ese email.",
      };
    }
  }

  const plan = await Plan.findOne({
    _id: planId,
    estado: "activo",
  }).lean();

  if (!plan) {
    return {
      ok: false,
      message: "El plan seleccionado no existe o no está activo.",
    };
  }

  await crearPrimerHistorialPlan({
    clienteId: id,
    plan,
    fechaDesde: cliente.fechaAlta
      ? inicioDiaLocal(cliente.fechaAlta)
      : fechaAltaDate,
  });

  const fechaCambioDate = parseFechaLocal(fechaCambioPlan || "");

  const cambioPlan = await registrarCambioPlanSiCorresponde({
    clienteId: id,
    planAnteriorId,
    planNuevo: plan,
    fechaCambio: fechaCambioDate,
  });

  cliente.nombre = nombre.trim();
  cliente.apellido = apellido.trim();
  cliente.dni = dniNormalizado;
  cliente.direccion = direccion.trim();
  cliente.localidad = localidad.trim();
  cliente.provincia = provincia.trim();
  cliente.telefono = telefono.trim();
  cliente.email = emailNormalizado;
  cliente.planId = new mongoose.Types.ObjectId(planId);
  cliente.fechaAlta = fechaAltaDate;
  cliente.estado = estado;

  await cliente.save();

  return {
    ok: true,
    message: cambioPlan
      ? "Cliente actualizado correctamente. También se registró el cambio de plan en el historial."
      : "Cliente actualizado correctamente.",
  };
}

export async function eliminarCliente(input: EliminarClienteInput) {
  const parsed = eliminarClienteSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Datos inválidos.",
    };
  }

  const { id } = parsed.data;

  if (!validarObjectId(id)) {
    return {
      ok: false,
      message: "ID de cliente inválido.",
    };
  }

  await connectDB();

  const cliente = await Cliente.findById(id);

  if (!cliente) {
    return {
      ok: false,
      message: "Cliente no encontrado.",
    };
  }

  await Cliente.deleteOne({ _id: id });
  await ClientePlanHistorial.deleteMany({ clienteId: id });

  return {
    ok: true,
    message: "Cliente eliminado correctamente.",
  };
}
// // src/services/cobrador.service.ts

// import mongoose from "mongoose";
// import { connectDB } from "@/lib/db";
// import Cliente from "@/models/Cliente";
// import Plan from "@/models/Plan";
// import { obtenerEstadoCuentaCliente } from "@/services/movimiento-financiero.service";
// import type { ClienteSafe, ClienteStatus } from "@/types/cliente.types";
// import type { PlanSafe, PlanStatus, PlanType } from "@/types/plan.types";

// export type BuscarClientesCobradorFiltros = {
//   q?: string;
//   nombre?: string;
//   apellido?: string;
//   dni?: string;
//   numeroCliente?: string;
//   localidad?: string;
//   provincia?: string;
// };

// function validarObjectId(id: string) {
//   return mongoose.Types.ObjectId.isValid(id);
// }

// function limpiarDni(dni: string) {
//   return String(dni || "").replace(/\D/g, "").trim();
// }

// function limpiarTexto(value?: string) {
//   return String(value || "").trim();
// }

// function escapeRegExp(value: string) {
//   return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }

// function crearRegexTexto(value: string) {
//   return new RegExp(escapeRegExp(value), "i");
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

// export async function buscarClientePorDniParaCobrador(dni: string) {
//   const dniNormalizado = limpiarDni(dni);

//   if (!dniNormalizado || dniNormalizado.length < 7) {
//     return null;
//   }

//   await connectDB();

//   const cliente = await Cliente.findOne({ dni: dniNormalizado })
//     .populate({ path: "planId", model: Plan })
//     .lean();

//   if (!cliente) {
//     return null;
//   }

//   return toSafeCliente(cliente);
// }

// export async function obtenerClienteParaCobrador(clienteId: string) {
//   if (!validarObjectId(clienteId)) {
//     return null;
//   }

//   await connectDB();

//   const cliente = await Cliente.findById(clienteId)
//     .populate({ path: "planId", model: Plan })
//     .lean();

//   if (!cliente) {
//     return null;
//   }

//   return toSafeCliente(cliente);
// }

// export async function obtenerResumenClienteParaCobrador(clienteId: string) {
//   const [cliente, estadoCuenta] = await Promise.all([
//     obtenerClienteParaCobrador(clienteId),
//     obtenerEstadoCuentaCliente(clienteId),
//   ]);

//   if (!cliente || !estadoCuenta) {
//     return null;
//   }

//   const periodosPendientes = estadoCuenta.periodos.filter(
//     (periodo) => periodo.saldoPeriodo > 0,
//   );

//   const totalPendiente = periodosPendientes.reduce(
//     (acc, periodo) => acc + periodo.saldoPeriodo,
//     0,
//   );

//   return {
//     cliente,
//     estadoCuenta,
//     periodosPendientes,
//     totalPendiente,
//   };
// }

// export async function buscarClientesParaCobrador(
//   filtros: BuscarClientesCobradorFiltros,
// ) {
//   const q = limpiarTexto(filtros.q);
//   const nombre = limpiarTexto(filtros.nombre);
//   const apellido = limpiarTexto(filtros.apellido);
//   const dni = limpiarDni(filtros.dni || "");
//   const numeroCliente = limpiarTexto(filtros.numeroCliente);
//   const localidad = limpiarTexto(filtros.localidad);
//   const provincia = limpiarTexto(filtros.provincia);

//   const andConditions: any[] = [];

//   if (q) {
//     const qDigits = limpiarDni(q);
//     const orConditions: any[] = [];

//     if (qDigits.length >= 3) {
//       orConditions.push({
//         dni: qDigits.length >= 7
//           ? qDigits
//           : new RegExp(`${escapeRegExp(qDigits)}$`),
//       });

//       const numeroClienteValue = Number(qDigits);

//       if (Number.isInteger(numeroClienteValue) && numeroClienteValue > 0) {
//         orConditions.push({ numeroCliente: numeroClienteValue });
//       }
//     }

//     if (q.length >= 2) {
//       const textRegex = crearRegexTexto(q);

//       orConditions.push(
//         { nombre: textRegex },
//         { apellido: textRegex },
//         { localidad: textRegex },
//         { provincia: textRegex },
//         { direccion: textRegex },
//       );
//     }

//     if (orConditions.length > 0) {
//       andConditions.push({ $or: orConditions });
//     }
//   }

//   if (nombre.length >= 2) {
//     andConditions.push({ nombre: crearRegexTexto(nombre) });
//   }

//   if (apellido.length >= 2) {
//     andConditions.push({ apellido: crearRegexTexto(apellido) });
//   }

//   if (dni.length >= 3) {
//     andConditions.push({
//       dni: dni.length >= 7 ? dni : new RegExp(`${escapeRegExp(dni)}$`),
//     });
//   }

//   if (numeroCliente) {
//     const numeroClienteValue = Number(numeroCliente.replace(/\D/g, ""));

//     if (Number.isInteger(numeroClienteValue) && numeroClienteValue > 0) {
//       andConditions.push({ numeroCliente: numeroClienteValue });
//     }
//   }

//   if (localidad.length >= 2) {
//     andConditions.push({ localidad: crearRegexTexto(localidad) });
//   }

//   if (provincia.length >= 2) {
//     andConditions.push({ provincia: crearRegexTexto(provincia) });
//   }

//   if (andConditions.length === 0) {
//     return [];
//   }

//   await connectDB();

//   const clientes = await Cliente.find({ $and: andConditions })
//     .populate({ path: "planId", model: Plan })
//     .sort({ apellido: 1, nombre: 1, numeroCliente: 1 })
//     .limit(30)
//     .lean();

//   return clientes.map(toSafeCliente);
// }

// /**
//  * Alias usado por la vista:
//  * src/app/(dashboard)/cobrador/registrar-pago/page.tsx
//  */
// export async function buscarClienteParaCobradorPorDni(dni: string) {
//   return buscarClientePorDniParaCobrador(dni);
// }

// src/services/cobrador.service.ts

import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Cliente from "@/models/Cliente";
import Plan from "@/models/Plan";
import { obtenerEstadoCuentaCliente } from "@/services/movimiento-financiero.service";
import type { ClienteSafe, ClienteStatus } from "@/types/cliente.types";
import type { PlanSafe, PlanStatus, PlanType } from "@/types/plan.types";

export type BuscarClientesCobradorFiltros = {
  q?: string;
  nombre?: string;
  apellido?: string;
  dni?: string;
  numeroCliente?: string;
  localidad?: string;
  provincia?: string;
};

function validarObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function limpiarDni(dni: string) {
  return String(dni || "").replace(/\D/g, "").trim();
}

function limpiarTexto(value?: string) {
  return String(value || "").trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function crearRegexTexto(value: string) {
  return new RegExp(escapeRegExp(value), "i");
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
    fechaAlta: toInputDate(cliente.fechaAlta || cliente.creadoEn || new Date()),
    estado: cliente.estado as ClienteStatus,
    usuarioId: cliente.usuarioId ? cliente.usuarioId.toString() : null,
    creadoEn: cliente.creadoEn?.toISOString?.() || "",
    actualizadoEn: cliente.actualizadoEn?.toISOString?.() || "",
  };
}

export async function buscarClientePorDniParaCobrador(dni: string) {
  const dniNormalizado = limpiarDni(dni);

  if (!dniNormalizado || dniNormalizado.length < 7) {
    return null;
  }

  await connectDB();

  const cliente = await Cliente.findOne({ dni: dniNormalizado })
    .populate({ path: "planId", model: Plan })
    .lean();

  if (!cliente) {
    return null;
  }

  return toSafeCliente(cliente);
}

export async function obtenerClienteParaCobrador(clienteId: string) {
  if (!validarObjectId(clienteId)) {
    return null;
  }

  await connectDB();

  const cliente = await Cliente.findById(clienteId)
    .populate({ path: "planId", model: Plan })
    .lean();

  if (!cliente) {
    return null;
  }

  return toSafeCliente(cliente);
}

export async function obtenerResumenClienteParaCobrador(clienteId: string) {
  const [cliente, estadoCuenta] = await Promise.all([
    obtenerClienteParaCobrador(clienteId),
    obtenerEstadoCuentaCliente(clienteId),
  ]);

  if (!cliente || !estadoCuenta) {
    return null;
  }

  const periodosPendientes = estadoCuenta.periodos.filter(
    (periodo) => periodo.saldoPeriodo > 0,
  );

  const totalPendiente = periodosPendientes.reduce(
    (acc, periodo) => acc + periodo.saldoPeriodo,
    0,
  );

  return {
    cliente,
    estadoCuenta,
    periodosPendientes,
    totalPendiente,
  };
}

export async function buscarClientesParaCobrador(
  filtros: BuscarClientesCobradorFiltros,
) {
  const q = limpiarTexto(filtros.q);
  const nombre = limpiarTexto(filtros.nombre);
  const apellido = limpiarTexto(filtros.apellido);
  const dni = limpiarDni(filtros.dni || "");
  const numeroCliente = limpiarTexto(filtros.numeroCliente);
  const localidad = limpiarTexto(filtros.localidad);
  const provincia = limpiarTexto(filtros.provincia);

  const andConditions: any[] = [];

  if (q) {
    const qDigits = limpiarDni(q);
    const orConditions: any[] = [];

    if (qDigits.length >= 3) {
      orConditions.push({
        dni:
          qDigits.length >= 7
            ? qDigits
            : new RegExp(`${escapeRegExp(qDigits)}$`),
      });

      const numeroClienteValue = Number(qDigits);

      if (Number.isInteger(numeroClienteValue) && numeroClienteValue > 0) {
        orConditions.push({ numeroCliente: numeroClienteValue });
      }
    }

    if (q.length >= 2) {
      const textRegex = crearRegexTexto(q);

      orConditions.push(
        { nombre: textRegex },
        { apellido: textRegex },
        { localidad: textRegex },
        { provincia: textRegex },
        { direccion: textRegex },
      );
    }

    if (orConditions.length > 0) {
      andConditions.push({ $or: orConditions });
    }
  }

  if (nombre.length >= 2) {
    andConditions.push({ nombre: crearRegexTexto(nombre) });
  }

  if (apellido.length >= 2) {
    andConditions.push({ apellido: crearRegexTexto(apellido) });
  }

  if (dni.length >= 3) {
    andConditions.push({
      dni: dni.length >= 7 ? dni : new RegExp(`${escapeRegExp(dni)}$`),
    });
  }

  if (numeroCliente) {
    const numeroClienteValue = Number(numeroCliente.replace(/\D/g, ""));

    if (Number.isInteger(numeroClienteValue) && numeroClienteValue > 0) {
      andConditions.push({ numeroCliente: numeroClienteValue });
    }
  }

  if (localidad.length >= 2) {
    andConditions.push({ localidad: crearRegexTexto(localidad) });
  }

  if (provincia.length >= 2) {
    andConditions.push({ provincia: crearRegexTexto(provincia) });
  }

  if (andConditions.length === 0) {
    return [];
  }

  await connectDB();

  const clientes = await Cliente.find({ $and: andConditions })
    .populate({ path: "planId", model: Plan })
    .sort({ apellido: 1, nombre: 1, numeroCliente: 1 })
    .limit(30)
    .lean();

  return clientes.map(toSafeCliente);
}

/**
 * Alias usado por la vista:
 * src/app/(dashboard)/cobrador/registrar-pago/page.tsx
 */
export async function buscarClienteParaCobradorPorDni(dni: string) {
  return buscarClientePorDniParaCobrador(dni);
}
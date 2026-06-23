// import mongoose from "mongoose";
// import { connectDB } from "@/lib/db";
// import CajaCobrador from "@/models/CajaCobrador";
// import CodigoCierreCaja from "@/models/CodigoCierreCaja";
// import Usuario from "@/models/Usuario";
// import type {
//   CajaCobradorMovimientoSafe,
//   CajaCobradorTipo,
// } from "@/types/cobro.types";
// import type {
//   AdminCierreCajaSafe,
//   AdminCierresCajaResumenSafe,
//   AdminDetalleCierreCajaSafe,
// } from "@/types/admin-caja.types";

// function validarObjectId(id: string) {
//   return mongoose.Types.ObjectId.isValid(id);
// }

// function toSafeCajaMovimiento(movimiento: any): CajaCobradorMovimientoSafe {
//   return {
//     id: movimiento._id.toString(),
//     cobradorId: movimiento.cobradorId?.toString?.() || "",
//     tipoMovimiento: movimiento.tipoMovimiento as CajaCobradorTipo,
//     clienteId: movimiento.clienteId ? movimiento.clienteId.toString() : null,
//     movimientoFinancieroId: movimiento.movimientoFinancieroId
//       ? movimiento.movimientoFinancieroId.toString()
//       : null,
//     facturaAsociadaId: movimiento.facturaAsociadaId
//       ? movimiento.facturaAsociadaId.toString()
//       : null,
//     codigoCierreId: movimiento.codigoCierreId
//       ? movimiento.codigoCierreId.toString()
//       : null,
//     importe: Number(movimiento.importe || 0),
//     saldoCaja: Number(movimiento.saldoCaja || 0),
//     descripcion: movimiento.descripcion || "",
//     observacion: movimiento.observacion || "",
//     creadoEn: movimiento.creadoEn?.toISOString?.() || "",
//     actualizadoEn: movimiento.actualizadoEn?.toISOString?.() || "",
//   };
// }

// async function toSafeCierre(cierre: any): Promise<AdminCierreCajaSafe> {
//   const [cobrador, codigo] = await Promise.all([
//     cierre.cobradorId
//       ? Usuario.findById(cierre.cobradorId).lean()
//       : Promise.resolve(null),

//     cierre.codigoCierreId
//       ? CodigoCierreCaja.findById(cierre.codigoCierreId).lean()
//       : Promise.resolve(null),
//   ]);

//   const cobradorNombre = cobrador
//     ? `${cobrador.apellido || ""}, ${cobrador.nombre || ""}`.trim()
//     : "Cobrador no encontrado";

//   return {
//     id: cierre._id.toString(),
//     cobradorId: cierre.cobradorId?.toString?.() || "",
//     cobradorNombre,
//     importe: Number(cierre.importe || 0),
//     saldoCaja: Number(cierre.saldoCaja || 0),
//     codigoCierreId: cierre.codigoCierreId
//       ? cierre.codigoCierreId.toString()
//       : null,
//     codigo: codigo?.codigo || "-",
//     codigoEstado: codigo?.estado || "-",
//     generadoPorAdminNombre: codigo?.generadoPorAdminNombre || "-",
//     codigoCreadoEn: codigo?.creadoEn?.toISOString?.() || null,
//     codigoUsadoEn: codigo?.usadoEn?.toISOString?.() || null,
//     descripcion: cierre.descripcion || "",
//     observacion: cierre.observacion || "",
//     creadoEn: cierre.creadoEn?.toISOString?.() || "",
//   };
// }

// export async function obtenerHistorialCierresCajaAdmin(): Promise<AdminCierresCajaResumenSafe> {
//   await connectDB();

//   const cierresRaw = await CajaCobrador.find({
//     tipoMovimiento: "cierre_caja",
//   })
//     .sort({ creadoEn: -1 })
//     .lean();

//   const cierres = await Promise.all(
//     cierresRaw.map((cierre) => toSafeCierre(cierre)),
//   );

//   const totalCierres = cierres.reduce(
//     (acc, cierre) => acc + cierre.importe,
//     0,
//   );

//   return {
//     totalCierres,
//     cantidadCierres: cierres.length,
//     cierres,
//   };
// }

// export async function obtenerDetalleCierreCajaAdmin(
//   cierreId: string,
// ): Promise<AdminDetalleCierreCajaSafe | null> {
//   if (!validarObjectId(cierreId)) {
//     return null;
//   }

//   await connectDB();

//   const cierreRaw = await CajaCobrador.findOne({
//     _id: cierreId,
//     tipoMovimiento: "cierre_caja",
//   }).lean();

//   if (!cierreRaw) {
//     return null;
//   }

//   const cierre = await toSafeCierre(cierreRaw);
//   const cobradorId = cierreRaw.cobradorId;
//   const fechaCierre = cierreRaw.creadoEn;

//   const cierreAnteriorRaw = await CajaCobrador.findOne({
//     cobradorId,
//     tipoMovimiento: "cierre_caja",
//     creadoEn: { $lt: fechaCierre },
//   })
//     .sort({ creadoEn: -1 })
//     .lean();

//   const filtroFechaCobros: Record<string, Date> = {
//     $lte: fechaCierre,
//   };

//   if (cierreAnteriorRaw?.creadoEn) {
//     filtroFechaCobros.$gt = cierreAnteriorRaw.creadoEn;
//   }

//   const cobrosIncluidosRaw = await CajaCobrador.find({
//     cobradorId,
//     tipoMovimiento: "cobro",
//     creadoEn: filtroFechaCobros,
//   })
//     .sort({ creadoEn: 1 })
//     .lean();

//   const cobrosIncluidos = cobrosIncluidosRaw.map(toSafeCajaMovimiento);

//   const totalCobrosIncluidos = cobrosIncluidos.reduce(
//     (acc, movimiento) => acc + movimiento.importe,
//     0,
//   );

//   return {
//     cierre,
//     cobrosIncluidos,
//     totalCobrosIncluidos,
//     cierreAnteriorFecha:
//       cierreAnteriorRaw?.creadoEn?.toISOString?.() || null,
//   };
// }

import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import CajaCobrador from "@/models/CajaCobrador";
import CodigoCierreCaja from "@/models/CodigoCierreCaja";
import Usuario from "@/models/Usuario";
import type {
  CajaCobradorEstado,
  CajaCobradorMovimientoSafe,
  CajaCobradorTipo,
} from "@/types/cobro.types";
import type {
  AdminCierreCajaSafe,
  AdminCierresCajaResumenSafe,
  AdminDetalleCierreCajaSafe,
} from "@/types/admin-caja.types";

function validarObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function getEstadoCajaMovimiento(movimiento: any): CajaCobradorEstado {
  if (movimiento.estadoCaja === "cerrado") return "cerrado";

  if (movimiento.estadoCaja === "abierto") return "abierto";

  if (movimiento.cierreCajaId || movimiento.cerradoEn) return "cerrado";

  return "abierto";
}

function toSafeCajaMovimiento(movimiento: any): CajaCobradorMovimientoSafe {
  return {
    id: movimiento._id.toString(),
    cobradorId: movimiento.cobradorId?.toString?.() || "",
    tipoMovimiento: movimiento.tipoMovimiento as CajaCobradorTipo,
    estadoCaja: getEstadoCajaMovimiento(movimiento),
    clienteId: movimiento.clienteId ? movimiento.clienteId.toString() : null,
    movimientoFinancieroId: movimiento.movimientoFinancieroId
      ? movimiento.movimientoFinancieroId.toString()
      : null,
    facturaAsociadaId: movimiento.facturaAsociadaId
      ? movimiento.facturaAsociadaId.toString()
      : null,
    codigoCierreId: movimiento.codigoCierreId
      ? movimiento.codigoCierreId.toString()
      : null,
    cierreCajaId: movimiento.cierreCajaId
      ? movimiento.cierreCajaId.toString()
      : null,
    importe: Number(movimiento.importe || 0),
    saldoCaja: Number(movimiento.saldoCaja || 0),
    descripcion: movimiento.descripcion || "",
    observacion: movimiento.observacion || "",
    cerradoEn: movimiento.cerradoEn?.toISOString?.() || null,
    creadoEn: movimiento.creadoEn?.toISOString?.() || "",
    actualizadoEn: movimiento.actualizadoEn?.toISOString?.() || "",
  };
}

async function toSafeCierre(cierre: any): Promise<AdminCierreCajaSafe> {
  const [cobrador, codigo] = await Promise.all([
    cierre.cobradorId
      ? Usuario.findById(cierre.cobradorId).lean()
      : Promise.resolve(null),

    cierre.codigoCierreId
      ? CodigoCierreCaja.findById(cierre.codigoCierreId).lean()
      : Promise.resolve(null),
  ]);

  const cobradorNombre = cobrador
    ? `${cobrador.apellido || ""}, ${cobrador.nombre || ""}`.trim()
    : "Cobrador no encontrado";

  return {
    id: cierre._id.toString(),
    cobradorId: cierre.cobradorId?.toString?.() || "",
    cobradorNombre,
    importe: Number(cierre.importe || 0),
    saldoCaja: Number(cierre.saldoCaja || 0),
    codigoCierreId: cierre.codigoCierreId
      ? cierre.codigoCierreId.toString()
      : null,
    codigo: codigo?.codigo || "-",
    codigoEstado: codigo?.estado || "-",
    generadoPorAdminNombre: codigo?.generadoPorAdminNombre || "-",
    codigoCreadoEn: codigo?.creadoEn?.toISOString?.() || null,
    codigoUsadoEn: codigo?.usadoEn?.toISOString?.() || null,
    descripcion: cierre.descripcion || "",
    observacion: cierre.observacion || "",
    creadoEn: cierre.creadoEn?.toISOString?.() || "",
  };
}

export async function obtenerHistorialCierresCajaAdmin(): Promise<AdminCierresCajaResumenSafe> {
  await connectDB();

  const cierresRaw = await CajaCobrador.find({
    tipoMovimiento: "cierre_caja",
  })
    .sort({ creadoEn: -1 })
    .lean();

  const cierres = await Promise.all(
    cierresRaw.map((cierre) => toSafeCierre(cierre)),
  );

  const totalCierres = cierres.reduce(
    (acc, cierre) => acc + cierre.importe,
    0,
  );

  return {
    totalCierres,
    cantidadCierres: cierres.length,
    cierres,
  };
}

export async function obtenerDetalleCierreCajaAdmin(
  cierreId: string,
): Promise<AdminDetalleCierreCajaSafe | null> {
  if (!validarObjectId(cierreId)) {
    return null;
  }

  await connectDB();

  const cierreRaw = await CajaCobrador.findOne({
    _id: cierreId,
    tipoMovimiento: "cierre_caja",
  }).lean();

  if (!cierreRaw) {
    return null;
  }

  const cierre = await toSafeCierre(cierreRaw);
  const cobradorId = cierreRaw.cobradorId;
  const fechaCierre = cierreRaw.creadoEn;

  const cierreAnteriorRaw = await CajaCobrador.findOne({
    cobradorId,
    tipoMovimiento: "cierre_caja",
    creadoEn: { $lt: fechaCierre },
  })
    .sort({ creadoEn: -1 })
    .lean();

  const filtroFechaCobros: Record<string, Date> = {
    $lte: fechaCierre,
  };

  if (cierreAnteriorRaw?.creadoEn) {
    filtroFechaCobros.$gt = cierreAnteriorRaw.creadoEn;
  }

  const cobrosIncluidosRaw = await CajaCobrador.find({
    cobradorId,
    tipoMovimiento: {
      $in: [
        "cobro",
        "ajuste_correccion_pago",
        "ajuste_correccion_pago_post_cierre",
      ],
    },
    $or: [
      {
        cierreCajaId: cierreRaw._id,
      },
      {
        creadoEn: filtroFechaCobros,
      },
    ],
  })
    .sort({ creadoEn: 1 })
    .lean();

  const cobrosIncluidos = cobrosIncluidosRaw.map(toSafeCajaMovimiento);

  const totalCobrosIncluidos = cobrosIncluidos
    .filter((movimiento) => movimiento.tipoMovimiento === "cobro")
    .reduce((acc, movimiento) => acc + movimiento.importe, 0);

  const totalAjustesIncluidos = cobrosIncluidos
    .filter(
      (movimiento) =>
        movimiento.tipoMovimiento === "ajuste_correccion_pago" ||
        movimiento.tipoMovimiento === "ajuste_correccion_pago_post_cierre",
    )
    .reduce((acc, movimiento) => acc + movimiento.importe, 0);

  return {
    cierre,
    cobrosIncluidos,
    totalCobrosIncluidos: totalCobrosIncluidos - totalAjustesIncluidos,
    cierreAnteriorFecha:
      cierreAnteriorRaw?.creadoEn?.toISOString?.() || null,
  };
}
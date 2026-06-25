// import mongoose from "mongoose";
// import { connectDB } from "@/lib/db";
// import CajaCobrador from "@/models/CajaCobrador";
// import Cliente from "@/models/Cliente";
// import CodigoCierreCaja from "@/models/CodigoCierreCaja";
// import MovimientoFinanciero from "@/models/MovimientoFinanciero";
// import Usuario from "@/models/Usuario";
// import {
//   formatearFirmaCorta,
//   generarCodigoVerificacionPago,
//   generarFirmaPago,
// } from "@/utils/comprobante-verificacion";
// import type {
//   ComprobanteCierreCajaSafe,
//   ComprobantePagoClienteSafe,
//   VerificacionPagoSafe,
// } from "@/types/comprobante.types";

// function validarObjectId(id: string) {
//   return mongoose.Types.ObjectId.isValid(id);
// }

// function formatPeriodoLabel(mes?: number | null, anio?: number | null) {
//   if (!mes || !anio) return "Sin período";

//   return `${mes}/${anio}`;
// }

// function buildNombreUsuario(usuario: any, fallback = "Usuario") {
//   if (!usuario) return fallback;

//   const nombreCompleto = `${usuario.apellido || ""}, ${
//     usuario.nombre || ""
//   }`.trim();

//   return nombreCompleto || fallback;
// }

// function getAppPublicUrl() {
//   return process.env.APP_PUBLIC_URL || "http://localhost:3000";
// }

// async function asegurarVerificacionPago(movimiento: any, cliente: any) {
//   if (movimiento.codigoVerificacion && movimiento.firmaVerificacion) {
//     return {
//       codigoVerificacion: movimiento.codigoVerificacion,
//       firmaVerificacion: movimiento.firmaVerificacion,
//     };
//   }

//   const codigoVerificacion = generarCodigoVerificacionPago(
//     Number(movimiento.numeroComprobante || 0),
//   );

//   const firmaVerificacion = generarFirmaPago({
//     movimientoId: movimiento._id.toString(),
//     numeroComprobante: Number(movimiento.numeroComprobante || 0),
//     clienteId: cliente._id.toString(),
//     clienteDni: cliente.dni || "",
//     importe: Number(movimiento.haber || 0),
//     fechaIso: movimiento.fecha?.toISOString?.() || "",
//   });

//   await MovimientoFinanciero.updateOne(
//     { _id: movimiento._id },
//     {
//       $set: {
//         codigoVerificacion,
//         firmaVerificacion,
//       },
//     },
//   );

//   return {
//     codigoVerificacion,
//     firmaVerificacion,
//   };
// }

// export async function obtenerComprobantePagoCliente(
//   movimientoId: string,
// ): Promise<ComprobantePagoClienteSafe | null> {
//   if (!validarObjectId(movimientoId)) {
//     return null;
//   }

//   await connectDB();

//   const movimiento = await MovimientoFinanciero.findOne({
//     _id: movimientoId,
//     tipoMovimiento: "pago",
//   }).lean();

//   if (!movimiento) {
//     return null;
//   }

//   const [cliente, cobrador, factura] = await Promise.all([
//     Cliente.findById(movimiento.clienteId).lean(),

//     movimiento.creadoPorUsuarioId
//       ? Usuario.findById(movimiento.creadoPorUsuarioId).lean()
//       : Promise.resolve(null),

//     movimiento.facturaAsociadaId
//       ? MovimientoFinanciero.findById(movimiento.facturaAsociadaId).lean()
//       : Promise.resolve(null),
//   ]);

//   if (!cliente) {
//     return null;
//   }

//   const verificacion = await asegurarVerificacionPago(movimiento, cliente);

//   const cobradorNombre = cobrador
//     ? buildNombreUsuario(cobrador, "Cobrador")
//     : movimiento.creadoPorNombre || "Cobrador";

//   const urlVerificacion = `${getAppPublicUrl()}/verificar/pago/${verificacion.codigoVerificacion}`;

//   return {
//     movimientoId: movimiento._id.toString(),
//     numeroComprobante: Number(movimiento.numeroComprobante || 0),
//     fecha: movimiento.fecha?.toISOString?.() || "",

//     codigoVerificacion: verificacion.codigoVerificacion,
//     firmaVerificacion: verificacion.firmaVerificacion,
//     firmaCorta: formatearFirmaCorta(verificacion.firmaVerificacion),
//     urlVerificacion,

//     clienteId: cliente._id.toString(),
//     clienteNumero: Number(cliente.numeroCliente || 0),
//     clienteNombre: cliente.nombre || "",
//     clienteApellido: cliente.apellido || "",
//     clienteDni: cliente.dni || "",
//     clienteDireccion: cliente.direccion || "",
//     clienteLocalidad: cliente.localidad || "",
//     clienteProvincia: cliente.provincia || "",

//     periodoLabel: formatPeriodoLabel(
//       movimiento.referenciaMes,
//       movimiento.referenciaAnio,
//     ),
//     facturaNumeroComprobante: factura
//       ? Number(factura.numeroComprobante || 0)
//       : null,
//     concepto: movimiento.concepto || "",
//     importePagado: Number(movimiento.haber || 0),
//     observacion: movimiento.observacion || "",

//     cobradorId: movimiento.creadoPorUsuarioId?.toString?.() || "",
//     cobradorNombre,

//     saldoClienteDespuesDelPago: Number(movimiento.saldo || 0),
//   };
// }

// export async function verificarPagoPorCodigo(
//   codigoVerificacion: string,
// ): Promise<VerificacionPagoSafe> {
//   const codigo = String(codigoVerificacion || "").trim().toUpperCase();

//   if (!codigo) {
//     return {
//       valido: false,
//       mensaje: "Código de verificación inválido.",
//     };
//   }

//   await connectDB();

//   const movimiento = await MovimientoFinanciero.findOne({
//     codigoVerificacion: codigo,
//     tipoMovimiento: "pago",
//   }).lean();

//   if (!movimiento) {
//     return {
//       valido: false,
//       mensaje: "No se encontró un pago registrado con ese código.",
//     };
//   }

//   const [cliente, cobrador, factura] = await Promise.all([
//     Cliente.findById(movimiento.clienteId).lean(),

//     movimiento.creadoPorUsuarioId
//       ? Usuario.findById(movimiento.creadoPorUsuarioId).lean()
//       : Promise.resolve(null),

//     movimiento.facturaAsociadaId
//       ? MovimientoFinanciero.findById(movimiento.facturaAsociadaId).lean()
//       : Promise.resolve(null),
//   ]);

//   if (!cliente) {
//     return {
//       valido: false,
//       mensaje: "El pago existe, pero no se encontró el cliente asociado.",
//     };
//   }

//   const firmaEsperada = generarFirmaPago({
//     movimientoId: movimiento._id.toString(),
//     numeroComprobante: Number(movimiento.numeroComprobante || 0),
//     clienteId: cliente._id.toString(),
//     clienteDni: cliente.dni || "",
//     importe: Number(movimiento.haber || 0),
//     fechaIso: movimiento.fecha?.toISOString?.() || "",
//   });

//   const firmaGuardada = movimiento.firmaVerificacion || "";

//   if (firmaGuardada !== firmaEsperada) {
//     return {
//       valido: false,
//       mensaje:
//         "El comprobante fue encontrado, pero la firma interna no coincide. Contacte al administrador.",
//     };
//   }

//   return {
//     valido: true,
//     mensaje: "Comprobante válido. Los datos coinciden con el sistema.",

//     numeroComprobante: Number(movimiento.numeroComprobante || 0),
//     fecha: movimiento.fecha?.toISOString?.() || "",
//     codigoVerificacion: movimiento.codigoVerificacion || "",
//     firmaCorta: formatearFirmaCorta(firmaGuardada),

//     clienteNombre: `${cliente.apellido || ""}, ${cliente.nombre || ""}`.trim(),
//     clienteDni: cliente.dni || "",

//     periodoLabel: formatPeriodoLabel(
//       movimiento.referenciaMes,
//       movimiento.referenciaAnio,
//     ),
//     facturaNumeroComprobante: factura
//       ? Number(factura.numeroComprobante || 0)
//       : null,
//     concepto: movimiento.concepto || "",
//     importePagado: Number(movimiento.haber || 0),
//     cobradorNombre: buildNombreUsuario(cobrador, movimiento.creadoPorNombre),
//   };
// }

// export async function obtenerComprobanteCierreCaja(
//   cierreId: string,
// ): Promise<ComprobanteCierreCajaSafe | null> {
//   if (!validarObjectId(cierreId)) {
//     return null;
//   }

//   await connectDB();

//   const cierre = await CajaCobrador.findOne({
//     _id: cierreId,
//     tipoMovimiento: "cierre_caja",
//   }).lean();

//   if (!cierre) {
//     return null;
//   }

//   const [cobrador, codigo] = await Promise.all([
//     cierre.cobradorId
//       ? Usuario.findById(cierre.cobradorId).lean()
//       : Promise.resolve(null),

//     cierre.codigoCierreId
//       ? CodigoCierreCaja.findById(cierre.codigoCierreId).lean()
//       : Promise.resolve(null),
//   ]);

//   return {
//     cierreId: cierre._id.toString(),
//     fechaCierre: cierre.creadoEn?.toISOString?.() || "",

//     cobradorId: cierre.cobradorId?.toString?.() || "",
//     cobradorNombre: buildNombreUsuario(cobrador, "Cobrador"),
//     cobradorEmail: cobrador?.email || "",

//     importeCerrado: Number(cierre.importe || 0),
//     saldoCajaDespuesDelCierre: Number(cierre.saldoCaja || 0),

//     codigo: codigo?.codigo || "-",
//     codigoEstado: codigo?.estado || "-",
//     codigoGeneradoPor: codigo?.generadoPorAdminNombre || "-",
//     codigoCreadoEn: codigo?.creadoEn?.toISOString?.() || null,
//     codigoUsadoEn: codigo?.usadoEn?.toISOString?.() || null,

//     descripcion: cierre.descripcion || "",
//     observacion: cierre.observacion || "",
//   };
// }

import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import CajaCobrador from "@/models/CajaCobrador";
import Cliente from "@/models/Cliente";
import CodigoCierreCaja from "@/models/CodigoCierreCaja";
import MovimientoFinanciero from "@/models/MovimientoFinanciero";
import Usuario from "@/models/Usuario";
import {
  formatearFirmaCorta,
  generarCodigoVerificacionPago,
  generarFirmaPago,
} from "@/utils/comprobante-verificacion";
import type {
  ComprobanteCierreCajaSafe,
  ComprobantePagoClienteSafe,
  VerificacionPagoSafe,
} from "@/types/comprobante.types";

function validarObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

function formatPeriodoLabel(mes?: number | null, anio?: number | null) {
  if (!mes || !anio) return "Sin período";

  return `${mes}/${anio}`;
}

function buildNombreUsuario(usuario: any, fallback = "Usuario") {
  if (!usuario) return fallback;

  const nombreCompleto = `${usuario.apellido || ""}, ${
    usuario.nombre || ""
  }`.trim();

  return nombreCompleto || fallback;
}

function getAppPublicUrl() {
  return process.env.APP_PUBLIC_URL || "http://localhost:3000";
}

async function obtenerSaldoActualCliente(clienteId: string) {
  const ultimoMovimiento = await MovimientoFinanciero.findOne({ clienteId })
    .sort({ fecha: -1, creadoEn: -1 })
    .lean();

  return Number(ultimoMovimiento?.saldo || 0);
}

async function asegurarVerificacionPago(movimiento: any, cliente: any) {
  if (movimiento.codigoVerificacion && movimiento.firmaVerificacion) {
    return {
      codigoVerificacion: movimiento.codigoVerificacion,
      firmaVerificacion: movimiento.firmaVerificacion,
    };
  }

  const codigoVerificacion = generarCodigoVerificacionPago(
    Number(movimiento.numeroComprobante || 0),
  );

  const firmaVerificacion = generarFirmaPago({
    movimientoId: movimiento._id.toString(),
    numeroComprobante: Number(movimiento.numeroComprobante || 0),
    clienteId: cliente._id.toString(),
    clienteDni: cliente.dni || "",
    importe: Number(movimiento.haber || 0),
    fechaIso: movimiento.fecha?.toISOString?.() || "",
  });

  await MovimientoFinanciero.updateOne(
    { _id: movimiento._id },
    {
      $set: {
        codigoVerificacion,
        firmaVerificacion,
      },
    },
  );

  return {
    codigoVerificacion,
    firmaVerificacion,
  };
}

export async function obtenerComprobantePagoCliente(
  movimientoId: string,
): Promise<ComprobantePagoClienteSafe | null> {
  if (!validarObjectId(movimientoId)) {
    return null;
  }

  await connectDB();

  const movimiento = await MovimientoFinanciero.findOne({
    _id: movimientoId,
    tipoMovimiento: "pago",
  }).lean();

  if (!movimiento) {
    return null;
  }

  const [cliente, cobrador, factura, correccion] = await Promise.all([
    Cliente.findById(movimiento.clienteId).lean(),

    movimiento.creadoPorUsuarioId
      ? Usuario.findById(movimiento.creadoPorUsuarioId).lean()
      : Promise.resolve(null),

    movimiento.facturaAsociadaId
      ? MovimientoFinanciero.findById(movimiento.facturaAsociadaId).lean()
      : Promise.resolve(null),

    movimiento.corregidoPorMovimientoId
      ? MovimientoFinanciero.findById(
          movimiento.corregidoPorMovimientoId,
        ).lean()
      : MovimientoFinanciero.findOne({
          pagoCorregidoId: movimiento._id,
          tipoMovimiento: "nota_debito",
        }).lean(),
  ]);

  if (!cliente) {
    return null;
  }

  const saldoActualCliente = await obtenerSaldoActualCliente(
    cliente._id.toString(),
  );

  const verificacion = await asegurarVerificacionPago(movimiento, cliente);

  const cobradorNombre = cobrador
    ? buildNombreUsuario(cobrador, "Cobrador")
    : movimiento.creadoPorNombre || "Cobrador";

  const urlVerificacion = `${getAppPublicUrl()}/verificar/pago/${verificacion.codigoVerificacion}`;
  const estadoComprobante = movimiento.estadoComprobante || "vigente";
  const estaCorregidoParcialmente =
    estadoComprobante === "corregido_parcialmente" || Boolean(correccion);
  const importePagado = Number(movimiento.haber || 0);
  const importeCorregido = Number(
    movimiento.importeCorregido || correccion?.debe || 0,
  );

  const importeValidoFinal = estaCorregidoParcialmente
    ? Number(
        movimiento.importeValidoFinal !== null &&
          movimiento.importeValidoFinal !== undefined
          ? movimiento.importeValidoFinal
          : Math.max(importePagado - importeCorregido, 0),
      )
    : importePagado;

  return {
    movimientoId: movimiento._id.toString(),
    numeroComprobante: Number(movimiento.numeroComprobante || 0),
    fecha: movimiento.fecha?.toISOString?.() || "",

    codigoVerificacion: verificacion.codigoVerificacion,
    firmaVerificacion: verificacion.firmaVerificacion,
    firmaCorta: formatearFirmaCorta(verificacion.firmaVerificacion),
    urlVerificacion,

    clienteId: cliente._id.toString(),
    clienteNumero: Number(cliente.numeroCliente || 0),
    clienteNombre: cliente.nombre || "",
    clienteApellido: cliente.apellido || "",
    clienteDni: cliente.dni || "",
    clienteDireccion: cliente.direccion || "",
    clienteLocalidad: cliente.localidad || "",
    clienteProvincia: cliente.provincia || "",

    periodoLabel: formatPeriodoLabel(
      movimiento.referenciaMes,
      movimiento.referenciaAnio,
    ),
    facturaNumeroComprobante: factura
      ? Number(factura.numeroComprobante || 0)
      : null,
    concepto: movimiento.concepto || "",
    importePagado,
    observacion: movimiento.observacion || "",

    cobradorId: movimiento.creadoPorUsuarioId?.toString?.() || "",
    cobradorNombre,

    saldoClienteDespuesDelPago: saldoActualCliente,

    estadoComprobante,
    estaCorregidoParcialmente,
    importeValidoFinal,
    importeCorregido,
    comprobanteCorreccionId: correccion?._id?.toString?.() || null,
    comprobanteCorreccionNumero: correccion
      ? Number(correccion.numeroComprobante || 0)
      : null,
  };
}

export async function verificarPagoPorCodigo(
  codigoVerificacion: string,
): Promise<VerificacionPagoSafe> {
  const codigo = String(codigoVerificacion || "").trim().toUpperCase();

  if (!codigo) {
    return {
      valido: false,
      mensaje: "Código de verificación inválido.",
    };
  }

  await connectDB();

  const movimiento = await MovimientoFinanciero.findOne({
    codigoVerificacion: codigo,
    tipoMovimiento: "pago",
  }).lean();

  if (!movimiento) {
    return {
      valido: false,
      mensaje: "No se encontró un pago registrado con ese código.",
    };
  }

  const [cliente, cobrador, factura, correccion] = await Promise.all([
    Cliente.findById(movimiento.clienteId).lean(),

    movimiento.creadoPorUsuarioId
      ? Usuario.findById(movimiento.creadoPorUsuarioId).lean()
      : Promise.resolve(null),

    movimiento.facturaAsociadaId
      ? MovimientoFinanciero.findById(movimiento.facturaAsociadaId).lean()
      : Promise.resolve(null),

    movimiento.corregidoPorMovimientoId
      ? MovimientoFinanciero.findById(
          movimiento.corregidoPorMovimientoId,
        ).lean()
      : MovimientoFinanciero.findOne({
          pagoCorregidoId: movimiento._id,
          tipoMovimiento: "nota_debito",
        }).lean(),
  ]);

  if (!cliente) {
    return {
      valido: false,
      mensaje: "El pago existe, pero no se encontró el cliente asociado.",
    };
  }

  const firmaEsperada = generarFirmaPago({
    movimientoId: movimiento._id.toString(),
    numeroComprobante: Number(movimiento.numeroComprobante || 0),
    clienteId: cliente._id.toString(),
    clienteDni: cliente.dni || "",
    importe: Number(movimiento.haber || 0),
    fechaIso: movimiento.fecha?.toISOString?.() || "",
  });

  const firmaGuardada = movimiento.firmaVerificacion || "";

  if (firmaGuardada !== firmaEsperada) {
    return {
      valido: false,
      mensaje:
        "El comprobante fue encontrado, pero la firma interna no coincide. Contacte al administrador.",
    };
  }

  const estadoComprobante = movimiento.estadoComprobante || "vigente";
  const estaCorregidoParcialmente =
    estadoComprobante === "corregido_parcialmente" || Boolean(correccion);
  const importePagado = Number(movimiento.haber || 0);
  const importeCorregido = Number(
    movimiento.importeCorregido || correccion?.debe || 0,
  );

  const importeValidoFinal = estaCorregidoParcialmente
    ? Number(
        movimiento.importeValidoFinal !== null &&
          movimiento.importeValidoFinal !== undefined
          ? movimiento.importeValidoFinal
          : Math.max(importePagado - importeCorregido, 0),
      )
    : importePagado;

  return {
    valido: true,
    mensaje: estaCorregidoParcialmente
      ? "Comprobante corregido parcialmente. El importe válido actual es el importe final informado por el sistema."
      : "Comprobante válido. Los datos coinciden con el sistema.",

    numeroComprobante: Number(movimiento.numeroComprobante || 0),
    fecha: movimiento.fecha?.toISOString?.() || "",
    codigoVerificacion: movimiento.codigoVerificacion || "",
    firmaCorta: formatearFirmaCorta(firmaGuardada),

    clienteNombre: `${cliente.apellido || ""}, ${cliente.nombre || ""}`.trim(),
    clienteDni: cliente.dni || "",

    periodoLabel: formatPeriodoLabel(
      movimiento.referenciaMes,
      movimiento.referenciaAnio,
    ),
    facturaNumeroComprobante: factura
      ? Number(factura.numeroComprobante || 0)
      : null,
    concepto: movimiento.concepto || "",
    importePagado,
    estadoComprobante,
    estaCorregidoParcialmente,
    importeValidoFinal,
    importeCorregido,
    comprobanteCorreccionNumero: correccion
      ? Number(correccion.numeroComprobante || 0)
      : null,
    cobradorNombre: buildNombreUsuario(cobrador, movimiento.creadoPorNombre),
  };
}

export async function obtenerComprobanteCierreCaja(
  cierreId: string,
): Promise<ComprobanteCierreCajaSafe | null> {
  if (!validarObjectId(cierreId)) {
    return null;
  }

  await connectDB();

  const cierre = await CajaCobrador.findOne({
    _id: cierreId,
    tipoMovimiento: "cierre_caja",
  }).lean();

  if (!cierre) {
    return null;
  }

  const [cobrador, codigo] = await Promise.all([
    cierre.cobradorId
      ? Usuario.findById(cierre.cobradorId).lean()
      : Promise.resolve(null),

    cierre.codigoCierreId
      ? CodigoCierreCaja.findById(cierre.codigoCierreId).lean()
      : Promise.resolve(null),
  ]);

  return {
    cierreId: cierre._id.toString(),
    fechaCierre: cierre.creadoEn?.toISOString?.() || "",

    cobradorId: cierre.cobradorId?.toString?.() || "",
    cobradorNombre: buildNombreUsuario(cobrador, "Cobrador"),
    cobradorEmail: cobrador?.email || "",

    importeCerrado: Number(cierre.importe || 0),
    saldoCajaDespuesDelCierre: Number(cierre.saldoCaja || 0),

    codigo: codigo?.codigo || "-",
    codigoEstado: codigo?.estado || "-",
    codigoGeneradoPor: codigo?.generadoPorAdminNombre || "-",
    codigoCreadoEn: codigo?.creadoEn?.toISOString?.() || null,
    codigoUsadoEn: codigo?.usadoEn?.toISOString?.() || null,

    descripcion: cierre.descripcion || "",
    observacion: cierre.observacion || "",
  };
}
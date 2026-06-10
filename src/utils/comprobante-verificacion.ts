// import crypto from "crypto";

// type PagoFirmaInput = {
//   movimientoId: string;
//   numeroComprobante: number;
//   clienteId: string;
//   clienteDni: string;
//   importe: number;
//   fechaIso: string;
// };

// function getComprobanteSecret() {
//   return (
//     process.env.COMPROBANTE_SECRET ||
//     process.env.JWT_SECRET ||
//     "dev-comprobante-secret-cambiar-en-produccion"
//   );
// }

// export function generarCodigoVerificacionPago(numeroComprobante: number) {
//   const random = crypto.randomBytes(4).toString("hex").toUpperCase();

//   return `PAGO-${String(numeroComprobante).padStart(6, "0")}-${random}`;
// }

// export function generarFirmaPago(input: PagoFirmaInput) {
//   const payload = [
//     input.movimientoId,
//     input.numeroComprobante,
//     input.clienteId,
//     input.clienteDni,
//     input.importe.toFixed(2),
//     input.fechaIso,
//   ].join("|");

//   return crypto
//     .createHmac("sha256", getComprobanteSecret())
//     .update(payload)
//     .digest("hex")
//     .toUpperCase();
// }

// export function formatearFirmaCorta(firma: string) {
//   if (!firma) return "-";

//   return firma.slice(0, 16).match(/.{1,4}/g)?.join("-") || firma.slice(0, 16);
// }

// src/utils/comprobante-verificacion.ts

import crypto from "crypto";

type PagoFirmaInput = {
  movimientoId: string;
  numeroComprobante: number;
  clienteId: string;
  clienteDni: string;
  importe: number;
  fechaIso: string;
};

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function getComprobanteSecret() {
  const secret = process.env.COMPROBANTE_SECRET;

  if (!secret) {
    throw new Error("Falta configurar COMPROBANTE_SECRET en .env.local");
  }

  if (isProduction() && secret.length < 32) {
    throw new Error(
      "COMPROBANTE_SECRET es demasiado corto para producción. Usá una clave privada de al menos 32 caracteres.",
    );
  }

  return secret;
}

export function generarCodigoVerificacionPago(numeroComprobante: number) {
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();

  return `PAGO-${String(numeroComprobante).padStart(6, "0")}-${random}`;
}

export function generarFirmaPago(input: PagoFirmaInput) {
  const payload = [
    input.movimientoId,
    input.numeroComprobante,
    input.clienteId,
    input.clienteDni,
    input.importe.toFixed(2),
    input.fechaIso,
  ].join("|");

  return crypto
    .createHmac("sha256", getComprobanteSecret())
    .update(payload)
    .digest("hex")
    .toUpperCase();
}

export function formatearFirmaCorta(firma: string) {
  if (!firma) return "-";

  return firma.slice(0, 16).match(/.{1,4}/g)?.join("-") || firma.slice(0, 16);
}
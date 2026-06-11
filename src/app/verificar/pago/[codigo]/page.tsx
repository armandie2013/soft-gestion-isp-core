// import { ShieldAlert, ShieldCheck } from "lucide-react";
// import { Badge } from "@/components/ui/Badge";
// import { verificarPagoPorCodigo } from "@/services/comprobante.service";

// type VerificarPagoPageProps = {
//   params: {
//     codigo: string;
//   };
// };

// export const metadata = {
//   title: "Verificar comprobante",
// };

// function formatDate(value?: string) {
//   if (!value) return "-";

//   return new Intl.DateTimeFormat("es-AR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(value));
// }

// function formatMoney(value?: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function DataLine({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | number;
// }) {
//   return (
//     <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-2 last:border-b-0">
//       <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
//         {label}
//       </span>

//       <span className="text-right text-sm font-medium text-slate-950">
//         {value}
//       </span>
//     </div>
//   );
// }

// export default async function VerificarPagoPage({
//   params,
// }: VerificarPagoPageProps) {
//   const resultado = await verificarPagoPorCodigo(params.codigo);

//   return (
//     <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-950">
//       <div className="mx-auto max-w-xl">
//         <div className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5">
//           <div className="flex flex-col items-center text-center">
//             <div
//               className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
//                 resultado.valido
//                   ? "bg-emerald-100 text-emerald-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {resultado.valido ? (
//                 <ShieldCheck className="h-7 w-7" />
//               ) : (
//                 <ShieldAlert className="h-7 w-7" />
//               )}
//             </div>

//             <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
//               Verificación de comprobante
//             </p>

//             <h1 className="mt-2 text-2xl font-semibold">
//               {resultado.valido ? "Comprobante válido" : "Comprobante inválido"}
//             </h1>

//             <p className="mt-2 text-sm leading-6 text-slate-600">
//               {resultado.mensaje}
//             </p>

//             <div className="mt-3">
//               <Badge variant={resultado.valido ? "success" : "danger"}>
//                 {resultado.valido ? "Verificado" : "No verificado"}
//               </Badge>
//             </div>
//           </div>

//           {resultado.valido ? (
//             <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2">
//               <DataLine
//                 label="Comprobante"
//                 value={`N° ${resultado.numeroComprobante}`}
//               />
//               <DataLine label="Fecha" value={formatDate(resultado.fecha)} />
//               <DataLine
//                 label="Cliente"
//                 value={resultado.clienteNombre || "-"}
//               />
//               <DataLine label="DNI" value={resultado.clienteDni || "-"} />
//               <DataLine
//                 label="Período"
//                 value={resultado.periodoLabel || "-"}
//               />
//               <DataLine
//                 label="Factura"
//                 value={
//                   resultado.facturaNumeroComprobante
//                     ? `N° ${resultado.facturaNumeroComprobante}`
//                     : "-"
//                 }
//               />
//               <DataLine
//                 label="Importe"
//                 value={formatMoney(resultado.importePagado)}
//               />
//               <DataLine
//                 label="Cobrador"
//                 value={resultado.cobradorNombre || "-"}
//               />
//               <DataLine
//                 label="Firma"
//                 value={resultado.firmaCorta || "-"}
//               />
//             </div>
//           ) : null}

//           <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs leading-5 text-slate-500">
//             <p>
//               La validez del comprobante depende de los datos registrados en el
//               sistema.
//             </p>
//             <p>
//               Si el documento impreso o descargado fue modificado, esta página
//               mostrará los datos reales.
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// import Link from "next/link";
// import { ShieldAlert, ShieldCheck, Wifi } from "lucide-react";
// import { Badge } from "@/components/ui/Badge";
// import { brandConfig } from "@/config/brand.config";
// import { verificarPagoPorCodigo } from "@/services/comprobante.service";

// type VerificarPagoPageProps = {
//   params: {
//     codigo: string;
//   };
// };

// export const metadata = {
//   title: "Verificar comprobante",
// };

// function formatDate(value?: string) {
//   if (!value) return "-";

//   return new Intl.DateTimeFormat("es-AR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(value));
// }

// function formatMoney(value?: number) {
//   return new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     maximumFractionDigits: 2,
//   }).format(value || 0);
// }

// function DataLine({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | number;
// }) {
//   return (
//     <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-2 last:border-b-0 dark:border-slate-800">
//       <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
//         {label}
//       </span>

//       <span className="text-right text-sm font-medium text-slate-950 dark:text-white">
//         {value}
//       </span>
//     </div>
//   );
// }

// export default async function VerificarPagoPage({
//   params,
// }: VerificarPagoPageProps) {
//   const resultado = await verificarPagoPorCodigo(params.codigo);

//   return (
//     <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
//       <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-xl flex-col">
//         <header className="mb-6 flex items-center justify-between gap-3">
//           <Link href="/" className="flex min-w-0 items-center gap-3">
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-950/10 dark:bg-cyan-500 dark:text-cyan-950">
//               <Wifi className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
//                 {brandConfig.ispName}
//               </p>

//               <h1 className="truncate text-lg font-semibold tracking-tight">
//                 {brandConfig.appName}
//               </h1>
//             </div>
//           </Link>
//         </header>

//         <section className="flex flex-1 items-center">
//           <div className="w-full rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900/80">
//             <div className="flex flex-col items-center text-center">
//               <div
//                 className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
//                   resultado.valido
//                     ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
//                     : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
//                 }`}
//               >
//                 {resultado.valido ? (
//                   <ShieldCheck className="h-8 w-8" />
//                 ) : (
//                   <ShieldAlert className="h-8 w-8" />
//                 )}
//               </div>

//               <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
//                 Verificación pública
//               </p>

//               <h2 className="mt-2 text-2xl font-semibold">
//                 {resultado.valido ? "Comprobante válido" : "Comprobante inválido"}
//               </h2>

//               <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
//                 {resultado.mensaje}
//               </p>

//               <div className="mt-3">
//                 <Badge variant={resultado.valido ? "success" : "danger"}>
//                   {resultado.valido ? "Verificado" : "No verificado"}
//                 </Badge>
//               </div>
//             </div>

//             {resultado.valido ? (
//               <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/60">
//                 <DataLine
//                   label="Comprobante"
//                   value={`N° ${resultado.numeroComprobante}`}
//                 />

//                 <DataLine label="Fecha" value={formatDate(resultado.fecha)} />

//                 <DataLine
//                   label="Cliente"
//                   value={resultado.clienteNombre || "-"}
//                 />

//                 <DataLine label="DNI" value={resultado.clienteDni || "-"} />

//                 <DataLine
//                   label="Período"
//                   value={resultado.periodoLabel || "-"}
//                 />

//                 <DataLine
//                   label="Factura"
//                   value={
//                     resultado.facturaNumeroComprobante
//                       ? `N° ${resultado.facturaNumeroComprobante}`
//                       : "-"
//                   }
//                 />

//                 <DataLine
//                   label="Importe"
//                   value={formatMoney(resultado.importePagado)}
//                 />

//                 <DataLine
//                   label="Cobrador"
//                   value={resultado.cobradorNombre || "-"}
//                 />

//                 <DataLine label="Firma" value={resultado.firmaCorta || "-"} />
//               </div>
//             ) : (
//               <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300">
//                 No se pudo validar este comprobante. Verificá que el código o el
//                 QR correspondan a un comprobante emitido por el sistema.
//               </div>
//             )}

//             <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
//               <p>
//                 Esta página consulta los datos reales registrados en el sistema.
//               </p>
//               <p>
//                 Si un comprobante impreso o descargado fue modificado, la
//                 información válida será la que se muestra acá.
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }


// src/app/verificar/pago/[codigo]/page.tsx

import Link from "next/link";
import { headers } from "next/headers";
import { ShieldAlert, ShieldCheck, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { brandConfig } from "@/config/brand.config";
import { verificarPagoPorCodigo } from "@/services/comprobante.service";
import { buildRateLimitKey, checkRateLimit } from "@/lib/rate-limit";
import type { VerificacionPagoSafe } from "@/types/comprobante.types";

type VerificarPagoPageProps = {
  params: {
    codigo: string;
  };
};

export const metadata = {
  title: "Verificar comprobante",
};

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function getClientIpFromHeaders() {
  const h = headers();

  const forwardedFor = h.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    h.get("x-client-ip") ||
    "unknown"
  );
}

function getRateLimitMessage(seconds: number) {
  const minutes = Math.ceil(seconds / 60);

  if (minutes <= 1) {
    return "Demasiadas verificaciones. Esperá un minuto y volvé a probar.";
  }

  return `Demasiadas verificaciones. Esperá ${minutes} minutos y volvé a probar.`;
}

function verificarRateLimit(ip: string, codigo: string) {
  const limiteGeneral = checkRateLimit({
    key: buildRateLimitKey(["verificar-pago", ip]),
    limit: isProduction() ? 60 : 300,
    windowMs: 10 * 60 * 1000,
  });

  if (!limiteGeneral.allowed) {
    return limiteGeneral;
  }

  const limitePorCodigo = checkRateLimit({
    key: buildRateLimitKey(["verificar-pago-codigo", ip, codigo]),
    limit: isProduction() ? 10 : 60,
    windowMs: 10 * 60 * 1000,
  });

  return limitePorCodigo;
}

function formatDate(value?: string) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatMoney(value?: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function DataLine({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-2 last:border-b-0 dark:border-slate-800">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-slate-950 dark:text-white">
        {value}
      </span>
    </div>
  );
}

function buildRateLimitedResult(message: string): VerificacionPagoSafe {
  return {
    valido: false,
    mensaje: message,
  };
}

export default async function VerificarPagoPage({
  params,
}: VerificarPagoPageProps) {
  const codigo = String(params.codigo || "").trim().toUpperCase();
  const ip = getClientIpFromHeaders();

  const rateLimit = verificarRateLimit(ip, codigo);

  const resultado = rateLimit.allowed
    ? await verificarPagoPorCodigo(codigo)
    : buildRateLimitedResult(getRateLimitMessage(rateLimit.retryAfterSeconds));

  const bloqueadoPorRateLimit = !rateLimit.allowed;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-xl flex-col">
        <header className="mb-6 flex items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-950/10 dark:bg-cyan-500 dark:text-cyan-950">
              <Wifi className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">
                {brandConfig.ispName}
              </p>

              <h1 className="truncate text-lg font-semibold tracking-tight">
                {brandConfig.appName}
              </h1>
            </div>
          </Link>
        </header>

        <section className="flex flex-1 items-center">
          <div className="w-full rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex flex-col items-center text-center">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  resultado.valido
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : bloqueadoPorRateLimit
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                      : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                }`}
              >
                {resultado.valido ? (
                  <ShieldCheck className="h-8 w-8" />
                ) : (
                  <ShieldAlert className="h-8 w-8" />
                )}
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Verificación pública
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                {resultado.valido
                  ? "Comprobante válido"
                  : bloqueadoPorRateLimit
                    ? "Verificación limitada"
                    : "Comprobante inválido"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {resultado.mensaje}
              </p>

              <div className="mt-3">
                <Badge
                  variant={
                    resultado.valido
                      ? "success"
                      : bloqueadoPorRateLimit
                        ? "warning"
                        : "danger"
                  }
                >
                  {resultado.valido
                    ? "Verificado"
                    : bloqueadoPorRateLimit
                      ? "Límite alcanzado"
                      : "No verificado"}
                </Badge>
              </div>
            </div>

            {resultado.valido ? (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-950/60">
                <DataLine
                  label="Comprobante"
                  value={`N° ${resultado.numeroComprobante}`}
                />

                <DataLine label="Fecha" value={formatDate(resultado.fecha)} />

                <DataLine
                  label="Cliente"
                  value={resultado.clienteNombre || "-"}
                />

                <DataLine label="DNI" value={resultado.clienteDni || "-"} />

                <DataLine
                  label="Período"
                  value={resultado.periodoLabel || "-"}
                />

                <DataLine
                  label="Factura"
                  value={
                    resultado.facturaNumeroComprobante
                      ? `N° ${resultado.facturaNumeroComprobante}`
                      : "-"
                  }
                />

                <DataLine
                  label="Importe"
                  value={formatMoney(resultado.importePagado)}
                />

                <DataLine
                  label="Cobrador"
                  value={resultado.cobradorNombre || "-"}
                />

                <DataLine label="Firma" value={resultado.firmaCorta || "-"} />
              </div>
            ) : (
              <div
                className={`mt-6 rounded-2xl border p-4 text-sm leading-6 ${
                  bloqueadoPorRateLimit
                    ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-300"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300"
                }`}
              >
                {bloqueadoPorRateLimit
                  ? "Se detectaron demasiadas verificaciones desde esta conexión. Esperá unos minutos antes de intentar nuevamente."
                  : "No se pudo validar este comprobante. Verificá que el código o el QR correspondan a un comprobante emitido por el sistema."}
              </div>
            )}

            <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs leading-5 text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <p>
                Esta página consulta los datos reales registrados en el sistema.
              </p>

              <p>
                Si un comprobante impreso o descargado fue modificado, la
                información válida será la que se muestra acá.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
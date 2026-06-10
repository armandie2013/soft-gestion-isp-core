import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import QRCode from "qrcode";
import { obtenerComprobantePagoCliente } from "@/services/comprobante.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteProps = {
  params: {
    movimientoId: string;
  };
};

type PdfSize = "A4" | "A5";

function getPdfSizeFromRequest(request: Request): PdfSize {
  const url = new URL(request.url);
  const size = url.searchParams.get("size")?.toLowerCase();

  return size === "a4" ? "A4" : "A5";
}

function getPageConfig(size: PdfSize) {
  if (size === "A4") {
    return {
      pageCssSize: "A4 portrait",
      pageMargin: "12mm",
      bodyFontSize: "11px",
      receiptMaxWidth: "170mm",
      receiptPadding: "14px",
      amountFontSize: "32px",
      qrSize: "96px",
      qrGridSize: "100px",
      fileSuffix: "a4",
    };
  }

  return {
    pageCssSize: "A5 portrait",
    pageMargin: "8mm",
    bodyFontSize: "10px",
    receiptMaxWidth: "100%",
    receiptPadding: "10px",
    amountFontSize: "26px",
    qrSize: "82px",
    qrGridSize: "86px",
    fileSuffix: "a5",
  };
}

function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderComprobantePagoHtml({
  comprobante,
  qrDataUrl,
  size,
}: {
  comprobante: Awaited<ReturnType<typeof obtenerComprobantePagoCliente>>;
  qrDataUrl: string;
  size: PdfSize;
}) {
  if (!comprobante) {
    return "";
  }

  const config = getPageConfig(size);
  const clienteNombre = `${comprobante.clienteApellido}, ${comprobante.clienteNombre}`;

  return `
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Comprobante de pago N° ${escapeHtml(comprobante.numeroComprobante)}</title>

  <style>
    @page {
      size: ${config.pageCssSize};
      margin: ${config.pageMargin};
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: ${config.bodyFontSize};
      line-height: 1.35;
    }

    .receipt {
      width: 100%;
      max-width: ${config.receiptMaxWidth};
      margin: 0 auto;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: ${config.receiptPadding};
    }

    .header {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 8px;
      margin-bottom: 8px;
    }

    .eyebrow {
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 1.6px;
      color: #0369a1;
      font-weight: 700;
      margin: 0 0 4px;
    }

    h1 {
      font-size: 18px;
      margin: 0;
      line-height: 1.1;
    }

    .date {
      margin-top: 4px;
      color: #64748b;
      font-size: 9px;
    }

    .status {
      align-self: flex-start;
      border: 1px solid #86efac;
      background: #dcfce7;
      color: #166534;
      padding: 4px 8px;
      border-radius: 999px;
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .amount-box {
      border: 1px solid #86efac;
      background: #f0fdf4;
      border-radius: 10px;
      padding: 9px;
      margin-bottom: 8px;
    }

    .amount-label {
      margin: 0;
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 1.4px;
      color: #166534;
      font-weight: 700;
    }

    .amount {
      margin: 3px 0 0;
      font-size: ${config.amountFontSize};
      font-weight: 800;
      color: #166534;
      line-height: 1.05;
    }

    .period {
      margin: 3px 0 0;
      font-size: 10px;
      color: #166534;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }

    .box {
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 8px;
      min-height: 88px;
    }

    .box-title {
      margin: 0 0 6px;
      font-size: 9px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .line {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      border-bottom: 1px solid #e2e8f0;
      padding: 3px 0;
    }

    .line:last-child {
      border-bottom: 0;
    }

    .label {
      color: #64748b;
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .8px;
      flex: 0 0 auto;
    }

    .value {
      color: #0f172a;
      font-size: 9px;
      font-weight: 600;
      text-align: right;
      overflow-wrap: anywhere;
    }

    .verification {
      display: grid;
      grid-template-columns: 1fr ${config.qrGridSize};
      gap: 8px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 8px;
      margin-bottom: 8px;
    }

    .verify-title {
      margin: 0 0 5px;
      font-size: 9px;
      font-weight: 800;
      color: #166534;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .verify-text {
      margin: 2px 0;
      color: #475569;
      font-size: 8px;
      overflow-wrap: anywhere;
    }

    .qr {
      width: ${config.qrSize};
      height: ${config.qrSize};
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 4px;
      object-fit: contain;
    }

    .observation {
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 8px;
      margin-bottom: 8px;
    }

    .footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 6px;
      text-align: center;
      color: #64748b;
      font-size: 8px;
    }

    .footer p {
      margin: 2px 0;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>

<body>
  <main class="receipt">
    <section class="header">
      <div>
        <p class="eyebrow">Comprobante de pago</p>
        <h1>N° ${escapeHtml(comprobante.numeroComprobante)}</h1>
        <p class="date">${escapeHtml(formatDate(comprobante.fecha))}</p>
      </div>

      <div class="status">Pago registrado</div>
    </section>

    <section class="amount-box">
      <p class="amount-label">Importe pagado</p>
      <p class="amount">${escapeHtml(formatMoney(comprobante.importePagado))}</p>
      <p class="period">Período ${escapeHtml(comprobante.periodoLabel)}</p>
    </section>

    <section class="grid">
      <div class="box">
        <p class="box-title">Cliente</p>

        <div class="line">
          <span class="label">Cliente</span>
          <span class="value">${escapeHtml(clienteNombre)}</span>
        </div>

        <div class="line">
          <span class="label">N° cliente</span>
          <span class="value">${escapeHtml(comprobante.clienteNumero)}</span>
        </div>

        <div class="line">
          <span class="label">DNI</span>
          <span class="value">${escapeHtml(comprobante.clienteDni)}</span>
        </div>

        <div class="line">
          <span class="label">Dirección</span>
          <span class="value">${escapeHtml(comprobante.clienteDireccion)}</span>
        </div>

        <div class="line">
          <span class="label">Localidad</span>
          <span class="value">${escapeHtml(comprobante.clienteLocalidad)}</span>
        </div>
      </div>

      <div class="box">
        <p class="box-title">Detalle</p>

        <div class="line">
          <span class="label">Período</span>
          <span class="value">${escapeHtml(comprobante.periodoLabel)}</span>
        </div>

        <div class="line">
          <span class="label">Factura</span>
          <span class="value">${
            comprobante.facturaNumeroComprobante
              ? `N° ${escapeHtml(comprobante.facturaNumeroComprobante)}`
              : "-"
          }</span>
        </div>

        <div class="line">
          <span class="label">Cobrador</span>
          <span class="value">${escapeHtml(comprobante.cobradorNombre)}</span>
        </div>

        <div class="line">
          <span class="label">Saldo posterior</span>
          <span class="value">${escapeHtml(
            formatMoney(comprobante.saldoClienteDespuesDelPago),
          )}</span>
        </div>

        <div class="line">
          <span class="label">Concepto</span>
          <span class="value">${escapeHtml(comprobante.concepto)}</span>
        </div>
      </div>
    </section>

    <section class="verification">
      <div>
        <p class="verify-title">Verificación</p>
        <p class="verify-text"><strong>Código:</strong> ${escapeHtml(
          comprobante.codigoVerificacion,
        )}</p>
        <p class="verify-text"><strong>Firma:</strong> ${escapeHtml(
          comprobante.firmaCorta,
        )}</p>
        <p class="verify-text">${escapeHtml(comprobante.urlVerificacion)}</p>
      </div>

      <img class="qr" src="${qrDataUrl}" alt="QR de verificación" />
    </section>

    ${
      comprobante.observacion
        ? `
          <section class="observation">
            <p class="box-title">Observación</p>
            <p class="verify-text">${escapeHtml(comprobante.observacion)}</p>
          </section>
        `
        : ""
    }

    <footer class="footer">
      <p>Este comprobante solo es válido si el código de verificación coincide con los datos registrados en el sistema.</p>
      <p>Para validar su autenticidad, escanee el QR o ingrese a la URL de verificación.</p>
    </footer>
  </main>
</body>
</html>
`;
}

export async function GET(request: Request, { params }: RouteProps) {
  const pdfSize = getPdfSizeFromRequest(request);
  const config = getPageConfig(pdfSize);

  const comprobante = await obtenerComprobantePagoCliente(params.movimientoId);

  if (!comprobante) {
    return new NextResponse("Comprobante no encontrado.", {
      status: 404,
    });
  }

  const qrDataUrl = await QRCode.toDataURL(comprobante.urlVerificacion, {
    width: pdfSize === "A4" ? 220 : 180,
    margin: 1,
  });

  const html = renderComprobantePagoHtml({
    comprobante,
    qrDataUrl,
    size: pdfSize,
  });

  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    const pdf = await page.pdf({
      format: pdfSize,
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
    });

    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="comprobante-pago-${comprobante.numeroComprobante}-${config.fileSuffix}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } finally {
    await browser.close();
  }
}
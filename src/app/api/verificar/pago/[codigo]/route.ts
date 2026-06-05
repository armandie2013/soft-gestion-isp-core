import { NextResponse } from "next/server";
import { verificarPagoPorCodigo } from "@/services/comprobante.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteProps = {
  params: {
    codigo: string;
  };
};

export async function GET(_request: Request, { params }: RouteProps) {
  const resultado = await verificarPagoPorCodigo(params.codigo);

  return NextResponse.json(resultado, {
    status: resultado.valido ? 200 : 404,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
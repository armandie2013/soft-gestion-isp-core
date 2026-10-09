import { connectDB } from "@/lib/db";
import type { CurrentUser } from "@/lib/current-user";
import Cliente from "@/models/Cliente";
import type { ComprobantePagoClienteSafe } from "@/types/comprobante.types";

export async function puedeAccederComprobantePago(
  user: CurrentUser,
  comprobante: Pick<ComprobantePagoClienteSafe, "cobradorId" | "clienteId">,
): Promise<boolean> {
  if (user.rol === "admin") return true;
  if (user.rol === "cobrador") return user.userId === comprobante.cobradorId;
  if (user.rol !== "cliente") return false;
  await connectDB();
  return Boolean(
    await Cliente.exists({
      _id: comprobante.clienteId,
      usuarioId: user.userId,
    }),
  );
}

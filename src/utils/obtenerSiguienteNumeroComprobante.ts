import Contador from "@/models/Contador";

export async function obtenerSiguienteNumeroComprobante() {
  const contador = await Contador.findOneAndUpdate(
    { nombre: "comprobante" },
    { $inc: { valor: 1 } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  return contador.valor;
}
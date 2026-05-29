import Contador from "@/models/Contador";

export async function obtenerSiguienteNumeroCliente() {
  const contador = await Contador.findOneAndUpdate(
    { nombre: "cliente" },
    { $inc: { valor: 1 } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  return contador.valor;
}
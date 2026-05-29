import dotenv from "dotenv";
import mongoose from "mongoose";
import Usuario from "../src/models/Usuario";
import { hashPassword } from "../src/lib/password";

dotenv.config({ path: ".env.local" });

async function main() {
  const mongodbUri = process.env.MONGODB_URI;
  const adminName = process.env.ADMIN_NAME;
  const adminLastName = process.env.ADMIN_LASTNAME || "Administrador";
  const adminDni = process.env.ADMIN_DNI || "00000000";
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!mongodbUri) {
    throw new Error("Falta MONGODB_URI en .env.local");
  }

  if (!adminName) {
    throw new Error("Falta ADMIN_NAME en .env.local");
  }

  if (!adminEmail) {
    throw new Error("Falta ADMIN_EMAIL en .env.local");
  }

  if (!adminPassword) {
    throw new Error("Falta ADMIN_PASSWORD en .env.local");
  }

  await mongoose.connect(mongodbUri);

  const existingAdmin = await Usuario.findOne({ rol: "admin" });

  if (existingAdmin) {
    existingAdmin.apellido = existingAdmin.apellido || adminLastName;
    existingAdmin.dni = existingAdmin.dni || adminDni;
    existingAdmin.debeCambiarPassword = false;
    await existingAdmin.save();

    console.log("Ya existe un usuario administrador. Se verificaron sus datos base.");
    await mongoose.disconnect();
    return;
  }

  const existingEmail = await Usuario.findOne({
    email: adminEmail.toLowerCase().trim(),
  });

  if (existingEmail) {
    existingEmail.nombre = existingEmail.nombre || adminName.trim();
    existingEmail.apellido = existingEmail.apellido || adminLastName.trim();
    existingEmail.dni = existingEmail.dni || adminDni.trim();
    existingEmail.rol = "admin";
    existingEmail.estado = "activo";
    existingEmail.debeCambiarPassword = false;
    await existingEmail.save();

    console.log("Ya existía un usuario con ese email. Se actualizó como administrador.");
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await hashPassword(adminPassword);

  await Usuario.create({
    nombre: adminName.trim(),
    apellido: adminLastName.trim(),
    dni: adminDni.trim(),
    email: adminEmail.toLowerCase().trim(),
    password: hashedPassword,
    rol: "admin",
    estado: "activo",
    debeCambiarPassword: false,
  });

  console.log("Administrador inicial creado correctamente.");
  console.log(`Email: ${adminEmail}`);

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error("Error creando administrador inicial:");
  console.error(error);

  await mongoose.disconnect();

  process.exit(1);
});
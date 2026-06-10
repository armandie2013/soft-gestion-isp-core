// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import Usuario from "../src/models/Usuario";
// import { hashPassword } from "../src/lib/password";

// dotenv.config({ path: ".env.local" });

// async function main() {
//   const mongodbUri = process.env.MONGODB_URI;
//   const adminName = process.env.ADMIN_NAME;
//   const adminLastName = process.env.ADMIN_LASTNAME || "Administrador";
//   const adminDni = process.env.ADMIN_DNI || "00000000";
//   const adminEmail = process.env.ADMIN_EMAIL;
//   const adminPassword = process.env.ADMIN_PASSWORD;

//   if (!mongodbUri) {
//     throw new Error("Falta MONGODB_URI en .env.local");
//   }

//   if (!adminName) {
//     throw new Error("Falta ADMIN_NAME en .env.local");
//   }

//   if (!adminEmail) {
//     throw new Error("Falta ADMIN_EMAIL en .env.local");
//   }

//   if (!adminPassword) {
//     throw new Error("Falta ADMIN_PASSWORD en .env.local");
//   }

//   await mongoose.connect(mongodbUri);

//   const existingAdmin = await Usuario.findOne({ rol: "admin" });

//   if (existingAdmin) {
//     existingAdmin.apellido = existingAdmin.apellido || adminLastName;
//     existingAdmin.dni = existingAdmin.dni || adminDni;
//     existingAdmin.debeCambiarPassword = false;
//     await existingAdmin.save();

//     console.log("Ya existe un usuario administrador. Se verificaron sus datos base.");
//     await mongoose.disconnect();
//     return;
//   }

//   const existingEmail = await Usuario.findOne({
//     email: adminEmail.toLowerCase().trim(),
//   });

//   if (existingEmail) {
//     existingEmail.nombre = existingEmail.nombre || adminName.trim();
//     existingEmail.apellido = existingEmail.apellido || adminLastName.trim();
//     existingEmail.dni = existingEmail.dni || adminDni.trim();
//     existingEmail.rol = "admin";
//     existingEmail.estado = "activo";
//     existingEmail.debeCambiarPassword = false;
//     await existingEmail.save();

//     console.log("Ya existía un usuario con ese email. Se actualizó como administrador.");
//     await mongoose.disconnect();
//     return;
//   }

//   const hashedPassword = await hashPassword(adminPassword);

//   await Usuario.create({
//     nombre: adminName.trim(),
//     apellido: adminLastName.trim(),
//     dni: adminDni.trim(),
//     email: adminEmail.toLowerCase().trim(),
//     password: hashedPassword,
//     rol: "admin",
//     estado: "activo",
//     debeCambiarPassword: false,
//   });

//   console.log("Administrador inicial creado correctamente.");
//   console.log(`Email: ${adminEmail}`);

//   await mongoose.disconnect();
// }

// main().catch(async (error) => {
//   console.error("Error creando administrador inicial:");
//   console.error(error);

//   await mongoose.disconnect();

//   process.exit(1);
// });

// scripts/seed-admin.ts

import dotenv from "dotenv";
import mongoose from "mongoose";
import Usuario from "../src/models/Usuario";
import { hashPassword } from "../src/lib/password";

dotenv.config({ path: ".env.local" });

type AdminSeed = {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  password: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Falta ${name} en .env.local`);
  }

  return value.trim();
}

function buildAdmins(): AdminSeed[] {
  return [
    {
      nombre: getRequiredEnv("ADMIN_1_NAME"),
      apellido: process.env.ADMIN_1_LASTNAME?.trim() || "Administrador",
      dni: getRequiredEnv("ADMIN_1_DNI"),
      email: getRequiredEnv("ADMIN_1_EMAIL"),
      password: getRequiredEnv("ADMIN_1_PASSWORD"),
    },
    {
      nombre: getRequiredEnv("ADMIN_2_NAME"),
      apellido: process.env.ADMIN_2_LASTNAME?.trim() || "Administrador",
      dni: getRequiredEnv("ADMIN_2_DNI"),
      email: getRequiredEnv("ADMIN_2_EMAIL"),
      password: getRequiredEnv("ADMIN_2_PASSWORD"),
    },
  ];
}

async function upsertProtectedAdmin(admin: AdminSeed) {
  const emailNormalizado = admin.email.toLowerCase().trim();
  const dniNormalizado = admin.dni.trim();

  const existingByEmail = await Usuario.findOne({
    email: emailNormalizado,
  }).select("+password");

  if (existingByEmail) {
    existingByEmail.nombre = admin.nombre.trim();
    existingByEmail.apellido = admin.apellido.trim();
    existingByEmail.dni = dniNormalizado;
    existingByEmail.email = emailNormalizado;
    existingByEmail.rol = "admin";
    existingByEmail.estado = "activo";
    existingByEmail.debeCambiarPassword = false;
    existingByEmail.esProtegido = true;

    if (!existingByEmail.password) {
      existingByEmail.password = await hashPassword(admin.password);
    }

    await existingByEmail.save();

    console.log(`Administrador protegido verificado: ${emailNormalizado}`);
    return;
  }

  const existingByDni = await Usuario.findOne({
    dni: dniNormalizado,
  }).select("+password");

  if (existingByDni) {
    existingByDni.nombre = admin.nombre.trim();
    existingByDni.apellido = admin.apellido.trim();
    existingByDni.email = emailNormalizado;
    existingByDni.rol = "admin";
    existingByDni.estado = "activo";
    existingByDni.debeCambiarPassword = false;
    existingByDni.esProtegido = true;

    if (!existingByDni.password) {
      existingByDni.password = await hashPassword(admin.password);
    }

    await existingByDni.save();

    console.log(`Administrador protegido actualizado por DNI: ${emailNormalizado}`);
    return;
  }

  const hashedPassword = await hashPassword(admin.password);

  await Usuario.create({
    nombre: admin.nombre.trim(),
    apellido: admin.apellido.trim(),
    dni: dniNormalizado,
    email: emailNormalizado,
    password: hashedPassword,
    rol: "admin",
    estado: "activo",
    debeCambiarPassword: false,
    esProtegido: true,
  });

  console.log(`Administrador protegido creado: ${emailNormalizado}`);
}

async function main() {
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error("Falta MONGODB_URI en .env.local");
  }

  const admins = buildAdmins();

  const emails = admins.map((admin) => admin.email.toLowerCase().trim());
  const dnis = admins.map((admin) => admin.dni.trim());

  if (new Set(emails).size !== emails.length) {
    throw new Error("Los dos administradores protegidos no pueden tener el mismo email.");
  }

  if (new Set(dnis).size !== dnis.length) {
    throw new Error("Los dos administradores protegidos no pueden tener el mismo DNI.");
  }

  await mongoose.connect(mongodbUri);

  for (const admin of admins) {
    await upsertProtectedAdmin(admin);
  }

  await Usuario.updateMany(
    {
      email: { $nin: emails },
      esProtegido: true,
    },
    {
      $set: {
        esProtegido: false,
      },
    },
  );

  console.log("Seed de administradores protegidos finalizado correctamente.");

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error("Error creando administradores protegidos:");
  console.error(error);

  await mongoose.disconnect();

  process.exit(1);
});
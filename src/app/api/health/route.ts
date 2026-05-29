import { NextResponse } from "next/server";
import { appConfig } from "@/config/app.config";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: appConfig.name,
    version: appConfig.version,
    status: "online",
    timestamp: new Date().toISOString(),
  });
}
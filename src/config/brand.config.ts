export const brandConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Soft Gestión ISP",
  ispName: process.env.NEXT_PUBLIC_ISP_NAME || "Nombre del ISP",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "soporte@isp.com",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+54 000 000000",

  logoLight: "/logos/logo-light.png",
  logoDark: "/logos/logo-dark.png",

  primaryColor: "cyan",
} as const;
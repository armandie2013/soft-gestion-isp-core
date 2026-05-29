import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { brandConfig } from "@/config/brand.config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: brandConfig.appName,
    template: `%s | ${brandConfig.appName}`,
  },
  description: "Sistema core de gestión para proveedores de internet.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
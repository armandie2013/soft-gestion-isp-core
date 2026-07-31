// import type { Metadata } from "next";
// import { ThemeProvider } from "@/components/layout/ThemeProvider";
// import { brandConfig } from "@/config/brand.config";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: {
//     default: brandConfig.appName,
//     template: `%s | ${brandConfig.appName}`,
//   },
//   description: "Sistema core de gestión para proveedores de internet.",
// };

// type RootLayoutProps = {
//   children: React.ReactNode;
// };

// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <html lang="es" suppressHydrationWarning>
//       <body>
//         <ThemeProvider>{children}</ThemeProvider>
//       </body>
//     </html>
//   );
// }

// import type { Metadata } from "next";
// import { ThemeProvider } from "@/components/layout/ThemeProvider";
// import { brandConfig } from "@/config/brand.config";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: {
//     default: brandConfig.appName,
//     template: `%s | ${brandConfig.appName}`,
//   },
//   description: "Sistema core de gestión para proveedores de internet.",
// };

// type RootLayoutProps = {
//   children: React.ReactNode;
// };

// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <html lang="es" suppressHydrationWarning>
//       <body className="antialiased">
//         <ThemeProvider>{children}</ThemeProvider>
//       </body>
//     </html>
//   );
// }

// // src/app/layout.tsx

// import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
// import { ThemeProvider } from "@/components/layout/ThemeProvider";
// import { brandConfig } from "@/config/brand.config";
// import "./globals.css";

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["400", "500"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: {
//     default: brandConfig.appName,
//     template: `%s | ${brandConfig.appName}`,
//   },
//   description: "Sistema core de gestión para proveedores de internet.",
// };

// type RootLayoutProps = {
//   children: React.ReactNode;
// };

// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <html lang="es" suppressHydrationWarning>
//       <body className={`${roboto.className} antialiased`}>
//         <ThemeProvider>{children}</ThemeProvider>
//       </body>
//     </html>
//   );
// }

// import type { Metadata } from "next";
// import { Roboto } from "next/font/google";

// import { ThemeProvider } from "@/components/layout/ThemeProvider";
// import { brandConfig } from "@/config/brand.config";

// import "./globals.css";

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   style: ["normal"],
//   display: "swap",
//   preload: true,
//   fallback: [
//     "Segoe UI",
//     "Helvetica Neue",
//     "Arial",
//     "sans-serif",
//   ],
// });

// export const metadata: Metadata = {
//   title: {
//     default: brandConfig.appName,
//     template: `%s | ${brandConfig.appName}`,
//   },
//   description:
//     "Sistema core de gestión para proveedores de internet.",
// };

// type RootLayoutProps = {
//   children: React.ReactNode;
// };

// export default function RootLayout({
//   children,
// }: RootLayoutProps) {
//   return (
//     <html
//       lang="es"
//       suppressHydrationWarning
//     >
//       <body className={roboto.className}>
//         <ThemeProvider>
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { brandConfig } from "@/config/brand.config";

import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  axes: ["wdth"],
  variable: "--font-roboto-flex",
  fallback: ["Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: brandConfig.appName,
    template: `%s | ${brandConfig.appName}`,
  },
  description:
    "Sistema core de gestión para proveedores de internet.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={robotoFlex.variable}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import { PwaRegister } from "./pwa-register";

export const metadata: Metadata = {
  title: "Finanças Família Borges Franco",
  description: "Controle financeiro mensal da Família Borges Franco.",
  manifest: "/manifest.webmanifest",
  applicationName: "Finanças Borges Franco",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Finanças Borges Franco" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased"><PwaRegister />{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finanças Família Borges Franco",
  description: "Controle financeiro mensal da Família Borges Franco.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magic Deck Builder",
  description: "Other magic deck builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
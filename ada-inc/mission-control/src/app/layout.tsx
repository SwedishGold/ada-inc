import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ada Mission Control",
  description: "Övervakning & Styrning för Ada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "REGEN",
  description: "Premium drone and defense technology systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <div className="grid-overlay" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

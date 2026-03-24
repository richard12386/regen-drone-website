import type { Metadata } from "next";
import { LanguageProvider } from "@/components/site/language-provider";
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
        <LanguageProvider>
          <div className="grid-overlay" />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

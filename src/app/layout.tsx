import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/components/site/language-provider";
import { CartProvider } from "@/components/site/cart-provider";
import { SiteShell } from "@/components/site/SiteShell";
import { PwaRegistrar } from "@/components/site/PwaRegistrar";
import "./globals.css";

export const metadata: Metadata = {
  title: "REGEN",
  description: "Premium drone and defense technology systems",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "REGEN Flight",
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-512.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#49c4c1",
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
          <CartProvider>
            <div className="grid-overlay" />
            <SiteShell>
              {children}
            </SiteShell>
            <PwaRegistrar />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

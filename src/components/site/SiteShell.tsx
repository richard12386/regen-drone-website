"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { CartDrawer } from "@/components/site/cart-drawer";
import ChatBot from "@/components/ChatBot";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isApp = pathname.startsWith("/app");

  return (
    <>
      {!isApp && <Navbar />}
      {children}
      {!isApp && <ChatBot />}
      {!isApp && <CartDrawer />}
    </>
  );
}

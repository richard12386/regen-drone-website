"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/site/language-provider";

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const links = [
    {
      href: "/",
      label: {
        cs: "Domů",
        en: "Home",
      },
    },
    {
      href: "/products",
      label: {
        cs: "Produkty",
        en: "Products",
      },
    },
    {
      href: "/racing",
      label: {
        cs: "Racing",
        en: "Racing",
      },
    },
    {
      href: "/defense",
      label: {
        cs: "Obrana",
        en: "Defense",
      },
    },
  ];

  const visibleLinks =
    pathname === "/" ? links.filter((link) => link.href !== "/") : links;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#02050d]/74 backdrop-blur-xl">
      <div className="mx-auto flex h-11 w-full max-w-[1600px] items-center justify-between px-2 md:px-3">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.34em] text-white md:text-[13px]"
        >
          Regen
        </Link>

        <div className="flex items-center gap-5 md:gap-7">
          <nav className="flex items-center gap-5 text-[11px] text-slate-300 md:gap-7 md:text-xs">
            {visibleLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                >
                  {link.label[language]}
                  <span
                    className={`absolute inset-x-0 -bottom-[10px] h-px bg-cyan-300/70 transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 rounded-full border border-white/8 bg-white/4 p-1">
            {(["cs", "en"] as const).map((option) => {
              const isActive = language === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLanguage(option)}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
                    isActive
                      ? "bg-cyan-300 text-slate-950"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

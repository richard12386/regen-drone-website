"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/site/language-provider";
import { useCart } from "@/components/site/cart-provider";

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { itemCount, openCart } = useCart();

  const links = [
    {
      href: "/",
      label: { cs: "Domů", en: "Home" },
    },
    {
      href: "/products",
      label: { cs: "E-shop", en: "Shop" },
    },
    {
      href: "/racing",
      label: { cs: "Racing", en: "Racing" },
    },
    {
      href: "/defense",
      label: { cs: "Obrana", en: "Defense" },
    },
    {
      href: "/about",
      label: { cs: "O nás", en: "About" },
    },
    {
      href: "/app",
      label: { cs: "Aplikace", en: "App" },
    },
  ];

  const visibleLinks =
    pathname === "/" ? links.filter((link) => link.href !== "/") : links;

  const cartAriaLabel =
    language === "cs"
      ? `Otevřít košík (${itemCount} položek)`
      : `Open cart (${itemCount} items)`;

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
          <nav className="flex items-center gap-5 text-[11px] text-[var(--muted)] md:gap-7 md:text-xs">
            {visibleLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-[var(--text)] ${
                    isActive ? "text-[var(--text)]" : "text-[var(--muted)]"
                  }`}
                >
                  {link.label[language]}
                  <span
                    className={`absolute inset-x-0 -bottom-[10px] h-px bg-[var(--accent)] transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Cart icon */}
          <button
            type="button"
            onClick={openCart}
            aria-label={cartAriaLabel}
            className="relative flex h-7 w-7 items-center justify-center rounded-[2px] text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-[var(--accent)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h13" />
              <circle cx="9" cy="21" r="0.5" />
              <circle cx="19" cy="21" r="0.5" />
            </svg>
            {itemCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-3.5 min-w-[0.875rem] items-center justify-center rounded-full px-1 text-[8px] font-semibold tabular-nums"
                style={{ background: "var(--accent)", color: "#070d0e" }}
              >
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-1 rounded-[2px] border border-white/8 bg-white/4 p-1">
            {(["cs", "en"] as const).map((option) => {
              const isActive = language === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLanguage(option)}
                  className={`rounded-[2px] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
                    isActive
                      ? "bg-[var(--accent)] text-[#0a0a0a]"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
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

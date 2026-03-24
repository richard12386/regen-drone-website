"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/racing", label: "Racing" },
    { href: "/defense", label: "Defense" },
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
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-[10px] h-px bg-cyan-300/70 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

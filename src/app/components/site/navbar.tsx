"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-400/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="text-sm font-bold uppercase tracking-[0.28em] text-white transition hover:text-cyan-300"
        >
          REGEN
        </Link>

        <nav className="flex items-center gap-5 text-sm text-gray-300 md:gap-8">
          <Link href="/" className="transition hover:text-cyan-300">
            Home
          </Link>
          <Link href="/products" className="transition hover:text-cyan-300">
            Products
          </Link>
          <Link href="/racing" className="transition hover:text-cyan-300">
            Racing
          </Link>
          <Link href="/defense" className="transition hover:text-cyan-300">
            Defense
          </Link>
        </nav>
      </div>
    </header>
  );
}

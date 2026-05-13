"use client";

import { useEffect } from "react";
import { useCart } from "@/components/site/cart-provider";
import { useLanguage } from "@/components/site/language-provider";

const copy = {
  cs: {
    title: "Košík",
    empty: "Košík je prázdný.",
    emptyHint: "Vraťte se do e-shopu a přidejte si dron.",
    itemsLabel: (n: number) =>
      n === 1 ? "1 položka" : n >= 2 && n <= 4 ? `${n} položky` : `${n} položek`,
    remove: "Odebrat",
    clear: "Vyprázdnit košík",
    checkout: "Pokračovat k objednávce",
    note:
      "Toto je ukázkový e-shop. Po odeslání objednávky vás bude kontaktovat náš obchodní zástupce.",
    close: "Zavřít",
    quantity: "Množství",
    orderPlaced: "Objednávka byla odeslána — budeme vás kontaktovat na vaší e-mailové adrese.",
  },
  en: {
    title: "Cart",
    empty: "Your cart is empty.",
    emptyHint: "Head back to the shop and add a drone.",
    itemsLabel: (n: number) => (n === 1 ? "1 item" : `${n} items`),
    remove: "Remove",
    clear: "Clear cart",
    checkout: "Proceed to checkout",
    note:
      "This is a demo shop. After submitting the order, our sales team will reach out to you.",
    close: "Close",
    quantity: "Quantity",
    orderPlaced: "Order submitted — we will contact you by email.",
  },
} as const;

export function CartDrawer() {
  const { items, itemCount, isOpen, closeCart, remove, setQuantity, clear } = useCart();
  const { language } = useLanguage();
  const t = copy[language];

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  function handleCheckout() {
    alert(t.orderPlaced);
    clear();
    closeCart();
  }

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t.close}
        onClick={closeCart}
        className="flex-1 cursor-default bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <aside
        className="flex w-full max-w-md flex-col border-l shadow-2xl"
        style={{
          borderColor: "var(--line-strong)",
          background: "linear-gradient(180deg, #0d1b1f 0%, var(--bg-0) 100%)",
          animation: "cartSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both",
        }}
      >
        {/* Header */}
        <div
          className="flex flex-shrink-0 items-center justify-between border-b px-5 py-4"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-baseline gap-3">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
              {t.title}
            </h2>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--faint)]">
              {t.itemsLabel(itemCount)}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label={t.close}
            className="rounded-[2px] p-1.5 text-[var(--faint)] transition-colors hover:bg-white/5 hover:text-[var(--muted)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-sm text-[var(--text-dim)]">{t.empty}</p>
              <p className="text-xs text-[var(--faint)]">{t.emptyHint}</p>
            </div>
          ) : (
            <ul className="flex flex-col divide-y" style={{ borderColor: "var(--line)" }}>
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 px-5 py-4"
                  style={{ borderBottomColor: "var(--line)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-[var(--text)]">{item.name}</h3>
                      <p className="mt-1 text-xs text-[var(--accent)]">
                        {language === "cs" ? item.priceCs : item.priceEn}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      className="text-[10px] uppercase tracking-[0.18em] text-[var(--faint)] transition-colors hover:text-red-400"
                    >
                      {t.remove}
                    </button>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--faint)]">
                      {t.quantity}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-[var(--line-strong)] text-sm text-[var(--text-dim)] transition-colors hover:border-[var(--accent-deep)] hover:text-[var(--accent)]"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums text-[var(--text)]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-[var(--line-strong)] text-sm text-[var(--text-dim)] transition-colors hover:border-[var(--accent-deep)] hover:text-[var(--accent)]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="flex flex-shrink-0 flex-col gap-3 border-t px-5 py-4"
            style={{ borderColor: "var(--line)", background: "rgba(7,13,14,0.6)" }}
          >
            <p className="text-[10px] leading-relaxed text-[var(--faint)]">{t.note}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={clear}
                className="btn-outline flex-shrink-0 px-4 py-2.5 text-[10px] uppercase"
              >
                {t.clear}
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="btn-cyan flex-1 justify-center py-2.5 uppercase"
              >
                {t.checkout}
              </button>
            </div>
          </div>
        )}
      </aside>

      <style>{`
        @keyframes cartSlideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

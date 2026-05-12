"use client";

import { useEffect } from "react";

export type Language = "cs" | "en";

export type SpecItem = {
  label: Record<Language, string>;
  value: Record<Language, string>;
};

export type SpecSection = {
  icon: string;
  title: Record<Language, string>;
  items: SpecItem[];
};

type ModalProduct = {
  name: string;
  description: Record<Language, string>;
  price: Record<Language, string>;
  specs?: SpecSection[];
};

type ModalCopy = {
  close: string;
  specsComingSoon: string;
  technicalSpec: string;
};

export function SpecModal({
  product,
  language,
  onClose,
  copy,
}: {
  product: ModalProduct;
  language: Language;
  onClose: () => void;
  copy: ModalCopy;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        className="glass-card relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
              {copy.technicalSpec}
            </p>
            <h2 className="mt-1 text-2xl font-medium text-[var(--text)]">
              {product.name}
            </h2>
            <p className="mt-0.5 text-lg font-medium text-[var(--accent-soft)]">
              {product.price[language]}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="ml-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[2px] text-[var(--faint)] transition-colors hover:bg-white/5 hover:text-[var(--muted)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <p className="text-sm leading-6 text-[var(--text-dim)]">
            {product.description[language]}
          </p>

          {product.specs ? (
            <div className="mt-6 flex flex-col gap-7">
              {product.specs.map((section) => (
                <div key={section.title.en}>
                  <h3 className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--accent)]">
                    {section.title[language]}
                  </h3>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {section.items.map((item) => (
                      <div
                        key={item.label.en}
                        className="grid grid-cols-[10rem_1fr] gap-3 text-sm"
                      >
                        <span className="text-[var(--muted)]">
                          {item.label[language]}
                        </span>
                        <span className="text-[var(--text)]">
                          {item.value[language]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-[var(--muted)]">{copy.specsComingSoon}</p>
          )}
        </div>
      </div>
    </div>
  );
}

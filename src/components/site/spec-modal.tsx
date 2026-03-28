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
        className="glass-card relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              🛠️ {copy.technicalSpec}
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white">
              {product.name}
            </h2>
            <p className="mt-0.5 text-lg font-semibold text-cyan-200">
              {product.price[language]}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="ml-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <p className="text-sm leading-6 text-slate-300">
            {product.description[language]}
          </p>

          {product.specs ? (
            <div className="mt-6 flex flex-col gap-7">
              {product.specs.map((section) => (
                <div key={section.title.en}>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-cyan-300">
                    <span>{section.icon}</span>
                    {section.title[language]}
                  </h3>
                  <div className="mt-3 flex flex-col gap-2.5">
                    {section.items.map((item) => (
                      <div
                        key={item.label.en}
                        className="grid grid-cols-[10rem_1fr] gap-3 text-sm"
                      >
                        <span className="text-slate-400">
                          {item.label[language]}
                        </span>
                        <span className="text-slate-100">
                          {item.value[language]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-slate-400">{copy.specsComingSoon}</p>
          )}
        </div>
      </div>
    </div>
  );
}

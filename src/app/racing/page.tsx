"use client";

import { useState } from "react";
import { useLanguage } from "@/components/site/language-provider";
import { SpecModal, type Language, type SpecSection } from "@/components/site/spec-modal";
import { vortexSpecs, falconSpecs } from "@/data/drone-specs";

type RacingItem = {
  name: string;
  description: Record<Language, string>;
  price: Record<Language, string>;
  specs?: SpecSection[];
};

const racingSystems: RacingItem[] = [
  {
    name: "REGEN Vortex",
    description: {
      cs: "Výkonný FPV model pro pokročilé piloty a závodní tratě.",
      en: "High-performance FPV model for advanced pilots and race tracks.",
    },
    price: { cs: "18 000 Kč", en: "$779" },
    specs: vortexSpecs,
  },
  {
    name: "REGEN Falcon",
    description: {
      cs: "Dostupnější závodní dron pro vstup do FPV světa.",
      en: "More accessible racing drone for entering the FPV world.",
    },
    price: { cs: "7 500 Kč", en: "$329" },
    specs: falconSpecs,
  },
];

export default function RacingPage() {
  const { language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<RacingItem | null>(null);

  const copy = {
    cs: {
      kicker: "Závodní divize",
      title: "FPV výběr REGEN",
      body:
        "Naše závodní řada je postavená pro rychlost, nízkou latenci a jisté chování na trati i při tréninku.",
      detail: "Technické parametry",
      close: "Zavřít",
      specsComingSoon: "Technická specifikace tohoto modelu se připravuje.",
      technicalSpec: "Technická specifikace",
    },
    en: {
      kicker: "Racing Division",
      title: "REGEN FPV Lineup",
      body:
        "Our racing line is built for speed, low latency, and confident handling on both tracks and training runs.",
      detail: "Tech specs",
      close: "Close",
      specsComingSoon: "Technical specifications for this model are coming soon.",
      technicalSpec: "Technical Specification",
    },
  } as const;

  const t = copy[language];

  return (
    <main className="page-shell">
      <section className="content-shell">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="section-kicker">{t.kicker}</span>
          <h1 className="hero-title mt-6 text-balance text-5xl font-semibold uppercase tracking-[0.28em] text-white sm:text-6xl md:text-7xl">
            {t.title}
          </h1>
          <p className="hero-subtitle mt-5 max-w-2xl text-pretty">{t.body}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {racingSystems.map((item) => (
            <article key={item.name} className="glass-card flex flex-col rounded-3xl px-5 py-6">
              <h2 className="text-xl font-semibold text-white">{item.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.description[language]}
              </p>
              <p className="mt-4 text-[1.4rem] font-semibold text-cyan-200">
                {item.price[language]}
              </p>
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                className="mt-5 w-full rounded-full border border-cyan-500/40 py-2.5 text-sm font-semibold uppercase tracking-wide text-cyan-300 transition-colors hover:border-cyan-400/70 hover:bg-cyan-500/10 hover:text-cyan-200"
              >
                {t.detail}
              </button>
            </article>
          ))}
        </div>
      </section>

      {selectedItem && (
        <SpecModal
          product={selectedItem}
          language={language}
          onClose={() => setSelectedItem(null)}
          copy={t}
        />
      )}
    </main>
  );
}

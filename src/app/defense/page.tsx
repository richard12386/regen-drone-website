"use client";

import { useState } from "react";
import { useLanguage } from "@/components/site/language-provider";
import { SpecModal, type Language, type SpecSection } from "@/components/site/spec-modal";
import {
  skybridgerSpecs,
  skydiverSpecs,
  sentinelSpecs,
  guardianSpecs,
} from "@/data/drone-specs";

type DefenseItem = {
  name: string;
  description: Record<Language, string>;
  price: Record<Language, string>;
  specs?: SpecSection[];
};

const defenseSystems: DefenseItem[] = [
  {
    name: "REGEN Skybridger",
    description: {
      cs: "Logistická platforma s dlouhým doletem pro náročné nasazení.",
      en: "Long-range logistics platform for demanding deployments.",
    },
    price: { cs: "250 000 Kč", en: "$10,890" },
    specs: skybridgerSpecs,
  },
  {
    name: "REGEN Skydiver",
    description: {
      cs: "Lehký koncept pro jednorázové nebo rychlé specializované mise.",
      en: "Lightweight concept for one-off or rapid specialized missions.",
    },
    price: { cs: "20 000 Kč", en: "$869" },
    specs: skydiverSpecs,
  },
  {
    name: "REGEN Sentinel",
    description: {
      cs: "Dron s dlouhým doletem a rozšířenou senzorovou výbavou.",
      en: "Long-range drone with an expanded sensor suite.",
    },
    price: { cs: "300 000 Kč", en: "$12,990" },
    specs: sentinelSpecs,
  },
  {
    name: "REGEN Guardian",
    description: {
      cs: "Monitoring hranic a perimetrů s vysokou provozní odolností.",
      en: "Border and perimeter monitoring with high operational resilience.",
    },
    price: { cs: "220 000 Kč", en: "$9,490" },
    specs: guardianSpecs,
  },
];

export default function DefensePage() {
  const { language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<DefenseItem | null>(null);

  const copy = {
    cs: {
      kicker: "Obranné systémy",
      title: "Strategické platformy",
      body:
        "Řada REGEN Defense je zaměřená na průzkum, monitoring, logistiku a specializované mise ve složitých podmínkách.",
      detail: "Technické parametry",
      close: "Zavřít",
      specsComingSoon: "Technická specifikace tohoto modelu se připravuje.",
      technicalSpec: "Technická specifikace",
    },
    en: {
      kicker: "Defense Systems",
      title: "Strategic Platforms",
      body:
        "The REGEN Defense line is focused on reconnaissance, monitoring, logistics, and specialized missions in demanding environments.",
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

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          {defenseSystems.map((system) => (
            <article
              key={system.name}
              className="glass-card flex flex-col rounded-3xl px-6 py-6 text-left"
            >
              <h2 className="text-xl font-semibold text-white">{system.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {system.description[language]}
              </p>
              <p className="mt-4 text-[1.4rem] font-semibold text-cyan-200">
                {system.price[language]}
              </p>
              <button
                type="button"
                onClick={() => setSelectedItem(system)}
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

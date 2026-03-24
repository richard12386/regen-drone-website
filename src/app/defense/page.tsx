"use client";

import { useLanguage } from "@/components/site/language-provider";

const defenseSystems = [
  {
    name: "REGEN Skybridger",
    detail: {
      cs: "Logistická platforma s dlouhým doletem pro náročné nasazení.",
      en: "Long-range logistics platform for demanding deployments.",
    },
    price: {
      cs: "250 000 Kč",
      en: "$10,890",
    },
  },
  {
    name: "REGEN Skydiver",
    detail: {
      cs: "Lehký koncept pro jednorázové nebo rychlé specializované mise.",
      en: "Lightweight concept for one-off or rapid specialized missions.",
    },
    price: {
      cs: "20 000 Kč",
      en: "$869",
    },
  },
  {
    name: "REGEN Sentinel",
    detail: {
      cs: "Dron s dlouhým doletem a rozšířenou senzorovou výbavou.",
      en: "Long-range drone with an expanded sensor suite.",
    },
    price: {
      cs: "300 000 Kč",
      en: "$12,990",
    },
  },
  {
    name: "REGEN Guardian",
    detail: {
      cs: "Monitoring hranic a perimetrů s vysokou provozní odolností.",
      en: "Border and perimeter monitoring with high operational resilience.",
    },
    price: {
      cs: "220 000 Kč",
      en: "$9,490",
    },
  },
];

export default function DefensePage() {
  const { language } = useLanguage();

  const copy = {
    cs: {
      kicker: "Obranné systémy",
      title: "Strategické platformy",
      body:
        "Řada REGEN Defense je zaměřená na průzkum, monitoring, logistiku a specializované mise ve složitých podmínkách.",
    },
    en: {
      kicker: "Defense Systems",
      title: "Strategic Platforms",
      body:
        "The REGEN Defense line is focused on reconnaissance, monitoring, logistics, and specialized missions in demanding environments.",
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
              className="glass-card rounded-3xl px-6 py-6 text-left"
            >
              <h2 className="text-xl font-semibold text-white">
                {system.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {system.detail[language]}
              </p>
              <p className="mt-4 text-[1.4rem] font-semibold text-cyan-200">
                {system.price[language]}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

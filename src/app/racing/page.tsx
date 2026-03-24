"use client";

import { useLanguage } from "@/components/site/language-provider";

const racingSystems = [
  {
    name: "REGEN Vortex",
    detail: {
      cs: "Výkonný FPV model pro pokročilé piloty a závodní tratě.",
      en: "High-performance FPV model for advanced pilots and race tracks.",
    },
    price: {
      cs: "18 000 Kč",
      en: "$779",
    },
  },
  {
    name: "REGEN Falcon",
    detail: {
      cs: "Dostupnější závodní dron pro vstup do FPV světa.",
      en: "More accessible racing drone for entering the FPV world.",
    },
    price: {
      cs: "7 500 Kč",
      en: "$329",
    },
  },
];

export default function RacingPage() {
  const { language } = useLanguage();

  const copy = {
    cs: {
      kicker: "Závodní divize",
      title: "FPV výběr REGEN",
      body:
        "Naše závodní řada je postavená pro rychlost, nízkou latenci a jisté chování na trati i při tréninku.",
    },
    en: {
      kicker: "Racing Division",
      title: "REGEN FPV Lineup",
      body:
        "Our racing line is built for speed, low latency, and confident handling on both tracks and training runs.",
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
            <article key={item.name} className="glass-card rounded-3xl px-5 py-6">
              <h2 className="text-xl font-semibold text-white">{item.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.detail[language]}
              </p>
              <p className="mt-4 text-[1.4rem] font-semibold text-cyan-200">
                {item.price[language]}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

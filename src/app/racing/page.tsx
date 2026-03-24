"use client";

import { useLanguage } from "@/components/site/language-provider";

const racingSystems = [
  {
    name: "Velocity FPV",
    detail: {
      cs: "Karbonový závodní rám s telemetrií s nízkou latencí.",
      en: "Carbon racing frame with low-latency telemetry.",
    },
  },
  {
    name: "Pulse Drive",
    detail: {
      cs: "Motory laděné pro závodní nasazení a agresivní akceleraci.",
      en: "Competition-tuned motors for aggressive acceleration.",
    },
  },
  {
    name: "Track Sync",
    detail: {
      cs: "Živá diagnostika a analytika výkonu přímo z depa.",
      en: "Live diagnostics and pit-lane performance analytics.",
    },
  },
];

export default function RacingPage() {
  const { language } = useLanguage();

  const copy = {
    cs: {
      kicker: "Závodní divize",
      title: "Rychlost bez kompromisů",
      body:
        "FPV platformy navržené pro přesné průjezdy zatáčkami, okamžitou odezvu a opakovatelné nastavení pro závodní den.",
    },
    en: {
      kicker: "Racing Division",
      title: "Speed Without Drift",
      body:
        "FPV platforms engineered for precision cornering, split-second response, and repeatable race-day tuning.",
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
          <p className="hero-subtitle mt-5 max-w-2xl text-pretty">
            {t.body}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {racingSystems.map((item) => (
            <article key={item.name} className="glass-card rounded-3xl px-5 py-6">
              <h2 className="text-xl font-semibold text-white">{item.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.detail[language]}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

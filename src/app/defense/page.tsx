"use client";

import { useLanguage } from "@/components/site/language-provider";

const defenseCapabilities = [
  {
    cs: "Modulární vzdušné platformy schopné reagovat na změny terénu i profilu hrozeb.",
    en: "Mission-adaptive airframes for changing terrain and threat profiles.",
  },
  {
    cs: "Šifrované telemetrické linky s odolnými komunikačními protokoly pro terén.",
    en: "Encrypted telemetry links with resilient field communication protocols.",
  },
  {
    cs: "Systémy rychlého nasazení pro průzkumné a zásahové týmy.",
    en: "Rapid deployment systems for reconnaissance and response teams.",
  },
];

export default function DefensePage() {
  const { language } = useLanguage();

  const copy = {
    cs: {
      kicker: "Obranné systémy",
      title: "Autonomie připravená pro misi",
      body:
        "Strategické vzdušné platformy určené pro dohled, rychlé vyhodnocení situace a spolehlivý provoz v náročném prostředí.",
    },
    en: {
      kicker: "Defense Systems",
      title: "Mission Ready Autonomy",
      body:
        "Strategic aerial platforms designed for surveillance, rapid assessment, and high-confidence operation in demanding environments.",
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

        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {defenseCapabilities.map((capability) => (
            <article
              key={capability.en}
              className="glass-card rounded-3xl px-6 py-6"
            >
              <p className="text-base leading-7 text-slate-200">
                {capability[language]}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

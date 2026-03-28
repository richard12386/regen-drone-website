"use client";

import { useState } from "react";
import { useLanguage } from "@/components/site/language-provider";
import { SpecModal, type Language, type SpecSection } from "@/components/site/spec-modal";
import {
  airSnapSpecs,
  travelFlySpecs,
  juniorSpecs,
  inspectSpecs,
  agroScanSpecs,
  rescueEyeSpecs,
  medDropSpecs,
  vortexSpecs,
  falconSpecs,
  skybridgerSpecs,
  skydiverSpecs,
  sentinelSpecs,
  guardianSpecs,
  weightlifterSpecs,
  promoFleetSpecs,
} from "@/data/drone-specs";

type Product = {
  name: string;
  description: Record<Language, string>;
  price: Record<Language, string>;
  specs?: SpecSection[];
};

type Category = {
  title: Record<Language, string>;
  items: Product[];
};

const categories: Category[] = [
  {
    title: { cs: "Osobní drony", en: "Personal Drones" },
    items: [
      {
        name: "REGEN AirSnap",
        description: {
          cs: "Kompaktní dron pro každodenní létání a snadné cestování.",
          en: "Compact drone for everyday flying and easy travel.",
        },
        price: { cs: "9 990 Kč", en: "$429" },
        specs: airSnapSpecs,
      },
      {
        name: "REGEN TravelFly",
        description: {
          cs: "Skládací osobní dron s delší výdrží baterie.",
          en: "Foldable personal drone with extended battery life.",
        },
        price: { cs: "14 990 Kč", en: "$649" },
        specs: travelFlySpecs,
      },
      {
        name: "REGEN Junior",
        description: {
          cs: "Dostupný model pro začátečníky a výuku základů pilotáže.",
          en: "Accessible starter model for beginners and pilot training.",
        },
        price: { cs: "1 990 Kč", en: "$89" },
        specs: juniorSpecs,
      },
    ],
  },
  {
    title: { cs: "Firemní drony", en: "Business Drones" },
    items: [
      {
        name: "REGEN Inspect",
        description: {
          cs: "Inspekční dron pro stavebnictví, energetiku a technické provozy.",
          en: "Inspection drone for construction, energy, and technical operations.",
        },
        price: { cs: "79 000 Kč", en: "$3,390" },
        specs: inspectSpecs,
      },
      {
        name: "REGEN AgroScan",
        description: {
          cs: "Zemědělský dron se senzory pro mapování a analýzu porostu.",
          en: "Agricultural drone with sensors for mapping and crop analysis.",
        },
        price: { cs: "120 000 Kč", en: "$5,190" },
        specs: agroScanSpecs,
      },
    ],
  },
  {
    title: { cs: "Záchranářské drony", en: "Rescue Drones" },
    items: [
      {
        name: "REGEN RescueEye",
        description: {
          cs: "Platforma s termokamerou pro pátrání a záchranné mise.",
          en: "Thermal-equipped platform for search and rescue missions.",
        },
        price: { cs: "150 000 Kč", en: "$6,490" },
        specs: rescueEyeSpecs,
      },
      {
        name: "REGEN MedDrop",
        description: {
          cs: "Spolehlivý transportní dron pro zdravotnické a urgentní dodávky.",
          en: "Reliable transport drone for medical and urgent deliveries.",
        },
        price: { cs: "95 000 Kč", en: "$4,090" },
        specs: medDropSpecs,
      },
    ],
  },
  {
    title: { cs: "FPV závodní drony", en: "FPV Racing Drones" },
    items: [
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
    ],
  },
  {
    title: {
      cs: "Bezpečnostní a strategické platformy",
      en: "Security and Strategic Platforms",
    },
    items: [
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
    ],
  },
  {
    title: { cs: "Reklamní a speciální nasazení", en: "Advertising and Special Applications" },
    items: [
      {
        name: "REGEN Weightlifter",
        description: {
          cs: "Těžkotonážní nosič pro průmyslové a speciální přepravní úkoly.",
          en: "Heavy-lift carrier for industrial and special transport missions.",
        },
        price: { cs: "180 000 Kč", en: "$7,790" },
        specs: weightlifterSpecs,
      },
      {
        name: "REGEN Promo Fleet",
        description: {
          cs: "Sada reklamních dronů pro show, světelné sestavy a branding.",
          en: "Advertising drone fleet for shows, light formations, and branding.",
        },
        price: { cs: "50 000 – 120 000 Kč", en: "$2,190 – $5,190" },
        specs: promoFleetSpecs,
      },
    ],
  },
];

export default function ProductsPage() {
  const { language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const copy = {
    cs: {
      kicker: "Portfolio dronů REGEN",
      title: "Kompletní výběr systémů",
      body:
        "Ceny se automaticky přepínají podle jazyka webu. V češtině zobrazujeme nabídku pro český trh, v angličtině orientační ceny v USD.",
      cta: "Přidat do košíku",
      detail: "Technické parametry",
      close: "Zavřít",
      specsComingSoon: "Technická specifikace tohoto modelu se připravuje.",
      technicalSpec: "Technická specifikace",
    },
    en: {
      kicker: "REGEN Drone Portfolio",
      title: "Complete Systems Lineup",
      body:
        "Prices switch automatically with the site language. Czech shows our Czech-market pricing, English displays indicative USD pricing.",
      cta: "Add to cart",
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
        <div className="mx-auto flex max-w-[45rem] flex-col items-center text-center">
          <span className="section-kicker">{t.kicker}</span>
          <h1 className="hero-title mt-6 text-balance text-[2.8rem] font-semibold uppercase tracking-[0.3em] text-white sm:text-[3.95rem] md:text-[4.25rem]">
            {t.title}
          </h1>
          <p className="hero-subtitle mt-5 max-w-[38rem] text-pretty">{t.body}</p>
        </div>

        <div className="mx-auto mt-14 flex max-w-[72rem] flex-col gap-12">
          {categories.map((category) => (
            <section key={category.title.en}>
              <h2 className="mb-5 text-xl font-semibold uppercase tracking-[0.18em] text-white">
                {category.title[language]}
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {category.items.map((product) => (
                  <article
                    key={product.name}
                    className="glass-card flex flex-col rounded-3xl px-5 py-5 text-left"
                  >
                    <h3 className="text-[1.03rem] font-semibold tracking-tight text-white md:text-[1.4rem]">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {product.description[language]}
                    </p>
                    <p className="mt-4 text-[1.45rem] font-semibold text-cyan-200">
                      {product.price[language]}
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      <button
                        type="button"
                        className="btn-cyan w-full justify-center rounded-full py-3 font-semibold uppercase"
                      >
                        {t.cta}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="w-full rounded-full border border-cyan-500/40 py-2.5 text-sm font-semibold uppercase tracking-wide text-cyan-300 transition-colors hover:border-cyan-400/70 hover:bg-cyan-500/10 hover:text-cyan-200"
                      >
                        {t.detail}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="soft-divider mx-auto mt-12 max-w-[39rem]" />
      </section>

      {selectedProduct && (
        <SpecModal
          product={selectedProduct}
          language={language}
          onClose={() => setSelectedProduct(null)}
          copy={t}
        />
      )}
    </main>
  );
}

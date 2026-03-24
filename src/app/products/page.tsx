"use client";

import { useLanguage } from "@/components/site/language-provider";

const products = [
  {
    name: "REGEN Falcon X",
    description: {
      cs: "Vysoce výkonný osobní dron",
      en: "High-performance personal drone",
    },
    price: "$1,299",
  },
  {
    name: "REGEN Rescue One",
    description: {
      cs: "Dronový systém pro záchranné nasazení",
      en: "Emergency response drone system",
    },
    price: "$4,800",
  },
  {
    name: "REGEN Shadow Ops",
    description: {
      cs: "Pokročilá taktická dronová platforma",
      en: "Advanced tactical drone platform",
    },
    price: "$12,500",
  },
  {
    name: "REGEN Velocity FPV",
    description: {
      cs: "Racing dron navržený pro maximální rychlost",
      en: "Racing drone built for speed",
    },
    price: "$2,200",
  },
  {
    name: "REGEN Atlas Pro",
    description: {
      cs: "Odolný průmyslový dron pro náročné nasazení",
      en: "Heavy-duty industrial drone",
    },
    price: "$6,900",
  },
  {
    name: "REGEN Nano Air",
    description: {
      cs: "Kompaktní osobní dron",
      en: "Compact personal drone",
    },
    price: "$799",
  },
];

export default function ProductsPage() {
  const { language } = useLanguage();

  const copy = {
    cs: {
      kicker: "Prémiové portfolio dronů",
      title: "Regen Systems",
      body:
        "Navrženo pro rychlost, spolehlivost a přesnost napříč osobním, taktickým i průmyslovým nasazením.",
      cta: "Přidat do košíku",
    },
    en: {
      kicker: "Premium Drone Portfolio",
      title: "Regen Systems",
      body:
        "Engineered for speed, reliability, and precision across personal, tactical, and industrial missions.",
      cta: "Add to cart",
    },
  } as const;

  const t = copy[language];

  return (
    <main className="page-shell">
      <section className="content-shell">
        <div className="mx-auto flex max-w-[39rem] flex-col items-center text-center">
          <span className="section-kicker">{t.kicker}</span>
          <h1 className="hero-title mt-6 text-balance text-[2.8rem] font-semibold uppercase tracking-[0.3em] text-white sm:text-[3.95rem] md:text-[4.25rem]">
            {t.title}
          </h1>
          <p className="hero-subtitle mt-5 max-w-[32rem] text-pretty">
            {t.body}
          </p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article key={product.name} className="product-card glass-card rounded-3xl px-5 py-5 text-left">
              <h2 className="text-[1.03rem] font-semibold tracking-tight text-white md:text-[1.55rem]">
                {product.name}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {product.description[language]}
              </p>
              <p className="mt-4 text-[1.45rem] font-semibold text-cyan-200">
                {product.price}
              </p>
              <button
                type="button"
                className="btn-cyan mt-5 w-full justify-center rounded-full py-3 font-semibold uppercase"
              >
                {t.cta}
              </button>
            </article>
          ))}
        </div>

        <div className="soft-divider mx-auto mt-12 max-w-[39rem]" />
      </section>
    </main>
  );
}

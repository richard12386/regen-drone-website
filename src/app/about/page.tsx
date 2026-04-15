"use client";

import Link from "next/link";
import { useLanguage } from "@/components/site/language-provider";

const copy = {
  cs: {
    kicker: "O nás",
    heroTitle: "Tvoříme drony,\nkteré mají smysl.",
    heroLead:
      "REGEN Drones je technologický projekt zaměřený na vývoj a nabídku moderních bezpilotních systémů pro reálné scénáře nasazení.",

    whoTitle: "Kdo jsme",
    whoText:
      "REGEN Drones je česká startupová iniciativa soustředěná na moderní dronové technologie. Nejsme velká korporace — jsme tým lidí, kteří drony berou vážně. Naším cílem je nabídnout portfolium pokrývající různé typy použití: od volnočasového létání přes průmyslové aplikace až po specializované profesionální nasazení.",

    whyTitle: "Proč projekt vznikl",
    whyText:
      "Drony se rychle stávají součástí běžného světa — ve výrobě, záchranářství, zemědělství, bezpečnosti i sportu. Přesto je nabídka na trhu roztříštěná: buď levné spotřebitelské modely bez výkonu, nebo extrémně drahá profesionální řešení bez rozumného středu. REGEN vznikl s cílem tuto mezeru zaplnit — nabídnout promyšlené, technicky vyspělé a cenově dostupnější alternativy.",

    whatTitle: "Co nabízíme",
    categories: [
      {
        icon: "🛸",
        name: "Osobní drony",
        desc: "Lehké a intuitivní platformy pro fotografii, video a vzdušnou exploraci. Ideální pro začínající i zkušené piloty.",
      },
      {
        icon: "🏭",
        name: "Firemní a průmyslové drony",
        desc: "Robustní systémy pro inspekce, mapování, monitoring a logistiku v náročných provozních podmínkách.",
      },
      {
        icon: "🚑",
        name: "Záchranářské drony",
        desc: "Platformy navržené pro krizové nasazení — pátrání a záchrana, přeprava zdravotnického vybavení, komunikace v terénu.",
      },
      {
        icon: "🏁",
        name: "FPV a racing",
        desc: "Výkonné drony pro FPV piloty a závodní sport. Rychlost, přesnost a adrenalin.",
      },
      {
        icon: "🛡️",
        name: "Bezpečnostní platformy",
        desc: "Specializované systémy pro obranu, monitoring perimetru a strategické operace.",
      },
      {
        icon: "🔬",
        name: "Speciální nasazení",
        desc: "Řešení na míru pro vědecké, vládní a průmyslové projekty s nestandardními požadavky.",
      },
    ],

    forWhoTitle: "Pro koho",
    audiences: [
      { label: "Jednotlivci a hobby piloti", desc: "Dostupné, spolehlivé a zábavné platformy pro osobní použití a kreativní projekty." },
      { label: "Firmy a průmysl", desc: "Efektivní nástroje pro automatizaci, sběr dat, inspekce a operační efektivitu." },
      { label: "Záchranné a krizové složky", desc: "Odolné systémy připravené fungovat tam, kde je to nejdůležitější." },
      { label: "Specializované profesionální použití", desc: "Konfigurovatelná řešení pro vědu, výzkum, bezpečnostní složky a vládní projekty." },
    ],

    missionTitle: "Mise",
    missionText:
      "Přinášet technologicky vyspělé dronové systémy lidem, firmám a organizacím, které je reálně potřebují — bez zbytečné složitosti a za rozumnou cenu.",

    visionTitle: "Vize",
    visionText:
      "Stát se referenčním portfoliem pro moderní bezpilotní technologie v regionu — od hobby po profesionální nasazení.",

    diffTitle: "Čím se lišíme",
    diffs: [
      { label: "Šíře portfolia", desc: "Pokrýváme více typů nasazení než většina specializovaných výrobců." },
      { label: "Rozumný středobod", desc: "Kombinujeme dostupnější modely s profesionálními řešeními v jednom konzistentním portfoliu." },
      { label: "Moderní technologie", desc: "Žádné zastaralé platformy. Každý model reflektuje aktuální standardy letové elektroniky a softwaru." },
      { label: "Promyšlený výběr", desc: "Nespychujeme tisíce SKU. Každý dron v katalogu má jasné místo a jasné použití." },
    ],

    ctaTitle: "Zajímají vás konkrétní modely?",
    ctaText: "Prohlédněte si kompletní katalog dronů REGEN.",
    ctaBtn: "Prohlédnout produkty",
  },
  en: {
    kicker: "About Us",
    heroTitle: "Building drones\nthat actually matter.",
    heroLead:
      "REGEN Drones is a technology project focused on developing and delivering modern unmanned systems for real-world deployment.",

    whoTitle: "Who We Are",
    whoText:
      "REGEN Drones is a Czech startup initiative focused on modern drone technology. We're not a large corporation — we're a team that takes unmanned systems seriously. Our goal is to offer a portfolio that spans multiple use cases: from recreational flying and creative work to industrial applications and specialized professional deployments.",

    whyTitle: "Why We Started",
    whyText:
      "Drones are becoming part of everyday life — in manufacturing, emergency response, agriculture, security, and sport. Yet the market remains fragmented: cheap consumer models with no real capability on one end, and extremely expensive enterprise solutions with no accessible middle ground on the other. REGEN was built to fill that gap — delivering technically capable, thoughtfully designed alternatives at a more reasonable price point.",

    whatTitle: "What We Offer",
    categories: [
      {
        icon: "🛸",
        name: "Personal Drones",
        desc: "Lightweight and intuitive platforms for photography, video, and aerial exploration. Suited for beginners and experienced pilots alike.",
      },
      {
        icon: "🏭",
        name: "Industrial & Commercial Drones",
        desc: "Robust systems for inspection, mapping, monitoring, and logistics in demanding operational environments.",
      },
      {
        icon: "🚑",
        name: "Rescue Drones",
        desc: "Platforms built for emergency deployment — search and rescue, medical supply delivery, terrain communication.",
      },
      {
        icon: "🏁",
        name: "FPV & Racing",
        desc: "High-performance drones for FPV pilots and competitive racing. Speed, precision, and adrenaline.",
      },
      {
        icon: "🛡️",
        name: "Security Platforms",
        desc: "Specialized systems for defense, perimeter monitoring, and strategic operations.",
      },
      {
        icon: "🔬",
        name: "Special Deployments",
        desc: "Custom solutions for scientific, governmental, and industrial projects with non-standard requirements.",
      },
    ],

    forWhoTitle: "Who It's For",
    audiences: [
      { label: "Individuals & Hobby Pilots", desc: "Accessible, reliable, and enjoyable platforms for personal use and creative projects." },
      { label: "Businesses & Industry", desc: "Effective tools for automation, data collection, inspection, and operational efficiency." },
      { label: "Emergency & Crisis Services", desc: "Resilient systems ready to operate where it matters most." },
      { label: "Specialized Professional Use", desc: "Configurable solutions for science, research, security forces, and government projects." },
    ],

    missionTitle: "Mission",
    missionText:
      "To bring technically capable drone systems to individuals, businesses, and organizations that genuinely need them — without unnecessary complexity and at a reasonable price.",

    visionTitle: "Vision",
    visionText:
      "To become the reference portfolio for modern unmanned technology in the region — from recreational to professional deployment.",

    diffTitle: "What Sets Us Apart",
    diffs: [
      { label: "Portfolio breadth", desc: "We cover more deployment types than most specialized manufacturers." },
      { label: "Sensible middle ground", desc: "We combine accessible models with professional solutions in one consistent portfolio." },
      { label: "Modern technology", desc: "No outdated platforms. Every model reflects current standards in flight electronics and software." },
      { label: "Curated selection", desc: "We don't push thousands of SKUs. Every drone in the catalog has a clear place and a clear purpose." },
    ],

    ctaTitle: "Interested in specific models?",
    ctaText: "Browse the full REGEN drone catalog.",
    ctaBtn: "Explore Products",
  },
} as const;

export default function AboutPage() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="page-shell">
      {/* ── Hero ── */}
      <section className="content-shell mx-auto flex min-h-[calc(55vh)] max-w-4xl flex-col items-center justify-center py-20 text-center">
        <span className="section-kicker">{t.kicker}</span>
        <h1 className="hero-title mt-6 whitespace-pre-line text-[2.4rem] font-semibold uppercase tracking-[0.2em] text-white sm:text-[3.2rem] md:text-[3.8rem]">
          {t.heroTitle}
        </h1>
        <p className="hero-subtitle mt-6 max-w-2xl text-pretty text-slate-300">
          {t.heroLead}
        </p>
        <div className="soft-divider mt-10 max-w-[22rem]" />
      </section>

      {/* ── Kdo jsme / Who We Are ── */}
      <section className="content-shell mx-auto max-w-3xl py-16">
        <h2 className="section-kicker mb-4 text-left">{t.whoTitle}</h2>
        <p className="text-base leading-relaxed text-slate-300">{t.whoText}</p>
      </section>

      {/* ── Proč projekt vznikl / Why We Started ── */}
      <section className="content-shell mx-auto max-w-3xl border-t border-white/5 py-16">
        <h2 className="section-kicker mb-4 text-left">{t.whyTitle}</h2>
        <p className="text-base leading-relaxed text-slate-300">{t.whyText}</p>
      </section>

      {/* ── Co nabízíme / What We Offer ── */}
      <section className="content-shell mx-auto max-w-5xl border-t border-white/5 py-16">
        <h2 className="section-kicker mb-10 text-center">{t.whatTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.categories.map((cat) => (
            <div key={cat.name} className="glass-card flex flex-col gap-2 p-6">
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
                {cat.name}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pro koho / Who It's For ── */}
      <section className="content-shell mx-auto max-w-4xl border-t border-white/5 py-16">
        <h2 className="section-kicker mb-10 text-center">{t.forWhoTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.audiences.map((a) => (
            <div key={a.label} className="glass-card p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-300">
                {a.label}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mise & Vize / Mission & Vision ── */}
      <section className="content-shell mx-auto max-w-4xl border-t border-white/5 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="ambient-panel p-8">
            <h2 className="section-kicker mb-4">{t.missionTitle}</h2>
            <p className="text-base leading-relaxed text-slate-200">{t.missionText}</p>
          </div>
          <div className="ambient-panel p-8">
            <h2 className="section-kicker mb-4">{t.visionTitle}</h2>
            <p className="text-base leading-relaxed text-slate-200">{t.visionText}</p>
          </div>
        </div>
      </section>

      {/* ── Čím se lišíme / What Sets Us Apart ── */}
      <section className="content-shell mx-auto max-w-4xl border-t border-white/5 py-16">
        <h2 className="section-kicker mb-10 text-center">{t.diffTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.diffs.map((d) => (
            <div key={d.label} className="glass-card p-6">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-white">
                {d.label}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="content-shell mx-auto max-w-2xl border-t border-white/5 py-20 text-center">
        <h2 className="mb-3 text-xl font-semibold uppercase tracking-widest text-white">
          {t.ctaTitle}
        </h2>
        <p className="mb-8 text-slate-400">{t.ctaText}</p>
        <Link href="/products" className="btn-cyan rounded-full uppercase">
          {t.ctaBtn}
        </Link>
      </section>
    </main>
  );
}

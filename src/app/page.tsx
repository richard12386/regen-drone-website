"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/site/language-provider";

const DroneCanvas = dynamic(() => import("@/components/site/DroneCanvas"), { ssr: false });

export default function Page() {
  const { language } = useLanguage();

  const copy = {
    cs: {
      eyebrow: "REGEN / Aerospace Systems",
      title: "Humans Can Fly",
      lead: "Inteligentní letecké platformy navržené pro náročné operace.",
      body:
        "Stavíme autonomní systémy letecké úrovně — přesné řízení, odolná konstrukce, software připravený pro misi.",
      primary: "Prozkoumat řadu",
      secondary: "O nás",
      anno: {
        sensor: { label: "Front Array", value: "12-bod LiDAR", sub: "obstacle detection" },
        camera: { label: "Optics", value: "1\" CMOS · f/1.7", sub: "5.1K @ 50fps" },
        motor: { label: "Propulsion", value: "Brushless 2806", sub: "12 000 RPM" },
        flight: { label: "Endurance", value: "47 min letu", sub: "12 km range" },
      },
    },
    en: {
      eyebrow: "REGEN / Aerospace Systems",
      title: "Humans Can Fly",
      lead: "Intelligent aerial platforms engineered for demanding operations.",
      body:
        "Aerospace-grade autonomous systems — precision flight control, resilient hardware, mission-ready software.",
      primary: "Explore the lineup",
      secondary: "About",
      anno: {
        sensor: { label: "Front Array", value: "12-point LiDAR", sub: "obstacle detection" },
        camera: { label: "Optics", value: "1\" CMOS · f/1.7", sub: "5.1K @ 50fps" },
        motor: { label: "Propulsion", value: "Brushless 2806", sub: "12,000 RPM" },
        flight: { label: "Endurance", value: "47 min flight", sub: "12 km range" },
      },
    },
  } as const;

  const t = copy[language];

  return (
    <main className="page-shell">
      <section className="content-shell relative grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* LEFT: Copy */}
        <div className="relative z-10 flex flex-col items-start text-left">
          <span className="hero-eyebrow">{t.eyebrow}</span>
          <h1 className="hero-title mt-6">{t.title}</h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed" style={{ color: "var(--text-dim)" }}>
            {t.lead}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {t.body}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
            <Link href="/products" className="btn-cyan min-w-52 uppercase">
              {t.primary}
            </Link>
            <Link href="/about" className="btn-outline min-w-40 uppercase">
              {t.secondary}
            </Link>
          </div>

          {/* Quick stats strip */}
          <div className="mt-16 grid w-full max-w-xl grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: "var(--line)" }}>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>Models</div>
              <div className="mt-2 text-2xl font-medium" style={{ color: "var(--text)" }}>13</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>Max Range</div>
              <div className="mt-2 text-2xl font-medium" style={{ color: "var(--text)" }}>22 km</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>Payload</div>
              <div className="mt-2 text-2xl font-medium" style={{ color: "var(--text)" }}>8.5 kg</div>
            </div>
          </div>
        </div>

        {/* RIGHT: 3D drone with floating annotations */}
        <div className="relative h-[600px] w-full lg:h-[720px]">
          <DroneCanvas className="absolute inset-0 h-full w-full" interactive />

          {/* Annotation: top-left → points to camera */}
          <div className="anno-card dot-right delay-1" style={{ top: "18%", left: "2%" }}>
            <span className="anno-label">{t.anno.camera.label}</span>
            <div className="anno-value">{t.anno.camera.value}</div>
            <div className="anno-sub">{t.anno.camera.sub}</div>
          </div>

          {/* Annotation: top-right → propulsion */}
          <div className="anno-card dot-left delay-2" style={{ top: "10%", right: "2%" }}>
            <span className="anno-label">{t.anno.motor.label}</span>
            <div className="anno-value">{t.anno.motor.value}</div>
            <div className="anno-sub">{t.anno.motor.sub}</div>
          </div>

          {/* Annotation: bottom-left → sensor array */}
          <div className="anno-card dot-right delay-3" style={{ bottom: "22%", left: "0%" }}>
            <span className="anno-label">{t.anno.sensor.label}</span>
            <div className="anno-value">{t.anno.sensor.value}</div>
            <div className="anno-sub">{t.anno.sensor.sub}</div>
          </div>

          {/* Annotation: bottom-right → flight */}
          <div className="anno-card dot-left" style={{ bottom: "15%", right: "4%" }}>
            <span className="anno-label">{t.anno.flight.label}</span>
            <div className="anno-value">{t.anno.flight.value}</div>
            <div className="anno-sub">{t.anno.flight.sub}</div>
          </div>

          {/* Subtle index marker */}
          <div className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.32em]" style={{ color: "var(--faint)" }}>
            REGEN—M7 / 01
          </div>
        </div>
      </section>
    </main>
  );
}

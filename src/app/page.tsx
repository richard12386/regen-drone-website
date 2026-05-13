"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/site/language-provider";

const DroneCanvas = dynamic(() => import("@/components/site/DroneCanvas"), { ssr: false });

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

export default function Page() {
  const { language } = useLanguage();

  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!installPrompt) {
      window.location.href = "/app";
      return;
    }
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

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
      bannerKicker: "REGEN Flight App",
      bannerTitle: "Ovládejte celou flotilu z jednoho místa",
      bannerText: "Aplikace pro správu a živé ovládání všech REGEN dronů. Stáhněte si ji pro Windows, macOS, Android i iOS.",
      bannerBtn: "Stáhnout aplikaci",
      bannerSecondary: "Více informací",
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
      bannerKicker: "REGEN Flight App",
      bannerTitle: "Control your entire fleet from one place",
      bannerText: "Application for managing and live-controlling all REGEN drones. Available for Windows, macOS, Android, and iOS.",
      bannerBtn: "Download the app",
      bannerSecondary: "Learn more",
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

      {/* ── App banner ───────────────────────────────────────────────────── */}
      <section className="content-shell mt-8 pb-20">
        <div
          className="relative overflow-hidden rounded-[2px] border"
          style={{
            borderColor: "var(--line-strong)",
            background:
              "linear-gradient(120deg, rgba(43,85,101,0.35) 0%, rgba(15,26,30,0.85) 50%, rgba(7,13,14,0.95) 100%)",
          }}
        >
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(73,196,193,0.15) 0%, transparent 70%)",
            }}
          />

          <div className="relative grid gap-8 px-8 py-12 md:grid-cols-[1.4fr_1fr] md:items-center md:px-12 md:py-14">

            {/* Left: copy */}
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[var(--accent)]">
                {t.bannerKicker}
              </span>
              <h2 className="mt-4 max-w-md text-2xl font-medium leading-tight text-[var(--text)] md:text-[1.8rem]">
                {t.bannerTitle}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-dim)]">
                {t.bannerText}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button type="button" onClick={handleInstall} className="btn-cyan uppercase">
                  {t.bannerBtn}
                </button>
                <Link href="/app" className="btn-outline uppercase">
                  {t.bannerSecondary}
                </Link>
              </div>
            </div>

            {/* Right: mock app preview */}
            <div className="relative hidden md:block">
              <div
                className="rounded-[2px] border p-4"
                style={{
                  borderColor: "var(--line-strong)",
                  background: "rgba(7,13,14,0.7)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* App header mock */}
                <div className="mb-3 flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--line)" }}>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" style={{ boxShadow: "0 0 6px rgba(73,196,193,0.7)" }} />
                    <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[var(--accent)]">REGEN · Control</span>
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--faint)]">4 / 5 online</span>
                </div>

                {/* Drone rows */}
                <div className="flex flex-col gap-1.5">
                  {[
                    { name: "Alpha", id: "RGN-01", batt: 82, status: "FLYING" },
                    { name: "Bravo", id: "RGN-02", batt: 61, status: "HOLD" },
                    { name: "Delta", id: "RGN-04", batt: 44, status: "FLYING" },
                  ].map((d) => (
                    <div key={d.id} className="flex items-center justify-between rounded-[2px] px-2 py-1.5" style={{ background: "rgba(15,26,30,0.6)" }}>
                      <div className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                        <span className="text-[10px] font-medium text-[var(--text)]">{d.name}</span>
                        <span className="text-[8px] text-[var(--faint)]">{d.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-0.5 w-10 rounded-full bg-[var(--line-strong)]">
                          <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${d.batt}%` }} />
                        </div>
                        <span className="text-[8px] tabular-nums text-[var(--muted)]">{d.batt}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Telemetry mock */}
                <div className="mt-3 grid grid-cols-3 gap-px rounded-[2px] border" style={{ borderColor: "var(--line)", background: "var(--line)" }}>
                  {[
                    { label: "ALT", value: "47.2" },
                    { label: "SPD", value: "8.4" },
                    { label: "BAT", value: "82" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center px-2 py-2" style={{ background: "rgba(7,13,14,0.9)" }}>
                      <span className="text-[7px] uppercase tracking-[0.2em] text-[var(--faint)]">{item.label}</span>
                      <span className="text-xs font-medium tabular-nums text-[var(--text)]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform pills */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["iOS", "Android", "Windows", "macOS"].map((p) => (
                  <span key={p} className="rounded-[2px] border px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-[var(--muted)]" style={{ borderColor: "var(--line-strong)" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

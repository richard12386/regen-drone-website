"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/site/language-provider";

type Stage = "scanning" | "discovering" | "linking" | "ready";

type DiscoveredDrone = {
  id: string;
  name: string;
  signal: number;
};

const ALL_DRONES: DiscoveredDrone[] = [
  { id: "RGN-01", name: "Alpha", signal: 94 },
  { id: "RGN-02", name: "Bravo", signal: 88 },
  { id: "RGN-03", name: "Charlie", signal: 0 },
  { id: "RGN-04", name: "Delta", signal: 79 },
  { id: "RGN-05", name: "Echo", signal: 52 },
];

const copy = {
  cs: {
    title: "REGEN Flight",
    scanning: "Vyhledávání dronů…",
    discovering: "Detekováno",
    linking: "Navazování zabezpečeného spojení",
    ready: "Připojeno",
    enter: "Vstoupit do Control Center",
    abort: "Přerušit",
    secureLink: "AES-256 · End-to-End",
    foundLabel: "DRONŮ ONLINE",
    statusLabel: "STAV",
  },
  en: {
    title: "REGEN Flight",
    scanning: "Searching for drones…",
    discovering: "Detected",
    linking: "Establishing secure link",
    ready: "Connected",
    enter: "Enter Control Center",
    abort: "Abort",
    secureLink: "AES-256 · End-to-End",
    foundLabel: "DRONES ONLINE",
    statusLabel: "STATUS",
  },
} as const;

export function ConnectionScreen({ onReady }: { onReady: () => void }) {
  const { language } = useLanguage();
  const t = copy[language];

  const [stage, setStage] = useState<Stage>("scanning");
  const [found, setFound] = useState<DiscoveredDrone[]>([]);
  const [progress, setProgress] = useState(0);

  // Stage progression
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: scanning (700ms)
    timers.push(setTimeout(() => setStage("discovering"), 700));

    // Phase 2: discover drones one by one
    ALL_DRONES.forEach((drone, i) => {
      timers.push(
        setTimeout(() => {
          setFound((prev) => [...prev, drone]);
        }, 900 + i * 380)
      );
    });

    // Phase 3: linking
    timers.push(setTimeout(() => setStage("linking"), 900 + ALL_DRONES.length * 380 + 200));

    // Phase 4: ready
    timers.push(setTimeout(() => setStage("ready"), 900 + ALL_DRONES.length * 380 + 1100));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Progress bar
  useEffect(() => {
    if (stage === "ready") {
      setProgress(100);
      return;
    }
    const target =
      stage === "scanning" ? 8 : stage === "discovering" ? 30 + found.length * 11 : 92;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= target) {
          clearInterval(interval);
          return target;
        }
        return Math.min(target, p + 1);
      });
    }, 22);
    return () => clearInterval(interval);
  }, [stage, found.length]);

  const stageText =
    stage === "scanning" ? t.scanning :
    stage === "discovering" ? t.scanning :
    stage === "linking" ? t.linking :
    t.ready;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(900px 600px at 50% 30%, rgba(43, 85, 101, 0.25), transparent 70%), linear-gradient(180deg, var(--bg-1) 0%, var(--bg-0) 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(73,196,193,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(73,196,193,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* Scan ring animation */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="rounded-full border"
          style={{
            width: "440px",
            height: "440px",
            borderColor: "rgba(73,196,193,0.08)",
            animation: "scanPulse 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 rounded-full border"
          style={{
            width: "280px",
            height: "280px",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(73,196,193,0.14)",
            animation: "scanPulse 3s ease-in-out infinite 0.5s",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 rounded-full border"
          style={{
            width: "140px",
            height: "140px",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(73,196,193,0.22)",
            animation: "scanPulse 3s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8 px-6">

        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--accent)]">
            {t.title}
          </span>
          <div className="h-px w-14 bg-[var(--accent-deep)]" />
        </div>

        {/* Status text */}
        <div className="flex flex-col items-center gap-2 min-h-[3rem]">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--text)]">
            {stageText}
            {stage !== "ready" && (
              <span className="ml-1">
                <span className="dot-anim">.</span>
                <span className="dot-anim" style={{ animationDelay: "0.2s" }}>.</span>
                <span className="dot-anim" style={{ animationDelay: "0.4s" }}>.</span>
              </span>
            )}
          </p>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--faint)]">
            {t.secureLink}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="h-px w-full bg-[var(--line-strong)]">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-200"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 8px rgba(73,196,193,0.6)",
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-[var(--faint)]">
            <span>{stage.toUpperCase()}</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
        </div>

        {/* Discovered drones list */}
        <div className="flex w-full flex-col gap-1.5 min-h-[10rem]">
          <div className="mb-1 flex items-center justify-between text-[9px] uppercase tracking-[0.24em] text-[var(--faint)]">
            <span>{t.foundLabel}</span>
            <span className="tabular-nums">{found.filter(d => d.signal > 0).length} / {ALL_DRONES.filter(d => d.signal > 0).length}</span>
          </div>
          {found.map((drone) => (
            <div
              key={drone.id}
              className="flex items-center justify-between rounded-[2px] border px-3 py-2"
              style={{
                borderColor: "var(--line)",
                background: "rgba(15,26,30,0.6)",
                animation: "droneFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${drone.signal > 0 ? "bg-[var(--accent)]" : "bg-red-500"}`}
                  style={drone.signal > 0 ? { boxShadow: "0 0 6px rgba(73,196,193,0.7)" } : undefined}
                />
                <span className="text-xs font-medium text-[var(--text)]">{drone.name}</span>
                <span className="text-[9px] text-[var(--faint)]">{drone.id}</span>
              </div>
              <span className={`text-[9px] uppercase tracking-[0.18em] tabular-nums ${drone.signal > 0 ? "text-[var(--muted)]" : "text-red-400"}`}>
                {drone.signal > 0 ? `${drone.signal}%` : "OFFLINE"}
              </span>
            </div>
          ))}
        </div>

        {/* Enter button */}
        <button
          type="button"
          onClick={onReady}
          disabled={stage !== "ready"}
          className={`btn-cyan w-full justify-center py-3 uppercase transition-opacity ${
            stage !== "ready" ? "cursor-not-allowed opacity-30" : ""
          }`}
        >
          {t.enter}
        </button>

      </div>

      <style>{`
        @keyframes scanPulse {
          0%, 100% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes droneFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .dot-anim {
          animation: dotBlink 1.2s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

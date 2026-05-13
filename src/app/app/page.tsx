"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/components/site/language-provider";
import { ConnectionScreen } from "./ConnectionScreen";

type Language = "cs" | "en";

type DroneStatus = "flying" | "hovering" | "landing" | "idle" | "error";
type DroneMode = "MANUAL" | "AUTO" | "RTH" | "HOLD";

type Drone = {
  id: string;
  name: string;
  model: string;
  status: DroneStatus;
  mode: DroneMode;
  battery: number;
  altitude: number;
  speed: number;
  heading: number;
  satellites: number;
  signalStrength: number;
  lat: number;
  lng: number;
  flightTime: number;
};

const INITIAL_DRONES: Drone[] = [
  {
    id: "RGN-01",
    name: "Alpha",
    model: "REGEN Inspect",
    status: "flying",
    mode: "AUTO",
    battery: 82,
    altitude: 47.2,
    speed: 8.4,
    heading: 124,
    satellites: 14,
    signalStrength: 94,
    lat: 50.0755,
    lng: 14.4378,
    flightTime: 742,
  },
  {
    id: "RGN-02",
    name: "Bravo",
    model: "REGEN Sentinel",
    status: "hovering",
    mode: "HOLD",
    battery: 61,
    altitude: 120.0,
    speed: 0,
    heading: 270,
    satellites: 13,
    signalStrength: 88,
    lat: 50.0781,
    lng: 14.4412,
    flightTime: 1840,
  },
  {
    id: "RGN-03",
    name: "Charlie",
    model: "REGEN AgroScan",
    status: "idle",
    mode: "MANUAL",
    battery: 100,
    altitude: 0,
    speed: 0,
    heading: 0,
    satellites: 12,
    signalStrength: 0,
    lat: 50.0730,
    lng: 14.4350,
    flightTime: 0,
  },
  {
    id: "RGN-04",
    name: "Delta",
    model: "REGEN Guardian",
    status: "flying",
    mode: "AUTO",
    battery: 44,
    altitude: 85.6,
    speed: 14.2,
    heading: 35,
    satellites: 15,
    signalStrength: 79,
    lat: 50.0810,
    lng: 14.4440,
    flightTime: 3210,
  },
  {
    id: "RGN-05",
    name: "Echo",
    model: "REGEN Skybridger",
    status: "error",
    mode: "RTH",
    battery: 18,
    altitude: 62.1,
    speed: 21.0,
    heading: 190,
    satellites: 11,
    signalStrength: 52,
    lat: 50.0698,
    lng: 14.4295,
    flightTime: 5400,
  },
];

const STATUS_COLOR: Record<DroneStatus, string> = {
  flying: "bg-[var(--accent)]",
  hovering: "bg-[#7B99A4]",
  landing: "bg-[#34647A]",
  idle: "bg-[var(--faint)]",
  error: "bg-red-500",
};

const STATUS_LABEL: Record<DroneStatus, Record<Language, string>> = {
  flying: { cs: "V letu", en: "Flying" },
  hovering: { cs: "Hovering", en: "Hovering" },
  landing: { cs: "Přistání", en: "Landing" },
  idle: { cs: "Standby", en: "Standby" },
  error: { cs: "Chyba", en: "Error" },
};

function fmtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function fmtHeading(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function BatteryBar({ value }: { value: number }) {
  const color = value > 40 ? "bg-[var(--accent)]" : value > 20 ? "bg-amber-400" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-[var(--line-strong)]">
        <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs tabular-nums text-[var(--text-dim)]">{value}%</span>
    </div>
  );
}

function SignalBars({ value }: { value: number }) {
  return (
    <div className="flex items-end gap-[2px]">
      {[25, 50, 75, 100].map((threshold, i) => (
        <div
          key={i}
          style={{ height: `${6 + i * 3}px`, width: "3px" }}
          className={`rounded-[1px] transition-colors ${value >= threshold ? "bg-[var(--accent)]" : "bg-[var(--line-strong)]"}`}
        />
      ))}
    </div>
  );
}

function TelemetryItem({ label, value, unit }: { label: string; value: string | number; unit?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--faint)]">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-medium tabular-nums text-[var(--text)]">{value}</span>
        {unit && <span className="text-[10px] text-[var(--muted)]">{unit}</span>}
      </div>
    </div>
  );
}

type CmdLog = { id: number; time: string; drone: string; cmd: string; ok: boolean };

const copy = {
  cs: {
    title: "Control Center",
    fleet: "Flotila",
    noSelection: "Vyberte dron ze seznamu vlevo.",
    multiSelected: (n: number) => `${n} dronů vybráno`,
    cmdTakeoff: "Vzlet",
    cmdLand: "Přistání",
    cmdRTH: "Návrat",
    cmdHover: "Hold",
    cmdEstop: "E-STOP",
    altitude: "Výška",
    speed: "Rychlost",
    heading: "Kurz",
    satellites: "Satelity",
    battery: "Baterie",
    signal: "Signál",
    flightTime: "Čas letu",
    mode: "Režim",
    log: "Příkazový log",
    logEmpty: "Žádné příkazy",
    coords: "Souřadnice",
  },
  en: {
    title: "Control Center",
    fleet: "Fleet",
    noSelection: "Select a drone from the list on the left.",
    multiSelected: (n: number) => `${n} drones selected`,
    cmdTakeoff: "Takeoff",
    cmdLand: "Land",
    cmdRTH: "RTH",
    cmdHover: "Hold",
    cmdEstop: "E-STOP",
    altitude: "Altitude",
    speed: "Speed",
    heading: "Heading",
    satellites: "Satellites",
    battery: "Battery",
    signal: "Signal",
    flightTime: "Flight time",
    mode: "Mode",
    log: "Command log",
    logEmpty: "No commands sent",
    coords: "Coordinates",
  },
} as const;

export default function AppPage() {
  const { language } = useLanguage();
  const t = copy[language];

  const [connected, setConnected] = useState(false);
  const [drones, setDrones] = useState<Drone[]>(INITIAL_DRONES);
  const [selected, setSelected] = useState<Set<string>>(new Set(["RGN-01"]));
  const [log, setLog] = useState<CmdLog[]>([]);
  const [logId, setLogId] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrones((prev) =>
        prev.map((d) => {
          if (d.status === "idle") return d;
          const jitter = (range: number) => (Math.random() - 0.5) * range;
          return {
            ...d,
            battery: Math.max(0, d.battery - (Math.random() > 0.95 ? 1 : 0)),
            altitude: d.status === "hovering" || d.status === "flying"
              ? Math.max(0, d.altitude + jitter(0.6)) : d.altitude,
            speed: d.status === "flying" ? Math.max(0, d.speed + jitter(0.8)) : d.speed,
            heading: d.status === "flying" ? (d.heading + jitter(1) + 360) % 360 : d.heading,
            signalStrength: Math.min(100, Math.max(0, d.signalStrength + jitter(2))),
            lat: d.status === "flying" ? d.lat + jitter(0.0001) : d.lat,
            lng: d.status === "flying" ? d.lng + jitter(0.0001) : d.lng,
            flightTime: d.flightTime + 1,
          };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const toggleDrone = useCallback((id: string, e: React.MouseEvent) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        next.has(id) ? next.delete(id) : next.add(id);
        return next.size > 0 ? next : new Set([id]);
      }
      return new Set([id]);
    });
  }, []);

  const sendCommand = useCallback((cmd: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    const targets = drones.filter((d) => selected.has(d.id));
    const newEntries: CmdLog[] = targets.map((d, i) => ({
      id: logId + i, time: timeStr, drone: d.name, cmd, ok: d.status !== "error",
    }));
    setLogId((n) => n + targets.length);
    setLog((prev) => [...prev.slice(-49), ...newEntries]);

    if (cmd === "Land" || cmd === "Přistání") {
      setDrones((prev) => prev.map((d) =>
        selected.has(d.id) && d.status !== "idle" && d.status !== "error"
          ? { ...d, status: "landing", mode: "MANUAL" } : d));
    }
    if (cmd === "Hold") {
      setDrones((prev) => prev.map((d) =>
        selected.has(d.id) && (d.status === "flying" || d.status === "landing")
          ? { ...d, status: "hovering", mode: "HOLD", speed: 0 } : d));
    }
    if (cmd === "RTH" || cmd === "Návrat") {
      setDrones((prev) => prev.map((d) =>
        selected.has(d.id) && d.status !== "idle" ? { ...d, mode: "RTH" } : d));
    }
  }, [drones, selected, logId]);

  const activeDrones = drones.filter((d) => d.status !== "idle");
  const selectedDrones = drones.filter((d) => selected.has(d.id));
  const primaryDrone = selectedDrones[0] ?? null;

  if (!connected) {
    return <ConnectionScreen onReady={() => setConnected(true)} />;
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">

      {/* Top bar */}
      <div
        className="flex flex-shrink-0 items-center justify-between border-b px-4 py-2"
        style={{ borderColor: "var(--line)", background: "rgba(7,13,14,0.95)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
            REGEN · {t.title}
          </span>
          <span style={{ color: "var(--line-strong)" }}>|</span>
          <span className="text-[10px] text-[var(--faint)]">
            {activeDrones.length} / {drones.length} online
          </span>
        </div>
        <button
          type="button"
          onClick={() => sendCommand(t.cmdEstop)}
          className="flex items-center gap-2 rounded-[2px] border border-red-700 bg-red-950/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-400 transition-all hover:border-red-500 hover:bg-red-900/60 hover:text-red-300 active:scale-95"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          {t.cmdEstop}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside
          className="flex w-52 flex-shrink-0 flex-col border-r"
          style={{ borderColor: "var(--line)", background: "rgba(10,18,21,0.95)" }}
        >
          <div className="border-b px-3 py-2.5" style={{ borderColor: "var(--line)" }}>
            <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--faint)]">{t.fleet}</span>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto py-1">
            {drones.map((drone) => {
              const isSelected = selected.has(drone.id);
              return (
                <button
                  key={drone.id}
                  type="button"
                  onClick={(e) => toggleDrone(drone.id, e)}
                  className={`flex flex-col gap-1 border-b px-3 py-2.5 text-left transition-colors ${
                    isSelected ? "bg-[rgba(73,196,193,0.08)]" : "border-transparent hover:bg-[rgba(73,196,193,0.04)]"
                  }`}
                  style={{ borderColor: "var(--line)" }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${STATUS_COLOR[drone.status]} ${drone.status === "flying" ? "animate-pulse" : ""}`} />
                      <span className={`text-xs font-medium ${isSelected ? "text-[var(--accent)]" : "text-[var(--text-dim)]"}`}>
                        {drone.name}
                      </span>
                    </div>
                    <BatteryBar value={drone.battery} />
                  </div>
                  <div className="flex items-center justify-between pl-3">
                    <span className="text-[9px] text-[var(--faint)]">{drone.id}</span>
                    <span className={`text-[9px] uppercase tracking-[0.12em] ${drone.status === "error" ? "text-red-400" : "text-[var(--muted)]"}`}>
                      {STATUS_LABEL[drone.status][language]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="border-t px-3 py-2" style={{ borderColor: "var(--line)" }}>
            <p className="text-[9px] text-[var(--faint)]">Shift / Ctrl — multi-select</p>
          </div>
        </aside>

        {/* Main */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {selectedDrones.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-[var(--faint)]">{t.noSelection}</p>
            </div>
          ) : (
            <div className="flex flex-1 overflow-hidden">
              <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">

                {/* Header */}
                <div className="flex items-end justify-between">
                  <div>
                    {selected.size === 1 && primaryDrone ? (
                      <>
                        <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--accent)]">
                          {primaryDrone.id} · {primaryDrone.model}
                        </p>
                        <h2 className="mt-1 text-2xl font-medium text-[var(--text)]">{primaryDrone.name}</h2>
                      </>
                    ) : (
                      <>
                        <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--accent)]">Multi-control</p>
                        <h2 className="mt-1 text-2xl font-medium text-[var(--text)]">{t.multiSelected(selected.size)}</h2>
                      </>
                    )}
                  </div>
                  {primaryDrone && selected.size === 1 && (
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${STATUS_COLOR[primaryDrone.status]} ${primaryDrone.status === "flying" ? "animate-pulse" : ""}`} />
                      <span className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                        {STATUS_LABEL[primaryDrone.status][language]} · {primaryDrone.mode}
                      </span>
                    </div>
                  )}
                </div>

                {/* Telemetry grid */}
                {primaryDrone && (
                  <div
                    className="grid grid-cols-3 gap-px rounded-[2px] border sm:grid-cols-4 lg:grid-cols-6"
                    style={{ borderColor: "var(--line)", background: "var(--line)" }}
                  >
                    {[
                      { label: t.altitude, value: primaryDrone.altitude.toFixed(1), unit: "m" },
                      { label: t.speed, value: primaryDrone.speed.toFixed(1), unit: "m/s" },
                      { label: t.heading, value: `${Math.round(primaryDrone.heading)}°`, unit: fmtHeading(primaryDrone.heading) },
                      { label: t.satellites, value: primaryDrone.satellites, unit: "GPS" },
                      { label: t.flightTime, value: fmtTime(primaryDrone.flightTime) },
                      { label: t.mode, value: primaryDrone.mode },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col justify-between p-3" style={{ background: "var(--bg-0)" }}>
                        <TelemetryItem label={item.label} value={item.value} unit={item.unit} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Battery + signal + coords */}
                {primaryDrone && (
                  <div className="flex flex-wrap gap-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--faint)]">{t.battery}</span>
                      <BatteryBar value={primaryDrone.battery} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--faint)]">{t.signal}</span>
                      <div className="flex items-center gap-2">
                        <SignalBars value={primaryDrone.signalStrength} />
                        <span className="text-xs tabular-nums text-[var(--text-dim)]">{Math.round(primaryDrone.signalStrength)}%</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--faint)]">{t.coords}</span>
                      <span className="text-xs tabular-nums text-[var(--text-dim)]">
                        {primaryDrone.lat.toFixed(4)}, {primaryDrone.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Commands */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: t.cmdTakeoff, accent: false },
                    { label: t.cmdHover, accent: false },
                    { label: t.cmdRTH, accent: false },
                    { label: t.cmdLand, accent: true },
                  ].map(({ label, accent }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => sendCommand(label)}
                      className={`rounded-[2px] border px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] transition-all active:scale-95 ${
                        accent
                          ? "border-[var(--accent-deep)] bg-[rgba(73,196,193,0.08)] text-[var(--accent)] hover:bg-[rgba(73,196,193,0.15)]"
                          : "border-[var(--line-strong)] bg-transparent text-[var(--text-dim)] hover:border-[var(--accent-deep)] hover:text-[var(--accent)]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Multi-drone cards */}
                {selected.size > 1 && (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {selectedDrones.map((d) => (
                      <div key={d.id} className="rounded-[2px] border p-4" style={{ borderColor: "var(--line)", background: "rgba(15,26,30,0.6)" }}>
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_COLOR[d.status]}`} />
                            <span className="text-xs font-medium text-[var(--text)]">{d.name}</span>
                          </div>
                          <span className="text-[9px] text-[var(--faint)]">{d.id}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[var(--faint)]">{t.altitude} </span>
                            <span className="tabular-nums text-[var(--text-dim)]">{d.altitude.toFixed(1)} m</span>
                          </div>
                          <div>
                            <span className="text-[var(--faint)]">{t.speed} </span>
                            <span className="tabular-nums text-[var(--text-dim)]">{d.speed.toFixed(1)} m/s</span>
                          </div>
                        </div>
                        <div className="mt-2"><BatteryBar value={d.battery} /></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Command log */}
              <aside
                className="hidden w-56 flex-shrink-0 flex-col border-l xl:flex"
                style={{ borderColor: "var(--line)", background: "rgba(7,13,14,0.9)" }}
              >
                <div className="border-b px-3 py-2.5" style={{ borderColor: "var(--line)" }}>
                  <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[var(--faint)]">{t.log}</span>
                </div>
                <div ref={logRef} className="flex flex-1 flex-col overflow-y-auto py-2" style={{ scrollbarWidth: "none" }}>
                  {log.length === 0 ? (
                    <p className="px-3 text-[10px] text-[var(--faint)]">{t.logEmpty}</p>
                  ) : (
                    [...log].reverse().map((entry) => (
                      <div key={entry.id} className="flex flex-col gap-0.5 border-b px-3 py-2" style={{ borderColor: "var(--line)" }}>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-[var(--faint)]">{entry.time}</span>
                          <span className={`text-[9px] font-medium ${entry.ok ? "text-[var(--accent)]" : "text-red-400"}`}>
                            {entry.ok ? "OK" : "ERR"}
                          </span>
                        </div>
                        <span className="text-[10px] text-[var(--text-dim)]">
                          <span className="text-[var(--muted)]">{entry.drone}</span> — {entry.cmd}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

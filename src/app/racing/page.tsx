const racingSystems = [
  {
    name: "Velocity FPV",
    detail: "Carbon racing frame with low-latency telemetry.",
  },
  {
    name: "Pulse Drive",
    detail: "Competition-tuned motors for aggressive acceleration.",
  },
  {
    name: "Track Sync",
    detail: "Live diagnostics and pit-lane performance analytics.",
  },
];

export default function RacingPage() {
  return (
    <main className="page-shell">
      <section className="content-shell">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="section-kicker">Racing Division</span>
          <h1 className="hero-title mt-6 text-balance text-5xl font-semibold uppercase tracking-[0.28em] text-white sm:text-6xl md:text-7xl">
            Speed Without Drift
          </h1>
          <p className="hero-subtitle mt-5 max-w-2xl text-pretty">
            FPV platforms engineered for precision cornering, split-second
            response, and repeatable race-day tuning.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
          {racingSystems.map((item) => (
            <article key={item.name} className="glass-card rounded-3xl px-5 py-6">
              <h2 className="text-xl font-semibold text-white">{item.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

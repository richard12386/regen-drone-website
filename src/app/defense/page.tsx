const defenseCapabilities = [
  "Mission-adaptive airframes for changing terrain and threat profiles.",
  "Encrypted telemetry links with resilient field communication protocols.",
  "Rapid deployment systems for reconnaissance and response teams.",
];

export default function DefensePage() {
  return (
    <main className="page-shell">
      <section className="content-shell">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="section-kicker">Defense Systems</span>
          <h1 className="hero-title mt-6 text-balance text-5xl font-semibold uppercase tracking-[0.28em] text-white sm:text-6xl md:text-7xl">
            Mission Ready Autonomy
          </h1>
          <p className="hero-subtitle mt-5 max-w-2xl text-pretty">
            Strategic aerial platforms designed for surveillance, rapid
            assessment, and high-confidence operation in demanding environments.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {defenseCapabilities.map((capability) => (
            <article key={capability} className="glass-card rounded-3xl px-6 py-6">
              <p className="text-base leading-7 text-slate-200">{capability}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

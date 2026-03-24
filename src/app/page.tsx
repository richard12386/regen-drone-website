import Link from "next/link";

export default function Page() {
  return (
    <main className="page-shell flex items-center justify-center">
      <section className="content-shell flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="ambient-panel mx-auto flex w-full max-w-[43rem] flex-col items-center text-center">
          <span className="section-kicker">REGEN</span>
          <h1 className="hero-title mt-7 max-w-4xl text-balance text-[2.7rem] font-semibold uppercase tracking-[0.3em] text-white sm:text-[3.95rem] md:text-[4.35rem]">
            Humans Can Fly
          </h1>
          <p className="mt-6 max-w-2xl text-[1rem] text-slate-100">
            Engineering the next generation of intelligent drone systems.
          </p>
          <p className="hero-subtitle mt-4 max-w-[35rem] text-pretty text-slate-300">
            REGEN builds aerospace-grade autonomous platforms for civilian,
            industrial, and strategic operations with precision flight control,
            resilient hardware, and mission-ready software.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3.5 sm:flex-row">
            <Link href="/products" className="btn-cyan min-w-52 rounded-full uppercase">
              Explore Products
            </Link>
            <Link href="/defense" className="btn-outline min-w-40 rounded-full uppercase">
              Learn More
            </Link>
          </div>
          <div className="soft-divider mt-11 max-w-[27rem]" />
        </div>
      </section>
    </main>
  );
}

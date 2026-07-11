export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-dawn">about</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
        Rhythm was built around one idea
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
        Health advice is everywhere. What's rare is a simple way to actually follow through
        on it, day after day. Rhythm exists to close that gap — a lightweight tracker that
        keeps your habits visible, plus an AI assistant for the moments you're unsure what
        a healthier choice even looks like.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
        We keep the product small on purpose: track a routine, mark it done, see your day's
        rhythm fill in, and ask a question when you need to. No streak-shaming, no
        overwhelming dashboards — just a clear, private record that's yours.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-line p-6">
          <h3 className="font-display text-lg font-semibold text-ink">What we track</h3>
          <p className="mt-2 text-sm text-charcoal/65">
            Any recurring habit you define — hydration, sleep, movement, focused work, meals, or anything else.
          </p>
        </div>
        <div className="rounded-2xl border border-line p-6">
          <h3 className="font-display text-lg font-semibold text-ink">How your data is stored</h3>
          <p className="mt-2 text-sm text-charcoal/65">
            In Supabase, under your own authenticated account, protected by row-level security so only you can read it.
          </p>
        </div>
      </div>
    </div>
  )
}

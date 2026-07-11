const ADVANTAGES = [
  {
    title: 'See your day at a glance',
    desc: 'The rhythm dial turns your habits into one honest number, so you always know where today stands.',
  },
  {
    title: 'Consistency over intensity',
    desc: 'Rhythm rewards showing up daily, not heroic one-off efforts — the pattern research links to lasting health.',
  },
  {
    title: 'An assistant, not a lecture',
    desc: 'When you\'re stuck, the built-in AI assistant answers specific questions about sleep, movement, food, and stress.',
  },
  {
    title: 'Your data, your account',
    desc: 'Every routine is stored securely in your own Supabase-backed account, private to you and accessible from anywhere.',
  },
  {
    title: 'Built for real schedules',
    desc: 'Group habits by morning, afternoon, or evening so the app matches how your day actually unfolds.',
  },
  {
    title: 'Free to start',
    desc: 'Sign up in under a minute and start logging your first routine immediately — no credit card required.',
  },
]

export default function Advantages() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-dawn">why rhythm</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
        Advantages of tracking your routine
      </h1>
      <p className="mt-4 max-w-xl text-charcoal/65">
        Health rarely changes from one big decision. It changes from what you repeat.
        Here's what a daily tracker gives you that willpower alone doesn't.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {ADVANTAGES.map((a) => (
          <div key={a.title} className="rounded-2xl border border-line bg-white/50 p-6">
            <h3 className="font-display text-xl font-semibold text-ink">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import DayDial from '../components/DayDial'

const PILLARS = [
  { time: '6:00 AM', title: 'Wake & hydrate', note: 'A glass of water and light before screens.' },
  { time: '12:30 PM', title: 'Move for 20 min', note: 'Walk, stretch, or a short workout.' },
  { time: '10:00 PM', title: 'Wind down', note: 'Screens off, lights low, journal 3 lines.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-dawn">daily routine tracker</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-ink md:text-6xl">
            Build health,
            <br /> one rhythm at a time.
          </h1>
          <p className="mt-6 max-w-md text-lg text-charcoal/70">
            Rhythm helps you plan, track, and actually keep the small daily habits
            that add up to real health — with an AI assistant on hand whenever you're unsure what to do next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="focus-ring rounded-sig bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-dawn">
              Start tracking, free
            </Link>
            <Link to="/advantages" className="focus-ring rounded-sig border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper">
              See why it works
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-white/50 p-10">
          <DayDial percent={67} />
          <div className="w-full space-y-3">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex items-start gap-3 rounded-xl bg-paper px-4 py-3">
                <span className="mt-0.5 font-mono text-[11px] text-dawn">{p.time}</span>
                <div>
                  <p className="text-sm font-medium text-charcoal">{p.title}</p>
                  <p className="text-xs text-charcoal/50">{p.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-line bg-white/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl font-semibold text-ink">How Rhythm works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { step: 'Plan', desc: 'Add the habits you want to build — hydration, movement, sleep, focus time.' },
              { step: 'Track', desc: 'Check habits off through the day. Your dial fills as your rhythm comes together.' },
              { step: 'Ask', desc: 'Unsure how to improve? Ask the AI assistant for grounded, practical guidance.' },
            ].map((s, i) => (
              <div key={s.step} className="rounded-2xl border border-line p-6">
                <p className="font-mono text-xs text-dawn">0{i + 1}</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">{s.step}</h3>
                <p className="mt-2 text-sm text-charcoal/65">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink">Ready to find your rhythm?</h2>
        <p className="mx-auto mt-3 max-w-md text-charcoal/65">Create a free account and log your first routine today.</p>
        <Link to="/signup" className="focus-ring mt-6 inline-block rounded-sig bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-dawn">
          Create your account
        </Link>
      </section>
    </div>
  )
}

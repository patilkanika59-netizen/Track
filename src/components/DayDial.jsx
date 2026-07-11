// Signature element: a 24-hour dial that fills clockwise as a percentage
// of today's routines are completed. Used on Home (static demo) and
// Dashboard (live data).
export default function DayDial({ percent = 0, size = 220, label = "today's rhythm" }) {
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(Math.max(percent, 0), 100) / 100) * circumference

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 200 200" className="-rotate-90">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#DCD6C8" strokeWidth="10" />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#FF8A5B"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="dial-progress transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-semibold text-ink">{Math.round(percent)}%</span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-charcoal/50">{label}</span>
      </div>
    </div>
  )
}

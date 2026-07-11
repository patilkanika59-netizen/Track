const TIME_LABELS = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  anytime: 'Anytime',
}

export default function RoutineCard({ routine, completed, onToggle, onDelete }) {
  return (
    <div className={`flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors ${
      completed ? 'border-sage bg-sage/10' : 'border-line bg-white/60'
    }`}>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          aria-pressed={completed}
          aria-label={completed ? `Mark ${routine.title} as not done` : `Mark ${routine.title} as done`}
          className={`focus-ring flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            completed ? 'border-sage bg-sage text-white' : 'border-charcoal/30 text-transparent'
          }`}
        >
          ✓
        </button>
        <div>
          <p className={`font-medium text-charcoal ${completed ? 'line-through opacity-60' : ''}`}>
            {routine.title}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wide text-charcoal/45">
            {TIME_LABELS[routine.time_of_day] || 'Anytime'} · {routine.category || 'General'}
          </p>
        </div>
      </div>
      <button
        onClick={onDelete}
        aria-label={`Delete ${routine.title}`}
        className="focus-ring shrink-0 text-charcoal/30 transition-colors hover:text-dawn"
      >
        ✕
      </button>
    </div>
  )
}

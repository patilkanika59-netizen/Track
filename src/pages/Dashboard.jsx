import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import DayDial from '../components/DayDial'
import RoutineCard from '../components/RoutineCard'

const todayStr = () => new Date().toISOString().slice(0, 10)

export default function Dashboard() {
  const { user } = useAuth()
  const [routines, setRoutines] = useState([])
  const [logs, setLogs] = useState([]) // today's completed routine_ids
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [timeOfDay, setTimeOfDay] = useState('anytime')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function loadData() {
    setLoading(true)
    setError('')

    const [{ data: routineData, error: routineErr }, { data: logData, error: logErr }] = await Promise.all([
      supabase.from('routines').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
      supabase.from('routine_logs').select('routine_id').eq('user_id', user.id).eq('date', todayStr()),
    ])

    if (routineErr) setError(routineErr.message)
    if (logErr) setError(logErr.message)

    setRoutines(routineData || [])
    setLogs((logData || []).map((l) => l.routine_id))
    setLoading(false)
  }

  const completedSet = useMemo(() => new Set(logs), [logs])
  const percent = routines.length ? (completedSet.size / routines.length) * 100 : 0

  async function addRoutine(e) {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    const { data, error } = await supabase
      .from('routines')
      .insert({ user_id: user.id, title: title.trim(), category: category.trim(), time_of_day: timeOfDay })
      .select()
      .single()
    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }
    setRoutines((prev) => [...prev, data])
    setTitle('')
    setCategory('')
    setTimeOfDay('anytime')
  }

  async function toggleRoutine(routineId) {
    const isDone = completedSet.has(routineId)

    if (isDone) {
      const { error } = await supabase
        .from('routine_logs')
        .delete()
        .eq('user_id', user.id)
        .eq('routine_id', routineId)
        .eq('date', todayStr())
      if (error) return setError(error.message)
      setLogs((prev) => prev.filter((id) => id !== routineId))
    } else {
      const { error } = await supabase
        .from('routine_logs')
        .insert({ user_id: user.id, routine_id: routineId, date: todayStr(), completed: true })
      if (error) return setError(error.message)
      setLogs((prev) => [...prev, routineId])
    }
  }

  async function deleteRoutine(routineId) {
    const { error } = await supabase.from('routines').delete().eq('id', routineId).eq('user_id', user.id)
    if (error) return setError(error.message)
    setRoutines((prev) => prev.filter((r) => r.id !== routineId))
    setLogs((prev) => prev.filter((id) => id !== routineId))
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-dawn">dashboard</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
            Hi{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''} — here's today
          </h1>
        </div>
        <DayDial percent={percent} size={140} />
      </div>

      {error && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Today's routines</h2>
          {loading ? (
            <p className="mt-4 text-sm text-charcoal/50">Loading…</p>
          ) : routines.length === 0 ? (
            <p className="mt-4 text-sm text-charcoal/50">No routines yet — add your first one on the right.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {routines.map((r) => (
                <RoutineCard
                  key={r.id}
                  routine={r}
                  completed={completedSet.has(r.id)}
                  onToggle={() => toggleRoutine(r.id)}
                  onDelete={() => deleteRoutine(r.id)}
                />
              ))}
            </div>
          )}
        </div>

        <form onSubmit={addRoutine} className="h-fit space-y-4 rounded-2xl border border-line bg-white/50 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Add a routine</h2>
          <div>
            <label className="text-sm font-medium text-charcoal/70">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Drink a glass of water"
              className="focus-ring mt-1 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/70">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Hydration, Sleep, Movement…"
              className="focus-ring mt-1 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal/70">Time of day</label>
            <select
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
              className="focus-ring mt-1 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="anytime">Anytime</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="focus-ring w-full rounded-sig bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-dawn disabled:opacity-60"
          >
            {saving ? 'Adding…' : 'Add routine'}
          </button>
        </form>
      </div>
    </div>
  )
}

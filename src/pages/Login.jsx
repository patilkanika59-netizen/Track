import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-dawn">welcome back</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Log in to Rhythm</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-charcoal/70">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-ring mt-1 w-full rounded-xl border border-line bg-white/60 px-4 py-2.5 text-sm outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-charcoal/70">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-ring mt-1 w-full rounded-xl border border-line bg-white/60 px-4 py-2.5 text-sm outline-none"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring w-full rounded-sig bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-dawn disabled:opacity-60"
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="mt-6 text-sm text-charcoal/60">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-dawn hover:underline">Sign up</Link>
      </p>
    </div>
  )
}

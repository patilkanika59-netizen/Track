import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    if (data.session) {
      navigate('/dashboard')
    } else {
      setMessage('Check your inbox to confirm your email, then log in.')
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-dawn">get started</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Create your account</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-charcoal/70">Full name</label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="focus-ring mt-1 w-full rounded-xl border border-line bg-white/60 px-4 py-2.5 text-sm outline-none"
            placeholder="Jordan Lee"
          />
        </div>
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-ring mt-1 w-full rounded-xl border border-line bg-white/60 px-4 py-2.5 text-sm outline-none"
            placeholder="At least 6 characters"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-sage-700 text-sage">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring w-full rounded-sig bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-dawn disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-sm text-charcoal/60">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-dawn hover:underline">Log in</Link>
      </p>
    </div>
  )
}

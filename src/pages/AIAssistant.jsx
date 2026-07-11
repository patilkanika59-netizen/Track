import { useEffect, useRef, useState } from 'react'
import { supabase } from '../supabaseClient'

const SUGGESTIONS = [
  'How much water should I drink daily?',
  'How do I build a consistent sleep schedule?',
  'What\'s a realistic beginner workout routine?',
  'How do I reduce stress during a busy work week?',
]

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm your Rhythm assistant. Ask me anything about building healthier daily habits — sleep, movement, food, hydration, or stress.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text) {
    const question = (text ?? input).trim()
    if (!question || loading) return

    const nextMessages = [...messages, { role: 'user', content: question }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const { data, error: fnError } = await supabase.functions.invoke('ai-assistant', {
        body: { messages: nextMessages },
      })

      if (fnError) {
        const detail = await fnError.context?.json?.().catch(() => null)
        throw new Error(detail?.error || fnError.message)
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.message || 'Something went wrong reaching the assistant. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-dawn">ai assistant</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Ask about your health routine</h1>
      <p className="mt-2 text-sm text-charcoal/60">
        General guidance only — not a substitute for advice from a doctor or other qualified clinician.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="focus-ring rounded-sig border border-line px-3 py-1.5 text-xs text-charcoal/70 transition-colors hover:border-dawn hover:text-dawn"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 flex-1 space-y-4 rounded-2xl border border-line bg-white/50 p-5">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user' ? 'bg-ink text-paper' : 'bg-paper text-charcoal'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && <p className="text-xs text-charcoal/40">Assistant is thinking…</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }}
        className="mt-4 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about sleep, food, movement, stress…"
          className="focus-ring flex-1 rounded-sig border border-line bg-white px-4 py-2.5 text-sm outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="focus-ring rounded-sig bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-dawn disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </div>
  )
}
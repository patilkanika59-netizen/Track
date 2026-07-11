import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const linkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium transition-colors focus-ring ${
    isActive ? 'text-dawn' : 'text-charcoal/70 hover:text-charcoal'
  }`

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-dawn" />
          Rhythm
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/advantages" className={linkClass}>Advantages</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          {user && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
          {user && <NavLink to="/ai-assistant" className={linkClass}>AI Assistant</NavLink>}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <button
              onClick={handleSignOut}
              className="focus-ring rounded-sig border border-ink px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Sign out
            </button>
          ) : (
            <>
              <NavLink to="/login" className="focus-ring px-3 py-2 text-sm font-medium text-charcoal/70 hover:text-charcoal">
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className="focus-ring rounded-sig bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-dawn"
              >
                Get started
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

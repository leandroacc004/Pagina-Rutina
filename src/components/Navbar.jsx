import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const links = [
  { to: '/general', label: 'General' },
  { to: '/trabajo', label: 'Trabajo' },
  { to: '/universidad', label: 'Universidad' },
  { to: '/rutina', label: 'Rutina diaria' },
]

export default function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <nav className="flex flex-wrap gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {user && (
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <img src={user.photoURL} alt="" className="h-7 w-7 rounded-full" referrerPolicy="no-referrer" />
            )}
            <span className="hidden text-sm text-slate-400 sm:inline">{user.displayName}</span>
            <button
              onClick={signOut}
              className="rounded-lg px-2.5 py-1.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            >
              Salir
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

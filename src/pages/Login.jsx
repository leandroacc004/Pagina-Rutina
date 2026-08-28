import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { user, loading, signInWithGoogle } = useAuth()

  if (!loading && user) return <Navigate to="/general" replace />

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">Mi Rutina</h1>
        <p className="mt-1 text-sm text-slate-500">
          Trabajo, universidad y rutina diaria, todo en un solo lugar.
        </p>
      </div>
      <button
        onClick={signInWithGoogle}
        className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-500"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.87c2.27-2.09 3.55-5.17 3.55-8.65z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.94-2.92l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.09C3.26 21.3 7.31 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.27 14.27a7.2 7.2 0 010-4.54V6.64H1.28a12 12 0 000 10.72l3.99-3.09z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.76 0 3.35.6 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.28 6.64l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75z"
          />
        </svg>
        Continuar con Google
      </button>
    </div>
  )
}

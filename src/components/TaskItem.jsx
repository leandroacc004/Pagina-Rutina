import { formatFechaLimite } from '../utils/dateHelpers'

const PRIORIDAD_STYLES = {
  alta: 'bg-red-500/15 text-red-400 border-red-500/30',
  media: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  baja: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
}

const CATEGORIA_LABEL = {
  trabajo: 'Trabajo',
  universidad: 'Universidad',
  rutina: 'Rutina',
}

const CATEGORIA_STYLES = {
  trabajo: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  universidad: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  rutina: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
}

export default function TaskItem({ task, onToggle, onDelete, showCategoryBadge = false }) {
  const done = task.hechoHoy
  const fechaLimiteFmt = formatFechaLimite(task.fechaLimite)
  const vencida =
    !done && task.fechaLimite && task.fechaLimite < new Date().toISOString().slice(0, 10)

  return (
    <li
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition ${
        done
          ? 'border-slate-800 bg-slate-900/40'
          : 'border-slate-800 bg-slate-900'
      }`}
    >
      <button
        onClick={() => onToggle(task)}
        aria-label={done ? 'Marcar como pendiente' : 'Marcar como hecho'}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition ${
          done
            ? 'border-emerald-500 bg-emerald-500 text-slate-950'
            : 'border-slate-600 hover:border-slate-400'
        }`}
      >
        {done && (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className={`break-words ${done ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
          {task.titulo}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {showCategoryBadge && (
            <span
              className={`rounded-full border px-2 py-0.5 text-xs ${CATEGORIA_STYLES[task.categoria]}`}
            >
              {CATEGORIA_LABEL[task.categoria]}
            </span>
          )}
          {task.esRecurrente && (
            <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
              ↻ diaria
            </span>
          )}
          <span
            className={`rounded-full border px-2 py-0.5 text-xs ${PRIORIDAD_STYLES[task.prioridad]}`}
          >
            {task.prioridad}
          </span>
          {fechaLimiteFmt && (
            <span
              className={`rounded-full border px-2 py-0.5 text-xs ${
                vencida
                  ? 'border-red-500/30 bg-red-500/15 text-red-400'
                  : 'border-slate-700 bg-slate-800 text-slate-400'
              }`}
            >
              {vencida ? 'Venció' : 'Vence'} {fechaLimiteFmt}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        aria-label="Eliminar tarea"
        className="shrink-0 rounded-lg p-1.5 text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 006 3.75v.25H3a.75.75 0 000 1.5h.276l.66 10.55A2.75 2.75 0 006.68 18.75h6.64a2.75 2.75 0 002.744-2.7l.66-10.8H17a.75.75 0 000-1.5h-3v-.25A2.75 2.75 0 0011.25 1h-2.5zM10 8.25a.75.75 0 01.75.75v5a.75.75 0 01-1.5 0v-5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  )
}

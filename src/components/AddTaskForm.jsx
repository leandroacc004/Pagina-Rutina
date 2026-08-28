import { useState } from 'react'

// showRecurrenteToggle: true solo en la sección de Rutina diaria, donde el
// usuario define si el ítem se repite todos los días o es de un solo uso.
export default function AddTaskForm({ onAdd, showRecurrenteToggle = false }) {
  const [open, setOpen] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [prioridad, setPrioridad] = useState('media')
  const [fechaLimite, setFechaLimite] = useState('')
  const [esRecurrente, setEsRecurrente] = useState(showRecurrenteToggle)

  function reset() {
    setTitulo('')
    setPrioridad('media')
    setFechaLimite('')
    setEsRecurrente(showRecurrenteToggle)
    setOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!titulo.trim()) return
    await onAdd({ titulo: titulo.trim(), prioridad, fechaLimite, esRecurrente })
    reset()
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 py-3 text-sm text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Agregar pendiente
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-900 p-4"
    >
      <input
        autoFocus
        type="text"
        placeholder="¿Qué necesitas hacer?"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-slate-500"
      />

      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col gap-1 text-xs text-slate-400">
          Prioridad
          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm text-slate-100 outline-none focus:border-slate-500"
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-slate-400">
          Fecha límite (opcional)
          <input
            type="date"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm text-slate-100 outline-none focus:border-slate-500"
          />
        </label>

        {showRecurrenteToggle && (
          <label className="flex flex-col gap-1 text-xs text-slate-400">
            Tipo
            <select
              value={esRecurrente ? 'fija' : 'puntual'}
              onChange={(e) => setEsRecurrente(e.target.value === 'fija')}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm text-slate-100 outline-none focus:border-slate-500"
            >
              <option value="fija">↻ Se repite cada día</option>
              <option value="puntual">Solo por hoy</option>
            </select>
          </label>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-white"
        >
          Agregar
        </button>
      </div>
    </form>
  )
}

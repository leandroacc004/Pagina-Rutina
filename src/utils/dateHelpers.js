// Fecha local en formato YYYY-MM-DD (evitamos usar toISOString porque
// convierte a UTC y puede "cambiar de día" cerca de la medianoche).
export function todayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// Una tarea recurrente (rutina fija) se considera "hecha" solo si la
// marcaste HOY. Si la marcaste ayer, hoy vuelve a verse como pendiente,
// sin necesidad de ningún proceso en el servidor que la reinicie.
export function isTaskDoneToday(task) {
  if (task.esRecurrente) {
    return task.ultimaFechaCompletada === todayStr()
  }
  return task.estado === 'hecho'
}

export function formatFechaLimite(fechaLimite) {
  if (!fechaLimite) return null
  const [y, m, d] = fechaLimite.split('-')
  return `${d}/${m}/${y}`
}

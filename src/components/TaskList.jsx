import TaskItem from './TaskItem'
import AddTaskForm from './AddTaskForm'

// tasks ya vienen filtradas por categoría (o todas, para la vista General).
// Las "hechas" se separan y colapsan abajo para que el pendiente
// realmente desaparezca de la vista principal, tal como se pidió.
export default function TaskList({
  tasks,
  loading,
  onAdd,
  onToggle,
  onDelete,
  showCategoryBadge = false,
  showRecurrenteToggle = false,
  emptyMessage = 'No tienes nada pendiente aquí. ✨',
}) {
  const pendientes = tasks.filter((t) => !t.hechoHoy)
  const hechas = tasks.filter((t) => t.hechoHoy)

  return (
    <div className="flex flex-col gap-6">
      {onAdd && <AddTaskForm onAdd={onAdd} showRecurrenteToggle={showRecurrenteToggle} />}

      {loading ? (
        <p className="text-sm text-slate-500">Cargando…</p>
      ) : pendientes.length === 0 && hechas.length === 0 ? (
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        <>
          {pendientes.length > 0 && (
            <ul className="flex flex-col gap-2">
              {pendientes.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  showCategoryBadge={showCategoryBadge}
                />
              ))}
            </ul>
          )}

          {hechas.length > 0 && (
            <details className="group">
              <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-300">
                Hechas ({hechas.length})
              </summary>
              <ul className="mt-2 flex flex-col gap-2">
                {hechas.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    showCategoryBadge={showCategoryBadge}
                  />
                ))}
              </ul>
            </details>
          )}
        </>
      )}
    </div>
  )
}

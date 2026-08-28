import { useTasks } from '../hooks/useTasks'
import TaskList from '../components/TaskList'
import AddTaskForm from '../components/AddTaskForm'

export default function Rutina() {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks('rutina')

  const fijas = tasks.filter((t) => t.esRecurrente)
  const puntuales = tasks.filter((t) => !t.esRecurrente)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-1 text-xl font-semibold text-slate-100">Rutina diaria</h1>
      <p className="mb-6 text-sm text-slate-500">
        Los checks fijos se repiten cada día. Los puntuales son solo para hoy.
      </p>

      <AddTaskForm
        onAdd={(data) => addTask({ ...data, categoria: 'rutina' })}
        showRecurrenteToggle
      />

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Checks fijos ↻
        </h2>
        <TaskList
          tasks={fijas}
          loading={loading}
          onToggle={toggleTask}
          onDelete={deleteTask}
          emptyMessage="Aún no defines checks fijos para tu rutina."
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Pendientes de hoy
        </h2>
        <TaskList
          tasks={puntuales}
          loading={loading}
          onToggle={toggleTask}
          onDelete={deleteTask}
          emptyMessage="No tienes pendientes puntuales por hoy."
        />
      </section>
    </div>
  )
}

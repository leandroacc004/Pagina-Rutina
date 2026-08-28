import { useTasks } from '../hooks/useTasks'
import TaskList from '../components/TaskList'

export default function General() {
  const { tasks, loading, toggleTask, deleteTask } = useTasks(null)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-1 text-xl font-semibold text-slate-100">General</h1>
      <p className="mb-6 text-sm text-slate-500">Todo lo tuyo: trabajo, universidad y rutina, junto.</p>

      <TaskList
        tasks={tasks}
        loading={loading}
        onToggle={toggleTask}
        onDelete={deleteTask}
        showCategoryBadge
        emptyMessage="No tienes nada pendiente en ningún lado. ✨"
      />
    </div>
  )
}

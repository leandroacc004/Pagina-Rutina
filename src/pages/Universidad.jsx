import { useTasks } from '../hooks/useTasks'
import TaskList from '../components/TaskList'

export default function Universidad() {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks('universidad')

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold text-slate-100">Universidad</h1>
      <TaskList
        tasks={tasks}
        loading={loading}
        onAdd={(data) => addTask({ ...data, categoria: 'universidad' })}
        onToggle={toggleTask}
        onDelete={deleteTask}
        emptyMessage="No tienes pendientes de la universidad. ✨"
      />
    </div>
  )
}

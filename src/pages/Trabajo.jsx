import { useTasks } from '../hooks/useTasks'
import TaskList from '../components/TaskList'

export default function Trabajo() {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks('trabajo')

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold text-slate-100">Trabajo</h1>
      <TaskList
        tasks={tasks}
        loading={loading}
        onAdd={(data) => addTask({ ...data, categoria: 'trabajo' })}
        onToggle={toggleTask}
        onDelete={deleteTask}
        emptyMessage="No tienes pendientes de trabajo. ✨"
      />
    </div>
  )
}

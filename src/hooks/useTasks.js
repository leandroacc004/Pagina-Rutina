import { useEffect, useMemo, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { isTaskDoneToday, todayStr } from '../utils/dateHelpers'

// categoria: 'trabajo' | 'universidad' | 'rutina' | null (null = todas, para la vista General)
export function useTasks(categoria = null) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setTasks([])
      setLoading(false)
      return
    }

    const tareasRef = collection(db, 'usuarios', user.uid, 'tareas')
    const q = categoria
      ? query(tareasRef, where('categoria', '==', categoria), orderBy('fechaCreacion', 'desc'))
      : query(tareasRef, orderBy('fechaCreacion', 'desc'))

    setLoading(true)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rows = snapshot.docs.map((d) => {
          const data = d.data()
          return { id: d.id, ...data, hechoHoy: isTaskDoneToday(data) }
        })
        setTasks(rows)
        setLoading(false)
      },
      (error) => {
        console.error('Error leyendo tareas:', error)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [user, categoria])

  const actions = useMemo(
    () => ({
      async addTask({ titulo, categoria, prioridad = 'media', fechaLimite = null, esRecurrente = false }) {
        if (!user) return
        const tareasRef = collection(db, 'usuarios', user.uid, 'tareas')
        await addDoc(tareasRef, {
          titulo,
          categoria,
          prioridad,
          fechaLimite: fechaLimite || null,
          esRecurrente,
          estado: 'pendiente',
          ultimaFechaCompletada: null,
          fechaCreacion: serverTimestamp(),
        })
      },

      async toggleTask(task) {
        if (!user) return
        const ref = doc(db, 'usuarios', user.uid, 'tareas', task.id)
        if (task.esRecurrente) {
          // Si ya está hecha hoy, desmarcarla; si no, marcarla como hecha hoy.
          const yaHechaHoy = task.ultimaFechaCompletada === todayStr()
          await updateDoc(ref, {
            ultimaFechaCompletada: yaHechaHoy ? null : todayStr(),
          })
        } else {
          await updateDoc(ref, {
            estado: task.estado === 'hecho' ? 'pendiente' : 'hecho',
          })
        }
      },

      async deleteTask(taskId) {
        if (!user) return
        await deleteDoc(doc(db, 'usuarios', user.uid, 'tareas', taskId))
      },
    }),
    [user],
  )

  return { tasks, loading, ...actions }
}

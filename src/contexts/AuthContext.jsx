import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signInAnonymously,
  deleteUser,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { collection, getDocs, writeBatch } from 'firebase/firestore'
import { auth, googleProvider, db } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // Cuenta real: la sesión se recuerda entre cierres del navegador.
  const signInWithGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence)
    return signInWithPopup(auth, googleProvider)
  }

  // Modo invitado: cuenta anónima real de Firebase (tiene su propio uid y
  // sus propias tareas aisladas), pero con persistencia de solo-sesión:
  // al cerrar la pestaña/navegador, la próxima vez vuelve a pedir login.
  const signInAsGuest = async () => {
    await setPersistence(auth, browserSessionPersistence)
    return signInAnonymously(auth)
  }

  const signOut = async () => {
    const current = auth.currentUser
    if (current?.isAnonymous) {
      // Limpieza: borramos las tareas de prueba y la cuenta anónima para
      // no dejar datos huérfanos acumulándose en Firestore.
      try {
        const tareasRef = collection(db, 'usuarios', current.uid, 'tareas')
        const snapshot = await getDocs(tareasRef)
        const batch = writeBatch(db)
        snapshot.docs.forEach((d) => batch.delete(d.ref))
        await batch.commit()
        await deleteUser(current)
      } catch (err) {
        console.error('Error limpiando la sesión de invitado:', err)
        await firebaseSignOut(auth)
      }
    } else {
      await firebaseSignOut(auth)
    }
  }

  const isGuest = !!user?.isAnonymous

  return (
    <AuthContext.Provider
      value={{ user, loading, isGuest, signInWithGoogle, signInAsGuest, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}

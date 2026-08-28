import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Trabajo from './pages/Trabajo'
import Universidad from './pages/Universidad'
import Rutina from './pages/Rutina'
import General from './pages/General'

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      {children}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/general"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <General />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trabajo"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Trabajo />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/universidad"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Universidad />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/rutina"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Rutina />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/general" replace />} />
          <Route path="*" element={<Navigate to="/general" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Guards authenticated routes. Redirects:
//  - not logged in        -> /login
//  - logged in, no profile -> /onboarding (must finish setup first)
export default function ProtectedRoute({ children, requireProfile = true }) {
  const { isAuthed, hasProfile, ready } = useAuth()
  const location = useLocation()

  if (!ready) return null // wait for session restore

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (requireProfile && !hasProfile) {
    return <Navigate to="/onboarding" replace />
  }

  return children
}

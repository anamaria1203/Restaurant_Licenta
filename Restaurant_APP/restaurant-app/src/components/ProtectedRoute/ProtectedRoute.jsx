import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) return <Navigate to="/login?mod=login" replace />
  return children
}

export const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) return <Navigate to="/admin-login?mod=login" replace />
  if (user.tip !== 'manager') return <Navigate to="/" replace />
  return children
}

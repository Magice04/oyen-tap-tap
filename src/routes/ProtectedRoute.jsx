import { Navigate, useLocation } from "react-router-dom"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import { PhoneLayout } from "../components/AppLayout"
import { hasFirebaseConfig } from "../firebase"
import { useAuth } from "../context/useAuth"

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const { currentUser, loading } = useAuth()

  if (!hasFirebaseConfig) {
    return (
      <PhoneLayout showNav={false}>
        <EmptyState
          icon="🔥"
          title="Firebase config missing"
          message="Create .env.local in the project root, then restart npm run dev."
          actionText="Back Home"
          actionTo="/"
        />
      </PhoneLayout>
    )
  }

  if (loading) {
    return (
      <PhoneLayout showNav={false}>
        <LoadingState label="Checking owner session..." />
      </PhoneLayout>
    )
  }

  if (!currentUser) {
    return <Navigate to="/owner/login" replace state={{ from: location }} />
  }

  return children
}

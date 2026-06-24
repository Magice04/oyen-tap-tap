import { useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"
import { hasFirebaseConfig } from "../../firebase"
import { useAuth } from "../../context/useAuth"

function getAuthErrorMessage(error) {
  if (error?.code === "auth/invalid-credential") {
    return "Email or password is wrong. Check the account first."
  }

  if (error?.code === "auth/user-not-found") {
    return "No owner account found for this email. Register first."
  }

  if (error?.code === "auth/wrong-password") {
    return "Wrong password."
  }

  if (error?.code === "auth/too-many-requests") {
    return "Firebase blocked login temporarily after too many attempts. Wait and try again."
  }

  if (error?.code === "auth/configuration-not-found" || error?.code === "auth/operation-not-allowed") {
    return "Enable Email/Password sign-in in Firebase Authentication first."
  }

  return error?.message || "Login failed."
}

export default function OwnerLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser, loginOwner } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectTo = location.state?.from?.pathname || "/owner/dashboard"

  if (currentUser) {
    return <Navigate to={redirectTo} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      await loginOwner({ email, password })
      navigate(redirectTo, { replace: true })
    } catch (loginError) {
      setError(getAuthErrorMessage(loginError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PhoneLayout showNav={false}>
      <PageHeader title="Oyen Tap Tap" eyebrow="Owner Login" backTo="/" />

      <section className="soft-card">
        <h1 className="text-2xl font-black">Welcome back</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          Log in to manage your cats, lost mode, reports, and PawPrint Journal.
        </p>

        {!hasFirebaseConfig ? (
          <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
            Firebase config is missing. Put .env.local in the project root and restart npm run dev.
          </div>
        ) : null}

        {error ? (
          <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-bold text-stone-700">
            Email
            <input
              className="input-field mt-2"
              placeholder="owner@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="block text-sm font-bold text-stone-700">
            Password
            <input
              className="input-field mt-2"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>

          <ActionButton className="w-full" disabled={isSubmitting || !hasFirebaseConfig} type="submit">
            {isSubmitting ? "Logging in..." : "Login"}
          </ActionButton>
        </form>

        <p className="mt-6 text-center text-sm text-stone-500">
          No owner account yet?{" "}
          <Link className="font-black text-paw" to="/owner/register">
            Register
          </Link>
        </p>
      </section>
    </PhoneLayout>
  )
}

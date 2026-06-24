import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"
import { hasFirebaseConfig } from "../../firebase"
import { useAuth } from "../../context/useAuth"

function getRegisterErrorMessage(error) {
  if (error?.code === "auth/email-already-in-use") {
    return "That email already has an owner account. Log in instead."
  }

  if (error?.code === "auth/weak-password") {
    return "Password must be at least 6 characters."
  }

  if (error?.code === "auth/invalid-email") {
    return "Use a valid email address."
  }

  if (error?.code === "auth/configuration-not-found" || error?.code === "auth/operation-not-allowed") {
    return "Enable Email/Password sign-in in Firebase Authentication first."
  }

  return error?.message || "Registration failed."
}

export default function OwnerRegister() {
  const navigate = useNavigate()
  const { registerOwner } = useAuth()
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsSubmitting(true)

    try {
      await registerOwner({ displayName, email, password })
      navigate("/owner/dashboard", { replace: true })
    } catch (registerError) {
      setError(getRegisterErrorMessage(registerError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PhoneLayout showNav={false}>
      <PageHeader title="Create owner account" eyebrow="Owner Register" backTo="/owner/login" />

      <section className="soft-card">
        <h1 className="text-2xl font-black">Start your cat dashboard</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          This creates a Firebase Auth user and saves an owner profile in the users collection.
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
            Display name
            <input
              className="input-field mt-2"
              placeholder="Aisyah"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              required
            />
          </label>

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
              placeholder="Minimum 6 characters"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>

          <label className="block text-sm font-bold text-stone-700">
            Confirm password
            <input
              className="input-field mt-2"
              placeholder="Repeat password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>

          <ActionButton className="w-full" disabled={isSubmitting || !hasFirebaseConfig} type="submit">
            {isSubmitting ? "Creating account..." : "Create Account"}
          </ActionButton>
        </form>

        <p className="mt-6 text-center text-sm text-stone-500">
          Already registered?{" "}
          <Link className="font-black text-paw" to="/owner/login">
            Login
          </Link>
        </p>
      </section>
    </PhoneLayout>
  )
}

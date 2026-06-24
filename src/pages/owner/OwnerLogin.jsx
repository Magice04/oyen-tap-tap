import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"

export default function OwnerLogin() {
  return (
    <PhoneLayout showNav={false}>
      <PageHeader title="Oyen Tap Tap" eyebrow="Owner Login" backTo="/" />
      <section className="soft-card">
        <h1 className="text-2xl font-black">Welcome back</h1>
        <p className="mt-2 text-sm text-stone-500">Firebase Auth wiring is next after the public profile read test.</p>
        <div className="mt-6 space-y-4">
          <input className="input-field" placeholder="Email" type="email" />
          <input className="input-field" placeholder="Password" type="password" />
          <ActionButton to="/owner/dashboard" className="w-full">Continue Demo</ActionButton>
          <ActionButton to="/owner/register" variant="ghost" className="w-full">Create Account</ActionButton>
        </div>
      </section>
    </PhoneLayout>
  )
}

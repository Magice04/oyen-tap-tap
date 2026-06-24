import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"

export default function OwnerRegister() {
  return (
    <PhoneLayout showNav={false}>
      <PageHeader title="Create owner account" eyebrow="Owner Register" backTo="/owner/login" />
      <section className="soft-card space-y-4">
        <input className="input-field" placeholder="Display name" />
        <input className="input-field" placeholder="Email" type="email" />
        <input className="input-field" placeholder="Password" type="password" />
        <ActionButton to="/owner/dashboard" className="w-full">Create Demo Account</ActionButton>
        <p className="text-center text-xs leading-5 text-stone-500">Real Firebase Auth registration is Phase 4.</p>
      </section>
    </PhoneLayout>
  )
}

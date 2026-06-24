import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"

export default function LostMode() {
  return (
    <PhoneLayout>
      <PageHeader title="Activate Lost Mode" eyebrow="Safety" backTo="/owner/cats/demo_oyen_001" />
      <section className="soft-card space-y-4">
        <p className="text-sm leading-6 text-stone-600">Once activated, the public NFC profile will show as a lost cat alert.</p>
        <input className="input-field" defaultValue="Section 7, Shah Alam" placeholder="Last seen location" />
        <input className="input-field" defaultValue="24 May 2025, 8:30 PM" placeholder="Last seen date and time" />
        <textarea className="input-field min-h-28 resize-none" defaultValue="Wearing a blue collar with bell." />
        <textarea className="input-field min-h-28 resize-none" defaultValue="Please approach slowly and contact owner." />
        <ActionButton to="/cat/oyen-123" variant="danger" className="w-full">Preview Lost Public Profile</ActionButton>
      </section>
    </PhoneLayout>
  )
}

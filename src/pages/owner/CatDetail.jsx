import ActionButton from "../../components/ActionButton"
import CatCard from "../../components/CatCard"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"
import { demoCat } from "../../data/demoData"

export default function CatDetail() {
  return (
    <PhoneLayout>
      <PageHeader title="Cat Profile" eyebrow="Owner View" backTo="/owner/cats" />
      <CatCard cat={demoCat} />
      <section className="mt-4 soft-card">
        <h2 className="text-lg font-black">Profile Notes</h2>
        <div className="mt-4 space-y-3 text-sm">
          <p className="rounded-2xl bg-orange-50 p-4"><strong>Allergies:</strong> {demoCat.allergies}</p>
          <p className="rounded-2xl bg-orange-50 p-4"><strong>Diet:</strong> {demoCat.dietaryNotes}</p>
          <p className="rounded-2xl bg-orange-50 p-4"><strong>Emergency:</strong> {demoCat.emergencyInstructions}</p>
        </div>
      </section>
      <div className="mt-4 grid gap-3">
        <ActionButton to="/cat/oyen-123">View Public Profile</ActionButton>
        <ActionButton to="/owner/cats/demo_oyen_001/lost-mode" variant="danger">Manage Lost Mode</ActionButton>
      </div>
    </PhoneLayout>
  )
}

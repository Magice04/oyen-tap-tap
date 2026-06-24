import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"

export default function AddCat() {
  return (
    <PhoneLayout>
      <PageHeader title="Add New Cat" eyebrow="Cat Profile" backTo="/owner/cats" />
      <section className="soft-card space-y-4">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-orange-100 text-4xl">📷</div>
        <input className="input-field" placeholder="Name, e.g. Oyen" />
        <input className="input-field" placeholder="Breed" />
        <input className="input-field" placeholder="Color" />
        <input className="input-field" placeholder="Age" />
        <textarea className="input-field min-h-28 resize-none" placeholder="Personality and notes" />
        <ActionButton to="/owner/cats" className="w-full">Save Demo Cat</ActionButton>
        <p className="text-center text-xs leading-5 text-stone-500">Firestore create cat comes after owner auth.</p>
      </section>
    </PhoneLayout>
  )
}

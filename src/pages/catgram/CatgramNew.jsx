import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"

const postTypes = ["normal", "lost", "found", "sighting", "help"]

export default function CatgramNew() {
  return (
    <PhoneLayout>
      <PageHeader title="New Post" eyebrow="Catgram" backTo="/catgram" />
      <section className="soft-card space-y-4">
        <div>
          <p className="label-text">Post Type</p>
          <div className="grid grid-cols-5 gap-2">
            {postTypes.map((type) => (
              <button key={type} className="rounded-2xl bg-orange-50 px-2 py-3 text-xs font-bold capitalize text-stone-600" type="button">
                {type}
              </button>
            ))}
          </div>
        </div>
        <select className="input-field" defaultValue="demo_oyen_001">
          <option value="demo_oyen_001">Oyen</option>
          <option value="">No linked cat</option>
        </select>
        <textarea className="input-field min-h-32 resize-none" placeholder="Write something about your cat..." />
        <button className="rounded-2xl border border-dashed border-orange-200 bg-orange-50 px-4 py-5 text-sm font-bold text-stone-500" type="button">
          📷 Add Photo
        </button>
        <ActionButton to="/catgram" variant="purple" className="w-full">Post Demo</ActionButton>
        <p className="text-center text-xs leading-5 text-stone-500">Firestore post creation is Phase 8.</p>
      </section>
    </PhoneLayout>
  )
}

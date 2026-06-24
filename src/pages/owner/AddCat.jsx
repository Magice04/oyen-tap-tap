import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"
import { useAuth } from "../../context/useAuth"
import { createOwnerCat } from "../../services/cats"

const initialForm = {
  name: "",
  photoUrl: "",
  breed: "",
  color: "",
  age: "",
  gender: "male",
  personality: "",
  distinctiveMarks: "",
  medicalNotes: "",
  allergies: "",
  dietaryNotes: "",
  emergencyInstructions: "Approach slowly. Do not chase. Contact owner if found.",
  nfcActive: true,
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1 text-sm font-bold text-stone-600">
      {label}
      {children}
    </label>
  )
}

export default function AddCat() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [form, setForm] = useState(initialForm)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setIsSaving(true)

    try {
      const cat = await createOwnerCat(currentUser.uid, form)
      navigate(`/owner/cats/${cat.id}`)
    } catch (saveError) {
      setError(saveError.message || "Could not save cat profile.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <PhoneLayout>
      <PageHeader
        title="Add New Cat"
        eyebrow="Cat Profile"
        subtitle="Create the owner record first. The public NFC profile URL is generated automatically."
        backTo="/owner/cats"
      />

      <form className="soft-card space-y-4" onSubmit={handleSubmit}>
        <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-orange-100 text-4xl">
          {form.photoUrl ? <img className="h-full w-full object-cover" src={form.photoUrl} alt="Cat preview" /> : "📷"}
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-3 text-sm font-semibold leading-6 text-red-700">
            {error}
          </div>
        ) : null}

        <Field label="Cat name *">
          <input
            className="input-field"
            placeholder="e.g. Oyen"
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </Field>

        <Field label="Photo URL">
          <input
            className="input-field"
            placeholder="Paste image URL for now. Storage comes later."
            value={form.photoUrl}
            onChange={(event) => updateField("photoUrl", event.target.value)}
          />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Breed">
            <input
              className="input-field"
              placeholder="Domestic Shorthair"
              value={form.breed}
              onChange={(event) => updateField("breed", event.target.value)}
            />
          </Field>

          <Field label="Color">
            <input
              className="input-field"
              placeholder="Orange"
              value={form.color}
              onChange={(event) => updateField("color", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Age">
            <input
              className="input-field"
              placeholder="2 years old"
              value={form.age}
              onChange={(event) => updateField("age", event.target.value)}
            />
          </Field>

          <Field label="Gender">
            <select className="input-field" value={form.gender} onChange={(event) => updateField("gender", event.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
          </Field>
        </div>

        <Field label="Personality">
          <textarea
            className="input-field min-h-24 resize-none"
            placeholder="Friendly, playful, food motivated..."
            value={form.personality}
            onChange={(event) => updateField("personality", event.target.value)}
          />
        </Field>

        <Field label="Distinctive marks">
          <input
            className="input-field"
            placeholder="Small white patch under chin"
            value={form.distinctiveMarks}
            onChange={(event) => updateField("distinctiveMarks", event.target.value)}
          />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Medical notes">
            <textarea
              className="input-field min-h-24 resize-none"
              placeholder="No major medical issues"
              value={form.medicalNotes}
              onChange={(event) => updateField("medicalNotes", event.target.value)}
            />
          </Field>

          <Field label="Allergies">
            <textarea
              className="input-field min-h-24 resize-none"
              placeholder="Chicken"
              value={form.allergies}
              onChange={(event) => updateField("allergies", event.target.value)}
            />
          </Field>
        </div>

        <Field label="Dietary notes">
          <textarea
            className="input-field min-h-24 resize-none"
            placeholder="Loves wet food"
            value={form.dietaryNotes}
            onChange={(event) => updateField("dietaryNotes", event.target.value)}
          />
        </Field>

        <Field label="Emergency finder instructions">
          <textarea
            className="input-field min-h-28 resize-none"
            value={form.emergencyInstructions}
            onChange={(event) => updateField("emergencyInstructions", event.target.value)}
          />
        </Field>

        <label className="flex items-center justify-between gap-4 rounded-2xl bg-orange-50 p-4 text-sm font-bold text-stone-700">
          NFC profile active
          <input
            className="h-5 w-5 accent-orange-500"
            type="checkbox"
            checked={form.nfcActive}
            onChange={(event) => updateField("nfcActive", event.target.checked)}
          />
        </label>

        <ActionButton disabled={isSaving} className="w-full">
          {isSaving ? "Saving cat..." : "Save Cat Profile"}
        </ActionButton>
      </form>
    </PhoneLayout>
  )
}

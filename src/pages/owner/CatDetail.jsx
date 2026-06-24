import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ActionButton from "../../components/ActionButton"
import CatCard from "../../components/CatCard"
import EmptyState from "../../components/EmptyState"
import LoadingState from "../../components/LoadingState"
import PageHeader from "../../components/PageHeader"
import StatusBadge from "../../components/StatusBadge"
import { PhoneLayout } from "../../components/AppLayout"
import { useAuth } from "../../context/useAuth"
import { getOwnerCatById, markCatSafe, updateOwnerCat } from "../../services/cats"

function buildForm(cat) {
  return {
    name: cat.name || "",
    photoUrl: cat.photoUrl || "",
    breed: cat.breed || "",
    color: cat.color || "",
    age: cat.age || "",
    gender: cat.gender || "unknown",
    personality: cat.personality || "",
    distinctiveMarks: cat.distinctiveMarks || "",
    medicalNotes: cat.medicalNotes || "",
    allergies: cat.allergies || "",
    dietaryNotes: cat.dietaryNotes || "",
    emergencyInstructions: cat.emergencyInstructions || "",
    nfcActive: Boolean(cat.nfcActive),
  }
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 rounded-2xl bg-orange-50 px-4 py-3">
      <dt className="font-bold text-stone-500">{label}</dt>
      <dd className="text-right text-stone-700">{value || "Not provided"}</dd>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1 text-sm font-bold text-stone-600">
      {label}
      {children}
    </label>
  )
}

export default function CatDetail() {
  const { catId } = useParams()
  const { currentUser } = useAuth()
  const [cat, setCat] = useState(null)
  const [form, setForm] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadCat() {
      setIsLoading(true)
      setError("")

      try {
        const result = await getOwnerCatById(catId, currentUser.uid)

        if (!isMounted) {
          return
        }

        setCat(result)
        setForm(result ? buildForm(result) : null)
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Could not load cat profile.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCat()

    return () => {
      isMounted = false
    }
  }, [catId, currentUser.uid])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSave(event) {
    event.preventDefault()
    setError("")
    setIsSaving(true)

    try {
      const updatedCat = await updateOwnerCat(catId, currentUser.uid, form)
      setCat((current) => ({ ...current, ...updatedCat }))
      setForm(buildForm({ ...cat, ...updatedCat }))
      setIsEditing(false)
    } catch (saveError) {
      setError(saveError.message || "Could not update cat profile.")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleMarkSafe() {
    setError("")
    setIsSaving(true)

    try {
      await markCatSafe(catId, currentUser.uid)
      setCat((current) => ({ ...current, status: "safe", lostMode: null }))
    } catch (saveError) {
      setError(saveError.message || "Could not mark this cat as safe.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <PhoneLayout>
        <PageHeader title="Cat Profile" eyebrow="Owner View" backTo="/owner/cats" />
        <LoadingState label="Loading cat profile..." />
      </PhoneLayout>
    )
  }

  if (error && !cat) {
    return (
      <PhoneLayout>
        <PageHeader title="Cat Profile" eyebrow="Owner View" backTo="/owner/cats" />
        <EmptyState title="Could not load cat" message={error} actionLabel="Back to My Cats" actionTo="/owner/cats" />
      </PhoneLayout>
    )
  }

  if (!cat) {
    return (
      <PhoneLayout>
        <PageHeader title="Cat not found" eyebrow="Owner View" backTo="/owner/cats" />
        <EmptyState
          icon="🐾"
          title="No cat profile here"
          message="This cat ID does not exist, or it does not belong to the logged-in owner."
          actionLabel="Back to My Cats"
          actionTo="/owner/cats"
        />
      </PhoneLayout>
    )
  }

  return (
    <PhoneLayout>
      <PageHeader
        title={isEditing ? "Edit Cat Profile" : "Cat Profile"}
        eyebrow="Owner View"
        backTo="/owner/cats"
        action={
          <button
            className="rounded-full bg-white px-4 py-2 text-sm font-black text-paw shadow-card"
            type="button"
            onClick={() => setIsEditing((current) => !current)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        }
      />

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 p-3 text-sm font-semibold leading-6 text-red-700">
          {error}
        </div>
      ) : null}

      {!isEditing ? (
        <>
          <CatCard cat={cat} />

          <section className="mt-4 soft-card">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black">Profile Notes</h2>
              <StatusBadge value={cat.status}>{cat.status}</StatusBadge>
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <InfoRow label="Public ID" value={cat.publicId} />
              <InfoRow label="Gender" value={cat.gender} />
              <InfoRow label="Distinctive mark" value={cat.distinctiveMarks} />
              <InfoRow label="Allergies" value={cat.allergies} />
              <InfoRow label="Diet" value={cat.dietaryNotes} />
              <InfoRow label="Medical" value={cat.medicalNotes} />
              <InfoRow label="NFC Tag" value={cat.nfcActive ? "Active" : "Inactive"} />
            </dl>
          </section>

          {cat.emergencyInstructions ? (
            <section className="mt-4 soft-card border-orange-200 bg-orange-50">
              <h2 className="text-lg font-black">Finder Instructions</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{cat.emergencyInstructions}</p>
            </section>
          ) : null}

          {cat.status === "lost" && cat.lostMode ? (
            <section className="mt-4 soft-card border-red-100 bg-red-50">
              <h2 className="text-lg font-black text-red-700">Lost Mode Active</h2>
              <p className="mt-2 text-sm leading-6 text-red-700">
                Last seen near {cat.lostMode.lastSeenLocationText || "an unknown location"}.
              </p>
              {cat.lostMode.description ? <p className="mt-2 text-sm leading-6 text-red-700">{cat.lostMode.description}</p> : null}
            </section>
          ) : null}

          <div className="mt-4 grid gap-3">
            {cat.publicId ? <ActionButton to={`/cat/${cat.publicId}`}>View Public Profile</ActionButton> : null}
            <ActionButton to={`/owner/cats/${cat.id}/lost-mode`} variant={cat.status === "lost" ? "ghost" : "danger"}>
              {cat.status === "lost" ? "Manage Lost Mode" : "Activate Lost Mode"}
            </ActionButton>
            {cat.status === "lost" ? (
              <ActionButton disabled={isSaving} onClick={handleMarkSafe} variant="mint">
                {isSaving ? "Updating..." : "Mark Cat as Safe"}
              </ActionButton>
            ) : null}
          </div>
        </>
      ) : null}

      {isEditing && form ? (
        <form className="soft-card space-y-4" onSubmit={handleSave}>
          <Field label="Cat name *">
            <input
              className="input-field"
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </Field>

          <Field label="Photo URL">
            <input
              className="input-field"
              value={form.photoUrl}
              onChange={(event) => updateField("photoUrl", event.target.value)}
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Breed">
              <input
                className="input-field"
                value={form.breed}
                onChange={(event) => updateField("breed", event.target.value)}
              />
            </Field>

            <Field label="Color">
              <input
                className="input-field"
                value={form.color}
                onChange={(event) => updateField("color", event.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Age">
              <input className="input-field" value={form.age} onChange={(event) => updateField("age", event.target.value)} />
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
              value={form.personality}
              onChange={(event) => updateField("personality", event.target.value)}
            />
          </Field>

          <Field label="Distinctive marks">
            <input
              className="input-field"
              value={form.distinctiveMarks}
              onChange={(event) => updateField("distinctiveMarks", event.target.value)}
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Medical notes">
              <textarea
                className="input-field min-h-24 resize-none"
                value={form.medicalNotes}
                onChange={(event) => updateField("medicalNotes", event.target.value)}
              />
            </Field>

            <Field label="Allergies">
              <textarea
                className="input-field min-h-24 resize-none"
                value={form.allergies}
                onChange={(event) => updateField("allergies", event.target.value)}
              />
            </Field>
          </div>

          <Field label="Dietary notes">
            <textarea
              className="input-field min-h-24 resize-none"
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
            {isSaving ? "Saving changes..." : "Save Changes"}
          </ActionButton>
        </form>
      ) : null}
    </PhoneLayout>
  )
}

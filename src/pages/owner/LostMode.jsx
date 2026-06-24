import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ActionButton from "../../components/ActionButton"
import EmptyState from "../../components/EmptyState"
import LoadingState from "../../components/LoadingState"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"
import { useAuth } from "../../context/useAuth"
import { activateLostMode, getOwnerCatById, markCatSafe } from "../../services/cats"

function defaultForm(cat) {
  return {
    lastSeenLocationText: cat?.lostMode?.lastSeenLocationText || "",
    lastSeenAtText: cat?.lostMode?.lastSeenAtText || "",
    description: cat?.lostMode?.description || "Wearing a collar with NFC tag.",
    finderInstructions: cat?.lostMode?.finderInstructions || cat?.emergencyInstructions || "Please approach slowly and contact owner.",
  }
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1 text-sm font-bold text-stone-600">
      {label}
      {children}
    </label>
  )
}

export default function LostMode() {
  const { catId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [cat, setCat] = useState(null)
  const [form, setForm] = useState(defaultForm())
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
        setForm(defaultForm(result))
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Could not load lost mode details.")
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

  async function handleActivate(event) {
    event.preventDefault()
    setError("")
    setIsSaving(true)

    try {
      await activateLostMode(catId, currentUser.uid, form)
      navigate(`/owner/cats/${catId}`)
    } catch (saveError) {
      setError(saveError.message || "Could not activate lost mode.")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleMarkSafe() {
    setError("")
    setIsSaving(true)

    try {
      await markCatSafe(catId, currentUser.uid)
      navigate(`/owner/cats/${catId}`)
    } catch (saveError) {
      setError(saveError.message || "Could not mark this cat as safe.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <PhoneLayout>
        <PageHeader title="Lost Mode" eyebrow="Safety" backTo={`/owner/cats/${catId}`} />
        <LoadingState label="Loading lost mode controls..." />
      </PhoneLayout>
    )
  }

  if (!cat) {
    return (
      <PhoneLayout>
        <PageHeader title="Lost Mode" eyebrow="Safety" backTo="/owner/cats" />
        <EmptyState title="Cat not available" message={error || "This cat profile could not be found."} actionTo="/owner/cats" actionLabel="Back to My Cats" />
      </PhoneLayout>
    )
  }

  return (
    <PhoneLayout>
      <PageHeader
        title={cat.status === "lost" ? "Manage Lost Mode" : "Activate Lost Mode"}
        eyebrow="Safety"
        subtitle="Lost Mode updates the public NFC profile so finders see a clear lost cat alert."
        backTo={`/owner/cats/${catId}`}
      />

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 p-3 text-sm font-semibold leading-6 text-red-700">
          {error}
        </div>
      ) : null}

      <section className={`mb-4 rounded-[1.5rem] p-4 shadow-card ${cat.status === "lost" ? "bg-red-50" : "bg-orange-50"}`}>
        <p className={`text-sm font-bold uppercase tracking-wide ${cat.status === "lost" ? "text-red-700" : "text-paw"}`}>
          {cat.status === "lost" ? "🚨 Lost Mode Active" : "NFC public profile is currently safe"}
        </p>
        <h2 className="mt-1 text-2xl font-black text-ink">{cat.name}</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Public profile: <span className="font-bold">/cat/{cat.publicId}</span>
        </p>
      </section>

      <form className="soft-card space-y-4" onSubmit={handleActivate}>
        <Field label="Last seen location *">
          <input
            className="input-field"
            placeholder="Section 7, Shah Alam"
            required
            value={form.lastSeenLocationText}
            onChange={(event) => updateField("lastSeenLocationText", event.target.value)}
          />
        </Field>

        <Field label="Last seen date and time">
          <input
            className="input-field"
            placeholder="24 May 2025, 8:30 PM"
            value={form.lastSeenAtText}
            onChange={(event) => updateField("lastSeenAtText", event.target.value)}
          />
        </Field>

        <Field label="Lost mode description">
          <textarea
            className="input-field min-h-28 resize-none"
            placeholder="Wearing a blue collar with bell."
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
          />
        </Field>

        <Field label="Finder instructions">
          <textarea
            className="input-field min-h-28 resize-none"
            placeholder="Please approach slowly and contact owner."
            value={form.finderInstructions}
            onChange={(event) => updateField("finderInstructions", event.target.value)}
          />
        </Field>

        <ActionButton disabled={isSaving} variant="danger" className="w-full">
          {isSaving ? "Updating Lost Mode..." : cat.status === "lost" ? "Update Lost Mode" : "Activate Lost Mode"}
        </ActionButton>
      </form>

      <div className="mt-4 grid gap-3">
        {cat.publicId ? <ActionButton to={`/cat/${cat.publicId}`} variant="ghost">Preview Public Profile</ActionButton> : null}
        {cat.status === "lost" ? (
          <ActionButton disabled={isSaving} onClick={handleMarkSafe} variant="mint">
            {isSaving ? "Updating..." : "Mark Cat as Safe"}
          </ActionButton>
        ) : null}
      </div>
    </PhoneLayout>
  )
}

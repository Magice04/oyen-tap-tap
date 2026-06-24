import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ActionButton from "../../components/ActionButton"
import CatCard from "../../components/CatCard"
import EmptyState from "../../components/EmptyState"
import LoadingState from "../../components/LoadingState"
import PageHeader from "../../components/PageHeader"
import StatusBadge from "../../components/StatusBadge"
import { PhoneLayout } from "../../components/AppLayout"
import { hasFirebaseConfig } from "../../firebase"
import { getCatByPublicId } from "../../services/cats"

export default function PublicCatProfile() {
  const { publicId } = useParams()
  const [cat, setCat] = useState(null)
  const [status, setStatus] = useState("loading")
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true

    async function loadCat() {
      setStatus("loading")
      setError("")

      try {
        const result = await getCatByPublicId(publicId)
        if (!active) return
        setCat(result)
        setStatus(result ? "ready" : "not-found")
      } catch (err) {
        if (!active) return
        setError(err.message || "Could not load this cat profile.")
        setStatus("error")
      }
    }

    loadCat()

    return () => {
      active = false
    }
  }, [publicId])

  if (!hasFirebaseConfig) {
    return (
      <PhoneLayout showNav={false}>
        <PageHeader title="Firebase setup needed" eyebrow="Public Profile" backTo="/" />
        <EmptyState
          title="Missing Firebase config"
          message="Create .env.local in the project root with the VITE_FIREBASE_* keys, then restart npm run dev. Do not paste private values into the UI or GitHub."
        />
      </PhoneLayout>
    )
  }

  if (status === "loading") {
    return (
      <PhoneLayout showNav={false}>
        <PageHeader title="Opening cat profile" eyebrow="NFC Tap" backTo="/" />
        <LoadingState label="Checking the NFC cat profile..." />
      </PhoneLayout>
    )
  }

  if (status === "error") {
    return (
      <PhoneLayout showNav={false}>
        <PageHeader title="Could not open profile" eyebrow="NFC Tap" backTo="/" />
        <EmptyState title="Firestore read failed" message={error} actionLabel="Back Home" actionTo="/" />
      </PhoneLayout>
    )
  }

  if (status === "not-found") {
    return (
      <PhoneLayout showNav={false}>
        <PageHeader title="Cat not found" eyebrow="NFC Tap" backTo="/" />
        <EmptyState
          title={`No cat found for ${publicId}`}
          message="The route is working, but Firestore has no cats document where publicId matches this URL. Seed oyen-123 or create a cat profile next."
          actionLabel="Seed Demo Data"
          actionTo="/dev/seed"
        />
      </PhoneLayout>
    )
  }

  const lost = cat.status === "lost"

  return (
    <PhoneLayout showNav={false}>
      <PageHeader title={lost ? "Lost Cat Alert" : "Cat Profile"} eyebrow="Public NFC Profile" backTo="/" />

      {lost ? (
        <section className="mb-4 rounded-[1.5rem] bg-red-500 p-4 text-center text-white shadow-card">
          <p className="text-sm font-bold uppercase tracking-wide">🚨 Lost Cat Alert</p>
          <h2 className="mt-1 text-2xl font-black">{cat.name} is missing</h2>
          <p className="mt-2 text-sm text-red-50">Please help bring {cat.name} home safely.</p>
          {cat.lostMode?.lastSeenLocationText ? (
            <p className="mt-3 rounded-2xl bg-white/15 px-4 py-2 text-sm font-bold">
              Last seen: {cat.lostMode.lastSeenLocationText}
            </p>
          ) : null}
          {cat.lostMode?.lastSeenAtText ? <p className="mt-1 text-xs text-red-50">{cat.lostMode.lastSeenAtText}</p> : null}
        </section>
      ) : null}

      <CatCard cat={cat} />

      <section className="mt-4 soft-card">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-black">About {cat.name}</h2>
          <StatusBadge value={cat.status}>{cat.status}</StatusBadge>
        </div>
        <dl className="mt-4 grid gap-3 text-sm">
          <div className="flex justify-between gap-4 rounded-2xl bg-orange-50 px-4 py-3">
            <dt className="font-bold text-stone-500">Distinctive mark</dt>
            <dd className="text-right text-stone-700">{cat.distinctiveMarks || "Not provided"}</dd>
          </div>
          <div className="flex justify-between gap-4 rounded-2xl bg-orange-50 px-4 py-3">
            <dt className="font-bold text-stone-500">Medical notes</dt>
            <dd className="text-right text-stone-700">{cat.medicalNotes || "Not provided"}</dd>
          </div>
          <div className="flex justify-between gap-4 rounded-2xl bg-orange-50 px-4 py-3">
            <dt className="font-bold text-stone-500">NFC tag</dt>
            <dd className="text-right text-stone-700">{cat.nfcActive ? "Active" : "Inactive"}</dd>
          </div>
        </dl>
      </section>

      {cat.lostMode?.description ? (
        <section className="mt-4 soft-card border-red-100 bg-red-50">
          <h2 className="text-lg font-black text-red-700">Lost mode details</h2>
          <p className="mt-2 text-sm leading-6 text-red-700">{cat.lostMode.description}</p>
        </section>
      ) : null}

      {cat.emergencyInstructions || cat.lostMode?.finderInstructions ? (
        <section className="mt-4 soft-card border-orange-200 bg-orange-50">
          <h2 className="text-lg font-black">Finder instructions</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {cat.lostMode?.finderInstructions || cat.emergencyInstructions}
          </p>
        </section>
      ) : null}

      <div className="mt-5 grid gap-3">
        <ActionButton to={`/cat/${publicId}/report-found`} variant="orange">I Found This Cat</ActionButton>
        <ActionButton to={`/cat/${publicId}/report-sighting`} variant="blue">I Saw This Cat</ActionButton>
        <ActionButton to={`/cat/${publicId}/contact-owner`} variant="ghost">Contact Owner Safely</ActionButton>
      </div>
    </PhoneLayout>
  )
}

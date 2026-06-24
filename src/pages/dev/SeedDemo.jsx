import { useState } from "react"
import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"
import { hasFirebaseConfig } from "../../firebase"
import { seedDemoData } from "../../services/seedDemoData"

export default function SeedDemo() {
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState("")

  async function handleSeed() {
    setStatus("loading")
    setMessage("")

    try {
      await seedDemoData()
      setStatus("done")
      setMessage("Demo data created. Open /cat/oyen-123 to test the Firestore public profile read.")
    } catch (error) {
      setStatus("error")
      setMessage(error.message || "Could not seed demo data.")
    }
  }

  return (
    <PhoneLayout showNav={false}>
      <PageHeader title="Seed Demo Data" eyebrow="Developer Helper" backTo="/" />
      <section className="soft-card">
        <p className="text-sm leading-6 text-stone-600">
          This writes a demo owner, Oyen cat profile, lost mode record, sample reports, journal entries, and Catgram posts to Firestore.
        </p>
        {!hasFirebaseConfig ? (
          <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
            Firebase config is missing. Add .env.local in the project root and restart the dev server first.
          </p>
        ) : null}
        <ActionButton className="mt-5 w-full" disabled={!hasFirebaseConfig || status === "loading"} onClick={handleSeed}>
          {status === "loading" ? "Seeding..." : "Create / Update Demo Data"}
        </ActionButton>
        {message ? (
          <p className={`mt-4 rounded-2xl p-4 text-sm font-bold ${status === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
            {message}
          </p>
        ) : null}
        {status === "done" ? (
          <ActionButton to="/cat/oyen-123" variant="blue" className="mt-3 w-full">Open Oyen Profile</ActionButton>
        ) : null}
      </section>
    </PhoneLayout>
  )
}

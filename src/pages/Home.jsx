import { Link } from "react-router-dom"
import ActionButton from "../components/ActionButton"

const featureCards = [
  { title: "NFC Cat ID", text: "Tap a tag and open the cat's public safety profile.", icon: "🏷️" },
  { title: "Lost Mode", text: "Turn the profile into a clear missing-cat alert.", icon: "🚨" },
  { title: "Catgram", text: "A lightweight cat-only feed for updates and sightings.", icon: "💜" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-ink">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-paw shadow-card">
            <span>🐾</span> Hackathon MVP
          </div>
          <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Every cat deserves to come home.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
            Oyen Tap Tap combines NFC cat profiles, Lost Mode reports, PawPrint Journal, and Catgram into one polished rescue-first demo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ActionButton to="/cat/oyen-123">Simulate NFC Tap</ActionButton>
            <ActionButton to="/owner/dashboard" variant="blue">Owner Dashboard</ActionButton>
            <ActionButton to="/catgram" variant="purple">Open Catgram</ActionButton>
          </div>
          <Link className="mt-4 inline-block text-sm font-bold text-stone-500 underline decoration-orange-200 underline-offset-4" to="/dev/seed">
            Need demo data? Open the seed helper.
          </Link>
        </div>

        <div className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-soft">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-orange-100 via-cream to-blue-50 p-6 text-center">
            <div className="mx-auto grid h-36 w-36 place-items-center rounded-full bg-white text-7xl shadow-card">🐱</div>
            <h2 className="mt-6 text-3xl font-black">Oyen Tap Tap</h2>
            <p className="mt-2 text-sm text-stone-500">NFC Cat ID • Lost & Found • Catgram • PawPrint Journal</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {featureCards.map((card) => (
                <article key={card.title} className="rounded-3xl bg-white/90 p-4 text-left shadow-card">
                  <div className="text-3xl">{card.icon}</div>
                  <h3 className="mt-3 font-black">{card.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-stone-500">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

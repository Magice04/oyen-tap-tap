import ActionButton from "./ActionButton"
import StatusBadge from "./StatusBadge"

export default function CatCard({ cat, to }) {
  return (
    <article className="soft-card overflow-hidden p-0">
      <div className="relative h-48 overflow-hidden bg-orange-100">
        {cat.photoUrl ? (
          <img className="h-full w-full object-cover" src={cat.photoUrl} alt={cat.name} />
        ) : (
          <div className="grid h-full place-items-center text-7xl">🐈</div>
        )}
        <div className="absolute right-3 top-3">
          <StatusBadge value={cat.status}>{cat.status}</StatusBadge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-ink">{cat.name || "Unnamed Cat"}</h2>
            <p className="text-sm text-stone-500">
              {[cat.breed, cat.color, cat.age].filter(Boolean).join(" • ")}
            </p>
          </div>
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-paw">
            NFC {cat.nfcActive ? "Active" : "Off"}
          </span>
        </div>
        {cat.personality ? <p className="mt-4 text-sm leading-6 text-stone-600">{cat.personality}</p> : null}
        {to ? (
          <ActionButton to={to} variant="ghost" className="mt-5 w-full">
            View Cat Profile
          </ActionButton>
        ) : null}
      </div>
    </article>
  )
}

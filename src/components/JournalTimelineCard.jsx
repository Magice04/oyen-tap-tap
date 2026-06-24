export default function JournalTimelineCard({ entry }) {
  return (
    <article className="relative ml-4 border-l-2 border-orange-100 pb-6 pl-5 last:pb-0">
      <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-cream bg-paw" />
      <div className="soft-card">
        <p className="text-xs font-bold uppercase tracking-wide text-paw">{entry.type || "memory"}</p>
        <h3 className="mt-1 font-black text-ink">{entry.title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-500">{entry.description}</p>
      </div>
    </article>
  )
}

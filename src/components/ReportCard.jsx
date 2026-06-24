import StatusBadge from "./StatusBadge"

export default function ReportCard({ report }) {
  return (
    <article className="soft-card flex gap-3">
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-orange-100 text-2xl">📍</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-black text-ink">{report.catName || "Cat report"}</h3>
            <p className="text-xs text-stone-500 capitalize">{report.reportType || "sighting"}</p>
          </div>
          <StatusBadge value={report.status || "new"} />
        </div>
        <p className="mt-2 truncate text-sm font-semibold text-stone-700">{report.locationText || "Unknown location"}</p>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-stone-500">{report.message || "No message provided."}</p>
      </div>
    </article>
  )
}

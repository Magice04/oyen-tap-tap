const styles = {
  safe: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
  found: "bg-blue-100 text-blue-700",
  new: "bg-blue-100 text-blue-700",
  reviewed: "bg-purple-100 text-purple-700",
  resolved: "bg-green-100 text-green-700",
  normal: "bg-stone-100 text-stone-600",
  sighting: "bg-amber-100 text-amber-700",
  help: "bg-indigo-100 text-indigo-700",
  adoption: "bg-pink-100 text-pink-700",
}

export default function StatusBadge({ value, children }) {
  const label = children || value || "unknown"
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${styles[value] || styles.normal}`}>
      {label}
    </span>
  )
}

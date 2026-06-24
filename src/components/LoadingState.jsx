export default function LoadingState({ label = "Loading..." }) {
  return (
    <div className="soft-card flex min-h-48 flex-col items-center justify-center text-center">
      <div className="mb-4 h-12 w-12 animate-bounce rounded-full bg-orange-100 text-3xl">🐾</div>
      <p className="text-sm font-bold text-stone-600">{label}</p>
    </div>
  )
}

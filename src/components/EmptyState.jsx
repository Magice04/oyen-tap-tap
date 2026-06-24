import ActionButton from "./ActionButton"

export default function EmptyState({ title, message, actionLabel, actionTo }) {
  return (
    <section className="soft-card text-center">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-orange-100 text-5xl">🐱</div>
      <h2 className="mt-4 text-xl font-black text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-stone-500">{message}</p>
      {actionLabel && actionTo ? (
        <ActionButton to={actionTo} className="mt-5">
          {actionLabel}
        </ActionButton>
      ) : null}
    </section>
  )
}

import { Link, useNavigate } from "react-router-dom"

export default function PageHeader({ title, eyebrow, subtitle, backTo, action }) {
  const navigate = useNavigate()

  return (
    <header className="mb-5 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          {backTo ? (
            <Link className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-card" to={backTo}>
              ←
            </Link>
          ) : (
            <button
              className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-card md:hidden"
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              ←
            </button>
          )}
          {eyebrow ? <p className="text-xs font-bold uppercase tracking-wide text-paw">{eyebrow}</p> : null}
        </div>
        <h1 className="text-2xl font-black tracking-tight text-ink">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm leading-6 text-stone-500">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}

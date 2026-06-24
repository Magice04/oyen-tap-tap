import ActionButton from "../../components/ActionButton"
import ReportCard from "../../components/ReportCard"
import { OwnerLayout } from "../../components/AppLayout"
import { demoCat, demoReports } from "../../data/demoData"

const stats = [
  { label: "Active Cats", value: "1", color: "text-green-600" },
  { label: "Lost Now", value: "1", color: "text-red-600" },
  { label: "New Reports", value: "2", color: "text-paw" },
]

export default function OwnerDashboard() {
  return (
    <OwnerLayout>
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-paw">Owner Dashboard</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Hi, Aisyah! 👋</h1>
          <p className="mt-2 text-stone-500">Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <ActionButton to="/owner/cats/new">Add New Cat</ActionButton>
          <ActionButton to="/cat/oyen-123" variant="ghost">Public View</ActionButton>
        </div>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.label} className="soft-card">
            <p className="text-sm font-bold text-stone-500">{stat.label}</p>
            <p className={`mt-2 text-4xl font-black ${stat.color}`}>{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="soft-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-paw">Main Cat</p>
              <h2 className="mt-1 text-2xl font-black">{demoCat.name}</h2>
              <p className="mt-1 text-sm text-stone-500">{demoCat.breed} • {demoCat.age}</p>
            </div>
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">Lost Mode</span>
          </div>
          <div className="mt-5 grid h-52 place-items-center rounded-[1.5rem] bg-orange-100 text-8xl">🐈</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ActionButton to="/owner/cats/demo_oyen_001">Cat Detail</ActionButton>
            <ActionButton to="/owner/cats/demo_oyen_001/lost-mode" variant="danger">Lost Mode</ActionButton>
          </div>
        </article>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-black">Recent Reports</h2>
            <ActionButton to="/owner/reports" variant="blue">View All</ActionButton>
          </div>
          <div className="grid gap-3">
            {demoReports.map((report) => <ReportCard key={report.id} report={report} />)}
          </div>
        </div>
      </section>
    </OwnerLayout>
  )
}

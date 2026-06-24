import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import ActionButton from "../../components/ActionButton"
import EmptyState from "../../components/EmptyState"
import LoadingState from "../../components/LoadingState"
import ReportCard from "../../components/ReportCard"
import { OwnerLayout } from "../../components/AppLayout"
import { db } from "../../firebase"
import { useAuth } from "../../context/useAuth"

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() || 0
    const bTime = b.createdAt?.toMillis?.() || 0
    return bTime - aTime
  })
}

export default function OwnerDashboard() {
  const { currentUser, profile, logoutOwner } = useAuth()
  const [cats, setCats] = useState([])
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadOwnerData() {
      if (!currentUser?.uid || !db) {
        return
      }

      setIsLoading(true)
      setError("")

      try {
        const catsQuery = query(collection(db, "cats"), where("ownerId", "==", currentUser.uid))
        const reportsQuery = query(collection(db, "finderReports"), where("ownerId", "==", currentUser.uid))

        const [catsSnapshot, reportsSnapshot] = await Promise.all([getDocs(catsQuery), getDocs(reportsQuery)])

        if (!isMounted) {
          return
        }

        setCats(catsSnapshot.docs.map((catDoc) => ({ id: catDoc.id, ...catDoc.data() })))
        setReports(sortNewestFirst(reportsSnapshot.docs.map((reportDoc) => ({ id: reportDoc.id, ...reportDoc.data() }))))
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Failed to load owner dashboard.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadOwnerData()

    return () => {
      isMounted = false
    }
  }, [currentUser?.uid])

  async function handleLogout() {
    setIsLoggingOut(true)
    await logoutOwner()
  }

  const displayName = profile?.displayName || currentUser?.displayName || "Cat Owner"
  const mainCat = cats.find((cat) => cat.status === "lost") || cats[0]
  const newReports = reports.filter((report) => report.status === "new")

  const stats = [
    { label: "Active Cats", value: cats.length, color: "text-green-600" },
    { label: "Lost Now", value: cats.filter((cat) => cat.status === "lost").length, color: "text-red-600" },
    { label: "New Reports", value: newReports.length, color: "text-paw" },
  ]

  return (
    <OwnerLayout>
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-paw">Owner Dashboard</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Hi, {displayName}! 👋</h1>
          <p className="mt-2 text-stone-500">Protected Firebase Auth route. Data is scoped to your user ID.</p>
          <p className="mt-1 break-all text-xs font-semibold text-stone-400">UID: {currentUser.uid}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ActionButton to="/owner/cats/new">Add New Cat</ActionButton>
          {mainCat?.publicId ? <ActionButton to={`/cat/${mainCat.publicId}`} variant="ghost">Public View</ActionButton> : null}
          <ActionButton disabled={isLoggingOut} onClick={handleLogout} variant="danger">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </ActionButton>
        </div>
      </header>

      {isLoading ? <LoadingState label="Loading owner dashboard..." /> : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
          {error}
        </div>
      ) : null}

      {!isLoading ? (
        <>
          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <article key={stat.label} className="soft-card">
                <p className="text-sm font-bold text-stone-500">{stat.label}</p>
                <p className={`mt-2 text-4xl font-black ${stat.color}`}>{stat.value}</p>
              </article>
            ))}
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            {mainCat ? (
              <article className="soft-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-paw">Main Cat</p>
                    <h2 className="mt-1 text-2xl font-black">{mainCat.name}</h2>
                    <p className="mt-1 text-sm text-stone-500">
                      {[mainCat.breed, mainCat.age].filter(Boolean).join(" • ")}
                    </p>
                  </div>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold capitalize text-red-700">
                    {mainCat.status || "safe"}
                  </span>
                </div>
                <div className="mt-5 grid h-52 place-items-center overflow-hidden rounded-[1.5rem] bg-orange-100 text-8xl">
                  {mainCat.photoUrl ? <img className="h-full w-full object-cover" src={mainCat.photoUrl} alt={mainCat.name} /> : "🐈"}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <ActionButton to={`/owner/cats/${mainCat.id}`}>Cat Detail</ActionButton>
                  <ActionButton to={`/owner/cats/${mainCat.id}/lost-mode`} variant="danger">Lost Mode</ActionButton>
                </div>
              </article>
            ) : (
              <EmptyState
                icon="🐱"
                title="No cats yet"
                message="Your account is ready. Add your first cat next, then generate its public NFC profile."
                actionText="Add New Cat"
                actionTo="/owner/cats/new"
              />
            )}

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-black">Recent Reports</h2>
                <ActionButton to="/owner/reports" variant="blue">View All</ActionButton>
              </div>
              <div className="grid gap-3">
                {reports.length > 0 ? (
                  reports.slice(0, 3).map((report) => <ReportCard key={report.id} report={report} />)
                ) : (
                  <EmptyState
                    icon="📍"
                    title="No finder reports yet"
                    message="Reports will appear here after someone submits a found or sighting form."
                  />
                )}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </OwnerLayout>
  )
}

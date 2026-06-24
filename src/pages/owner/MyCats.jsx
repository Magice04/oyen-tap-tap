import { useEffect, useState } from "react"
import ActionButton from "../../components/ActionButton"
import CatCard from "../../components/CatCard"
import EmptyState from "../../components/EmptyState"
import LoadingState from "../../components/LoadingState"
import PageHeader from "../../components/PageHeader"
import { OwnerLayout } from "../../components/AppLayout"
import { useAuth } from "../../context/useAuth"
import { getOwnerCats } from "../../services/cats"

export default function MyCats() {
  const { currentUser } = useAuth()
  const [cats, setCats] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadCats() {
      setIsLoading(true)
      setError("")

      try {
        const ownerCats = await getOwnerCats(currentUser.uid)

        if (isMounted) {
          setCats(ownerCats)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Could not load your cats.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCats()

    return () => {
      isMounted = false
    }
  }, [currentUser.uid])

  return (
    <OwnerLayout>
      <PageHeader
        title="My Cats"
        eyebrow="Owner"
        subtitle="Manage cat profiles, public NFC URLs, and lost mode status."
        action={<ActionButton to="/owner/cats/new">Add New Cat</ActionButton>}
      />

      {isLoading ? <LoadingState label="Loading your cat profiles..." /> : null}

      {error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
          {error}
        </div>
      ) : null}

      {!isLoading && !error && cats.length === 0 ? (
        <EmptyState
          icon="🐾"
          title="No cats yet"
          message="Add your first cat profile. After that, the app will generate a public NFC profile route you can test immediately."
          actionLabel="Add New Cat"
          actionTo="/owner/cats/new"
        />
      ) : null}

      {!isLoading && cats.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cats.map((cat) => (
            <CatCard key={cat.id} cat={cat} to={`/owner/cats/${cat.id}`} />
          ))}
        </div>
      ) : null}
    </OwnerLayout>
  )
}

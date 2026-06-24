import ActionButton from "../../components/ActionButton"
import CatCard from "../../components/CatCard"
import PageHeader from "../../components/PageHeader"
import { OwnerLayout } from "../../components/AppLayout"
import { demoCat } from "../../data/demoData"

export default function MyCats() {
  return (
    <OwnerLayout>
      <PageHeader title="My Cats" eyebrow="Owner" action={<ActionButton to="/owner/cats/new">Add New Cat</ActionButton>} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CatCard cat={demoCat} to="/owner/cats/demo_oyen_001" />
      </div>
    </OwnerLayout>
  )
}

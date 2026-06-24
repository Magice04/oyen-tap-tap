import EmptyState from "../components/EmptyState"
import PageHeader from "../components/PageHeader"
import { PhoneLayout } from "../components/AppLayout"

export default function NotFound() {
  return (
    <PhoneLayout showNav={false}>
      <PageHeader title="Page not found" eyebrow="404" backTo="/" />
      <EmptyState title="This route is not built yet" message="The MVP route map is now explicit. Use the home page or bottom nav to continue." actionLabel="Back Home" actionTo="/" />
    </PhoneLayout>
  )
}

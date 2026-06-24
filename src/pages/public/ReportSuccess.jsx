import { useLocation } from "react-router-dom"
import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"

export default function ReportSuccess() {
  const location = useLocation()
  const publicId = location.state?.publicId || "oyen-123"

  return (
    <PhoneLayout showNav={false}>
      <PageHeader title="Thank you" eyebrow="Report Sent" backTo={`/cat/${publicId}`} />
      <section className="soft-card text-center">
        <div className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-orange-100 text-7xl">😺</div>
        <h1 className="mt-6 text-3xl font-black">Report received</h1>
        <p className="mt-3 text-sm leading-6 text-stone-500">
          Your report has been captured in the app flow. In the next phase, this will save to Firestore and appear in the owner reports inbox.
        </p>
        <ActionButton to={`/cat/${publicId}`} className="mt-6 w-full">
          Back to Profile
        </ActionButton>
      </section>
    </PhoneLayout>
  )
}

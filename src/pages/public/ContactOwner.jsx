import { useParams } from "react-router-dom"
import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"

export default function ContactOwner() {
  const { publicId } = useParams()

  return (
    <PhoneLayout showNav={false}>
      <PageHeader title="Contact Owner Safely" eyebrow="Privacy First" backTo={`/cat/${publicId}`} />
      <section className="soft-card">
        <p className="text-sm leading-6 text-stone-600">
          Send a message to the owner. Your contact will only be shared if the owner replies.
        </p>
        <div className="mt-5 space-y-4">
          <input className="input-field" placeholder="Your name, optional" />
          <input className="input-field" placeholder="Phone or email" />
          <textarea className="input-field min-h-28 resize-none" placeholder="I found/saw your cat..." />
          <ActionButton to={`/cat/${publicId}/report-found`} className="w-full">Use Report Form Instead</ActionButton>
        </div>
      </section>
    </PhoneLayout>
  )
}

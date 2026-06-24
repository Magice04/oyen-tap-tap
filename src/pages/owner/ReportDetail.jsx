import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"
import { demoReports } from "../../data/demoData"

export default function ReportDetail() {
  const report = demoReports[0]

  return (
    <PhoneLayout>
      <PageHeader title="AI Rescue Brief" eyebrow="Report Detail" backTo="/owner/reports" />
      <section className="soft-card">
        <h2 className="text-xl font-black">Summary</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Oyen was sighted near Block B parking area hiding under a white car. The cat appears scared but not injured.
        </p>
        <div className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm">
          <p><strong>Urgency:</strong> Medium</p>
          <p className="mt-2"><strong>Suggested action:</strong> Check the parking area calmly and bring food or a carrier.</p>
        </div>
        <div className="mt-5 grid h-40 place-items-center rounded-[1.5rem] bg-orange-100 text-7xl">🐈</div>
        <p className="mt-4 text-sm font-bold text-stone-600">Location: {report.locationText}</p>
        <ActionButton className="mt-5 w-full" variant="mint">Mark as Reviewed</ActionButton>
      </section>
    </PhoneLayout>
  )
}

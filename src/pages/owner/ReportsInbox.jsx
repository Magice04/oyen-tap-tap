import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import ReportCard from "../../components/ReportCard"
import { OwnerLayout } from "../../components/AppLayout"
import { demoReports } from "../../data/demoData"

export default function ReportsInbox() {
  return (
    <OwnerLayout>
      <PageHeader title="Reports Inbox" eyebrow="Finder Reports" action={<ActionButton to="/owner/reports/demo_report_001" variant="blue">Open AI Brief</ActionButton>} />
      <div className="grid gap-3 lg:grid-cols-2">
        {demoReports.map((report) => <ReportCard key={report.id} report={report} />)}
      </div>
    </OwnerLayout>
  )
}

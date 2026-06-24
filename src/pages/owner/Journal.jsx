import ActionButton from "../../components/ActionButton"
import JournalTimelineCard from "../../components/JournalTimelineCard"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"
import { demoJournalEntries } from "../../data/demoData"

export default function Journal() {
  return (
    <PhoneLayout>
      <PageHeader title="PawPrint Journal" eyebrow="Timeline" action={<ActionButton variant="blue">Add Memory</ActionButton>} />
      <div className="mt-4">
        {demoJournalEntries.map((entry) => <JournalTimelineCard key={entry.id} entry={entry} />)}
      </div>
    </PhoneLayout>
  )
}

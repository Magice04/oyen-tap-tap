import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ActionButton from "../../components/ActionButton"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"

export default function ReportForm({ type = "found" }) {
  const { publicId } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    locationText: "",
    condition: "",
    message: "",
    finderName: "",
    finderContact: "",
  })

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    navigate("/report/success", {
      state: {
        type,
        publicId,
        locationText: form.locationText,
      },
    })
  }

  const title = type === "found" ? "I found this cat" : "I saw this cat"

  return (
    <PhoneLayout showNav={false}>
      <PageHeader title={title} eyebrow="Finder Report" backTo={`/cat/${publicId}`} />
      <form className="soft-card space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label-text" htmlFor="locationText">Where did you {type === "found" ? "find" : "see"} the cat?</label>
          <input
            className="input-field"
            id="locationText"
            name="locationText"
            onChange={updateField}
            placeholder="e.g. Block B parking area"
            required
            value={form.locationText}
          />
        </div>
        <div>
          <label className="label-text" htmlFor="condition">Cat condition</label>
          <select className="input-field" id="condition" name="condition" onChange={updateField} value={form.condition}>
            <option value="">Select condition</option>
            <option value="looks healthy">Looks healthy</option>
            <option value="scared">Scared or hiding</option>
            <option value="injured">Looks injured</option>
            <option value="unknown">Not sure</option>
          </select>
        </div>
        <div>
          <label className="label-text" htmlFor="message">Message for owner</label>
          <textarea
            className="input-field min-h-28 resize-none"
            id="message"
            name="message"
            onChange={updateField}
            placeholder="Describe what happened. Do not chase the cat."
            value={form.message}
          />
        </div>
        <div>
          <label className="label-text" htmlFor="finderName">Your name, optional</label>
          <input className="input-field" id="finderName" name="finderName" onChange={updateField} placeholder="Name" value={form.finderName} />
        </div>
        <div>
          <label className="label-text" htmlFor="finderContact">Your contact, optional</label>
          <input className="input-field" id="finderContact" name="finderContact" onChange={updateField} placeholder="Phone or email" value={form.finderContact} />
        </div>
        <ActionButton className="w-full" type="submit">
          Submit Report
        </ActionButton>
        <p className="text-center text-xs leading-5 text-stone-500">
          This page is routed and styled. Firestore report saving is the next phase after owner auth.
        </p>
      </form>
    </PhoneLayout>
  )
}

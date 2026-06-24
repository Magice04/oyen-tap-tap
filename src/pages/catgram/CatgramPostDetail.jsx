import CatgramPostCard from "../../components/CatgramPostCard"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"
import { demoCatgramPosts } from "../../data/demoData"

export default function CatgramPostDetail() {
  return (
    <PhoneLayout>
      <PageHeader title="Post Details" eyebrow="Catgram" backTo="/catgram" />
      <CatgramPostCard post={demoCatgramPosts[0]} />
      <section className="mt-4 soft-card">
        <h2 className="text-lg font-black">Comments</h2>
        <p className="mt-3 rounded-2xl bg-orange-50 p-4 text-sm text-stone-600">meowfinder: Hope Oyen comes home soon 🐾</p>
        <p className="mt-2 rounded-2xl bg-orange-50 p-4 text-sm text-stone-600">catmum: I will keep an eye out nearby.</p>
      </section>
    </PhoneLayout>
  )
}

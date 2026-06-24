import ActionButton from "../../components/ActionButton"
import CatgramPostCard from "../../components/CatgramPostCard"
import PageHeader from "../../components/PageHeader"
import { PhoneLayout } from "../../components/AppLayout"
import { demoCatgramPosts } from "../../data/demoData"

export default function CatgramFeed({ filter }) {
  const posts = filter ? demoCatgramPosts.filter((post) => post.postType === filter) : demoCatgramPosts

  return (
    <PhoneLayout>
      <PageHeader
        title="Catgram"
        eyebrow={filter ? `${filter} posts` : "Community Feed"}
        action={<ActionButton to="/catgram/new" variant="purple">New Post</ActionButton>}
      />
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        <ActionButton to="/catgram" variant="ghost">All</ActionButton>
        <ActionButton to="/catgram/lost" variant="danger">Lost</ActionButton>
        <ActionButton to="/catgram/found" variant="mint">Found</ActionButton>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => <CatgramPostCard key={post.id} post={post} />)}
      </div>
    </PhoneLayout>
  )
}

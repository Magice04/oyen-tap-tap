import ActionButton from "./ActionButton"
import StatusBadge from "./StatusBadge"

export default function CatgramPostCard({ post }) {
  const isLost = post.postType === "lost"
  const isFound = post.postType === "found"

  return (
    <article className="soft-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-orange-100 text-2xl">🐱</div>
          <div>
            <h3 className="text-sm font-black text-ink">{post.authorName || "cat_lover"}</h3>
            <p className="text-xs text-stone-500">{post.catName || "Catgram"}</p>
          </div>
        </div>
        <StatusBadge value={post.postType || "normal"} />
      </div>
      <div className={`mt-4 overflow-hidden rounded-[1.4rem] ${isLost ? "bg-red-100" : "bg-orange-100"}`}>
        {post.imageUrl ? (
          <img className="h-64 w-full object-cover" src={post.imageUrl} alt={post.caption || post.postType} />
        ) : (
          <div className="grid h-64 place-items-center text-7xl">🐈</div>
        )}
      </div>
      {isLost ? <h4 className="mt-4 text-lg font-black text-red-600">🚨 Lost Cat Alert</h4> : null}
      {isFound ? <h4 className="mt-4 text-lg font-black text-green-700">✅ Found Cat</h4> : null}
      <p className="mt-2 text-sm leading-6 text-stone-700">{post.caption}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-stone-500">
        <span>❤️ {post.likeCount || 0}</span>
        <span>💬 {post.commentCount || 0}</span>
      </div>
      {isLost && post.publicId ? (
        <ActionButton to={`/cat/${post.publicId}/report-sighting`} variant="purple" className="mt-4 w-full">
          I Saw This Cat
        </ActionButton>
      ) : null}
      {isFound && post.publicId ? (
        <ActionButton to={`/cat/${post.publicId}`} variant="mint" className="mt-4 w-full">
          Contact Owner Safely
        </ActionButton>
      ) : null}
    </article>
  )
}

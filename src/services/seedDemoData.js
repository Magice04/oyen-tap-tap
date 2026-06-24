import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { demoCat, demoCatgramPosts, demoJournalEntries, demoReports } from "../data/demoData"

export async function seedDemoData() {
  if (!db) {
    throw new Error("Firebase is not configured. Check .env.local in the project root.")
  }

  const now = serverTimestamp()

  await setDoc(doc(db, "users", "demo_owner_001"), {
    displayName: "Aisyah",
    email: "demo.owner@example.com",
    createdAt: now,
    updatedAt: now,
  })

  await setDoc(doc(db, "cats", demoCat.id), {
    ...demoCat,
    createdAt: now,
    updatedAt: now,
  })

  await setDoc(doc(db, "lostModeRecords", "lost_oyen_001"), {
    catId: demoCat.id,
    ownerId: demoCat.ownerId,
    lastSeenLocationText: "Section 7, Shah Alam",
    lastSeenAt: now,
    description: "Wearing a blue collar with bell.",
    finderInstructions: demoCat.emergencyInstructions,
    status: "active",
    createdAt: now,
    updatedAt: now,
  })

  await Promise.all(
    demoReports.map((report) =>
      setDoc(doc(db, "finderReports", report.id), {
        ...report,
        aiSummary:
          "Oyen may be hiding near Block B parking area. He appears scared but not injured. Check calmly with food or a carrier.",
        aiSuggestedAction: "Approach slowly, bring wet food, and avoid chasing the cat.",
        createdAt: now,
      }),
    ),
  )

  await Promise.all(
    demoJournalEntries.map((entry) =>
      setDoc(doc(db, "journalEntries", entry.id), {
        ...entry,
        catId: demoCat.id,
        ownerId: demoCat.ownerId,
        visibility: "private",
        createdAt: now,
      }),
    ),
  )

  await Promise.all(
    demoCatgramPosts.map((post) =>
      setDoc(doc(db, "catgramPosts", post.id), {
        ...post,
        createdAt: now,
        updatedAt: now,
      }),
    ),
  )
}

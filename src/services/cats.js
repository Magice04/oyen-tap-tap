import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../firebase"

export async function getCatByPublicId(publicId) {
  if (!db) {
    throw new Error("Firebase is not configured. Check .env.local in the project root.")
  }

  const catsRef = collection(db, "cats")
  const catQuery = query(catsRef, where("publicId", "==", publicId), limit(1))
  const snapshot = await getDocs(catQuery)

  if (snapshot.empty) {
    return null
  }

  const docSnap = snapshot.docs[0]
  return {
    id: docSnap.id,
    ...docSnap.data(),
  }
}

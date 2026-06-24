import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "../firebase"

function requireDb() {
  if (!db) {
    throw new Error("Firebase is not configured. Check .env.local in the project root.")
  }

  return db
}

function cleanText(value) {
  return String(value || "").trim()
}

function slugify(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 28)
}

function randomSuffix() {
  return Math.random().toString(36).slice(2, 6)
}

export function generatePublicId(name) {
  const base = slugify(name) || "cat"
  return `${base}-${randomSuffix()}`
}

async function makeUniquePublicId(name) {
  const firestore = requireDb()

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const publicId = generatePublicId(name)
    const publicIdQuery = query(collection(firestore, "cats"), where("publicId", "==", publicId), limit(1))
    const snapshot = await getDocs(publicIdQuery)

    if (snapshot.empty) {
      return publicId
    }
  }

  return `cat-${Date.now().toString(36)}`
}

export async function getCatByPublicId(publicId) {
  const firestore = requireDb()
  const catsRef = collection(firestore, "cats")
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

export async function getOwnerCats(ownerId) {
  const firestore = requireDb()
  const ownerCatsQuery = query(collection(firestore, "cats"), where("ownerId", "==", ownerId))
  const snapshot = await getDocs(ownerCatsQuery)

  return snapshot.docs
    .map((catDoc) => ({ id: catDoc.id, ...catDoc.data() }))
    .sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0
      const bTime = b.createdAt?.toMillis?.() || 0
      return bTime - aTime
    })
}

export async function getOwnerCatById(catId, ownerId) {
  const firestore = requireDb()
  const catRef = doc(firestore, "cats", catId)
  const snapshot = await getDoc(catRef)

  if (!snapshot.exists()) {
    return null
  }

  const cat = { id: snapshot.id, ...snapshot.data() }

  if (cat.ownerId !== ownerId) {
    throw new Error("You do not have access to this cat profile.")
  }

  return cat
}

export async function createOwnerCat(ownerId, formValues) {
  const firestore = requireDb()
  const name = cleanText(formValues.name)

  if (!name) {
    throw new Error("Cat name is required.")
  }

  const publicId = await makeUniquePublicId(name)
  const now = serverTimestamp()

  const catData = {
    ownerId,
    publicId,
    name,
    photoUrl: cleanText(formValues.photoUrl),
    breed: cleanText(formValues.breed),
    color: cleanText(formValues.color),
    age: cleanText(formValues.age),
    gender: cleanText(formValues.gender) || "unknown",
    personality: cleanText(formValues.personality),
    distinctiveMarks: cleanText(formValues.distinctiveMarks),
    medicalNotes: cleanText(formValues.medicalNotes),
    allergies: cleanText(formValues.allergies),
    dietaryNotes: cleanText(formValues.dietaryNotes),
    emergencyInstructions: cleanText(formValues.emergencyInstructions),
    status: "safe",
    nfcActive: Boolean(formValues.nfcActive),
    createdAt: now,
    updatedAt: now,
  }

  const catRef = await addDoc(collection(firestore, "cats"), catData)

  return {
    id: catRef.id,
    ...catData,
    publicId,
  }
}

export async function updateOwnerCat(catId, ownerId, formValues) {
  const firestore = requireDb()
  const existingCat = await getOwnerCatById(catId, ownerId)

  if (!existingCat) {
    throw new Error("Cat profile not found.")
  }

  const catRef = doc(firestore, "cats", catId)
  const updates = {
    name: cleanText(formValues.name),
    photoUrl: cleanText(formValues.photoUrl),
    breed: cleanText(formValues.breed),
    color: cleanText(formValues.color),
    age: cleanText(formValues.age),
    gender: cleanText(formValues.gender) || "unknown",
    personality: cleanText(formValues.personality),
    distinctiveMarks: cleanText(formValues.distinctiveMarks),
    medicalNotes: cleanText(formValues.medicalNotes),
    allergies: cleanText(formValues.allergies),
    dietaryNotes: cleanText(formValues.dietaryNotes),
    emergencyInstructions: cleanText(formValues.emergencyInstructions),
    nfcActive: Boolean(formValues.nfcActive),
    updatedAt: serverTimestamp(),
  }

  if (!updates.name) {
    throw new Error("Cat name is required.")
  }

  await updateDoc(catRef, updates)

  return {
    ...existingCat,
    ...updates,
  }
}

export async function activateLostMode(catId, ownerId, lostModeValues) {
  const firestore = requireDb()
  const cat = await getOwnerCatById(catId, ownerId)

  if (!cat) {
    throw new Error("Cat profile not found.")
  }

  const now = serverTimestamp()
  const lostMode = {
    catId,
    ownerId,
    publicId: cat.publicId,
    catName: cat.name,
    lastSeenLocationText: cleanText(lostModeValues.lastSeenLocationText),
    lastSeenAtText: cleanText(lostModeValues.lastSeenAtText),
    description: cleanText(lostModeValues.description),
    finderInstructions: cleanText(lostModeValues.finderInstructions),
    status: "active",
    createdAt: now,
    updatedAt: now,
  }

  await addDoc(collection(firestore, "lostModeRecords"), lostMode)

  await updateDoc(doc(firestore, "cats", catId), {
    status: "lost",
    lostMode: {
      lastSeenLocationText: lostMode.lastSeenLocationText,
      lastSeenAtText: lostMode.lastSeenAtText,
      description: lostMode.description,
      finderInstructions: lostMode.finderInstructions,
      activatedAt: now,
    },
    updatedAt: now,
  })

  return lostMode
}

export async function markCatSafe(catId, ownerId) {
  const firestore = requireDb()
  await getOwnerCatById(catId, ownerId)

  await updateDoc(doc(firestore, "cats", catId), {
    status: "safe",
    lostMode: null,
    updatedAt: serverTimestamp(),
  })
}

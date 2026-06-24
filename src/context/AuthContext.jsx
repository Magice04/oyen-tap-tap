import { useEffect, useMemo, useState } from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { auth, db, hasFirebaseConfig } from "../firebase"
import { AuthContext } from "./auth-context"

function cleanEmail(email) {
  return email.trim().toLowerCase()
}

function buildFallbackProfile(user, displayName = "") {
  return {
    id: user.uid,
    uid: user.uid,
    displayName: displayName || user.displayName || "Cat Owner",
    email: user.email || "",
    role: "owner",
  }
}

async function ensureOwnerProfile(user, displayName = "") {
  if (!db) {
    return buildFallbackProfile(user, displayName)
  }

  const userRef = doc(db, "users", user.uid)
  const snapshot = await getDoc(userRef)

  if (snapshot.exists()) {
    return {
      id: snapshot.id,
      uid: snapshot.id,
      ...snapshot.data(),
    }
  }

  const profile = buildFallbackProfile(user, displayName)

  await setDoc(
    userRef,
    {
      uid: profile.uid,
      displayName: profile.displayName,
      email: profile.email,
      role: "owner",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )

  return profile
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setCurrentUser(null)
      setProfile(null)
      setLoading(false)
      return undefined
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true)

      try {
        if (!user) {
          setCurrentUser(null)
          setProfile(null)
          return
        }

        setCurrentUser(user)
        const ownerProfile = await ensureOwnerProfile(user)
        setProfile(ownerProfile)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  async function registerOwner({ displayName, email, password }) {
    if (!auth || !db || !hasFirebaseConfig) {
      throw new Error("Firebase is not configured. Check .env.local in the project root.")
    }

    const cleanedEmail = cleanEmail(email)
    const credential = await createUserWithEmailAndPassword(auth, cleanedEmail, password)
    const name = displayName.trim() || "Cat Owner"

    await updateProfile(credential.user, { displayName: name })

    const profileData = {
      uid: credential.user.uid,
      displayName: name,
      email: cleanedEmail,
      role: "owner",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    await setDoc(doc(db, "users", credential.user.uid), profileData, { merge: true })

    setCurrentUser(credential.user)
    setProfile({ id: credential.user.uid, ...profileData })

    return credential.user
  }

  async function loginOwner({ email, password }) {
    if (!auth || !hasFirebaseConfig) {
      throw new Error("Firebase is not configured. Check .env.local in the project root.")
    }

    const credential = await signInWithEmailAndPassword(auth, cleanEmail(email), password)
    const ownerProfile = await ensureOwnerProfile(credential.user)

    setCurrentUser(credential.user)
    setProfile(ownerProfile)

    return credential.user
  }

  async function logoutOwner() {
    if (!auth) {
      return
    }

    await signOut(auth)
    setCurrentUser(null)
    setProfile(null)
  }

  const value = useMemo(
    () => ({
      currentUser,
      profile,
      loading,
      registerOwner,
      loginOwner,
      logoutOwner,
      isAuthenticated: Boolean(currentUser),
    }),
    [currentUser, profile, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

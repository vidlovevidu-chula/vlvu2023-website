import { DocumentData, getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore"
import firebaseApp from "./firebase"

const db = getFirestore(firebaseApp)

export const getUserRef = (uid: string) => {
  return doc(db, "users", uid)
}

export const updateUser = (uid: string, data: DocumentData): Promise<void> => {
  const userRef = getUserRef(uid)

  return updateDoc(userRef, data)
}

export const createUser = (uid: string, data: DocumentData): Promise<void> => {
  const userRef = getUserRef(uid)

  return setDoc(userRef, data, { merge: true })
}

export const getCurrentUserData = async (uid: string): Promise<null | DocumentData> => {
  const userRef = getUserRef(uid)
  const doc = await getDoc(userRef)

  if (doc.exists()) {
    return doc.data()
  } else {
    return null
  }
}

export const getStaffRef = (uid: string) => {
  return doc(db, "staffs", uid)
}

export const staffReadable = async () => {
  try {
    const ref = getStaffRef("template")
    await getDoc(ref)
    return true
  } catch {
    return false
  }
}

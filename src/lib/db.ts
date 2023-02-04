import { DocumentData, getFirestore, doc, setDoc, updateDoc, getDoc, collection, getDocs } from "firebase/firestore"
import { Estamp } from "./estamp"
import firebaseApp from "./firebase"

const db = getFirestore(firebaseApp)

export const getUserRef = (uid: string) => {
  return doc(db, "users", uid)
}

export const getEstampCollection = () => {
  return collection(db, "estamps")
}

// export const updateUser = (uid: string, data: DocumentData): Promise<void> => {
//   const userRef = getUserRef(uid)

//   return updateDoc(userRef, data)
// }

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

export const getEstamps: () => Promise<DocumentData[]> = async () => {
  const estampsCollection = getEstampCollection()

  const docs = await getDocs(estampsCollection)

  const ret: Estamp[] = []

  docs.forEach((doc) => {
    ret.push(doc.data() as Estamp)
  })

  return ret
}

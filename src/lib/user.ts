import { UserCredential, User as FirebaseUser } from "firebase/auth"
import { Estamp } from "./estamp"
import { createUser as dbCreateUser, getCurrentUserData } from "@lib/db"
import { DocumentData } from "firebase/firestore"

export interface UserCreateBody {
  faculty: string
  name: string
  nickname: string
  status: "student" | "alumni" | "participant"
  studentId: string
  year: number
}

export interface User extends UserCreateBody {
  email: string
  estamps: Estamp[]
}

export const createUser = async (credential: FirebaseUser, createBody: UserCreateBody) => {
  dbCreateUser(credential.uid, {
    email: credential.email,
    estamps: [],
    ...createBody,
  })
}

export const getUser: (credential: FirebaseUser) => Promise<null | User> = async (credential: FirebaseUser) => {
  return (await getCurrentUserData(credential.uid)) as User
}

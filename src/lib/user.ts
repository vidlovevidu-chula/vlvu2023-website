import { UserCredential, User as FirebaseUser } from "firebase/auth"
import { Estamp } from "./estamp"
import { createUser as dbCreateUser, getCurrentUserData } from "@lib/db"
import { DocumentData } from "firebase/firestore"

export interface UserCreateBody {
  faculty: string
  firstname: string
  lastname: string
  nickname: string
  status: "student" | "alumni" | "participant"
  year: number
}

export interface User {
  email: string
  estamps: Estamp[]
  faculty: string
  firstname: string
  lastname: string
  nickname: string
  status: string
  year: number
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

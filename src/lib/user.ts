import { User as FirebaseUser } from "firebase/auth"
import { Estamp } from "./estamp"
import { createUser as dbCreateUser, getCurrentUserData, getUserRef, updateUser } from "@lib/db"

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
  redeemed: boolean
}

export const createUser = async (credential: FirebaseUser, createBody: UserCreateBody) => {
  dbCreateUser(credential.uid, {
    email: credential.email,
    estamps: [],
    redeemed: false,
    ...createBody,
  })
}

export const getUser: (credential: FirebaseUser) => Promise<null | User> = async (credential: FirebaseUser) => {
  return (await getCurrentUserData(credential.uid)) as User
}

export const getUserDoc = (credential: FirebaseUser) => {
  return getUserRef(credential.uid)
}

export const updateEstamp: (credential: FirebaseUser, updatedEstamp: Estamp[]) => Promise<void> = async (credential: FirebaseUser, updatedEstamp: Estamp[]) => {
  return await updateUser(credential.uid, { estamps: updatedEstamp })
}


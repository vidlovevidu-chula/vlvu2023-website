import { User as FirebaseUser } from "firebase/auth"
import { createUser as dbCreateUser, getCurrentUserData, getUserRef, updateUser } from "@/lib/db"
import { deleteField } from "firebase/firestore"

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
  fortuneStamp: boolean
  prizeStamp: boolean
  fortuneRedeemed: boolean
  prizeRedeemed: boolean
  score: number
  purpose: string
  estamp1: boolean
  estamp2: boolean
}

export const createUser = async (credential: FirebaseUser, createBody: UserCreateBody) => {
  dbCreateUser(credential.uid, {
    email: credential.email,
    fortuneStamp: false,
    prizeStamp: false,
    fortuneRedeemed: false,
    prizeRedeemed: false,
    score: 0,
    ...createBody,
  })
}

export const getUser: (credential: FirebaseUser) => Promise<null | User> = async (credential: FirebaseUser) => {
  return (await getCurrentUserData(credential.uid)) as User
}

export const getUserByID = async (uid: string): Promise<null | User> => {
  return (await getCurrentUserData(uid)) as User
}

export const getUserDoc = (credential: FirebaseUser) => {
  return getUserRef(credential.uid)
}

export const addPrizeStamp: (credential: FirebaseUser) => Promise<void> = async (credential: FirebaseUser) => {
  return await updateUser(credential.uid, { prizeStamp: true })
}

export const addFortuneStamp: (credential: FirebaseUser) => Promise<void> = async (credential: FirebaseUser) => {
  return await updateUser(credential.uid, { fortuneStamp: true })
}

export const addPurpose: (credential: FirebaseUser, purpose: string) => Promise<void> = async (
  credential: FirebaseUser,
  purpose: string
) => {
  return await updateUser(credential.uid, { purpose })
}

export const addScore: (credential: FirebaseUser, score: number) => Promise<void> = async (
  credential: FirebaseUser,
  score: number
) => {
  return await updateUser(credential.uid, { score })
}

export const removeScore: (credential: FirebaseUser) => Promise<void> = async (credential: FirebaseUser) => {
  return await updateUser(credential.uid, { score: deleteField() })
}

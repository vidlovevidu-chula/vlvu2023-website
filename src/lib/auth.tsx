import React, { useState, useEffect, useContext, ReactNode } from "react"
import { useRouter } from "next/router"

import {
  getAuth,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import firebaseApp from "./firebase"
import {
  User,
  UserCreateBody,
  addScore as dbAddScore,
  removeScore as dbRemoveScore,
  createUser as dbCreateUser,
  getUserDoc,
  getUser,
  addPrizeStamp as dbAddPrizeStamp,
  addFortuneStamp as dbAddFortuneStamp,
} from "./user"
import { onSnapshot } from "firebase/firestore"
import { Loading } from "@/components/common/Loading"

const auth = getAuth(firebaseApp)

export interface IAuthContext {
  credential: FirebaseUser | null
  user: User | null
  createUser: (body: UserCreateBody) => Promise<void>
  addScore: (score: number) => Promise<void>
  removeScore: () => Promise<void>
  loading: boolean
  addPrizeStamp: () => Promise<void>
  addFortuneStamp: () => Promise<void>
  signinWithGoogle: (redirect?: string | undefined) => Promise<void>
  signout: (redirect?: string) => void
  requireCred: (redirect: string) => void
  requireNotCred: (redirect: string) => void
  requireUser: (redirect: string) => void
  requireGame: (redirect: string) => void
  requireNotUser: (redirect: string) => void
  requireNotGame: (redirect: string) => void
}

const AuthContext = React.createContext<IAuthContext | null>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth()

  if (auth?.loading) {
    return <Loading />
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function useProvideAuth() {
  const [credential, setCredential] = useState<FirebaseUser | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const credTimeoutCancel = setTimeout(() => setLoading(false), 1000)

    const unsubscribe = onAuthStateChanged(auth, (newCredential) => {
      clearTimeout(credTimeoutCancel)

      if (!newCredential || credential) {
        setLoading(false)
        return
      }

      setCredential(newCredential)

      onSnapshot(getUserDoc(newCredential), (data) => {
        setUser(data.data() as User)
      })

      getUser(newCredential).then((user) => {
        if (!user) {
          setLoading(false)
          return
        }
        setUser(user)
        setLoading(false)
      })
    })

    return () => unsubscribe()
  }, [])

  const signinWithGoogle = async (redirect?: string | undefined) => {
    setLoading(true)
    const credential = await signInWithPopup(auth, new GoogleAuthProvider())

    setCredential(credential.user)

    setLoading(false)
    if (redirect) {
      router.push(redirect)
    }
  }

  const signout = async (redirect?: string) => {
    await signOut(auth)

    setCredential(null)
    setUser(null)

    if (redirect) {
      router.push(redirect)
    }
  }

  const createUser = async (createBody: UserCreateBody) => {
    if (!credential) {
      return
    }
    await dbCreateUser(credential, createBody)

    const user = await getUser(credential)

    setUser(user)
  }

  const addPrizeStamp = async () => {
    if (!user || !credential) {
      return
    }

    await dbAddPrizeStamp(credential)
  }

  const addFortuneStamp = async () => {
    if (!user || !credential) {
      return
    }

    await dbAddFortuneStamp(credential)
  }

  const addScore = async (score: number) => {
    if (!user || !credential) {
      return
    }

    await dbAddScore(credential, score)
  }

  const removeScore = async () => {
    if (!user || !credential) {
      return
    }

    await dbRemoveScore(credential)
  }

  const requireCred = (redirect: string) => {
    if (!credential) {
      router.push(redirect)
    }
  }

  const requireUser = (redirect: string) => {
    if (!user) {
      router.push(redirect)
    }
  }

  const requireGame = (redirect: string) => {
    if (!(user?.score ?? 0 > 0)) {
      router.push(redirect)
    }
  }

  const requireNotCred = (redirect: string) => {
    if (credential) {
      router.push(redirect)
    }
  }

  const requireNotUser = (redirect: string) => {
    if (user) {
      router.push(redirect)
    }
  }

  const requireNotGame = (redirect: string) => {
    if (user?.score ?? 0 > 0) {
      router.push(redirect)
    }
  }

  return {
    user,
    credential,
    loading,
    createUser,
    signinWithGoogle,
    signout,
    addPrizeStamp,
    addFortuneStamp,
    addScore,
    removeScore,
    requireUser,
    requireCred,
    requireGame,
    requireNotCred,
    requireNotUser,
    requireNotGame,
  }
}

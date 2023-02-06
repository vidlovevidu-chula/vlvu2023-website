import React, { useState, useEffect, useContext, ReactNode, Dispatch, SetStateAction } from "react"
import Router from "next/router"

import {
  getAuth,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import firebaseApp from "./firebase"
import { User, UserCreateBody, createUser as dbCreateUser, getUser } from "./user"

const auth = getAuth(firebaseApp)

export interface IAuthContext {
  credential: FirebaseUser | null
  user: User | null
  createUser: (body: UserCreateBody) => Promise<void>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  signinWithGoogle: (redirect?: string | undefined) => Promise<void>
  signout: () => void
}

const AuthContext = React.createContext<IAuthContext | null>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function useProvideAuth() {
  const [credential, setCredential] = useState<FirebaseUser | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newCredential) => {
      if (!newCredential || credential) {
        return
      }

      setCredential(newCredential)
    })

    return () => unsubscribe()
  }, [])

  const signinWithGoogle = async (redirect?: string | undefined) => {
    console.log("hello")
    setLoading(true)

    const credential = await signInWithPopup(auth, new GoogleAuthProvider())

    setCredential(credential.user)

    setLoading(false)

    if (redirect) {
      Router.push(redirect)
    }
  }

  const signout = async () => {
    setLoading(true)

    await signOut(auth)
  }

  const createUser = async (createBody: UserCreateBody) => {
    if (!credential) {
      return
    }
    await dbCreateUser(credential, createBody)

    const user = await getUser(credential)

    setUser(user)
  }

  return {
    user,
    credential,
    loading,
    setLoading,
    createUser,
    signinWithGoogle,
    signout,
  }
}

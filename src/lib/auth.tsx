/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useCallback, ReactNode, Dispatch, SetStateAction } from "react"
import Router, { useRouter } from "next/router"

import { getAuth, User, GoogleAuthProvider, signInWithPopup, signOut, onIdTokenChanged } from "firebase/auth"
import { onSnapshot } from "firebase/firestore"
import firebaseApp from "./firebase"
import { createUser, getUserRef, getCurrentUserData } from "./db"

export interface IUserData extends IInitialUserData {
  username: string
  firstname: string
  lastname: string
  // add more
}

interface IInitialUserData {
  uid: string
  email: string | null
  name: string | null
  provider: string
  photoUrl: string | null
}

const auth = getAuth(firebaseApp)

export interface IAuthContext {
  user: User | null
  userData: IUserData | null
  loading: boolean
  // signinWithFacebook: (redirect: string) => Promise<void>
  setLoading: Dispatch<SetStateAction<boolean>>
  signinWithGoogle: (redirect: string) => Promise<void>
  // sendSigninWithEmail: (email: string, emailLink: string) => Promise<void>
  // signinWithEmail: (email: string) => Promise<void>
  signout: () => void
}

const AuthContext = React.createContext<IAuthContext | null>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth()
  const { pathname } = useRouter()

  useEffect(() => {
    // REDIRECT LOGIC

    // const noAuth = auth.user === null
    // const authNoRegistered = auth.user && !(auth?.userData?.username !== "")
    // const registered = auth.user && auth?.userData?.username !== ""
    // const registeredNoGame = auth.user && auth?.userData?.username !== "" && !auth.userData?.ticket
    // const playedGame = auth.user && auth?.userData?.username !== "" && auth.userData?.ticket

    if (auth.loading === false) {
      // INFO - redirect logic here
      // ====
      // register
      // if (pathname === "/register") {
      //   if (authNoRegistered) Router.push("/register/onboard")
      //   else if (registeredNoGame) Router.push("/game")
      //   else if (playedGame) Router.push("/ticket")
      // }
      // onboard
      // else if (pathname === "/register/onboard") {
      //   // if (noAuth) Router.push("/stream")
      //   // else if (registeredNoGame) Router.push("/stream")
      //   // else if (playedGame) Router.push("/stream")
      //   if (noAuth) Router.push("/register")
      //   else if (registeredNoGame) Router.push("/game")
      //   else if (playedGame) Router.push("/ticket")
      // }
      // login
      // else if (pathname === "/login") {
      // if (authNoRegistered) Router.push("/register/onboard")
      // else if (registered) Router.push("/stream")
      // else if (registeredNoGame) Router.push("/stream")
      // else if (playedGame) Router.push("/stream")
      //   if (authNoRegistered) Router.push("/register/onboard")
      //   else if (registered) Router.push("/")
      //   else if (registeredNoGame) Router.push("/game")
      //   else if (playedGame) Router.push("/ticket")
      // }
      // login
      // else if (pathname === "/stream") {
      // if (!playedGame) Router.push("/register")
      // }
      // ticket
      // else if (pathname === "/ticket") {
      //   if (noAuth) Router.push("/register?redirect=ticket")
      //   else if (authNoRegistered) Router.push("/register/onboard?redirect=ticket")
      //   else if (registeredNoGame) Router.push("/game")
      // }
      // game
      // else if (pathname === "/game") {
      //   if (noAuth) Router.push("/register?redirect=game")
      //   else if (authNoRegistered) Router.push("/register/onboard?redirect=game")
      //   else if (playedGame) Router.push("/ticket")
      // }
    }
  }, [pathname, auth])

  if (auth.loading) {
    return <span>loading...</span>
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<IUserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.uid) {
      const userRef = getUserRef(user.uid)

      const unsubscribe = onSnapshot(userRef, (doc) => {
        setUserData((data) => {
          if (data) {
            return { ...data, ...doc.data() }
          } else return null
        })
      })

      return () => {
        unsubscribe()
        setUserData(null)
      }
    }
  }, [user?.uid])

  const handleUser = useCallback(
    async (rawUser: User | null) => {
      if (rawUser && user === null) {
        // if user not already created
        const user = formatUser(rawUser)
        await createUser(user.uid, user)

        setUser(rawUser)
        const tmpData: any = await getCurrentUserData(user.uid)
        setUserData({
          username: "",
          firstname: "",
          lastname: "",
          ...tmpData,
        })
        setLoading(false)
      } else if (rawUser === null) {
        setUser(null)
        setUserData(null)
        setLoading(false)
      }
    },
    [user]
  )

  // const signinWithFacebook = async (redirect: string) => {
  //   setLoading(true)

  //   const response = await signInWithPopup(auth, new FacebookAuthProvider())

  //   handleUser(response.user)

  //   if (redirect) {
  //     Router.push(redirect)
  //   }
  // }

  const signinWithGoogle = async (redirect: string) => {
    setLoading(true)

    const response = await signInWithPopup(auth, new GoogleAuthProvider())

    handleUser(response.user)

    if (redirect) {
      Router.push(redirect)
    }
  }

  // const sendSigninWithEmail = async (email: string, emailLink: string) => {
  //   await sendSignInLinkToEmail(auth, email, {
  //     url: emailLink,
  //     handleCodeInApp: true,
  //   })
  //     .then(() => {
  //       // The link was successfully sent. Inform the user.
  //       window.localStorage.setItem("emailForSignIn", email)
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code
  //       const errorMessage = error.message

  //       console.error(`${errorCode} - ${errorMessage}`)
  //     })
  // }

  // const signinWithEmail = async (email: string) => {
  //   setLoading(true)

  //   if (isSignInWithEmailLink(auth, window.location.href)) {
  //     const response = await signInWithEmailLink(auth, email, window.location.href)
  //     window.localStorage.removeItem("emailForSignIn")
  //     handleUser(response.user)
  //   }
  // }

  const signout = async () => {
    setLoading(true)

    await handleUser(null)

    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser)

    return () => unsubscribe()
  }, [handleUser])

  return {
    user,
    userData,
    loading,
    setLoading,
    // signinWithFacebook,
    signinWithGoogle,
    // sendSigninWithEmail,
    // signinWithEmail,
    signout,
  }
}

const formatUser = (user: User): IInitialUserData => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}

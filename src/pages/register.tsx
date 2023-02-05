import { Button } from "@components/common/Button"
import firebaseApp from "@lib/firebase"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import Image from "next/image"

export default function Register() {
  const auth = getAuth(firebaseApp)

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider()

    await signInWithPopup(auth, provider)
  }

  const emailLogin = async () => {}

  return (
    <div className="bg-vlvu-pink-100 font-display min-h-screen w-full">
      <main className="text-vlvu-pink-500 mx-auto max-w-lg">
        <div className="flex flex-col items-center justify-center h-screen gap-6">
          <div>
            <h1 className="font-semibold text-3xl text-center">Register</h1>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              type="primary"
              onClick={googleLogin}
              className="bg-white flex gap-6 px-3 items-center pr-8 content-start"
            >
              <Image src="/assets/google-logo.svg" alt="google icon" height="32px" width="32px" />
              <span className="grow text-start text-gray-500 font-semibold">Sign in with Google</span>
            </Button>
            <Button
              type="primary"
              onClick={emailLogin}
              className="bg-white flex gap-6 px-3 items-center pr-8 content-start"
            >
              <Image src="/assets/email.svg" alt="email icon" height="32px" width="32px" />
              <span className="grow text-start text-gray-500 font-semibold">Sign in with Email</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

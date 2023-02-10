import { Button } from "@/components/common/Button"
import { Loading } from "@/components/common/Loading"
import { useAuth } from "@/lib/auth"
import GoogleIcon from "@/vectors/icons/google"
import { useEffect } from "react"

export default function Register() {
  const auth = useAuth()

  if (auth?.loading) {
    return <Loading />
  }

  useEffect(() => {
    auth?.requireNotUser("/game")
    auth?.requireNotCred("/registerform")
  }, [])

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
              onClick={() => {
                auth?.signinWithGoogle("/registerform")
              }}
              className="bg-white flex gap-6 px-8 items-center content-start"
            >
              <GoogleIcon height="32" width="32" className="" />
              <span className="grow text-start text-gray-500 font-semibold">Sign in with Google</span>
            </Button>
            {/* <LinkButton
              type="primary"
              href="/emailregister"
              className="bg-white flex gap-6 px-8 items-center content-start"
            >
              <Image src="/assets/email.svg" alt="email icon" height="32px" width="32px" />
              <span className="grow text-start text-gray-500 font-semibold">Sign in with Email</span>
            </LinkButton> */}
          </div>
        </div>
      </main>
    </div>
  )
}

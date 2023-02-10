import { FlowerType, getFlowerType } from "@/data/flower"
import { Ticket } from "@/components/common/Ticket"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "@/lib/auth"

export default function Card() {
  const nickname = "username"
  const flower = "daisy"

  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    auth?.requireCred("/register")
    auth?.requireUser("/registerform")
  }, [])

  if (!auth?.loading && !auth?.user?.score) {
    router.push("/game")
  }

  return (
    <div className="bg-vlvu-pink-100 min-h-screen flex justify-center items-center">
      <Ticket
        nickname={(auth?.user?.nickname as string) ?? ""}
        flower={getFlowerType(auth?.user?.score ?? 0) as FlowerType}
      />
    </div>
  )
}

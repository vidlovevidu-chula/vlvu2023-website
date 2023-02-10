import { FlowerType } from "@/@types/flower"
import { Ticket } from "@/components/common/Ticket"
import { useRouter } from "next/router"

export default function Card() {
  const nickname = "username"
  const flower = "daisy"

  return (
    <div className="bg-vlvu-pink-100 min-h-screen flex justify-center items-center">
      <Ticket nickname={(nickname as string) ?? ""} flower={(flower as FlowerType) ?? "daisy"} />
    </div>
  )
}

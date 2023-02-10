import { FlowerType } from "@/@types/flower"
import { Ticket } from "@/components/common/Ticket"
import { useRouter } from "next/router"

export default function Card() {
  const router = useRouter()

  const { flower, nickname } = router?.query

  return (
    <div>
      <Ticket nickname={(nickname as string) ?? ""} flower={(flower as FlowerType) ?? "daisy"} />
    </div>
  )
}

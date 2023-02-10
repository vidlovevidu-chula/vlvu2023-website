import { FlowerType } from "@/data/flower"
import { Ticket } from "@/components/common/Ticket"
import { useRouter } from "next/router"

export default function Card() {
  const router = useRouter()

  const { flower, nickname, uid } = router?.query

  return (
    <div>
      <Ticket
        nickname={(nickname as string) ?? ""}
        flower={(flower as FlowerType) ?? "daisy"}
        uid={(uid as string) ?? ""}
      />
    </div>
  )
}

import ticketBGImg from "@/images/ticket/bg.svg"
import Image from "next/image"

import daisyImg from "@/images/flower/daisy.png"
import forgetMeNotImg from "@/images/flower/forget_me_not.png"
import roseImg from "@/images/flower/rose.png"
import sunflowerImg from "@/images/flower/sunflower.png"
import tulipImg from "@/images/flower/tulip.png"
import { FlowerType } from "@/data/flower"
import FlowerImg from "./FlowerImg"

export function Ticket({ nickname, flower }: { nickname: string; flower: FlowerType }) {
  return (
    <div className="relative">
      <div style={{ top: "5.5rem" }} className="absolute left-1/2 -translate-x-1/2 z-20">
        <p style={{ width: "15rem" }} className="text-vlvu-pink-600 font-bold font-name text-4xl text-center">
          {nickname}
        </p>
      </div>

      {/* width={624} height={1300} */}
      <Image src={ticketBGImg} alt="bg" />

      <div style={{ right: "2.25rem", bottom: "4rem" }} className="absolute">
        <FlowerImg type={flower} />
      </div>
    </div>
  )
}

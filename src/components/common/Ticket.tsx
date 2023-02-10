import ticketBGImg from "@/images/ticket/bg.svg"
import Image from "next/image"

import daisyImg from "@/images/flower/daisy.png"
import forgetMeNotImg from "@/images/flower/forget_me_not.png"
import roseImg from "@/images/flower/rose.png"
import sunflowerImg from "@/images/flower/sunflower.png"
import tulipImg from "@/images/flower/tulip.png"
import { FlowerType } from "@/@types/flower"

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
        {flower === "daisy" && <Image width={100} height={100} src={daisyImg} alt="flower" />}
        {flower === "forgetMeNot" && <Image width={100} height={100} src={forgetMeNotImg} alt="flower" />}
        {flower === "rose" && <Image width={100} height={100} src={roseImg} alt="flower" />}
        {flower === "sunflower" && <Image width={100} height={100} src={sunflowerImg} alt="flower" />}
        {flower === "tulip" && <Image width={100} height={100} src={tulipImg} alt="flower" />}
      </div>
    </div>
  )
}

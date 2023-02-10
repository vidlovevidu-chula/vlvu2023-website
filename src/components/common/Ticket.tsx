import ticketBGImg from "@/images/ticket/bg.svg"
import Image from "next/image"

import { FlowerType } from "@/data/flower"
import FlowerImg from "./FlowerImg"

import QRCode from "react-qr-code"

export function Ticket({ nickname, flower, uid }: { nickname: string; flower: FlowerType; uid: string }) {
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

      <div style={{ left: "2.5rem", bottom: "4rem" }} className="absolute">
        <QRCode
          size={80}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={uid}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  )
}

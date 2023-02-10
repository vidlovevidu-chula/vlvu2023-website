import { FlowerType } from "@/data/flower"

import daisyImg from "@/images/flower/daisy.png"
import forgetMeNotImg from "@/images/flower/forget_me_not.png"
import roseImg from "@/images/flower/rose.png"
import sunflowerImg from "@/images/flower/sunflower.png"
import tulipImg from "@/images/flower/tulip.png"
import Image from "next/image"

export default function FlowerImg({
  className,
  width,
  height,
  type,
}: {
  className?: string
  width?: number
  height?: number
  type: FlowerType
}) {
  const flowerSrc = {
    daisy: daisyImg,
    forgetMeNot: forgetMeNotImg,
    rose: roseImg,
    sunflower: sunflowerImg,
    tulip: tulipImg,
  }

  return (
    <div className={className}>
      <Image src={flowerSrc[type]} alt="flower" width={width ?? 100} height={height ?? 100} />
    </div>
  )
}

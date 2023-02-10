import { ImageResponse } from "@vercel/og"
import { NextApiRequest, NextApiResponse } from "next"

const qrcode = require("yaqrcode")

export const config = {
  runtime: "experimental-edge",
}

const RobotoSlab = fetch(new URL("../../fonts/RobotoSlab-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer())
const BGImgSrc = fetch(new URL("../../images/ticket/bg.png", import.meta.url))
  .then((res) => res.blob())
  .then((blob) => URL.createObjectURL(blob))

const SIZE = 180

// Flowers

const daisyImgSrc = fetch(new URL(`../../images/flower/daisy.png`, import.meta.url))
  .then((res) => res.blob())
  .then((blob) => URL.createObjectURL(blob))

const forgetMeNotImgSrc = fetch(new URL(`../../images/flower/forget_me_not.png`, import.meta.url))
  .then((res) => res.blob())
  .then((blob) => URL.createObjectURL(blob))

const roseImgSrc = fetch(new URL(`../../images/flower/rose.png`, import.meta.url))
  .then((res) => res.blob())
  .then((blob) => URL.createObjectURL(blob))

const sunflowerImgSrc = fetch(new URL(`../../images/flower/sunflower.png`, import.meta.url))
  .then((res) => res.blob())
  .then((blob) => URL.createObjectURL(blob))

const tulipImgSrc = fetch(new URL(`../../images/flower/tulip.png`, import.meta.url))
  .then((res) => res.blob())
  .then((blob) => URL.createObjectURL(blob))

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url ?? "")
  const uid = url.searchParams.get("uid") ?? ""
  const name = url.searchParams.get("name") ?? ""
  const type = ["daisy", "forget_me_not", "rose", "sunflower", "tulip"].includes(url.searchParams.get("type") ?? "")
    ? (url.searchParams.get("type") as string)
    : "daisy"

  const RobotoSlabData = await RobotoSlab

  const base64 = qrcode(uid, {
    size: SIZE,
  })

  return new ImageResponse(
    (
      <div
        style={{ fontFamily: "Roboto Slab" }}
        tw="text-6xl bg-white font-bold bg-[#FFF2F4] w-full h-full flex flex-col items-center justify-center text-center relative"
      >
        <div tw="absolute flex top-0 left-0">
          <img alt="bg" height={1300} width={620} src={await BGImgSrc} />
        </div>
        <div
          style={{
            zIndex: "50",
            top: name.length <= 13 ? 130 : 145,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          tw="flex absolute"
        >
          <p
            style={{
              fontSize: name.length <= 13 ? 64 : 36,
            }}
            tw="text-[#C697C5]"
          >
            {name.length <= 18 ? name : name.slice(0, 18) + "..."}
          </p>
        </div>
        <div style={{ zIndex: "50", bottom: 90, left: 75 }} tw="flex absolute">
          <img alt="QR" height={SIZE} src={base64} width={SIZE} />
        </div>

        <div style={{ zIndex: "50", bottom: 130, right: 90 }} tw="flex absolute">
          {type === "daisy" && <img alt="daisy" height={150} src={await daisyImgSrc} width={150} />}
          {type === "forget_me_not" && (
            <img alt="forget_me_not" height={150} src={await forgetMeNotImgSrc} width={150} />
          )}
          {type === "rose" && <img alt="rose" height={150} src={await roseImgSrc} width={150} />}
          {type === "sunflower" && <img alt="sunflower" height={150} src={await sunflowerImgSrc} width={150} />}
          {type === "tulip" && <img alt="tulip" height={150} src={await tulipImgSrc} width={150} />}
        </div>
      </div>
    ),
    {
      width: 620,
      height: 1300,
      fonts: [
        {
          name: "Roboto Slab",
          data: RobotoSlabData,
          weight: 600,
          style: "normal",
        },
      ],
    }
  )
}

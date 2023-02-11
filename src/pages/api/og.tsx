import { ImageResponse } from "@vercel/og"
import { NextApiRequest, NextApiResponse } from "next"

const qrcode = require("yaqrcode")

export const config = {
  runtime: "experimental-edge",
}

const RobotoSlab = fetch(new URL("../../fonts/RobotoSlab-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer())

const RATIO = 1.3
const FLOWER_SIZE = ~~(150 * RATIO)
const SIZE = ~~(180 * RATIO)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
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
        <div tw="bg-[#FFF2F4] flex justify-center items-center w-full h-full">
          <div
            style={{ fontFamily: "Roboto Slab", width: 620 * RATIO, height: 1300 * RATIO }}
            tw="text-6xl font-bold flex flex-col items-center justify-center text-center relative"
          >
            <div tw="absolute flex top-0 left-0">
              <img alt="bg" height={1300 * RATIO} width={620 * RATIO} src={`${url.origin}/assets/bg.png`} />
            </div>
            <div
              style={{
                zIndex: "50",
                top: name.length <= 13 ? 140 * RATIO : 150 * RATIO,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              tw="flex absolute"
            >
              <p
                style={{
                  fontSize: name.length <= 13 ? 64 * RATIO : 42 * RATIO,
                }}
                tw="text-[#C697C5]"
              >
                {name.length <= 18 ? name : name.slice(0, 18) + "..."}
              </p>
            </div>
            <div style={{ zIndex: "50", bottom: 90 * RATIO, left: 75 * RATIO }} tw="flex absolute">
              <img alt="QR" height={SIZE} src={base64} width={SIZE} />
            </div>

            <div style={{ zIndex: "50", bottom: 130 * RATIO, right: 82.5 * RATIO }} tw="flex absolute">
              <img
                alt="flower"
                height={FLOWER_SIZE * RATIO}
                src={`${url.origin}/assets/flower/${type}.png`}
                width={FLOWER_SIZE * RATIO}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
        fonts: [
          {
            name: "Roboto Slab",
            data: RobotoSlabData,
            weight: 600,
            style: "normal",
          },
        ],
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers":
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      }
    )
  } catch (e: any) {
    console.error(`ERROR : ${e.message}`)
    return new Response(`Failed to generate the image:\n${e.message}`, {
      status: 500,
    })
  }
}

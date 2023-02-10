import screenshot from "@/lib/screenshot"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getTicket(req: NextApiRequest, res: NextApiResponse) {
  const { nickname, flower } = JSON.parse(req.body)

  const file = await screenshot(
    `${getProtocol(req)}://${req.headers.host}/render?nickname=${nickname}&flower=${flower}`
  )

  res.setHeader("Content-Type", `image/png`)
  res.setHeader("Cache-Control", `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`)
  res.statusCode = 200
  res.end(file)
}

const getProtocol = (req: NextApiRequest) => (req.headers.host?.includes("localhost") ? "http" : "https")

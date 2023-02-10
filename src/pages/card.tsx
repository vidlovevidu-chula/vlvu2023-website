import { FlowerType, getFlowerType } from "@/data/flower"
import { Ticket } from "@/components/common/Ticket"
import { useRouter } from "next/router"
import { SVGAttributes, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { Button, LinkButton } from "@/components/common/Button"
import { motion } from "framer-motion"

function DownloadIcon({ ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  )
}

function SignOutButton({ ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path
        fill-rule="evenodd"
        d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
        clip-rule="evenodd"
      />
    </svg>
  )
}

export default function Card() {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    auth?.requireCred("/register")
    auth?.requireUser("/registerform")
  }, [])

  if (!auth?.loading && !auth?.user?.score) {
    router.push("/game")
  }

  return (
    <div className="bg-vlvu-pink-100 min-h-screen flex flex-col justify-center items-center pt-6 pb-20 font-display">
      <div className="flex justify-end absolute top-0 w-full z-50 p-6">
        <Button
          onClick={() => {
            auth?.signout("/")
          }}
          type="white"
          className="shadow-md w-[10rem] px-0 text-sm flex gap-1 justify-center items-center"
        >
          <SignOutButton className="w-5 h-5 text-vlvu-pink-500" />
          <span>ออกจากระบบ</span>
        </Button>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Ticket
          nickname={(auth?.user?.nickname as string) ?? ""}
          flower={getFlowerType(auth?.user?.score ?? 0) as FlowerType}
          uid={(auth?.credential?.uid as string) ?? ""}
        />
      </motion.div>

      <div className="flex flex-col gap-4 mt-6 max-w-xs w-full">
        <LinkButton href="/game" type="secondary" className="shadow-md w-full">
          ดูคำทำนาย
        </LinkButton>
        <Button
          onClick={() => {
            // auth?.signout("/")
          }}
          type="white"
          className="shadow-md w-full flex gap-1 justify-center items-center"
        >
          <DownloadIcon className="w-6 h-6 text-vlvu-pink-500" />
          <span>ดาวน์โหลด</span>
        </Button>
      </div>
    </div>
  )
}

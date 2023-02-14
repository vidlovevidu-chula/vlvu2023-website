import { LinkButton } from "@/components/common/Button"
import { useAuth } from "@/lib/auth"
import { useEffect } from "react"

import ChevRonLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon"
import Image from "next/image"

import EStamp1Src from "@/images/estamp/1.png"
import EStamp2Src from "@/images/estamp/2.png"
import clsx from "clsx"
import QrCodeIcon from "@heroicons/react/24/solid/QrCodeIcon"

export default function EStampPage() {
  const auth = useAuth()

  useEffect(() => {
    auth?.requireCred("/register")
    auth?.requireUser("/registerform")
    auth?.requireGame("/game")
  }, [])

  return (
    <div className="min-h-screen w-full h-full py-12 bg-vlvu-pink-100 text-vlvu-pink-600 font-display">
      <section className="flex flex-col items-center w-full max-w-lg px-6 mx-auto gap-6">
        <LinkButton type="white" className="flex items-center justify-center w-48 py-3 shadow-md" href="/card">
          <ChevRonLeftIcon className="w-5 h-5 text-vlvu-pink-500" />

          <span>กลับสู่หน้า E-Ticket</span>
        </LinkButton>

        <h1 className="text-xl text-center sm:text-4xl font-bold">E-Stamp</h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center rounded-lg">
            <div
              className={clsx(
                "w-64 h-64 relative bg-vlvu-pink-100 sm:w-52 sm:h-52",
                !auth?.user?.prizeStamp && "grayscale"
              )}
            >
              <Image src={EStamp1Src} layout="fill" objectFit="contain" />
            </div>
            <div
              className={clsx(
                "w-64 h-64 relative bg-vlvu-pink-100 sm:w-52 sm:h-52",
                !auth?.user?.fortuneStamp && "grayscale"
              )}
            >
              <Image src={EStamp2Src} layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>

        <section className="flex flex-col gap-2 max-w-xs w-full mt-4">
          <LinkButton
            href="/estamp/scanner"
            type="secondary"
            className="shadow-md px-0 py-3 w-full flex gap-1 justify-center items-center"
          >
            <QrCodeIcon className="w-5 h-5 text-white" />
            <span>สแกนรับ E-Stamp</span>
          </LinkButton>
        </section>
      </section>
    </div>
  )
}

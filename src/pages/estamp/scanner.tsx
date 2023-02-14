import React, { useState, useRef, useEffect, ReactNode } from "react"
import { QrReader } from "react-qr-reader"

import { useAuth } from "@/lib/auth"
import { LinkButton } from "@/components/common/Button"
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon"
import { useRouter } from "next/router"

function FocusRing({ color }: { color?: number }) {
  const FDVariant = color
  return (
    <svg width="200" height="200" viewBox="0 0 241 238" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M34.0939 3C20.3234 2.99999 1.38818 5.34239 3.10953 37.5487"
        stroke={FDVariant === 1 ? "white" : "rgb(152 48 85)"}
        strokeWidth="5.75812"
        strokeLinecap="round"
      />
      <path
        d="M204.534 3C219.325 2.99999 239.662 5.34239 237.814 37.5487"
        stroke={FDVariant === 1 ? "white" : "rgb(152 48 85)"}
        strokeWidth="5.75812"
        strokeLinecap="round"
      />
      <path
        d="M204.534 234.477C219.325 234.477 239.662 232.134 237.814 199.928"
        stroke={FDVariant === 1 ? "white" : "rgb(152 48 85)"}
        strokeWidth="5.75812"
        strokeLinecap="round"
      />
      <path
        d="M34.0939 234.477C20.3234 234.477 1.38818 232.134 3.10953 199.928"
        stroke={FDVariant === 1 ? "white" : "rgb(152 48 85)"}
        strokeWidth="5.75812"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Scan() {
  const auth = useAuth()
  const [data, setData] = useState<string | null>(null)
  const [FDVariant, setFDVariant] = useState<number>(0)

  const [status, setStatus] = useState<"notStamped" | "stamped">("notStamped")

  const router = useRouter()

  useEffect(() => {
    auth?.requireCred("/register")
    auth?.requireUser("/registerform")
    auth?.requireGame("/game")
  }, [])

  const descriptionVariants: Record<string, ReactNode> = {
    notStamped: (
      <span key="notStamped" className="bg-[#C9CCE9] py-1 px-5 rounded-full">
        <span className="text-white font-semibold">NOT STAMPED</span>
      </span>
    ),
    stamped: (
      <div key="stamped" className="bg-vlvu-pink-600 text-white text-center py-1 px-5 rounded-full">
        <span className="text-white font-semibold">SUCCESSFULLY STAMPED</span>
      </div>
    ),
  }

  useEffect(() => {
    const getData = async (data: string) => {
      try {
        switch (data) {
          // estamop 1
          case "f1173bfd07de97b233cbabf01317a980af8f0c7e2c599e776fc15f982f0a462f": {
            await auth?.addPrizeStamp()
            setStatus("stamped")
            router.push("/estamp")
            return
          }
          // estamop 2
          case "1f9b69d5311f0e69d91ee359799d52a6457496810927f2123de78889dd4bfb18": {
            await auth?.addFortuneStamp()
            setStatus("stamped")
            router.push("/estamp")
            return
          }
          default: {
            setStatus("notStamped")
            return
          }
        }
      } catch (error) {
        setStatus("notStamped")
      }
    }

    if (data) getData(data)
  }, [data])

  // if (auth?.user?.roles?.hasOwnProperty("tucmc") || auth?.user?.roles?.hasOwnProperty("aic"))
  return (
    <div className="flex flex-col items-center justify-center bg-vlvu-pink-100 font-display min-h-screen">
      <div className="flex flex-col items-center mt-10 gap-4">
        <LinkButton type="white" className="flex items-center justify-center w-48 py-3 shadow-md" href="/estamp">
          <ChevronLeftIcon className="w-5 h-5 text-vlvu-pink-500" />

          <span>กลับสู่หน้า E-Stamp</span>
        </LinkButton>

        <div
          style={{ background: "linear-gradient(180deg, #D05783 0%, #E8B0B9 100%)" }}
          className="flex items-center justify-center h-[250px] w-[250px] rounded-[26.9px]"
        >
          <div className="h-[220px] w-[220px] bg-[#130D03] relative rounded-[25.56px] object-hidden">
            <QrReader
              className="absolute w-[220px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              onResult={(result, error) => {
                if (result) {
                  setData(result.getText())
                  setFDVariant(1)
                }
                if (error) {
                  setData(null)
                  setFDVariant(0)
                  setStatus("notStamped")
                }
              }}
              constraints={{ facingMode: "environment" }}
              containerStyle={{ borderRadius: "25.56px" }}
            />

            <div className="absolute flex items-center justify-center w-full h-full">
              <FocusRing color={FDVariant} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4 w-[191px]">
          <div className="mb-2">{descriptionVariants[status]}</div>
        </div>
      </div>
    </div>
  )
}

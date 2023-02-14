import React, { useState, useRef, useEffect, ReactNode } from "react"
import { QrReader } from "react-qr-reader"

import { useAuth } from "@/lib/auth"
import { LinkButton } from "@/components/common/Button"
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon"
import { useRouter } from "next/router"
import clsx from "clsx"
import { User } from "@/lib/user"
import { redeemFortune, redeemPrize } from "@/lib/staff"

function ButtonButton({
  disabled,
  onClick,
  children,
}: {
  disabled?: boolean
  onClick?: () => void
  children?: string
}) {
  return (
    <button
      onClick={() => onClick && onClick()}
      disabled={disabled}
      className={clsx(
        disabled ? "bg-gray-300 text-white cursor-not-allowed" : "bg-vlvu-pink-500 text-white",
        "py-2 px-6 rounded-lg shadow-md font-semibold text-lg"
      )}
    >
      {children}
    </button>
  )
}

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
  const [UIDData, setUIDData] = useState<string | null>(null)
  const [FDVariant, setFDVariant] = useState<number>(0)

  const [status, setStatus] = useState<"notScanned" | "scanned">("notScanned")
  const router = useRouter()

  const [user, setUser] = useState<(User & { uid: string }) | null>(null)

  useEffect(() => {
    if (!auth?.isStaff) {
      router.push("/")
    }
  }, [auth])

  const getData = async (data: string) => {
    try {
      // fetch data
      const res = await auth?.getUserByUID(data)

      if (res) {
        setUser({ ...res, uid: data })
        setStatus("scanned")
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
      setStatus("notScanned")
    }
  }

  useEffect(() => {
    if (UIDData) getData(UIDData)
  }, [UIDData])

  function getStampStatus(stampType: "prize" | "fortune"): [boolean, string] {
    if (!user) return [true, "Not Scanned"]

    if (stampType === "prize") {
      if (!user?.prizeStamp) return [true, "ยังไม่ได้รับ Stamp"]
      if (!user?.prizeRedeemed) return [false, "Redeem"]
      else return [true, "Already Redeemed"]
    } else if (stampType === "fortune") {
      if (!user?.fortuneStamp) return [true, "ยังไม่ได้รับ Stamp"]
      if (!user?.fortuneRedeemed) return [false, "Redeem"]
      else return [true, "Already Redeemed"]
    } else return [true, ""]
  }

  if (auth?.isStaff)
    return (
      <div className="flex flex-col items-center justify-center bg-vlvu-pink-100 font-display min-h-screen">
        <div className="flex flex-col items-center mt-10 gap-4">
          <h1 className="text-xl text-vlvu-pink-500 font-semibold">View User Data</h1>

          <div
            style={{ background: "linear-gradient(180deg, #D05783 0%, #E8B0B9 100%)" }}
            className="flex items-center justify-center h-[250px] w-[250px] rounded-[26.9px]"
          >
            <div className="h-[220px] w-[220px] bg-[#130D03] relative rounded-[25.56px] object-hidden">
              <QrReader
                className="absolute w-[220px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                onResult={(result, error) => {
                  if (result) {
                    setUIDData(result.getText())
                    setFDVariant(1)
                  }
                  if (error) {
                    setUIDData(null)
                    setFDVariant(0)
                    setStatus("notScanned")
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
          <div className="flex flex-col items-center mt-4 w-full max-w-md">
            <div className="bg-white rounded-lg shadow-md p-4 w-full flex flex-col gap-4 text-vlvu-pink-500">
              <h2 className="font-semibold">ชื่อ : {user?.name}</h2>

              {user && (
                <>
                  <p>E-Stamp 1 &#40;ของรางวัล&#41;</p>

                  <ButtonButton
                    onClick={() => {
                      redeemPrize(user?.uid ?? "").then((e) => {
                        if (e === null) getData(user?.uid ?? "")
                      })
                    }}
                    disabled={getStampStatus("prize")[0]}
                  >
                    {getStampStatus("prize")[1]}
                  </ButtonButton>

                  <p>E-Stamp 2 &#40;ดูดวง&#41;</p>

                  <ButtonButton
                    onClick={() => {
                      redeemFortune(user?.uid ?? "").then((e) => {
                        if (e === null) getData(user?.uid ?? "")
                      })
                    }}
                    disabled={getStampStatus("fortune")[0]}
                  >
                    {getStampStatus("fortune")[1]}
                  </ButtonButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
}

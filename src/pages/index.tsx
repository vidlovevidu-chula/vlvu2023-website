import { LinkButton } from "@/components/common/Button"
import { easeInOut, motion } from "framer-motion"
import React, { useEffect } from "react"
import { useState } from "react"
import { Cloud } from "@/components/common/Cloud"
import { FlyInBackground } from "@/components/common/FlyInBackground"
import { HandFlower } from "@/components/common/HandFlower"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/router"

function WelcomeText() {
  const initText = "Ready ?"
  const [text, setText] = useState(initText)
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    auth?.requireNotGame("/card")
  }, [router])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={easeInOut}
      className="flex flex-col items-center justify-center gap-6 absolute z-30 bottom-32 left-1/2 -translate-x-1/2 w-full"
    >
      <div>
        <h1 className="text-[2.7rem] text-center">Welcome!</h1>
        <p className="text-center text-[1.2rem] sm:text-lg mt-[7px]">มาตามหาดอกไม้สำหรับคุณกัน</p>
      </div>

      <LinkButton
        href="/register"
        type="primary"
        className="text-2xl sm:text-lg py-2 px-14"
        onMouseOver={() => {
          setText("Let start !")
        }}
        onMouseLeave={() => {
          setText(initText)
        }}
      >
        {text}
      </LinkButton>
    </motion.div>
  )
}

const variants1 = {
  hidden: {
    opacity: 0,
    x: "-100%",
  },
  visible: {
    opacity: 1,
    y: "25vh",
    x: "-10%",
  },
  end: {},
}

const variants2 = {
  hidden: {
    opacity: 0,
    x: "200%",
  },
  visible: {
    opacity: 1,
    y: "17vh",
    x: "62%",
  },
  end: {},
}

const variants3 = {
  hidden: {
    opacity: 0,
    x: "200%",
  },
  visible: {
    opacity: 1,
    y: "43vh",
    x: "52%",
  },
  end: {},
}

export default function Home() {
  return (
    <div className="bg-vlvu-pink-100 font-display min-h-screen w-full font-semibold overflow-hidden">
      <main className="text-vlvu-pink-500 mx-auto max-w-lg relative min-h-screen">
        <div>
          <FlyInBackground />
        </div>
        <HandFlower />
        <Cloud variants={variants1}></Cloud>
        <Cloud variants={variants2}></Cloud>
        <Cloud variants={variants3}></Cloud>
        <WelcomeText />
      </main>
    </div>
  )
}

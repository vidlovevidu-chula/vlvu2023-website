import { LinkButton } from "@/components/common/Button"
import { easeInOut, motion } from "framer-motion"
import { DescribeRoute } from "@/components/Meta/DescribeRoute"
import React, { useEffect } from "react"
import { useState } from "react"
import Image from "next/image"
import { Cloud } from "@/components/common/Cloud"
import { FlyInBackground } from "@/components/common/FlyInBackground"
import { HandFlower } from "@/components/common/HandFlower"
import { useAuth } from "@/lib/auth"

function WelcomeText() {
  const initText = "Ready ?"
  const [text, setText] = useState(initText)
  const auth = useAuth()

  useEffect(() => {
    auth?.requireNotGame("/card")
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={easeInOut}
      className="flex flex-col items-center justify-center h-screen gap-6 relative z-30 top-48"
    >
      <div>
        <h1 className="text-6xl sm:text-3xl text-center">Welcome!</h1>
        <p className="text-center text-2xl sm:text-lg mt-[7px]">มาตามหาดอกไม้สำหรับคุณกัน</p>
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
    y: "20vh",
    x: "0",
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
    y: "12vh",
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
    y: "30vh",
    x: "52%",
  },
  end: {},
}

export default function Home() {
  return (
    <DescribeRoute title="Vid Love Vid U" description="Vid Love Vid U">
      <div className="bg-vlvu-pink-100 font-display min-h-screen w-full font-semibold overflow-hidden">
        <main className="text-vlvu-pink-500 mx-auto max-w-lg relative">
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
    </DescribeRoute>
  )
}

import { LinkButton } from "@/components/common/Button"
import { easeInOut, motion } from "framer-motion"
import { DescribeRoute } from "@/components/Meta/DescribeRoute"
import React from "react"
import { useState } from "react"
import Image from "next/image"

function WelcomeText() {
  const initText = "Ready ?"
  const [text, setText] = useState(initText)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={easeInOut}
      className="flex flex-col items-center justify-center h-screen gap-6"
    >
      <div>
        <h1 className="text-lg text-center text-[32px] h-[39px]">Welcome!</h1>
        <p className="text-center mt-[7px]">มาตามหาดอกไม้สำหรับคุณกัน</p>
      </div>

      <LinkButton
        href="/register"
        type="primary"
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

function FlyInBackground() {
  return(
    <motion.div
      initial={{ opacity: 1 , y: 100 }}
      animate={{ opacity: 1 , y: 0 }}
      exit={{ opacity: 0 }}
      transition={{duration: 3}}
    >
      <div>
        <Image src="/assets/purple-bg.svg" width="318px" height="245.5px" />
      </div>
    </motion.div>
  )
}

export default function Home() {
  return (
    <DescribeRoute title="Vid Love Vid U" description="Vid Love Vid U">
      <div className="bg-vlvu-pink-100 font-display min-h-screen w-full font-semibold ">
        <main className="text-vlvu-pink-500 mx-auto max-w-lg">
          <FlyInBackground />
          <WelcomeText />
        </main>
      </div>
    </DescribeRoute>
  )
}

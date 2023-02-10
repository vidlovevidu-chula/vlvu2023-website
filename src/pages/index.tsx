import { LinkButton } from "@/components/common/Button"
import { easeInOut, motion } from "framer-motion"
import { DescribeRoute } from "@/components/Meta/DescribeRoute"
import React from "react"
import { useState } from "react"
import Image from "next/image"
import { Cloud } from "@/components/common/Cloud"

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
      initial={{ opacity: 0 , y: "-100vh" }}
      animate={{ opacity: 1 , y: "10vh" ,x: "0"}}
      exit={{ opacity: 0 }}
      transition={{duration: 1}}
    >
      <div className="items-center justify-items-center">
        <Image src="/assets/purple-bg.svg" width="318px" height="245.5px" />
      </div>
    </motion.div>
  )
}

const variants1 = {
  hidden: {
    opacity: 0 , 
    y: "-100vh"
  },
  visible: {
    opacity: 1 , 
    y: "0vh" ,
    x: "0"
  },
  end:{

  }
}

const variants2 = {
  hidden: {
    opacity: 0 , 
    y: "-100vh"
  },
  visible: {
    opacity: 1 , 
    y: "20vh" ,
    x: "0"
  },
  end:{

  }
}

const variants3 = {
  hidden: {
    opacity: 0 , 
    y: "-100vh"
  },
  visible: {
    opacity: 1 , 
    y: "40vh" ,
    x: "0"
  },
  end:{

  }
}


export default function Home() {
  return (
    <DescribeRoute title="Vid Love Vid U" description="Vid Love Vid U">
      <div className="bg-vlvu-pink-100 font-display min-h-screen w-full font-semibold ">
        <main className="text-vlvu-pink-500 mx-auto max-w-lg">
          <div>
            <FlyInBackground />
          </div>
          <Cloud variants={variants1}></Cloud>
          <Cloud variants={variants2}></Cloud>
          <Cloud variants={variants3}></Cloud>
          <WelcomeText />
        </main>
      </div>
    </DescribeRoute>
  )
}

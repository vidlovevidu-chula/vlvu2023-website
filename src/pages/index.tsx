import { LinkButton } from "@/components/common/Button"
import { easeInOut, motion } from "framer-motion"
import React, { useEffect } from "react"
import { useState } from "react"
import { Cloud } from "@/components/common/Cloud"
import { FlyInBackground } from "@/components/common/FlyInBackground"
import { HandFlower } from "@/components/common/HandFlower"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/router"
import Link from "next/link"

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

        <div className="absolute w-full flex justify-center bottom-12 left-1/2 -translate-x-1/2">
          <Link href="https://github.com/vidlovevidu-chula/vlvu-website">
            <a
              target="_blank"
              className="flex items-center w-full justify-center gap-2 text-vlvu-pink-400 hover:text-vlvu-pink-500 transition-colors"
            >
              <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              <span className="">Open Source on GitHub</span>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}

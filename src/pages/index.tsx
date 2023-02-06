import { LinkButton } from "@components/common/Button"
import { easeInOut, motion } from "framer-motion"
import { DescribeRoute } from "@components/Meta/DescribeRoute"

function WelcomeText() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={easeInOut}
      className="flex flex-col items-center justify-center h-screen gap-6"
    >
      <div>
        <h1 className="font-semibold text-lg text-center">Welcome!</h1>
        <p className="text-center">มาตามหาดอกไม้สำหรับคุณกัน</p>
      </div>

      <LinkButton href="/register" type="primary">
        Ready ?
      </LinkButton>
    </motion.div>
  )
}

export default function Home() {
  return (
    <DescribeRoute title="Vid Love Vid U" description="Vid Love Vid U">
      <div className="bg-vlvu-pink-100 font-display min-h-screen w-full">
        <main className="text-vlvu-pink-500 mx-auto max-w-lg">
          <WelcomeText />
        </main>
      </div>
    </DescribeRoute>
  )
}

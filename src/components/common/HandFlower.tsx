import { motion, easeInOut } from "framer-motion"
import Image from "next/image"

export function HandFlower() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: "0vh", x: "20%" }}
      exit={{ opacity: 0 }}
      transition={easeInOut}
    >
      <div className="absolute">
        <Image src="/assets/handwithflower.svg" width="400px" height="600px" />
      </div>
    </motion.div>
  )
}

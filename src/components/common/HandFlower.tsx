import { motion, easeInOut } from "framer-motion"
import Image from "next/image"

export function HandFlower() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: "-5vh", x: "10%" }}
      exit={{ opacity: 0 }}
      transition={easeInOut}
    >
      <div className="absolute">
        <Image src="/assets/handflower.png" width="300px" height="450px" />
      </div>
    </motion.div>
  )
}

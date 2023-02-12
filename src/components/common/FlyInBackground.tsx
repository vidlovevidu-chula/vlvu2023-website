import { motion } from "framer-motion"
import Image from "next/image"

export function FlyInBackground() {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-500" }}
      animate={{ opacity: 1, y: "25vh", x: "10%" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute items-center">
        <Image src="/assets/purple-bg.svg" width="318px" height="245.5px" />
      </div>
    </motion.div>
  )
}

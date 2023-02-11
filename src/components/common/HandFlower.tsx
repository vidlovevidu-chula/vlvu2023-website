import { motion, easeInOut } from "framer-motion"
import Image from "next/image"

<<<<<<< HEAD
export function HandFlower(){
    return(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 , y: "0vh" , x:"20%"}}
        exit={{ opacity: 0 }}
        transition={easeInOut}
      >
        <div className="absolute">
          <Image src="/assets/handflower.png" width="300px" height="350px"/>
        </div>
      </motion.div>
    )
  }
=======
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
>>>>>>> d451b719b8f866edd77d9f294be97c9461a8798f

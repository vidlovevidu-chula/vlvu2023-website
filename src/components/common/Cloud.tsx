import { motion, Variants } from "framer-motion"
import Image from "next/image"

export const Cloud = ({
    variants,
}:{
    variants:Variants
}) => {
    return(
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="end"
            transition={{duration: 1.5}}
        >
        <div className="absolute">
            <Image src="/assets/cloud.svg" width="160px" height="64px" />
        </div>
        </motion.div>
    )
}




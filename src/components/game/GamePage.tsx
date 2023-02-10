import Image from "next/image"
import tapImg from "@/images/game/tap.gif"
import alarmImg from "@/images/game/alarm.gif"
import zzzImg from "@/images/game/zzz.gif"
import pillowImg from "@/images/game/pillow.gif"
import showerImg from "@/images/game/shower.gif"
import drinkImg from "@/images/game/drink.gif"
import coffeeImg from "@/images/game/coffee.gif"
import sofaImg from "@/images/game/sofa.gif"
import TVImg from "@/images/game/tv.gif"
import heartImg from "@/images/game/heart.gif"
import bookImg from "@/images/game/book.gif"
import flowerImg from "@/images/game/flower.gif"
import wandImg from "@/images/game/wand.gif"

import ESCLogo from "@/images/logo/esc.png"
import SmoLogo from "@/images/logo/smo.png"

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button, LinkButton } from "@/components/common/Button"
import { addScore } from "@/lib/user"
import { flowerDescription, flowerName, getFlowerType } from "@/data/flower"
import FlowerImg from "@/components/common/FlowerImg"
import ChoiceButton from "./ChoiceButton"

const AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.75, transition: "easeInOut" },
}

const FlyInProps = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
  transition: { duration: 1.5, transition: "easeInOut" },
}

export function PageRenderer({
  page,
  score,
  setPage,
  setScore,
  resetScore,
  dbSubmitScore,
}: {
  page: number
  score: number
  setPage: Dispatch<SetStateAction<number>>
  setScore: Dispatch<SetStateAction<number>>
  resetScore: () => void
  dbSubmitScore: () => void
}) {
  const timeOutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (page === -2 || page === -1 || page === 7 || page === 15 || page === 27) {
      timeOutRef.current = setTimeout(() => {
        setPage(page + 1)
      }, 2000)
    }

    if (page === 28) {
      dbSubmitScore()
    }

    return () => {
      clearTimeout(timeOutRef.current)
    }
  }, [page])

  switch (page) {
    case -2: {
      return (
        <div className="flex flex-col h-full justify-center items-center w-full text-white">
          <p className="font-bold text-xl mb-4 text-center">จัดทำโดย</p>

          <p className="font-semibold text-md text-center">
            คณะวิทยาศาสตร์ และคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
            <br />
            เนื่องในโครงการ Vid Love Vid U 2023
          </p>
        </div>
      )
    }
    case -1: {
      return (
        <div className="flex flex-col h-full justify-center items-center w-full text-white">
          <div className="w-full max-w-xs grid grid-cols-2 gap-6">
            <Image src={ESCLogo} alt="ESC" />
            <Image src={SmoLogo} alt="Smo" />
          </div>
        </div>
      )
    }
    case 0: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => setPage((page) => page + 1)}
        >
          {/* tap button */}
          <button onClick={() => setPage(3)} className="w-64 absolute right-0 bottom-0 transition-opacity">
            <Image layout="responsive" src={tapImg} alt="tap!" />
          </button>
        </div>
      )
    }
    case 1: {
      return (
        <div className="flex flex-col h-full justify-center items-center cursor-pointer" onClick={() => setPage(9)}>
          <p className="font-semibold text-center text-xl">
            ไม่ให้นอนต่อหรอกนะ
            <br />
            ลุกขึ้น ! ! !
          </p>

          <div className="w-64 -mt-6 -mb-6">
            <Image layout="responsive" src={alarmImg} alt="wake up" />
          </div>
        </div>
      )
    }
    case 2: {
      return (
        <div className="flex flex-col h-full justify-center items-center cursor-pointer" onClick={() => setPage(19)}>
          <p className="font-semibold text-center text-xl">
            แบร่ ! คุณไม่มีสิทธิ์เลือกหรอกนะ
            <br />
            คนร่ายมนต์คือฉัน !
          </p>
        </div>
      )
    }
    case 3: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          <div className="w-64 -mb-32 -mt-36">
            <Image layout="responsive" src={zzzImg} alt="zzz" />
          </div>

          <p className="font-semibold text-center text-xl">วันนี้เป็นวันหยุดของคุณ</p>
        </div>
      )
    }
    case 4: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          <div className="w-64 -mb-32 -mt-36">
            <Image layout="responsive" src={zzzImg} alt="zzz" />
          </div>

          <p className="font-semibold text-center text-xl">คุณกำลังนอนหลับอยู่</p>
        </div>
      )
    }
    case 5: {
      return (
        <div className="flex flex-col h-full justify-center items-center">
          <div className="w-64 -mb-32 -mt-36">
            <Image layout="responsive" src={zzzImg} alt="zzz" />
          </div>

          <p className="font-semibold text-center text-xl relative">เอาหล่ะ จะปลุกแล้วนะ</p>

          <Button type="white" onClick={() => setPage(page + 1)} className="relative z-10 mt-6">
            พร้อมแล้ว
          </Button>
        </div>
      )
    }
    case 6: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => {
            setPage(page + 1)
          }}
        >
          <div className="w-64 -mt-6 -mb-6">
            <Image layout="responsive" src={alarmImg} alt="wake up" />
          </div>
        </div>
      )
    }
    case 7: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center"
          // onClick={() => {
          //   clearTimeout(timeOutRef?.current)
          //   setPage(page + 1)
          // }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 4 }}
            exit={{ scale: 0 }}
            transition={{ duration: 2.25, transition: "easeInOut" }}
            key={page}
            className="w-96 h-96 bg-vlvu-pink-100 blur-3xl rounded-full"
          />
        </div>
      )
    }
    case 8: {
      return (
        <motion.div
          {...FlyInProps}
          key={page}
          className="flex flex-col h-full justify-center items-center cursor-pointer"
        >
          <p className="font-semibold text-center text-xl relative z-20 mb-6">
            เก่งมาก !<br />
            เอาหล่ะ หลังจากตื่นจากฝันหวาน
            <br />
            ที่แสนยาวนานครั้งนี้
            <br />
            คุณจะทำเป็นอะไรอย่างแรกหรอ ?
          </p>

          <div className="flex flex-col gap-2 w-full max-w-sm px-10 relative z-20">
            <ChoiceButton points={1} text="หยิบมือถือมาเล่น" setScore={setScore} setPage={setPage} toPage={9} />
            <ChoiceButton points={3} text="ดื่มน้ำสะอาด" setScore={setScore} setPage={setPage} toPage={9} />
            <ChoiceButton
              points={4}
              text="เข้าห้องน้ำล้างหน้า จัดการตัวเอง "
              setScore={setScore}
              setPage={setPage}
              toPage={9}
            />
            <ChoiceButton points={2} text="ปิดนาฬิกาปลุก นอนต่อ" setScore={setScore} setPage={setPage} toPage={1} />
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96">
            <Image layout="responsive" src={pillowImg} alt="pillow" />
          </div>
        </motion.div>
      )
    }
    case 9: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          <p className="font-semibold text-center text-xl relative top-32 z-20">
            คุณตื่นมาด้วยความงัวเงีย
            <br />
            และลากตัวเองไปอาบน้ำ แปรงฟัน
          </p>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96">
            <Image layout="responsive" src={showerImg} alt="shower" />
          </div>
        </div>
      )
    }
    case 10: {
      return (
        <motion.div
          {...FlyInProps}
          key={page}
          className="flex flex-col h-full justify-center items-center cursor-pointer"
        >
          <p className="font-semibold text-center text-xl relative z-20 -mt-48 mb-6">
            อา... คอแห้งจังว่าไหม ?<br />
            เครื่องดื่มมื้อเช้าของวันนี้เป็นอะไรดีนะ
          </p>

          <div className="flex flex-col gap-2 w-full max-w-sm px-10 relative z-20">
            <ChoiceButton
              points={1}
              text="กาแฟ ปลุกความสดชื่นยามเช้า"
              setScore={setScore}
              setPage={setPage}
              toPage={11}
            />
            <ChoiceButton
              points={2}
              text="น้ำหวาน เพิ่มความกระปรี้กระเปร่า"
              setScore={setScore}
              setPage={setPage}
              toPage={11}
            />
            <ChoiceButton
              points={4}
              text="น้ำผลไม้ ปลุกความ Healthy"
              setScore={setScore}
              setPage={setPage}
              toPage={11}
            />
            <ChoiceButton
              points={3}
              text="น้ำเปล่า เพิ่มความชุ่มชื้น"
              setScore={setScore}
              setPage={setPage}
              toPage={11}
            />
          </div>

          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96">
            <Image layout="responsive" src={drinkImg} alt="pillow" />
          </div>
        </motion.div>
      )
    }
    case 11: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          <div className="w-64 -mt-6 -mb-6">
            <Image layout="responsive" src={coffeeImg} alt="coffee" />
          </div>
        </div>
      )
    }
    case 12: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          <p className="font-semibold text-center text-xl relative -top-32 z-20">
            คุณเดินมานั่งที่โซฟาตัวโปรด
            <br />
            เบื้องหน้าของคุณเป็นทีวี
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
            >
              .
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.75 * 2 }}
            >
              .
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.75 * 3 }}
            >
              .
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.75 * 4 }}
            >
              .
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.75 * 5 }}
            >
              .
              <br />
              อา.. อยากดูหนังซักเรื่องจัง
            </motion.p>
          </p>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96">
            <Image layout="responsive" src={sofaImg} alt="sofa" />
          </div>
        </div>
      )
    }
    case 13: {
      return (
        <motion.div
          {...FlyInProps}
          key={page}
          className="flex flex-col h-full justify-center items-center cursor-pointer"
        >
          <p className="font-semibold text-center text-xl relative z-20 mb-6">เลือกหนังที่จะดูจากอะไรดีน้า</p>

          <div className="flex flex-col gap-2 w-full max-w-sm px-10 relative z-20">
            <ChoiceButton points={2} text="นักแสดงคนโปรด" setScore={setScore} setPage={setPage} toPage={14} />
            <ChoiceButton points={3} text="ผู้กำกับการันตีรางวัล" setScore={setScore} setPage={setPage} toPage={14} />
            <ChoiceButton points={1} text="แล้วแต่คนรอบข้าง" setScore={setScore} setPage={setPage} toPage={14} />
            <ChoiceButton
              points={4}
              text="อ่านเรื่องย่อแล้วใช่เลย ! !"
              setScore={setScore}
              setPage={setPage}
              toPage={14}
            />
          </div>
        </motion.div>
      )
    }
    case 14: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => {
            setPage(page + 1)
            // timeOutRef.current = setTimeout(() => setPage(16), 2500)
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96">
            <Image layout="responsive" src={TVImg} alt="tv" />
          </div>
        </div>
      )
    }
    case 15: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center"
          // onClick={() => {
          //   clearTimeout(timeOutRef?.current)
          //   setPage(page + 1)
          // }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 4 }}
            exit={{ scale: 0 }}
            transition={{ duration: 2.25, transition: "easeInOut" }}
            key={page}
            className="w-96 h-96 bg-vlvu-pink-500 blur-3xl rounded-full"
          />
        </div>
      )
    }
    case 16: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          <div className="w-64 -mb-32 -mt-36">
            <Image layout="responsive" src={zzzImg} alt="zzz" />
          </div>

          <p className="font-semibold text-center text-xl">
            คุณเผลอหลับอีกแล้วสินะ
            <br />
            งั้นคราวนี้ฉันจะมา
            <br />
            ออกแบบความฝันตามใจคุณละกัน
          </p>
        </div>
      )
    }
    case 17: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          <p className="font-semibold text-center text-xl">อืม... เอาเป็นเรื่องอะไรดีนะ</p>
        </div>
      )
    }
    case 18: {
      return (
        <div className="flex flex-col h-full justify-center items-center">
          <div className="w-64 -mb-32 -mt-36">
            <Image layout="responsive" src={heartImg} alt="heart" />
          </div>

          <p className="font-semibold text-center text-xl relative mb-6">
            นี่ก็ใกล้วาเลนไทน์แล้ว
            <br />
            เอาเป็นเรื่องความรักดีกว่า
          </p>

          <div className="flex flex-col gap-2 w-full max-w-sm px-10 relative z-20">
            <ChoiceButton points={0} text="เอาสิ !" setScore={setScore} setPage={setPage} toPage={19} />
            <ChoiceButton points={0} text="ไม่เอาอะ" setScore={setScore} setPage={setPage} toPage={2} />
          </div>
        </div>
      )
    }
    case 19: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          <p className="font-semibold text-center text-xl relative top-32 z-20">
            งั้นมาคำถาม survey กันก่อนดีกว่า
            <br />
            ห้วงแห่งนิทรานี้จะได้ถูกใจคุณ
          </p>

          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-72">
            <Image layout="responsive" src={bookImg} alt="book" />
          </div>
        </div>
      )
    }
    case 20: {
      return (
        <div className="flex flex-col h-full justify-center items-center">
          <div className="w-64 -mb-32 -mt-36">
            <Image layout="responsive" src={heartImg} alt="heart" />
          </div>

          <p className="font-semibold text-center text-xl relative mb-6">คิดว่าเดทแรกควรเป็นอย่างไร</p>

          <div className="flex flex-col gap-2 w-full max-w-sm px-10 relative z-20">
            <ChoiceButton
              points={2}
              text="นั่งคาเฟ่ จิบกาแฟยามบ่าย"
              setScore={setScore}
              setPage={setPage}
              toPage={21}
            />
            <ChoiceButton points={1} text="เที่ยวแบบธรรมชาติ ชิล ๆ" setScore={setScore} setPage={setPage} toPage={21} />
            <ChoiceButton
              points={3}
              text="นั่งดื่มที่บาร์สักแห่งด้วยกัน"
              setScore={setScore}
              setPage={setPage}
              toPage={21}
            />
            <ChoiceButton
              points={4}
              text="ดินเนอร์ใต้แสงเทียนสวย ๆ"
              setScore={setScore}
              setPage={setPage}
              toPage={21}
            />
          </div>
        </div>
      )
    }
    case 21: {
      return (
        <div className="flex flex-col h-full justify-center items-center">
          <p className="font-semibold text-center text-xl relative mb-6">
            แอบบอกว่าวาเลนไทน์ปีนี้
            <br />
            วิศวะ-วิทยา จัดงาน
            <br />
            Vid Love Vid U<br />
            ไม่ว่าจะสถานะใดก็สามารถเข้าร่วมได้
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <svg
                className="w-8 h-8"
                width="21"
                height="26"
                viewBox="0 0 21 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 13C11.2219 13 11.8401 12.7452 12.3546 12.2356C12.8682 11.7269 13.125 11.115 13.125 10.4C13.125 9.685 12.8682 9.0727 12.3546 8.5631C11.8401 8.05437 11.2219 7.8 10.5 7.8C9.77812 7.8 9.16038 8.05437 8.64675 8.5631C8.13225 9.0727 7.875 9.685 7.875 10.4C7.875 11.115 8.13225 11.7269 8.64675 12.2356C9.16038 12.7452 9.77812 13 10.5 13ZM10.5 26C6.97812 23.0317 4.34787 20.2744 2.60925 17.7281C0.86975 15.1827 0 12.8267 0 10.66C0 7.41 1.05569 4.82083 3.16706 2.8925C5.27756 0.964166 7.72188 0 10.5 0C13.2781 0 15.7224 0.964166 17.8329 2.8925C19.9443 4.82083 21 7.41 21 10.66C21 12.8267 20.1307 15.1827 18.3921 17.7281C16.6526 20.2744 14.0219 23.0317 10.5 26Z"
                  fill="#F8F8F8"
                />
              </svg>

              <p className="font-semibold text-xl">ลานจักรพงษ์ - ลานเกียร์</p>
            </div>
            <div className="flex items-center gap-4">
              <svg
                className="w-8 h-8"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.8 2.8H21V1.4C21 1.0287 20.8525 0.672601 20.59 0.41005C20.3274 0.1475 19.9713 0 19.6 0C19.2287 0 18.8726 0.1475 18.6101 0.41005C18.3475 0.672601 18.2 1.0287 18.2 1.4V2.8H9.8V1.4C9.8 1.0287 9.6525 0.672601 9.38995 0.41005C9.1274 0.1475 8.7713 0 8.4 0C8.0287 0 7.6726 0.1475 7.41005 0.41005C7.1475 0.672601 7 1.0287 7 1.4V2.8H4.2C3.08609 2.8 2.0178 3.2425 1.23015 4.03015C0.442499 4.8178 0 5.88609 0 7V23.8C0 24.9139 0.442499 25.9822 1.23015 26.7698C2.0178 27.5575 3.08609 28 4.2 28H23.8C24.9139 28 25.9822 27.5575 26.7698 26.7698C27.5575 25.9822 28 24.9139 28 23.8V7C28 5.88609 27.5575 4.8178 26.7698 4.03015C25.9822 3.2425 24.9139 2.8 23.8 2.8ZM25.2 23.8C25.2 24.1713 25.0525 24.5274 24.7899 24.7899C24.5274 25.0525 24.1713 25.2 23.8 25.2H4.2C3.8287 25.2 3.4726 25.0525 3.21005 24.7899C2.9475 24.5274 2.8 24.1713 2.8 23.8V14H25.2V23.8ZM25.2 11.2H2.8V7C2.8 6.6287 2.9475 6.2726 3.21005 6.01005C3.4726 5.7475 3.8287 5.6 4.2 5.6H7V7C7 7.3713 7.1475 7.7274 7.41005 7.98995C7.6726 8.2525 8.0287 8.4 8.4 8.4C8.7713 8.4 9.1274 8.2525 9.38995 7.98995C9.6525 7.7274 9.8 7.3713 9.8 7V5.6H18.2V7C18.2 7.3713 18.3475 7.7274 18.6101 7.98995C18.8726 8.2525 19.2287 8.4 19.6 8.4C19.9713 8.4 20.3274 8.2525 20.59 7.98995C20.8525 7.7274 21 7.3713 21 7V5.6H23.8C24.1713 5.6 24.5274 5.7475 24.7899 6.01005C25.0525 6.2726 25.2 6.6287 25.2 7V11.2Z"
                  fill="#F8F8F8"
                />
              </svg>

              <p className="font-semibold text-left text-xl">
                14 กุมภาพันธ์ 2566
                <br />
                หลังเลิกเรียนเป็นต้นไป
              </p>
            </div>

            <p className="font-semibold text-center text-xl mb-6">
              สามารถติดตามเพิ่มเติมได้ที่
              <br />
              IG : vidlovevidu.chula
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-sm px-10 relative z-20">
            <ChoiceButton points={0} text="ไปกับคู่" setScore={setScore} setPage={setPage} toPage={22} />
            <ChoiceButton points={0} text="ไปหาคู่" setScore={setScore} setPage={setPage} toPage={22} />
            <ChoiceButton points={0} text="ไปแน่ เจอกัน" setScore={setScore} setPage={setPage} toPage={22} />
          </div>
        </div>
      )
    }
    case 22: {
      return (
        <div className="flex flex-col h-full justify-center items-center">
          <div className="w-64 -mb-32 -mt-36">
            <Image layout="responsive" src={heartImg} alt="heart" />
          </div>

          <p className="font-semibold text-center text-xl relative mb-6">
            อุ้ย ๆ ละถ้าสมมุติว่า
            <br />
            บังเอิญเจอคนที่แอบชอบในงาน
            <br />
            Vid Love Vid U อะจะทำยังไง
          </p>

          <div className="flex flex-col gap-2 w-full max-w-sm px-10 relative z-20">
            <ChoiceButton
              points={4}
              text="เดินผ่านแบบทำทรง ในใจคือแกอยากได้อะไรเอาไปเลย"
              setScore={setScore}
              setPage={setPage}
              toPage={23}
            />
            <ChoiceButton
              points={1}
              text="เข้าไปทักทายอย่างร่าเริง"
              setScore={setScore}
              setPage={setPage}
              toPage={23}
            />
            <ChoiceButton
              points={2}
              text="ส่งสายตาปิ๊ง ๆ เพราะแค่มองตาก็รู้ใจ"
              setScore={setScore}
              setPage={setPage}
              toPage={23}
            />
            <ChoiceButton
              points={3}
              text="พยายามทำตัวโดดเด่น ให้เค้าสนใจ"
              setScore={setScore}
              setPage={setPage}
              toPage={23}
            />
          </div>
        </div>
      )
    }
    case 23: {
      return (
        <motion.div
          {...FlyInProps}
          key={page}
          className="flex flex-col h-full justify-center items-center cursor-pointer"
        >
          <p className="font-semibold text-center text-xl relative z-20 -mt-48 mb-6">
            ละถ้า.. เค้าเอาดอกไม้มาให้คุณอะ
            <br />
            คุณจะทำยังไง
          </p>

          <div className="flex flex-col gap-2 w-full max-w-sm px-10 relative z-20">
            <ChoiceButton points={3} text="เสียบไว้ในกระเป๋าเสื้อ" setScore={setScore} setPage={setPage} toPage={24} />
            <ChoiceButton
              points={1}
              text="เด็ดดอกไม้แถวนั้นคืนละกัน"
              setScore={setScore}
              setPage={setPage}
              toPage={24}
            />
            <ChoiceButton points={4} text="เก็บไปทับเเห้งในหนังสือ" setScore={setScore} setPage={setPage} toPage={24} />
            <ChoiceButton points={2} text="ถือเล่นอยู่ในมือ" setScore={setScore} setPage={setPage} toPage={24} />
          </div>

          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96">
            <Image layout="responsive" src={flowerImg} alt="flower" />
          </div>
        </motion.div>
      )
    }
    case 24: {
      return (
        <div className="flex flex-col h-full justify-center items-center">
          <p className="font-semibold text-center text-xl relative mb-6">
            นอกจากกิจกรรม
            <br />
            ที่ขาดไม่ได้เลยคือคู่เดทที่ถูกใจของคุณ
            <br />
            เป็นยังไงไหนเล่า
          </p>

          <div className="flex flex-col gap-2 w-full max-w-sm px-10 relative z-20">
            <ChoiceButton points={3} text="ฉลาด เข้ากับคนง่าย" setScore={setScore} setPage={setPage} toPage={25} />
            <ChoiceButton points={1} text="ใจดี อารมณ์ดี" setScore={setScore} setPage={setPage} toPage={25} />
            <ChoiceButton points={2} text="อ่อนโยน สุภาพ" setScore={setScore} setPage={setPage} toPage={25} />
            <ChoiceButton points={4} text="มีความคิด ละเอียดอ่อน " setScore={setScore} setPage={setPage} toPage={25} />
          </div>
        </div>
      )
    }
    case 25: {
      return (
        <div
          onClick={() => setPage((page) => page + 1)}
          className="flex flex-col h-full justify-center items-center cursor-pointer"
        >
          <div className="w-64 -mb-20 -mt-20">
            <Image layout="responsive" src={wandImg} alt="wand" />
          </div>

          <p className="font-semibold text-center text-xl relative">
            เอาหล่ะ
            <br />
            จะร่ายมนต์แล้วนะ
          </p>
        </div>
      )
    }
    case 26: {
      return (
        <div
          onClick={() => {
            setPage((page) => page + 1)
            // timeOutRef.current = setTimeout(() => {
            //   setPage(28)
            // }, 2500)
          }}
          className="flex flex-col h-full justify-center items-center cursor-pointer"
        >
          <p className="font-semibold text-center text-xl relative mb-6">
            โอม.. ขอให้ห้วงแห่งนิทราในครั้งนี้
            <br />
            ปลอบประโลมจิตใจของเธอไม่ว่าจะโดนใคร
            <br />
            ที่ใจร้ายมาทำร้ายจิตใจของเธอ
            <br />
            หรือเธออาจจะยังไม่ได้มีใครที่เดินเคียงคู่
            <br />
            หรืออาจจะมีหวานใจที่อยู่ด้วยกัน
            <br />
            ไม่ว่าเธอจะเป็นใคร ขอให้สิ่งที่เธอหวัง
            <br />
            สิ่งที่เธอปรารถนาเป็นจริง
            <br />.
            <br />.
            <br />.
            <br />.
            <br />
            รู้มั้ย เธอเก่งมากแล้วนะ
            <br />
            และนี่คือรางวัลของคนเก่ง
          </p>
        </div>
      )
    }
    case 27: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center"
          // onClick={() => {
          //   clearTimeout(timeOutRef?.current)
          //   dbSubmitScore()
          //   setPage(page + 1)
          // }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 4 }}
            exit={{ scale: 0 }}
            transition={{ duration: 2.25, transition: "easeInOut" }}
            key={page}
            className="w-96 h-96 bg-vlvu-pink-100 blur-3xl rounded-full"
          />
        </div>
      )
    }
    case 28: {
      return (
        <div className="flex flex-col h-full justify-center items-center">
          <div className="flex flex-col items-center bg-white bg-opacity-70 shadow-xl rounded-3xl px-8 py-10 max-w-sm">
            <FlowerImg width={150} height={150} type={getFlowerType(score)} />
            <h2 className="font-bold text-black text-2xl mb-4 text-center">{flowerName[getFlowerType(score)]}</h2>
            <p className="text-[#643D4B] text-lg font-normal leading-relaxed">
              {flowerDescription[getFlowerType(score)]}
            </p>
          </div>

          <div className="mt-6 flex gap-2">
            <Button
              onClick={() => {
                resetScore()
              }}
              className="w-48 shadow-md"
              type="white"
            >
              เล่นเกมใหม่
            </Button>
            <LinkButton
              onClick={() => {
                dbSubmitScore()
              }}
              href="/card"
              className="w-48 shadow-md"
              type="secondary"
            >
              ถัดไป
            </LinkButton>
          </div>
        </div>
      )
    }
    default: {
      return null
    }
  }
}

export function AnimationWrapper({ page, children }: { page: number; children: ReactNode }) {
  return (
    <motion.div {...AnimationProps} key={page} className="h-full">
      {children}
    </motion.div>
  )
}

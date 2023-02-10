import { useCallback, useEffect, useState } from "react"
import clsx from "clsx"
import { addScore } from "@/lib/user"
import { useAuth } from "@/lib/auth"
import { AnimationWrapper, PageRenderer } from "@/components/game/GamePage"

export default function Game() {
  const [page, setPage] = useState(-2)
  const [score, setScore] = useState(0)

  const auth = useAuth()

  const getBG = useCallback(
    (page: number) => {
      // style={{ background: "linear-gradient(180deg, #FAB9D1 -2.82%, #C7A9C6 96.57%)" }}
      if (page === -2 || page === -1) return "bg-gradient-to-b from-[#FAB9D1] to-[#C7A9C6] text-white"
      else if (page === 0) return "bg-vlvu-pink-100 text-vlvu-pink-600"
      else if (page >= 1 && page <= 7) return "bg-vlvu-pink-500 text-white"
      else if (page >= 8 && page <= 15) return "bg-vlvu-pink-100 text-vlvu-pink-600"
      else if (page >= 16 && page <= 27) return "bg-vlvu-pink-500 text-white"

      return "bg-vlvu-pink-100 text-vlvu-pink-600"
    },
    [page]
  )

  useEffect(() => {
    auth?.requireCred("/register")
    auth?.requireUser("/registerform")
  }, [auth])

  useEffect(() => {
    if (auth && auth.user && auth.user.score !== 0 && page !== 28 && auth?.user?.score) {
      setScore(auth.user.score)
      setPage(28)
    }
  }, [auth, page, score])

  const dbSubmitScore = () => {
    auth?.addScore(score)
  }

  const resetScore = () => {
    auth?.removeScore().then(() => {
      setScore(0)
      setPage(-2)
    })
  }

  return (
    <div className={clsx("h-screen overflow-hidden", getBG(page))}>
      <main className="mx-auto h-full relative max-w-lg font-display">
        <AnimationWrapper page={page}>
          <PageRenderer
            score={score}
            page={page}
            setPage={setPage}
            setScore={setScore}
            dbSubmitScore={dbSubmitScore}
            resetScore={resetScore}
          />
        </AnimationWrapper>
      </main>
    </div>
  )
}

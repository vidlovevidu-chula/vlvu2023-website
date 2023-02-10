import { Dispatch, SetStateAction } from "react"

export default function ChoiceButton({
  points,
  setScore,
  setPage,
  toPage,
  text,
}: {
  points: number
  setScore: Dispatch<SetStateAction<number>>
  setPage: Dispatch<SetStateAction<number>>
  toPage: number
  text: string
}) {
  return (
    <button
      onClick={() => {
        setScore((score) => score + points)
        setPage((page) => toPage)
      }}
      className="bg-white text-vlvu-pink-500 shadow-md rounded-xl w-full py-4 font-semibold"
    >
      {text}
    </button>
  )
}

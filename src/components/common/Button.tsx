import clsx from "clsx"
import { ReactNode } from "react"

export function Button({
  type,
  children,
  onClick,
  className,
}: {
  type: "primary" | "secondary"
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "py-2 px-14 rounded-2xl transition-colors duration-200",
        type === "primary" && "bg-vlvu-pink-400 text-vlvu-pink-500 hover:bg-vlvu-pink-500 hover:text-white",
        type === "secondary" && "bg-vlvu-pink-500 text-white hover:bg-vlvu-pink-600",
        className
      )}
    >
      {children}
    </button>
  )
}

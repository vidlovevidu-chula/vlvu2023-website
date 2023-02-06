import clsx from "clsx"
import Link from "next/link"
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

export function LinkButton({
  type,
  href,
  children,
  className,
}: {
  type: "primary" | "secondary"
  children: ReactNode
  href: string
  className?: string
}) {
  return (
    <Link href={href}>
      <a
        className={clsx(
          "py-2 px-14 rounded-2xl transition-colors duration-200",
          type === "primary" && "bg-vlvu-pink-400 text-vlvu-pink-500 hover:bg-vlvu-pink-500 hover:text-white",
          type === "secondary" && "bg-vlvu-pink-500 text-white hover:bg-vlvu-pink-600",
          className
        )}
      >
        {children}
      </a>
    </Link>
  )
}

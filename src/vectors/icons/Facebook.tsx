import { FC } from "react"

export const Facebook: FC<{ fill?: string; className?: string }> = ({ fill = "#EEA171", className }) => {
  return (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.0358 0H6.20703C3.02813 0 0.441406 2.6945 0.441406 6.00586V34.9941C0.441406 38.3055 3.02813 41 6.20703 41H17.8151V26.5059H13.2027V19.2988H17.8151V14.4141C17.8151 10.4399 20.9187 7.20703 24.7339 7.20703H31.7295V14.4141H24.7339V19.2988H31.7295L30.5764 26.5059H24.7339V41H34.0358C37.2147 41 39.8014 38.3055 39.8014 34.9941V6.00586C39.8014 2.6945 37.2147 0 34.0358 0Z"
        fill={fill}
      />
    </svg>
  )
}

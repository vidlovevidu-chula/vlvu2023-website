import { FC } from "react"

const GoogleIcon: FC<{
  width: string
  height: string
  classname?: string
}> = ({ classname, width, height }) => {
  return (
    <svg
      className={classname}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 39 39"
    >
      <g clipPath="url(#clip0_736_675)">
        <path
          fill="#292E6E"
          d="M8.638 23.567L7.28 28.635l-4.961.105A19.412 19.412 0 01-.005 19.5c0-3.235.786-6.284 2.18-8.969h.001l4.417.81 1.936 4.391a11.59 11.59 0 00-.626 3.767c0 1.431.26 2.803.735 4.068z"
        ></path>
        <path
          fill="#6C87B3"
          d="M38.659 15.855c.224 1.18.34 2.398.34 3.643 0 1.396-.146 2.758-.426 4.071a19.495 19.495 0 01-6.866 11.136v-.001l-5.565-.284-.787-4.916a11.622 11.622 0 005-5.935H19.928v-7.714h18.73z"
        ></path>
        <path
          fill="#4565DB"
          d="M31.712 34.703v.002a19.418 19.418 0 01-12.207 4.293c-7.426 0-13.882-4.151-17.176-10.26l6.32-5.172c1.646 4.395 5.886 7.524 10.856 7.524 2.136 0 4.138-.578 5.855-1.586l6.352 5.2z"
        ></path>
        <path
          fill="#2B388E"
          d="M31.953 4.49l-6.317 5.172a11.526 11.526 0 00-6.13-1.752c-5.083 0-9.402 3.272-10.966 7.824l-6.352-5.2h-.002C5.432 4.276 11.97 0 19.506 0c4.732 0 9.07 1.686 12.447 4.49z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_736_675">
          <path fill="#fff" d="M0 0H39V39H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default GoogleIcon

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
})

type LogoProps = {
  height: number
  width: number
  linkClassName?: string
  pClassName?: string
}
const Logo = ({ height, width, linkClassName, pClassName }: LogoProps) => {
  return (
    <Link href={"/"} className={linkClassName}>
      <div
        className={cn(
          "hover:opacity-75 transition items-center gap-x-2 hidden md:flex"
        )}
      >
        <Image src={"/logo.svg"} alt="logo" height={height} width={width} />
        <p
          className={cn(
            "text-lg text-txtColor pb-1",
            headingFont.className,
            pClassName
          )}
        >
          TaskVerse
        </p>
      </div>
    </Link>
  )
}
export default Logo

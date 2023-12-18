import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
})
const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src={"/logo.svg"} alt="logo" height={30} width={30} />
        <p className={cn("text-lg text-txtColor pb-1", headingFont.className)}>
          TeamTrackr
        </p>
      </div>
    </Link>
  )
}
export default Logo
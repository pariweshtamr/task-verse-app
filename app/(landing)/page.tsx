import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Medal } from "lucide-react"
import { Poppins } from "next/font/google"
import localFont from "next/font/local"
import Link from "next/link"

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
})

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
const LandingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task management
        </div>

        <h1 className="text-3xl md:text-6xl text-center text-txtColor mb-6">
          TaskVerse helps you keep track of
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-[#16A34A] to-blue-400 text-white px-4 p-2 rounded-md pb-4 w-fit">
          your tasks.
        </div>
      </div>

      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with TeamTrackr
      </div>

      <Button
        className="mt-6 bg-black hover:bg-slate-800 border-borders border transition-all hover:transition-all"
        size={"lg"}
        asChild
      >
        <Link href={"/sign-up"} className="tracking-wider">
          Try TaskVerse for free
        </Link>
      </Button>
    </div>
  )
}
export default LandingPage

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b border-borders shadow-sm bg-bg flex items-center text-txtColor">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href={"/sign-in"}>Login</Link>
          </Button>
          <Button
            asChild
            size={"default"}
            className="border border-borders hover:bg-bg"
          >
            <Link href={"/sign-up"}> Get TeamTrackr for free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b border-borders shadow-sm bg-bg flex items-center text-txtColor">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo width={30} height={30} />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href={"/sign-in"}>Login</Link>
          </Button>
          <Button
            asChild
            size={"default"}
            className="border border-borders bg-black hover:bg-slate-800"
          >
            <Link href={"/sign-up"}> Try TaskVerse for free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

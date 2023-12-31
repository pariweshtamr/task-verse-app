import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"

export const Footer = () => {
  return (
    <div className="w-full p-4 border-t border-borders bg-bg text-txtColor">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo height={30} width={30} />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"ghost"}>
            Privacy Policy
          </Button>
          <Button size={"sm"} variant={"ghost"}>
            Terms & Conditions
          </Button>
        </div>
      </div>
    </div>
  )
}

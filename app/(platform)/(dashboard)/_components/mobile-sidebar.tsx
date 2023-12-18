"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { Sidebar } from "./sidebar"

export const MobileSidebar = () => {
  const pathname = usePathname()
  const { onOpen, onClose, isOpen } = useMobileSidebar((state) => state)

  useEffect(() => {
    onClose()
  }, [pathname, onClose])
  return (
    <>
      <Button
        onClick={onOpen}
        className="md:hidden"
        variant="ghost"
        size={"sm"}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className="pt-10">
          <Sidebar className="bg-white shadow-none w-full border-none" />
        </SheetContent>
      </Sheet>
    </>
  )
}

import { X } from "lucide-react"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { ElementRef, useRef } from "react"
import { Task } from "@prisma/client"
import Link from "next/link"

type NotificationPopoverProps = {
  children: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
  align?: "start" | "center" | "end"
  sideOffset?: number
  dueTasks?: Task[]
}

export const NotificationPopover = ({
  children,
  side,
  align,
  sideOffset,
  dueTasks,
}: NotificationPopoverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null)

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3 bg-bg border-borders"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-semibold text-txtColor">
          You have {dueTasks?.length} tasks due soon!{" "}
          <Link
            href={"/due-soon"}
            className="text-green/10 rounded-full px-1.5 undeline bg-green"
            onClick={() => {
              closeRef.current?.click()
            }}
          >
            Click here
          </Link>{" "}
          to view them.
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-1 absolute top-3 right-2 text-txtColor"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}

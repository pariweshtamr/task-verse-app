"use client"
import { FormPopOver } from "@/components/form/form-popover"
import { Title } from "@/components/title/title"
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { MobileSidebar } from "./mobile-sidebar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { NotificationPopover } from "@/components/notification/notification-popover"
import { Task } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

type TopbarProps = {
  dueTasks?: Task[]
}
export const Topbar = ({ dueTasks }: TopbarProps) => {
  const { user } = useUser()
  const pathname = usePathname()
  const [opened, setOpened] = useState(false)
  const path = pathname.split("/").slice(1).join()
  const title = path.split("-").join(" ")

  const showSkeleton = !opened && dueTasks?.length! > 0 && !user?.imageUrl

  const renderAvatarContent = () => {
    if (showSkeleton) {
      return <Skeleton className="w-10 h-10 bg-taskCard rounded-full" />
    }

    if (dueTasks?.length! > 0 && user?.imageUrl) {
      return (
        <NotificationPopover align="start" side="bottom" dueTasks={dueTasks}>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
        </NotificationPopover>
      )
    }

    if (user?.imageUrl) {
      return (
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
      )
    }

    return <Skeleton className="w-10 h-10 bg-taskCard rounded-full" />
  }

  return (
    <div className="flex justify-between items-centerm mb-8 relative">
      <MobileSidebar />

      <Title title={title} />

      <div className="md:hidden">
        <UserButton />
      </div>

      <div className="items-center gap-6 md:flex hidden">
        <FormPopOver align="start" side="left">
          <Button
            size="sm"
            className="rounded-sm md:block hidden"
            variant="complete"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </FormPopOver>

        <div className="relative" onClick={() => setOpened(true)}>
          {!opened &&
            dueTasks?.length! > 0 &&
            (user?.imageUrl ? (
              <Badge
                className="absolute -top-3 -right-3 z-10"
                variant={"custom"}
              >
                {dueTasks?.length}
              </Badge>
            ) : (
              <Skeleton className="absolute -top-3 -right-3 z-10 h-6 w-8 border px-2.5 py-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-taskCard border-transparent" />
            ))}

          {renderAvatarContent()}
        </div>
      </div>
    </div>
  )
}

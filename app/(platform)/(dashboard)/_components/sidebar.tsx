"use client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { UserButton, useClerk, useUser } from "@clerk/nextjs"
import {
  Activity,
  CalendarCheck,
  CalendarX,
  List,
  ListTodo,
  LogOut,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: <List />,
    link: "/all-tasks",
  },
  {
    id: 2,
    title: "Important",
    icon: <ListTodo />,
    link: "/important",
  },
  {
    id: 3,
    title: "Completed",
    icon: <CalendarCheck />,
    link: "/completed",
  },
  {
    id: 4,
    title: "Due Soon",
    icon: <Activity />,
    link: "/due-soon",
  },
  {
    id: 5,
    title: "Overdue",
    icon: <CalendarX />,
    link: "/overdue",
  },
]

type SidebarProps = {
  className?: string
}
export const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <div
      className={cn(
        "flex relative w-72 bg-bg border border-borders rounded-xl shadow-md flex-col justify-between h-full",
        className
      )}
    >
      <div className="mt-6 mx-2 py-4 relative rounded-xl cursor-pointer font-medium text-dark flex flex-col items-center group">
        <div className="absolute left-0 top-0 w-full h-full backdrop-blur-[10px] z-0 transition rounded-lg opacity-10 group-hover:border-b-2 group-hover:border-gray-500 group-hover:opacity-10 " />

        <Avatar className="w-14 h-14">
          <AvatarImage src={user?.imageUrl ?? "/avatar.jpg"} />
        </Avatar>

        <div className="user-btn absolute z-20 top-0 w-full h-full md:block hidden">
          <UserButton />
        </div>

        {!user?.fullName ? (
          <Skeleton className="mt-2 bg-taskCard w-[90%] h-7" />
        ) : (
          <h1 className="mt-2 text-lg relative z-[1] text-txtColor">
            {user?.fullName}
          </h1>
        )}
      </div>

      <ul>
        {menu.map((item) => (
          <li
            key={item.id}
            className={`items-center py-3 px-4 grid grid-cols-[40px_1fr] cursor-pointer relative after:absolute after:left-0 after:top-0 after:w-0 after:h-full after:z-[1] after:bg-linkBg after:transition-all before:absolute before:right-0 before:top-0 before:w-0 before:h-full before:bg-[#6EA870] before:rounded-bl-lg before:rounded-tl-lg before:z-10 hover:after:w-full hover:after:transition-all ${
              pathname === item.link && "bg-linkBg before:w-[0.35rem]"
            }`}
          >
            <div
              className={`${
                pathname === item.link && "!text-txtColor"
              } flex items-center text-gray-500 z-10`}
            >
              {item.icon}
            </div>
            <Link
              href={item.link}
              className={`${
                pathname === item.link && "!text-txtColor"
              } font-[500] z-10 text-gray-500`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <Button
        variant={"transparent"}
        className="flex justify-start gap-4 mb-4 text-lg text-gray-500 hover:text-txtColor"
        onClick={() => signOut(() => router.push("/"))}
      >
        <LogOut /> Sign Out
      </Button>
    </div>
  )
}

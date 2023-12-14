"use client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UserButton, useClerk, useUser } from "@clerk/nextjs"
import { Activity, CheckCheck, List, ListTodo, LogOut } from "lucide-react"
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
    id: 4,
    title: "Completed",
    icon: <CheckCheck />,
    link: "/completed",
  },
  {
    id: 5,
    title: "In Progress",
    icon: <Activity />,
    link: "/incomplete",
  },
]
export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <div className="w-72 relative bg-muted border-2 rounded-lg shadow-md flex flex-col justify-between">
      <div className="mt-6 mx-2 py-2 relative rounded-xl cursor-pointer font-medium text-dark flex flex-col items-center group">
        <div className="absolute left-0 top-0 w-full h-full backdrop-blur-[10px] z-0 transition rounded-lg opacity-10 group-hover:border-2 group-hover:border-gray-500 group-hover:opacity-10 " />

        <div className="rounded-full relative z-[1] flex-shrink-0 inline-block overflow-hidden transition w-[70px] h-70px]">
          <Image
            src={"/avatar.jpg"}
            alt="avatar"
            className="rounded-full transition group-hover:scale-110"
            width={70}
            height={70}
          />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>

        {/* <Avatar>
          <AvatarImage src={"/avatar.jpg"} />
          <AvatarFallback>Profile</AvatarFallback>
        </Avatar> */}

        {!user?.fullName ? (
          <Skeleton className="mt-1 bg-neutral-200 w-[90%] h-7" />
        ) : (
          <h1 className="mt-1 text-lg relative z-[1]">{user?.fullName}</h1>
        )}
      </div>

      <ul>
        {menu.map((item) => (
          <li
            key={item.id}
            className={`items-center py-3 px-4 grid grid-cols-[40px_1fr] cursor-pointer relative after:absolute after:left-0 after:top-0 after:w-0 after:h-full after:z-[1] after:bg-lightblue after:transition-all before:absolute before:right-0 before:top-0 before:w-0 before:h-full before:bg-[#3282b8] before:rounded-bl-lg before:rounded-tl-lg before:z-10 hover:after:w-full hover:after:transition-all ${
              pathname === item.link && "bg-white before:w-[0.35rem]"
            }`}
          >
            <div
              className={`${
                pathname === item.link && "text-[#0F4C75]"
              } flex items-center text-[#3282B8] z-10`}
            >
              {item.icon}
            </div>
            <Link
              href={item.link}
              className={`${
                pathname === item.link && "text-[#3282b8]"
              } font-[500] z-10`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <Button
        variant={"ghost"}
        className="flex justify-start gap-4 mb-4 text-lg"
        onClick={() => signOut(() => router.push("/"))}
      >
        <LogOut className="text-[#0f4c75]" /> Sign Out
      </Button>
    </div>
  )
}

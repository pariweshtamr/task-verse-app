import db from "@/lib/db"
import { AddTaskButton } from "../all-tasks/_components/add-task-button"
import { auth } from "@clerk/nextjs"
import { TaskItem } from "./task-item"
import { Task } from "@prisma/client"
import { Skeleton } from "@/components/ui/skeleton"
import { redirect } from "next/navigation"

export const TaskList = async () => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/sign-in")
  }

  const tasks = await db.task.findMany({
    where: {
      userId,
    },
  })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AddTaskButton />
      {tasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}

TaskList.Skeleton = function TaskListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-[16rem] w-full bg-neutral-200" />
      <Skeleton className="h-[16rem] w-full bg-neutral-200" />
      <Skeleton className="h-[16rem] w-full bg-neutral-200" />
      <Skeleton className="h-[16rem] w-full bg-neutral-200" />
      <Skeleton className="h-[16rem] w-full bg-neutral-200" />
    </div>
  )
}

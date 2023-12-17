import { AddTaskButton } from "../all-tasks/_components/add-task-button"
import { TaskItem } from "./task-item"
import { Task } from "@prisma/client"
import { Skeleton } from "@/components/ui/skeleton"

type TaskListProps = {
  allTasks?: Task[]
  completedTasks?: Task[]
  incompletTasks?: Task[]
  importantTasks?: Task[]
}

export const TaskList = async ({
  allTasks,
  completedTasks,
  incompletTasks,
  importantTasks,
}: TaskListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AddTaskButton />
      {allTasks?.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      {completedTasks?.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      {incompletTasks?.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      {importantTasks?.map((task: Task) => (
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

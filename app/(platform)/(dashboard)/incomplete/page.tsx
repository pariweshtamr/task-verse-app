import db from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Topbar } from "../_components/top-bar"
import { TaskList } from "../_components/task-list"
import { Suspense } from "react"

const IncompleteTasksPage = async () => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/sign-in")
  }

  const tasks = await db.task.findMany({
    where: {
      userId,
      isCompleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return (
    <>
      <Topbar />
      <div className="mt-4">
        <Suspense fallback={<TaskList.Skeleton />}>
          <TaskList incompletTasks={tasks} />
        </Suspense>
      </div>
    </>
  )
}
export default IncompleteTasksPage

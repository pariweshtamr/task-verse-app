import { Suspense } from "react"
import { TaskList } from "../_components/task-list"
import { Topbar } from "../_components/top-bar"
import db from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const AllTasksPage = async () => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/sign-in")
  }

  const tasks = await db.task.findMany({
    where: {
      userId,
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
          <TaskList allTasks={tasks} />
        </Suspense>
      </div>
    </>
  )
}
export default AllTasksPage

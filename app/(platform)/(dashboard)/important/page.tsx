import db from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Topbar } from "../_components/top-bar"
import { Suspense } from "react"
import { TaskList } from "../_components/task-list"

const ImportantTasksPage = async () => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/sign-in")
  }

  const tasks = await db.task.findMany({
    where: {
      userId,
      isImportant: true,
    },
  })
  return (
    <div>
      <Topbar />
      <div className="mt-4">
        <Suspense fallback={<TaskList.Skeleton />}>
          <TaskList importantTasks={tasks} />
        </Suspense>
      </div>
    </div>
  )
}
export default ImportantTasksPage

import db from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { TaskList } from "../_components/task-list"

const OverduePage = async () => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/sign-in")
  }

  const tasks = await db.task.findMany({
    where: {
      userId,
      date: {},
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return (
    <div className="mt-4">
      <Suspense fallback={<TaskList.Skeleton />}>
        <TaskList overdueTasks={tasks} />
      </Suspense>
    </div>
  )
}
export default OverduePage

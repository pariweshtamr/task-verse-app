import db from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { TaskList } from "../_components/task-list"
import moment from "moment"

const OverduePage = async () => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/sign-in")
  }

  const tasks = await db.task.findMany({
    where: {
      userId,
      date: {
        lt: moment().toISOString(),
      },
      isCompleted: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="mt-4">
      {tasks?.length === 0 ? (
        <h3 className="text-txtColor text-xl">
          Great job! You have overdue tasks.
        </h3>
      ) : (
        <Suspense fallback={<TaskList.Skeleton />}>
          <TaskList overdueTasks={tasks} />
        </Suspense>
      )}
    </div>
  )
}
export default OverduePage

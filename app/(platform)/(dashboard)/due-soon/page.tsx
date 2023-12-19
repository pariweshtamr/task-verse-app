import db from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { TaskList } from "../_components/task-list"
import { Suspense } from "react"
import moment from "moment"

const DueSoonPage = async () => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/sign-in")
  }

  const tasks = await db.task.findMany({
    where: {
      userId,
      date: {
        gte: moment().toISOString(),
        lte: moment().add(3, "days").toISOString(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return (
    <div className="mt-4">
      {tasks?.length === 0 ? (
        <h3 className="text-txtColor text-xl">You have no tasks due soon!</h3>
      ) : (
        <Suspense fallback={<TaskList.Skeleton />}>
          <TaskList dueTasks={tasks} />
        </Suspense>
      )}
    </div>
  )
}
export default DueSoonPage

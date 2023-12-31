import { Suspense } from "react"
import { TaskList } from "../_components/task-list"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import db from "@/lib/db"

const CompletedPage = async () => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/sign-in")
  }

  const tasks = await db.task.findMany({
    where: {
      userId,
      isCompleted: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return (
    <div className="mt-4">
      {tasks?.length === 0 ? (
        <h3 className="text-txtColor text-xl">You have no completed tasks!</h3>
      ) : (
        <Suspense fallback={<TaskList.Skeleton />}>
          <TaskList completedTasks={tasks} />
        </Suspense>
      )}
    </div>
  )
}
export default CompletedPage

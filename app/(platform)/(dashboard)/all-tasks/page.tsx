import { Suspense } from "react"
import { TaskList } from "../_components/task-list"
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
    <div className="mt-4">
      {tasks?.length === 0 ? (
        <h3 className="text-txtColor text-xl">
          You have not created any tasks!
        </h3>
      ) : (
        <Suspense fallback={<TaskList.Skeleton />}>
          <TaskList allTasks={tasks} />
        </Suspense>
      )}
    </div>
  )
}
export default AllTasksPage

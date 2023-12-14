import { Title } from "@/components/title/title"
import { Suspense } from "react"
import { TaskList } from "../_components/task-list"
import { FormPopOver } from "@/components/form/form-popover"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const AllTasksPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Title title="All Tasks" />

        <FormPopOver align="start" side="left">
          <Button size="sm" className="rounded-sm block" variant="primary">
            <Plus className="w-4 h-4" />
          </Button>
        </FormPopOver>
      </div>

      <div className="mt-4">
        <Suspense fallback={<TaskList.Skeleton />}>
          <TaskList />
        </Suspense>
      </div>
    </div>
  )
}
export default AllTasksPage

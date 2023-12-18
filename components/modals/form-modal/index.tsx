import { createTask } from "@/actions/create-task"
import { updateTask } from "@/actions/update-task"
import { FormInput } from "@/components/form/form-input"
import { FormSubmitButton } from "@/components/form/form-submit-button"
import { FormTextarea } from "@/components/form/form-textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useFormModal } from "@/hooks/use-card-modal"
import { useAction } from "@/hooks/useAction"
import { Pencil, Plus } from "lucide-react"
import toast from "react-hot-toast"

export const FormModal = () => {
  const { isOpen, onClose, task } = useFormModal((state) => state)

  const { execute: executeCreateTask, fieldErrors } = useAction(createTask, {
    onSuccess: (data) => {
      toast.success(`Task "${data.title}" created!`)
      onClose()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const { execute: executeUpdateTask } = useAction(updateTask, {
    onSuccess: (data) => {
      toast.success(`Task "${data.title}" updated!`)
      onClose()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const date = formData.get("date") as string
    const isImportant = formData.get("isImportant") as string
    const isCompleted = formData.get("isCompleted") as string

    const executeTask = (isImportant: boolean, isCompleted: boolean) => {
      const taskData = { title, description, date, isImportant, isCompleted }
      if (!task?.id) {
        executeCreateTask({ ...taskData })
      } else {
        executeUpdateTask({ id, ...taskData })
      }
    }

    if (isImportant && isCompleted) {
      executeTask(true, true)
    } else if (isImportant && !isCompleted) {
      executeTask(true, false)
    } else if (!isImportant && isCompleted) {
      executeTask(false, true)
    } else {
      executeTask(false, false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-bg text-txtColor">
        <h1 className="text-xl font-semibold underline underline-offset-8">
          {task?.id ? "Update Task" : "Create Task"}
        </h1>
        <form action={onSubmit} className="space-y-4">
          {task?.id && (
            <input hidden id="id" name="id" value={task?.id} readOnly />
          )}

          <div className="space-y-4">
            <FormInput
              id="title"
              label="Title"
              type="text"
              required
              placeholder="e.g, Learn TypeScript"
              modal={true}
              className="text-sm py-5"
              errors={fieldErrors}
              defaultValue={task?.title ?? ""}
            />
            <FormInput
              id="date"
              label="Date"
              type="date"
              className="py-5 text-[14px]"
              modal={true}
              defaultValue={task?.date}
            />
            <FormTextarea
              id="description"
              label="Description"
              className="resize-none text-sm bg-taskCard border border-borders"
              placeholder="e.g, Complete the video about TypeScript on youtube."
              modal={true}
              defaultValue={task?.description ?? ""}
            />
            <div className="flex items-center gap-16 w-max relative">
              <FormInput
                id="isCompleted"
                label="Completed"
                type="checkbox"
                className="w-4 absolute left-[90px] top-[-5px]"
                checkbox={true}
                defaultChecked={task?.isCompleted}
              />
              <FormInput
                id="isImportant"
                label="Important"
                type="checkbox"
                className="w-4 absolute right-[-26px] top-[-5px]"
                checkbox={true}
                defaultChecked={task?.isImportant}
              />
            </div>
          </div>

          <FormSubmitButton
            className="flex items-center gap-2 float-right py-5 px-4"
            variant="complete"
          >
            {task?.id ? (
              <>
                <Pencil className="w-4 h-4" />
                Update Task
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create Task
              </>
            )}
          </FormSubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}

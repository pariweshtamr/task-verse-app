import { createTask } from "@/actions/create-task"
import { FormInput } from "@/components/form/form-input"
import { FormSubmitButton } from "@/components/form/form-submit-button"
import { FormTextarea } from "@/components/form/form-textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useFormModal } from "@/hooks/use-card-modal"
import { useAction } from "@/hooks/useAction"
import { Plus } from "lucide-react"
import toast from "react-hot-toast"

export const FormModal = () => {
  const { isOpen, onClose } = useFormModal((state) => state)

  const { execute, fieldErrors } = useAction(createTask, {
    onSuccess: (data) => {
      toast.success(`Task "${data.title}" created!`)
      onClose()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const date = formData.get("date") as string
    const imp = formData.get("isImportant") as string
    const complete = formData.get("isComplete") as string

    if (imp === "on" && complete === "on") {
      execute({
        title,
        description,
        date,
        isImportant: true,
        isCompleted: true,
      })
    } else if (imp === "on" && complete !== "on") {
      execute({
        title,
        description,
        date,
        isImportant: true,
        isCompleted: false,
      })
    } else if (imp !== "on" && complete === "on") {
      execute({
        title,
        description,
        date,
        isImportant: false,
        isCompleted: true,
      })
    } else {
      execute({
        title,
        description,
        date,
        isImportant: false,
        isCompleted: false,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <h1 className="text-xl font-semibold">Create Task</h1>
        <form action={onSubmit} className="space-y-4">
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
            />
            <FormInput
              id="date"
              label="Date"
              type="date"
              className="py-5 text-[14px]"
              modal={true}
            />
            <FormTextarea
              id="description"
              label="Description"
              className="resize-none text-sm"
              placeholder="e.g, Complete the video about TypeScript on youtube."
              modal={true}
            />
            <div className="flex items-center gap-16 w-max relative">
              <FormInput
                id="isCompleted"
                label="Completed"
                type="checkbox"
                className="w-4 absolute left-[90px] top-[-5px]"
                checkbox={true}
              />
              <FormInput
                id="isImportant"
                label="Important"
                type="checkbox"
                className="w-4 absolute right-[-26px] top-[-5px]"
                checkbox={true}
              />
            </div>
          </div>

          <FormSubmitButton
            className="flex items-center gap-2 float-right py-5 px-4"
            variant="primary"
          >
            <Plus className="w-5 h-5" />
            Create Task
          </FormSubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}

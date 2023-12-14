"use client"
import { deleteTask } from "@/actions/delete-task"
import { FormSubmitButton } from "@/components/form/form-submit-button"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/useAction"
import { formatDate } from "@/lib/format-date"
import { Task } from "@prisma/client"
import { FileEdit, Trash } from "lucide-react"
import toast from "react-hot-toast"

type TaskItemProps = {
  task: Task
}
export const TaskItem = ({ task }: TaskItemProps) => {
  const { title, description, date, isCompleted, isImportant } = task
  const { execute: executeDelete } = useAction(deleteTask, {
    onSuccess: (data) => {
      toast.success(`Task "${data.title}" deleted!`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string

    executeDelete({ id })
  }
  return (
    <div className="bg-white/80 cursor-pointer p-[1.2rem_1rem] rounded-xl h-[16rem] shadow-md border-2 border-neutral-200 flex flex-col gap-2">
      <h1 className="font-semibold capitalize text-lg">{title}</h1>
      <p>{description}</p>
      <p className="mt-auto text-sm">{formatDate(date)}</p>
      <div className="flex items-center justify-between">
        {isCompleted ? (
          <Button size="sm" variant="primary" className="rounded-full">
            Completed
          </Button>
        ) : (
          <Button size="sm" variant="destructive" className="rounded-full">
            Incomplete
          </Button>
        )}

        <div className="flex items-center">
          <Button className="" variant="ghost" size="sm">
            <FileEdit className="w-5 h-5" />
          </Button>

          <form action={onDelete}>
            <input hidden id="id" name="id" value={task.id} readOnly />
            <FormSubmitButton className="" variant="ghost">
              <Trash className="w-5 h-5" />
            </FormSubmitButton>
          </form>
        </div>
      </div>
    </div>
  )
}

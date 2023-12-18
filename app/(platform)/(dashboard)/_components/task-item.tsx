"use client"
import { deleteTask } from "@/actions/delete-task"
import { updateTask } from "@/actions/update-task"
import { FormSubmitButton } from "@/components/form/form-submit-button"
import { Button } from "@/components/ui/button"
import { useFormModal } from "@/hooks/use-card-modal"
import { useAction } from "@/hooks/useAction"
import { formatDate } from "@/lib/format-date"
import { Task } from "@prisma/client"
import { FileEdit, Trash } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

type TaskItemProps = {
  task: Task
}
export const TaskItem = ({ task }: TaskItemProps) => {
  const { title, description, date, isCompleted } = task
  const [isComplete, setIsComplete] = useState(false)
  const { onOpen } = useFormModal()
  const { execute: executeDelete } = useAction(deleteTask, {
    onSuccess: (data) => {
      toast.success(`Task "${data.title}" deleted!`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const { execute: executeUpdate } = useAction(updateTask, {
    onSuccess: (data) => {
      toast.success(`Task "${data.title}" updated!`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string

    executeDelete({ id })
  }

  const onUpdate = (formData: FormData) => {
    const id = formData.get("id") as string

    if (isComplete) {
      executeUpdate({ id, isCompleted: true })
    } else {
      executeUpdate({ id, isCompleted: false })
    }
  }
  return (
    <div className="bg-taskCard cursor-pointer p-[1.2rem_1rem] rounded-xl h-[16rem] shadow-md border border-borders flex flex-col gap-2 text-txtColor">
      <h1 className="font-semibold capitalize text-lg">{title}</h1>
      <p>{description}</p>
      <p className="mt-auto text-sm">{formatDate(date)}</p>
      <div className="flex items-center justify-between">
        {isCompleted ? (
          <form action={onUpdate}>
            <input hidden id="id" name="id" value={task.id} readOnly />
            <Button
              size="sm"
              variant="complete"
              className="rounded-full"
              onClick={() => setIsComplete(false)}
            >
              Completed
            </Button>
          </form>
        ) : (
          <form action={onUpdate}>
            <input hidden id="id" name="id" value={task.id} readOnly />
            <Button
              variant="destructive"
              className="rounded-full"
              size={"sm"}
              onClick={() => setIsComplete(true)}
            >
              Incomplete
            </Button>
          </form>
        )}

        <div className="flex items-center">
          <Button variant="ghost" onClick={() => onOpen(task)}>
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

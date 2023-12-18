"use client"
import { deleteTask } from "@/actions/delete-task"
import { updateTask } from "@/actions/update-task"
import { FormSubmitButton } from "@/components/form/form-submit-button"
import { Button } from "@/components/ui/button"
import { useFormModal } from "@/hooks/use-card-modal"
import { useAction } from "@/hooks/useAction"
import { formatDate } from "@/lib/format-date"
import { Task } from "@prisma/client"
import { FileEdit, Trash, Star } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Hint } from "./hint"
import Swal from "sweetalert2"

type TaskItemProps = {
  task: Task
}
export const TaskItem = ({ task }: TaskItemProps) => {
  const { title, description, date, isCompleted } = task
  const [isComplete, setIsComplete] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { onOpen } = useFormModal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        executeDelete({ id })
      }
    })
  }

  const onUpdateCompletion = (formData: FormData) => {
    const id = formData.get("id") as string

    if (isComplete) {
      executeUpdate({ id, isCompleted: true })
    } else {
      executeUpdate({ id, isCompleted: false })
    }
  }

  return (
    <div className="bg-taskCard cursor-pointer p-[1.2rem_1rem] rounded-xl h-[16rem] shadow-md border border-borders flex flex-col gap-2 text-txtColor relative">
      {task?.isImportant ? (
        <div className="absolute right-3 top-3">
          <Hint sideOffset={0} side="top" description="Marked as Important!">
            <Star className="w-5 h-5" fill="#ffd700" color="#ffd700" />
          </Hint>
        </div>
      ) : (
        <div className="absolute right-3 top-3">
          <Hint sideOffset={0} side="top" description="Mark as Important!">
            <Star className="w-5 h-5" color="#b6b6b6" />
          </Hint>
        </div>
      )}

      <h1 className="font-semibold capitalize text-lg">{title}</h1>
      <p className="text-[15px] text-neutral-400">{description}</p>
      <p className="mt-auto text-sm">{formatDate(date)}</p>
      <div className="flex items-center justify-between">
        {isCompleted ? (
          <form action={onUpdateCompletion}>
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
          <form action={onUpdateCompletion}>
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

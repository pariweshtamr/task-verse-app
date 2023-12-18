"use client"
import { X } from "lucide-react"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { FormInput } from "./form-input"
import { FormSubmitButton } from "./form-submit-button"
import { ElementRef, useRef } from "react"
import { useAction } from "@/hooks/useAction"
import toast from "react-hot-toast"
import { FormTextarea } from "./form-textarea"
import { createTask } from "@/actions/create-task"

type FormPopOverProps = {
  children: React.ReactNode
  side?: "left" | "right" | "top" | "bottom"
  align?: "start" | "center" | "end"
  sideOffset?: number
}
export const FormPopOver = ({
  children,
  side,
  align,
  sideOffset,
}: FormPopOverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null)
  const { execute, fieldErrors } = useAction(createTask, {
    onSuccess: (data) => {
      toast.success("Task created successfully!")
      closeRef.current?.click()
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

    if (imp === "on") {
      execute({ title, description, date, isImportant: true })
    } else {
      execute({ title, description, date })
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3 bg-bg border-borders"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-bold underline underline-offset-2 pb-4 text-txtColor">
          Create Task
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-txtColor"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <FormInput
              id="title"
              label="Title"
              type="text"
              required
              placeholder="e.g, Learn TypeScript"
              errors={fieldErrors}
            />
            <FormInput id="date" label="Date" type="date" />
            <FormTextarea
              id="description"
              label="Description"
              className="bg-taskCard border-borders"
              placeholder="e.g, Complete the video about TypeScript on youtube."
            />
            <FormInput
              id="isImportant"
              label="Important"
              type="checkbox"
              className="w-max"
            />
          </div>

          <FormSubmitButton className="w-full" variant="complete">
            Create
          </FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  )
}

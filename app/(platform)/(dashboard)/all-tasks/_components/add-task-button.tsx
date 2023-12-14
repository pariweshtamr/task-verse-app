"use client"

import { useFormModal } from "@/hooks/use-card-modal"
import { Plus } from "lucide-react"

export const AddTaskButton = () => {
  const formModal = useFormModal()
  return (
    <div
      role="button"
      onClick={() => formModal.onOpen()}
      className="flex items-center justify-center gap-2 h-[16rem] border-[3px] border-dashed font-semibold rounded-xl hover:bg-white/80 hover:text-neutral-600 hover:transition-all transition-all"
    >
      <Plus className="w-4 h-4" /> Add New Task
    </div>
  )
}

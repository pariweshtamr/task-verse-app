"use client"

import { useFormModal } from "@/hooks/use-card-modal"
import { Plus } from "lucide-react"
import { usePathname } from "next/navigation"

export const AddTaskButton = () => {
  const pathname = usePathname()
  const formModal = useFormModal()
  return (
    <>
      {pathname === "/all-tasks" && (
        <div
          role="button"
          onClick={() => formModal.onOpen()}
          className="flex items-center justify-center gap-2 h-[16rem] border-[3px] border-dashed border-neutral-400 font-semibold rounded-xl text-txtColor bg-bgMain hover:bg-taskCard hover:transition-all transition-all"
        >
          <Plus className="w-4 h-4" /> Add New Task
        </div>
      )}
    </>
  )
}

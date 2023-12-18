import { Task } from "@prisma/client"
import { create } from "zustand"
type FormModalStore = {
  task?: Task
  isOpen: boolean
  onOpen: (task?: Task) => void
  onClose: () => void
}

export const useFormModal = create<FormModalStore>((set) => ({
  isOpen: false,
  onOpen: (task?: Task) => set({ isOpen: true, task }),
  onClose: () => set({ isOpen: false }),
}))

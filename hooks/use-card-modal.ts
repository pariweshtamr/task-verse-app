import { create } from "zustand"
type FormModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useFormModal = create<FormModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

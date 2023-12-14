import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useFormModal } from "@/hooks/use-card-modal"

export const FormModal = () => {
  const { isOpen, onClose } = useFormModal((state) => state)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>ss</DialogContent>
    </Dialog>
  )
}

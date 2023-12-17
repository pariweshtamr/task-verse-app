import { FormPopOver } from "@/components/form/form-popover"
import { Title } from "@/components/title/title"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const Topbar = () => {
  return (
    <div className="flex justify-between items-center">
      <Title title="All Tasks" />

      <FormPopOver align="start" side="left">
        <Button size="sm" className="rounded-sm block" variant="primary">
          <Plus className="w-4 h-4" />
        </Button>
      </FormPopOver>
    </div>
  )
}

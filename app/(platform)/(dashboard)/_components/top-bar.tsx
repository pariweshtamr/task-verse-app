import { FormPopOver } from "@/components/form/form-popover"
import { Title } from "@/components/title/title"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { MobileSidebar } from "./mobile-sidebar"

export const Topbar = () => {
  return (
    <div className="flex justify-between items-centerm mb-8 relative">
      <MobileSidebar />

      <Title title="All Tasks" />

      <div className="md:hidden">
        <UserButton />
      </div>

      <FormPopOver align="start" side="left">
        <Button
          size="sm"
          className="rounded-sm md:block hidden"
          variant="complete"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </FormPopOver>
    </div>
  )
}

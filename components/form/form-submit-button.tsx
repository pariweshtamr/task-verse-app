"use client"

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

type FormSubmitButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  className: string
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "primary"
    | "ghost"
    | "link"
    | "complete"
}
export const FormSubmitButton = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size={"sm"}
      className={cn(className)}
    >
      {children}
    </Button>
  )
}

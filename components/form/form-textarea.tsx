"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { FormErrors } from "./form-errors"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"

type FormTextareaProps = {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  onBlur?: () => void
  onClick?: () => void
  defaultValue?: string
  modal?: boolean
}
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      defaultValue,
      modal,
    },
    ref
  ) => {
    const { pending } = useFormStatus()
    return (
      <div className="w-full space-y-2">
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor="id"
              className={cn(
                "text-xs font-semibold text-neutral-700",
                modal && "text-md"
              )}
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            onBlur={onBlur}
            onClick={onClick}
            required={required}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={pending || disabled}
            ref={ref}
            className={
              (cn(
                "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm"
              ),
              className)
            }
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

FormTextarea.displayName = "FormTextarea"

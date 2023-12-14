"use client"

import { forwardRef } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FormErrors } from "./form-errors"
import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"

type FormInputProps = {
  id: string
  label: string
  errors?: Record<string, string[] | undefined>
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  defaultValue?: string
  onBlur?: () => void
}
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      errors,
      type,
      placeholder,
      required,
      disabled,
      className,
      defaultValue,
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus()
    return (
      <div className="space-y-2">
        <div className="space-y-1 flex items-center gap-2">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            className={cn("text-xs px-2 py-1 h-7", className)}
            ref={ref}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            required={required}
            disabled={pending || disabled}
            aria-describedby={`${id}-error`}
          />
        </div>

        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

FormInput.displayName = "FormInput"

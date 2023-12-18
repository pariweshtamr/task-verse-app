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
  defaultChecked?: boolean
  onBlur?: () => void
  modal?: boolean
  checkbox?: boolean
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
      defaultChecked,
      onBlur,
      modal,
      checkbox,
    },
    ref
  ) => {
    const { pending } = useFormStatus()
    return (
      <div className="space-y-2">
        <div className={`${!modal && "flex items-center gap-2"} space-y-1`}>
          {label ? (
            <Label
              htmlFor={id}
              className={cn(
                "text-xs font-semibold text-txtColor",
                (modal || checkbox) && "text-[16px]"
              )}
            >
              {label}
            </Label>
          ) : null}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            defaultChecked={defaultChecked}
            className={cn(
              "text-xs px-2 py-1 h-7 bg-taskCard border border-borders text-txtColor",
              className
            )}
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

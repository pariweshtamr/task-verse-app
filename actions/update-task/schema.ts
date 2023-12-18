import { z } from "zod"

export const UpdateTask = z.object({
  id: z.string(),
  title: z.optional(
    z
      .string({
        required_error: "Title is required!",
        invalid_type_error: "Title is required!",
      })
      .min(3, {
        message: "Title is too short!",
      })
  ),
  description: z.optional(
    z.string({
      required_error: "Description is required!",
      invalid_type_error: "Description is required!",
    })
  ),
  date: z.optional(z.string()),
  isImportant: z.optional(z.boolean()),
  isCompleted: z.optional(z.boolean()),
})

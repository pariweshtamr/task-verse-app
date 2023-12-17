import { z } from "zod"

export const UpdateTask = z.object({
  id: z.string(),
  isCompleted: z.optional(z.boolean()),
})

import { z } from "zod"
import { DeleteTask } from "./schema"
import { Task } from "@prisma/client"
import { ActionState } from "@/lib/create-safe-action"

export type InputType = z.infer<typeof DeleteTask>
export type ReturnType = ActionState<InputType, Task>

import { z } from "zod"
import { UpdateTask } from "./schema"
import { Task } from "@prisma/client"
import { ActionState } from "@/lib/create-safe-action"

export type InputType = z.infer<typeof UpdateTask>
export type ReturnType = ActionState<InputType, Task>

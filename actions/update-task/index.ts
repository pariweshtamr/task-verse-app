"use server"
import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { UpdateTask } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()
  if (!userId) {
    return {
      error: "Unauthorized!",
    }
  }

  const { id, isCompleted, title, description, isImportant, date } = data
  let task

  try {
    task = await db.task.update({
      where: {
        id,
        userId,
      },
      data: {
        isCompleted,
        title,
        description,
        isImportant,
        date,
      },
    })

    revalidatePath("/all-tasks")

    return { data: task }
  } catch (error) {
    console.log("[ERROR DELETING TASK]", error)
    return {
      error: "Failed to delete task!",
    }
  }
}

export const updateTask = createSafeAction(UpdateTask, handler)

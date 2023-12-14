"use server"
import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { DeleteTask } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()
  if (!userId) {
    return {
      error: "Unauthorized!",
    }
  }

  const { id } = data
  let task

  try {
    task = await db.task.delete({
      where: {
        id,
        userId,
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

export const deleteTask = createSafeAction(DeleteTask, handler)

"use server"
import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateTask } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()

  if (!userId) {
    return {
      error: "Unauthorized!",
    }
  }

  const { title, description, date, isImportant } = data

  let task

  try {
    task = await db.task.create({
      data: {
        title,
        description,
        date,
        isImportant,
        userId,
      },
    })

    revalidatePath("/all-tasks")
    return { data: task }
  } catch (error) {
    console.log("[ERROR CREATING TASK]", error)
    return {
      error: "Failed to create task!",
    }
  }
}

export const createTask = createSafeAction(CreateTask, handler)

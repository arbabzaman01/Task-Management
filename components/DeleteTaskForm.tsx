"use client"

import { useDispatch } from "react-redux"
import { deleteTask } from "@/store/taskSlice"
import type { Task } from "@/store/taskSlice"

interface DeleteTaskFormProps {
  task: Task
}

export default function DeleteTaskForm({ task }: DeleteTaskFormProps) {
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task.id))
    }
  }

  return (
    <button onClick={handleDelete} className="delete-btn">
      Delete
    </button>
  )
}

"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store"
import { loadTasks } from "@/store/taskSlice"

export const useTaskPersistence = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  // Load tasks on initial mount
  useEffect(() => {
    dispatch(loadTasks())
  }, [dispatch])

  // Auto-save tasks whenever they change
  useEffect(() => {
    if (typeof window !== "undefined" && tasks.length > 0) {
      try {
        localStorage.setItem("tasks", JSON.stringify(tasks))
      } catch (error) {
        console.error("Error saving tasks:", error)
      }
    }
  }, [tasks])
}

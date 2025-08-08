"use client"

import type React from "react"
import { useState, useEffect } from "react"
import styles from "../app/taskapp/Task.module.css"

interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "completed"
  createdAt: string
}

interface TaskEditProps {
  isOpen: boolean
  task: Task | null
  onClose: () => void
  onUpdate: (task: Task) => void
}

export default function TaskEdit({ isOpen, task, onClose, onUpdate }: TaskEditProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"pending" | "completed">("pending")

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
      setStatus(task.status)
    }
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (task) {
      onUpdate({ ...task, title, description, status })
      onClose()
    }
  }

  const handleClose = () => {
    setTitle("")
    setDescription("")
    setStatus("pending")
    onClose()
  }

  if (!isOpen || !task) return null

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Edit Task</h2>
          <button onClick={handleClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as "pending" | "completed")}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={handleClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

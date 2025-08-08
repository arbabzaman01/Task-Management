"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { updateTask, closeForm } from "@/store/taskSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface EditTaskFormProps {
  isOpen: boolean
}

export default function EditTaskForm({ isOpen }: EditTaskFormProps) {
  const dispatch = useDispatch()
  const { editingTask } = useSelector((state: RootState) => state.tasks)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"pending" | "completed">("pending")

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setStatus(editingTask.status)
    }
  }, [editingTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingTask) {
      dispatch(
        updateTask({
          ...editingTask,
          title,
          description,
          status,
        }),
      )
    }

    dispatch(closeForm())
  }

  const handleClose = () => {
    dispatch(closeForm())
  }

  if (!isOpen || !editingTask) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <Button onClick={handleClose} className="close-btn">
            <X className="icon" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Task Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "pending" | "completed")}
              className="status-select"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <Button type="button" onClick={handleClose} className="cancel-btn">
              Cancel
            </Button>
            <Button type="submit" className="submit-btn">
              Update Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

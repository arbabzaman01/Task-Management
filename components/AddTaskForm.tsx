"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask, closeForm } from "@/store/taskSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface AddTaskFormProps {
  isOpen: boolean
}

export default function AddTaskForm({ isOpen }: AddTaskFormProps) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"pending" | "completed">("pending")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(
      addTask({
        title,
        description,
        status,
      }),
    )

    // Form reset
    setTitle("")
    setDescription("")
    setStatus("pending")
    dispatch(closeForm())
  }

  const handleClose = () => {
    setTitle("")
    setDescription("")
    setStatus("pending")
    dispatch(closeForm())
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Task</h2>
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
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

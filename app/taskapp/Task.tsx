"use client"

import { useState, useEffect } from "react"
import TaskAdd from "../../components/TaskAdd"
import TaskEdit from "../../components/TaskEdit"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Search, Trash2 } from "lucide-react"
import styles from "./Task.module.css"

interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "completed"
  createdAt: string
}

export default function TaskComponent() {
  // State Management
  const [tasks, setTasks] = useState<Task[]>([])
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Local Storage Functions
  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }

  const saveTasks = (tasksToSave: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasksToSave))
  }

  // Load tasks on component mount
  useEffect(() => {
    loadTasks()
  }, [])

  // Save tasks whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks)
    }
  }, [tasks])

  // Add Task Function
  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
    }
    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  // Edit Task Functions
  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsEditFormOpen(true)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
    setEditingTask(null)
  }

  // Delete Task Function - Now activates selection mode
  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(updatedTasks)
      saveTasks(updatedTasks)
    }
  }

  // Search Filter
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className={styles.container}>
      {/* Application Header */}
      <h1 className={styles.heading}>Task Management Application</h1>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.leftControls}>
          <Button onClick={() => setIsAddFormOpen(true)} className={styles.addBtn}>
            <Plus className={styles.icon} />
            Add Task
          </Button>
        </div>

        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Task List */}
      <div className={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <div className={styles.noTasks}>
            {searchTerm ? "No tasks found" : "No tasks available. Add your first task!"}
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className={styles.titleCell}>{task.title}</td>
                  <td className={styles.descCell}>{task.description || "No description"}</td>
                  <td className={styles.statusCell}>
                    <span className={`${styles.badge} ${styles[task.status]}`}>
                      {task.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{new Date(task.createdAt).toLocaleDateString()}</td>
                  <td className={styles.actionsCell}>
                    <div className={styles.actionButtons}>
                      <Button onClick={() => handleEditTask(task)} className={styles.editBtn} size="sm">
                        <Edit className={styles.icon} />
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteTask(task.id)} className={styles.deleteBtn} size="sm">
                        <Trash2 className={styles.icon} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Task Form */}
      <TaskAdd isOpen={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} onAdd={handleAddTask} />

      {/* Edit Task Form */}
      <TaskEdit
        isOpen={isEditFormOpen}
        task={editingTask}
        onClose={() => {
          setIsEditFormOpen(false)
          setEditingTask(null)
        }}
        onUpdate={handleUpdateTask}
      />
    </div>
  )
}

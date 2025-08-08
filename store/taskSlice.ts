import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "completed"
  createdAt: string
}

interface TaskState {
  tasks: Task[]
  isFormOpen: boolean
  editingTask: Task | null
  searchTerm: string
}

// Load tasks from localStorage
const loadTasksFromStorage = (): Task[] => {
  if (typeof window !== "undefined") {
    try {
      const savedTasks = localStorage.getItem("tasks")
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch (error) {
      return []
    }
  }
  return []
}

// Save tasks to localStorage
const saveTasksToStorage = (tasks: Task[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    } catch (error) {
      console.error("Save error:", error)
    }
  }
}

const initialState: TaskState = {
  tasks: [],
  isFormOpen: false,
  editingTask: null,
  searchTerm: "",
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Load tasks from localStorage
    loadTasks: (state) => {
      const savedTasks = loadTasksFromStorage()
      state.tasks = savedTasks
    },

    // Add new task
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "createdAt">>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      state.tasks.push(newTask)
      saveTasksToStorage(state.tasks)
    },

    // Update task
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
        saveTasksToStorage(state.tasks)
      }
    },

    // Delete task
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      saveTasksToStorage(state.tasks)
    },

    // Open form (Add or Edit)
    openForm: (state, action: PayloadAction<Task | null>) => {
      state.isFormOpen = true
      state.editingTask = action.payload
    },

    // Close form
    closeForm: (state) => {
      state.isFormOpen = false
      state.editingTask = null
    },

    // Set search term
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
  },
})

export const { loadTasks, addTask, updateTask, deleteTask, openForm, closeForm, setSearchTerm } = taskSlice.actions
export default taskSlice.reducer

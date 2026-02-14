import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import TaskForm from './components/TaskForm'
import TaskTable from './components/TaskTable'
import './App.css'

// Task interface (in JS as JSDoc or just comments)
/*
interface Task {
    id: number
    title: string
    description: string
    dueDate: string
    status: string
}
*/

// localStorage keys
const STORAGE_KEY = 'taskManager_tasks'
const THEME_KEY = 'taskManager_theme'

// Initial dummy data
const initialTasks = [
  {
    id: 1,
    title: 'Design System Implementation',
    description: 'Create a comprehensive design system with reusable components and tokens',
    dueDate: '2026-02-10',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'API Integration',
    description: 'Integrate third-party REST APIs for payment processing and notifications',
    dueDate: '2026-02-15',
    status: 'Todo',
  },
  {
    id: 3,
    title: 'User Authentication Module',
    description: 'Implement secure login, registration, and password recovery flows',
    dueDate: '2026-02-08',
    status: 'Done',
  },
  {
    id: 4,
    title: 'Performance Optimization',
    description: 'Optimize bundle size and implement lazy loading for better performance',
    dueDate: '2026-02-20',
    status: 'Todo',
  },
  {
    id: 5,
    title: 'Documentation Update',
    description: 'Update technical documentation and API reference guides',
    dueDate: '2026-02-12',
    status: 'In Progress',
  },
]

// Helper function to get tasks from localStorage
const getStoredTasks = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

// Helper function to get theme from localStorage
const getStoredTheme = () => {
  const stored = localStorage.getItem(THEME_KEY)
  return stored === null ? true : stored === 'dark'
}

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [editingTask, setEditingTask] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true) // Default to dark theme

  // Load tasks and theme from localStorage on mount
  useEffect(() => {
    const storedTasks = getStoredTasks()
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks)
    }

    const storedTheme = getStoredTheme()
    setIsDarkTheme(storedTheme)

    setIsLoaded(true)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }

    if (isLoaded) {
      localStorage.setItem(THEME_KEY, isDarkTheme ? 'dark' : 'light')
    }
  }, [isDarkTheme, isLoaded])

  // Save tasks to localStorage whenever they change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  // Toggle theme
  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  // Add a new task
  const handleAddTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now(),
    }
    setTasks([...tasks, task])
    setIsFormOpen(false)
  }

  // Update an existing task
  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
    setIsFormOpen(false)
  }

  // Delete a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    if (editingTask?.id === id) {
      setEditingTask(null)
      setIsFormOpen(false)
    }
  }

  // Start editing a task
  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  // Cancel editing / close form
  const handleCancelEdit = () => {
    setEditingTask(null)
    setIsFormOpen(false)
  }

  // Open form for new task
  const handleOpenForm = () => {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  // Toggle task completion status
  const handleToggleComplete = (task) => {
    const newStatus = task.status === 'Done' ? 'Todo' : 'Done'
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)))
  }

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar isDarkTheme={isDarkTheme} onToggleTheme={handleToggleTheme} />

      {/* Main Content */}
      <main className="main-content">
        {/* Page Header with Add Task Button */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Manage your projects and tasks efficiently</p>
          </div>
          <button
            type="button"
            onClick={handleOpenForm}
            className="btn-add-task"
          >
            <svg
              className="icon-sm"
              style={{ marginRight: '0.5rem' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Task
          </button>
        </div>

        {/* Task Table - Full Width */}
        <TaskTable
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p className="copyright">
            © 2026 Task Manager. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modal Overlay */}
      {isFormOpen && (
        <div className="modal-overlay">
          {/* Backdrop */}
          <div
            className="modal-backdrop"
            onClick={handleCancelEdit}
          />

          {/* Modal Content */}
          <div className="modal-container">
            <TaskForm
              onAddTask={handleAddTask}
              editingTask={editingTask}
              onUpdateTask={handleUpdateTask}
              onCancelEdit={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

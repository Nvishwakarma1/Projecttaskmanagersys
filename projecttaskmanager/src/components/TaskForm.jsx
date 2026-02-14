import React, { useState, useEffect } from 'react'
import './TaskForm.css'

const TaskForm = ({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [status, setStatus] = useState('Todo')

    // Update form when editingTask changes
    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title)
            setDescription(editingTask.description)
            setDueDate(editingTask.dueDate)
            setStatus(editingTask.status)
        } else {
            setTitle('')
            setDescription('')
            setDueDate('')
            setStatus('Todo')
        }
    }, [editingTask])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title.trim()) {
            alert('Please enter a task title')
            return
        }

        if (editingTask) {
            onUpdateTask({
                id: editingTask.id,
                title,
                description,
                dueDate,
                status,
            })
        } else {
            onAddTask({
                title,
                description,
                dueDate,
                status,
            })
        }

        // Reset form
        setTitle('')
        setDescription('')
        setDueDate('')
        setStatus('Todo')
    }

    return (
        <div className="task-form-card">
            {/* Modal Header */}
            <div className="task-form-header">
                <div>
                    <h2 className="task-form-title">
                        {editingTask ? 'Edit Task' : 'Add New Task'}
                    </h2>
                    <p className="task-form-subtitle">
                        {editingTask ? 'Update the task details below' : 'Create a new task by filling out the form'}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onCancelEdit}
                    className="close-btn"
                >
                    <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="task-form-body">
                {/* Title Input */}
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Title <span className="required-star">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        className="form-input"
                        autoFocus
                    />
                </div>

                {/* Description Textarea */}
                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
                        className="form-textarea"
                    />
                </div>

                {/* Due Date and Status Row */}
                <div className="form-row">
                    {/* Due Date Input */}
                    <div className="form-group">
                        <label htmlFor="dueDate" className="form-label">
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    {/* Status Dropdown */}
                    <div className="form-group">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="form-select"
                        >
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="form-actions">
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        <span className="btn-content">
                            <svg
                                className="icon-sm"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={editingTask ? "M5 13l4 4L19 7" : "M12 6v6m0 0v6m0-6h6m-6 0H6"}
                                />
                            </svg>
                            {editingTask ? 'Update Task' : 'Add Task'}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm

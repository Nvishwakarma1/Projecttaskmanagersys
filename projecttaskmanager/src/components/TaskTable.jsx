import React, { useState } from 'react'
import './TaskTable.css'

// Check if task is overdue (past due date and not done)
const isOverdue = (task) => {
    if (!task.dueDate || task.status === 'Done') return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dueDate = new Date(task.dueDate)
    return dueDate < today
}

// Get row CSS class based on task status
const getRowClass = (task) => {
    if (task.status === 'Done') {
        return 'row-done'
    }
    if (isOverdue(task)) {
        return 'row-overdue'
    }
    if (task.status === 'In Progress') {
        return 'row-in-progress'
    }
    return ''
}

// Get text styles for completed tasks
const getTextClass = (task) => {
    if (task.status === 'Done') {
        return 'text-done'
    }
    return ''
}

const getBadgeClass = (status) => {
    switch (status) {
        case 'Done': return 'badge-done'
        case 'In Progress': return 'badge-in-progress'
        case 'Todo':
        default: return 'badge-todo'
    }
}

const TaskTable = ({ tasks, onEditTask, onDeleteTask, onToggleComplete }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterDate, setFilterDate] = useState('')
    const [filterDateType, setFilterDateType] = useState('exact')

    // Filter tasks
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = searchQuery === '' ||
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = filterStatus === 'all' || task.status === filterStatus

        let matchesDate = true
        if (filterDate && task.dueDate) {
            const taskDate = new Date(task.dueDate)
            const filterDateObj = new Date(filterDate)

            switch (filterDateType) {
                case 'before':
                    matchesDate = taskDate <= filterDateObj
                    break
                case 'after':
                    matchesDate = taskDate >= filterDateObj
                    break
                case 'exact':
                default:
                    matchesDate = task.dueDate === filterDate
                    break
            }
        } else if (filterDate && !task.dueDate) {
            matchesDate = false
        }

        return matchesSearch && matchesStatus && matchesDate
    })

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDeleteTask(id)
        }
    }

    const clearFilters = () => {
        setSearchQuery('')
        setFilterStatus('all')
        setFilterDate('')
        setFilterDateType('exact')
    }

    const hasTasks = filteredTasks.length > 0
    const hasActiveFilters = searchQuery !== '' || filterStatus !== 'all' || filterDate !== ''

    return (
        <div className="task-table-card">
            {/* Header */}
            <div className="task-table-header">
                <div className="flex flex-col gap-4">
                    {/* Title and count */}
                    <div className="table-title-row">
                        <div>
                            <h2 className="table-title">Tasks</h2>
                            <p className="table-subtitle">
                                {tasks.length} total task{tasks.length !== 1 ? 's' : ''}
                                {hasActiveFilters && ` • ${filteredTasks.length} shown`}
                            </p>
                        </div>
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="clear-filters-btn"
                            >
                                <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Legend */}
                    <div className="status-legend">
                        <div className="legend-item">
                            <div className="legend-color legend-green"></div>
                            <span className="theme-text-muted">Completed</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color legend-amber"></div>
                            <span className="theme-text-muted">In Progress</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color legend-red"></div>
                            <span className="theme-text-muted">Overdue</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="search-container">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search tasks by title or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="search-clear-btn"
                            >
                                <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Filters Row */}
                    <div className="filters-container">
                        {/* Status Filter */}
                        <div className="filter-group">
                            <label htmlFor="filterStatus" className="filter-label">
                                Status
                            </label>
                            <select
                                id="filterStatus"
                                name="filterStatus"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Todo">Todo</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        {/* Date Type Filter */}
                        <div className="filter-group">
                            <label htmlFor="filterDateType" className="filter-label">
                                Date Filter
                            </label>
                            <select
                                id="filterDateType"
                                name="filterDateType"
                                value={filterDateType}
                                onChange={(e) => setFilterDateType(e.target.value)}
                                className="filter-select"
                            >
                                <option value="exact">Exact Date</option>
                                <option value="before">On or Before</option>
                                <option value="after">On or After</option>
                            </select>
                        </div>

                        {/* Due Date Filter */}
                        <div className="filter-group">
                            <label htmlFor="filterDate" className="filter-label">
                                Due Date
                            </label>
                            <input
                                type="date"
                                id="filterDate"
                                name="filterDate"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="filter-input"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table or Empty State */}
            {hasTasks ? (
                <div className="table-responsive">
                    <table className="task-table">
                        <thead>
                            <tr>
                                <th style={{ width: '3rem' }}></th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map((task) => (
                                <tr
                                    key={task.id}
                                    className={getRowClass(task)}
                                >
                                    {/* Tick/Complete Button */}
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => onToggleComplete(task)}
                                            className={`btn-check ${task.status === 'Done' ? 'btn-check-done' : 'btn-check-todo'}`}
                                            title={task.status === 'Done' ? 'Mark as incomplete' : 'Mark as done'}
                                        >
                                            {task.status === 'Done' && (
                                                <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    </td>
                                    <td>
                                        <span className={`text-sm font-medium theme-text-primary ${getTextClass(task)}`}>
                                            {task.title}
                                        </span>
                                        {isOverdue(task) && (
                                            <span className="text-overdue">Overdue</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`text-sm theme-text-secondary line-clamp-2 ${getTextClass(task)}`}>
                                            {task.description}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`text-sm theme-text-secondary ${getTextClass(task)}`}>
                                            {task.dueDate || '-'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${getBadgeClass(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="icon-btn-group">
                                            {/* Edit Button */}
                                            <button
                                                type="button"
                                                onClick={() => onEditTask(task)}
                                                className="btn-edit"
                                            >
                                                <svg
                                                    className="icon-sm"
                                                    style={{ marginRight: '0.375rem' }}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                Edit
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(task.id)}
                                                className="btn-delete"
                                            >
                                                <svg
                                                    className="icon-sm"
                                                    style={{ marginRight: '0.375rem' }}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* Empty State */
                <div className="empty-state">
                    <div className="empty-icon-box">
                        <svg
                            className="icon-sm theme-text-muted"
                            style={{ width: '2rem', height: '2rem' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                    </div>
                    <p className="empty-text">
                        {hasActiveFilters ? 'No tasks match your search or filters.' : 'No tasks available.'}
                    </p>
                    <p className="empty-subtext">
                        {hasActiveFilters ? 'Try adjusting your search or filter criteria.' : 'Add a task to get started.'}
                    </p>
                </div>
            )}
        </div>
    )
}

export default TaskTable

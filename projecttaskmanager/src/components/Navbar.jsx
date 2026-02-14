import React from 'react'
import './Navbar.css'

const Navbar = ({ isDarkTheme, onToggleTheme }) => {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    {/* Logo and Title */}
                    <div className="navbar-brand">
                        <div className="navbar-logo-box">
                            <svg
                                className="navbar-logo-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                />
                            </svg>
                        </div>
                        <h1 className="navbar-title">Task Manager</h1>
                    </div>

                    {/* Right side - Theme Toggle and User Avatar */}
                    <div className="navbar-actions">
                        {/* Theme Toggle Button */}
                        <button
                            type="button"
                            onClick={onToggleTheme}
                            className="theme-toggle-btn"
                            title={isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDarkTheme ? (
                                // Sun icon for light mode
                                <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                // Moon icon for dark mode
                                <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>

                        <span className="welcome-text">Welcome back</span>
                        <div className="user-avatar">
                            <svg
                                className="icon-sm theme-text-muted"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar

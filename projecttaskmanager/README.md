# Task Manager Dashboard

A modern, responsive Task Manager application built with **React** and **Vite**. This project helps users organize their tasks efficiently with features like adding, editing, deleting, and filtering tasks, all within a beautiful, dark-themed interface.

## 🚀 Features

- **Project Management Dashboard**: A clean and intuitive interface to view and manage tasks.
- **Add & Edit Tasks**: create new tasks with titles, descriptions, due dates, and statuses. easily update existing tasks.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Task Filtering**:
  - **Search**: Filter tasks by title or description.
  - **Status Filter**: View tasks by 'Todo', 'In Progress', or 'Done'.
  - **Date Filter**: Filter tasks by specific due dates (Exact, Before, or After).
- **Dark/Light Mode**: Toggle between a sleek dark mode and a clean light mode. The preference is saved in local storage.
- **Responsive Design**: Fully responsive layout that works seamlessly on desktops, tablets, and mobile devices.
- **Local Storage Persistence**: Tasks and theme preferences are saved locally, so you don't lose data on refresh.

## 🛠️ Tech Stack

- **Frontend Framework**: React (with Hooks and Functional Components)
- **Build Tool**: Vite
- **Styling**: Standard CSS (Modular and Variable-based)
- **Icons**: Inline SVGs (No external icon libraries)
- **State Management**: React `useState` and `useEffect`

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Nvishwakarma1/Projecttaskmanagersys.git
    cd Projecttaskmanagersys
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
Projecttaskmanagersys/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskTable.jsx
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles and variables
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Theme Customization

The project uses CSS variables for theming. You can customize the colors in `src/index.css`:

```css
:root {
  /* Light Theme */
  --bg-primary: #f8fafc;
  --text-primary: #0f172a;
  --accent-primary: #3b82f6;
  /* ... */
}

[data-theme="dark"] {
  /* Dark Theme */
  --bg-primary: #0a0a0a;
  --text-primary: #f8fafc;
  --accent-primary: #1e90ff;
  /* ... */
}
```

## 📝 License

This project is open-source and available for personal and educational use.

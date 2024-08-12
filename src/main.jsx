import React from 'react'
import ReactDOM from 'react-dom/client'
import Teams from './pages/TeamsPage'
import TeamPage from './pages/TeamPage'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Teams />
  },
  {
    path: "/teams/:teamId",
    element: <TeamPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

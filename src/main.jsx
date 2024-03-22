import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import './index.css'
import '@mantine/notifications/styles.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import Login from './pages/login'
import { Notifications } from '@mantine/notifications'
import Layout from './layouts/layout'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login></Login>
    },
    {
        path: "/dashboard",
        element: <Layout></Layout>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider>
            <Notifications />
            <RouterProvider router={router}></RouterProvider>
        </MantineProvider>
    </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import './index.css'
import '@mantine/notifications/styles.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {MantineProvider, useMantineColorScheme} from '@mantine/core'
import Login from './pages/login'
import {Notifications} from '@mantine/notifications'
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";
import Dashboard from "./pages/dashboard.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login></Login>
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider>
            <Notifications/>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <RouterProvider router={router}></RouterProvider>
            </DevSupport>
        </MantineProvider>
    </React.StrictMode>
)

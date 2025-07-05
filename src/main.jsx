import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router.jsx'
import AuthProvider from './UserAuth/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClint= new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer>

    </ToastContainer>
    <div data-theme='light'>
      <QueryClientProvider client={queryClint}>
        <AuthProvider>
          <RouterProvider router={router}>
          </RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)

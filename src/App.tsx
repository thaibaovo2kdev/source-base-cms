import LoadingPage from '@/components/loading-page'
import AuthLayout from '@/layouts/auth-layout'
import MainLayout from '@/layouts/main-layout'
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.scss'

const AdminLogin = lazy(() => import('@/pages/auth/login'))
const PageNotFound = lazy(() => import('@/pages/error/not-found'))

const LazyWrapper = (Component: React.ReactNode) => <Suspense fallback={<LoadingPage />}>{Component}</Suspense>

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: 'dashboard',
        children: [{ path: '', element: LazyWrapper(<div>Dashboard</div>) }],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: 'login', element: LazyWrapper(<AdminLogin />) },
    ],
  },
  { path: '*', element: LazyWrapper(<PageNotFound />) },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

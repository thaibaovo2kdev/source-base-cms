import { useAuth } from '@/hooks/use-auth'
import { Card } from 'antd'
import * as React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

interface IAuthLayoutProps {}

const AuthLayout: React.FunctionComponent<IAuthLayoutProps> = (props) => {
  const { isLoggedIn } = useAuth()
  if (isLoggedIn) {
    return <Navigate to={'/'} replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <Card className="md:w-[400px]">
        <Outlet />
      </Card>
    </div>
  )
}

export default AuthLayout

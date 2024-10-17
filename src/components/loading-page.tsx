import { Spin } from 'antd'
import * as React from 'react'

interface ILoadingPageProps {}

const LoadingPage: React.FunctionComponent<ILoadingPageProps> = (props) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spin size="large" />
    </div>
  )
}

export default LoadingPage

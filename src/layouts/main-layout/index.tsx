import LoadingPage from '@/components/loading-page'
import { useAuth } from '@/hooks/use-auth'
import { SIDEBAR_MENU_USER_KEY, sideBarMenu, userMenuItems } from '@/layouts/main-layout/utils'
import { getFirstCharacter } from '@/lib/utils'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Layout, Menu, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const MainLayout = () => {
  const { isLoggedIn, isCurrentUserFetched, isCurrentUserLoading, currentUser, logoutMutation } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileView, setMobileView] = useState(false)

  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => setCollapsed(!collapsed)

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case SIDEBAR_MENU_USER_KEY.PROFILE:
        console.log('Profile clicked')
        break
      case SIDEBAR_MENU_USER_KEY.SETTING:
        console.log('Settings clicked')
        break
      case SIDEBAR_MENU_USER_KEY.LOGOUT:
        logoutMutation.mutate()
        break
    }
  }

  const customStyles = `
  .ant-menu-dark .ant-menu-sub {
    background: #1e40af !important;
  }
`

  if (isCurrentUserLoading) {
    return <LoadingPage />
  }
  if (isCurrentUserFetched && !isLoggedIn) {
    return <Navigate to={'/auth/login'} replace />
  }

  return (
    <Layout className="min-h-screen bg-gray-100">
      <style>{customStyles}</style>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
        breakpoint="lg"
        collapsedWidth={mobileView ? 0 : 80}
        className={`bg-blue-800 fixed left-0 top-0 bottom-0 z-10 overflow-auto`}
        trigger={null}
      >
        <div className="h-16 flex items-center justify-center">
          <Title level={4} className="!text-white m-0">
            {collapsed ? 'CMS' : 'CMS Admin'}
          </Title>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['dashboard']}
          mode="inline"
          items={sideBarMenu}
          className="bg-blue-800 text-blue-100"
        />
      </Sider>
      <Layout
        className={`transition-all duration-300 ${collapsed ? 'md:ml-20' : 'ml-[200px]'} ${mobileView ? 'ml-0' : ''}`}
        style={{ marginTop: 64 }} // Add this line
      >
        <Header
          className="p-0 bg-white shadow-md fixed top-0 right-0 z-10"
          style={{
            width: `calc(100% - ${collapsed ? (mobileView ? '0px' : '80px') : '200px'})`,
            transition: 'width 0.3s',
          }}
        >
          <div className="flex justify-between items-center h-full px-4">
            <div className="flex items-center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleSidebar}
                className="text-lg size-8 flex items-center justify-center text-blue-800"
              />
              {/* <Title level={4} className="m-0 ml-4 text-blue-800">
                Gift Card CMS
              </Title> */}
            </div>
            <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }} placement="bottomRight">
              <div className="flex items-center cursor-pointer gap-2">
                <Avatar src={currentUser?.avatar} alt={currentUser?.email}>
                  <span className="capitalize"> {getFirstCharacter(currentUser?.email)}</span>
                </Avatar>
                <span className="mr-2 text-blue-800">{currentUser?.email}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="m-4 py-6">
          <div className="p-6 min-h-[360px] bg-white rounded-lg shadow">{<Outlet />}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout

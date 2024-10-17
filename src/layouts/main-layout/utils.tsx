import { DashboardOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

import { NotificationOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

export const sideBarMenu: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: <Link to={'/dashboard'}>Dashboard</Link>,
  },
  {
    key: 'reports',
    icon: <NotificationOutlined />,
    label: <Link to={'/reports'}>Reports</Link>,
  },
]

export enum SIDEBAR_MENU_USER_KEY {
  PROFILE = 'profile',
  SETTING = 'setting',
  LOGOUT = 'logout',
}

export const userMenuItems: MenuProps['items'] = [
  {
    key: SIDEBAR_MENU_USER_KEY.PROFILE,
    label: 'Profile',
    icon: <UserOutlined />,
  },
  {
    key: SIDEBAR_MENU_USER_KEY.SETTING,
    label: 'Settings',
    icon: <SettingOutlined />,
  },
  {
    key: SIDEBAR_MENU_USER_KEY.LOGOUT,
    label: 'Logout',
    icon: <LogoutOutlined />,
  },
]

import { useAuth } from '@/hooks/use-auth'
import { GiftOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { NavLink } from 'react-router-dom'

const { Title, Paragraph } = Typography

export default function AdminLogin() {
  const [form] = Form.useForm()
  const { loginMutation } = useAuth()

  const onFinish = (values: any) => {
    delete values.isRemember
    loginMutation.mutate({
      ...values,
    })
  }

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <GiftOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
        <Title level={2} style={{ color: '#1890ff', marginBottom: '8px' }}>
          CMS Admin
        </Title>
        <Title level={4} style={{ color: '#000000', marginTop: 0 }}>
          Admin Login
        </Title>
        <Paragraph style={{ color: '#666666' }}>Enter your credentials to access the admin panel</Paragraph>
      </div>
      <Form form={form} name="login" initialValues={{ isRemember: true }} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your Email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="isRemember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <NavLink to={'auth/forgot-password'} className="float-right text-primary">
            Forgot password
          </NavLink>
        </Form.Item>
        <Form.Item>
          <Button loading={loginMutation.isPending} type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

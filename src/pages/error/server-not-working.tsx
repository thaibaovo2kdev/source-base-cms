import { GiftOutlined, HomeOutlined } from '@ant-design/icons'
import { Button, Layout, Result, Typography } from 'antd'
import { NavLink } from 'react-router-dom'

const { Content } = Layout
const { Title, Paragraph } = Typography

const PageServerNotWorking = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Result
          icon={<GiftOutlined style={{ color: '#1890ff', fontSize: 72 }} />}
          title={
            <Title level={2} style={{ color: '#1890ff' }}>
              500 - Oops! This Page is Not Working.
            </Title>
          }
          subTitle={<Paragraph style={{ fontSize: 16, color: '#666666' }}>The requested page dose not exist</Paragraph>}
          extra={[
            <Button type="primary" key="home" icon={<HomeOutlined />} size="large">
              <NavLink to={'/'}>Back to Home</NavLink>
            </Button>,
          ]}
        />
      </Content>
    </Layout>
  )
}

export default PageServerNotWorking

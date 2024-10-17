import { GiftOutlined, HomeOutlined } from '@ant-design/icons'
import { Button, Layout, Result, Typography } from 'antd'
import { NavLink } from 'react-router-dom'

const { Content } = Layout
const { Title, Paragraph } = Typography

const PageNotFound = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Result
          icon={<GiftOutlined style={{ color: '#1890ff', fontSize: 72 }} />}
          title={
            <Title level={2} style={{ color: '#1890ff' }}>
              404 - Page Not Found
            </Title>
          }
          subTitle={
            <Paragraph style={{ fontSize: 16, color: '#666666' }}>
              Sorry, the page you're looking for doesn't exist in the CMS.
            </Paragraph>
          }
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

export default PageNotFound

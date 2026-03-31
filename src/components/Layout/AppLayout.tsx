import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  GlobalOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import styles from './AppLayout.module.scss';

const { Sider, Header, Content } = Layout;

const menuItems = [
  {
    key: '/danh-muc/tinh-tp',
    icon: <GlobalOutlined />,
    label: <Link to="/danh-muc/tinh-tp">Tỉnh / Thành phố TW</Link>,
  },
  {
    key: '/danh-muc/huyen-thi-xa',
    icon: <EnvironmentOutlined />,
    label: <Link to="/danh-muc/huyen-thi-xa">Huyện /Thành phố / Thị xã</Link>,
  },
  {
    key: '/danh-muc/xa-phuong',
    icon: <HomeOutlined />,
    label: <Link to="/danh-muc/xa-phuong">Xã / Phường</Link>,
  },
];

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const selectedKey =
    menuItems.find((item) => location.pathname.startsWith(item.key))?.key ?? '';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login', { replace: true });
  };

  return (
    <Layout className={styles['main-layout']} style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={240}
        style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}
      >
        <div className={styles.logo}>
          <AppstoreOutlined className={styles['logo__icon']} />
          {!collapsed && <span className={styles['logo__text']}>Danh Mục THX</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'margin-left 0.2s' }}>
        <Header className={styles['ant-layout-header']} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', background: '#fff', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
          <span style={{ fontWeight: 600, fontSize: 16, color: '#262626' }}>
            Hệ thống Quản lý Danh mục Hành chính
          </span>
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Header>
        <Content style={{ padding: 24, background: '#f0f2f5', minHeight: 'calc(100vh - 64px)' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  GlobalOutlined,
  HomeOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import styles from './AppLayout.module.scss';
import { ROUTES } from '../../router/routes';

const { Sider, Header, Content } = Layout;

const menuItems = [
  {
    key: ROUTES.catalogProvinces,
    icon: <GlobalOutlined />,
    label: <Link to={ROUTES.catalogProvinces}>Tỉnh / Thành phố TW</Link>,
  },
  {
    key: ROUTES.catalogWards,
    icon: <HomeOutlined />,
    label: <Link to={ROUTES.catalogWards}>Xã / Phường</Link>,
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
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <Layout className={styles['main-layout']} style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={260}
        theme="light"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
        }}
      >
        <div
          className={styles.logo}
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #f0f0f0',
            overflow: 'hidden',
          }}
        >
          <AppstoreOutlined
            className={styles['logo__icon']}
            style={{ fontSize: 24, color: '#1890ff', marginRight: collapsed ? 0 : 8 }}
          />
          {!collapsed && (
            <span
              className={styles['logo__text']}
              style={{
                fontWeight: 700,
                fontSize: 18,
                background: 'linear-gradient(45deg, #1890ff, #722ed1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Quy Hoạch HC
            </span>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ borderRight: 0, padding: '16px 8px' }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1) 0s' }}>
        <Header
          className={styles['ant-layout-header']}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,21,41,.08)',
            height: 64,
            zIndex: 99,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 18, color: '#1f2937' }}>
            Hệ thống Quản lý Hành chính Việt Nam
          </span>
          <Button
            type="primary"
            danger
            shape="round"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ fontWeight: 500 }}
          >
            Đăng xuất
          </Button>
        </Header>
        <Content
          style={{
            padding: '24px',
            margin: '24px 16px 0',
            background: '#fff',
            minHeight: 'calc(100vh - 115px)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            overflow: 'initial',
          }}
        >
          <Outlet />
        </Content>
        <div style={{ textAlign: 'center', padding: '16px', color: '#8c8c8c', fontSize: '13px' }}>
          Quản lý Danh mục Hành chính ©{new Date().getFullYear()} Created with Ant Design
        </div>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

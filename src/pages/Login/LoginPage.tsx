import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setLoading(true);
    // Giả lập call API login delay 1 giây
    setTimeout(() => {
      setLoading(false);
      // Mock tài khoản đúng là admin / 123456
      if (values.username === 'admin' && values.password === '123456') {
        message.success('Đăng nhập thành công!');
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/danh-muc/tinh-tp', { replace: true });
      } else {
        message.error('Tài khoản hoặc mật khẩu không chính xác! (Gợi ý: admin/123456)');
      }
    }, 1000);
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['glass-card']}>
        <SafetyCertificateOutlined className={styles.logo} />
        <h2 className={styles.title}>Đăng nhập hệ thống</h2>
        <p className={styles.subtitle}>Quản lý danh mục hành chính nhà nước</p>

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tài khoản (admin)" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu (123456)"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles['login-btn']}
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import AppLayout from '../components/Layout/AppLayout';

const LoginPage = lazy(() => import('../pages/Login/LoginPage'));
const TinhTPPage = lazy(() => import('../pages/TinhTP/TinhTPPage'));

const XaPhuongPage = lazy(() => import('../pages/XaPhuong/XaPhuongPage'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
    <Spin size="large" tip="Đang tải..." />
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/danh-muc/tinh-tp" replace />} />
          <Route path="danh-muc/tinh-tp" element={<TinhTPPage />} />

          <Route path="danh-muc/xa-phuong" element={<XaPhuongPage />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;

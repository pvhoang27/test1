import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import AppLayout from '../components/Layout/AppLayout';
import { ROUTES } from './routes';

const LoginPage = lazy(() => import('../pages/Login/LoginPage'));
const ProvincePage = lazy(() => import('../pages/Province/ProvincePage'));

const WardPage = lazy(() => import('../pages/Ward/WardPage'));

const LoadingFallback = () => (
  <Spin size="large" tip="Đang tải..." fullscreen />
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path={ROUTES.login} element={<LoginPage />} />
        
        <Route path={ROUTES.home} element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to={ROUTES.catalogProvinces} replace />} />
          <Route path="catalog/provinces" element={<ProvincePage />} />
          <Route path="catalog/wards" element={<WardPage />} />
          <Route path="danh-muc/tinh-tp" element={<Navigate to={ROUTES.catalogProvinces} replace />} />
          <Route path="danh-muc/xa-phuong" element={<Navigate to={ROUTES.catalogWards} replace />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;

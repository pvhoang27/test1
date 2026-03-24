import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import AppLayout from '../components/Layout/AppLayout';

const TinhTPPage = lazy(() => import('../pages/TinhTP/TinhTPPage'));
const HuyenThiXaPage = lazy(() => import('../pages/HuyenThiXa/HuyenThiXaPage'));
const XaPhuongPage = lazy(() => import('../pages/XaPhuong/XaPhuongPage'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
    <Spin size="large" tip="Đang tải..." />
  </div>
);

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/danh-muc/tinh-tp" replace />} />
        <Route
          path="danh-muc/tinh-tp"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <TinhTPPage />
            </Suspense>
          }
        />
        <Route
          path="danh-muc/huyen-thi-xa"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <HuyenThiXaPage />
            </Suspense>
          }
        />
        <Route
          path="danh-muc/xa-phuong"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <XaPhuongPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

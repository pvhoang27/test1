import axios from 'axios';
import {
  mockTinhTP,
  mockHuyenThiXa,
  mockXaPhuong,
  searchMockTinhTP,
  searchMockHuyenThiXa,
  searchMockXaPhuong,
} from '../mocks/danhMucMock';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// ============ Mock Response Interceptor ============
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config;
    const url = config?.url || '';
    const params = config?.params || {};

    // Bắt lỗi network và trả về mock data
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.warn('Using mock data for:', url);

      // Tỉnh TP - getAll
      if (url.includes('/danh-muc/tinh-tp/all')) {
        return Promise.resolve({
          data: mockTinhTP,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      }

      // Tỉnh TP - search
      if (url.includes('/danh-muc/tinh-tp') && !url.includes('all')) {
        const result = searchMockTinhTP({
          tenTinh: params.tenTinh,
          page: params.page || 1,
          pageSize: params.pageSize || 10,
        });
        return Promise.resolve({
          data: result,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      }

      // Huyện Thị Xã
      if (url.includes('/danh-muc/huyen-thi-xa')) {
        const result = searchMockHuyenThiXa({
          maTinh: params.maTinh,
          tenHuyen: params.tenHuyen,
          page: params.page || 1,
          pageSize: params.pageSize || 10,
        });
        return Promise.resolve({
          data: result,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      }

      // Xã Phường
      if (url.includes('/danh-muc/xa-phuong')) {
        const result = searchMockXaPhuong({
          maHuyen: params.maHuyen,
          tenXa: params.tenXa,
          page: params.page || 1,
          pageSize: params.pageSize || 10,
        });
        return Promise.resolve({
          data: result,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      }
    }

    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

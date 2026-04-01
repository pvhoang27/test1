import axios from 'axios';
import {
  mockProvinces,
  searchMockProvinces,
  searchMockWards,
} from '../mocks/catalogMock';

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
          data: mockProvinces,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      }

      // Tỉnh TP - search
      if (url.includes('/danh-muc/tinh-tp') && !url.includes('all')) {
        const result = searchMockProvinces({
          provinceName: params.tenTinh ?? params.provinceName,
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
        const result = searchMockWards({
          provinceCode: params.maTinh ?? params.provinceCode,
          wardName: params.tenXa ?? params.wardName,
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

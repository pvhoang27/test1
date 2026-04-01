import axios from 'axios';
import {
  mockProvinces,
  searchMockProvinces,
  searchMockWards,
} from '../mocks/catalogMock';

const ENDPOINTS = {
  provinces: '/catalog/provinces',
  provincesAll: '/catalog/provinces/all',
  wards: '/catalog/wards',
} as const;

const LEGACY_ENDPOINTS = {
  provinces: '/danh-muc/tinh-tp',
  provincesAll: '/danh-muc/tinh-tp/all',
  wards: '/danh-muc/xa-phuong',
} as const;

const LEGACY_FIELDS = {
  provinceCode: 'maTinh',
  provinceName: 'tenTinh',
  wardCode: 'maXa',
  wardName: 'tenXa',
} as const;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

const toLegacyPath = (url: string): string => {
  if (url.startsWith(ENDPOINTS.provincesAll)) {
    return url.replace(ENDPOINTS.provincesAll, LEGACY_ENDPOINTS.provincesAll);
  }

  if (url.startsWith(ENDPOINTS.provinces)) {
    return url.replace(ENDPOINTS.provinces, LEGACY_ENDPOINTS.provinces);
  }

  if (url.startsWith(ENDPOINTS.wards)) {
    return url.replace(ENDPOINTS.wards, LEGACY_ENDPOINTS.wards);
  }

  return url;
};

const isUrlMatch = (url: string, englishPath: string, legacyPath: string): boolean =>
  url.includes(englishPath) || url.includes(legacyPath);

// Keep frontend endpoint names in English while remaining backward-compatible with legacy backend routes.
api.interceptors.request.use((config) => {
  if (typeof config.url === 'string') {
    config.url = toLegacyPath(config.url);
  }

  return config;
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
      if (isUrlMatch(url, ENDPOINTS.provincesAll, LEGACY_ENDPOINTS.provincesAll)) {
        return Promise.resolve({
          data: mockProvinces,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      }

      // Tỉnh TP - search
      if (
        isUrlMatch(url, ENDPOINTS.provinces, LEGACY_ENDPOINTS.provinces) &&
        !url.includes('all')
      ) {
        const result = searchMockProvinces({
          provinceCode: params[LEGACY_FIELDS.provinceCode] ?? params.provinceCode,
          provinceName: params[LEGACY_FIELDS.provinceName] ?? params.provinceName,
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
      if (isUrlMatch(url, ENDPOINTS.wards, LEGACY_ENDPOINTS.wards)) {
        const result = searchMockWards({
          provinceCode: params[LEGACY_FIELDS.provinceCode] ?? params.provinceCode,
          wardCode: params[LEGACY_FIELDS.wardCode] ?? params.wardCode,
          wardName: params[LEGACY_FIELDS.wardName] ?? params.wardName,
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

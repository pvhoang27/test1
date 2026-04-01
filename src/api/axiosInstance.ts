import axios from 'axios';
import {
  createMockProvince,
  createMockWard,
  deleteMockProvince,
  deleteMockWard,
  getMockProvinces,
  searchMockProvinces,
  searchMockWards,
  updateMockProvince,
  updateMockWard,
} from '../mocks/catalogMock';

type MockHttpResponse = {
  data: unknown;
  status: number;
  statusText: string;
};

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

const USE_MOCK_CATALOG = import.meta.env.DEV && import.meta.env.VITE_USE_REAL_API !== 'true';

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

const isCatalogPath = (url: string): boolean =>
  isUrlMatch(url, ENDPOINTS.provinces, LEGACY_ENDPOINTS.provinces) ||
  isUrlMatch(url, ENDPOINTS.provincesAll, LEGACY_ENDPOINTS.provincesAll) ||
  isUrlMatch(url, ENDPOINTS.wards, LEGACY_ENDPOINTS.wards);

const parseData = (data: unknown): Record<string, unknown> => {
  if (!data) {
    return {};
  }

  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as Record<string, unknown>;
    } catch {
      return {};
    }
  }

  if (typeof data === 'object') {
    return data as Record<string, unknown>;
  }

  return {};
};

const getResourceId = (url: string, englishPath: string, legacyPath: string): string | null => {
  const source = url.includes(englishPath) ? englishPath : legacyPath;
  const index = url.indexOf(source);

  if (index < 0) {
    return null;
  }

  const suffix = url.slice(index + source.length);
  const cleanPath = suffix.split('?')[0];
  const id = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;

  return id || null;
};

const toStringValue = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    return value;
  }

  return undefined;
};

const resolveMockResponse = (
  method: string,
  url: string,
  params: Record<string, unknown>,
  body: Record<string, unknown>
): MockHttpResponse | null => {
  // Tinh/TP - getAll
  if (method === 'get' && isUrlMatch(url, ENDPOINTS.provincesAll, LEGACY_ENDPOINTS.provincesAll)) {
    return {
      data: getMockProvinces(),
      status: 200,
      statusText: 'OK',
    };
  }

  // Tinh/TP - search
  if (
    method === 'get' &&
    isUrlMatch(url, ENDPOINTS.provinces, LEGACY_ENDPOINTS.provinces) &&
    !url.includes('/import') &&
    !url.includes('all')
  ) {
    return {
      data: searchMockProvinces({
        provinceCode:
          toStringValue(params[LEGACY_FIELDS.provinceCode]) ?? toStringValue(params.provinceCode),
        provinceName:
          toStringValue(params[LEGACY_FIELDS.provinceName]) ?? toStringValue(params.provinceName),
        page: Number(params.page) || 1,
        pageSize: Number(params.pageSize) || 10,
      }),
      status: 200,
      statusText: 'OK',
    };
  }

  // Tinh/TP - create
  if (
    method === 'post' &&
    isUrlMatch(url, ENDPOINTS.provinces, LEGACY_ENDPOINTS.provinces) &&
    !url.includes('/import')
  ) {
    const created = createMockProvince({
      provinceCode:
        toStringValue(body.provinceCode) ?? toStringValue(body[LEGACY_FIELDS.provinceCode]) ?? '',
      provinceName:
        toStringValue(body.provinceName) ?? toStringValue(body[LEGACY_FIELDS.provinceName]) ?? '',
    });

    return {
      data: created,
      status: 201,
      statusText: 'Created',
    };
  }

  // Tinh/TP - update
  if (method === 'put' && isUrlMatch(url, ENDPOINTS.provinces, LEGACY_ENDPOINTS.provinces)) {
    const provinceCode = getResourceId(url, ENDPOINTS.provinces, LEGACY_ENDPOINTS.provinces);
    if (provinceCode) {
      const updated = updateMockProvince(provinceCode, {
        provinceName:
          toStringValue(body.provinceName) ??
          toStringValue(body[LEGACY_FIELDS.provinceName]),
      });

      return {
        data: updated,
        status: 200,
        statusText: 'OK',
      };
    }
  }

  // Tinh/TP - delete
  if (method === 'delete' && isUrlMatch(url, ENDPOINTS.provinces, LEGACY_ENDPOINTS.provinces)) {
    const provinceCode = getResourceId(url, ENDPOINTS.provinces, LEGACY_ENDPOINTS.provinces);
    if (provinceCode) {
      deleteMockProvince(provinceCode);
      return {
        data: null,
        status: 200,
        statusText: 'OK',
      };
    }
  }

  // Xa/Phuong - search
  if (
    method === 'get' &&
    isUrlMatch(url, ENDPOINTS.wards, LEGACY_ENDPOINTS.wards) &&
    !url.includes('/import')
  ) {
    return {
      data: searchMockWards({
        provinceCode:
          toStringValue(params[LEGACY_FIELDS.provinceCode]) ?? toStringValue(params.provinceCode),
        wardCode: toStringValue(params[LEGACY_FIELDS.wardCode]) ?? toStringValue(params.wardCode),
        wardName: toStringValue(params[LEGACY_FIELDS.wardName]) ?? toStringValue(params.wardName),
        page: Number(params.page) || 1,
        pageSize: Number(params.pageSize) || 10,
      }),
      status: 200,
      statusText: 'OK',
    };
  }

  // Xa/Phuong - create
  if (
    method === 'post' &&
    isUrlMatch(url, ENDPOINTS.wards, LEGACY_ENDPOINTS.wards) &&
    !url.includes('/import')
  ) {
    const created = createMockWard({
      wardCode: toStringValue(body.wardCode) ?? toStringValue(body[LEGACY_FIELDS.wardCode]) ?? '',
      wardName: toStringValue(body.wardName) ?? toStringValue(body[LEGACY_FIELDS.wardName]) ?? '',
      provinceCode:
        toStringValue(body.provinceCode) ?? toStringValue(body[LEGACY_FIELDS.provinceCode]) ?? '',
      provinceName: '',
    });

    return {
      data: created,
      status: 201,
      statusText: 'Created',
    };
  }

  // Xa/Phuong - update
  if (method === 'put' && isUrlMatch(url, ENDPOINTS.wards, LEGACY_ENDPOINTS.wards)) {
    const wardCode = getResourceId(url, ENDPOINTS.wards, LEGACY_ENDPOINTS.wards);
    if (wardCode) {
      const updated = updateMockWard(wardCode, {
        wardName: toStringValue(body.wardName) ?? toStringValue(body[LEGACY_FIELDS.wardName]),
        provinceCode:
          toStringValue(body.provinceCode) ??
          toStringValue(body[LEGACY_FIELDS.provinceCode]),
      });

      return {
        data: updated,
        status: 200,
        statusText: 'OK',
      };
    }
  }

  // Xa/Phuong - delete
  if (method === 'delete' && isUrlMatch(url, ENDPOINTS.wards, LEGACY_ENDPOINTS.wards)) {
    const wardCode = getResourceId(url, ENDPOINTS.wards, LEGACY_ENDPOINTS.wards);
    if (wardCode) {
      deleteMockWard(wardCode);
      return {
        data: null,
        status: 200,
        statusText: 'OK',
      };
    }
  }

  return null;
};

// Keep frontend endpoint names in English while remaining backward-compatible with legacy backend routes.
api.interceptors.request.use((config) => {
  if (typeof config.url === 'string') {
    config.url = toLegacyPath(config.url);

    // In FE-only workflow, serve catalog requests from local mock without touching backend.
    if (USE_MOCK_CATALOG && isCatalogPath(config.url)) {
      const method = String(config.method || 'get').toLowerCase();
      const params = (config.params || {}) as Record<string, unknown>;
      const body = parseData(config.data);

      config.adapter = async () => {
        const mock = resolveMockResponse(method, config.url as string, params, body);

        if (!mock) {
          throw new Error(`UNSUPPORTED_MOCK_ENDPOINT:${method}:${config.url}`);
        }

        return {
          data: mock.data,
          status: mock.status,
          statusText: mock.statusText,
          headers: {},
          config,
        };
      };
    }
  }

  return config;
});

// ============ Mock Response Interceptor ============
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config;
    const url = config?.url || error?.request?.responseURL || '';
    const params = (config?.params || {}) as Record<string, unknown>;
    const method = String(config?.method || 'get').toLowerCase();
    const body = parseData(config?.data);

    // Fallback to mock for FE-only mode and all transport errors without response.
    if ((USE_MOCK_CATALOG || !error.response) && isCatalogPath(url)) {
      console.warn('Using mock data for:', url);
      try {
        const mock = resolveMockResponse(method, url, params, body);

        if (mock) {
          return Promise.resolve({
            data: mock.data,
            status: mock.status,
            statusText: mock.statusText,
            headers: {},
            config,
          });
        }
      } catch (mockError) {
        return Promise.reject(mockError);
      }
    }

    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

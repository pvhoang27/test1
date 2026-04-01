import api from './axiosInstance';
import type {
  Province,
  ProvinceSearchParams,
  Ward,
  WardSearchParams,
  ApiResponse,
  ImportResult,
} from '../types';

const ENDPOINTS = {
  provinces: '/catalog/provinces',
  provincesAll: '/catalog/provinces/all',
  provinceImport: '/catalog/provinces/import',
  wards: '/catalog/wards',
  wardImport: '/catalog/wards/import',
} as const;

const LEGACY_FIELDS = {
  provinceCode: 'maTinh',
  provinceName: 'tenTinh',
  wardCode: 'maXa',
  wardName: 'tenXa',
} as const;

type LegacyProvince = {
  provinceCode?: string;
  provinceName?: string;
  [key: string]: string | undefined;
};

type LegacyWard = {
  wardCode?: string;
  wardName?: string;
  provinceCode?: string;
  provinceName?: string;
  [key: string]: string | undefined;
};

const toProvince = (item: LegacyProvince): Province => ({
  provinceCode: item.provinceCode ?? item[LEGACY_FIELDS.provinceCode] ?? '',
  provinceName: item.provinceName ?? item[LEGACY_FIELDS.provinceName] ?? '',
});

const toWard = (item: LegacyWard): Ward => ({
  wardCode: item.wardCode ?? item[LEGACY_FIELDS.wardCode] ?? '',
  wardName: item.wardName ?? item[LEGACY_FIELDS.wardName] ?? '',
  provinceCode: item.provinceCode ?? item[LEGACY_FIELDS.provinceCode] ?? '',
  provinceName: item.provinceName ?? item[LEGACY_FIELDS.provinceName],
});

const mapProvinceSearchResponse = (
  response: ApiResponse<LegacyProvince>
): ApiResponse<Province> => ({
  ...response,
  data: response.data.map(toProvince),
});

const mapWardSearchResponse = (
  response: ApiResponse<LegacyWard>
): ApiResponse<Ward> => ({
  ...response,
  data: response.data.map(toWard),
});

// ============ Province APIs ============
export const provinceApi = {
  create: (data: Province): Promise<Province> =>
    api
      .post(ENDPOINTS.provinces, {
        [LEGACY_FIELDS.provinceCode]: data.provinceCode,
        [LEGACY_FIELDS.provinceName]: data.provinceName,
      })
      .then((r) => toProvince(r.data)),

  search: (params: ProvinceSearchParams): Promise<ApiResponse<Province>> =>
    api
      .get(ENDPOINTS.provinces, {
        params: {
          [LEGACY_FIELDS.provinceCode]: params.provinceCode,
          [LEGACY_FIELDS.provinceName]: params.provinceName,
          page: params.page,
          pageSize: params.pageSize,
        },
      })
      .then((r) => mapProvinceSearchResponse(r.data)),

  getAll: (): Promise<Province[]> =>
    api.get(ENDPOINTS.provincesAll).then((r) =>
      (r.data as LegacyProvince[]).map(toProvince)
    ),

  update: (provinceCode: string, data: Partial<Province>): Promise<Province> =>
    api
      .put(`${ENDPOINTS.provinces}/${provinceCode}`, {
        [LEGACY_FIELDS.provinceCode]: data.provinceCode,
        [LEGACY_FIELDS.provinceName]: data.provinceName,
      })
      .then((r) => toProvince(r.data)),

  delete: (provinceCode: string): Promise<void> =>
    api.delete(`${ENDPOINTS.provinces}/${provinceCode}`).then((r) => r.data),

  importFile: (provinceCode: string, file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(LEGACY_FIELDS.provinceCode, provinceCode);
    return api
      .post(ENDPOINTS.provinceImport, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};


// ============ Ward APIs ============
export const wardApi = {
  create: (data: Ward): Promise<Ward> =>
    api
      .post(ENDPOINTS.wards, {
        [LEGACY_FIELDS.wardCode]: data.wardCode,
        [LEGACY_FIELDS.wardName]: data.wardName,
        [LEGACY_FIELDS.provinceCode]: data.provinceCode,
      })
      .then((r) => toWard(r.data)),

  search: (params: WardSearchParams): Promise<ApiResponse<Ward>> =>
    api
      .get(ENDPOINTS.wards, {
        params: {
          [LEGACY_FIELDS.wardCode]: params.wardCode,
          [LEGACY_FIELDS.wardName]: params.wardName,
          [LEGACY_FIELDS.provinceCode]: params.provinceCode,
          page: params.page,
          pageSize: params.pageSize,
        },
      })
      .then((r) => mapWardSearchResponse(r.data)),

  update: (wardCode: string, data: Partial<Ward>): Promise<Ward> =>
    api
      .put(`${ENDPOINTS.wards}/${wardCode}`, {
        [LEGACY_FIELDS.wardCode]: data.wardCode,
        [LEGACY_FIELDS.wardName]: data.wardName,
        [LEGACY_FIELDS.provinceCode]: data.provinceCode,
      })
      .then((r) => toWard(r.data)),

  delete: (wardCode: string): Promise<void> =>
    api.delete(`${ENDPOINTS.wards}/${wardCode}`).then((r) => r.data),

  importFile: (provinceCode: string, file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(LEGACY_FIELDS.provinceCode, provinceCode);
    return api
      .post(ENDPOINTS.wardImport, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};

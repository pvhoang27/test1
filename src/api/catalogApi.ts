import api from './axiosInstance';
import type {
  Province,
  ProvinceSearchParams,
  Ward,
  WardSearchParams,
  ApiResponse,
  ImportResult,
} from '../types';

type LegacyProvince = {
  maTinh?: string;
  tenTinh?: string;
  provinceCode?: string;
  provinceName?: string;
};

type LegacyWard = {
  maXa?: string;
  tenXa?: string;
  maTinh?: string;
  tenTinh?: string;
  wardCode?: string;
  wardName?: string;
  provinceCode?: string;
  provinceName?: string;
};

const toProvince = (item: LegacyProvince): Province => ({
  provinceCode: item.provinceCode ?? item.maTinh ?? '',
  provinceName: item.provinceName ?? item.tenTinh ?? '',
});

const toWard = (item: LegacyWard): Ward => ({
  wardCode: item.wardCode ?? item.maXa ?? '',
  wardName: item.wardName ?? item.tenXa ?? '',
  provinceCode: item.provinceCode ?? item.maTinh ?? '',
  provinceName: item.provinceName ?? item.tenTinh,
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
  search: (params: ProvinceSearchParams): Promise<ApiResponse<Province>> =>
    api
      .get('/danh-muc/tinh-tp', {
        params: {
          maTinh: params.provinceCode,
          tenTinh: params.provinceName,
          page: params.page,
          pageSize: params.pageSize,
        },
      })
      .then((r) => mapProvinceSearchResponse(r.data)),

  getAll: (): Promise<Province[]> =>
    api.get('/danh-muc/tinh-tp/all').then((r) =>
      (r.data as LegacyProvince[]).map(toProvince)
    ),

  update: (provinceCode: string, data: Partial<Province>): Promise<Province> =>
    api
      .put(`/danh-muc/tinh-tp/${provinceCode}`, {
        maTinh: data.provinceCode,
        tenTinh: data.provinceName,
      })
      .then((r) => toProvince(r.data)),

  delete: (provinceCode: string): Promise<void> =>
    api.delete(`/danh-muc/tinh-tp/${provinceCode}`).then((r) => r.data),

  importFile: (provinceCode: string, file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('maTinh', provinceCode);
    return api
      .post('/danh-muc/tinh-tp/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};


// ============ Ward APIs ============
export const wardApi = {
  search: (params: WardSearchParams): Promise<ApiResponse<Ward>> =>
    api
      .get('/danh-muc/xa-phuong', {
        params: {
          maXa: params.wardCode,
          tenXa: params.wardName,
          maTinh: params.provinceCode,
          page: params.page,
          pageSize: params.pageSize,
        },
      })
      .then((r) => mapWardSearchResponse(r.data)),

  update: (wardCode: string, data: Partial<Ward>): Promise<Ward> =>
    api
      .put(`/danh-muc/xa-phuong/${wardCode}`, {
        maXa: data.wardCode,
        tenXa: data.wardName,
        maTinh: data.provinceCode,
      })
      .then((r) => toWard(r.data)),

  delete: (wardCode: string): Promise<void> =>
    api.delete(`/danh-muc/xa-phuong/${wardCode}`).then((r) => r.data),

  importFile: (provinceCode: string, file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('maTinh', provinceCode);
    return api
      .post('/danh-muc/xa-phuong/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};

import api from './axiosInstance';
import type {
  TinhTP,
  TinhTPSearchParams,
  HuyenThiXa,
  HuyenThiXaSearchParams,
  XaPhuong,
  XaPhuongSearchParams,
  ApiResponse,
  ImportResult,
} from '../types';

// ============ Tỉnh / TP APIs ============
export const tinhTPApi = {
  search: (params: TinhTPSearchParams): Promise<ApiResponse<TinhTP>> =>
    api.get('/danh-muc/tinh-tp', { params }).then((r) => r.data),

  getAll: (): Promise<TinhTP[]> =>
    api.get('/danh-muc/tinh-tp/all').then((r) => r.data),

  update: (maTinh: string, data: Partial<TinhTP>): Promise<TinhTP> =>
    api.put(`/danh-muc/tinh-tp/${maTinh}`, data).then((r) => r.data),

  delete: (maTinh: string): Promise<void> =>
    api.delete(`/danh-muc/tinh-tp/${maTinh}`).then((r) => r.data),

  importFile: (maTinh: string, file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('maTinh', maTinh);
    return api
      .post('/danh-muc/tinh-tp/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};

// ============ Huyện / Thị xã APIs ============
export const huyenThiXaApi = {
  search: (params: HuyenThiXaSearchParams): Promise<ApiResponse<HuyenThiXa>> =>
    api.get('/danh-muc/huyen-thi-xa', { params }).then((r) => r.data),

  update: (maHuyen: string, data: Partial<HuyenThiXa>): Promise<HuyenThiXa> =>
    api.put(`/danh-muc/huyen-thi-xa/${maHuyen}`, data).then((r) => r.data),

  delete: (maHuyen: string): Promise<void> =>
    api.delete(`/danh-muc/huyen-thi-xa/${maHuyen}`).then((r) => r.data),

  importFile: (maTinh: string, file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('maTinh', maTinh);
    return api
      .post('/danh-muc/huyen-thi-xa/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};

// ============ Xã / Phường APIs ============
export const xaPhuongApi = {
  search: (params: XaPhuongSearchParams): Promise<ApiResponse<XaPhuong>> =>
    api.get('/danh-muc/xa-phuong', { params }).then((r) => r.data),

  update: (maXa: string, data: Partial<XaPhuong>): Promise<XaPhuong> =>
    api.put(`/danh-muc/xa-phuong/${maXa}`, data).then((r) => r.data),

  delete: (maXa: string): Promise<void> =>
    api.delete(`/danh-muc/xa-phuong/${maXa}`).then((r) => r.data),

  importFile: (maHuyen: string, file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('maHuyen', maHuyen);
    return api
      .post('/danh-muc/xa-phuong/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};

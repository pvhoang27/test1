// ============ Tỉnh / Thành phố ============
export interface TinhTP {
  maTinh: string;
  tenTinh: string;
}

export interface TinhTPSearchParams {
  maTinh?: string;
  tenTinh?: string;
  page?: number;
  pageSize?: number;
}

// ============ Huyện / Thị xã ============
export interface HuyenThiXa {
  maHuyen: string;
  tenHuyen: string;
  maTinh: string;
  tenTinh?: string;
}

export interface HuyenThiXaSearchParams {
  maTinh?: string;
  tenHuyen?: string;
  page?: number;
  pageSize?: number;
}

// ============ Xã / Phường ============
export interface XaPhuong {
  maXa: string;
  tenXa: string;
  maHuyen: string;
  tenHuyen?: string;
}

export interface XaPhuongSearchParams {
  maXa?: string;
  tenXa?: string;
  maHuyen?: string;
  page?: number;
  pageSize?: number;
}

// ============ API Response ============
export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ImportResult {
  success: boolean;
  message: string;
  errors?: string[];
}

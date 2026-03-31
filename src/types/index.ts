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

// ============ Huyện / Thị xã (Removed based on new requirements) ============

// ============ Xã / Phường ============
export interface XaPhuong {
  maXa: string;
  tenXa: string;
  maTinh: string;
  tenTinh?: string;
}

export interface XaPhuongSearchParams {
  maXa?: string;
  tenXa?: string;
  maTinh?: string;
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

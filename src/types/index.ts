// ============ Province ============
export interface Province {
  provinceCode: string;
  provinceName: string;
}

export interface ProvinceSearchParams {
  provinceCode?: string;
  provinceName?: string;
  page?: number;
  pageSize?: number;
}

// ============ District / Town (Removed based on new requirements) ============

// ============ Ward ============
export interface Ward {
  wardCode: string;
  wardName: string;
  provinceCode: string;
  provinceName?: string;
}

export interface WardSearchParams {
  wardCode?: string;
  wardName?: string;
  provinceCode?: string;
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

import type { Province, Ward, ApiResponse } from '../types';

// ============ Mock Provinces ============
export const mockProvinces: Province[] = [
  // Mock data set for 2026 structure with 34 province/city records
  { provinceCode: '01', provinceName: 'Hà Nội' },
  { provinceCode: '02', provinceName: 'Hồ Chí Minh' },
  { provinceCode: '03', provinceName: 'Hải Phòng' },
  { provinceCode: '04', provinceName: 'Đà Nẵng' },
  { provinceCode: '05', provinceName: 'Cần Thơ' },
  { provinceCode: '06', provinceName: 'Huế' },
  { provinceCode: '07', provinceName: 'Lai Châu' },
  { provinceCode: '08', provinceName: 'Điện Biên' },
  { provinceCode: '09', provinceName: 'Sơn La' },
  { provinceCode: '10', provinceName: 'Lào Cai' },
  { provinceCode: '11', provinceName: 'Tuyên Quang' },
  { provinceCode: '12', provinceName: 'Cao Bằng' },
  { provinceCode: '13', provinceName: 'Lạng Sơn' },
  { provinceCode: '14', provinceName: 'Quảng Ninh' },
  { provinceCode: '15', provinceName: 'Thái Nguyên' },
  { provinceCode: '16', provinceName: 'Phú Thọ' },
  { provinceCode: '17', provinceName: 'Bắc Ninh' },
  { provinceCode: '18', provinceName: 'Hưng Yên' },
  { provinceCode: '19', provinceName: 'Ninh Bình' },
  { provinceCode: '20', provinceName: 'Thanh Hóa' },
  { provinceCode: '21', provinceName: 'Nghệ An' },
  { provinceCode: '22', provinceName: 'Hà Tĩnh' },
  { provinceCode: '23', provinceName: 'Quảng Trị' },
  { provinceCode: '24', provinceName: 'Quảng Ngãi' },
  { provinceCode: '25', provinceName: 'Gia Lai' },
  { provinceCode: '26', provinceName: 'Đắk Lắk' },
  { provinceCode: '27', provinceName: 'Khánh Hòa' },
  { provinceCode: '28', provinceName: 'Lâm Đồng' },
  { provinceCode: '29', provinceName: 'Đồng Nai' },
  { provinceCode: '30', provinceName: 'Tây Ninh' },
  { provinceCode: '31', provinceName: 'Vĩnh Long' },
  { provinceCode: '32', provinceName: 'Đồng Tháp' },
  { provinceCode: '33', provinceName: 'An Giang' },
  { provinceCode: '34', provinceName: 'Cà Mau' },
];

// ============ Mock Wards ============
export const mockWards: Ward[] = mockProvinces.flatMap((province, index) => {
  const prefix = province.provinceCode.padStart(2, '0');
  const serialBase = `${prefix}${String(index + 1).padStart(2, '0')}`;

  const wardTemplates = [
    'Phường Trung Tâm',
    'Phường Đông',
    'Phường Tây',
    'Phường Nam',
    'Phường Bắc',
    'Xã Hòa Bình',
    'Xã Tân Lập',
    'Xã Minh Châu',
    'Xã An Phú',
    'Xã Phú Thịnh',
  ];

  return wardTemplates.map((template, wardIndex) => ({
    wardCode: `${serialBase}${String(wardIndex + 1).padStart(2, '0')}`,
    wardName: `${template} ${province.provinceName}`,
    provinceCode: province.provinceCode,
    provinceName: province.provinceName,
  }));
});

// ============ Helper Functions ============

/**
 * Tạo mock response cho Province
 */
export function createMockProvinceResponse(
  page: number = 1,
  pageSize: number = 10
): ApiResponse<Province> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = mockProvinces.slice(start, end);

  return {
    data,
    total: mockProvinces.length,
    page,
    pageSize,
  };
}

/**
 * Tìm kiếm mock Province
 */
export function searchMockProvinces(params: {
  provinceCode?: string;
  provinceName?: string;
  page?: number;
  pageSize?: number;
}): ApiResponse<Province> {
  const { provinceCode, provinceName, page = 1, pageSize = 10 } = params;
  let filtered = mockProvinces;

  if (provinceCode) {
    filtered = filtered.filter((p) =>
      p.provinceCode.toLowerCase().includes(provinceCode.toLowerCase())
    );
  }

  if (provinceName) {
    filtered = filtered.filter((p) =>
      p.provinceName.toLowerCase().includes(provinceName.toLowerCase())
    );
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize,
  };
}


/**
 * Tạo mock response cho Ward
 */
export function createMockWardResponse(
  page: number = 1,
  pageSize: number = 10
): ApiResponse<Ward> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = mockWards.slice(start, end);

  return {
    data,
    total: mockWards.length,
    page,
    pageSize,
  };
}

/**
 * Tìm kiếm mock Ward
 */
export function searchMockWards(params: {
  provinceCode?: string;
  wardCode?: string;
  wardName?: string;
  page?: number;
  pageSize?: number;
}): ApiResponse<Ward> {
  const { provinceCode, wardCode, wardName, page = 1, pageSize = 10 } = params;
  let filtered = mockWards;

  if (provinceCode) {
    filtered = filtered.filter((x) => x.provinceCode === provinceCode);
  }

  if (wardCode) {
    filtered = filtered.filter((x) =>
      x.wardCode.toLowerCase().includes(wardCode.toLowerCase())
    );
  }

  if (wardName) {
    filtered = filtered.filter((x) =>
      x.wardName.toLowerCase().includes(wardName.toLowerCase())
    );
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize,
  };
}

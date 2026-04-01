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

const mockDb = {
  provinces: [...mockProvinces],
  wards: [...mockWards],
};

export const getMockProvinces = (): Province[] => mockDb.provinces;

export const getMockWards = (): Ward[] => mockDb.wards;

export const createMockProvince = (province: Province): Province => {
  const provinceCode = province.provinceCode.trim();
  const provinceName = province.provinceName.trim();

  if (!provinceCode || !provinceName) {
    throw new Error('INVALID_PROVINCE_DATA');
  }

  if (mockDb.provinces.some((item) => item.provinceCode === provinceCode)) {
    throw new Error('PROVINCE_CODE_EXISTS');
  }

  const newProvince: Province = { provinceCode, provinceName };
  mockDb.provinces.unshift(newProvince);
  return newProvince;
};

export const updateMockProvince = (
  provinceCode: string,
  data: Partial<Province>
): Province => {
  const index = mockDb.provinces.findIndex((item) => item.provinceCode === provinceCode);
  if (index < 0) {
    throw new Error('PROVINCE_NOT_FOUND');
  }

  const current = mockDb.provinces[index];
  const updated: Province = {
    ...current,
    provinceName: data.provinceName?.trim() ?? current.provinceName,
  };

  mockDb.provinces[index] = updated;

  mockDb.wards = mockDb.wards.map((ward) =>
    ward.provinceCode === provinceCode ? { ...ward, provinceName: updated.provinceName } : ward
  );

  return updated;
};

export const deleteMockProvince = (provinceCode: string): void => {
  const beforeCount = mockDb.provinces.length;
  mockDb.provinces = mockDb.provinces.filter((item) => item.provinceCode !== provinceCode);

  if (mockDb.provinces.length === beforeCount) {
    throw new Error('PROVINCE_NOT_FOUND');
  }

  mockDb.wards = mockDb.wards.filter((ward) => ward.provinceCode !== provinceCode);
};

export const createMockWard = (ward: Ward): Ward => {
  const wardCode = ward.wardCode.trim();
  const wardName = ward.wardName.trim();
  const provinceCode = ward.provinceCode.trim();

  if (!wardCode || !wardName || !provinceCode) {
    throw new Error('INVALID_WARD_DATA');
  }

  if (mockDb.wards.some((item) => item.wardCode === wardCode)) {
    throw new Error('WARD_CODE_EXISTS');
  }

  const province = mockDb.provinces.find((item) => item.provinceCode === provinceCode);
  if (!province) {
    throw new Error('PROVINCE_NOT_FOUND');
  }

  const newWard: Ward = {
    wardCode,
    wardName,
    provinceCode,
    provinceName: province.provinceName,
  };

  mockDb.wards.unshift(newWard);
  return newWard;
};

export const updateMockWard = (wardCode: string, data: Partial<Ward>): Ward => {
  const index = mockDb.wards.findIndex((item) => item.wardCode === wardCode);
  if (index < 0) {
    throw new Error('WARD_NOT_FOUND');
  }

  const current = mockDb.wards[index];
  const nextProvinceCode = data.provinceCode?.trim() ?? current.provinceCode;
  const province = mockDb.provinces.find((item) => item.provinceCode === nextProvinceCode);

  if (!province) {
    throw new Error('PROVINCE_NOT_FOUND');
  }

  const updated: Ward = {
    ...current,
    wardName: data.wardName?.trim() ?? current.wardName,
    provinceCode: nextProvinceCode,
    provinceName: province.provinceName,
  };

  mockDb.wards[index] = updated;
  return updated;
};

export const deleteMockWard = (wardCode: string): void => {
  const beforeCount = mockDb.wards.length;
  mockDb.wards = mockDb.wards.filter((item) => item.wardCode !== wardCode);

  if (mockDb.wards.length === beforeCount) {
    throw new Error('WARD_NOT_FOUND');
  }
};

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
  const data = mockDb.provinces.slice(start, end);

  return {
    data,
    total: mockDb.provinces.length,
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
  let filtered = mockDb.provinces;

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
  const data = mockDb.wards.slice(start, end);

  return {
    data,
    total: mockDb.wards.length,
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
  let filtered = mockDb.wards;

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

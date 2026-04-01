import type { Province, Ward, ApiResponse } from '../types';

// ============ Mock Provinces ============
export const mockProvinces: Province[] = [
  // Giữ lại đúng 34 Tỉnh/TP sau sắp xếp theo yêu cầu
  { provinceCode: '01', provinceName: 'Hà Nội' },
  { provinceCode: '02', provinceName: 'Hà Giang' },
  { provinceCode: '04', provinceName: 'Cao Bằng' },
  { provinceCode: '06', provinceName: 'Bắc Kạn' },
  { provinceCode: '08', provinceName: 'Tuyên Quang' },
  { provinceCode: '10', provinceName: 'Lào Cai' },
  { provinceCode: '11', provinceName: 'Yên Bái' },
  { provinceCode: '12', provinceName: 'Thái Nguyên' },
  { provinceCode: '14', provinceName: 'Lạng Sơn' },
  { provinceCode: '15', provinceName: 'Quảng Ninh' },
  { provinceCode: '17', provinceName: 'Bắc Giang' },
  { provinceCode: '19', provinceName: 'Phú Thọ' },
  { provinceCode: '20', provinceName: 'Vĩnh Phúc' },
  { provinceCode: '22', provinceName: 'Hà Nam' },
  { provinceCode: '24', provinceName: 'Hải Dương' },
  { provinceCode: '25', provinceName: 'Hải Phòng' },
  { provinceCode: '26', provinceName: 'Hưng Yên' },
  { provinceCode: '27', provinceName: 'Thái Bình' },
  { provinceCode: '30', provinceName: 'Ninh Bình' },
  { provinceCode: '31', provinceName: 'Thanh Hóa' },
  { provinceCode: '32', provinceName: 'Nghệ An' },
  { provinceCode: '33', provinceName: 'Hà Tĩnh' },
  { provinceCode: '34', provinceName: 'Quảng Bình' },
  { provinceCode: '35', provinceName: 'Quảng Trị' },
  { provinceCode: '36', provinceName: 'Thừa Thiên Huế' },
  { provinceCode: '37', provinceName: 'Đà Nẵng' },
  { provinceCode: '38', provinceName: 'Quảng Nam' },
  { provinceCode: '40', provinceName: 'Quảng Ngãi' },
  { provinceCode: '42', provinceName: 'Bình Định' },
  { provinceCode: '44', provinceName: 'Phú Yên' },
  { provinceCode: '45', provinceName: 'Khánh Hòa' },
  { provinceCode: '49', provinceName: 'Đồng Nai' },
  { provinceCode: '51', provinceName: 'Hồ Chí Minh' },
  { provinceCode: '61', provinceName: 'Cần Thơ' },
];

// ============ Mock Wards ============
export const mockWards: Ward[] = [
  // Hà Nội
  { wardCode: '00101', wardName: 'Phường Trúc Bạch (Mới)', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00102', wardName: 'Phường Cống Vị (Sáp nhập)', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00103', wardName: 'Phường Liễu Giai', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00104', wardName: 'Phường Nguyễn Trung Trực (Sáp nhập)', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00105', wardName: 'Phường Phúc Tân', provinceCode: '01', provinceName: 'Hà Nội' },

  // Hoàn Kiếm, Hà Nội
  { wardCode: '00201', wardName: 'Phường Tràng Tiền', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00202', wardName: 'Phường Hàng Bạc', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00203', wardName: 'Phường Thanh Niên', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00204', wardName: 'Phường Hồ Tây', provinceCode: '01', provinceName: 'Hà Nội' },

  // Tây Hồ, Hà Nội
  { wardCode: '00301', wardName: 'Phường Quảng An', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00302', wardName: 'Phường Yên Phụ', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00303', wardName: 'Phường Tứ Liên', provinceCode: '01', provinceName: 'Hà Nội' },

  // Thanh Xuân, Hà Nội
  { wardCode: '00401', wardName: 'Phường Thanh Xuân Bắc', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00402', wardName: 'Phường Thanh Xuân Nam', provinceCode: '01', provinceName: 'Hà Nội' },
  { wardCode: '00403', wardName: 'Phường Thanh Xuân Trung', provinceCode: '01', provinceName: 'Hà Nội' },

  // Hà Giang
  { wardCode: '02101', wardName: 'Phường Hàng Khánh', provinceCode: '02', provinceName: 'Hà Giang' },
  { wardCode: '02102', wardName: 'Phường Nguyễn Huệ', provinceCode: '02', provinceName: 'Hà Giang' },
  { wardCode: '02103', wardName: 'Phường Cầu Ngang', provinceCode: '02', provinceName: 'Hà Giang' },
  { wardCode: '02201', wardName: 'Thị trấn Vị Xuyên', provinceCode: '02', provinceName: 'Hà Giang' },
  { wardCode: '02202', wardName: 'Xã Thượng Sơn', provinceCode: '02', provinceName: 'Hà Giang' },

  // Hồ Chí Minh
  { wardCode: '02701', wardName: 'Phường Bến Nghé (Mới)', provinceCode: '51', provinceName: 'Hồ Chí Minh' },
  { wardCode: '02702', wardName: 'Phường Bến Thành (Sáp nhập)', provinceCode: '51', provinceName: 'Hồ Chí Minh' },
  { wardCode: '02703', wardName: 'Phường Đa Kao', provinceCode: '51', provinceName: 'Hồ Chí Minh' },
  { wardCode: '02704', wardName: 'Phường Nguyễn Huệ', provinceCode: '51', provinceName: 'Hồ Chí Minh' },
  { wardCode: '02801', wardName: 'Phường An Khánh Đông (Sáp nhập)', provinceCode: '51', provinceName: 'Hồ Chí Minh' },
  { wardCode: '02802', wardName: 'Phường An Lợi Tây', provinceCode: '51', provinceName: 'Hồ Chí Minh' },
  { wardCode: '02803', wardName: 'Phường Thạnh Mỹ Lợi', provinceCode: '51', provinceName: 'Hồ Chí Minh' },
  { wardCode: '02804', wardName: 'Phường Cát Lái (Sáp nhập)', provinceCode: '51', provinceName: 'Hồ Chí Minh' },
];

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
  provinceName?: string;
  page?: number;
  pageSize?: number;
}): ApiResponse<Province> {
  const { provinceName, page = 1, pageSize = 10 } = params;
  let filtered = mockProvinces;

  if (provinceName) {
    filtered = mockProvinces.filter((p) =>
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
    total: 3321, // Faked total according to new data
    page,
    pageSize,
  };
}

/**
 * Tìm kiếm mock Ward
 */
export function searchMockWards(params: {
  provinceCode?: string;
  wardName?: string;
  page?: number;
  pageSize?: number;
}): ApiResponse<Ward> {
  const { provinceCode, wardName, page = 1, pageSize = 10 } = params;
  let filtered = mockWards;

  if (provinceCode) {
    filtered = filtered.filter((x) => x.provinceCode === provinceCode);
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
    total: provinceCode || wardName ? filtered.length : 3321, // Show 3321 if searching everything
    page,
    pageSize,
  };
}

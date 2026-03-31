import type { TinhTP, XaPhuong, ApiResponse } from '../types';

// ============ Mock Tỉnh / Thành phố ============
export const mockTinhTP: TinhTP[] = [
  { maTinh: '01', tenTinh: 'Hà Nội' },
  { maTinh: '02', tenTinh: 'Hà Giang' },
  { maTinh: '04', tenTinh: 'Cao Bằng' },
  { maTinh: '06', tenTinh: 'Bắc Kạn' },
  { maTinh: '08', tenTinh: 'Tuyên Quang' },
  { maTinh: '10', tenTinh: 'Lào Cai' },
  { maTinh: '11', tenTinh: 'Yên Bái' },
  { maTinh: '12', tenTinh: 'Thái Nguyên' },
  { maTinh: '14', tenTinh: 'Lạng Sơn' },
  { maTinh: '15', tenTinh: 'Quảng Ninh' },
  { maTinh: '17', tenTinh: 'Bắc Giang' },
  { maTinh: '19', tenTinh: 'Phú Thọ' },
  { maTinh: '20', tenTinh: 'Vĩnh Phúc' },
  { maTinh: '22', tenTinh: 'Hà Nam' },
  { maTinh: '24', tenTinh: 'Hải Dương' },
  { maTinh: '25', tenTinh: 'Hải Phòng' },
  { maTinh: '26', tenTinh: 'Hưng Yên' },
  { maTinh: '27', tenTinh: 'Thái Bình' },
  { maTinh: '30', tenTinh: 'Ninh Bình' },
  { maTinh: '31', tenTinh: 'Thanh Hóa' },
  { maTinh: '32', tenTinh: 'Nghệ An' },
  { maTinh: '33', tenTinh: 'Hà Tĩnh' },
  { maTinh: '34', tenTinh: 'Quảng Bình' },
  { maTinh: '35', tenTinh: 'Quảng Trị' },
  { maTinh: '36', tenTinh: 'Thừa Thiên Huế' },
  { maTinh: '37', tenTinh: 'Đà Nẵng' },
  { maTinh: '38', tenTinh: 'Quảng Nam' },
  { maTinh: '40', tenTinh: 'Quảng Ngãi' },
  { maTinh: '42', tenTinh: 'Bình Định' },
  { maTinh: '44', tenTinh: 'Phú Yên' },
  { maTinh: '45', tenTinh: 'Khánh Hòa' },
  { maTinh: '46', tenTinh: 'Ninh Thuận' },
  { maTinh: '47', tenTinh: 'Bình Thuận' },
  { maTinh: '49', tenTinh: 'Đồng Nai' },
  { maTinh: '50', tenTinh: 'Bà Rịa - Vũng Tàu' },
  { maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maTinh: '52', tenTinh: 'Long An' },
  { maTinh: '53', tenTinh: 'Tiền Giang' },
  { maTinh: '54', tenTinh: 'Bến Tre' },
  { maTinh: '55', tenTinh: 'Trà Vinh' },
  { maTinh: '56', tenTinh: 'Vĩnh Long' },
  { maTinh: '57', tenTinh: 'Đồng Tháp' },
  { maTinh: '58', tenTinh: 'An Giang' },
  { maTinh: '59', tenTinh: 'Kiên Giang' },
  { maTinh: '61', tenTinh: 'Cần Thơ' },
  { maTinh: '62', tenTinh: 'Hậu Giang' },
  { maTinh: '63', tenTinh: 'Sóc Trăng' },
  { maTinh: '64', tenTinh: 'Bạc Liêu' },
  { maTinh: '65', tenTinh: 'Cà Mau' },
];

// ============ Mock Xã / Phường ============
export const mockXaPhuong: XaPhuong[] = [
  // Hà Nội
  { maXa: '00101', tenXa: 'Phường Trúc Bạch', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00102', tenXa: 'Phường Cống Vị', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00103', tenXa: 'Phường Liễu Giai', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00104', tenXa: 'Phường Nguyễn Trung Trực', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00105', tenXa: 'Phường Phúc Tân', maTinh: '01', tenTinh: 'Hà Nội' },

  // Hoàn Kiếm, Hà Nội
  { maXa: '00201', tenXa: 'Phường Tràng Tiền', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00202', tenXa: 'Phường Hàng Bạc', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00203', tenXa: 'Phường Thanh Niên', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00204', tenXa: 'Phường Hồ Tây', maTinh: '01', tenTinh: 'Hà Nội' },

  // Tây Hồ, Hà Nội
  { maXa: '00301', tenXa: 'Phường Quảng An', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00302', tenXa: 'Phường Yên Phụ', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00303', tenXa: 'Phường Tứ Liên', maTinh: '01', tenTinh: 'Hà Nội' },

  // Thanh Xuân, Hà Nội
  { maXa: '00401', tenXa: 'Phường Thanh Xuân Bắc', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00402', tenXa: 'Phường Thanh Xuân Nam', maTinh: '01', tenTinh: 'Hà Nội' },
  { maXa: '00403', tenXa: 'Phường Thanh Xuân Trung', maTinh: '01', tenTinh: 'Hà Nội' },

  // Hà Giang
  { maXa: '02101', tenXa: 'Phường Hàng Khánh', maTinh: '02', tenTinh: 'Hà Giang' },
  { maXa: '02102', tenXa: 'Phường Nguyễn Huệ', maTinh: '02', tenTinh: 'Hà Giang' },
  { maXa: '02103', tenXa: 'Phường Cầu Ngang', maTinh: '02', tenTinh: 'Hà Giang' },
  { maXa: '02201', tenXa: 'Thị trấn Vị Xuyên', maTinh: '02', tenTinh: 'Hà Giang' },
  { maXa: '02202', tenXa: 'Xã Thượng Sơn', maTinh: '02', tenTinh: 'Hà Giang' },

  // Hồ Chí Minh
  { maXa: '02701', tenXa: 'Phường Bến Nghé', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maXa: '02702', tenXa: 'Phường Bến Thành', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maXa: '02703', tenXa: 'Phường Đa Kao', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maXa: '02704', tenXa: 'Phường Nguyễn Huệ', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maXa: '02801', tenXa: 'Phường An Khánh', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maXa: '02802', tenXa: 'Phường An Lợi Đông', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maXa: '02803', tenXa: 'Phường Thạnh Mỹ Lợi', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maXa: '02804', tenXa: 'Phường Cát Lái', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
];

// ============ Helper Functions ============

/**
 * Tạo mock response cho Tỉnh TP
 */
export function createMockTinhTPResponse(
  page: number = 1,
  pageSize: number = 10
): ApiResponse<TinhTP> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = mockTinhTP.slice(start, end);

  return {
    data,
    total: mockTinhTP.length,
    page,
    pageSize,
  };
}

/**
 * Tìm kiếm mock Tỉnh TP
 */
export function searchMockTinhTP(params: {
  tenTinh?: string;
  page?: number;
  pageSize?: number;
}): ApiResponse<TinhTP> {
  const { tenTinh, page = 1, pageSize = 10 } = params;
  let filtered = mockTinhTP;

  if (tenTinh) {
    filtered = mockTinhTP.filter((t) =>
      t.tenTinh.toLowerCase().includes(tenTinh.toLowerCase())
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
 * Tạo mock response cho Xã Phường
 */
export function createMockXaPhuongResponse(
  page: number = 1,
  pageSize: number = 10
): ApiResponse<XaPhuong> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = mockXaPhuong.slice(start, end);

  return {
    data,
    total: mockXaPhuong.length,
    page,
    pageSize,
  };
}

/**
 * Tìm kiếm mock Xã Phường
 */
export function searchMockXaPhuong(params: {
  maTinh?: string;
  tenXa?: string;
  page?: number;
  pageSize?: number;
}): ApiResponse<XaPhuong> {
  const { maTinh, tenXa, page = 1, pageSize = 10 } = params;
  let filtered = mockXaPhuong;

  if (maTinh) {
    filtered = filtered.filter((x) => x.maTinh === maTinh);
  }

  if (tenXa) {
    filtered = filtered.filter((x) =>
      x.tenXa.toLowerCase().includes(tenXa.toLowerCase())
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

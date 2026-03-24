import type { TinhTP, HuyenThiXa, XaPhuong, ApiResponse } from '../types';

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

// ============ Mock Huyện / Thị xã ============
export const mockHuyenThiXa: HuyenThiXa[] = [
  // Hà Nội
  { maHuyen: '001', tenHuyen: 'Ba Đình', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '002', tenHuyen: 'Hoàn Kiếm', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '003', tenHuyen: 'Tây Hồ', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '004', tenHuyen: 'Thanh Xuân', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '005', tenHuyen: 'Cầu Giấy', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '006', tenHuyen: 'Đống Đa', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '007', tenHuyen: 'Hai Bà Trưng', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '008', tenHuyen: 'Hoàng Mai', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '009', tenHuyen: 'Long Biên', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '010', tenHuyen: 'Từ Liêm', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '011', tenHuyen: 'Bắc Từ Liêm', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '012', tenHuyen: 'Sóc Sơn', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '013', tenHuyen: 'Đông Anh', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '014', tenHuyen: 'Gia Lâm', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '015', tenHuyen: 'Thanh Trì', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '016', tenHuyen: 'Hoài Đức', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '017', tenHuyen: 'Thạch Thất', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '018', tenHuyen: 'Quốc Oai', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '019', tenHuyen: 'Phú Xuyên', maTinh: '01', tenTinh: 'Hà Nội' },
  { maHuyen: '020', tenHuyen: 'Ứng Hòa', maTinh: '01', tenTinh: 'Hà Nội' },

  // Hà Giang
  { maHuyen: '021', tenHuyen: 'Thành phố Hà Giang', maTinh: '02', tenTinh: 'Hà Giang' },
  { maHuyen: '022', tenHuyen: 'Vị Xuyên', maTinh: '02', tenTinh: 'Hà Giang' },
  { maHuyen: '023', tenHuyen: 'Yên Minh', maTinh: '02', tenTinh: 'Hà Giang' },
  { maHuyen: '024', tenHuyen: 'Bắc Mê', maTinh: '02', tenTinh: 'Hà Giang' },
  { maHuyen: '025', tenHuyen: 'Đông Văn', maTinh: '02', tenTinh: 'Hà Giang' },
  { maHuyen: '026', tenHuyen: 'Mèo Vạc', maTinh: '02', tenTinh: 'Hà Giang' },

  // Hồ Chí Minh
  { maHuyen: '027', tenHuyen: 'Quận 1', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '028', tenHuyen: 'Quận 2', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '029', tenHuyen: 'Quận 3', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '030', tenHuyen: 'Quận 4', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '031', tenHuyen: 'Quận 5', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '032', tenHuyen: 'Quận 6', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '033', tenHuyen: 'Quận 7', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '034', tenHuyen: 'Quận 8', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '035', tenHuyen: 'Quận 9', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '036', tenHuyen: 'Quận 10', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '037', tenHuyen: 'Quận 11', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '038', tenHuyen: 'Quận 12', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '039', tenHuyen: 'Quận Thủ Đức', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '040', tenHuyen: 'Bình Thạnh', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '041', tenHuyen: 'Gò Vấp', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '042', tenHuyen: 'Bình Tân', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '043', tenHuyen: 'Tân Bình', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '044', tenHuyen: 'Tân Phú', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
  { maHuyen: '045', tenHuyen: 'Phú Nhuận', maTinh: '51', tenTinh: 'Hồ Chí Minh' },
];

// ============ Mock Xã / Phường ============
export const mockXaPhuong: XaPhuong[] = [
  // Ba Đình, Hà Nội
  { maXa: '00101', tenXa: 'Phường Trúc Bạch', maHuyen: '001', tenHuyen: 'Ba Đình' },
  { maXa: '00102', tenXa: 'Phường Cống Vị', maHuyen: '001', tenHuyen: 'Ba Đình' },
  { maXa: '00103', tenXa: 'Phường Liễu Giai', maHuyen: '001', tenHuyen: 'Ba Đình' },
  { maXa: '00104', tenXa: 'Phường Nguyễn Trung Trực', maHuyen: '001', tenHuyen: 'Ba Đình' },
  { maXa: '00105', tenXa: 'Phường Phúc Tân', maHuyen: '001', tenHuyen: 'Ba Đình' },

  // Hoàn Kiếm, Hà Nội
  { maXa: '00201', tenXa: 'Phường Tràng Tiền', maHuyen: '002', tenHuyen: 'Hoàn Kiếm' },
  { maXa: '00202', tenXa: 'Phường Hàng Bạc', maHuyen: '002', tenHuyen: 'Hoàn Kiếm' },
  { maXa: '00203', tenXa: 'Phường Thanh Niên', maHuyen: '002', tenHuyen: 'Hoàn Kiếm' },
  { maXa: '00204', tenXa: 'Phường Hồ Tây', maHuyen: '002', tenHuyen: 'Hoàn Kiếm' },

  // Tây Hồ, Hà Nội
  { maXa: '00301', tenXa: 'Phường Quảng An', maHuyen: '003', tenHuyen: 'Tây Hồ' },
  { maXa: '00302', tenXa: 'Phường Yên Phhu', maHuyen: '003', tenHuyen: 'Tây Hồ' },
  { maXa: '00303', tenXa: 'Phường Tức Mạc', maHuyen: '003', tenHuyen: 'Tây Hồ' },

  // Thanh Xuân, Hà Nội
  { maXa: '00401', tenXa: 'Phường Thanh Xuân Bắc', maHuyen: '004', tenHuyen: 'Thanh Xuân' },
  { maXa: '00402', tenXa: 'Phường Thanh Xuân Nam', maHuyen: '004', tenHuyen: 'Thanh Xuân' },
  { maXa: '00403', tenXa: 'Phường Thanh Xuân Trung', maHuyen: '004', tenHuyen: 'Thanh Xuân' },

  // Hà Giang
  { maXa: '02101', tenXa: 'Phường Hàng Khánh', maHuyen: '021', tenHuyen: 'Thành phố Hà Giang' },
  { maXa: '02102', tenXa: 'Phường Nguyễn Huệ', maHuyen: '021', tenHuyen: 'Thành phố Hà Giang' },
  { maXa: '02103', tenXa: 'Phường Cầu Ngang', maHuyen: '021', tenHuyen: 'Thành phố Hà Giang' },
  { maXa: '02201', tenXa: 'Thị trấn Vị Xuyên', maHuyen: '022', tenHuyen: 'Vị Xuyên' },
  { maXa: '02202', tenXa: 'Xã Thượng Sơn', maHuyen: '022', tenHuyen: 'Vị Xuyên' },

  // Hồ Chí Minh - Quận 1
  { maXa: '02701', tenXa: 'Phường Bến Nghé', maHuyen: '027', tenHuyen: 'Quận 1' },
  { maXa: '02702', tenXa: 'Phường Bến Thành', maHuyen: '027', tenHuyen: 'Quận 1' },
  { maXa: '02703', tenXa: 'Phường Đa Kao', maHuyen: '027', tenHuyen: 'Quận 1' },
  { maXa: '02704', tenXa: 'Phường Nguyễn Huệ', maHuyen: '027', tenHuyen: 'Quận 1' },

  // Hồ Chí Minh - Quận 2
  { maXa: '02801', tenXa: 'Phường An Khánh', maHuyen: '028', tenHuyen: 'Quận 2' },
  { maXa: '02802', tenXa: 'Phường An Lợi Đông', maHuyen: '028', tenHuyen: 'Quận 2' },
  { maXa: '02803', tenXa: 'Phường Thạnh Mỹ Lợi', maHuyen: '028', tenHuyen: 'Quận 2' },
  { maXa: '02804', tenXa: 'Phường Cát Lái', maHuyen: '028', tenHuyen: 'Quận 2' },
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
 * Tạo mock response cho Huyện Thị Xã
 */
export function createMockHuyenThiXaResponse(
  page: number = 1,
  pageSize: number = 10
): ApiResponse<HuyenThiXa> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = mockHuyenThiXa.slice(start, end);

  return {
    data,
    total: mockHuyenThiXa.length,
    page,
    pageSize,
  };
}

/**
 * Tìm kiếm mock Huyện Thị Xã
 */
export function searchMockHuyenThiXa(params: {
  maTinh?: string;
  tenHuyen?: string;
  page?: number;
  pageSize?: number;
}): ApiResponse<HuyenThiXa> {
  const { maTinh, tenHuyen, page = 1, pageSize = 10 } = params;
  let filtered = mockHuyenThiXa;

  if (maTinh) {
    filtered = filtered.filter((h) => h.maTinh === maTinh);
  }

  if (tenHuyen) {
    filtered = filtered.filter((h) =>
      h.tenHuyen.toLowerCase().includes(tenHuyen.toLowerCase())
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
  maHuyen?: string;
  tenXa?: string;
  page?: number;
  pageSize?: number;
}): ApiResponse<XaPhuong> {
  const { maHuyen, tenXa, page = 1, pageSize = 10 } = params;
  let filtered = mockXaPhuong;

  if (maHuyen) {
    filtered = filtered.filter((x) => x.maHuyen === maHuyen);
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

// Các hàm normalize (giữ nguyên logic gốc của bạn)
export const normalizeFromDate = (date: Date | null): Date | null => {
  if (!date) return null;
  const d = new Date(date);
  // Thiết lập giờ về 00:00:00.000 theo múi giờ địa phương
  d.setHours(0, 0, 0, 0); 
  return d;
};

export const normalizeToDate = (date: Date | null): Date | null => {
  if (!date) return null;
  const d = new Date(date);
  // Thiết lập giờ về 23:59:59.999 theo múi giờ địa phương
  d.setHours(23, 59, 59, 999);
  return d;
};

// Hàm định dạng tùy chỉnh (KHÔNG sử dụng .toISOString())
// Hàm này KHÔNG cần export nếu nó chỉ được dùng nội bộ cho các hàm bên dưới
const formatToLocalISOString = (date: Date): string => {
    // Lấy các thành phần Ngày (Local Day components)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Lấy các thành phần Giờ (Local Time components)
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    // Trả về chuỗi định dạng YYYY-MM-DDTHH:mm:ss.sss (KHÔNG có Z)
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

// ----------------------------------------------------
// HÀM WRAPPER MỚI (Dùng cho API)
// ----------------------------------------------------

/**
 * Chuẩn hóa và định dạng ngày BẮT ĐẦU của một khoảng thời gian theo múi giờ địa phương.
 * Kết quả là chuỗi YYYY-MM-DDTHH:mm:ss.sss (không phải UTC).
 */
export const formatFromDateForApi = (date: Date | null): string => {
  const normalizedDate = normalizeFromDate(date);
  if (!normalizedDate) {
    return ""; // Trả về chuỗi rỗng nếu đầu vào là null
  }
  return formatToLocalISOString(normalizedDate);
};

/**
 * Chuẩn hóa và định dạng ngày KẾT THÚC của một khoảng thời gian theo múi giờ địa phương.
 * Kết quả là chuỗi YYYY-MM-DDTHH:mm:ss.sss (không phải UTC).
 */
export const formatToDateForApi = (date: Date | null): string => {
  const normalizedDate = normalizeToDate(date);
  if (!normalizedDate) {
    return "";
  }
  return formatToLocalISOString(normalizedDate);
};
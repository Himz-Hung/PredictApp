export const normalizeFromDate = (date: Date | null): Date | null => {
  if (!date) return null;
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const normalizeToDate = (date: Date | null): Date | null => {
  if (!date) return null;
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const getTimezoneOffsetString = (date: Date): string => {
  const offsetMinutes = date.getTimezoneOffset();
  const sign = offsetMinutes > 0 ? "-" : "+";
  const absOffsetMinutes = Math.abs(offsetMinutes);

  const hours = String(Math.floor(absOffsetMinutes / 60)).padStart(2, "0");
  const minutes = String(absOffsetMinutes % 60).padStart(2, "0");

  return `${sign}${hours}:${minutes}`;
};

const formatToLocalISOString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  const offset = getTimezoneOffsetString(date);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offset}`;
};

export const formatFromDateForApi = (date: Date | null): string => {
  const normalizedDate = normalizeFromDate(date);
  if (!normalizedDate) {
    return "";
  }
  return formatToLocalISOString(normalizedDate);
};

export const formatToDateForApi = (date: Date | null): string => {
  const normalizedDate = normalizeToDate(date);
  if (!normalizedDate) {
    return "";
  }
  return formatToLocalISOString(normalizedDate);
};

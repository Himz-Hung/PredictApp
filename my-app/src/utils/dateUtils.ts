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

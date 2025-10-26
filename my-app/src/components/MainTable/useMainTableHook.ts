import { useState, useEffect } from "react";

interface UseMainTableHookProps {
  initialPageSize?: number;
  totalRecords?: number; // tổng số record lấy từ BE
}

export default function useMainTableHook({
  initialPageSize = 10,
  totalRecords = 0,
}: UseMainTableHookProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [fromDate, setFromDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 10))
  );
  const [toDate, setToDate] = useState<Date>(new Date());
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  return {
    state: { page, pageSize, totalPages, fromDate, toDate },
    handler: { setPage, setPageSize, setFromDate, setToDate },
  };
}

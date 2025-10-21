import { useEffect, useMemo, useState } from "react";
import type { MainTableData } from "../../models/mainTableModels";

function useMainTableHook(
  tableMainData?: MainTableData[],
  initialPageSize = 10
) {
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [page, setPage] = useState<number>(1);
  const total = tableMainData?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const totalProfit = useMemo(() => {
    if (!tableMainData) return 0;
    return tableMainData.reduce((acc, record) => acc + record.profit, 0);
  }, [tableMainData]);
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  const paginatedData = useMemo(() => {
    if (!tableMainData) return [] as MainTableData[];
    const start = (page - 1) * pageSize;
    return tableMainData.slice(start, start + pageSize);
  }, [tableMainData, page, pageSize]);
  const state = { pageSize, page, total, totalPages, paginatedData,totalProfit };
  const handler = { setPageSize, setPage };
  return {
    state,
    handler,
  };
}

export default useMainTableHook;

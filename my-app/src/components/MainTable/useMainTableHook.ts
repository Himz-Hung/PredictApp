import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import type { AxiosError } from "axios";
import type { ErrorProps } from "../../models/errorProps";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useContextHook";
import type { FetchRecordsParams } from "../../models/mainTableModels";
import { formatFromDateForApi, formatToDateForApi } from "../../utils/dateUtils";

interface UseMainTableHookProps {
  initialPageSize?: number;
  totalRecords?: number;
  sportType?: string;
  onSearchDate?: (paramSearch: FetchRecordsParams, pageSize: number) => void;
}

export default function useMainTableHook({
  initialPageSize = 10,
  totalRecords = 0,
  sportType,
  onSearchDate,
}: UseMainTableHookProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState<string | undefined>();
  const [deleteRecord, setDeleteRecord] = useState<{
    recordId: string;
    games: string;
    date: string;
    sportType?: string;
  } | null>(null);
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

  const deleteRecordHandler = async (id: string) => {
    try {
      axiosClient
        .delete("/predict_records/" + id)
        .then(() => {
            const paramSearchDate: FetchRecordsParams = {
              page: 1,
              sportType: sportType || "",
              dateFrom: formatFromDateForApi(fromDate) || "",
              dateTo: formatToDateForApi(toDate) || "",
            };
            if (onSearchDate) {
              onSearchDate(paramSearchDate, pageSize);
            }
          showToast({
            title: "Load failed",
            message: "Successfully deleted the Record.",
            type: "success",
          });
        })
        .catch(err => {
          const error = err as AxiosError<ErrorProps>;
          if (error.status === 401) {
            navigate("/login", {
              replace: true,
              state: { message: "EXP-JWT" },
            });
          }
          if (err === "JWT-INVALID") {
            navigate("/login", {
              replace: true,
              state: { message: "EXP-JWT" },
            });
          } else {
            showToast({
              title: "Load failed",
              message: "Unable to delete the Record.",
              type: "error",
            });
          }
        });
    } catch (err) {
      if (err === "JWT-INVALID") {
        navigate("/login", { replace: true, state: { message: "EXP-JWT" } });
      } else {
        showToast({
          title: "Load failed",
          message: "Unable to delete the Record.",
          type: "error",
        });
      }
    }
  };
  return {
    state: {
      page,
      pageSize,
      totalPages,
      fromDate,
      toDate,
      deleteId,
      deleteRecord,
    },
    handler: {
      setPage,
      setPageSize,
      setFromDate,
      setToDate,
      setDeleteId,
      setDeleteRecord,
      deleteRecordHandler,
    },
  };
}

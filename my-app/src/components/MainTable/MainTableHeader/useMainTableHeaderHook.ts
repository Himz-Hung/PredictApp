import { useState, useRef } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { fetchHistoryRecords } from "../../../store/historyRecordsSlice";
import type { FetchRecordsParams } from "../../../models/mainTableModels";
import { useToast } from "../../../hooks/useContextHook";
import { useNavigate } from "react-router-dom";
import { normalizeFromDate, normalizeToDate } from "../../../utils/dateUtils";

export default function useMainTableHeaderHook(sportType: string) {
  const [fromDate, setFromDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 10))
  );
  const [toDate, setToDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const cooldownRef = useRef(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSearchDate = async () => {
    if (cooldownRef.current || isLoading) return;
    cooldownRef.current = true;
    setTimeout(() => (cooldownRef.current = false), 2000);

    setIsLoading(true);
    const searchParams: FetchRecordsParams = {
      sportType,
      dateFrom: normalizeFromDate(fromDate)?.toISOString() || "",
      dateTo: normalizeToDate(toDate)?.toISOString() || "",
    };

    await dispatch(fetchHistoryRecords(searchParams))
      .unwrap()
      .then(() => {
        showToast({
          title: "History Record loaded",
          message: "The record was loaded successfully",
          type: "success",
        });
      })
      .catch(err => {
        if (err === "JWT-INVALID") {
          navigate("/login", { replace: true, state: { message: "EXP-JWT" } });
        } else {
          showToast({
            title: "Load failed",
            message: "Unable to load the record",
            type: "error",
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  const state = { fromDate, toDate, isLoading };
  const handler = { setFromDate, setToDate, handleSearchDate };

  return { state, handler };
}

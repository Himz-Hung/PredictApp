import { useEffect } from "react";
import type { MainTableProps } from "../../models/mainTableModels";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useContextHook";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { normalizeFromDate, normalizeToDate } from "../../utils/dateUtils";
import { fetchTodayRecords } from "../../store/todayRecordsSlice";
import { fetchHistoryRecords } from "../../store/historyRecordsSlice";

function useNBAReportPageHook() {
  const location = useLocation();
  const { showToast } = useToast();
  const mess = location.state?.message;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const historyRecords = useAppSelector(state => state.historyRecord.data);
  const todayRecordsData = useAppSelector(state => state.todayRecordSlice.data);

  useEffect(() => {
    document.title = "Phatify-NBA Report Page";
  }, []);
  useEffect(() => {
    if (mess === "UNAUTHORIZED") {
      showToast({
        title: "Unavailable Access",
        message: "You do not have permission to access the page.",
        type: "error",
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, mess, navigate, showToast]);
  useEffect(() => {
    dispatch(
      fetchTodayRecords({
        sportType: "nba-basketball",
        dateFrom: normalizeFromDate(new Date())?.toISOString() || "",
        dateTo: normalizeToDate(new Date())?.toISOString() || "",
      })
    )
      .unwrap()
      .then(() => {
        showToast({
          title: "Today record loaded",
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
      });
    dispatch(
      fetchHistoryRecords({
        sportType: "nba-basketball",
        dateFrom:
          normalizeFromDate(
            new Date(new Date().setDate(new Date().getDate() - 10))
          )?.toISOString() || "",
        dateTo: normalizeToDate(new Date())?.toISOString() || "",
      })
    )
      .unwrap()
      .then(() => {
        showToast({
          title: "History record loaded",
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
      });
  }, [dispatch, navigate, showToast]);
  const tableMainData: MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit"],
    tableName: "Today's Results",
    tableMainData: todayRecordsData || [],
    tableFooterTitle: "Total Profit:",
  };
  const tableMainDataHistory: MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit"],
    tableName: "History's Results",
    tableMainData: historyRecords || [],
    tableFooterTitle: "Total Profit:",
  };
  const todayDate = new Date().toISOString().split("T")[0];
  const state = {
    tableMainData,
    todayDate,
    tableMainDataHistory,
  };
  const handler = {};
  return { state, handler };
}
export default useNBAReportPageHook;

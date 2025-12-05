import { useCallback, useEffect, useState } from "react";
import type {
  FetchRecordsParams,
  MainTableData,
  MainTableProps,
} from "../../models/mainTableModels";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useContextHook";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTodayRecords } from "../../store/todayRecordsSlice";
import {
  formatFromDateForApi,
  formatToDateForApi,
} from "../../utils/dateUtils";
import { fetchHistoryRecords } from "../../store/historyRecordsSlice";

function useNFLReportPageHook() {
  const location = useLocation();
  const { showToast } = useToast();
  const mess = location.state?.message;
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [paginatedHistoryRecords, setPaginatedHistoryRecords] = useState<
    MainTableData[]
  >([]);
  const [allHistoryRecords, setAllHistoryRecords] = useState<MainTableData[]>(
    []
  );
  const [loadingHistoryRecords, setLoadingHistoryRecords] = useState(false);
  const [loadingTodayRecords, setLoadingTodayRecords] = useState(false);
  const [paginatedTodayRecords, setPaginatedTodayRecords] = useState<
    MainTableData[]
  >([]);
  const [allTodayRecords, setAllTodayRecords] = useState<MainTableData[]>([]);
  const [todayTotalItems, setTodayTotalItems] = useState(0);
  const historyRecords = useAppSelector(state => state.historyRecord.data);
  const todayRecordsData = useAppSelector(state => state.todayRecordSlice.data);
  const fetchData = useCallback(async () => {
    try {
      setLoadingTodayRecords(true);
      await dispatch(
        fetchTodayRecords({
          page: 1,
          sportType: "nfl-football",
          dateFrom: formatFromDateForApi(new Date()) || "",
          dateTo: formatToDateForApi(new Date()) || "",
        })
      )
        .unwrap()
        .then(data => {
          setPaginatedTodayRecords(data.mainData.slice(0, 10));
          setAllTodayRecords(data.mainData);
          setTodayTotalItems(data?.totalRecords);
          setLoadingTodayRecords(false);
        });
      setLoadingHistoryRecords(true);
      await dispatch(
        fetchHistoryRecords({
          page: 1,
          sportType: "nfl-football",
          dateFrom:
            formatFromDateForApi(
              new Date(new Date().setDate(new Date().getDate() - 10))
            ) || "",
          dateTo: formatToDateForApi(new Date()) || "",
        })
      )
        .unwrap()
        .then(data => {
          setPaginatedHistoryRecords(data.mainData);
          setAllHistoryRecords(data.mainData);
          setLoadingHistoryRecords(false);
          setTotalItems(data?.totalRecords);
        });
    } catch (err) {
      if (err === "JWT-INVALID") {
        navigate("/login", { replace: true, state: { message: "EXP-JWT" } });
      } else {
        showToast({
          title: "Load failed",
          message: "Unable to load the record.",
          type: "error",
        });
      }
    }
  }, [dispatch, navigate, showToast]);
  useEffect(() => {
    document.title = "Everwin-NFL Report Page";
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
    fetchData();
  }, [fetchData]);
  const onSearchDate = async (
    paramSearch: FetchRecordsParams,
    pageSize: number = 10
  ) => {
    onPageChange(1, pageSize, paramSearch.dateFrom, paramSearch.dateTo, true);
  };
  const onPageChangeTodayRecords = useCallback(
    async (page: number, pageSize: number) => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const cachedData = allTodayRecords.slice(startIndex, endIndex);
      if (cachedData.length === pageSize) {
        setPaginatedTodayRecords(cachedData);
        return;
      }
      if (todayTotalItems < 30) {
        setPaginatedTodayRecords(cachedData);
        return;
      }
      if (allTodayRecords.length >= todayTotalItems) {
        setPaginatedTodayRecords(cachedData);
        return;
      }
      try {
        setLoadingTodayRecords(true);
        const pageToFetch = Math.floor(allTodayRecords.length / 30) + 1;
        await dispatch(
          fetchTodayRecords({
            page: pageToFetch,
            sportType: "nfl-football",
            dateFrom: formatFromDateForApi(new Date()) || "",
            dateTo: formatToDateForApi(new Date()) || "",
          })
        )
          .unwrap()
          .then(data => {
            if (data?.mainData?.length) {
              const updatedAll = [...allTodayRecords, ...data.mainData];
              setAllTodayRecords(updatedAll);
              const newPageData = updatedAll.slice(startIndex, endIndex);
              setPaginatedTodayRecords(newPageData);
              setLoadingTodayRecords(false);
            } else {
              setPaginatedTodayRecords([]);
              setLoadingTodayRecords(false);
            }
          });
      } catch (err) {
        if (err === "JWT-INVALID") {
          navigate("/login", { replace: true, state: { message: "EXP-JWT" } });
        } else {
          showToast({
            title: "Load failed",
            message: "Unable to load the record.",
            type: "error",
          });
        }
      }
    },
    [allTodayRecords, dispatch, navigate, showToast, todayTotalItems]
  );
  const onPageChange = useCallback(
    async (
      page: number,
      pageSize: number,
      dateFr: string,
      dateTo: string,
      mustCall: boolean = false,
      isTodayPaginated: boolean = false
    ) => {
      if (isTodayPaginated) {
        onPageChangeTodayRecords(page, pageSize);
        return;
      }
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const cachedData = allHistoryRecords.slice(startIndex, endIndex);
      if (cachedData.length === pageSize && !mustCall) {
        setPaginatedHistoryRecords(cachedData);
        return;
      }
      if (totalItems < 30 && !mustCall) {
        setPaginatedHistoryRecords(cachedData);
        return;
      }
      if (allHistoryRecords.length >= totalItems && !mustCall) {
        setPaginatedHistoryRecords(cachedData);
        return;
      }

      try {
        setLoadingHistoryRecords(true);
        const pageToFetch = mustCall
          ? 1
          : Math.floor(allHistoryRecords.length / 30) + 1;
        await dispatch(
          fetchHistoryRecords({
            page: pageToFetch,
            sportType: "nfl-football",
            dateFrom: dateFr || "",
            dateTo: dateTo || "",
          })
        )
          .unwrap()
          .then(data => {
            if (data?.mainData?.length) {
              if (!mustCall) {
                const updatedAll = [...allHistoryRecords, ...data.mainData];
                setAllHistoryRecords(updatedAll);
                const newPageData = updatedAll.slice(startIndex, endIndex);
                setPaginatedHistoryRecords(newPageData);
                setLoadingHistoryRecords(false);
              } else {
                const updatedAll = [...data.mainData];
                setAllHistoryRecords(updatedAll);
                const newPageData = updatedAll.slice(startIndex, endIndex);
                setPaginatedHistoryRecords(newPageData);
                setLoadingHistoryRecords(false);
              }
              setTotalItems(data?.totalRecords);
            } else {
              setPaginatedHistoryRecords([]);
              setLoadingHistoryRecords(false);
            }
          });
      } catch (err) {
        if (err === "JWT-INVALID") {
          navigate("/login", { replace: true, state: { message: "EXP-JWT" } });
        } else {
          showToast({
            title: "Load failed",
            message: "Unable to load the record.",
            type: "error",
          });
        }
      }
    },
    [
      allHistoryRecords,
      dispatch,
      navigate,
      onPageChangeTodayRecords,
      showToast,
      totalItems,
    ]
  );
  const tableMainData: MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit"],
    tableName: "Today's Results",
    tableMainData: paginatedTodayRecords || [],
    tableFooterTitle: "Total Profit:",
    totalRecords: todayTotalItems,
    currentPage: todayRecordsData?.currentPage,
  };
  const tableMainDataHistory: MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit"],
    tableName: "History's Results",
    tableMainData: paginatedHistoryRecords || [],
    tableFooterTitle: "Total Profit:",
    totalRecords: totalItems,
    currentPage: historyRecords?.currentPage,
  };
  const todayDate = new Date().toLocaleDateString("en-CA");
  const state = {
    tableMainData,
    todayDate,
    tableMainDataHistory,
    loadingHistoryRecords,
    loadingTodayRecords,
  };
  const handler = { onPageChange, onSearchDate };
  return { state, handler };
}
export default useNFLReportPageHook;

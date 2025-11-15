import { useEffect, useState, useCallback } from "react";
import type {
  FetchRecordsParams,
  MainTableData,
  MainTableProps,
} from "../../models/mainTableModels";
import { useToast } from "../../hooks/useContextHook";
import { isAdmin } from "../../utils/jwt";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchRecords } from "../../store/adminRecordsSlice";
import {
  formatFromDateForApi,
  formatToDateForApi,
} from "../../utils/dateUtils";

function useAdminPageHook() {
  const [adminFromDate, setAdminFromDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 10))
  );
  const [adminToDate, setAdminToDate] = useState<Date>(new Date());
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [isSearchDate, setIsSearchDate] = useState(false);
  const [sportType, setSportType] = useState<string>("nba-basketball");
  const [isOpenRecord, setIsOpenRecord] = useState<{
    id: string;
    action: "add" | "edit" | "view" | "close";
  }>({ id: "", action: "add" });
  const [paginatedAdminRecords, setPaginatedAdminRecords] = useState<
    MainTableData[]
  >([]);
  const [allAdminRecords, setAllAdminRecords] = useState<MainTableData[]>([]);
  const [loadingAdminRecords, setLoadingAdminRecords] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const recordsData = useAppSelector(state => state.adminRecords.data);
  const token = localStorage.getItem("token");
  const isAdminRole = isAdmin(token ?? "");

  useEffect(() => {
    if (token && !isAdminRole) {
      navigate("/");
      showToast({
        title: "Unavailable Access",
        message: "You do not have permission to access the page.",
        type: "error",
      });
    } else if (token && isAdminRole) {
      const fetchInit = async () => {
        try {
          const searchParams: FetchRecordsParams = {
            page: 1,
            sportType: "nba-basketball",
            dateFrom:
              formatFromDateForApi(
                new Date(new Date().setDate(new Date().getDate() - 10))
              ) || "",
            dateTo: formatToDateForApi(new Date()) || "",
          };
          await dispatch(fetchRecords(searchParams))
            .unwrap()
            .then(data => {
              setPaginatedAdminRecords(data.mainData);
              setAllAdminRecords(data.mainData);
              setLoadingAdminRecords(false);
              setTotalItems(data?.totalRecords);
            });
          showToast({
            title: "Record loaded",
            message: "The record was loaded successfully",
            type: "success",
          });
        } catch (err) {
          if (err === "JWT-INVALID") {
            navigate("/login", {
              replace: true,
              state: { message: "EXP-JWT" },
            });
          } else {
            showToast({
              title: "Load failed",
              message: "Unable to load the record",
              type: "error",
            });
          }
        }
      };

      fetchInit();
    }
  }, [dispatch, isAdminRole, navigate, showToast, token]);
  useEffect(() => {
    document.title = "Phatify - Admin Page";
  }, []);

  const onChangeSportType = (data: string) => {
    setSportType(data);
    const currentSearchParams: FetchRecordsParams = {
      page: 1,
      sportType: data || "",
      dateFrom: formatFromDateForApi(adminFromDate) || "",
      dateTo: formatToDateForApi(adminToDate) || "",
    };
    onSearchDate(currentSearchParams, currentPageSize);
    return;
  };
  const onSearchDate = async (
    paramSearch: FetchRecordsParams,
    pageSize: number = 10
  ) => {
    onPageChange(
      1,
      pageSize,
      paramSearch.dateFrom,
      paramSearch.dateTo,
      true,
      false,
      paramSearch.sportType
    );
  };
  const onPageChange = useCallback(
    async (
      page: number,
      pageSize: number,
      dateFr: string,
      dateTo: string,
      mustCall: boolean = false,
      isTodayPaginated: boolean = false,
      currentSportType?: string
    ) => {
      if (isTodayPaginated) {
        return;
      }
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const cachedData = allAdminRecords.slice(startIndex, endIndex);
      if (cachedData.length === pageSize && !mustCall) {
        setPaginatedAdminRecords(cachedData);
        return;
      }
      if (totalItems < 30 && !mustCall) {
        setPaginatedAdminRecords(cachedData);
        return;
      }
      if (allAdminRecords.length >= totalItems && !mustCall) {
        setPaginatedAdminRecords(cachedData);
        return;
      }
      try {
        setLoadingAdminRecords(true);
        const pageToFetch = mustCall
          ? 1
          : Math.floor(allAdminRecords.length / 30) + 1;
        await dispatch(
          fetchRecords({
            page: pageToFetch,
            sportType: mustCall ? currentSportType || sportType : sportType,
            dateFrom: dateFr || "",
            dateTo: dateTo || "",
          })
        )
          .unwrap()
          .then(data => {
            if (data?.mainData?.length) {
              if (!mustCall) {
                const updatedAll = [...allAdminRecords, ...data.mainData];
                setAllAdminRecords(updatedAll);
                const newPageData = updatedAll.slice(startIndex, endIndex);
                setPaginatedAdminRecords(newPageData);
                setLoadingAdminRecords(false);
              } else {
                const updatedAll = [...data.mainData];
                setAllAdminRecords(updatedAll);
                const newPageData = updatedAll.slice(startIndex, endIndex);
                setPaginatedAdminRecords(newPageData);
                setLoadingAdminRecords(false);
              }
              setTotalItems(data?.totalRecords);
            } else {
              setPaginatedAdminRecords([]);
              setLoadingAdminRecords(false);
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
    [allAdminRecords, dispatch, navigate, showToast, sportType, totalItems]
  );
  const todayDate = new Date().toISOString().split("T")[0];

  const tableMainData: MainTableProps = {
    tableTitle: [
      "Sport type",
      "Date",
      "Games",
      "Pick",
      "Result",
      "Profit",
      "Actions",
    ],
    tableName: "Predict Records Results",
    tableMainData: paginatedAdminRecords || [],
    tableFooterTitle: "",
    totalRecords: totalItems,
    currentPage: recordsData?.currentPage,
  };

  const state = {
    tableMainData,
    todayDate,
    isAdminRole,
    isOpenRecord,
    sportType,
    recordsData,
    loadingAdminRecords,
    isSearchDate,
    adminFromDate,
    adminToDate,
    currentPageSize,
  };

  const handler = {
    setIsOpenRecord,
    setSportType,
    setIsSearchDate,
    onChangeSportType,
    onSearchDate,
    onPageChange,
    setAdminFromDate,
    setAdminToDate,
    setCurrentPageSize,
  };

  return { state, handler };
}

export default useAdminPageHook;

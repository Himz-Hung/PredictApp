import { useEffect, useState } from "react";
import type {
  MainTableData,
  MainTableDataRespond,
  MainTableProps,
} from "../../models/mainTableModels";
import axiosClient from "../../api/axiosClient";
import { useToast } from "../../hooks/useContextHook";
import type { GameStatusType } from "../../models/gameStatusEnum";

function useAdminPageHook() {
  const { showToast } = useToast();
  const [recordsData, setRecordsData] = useState<MainTableData[]>();
  const [sportType, setSportType] = useState<string>("nba-basketball");

  const tableMainData: MainTableProps = {
    tableTitle: [
      "Id",
      "Sport type",
      "Date",
      "Games",
      "Predict value",
      "Result",
      "Actions",
    ],
    tableName: "Today's Results",
    tableMainData: recordsData || [],
    tableFooterTitle: "",
  };
  const isAdmin = true;
  const [isOpenRecord, setIsOpenRecord] = useState<{
    id: string;
    action: "add" | "edit" | "view" | "close" ;
  }>({ id: "", action: "add" });

  const formatRecordsData = (data: MainTableDataRespond[]) => {
    return data.map((item, index) => ({
      id: `${index}`,
      date: new Date(item.date)
        .toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", ""),
      games: item.game,
      pick: "",
      sportType: item.sportType
        ? item.sportType.split("-")[0].toUpperCase()
        : "",
      result: (item.result || "").toUpperCase() as GameStatusType,
      profit: item.profit,
      predictValue: item.predictValue,
    }));
  };

  useEffect(() => {
    document.title = "Phatify-Admin Page";
  }, []);

  useEffect(() => {
    // fetch whenever sportType changes (or on mount)
    let cancelled = false;

    const fetchData = async () => {
      // reset current data so UI can show loading state if implemented
      setRecordsData(undefined);

      try {
        const response = await axiosClient.get("/predict_records", {
          params: { page: 1, sportType },
        });

        if (cancelled) return;

        const member = response?.data?.member ?? [];
        setRecordsData(formatRecordsData(member));

        showToast({
          title: "Record loaded",
          message: "The record was loaded successfully",
          type: "success",
        });
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to fetch records data:", error);
        showToast({
          title: "Load failed",
          message: "Unable to load the record",
          type: "error",
        });
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [sportType, showToast]);

  const todayDate = new Date().toISOString().split("T")[0];
  const state = {
    tableMainData,
    todayDate,
    isAdmin,
    isOpenRecord,
    sportType,
    recordsData,
  };
  const handler = { setIsOpenRecord, setSportType };
  return { state, handler };
}
export default useAdminPageHook;

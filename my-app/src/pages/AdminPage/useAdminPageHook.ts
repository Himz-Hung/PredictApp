import { useEffect, useState } from "react";
import type { MainTableProps } from "../../models/mainTableModels";
import { useToast } from "../../hooks/useContextHook";
import { isAdmin } from "../../utils/jwt";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchRecords } from "../../store/adminRecordsSlice";

function useAdminPageHook() {
  const { showToast } = useToast();
  const [sportType, setSportType] = useState<string>("nba-basketball");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const recordsData = useAppSelector(state => state.adminRecords.data);
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
    tableMainData: recordsData || [],
    tableFooterTitle: "",
  };
  const [isOpenRecord, setIsOpenRecord] = useState<{
    id: string;
    action: "add" | "edit" | "view" | "close";
  }>({ id: "", action: "add" });
  const token = localStorage.getItem("token");
  const isAdminRole = isAdmin(token ? token : "");
  useEffect(() => {
    if (token && !isAdminRole) {
      navigate("/");
      showToast({
        title: "Unavailable Access",
        message: "You do not have permission to access the page.",
        type: "error",
      });
    }
  }, [isAdminRole, navigate, showToast, token]);

  useEffect(() => {
    document.title = "Phatify-Admin Page";
  }, []);

  useEffect(() => {
    dispatch(fetchRecords(sportType))
      .unwrap()
      .then(() => {
        showToast({
          title: "Record loaded",
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
  }, [dispatch, navigate, showToast, sportType]);

  const todayDate = new Date().toISOString().split("T")[0];
  const state = {
    tableMainData,
    todayDate,
    isAdminRole,
    isOpenRecord,
    sportType,
    recordsData,
  };
  const handler = { setIsOpenRecord, setSportType };
  return { state, handler };
}
export default useAdminPageHook;

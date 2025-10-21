import { useEffect } from "react";
import { tableMainDataFake } from "../../hooks/fakeData";
import type { MainTableProps } from "../../models/mainTableModels";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useContextHook";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchRecords } from "../../store/adminRecordsSlice";

function useNFLReportPageHook() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const recordsData = useAppSelector(state => state.adminRecords.data);
  useEffect(() => {
    document.title = "Phatify-NFL Report Page";
  }, []);
  const tableMainData: MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit"],
    tableName: "Today's Results",
    tableMainData: tableMainDataFake,
    tableFooterTitle: "Total Profit:",
  };
  const tableMainDataHistory: MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit"],
    tableName: "Today's Results",
    tableMainData: recordsData || [],
    tableFooterTitle: "Total Profit:",
  };
  useEffect(() => {
    dispatch(fetchRecords("nfl-football"))
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
  }, [dispatch, navigate, showToast]);
  const todayDate = new Date().toISOString().split("T")[0];
  const state = { tableMainData, todayDate, tableMainDataHistory };
  const handler = {};
  return { state, handler };
}
export default useNFLReportPageHook;

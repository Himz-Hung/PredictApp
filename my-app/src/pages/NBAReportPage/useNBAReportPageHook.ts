import { useEffect } from "react";
import { tableMainDataFake } from "../../hooks/fakeData";
import type { MainTableProps } from "../../models/mainTableModels";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useContextHook";

function useNBAReportPageHook() {
  const location = useLocation();
  const { showToast } = useToast();
  const mess = location.state?.message;
  const navigate = useNavigate();
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
  const tableMainData: MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit"],
    tableName: "Today's Results",
    tableMainData: tableMainDataFake,
    tableFooterTitle: "Total Profit:",
  };
  const tableMainDataHistory: MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit"],
    tableName: "History's Results",
    tableMainData: tableMainDataFake,
    tableFooterTitle: "Total Profit:",
  };
  const todayDate = new Date().toISOString().split("T")[0];
  const state = { tableMainData, todayDate, tableMainDataHistory };
  const handler = {};
  return { state, handler };
}
export default useNBAReportPageHook;

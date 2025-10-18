import { useEffect } from "react";
import { tableMainDataFake } from "../../hooks/fakeData";
import type { MainTableProps } from "../../models/mainTableModels";

function useNBAReportPageHook() {
  useEffect(() => {
    document.title = "Phatify-NBA Report Page";
  }, []);
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
  const state = { tableMainData, todayDate,tableMainDataHistory };
  const handler = {};
  return { state, handler };
}
export default useNBAReportPageHook;

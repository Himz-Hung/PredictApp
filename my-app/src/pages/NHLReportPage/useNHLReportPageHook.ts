import { useEffect } from "react";
import { tableMainDataFake } from "../../hooks/fakeData";
import type { MainTableProps } from "../../models/mainTableModels";

function useNHLReportPageHook() {
    useEffect(() => {
      document.title = "Phatify-NFL Report Page";
    }, []);
  const tableMainData: MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit"],
    tableName: "Today's Results",
    tableMainData: tableMainDataFake,
    tableFooterTitle: "Total Profit:",
  };
  const todayDate = new Date().toISOString().split("T")[0];
  const state = { tableMainData, todayDate };
  const handler = {};
  return { state, handler };
}
export default useNHLReportPageHook;

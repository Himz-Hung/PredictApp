import { useEffect, useState } from "react";
import { tableMainDataFake } from "../../hooks/fakeData";
import type { MainTableProps } from "../../models/mainTableModels";

function useAdminPageHook() {
  const isAdmin = true;
  const [isOpenRecord, setIsOpenRecord] = useState("");
  useEffect(() => {
    document.title = "Phatify-Admin Page";
  }, []);
  const tableMainData: MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit", "Actions"],
    tableName: "Today's Results",
    tableMainData: tableMainDataFake,
    tableFooterTitle: "Total Profit:",
  };
  const todayDate = new Date().toISOString().split("T")[0];
  const state = { tableMainData, todayDate, isAdmin, isOpenRecord };
  const handler = { setIsOpenRecord };
  return { state, handler };
}
export default useAdminPageHook;

import type { MainTableProps } from "../../models/mainTableModels";

function useNBAReportPageHook() {
  const tableMainData : MainTableProps = {
    tableTitle: ["Date", "Games", "Pick", "Result", "Profit"],
    tableMainData: [
      {
        id: "1",
        date: "2025-09-30",
        games: "A vs B",
        pick: "A",
        result: true,
        profit: "+100",
      },
      {
        id: "2",
        date: "2025-09-29",
        games: "C vs D",
        pick: "D",
        result: false,
        profit: "-50",
      },
      {
        id: "3",
        date: "2025-09-28",
        games: "E vs F",
        pick: "F",
        result: true,
        profit: "+200",
      },
    ],
    tableFooterTitle: "Total Profit:",
  };
  const state={tableMainData};
  const handler = {};
  return { state, handler };
}
export default useNBAReportPageHook;
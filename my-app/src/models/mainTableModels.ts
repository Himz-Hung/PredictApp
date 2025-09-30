 interface MainTableHeaderProps {
  tableTitle: string[];
}
  interface MainTableFooterProps {
    tableFooterTitle: string;
  }
 interface MainTableData {
    id:string;
    date: string;
    games: string;
    pick: string;
    result: boolean;
    profit: string;
}
 interface MainTableProps {
  tableTitle: string[];
  tableMainData : MainTableData[];
  tableFooterTitle: string;
}
export type { MainTableProps, MainTableHeaderProps, MainTableData, MainTableFooterProps };
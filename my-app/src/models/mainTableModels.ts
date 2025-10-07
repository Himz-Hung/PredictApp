 interface MainTableHeaderProps {
  tableName?: string;
  tableTitle: string[];
}
  interface MainTableFooterProps {
    tableFooterTitle: string;
    page?: number;
    setPage?: (n: number) => void;
    pageSize?: number;
    setPageSize?: (n: number) => void;
    total?: number;
    totalPages?: number;
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
  tableName?: string; 
  tableTitle: string[];
  tableMainData : MainTableData[];
  tableFooterTitle: string;
}
export type { MainTableProps, MainTableHeaderProps, MainTableData, MainTableFooterProps };
 interface MainTableHeaderProps {
  tableName?: string;
  isAdmin?: boolean;
  tableTitle: string[];
}
  interface MainTableFooterProps {
    isAdmin?: boolean;
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
  isAdmin?: boolean;
  tableName?: string; 
  tableTitle: string[];
  tableMainData : MainTableData[];
  tableFooterTitle: string;
}
export type { MainTableProps, MainTableHeaderProps, MainTableData, MainTableFooterProps };
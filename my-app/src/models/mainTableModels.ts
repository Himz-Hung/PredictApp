import type { GameStatusType } from "./gameStatusEnum";

interface MainTableFooterProps {
  isAdmin?: boolean;
  tableFooterTitle: string;
  page?: number;
  setPage?: (n: number) => void;
  pageSize?: number;
  setPageSize?: (n: number) => void;
  total?: number;
  totalPages?: number;
  totalProfit?: number;
  isLoading?: boolean;
}
interface MainTableData {
  recordId?: string;
  id: string;
  date: string;
  games: string;
  pick: string;
  sportType?: string;
  result: GameStatusType;
  profit: number;
  predictValue: string;
}
interface RespondDataMainTable {
  mainData: MainTableData[];
  currentPage: number;
  totalRecords: number;
}
interface MainTableDataRespond {
  id: string;
  recordId?: string;
  date: string;
  game: string;
  pick: string;
  sportType?: string;
  result: GameStatusType;
  profit: number;
  predictValue: string;
}
interface FetchRecordsParams {
  sportType: string;
  dateFrom: string;
  dateTo: string;
  page: number;
}
interface MainTableProps {
  sportType?: string;
  isFromTo?: boolean;
  isAdmin?: boolean;
  tableName?: string;
  tableTitle: string[];
  tableMainData: MainTableData[];
  tableFooterTitle: string;
  isOpenRecord?: { id: string; action: "add" | "edit" | "view" | "close" };
  setIsOpenRecord?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      action: "add" | "edit" | "view" | "close";
    }>
  >;
  setCurrentPageSize?: React.Dispatch<React.SetStateAction<number>>;
  isSearchDate?: boolean;
  setIsSearchDate?: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage?: number;
  totalRecords?: number;
  onPageChange?: (
    page: number,
    pageSize: number,
    dateFr: string,
    dateTo: string,
    mustCall?: boolean,
    isTodayPaginated?: boolean
  ) => void;
  onSearchDate?: (paramSearch: FetchRecordsParams, pageSize: number) => void;
  isLoading?: boolean;
  isTodayRecord?: boolean;
  adminFromDate?: Date;
  adminToDate?: Date;
  setAdminFromDate?: React.Dispatch<React.SetStateAction<Date>>;
  setAdminToDate?: React.Dispatch<React.SetStateAction<Date>>;
}
interface GameRecordData {
  id?: string;
  sportType: string;
  recordId?: string;
  dateTime: string;
  game: string;
  predictValue: string;
  result: GameStatusType;
  profit: number;
}
interface MainTableHeaderProps {
  tableName?: string;
  isAdmin?: boolean;
  tableTitle: string[];
  isFromTo?: boolean;
  sportType?: string;
  fromDate?: Date;
  toDate?: Date;
  setFromDate?: React.Dispatch<React.SetStateAction<Date>>;
  setToDate?: React.Dispatch<React.SetStateAction<Date>>;
  onSearchDate?: (paramSearch: FetchRecordsParams, pageSize: number) => void;
  isLoading?: boolean;
  currentPageSize?: number;
  adminFromDate?: Date;
  adminToDate?: Date;
  setAdminFromDate?: React.Dispatch<React.SetStateAction<Date>>;
  setAdminToDate?: React.Dispatch<React.SetStateAction<Date>>;
}
interface CreateGameRecordData {
  date: string;
  game: string;
  predictValue: string;
  profit: number;
  result: string;
  sportType: string;
}
interface UpdateRecordModal {
  profit: number;
  result: string;
  id: string;
}
export type {
  MainTableProps,
  MainTableHeaderProps,
  MainTableData,
  MainTableFooterProps,
  GameRecordData,
  MainTableDataRespond,
  CreateGameRecordData,
  UpdateRecordModal,
  FetchRecordsParams,
  RespondDataMainTable,
};

import type { GameStatusType } from "./gameStatusEnum";

interface MainTableHeaderProps {
  tableName?: string;
  isAdmin?: boolean;
  tableTitle: string[];
  isFromTo?: boolean;
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
  totalProfit?: number;
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
interface MainTableProps {
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
interface CreateGameRecordData {
  date: string;
  game: string;
  predictValue: string;
  profit: number;
  result: string;
  sportType: string;
}
interface updateRecordModal {
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
  updateRecordModal,
};

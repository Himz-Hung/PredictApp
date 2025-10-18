import type { GameStatusType } from "./gameStatusEnum";

interface MainTableHeaderProps {
  tableName?: string;
  isAdmin?: boolean;
  tableTitle: string[];
  isFromTo?:boolean;
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
  date: string;
  game: string;
  pick: string;
  sportType?: string;
  result: GameStatusType;
  profit: number;
  predictValue: string;
}
interface MainTableProps {
  isFromTo?:boolean;
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
  dateTime: string;
  game: string;
  predictValue: string;
  result: GameStatusType;
  profit: number;
}
export type {
  MainTableProps,
  MainTableHeaderProps,
  MainTableData,
  MainTableFooterProps,
  GameRecordData,
  MainTableDataRespond,
};

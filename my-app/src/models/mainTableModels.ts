import type { GameStatusType } from "./gameStatusEnum";

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
  id: string;
  date: string;
  games: string;
  pick: string;
  result: GameStatusType;
  profit: number;
}
interface MainTableProps {
  isAdmin?: boolean;
  tableName?: string;
  tableTitle: string[];
  tableMainData: MainTableData[];
  tableFooterTitle: string;
  isOpenRecord?: string,
  setIsOpenRecord?: (value: string) => void
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
  GameRecordData
};

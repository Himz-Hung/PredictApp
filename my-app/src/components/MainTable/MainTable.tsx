import React from "react";
import MainTableFooter from "./MainTableFooter/MainTableFooter";
import MainTableHeader from "./MainTableHeader/MainTableHeader";
import type { MainTableProps } from "../../models/mainTableModels";
import useMainTableHook from "./useMainTableHook";
import "./MainTable.scss";
import { GameStatus } from "../../models/gameStatusEnum";
import {
  formatFromDateForApi,
  formatToDateForApi,
} from "../../utils/dateUtils";

export default function MainTable({
  tableTitle,
  tableMainData = [],
  tableFooterTitle,
  tableName,
  isAdmin = false,
  isFromTo = false,
  sportType,
  setIsOpenRecord = () => {},
  totalRecords = 0,
  onPageChange = () => {},
  isLoading = false,
  onSearchDate = () => {},
  isTodayRecord = false,
  adminFromDate,
  adminToDate,
  setAdminFromDate = () => {},
  setAdminToDate = () => {},
  setCurrentPageSize = () => {},
}: MainTableProps): React.JSX.Element {
  const { state, handler } = useMainTableHook({
    totalRecords,
    initialPageSize: 10,
  });
  const { page, pageSize, totalPages } = state;
  const { setPage, setPageSize } = handler;
  const totalProfit = tableMainData.reduce(
    (acc, record) => acc + record.profit,
    0
  );

  return (
    <div className="mainTable w-full max-w-full flex justify-center items-center h-full">
      <div className="inline-block w-full h-full align-middle">
        <div className="max-h-[400px] md:max-h-[60vh] max-w-[90vw] border m-auto border-gray-700 overflow-x-auto overflow-y-auto rounded-lg table-container">
          <table className="w-full divide-y divide-gray-700 min-h-[400px]">
            <MainTableHeader
              isAdmin={isAdmin}
              tableName={tableName}
              tableTitle={tableTitle}
              isFromTo={isFromTo}
              sportType={sportType}
              onSearchDate={onSearchDate}
              setFromDate={handler.setFromDate}
              setToDate={handler.setToDate}
              fromDate={state?.fromDate}
              toDate={state?.toDate}
              isLoading={isLoading}
              currentPageSize={state.pageSize}
              setAdminFromDate={setAdminFromDate}
              setAdminToDate={setAdminToDate}
              adminFromDate={adminFromDate}
              adminToDate={adminToDate}
            />

            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={isAdmin ? 8 : 5}
                    className="px-3 sm:px-6 py-10 text-center text-sm font-medium text-gray-400"
                  >
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-5 h-5 border-2 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : tableMainData.length === 0 ? (
                <tr>
                  <td
                    colSpan={isAdmin ? 8 : 5}
                    className="px-3 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-white"
                  >
                    No Record Found
                  </td>
                </tr>
              ) : (
                tableMainData.map((p, index) => (
                  <tr
                    key={p.recordId}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    {isAdmin && (
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                        {p.sportType}
                      </td>
                    )}
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                      {p.date}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                      {p.games}
                    </td>
                    {!isAdmin && (
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                        {p.pick}
                      </td>
                    )}
                    {isAdmin && (
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                        {p.predictValue}
                      </td>
                    )}
                    <td
                      className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                        p.result === GameStatus.WIN
                          ? "text-green-400"
                          : p.result === GameStatus.LOSE
                          ? "text-red-400"
                          : p.result === GameStatus.DRAW
                          ? "text-yellow-400"
                          : p.result === GameStatus.PENDING
                          ? "text-gray-400"
                          : "text-white"
                      }`}
                    >
                      {p.result}
                    </td>
                    <td
                      className={`${
                        Number(p.profit) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      } px-3 sm:px-6 py-4 whitespace-nowrap text-sm`}
                    >
                      {p.profit}
                    </td>
                    {isAdmin && (
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm gap-2">
                        <div className="flex justify-start">
                          <button
                            className="rounded-lg border border-gray-600 text-blue-500 px-3 py-1 font-medium
                  transition-all duration-300 hover:border-blue-500 hover:bg-blue-600/20 hover:scale-105 active:scale-95 mr-4"
                            onClick={() =>
                              setIsOpenRecord({
                                id: `${index}`,
                                action: "view",
                              })
                            }
                          >
                            View
                          </button>

                          <button
                            className="rounded-lg border border-gray-600 text-yellow-500 px-3 py-1 font-medium
                  transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-600/20 hover:scale-105 active:scale-95"
                            onClick={() =>
                              setIsOpenRecord({
                                id: `${index}`,
                                action: "edit",
                              })
                            }
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>

            <MainTableFooter
              isLoading={isLoading}
              totalProfit={totalProfit}
              isAdmin={isAdmin}
              tableFooterTitle={tableFooterTitle}
              page={page}
              setPage={p => {
                setPage(p);
                if (isTodayRecord) {
                  onPageChange(
                    p,
                    pageSize,
                    formatFromDateForApi(state?.fromDate) || "",
                    formatToDateForApi(state?.toDate) || "",
                    false,
                    true
                  );
                  return;
                }
                onPageChange(
                  p,
                  pageSize,
                  formatFromDateForApi(state?.fromDate) || "",
                  formatToDateForApi(state?.toDate) || ""
                );
              }}
              pageSize={pageSize}
              setPageSize={n => {
                if (setCurrentPageSize) {
                  setCurrentPageSize(n);
                }
                setPageSize(n);
                setPage(1);
                if (isTodayRecord) {
                  onPageChange(
                    1,
                    n,
                    formatFromDateForApi(state?.fromDate) || "",
                    formatToDateForApi(state?.toDate) || "",
                    false,
                    true
                  );
                  return;
                }
                onPageChange(
                  1,
                  n,
                  formatFromDateForApi(state?.fromDate) || "",
                  formatToDateForApi(state?.toDate) || ""
                );
              }}
              totalPages={totalPages}
            />
          </table>
        </div>
      </div>
    </div>
  );
}

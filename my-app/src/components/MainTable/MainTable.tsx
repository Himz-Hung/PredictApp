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
        <div className="max-h-[400px] md:max-h-[60vh] max-w-[90vw] border m-auto border-orange-300 overflow-x-auto overflow-y-auto rounded-lg table-container bg-orange-50/20">
          <table className="w-full divide-y divide-orange-200 min-h-[400px]">
            {/* HEADER */}
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

            {/* BODY */}
            <tbody className="bg-white/90 divide-y divide-orange-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={isAdmin ? 8 : 5}
                    className="px-3 sm:px-6 py-10 text-center text-sm font-medium text-orange-600"
                  >
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-5 h-5 border-2 border-t-transparent border-orange-400 rounded-full animate-spin"></div>
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : tableMainData.length === 0 ? (
                <tr>
                  <td
                    colSpan={isAdmin ? 8 : 5}
                    className="px-3 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-orange-600"
                  >
                    No Record Found
                  </td>
                </tr>
              ) : (
                tableMainData.map((p, index) => (
                  <tr
                    key={p.recordId}
                    className="hover:bg-orange-100 transition-colors hover:cursor-pointer"
                  >
                    {isAdmin && (
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-black">
                        {p.sportType}
                      </td>
                    )}
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-black">
                      {p.date}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-black">
                      {p.games}
                    </td>
                    {!isAdmin && (
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-black">
                        {p.pick}
                      </td>
                    )}
                    {isAdmin && (
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-black">
                        {p.predictValue}
                      </td>
                    )}
                    <td
                      className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                        p.result === GameStatus.WIN
                          ? "result-win"
                          : p.result === GameStatus.LOSE
                          ? "result-lose"
                          : p.result === GameStatus.DRAW
                          ? "result-draw"
                          : p.result === GameStatus.PENDING
                          ? "result-pending"
                          : "text-black"
                      }`}
                    >
                      {p.result}
                    </td>
                    <td
                      className={`${
                        Number(p.profit) >= 0
                          ? "profit-positive"
                          : "profit-negative"
                      } px-3 sm:px-6 py-4 whitespace-nowrap text-sm`}
                    >
                      {p.profit}
                    </td>
                    {isAdmin && (
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm gap-2">
                        <div className="flex justify-start">
                          <button
                            className="rounded-lg border border-orange-400 text-blue-500 px-3 py-1 font-medium
                              transition-all duration-300 hover:border-blue-500 hover:bg-blue-200/20 hover:scale-105 active:scale-95 mr-4"
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
                            className="rounded-lg border border-orange-400 text-yellow-500 px-3 py-1 font-medium
                              transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-200/20 hover:scale-105 active:scale-95"
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

            {/* FOOTER */}
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

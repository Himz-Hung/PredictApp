import React from "react";
import MainTableFooter from "./MainTableFooter/MainTableFooter";
import MainTableHeader from "./MainTableHeader/MainTableHeader";
import type { MainTableProps } from "../../models/mainTableModels";
import useMainTableHook from "./useMainTableHook";
import "./MainTable.scss";
import { GameStatus } from "../../models/gameStatusEnum";

export default function MainTable({
  tableTitle,
  tableMainData,
  tableFooterTitle,
  tableName,
  isAdmin = false,
  setIsOpenRecord = () => {},
}: MainTableProps): React.JSX.Element {
  const { state, handler } = useMainTableHook(tableMainData, 10);
  const { pageSize, page, total, totalPages, paginatedData } = state;
  const { setPageSize, setPage } = handler;

  return (
    <div className="mainTable w-full max-w-full flex justify-center items-center h-full">
      <div className="inline-block w-full h-full align-middle">
        <div className="max-h-[400px] md:max-h-[60vh] max-w-[90vw] border m-auto border-gray-700 overflow-x-auto overflow-y-auto rounded-lg table-container">
          <table className="w-full divide-y divide-gray-700">
            <MainTableHeader
              isAdmin={isAdmin}
              tableName={tableName}
              tableTitle={tableTitle}
            />
            <tbody className="bg-gray-800 dark:bg-gray-800 divide-y divide-gray-70 divide-gray-700">
              {paginatedData.length === 0 && (
                <tr
                  key={"no-data"}
                  className=" hover:bg-gray-700 transition-colors"
                >
                  {isAdmin && (
                    <td
                      colSpan={isAdmin ? 8 : 5}
                      className="px-3 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-white"
                    >
                      No Record Found
                    </td>
                  )}
                </tr>
              )}
              {paginatedData?.map(p => (
                <tr
                  key={p?.id}
                  className=" hover:bg-gray-700 transition-colors"
                >
                  {/* {isAdmin && (
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {p.id}
                    </td>
                  )} */}
                  {isAdmin && (
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {p.sportType}
                    </td>
                  )}
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {p.date}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                    {p.games}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                    {p.pick}
                  </td>
                  {isAdmin && (
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                      {p.predictValue}
                    </td>
                  )}
                  <td
                    className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold
    ${
      p.result === GameStatus.WIN
        ? "text-green-400"
        : p.result === GameStatus.LOSE
        ? "text-red-400"
        : p.result === GameStatus.DRAW
        ? "text-yellow-400"
        : p.result === GameStatus.PENDING
        ? "text-gray-400"
        : p.result === GameStatus.CANCEL
        ? "text-orange-400"
        : "text-white"
    }`}
                  >
                    {p.result === GameStatus.WIN
                      ? "Win"
                      : p.result === GameStatus.LOSE
                      ? "Lose"
                      : p.result === GameStatus.DRAW
                      ? "Draw"
                      : p.result === GameStatus.PENDING
                      ? "Pending"
                      : p.result === GameStatus.CANCEL
                      ? "Cancel"
                      : "Unknown"}
                  </td>
                  <td
                    className={`${
                      Number(p.profit) >= 0 ? "text-green-600" : "text-red-600"
                    } px-3 sm:px-6 py-4 whitespace-nowrap text-sm`}
                  >
                    {p.profit}
                  </td>
                  {isAdmin && (
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                      <button
                        // onClick={() => handleView(p)}
                        className="rounded-lg border border-gray-600 text-blue-500 px-3 py-1 font-medium
                transition-all duration-300 hover:border-blue-500 hover:bg-blue-600/20 hover:scale-105 hover:cursor-pointer
                 active:scale-95"
                        onClick={() =>
                          setIsOpenRecord({ id: p.id, action: "view" })
                        }
                      >
                        View
                      </button>

                      <button
                        // onClick={() => handleEdit(p)}
                        className="rounded-lg border border-gray-600 text-yellow-500 px-3 py-1 font-medium
                transition-all duration-300 hover:bg-yellow-600/20 hover:border-yellow-500 hover:scale-105 hover:cursor-pointer
                 active:scale-95"
                        onClick={() =>
                          setIsOpenRecord({ id: p.id, action: "edit" })
                        }
                      >
                        Edit
                      </button>

                      <button
                        // onClick={() => handleDelete(p.id)}
                        className="rounded-lg border border-gray-600 text-red-500 px-3 py-1 font-medium
                transition-all duration-300 hover:bg-red-600/20 hover:border-red-500 hover:scale-105 hover:cursor-pointer
                 active:scale-95"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            {/* <ViewRecord isOpen={isOpenRecord}/> */}
            <MainTableFooter
              isAdmin={isAdmin}
              tableFooterTitle={tableFooterTitle}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={n => {
                setPageSize(n);
                setPage(1);
              }}
              total={total}
              totalPages={totalPages}
            />
          </table>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import MainTableFooter from "./MainTableFooter/MainTableFooter";
import MainTableHeader from "./MainTableHeader/MainTableHeader";
import type { MainTableProps } from "../../models/mainTableModels";
import useMainTableHook from "./useMainTableHook";
import "./MainTable.scss";

export default function MainTable({
  tableTitle,
  tableMainData,
  tableFooterTitle,
  tableName,
}: MainTableProps): React.JSX.Element {
  const { state, handler } = useMainTableHook(tableMainData, 10);
  const { pageSize, page, total, totalPages, paginatedData } = state;
  const { setPageSize, setPage } = handler;

  return (
    <div className="mainTable w-full max-w-full flex justify-center items-center h-full">
      <div className="inline-block w-full h-full align-middle">
        <div className="max-h-[400px] md:max-h-[60vh] max-w-[90vw] border m-auto border-gray-200 dark:border-gray-700 overflow-x-auto overflow-y-auto overscroll-none rounded-lg table-container">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <MainTableHeader tableName={tableName} tableTitle={tableTitle} />
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData?.map(p => (
                <tr
                  key={p?.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-white dark:text-white">
                    {p.date}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                    {p.games}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                    {p.pick}
                  </td>
                  <td
                    className={`${
                      p.result ? "text-green-600" : "text-red-600"
                    } px-3 sm:px-6 py-4 whitespace-nowrap text-sm`}
                  >
                    {p.result ? "Win" : "Lose"}
                  </td>
                  <td
                    className={`${
                      Number(p.profit) >= 0 ? "text-green-600" : "text-red-600"
                    } px-3 sm:px-6 py-4 whitespace-nowrap text-sm`}
                  >
                    {p.profit}
                  </td>
                </tr>
              ))}
            </tbody>
            <MainTableFooter
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

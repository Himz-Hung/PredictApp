import React from "react";
import type { MainTableFooterProps } from "../../../models/mainTableModels";
import "./MainTableFooter.scss";
export default function MainTableFooter({
  tableFooterTitle,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalPages,
  isAdmin = false,
  totalProfit = 0,
  isLoading = false,
}: MainTableFooterProps): React.JSX.Element {
  return (
    <tfoot className="mainTableFooter">
      <tr className="font-semibold sticky bottom-0 bg-orange-50/80 backdrop-blur-sm border-t border-orange-200">
        <td colSpan={2} className="px-6 py-3 w-full text-base text-left">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-base text-orange-700">
              {tableFooterTitle}
            </span>
            {!isAdmin && (
              <span
                className={`text-base ${
                  totalProfit >= 0
                    ? "text-green-600"
                    : totalProfit < 0
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {totalProfit >= 0 ? `+${totalProfit}` : totalProfit ?? 0}
              </span>
            )}
          </div>
        </td>

        <td colSpan={isAdmin ? 7 : 4} className="px-6 py-3">
          <div className="flex flex-col gap-2 pagination">
            {setPage && setPageSize ? (
              <div className="mt-2 flex items-center gap-3 justify-end">
                {/* Dropdown chọn số dòng */}
                <label
                  htmlFor="rows-per-page-select"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-base">Rows:</span>
                  <select
                    id="rows-per-page-select"
                    value={pageSize}
                    disabled={isLoading}
                    onTouchStart={e => e.currentTarget.focus()}
                    onChange={e => setPageSize(Number(e.target.value))}
                    className={`border text-base rounded-lg block w-24 p-1
                      bg-white border-orange-300 placeholder-gray-400 
                      text-black focus:ring-orange-400 focus:border-orange-400 custom-select-wrapper
                      ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                  </select>
                </label>

                {/* Điều khiển phân trang */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, (page ?? 1) - 1))}
                    disabled={isLoading || (page ?? 1) <= 1}
                    className={`px-3 py-1 rounded-md border border-orange-300 bg-white text-sm text-orange-700 transition-all
                      hover:bg-orange-100 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Prev
                  </button>

                  <div className="text-sm text-orange-700 flex items-center gap-2">
                    {isLoading ? (
                      <span className="animate-pulse text-orange-700">
                        Loading...
                      </span>
                    ) : (
                      <>
                        {page} / {totalPages}
                      </>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setPage(Math.min(totalPages ?? 1, (page ?? 1) + 1))
                    }
                    disabled={isLoading || (page ?? 1) >= (totalPages ?? 1)}
                    className={`px-3 py-1 rounded-md border border-orange-300 bg-white text-sm text-orange-700 transition-all
                      hover:bg-orange-100 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

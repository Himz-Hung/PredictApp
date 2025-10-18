import React from "react";
import type { MainTableFooterProps } from "../../../models/mainTableModels";

export default function MainTableFooter({
  tableFooterTitle,
  page,
  setPage,
  pageSize,
  setPageSize,
  total,
  totalPages,
  isAdmin = false,
}: MainTableFooterProps): React.JSX.Element {
  return (
    <tfoot>
      <tr className="font-semibold text-white sticky bottom-0 bg-gray-700">
        <td className="px-6 py-3 w-full text-base text-left">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-base">{tableFooterTitle}</span>
            {!isAdmin && (
              <span className="text-sm text-gray-200">
                {total ?? 0}
              </span>
            )}
          </div>
        </td>
        {/* {!isAdmin && (
          <td className="px-6 py-3 text-base text-left">
            <div className="text-sm">{total ? `${total}` : "0"}</div>
          </td>
        )} */}
        <td colSpan={isAdmin ? 7 : 4} className="px-6 py-3 ">
          <div className="flex flex-col gap-2">
            {/* Pagination controls under the total */}
            {setPage && setPageSize ? (
              <div className="mt-2 flex items-center gap-3 justify-end">
                <label
                  htmlFor="rows-per-page-select"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-base text-gray-200">Rows:</span>
                  <select
                    id="rows-per-page-select"
                    value={pageSize}
                    onTouchStart={e => e.currentTarget.focus()}
                    onChange={e => setPageSize(Number(e.target.value))}
                    className=" border text-base rounded-lg block w-24 p-1
               bg-gray-700 border-gray-600 placeholder-gray-400 
               text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </select>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, (page ?? 1) - 1))}
                    disabled={(page ?? 1) <= 1}
                    className="px-3 py-1 rounded-md border bg-gray-800 text-sm disabled:opacity-50 text-gray-200"
                  >
                    Prev
                  </button>
                  <div className="text-sm text-gray-200">
                    {page} / {totalPages}
                  </div>
                  <button
                    onClick={() =>
                      setPage(Math.min(totalPages ?? 1, (page ?? 1) + 1))
                    }
                    disabled={(page ?? 1) >= (totalPages ?? 1)}
                    className="px-3 py-1 rounded-md border bg-gray-800 text-sm disabled:opacity-50 text-gray-200"
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

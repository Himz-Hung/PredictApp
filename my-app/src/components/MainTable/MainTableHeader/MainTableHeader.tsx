import type {
  FetchRecordsParams,
  MainTableHeaderProps,
} from "../../../models/mainTableModels";
import { normalizeFromDate, normalizeToDate } from "../../../utils/dateUtils";
import DatePickerCustom from "../../CustomComponent/DatePickerCustom/DatePickerCustom";

export default function MainTableHeader(
  mainTableHeaderProps: MainTableHeaderProps
): React.JSX.Element {
  const handleSearch = () => {
    if (
      mainTableHeaderProps.onSearchDate &&
      mainTableHeaderProps?.fromDate &&
      mainTableHeaderProps?.toDate &&
      mainTableHeaderProps?.currentPageSize
    ) {
      const paramSearchDate: FetchRecordsParams = {
        page: 1,
        sportType: mainTableHeaderProps?.sportType || "",
        dateFrom:
          normalizeFromDate(mainTableHeaderProps?.fromDate)?.toISOString() ||
          "",
        dateTo:
          normalizeToDate(mainTableHeaderProps?.toDate)?.toISOString() || "",
      };
      mainTableHeaderProps.onSearchDate(
        paramSearchDate,
        mainTableHeaderProps?.currentPageSize
      );
    }
  };

  return (
    <thead className="sticky top-0 bg-slate-800/80 backdrop-blur-md border-b border-slate-600">
      {mainTableHeaderProps.tableName && (
        <tr>
          <th
            colSpan={mainTableHeaderProps?.isAdmin ? 8 : 5}
            className="px-3 sm:px-6 py-3 text-left text-sm font-bold text-indigo-300 uppercase tracking-wider"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="truncate">{mainTableHeaderProps.tableName}</span>
              {mainTableHeaderProps?.isFromTo && (
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="flex items-end gap-2">
                    <DatePickerCustom
                      label="From Date"
                      value={mainTableHeaderProps.fromDate}
                      onChange={data => {
                        if (mainTableHeaderProps?.setFromDate) {
                          mainTableHeaderProps?.setFromDate(data);
                          if (
                            mainTableHeaderProps?.isAdmin &&
                            mainTableHeaderProps?.setAdminFromDate
                          ) {
                            mainTableHeaderProps?.setAdminFromDate(data);
                          }
                        }
                      }}
                      maxDate={mainTableHeaderProps.toDate}
                      placeholder="Select date"
                    />

                    <DatePickerCustom
                      label="To Date"
                      value={mainTableHeaderProps.toDate}
                      onChange={data => {
                        if (mainTableHeaderProps.setToDate) {
                          mainTableHeaderProps.setToDate(data);
                          if (
                            mainTableHeaderProps?.isAdmin &&
                            mainTableHeaderProps?.setAdminToDate
                          ) {
                            mainTableHeaderProps?.setAdminToDate(data);
                          }
                        }
                      }}
                      isDateTo
                      minDate={mainTableHeaderProps.fromDate}
                      placeholder="Select date"
                    />

                    <button
                      type="button"
                      onClick={handleSearch}
                      disabled={mainTableHeaderProps.isLoading}
                      className={`flex items-center gap-2 text-green-400 border border-green-400 
                        bg-transparent font-medium rounded-xl text-sm px-3 py-1.5 
                        shadow-none transition-all duration-300 ease-out
                        ${
                          mainTableHeaderProps.isLoading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:text-white hover:bg-green-400/20 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                    >
                      {mainTableHeaderProps.isLoading ? (
                        <svg
                          className="w-5 h-5 animate-spin text-green-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.75 6.75a7.5 7.5 0 0 0 9.9 9.9Z"
                            />
                          </svg>
                          <span>Search</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </th>
        </tr>
      )}
      <tr>
        {mainTableHeaderProps.tableTitle.map((title, index) => (
          <th
            key={index}
            className={
              title === "Result"
                ? `px-3 sm:px-6 py-3 min-w-[50px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
                : title === "Profit"
                ? `px-3 sm:px-6 py-3 min-w-[100px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
                : title === "Pick"
                ? `px-3 sm:px-6 py-3 min-w-[200px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
                : title === "Date"
                ? mainTableHeaderProps?.isAdmin
                  ? `px-3 sm:px-6 py-3 min-w-[250px]  overflow-hidden whitespace-nowrap text-ellipsis text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
                  : `px-3 sm:px-6 py-3 min-w-[180px] max-w-[200px]  overflow-hidden whitespace-nowrap text-ellipsis text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
                : title === "Games"
                ? mainTableHeaderProps?.isAdmin
                  ? `px-3 sm:px-6 py-3 min-w-[400px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
                  : `px-3 sm:px-6 py-3 min-w-[300px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
                : title === "Actions"
                ? `px-3 sm:px-6 py-3 min-w-[300px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
                : mainTableHeaderProps?.isAdmin
                ? title === "Sport type"
                  ? `px-3 sm:px-6 py-3 min-w-[150px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
                  : `px-3 sm:px-6 py-3 min-w-[200px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
                : `px-3 sm:px-6 py-3 min-w-[150px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
            }
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

import type {
  FetchRecordsParams,
  MainTableHeaderProps,
} from "../../../models/mainTableModels";
import {
  formatFromDateForApi,
  formatToDateForApi,
} from "../../../utils/dateUtils";
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
        dateFrom: formatFromDateForApi(mainTableHeaderProps?.fromDate) || "",
        dateTo: formatToDateForApi(mainTableHeaderProps?.toDate) || "",
      };
      mainTableHeaderProps.onSearchDate(
        paramSearchDate,
        mainTableHeaderProps?.currentPageSize
      );
    }
  };

  return (
    <thead className="sticky top-0 border-b border-orange-300">
      {mainTableHeaderProps.tableName && (
        <tr
          className="bg-orange-50/80 backdrop-blur-sm"
        >
          <th
            colSpan={mainTableHeaderProps?.isAdmin ? 8 : 5}
            className="px-3 sm:px-6 py-3 text-left text-sm font-bold text-orange-600 uppercase tracking-wider"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="truncate">{mainTableHeaderProps.tableName}</span>
              {mainTableHeaderProps?.isFromTo && (
                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <div className="flex items-end gap-2">
                    <DatePickerCustom
                      label="From Date"
                      value={mainTableHeaderProps.fromDate}
                      onChange={data => {
                        mainTableHeaderProps?.setFromDate?.(data);
                        if (mainTableHeaderProps?.isAdmin) {
                          mainTableHeaderProps?.setAdminFromDate?.(data);
                        }
                      }}
                      maxDate={mainTableHeaderProps.toDate}
                      placeholder="Select date"
                    />

                    <DatePickerCustom
                      label="To Date"
                      value={mainTableHeaderProps.toDate}
                      onChange={data => {
                        mainTableHeaderProps.setToDate?.(data);
                        if (mainTableHeaderProps?.isAdmin) {
                          mainTableHeaderProps?.setAdminToDate?.(data);
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
                      className={`flex items-center gap-2 text-orange-600 border border-orange-300
                        bg-transparent font-medium rounded-xl text-sm px-3 py-1.5
                        shadow-sm transition-all duration-300 ease-out
                        ${
                          mainTableHeaderProps.isLoading
                            ? "opacity-50 cursor-not-allowed"
                            : " hover:bg-orange-300/20 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                    >
                      {mainTableHeaderProps.isLoading ? (
                        <svg
                          className="w-5 h-5 animate-spin text-orange-600"
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

      <tr className="bg-orange-100/50">
        {mainTableHeaderProps.tableTitle.map((title, index) => (
          <th
            key={index}
            className={`px-3 sm:px-6 py-3 text-left text-xs font-medium bg-orange-50 text-black uppercase tracking-wide border-b border-orange-200
            ${
              title === "Result" ? "min-w-[50px]" :
              title === "Profit" ? "min-w-[100px]" :
              title === "Pick" ? "min-w-[200px]" :
              title === "Date" ? (mainTableHeaderProps?.isAdmin ? "min-w-[250px]" : "min-w-[180px] max-w-[200px]") :
              title === "Games" ? (mainTableHeaderProps?.isAdmin ? "min-w-[400px]" : "min-w-[300px]") :
              title === "Actions" ? "min-w-[300px]" :
              mainTableHeaderProps?.isAdmin && title === "Sport type" ? "min-w-[150px]" : "min-w-[150px]"
            }`}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

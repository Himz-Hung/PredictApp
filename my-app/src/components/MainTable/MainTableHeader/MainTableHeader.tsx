import type { MainTableHeaderProps } from "../../../models/mainTableModels";
import DatePickerCustom from "../../CustomComponent/DatePickerCustom/DatePickerCustom";
import useMainTableHeaderHook from "./useMainTableHeaderHook";

export default function MainTableHeader(
  mainTableHeaderProps: MainTableHeaderProps
): React.JSX.Element {
  const { state, handler } = useMainTableHeaderHook(
    mainTableHeaderProps.sportType || ""
  );
  return (
    <thead className="sticky top-0 bg-slate-800/80 backdrop-blur-md border-b border-slate-600">
      {mainTableHeaderProps.tableName && (
        <tr>
          <th
            key={"main-header"}
            colSpan={mainTableHeaderProps?.isAdmin ? 8 : 5}
            className="px-3 sm:px-6 py-3 text-left text-sm font-bold text-indigo-300 uppercase tracking-wider"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="truncate">{mainTableHeaderProps.tableName}</span>
              {mainTableHeaderProps?.isFromTo && (
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="hidden sm:flex items-end gap-2">
                    <div className="flex flex-col space-y-1">
                      <DatePickerCustom
                        label="From Date"
                        value={state.fromDate}
                        onChange={d => {
                          handler.setFromDate(d);
                        }}
                        maxDate={state.toDate}
                        placeholder="Select date"
                      />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <DatePickerCustom
                        label="To Date"
                        value={state.toDate}
                        onChange={d => handler.setToDate(d)}
                        isDateTo={true}
                        minDate={state.fromDate}
                        placeholder="Select date"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handler.handleSearchDate}
                      disabled={state.isLoading}
                      className={`flex items-center gap-2 text-green-400 border border-green-400 
    bg-transparent font-medium rounded-xl text-sm px-3 py-1.5 
    shadow-none transition-all duration-300 ease-out
    ${
      state.isLoading
        ? "opacity-50 cursor-not-allowed"
        : "hover:text-white hover:bg-green-400/20 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98] hover:cursor-pointer"
    }
  `}
                    >
                      {state.isLoading ? (
                        // 🌀 Loading spinner
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
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

                  {/* Mobile */}
                  <div className="flex items-center gap-2 sm:hidden">
                    <DatePickerCustom
                      label="From Date"
                      value={state.fromDate}
                      onChange={d => {
                        handler.setFromDate(d);
                      }}
                      maxDate={state.toDate}
                      placeholder="Select date"
                    />
                    <DatePickerCustom
                      label="To Date"
                      value={state.toDate}
                      onChange={d => handler.setToDate(d)}
                      isDateTo={true}
                      minDate={state.fromDate}
                      placeholder="Select date"
                    />

                    <button
                      type="button"
                      onClick={handler.handleSearchDate}
                      disabled={state.isLoading}
                      className={`flex items-center justify-center text-green-400 border border-green-400 
    bg-transparent rounded-xl px-2 py-2 shadow-none transition-all duration-300 ease-out
    ${
      state.isLoading
        ? "opacity-50 cursor-not-allowed"
        : "hover:text-white hover:bg-green-400/20 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/30 hover:scale-[1.05] active:scale-[0.95]"
    }
  `}
                    >
                      {state.isLoading ? (
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                        >
                          <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm11 17.59-4.3-4.3a9.99 9.99 0 0 0 1.42-1.42l4.3 4.3a1 1 0 0 1-1.42 1.42Z" />
                        </svg>
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

import type { MainTableHeaderProps } from "../../../models/mainTableModels";

export default function MainTableHeader(
  mainTableHeaderProps: MainTableHeaderProps
): React.JSX.Element {
  return (
    <thead className="sticky top-0 bg-slate-800/80 backdrop-blur-md border-b border-slate-600">
      {mainTableHeaderProps.tableName && (
        <tr>
          <th
            key={"main-header"}
            colSpan={mainTableHeaderProps?.isAdmin ? 8 : 5}
            className="px-3 sm:px-6 py-3 text-left text-sm font-bold text-indigo-300 uppercase tracking-wider"
          >
            {mainTableHeaderProps.tableName}
          </th>
        </tr>
      )}
      <tr>
        {mainTableHeaderProps.tableTitle.map((title, index) => (
          <th
            key={index}
            className={
              title === "Result" || title === "Profit"
                ? `px-3 sm:px-6 py-3 min-w-[50px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide`
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

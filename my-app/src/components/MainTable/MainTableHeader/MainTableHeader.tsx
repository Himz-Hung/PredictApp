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
            colSpan={mainTableHeaderProps?.isAdmin ? 7 : 5}
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
            className="px-3 sm:px-6 py-3 min-w-[150px] text-left text-xs font-medium bg-gray-700 text-slate-200 uppercase tracking-wide"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

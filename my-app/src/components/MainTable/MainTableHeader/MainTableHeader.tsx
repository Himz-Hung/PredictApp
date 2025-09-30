import type { MainTableHeaderProps } from "../../../models/mainTableModels";

export default function MainTableHeader(mainTableHeaderProps: MainTableHeaderProps): React.JSX.Element {
    return (
        <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {
                    mainTableHeaderProps.tableTitle.map((title,index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                      >
                        {title}
                      </th>
                    ))
                  }
                </tr>
              </thead>
    )
}
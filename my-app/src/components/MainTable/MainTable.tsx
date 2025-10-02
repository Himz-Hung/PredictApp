import MainTableFooter from "./MainTableFooter/MainTableFooter";
import MainTableHeader from "./MainTableHeader/MainTableHeader";
import type { MainTableProps } from '../../models/mainTableModels';

export default function MainTable({tableTitle,tableMainData,tableFooterTitle} : MainTableProps): React.JSX.Element {
    return (
      <div className="w-full max-w-full h-full overflow-x-auto">
        <div className="inline-block min-w-full h-full align-middle">
          <div className="overflow-scroll max-h-80 border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <MainTableHeader tableTitle={tableTitle} />
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {tableMainData?.map((p) => (
                  <tr key={p?.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {p.date}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.games}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.pick}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.result ? "Win" : "Lose"}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.profit}
                    </td>
                    {/* <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td> */}
                  </tr>
                ))}
              </tbody>
              <MainTableFooter tableFooterTitle = {tableFooterTitle}/>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
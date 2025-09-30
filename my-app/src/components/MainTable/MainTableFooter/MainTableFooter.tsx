import type { MainTableFooterProps } from "../../../models/mainTableModels";

export default function MainTableFooter({tableFooterTitle}: MainTableFooterProps): React.JSX.Element {
    return (
<tfoot>
  <tr className="font-semibold text-gray-900 dark:text-white">
    <td colSpan={4} className="px-6 py-3 text-base text-left">
      {tableFooterTitle}
    </td>
    <td className="px-6 py-3 ">21,000</td>
  </tr>
</tfoot>
    )
}
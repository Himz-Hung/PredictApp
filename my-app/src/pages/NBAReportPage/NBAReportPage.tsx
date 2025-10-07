import MainTable from "../../components/MainTable/MainTable";
import useNBAReportPageHook from "./useNBAReportPageHook";

export default function NBAReportPage() {
  const { state, handler } = useNBAReportPageHook();
  return (
    <div className="overflow-hidden p-5 w-full flex flex-col items-center text-white">
      {/* Title chính cho cả trang */}
      <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 tracking-wide uppercase text-center drop-shadow-md">
        NBA Scientific Betting {state?.todayDate}
      </h1>

      {/* Container chứa 2 bảng */}
      <div className="flex flex-wrap w-full items-start gap-8 justify-evenly">
        {/* Bảng 1 */}
        <div className="overflow-hidden w-full lg:w-5/12 flex flex-col items-center bg-gray-800/40 backdrop-blur-md shadow-lg ">
          <MainTable
            tableFooterTitle={state?.tableMainData?.tableFooterTitle}
            tableTitle={state?.tableMainData?.tableTitle}
            tableMainData={state?.tableMainData?.tableMainData}
            tableName={state?.tableMainData?.tableName}
          />
        </div>

        {/* Bảng 2 */}
        <div className="overflow-hidden w-full lg:w-5/12 flex flex-col items-center bg-gray-800/40 backdrop-blur-md  shadow-lg">
          <MainTable
            tableFooterTitle={state?.tableMainData?.tableFooterTitle}
            tableTitle={state?.tableMainData?.tableTitle}
            tableMainData={state?.tableMainData?.tableMainData}
            tableName={state?.tableMainData?.tableName}
          />
        </div>
      </div>
    </div>
  );
}

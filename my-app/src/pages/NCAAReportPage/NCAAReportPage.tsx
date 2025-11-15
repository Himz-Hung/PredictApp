import MainTable from "../../components/MainTable/MainTable";
import useNCAAReportPageHook from "./useNCAAReportPageHook";

export default function NCAAReportPage() {
  const { state, handler } = useNCAAReportPageHook();
  return (
    <div className="overflow-hidden p-5 w-full flex flex-col items-center text-white">
      <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text 
  bg-gradient-to-r from-orange-400 via-orange-300 to-orange-300 
  tracking-wide uppercase text-center drop-shadow-md">
        NCAA Scientific Betting {state?.todayDate}
      </h1>

      <div className="flex flex-wrap w-full items-start gap-8 justify-evenly">
        <div className="overflow-hidden w-full lg:max-w-[45vw] flex flex-col items-center backdrop-blur-md shadow-lg ">
          <MainTable
            tableFooterTitle={state?.tableMainData?.tableFooterTitle}
            tableTitle={state?.tableMainData?.tableTitle}
            tableMainData={state?.tableMainData?.tableMainData}
            tableName={state?.tableMainData?.tableName}
            totalRecords={state?.tableMainData?.totalRecords}
            isLoading={state?.loadingTodayRecords}
            onPageChange={handler.onPageChange}
            isTodayRecord={true}
          />
        </div>

        <div className="overflow-hidden w-full lg:max-w-[45vw] flex flex-col items-center backdrop-blur-md  shadow-lg">
          <MainTable
            isFromTo={true}
            tableFooterTitle={state?.tableMainDataHistory?.tableFooterTitle}
            tableTitle={state?.tableMainDataHistory?.tableTitle}
            tableMainData={state?.tableMainDataHistory?.tableMainData}
            tableName={state?.tableMainDataHistory?.tableName}
            totalRecords={state?.tableMainDataHistory?.totalRecords}
            sportType={"ncaa-basketbal"}
            isLoading={state?.loadingHistoryRecords}
            onSearchDate={handler.onSearchDate}
            onPageChange={handler.onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
